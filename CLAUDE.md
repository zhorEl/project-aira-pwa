# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

The app is **scaffolded and building**. Full UI for every route in `Scaffold.md` is implemented on mock data.

Stack: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Mapbox GL · Recharts · Framer Motion · lucide-react · next-themes**. Supabase (`@supabase/ssr`) is scaffolded in `src/lib/supabase/` but the UI runs entirely on mock data from `src/lib/mock-data.ts` (deterministic PRNG so SSR/client match). No tests yet.

Commands:
- `npm run dev` — dev server (http://localhost:3000, `/` → `/dashboard`)
- `npm run build` — production build (typechecks all routes)
- `npm run lint` — ESLint

Env (`.env.local`, optional — UI degrades gracefully without them): `NEXT_PUBLIC_MAPBOX_TOKEN` (map falls back to a stylized SVG when absent — see `src/components/map/map-fallback.tsx`), `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

> npm note: the user's `~/.npm` cache has root-owned files (EACCES). Install with `npm install --cache <writable-dir>` until they run `sudo chown -R 501:20 ~/.npm`.

Directory layout:
- `src/app/(public)/` — login, forgot-password, unauthorized (auth shell, no sidebar)
- `src/app/(app)/` — authenticated shell (`AppShell` = sidebar + topbar); all feature modules live here
- `src/components/ui/` — primitives (button, card, badge, input, table, tabs, dropdown, avatar, misc)
- `src/components/shared/` — PageHeader, StatCard, Toolbar, StatusBadge
- `src/components/shell/` — sidebar, topbar, tenant-switcher, command-palette, logo
- `src/components/map/` — CoffeeMap (Mapbox), MapFallback, LayerControl
- `src/components/charts/` — Recharts wrappers
- `src/lib/` — utils, types, mock-data, navigation, supabase/

Design system: HSL CSS-var tokens in `globals.css` (light + dark), coffee/leaf brand palette + semantic colors in `tailwind.config.ts`. Fonts: Inter (sans), Sora (display), JetBrains Mono. Dark mode via `next-themes` (`class` strategy).

## What this project is

AIRA Nexus is a coffee agriculture intelligence platform. This directory (`PWA`) is the **web application** — the operational and intelligence platform for the Project Management Team (PMT), cooperatives, administrators, and decision-makers. It is distinct from a separate mobile app: the web platform focuses on monitoring, analytics, administration, reporting, and decision support rather than field data capture.

The **primary dashboard is an interactive GIS map**. Mapping/geospatial concerns (layers, heatmaps, polygon boundaries, GPS coordinates) are central to the architecture, not a side feature — most modules surface their data on or through the map.

## Domain model (the big picture)

The data and feature modules form a hierarchy that recurs across the UI. Understanding it makes the route structure and module list self-explanatory:

- **Farmer** → owns one or more **Farms**. Farmers carry certifications, trainings, documents, production summaries, and a timeline.
- **Farm** → has GPS coordinates, a polygon boundary, coffee variety, elevation, area, tree count, production records, images, and an activity timeline. Farms are the core geospatial entity on the map.
- **Cooperative** → groups farmers/farms; has members, production summaries, a coverage map, intervention history, and reports.
- **Value chain** actors (buyers, traders, processors, roasters, nurseries, service providers) connect to farms/cooperatives downstream.
- **Monitoring** rolls the above up administratively by geography: municipality → barangay → cooperative → field staff, plus a validation queue.
- **Analytics / Reports** aggregate everything (production, variety distribution, heatmaps, productivity, density, rankings, data quality) and export to PDF/Excel/CSV.

Geography (municipality, barangay) and the validation/verification workflow are cross-cutting: many modules have a validation/verification step and a geographic grouping.

## Access control & multi-tenancy

The app is **multi-tenant with ABAC** (attribute-based access control). Administration covers users, roles, ABAC policies, tenants, and organizations. Treat tenant scoping and ABAC as foundational — features generally operate within a tenant/organization boundary, and `(public)` routes (login, forgot-password, unauthorized) sit outside the authenticated shell. Build new features tenant-aware and permission-gated by default.

## Intended route structure

From `Scaffold.md`, routes are grouped under `app/` (a route-group convention consistent with Next.js App Router, e.g. the `(public)` group):

- `(public)`: `login`, `forgot-password`, `unauthorized`
- `dashboard` (default landing page — the interactive map)
- `map`
- `farmers`: `list`, `profile`, `create`, `verification`
- `farms`: `list`, `details`, `boundaries`, `activities`, `production`
- `cooperatives`: `list`, `profile`, `members`, `reports`
- `value-chain`: `buyers`, `traders`, `processors`, `roasters`, `nurseries`, `service-providers`
- `monitoring`: `municipality`, `barangay`, `production`, `interventions`, `field-status`
- `analytics`, `reports`, `documents`
- `users`, `organizations`, `tenants` (administration)
- `settings`, `audit`

Top-level navigation: Dashboard, Map, Farmers, Farms, Cooperatives, Monitoring, Analytics, Reports, Administration, Settings.

## Source of truth

`Scaffold.md` is the authoritative spec for modules, features, and routes until real code exists. When implementing, follow its module/feature breakdown (dashboard components, per-module feature lists, export formats, settings categories) rather than re-deriving scope. Keep this file in sync as the architecture solidifies.
