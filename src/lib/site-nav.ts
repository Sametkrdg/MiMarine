/**
 * Route + label-key definitions shared by the navbar, the mobile menu and the
 * footer, so the three never drift apart. `labelKey` is resolved against the
 * message files at render time.
 */

export const fleetTabs = [
  { href: "/fleet/delivered", labelKey: "delivered" },
  { href: "/fleet/ready-for-delivery", labelKey: "readyForDelivery" },
  { href: "/fleet/in-production", labelKey: "inProduction" },
] as const;

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
  contact: "/contact",
} as const;

/** Flat list used by the mobile drawer, in the order the design shows them. */
export const mobileLinks = [
  ...fleetTabs.map((t) => ({ href: t.href, ns: "fleetTabs", key: t.labelKey })),
  { href: primaryRoutes.ourWorld, ns: "nav", key: "ourWorld" },
  { href: primaryRoutes.news, ns: "nav", key: "newsAndEvents" },
  { href: primaryRoutes.network, ns: "nav", key: "network" },
  { href: primaryRoutes.contact, ns: "nav", key: "contact" },
] as const;
