# Mrerr Portfolio

A modern, interactive portfolio website built with React Router v7, Three.js, and Framer Motion.

## Tech Stack

- **Framework:** React 19 + React Router v7
- **Styling:** Tailwind CSS v4 + UnoCSS-inspired utilities
- **Animation:** Framer Motion, Three.js (React Three Fiber)
- **Database:** Supabase
- **Forms:** React Hook Form + Zod
- **i18n:** LinguiJS (Arabic / English)
- **UI Components:** Radix UI primitives + custom design system
- **Testing:** Vitest + Testing Library
- **Linting/Formatting:** ESLint, oxlint, oxfmt
- **Package Manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev        # starts Vite dev server on port 3000
pnpm build      # React Router build + typecheck
pnpm preview    # preview production build
```

## Available Scripts

| Command            | Description                                 |
| ------------------ | ------------------------------------------- |
| `pnpm dev`         | Start dev server on port 3000               |
| `pnpm build`       | Production build (react-router build + tsc) |
| `pnpm preview`     | Preview production build                    |
| `pnpm lint`        | Run oxlint then ESLint                      |
| `pnpm lint:oxc`    | Run oxlint only (fast)                      |
| `pnpm lint:eslint` | Run ESLint only                             |
| `pnpm lint:fix`    | Auto-fix oxlint + ESLint issues             |
| `pnpm format`      | Format code with oxfmt                      |
| `pnpm typecheck`   | TypeScript type checking                    |
| `pnpm test`        | Run Vitest tests                            |
| `pnpm test:watch`  | Run tests in watch mode                     |
| `pnpm doctor`      | Run React Doctor                            |

## Environment Variables

| Variable                   | Purpose                                                                       |
| -------------------------- | ----------------------------------------------------------------------------- |
| `VITE_SUPABASE_URL`        | Supabase project URL (required)                                               |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID (required)                                                |
| `VITE_GA_MEASUREMENT_ID`   | GA4 property ID (`G-…`). Empty = GA4 fully disabled.                          |
| `VITE_UMAMI_SCRIPT_URL`    | Umami host script URL. Must be set **with** the website ID for Umami to load. |
| `VITE_UMAMI_WEBSITE_ID`    | Umami website ID. Empty = Umami disabled.                                     |

All optional analytics variables are env-gated: when empty, nothing is injected and
no network requests are made. GA4 initializes after page load and tracks SPA route
changes as page views. Umami is defer-loaded and tracks navigation automatically.

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Shared components
│   ├── card-swapping/   # Interactive card stack
│   ├── common/          # Common UI components
│   ├── portfolio/       # Portfolio-specific components
│   └── ui/              # Design system primitives
├── config/          # App configuration
├── hooks/           # Custom React hooks
├── integrations/    # Third-party service integrations
├── lib/             # Utility libraries
├── locales/         # i18n translations (ar, en)
├── queries/         # TanStack Query hooks
├── routes/          # Route modules
│   ├── _index/          # Home page
│   ├── admin*/          # Admin dashboard
│   ├── login/           # Auth login
│   ├── project/         # Project detail
│   └── project.$id/     # Dynamic project route
├── test/            # Test setup & utilities
├── utils/           # Helper functions
├── entry.client.tsx # Client entry
├── root.tsx         # Root layout
└── routes.ts        # Route definitions
```

## Features

- Responsive design with mobile-first approach
- Interactive 3D elements (Three.js)
- Admin dashboard for content management
- Supabase integration for data persistence
- Bilingual support (Arabic / English)
- Contact form with validation
- Dynamic project portfolio
- Smooth scroll animations
- Card-swapping interactive component
