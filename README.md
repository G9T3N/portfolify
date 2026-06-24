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

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `pnpm dev`        | Start dev server on port 3000                   |
| `pnpm build`      | Production build (react-router build + tsc)     |
| `pnpm preview`    | Preview production build                        |
| `pnpm lint`       | Run ESLint                                      |
| `pnpm lint:fix`   | Fix ESLint issues                               |
| `pnpm lint:oxc`   | Run oxlint                                      |
| `pnpm format`     | Format code with oxfmt                          |
| `pnpm typecheck`  | TypeScript type checking                        |
| `pnpm test`       | Run Vitest tests                                |
| `pnpm test:watch` | Run tests in watch mode                         |
| `pnpm doctor`     | Run React Doctor                                |

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
