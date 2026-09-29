import React from "react";
import { Code, Terminal, Layers } from "lucide-react";

/**
 * Mapping of normalized technology names to Devicon font class names.
 */
const DEVICON_MAP: Record<string, string> = {
  // Frontend Frameworks & Libraries
  react: "devicon-react-original",
  "react.js": "devicon-react-original",
  reactjs: "devicon-react-original",
  "react 19": "devicon-react-original",
  "react native": "devicon-react-original",
  "react-native": "devicon-react-original",
  "react router": "devicon-reactrouter-plain",
  "react-router": "devicon-reactrouter-plain",
  "react router v7": "devicon-reactrouter-plain",
  "react-router-v7": "devicon-reactrouter-plain",
  "next.js": "devicon-nextjs-plain",
  nextjs: "devicon-nextjs-plain",
  "next.js 16": "devicon-nextjs-plain",
  next: "devicon-nextjs-plain",
  "next-intl": "devicon-nextjs-plain",
  vue: "devicon-vuejs-plain",
  vuejs: "devicon-vuejs-plain",
  angular: "devicon-angularjs-plain",
  svelte: "devicon-svelte-plain",

  // Languages
  typescript: "devicon-typescript-plain",
  ts: "devicon-typescript-plain",
  javascript: "devicon-javascript-plain",
  js: "devicon-javascript-plain",
  python: "devicon-python-plain",
  python3: "devicon-python-plain",
  html: "devicon-html5-plain",
  html5: "devicon-html5-plain",
  css: "devicon-css3-plain",
  css3: "devicon-css3-plain",
  dart: "devicon-dart-plain",

  // Styling
  "tailwind css": "devicon-tailwindcss-original",
  tailwind: "devicon-tailwindcss-original",
  tailwindcss: "devicon-tailwindcss-original",
  sass: "devicon-sass-original",
  bootstrap: "devicon-bootstrap-plain",

  // Backend & APIs
  "node.js": "devicon-nodejs-plain",
  nodejs: "devicon-nodejs-plain",
  node: "devicon-nodejs-plain",
  fastapi: "devicon-fastapi-plain",
  express: "devicon-express-original",
  django: "devicon-django-plain",
  graphql: "devicon-graphql-plain",
  gql: "devicon-graphql-plain",
  rest: "devicon-fastapi-plain",
  "rest api": "devicon-fastapi-plain",
  "rest apis": "devicon-fastapi-plain",
  openapi: "devicon-fastapi-plain",
  "api contracts": "devicon-fastapi-plain",
  trpc: "devicon-trpc-plain",
  zod: "devicon-typescript-plain",

  // Databases & Backend Services
  supabase: "devicon-supabase-plain",
  postgresql: "devicon-postgresql-plain",
  postgres: "devicon-postgresql-plain",
  mysql: "devicon-mysql-plain",
  sqlite: "devicon-sqlite-plain",
  mongodb: "devicon-mongodb-plain",
  mongo: "devicon-mongodb-plain",
  redis: "devicon-redis-plain",
  prisma: "devicon-prisma-plain",
  firebase: "devicon-firebase-plain",

  // State Management
  redux: "devicon-redux-original",
  zustand: "devicon-redux-original",
  "tanstack query": "devicon-react-original",
  "react query": "devicon-react-original",
  bloc: "devicon-flutter-plain",

  // Mobile
  flutter: "devicon-flutter-plain",

  // DevOps & Cloud
  docker: "devicon-docker-plain",
  git: "devicon-git-plain",
  github: "devicon-github-original",
  gitlab: "devicon-gitlab-plain",
  "gitlab ci": "devicon-gitlab-plain",
  "github actions": "devicon-githubactions-plain",
  aws: "devicon-amazonwebservices-plain-wordmark",
  linux: "devicon-linux-plain",
  ubuntu: "devicon-ubuntu-plain",
  "conventional commits": "devicon-git-plain",
  "release automation": "devicon-githubactions-plain",

  // Testing & Quality
  vitest: "devicon-vitest-plain",
  jest: "devicon-jest-plain",
  cypress: "devicon-cypressio-plain",
  eslint: "devicon-eslint-plain",
  sonarqube: "devicon-sonarqube-plain",
  "testing library": "devicon-jest-plain",
  oxlint: "devicon-eslint-plain",

  // Package Managers & Monorepos
  pnpm: "devicon-pnpm-plain",
  npm: "devicon-npm-original-wordmark",
  "npm publishing": "devicon-npm-original-wordmark",
  "npm profile": "devicon-npm-original-wordmark",
  turborepo: "devicon-pnpm-plain",
  vite: "devicon-vitejs-plain",
  webpack: "devicon-webpack-plain",

  // E-commerce & CMS
  woocommerce: "devicon-woocommerce-plain",
  wordpress: "devicon-wordpress-plain",

  // Tools & Workflow
  jira: "devicon-jira-plain",
};

/**
 * Returns the Devicon CSS class name for a given tech name, or null if unknown.
 */
function getDeviconClass(techName: string, colored: boolean = true): string | null {
  if (!techName) return null;
  const normalized = techName.trim().toLowerCase();
  const iconBase = DEVICON_MAP[normalized];

  if (!iconBase) {
    // Partial substring fallback search
    for (const [key, icon] of Object.entries(DEVICON_MAP)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        return colored ? `${icon} colored` : icon;
      }
    }
    return null;
  }

  return colored ? `${iconBase} colored` : iconBase;
}

export interface TechIconProps {
  name: string;
  colored?: boolean;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * Renders an official Devicon vector glyph for a given technology name.
 * Falls back to an inline SVG code/terminal icon if not in the Devicon collection.
 */
export const TechIcon: React.FC<TechIconProps> = ({
  name,
  colored = true,
  className = "",
  fallbackIcon,
}) => {
  const iconClass = getDeviconClass(name, colored);

  if (iconClass) {
    return (
      <i
        className={`${iconClass} inline-flex items-center justify-center shrink-0 leading-none align-middle ${className}`}
        aria-hidden="true"
        title={name}
      />
    );
  }

  if (fallbackIcon) {
    return <span className={`inline-flex items-center shrink-0 ${className}`}>{fallbackIcon}</span>;
  }

  // Graceful fallback for non-brand tags (e.g., "UI Architecture", "Business Logic")
  return (
    <Code
      className={`w-3.5 h-3.5 text-muted-foreground shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default TechIcon;
