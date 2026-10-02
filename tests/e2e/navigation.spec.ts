import { expect, test } from "@playwright/test";

const NAV = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Contact", "contact"],
  ["Home", "home"],
] as const;

test("navigation bar scrolls to each section", async ({ page }) => {
  await page.goto("./");
  const nav = page.getByRole("navigation");
  for (const [label, id] of NAV) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page.locator(`section#${id}`), `${label} link`).toBeInViewport();
  }
});

test("hero call-to-action buttons scroll to their sections", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("link", { name: "View Projects" }).click();
  await expect(page.locator("section#projects")).toBeInViewport();

  await page.goto("./");
  await page.getByRole("link", { name: "Contact Me" }).click();
  await expect(page.locator("section#contact")).toBeInViewport();
});
