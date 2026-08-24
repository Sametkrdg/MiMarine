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

export type YachtStatus = "delivered" | "ready-for-delivery" | "in-production";

export type SpecRow = {
  /** Label, translated. */
  key: L10n;
  /** Value — usually a number with a unit, so not translated. */
  value: string;
};

export type Yacht = {
  slug: string;
  /** Model / hull designation. Not translated. */
  name: string;
  status: YachtStatus;
  /** Sort order within its status tab, ascending. */
  order: number;
  featured: boolean;
  /** Small line under the name on cards, e.g. "Delivered 2024 · Aegean". */
  subtitle: L10n;
  /** Length overall, shown on cards. */
  loa: string;
  lede: L10n;
  body: L10n<string[]>;
  specs: SpecRow[];
  /** Describes what the cover image will show, until real photography exists. */
  coverLabel: string;
  galleryLabels: string[];
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
  coverLabel: string;
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
};

/** Home page singleton. */
export type HomeContent = {
  heroEyebrow: L10n;
  heroTitle: L10n;
  statement: L10n;
  statementBody: L10n;
  figures: { value: string; label: L10n; note: L10n }[];
  tiles: { href: string; kicker: L10n; title: L10n; body: L10n; imageLabel: string }[];
  closing: L10n;
};

/** Our World page singleton. */
export type OurWorldContent = {
  title: L10n;
  statement: L10n;
  statementBody: L10n;
  pillars: { id: string; kicker: string; title: L10n; body: L10n; imageLabel: string; href?: string }[];
  commitments: { no: string; title: L10n; body: L10n }[];
};

/** Resolves a localised field. Named `pick` so it never shadows next-intl's `t`. */
export function pick<T>(field: L10n<T>, locale: Locale): T {
  return field[locale];
}
