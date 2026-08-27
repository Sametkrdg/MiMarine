import { NextResponse } from "next/server";
import { Resend } from "resend";
import { fetchContactRecipient } from "@/sanity/queries";
import { brand } from "@/lib/brand";

/**
 * Contact form endpoint.
 *
 * Sends the enquiry through Resend. Every piece of configuration is read at
 * request time, not module scope, so a missing key is a clear 503 rather than
 * a build failure — see MANUEL.md for what has to be set up:
 *
 *   RESEND_API_KEY      Resend account key
 *   CONTACT_EMAIL_TO    fallback recipient; Sanity's siteSettings wins
 *   CONTACT_EMAIL_FROM  a sender on a Resend-verified domain — NOT an
 *                       outlook/gmail address, Resend rejects those
 *
 * NOTE: never exercised against a live Resend account — the wiring is written
 * to their documented API but is unverified until a key exists.
 */

/**
 * Stable error codes. The client maps these to localised copy, so the wire
 * format stays language-neutral and the messages live with the rest of the
 * translations.
 */
type ErrorCode =
  | "invalid_json"
  | "missing_fields"
  | "invalid_email"
  | "not_configured"
  | "send_failed";

function fail(code: ErrorCode, status: number) {
  return NextResponse.json({ error: code }, { status });
}

type Payload = {
  name: string;
  email: string;
  country: string;
  interest: string;
  message: string;
};

const MAX_FIELD = 5_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

/** Keeps submitted text out of the HTML tree as markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(payload: Payload): string {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Country", payload.country],
    ["Interest", payload.interest],
  ];

  return [
    '<div style="font-family:system-ui,sans-serif;color:#171717">',
    `<h2 style="font-weight:300;letter-spacing:0.04em">${brand.fullName} — enquiry</h2>`,
    '<table style="border-collapse:collapse">',
    ...rows
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#737373">${k}</td>` +
          `<td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
      ),
    "</table>",
    payload.message
      ? `<p style="white-space:pre-wrap;line-height:1.7">${escapeHtml(payload.message)}</p>`
      : "",
    "</div>",
  ].join("");
}

function renderText(payload: Payload): string {
  return [
    `${brand.fullName} — enquiry`,
    "",
    `Name:     ${payload.name}`,
    `Email:    ${payload.email}`,
    payload.country ? `Country:  ${payload.country}` : "",
    payload.interest ? `Interest: ${payload.interest}` : "",
    "",
    payload.message,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("invalid_json", 400);
  }

  const payload: Payload = {
    name: readField(body.name),
    email: readField(body.email),
    country: readField(body.country),
    interest: readField(body.interest),
    message: readField(body.message),
  };

  if (!payload.name || !payload.email) {
    return fail("missing_fields", 422);
  }

  if (!EMAIL_RE.test(payload.email)) {
    return fail("invalid_email", 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  // The recipient is editable in the Studio; the env var is the fallback.
  const to = (await fetchContactRecipient()) ?? process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      "[contact] not configured — set RESEND_API_KEY, CONTACT_EMAIL_TO and CONTACT_EMAIL_FROM",
    );
    return fail("not_configured", 503);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: `${brand.fullName} — enquiry from ${payload.name}`,
      html: renderHtml(payload),
      text: renderText(payload),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return fail("send_failed", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return fail("send_failed", 502);
  }
}
