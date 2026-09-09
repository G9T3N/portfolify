import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read .env if present
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
  console.error(
    "Missing SUPABASE key. Please set SUPABASE_SERVICE_ROLE_KEY in .env or run with: SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload-to-supabase.mjs",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

async function main() {
  console.log("Connecting to Supabase at:", SUPABASE_URL);

  // 1. Projects to upload
  const projects = [
    {
      id: "e2b4f981-8b3d-4c3e-9c5e-7a1b3c5d7e90",
      title: "Sofa Platform",
      description:
        "Production web product work spanning reusable React interfaces, API integration, application state, debugging, and maintainable feature delivery.",
      full_content:
        "Core web platform engineering at Sofa. Built and maintained complex responsive customer interfaces with React and TypeScript, integrated high-throughput REST APIs, managed complex client state, and ensured smooth production releases.",
      category: "web",
      status: "live",
      live_url: "https://play.sofa.ye",
      code_url: null,
      tech_stack: ["React", "TypeScript", "REST", "Production"],
      display_order: 1,
    },
    {
      id: "f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01",
      title: "Portfolify",
      description:
        "A TypeScript-based public project focused on modern portfolio/product presentation and reusable frontend structure.",
      full_content:
        "Modern portfolio application engineered with React Router v7, TypeScript, Tailwind CSS, Framer Motion, and Supabase integration. Features dark mode, responsive glassmorphic UI, dynamic project routing, and CMS dashboard management.",
      category: "web",
      status: "live",
      live_url: null,
      code_url: "https://github.com/G9T3N/portfolify",
      tech_stack: ["TypeScript", "React", "React Router v7", "TailwindCSS"],
      display_order: 2,
    },
    {
      id: "a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12",
      title: "Open Source & NPM",
      description:
        "Reusable React utilities and Mapbox tooling published under the g9t3n namespace, including Skeletune and geospatial packages.",
      full_content:
        "Open-source ecosystem contributions and NPM packages authored under @g9t3n. Includes Skeletune skeleton loader utilities, Mapbox geospatial UI tools, and developer productivity libraries published for the community.",
      category: "open-source",
      status: "live",
      live_url: "https://www.npmjs.com/~g9t3n",
      code_url: "https://github.com/G9T3N",
      tech_stack: ["NPM", "React", "Mapbox", "Open Source", "TypeScript"],
      display_order: 3,
    },
  ];

  // 2. Work Experiences to upload
  const workExperiences = [
    {
      id: "c1a2b3c4-1111-4444-8888-000000000001",
      company: "Sofa",
      position: "Frontend / Full-Stack Product Engineer",
      location: "Sana'a, Yemen",
      start_date: "2023-01-01",
      end_date: null,
      is_current: true,
      description:
        "Frontend / full-stack product engineering with React and TypeScript, API integration, reusable UI architecture, debugging, and production delivery.",
      achievements: [
        "Engineered scalable React & TypeScript production interfaces",
        "Integrated high-throughput REST APIs and client state management",
        "Architected reusable component systems and automated quality checks",
        "Ensured dependable release cadence and continuous production delivery",
      ],
      display_order: 1,
      is_visible: true,
    },
    {
      id: "c1a2b3c4-2222-4444-8888-000000000002",
      company: "Sparksoft",
      position: "Software Engineer",
      location: "Remote",
      start_date: "2023-06-01",
      end_date: null,
      is_current: true,
      description:
        "Remote engineering across private production codebases, collaborative Git workflows, dashboards, commerce-oriented products, CI/CD, and quality gates.",
      achievements: [
        "Collaborative distributed Git workflows across core private repositories",
        "Built responsive dashboards and commerce-oriented products",
        "Configured CI/CD automation pipelines and test coverage gates",
        "Conducted code reviews and refactoring for production reliability",
      ],
      display_order: 2,
      is_visible: true,
    },
    {
      id: "c1a2b3c4-3333-4444-8888-000000000003",
      company: "OnePlusOneTech",
      position: "Software Engineer",
      location: "Remote",
      start_date: "2024-01-01",
      end_date: null,
      is_current: true,
      description:
        "Remote software engineering in private repositories with distributed collaboration, feature delivery, debugging, code review practices, and maintainable implementation.",
      achievements: [
        "Feature delivery and bug fixing across private client applications",
        "Maintained high standards for code readability and architectural separation",
        "Participated in cross-functional planning and engineering design reviews",
        "Implemented clean API contract integrations and data validations",
      ],
      display_order: 3,
      is_visible: true,
    },
  ];

  // 3. Clean up placeholder projects
  console.log("Cleaning up old placeholder projects...");
  const { error: deleteProjectErr } = await supabase
    .from("projects")
    .delete()
    .in("title", [
      "SecureAuth Dashboard",
      "CryptoTracker Pro",
      "HealthSync Mobile",
      "DevOps Monitor",
      "test",
      "asdasd",
    ]);
  if (deleteProjectErr) {
    console.warn("Notice during cleanup of projects:", deleteProjectErr.message);
  }

  // Clean up placeholder experiences
  console.log("Cleaning up old placeholder experiences...");
  const { error: deleteExpErr } = await supabase
    .from("work_experiences")
    .delete()
    .in("company", ["Tech Innovations Inc.", "Digital Solutions Ltd.", "StartupXYZ"]);
  if (deleteExpErr) {
    console.warn("Notice during cleanup of experiences:", deleteExpErr.message);
  }

  // 4. Upsert Projects
  console.log("Upserting real projects...");
  const { data: pData, error: pErr } = await supabase
    .from("projects")
    .upsert(projects, { onConflict: "id" })
    .select();
  if (pErr) {
    console.error("Error upserting projects:", pErr);
  } else {
    console.log(`Successfully upserted ${pData?.length || projects.length} projects.`);
  }

  // 5. Upsert Experiences
  console.log("Upserting real work experiences...");
  const { data: eData, error: eErr } = await supabase
    .from("work_experiences")
    .upsert(workExperiences, { onConflict: "id" })
    .select();
  if (eErr) {
    console.error("Error upserting experiences:", eErr);
  } else {
    console.log(`Successfully upserted ${eData?.length || workExperiences.length} experiences.`);
  }

  console.log("Done! You can now view and edit all data from your admin dashboard.");
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
