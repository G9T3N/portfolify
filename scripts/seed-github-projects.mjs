import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [k, ...v] = trimmed.split("=");
      const key = k.trim();
      const val = v
        .join("=")
        .trim()
        .replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
} catch {
  // Ignore if .env not found
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://nazqonifftxawbrzereb.supabase.co";
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SERVICE_KEY) {
  console.error("Missing SUPABASE key. Set SUPABASE_SERVICE_ROLE_KEY in .env or pass it inline.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

/**
 * Projects scraped from the G9T3N GitHub account and the Big-cart,
 * sparksoft1 and OnePlusOneTech organizations.
 * Thumbnails live in `public/projects/` and are served from the app origin.
 */
const projects = [
  {
    id: "b30a3891-7be6-4371-9395-c265516ce1da",
    title: "Sofa Platform",
    description:
      "Production web product work spanning reusable React interfaces, API integration, application state, debugging, and maintainable feature delivery.",
    full_content:
      "Core web platform engineering at Sofa. Built and maintained complex responsive customer interfaces with React and TypeScript, integrated high-throughput REST APIs, managed complex client state, and ensured smooth production releases.",
    category: "web",
    status: "live",
    thumbnail_url: null,
    live_url: "https://play.sofa.ye",
    code_url: null,
    tech_stack: ["React", "TypeScript", "REST", "Production"],
    display_order: 1,
  },
  {
    id: "f813cc43-209a-49c5-9223-882b753dd2e5",
    title: "Mr.Err — mrerr.com",
    description:
      "The public personal site and brand home for Mr.Err. A fast, animated React + Vite experience with custom sections, dark theme, and GitHub-driven metrics.",
    full_content:
      "Personal brand website and portfolio hub for Mr.Err. Built with React, Vite, TypeScript, and Tailwind CSS, featuring a custom section system, responsive layout, dark visual language, and live GitHub statistics.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/mrerror.png",
    live_url: "https://www.mrerr.com",
    code_url: "https://github.com/G9T3N/Mrerror",
    tech_stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    display_order: 2,
  },
  {
    id: "526ba0d2-593c-4ce0-a1d7-8f633b9ceaa1",
    title: "MRERR Platform",
    description:
      "A Turborepo monorepo powering mrerr.com, me.mrerr.com, and dashboard.mrerr.com with shared UI, design, and database packages.",
    full_content:
      "Scalable monorepo architecture managed with Turborepo and pnpm. Hosts three React Router v7 applications (portfolio, personal bio, and management dashboard) plus shared @mrerr/ui, @mrerr/design, and @mrerr/database packages.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/mrerr-platform.svg",
    live_url: null,
    code_url: "https://github.com/G9T3N/me.portfolify",
    tech_stack: ["React Router v7", "Turborepo", "pnpm", "TypeScript"],
    display_order: 3,
  },
  {
    id: "7e2fd4ae-54c2-4a5f-8bba-cfb2027a1fde",
    title: "Mr.Err Portfolio",
    description:
      "This site: an interactive React Router v7 portfolio with a Supabase CMS, bilingual Arabic/English content, and a custom admin dashboard.",
    full_content:
      "Modern portfolio application engineered with React Router v7, TypeScript, Tailwind CSS, Framer Motion, and Supabase. Features dark mode, responsive glassmorphic UI, dynamic project routing, localized content, and a full CMS dashboard.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/portfolify.svg",
    live_url: null,
    code_url: "https://github.com/G9T3N/portfolify",
    tech_stack: ["React Router v7", "Supabase", "Framer Motion", "Tailwind CSS"],
    display_order: 4,
  },
  {
    id: "325da93b-63a8-4607-b3a3-93d0e13033d2",
    title: "Portfoliofy",
    description:
      "A modern, data-driven portfolio generator that keeps a developer's showcase automatically in sync without manual updates.",
    full_content:
      "Portfolio generator designed for developers who want an automated, always-current showcase. Built with React, Vite, TypeScript, and Tailwind CSS, bridging clean aesthetics with data-driven presentation.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/portfoliofy.svg",
    live_url: null,
    code_url: "https://github.com/G9T3N/old-porto",
    tech_stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    display_order: 5,
  },
  {
    id: "1ebf5bc9-14ad-4892-9efd-a4c51861af43",
    title: "Solvera",
    description:
      "A bilingual luxury perfume storefront and administration dashboard built with Next.js 16, WooCommerce, and full Arabic/English routing.",
    full_content:
      "Luxury-commerce storefront and admin dashboard built with Next.js 16, React 19, TypeScript, and WooCommerce/WordPress. Arabic is the default locale with full English routing via next-intl. Includes catalog, product details, search, wishlist, cart, coupons, checkout, order tracking, and a complete administrative back office.",
    category: "ecommerce",
    status: "live",
    thumbnail_url: "/projects/solvera.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Next.js 16", "React 19", "WooCommerce", "next-intl"],
    display_order: 6,
  },
  {
    id: "26a7fa10-8a01-47e5-a24e-1a13a352220a",
    title: "Digital Market",
    description:
      "A production e-commerce marketplace with catalog, search, cart, multi-currency, and bilingual storefront experience.",
    full_content:
      "Production e-commerce marketplace delivering a bilingual, multi-currency storefront with product catalog, search, cart, and account flows. Built with Next.js, TypeScript, and Tailwind CSS.",
    category: "ecommerce",
    status: "live",
    thumbnail_url: "/projects/digitalmarket.png",
    live_url: "https://digitalmarket.coder4u.com",
    code_url: null,
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST"],
    display_order: 7,
  },
  {
    id: "067a5500-6f41-4b9a-839c-38faca0e08ca",
    title: "HAJZAK User App",
    description:
      "A Flutter mobile app for discovering and booking Yemen's finest recreational properties, with BLoC state management and Firebase backend.",
    full_content:
      "Arabic-first Flutter application for discovering and booking recreational properties across Yemen. Uses Cubit/BLoC state management, GetIt dependency injection, Firebase backend services, and full localization.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/hajzak-user.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Flutter", "Dart", "BLoC", "Firebase"],
    display_order: 8,
  },
  {
    id: "d070199a-9ab3-4650-b7eb-1dabad7fc3e8",
    title: "HAJZAK Dashboard",
    description:
      "A Flutter host portal and platform operations dashboard for managing properties, bookings, and providers on Supabase.",
    full_content:
      "Host portal and platform administration dashboard for the HAJZAK booking platform. Built in Flutter with Cubit/BLoC state management, GetIt dependency injection, and Supabase backend integration.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/hajzak-dashboard.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Flutter", "Dart", "BLoC", "Supabase"],
    display_order: 9,
  },
  {
    id: "eb474638-6a6a-4ae8-b133-b367391d51b6",
    title: "HAJZAK Admin Console",
    description:
      "An Arabic-first RTL web admin panel for property review, approval, and operations monitoring, built with Next.js 16 and PostgREST.",
    full_content:
      "Arabic-first (RTL) web admin panel for the HAJZAK property-booking platform. MVP scope covers admin login, property review/approval, and operations monitoring. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, jose-signed sessions, and PostgREST data access.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/hajzak-console.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Next.js 16", "PostgREST", "shadcn/ui", "RTL"],
    display_order: 10,
  },
  {
    id: "68a2cb84-0eab-4391-a7ea-53ec41731a94",
    title: "Sparksoft Platform",
    description:
      "The Sparksoft company platform, featuring a fully automated deployment pipeline and production web delivery.",
    full_content:
      "Company platform for Sparksoft with an automated CI/CD deployment pipeline. Built with a modern Next.js and TypeScript stack for reliable production delivery.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/sparksoft.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Next.js", "TypeScript", "CI/CD"],
    display_order: 11,
  },
  {
    id: "2318e673-cd8a-44f1-ab52-6e2029cec72b",
    title: "Hareer",
    description:
      "A production web product delivered for Sparksoft, built with a modern Next.js and TypeScript stack.",
    full_content:
      "Production web product delivered for Sparksoft, built with Next.js, TypeScript, and Tailwind CSS as part of the organization's client work.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/hareer.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    display_order: 12,
  },
  {
    id: "a90d87db-857c-45a0-b2a5-95fa2562cec6",
    title: "Code4U",
    description:
      "A Sparksoft front-end application platform sharing the organization's component and tooling conventions.",
    full_content:
      "Front-end application platform for Sparksoft, sharing the organization's component conventions, tooling, and TypeScript standards across products.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/code4u.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["TypeScript", "React", "Web"],
    display_order: 13,
  },
  {
    id: "b89c0aae-f0d3-4143-a6d5-81bd82f16a0e",
    title: "Landing Page System",
    description:
      "A reusable Next.js marketing and landing page system used across Sparksoft products.",
    full_content:
      "Reusable Next.js landing page and marketing site system with shared sections and layout primitives, used across Sparksoft products.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/landing-page.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Next.js", "React", "Tailwind CSS"],
    display_order: 14,
  },
  {
    id: "a56f7384-f300-495c-82e3-8247910b74ae",
    title: "Big Cart",
    description:
      "A cross-platform Flutter commerce application exploring scalable mobile shopping experiences.",
    full_content:
      "Cross-platform Flutter commerce application exploring scalable mobile shopping flows, product presentation, and cart experiences.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/big-cart.svg",
    live_url: null,
    code_url: "https://github.com/Big-cart/BIG-CART",
    tech_stack: ["Flutter", "Dart", "Mobile"],
    display_order: 15,
  },
  {
    id: "1dc3d3bd-46cc-4572-847c-9b4c7a946099",
    title: "Yemen Certificate",
    description:
      "A certificate issuance and verification platform serving organizations across Yemen.",
    full_content:
      "Certificate issuance and verification platform built in PHP with MySQL, serving organizations across Yemen with structured certificate records and verification flows.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/yemen-certificate.svg",
    live_url: null,
    code_url: "https://github.com/G9T3N/yemen-certificate",
    tech_stack: ["PHP", "MySQL", "Web"],
    display_order: 16,
  },
  {
    id: "be4c7129-5776-4f90-8f61-6dc41459f1d9",
    title: "React ScreenUtil",
    description:
      "A React/TypeScript port of Flutter's flutter_screenutil, bringing responsive design scaling to React applications. Published on NPM.",
    full_content:
      "React and TypeScript implementation inspired by Flutter's flutter_screenutil package, providing responsive UI scaling across screen sizes. Published to NPM as @g9t3n/react-screenutil with extension methods and a full API.",
    category: "open-source",
    status: "live",
    thumbnail_url: "/projects/react-screenutil.svg",
    live_url: "https://www.npmjs.com/package/@g9t3n/react-screenutil",
    code_url: "https://github.com/G9T3N/react_screenUtils",
    tech_stack: ["React", "TypeScript", "NPM"],
    display_order: 17,
  },
  {
    id: "bfb87d1a-6b95-4f6a-8152-7d6e364d87ff",
    title: "Skeletune",
    description:
      "A small, composable React skeleton loading wrapper component with customizable animation, styling, and children. Published on NPM.",
    full_content:
      "A small React skeleton wrapper component published to NPM as @g9t3n/skeletune. Supports customizable skeleton styles and animations through className and childrenClassName, keeping application code clean and reusable.",
    category: "open-source",
    status: "live",
    thumbnail_url: "/projects/skeletune.svg",
    live_url: "https://www.npmjs.com/package/@g9t3n/skeletune",
    code_url: "https://github.com/G9T3N/skeletune",
    tech_stack: ["React", "TypeScript", "NPM", "UnoCSS"],
    display_order: 18,
  },
  {
    id: "097a523d-31e5-4971-9e00-aafaa82caa67",
    title: "Sparksoft Front Template",
    description:
      "A reusable front-end starter template standardizing tooling, structure, and conventions across Sparksoft projects.",
    full_content:
      "Reusable front-end starter template that standardizes tooling, folder structure, and code conventions across Sparksoft projects, accelerating new product setup.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/sparksoft-front-template.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["React", "TypeScript", "Template"],
    display_order: 19,
  },
  {
    id: "1ed20048-e482-4e99-af51-422d95d8c935",
    title: "Sparksoft E-Commerce Starter",
    description:
      "A production-ready Next.js 16 full-stack e-commerce starter with Better-Auth, Prisma, Next-Intl, and shadcn/ui.",
    full_content:
      "Production-ready Next.js 16 full-stack e-commerce starter template configured for globally accessible applications. Includes Better-Auth, Next-Intl (AR/EN), Prisma ORM, shadcn/ui, and robust development tooling.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/sparksoft-starter-template.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["Next.js 16", "Prisma", "Better-Auth", "shadcn/ui"],
    display_order: 20,
  },
  {
    id: "fe685185-8552-47dc-a619-6e3b6fe533d0",
    title: "Organization Demo Repository",
    description:
      "A reference repository showcasing GitHub Actions workflows, pages, and organization best practices.",
    full_content:
      "Reference repository demonstrating GitHub Actions workflows, rendered pages, and organization best practices with minimal noise.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/demo-repository.svg",
    live_url: null,
    code_url: null,
    tech_stack: ["HTML", "GitHub Actions"],
    display_order: 21,
  },
  {
    id: "701f8902-1392-48c9-80d9-68b5d32954d2",
    title: "Open Source & NPM",
    description:
      "Reusable React utilities and Mapbox tooling published under the g9t3n namespace, including Skeletune and geospatial packages.",
    full_content:
      "Open-source ecosystem contributions and NPM packages authored under @g9t3n. Includes Skeletune skeleton loader utilities, React ScreenUtil, Mapbox geospatial UI tools, and developer productivity libraries.",
    category: "open-source",
    status: "live",
    thumbnail_url: null,
    live_url: "https://www.npmjs.com/~g9t3n",
    code_url: "https://github.com/G9T3N",
    tech_stack: ["NPM", "React", "Mapbox", "Open Source"],
    display_order: 22,
  },
];

async function main() {
  console.log("Connecting to Supabase at:", SUPABASE_URL);

  console.log(`Upserting ${projects.length} GitHub projects...`);
  const { data, error } = await supabase
    .from("projects")
    .upsert(projects, { onConflict: "id" })
    .select("id, title");

  if (error) {
    console.error("Error upserting projects:", error);
    process.exit(1);
  }

  console.log(`Successfully upserted ${data?.length ?? projects.length} projects:`);
  for (const p of data ?? []) {
    console.log(`  - ${p.title}`);
  }
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
