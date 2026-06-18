# Mr.Err Portfolio — AGENTS.md

## Stack

- **React 19** + **React Router v7** (file-system routes via `@react-router/fs-routes`, **SSR disabled**)
- **Vite 8**, **TypeScript 6**, **pnpm**
- **Tailwind CSS v4** (`@tailwindcss/vite` plugin, `@theme inline` for tokens, `@custom-variant dark`)
- **shadcn/ui** (`style: base-nova`, `rsc: false`), icons: lucide-react
- **Supabase** (auth + database, hand-typed in `src/integrations/supabase/types.ts`)
- **TanStack React Query** (all data fetching)
- **react-hook-form** + **zod** (forms)
- **Three.js / R3F / drei / rapier** (3D)
- **Framer Motion** (animations)
- **next-themes** (theme toggle)
- **Oxlint** (fast linting), **Oxfmt** (Prettier-compatible formatter), **React Doctor** (codebase health)

## Commands

| Command             | Action                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `pnpm dev`          | Dev server on `http://localhost:3000`                                                                              |
| `pnpm build`        | Production build                                                                                                   |
| `pnpm preview`      | Preview production build                                                                                           |
| `pnpm lint`         | ESLint (flat config in `eslint.config.js`) — only catches `react-hooks`/`react-refresh` rules oxlint doesn't cover |
| `pnpm lint:oxc`     | Oxlint (fast Rust-based linter, primary linting tool)                                                              |
| `pnpm format`       | Oxfmt (format all files in place)                                                                                  |
| `pnpm format:check` | Oxfmt check-only (CI use)                                                                                          |
| `pnpm typecheck`    | TypeScript type checking (`tsc --noEmit`)                                                                          |
| `pnpm doctor`       | React Doctor scan (health score + diagnostics)                                                                     |

Lint order: `pnpm lint:oxc` (fastest) → `pnpm lint` (ESLint — `react-hooks`/`react-refresh` rules only) → `pnpm typecheck`.

## Key Structure

- **`src/root.tsx`** — app shell: QueryClientProvider (staleTime 5min, retry 1), Layout, ErrorBoundary
- **`src/routes.ts`** — `flatRoutes()` auto-discovers pages under `src/routes/`
- **`react-router.config.ts`** — `ssr: false`, `appDirectory: "src"`
- **`src/routes/_index/route.tsx`** — home page (Hero, Projects, About, Skills, Contact, Footer)
- **`src/routes/admin/route.tsx`** — admin sidebar layout with `<Outlet/>`
- **Admin auth** — `useAdminAuth` hook checks Supabase `user_roles` table for `admin` role; redirects to `/login` if unauthenticated
- **`src/components/`** — reusable UI (Navbar, HeroSection, etc.) + `ui/` (shadcn) + `portfolio/`
- **`src/queries/`** — TanStack Query hooks (one file per entity: `projects.ts`, `skills.ts`, etc.)
- **`src/integrations/supabase/`** — Supabase client + hand-written Database types
- **`src/lib/utils.ts`** — `cn()` utility (clsx + tailwind-merge)
- **`@/`** path alias → `./src/`
- **`.env.example`** should contain template/placeholder values without actual secrets; all `.env` and `.env.*.local` files are gitignored
- **`vite.config.ts`** — includes `**/*.glb` as assets

## Design System

- **PRODUCT.md** — strategic context (register, audience, brand personality, design principles)
- **DESIGN.md** — visual design system (colors, typography, elevation, components, tokens)
- **`.opencode/skills/impeccable/`** — impeccable design skill (run `/impeccable [command]` for craft, critique, polish, layout, etc.)
- **`.impeccable/design.json`** — machine-readable design token sidecar for live mode
- CSS tokens in `@theme inline` blocks in `src/index.css`; dark mode via `data-theme="dark"`
- Creative North Star: **"The Lab"** — dark cybernetic aesthetic, green primary, multi-accent palette

## Database Tables

`certificates`, `contact_messages`, `project_images`, `projects`, `site_settings`, `skill_categories`, `skills`, `user_roles`, `work_experiences`

## Conventions

- CSS custom properties are defined in `@theme inline` blocks in `src/index.css`
- `cn()` utility from `@/lib/utils` for class merging (clsx + tailwind-merge)
- Dark mode via `data-theme="dark"` attribute on `<html>`
- Route files use `export default function` for the page component
- Queries export custom hooks named `use{Entity}` (e.g. `useProjects`, `useSkills`)
- Supabase client typed via `createClient<Database>(...)`
