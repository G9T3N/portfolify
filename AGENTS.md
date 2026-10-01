# mrerr-portfolio — Agent Instructions & Architectural Standards

## Quick Start

- Package manager: **pnpm**. Do not use npm or yarn.
- `pnpm dev` — Start Vite dev server on port **3000**.
- `pnpm build` — React Router build (`react-router build && node scripts/optimize-build.mjs`).
- `pnpm test` — Run Vitest suite (`vitest run`).
- `pnpm lint` — Run oxlint then ESLint (`pnpm lint:oxc && pnpm lint:eslint`).
- `pnpm format` / `pnpm format:check` — Format check with `oxfmt`.
- `pnpm typecheck` — TypeScript type checking (`tsc --noEmit`).
- `pnpm doctor` — Run `react-doctor`.
- `pnpm msg:extract` / `pnpm msg:compile` — Lingui i18n message compilation.

---

## Architectural Principles & Separation of Concerns (SRP)

Every feature, route, and component MUST adhere to the **Single Responsibility Principle (SRP)**:

1. **UI Presentation (`components/`)**:
   - Pure, declarative JSX components focused exclusively on rendering.
   - Do NOT embed direct API calls or heavy calculation logic in component render bodies.
   - Consume data and handlers from custom hooks.

2. **Custom Hooks (`hooks/` or route-level `utils/hooks/`)**:
   - Encapsulate all stateful logic, events, DOM/IntersectionObserver subscriptions, and browser APIs.
   - Follow standard `use*` naming conventions.

3. **Data Fetching & API Layer (`queries/` or route-level `queries.ts`)**:
   - TanStack Query hooks and Supabase database interactions isolated from UI.
   - Provide typed query keys and optimistic mutations.

4. **Pure Utility Functions (`utils/functions/`)**:
   - Side-effect-free helper functions (date math, calculations, string formatters, predicates).
   - Easily unit-testable in isolation.

5. **Constants (`utils/constants/`)**:
   - Configuration values, route IDs, site metadata, and static mappings separated from logic.

---

## Styling & Tailwind CSS Best Practices

- **Engine**: Tailwind CSS v4 (`@tailwindcss/vite` + `@theme inline`).
- **Flow Layout First**: Prioritize modern CSS flow (flexbox, CSS grid, `gap-*`, auto-margins, container layouts).
- **Avoid Absolute Positioning Abuse**: Do NOT use `relative` + `absolute inset-0` or arbitrary offset stacking where standard flex/grid flow achieves the desired responsive result.
- **RTL Support**: Use CSS logical properties (`start-*`/`end-*`, `ps-*`/`pe-*`, `ms-*`/`me-*`) to guarantee seamless English/Arabic switching.

---

## Design System & Icons

- **UI Primitives**: Radix UI primitives + shadcn/ui custom styling.
- **General Icons**: Lucide React (`lucide-react`).
- **Technology & Brand Icons**: `TechIcon` (`src/components/common/TechIcon.tsx`) backed by the lightweight SVG registry (`src/components/common/tech-icons/tech-svg-registry.tsx`).
- **Performance Rule**: NEVER import or link heavy external icon font files (such as Devicon font/woff or FontAwesome) into `<head>`. Always use tree-shakable inline vector SVGs.

---

## 3D Graphics & Motion

- **Framer Motion**: Respect reduced motion via `useReducedMotion()` or CSS `@media (prefers-reduced-motion: reduce)`.
- **Three.js & Rapier Physics**: 3D components (`Lanyard.tsx`) MUST remain lazy-loaded behind `Suspense` and `LazyInView` so heavy physics engines do not block initial First Contentful Paint.
- **Referential Stability**: Avoid declaring array/object literals as default props inside Three.js components to prevent render loop thrashing.

---

## Internationalization (i18n)

- **Library**: LinguiJS with `@lingui/react` and `@lingui/core`.
- **Languages**: English (`en`, default) and Arabic (`ar`, RTL).
- **Direction Handling**: Handled automatically via `useLocale()`.
- Wrap user-facing strings with `<Trans id="...">` or `t` macro.

---

## Pre-commit & CI Quality Gate

CI enforces:

1. `pnpm lint:oxc` & `pnpm lint:eslint`
2. `pnpm format:check`
3. `pnpm typecheck`
4. `pnpm test` (All 12 test suites must pass 100%)
5. `pnpm build`
