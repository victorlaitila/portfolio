import { expect, test, type Page, type Request } from "@playwright/test";

// EmailJS is mocked at the network level, so these tests never send real email.
const EMAILJS_SEND = "https://api.emailjs.com/api/v1.0/email/send";

const MESSAGE = { name: "Ada Lovelace", email: "ada@example.com", message: "Hello from the e2e tests" };

test.beforeEach(async ({ page }) => {
  // Safety net: fail closed for anything EmailJS that a test didn't mock explicitly.
  await page.route("https://api.emailjs.com/**", (route) => route.abort());
  await page.goto("./#contact");
});

async function fillForm(page: Page) {
  await page.getByLabel("Name").fill(MESSAGE.name);
  await page.getByLabel("Email", { exact: true }).and(page.locator("input")).fill(MESSAGE.email);
  await page.getByLabel("Message").fill(MESSAGE.message);
}

// Exact match: Radix also renders a screen-reader copy of each toast that contains the same text.
const toast = (page: Page, text: string) => page.getByText(text, { exact: true });

const submit = (page: Page) => page.getByRole("button", { name: "Send Message" }).click();

test("sends the message through EmailJS", async ({ page }) => {
  const sent: Request[] = [];
  await page.route(EMAILJS_SEND, (route) => {
    sent.push(route.request());
    return route.fulfill({ status: 200, body: "OK" });
  });

  await fillForm(page);
  await submit(page);

  // EmailJS refuses to send without its IDs, so no request means the VITE_EMAILJS_*
  // build env (GitHub secrets in CI) is missing and the deployed form could never send.
  await expect
    .poll(() => sent.length, { message: "No EmailJS request sent - are the VITE_EMAILJS_* env vars set at build time?" })
    .toBe(1);
  const payload = sent[0].postDataJSON();
  expect(payload.service_id).toBeTruthy();
  expect(payload.template_id).toBeTruthy();
  expect(payload.user_id).toBeTruthy();
  // These keys must match the variables used in the EmailJS template.
  expect(payload.template_params).toEqual(MESSAGE);

  await expect(toast(page, "Message Sent!")).toBeVisible();

  await expect(page.getByLabel("Name")).toHaveValue("");
  await expect(page.getByLabel("Message")).toHaveValue("");
});

test("shows a loading state while sending and blocks double submits", async ({ page }) => {
  let requests = 0;
  let respond!: () => void;
  const responded = new Promise<void>((resolve) => (respond = resolve));
  await page.route(EMAILJS_SEND, async (route) => {
    requests++;
    await responded;
    return route.fulfill({ status: 200, body: "OK" });
  });

  await fillForm(page);
  await submit(page);

  const sending = page.getByRole("button", { name: "Sending..." });
  await expect(sending).toBeDisabled();
  await sending.click({ force: true });

  respond();
  await expect(toast(page, "Message Sent!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Message" })).toBeEnabled();
  expect(requests).toBe(1);
});

test("shows an error and keeps the input when sending fails", async ({ page }) => {
  await page.route(EMAILJS_SEND, (route) => route.fulfill({ status: 400, body: "Bad Request" }));

  await fillForm(page);
  await submit(page);

  await expect(toast(page, "Failed to send message. Please try again later.")).toBeVisible();
  await expect(page.getByLabel("Message")).toHaveValue(MESSAGE.message);
});

test("requires all fields before sending", async ({ page }) => {
  let requests = 0;
  await page.route(EMAILJS_SEND, (route) => {
    requests++;
    return route.fulfill({ status: 200, body: "OK" });
  });

  await page.getByLabel("Name").fill(MESSAGE.name);
  await submit(page);

  await expect(toast(page, "Please fill in all fields")).toBeVisible();
  expect(requests).toBe(0);
});
