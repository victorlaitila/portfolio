import { expect, test } from "@playwright/test";
import { personal } from "./career";

// The off-duty side of the ID card only appears after flipping it, so a broken flip would hide it.
test("the ID card flips between its front and its off-duty side", async ({ page }) => {
  await page.goto("./");
  const about = page.locator("section#about");
  const front = about.getByRole("group", { name: "ID card" });
  const back = about.getByRole("group", { name: "Off-duty profile" });

  await expect(front.getByRole("heading", { name: personal.name })).toBeVisible();
  await expect(back, "only the visible side is exposed").toHaveCount(0);

  await about.getByRole("button", { name: /flip card/i }).click();
  await expect(back).toBeVisible();
  await expect(back.getByRole("heading").first()).toBeVisible();
  await expect(front).toHaveCount(0);

  await about.getByRole("button", { name: /show front/i }).click();
  await expect(front).toBeVisible();
});
