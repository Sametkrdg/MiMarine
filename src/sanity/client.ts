import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId, readToken } from "./env";

let cached: SanityClient | null = null;

/**
 * Read-only Sanity client, or null when the project is not configured yet.
 *
 * `useCdn` is off so editors see their changes as soon as the route
 * revalidates, rather than waiting on the CDN's own cache.
 */
export function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (cached) return cached;

  cached = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
    token: readToken || undefined,
  });

  return cached;
}
