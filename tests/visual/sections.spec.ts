import { expect, test } from "@playwright/test";
import { SECTION_IDS } from "../../src/config/site";
import { personal } from "../e2e/career";

test("every section matches the baseline and nothing scrolls sideways", async ({ page }) => {
  await page.goto("./");
  await page.locator("#home h2").filter({ hasText: personal.title }).waitFor(); // typewriter done
  await page.evaluate(() => document.fonts.ready);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect.soft(overflow, "page scrolls horizontally").toBeLessThanOrEqual(0);

  await expect.soft(page.locator("nav"), "nav").toHaveScreenshot("nav.png");
  // The fixed nav would cover the top of each section below, so it only gets the shot above.
  await page.addStyleTag({ content: "nav { visibility: hidden !important; }" });

  for (const id of Object.values(SECTION_IDS)) {
    const section = page.locator(`section#${id}`);
    // Always the same scroll position: otherwise sub-pixel offsets change the edge pixels between runs.
    await section.evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    // Lazy images load on scroll; wait until each one has decoded.
    await section.locator("img").evaluateAll((imgs) =>
      Promise.all(
        (imgs as HTMLImageElement[]).map((img) => {
          img.loading = "eager";
          return img.decode().catch(() => {});
        }),
      ),
    );
    await expect.soft(section, `#${id}`).toHaveScreenshot(`${id}.png`);
  }

  const footer = page.locator("footer");
  await footer.evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
  await expect.soft(footer, "footer").toHaveScreenshot("footer.png");
});
