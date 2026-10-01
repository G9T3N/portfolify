import React from "react";
import { renderTechSvg } from "./tech-icons/tech-svg-registry";

export interface TechIconProps {
  name: string;
  colored?: boolean;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

const DefaultCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/**
 * Renders an official vector SVG icon for a given technology name.
 * Replaces the 1.5MB Devicon font with ultra-fast, zero-overhead inline vectors.
 * Falls back to an inline code icon if the brand logo is not in the registry.
 */
export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = "w-4 h-4",
  fallbackIcon,
}) => {
  const iconNode = renderTechSvg(name, {
    className: `inline-flex items-center justify-center shrink-0 align-middle ${className}`,
    "aria-hidden": "true",
    title: name,
  });

  if (iconNode) {
    return iconNode;
  }

  if (fallbackIcon) {
    return <span className={`inline-flex items-center shrink-0 ${className}`}>{fallbackIcon}</span>;
  }

  return (
    <DefaultCodeIcon
      className={`w-3.5 h-3.5 text-muted-foreground shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default TechIcon;
