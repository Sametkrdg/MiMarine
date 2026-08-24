/**
 * Single source of truth for the brand wordmark.
 *
 * The design prototype in `design/tasarim-prototipi.html` was drawn for a
 * placeholder brand ("SEREN"). Everything brand-facing is funnelled through
 * this file so the wordmark, tagline and legal name can be corrected in one
 * place once the real brand assets arrive (see MANUEL.md).
 */
export const brand = {
  /** Primary wordmark, rendered in the header and footer. */
  wordmark: "MIMARINE",
  /** Secondary line under the wordmark. */
  wordmarkSub: "YACHT",
  /** Full name used in <title>, metadata and copyright. */
  fullName: "MiMarine Yacht",
  /** PLACEHOLDER — replace with the registered legal entity name. */
  legalName: "MiMarine Yacht",
} as const;
