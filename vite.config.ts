import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { lingui } from "@lingui/vite-plugin";

export default defineConfig({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    reactRouter(),
    tailwindcss(),
    lingui(),

    babel({
      filter: /\.[jt]sx?$/, // Targets JS, TS, JSX, and TSX files
      babelConfig: {
        presets: [
          // Required so Babel can parse TypeScript types safely before macro execution
          ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
        ],
        plugins: [
          "@lingui/babel-plugin-lingui-macro", // 1. Translates Lingui tags
          ["babel-plugin-react-compiler", { target: "19" }], // 2. Optimizes React
        ],
        sourceMaps: true, // Prevents breakages in browser debugging tools
      },
    }),
    {
      name: "strip-rapier-preload",
      enforce: "post",
      transformIndexHtml(html) {
        return html
          .replace(
            /<link[^>]*rel="modulepreload"[^>]*href="\/assets\/rapier-[^"]+\.js"[^>]*\/?>/gi,
            "",
          )
          .replace(
            /<link[^>]*href="\/assets\/rapier-[^"]+\.js"[^>]*rel="modulepreload"[^>]*\/?>/gi,
            "",
          )
          .replace(
            /<link[^>]*rel="modulepreload"[^>]*href="\/assets\/react-three-[^"]+\.js"[^>]*\/?>/gi,
            "",
          )
          .replace(
            /<link[^>]*href="\/assets\/react-three-[^"]+\.js"[^>]*rel="modulepreload"[^>]*\/?>/gi,
            "",
          );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.glb"],
  build: {
    modulePreload: false,
    chunkSizeWarningLimit: 4000,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three/")) {
            return "three";
          }
          if (id.includes("node_modules/@react-three/")) {
            if (id.includes("rapier")) return "rapier";
            return "react-three";
          }
        },
      },
    },
  },
});
