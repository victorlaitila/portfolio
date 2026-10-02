import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { CV_FILENAME, SECTION_IDS } from "../../src/config/site";
import { personal, projects } from "./career";

const SECTIONS = Object.values(SECTION_IDS);

test("renders every section without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));

  await page.goto("./");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(personal.name.split(" ")[0]);
  for (const id of SECTIONS) {
    await expect(page.locator(`section#${id}`), `#${id} section`).toBeAttached();
  }
  for (const project of projects) {
    await expect(page.locator("#projects").getByRole("heading", { name: project.name })).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("loads every image", async ({ page }) => {
  await page.goto("./");
  // Scroll through the page so anything rendered on scroll gets a chance to load.
  for (const id of SECTIONS) await page.locator(`section#${id}`).scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");

  const broken = await page.locator("img").evaluateAll((imgs) =>
    (imgs as HTMLImageElement[]).filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src),
  );
  expect(broken).toEqual([]);
});

test("does not scroll horizontally", async ({ page }) => {
  await page.goto("./");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("has the metadata used by search engines and link previews", async ({ page, request }) => {
  await page.goto("./");
  await expect(page).toHaveTitle(new RegExp(personal.name));
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /\S/);

  const favicon = await page.locator('link[rel="icon"]').getAttribute("href");
  expect((await request.get(favicon!)).ok(), `favicon ${favicon}`).toBe(true);
});

test("Download CV serves the committed PDF", async ({ page }) => {
  await page.goto("./");
  const link = page.getByRole("link", { name: "Download CV" });
  await link.scrollIntoViewIfNeeded();

  const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);

  expect(download.suggestedFilename()).toBe(CV_FILENAME);
  const file = await readFile(await download.path());
  expect(file.subarray(0, 5).toString()).toBe("%PDF-");
  // The deployed file must be the committed one, which tests/cv checks against career.yaml.
  expect(file.equals(await readFile(`public/${CV_FILENAME}`))).toBe(true);
});

test("unknown URLs show the 404 page with a working way back", async ({ page }) => {
  // GitHub Pages serves 404.html for unknown paths, so the build must include it.
  // (Checked on disk: the local preview server falls back to index.html for any path.)
  expect(existsSync("dist/404.html"), "dist/404.html missing - see the build script").toBe(true);

  await page.goto("./does-not-exist");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();

  // "/" alone would leave the site on GitHub Pages, which hosts it under /portfolio/.
  const home = page.getByRole("link", { name: "Return to Home" });
  await expect(home).toHaveAttribute("href", "/portfolio/");
  await home.click();
  await expect(page).toHaveURL(/\/portfolio\/$/);
  await expect(page.locator("section#home")).toBeVisible();
});
