import { motion } from "framer-motion";
import { GitBranch, ExternalLink, ArrowRight } from "lucide-react";

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail_url: string | null;
    tech_stack: string[] | null;
    live_url: string | null;
    code_url: string | null;
  };
  index: number;
  total?: number;
}

/** Returns true when a URL looks like a real, non-placeholder link */
function isRealUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return !(
    lower.includes("example.com") ||
    lower.includes("github.com/example") ||
    lower === "#" ||
    lower === ""
  );
}

export function ProjectCard({ project, index, total = 3 }: ProjectCardProps) {
  const hasRealLive = isRealUrl(project.live_url);
  const hasRealCode = isRealUrl(project.code_url);
  const hasAnyLink = hasRealLive || hasRealCode;
  const primaryLink = hasRealLive ? project.live_url! : hasRealCode ? project.code_url! : null;

  return (
    <motion.div
      className="w-full h-[70vh] md:h-[60vh] relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[var(--color-bg-card)] rounded-[2rem] border border-[var(--color-border-default)] shadow-2xl overflow-hidden flex flex-col md:flex-row transition-transform duration-500 ease-out origin-top hover:scale-[1.01]">
        
        {/* Left: Thumbnail Section */}
        <div className="w-full md:w-[55%] h-[45%] md:h-full relative overflow-hidden bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-card)] border-b md:border-b-0 md:border-r border-[var(--color-border-default)]">
          {project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/favicon.svg"
                alt="Mr.Err"
                className="w-24 h-24 md:w-40 md:h-40 opacity-10 group-hover:opacity-30 transition-opacity duration-500 grayscale"
              />
            </div>
          )}
          {/* Category Badge overlay on image */}
          <div className="absolute top-6 left-6 z-10">
            <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white shadow-lg">
              {project.category}
            </span>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="w-full md:w-[45%] h-[55%] md:h-full flex flex-col p-8 md:p-12 relative z-10 bg-[var(--color-bg-card)]">
          
          <div className="text-[var(--color-text-muted)] text-sm font-mono mb-4 opacity-50">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
            {project.title}
          </h3>

          <p className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors duration-300 text-base md:text-lg line-clamp-3 md:line-clamp-4 mb-8">
            {project.description}
          </p>

          {/* Tech stack pills */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-auto">
              {project.tech_stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          {hasAnyLink && (
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[var(--color-border-default)]">
              {hasRealLive && (
                <a
                  href={project.live_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-mp-primary)] transition-colors"
                >
                  <ExternalLink size={18} /> Live Site
                </a>
              )}
              {hasRealCode && (
                <a
                  href={project.code_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <GitBranch size={18} /> Source Code
                </a>
              )}
              {primaryLink && (
                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto w-12 h-12 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border-default)] group-hover:bg-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)] transition-colors"
                >
                  <ArrowRight
                    className="group-hover:-rotate-45 transition-transform duration-300"
                    size={20}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
