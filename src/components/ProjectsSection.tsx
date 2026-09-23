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
    id: "mrerror",
    title: "Mr.Err — mrerr.com",
    description:
      "The public personal site and brand home for Mr.Err. A fast, animated React + Vite experience with custom sections, dark theme, and GitHub-driven metrics.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/mrerror.png",
    tech_stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    live_url: "https://www.mrerr.com",
    code_url: "https://github.com/G9T3N/Mrerror",
  },
  {
    id: "mrerr-platform",
    title: "MRERR Platform",
    description:
      "A Turborepo monorepo powering mrerr.com, me.mrerr.com, and dashboard.mrerr.com with shared UI, design, and database packages.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/mrerr-platform.svg",
    tech_stack: ["React Router v7", "Turborepo", "pnpm", "TypeScript"],
    live_url: null,
    code_url: "https://github.com/G9T3N/me.portfolify",
  },
  {
    id: "portfolify-project",
    title: "Mr.Err Portfolio",
    description:
      "This site: an interactive React Router v7 portfolio with a Supabase CMS, bilingual Arabic/English content, and a custom admin dashboard.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/portfolify.svg",
    tech_stack: ["React Router v7", "Supabase", "Framer Motion", "Tailwind CSS"],
    live_url: null,
    code_url: "https://github.com/G9T3N/portfolify",
  },
  {
    id: "portfoliofy",
    title: "Portfoliofy",
    description:
      "A modern, data-driven portfolio generator that keeps a developer's showcase automatically in sync without manual updates.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/portfoliofy.svg",
    tech_stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    live_url: null,
    code_url: "https://github.com/G9T3N/old-porto",
  },
  {
    id: "solvera",
    title: "Solvera",
    description:
      "A bilingual luxury perfume storefront and administration dashboard built with Next.js 16, WooCommerce, and full Arabic/English routing.",
    category: "ecommerce",
    status: "live",
    thumbnail_url: "/projects/solvera.svg",
    tech_stack: ["Next.js 16", "React 19", "WooCommerce", "next-intl"],
    live_url: null,
    code_url: null,
  },
  {
    id: "digital-market",
    title: "Digital Market",
    description:
      "A production e-commerce marketplace with catalog, search, cart, multi-currency, and bilingual storefront experience.",
    category: "ecommerce",
    status: "live",
    thumbnail_url: "/projects/digitalmarket.png",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST"],
    live_url: "https://digitalmarket.coder4u.com",
    code_url: null,
  },
  {
    id: "hajzak-user",
    title: "HAJZAK User App",
    description:
      "A Flutter mobile app for discovering and booking Yemen's finest recreational properties, with BLoC state management and Firebase backend.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/hajzak-user.svg",
    tech_stack: ["Flutter", "Dart", "BLoC", "Firebase"],
    live_url: null,
    code_url: null,
  },
  {
    id: "hajzak-dashboard",
    title: "HAJZAK Dashboard",
    description:
      "A Flutter host portal and platform operations dashboard for managing properties, bookings, and providers on Supabase.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/hajzak-dashboard.svg",
    tech_stack: ["Flutter", "Dart", "BLoC", "Supabase"],
    live_url: null,
    code_url: null,
  },
  {
    id: "hajzak-console",
    title: "HAJZAK Admin Console",
    description:
      "An Arabic-first RTL web admin panel for property review, approval, and operations monitoring, built with Next.js 16 and PostgREST.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/hajzak-console.svg",
    tech_stack: ["Next.js 16", "PostgREST", "shadcn/ui", "RTL"],
    live_url: null,
    code_url: null,
  },
  {
    id: "sparksoft-platform",
    title: "Sparksoft Platform",
    description:
      "The Sparksoft company platform, featuring a fully automated deployment pipeline and production web delivery.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/sparksoft.svg",
    tech_stack: ["Next.js", "TypeScript", "CI/CD"],
    live_url: null,
    code_url: null,
  },
  {
    id: "hareer",
    title: "Hareer",
    description:
      "A production web product delivered for Sparksoft, built with a modern Next.js and TypeScript stack.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/hareer.svg",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    live_url: null,
    code_url: null,
  },
  {
    id: "code4u",
    title: "Code4U",
    description:
      "A Sparksoft front-end application platform sharing the organization's component and tooling conventions.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/code4u.svg",
    tech_stack: ["TypeScript", "React", "Web"],
    live_url: null,
    code_url: null,
  },
  {
    id: "landing-page",
    title: "Landing Page System",
    description:
      "A reusable Next.js marketing and landing page system used across Sparksoft products.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/landing-page.svg",
    tech_stack: ["Next.js", "React", "Tailwind CSS"],
    live_url: null,
    code_url: null,
  },
  {
    id: "big-cart",
    title: "Big Cart",
    description:
      "A cross-platform Flutter commerce application exploring scalable mobile shopping experiences.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/big-cart.svg",
    tech_stack: ["Flutter", "Dart", "Mobile"],
    live_url: null,
    code_url: "https://github.com/Big-cart/BIG-CART",
  },
  {
    id: "yemen-certificate",
    title: "Yemen Certificate",
    description:
      "A certificate issuance and verification platform serving organizations across Yemen.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/yemen-certificate.svg",
    tech_stack: ["PHP", "MySQL", "Web"],
    live_url: null,
    code_url: "https://github.com/G9T3N/yemen-certificate",
  },
  {
    id: "react-screenutil",
    title: "React ScreenUtil",
    description:
      "A React/TypeScript port of Flutter's flutter_screenutil, bringing responsive design scaling to React applications. Published on NPM.",
    category: "open-source",
    status: "live",
    thumbnail_url: "/projects/react-screenutil.svg",
    tech_stack: ["React", "TypeScript", "NPM"],
    live_url: "https://www.npmjs.com/package/@g9t3n/react-screenutil",
    code_url: "https://github.com/G9T3N/react_screenUtils",
  },
  {
    id: "skeletune",
    title: "Skeletune",
    description:
      "A small, composable React skeleton loading wrapper component with customizable animation, styling, and children. Published on NPM.",
    category: "open-source",
    status: "live",
    thumbnail_url: "/projects/skeletune.svg",
    tech_stack: ["React", "TypeScript", "NPM", "UnoCSS"],
    live_url: "https://www.npmjs.com/package/@g9t3n/skeletune",
    code_url: "https://github.com/G9T3N/skeletune",
  },
  {
    id: "sparksoft-front-template",
    title: "Sparksoft Front Template",
    description:
      "A reusable front-end starter template standardizing tooling, structure, and conventions across Sparksoft projects.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/sparksoft-front-template.svg",
    tech_stack: ["React", "TypeScript", "Template"],
    live_url: null,
    code_url: null,
  },
  {
    id: "sparksoft-starter-template",
    title: "Sparksoft E-Commerce Starter",
    description:
      "A production-ready Next.js 16 full-stack e-commerce starter with Better-Auth, Prisma, Next-Intl, and shadcn/ui.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/sparksoft-starter-template.svg",
    tech_stack: ["Next.js 16", "Prisma", "Better-Auth", "shadcn/ui"],
    live_url: null,
    code_url: null,
  },
  {
    id: "org-demo-repository",
    title: "Organization Demo Repository",
    description:
      "A reference repository showcasing GitHub Actions workflows, pages, and organization best practices.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/demo-repository.svg",
    tech_stack: ["HTML", "GitHub Actions"],
    live_url: null,
    code_url: null,
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
