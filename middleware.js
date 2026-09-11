import { NextResponse } from "next/server";
import { CITIES } from "./lib/cities";

// Runs on Vercel's Edge Network. `req.geo` is populated automatically
// on Vercel — no third-party geolocation API needed.
export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only step in on the bare root. Every other path already carries
  // its own city slug, so leave it alone.
  if (pathname !== "/") return NextResponse.next();

  const geoCity = req.geo?.city?.toLowerCase().replace(/\s+/g, "-");
  const match = CITIES.find((c) => c.slug === geoCity);

  if (match) {
    const url = req.nextUrl.clone();
    url.pathname = `/${match.slug}`;
    return NextResponse.redirect(url);
  }

  // No confident match (local dev, unsupported city, geo blocked) —
  // fall through to the root page, which renders a manual city picker.
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
