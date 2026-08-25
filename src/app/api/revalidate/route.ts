import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { routing } from "@/i18n/routing";

/**
 * Sanity webhook target.
 *
 * Sanity signs each delivery; `parseBody` verifies that signature against
 * SANITY_REVALIDATE_SECRET, so an unsigned or forged POST is rejected before
 * anything is revalidated.
 *
 * Register it in Sanity under API → Webhooks:
 *   URL     <site>/api/revalidate
 *   Trigger on  create · update · delete
 *   Secret  the same value as SANITY_REVALIDATE_SECRET
 */

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string } | string;
};

/** Locale-less paths that a change of this document type affects. */
function pathsFor(payload: WebhookPayload): string[] {
  const slug =
    typeof payload.slug === "string" ? payload.slug : payload.slug?.current;

  switch (payload._type) {
    case "yacht":
      return [
        "/",
        "/fleet/delivered",
        "/fleet/ready-for-delivery",
        "/fleet/in-production",
        ...(slug ? [`/fleet/${slug}`] : []),
      ];
    case "event":
      return ["/", "/news-and-events", ...(slug ? [`/news-and-events/${slug}`] : [])];
    case "dealerLocation":
      return ["/dealer-and-services-network"];
    case "homePage":
      return ["/"];
    case "ourWorldPage":
      return ["/our-world"];
    case "siteSettings":
      return ["/", "/contact"];
    default:
      // Unknown type: refresh the entry points rather than guessing.
      return ["/"];
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: WebhookPayload | null;
  let isValidSignature: boolean | null;
  try {
    ({ body, isValidSignature } = await parseBody<WebhookPayload>(request, secret));
  } catch (error) {
    console.error("[revalidate] could not read the webhook body:", error);
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (!isValidSignature) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  if (!body?._type) {
    return NextResponse.json({ error: "missing_type" }, { status: 422 });
  }

  // Each affected path exists once per locale.
  const paths = pathsFor(body).flatMap((path) =>
    routing.locales.map((locale) => (path === "/" ? `/${locale}` : `/${locale}${path}`)),
  );

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: paths.length, paths });
}
