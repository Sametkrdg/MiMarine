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
    /*
     * Bounded on purpose. The defaults are five attempts with a long timeout
     * each, so a brief network blip turned into ~50 seconds of a hanging page
     * before the fallback ran. Measured steady-state latency to Sanity is
     * 66-250 ms, so five seconds is roughly twenty times the headroom while
     * capping a total outage at about ten seconds per query.
     */
    timeout: 5_000,
    maxRetries: 1,
    retryDelay: () => 250,
  });

  return cached;
}
