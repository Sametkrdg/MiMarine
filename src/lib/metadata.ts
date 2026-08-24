import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/**
 * Builds a per-page `<title>`, which the locale layout then feeds through the
 * `%s · MiMarine Yacht` template.
 */
export async function pageMetadata(
  locale: string,
  namespace: string,
  key = "title",
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  return { title: t(key) };
}
