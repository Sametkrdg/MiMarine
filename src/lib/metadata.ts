import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

/** Joins a locale and a locale-less path into a site-absolute pathname. */
function localised(locale: string, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Canonical + hreflang set for one page.
 *
 * Pathnames are identical across locales (no localised slugs), so the
 * alternates are derived rather than stored.
 */
export function alternates(locale: string, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localised(l, path);
  }
  languages["x-default"] = localised(routing.defaultLocale, path);

  return { canonical: localised(locale, path), languages };
}

/**
 * Builds a per-page `<title>` — which the locale layout feeds through the
 * `%s · MimarineYacht` template — plus its canonical and hreflang links.
 */
export async function pageMetadata(
  locale: string,
  namespace: string,
  key: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t(key);

  return {
    title,
    alternates: alternates(locale, path),
    openGraph: { title, url: localised(locale, path) },
  };
}

/** Same, for detail pages whose title comes from content rather than messages. */
export function contentMetadata(
  locale: string,
  title: string,
  path: string,
  description?: string,
): Metadata {
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: { title, description, url: localised(locale, path) },
  };
}
