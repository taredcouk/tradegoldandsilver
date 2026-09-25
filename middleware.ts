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

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com ${isDev ? "'unsafe-eval'" : ""}`.trim(),
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.bullionvault.com",
    `style-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-inline'" : ""}`,
    // Framer Motion writes presentation styles as attributes; scripts remain
    // nonce-only in production.
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.bullionvault.com",
    "font-src 'self' data:",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Apply the host redirect to public URLs while avoiding Next.js internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
