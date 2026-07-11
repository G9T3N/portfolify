import { useRef, useState, useEffect, ReactNode } from "react";
import { useInView } from "framer-motion";

interface LazyInViewProps {
  children: ReactNode;
  fallback?: ReactNode;
  /**
   * Margin around the root. Can have values similar to the CSS margin property,
   * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
   * Positive margin means the element will trigger *before* it enters the viewport.
   * Default: "400px" (trigger when 400px away from viewport)
   */
  margin?: string;
  className?: string;
}

/**
 * A wrapper component that only renders its children once it approaches the viewport.
 * Useful for wrapping `React.lazy()` imports so their JS chunks aren't fetched on initial page load.
 */
export function LazyInView({
  children,
  fallback = null,
  margin = "400px",
  className = "w-full h-full min-h-[50px]",
}: LazyInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <div ref={ref} className={className}>
      {isInView ? children : fallback}
    </div>
  );
}
