import { expect, test } from "@playwright/test";
import { expectedExternalLinks, personal } from "./career";

test.beforeEach(async ({ context, page }) => {
  // Answer navigations to other sites with a stub page, so tests check where links
  // go without depending on GitHub/LinkedIn/YouTube being reachable.
  await context.route("**/*", (route) => {
    const request = route.request();
    if (request.isNavigationRequest() && !request.url().startsWith("http://localhost")) {
      return route.fulfill({ contentType: "text/html", body: "<title>stub</title>" });
    }
    return route.continue();
  });
  await page.goto("./");
});

test("shows exactly the links from career.yaml, all opening safely in a new tab", async ({ page }) => {
  const external = page.locator('a[href^="http"]');
  const hrefs = await external.evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
  expect([...new Set(hrefs)].sort()).toEqual(expectedExternalLinks);

  for (const link of await external.all()) {
    const href = await link.getAttribute("href");
    await expect(link, href!).toHaveAttribute("target", "_blank");
    await expect(link, href!).toHaveAttribute("rel", /noopener/);
  }
});

for (const url of expectedExternalLinks) {
  test(`opens ${url} in a new tab`, async ({ page, context }) => {
    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      page.locator(`a[href="${url}"]`).first().click(),
    ]);
    await popup.waitForLoadState();
    expect(popup.url()).toBe(url);
    expect(page.url(), "portfolio tab should stay open").toContain("/portfolio/");
  });
}

test("email links use the address from career.yaml", async ({ page }) => {
  const mailto = page.locator('a[href^="mailto:"]');
  await expect(mailto).not.toHaveCount(0);
  for (const link of await mailto.all()) {
    await expect(link).toHaveAttribute("href", `mailto:${personal.email}`);
  }
});
