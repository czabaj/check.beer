/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: `es2020`,
  },
  plugins: [react(), svgrPlugin()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, `./src`),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
