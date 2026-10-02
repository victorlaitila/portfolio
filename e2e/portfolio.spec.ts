import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const SECTIONS = ["home", "about", "skills", "projects", "experience", "education", "contact"];

test("renders every section without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));

  await page.goto("./");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Victor");
  for (const id of SECTIONS) {
    await expect(page.locator(`section#${id}`), `#${id} section`).toBeAttached();
  }
  await expect(page.locator("#projects img").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("Download CV serves the PDF", async ({ page }) => {
  await page.goto("./");
  const link = page.getByRole("link", { name: "Download CV" });
  await link.scrollIntoViewIfNeeded();

  const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);

  expect(download.suggestedFilename()).toBe("Victor-Laitila-Software-Engineer-CV.pdf");
  const file = await readFile(await download.path());
  expect(file.subarray(0, 5).toString()).toBe("%PDF-");
  // The deployed file must be the committed one, which test_cv_pdf.py checks against career.yaml.
  expect(file.equals(await readFile("public/Victor-Laitila-Software-Engineer-CV.pdf"))).toBe(true);
});
