/**
 * Content accessors.
 *
 * Pages import ONLY from here. Today every function reads `sample-data.ts`;
 * in phase 2 each body becomes a GROQ query against Sanity and no page has to
 * change. That is the whole point of the indirection — keep it.
 */

import { notFound } from "next/navigation";
import { dealers, events, home, offices, ourWorld, yachts } from "./sample-data";
import type {
  Dealer,
  DealerRegion,
  EventItem,
  HomeContent,
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

const byOrder = (a: Yacht, b: Yacht) => a.order - b.order;

export async function getYachts(status?: YachtStatus): Promise<Yacht[]> {
  const list = status ? yachts.filter((y) => y.status === status) : yachts;
  return [...list].sort(byOrder);
}

export async function getYachtBySlug(slug: string): Promise<Yacht | null> {
  return yachts.find((y) => y.slug === slug) ?? null;
}

/** Throws Next's not-found when the slug does not resolve. */
export async function getYachtOrNotFound(slug: string): Promise<Yacht> {
  const yacht = await getYachtBySlug(slug);
  if (!yacht) notFound();
  return yacht;
}

export async function getFeaturedYacht(): Promise<Yacht | null> {
  return yachts.find((y) => y.featured) ?? yachts[0] ?? null;
}

/** Count per status, for the fleet tabs and the navbar dropdown. */
export async function getYachtCounts(): Promise<Record<YachtStatus, number>> {
  return {
    delivered: yachts.filter((y) => y.status === "delivered").length,
    "ready-for-delivery": yachts.filter((y) => y.status === "ready-for-delivery")
      .length,
    "in-production": yachts.filter((y) => y.status === "in-production").length,
  };
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((e) => isUpcoming(e, today))
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events
    .filter((e) => !isUpcoming(e, today))
    .sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getEventOrNotFound(slug: string): Promise<EventItem> {
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  return event;
}

export async function getAllEventSlugs(): Promise<string[]> {
  return events.map((e) => e.slug);
}

export async function getAllYachtSlugs(): Promise<string[]> {
  return yachts.map((y) => y.slug);
}

export async function getDealers(region?: DealerRegion): Promise<Dealer[]> {
  return region ? dealers.filter((d) => d.region === region) : dealers;
}

export async function getDealerRegionCounts(): Promise<{
  dealers: number;
  services: number;
  regions: number;
}> {
  return {
    dealers: dealers.filter((d) => d.type === "dealer" || d.type === "both").length,
    services: dealers.filter((d) => d.type === "service" || d.type === "both").length,
    regions: dealerRegions.length,
  };
}

export async function getOffices(): Promise<Office[]> {
  return offices;
}

export async function getHomeContent(): Promise<HomeContent> {
  return home;
}

export async function getOurWorldContent(): Promise<OurWorldContent> {
  return ourWorld;
}

export * from "./types";
