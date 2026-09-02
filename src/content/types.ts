/**
 * Domain types for site content.
 *
 * These deliberately mirror the Sanity schema sketched in PROJE_PLANI.md, so
 * that swapping `sample-data.ts` for GROQ queries in phase 2 changes only the
 * bodies of the accessors in `index.ts` — never the pages that consume them.
 */

export type Locale = "tr" | "en";

/** A field that Sanity will hold as a localised object. */
export type L10n<T = string> = Record<Locale, T>;

/**
 * An image slot.
 *
 * `src` is an absolute URL. Today these are Unsplash placeholders; in phase 2
 * they become Sanity CDN URLs produced by `urlFor()`, so the shape does not
 * change. `alt` is localised because alt text is content, not chrome.
 */
export type SiteImage = {
  src: string;
  alt: L10n;
};

export type YachtStatus = "delivered" | "ready-for-delivery" | "in-production";

export type SpecRow = {
  /** Label, translated. */
  key: L10n;
  /**
   * Value, translated too — Turkish and English disagree on decimal and
   * thousands separators ("34,0 m" vs "34.0 m"), and some values are words.
   */
  value: L10n;
};

export type Yacht = {
  slug: string;
  /** Model / hull designation. Not translated. */
  name: string;
  /**
   * Which fleet tabs this hull appears under. A hull can sit in more than one
   * at once — a finished boat that is both ready to hand over and still open
   * to a build slot shows in "ready for delivery" and "in production" alike.
   * The first entry is the primary one: it is what the detail page links back
   * to.
   */
  statuses: YachtStatus[];
  /** Sort order within its status tab, ascending. */
  order: number;
  featured: boolean;
  /** Small line under the name on cards, e.g. "Delivered 2024 · Aegean". */
  subtitle: L10n;
  /** Length overall, shown on cards. Localised for the decimal separator. */
  loa: L10n;
  lede: L10n;
  body: L10n<string[]>;
  specs: SpecRow[];
  cover: SiteImage;
  gallery: SiteImage[];
};

/**
 * The bespoke-interiors promise.
 *
 * Site-wide rather than page-specific: it appears in full on the home page and
 * in short on every yacht, so it lives in Site Settings and is written once.
 */
export type BespokeContent = {
  kicker: L10n;
  title: L10n;
  body: L10n<string[]>;
  points: { title: L10n; body: L10n }[];
  /** One line, shown on yacht pages under the specification table. */
  yachtNote: L10n;
};

export type EventItem = {
  slug: string;
  /** ISO date. Upcoming vs. past is derived from this, never set by hand. */
  date: string;
  /** Optional end of a multi-day event. */
  endDate?: string;
  location: L10n;
  title: L10n;
  excerpt: L10n;
  body: L10n<string[]>;
  cover: SiteImage;
};

export type DealerRegion = "mediterranean" | "northern-europe" | "americas" | "asia-pacific";

export type DealerType = "dealer" | "service" | "both";

export type Dealer = {
  id: string;
  region: DealerRegion;
  type: DealerType;
  /** Place name — geography, so not translated. */
  city: string;
  /** PLACEHOLDER until the real network list arrives. */
  company: string;
  address: string;
  phone: string;
  email: string;
  capabilities: L10n;
  coordinates?: { lat: number; lng: number };
};

export type Office = {
  id: string;
  role: L10n;
  city: string;
  /** PLACEHOLDER until real contact details arrive. */
  addressLines: string[];
  phone: string;
  email: string;
  coordinates?: { lat: number; lng: number };
};

/** Home page singleton. */
export type HomeContent = {
  heroImage: SiteImage;
  heroEyebrow: L10n;
  heroTitle: L10n;
  statement: L10n;
  statementBody: L10n;
  figures: { value: string; label: L10n; note: L10n }[];
  tiles: { href: string; kicker: L10n; title: L10n; body: L10n; image: SiteImage }[];
  closing: L10n;
};

/** Our World page singleton. */
export type OurWorldContent = {
  title: L10n;
  heroImage: SiteImage;
  statement: L10n;
  statementBody: L10n;
  pillars: { id: string; kicker: string; title: L10n; body: L10n; image: SiteImage; href?: string }[];
  commitments: { no: string; title: L10n; body: L10n }[];
};

/** One heading + body block inside a legal document. */
export type LegalSection = {
  heading: L10n;
  body: L10n<string[]>;
};

/** A legal page (privacy policy / KVKK aydınlatma metni). */
export type LegalDocument = {
  title: L10n;
  /** ISO date, formatted per locale at render time. */
  lastUpdated: string;
  intro: L10n;
  sections: LegalSection[];
};

/** Map imagery, used by the network and contact pages. */
export type MapImages = {
  network: SiteImage;
  contact: SiteImage;
};

/** Resolves a localised field. Named `pick` so it never shadows next-intl's `t`. */
export function pick<T>(field: L10n<T>, locale: Locale): T {
  return field[locale];
}
