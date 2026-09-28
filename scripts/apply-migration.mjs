import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// 1. Read .env file
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const envContent = fs.readFileSync(envPath, "utf-8");
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
}

loadEnv();

const PROJECT_ID =
  process.env.VITE_SUPABASE_PROJECT_ID || process.env.SUPABASE_PROJECT_ID || "nazqonifftxawbrzereb";

const migrationFile =
  process.argv[2] ||
  path.resolve(process.cwd(), "supabase/migrations/001_contact_messages_rls.sql");

if (!fs.existsSync(migrationFile)) {
  console.error(`Migration file not found at: ${migrationFile}`);
  process.exit(1);
}

const sql = fs.readFileSync(migrationFile, "utf-8");

console.log("==========================================");
console.log("  Supabase Migration Runner");
console.log("==========================================");
console.log(`Target project: ${PROJECT_ID}`);
console.log(`Migration file: ${path.basename(migrationFile)}\n`);

async function runWithManagementApi(token) {
  console.log("Attempting execution via Supabase Management API...");
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_ID}/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: sql }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Management API error (${response.status}): ${errText}`);
  }

  const result = await response.json();
  console.log("Migration executed successfully via Supabase Management API!");
  return result;
}

async function runWithPsql(connectionString) {
  console.log("Attempting execution via psql / direct postgres connection...");
  execSync(`psql "${connectionString}" -f "${migrationFile}"`, {
    stdio: "inherit",
  });
  console.log("Migration executed successfully via psql!");
}

async function runWithSupabaseCli() {
  console.log("Attempting execution via Supabase CLI...");
  execSync(`npx supabase db execute --file "${migrationFile}"`, {
    stdio: "inherit",
  });
  console.log("Migration executed successfully via Supabase CLI!");
}

async function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_MGMT_TOKEN;
  const dbUrl =
    process.env.DATABASE_URL ||
    (process.env.SUPABASE_DB_PASSWORD
      ? `postgresql://postgres.${PROJECT_ID}:${process.env.SUPABASE_DB_PASSWORD}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
      : null);

  if (token) {
    try {
      await runWithManagementApi(token);
      return;
    } catch (err) {
      console.warn("Management API failed:", err.message);
    }
  }

  if (dbUrl) {
    try {
      await runWithPsql(dbUrl);
      return;
    } catch (err) {
      console.warn("psql connection failed:", err.message);
    }
  }

  try {
    await runWithSupabaseCli();
    return;
  } catch {
    // CLI fallback
  }

  console.log("\n=======================================================");
  console.log("  How to run this script:");
  console.log("=======================================================");
  console.log("Option 1 (Recommended - Supabase Access Token):");
  console.log("  SUPABASE_ACCESS_TOKEN=your_sbp_token node scripts/apply-migration.mjs\n");
  console.log("Option 2 (Database URL / Password):");
  console.log(
    "  DATABASE_URL='postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres' node scripts/apply-migration.mjs\n",
  );
  console.log("Option 3 (Supabase Dashboard):");
  console.log("  Copy contents of " + migrationFile);
  console.log(`  Paste in https://supabase.com/dashboard/project/${PROJECT_ID}/sql/new and run.`);
  console.log("=======================================================\n");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
