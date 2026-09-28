import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Read .env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
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

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

console.log("Connecting to Supabase:", SUPABASE_URL);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testContactForm() {
  const testPayload = {
    name: "Verification Bot",
    email: "bot@example.com",
    message: `Automated test message generated at ${new Date().toISOString()}`,
  };

  console.log("Submitting test message...", testPayload);

  // Note: we insert without .select().single() just like the updated queries/messages.ts
  const result = await supabase.from("contact_messages").insert(testPayload);

  if (result.error) {
    console.error("❌ Failed to send contact message:");
    console.error(result.error);
    process.exit(1);
  }

  console.log("✅ Success! Contact message inserted without errors.");
  console.log(`Status: ${result.status} ${result.statusText}`);
}

testContactForm();
