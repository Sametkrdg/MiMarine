/**
 * Route + label-key definitions shared by the navbar, the mobile menu and the
 * footer, so the three never drift apart. `labelKey` is resolved against the
 * message files at render time.
 */

import type { DealerRegion, YachtStatus } from "@/content/types";

export const fleetTabs: {
  href: string;
  status: YachtStatus;
  labelKey: string;
}[] = [
  { href: "/fleet/delivered", status: "delivered", labelKey: "delivered" },
  {
    href: "/fleet/ready-for-delivery",
    status: "ready-for-delivery",
    labelKey: "readyForDelivery",
  },
  { href: "/fleet/in-production", status: "in-production", labelKey: "inProduction" },
];

export const newsSections = [
  { href: "/news-and-events#upcoming", labelKey: "upcoming" },
  { href: "/news-and-events#past", labelKey: "past" },
] as const;

export const primaryRoutes = {
  home: "/",
  fleet: "/fleet",
  ourWorld: "/our-world",
  news: "/news-and-events",
  network: "/dealer-and-services-network",
  preOrder: "/pre-order",
  contact: "/contact",
} as const;

/** Query key used by the network page's region filter. */
export const REGION_PARAM = "region";

export function regionHref(region: DealerRegion): string {
  return `${primaryRoutes.network}?${REGION_PARAM}=${region}`;
}

/** Flat list used by the mobile drawer, in the order the design shows them. */
export const mobileLinks = [
  ...fleetTabs.map((t) => ({ href: t.href, ns: "fleetTabs", key: t.labelKey })),
  { href: primaryRoutes.ourWorld, ns: "nav", key: "ourWorld" },
  { href: primaryRoutes.news, ns: "nav", key: "newsAndEvents" },
  { href: primaryRoutes.network, ns: "nav", key: "network" },
  { href: primaryRoutes.preOrder, ns: "nav", key: "preOrder" },
  { href: primaryRoutes.contact, ns: "nav", key: "contact" },
] as const;
