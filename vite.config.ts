/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: `es2020`,
  },
  plugins: [preact(), svgrPlugin()],
  resolve: {
    alias: {
      react: `preact/compat`,
      "~": path.resolve(__dirname, `./src`),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
