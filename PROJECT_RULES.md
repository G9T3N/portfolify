# Project Coding Rules & Standards

This document serves as the **Source of Truth** for developers and AI coding assistants working on the **mrerr-portfolio** (`portfolify`) repository.

---

## 1. Separation of Concerns (Single Responsibility Principle - SRP)

Every file and feature must have a single, well-defined responsibility:

- **UI Components (`components/`)**:
  - Declarative JSX presentation only.
  - No embedded API fetching, direct database calls, or complex inline math.
  - Consume logic via custom hooks or props.

- **Custom Hooks (`hooks/` or `utils/hooks/`)**:
  - Business logic, state management, event listeners, observers (scroll spy, media queries).
  - Explicit, meaningful naming (e.g. `useLocale`, `useScrollSpy`, `useProjectsFilter`, `useAdminLoginForm`).

- **Data Fetching Layer (`queries/` or `queries.ts`)**:
  - TanStack Query hooks, Supabase API calls, mutations, and cache invalidation.

- **Pure Functions (`utils/functions/`)**:
  - Side-effect-free data transformations, metric derivations, and validation helpers.
  - Fully unit-testable in Vitest without mocking browser DOM.

- **Constants (`utils/constants/`)**:
  - Configuration, route lists, copy defaults, and metadata definitions.

- **Types (`types/` or `*.d.ts`)**:
  - Strict TypeScript definitions with no `any` assertions.

---

## 2. Tailwind CSS Best Practices

- **Flow-First Layout**:
  - Rely on flexbox (`flex`, `flex-col`, `items-center`, `justify-between`), CSS Grid, `gap`, and auto-margins (`ms-auto`, `my-auto`).
  - Do NOT wrap elements in `relative` containers solely to place children with `absolute inset-0` when modern flex/grid achieves the same or better responsive flow.
  - Restrict `absolute` positioning to genuine overlays (e.g., floating badges, modal backdrops, dropdown popovers).

- **RTL & Logical Properties**:
  - Use logical utilities (`ms-*`, `me-*`, `start-*`, `end-*`, `ps-*`, `pe-*`) to guarantee seamless English and Arabic layout mirroring.

---

## 3. Icons & Performance

- **General UI Icons**: Lucide React (`lucide-react`).
- **Brand & Tech Icons**: `TechIcon` (`src/components/common/TechIcon.tsx`) powered by the lightweight SVG registry (`src/components/common/tech-icons/tech-svg-registry.tsx`).
- **Strict Rule**: NEVER link external font stylesheets (e.g. Devicon woff/css or FontAwesome) in `<head>`. All brand icons must be lightweight inline vector SVGs.

---

## 4. Testing & Quality Assurance

- **Vitest**: Unit and component tests must pass 100% on every commit. Run with `pnpm test`.
- **Linting & Formatting**: Enforced via `oxlint`, `eslint`, and `oxfmt`. Run with `pnpm lint` and `pnpm format:check`.
- **Type Checking**: Strict TypeScript validation via `pnpm typecheck`.

---

## 5. 3D & Performance Safeguards

- 3D modules (`Lanyard.tsx`, Three.js, Rapier physics) MUST remain lazily loaded via `Suspense` and `LazyInView`.
- Maintain stable references for default props in Three.js/React Three Fiber components to prevent memory leaks and unneeded re-renders.
