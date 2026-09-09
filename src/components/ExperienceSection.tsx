import { motion } from "framer-motion";
import { useWorkExperiences } from "@/queries";
import { ExternalLink, Briefcase, MapPin } from "lucide-react";
import { useMemo } from "react";

interface FallbackExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  is_current: boolean;
  start_date: string;
  description: string;
  url?: string;
  highlights: string[];
}

const DEFAULT_EXPERIENCES: FallbackExperience[] = [
  {
    id: "exp-sofa",
    company: "Sofa",
    position: "Frontend / Full-Stack Product Engineer",
    location: "Sana'a, Yemen",
    is_current: true,
    start_date: "2023",
    description:
      "Frontend & full-stack product engineering with React and TypeScript, API integration, reusable UI architecture, debugging, and production delivery.",
    url: "https://play.sofa.ye",
    highlights: ["React & TypeScript", "REST APIs", "UI Architecture", "Production Delivery"],
  },
  {
    id: "exp-sparksoft",
    company: "Sparksoft",
    position: "Software Engineer",
    location: "Remote",
    is_current: true,
    start_date: "2023",
    description:
      "Remote engineering across private production codebases, collaborative Git workflows, dashboards, commerce-oriented products, CI/CD, and quality gates.",
    url: "https://sparksoft.io",
    highlights: ["Collaborative Git", "Commerce Dashboards", "CI/CD Pipelines", "Quality Gates"],
  },
  {
    id: "exp-oneplusone",
    company: "OnePlusOneTech",
    position: "Software Engineer",
    location: "Remote",
    is_current: true,
    start_date: "2024",
    description:
      "Remote software engineering in private repositories with distributed collaboration, feature delivery, debugging, code review practices, and maintainable implementation.",
    highlights: ["Distributed Collaboration", "Feature Delivery", "Code Review", "Maintainability"],
  },
];

const ExperienceSection = () => {
  const { data: dbExperiences } = useWorkExperiences();

  // If DB experiences contain real (non-placeholder) records, use them, otherwise use DEFAULT_EXPERIENCES
  const experiences = useMemo(() => {
    if (!dbExperiences || dbExperiences.length === 0) {
      return DEFAULT_EXPERIENCES;
    }
    const hasPlaceholder = dbExperiences.some((e) =>
      /Tech Innovations|Digital Solutions|StartupXYZ/i.test(e.company),
    );
    if (hasPlaceholder) {
      return DEFAULT_EXPERIENCES;
    }
    return dbExperiences.map((e) => ({
      id: e.id,
      company: e.company,
      position: e.position,
      location: e.location || "Remote",
      is_current: e.is_current ?? true,
      start_date: e.start_date,
      description: e.description || "",
      url: (e as unknown as { url?: string }).url,
      highlights: e.achievements || [],
    }));
  }, [dbExperiences]);

  return (
    <section
      id="experience"
      aria-label="Experience"
      className="px-4 md:px-8 lg:px-12 py-16 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto">
        {/* Section Label */}
        <div className="flex justify-center mb-16">
          <motion.h2
            className="section-label text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Work Experience
          </motion.h2>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.id}
              className="group relative flex flex-col justify-between bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-3xl p-6 lg:p-8 hover:border-[var(--color-primary)] transition-all duration-300 shadow-sm hover:shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]">
                    <Briefcase className="w-3 h-3 text-[var(--color-mp-primary)]" />
                    {exp.is_current ? "Current Role" : exp.start_date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                  {exp.company}
                </h3>
                <p className="text-sm font-mono text-[var(--color-text-secondary)] mt-1 mb-4">
                  {exp.position}
                </p>

                <p className="text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {exp.description}
                </p>
              </div>

              <div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {exp.highlights.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {exp.url && (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${exp.company} website`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors pt-2 border-t border-[var(--color-border-default)] w-full"
                  >
                    <span>Visit Company</span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
