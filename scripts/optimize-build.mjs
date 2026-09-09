import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const files = [
  path.join(rootDir, "build/client/index.html"),
  path.join(rootDir, "build/client/__spa-fallback.html"),
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    // Strip heavy offscreen 3D bundles from being preloaded in the initial HTML critical path
    content = content.replace(
      /<link[^>]*href="\/assets\/(rapier|react-three|three)[^"]*"[^>]*\/?>/gi,
      "",
    );
    fs.writeFileSync(file, content, "utf8");
    console.log(`[optimize-build] Stripped heavy preloads from ${path.basename(file)}`);
  }
}
