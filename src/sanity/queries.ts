import { groq } from "next-sanity";
import type {
  BespokeContent,
  Dealer,
  DealerRegion,
  DealerType,
  EventItem,
  HomeContent,
  L10n,
  MapImages,
  Office,
  OurWorldContent,
  SiteImage,
  SpecRow,
  Yacht,
  YachtStatus,
} from "@/content/types";
import { getClient } from "./client";
import { imageUrl } from "./image";

/**
 * GROQ queries plus the mapping from Sanity's shape to the site's own types.
 *
 * Every `fetch*` returns `null` when Sanity is unreachable or the collection is
 * empty, which is the signal the content layer uses to fall back to the sample
 * data. Errors are logged and swallowed: a CMS outage should degrade the page,
 * not take the site down.
 */

// ── Raw shapes coming back from GROQ ─────────────────────────────────────

type RawL10nString = { tr?: string | null; en?: string | null } | null;
type RawImage = { asset?: unknown; alt?: RawL10nString } | null;

type RawYacht = {
  name?: string | null;
  slug?: string | null;
  statuses?: string[] | null;
  /** Pre-multi-status documents carried a single value. */
  status?: string | null;
  order?: number | null;
  featured?: boolean | null;
  subtitle?: RawL10nString;
  loa?: RawL10nString;
  lede?: RawL10nString;
  body?: RawL10nString;
  specs?: { key?: RawL10nString; value?: RawL10nString }[] | null;
  cover?: RawImage;
  gallery?: RawImage[] | null;
};

type RawEvent = {
  slug?: string | null;
  date?: string | null;
  endDate?: string | null;
  title?: RawL10nString;
  location?: RawL10nString;
  excerpt?: RawL10nString;
  body?: RawL10nString;
  cover?: RawImage;
};

type RawDealer = {
  _id?: string | null;
  city?: string | null;
  company?: string | null;
  region?: string | null;
  type?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  capabilities?: RawL10nString;
  coordinates?: { lat?: number; lng?: number } | null;
};

// ── Conversion helpers ───────────────────────────────────────────────────

/** A localised string, with empty strings where the editor left a gap. */
function str(raw: RawL10nString): L10n {
  return { tr: raw?.tr ?? "", en: raw?.en ?? "" };
}

/** Blank-line-separated prose becomes an array of paragraphs. */
function paragraphs(raw: RawL10nString): L10n<string[]> {
  const split = (value: string | null | undefined) =>
    (value ?? "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  return { tr: split(raw?.tr), en: split(raw?.en) };
}

/** First paragraph only — for fields the design renders as a single line. */
function firstParagraph(raw: RawL10nString): L10n {
  const p = paragraphs(raw);
  return { tr: p.tr[0] ?? "", en: p.en[0] ?? "" };
}

function image(raw: RawImage): SiteImage | undefined {
  const src = imageUrl(raw?.asset as never);
  if (!src) return undefined;
  return { src, alt: str(raw?.alt ?? null) };
}

const YACHT_STATUSES: YachtStatus[] = [
  "delivered",
  "ready-for-delivery",
  "in-production",
];
const DEALER_REGIONS: DealerRegion[] = [
  "mediterranean",
  "northern-europe",
  "americas",
  "asia-pacific",
];
const DEALER_TYPES: DealerType[] = ["dealer", "service", "both"];

/**
 * Runs `fn`, logging and swallowing anything that goes wrong.
 *
 * Only a short summary is logged. The client's error objects carry the whole
 * request, including the `Authorization: Bearer <token>` header — logging them
 * verbatim would write the API token into the log stream.
 */
async function safely<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    const cause = (error as { cause?: { code?: string } })?.cause;
    const raw = cause?.code ?? (error instanceof Error ? error.message : String(error));
    // Sanity puts the whole query URL in its timeout messages; keep the log to
    // the first line and a sane length.
    const detail = raw.split(" on request to ")[0].trim().slice(0, 120);
    console.error(`[sanity] ${label} failed: ${detail} — falling back to sample data`);
    return null;
  }
}

// ── Queries ──────────────────────────────────────────────────────────────

const IMAGE_PROJECTION = `{ asset, alt }`;

const YACHT_PROJECTION = groq`{
  name,
  "slug": slug.current,
  statuses,
  status,
  order,
  featured,
  subtitle,
  loa,
  lede,
  body,
  specs[]{ key, value },
  cover ${IMAGE_PROJECTION},
  gallery[] ${IMAGE_PROJECTION}
}`;

const EVENT_PROJECTION = groq`{
  "slug": slug.current,
  date,
  endDate,
  title,
  location,
  excerpt,
  body,
  cover ${IMAGE_PROJECTION}
}`;

/**
 * Fleet tabs for one document.
 *
 * Reads the `statuses` array, and falls back to the single `status` string
 * that documents created before the field became multi-select still carry.
 * An empty or unrecognised value lands in "delivered" so the hull is at least
 * reachable from a tab rather than vanishing from the fleet entirely.
 */
