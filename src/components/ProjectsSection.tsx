import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useProjects } from "@/queries";
import { ProjectCard } from "./portfolio/ProjectCard";
import {
  DEFAULT_PROJECTS,
  FEATURED_PROJECTS_COUNT,
} from "@/routes/_index/utils/constants/project-sections";

/** Titles that look like placeholder/test content */
const PLACEHOLDER_PATTERNS =
  /^(test|asdasd|asd|placeholder|lorem|untitled|example|secureauth dashboard|cryptotracker pro|healthsync mobile|devops monitor)$/i;

function isPlaceholder(project: {
  title: string;
  description: string;
  live_url?: string | null;
  code_url?: string | null;
}): boolean {
  if (PLACEHOLDER_PATTERNS.test(project.title.trim())) return true;
  if (PLACEHOLDER_PATTERNS.test(project.description.trim())) return true;
  if (
    project.live_url?.includes("example.com") &&
    (!project.code_url || project.code_url.includes("example.com"))
  ) {
    return true;
  }
  return false;
}

const ProjectsSection = () => {
  const { data: projects, isLoading } = useProjects();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter out placeholder projects and ensure they are 'live'
  const validProjects = useMemo(() => {
    const filtered = (projects ?? []).filter((p) => !isPlaceholder(p) && p.status === "live");
    return filtered.length > 0 ? filtered : DEFAULT_PROJECTS;
  }, [projects]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(validProjects.map((p) => p.category.toLowerCase()));
    return ["all", ...Array.from(cats)];
  }, [validProjects]);

  // Filter by active category
  const displayProjects = useMemo(() => {
    if (activeCategory === "all") return validProjects;
    return validProjects.filter((p) => p.category.toLowerCase() === activeCategory);
  }, [validProjects, activeCategory]);

  const hasMore = displayProjects.length > FEATURED_PROJECTS_COUNT;
  const remainingCount = displayProjects.length - FEATURED_PROJECTS_COUNT;

  const visibleProjects = useMemo(() => {
    if (isExpanded || !hasMore) return displayProjects;
    return displayProjects.slice(0, FEATURED_PROJECTS_COUNT);
  }, [displayProjects, isExpanded, hasMore]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    if (isExpanded) {
      setIsExpanded(false);
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-[var(--color-bg-primary)] py-16 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section label + category filters */}
        <div className="flex flex-col items-center gap-6 mb-24">
          <motion.h2
            className="section-label"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Work
          </motion.h2>

          {/* Category filter tabs */}
          {categories.length > 2 && (
            <motion.div
              className="flex items-center gap-2 flex-wrap justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-2 text-sm font-medium rounded-full border transition-all cursor-pointer capitalize ${
                    activeCategory === cat
                      ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] border-[var(--color-text-primary)]"
                      : "border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Projects list */}
        <div className="flex flex-col gap-8 relative pb-16">
          {isLoading ? (
            <div className="flex flex-col gap-12">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-full h-[60vh] bg-[var(--color-bg-card)] rounded-4xl animate-pulse border border-[var(--color-border-default)]"
                />
              ))}
            </div>
          ) : visibleProjects.length === 0 ? (
            <div className="flex items-center justify-center h-[50vh] text-[var(--color-text-muted)]">
              <p className="text-lg">No projects to display yet.</p>
            </div>
          ) : (
            visibleProjects.map((project, index) => (
              <div
                key={project.id}
                className="sticky w-full"
                style={{ top: `calc(10vh + ${Math.min(index, 4) * 20}px)` }}
              >
                <ProjectCard project={project} index={index} total={visibleProjects.length} />
              </div>
            ))
          )}
        </div>

        {/* Read More / Show Less CTA */}
        {hasMore && (
          <motion.div
            className="flex flex-col items-center justify-center mt-8 mb-16 relative z-30"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={toggleExpanded}
              aria-expanded={isExpanded}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] hover:border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  <span>Read More Projects</span>
                  <span className="px-2.5 py-0.5 text-xs font-mono font-normal rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-default)] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">
                    +{remainingCount}
                  </span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </>
              )}
            </button>
            <p className="text-xs text-[var(--color-text-muted)] mt-3">
              {isExpanded
                ? `Showing all ${displayProjects.length} projects`
                : `Showing 5 featured projects · Click to explore ${displayProjects.length} total`}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
