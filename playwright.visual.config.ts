// Screenshot comparison between two builds, driven by scripts/visual-check.mjs (`npm run visual:check`),
import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

const dist = process.env.VISUAL_DIST;
if (!dist) throw new Error("Run this through `npm run visual:check`, which builds and serves both versions");

// Screen sizes where layouts tend to break: the smallest phones, phones turned sideways, the
// Tailwind breakpoints (sm 640, md 768, lg 1024) and very tall desktop screens.
const VIEWPORTS: Record<string, { width: number; height: number; mobile?: boolean }> = {
  "phone-320x568": { width: 320, height: 568, mobile: true },
  "phone-375x667": { width: 375, height: 667, mobile: true },
  "phone-412x915": { width: 412, height: 915, mobile: true },
  "phone-landscape-740x360": { width: 740, height: 360, mobile: true },
  "phone-landscape-852x393": { width: 852, height: 393, mobile: true },
  "tablet-768x1024": { width: 768, height: 1024, mobile: true },
  "tablet-landscape-1024x768": { width: 1024, height: 768, mobile: true },
  "laptop-1280x720": { width: 1280, height: 720 },
  "desktop-1920x1080": { width: 1920, height: 1080 },
  "desktop-2560x1440": { width: 2560, height: 1440 },
};

export default defineConfig({
  ...base,
  testDir: "tests/visual",
  retries: 0,
  reporter: [
    ["json", { outputFile: "visual-report/results.json" }],
    ["html", { open: "never", outputFolder: "visual-report/html" }],
  ],
  snapshotPathTemplate: ".visual-baseline/{projectName}/{arg}{ext}",
  expect: { toHaveScreenshot: { animations: "disabled", caret: "hide", threshold: 0, maxDiffPixels: 50 } },
  projects: Object.entries(VIEWPORTS).map(([name, { width, height, mobile = false }]) => ({
    name,
    use: {
      viewport: { width, height },
      isMobile: mobile,
      hasTouch: mobile,
      // Reduced motion shows the skills immediately and hides the random hero glitch, so shots are stable.
      reducedMotion: "reduce",
    },
  })),
  // Never reuse a running server: it could be serving the other build.
  webServer: { ...base.webServer, command: `npx vite preview --outDir "${dist}" --port 4173 --strictPort`, reuseExistingServer: false },
});
