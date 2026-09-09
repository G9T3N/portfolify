import { motion } from "framer-motion";
import {
  Code,
  Layout,
  Globe,
  Server,
  GitBranch,
  ShieldCheck,
  Cpu,
  Terminal,
  Workflow,
} from "lucide-react";

const SKILLS_DATA = [
  {
    label: "Web",
    icon: Code,
    suffix: "development",
  },
  {
    label: "Interface",
    icon: Layout,
    suffix: "design",
  },
  {
    label: "Full-stack",
    icon: Globe,
    suffix: "engineering",
  },
  {
    label: "DevOps",
    icon: Workflow,
    suffix: "and automation",
  },
] as const;

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
  return (
    <section id="skills" className="px-4 md:px-8 lg:px-12 py-16 md:py-32 overflow-hidden">
      {/* Section label */}
      <motion.div
        className="flex justify-end mb-20 max-w-[1400px] 2xl:max-w-[1700px] mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-label">Skills &amp; Services</h2>
      </motion.div>

      {/* Massive typography rows */}
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto space-y-12 md:space-y-20 mb-24">
        {SKILLS_DATA.map((skill, index) => (
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
            <span className="text-5xl sm:text-6xl md:text-8xl  font-bold tracking-tight text-[var(--color-text-primary)]">
              {skill.label}
            </span>

            {/* Icon container */}
            <motion.div
              className="w-16 h-16 md:w-24 md:h-24 rounded-4xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <skill.icon className="w-8 h-8 md:w-12 md:h-12 text-[var(--color-text-secondary)]" />
            </motion.div>

            {/* Second word */}
            <span className="text-5xl sm:text-6xl md:text-8xl  font-bold tracking-tight text-[var(--color-text-primary)]">
              {skill.suffix}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Structured Skill Matrix Grid */}
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
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]"
                    >
                      {s}
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
