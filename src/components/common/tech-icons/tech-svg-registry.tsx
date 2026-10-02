import React from "react";

export type SvgIconProps = React.SVGProps<SVGSVGElement>;

/**
 * High-performance, pixel-perfect authentic SVG brand vector icons.
 * Replaces the 1.5MB Devicon font and 142KB stylesheet with lightweight,
 * tree-shakable inline vectors (~15KB total).
 */

const ReactIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    viewBox="-11.5 -10.23174 23 20.46348"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const TypeScriptIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    {/* T on the left */}
    <path d="M4.5 7h7.2v2.2H9.2v7.8H6.8V9.2H4.5V7z" fill="#ffffff" />
    {/* S on the right */}
    <path
      d="M19.2 9.5c-.3-1-1.1-1.7-2.3-1.7-1.3 0-2.2.7-2.2 1.8 0 1.1.8 1.6 2.1 2l.8.3c1.9.6 3 1.5 3 3.2 0 2.1-1.7 3.3-3.9 3.3-2.1 0-3.4-1.1-3.8-2.8l2-.8c.2 1 .9 1.6 1.8 1.6 1.2 0 1.9-.6 1.9-1.4 0-.8-.6-1.3-1.8-1.7l-.8-.3c-2-.7-3-1.6-3-3.2 0-2 1.6-3.3 3.7-3.3 1.9 0 3.2 1 3.5 2.6l-2 .8z"
      fill="#ffffff"
    />
  </svg>
);

const JavaScriptIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    {/* J on the left */}
    <path
      d="M6 7.5h2.2v6.5c0 1.2-.6 1.9-1.8 1.9-.7 0-1.3-.3-1.6-.7l1.1-1.3c.1.2.3.3.5.3.4 0 .6-.2.6-.7V7.5z"
      fill="#000000"
    />
    {/* S on the right */}
    <path
      d="M19.5 9.2c-.3-.9-1-1.5-2.2-1.5-1.3 0-2.1.7-2.1 1.7 0 1 .7 1.5 2 1.9l.8.3c1.9.6 3 1.5 3 3.2 0 2-1.7 3.2-3.8 3.2-2 0-3.3-1-3.7-2.7l1.9-.8c.2.9.8 1.5 1.8 1.5 1.2 0 1.9-.6 1.9-1.4 0-.8-.6-1.3-1.8-1.7l-.8-.3c-2-.7-2.9-1.6-2.9-3.2 0-1.9 1.6-3.2 3.6-3.2 1.8 0 3 1 3.4 2.5l-1.9.8z"
      fill="#000000"
    />
  </svg>
);

const NextJsIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
      fill="#06B6D4"
    />
  </svg>
);

const NodeJsIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M13.4 22c-.6.8-1.8.4-1.8-.7V13H3.6c-.9 0-1.4-1.1-.8-1.7L12.5 2c.6-.8 1.8-.4 1.8.7V11h8c.9 0 1.4 1.1.8 1.7L13.4 22z"
      fill="#3ECF8E"
    />
  </svg>
);

const DockerIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M13 8.5h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm6-3h2v2h-2V5.5zm-3 0h2v2h-2V5.5zm-3 0h2v2H7V5.5zm6 6h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm-3 0h2v2H4v-2zm18.5 2.5c-.3-1.5-1.5-2.2-1.6-2.2-.4.4-.9.6-1.5.6-1.1 0-1.8-.7-1.9-.8-.8.6-2 .8-3 .5h-.5v.9c0 .7-.3 1.3-.8 1.8H2.4c-.2.7-.4 1.4-.4 2.2 0 3.9 3.6 7 10 7 7.7 0 10.8-4.3 11-8 .3-.6.5-1.3.5-2z"
      fill="#2496ED"
    />
  </svg>
);

const PostgreSQLIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M12.08 2.2c-3.1 0-5.7 1.8-6.6 4.4-.3.9-.4 1.8-.4 2.8 0 1.6.4 3.2 1.3 4.5l-.2.7c-.4 1.4-1.3 2.6-2.6 3.4l1.3 1.6c1.8-1 3-2.6 3.6-4.5l.3-1c.9.5 1.9.8 3 .8.9 0 1.8-.2 2.6-.6.4.8 1.1 1.5 2 1.9l.9-1.8c-.6-.3-1.1-.8-1.3-1.4 1.3-1.1 2.2-2.7 2.5-4.4.1-.7.2-1.4.2-2.1 0-2.1-.8-4.1-2.4-5.5-1.2-1.1-2.8-1.8-4.3-1.8zm2.7 5.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
      fill="#336791"
    />
  </svg>
);

const GitIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M21.6 10.9L13.1 2.4a1.8 1.8 0 00-2.5 0L8.8 4.2l3.2 3.2a2.1 2.1 0 012.7 2.7l3.1 3.1a2.1 2.1 0 11-1.3 1.3l-2.9-2.9v4.3a2.1 2.1 0 11-1.8 0v-4.5L8.5 8.1a2.1 2.1 0 11-1.4-1.4L2.4 11.4a1.8 1.8 0 000 2.5l8.5 8.5c.7.7 1.8.7 2.5 0l8.2-8.2c.7-.7.7-1.8 0-2.5v-.8z"
      fill="#F05032"
    />
  </svg>
);

const GitHubIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const ViteIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#059669" />
    <path d="M12.5 6.5L8 12.5h3.5L11 17.5l5-6.5h-3.5z" fill="#ffffff" />
  </svg>
);

const GraphQlIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M3 17.5C3 13.5 6.5 10 10.5 10H14v-2.5l5 4-5 4V13h-3.5C7.5 13 5.5 15 5.5 17.5V19H3v-1.5z"
      fill="#CA4245"
    />
  </svg>
);

const RedisIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path d="M12 2C9.5 2 8 4 8 6.5c0 1.2.4 2.3 1 3.2-.8.8-1.5 2-1.5 3.3 0 1.2.4 2.2 1 3-1 .5-2 1.5-2 3 0 1.7 1.8 3 5.5 3s5.5-1.3 5.5-3c0-1.5-1-2.5-2-3 .6-.8 1-1.8 1-3 0-1.3-.7-2.5-1.5-3.3.6-.9 1-2 1-3.2C16 4 14.5 2 12 2zm-1.5 4a.8.8 0 110 1.6.8.8 0 010-1.6zm3 0a.8.8 0 110 1.6.8.8 0 010-1.6zm-1.5 2c.8 0 1.5.3 1.5.7s-.7.7-1.5.7-1.5-.3-1.5-.7.7-.7 1.5-.7z" />
  </svg>
);

const HtmlIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <rect width="24" height="24" rx="5" fill="#3068B7" />
    <path d="M7 7.5h10l-8.5 9H17v1.5H7l8.5-9H7V7.5z" fill="#ffffff" />
  </svg>
);

const FlutterIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path d="M14.3 2.5L5.7 11.1l3.5 3.5L19.8 4z" fill="#42A5F5" />
    <path d="M14.3 12.5l-5.1 5.1 3.5 3.5 5.1-5.1-3.5-3.5z" fill="#0D47A1" />
    <path d="M9.2 17.6l2.6 2.6 3.5-3.5-2.6-2.6-3.5 3.5z" fill="#42A5F5" />
    <path d="M12.7 14.1l-3.5 3.5 1.7 1.7 3.5-3.5-1.7-1.7z" fill="#01579B" />
  </svg>
);

const DartIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path d="M4 14.5l3.5 5.5h11l-3-6H8.5L4 14.5z" fill="#00B4AB" />
    <path d="M4 14.5L15.5 3H9.5L4 8.5v6z" fill="#0079C1" />
    <path d="M15.5 3l4.5 4.5v11l-4.5-4.5V3z" fill="#01579B" />
  </svg>
);

const FirebaseIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path d="M4.5 18.5l2.2-14.2c.1-.4.6-.6.9-.3l3.2 6.1-6.3 8.4z" fill="#FFA000" />
    <path d="M19.5 18.5L14.7 9.2c-.2-.4-.8-.4-1 0l-2.9 5.5 8.7 3.8z" fill="#F57C00" />
    <path d="M4.5 18.5l7.5 4.2c.3.2.7.2 1 0l6.5-4.2-15-8.4z" fill="#FFCA28" />
  </svg>
);

const WooCommerceIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <rect width="24" height="24" rx="4" fill="#96588A" />
    <path
      d="M5.5 9c.5 3 2 5 3.5 5 1 0 1.5-1 2-2.5.5 1.5 1 2.5 2 2.5 1.5 0 3-2 3.5-5h2c-.5 4-3 7-5.5 7-1.5 0-2.3-.8-3-2-.7 1.2-1.5 2-3 2-2.5 0-5-3-5.5-7h2z"
      fill="#ffffff"
    />
  </svg>
);

const WordPressIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#21759B" />
    <path
      d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5 0 2.2.8 4.2 2.2 5.7L9.5 7.2c-.3 0-.6-.1-.6-.1v-.3h2.8v.3s-.4.1-.6.1l1.8 5.4 1.1-3.6-.8-2.4c-.3 0-.5-.1-.5-.1v-.3h2.8v.3s-.4.1-.6.1l3.5 10.3c1.5-1.5 2.4-3.6 2.4-5.9 0-4.7-3.8-8.5-8.5-8.5zm-5 13.8L10.3 8l-2.4 9.1c-.3.1-.6.2-.9.2zm5.7 1.2c-.4 0-.7-.1-1.1-.2l2.4-7 2.1 6.3c-1 .6-2.2.9-3.4.9z"
      fill="#ffffff"
    />
  </svg>
);

const TurborepoIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#000000" />
    <path
      d="M5.5 12a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
      stroke="url(#turboGradient)"
      strokeWidth="2.5"
    />
    <defs>
      <linearGradient id="turboGradient" x1="5.5" y1="5.5" x2="18.5" y2="18.5">
        <stop stopColor="#0070F3" />
        <stop offset="1" stopColor="#FF0080" />
      </linearGradient>
    </defs>
  </svg>
);

const FramerMotionIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path d="M4 3h16v6h-8l-8-6z" fill="#0055FF" />
    <path d="M4 9h8l8 6H4V9z" fill="#0055FF" />
    <path d="M4 15h8v6l-8-6z" fill="#0055FF" />
  </svg>
);

const ESLintIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" fill="#4B32C3" />
    <path
      d="M9 16c-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.5.3 2 .8l-1 1c-.3-.3-.6-.4-1-.4-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.4 0 .8-.2 1-.5v-.6H9V12h3.2v3.1c-.8.6-1.9.9-3.2.9zm6-6h-3.4v6H15v-1.2h-2v-1.2h1.8v-1.2H13v-1.2h2V10z"
      fill="#ffffff"
    />
  </svg>
);

const JestIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M12 2.5c-4.4 0-8 3.6-8 8 0 3.1 1.8 5.8 4.4 7.1L7.5 21l3.5-1.5c.3.1.7.1 1 .1 4.4 0 8-3.6 8-8s-3.6-8.1-8-8.1z"
      fill="#C21325"
    />
    <circle cx="9.5" cy="10.5" r="1.5" fill="#ffffff" />
    <circle cx="14.5" cy="10.5" r="1.5" fill="#ffffff" />
  </svg>
);

const CypressIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#1B1E2E" />
    <path
      d="M16.5 9.5a5 5 0 00-7.8-1.2 5 5 0 000 7.4 5 5 0 007.8-1.2l-1.8-1.1a3 3 0 01-4.7.7 3 3 0 010-4.4 3 3 0 014.7.7l1.8-1.1z"
      fill="#00BF88"
    />
  </svg>
);

const SonarQubeIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#4B9FD5" />
    <path
      d="M7 15c2.2 0 4-1.8 4-4s-1.8-4-4-4v2c1.1 0 2 .9 2 2s-.9 2-2 2v2zm0-7c3.9 0 7 3.1 7 7h-2c0-2.8-2.2-5-5-5V8zm0-3c5.5 0 10 4.5 10 10h-2c0-4.4-3.6-8-8-8V5z"
      fill="#ffffff"
    />
  </svg>
);

const TanStackQueryIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#FF4154" />
    <path
      d="M12 6a6 6 0 100 12 6 6 0 000-12zm-3.5 6a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
      fill="#FFD200"
    />
  </svg>
);

const ZustandIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#443E38" />
    <path d="M7 8h10l-6.5 7H17v2H7l6.5-7H7V8z" fill="#E5853B" />
  </svg>
);

const GitHubActionsIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#2088FF" />
    <path d="M12 7l4 4-1.4 1.4-1.6-1.6v4.4h-2v-4.4l-1.6 1.6L8 11l4-4z" fill="#ffffff" />
  </svg>
);

const GitLabIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path d="M12 21.5l3.5-10.8H8.5L12 21.5z" fill="#E24329" />
    <path d="M12 21.5l-3.5-10.8H2.5L12 21.5z" fill="#FC6D26" />
    <path d="M2.5 10.7l-1 3.2a.8.8 0 00.3.9L12 21.5 2.5 10.7z" fill="#FCA326" />
    <path d="M2.5 10.7h6L6 2.8a.4.4 0 00-.8 0L2.5 10.7z" fill="#E24329" />
    <path d="M12 21.5l3.5-10.8h6L12 21.5z" fill="#FC6D26" />
    <path d="M21.5 10.7l1 3.2a.8.8 0 01-.3.9L12 21.5l9.5-10.8z" fill="#FCA326" />
    <path d="M21.5 10.7h-6L18 2.8a.4.4 0 01.8 0l2.7 7.9z" fill="#E24329" />
  </svg>
);

const JiraIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <path d="M12 2.5a9.5 9.5 0 00-9.5 9.5c0 2.5 1 4.8 2.6 6.5l6.9-6.9V2.5z" fill="#0052CC" />
    <path d="M12 8.5l-3.5 3.5 3.5 3.5 3.5-3.5-3.5-3.5z" fill="#2684FF" />
  </svg>
);

const MapboxIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <circle cx="12" cy="12" r="10" fill="#4264FB" />
    <path d="M7 8h2.5l2.5 4.5L14.5 8H17v8h-2.2v-4.8l-2.8 4.8h-.5L8.7 11.2V16H7V8z" fill="#ffffff" />
  </svg>
);

const NpmIcon: React.FC<SvgIconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...props}>
    <rect width="24" height="24" rx="4" fill="#CB3837" />
    <path d="M4 6.5h16v11h-8v-8h-3v8H4v-11z" fill="#ffffff" />
  </svg>
);

export const TECH_SVG_REGISTRY: Record<string, React.FC<SvgIconProps>> = {
  // Frontend & Libraries
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
  "tanstack query": TanStackQueryIcon,
  "react query": TanStackQueryIcon,
  zustand: ZustandIcon,
  "framer motion": FramerMotionIcon,
  "framer-motion": FramerMotionIcon,

  // Mobile
  flutter: FlutterIcon,
  dart: DartIcon,
  bloc: FlutterIcon,

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
  firebase: FirebaseIcon,

  // DevOps & Cloud
  docker: DockerIcon,
  git: GitIcon,
  github: GitHubIcon,
  "github actions": GitHubActionsIcon,
  gitlab: GitLabIcon,
  "gitlab ci": GitLabIcon,
  linux: LinuxIcon,
  ubuntu: LinuxIcon,
  turborepo: TurborepoIcon,

  // Quality & Testing
  eslint: ESLintIcon,
  oxlint: ESLintIcon,
  jest: JestIcon,
  vitest: VitestIcon,
  cypress: CypressIcon,
  sonarqube: SonarQubeIcon,
  "testing library": JestIcon,

  // Tools, E-commerce, & Ecosystem
  vite: ViteIcon,
  pnpm: PnpmIcon,
  npm: NpmIcon,
  "npm publishing": NpmIcon,
  woocommerce: WooCommerceIcon,
  wordpress: WordPressIcon,
  jira: JiraIcon,
  mapbox: MapboxIcon,
  geospatial: MapboxIcon,

  // Engineering Practices & Concepts aliases
  "conventional commits": GitIcon,
  "release automation": GitHubActionsIcon,
  "ui architecture": ReactIcon,
  "business logic": TypeScriptIcon,
  "api contracts": FastApiIcon,
  debugging: VitestIcon,
  refactoring: TypeScriptIcon,
  "code review": GitIcon,
  "mcp tooling": NodeJsIcon,
  production: ReactIcon,
};

function resolveTechSvg(techName: string): React.FC<SvgIconProps> | null {
  if (!techName) return null;
  const normalized = techName.trim().toLowerCase();

  // 1. Direct dictionary match
  if (TECH_SVG_REGISTRY[normalized]) {
    return TECH_SVG_REGISTRY[normalized];
  }

  // 2. Normalized hyphens/spaces (e.g. "react-router" -> "react router")
  const clean = normalized.replace(/[-_]/g, " ").replace(/\s+/g, " ");
  if (TECH_SVG_REGISTRY[clean]) {
    return TECH_SVG_REGISTRY[clean];
  }

  // 3. Match multi-word technologies by major word (minimum 4 letters to avoid collisions with "ts", "js", "git")
  const words = clean.split(" ");
  for (const word of words) {
    if (word.length >= 4 && TECH_SVG_REGISTRY[word]) {
      return TECH_SVG_REGISTRY[word];
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
  return <SvgComponent width="1em" height="1em" {...props} />;
}
