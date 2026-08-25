import { NextResponse, type NextRequest } from "next/server";
import type { Locale } from "@/content/types";
import { buildSiteContext, buildSystemInstruction } from "@/lib/chat-context";

/**
 * Site assistant, backed by the Gemini API.
 *
 * Streams the reply as plain text so the widget can render it as it arrives.
 * The whole knowledge base is assembled per request from the site's own
 * content (see `chat-context.ts`) — no vector store, no third service.
 *
 * Requires GEMINI_API_KEY. Without it the route answers 503 and the widget
 * never renders in the first place.
 */

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

const MAX_MESSAGES = 20;
const MAX_CHARS = 1_000;
const UPSTREAM_TIMEOUT_MS = 30_000;

/** Requests allowed per IP inside the window. */
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60_000;

/**
 * Best-effort throttle. Serverless instances do not share memory, so this
 * bounds a single instance rather than the whole deployment — enough to stop
 * casual hammering of a free-tier quota, not a security control.
 */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

type ClientMessage = { role: "user" | "model"; text: string };

function fail(code: string, status: number) {
  return NextResponse.json({ error: code }, { status });
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[chat] GEMINI_API_KEY is not set");
    return fail("not_configured", 503);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) return fail("rate_limited", 429);

  let payload: { messages?: unknown; locale?: unknown };
  try {
    payload = await request.json();
  } catch {
    return fail("invalid_json", 400);
  }

  const locale: Locale = payload.locale === "en" ? "en" : "tr";

  const messages: ClientMessage[] = Array.isArray(payload.messages)
    ? (payload.messages as ClientMessage[])
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "model") &&
            typeof m.text === "string" &&
            m.text.trim() !== "",
        )
        .slice(-MAX_MESSAGES)
        .map((m) => ({ role: m.role, text: m.text.trim().slice(0, MAX_CHARS) }))
    : [];

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return fail("empty_message", 422);
  }

  const siteContext = await buildSiteContext(locale);
  const systemInstruction = buildSystemInstruction(locale, siteContext);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(
      `${ENDPOINT}/${MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: messages.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1_000,
          },
          safetySettings: [],
        }),
      },
    );
  } catch (error) {
    clearTimeout(timeout);
    console.error("[chat] upstream request failed:", error);
    return fail("upstream_unreachable", 502);
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timeout);
    const detail = await upstream.text().catch(() => "");
    console.error("[chat] Gemini rejected the request:", upstream.status, detail.slice(0, 400));
    return fail(upstream.status === 429 ? "quota_exceeded" : "upstream_error", 502);
  }

  // Re-emit Gemini's SSE frames as plain text chunks.
  const stream = new ReadableStream<Uint8Array>({
    async start(controllerOut) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split("\n");
          // The last element may be a partial line; keep it for the next chunk.
          buffer = frames.pop() ?? "";

          for (const frame of frames) {
            if (!frame.startsWith("data:")) continue;
            const json = frame.slice(5).trim();
            if (!json || json === "[DONE]") continue;

            try {
              const parsed = JSON.parse(json);
              const text = parsed?.candidates?.[0]?.content?.parts
                ?.map((p: { text?: string }) => p.text ?? "")
                .join("");
              if (text) controllerOut.enqueue(encoder.encode(text));
            } catch {
              // A frame we cannot parse is not worth failing the whole reply.
            }
          }
        }
      } catch (error) {
        console.error("[chat] stream interrupted:", error);
      } finally {
        clearTimeout(timeout);
        controllerOut.close();
        reader.releaseLock();
      }
    },
    cancel() {
      clearTimeout(timeout);
      controller.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
