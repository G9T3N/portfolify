import { useParams, useNavigate } from "react-router";
import { useProject } from "./queries";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, GitBranch, Loader2 } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-primary)] p-4 text-center">
        <h1 className="text-3xl font-bold font-mono text-[var(--color-text-primary)] mb-4">Project Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-md">
          The project you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="cyber-button flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pb-24">
      {/* Header / Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border-default)] px-4 py-4 md:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <div className="flex items-center gap-3">
            {project.code_url && (
              <a
                href={project.code_url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-[var(--color-border-default)] hover:border-[var(--color-text-primary)] transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                Source
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 md:px-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Project Title & Category */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]">
                {project.category as string || "Project"}
              </span>
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-default)] text-primary">
                {project.status as string || "Live"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {project.title as string}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
              {project.description as string}
            </p>
          </div>

          {/* Thumbnail */}
          {project.thumbnail_url && (
            <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-[var(--color-border-default)] shadow-2xl mb-16 bg-[var(--color-bg-card)]">
              <div className="aspect-[16/9] w-full">
                <img
                  src={project.thumbnail_url as string}
                  alt={project.title as string}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6 font-mono text-[var(--color-text-primary)] border-b border-[var(--color-border-default)] pb-4">
                About this project
              </h2>
              <div className="text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">
                {project.full_content as string || (project.description as string)}
              </div>
              
              {project.embed_url && (
                <div className="mt-12 rounded-2xl overflow-hidden border border-[var(--color-border-default)]">
                  <iframe 
                    src={project.embed_url as string}
                    className="w-full aspect-video"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            <div>
              <div className="glass-card p-6 md:p-8 rounded-3xl sticky top-24">
                <h3 className="text-lg font-bold mb-4 font-mono">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 ? (
                    project.tech_stack.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[var(--color-text-muted)]">No technologies listed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
