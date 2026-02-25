# Sparout - India's Premier Martial Arts Marketplace

## Overview
Sparout is a mobile-first web application connecting martial arts students with verified masters, empowering parents with monitoring tools, and organizing tournaments across 14+ disciplines. India-focused with INR pricing.

## Tech Stack
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS with custom brand theme
- **Brand Colors:** Navy #0A1628, Orange #FF6B2B, Gold #FFB800
- **Font:** Inter (system-ui fallback)
- **Icons:** lucide-react, react-icons/si (company logos)

## Project Structure
```
app/
  page.tsx                  - Homepage (hero, stats, featured masters, events, partners)
  layout.tsx                - Root layout (navbar, footer, mobile-nav)
  globals.css               - Tailwind base + CSS variables
  not-found.tsx             - 404 page
  (auth)/
    login/page.tsx          - Login page
    signup/page.tsx         - 3-step signup (info → role → done)
    onboarding/page.tsx     - Post-signup profile completion
  masters/page.tsx          - Master directory with search/filters
  master/[username]/page.tsx - Individual master profile
  student/[username]/page.tsx - Student profile (journey timeline)
  events/page.tsx           - Events listing
  events/[id]/page.tsx      - Event detail
  bookings/page.tsx         - Booking form (linked from master profile)
  partners/page.tsx         - Partner federations
  about/page.tsx            - About Sparout
  contact/page.tsx          - Contact form
  settings/page.tsx         - Account settings (profile, password, notifications)
  dashboard/parent/page.tsx - Parent dashboard
  admin/
    page.tsx                - Admin dashboard (stats, recent users, pending verifications)
    users/page.tsx          - User management table
    masters/page.tsx        - Master verification & featuring
    events/page.tsx         - Event CRUD
    federations/page.tsx    - Federation management
  api/
    health/route.ts         - Health check endpoint

components/
  navbar.tsx                - Dark navy top navbar (desktop + mobile hamburger)
  footer.tsx                - Footer (desktop only, hidden on mobile)
  mobile-nav.tsx            - Fixed bottom mobile navigation (z-[9999])

shared/
  schema.ts                 - Drizzle ORM schemas (users, master_profiles, student_profiles, etc.)

lib/
  db.ts                     - Drizzle database client
```

## User Roles
- **Student** - Browse masters, book sessions, track martial arts journey
- **Master** - Profile with styles, pricing, schedule, certifications
- **Parent** - Manage children's training, view progress, book sessions
- **Admin** - Platform management (verify masters, manage events, user admin)

## Key Features
- Username-based routing for masters: `/master/[username]`
- Username-based routing for students: `/student/[username]`
- Pricing in INR (₹)
- Mobile-first with bottom navigation (fixed bottom-0 z-[9999])
- Desktop: navbar + footer, pb-0
- Mobile: navbar + bottom nav, pb-20 on main content
- 3-step booking flow linked from master profile
- Ring Fight federation partner (https://singular-frangipane-2925f4.netlify.app/)

## Database Schema (shared/schema.ts)
Tables: users, master_profiles, student_profiles, martial_arts_journey, bookings, events, federations, reviews, notifications
- All use varchar IDs with gen_random_uuid()
- Enums: user_role (master, student, parent, admin), booking_status (pending, confirmed, completed, cancelled)

## Configuration
- `next.config.mjs` - ESM format (package.json has "type": "module")
- `postcss.config.mjs` - ESM format
- `tailwind.config.ts` - Brand colors, CSS variables for shadcn compatibility
- Workflow: `next dev -p 5000`
