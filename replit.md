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
  pages/         - All page components
  components/    - Shared components (bottom-nav, ui/)
  hooks/         - Custom hooks
  lib/           - Utilities (queryClient, auth)

server/
  index.ts       - Express server entry point
  routes.ts      - API routes
  storage.ts     - Database storage layer (PostgreSQL via Drizzle)
  seed.ts        - Seed data

shared/
  schema.ts      - Drizzle schemas and Zod validation
```

## Authentication
- Client-side auth via `useAuth()` hook from `client/src/lib/auth.tsx`
- AuthProvider wraps the app in `main.tsx`
- Stores user in localStorage as `sparout_user`
- AuthUser has: id, name, email, role (student/master/parent), optional martialArt, beltRank, age
- /login page has Sign Up and Log In tabs
- Sign Up: name, email, password, role dropdown
- Log In: email lookup across students/masters/parents collections

## Routes (ALL registered in App.tsx)
- `/` — Landing page
- `/discover` — Discover Masters (search + filters)
- `/masters/:id` — Master Profile (full details, classes, reviews, book button)
- `/book/:classId` — Booking Flow
- `/tournaments` — Tournament Hub
- `/tournaments/:id` — Tournament Detail + Registration
- `/login` — Sign Up / Log In (tabbed)
- `/signup` — Legacy signup with role-specific forms
- `/progress` — Student Progress Dashboard (belt rank, classes, stats)
- `/dashboard` — Student Dashboard (alt)
- `/parent-dashboard` — Parent Dashboard
- `/master-dashboard` — Master Dashboard
- `/profile` — User Profile (name, email, role, logout)

## Bottom Nav (5 fixed tabs, always visible)
- Home (`/`)
- Discover (`/discover`)
- Tournaments (`/tournaments`)
- Progress (`/progress`)
- Profile (`/profile`)
- Hidden on: /signup, /login, /book/* routes

## Database Tables
- users, masters, students, parents, classes, bookings, tournaments, tournament_registrations, reviews

## API Endpoints
All prefixed with `/api/`:
- GET/POST /masters, GET /masters/:id
- GET/POST /students, GET /students/:id
- GET/POST /parents
- GET/POST /classes, GET /classes/master/:masterId, GET /classes/:id
- GET/POST /bookings, PATCH /bookings/:id/status
- GET/POST /tournaments, GET /tournaments/:id
- GET /tournaments/:id/registrations, POST /tournament-registrations
- GET /reviews/:masterId, POST /reviews

## QueryKey pattern
Uses `queryKey.join("/")` for URL construction:
- `["/api/masters"]` → `/api/masters`
- `["/api/masters", id]` → `/api/masters/123`

## Seed Data
6 martial arts masters with AI-generated profile photos, 18 classes, 3 tournaments, sample reviews. Auto-seeds on startup if database is empty.