function yachtStatuses(y: RawYacht): YachtStatus[] {
  const raw = y.statuses?.length ? y.statuses : y.status ? [y.status] : [];
  const valid = raw.filter((s): s is YachtStatus =>
    YACHT_STATUSES.includes(s as YachtStatus),
  );
  return valid.length ? valid : ["delivered"];
}

export async function fetchYachts(): Promise<Yacht[] | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchYachts", () =>
    client.fetch<RawYacht[]>(
      groq`*[_type == "yacht" && defined(slug.current)] | order(order asc) ${YACHT_PROJECTION}`,
    ),
  );
  if (!raw || raw.length === 0) return null;

  return raw
    .filter((y): y is RawYacht & { slug: string } => Boolean(y.slug))
    .map((y) => ({
      slug: y.slug,
      name: y.name ?? y.slug,
      statuses: yachtStatuses(y),
      order: y.order ?? 0,
      featured: Boolean(y.featured),
      subtitle: str(y.subtitle ?? null),
      loa: str(y.loa ?? null),
      lede: firstParagraph(y.lede ?? null),
      body: paragraphs(y.body ?? null),
      specs: (y.specs ?? []).map(
        (s): SpecRow => ({ key: str(s.key ?? null), value: str(s.value ?? null) }),
      ),
      cover: image(y.cover ?? null) ?? { src: "", alt: { tr: "", en: "" } },
      gallery: (y.gallery ?? [])
        .map((g) => image(g))
        .filter((g): g is SiteImage => Boolean(g)),
    }))
    // A yacht with no usable cover would render a broken frame.
    .filter((y) => y.cover.src !== "");
}

export async function fetchEvents(): Promise<EventItem[] | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchEvents", () =>
    client.fetch<RawEvent[]>(
      groq`*[_type == "event" && defined(slug.current) && defined(date)] | order(date desc) ${EVENT_PROJECTION}`,
    ),
  );
  if (!raw || raw.length === 0) return null;

  return raw
    .filter((e): e is RawEvent & { slug: string; date: string } =>
      Boolean(e.slug && e.date),
    )
    .map((e) => ({
      slug: e.slug,
      date: e.date,
      endDate: e.endDate ?? undefined,
      title: str(e.title ?? null),
      location: str(e.location ?? null),
      excerpt: firstParagraph(e.excerpt ?? null),
      body: paragraphs(e.body ?? null),
      cover: image(e.cover ?? null) ?? { src: "", alt: { tr: "", en: "" } },
    }));
}

export async function fetchDealers(): Promise<Dealer[] | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchDealers", () =>
    client.fetch<RawDealer[]>(
      groq`*[_type == "dealerLocation"] | order(region asc, city asc) {
        _id, city, company, region, type, address, phone, email, capabilities,
        "coordinates": coordinates{ lat, lng }
      }`,
    ),
  );
  if (!raw || raw.length === 0) return null;

  return raw.map((d, i) => ({
    id: d._id ?? `dealer-${i}`,
    region: DEALER_REGIONS.includes(d.region as DealerRegion)
      ? (d.region as DealerRegion)
      : "mediterranean",
    type: DEALER_TYPES.includes(d.type as DealerType)
      ? (d.type as DealerType)
      : "dealer",
    city: d.city ?? "",
    company: d.company ?? "",
    address: d.address ?? "",
    phone: d.phone ?? "",
    email: d.email ?? "",
    capabilities: str(d.capabilities ?? null),
    coordinates:
      typeof d.coordinates?.lat === "number" && typeof d.coordinates?.lng === "number"
        ? { lat: d.coordinates.lat, lng: d.coordinates.lng }
        : undefined,
  }));
}

export async function fetchHomeContent(): Promise<HomeContent | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchHomeContent", () =>
    client.fetch<Record<string, unknown> | null>(
      groq`*[_type == "homePage"][0]{
        heroImage ${IMAGE_PROJECTION},
        heroEyebrow, heroTitle, statement, statementBody,
        figures[]{ value, label, note },
        tiles[]{ href, kicker, title, body, image ${IMAGE_PROJECTION} },
        closing
      }`,
    ),
  );
  if (!raw) return null;

  const hero = image(raw.heroImage as RawImage);
  if (!hero) return null;

  return {
    heroImage: hero,
    heroEyebrow: str(raw.heroEyebrow as RawL10nString),
    heroTitle: str(raw.heroTitle as RawL10nString),
    statement: firstParagraph(raw.statement as RawL10nString),
    statementBody: firstParagraph(raw.statementBody as RawL10nString),
    figures: ((raw.figures ?? []) as {
      value?: string;
      label?: RawL10nString;
      note?: RawL10nString;
    }[]).map((f) => ({
      value: f.value ?? "",
      label: str(f.label ?? null),
      note: str(f.note ?? null),
    })),
    tiles: ((raw.tiles ?? []) as {
      href?: string;
      kicker?: RawL10nString;
      title?: RawL10nString;
      body?: RawL10nString;
      image?: RawImage;
    }[])
      // Drop tiles whose image never resolved rather than render an empty box.
      .flatMap((t): HomeContent["tiles"] => {
        const img = image(t.image ?? null);
        if (!img) return [];
        return [
          {
            href: t.href ?? "/",
            kicker: str(t.kicker ?? null),
            title: str(t.title ?? null),
            body: str(t.body ?? null),
            image: img,
          },
        ];
      }),
    closing: firstParagraph(raw.closing as RawL10nString),
  };
}

