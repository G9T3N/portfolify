import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useProjects } from "@/queries";
import { ProjectCard } from "./portfolio/ProjectCard";

const DEFAULT_PROJECTS = [
  {
    id: "sofa-platform",
    title: "Sofa Platform",
    description:
      "Production web product work spanning reusable React interfaces, API integration, application state, debugging, and maintainable feature delivery.",
    category: "web",
    status: "live",
    thumbnail_url: null,
    tech_stack: ["React", "TypeScript", "REST", "Production"],
    live_url: "https://play.sofa.ye",
    code_url: null,
  },
  {
    id: "portfolify-project",
    title: "Portfolify",
    description:
      "A TypeScript-based public project focused on modern portfolio/product presentation and reusable frontend structure.",
    category: "web",
    status: "live",
    thumbnail_url: null,
    tech_stack: ["TypeScript", "React", "UI"],
    live_url: null,
    code_url: "https://github.com/G9T3N/portfolify",
  },
  {
    id: "open-source-npm",
    title: "Open Source & NPM",
    description:
      "Reusable React utilities and Mapbox tooling published under the g9t3n namespace, including Skeletune and geospatial packages.",
    category: "open-source",
    status: "live",
    thumbnail_url: null,
    tech_stack: ["NPM", "React", "Mapbox", "Open Source"],
    live_url: "https://www.npmjs.com/~g9t3n",
    code_url: "https://github.com/G9T3N",
  },
];

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
                  onClick={() => setActiveCategory(cat)}
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
        <div className="flex flex-col gap-8 relative pb-32">
          {isLoading ? (
            <div className="flex flex-col gap-12">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-full h-[60vh] bg-[var(--color-bg-card)] rounded-4xl animate-pulse border border-[var(--color-border-default)]"
                />
              ))}
            </div>
          ) : displayProjects.length === 0 ? (
            <div className="flex items-center justify-center h-[50vh] text-[var(--color-text-muted)]">
              <p className="text-lg">No projects to display yet.</p>
            </div>
          ) : (
            displayProjects.map((project, index) => (
              <div
                key={project.id}
                className="sticky w-full"
                style={{ top: `calc(10vh + ${index * 2}0px)` }}
              >
                <ProjectCard project={project} index={index} total={displayProjects.length} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
