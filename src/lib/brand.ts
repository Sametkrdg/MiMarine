/**
 * Single source of truth for the brand.
 *
 * The design prototype in `design/tasarim-prototipi.html` was drawn for a
 * placeholder brand, so everything brand-facing is funnelled through this file
 * — the wordmark, the legal name and the social accounts can each be corrected
 * in one place as the real brand assets arrive (see MANUEL.md).
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const brand = {
  /** Wordmark, rendered as a single line in the header and footer. */
  wordmark: "MIMARINE YACHT",
  /** Full name used in <title>, metadata and body copy. */
  fullName: "Mimarine Yacht",
  /**
   * PLACEHOLDER — shown in the footer copyright line. Replace with the
   * registered legal entity name once it is confirmed.
   */
  legalName: "Mimarine Yacht",
  /**
   * Social accounts. Empty until the real handles arrive, and the footer hides
   * the row entirely while it is — a dead link reads worse than no link.
   */
  social: [] as SocialLink[],
} as const;
