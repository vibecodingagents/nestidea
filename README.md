# NestIdea — Solar Water Heater Cleaning

A full booking site for a solar water heater cleaning business: a
service page with real content, customer accounts, address-based
booking, and an admin dashboard that works like a lightweight CRM
(view every booking, update its status, edit the homepage copy).

Next.js 14 (App Router) + Tailwind, NextAuth (credentials login),
and Prisma for the database.

## Stack

- **Next.js 14** — App Router, server components, route handlers as
  the API
- **Prisma + SQLite** — local dev database, one schema file, zero
  external service needed to get started
- **NextAuth (credentials)** — email/password login for both
  customers and the admin; JWT sessions carry a `role` field
- **bcryptjs** — password hashing (pure JS, no native build step)
- **Tailwind CSS** — same design tokens as your marketing site
  (`brand` blue from the logo, `ink`/`mist`/`paper` neutrals)

## Set up locally

```bash
npm install
cp .env.example .env        # then edit ADMIN_EMAIL / ADMIN_PASSWORD
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

`npm install` runs `prisma generate` automatically (via
`postinstall`). **This step needs internet access to download
Prisma's query engine** — it will fail in a fully offline or
firewalled environment, but works normally on your machine or on
Vercel.

Open `http://localhost:3000`. Log in at `/login` with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env` to reach the
admin dashboard, or sign up as a customer at `/signup` to try the
booking flow.

## What's where

```
/                     → service page (hero + description + plans), content from DB
/signup, /login       → customer + admin auth (shared login form, role decides where it sends you)
/book                 → booking form: plan, date, time, address, notes — requires login
/account              → customer's own bookings + status
/admin                → CRM dashboard — every booking, inline status updates
/admin/content        → edit the homepage hero title/subtitle/description
```

- `prisma/schema.prisma` — the four models: `User` (with a
  `CUSTOMER`/`ADMIN` role), `Plan`, `Booking`, and `SiteContent`
  (a single editable row for homepage copy).
- `prisma/seed.js` — creates the admin account, default homepage
  copy, and three starter plans (panel clean, descaling, full
  service). Edit the plans here, or add a `/admin/plans` page later
  the same way `/admin/content` works.
- `middleware.js` — blocks `/admin/*` unless the signed-in user has
  `role: ADMIN`, and blocks `/book` and `/account` unless someone is
  signed in at all.
- `app/api/` — every write goes through a route handler that checks
  the session server-side before touching the database (never trust
  the client for the role check).

## Deploying it for real

SQLite is great for local dev but **won't persist reliably on
Vercel** (serverless functions get an ephemeral filesystem). For
production:

1. Get a hosted Postgres database — Neon, Supabase, and Vercel
   Postgres all have workable free tiers.
2. In `prisma/schema.prisma`, change the datasource provider from
   `"sqlite"` to `"postgresql"`.
3. Set `DATABASE_URL` in Vercel's project environment variables to
   your hosted connection string.
4. Set `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   and `NEXTAUTH_URL` (your live domain) in Vercel too.
5. Push to GitHub, import into Vercel, deploy. Run
   `npx prisma migrate deploy` against the production database once
   (Vercel's build step can do this automatically if you add it to
   the build command: `prisma generate && prisma migrate deploy && next build`).
6. Run the seed script once against production (`npm run db:seed`
   with production `DATABASE_URL` set locally) to create your real
   admin account — then change that password immediately.

## Natural next steps

- **Email notifications** — customer gets a confirmation email when
  status changes to `Confirmed`/`Completed` (Resend or Postmark are
  simple to wire into the `PATCH /api/admin/bookings` handler).
- **Payments** — currently bookings are "pay the technician on
  visit." Adding Razorpay/Stripe would mean collecting payment at
  the end of `/book`.
- **Editable plans from `/admin`** — right now plans are seeded;
  a `/admin/plans` page following the same pattern as
  `/admin/content` would let you add/edit/remove plans without
  touching code.
- **Multiple technicians / assignment** — right now a booking is
  just "assigned to the business." A `Technician` model and an
  assignment field on `Booking` would let the admin dashboard
  dispatch jobs.
