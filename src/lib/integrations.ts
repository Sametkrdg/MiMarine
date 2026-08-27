/**
 * Which third-party integrations are actually configured.
 *
 * Read on the server only — these are unprefixed secrets. Pages pass the
 * resulting booleans down to client components so a half-configured service
 * degrades to a clear notice instead of a button that always fails.
 */

/**
 * The contact form needs a key and a verified sender to deliver anything.
 *
 * The recipient is not checked here: it can come from Sanity at request time,
 * and the route falls back to CONTACT_EMAIL_TO. Sender and key are the two
 * that cannot be set from the Studio.
 */
export function isContactFormConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_FROM);
}

/** The site assistant needs a Gemini key; without one the widget stays hidden. */
export function isChatConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}
