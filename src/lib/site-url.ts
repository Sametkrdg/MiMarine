/**
 * Absolute origin for canonical URLs, hreflang alternates, sitemap entries and
 * OG image URLs.
 *
 * `NEXT_PUBLIC_SITE_URL` wins once a domain exists. On Vercel we fall back to
 * the deployment URL so preview builds still emit self-consistent links, and
 * to localhost in development.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
