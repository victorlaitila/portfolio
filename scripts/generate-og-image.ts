// Screenshots the hero section of the production build as the 1200x630 link-preview image
// (public/og-image.jpg, referenced by the og:image tag in index.html). Rerun it when the name,
// title, tagline or hero design changes, and commit the image.
// Usage: npm run generate:og-image
import { execSync, spawn } from "node:child_process";
import { chromium } from "@playwright/test";
import { BASE_PATH, career } from "./career.ts";

const PORT = 4175;
const OUTPUT = "public/og-image.jpg";
const url = `http://localhost:${PORT}${BASE_PATH}`;

execSync("npm run build", { stdio: "inherit" });
const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });

try {
  const browser = await chromium.launch();
  // Reduced motion keeps the glitch effect out of the shot.
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce" });

  for (let attempt = 0; ; attempt++) {
    try {
      await page.goto(url);
      break;
    } catch (error) {
      if (attempt > 20) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  await page.evaluate(() => document.fonts.ready);
  // Wait for the typewriter to finish the title.
  await page.locator("#home h2").filter({ hasText: career.personal.title }).waitFor();
  await page.screenshot({ path: OUTPUT, type: "jpeg", quality: 85 });
  await browser.close();
  console.log(`Generated ${OUTPUT}`);
} finally {
  server.kill();
}
