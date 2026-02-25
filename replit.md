# Sparout - Youth Martial Arts Platform

## Overview
Sparout is a mobile-first web application connecting youth martial arts students with verified masters, empowering parents with monitoring tools, and organizing tournaments across all disciplines.

## Tech Stack
- **Frontend:** React + Vite + TypeScript, Tailwind CSS, Shadcn UI, Wouter (routing), TanStack Query
- **Backend:** Express.js + TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Custom theme with primary orange (#FF6B35), secondary navy (#1B2A4A), Plus Jakarta Sans font

## Project Structure
```
client/src/
  pages/         - All page components (landing, discover, master-profile, booking, tournaments, tournament-detail, signup, dashboard, parent-dashboard, master-dashboard, profile)
  components/    - Shared components (bottom-nav, ui/)
  hooks/         - Custom hooks
  lib/           - Utilities (queryClient, auth)

server/
  index.ts       - Express server entry point
  routes.ts      - API routes
  storage.ts     - Database storage layer (PostgreSQL via Drizzle)
  seed.ts        - Seed data (6 masters, 3 students, 18 classes, 3 tournaments, reviews)

shared/
  schema.ts      - Drizzle schemas and Zod validation
```

## Authentication
- Client-side auth via `useAuth()` hook from `client/src/lib/auth.tsx`
- AuthProvider wraps the app in `main.tsx`
- Stores user in localStorage as `sparout_user`
- AuthUser has: id, name, email, role (student/master/parent), optional martialArt, beltRank, age
- Signup flow: on success, calls `login()` to persist user session, then redirects to role-appropriate dashboard
- Profile page shows login prompt for unauthenticated users, logout button for authenticated users

## Database Tables
- users, masters, students, parents, classes, bookings, tournaments, tournament_registrations, reviews

## Key Features
- Landing page with role-based entry (Student, Master, Parent) — header shows "Dashboard" when logged in
- Discover Masters with search and filters (style, price)
- Master profiles with classes, stats, and reviews
- Class booking flow with confirmation
- Tournament hub with filtering by martial art
- Tournament registration with weight class and waiver
- Student dashboard with belt progress, upcoming classes, recommended masters
- Parent dashboard with child monitoring, verified masters, schedules, upcoming tournaments
- Master dashboard with class management, bookings, quick actions
- Profile page with role-aware sections and logout
- Bottom navigation bar — role-aware (different items for student/master/parent/unauthenticated)

## Bottom Nav Behavior
- Unauthenticated: Home, Discover, Tournaments, Join
- Student: Home, Discover, Tournaments, Progress, Profile
- Master: Home, Dashboard, Tournaments, Profile
- Parent: Home, Monitor, Discover, Profile
- Hidden on: /signup, /book/* routes

## Routes
- `/` — Landing
- `/discover` — Discover Masters
- `/masters/:id` — Master Profile
- `/book/:classId` — Booking Flow
- `/tournaments` — Tournament Hub
- `/tournaments/:id` — Tournament Detail
- `/signup` — Signup (role selection + form)
- `/dashboard` — Student Dashboard
- `/parent-dashboard` — Parent Dashboard
- `/master-dashboard` — Master Dashboard
- `/profile` — Profile

## API Endpoints
All prefixed with `/api/`:
- GET/POST /masters, GET /masters/:id
- GET/POST /students, GET /students/:id
- GET/POST /parents
- GET/POST /classes, GET /classes/master/:masterId
- GET/POST /bookings, PATCH /bookings/:id/status
- GET/POST /tournaments, GET /tournaments/:id
- GET /tournaments/:id/registrations, POST /tournament-registrations
- GET /reviews/:masterId, POST /reviews

## Seed Data
6 martial arts masters (Karate, Taekwondo, Jiu-Jitsu, Boxing, MMA, Muay Thai) with AI-generated profile photos, 18 classes, 3 tournaments, and sample reviews. Auto-seeds on startup if database is empty.
