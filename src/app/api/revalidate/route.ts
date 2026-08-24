import { NextResponse } from "next/server";

/**
 * Sanity webhook target for on-demand revalidation.
 *
 * NOT WIRED UP YET — waits on the Sanity project and a shared secret
 * (see MANUEL.md). Kept as a stub so the route exists in the URL space and
 * can be registered in Sanity ahead of the integration work in phase 2.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "SANITY_REVALIDATE_SECRET is not set." },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // TODO(phase-2): map the Sanity document type to the tags/paths to refresh.
  return NextResponse.json(
    { error: "Revalidation is not implemented yet." },
    { status: 501 },
  );
}
