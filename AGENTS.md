# wosol-web-console — Agent Instructions

## Quick Start
- Package manager: **pnpm** (v10.33.0). Do not use npm.
- `pnpm dev` — port **5188**, HTTPS (certs in `certs/`), proxy `/api` → `VITE_GATEWAY_BASE_URL`
- `pnpm build` = `react-router build && tsc -b` — typecheck is part of build
- `pnpm lint` — ESLint with `--quiet`
- `pnpm test` — Vitest (jsdom + Testing Library + MSW)
- `pnpm format` — Prettier (no standalone install needed)
- `pnpm msg:extract` / `pnpm msg:compile` — Lingui i18n
- `pnpm codegen` — GraphQL Codegen
- `pnpm update-schema` — openapi-typescript → `src/config/api-schema.d.ts`

## Pre-commit Pipeline (`.husky/pre-commit`)
1. `pnpm lint-staged` (ESLint + Prettier on staged files)
2. `pnpm build` (includes typecheck)
No automatic test stage.

## Project Structure
Each route at `src/routes/_home.*/` MUST follow:
- `components/` — JSX
- `queries.ts` — TanStack Query hooks
- `utils/` with subdirs: `constants/`, `functions/`, `hooks/`
- `route.tsx` — entry point

See `.cursorrules` and `PROJECT_RULES.md` for detailed folder conventions.

## Auto-imports (unimport)
Many common imports are auto-resolved. Do NOT manually import:
- React hooks (`useState`, `useEffect`, etc.)
- React Router (`Link`, `useNavigate`, `Outlet`, `useSearchParams`)
- TanStack Query (`useQuery`, `useMutation`, `useQueryClient`)
- Zustand `create`, `clsx`, `axios`, `format` (date-fns)
- `Skeleton` from `@design-system/yeds-components`
See `vite.config.ts` / `vitest.config.ts` for full preset list. Auto-imports do NOT apply in test files.

## TypeScript (from `tsconfig.app.json`)
- `@/` → `src/`
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`
- `verbatimModuleSyntax: true` — must use `import type` for type-only imports
- `noEmit: true` (typecheck only)

## ESLint Enforcement
- Alphabetical import/object-property ordering via `perfectionist/sort-imports`
- File names: camelCase, PascalCase, or kebabCase only
- `react-hooks/react-compiler: 'error'` — React Compiler rules enforced
- `@tanstack/query/exhaustive-deps: 'error'`
- `@unocss/blocklist`, `@unocss/order`, `@unocss/enforce-class-compile: 'error'`
- `no-console: 'warn'`, `unicorn/better-regex: 'error'`
- No wildcard imports (`import * as ...`), no `any`

## API Pattern
Wrap page content with `<Body>` from `@/utils/generator/BodyComponent` using `status`, `hasData`, `loading`, `error`, and `Skeleton` props. Handles 400/401/403/404/500+ states consistently.

## Design System
Only `@design-system/yeds-components` (private registry at `git.sofa.io` — see `.npmrc`). Do not import Radix UI, shadcn, or external component libraries directly.

## Icons
**Phosphor** via UnoCSS: `i-ph:<icon-name>` (e.g., `i-ph:user`, `i-ph:gear-bold`). Variants: `-bold`, `-fill`, `-duotone`, `-thin`, `-light`. Do NOT use `lucide-react` JSX components, `mdi`, or `prime` collections. See `uno.config.ts` safelist.

## Styling
UnoCSS with RTL. Use logical properties: `ms-*`/`me-*` over `ml-*`/`mr-*`, `start-*`/`end-*` over `left-*`/`right-*`. See README.md migration table.

## i18n (LinguiJS)
- `import { Trans } from '@lingui/react/macro'` / `import { t } from '@lingui/core/macro'`
- Locales: Arabic (`ar`, default) and English (`en`)
- After adding messages: `pnpm msg:extract` then `pnpm msg:compile`

## Navigation
- `<Link>` for normal nav, `<NavLink>` for active-state styling
- `useNavigate()` only for non-interaction navigation (timeouts, post-fetch redirects)

## Generated Files (DO NOT edit)
- `src/graphql/` — from GraphQL Codegen (`pnpm codegen`)
- `src/config/api-schema.d.ts` — from openapi-typescript (`pnpm update-schema`)
- `.react-router/types/` — from React Router
- `unimport.d.ts` — from unimport

## CI/CD (`.gitlab-ci.yml`)
Stages: test → release → build. Docker multi-stage build. Vite build-args injected via Docker. Semantic release for version bump. See `makefile` for local Docker commands.
