import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Sanity Studio, served from the site itself so editors need no separate
 * deployment. Kept out of the [locale] tree — it has its own chrome and is
 * not part of the public site.
 */

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
