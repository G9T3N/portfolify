import { motion } from "framer-motion";
import { Code, Server, GitBranch, ShieldCheck, Cpu, Terminal } from "lucide-react";
import { TechIcon } from "./common/TechIcon";
import { Trans } from "@lingui/react/macro";

import { useLocale } from "@/hooks/useLocale";

interface SkillItem {
  label: "Web" | "Interface" | "Full-stack" | "DevOps";
  tech: string;
  suffix: "development" | "design" | "engineering" | "and automation";
  swapInRtl?: boolean;
}

const SKILLS_DATA: readonly SkillItem[] = [
  {
    label: "Web",
    tech: "React",
    suffix: "development",
    swapInRtl: true,
  },
  {
    label: "Interface",
    tech: "Tailwind CSS",
    suffix: "design",
    swapInRtl: true,
  },
  {
    label: "Full-stack",
    tech: "Node.js",
    suffix: "engineering",
    swapInRtl: true,
  },
  {
    label: "DevOps",
    tech: "Docker",
    suffix: "and automation",
    swapInRtl: false,
  },
] as const;

type SkillWord = SkillItem["label"] | SkillItem["suffix"];

function renderSkillWord(key: SkillWord) {
  switch (key) {
    case "Web":
      return <Trans>Web</Trans>;
    case "Interface":
      return <Trans>Interface</Trans>;
    case "Full-stack":
      return <Trans>Full-stack</Trans>;
    case "DevOps":
      return <Trans>DevOps</Trans>;
    case "development":
      return <Trans>development</Trans>;
    case "design":
      return <Trans>design</Trans>;
    case "engineering":
      return <Trans>engineering</Trans>;
    case "and automation":
      return <Trans>and automation</Trans>;
  }
}

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "TanStack Query",
      "Zustand",
      "React Router",
      "Tailwind CSS",
    ],
  },
  {
    title: "APIs & Backend",
    icon: Server,
    skills: ["REST", "OpenAPI", "Zod", "Python", "FastAPI", "Node.js", "Supabase"],
  },
  {
    title: "CI/CD & Delivery",
    icon: GitBranch,
    skills: ["GitHub Actions", "GitLab CI", "Docker", "Conventional Commits", "Release Automation"],
  },
  {
    title: "Quality & Testing",
    icon: ShieldCheck,
    skills: ["ESLint", "SonarQube", "Oxlint", "Vitest", "Testing Library", "Jest", "Cypress"],
  },
  {
    title: "Engineering Practices",
    icon: Cpu,
    skills: [
      "UI Architecture",
      "Business Logic",
      "API Contracts",
      "Debugging",
      "Refactoring",
      "Code Review",
      "Jira",
    ],
  },
  {
    title: "Tooling & Ecosystem",
    icon: Terminal,
    skills: ["Linux", "Git", "GitHub", "Mapbox", "Geospatial", "MCP Tooling", "NPM Publishing"],
  },
] as const;

const SkillsSection = () => {
  const { isRtl } = useLocale();

  return (
    <section id="skills" className="px-4 md:px-8 lg:px-12 py-16 md:py-32 overflow-hidden">
      {/* Section label */}
      <motion.div
        className="flex justify-center mb-20 max-w-[1400px] 2xl:max-w-[1700px] mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading text-center">
          <Trans>Skills & Services</Trans>
        </h2>
      </motion.div>

      {/* Massive typography rows with Devicon center badges */}
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto space-y-12 md:space-y-20 mb-24">
        {SKILLS_DATA.map((skill, index) => {
          const firstWord = isRtl && skill.swapInRtl ? skill.suffix : skill.label;
          const secondWord = isRtl && skill.swapInRtl ? skill.label : skill.suffix;

          return (
            <motion.div
              key={skill.label}
              className="flex items-center justify-center flex-wrap gap-4 md:gap-8"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* First word */}
              <span className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {renderSkillWord(firstWord)}
              </span>

              {/* Tech icon badge */}
              <motion.div
                className="w-16 h-16 md:w-24 md:h-24 rounded-4xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.12, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <TechIcon name={skill.tech} className="text-3xl sm:text-4xl md:text-5xl" />
              </motion.div>

              {/* Second word */}
              <span className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {renderSkillWord(secondWord)}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Structured Skill Matrix Grid with Devicon icons */}
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className="p-6 bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-3xl flex flex-col justify-between hover:border-[var(--color-primary)] transition-colors shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {cat.title === "Frontend" ? (
                      <Trans>Frontend</Trans>
                    ) : cat.title === "APIs & Backend" ? (
                      <Trans>APIs & Backend</Trans>
                    ) : cat.title === "CI/CD & Delivery" ? (
                      <Trans>CI/CD & Delivery</Trans>
                    ) : cat.title === "Quality & Testing" ? (
                      <Trans>Quality & Testing</Trans>
                    ) : cat.title === "Engineering Practices" ? (
                      <Trans>Engineering Practices</Trans>
                    ) : cat.title === "Tooling & Ecosystem" ? (
                      <Trans>Tooling & Ecosystem</Trans>
                    ) : (
                      cat.title
                    )}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)] transition-all"
                    >
                      <TechIcon name={s} className="w-4 h-4 text-sm" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
