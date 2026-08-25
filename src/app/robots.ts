import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing user-facing lives under /api; keep it out of the index.
      disallow: "/api/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
