# Current feature
<!-- Feature name and short description -->

## Status
Completed

## Goals

<!-- Goals and requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

### 2026-08-07 — Next.js initial setup

- Created the project with `create-next-app` (Next.js 16.3.0, React 19.2, TypeScript, Tailwind CSS v4).
- Removed default create-next-app boilerplate from the landing page (`src/app/page.tsx` now renders a bare DevStash heading).
- Cleaned up the default Next.js SVGs from `public/`.
- Repo initialized on `master` with `Initial commit from Create Next App`.

### 2026-08-18 — Dashboard UI Phase 1 started

- Added Dashboard UI Phase 1 as the current feature (status: In Progress).
- Scope: ShadCN init, `/dashboard` route, dark-mode default layout, top bar (search + new item, display only), Sidebar/Main placeholders.

### 2026-08-18 — Dashboard UI Phase 1 completed

- Initialized ShadCN (base-nova/Base UI preset); installed `button` and `input` components.
- Added `/dashboard` route with a full-height left sidebar (DevStash logo spot + "Sidebar" placeholder) and a right column containing the top bar + "Main" placeholder.
- Top bar: search input (left) and two outlined display-only buttons — "New Collection" and "New Item" (right).
- Dark mode set as default via `class="dark"` on `<html>` in `src/app/layout.tsx`; all colors use shadcn dark tokens.
- `npm run build` passes; `/dashboard` prerenders as static. Changes on branch `feature/dashboard-phase-1` (uncommitted).

### 2026-08-18 — Dashboard UI Phase 2 completed

- Replaced the placeholder sidebar with a real collapsible sidebar (`src/components/dashboard/dashboard-sidebar.tsx`).
- Types section links each `mockItemType` to `/items/<slug>` with its colored lucide icon.
- Added Favorites and Recent collection sections (favorites = `isFavorite`; recent = remaining as a stand-in).
- User avatar area (initials avatar, name, email, settings gear) pinned to the sidebar bottom.
- Top bar gained a `PanelLeft` drawer toggle; desktop collapses to a 60px icon rail, mobile opens an overlay drawer with backdrop (click/Esc to close, body scroll locked).
- Split sidebar into `section-heading.tsx`, `sidebar-link.tsx`, and `type-slug.ts` for separation of concerns.
- Sidebar sections (Types, Favorites, Recent) made individually collapsible via a chevron toggle.
- `npm run build` and `npm run lint` pass clean.

### 2026-08-18 — Dashboard UI Phase 3 started

- Added Dashboard UI Phase 3 as the current feature (status: In Progress).
- Scope: main area to the right, recent collections, pinned items, 10 recent items, and 4 stats cards (items, collections, favorite items, favorite collections).
- References: @context/features/dashboard-phase-3-spec.md, @context/screenshots/dashboard-ui-main.png, @src/lib/mock-data.js.

### 2026-08-18 — Dashboard UI Phase 3 completed

- Built the dashboard main content area (server-rendered) replacing the placeholder: 4 stat cards (items, collections, favorite items, favorite collections), recent collections grid, pinned items, and 10 most recent items (sorted by `createdAt`).
- Added shadcn `card` and `badge` components (Base UI variant).
- Refactored the dashboard route to SSR-first: `page.tsx` is a server component; interactive state (sidebar drawer/collapse, toolbar toggle, Escape handler) extracted into a client `DashboardShell`; main content passed as `children` so it stays server-rendered.
- `npm run build` and `npm run lint` pass clean.

### 2026-08-20 — Database setup started

- Added Prisma + Neon PostgreSQL setup as the current feature (status: In Progress).
- Scope: Neon serverless Postgres, initial Prisma 7 schema (User, Item, ItemType, Collection, Tag, ItemTag + NextAuth models), indexes/cascade deletes, migrations-only workflow.
- References: @context/features/database-spec.md, @context/project-overview.md.

### 2026-08-20 — Database setup completed

- Installed Prisma 7.9.1 (`prisma`, `@prisma/client`) with the Neon serverless driver (`@prisma/adapter-neon` + `@neondatabase/serverless`); added `"type": "module"` per Prisma 7 ESM requirements.
- Prisma 7 breaking changes handled: new `prisma.config.ts` at root (CLI datasource URL + optional shadow DB, dotenv-loaded), `prisma-client` generator with required output to `src/generated/prisma`, mandatory driver adapter, explicit `prisma generate`/`prisma db seed` (no longer auto-run), seed via `tsx prisma/seed.ts`.
- Initial schema: User (+NextAuth fields), Item, ItemType, Collection, Tag, ItemTag from the project-overview draft; NextAuth Account/Session/VerificationToken models added.
- Indexes on all FKs (+ `Item(userId, createdAt)`, `Tag @@unique([userId, name])`, `Account @@unique([provider, providerAccountId])`, unique session token); cascades: all user-owned data Cascade, ItemTag both sides Cascade, Item→Collection SetNull, Item→ItemType Restrict.
- Applied migration `20260820215857_init`; seeded the 7 system item types (Snippet, Prompt, Note, Command, File, Image, URL); `migrate status` in sync.
- Added `src/lib/db.ts` client singleton (PrismaNeon adapter, dev global cache); generated client excluded from ESLint.
- `.env` currently has only `DATABASE_URL` (pooled); migrations fall back to it — add `DIRECT_DATABASE_URL` + `SHADOW_DATABASE_URL` later for the production-grade setup.
- `npm run lint` and `npm run build` pass clean. Work on branch `feature/database-setup`.
