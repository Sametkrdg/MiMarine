import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Content Security Policy.
 *
 * Origin-based rather than nonce-based, deliberately. Next only injects nonces
 * during server-side rendering, so a nonce policy would force all 49 pages out
 * of static generation and into per-request rendering — losing the ~7 ms
 * static responses and adding a function invocation per visit. For a brochure
 * site with no authenticated area, restricting *where* resources may come from
 * buys most of the protection at none of that cost.
 *
 * What this still blocks: scripts, styles, fonts, images, frames and network
 * calls to any origin not listed here. What it does not block: injected inline
 * script, which is what a nonce would add. If that trade is ever worth making,
 * follow the nonce recipe in Next's CSP guide and accept dynamic rendering.
 */

const SANITY = "https://*.api.sanity.io https://*.apicdn.sanity.io https://cdn.sanity.io";
const OSM = "https://*.tile.openstreetmap.org https://tile.openstreetmap.org";

/** Policy for the public site. */
const sitePolicy = [
  "default-src 'self'",
  // 'unsafe-inline' covers Next's bootstrap script; see the note above.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${OSM} https://images.unsplash.com https://cdn.sanity.io`,
  "font-src 'self' data:",
  `connect-src 'self' ${SANITY}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Studio needs more room: the editor evaluates code at runtime, loads its own
 * workers and blobs, and talks to several Sanity hosts for auth and assets.
 * Scoped to /studio so the public site keeps the tighter policy.
 */
const studioPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
  "font-src 'self' data: https://*.sanity.io",
  `connect-src 'self' ${SANITY} https://*.sanity.io wss://*.api.sanity.io`,
  "worker-src 'self' blob:",
  "frame-src 'self' https://*.sanity.io",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Ignored over plain HTTP, so it is harmless in development.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          ...baseHeaders,
          { key: "Content-Security-Policy", value: studioPolicy },
        ],
      },
      {
        source: "/((?!studio).*)",
        headers: [
          ...baseHeaders,
          { key: "Content-Security-Policy", value: sitePolicy },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
