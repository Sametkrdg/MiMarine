import type { MetadataRoute } from "next";
import { getAllEventSlugs, getAllYachtSlugs } from "@/content";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

/** Locale-less paths that exist for every locale. */
const staticPaths = [
  "/",
  "/fleet/delivered",
  "/fleet/ready-for-delivery",
  "/fleet/in-production",
  "/our-world",
  "/news-and-events",
  "/dealer-and-services-network",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const [yachtSlugs, eventSlugs] = await Promise.all([
    getAllYachtSlugs(),
    getAllEventSlugs(),
  ]);

  const paths = [
    ...staticPaths,
    ...yachtSlugs.map((slug) => `/fleet/${slug}`),
    ...eventSlugs.map((slug) => `/news-and-events/${slug}`),
  ];

  // Every path is emitted once per locale, each entry cross-linking the others
  // so search engines see the pair rather than two unrelated pages.
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${base}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${base}/${l}${path === "/" ? "" : path}`,
          ]),
        ),
      },
    })),
  );
}
