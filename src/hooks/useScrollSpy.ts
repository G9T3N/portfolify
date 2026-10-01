import { useState, useEffect } from "react";

interface UseScrollSpyOptions {
  sectionIds: readonly string[];
  rootMargin?: string;
  threshold?: number;
}

/**
 * Custom hook to track active section in the viewport using IntersectionObserver.
 * Dynamically re-observes when the user scrolls so lazily mounted sections are captured.
 */
export function useScrollSpy({
  sectionIds,
  rootMargin = "-40% 0px -55% 0px",
  threshold = 0,
}: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin, threshold },
    );

    const observed = new Set<string>();

    const observeSections = () => {
      for (const id of sectionIds) {
        if (observed.has(id)) continue;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observed.add(id);
        }
      }
    };

    observeSections();
    window.addEventListener("scroll", observeSections, { passive: true });

    return () => {
      observer.disconnect();
      observed.clear();
      window.removeEventListener("scroll", observeSections);
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}

export default useScrollSpy;
