import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
});
