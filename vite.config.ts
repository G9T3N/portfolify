import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    babel({
      include: ['src/**/*.[jt]s?(x)'],
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [
          ["babel-plugin-react-compiler"]
        ],
      },
    }),
    reactRouter(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.glb'],
  build: {
    chunkSizeWarningLimit: 4000,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'three';
          }
          if (id.includes('node_modules/@react-three/')) {
            if (id.includes('rapier')) return 'rapier';
            return 'react-three';
          }
        }
      }
    }
  }
});
