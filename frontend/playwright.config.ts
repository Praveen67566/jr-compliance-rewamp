import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:8123", trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], channel: process.env.PLAYWRIGHT_CHANNEL } },
    { name: "firefox", testMatch: "**/accessibility-profiles.spec.ts", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", testMatch: "**/accessibility-profiles.spec.ts", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chromium", testMatch: "**/accessibility-profiles.spec.ts", use: { ...devices["Pixel 7"] } },
    { name: "mobile-webkit", testMatch: "**/accessibility-profiles.spec.ts", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1",
    url: "http://localhost:8123",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
