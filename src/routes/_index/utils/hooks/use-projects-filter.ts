import { useState, useMemo } from "react";
import { useProjects } from "@/queries";
import { getContentLocale, applyDirectArabicColumns } from "@/queries/translations";
import {
  DEFAULT_PROJECTS,
  FEATURED_PROJECTS_COUNT,
} from "@/routes/_index/utils/constants/project-sections";
import { isPlaceholderProject, deriveProjectCategories } from "../functions/project-helpers";

export function useProjectsFilter() {
  const { data: projects, isLoading } = useProjects();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter out placeholder projects and ensure they are 'live'
  const validProjects = useMemo(() => {
    const filtered = (projects ?? []).filter(
      (p) => !isPlaceholderProject(p) && p.status === "live",
    );
    if (filtered.length > 0) {
      return filtered;
    }
    const locale = getContentLocale();
    if (locale === "ar") {
      return DEFAULT_PROJECTS.map((p) =>
        applyDirectArabicColumns(p as unknown as Record<string, unknown>),
      ) as typeof DEFAULT_PROJECTS;
    }
    return DEFAULT_PROJECTS;
  }, [projects]);

  // Derived unique categories
  const categories = useMemo(() => {
    return deriveProjectCategories(validProjects);
  }, [validProjects]);

  // Filter by active category
  const displayProjects = useMemo(() => {
    if (activeCategory === "all") return validProjects;
    return validProjects.filter((p) => p.category?.toLowerCase() === activeCategory);
  }, [validProjects, activeCategory]);

  const hasMore = displayProjects.length > FEATURED_PROJECTS_COUNT;
  const remainingCount = Math.max(0, displayProjects.length - FEATURED_PROJECTS_COUNT);

  const visibleProjects = useMemo(() => {
    if (isExpanded || !hasMore) return displayProjects;
    return displayProjects.slice(0, FEATURED_PROJECTS_COUNT);
  }, [displayProjects, isExpanded, hasMore]);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return {
    projects: validProjects,
    categories,
    activeCategory,
    setActiveCategory,
    visibleProjects,
    hasMore,
    remainingCount,
    isExpanded,
    toggleExpanded,
    isLoading,
  };
}

export default useProjectsFilter;
