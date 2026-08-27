"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Message = { role: "user" | "model"; text: string };

/**
 * Site assistant.
 *
 * Answers only from the site's own content — the knowledge base is assembled
 * server-side in `chat-context.ts`. Rendered only when GEMINI_API_KEY is set,
 * so there is never a launcher that opens onto a broken panel.
 */
export default function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keep the newest message in view as it streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function describe(code: string | undefined): string {
    const known = [
      "not_configured",
      "rate_limited",
      "quota_exceeded",
      "empty_message",
      "upstream_error",
      "upstream_unreachable",
    ];
    return t(`errors.${known.includes(code ?? "") ? code : "upstream_error"}`);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    const next: Message[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale }),
      });

      if (!res.ok || !res.body) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(describe(body?.error));
        return;
      }

      // Append an empty reply, then fill it as chunks arrive.
      setMessages((m) => [...m, { role: "model", text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "model",
            text: copy[copy.length - 1].text + chunk,
          };
          return copy;
        });
      }
    } catch {
      setError(describe("upstream_unreachable"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* ── Launcher ──────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-assistant"
        className="fixed right-6 bottom-6 z-[900] cursor-pointer border border-ink bg-paper px-6 py-4 text-[11px] tracking-label uppercase shadow-[0_2px_16px_rgba(23,23,23,0.12)] transition-colors hover:border-accent hover:bg-accent hover:text-paper"
      >
        {open ? t("close") : t("launcher")}
      </button>

      {/* ── Panel ─────────────────────────────────────────────────────── */}
      {open && (
        <div
          id="site-assistant"
          role="dialog"
          aria-label={t("title")}
          className="fixed right-6 bottom-24 z-[900] flex max-h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-3rem)] max-w-[400px] flex-col border border-ink bg-paper shadow-[0_2px_28px_rgba(23,23,23,0.18)]"
        >
          <header className="border-b border-ink px-6 py-5">
            <p className="text-[10px] tracking-label text-accent uppercase">
              {t("title")}
            </p>
            <p className="mt-2 text-[13px] leading-[1.6] text-muted">{t("intro")}</p>
          </header>

          <div
            ref={scrollRef}
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 overflow-y-auto px-6 py-5"
          >
            {messages.length === 0 && (
              <div className="flex flex-col gap-2">
                {[t("suggest1"), t("suggest2"), t("suggest3")].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInput(s)}
                    className="cursor-pointer border border-ink/25 px-4 py-3 text-left text-[14px] leading-[1.5] text-body transition-colors hover:border-ink hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-4 text-[15px] leading-[1.75] ${
                  m.role === "user"
                    ? "border-l-2 border-accent pl-4 text-ink"
                    : "text-body"
                }`}
              >
                {m.text || (busy && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}

            {error && (
              <p role="alert" className="mt-2 text-[14px] leading-[1.7] text-accent">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={send} className="border-t border-ink px-6 py-5">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                maxLength={1000}
                disabled={busy}
                aria-label={t("placeholder")}
                className="w-full border-b border-ink bg-transparent pb-2 font-sans text-[15px] font-light text-ink outline-none focus:border-accent placeholder:text-muted disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={busy || input.trim() === ""}
                className="shrink-0 cursor-pointer text-[11px] tracking-label uppercase transition-colors hover:text-accent disabled:cursor-default disabled:opacity-40"
              >
                {busy ? t("sending") : t("send")}
              </button>
            </div>
            {/* The model is a third party; say so, and discourage personal data. */}
            <p className="mt-4 text-[11px] leading-[1.6] text-muted">{t("notice")}</p>
          </form>
        </div>
      )}
    </>
  );
}
