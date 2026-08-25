/**
 * Which third-party integrations are actually configured.
 *
 * Read on the server only — these are unprefixed secrets. Pages pass the
 * resulting booleans down to client components so a half-configured service
 * degrades to a clear notice instead of a button that always fails.
 */

/** The contact form needs all three to deliver anything. */
export function isContactFormConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_EMAIL_TO &&
      process.env.CONTACT_EMAIL_FROM,
  );
}
