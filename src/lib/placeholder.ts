/**
 * Contact details, as supplied by the client.
 *
 * Kept in one place so the footer, the contact page and the legal texts cannot
 * drift apart. In Sanity these live on the `siteSettings` singleton; this file
 * is the fallback used until that document exists.
 */
export const placeholderContact = {
  addressLines: [
    "Alparslan Türkeş Bulvarı No: 200",
    "Kıyıcık, 61830 Of / Trabzon",
  ],
  phone: "+90 505 817 07 88",
  email: "mimarineyacht@outlook.com",
} as const;
