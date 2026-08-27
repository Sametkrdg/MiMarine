/**
 * Single source of truth for the brand.
 *
 * Everything brand-facing is funnelled through this file so the wordmark, the
 * legal name and the social accounts can each be corrected in one place.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const brand = {
  /** Wordmark, rendered as a single line in the header and footer. */
  wordmark: "MIMARINE YACHT",
  /** Display name used in <title>, metadata and body copy. */
  fullName: "Mimarine Yacht",
  /** Registered company title, used in the footer copyright and legal texts. */
  legalName: "MimarineYacht Yatçılık San. Tic. Ltd. Şti.",
  /** Year the company was founded. */
  founded: 2021,
  /**
   * Social accounts. Empty until the real handles arrive, and the footer hides
   * the row entirely while it is — a dead link reads worse than no link.
   */
  social: [] as SocialLink[],
} as const;
