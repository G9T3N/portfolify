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
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.glb"],
  build: {
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