export async function fetchOurWorldContent(): Promise<OurWorldContent | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchOurWorldContent", () =>
    client.fetch<Record<string, unknown> | null>(
      groq`*[_type == "ourWorldPage"][0]{
        title,
        heroImage ${IMAGE_PROJECTION},
        statement, statementBody,
        pillars[]{ kicker, title, body, href, image ${IMAGE_PROJECTION} },
        commitments[]{ no, title, body }
      }`,
    ),
  );
  if (!raw) return null;

  const hero = image(raw.heroImage as RawImage);
  if (!hero) return null;

  return {
    title: str(raw.title as RawL10nString),
    heroImage: hero,
    statement: firstParagraph(raw.statement as RawL10nString),
    statementBody: firstParagraph(raw.statementBody as RawL10nString),
    pillars: ((raw.pillars ?? []) as {
      kicker?: string;
      title?: RawL10nString;
      body?: RawL10nString;
      href?: string;
      image?: RawImage;
    }[])
      .flatMap((p, i): OurWorldContent["pillars"] => {
        const img = image(p.image ?? null);
        if (!img) return [];
        return [
          {
            id: `pillar-${i}`,
            kicker: p.kicker ?? String(i + 1).padStart(2, "0"),
            title: str(p.title ?? null),
            body: str(p.body ?? null),
            image: img,
            href: p.href || undefined,
          },
        ];
      }),
    commitments: ((raw.commitments ?? []) as {
      no?: string;
      title?: RawL10nString;
      body?: RawL10nString;
    }[]).map((c, i) => ({
      no: c.no ?? String(i + 1).padStart(2, "0"),
      title: str(c.title ?? null),
      body: str(c.body ?? null),
    })),
  };
}

export async function fetchOffices(): Promise<Office[] | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchOffices", () =>
    client.fetch<
      {
        offices?: {
          role?: RawL10nString;
          city?: string;
          addressLines?: string[];
          phone?: string;
          email?: string;
          coordinates?: { lat?: number; lng?: number } | null;
        }[];
      } | null
    >(
      groq`*[_type == "siteSettings"][0]{
        offices[]{ role, city, addressLines, phone, email, "coordinates": coordinates{ lat, lng } }
      }`,
    ),
  );
  const list = raw?.offices;
  if (!list || list.length === 0) return null;

  return list.map((o, i) => ({
    id: `office-${i}`,
    role: str(o.role ?? null),
    city: o.city ?? "",
    addressLines: o.addressLines ?? [],
    phone: o.phone ?? "",
    email: o.email ?? "",
    coordinates:
      typeof o.coordinates?.lat === "number" && typeof o.coordinates?.lng === "number"
        ? { lat: o.coordinates.lat, lng: o.coordinates.lng }
        : undefined,
  }));
}

export async function fetchBespoke(): Promise<BespokeContent | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchBespoke", () =>
    client.fetch<{
      bespoke?: {
        kicker?: RawL10nString;
        title?: RawL10nString;
        body?: RawL10nString;
        points?: { title?: RawL10nString; body?: RawL10nString }[] | null;
        yachtNote?: RawL10nString;
      } | null;
    } | null>(
      groq`*[_type == "siteSettings"][0]{
        bespoke{ kicker, title, body, points[]{ title, body }, yachtNote }
      }`,
    ),
  );

  const b = raw?.bespoke;
  // Without a title the section would render as an unexplained list.
  if (!b?.title) return null;

  return {
    kicker: str(b.kicker ?? null),
    title: str(b.title ?? null),
    body: paragraphs(b.body ?? null),
    points: (b.points ?? []).map((p) => ({
      title: str(p.title ?? null),
      body: str(p.body ?? null),
    })),
    yachtNote: firstParagraph(b.yachtNote ?? null),
  };
}

export async function fetchMaps(): Promise<MapImages | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchMaps", () =>
    client.fetch<{ networkMap?: RawImage; contactMap?: RawImage } | null>(
      groq`*[_type == "siteSettings"][0]{
        networkMap ${IMAGE_PROJECTION},
        contactMap ${IMAGE_PROJECTION}
      }`,
    ),
  );

  const network = image(raw?.networkMap ?? null);
  const contact = image(raw?.contactMap ?? null);
  // Both are placeholders for a map; one without the other is not useful.
  if (!network || !contact) return null;

  return { network, contact };
}

/**
 * Where contact form enquiries should be delivered, as set in Sanity.
 *
 * Editable from the Studio so the recipient can change without a deploy. The
 * sender address stays in the environment: it must match a domain verified
 * with Resend, so it is not something an editor can safely change.
 */
export async function fetchContactRecipient(): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await safely("fetchContactRecipient", () =>
    client.fetch<{ contactEmailTo?: string | null } | null>(
      groq`*[_type == "siteSettings"][0]{ contactEmailTo }`,
    ),
  );

  const value = raw?.contactEmailTo?.trim();
  return value ? value : null;
}
