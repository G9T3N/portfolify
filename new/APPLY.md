# Portfolio update for mrerr.com

This package updates the public `G9T3N/Mrerror` portfolio content while preserving the current visual language.

## Replace these files

- `src/App.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/ContactMethod.tsx`
- `index.html`

## What changed

- Replaced outdated identity copy (old Kyiv/self-taught/front-end-only text) with Wael Alamrany's current profile.
- Added current experience: Sofa, Sparksoft (remote), OnePlusOneTech (remote).
- Updated stack: React, TypeScript, Next.js, TanStack Query, Zustand, REST/OpenAPI, FastAPI/Node.js foundations.
- Added CI/CD and release automation: GitHub Actions, GitLab CI, Conventional Commits.
- Added code-quality tooling: ESLint, SonarQube, Oxlint; testing tools and collaborative workflow/Jira.
- Added open-source/NPM positioning.
- Replaced placeholder projects with Sofa Platform, Portfolify, and Open Source/NPM.
- Added real external links and made project/contact buttons functional.
- Added an Experience section.
- Fixed the previously non-functional mobile navigation button.
- Replaced fixed `h-screen` content sections with safer `min-h-screen` sections to reduce clipping.
- Added SEO title, description, canonical, Open Graph, and Twitter metadata.
- Updated footer copyright and role.

## Validate locally

```bash
pnpm install
pnpm lint
pnpm build
pnpm dev
```

## Deploy using the repository's existing workflow

The current repository already has Vite build/deploy scripts and GitHub Pages configuration. After validating the files, commit and push to the branch used by the existing deployment workflow.
