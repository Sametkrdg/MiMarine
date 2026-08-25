/**
 * Sanity connection settings.
 *
 * Nothing here throws when the values are missing — the site has to keep
 * building and rendering before the CMS is populated. `isSanityConfigured`
 * is the switch every caller checks.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pinned so a future API change cannot silently alter query results. */
export const apiVersion = "2024-10-01";

/** Read token. Optional — public datasets are readable without one. */
export const readToken = process.env.SANITY_API_TOKEN ?? "";

export const isSanityConfigured = Boolean(projectId);
