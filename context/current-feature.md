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
