/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { SITE_URL } from "./scripts/career";

// https://vitejs.dev/config/
export default defineConfig({
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
    {
      // Built here rather than kept in public/ so the URL comes from career.yaml.
      name: "seo-files",
      apply: "build",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`,
        });
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `  <url><loc>${SITE_URL}</loc></url>\n` +
            "</urlset>\n",
        });
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
