import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * NOT WIRED UP YET — Resend needs an API key and a verified sending domain
 * (see MANUEL.md). Until `RESEND_API_KEY` and `CONTACT_EMAIL_TO` exist this
 * route validates the payload and returns 503 so the failure is visible
 * rather than silent.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 422 },
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL_TO) {
    return NextResponse.json(
      { error: "Contact form is not configured yet (RESEND_API_KEY missing)." },
      { status: 503 },
    );
  }

  // TODO(phase-3): send via Resend once the account and domain are verified.
  return NextResponse.json(
    { error: "Contact form delivery is not implemented yet." },
    { status: 501 },
  );
}
