import { expect, test, type Page } from "@playwright/test";
import { skills } from "./career";

/** Asserts every skill tile is fully shown. Exact text, since e.g. "CSS" is part of "Tailwind CSS". */
async function expectAllSkillsVisible(page: Page) {
  const section = page.locator("section#skills");
  for (const skill of skills) {
    const tile = section.getByRole("listitem").filter({ has: page.getByText(skill, { exact: true }) });
    await expect(tile, skill).toHaveCSS("opacity", "1");
  }
}

// The skill tiles stay hidden until the section's boot animation reveals them on scroll,
// so a broken animation would silently hide every skill.
test("shows every skill once the section is scrolled into view", async ({ page }) => {
  await page.goto("./");
  await page.locator("section#skills").scrollIntoViewIfNeeded();
  await expectAllSkillsVisible(page);
});

test("shows every skill immediately with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expectAllSkillsVisible(page);
});

// A phone turned sideways shows less than a quarter of the skills console at once, so the
// reveal must not wait for a share of it to be visible.
test.describe("on a short landscape phone screen", () => {
  test.use({ viewport: { width: 740, height: 360 } });

  test("shows every skill once the section is scrolled into view", async ({ page }) => {
    await page.goto("./");
    await page.locator("section#skills").scrollIntoViewIfNeeded();
    await expectAllSkillsVisible(page);
  });
});
