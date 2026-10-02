import { motion } from "framer-motion";
import { GitBranch, ExternalLink, ArrowRight } from "lucide-react";
import { TechIcon } from "@/components/common/TechIcon";
import { Trans } from "@lingui/react/macro";

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

export function ProjectCard({ project }: ProjectCardProps) {
  const hasRealLive = isRealUrl(project.live_url);
  const hasRealCode = isRealUrl(project.code_url);
  const hasAnyLink = hasRealLive || hasRealCode;
  const primaryLink = hasRealLive ? project.live_url! : hasRealCode ? project.code_url! : null;

  return (
    <motion.div
      className="w-full min-h-[520px] md:h-[60vh] bg-[var(--color-bg-card)] rounded-[2rem] border border-[var(--color-border-default)] overflow-hidden flex flex-col md:flex-row transition-transform duration-500 ease-out origin-top hover:scale-[1.01] group shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left: Thumbnail Section */}
      <div className="w-full md:w-[55%] h-[240px] md:h-full relative overflow-hidden bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-card)] border-b md:border-b-0 md:border-r border-[var(--color-border-default)] flex items-center justify-center">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src="/favicon.svg"
            alt="Mr.Err"
            width="160"
            height="160"
            loading="lazy"
            decoding="async"
            className="w-24 h-24 md:w-40 md:h-40 opacity-10 group-hover:opacity-30 transition-opacity duration-500 grayscale"
          />
        )}
      </div>

      {/* Right: Content Section */}
      <div className="w-full md:w-[45%] flex-1 flex flex-col p-8 md:p-12 bg-[var(--color-bg-card)] justify-between">
        <div>
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]">
              {project.category}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
            {project.title}
          </h3>

          <p className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors duration-300 text-base md:text-lg line-clamp-3 md:line-clamp-4 mb-6">
            {project.description}
          </p>

          {/* Tech stack pills */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] group-hover:border-[var(--color-border-hover)] transition-colors"
                >
                  <TechIcon name={tech} className="w-3.5 h-3.5" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        {hasAnyLink ? (
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[var(--color-border-default)]">
            {hasRealLive && (
              <a
                href={project.live_url!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live site for ${project.title}`}
                className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-mp-primary)] transition-colors"
              >
                <ExternalLink size={18} /> <Trans>Live Site</Trans>
              </a>
            )}
            {hasRealCode && (
              <a
                href={project.code_url!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.title}`}
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <GitBranch size={18} /> <Trans>Source Code</Trans>
              </a>
            )}
            {primaryLink && (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} project`}
                className="ms-auto w-12 h-12 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border-default)] group-hover:bg-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)] transition-colors"
              >
                <ArrowRight
                  className="group-hover:-rotate-45 rtl:group-hover:rotate-45 rtl:rotate-180 transition-transform duration-300"
                  size={20}
                />
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--color-border-default)]">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] px-3.5 py-1.5 rounded-full border border-[var(--color-border-default)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <Trans>Internal Dashboard</Trans>
            </span>
            <span className="text-xs font-mono text-[var(--color-text-muted)] opacity-70">
              <Trans>Private Access</Trans>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectCard;
