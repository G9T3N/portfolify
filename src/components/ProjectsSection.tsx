import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProjectCard } from "./portfolio/ProjectCard";
import { useProjectsFilter } from "@/routes/_index/utils/hooks/use-projects-filter";

export const ProjectsSection = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    visibleProjects,
    hasMore,
    remainingCount,
    isExpanded,
    toggleExpanded,
    isLoading,
  } = useProjectsFilter();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleToggleExpanded = () => {
    if (isExpanded) {
      toggleExpanded();
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      toggleExpanded();
    }
  };

  return (
    <section id="projects" className="min-h-screen bg-[var(--color-bg-primary)] py-16 md:py-32">
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
        <div className="flex flex-col gap-8 pb-16">
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
            className="flex flex-col items-center justify-center mt-8 mb-16 z-30"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={handleToggleExpanded}
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
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
