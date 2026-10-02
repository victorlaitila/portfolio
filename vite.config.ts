/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { BASE_PATH, SITE_URL } from "./scripts/career";

// https://vitejs.dev/config/
export default defineConfig({
  // Derived from personal.links.website in career.yaml, e.g. "/portfolio/" on GitHub Pages.
  base: BASE_PATH,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      // Absolute URLs for the canonical and link-preview tags in index.html.
      name: "site-url",
      // "pre" runs before Vite parses the HTML, which would reject "%SITE_URL%" as a malformed URI.
      transformIndexHtml: {
        order: "pre",
        handler: (html) => html.replaceAll("%SITE_URL%", SITE_URL),
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
  },
});
