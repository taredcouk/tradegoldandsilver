import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "tradegoldandsilver.online";

export function middleware(request: NextRequest) {
  // The reverse proxy may set the internal container host as `Host`, so
  // prefer the original public host when it is forwarded.
  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",", 1)[0]
    .trim();
  const requestHost = (forwardedHost ?? request.headers.get("host") ?? "")
    .split(":", 1)[0]
    .toLowerCase();

  if (requestHost === `www.${CANONICAL_HOST}`) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname = CANONICAL_HOST;
    canonicalUrl.port = "";

    return NextResponse.redirect(canonicalUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Apply the host redirect to public URLs while avoiding Next.js internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
