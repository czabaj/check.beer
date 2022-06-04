import path from "path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: `preact/compat`,
      "~": path.resolve(__dirname, `./src`),
    },
  },
  plugins: [preact(), svgrPlugin()],
});
