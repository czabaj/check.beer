import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import VitePluginLinaria from "vite-plugin-linaria";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: "preact/compat",
    },
  },
  plugins: [preact(), VitePluginLinaria(), svgrPlugin()],
});
