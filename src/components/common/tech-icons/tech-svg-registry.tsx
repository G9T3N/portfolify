import React from "react";

export type SvgIconProps = React.SVGProps<SVGSVGElement>;

/**
 * High-performance, pixel-perfect authentic SVG brand vector icons.
 * Replaces the 1.5MB Devicon font and 142KB stylesheet with lightweight,
 * tree-shakable inline vectors (~15KB total).
 */

const ReactIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const TypeScriptIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path
      d="M11.75 14.35c-.27.85-.75 1.5-1.44 1.95-.69.45-1.57.68-2.64.68-1.07 0-1.95-.23-2.65-.7-.69-.47-1.18-1.13-1.46-1.99l2.25-.92c.16.52.42.92.79 1.18.37.26.83.4 1.38.4.52 0 .93-.11 1.23-.33.3-.22.45-.51.45-.88 0-.32-.12-.58-.35-.78-.23-.2-.68-.39-1.34-.58l-.94-.28c-1.12-.34-1.94-.8-2.46-1.37-.52-.58-.78-1.32-.78-2.22 0-.97.38-1.78 1.15-2.42.77-.64 1.77-.96 2.99-.96 1.12 0 2.06.3 2.82.91.76.61 1.2 1.41 1.34 2.4l-2.29.58c-.1-.45-.29-.78-.58-1-.29-.22-.69-.33-1.21-.33-.49 0-.89.11-1.18.32-.29.21-.44.5-.44.86 0 .3.12.55.37.75.25.2.7.38 1.35.56l.96.28c1.14.33 1.98.78 2.52 1.34.54.56.81 1.3.81 2.22 0 .97-.37 1.78-1.11 2.43zM21.5 7.64h-3.41V16.7h-2.58V7.64H12.1V5.5h9.4v2.14z"
      fill="#ffffff"
    />
  </svg>
);

const JavaScriptIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path
      d="M7.5 17.5c.8 0 1.5-.4 1.8-1.1.2-.5.2-1.3.2-2.3h-1.5c0 1.1 0 1.6-.1 1.8-.1.2-.3.3-.6.3s-.6-.2-.7-.5c-.1-.3-.1-.9-.1-1.8H5c0 1.2.1 2 .4 2.5.4.7 1.1 1.1 2.1 1.1zm7.3-.2c1.2 0 2.1-.4 2.6-1.1.4-.6.6-1.4.6-2.4 0-.8-.2-1.5-.5-1.9-.3-.5-.9-.9-1.8-1.3l-.7-.3c-.6-.3-.9-.5-1.1-.7-.2-.2-.3-.5-.3-.8 0-.4.1-.7.4-.9.3-.2.7-.3 1.2-.3.5 0 .9.1 1.2.4.3.3.4.7.5 1.3h1.5c-.1-1-.4-1.7-.9-2.2-.6-.6-1.4-.9-2.5-.9-1.1 0-1.9.3-2.5.9-.6.6-.9 1.4-.9 2.3 0 .7.2 1.3.6 1.7.4.4.9.8 1.7 1.1l.8.3c.7.3 1.1.6 1.3.8.2.3.3.6.3 1 0 .5-.2.8-.5 1.1-.3.2-.8.4-1.4.4-.7 0-1.2-.2-1.5-.5-.3-.4-.5-.9-.5-1.7H13c0 1.1.3 1.9.8 2.4.6.6 1.5.9 2.6.9z"
      fill="#000000"
    />
  </svg>
);

const NextJsIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.1" />
    <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M15.5 8.5v7m-7-7v7l7.5-8.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TailwindIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
      fill="#06B6D4"
    />
  </svg>
);

const NodeJsIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.2l6.5 3.8v7.6L12 19.4 5.5 15.6V8L12 4.2z"
      fill="#5FA04E"
    />
    <path
      d="M12 7.5a4.5 4.5 0 00-4.5 4.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-2.5-2-4.5-4.5-4.5zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"
      fill="#5FA04E"
    />
  </svg>
);

const PythonIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M11.87 2.25c-4.4 0-4.13 1.9-4.13 1.9l.01 1.97h4.22v.6H5.85s-2.73.31-2.73 4.14c0 3.82 2.38 3.68 2.38 3.68h1.42v-2.02s-.08-2.38 2.35-2.38h4.08s2.27.04 2.27-2.23V4.48s.34-2.23-3.75-2.23zm-2.31 1.25a.82.82 0 110 1.64.82.82 0 010-1.64z"
      fill="#3776AB"
    />
    <path
      d="M12.13 21.75c4.4 0 4.13-1.9 4.13-1.9l-.01-1.97h-4.22v-.6h6.12s2.73-.31 2.73-4.14c0-3.82-2.38-3.68-2.38-3.68h-1.42v2.02s.08 2.38-2.35 2.38H10.45s-2.27-.04-2.27 2.23v3.47s-.34 2.23 3.75 2.23zm2.31-1.25a.82.82 0 110-1.64.82.82 0 010 1.64z"
      fill="#FFD43B"
    />
  </svg>
);

const SupabaseIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M13.4 22c-.6.8-1.8.4-1.8-.7V13H3.6c-.9 0-1.4-1.1-.8-1.7L12.5 2c.6-.8 1.8-.4 1.8.7V11h8c.9 0 1.4 1.1.8 1.7L13.4 22z"
      fill="#3ECF8E"
    />
  </svg>
);

const DockerIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M13 8.5h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm6-3h2v2h-2V5.5zm-3 0h2v2h-2V5.5zm-3 0h2v2H7V5.5zm6 6h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm-3 0h2v2H4v-2zm18.5 2.5c-.3-1.5-1.5-2.2-1.6-2.2-.4.4-.9.6-1.5.6-1.1 0-1.8-.7-1.9-.8-.8.6-2 .8-3 .5h-.5v.9c0 .7-.3 1.3-.8 1.8H2.4c-.2.7-.4 1.4-.4 2.2 0 3.9 3.6 7 10 7 7.7 0 10.8-4.3 11-8 .3-.6.5-1.3.5-2z"
      fill="#2496ED"
    />
  </svg>
);

const PostgreSQLIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5v-2.8c1.8-.2 3.2-1.3 3.8-2.9.2-.5.1-1.1-.3-1.4l-1.3-.9c-.4-.3-1-.2-1.3.2-.5.7-1.3 1.1-2.2 1.1h-.7v-3.4c1.2-.3 2.1-1.4 2.1-2.7 0-1.5-1.2-2.7-2.7-2.7-1.5 0-2.7 1.2-2.7 2.7 0 1.3.9 2.4 2.1 2.7v3.4h-.7c-.9 0-1.7-.4-2.2-1.1-.3-.4-.9-.5-1.3-.2l-1.3.9c-.4.3-.5.9-.3 1.4.6 1.6 2 2.7 3.8 2.9v2.8H7v1.5h10v-1.5h-4z"
      fill="#4169E1"
    />
  </svg>
);

const GitIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21.6 10.9L13.1 2.4a1.8 1.8 0 00-2.5 0L8.8 4.2l3.2 3.2a2.1 2.1 0 012.7 2.7l3.1 3.1a2.1 2.1 0 11-1.3 1.3l-2.9-2.9v4.3a2.1 2.1 0 11-1.8 0v-4.5L8.5 8.1a2.1 2.1 0 11-1.4-1.4L2.4 11.4a1.8 1.8 0 000 2.5l8.5 8.5c.7.7 1.8.7 2.5 0l8.2-8.2c.7-.7.7-1.8 0-2.5v-.8z"
      fill="#F05032"
    />
  </svg>
);

const GitHubIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const ViteIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21.5 4.5L12.5 21 3 4.5l14-2.5 4.5 2.5z" fill="url(#viteGradient)" />
    <path d="M13.5 3.5L8.5 12h3.5l-1 6.5 6-8.5h-3.5l1-6.5h-1z" fill="#FFD43B" />
    <defs>
      <linearGradient
        id="viteGradient"
        x1="3"
        y1="3"
        x2="21.5"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#41D1FF" />
        <stop offset="1" stopColor="#BD34FE" />
      </linearGradient>
    </defs>
  </svg>
);

const VitestIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="#729B1B" />
    <path
      d="M7 8l5 8 5-8"
      stroke="#FCC72B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FastApiIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="#059669" />
    <path d="M12.5 6.5L8 12.5h3.5L11 17.5l5-6.5h-3.5z" fill="#ffffff" />
  </svg>
);

const GraphQlIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
      stroke="#E10098"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="12" cy="2" r="2" fill="#E10098" />
    <circle cx="20.66" cy="7" r="2" fill="#E10098" />
    <circle cx="20.66" cy="17" r="2" fill="#E10098" />
    <circle cx="12" cy="22" r="2" fill="#E10098" />
    <circle cx="3.34" cy="17" r="2" fill="#E10098" />
    <circle cx="3.34" cy="7" r="2" fill="#E10098" />
  </svg>
);

const ReactRouterIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M3 17.5C3 13.5 6.5 10 10.5 10H14v-2.5l5 4-5 4V13h-3.5C7.5 13 5.5 15 5.5 17.5V19H3v-1.5z"
      fill="#CA4245"
    />
  </svg>
);

const RedisIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21 8.5L12 4 3 8.5l9 4.5 9-4.5zM3 11.5l9 4.5 9-4.5M3 14.5l9 4.5 9-4.5"
      stroke="#DC382D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PnpmIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="3" width="5" height="5" fill="#F69220" rx="1" />
    <rect x="9.5" y="3" width="5" height="5" fill="#F69220" rx="1" />
    <rect x="16" y="3" width="5" height="5" fill="#F69220" rx="1" />
    <rect x="9.5" y="9.5" width="5" height="5" fill="#F69220" rx="1" />
    <rect x="16" y="9.5" width="5" height="5" fill="#F69220" rx="1" />
    <rect x="16" y="16" width="5" height="5" fill="#F69220" rx="1" />
    <rect x="9.5" y="16" width="5" height="5" fill="#4ABA26" rx="1" />
    <rect x="3" y="16" width="5" height="5" fill="#4ABA26" rx="1" />
  </svg>
);

const LinuxIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C9.5 2 8 4 8 6.5c0 1.2.4 2.3 1 3.2-.8.8-1.5 2-1.5 3.3 0 1.2.4 2.2 1 3-1 .5-2 1.5-2 3 0 1.7 1.8 3 5.5 3s5.5-1.3 5.5-3c0-1.5-1-2.5-2-3 .6-.8 1-1.8 1-3 0-1.3-.7-2.5-1.5-3.3.6-.9 1-2 1-3.2C16 4 14.5 2 12 2zm-1.5 4a.8.8 0 110 1.6.8.8 0 010-1.6zm3 0a.8.8 0 110 1.6.8.8 0 010-1.6zm-1.5 2c.8 0 1.5.3 1.5.7s-.7.7-1.5.7-1.5-.3-1.5-.7.7-.7 1.5-.7z" />
  </svg>
);

const HtmlIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 2.5l1.6 18 6.4 1.8 6.4-1.8 1.6-18H4z" fill="#E34F26" />
    <path d="M12 4.2v16.3l4.9-1.4 1.2-13.9H12z" fill="#EF652A" />
    <path
      d="M12 7.8H8l.2 2.5h3.8v2.4H8.4l.2 2.5h3.4v2.5L8.7 17l-.2-2h-2l.4 4.5L12 21V7.8z"
      fill="#ffffff"
    />
    <path
      d="M12 7.8h4.2l-.4 4.9H12v2.4h3.6l-.3 3.6-3.3.9V21l5.2-1.5.7-8.2H12V7.8z"
      fill="#ffffff"
      opacity="0.9"
    />
  </svg>
);

const CssIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 2.5l1.6 18 6.4 1.8 6.4-1.8 1.6-18H4z" fill="#1572B6" />
    <path d="M12 4.2v16.3l4.9-1.4 1.2-13.9H12z" fill="#33A9DC" />
    <path
      d="M12 7.8H8l.2 2.5h3.8v2.4H8.4l.2 2.5h3.4v2.5L8.7 17l-.2-2h-2l.4 4.5L12 21V7.8z"
      fill="#ffffff"
    />
    <path
      d="M12 7.8h4.2l-.4 4.9H12v2.4h3.6l-.3 3.6-3.3.9V21l5.2-1.5.7-8.2H12V7.8z"
      fill="#ffffff"
      opacity="0.9"
    />
  </svg>
);

const ZodIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="24" height="24" rx="5" fill="#3068B7" />
    <path d="M7 7.5h10l-8.5 9H17v1.5H7l8.5-9H7V7.5z" fill="#ffffff" />
  </svg>
);

export const TECH_SVG_REGISTRY: Record<string, React.FC<SvgIconProps>> = {
  // Frontend
  react: ReactIcon,
  "react.js": ReactIcon,
  reactjs: ReactIcon,
  "react 19": ReactIcon,
  "react native": ReactIcon,
  "react-native": ReactIcon,
  "react router": ReactRouterIcon,
  "react-router": ReactRouterIcon,
  "react router v7": ReactRouterIcon,
  "react-router-v7": ReactRouterIcon,
  "next.js": NextJsIcon,
  nextjs: NextJsIcon,
  "next.js 16": NextJsIcon,
  next: NextJsIcon,
  "next-intl": NextJsIcon,

  // Languages
  typescript: TypeScriptIcon,
  ts: TypeScriptIcon,
  javascript: JavaScriptIcon,
  js: JavaScriptIcon,
  python: PythonIcon,
  python3: PythonIcon,
  html: HtmlIcon,
  html5: HtmlIcon,
  css: CssIcon,
  css3: CssIcon,

  // Styling
  tailwind: TailwindIcon,
  tailwindcss: TailwindIcon,
  "tailwind css": TailwindIcon,

  // Backend & APIs
  "node.js": NodeJsIcon,
  nodejs: NodeJsIcon,
  node: NodeJsIcon,
  fastapi: FastApiIcon,
  rest: FastApiIcon,
  "rest api": FastApiIcon,
  "rest apis": FastApiIcon,
  openapi: FastApiIcon,
  graphql: GraphQlIcon,
  gql: GraphQlIcon,
  zod: ZodIcon,

  // Databases & Backend Services
  supabase: SupabaseIcon,
  postgresql: PostgreSQLIcon,
  postgres: PostgreSQLIcon,
  redis: RedisIcon,

  // DevOps & Cloud
  docker: DockerIcon,
  git: GitIcon,
  github: GitHubIcon,
  linux: LinuxIcon,
  ubuntu: LinuxIcon,

  // Tools & Package Managers
  vite: ViteIcon,
  vitest: VitestIcon,
  pnpm: PnpmIcon,
};

function resolveTechSvg(techName: string): React.FC<SvgIconProps> | null {
  if (!techName) return null;
  const normalized = techName.trim().toLowerCase();

  if (TECH_SVG_REGISTRY[normalized]) {
    return TECH_SVG_REGISTRY[normalized];
  }

  // Partial substring match fallback
  for (const [key, component] of Object.entries(TECH_SVG_REGISTRY)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return component;
    }
  }

  return null;
}

/**
 * Resolves a normalized technology name and renders its corresponding SVG icon.
 */
export function renderTechSvg(techName: string, props: SvgIconProps): React.ReactElement | null {
  const SvgComponent = resolveTechSvg(techName);
  if (!SvgComponent) return null;
  return <SvgComponent {...props} />;
}
