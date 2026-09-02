/**
 * Content accessors.
 *
 * Pages import ONLY from here. Each function asks Sanity first and falls back
 * to `sample-data.ts` when Sanity is unconfigured, unreachable, or simply has
 * no documents of that kind yet — so the site keeps rendering while content is
 * being entered, and switches over collection by collection as it lands.
 *
 * Delete the fallbacks (and `sample-data.ts`) once the CMS is populated.
 */

import { notFound } from "next/navigation";
import { cache } from "react";
import {
  fetchBespoke,
  fetchDealers,
  fetchEvents,
  fetchHomeContent,
  fetchMaps,
  fetchOffices,
  fetchOurWorldContent,
  fetchYachts,
} from "@/sanity/queries";
import { privacyPolicy } from "./legal";
import {
  bespoke as sampleBespoke,
  dealers as sampleDealers,
  events as sampleEvents,
  home as sampleHome,
  maps as sampleMaps,
  offices as sampleOffices,
  ourWorld as sampleOurWorld,
  yachts as sampleYachts,
} from "./sample-data";
import type {
  BespokeContent,
  Dealer,
  DealerRegion,
  EventItem,
  HomeContent,
  LegalDocument,
  MapImages,
  Office,
  OurWorldContent,
  Yacht,
  YachtStatus,
} from "./types";

export const yachtStatuses: YachtStatus[] = [
  "delivered",
  "ready-for-delivery",
  "in-production",
];

export const dealerRegions: DealerRegion[] = [
  "mediterranean",
  "northern-europe",
  "americas",
  "asia-pacific",
];

/**
 * One Sanity round trip per request, however many components ask.
 * `cache` dedupes within a single render pass.
 */
const allYachts = cache(async (): Promise<Yacht[]> => {
  return (await fetchYachts()) ?? sampleYachts;
});

const allEvents = cache(async (): Promise<EventItem[]> => {
  return (await fetchEvents()) ?? sampleEvents;
});

const allDealers = cache(async (): Promise<Dealer[]> => {
  return (await fetchDealers()) ?? sampleDealers;
});

const byOrder = (a: Yacht, b: Yacht) => a.order - b.order;

export async function getYachts(status?: YachtStatus): Promise<Yacht[]> {
  const all = await allYachts();
  const list = status ? all.filter((y) => y.statuses.includes(status)) : all;
  return [...list].sort(byOrder);
}

export async function getYachtBySlug(slug: string): Promise<Yacht | null> {
  const all = await allYachts();
  return all.find((y) => y.slug === slug) ?? null;
}

/** Throws Next's not-found when the slug does not resolve. */
export async function getYachtOrNotFound(slug: string): Promise<Yacht> {
  const yacht = await getYachtBySlug(slug);
  if (!yacht) notFound();
  return yacht;
}

export async function getFeaturedYacht(): Promise<Yacht | null> {
  const all = await allYachts();
  return all.find((y) => y.featured) ?? all[0] ?? null;
}

/**
 * Count per tab, for the fleet tabs and the navbar dropdown. A hull listed
 * under two statuses is counted under both, so the numbers match what each
 * tab actually shows.
 */
export async function getYachtCounts(): Promise<Record<YachtStatus, number>> {
  const all = await allYachts();
  const counts = { delivered: 0, "ready-for-delivery": 0, "in-production": 0 };
  for (const yacht of all) {
    for (const status of yacht.statuses) counts[status] += 1;
  }
  return counts;
}

/**
 * Upcoming vs. past is derived from the date, never stored — matching the rule
 * in PROJE_PLANI.md that editors do not pick a status by hand.
 */
function isUpcoming(event: EventItem, today: Date): boolean {
  const end = new Date(event.endDate ?? event.date);
  return end >= today;
}

export async function getEvents(): Promise<{
  upcoming: EventItem[];
  past: EventItem[];
}> {
  const all = await allEvents();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = all
    .filter((e) => isUpcoming(e, today))
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = all
    .filter((e) => !isUpcoming(e, today))
    .sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const all = await allEvents();
  return all.find((e) => e.slug === slug) ?? null;
}

export async function getEventOrNotFound(slug: string): Promise<EventItem> {
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  return event;
}

export async function getAllEventSlugs(): Promise<string[]> {
  return (await allEvents()).map((e) => e.slug);
}

export async function getAllYachtSlugs(): Promise<string[]> {
  return (await allYachts()).map((y) => y.slug);
}

export async function getDealers(region?: DealerRegion): Promise<Dealer[]> {
  const all = await allDealers();
  return region ? all.filter((d) => d.region === region) : all;
}

/**
 * Dealers that have coordinates, i.e. the ones the map can plot. Empty until
 * the real lat/lng list arrives, which is what keeps the map off the live site
 * rather than showing an empty world.
 */
export async function getMappableDealers(): Promise<Dealer[]> {
  return (await allDealers()).filter((d) => d.coordinates);
}

export async function getDealerRegionCounts(): Promise<{
  dealers: number;
  services: number;
  regions: number;
}> {
  const all = await allDealers();
  return {
    dealers: all.filter((d) => d.type === "dealer" || d.type === "both").length,
    services: all.filter((d) => d.type === "service" || d.type === "both").length,
    regions: dealerRegions.length,
  };
}

export async function getOffices(): Promise<Office[]> {
  return (await fetchOffices()) ?? sampleOffices;
}

export async function getHomeContent(): Promise<HomeContent> {
  return (await fetchHomeContent()) ?? sampleHome;
}

export async function getOurWorldContent(): Promise<OurWorldContent> {
  return (await fetchOurWorldContent()) ?? sampleOurWorld;
}

/** The bespoke-interiors block, shown on the home page and on every yacht. */
export async function getBespokeContent(): Promise<BespokeContent> {
  return (await fetchBespoke()) ?? sampleBespoke;
}

/** Privacy policy / KVKK text. Still a legal DRAFT — see `legal.ts`. */
export async function getPrivacyPolicy(): Promise<LegalDocument> {
  return privacyPolicy;
}

/** Placeholder map imagery, shown where a live map has no coordinates yet. */
export async function getMaps(): Promise<MapImages> {
  return (await fetchMaps()) ?? sampleMaps;
}

export * from "./types";
