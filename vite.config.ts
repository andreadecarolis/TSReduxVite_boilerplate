import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Imposta l'alias "@"
    },
  },
});
