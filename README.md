# NestIdea

A home-services marketplace starter (à la Urban Company), built for
`nestidea.com`. City-based URL routing, service categories, service
detail pages, and a working booking-flow UI. Next.js 14 (App Router)
+ Tailwind CSS, no backend required to run it — all data is in
`lib/`, ready to be swapped for a real database.

## Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. On localhost, geolocation isn't
available, so you'll land on the manual city picker — click a city
to continue.

## URL structure

```
/                                    → hero + manual city picker
/bangalore                           → city homepage (categories)
/bangalore/cleaning                  → services within a category
/bangalore/cleaning/full-home-cleaning        → service detail
/bangalore/cleaning/full-home-cleaning/book   → booking flow
```

Same pattern as Urban Company's `/city` and `/city-service` URLs,
just nested (`/city/category/service`) instead of hyphen-flattened —
easier to maintain and still reads cleanly.

## How the city redirect works

`middleware.js` runs on Vercel's Edge Network. When someone hits the
bare root (`nestidea.com`), it reads `req.geo.city` (populated
automatically by Vercel — no third-party geolocation API or key
needed) and redirects to `/that-city` if it's in your supported
list. If there's no confident match, it falls through to the root
page's manual picker instead of guessing.

This **only works when deployed to Vercel** — `req.geo` isn't
populated in local dev or on other hosts, which is why local dev
always shows the picker.

## Where to edit things

- `lib/cities.js` — supported cities. Add a city here and it's
  automatically live at `/that-slug` (routes are dynamic).
- `lib/catalog.js` — categories and services, with pricing/duration/
  rating. This is the part you'll want to move to a real database
  (Postgres via Supabase/Neon is a good free-tier fit) once you're
  past the prototype stage.
- `components/BookingForm.js` — the 3-step booking UI (time → address
  → confirm). Right now "Confirm booking" just flips local state to
  a confirmation screen — wire it to a real API route
  (`app/api/bookings/route.js`) and a database/notification service
  when you're ready to take real bookings.
- `tailwind.config.js` — color and font tokens (`ink`, `sand`, `clay`,
  `moss`, plus the `display`/`body` font families).

## Deploying to nestidea.com

1. Push this project to a GitHub repo.
2. Import it in Vercel (vercel.com/new) — it auto-detects Next.js,
   no config needed.
3. In the Vercel project's Domains settings, add `nestidea.com` and
   `www.nestidea.com`, then point your domain's DNS to Vercel per
   their on-screen instructions (an A record or CNAME, depending on
   your registrar).
4. Deploy. The `middleware.js` geo-redirect will start working
   automatically once it's live on Vercel's edge network — nothing
   extra to configure.

## What's still a prototype

- **No real backend** — services/pricing live in a JS file, bookings
  aren't persisted anywhere.
- **No auth** — no customer accounts or professional-side dashboard.
- **No payments** — booking flow stops at "confirm," no payment
  step wired in.
- **No professional-matching logic** — a real version needs a way to
  assign/notify a professional for each booking.

These are the natural next milestones once the core browsing/booking
flow feels right.
