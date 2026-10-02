import { defineConfig, devices } from "@playwright/test";
import { BASE_PATH } from "./scripts/career";

const PORT = 4173;

export default defineConfig({
  testDir: "tests/e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  // Tests run against the production build. CI builds once in an earlier step,
  // with the real EmailJS IDs from repo secrets.
  webServer: {
    command: `${process.env.CI ? "" : "npm run build && "}npx vite preview --port ${PORT} --strictPort`,
    // Local builds fall back to placeholder IDs. EmailJS is mocked in tests, so they're never used for real.
    env: {
      VITE_EMAILJS_SERVICE_ID: process.env.VITE_EMAILJS_SERVICE_ID || "local_service",
      VITE_EMAILJS_TEMPLATE_ID: process.env.VITE_EMAILJS_TEMPLATE_ID || "local_template",
      VITE_EMAILJS_PUBLIC_KEY: process.env.VITE_EMAILJS_PUBLIC_KEY || "local_key",
    },
    url: `http://localhost:${PORT}${BASE_PATH}`,
    reuseExistingServer: !process.env.CI,
  },
});
