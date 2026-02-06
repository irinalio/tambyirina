# Touché Artistique

## Overview

Touché Artistique is a wedding figurine customization e-commerce application. Users can either configure standard figurines (choosing hair, outfit, pose, colors) through an interactive studio, or submit fully custom requests with photo uploads for bespoke 1-of-1 creations. The app is a full-stack TypeScript monorepo with a React frontend and Express backend, using PostgreSQL for data persistence.

The content is primarily in French, targeting a French-speaking audience for wedding cake toppers and keepsake figurines.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
- **`client/`** — React single-page application (Vite-powered)
- **`server/`** — Express.js API server
- **`shared/`** — Shared code between client and server (database schema, API route contracts, validation)
- **`migrations/`** — Drizzle-generated database migrations
- **`script/`** — Build tooling

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS variables for theming, custom fonts (Fredoka for display, Nunito for body)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactions
- **Forms**: React Hook Form with Zod resolvers for validation
- **Effects**: canvas-confetti for order success celebrations
- **Icons**: Lucide React

Key pages:
- `/` — Home/landing page with two paths (standard studio vs custom request)
- `/configurator` — Step-by-step figurine builder (hair, skin, outfit, pose selection)
- `/custom` — Photo upload flow for fully personalized figurines

Path aliases configured in both TypeScript and Vite:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript, executed via `tsx` in dev
- **API Design**: Contract-first approach — API routes, methods, input schemas, and response schemas are defined in `shared/routes.ts` using Zod, then implemented in `server/routes.ts`
- **File Uploads**: Multer, saving to `client/public/uploads/` with 5MB limit
- **Dev Server**: Vite dev server middleware integrated into Express for HMR
- **Production Build**: Vite builds the client; esbuild bundles the server into a single CJS file

### Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation bridging
- **Schema Push**: `npm run db:push` uses drizzle-kit to push schema changes directly

### Database Schema (3 tables)
1. **`orders`** — Base order info: customer name, email, type (standard/custom), status, total price in cents, timestamp
2. **`standard_items`** — Standard figurine details: hair style/color, skin color, outfit style/color, pose. References `orders.id`
3. **`custom_requests`** — Custom request details: description text, array of photo URLs. References `orders.id`

### API Contracts (`shared/routes.ts`)
The API uses a typed contract pattern where routes are defined as objects with method, path, input schema, and response schemas:
- `POST /api/orders/standard` — Create a standard configured figurine order
- `POST /api/orders/custom` — Create a custom photo-based order
- `POST /api/upload` — Upload a photo file (returns URL)

### Storage Pattern
The server uses an `IStorage` interface implemented by `DatabaseStorage` class, enabling potential swapping of storage backends. Orders use database transactions to atomically create the order and its details.

### Build Process
- **Dev**: `tsx server/index.ts` with Vite middleware for hot reload
- **Build**: Vite builds client to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Start**: `node dist/index.cjs` serves static files and API in production

## External Dependencies

### Required Services
- **PostgreSQL Database** — Required. Connection string must be provided via `DATABASE_URL` environment variable. The app will crash on startup without it. Uses `connect-pg-simple` for session storage and `pg` Pool for connections.

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit** — Database ORM and migration tooling
- **zod** + **drizzle-zod** — Runtime validation, shared between client and server
- **@tanstack/react-query** — Async state management on the client
- **framer-motion** — Animation library
- **multer** — File upload handling
- **wouter** — Client-side routing
- **canvas-confetti** — Visual celebration effects
- **shadcn/ui ecosystem** — Radix UI primitives, class-variance-authority, clsx, tailwind-merge

### Fonts (External CDN)
- Google Fonts: Fredoka (display), Nunito (body), plus others loaded in index.html (DM Sans, Fira Code, Geist Mono, Architects Daughter)