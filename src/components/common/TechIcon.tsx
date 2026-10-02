import React from "react";
import { cn } from "@/lib/utils";
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
    width="1em"
    height="1em"
    {...props}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = "w-4 h-4",
  fallbackIcon,
}) => {
  const hasExplicitSize = /\b(w-|size-)\S+/.test(className);
  const resolvedClass = cn(
    "inline-block shrink-0 align-middle",
    !hasExplicitSize && "w-[1em] h-[1em]",
    className,
  );

  const iconNode = renderTechSvg(name, {
    className: resolvedClass,
    "aria-hidden": "true",
    title: name,
  });

  if (iconNode) {
    return iconNode;
  }

  if (fallbackIcon) {
    return (
      <span className={cn("inline-flex items-center justify-center shrink-0", resolvedClass)}>
        {fallbackIcon}
      </span>
    );
  }

  return (
    <DefaultCodeIcon
      className={cn("text-[var(--color-text-muted)]", resolvedClass)}
      aria-hidden="true"
    />
  );
};

export default TechIcon;
