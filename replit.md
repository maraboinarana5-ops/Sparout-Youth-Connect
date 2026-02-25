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
  pages/         - All page components (landing, discover, master-profile, booking, tournaments, tournament-detail, signup, dashboard, profile)
  components/    - Shared components (bottom-nav, ui/)
  hooks/         - Custom hooks
  lib/           - Utilities (queryClient)

server/
  index.ts       - Express server entry point
  routes.ts      - API routes
  storage.ts     - Database storage layer (PostgreSQL via Drizzle)
  seed.ts        - Seed data (6 masters, 3 students, 18 classes, 3 tournaments, reviews)

shared/
  schema.ts      - Drizzle schemas and Zod validation
```

## Database Tables
- users, masters, students, parents, classes, bookings, tournaments, tournament_registrations, reviews

## Key Features
- Landing page with role-based entry (Student, Master, Parent)
- Discover Masters with search and filters (style, price)
- Master profiles with classes, stats, and reviews
- Class booking flow with confirmation
- Tournament hub with filtering by martial art
- Tournament registration with weight class and waiver
- Student dashboard with belt progress, stats, achievements
- Profile page with account management
- Bottom navigation bar (Home, Discover, Tournaments, Progress, Profile)

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
