import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { ConsentPolicy } from "../../lib/types";

const basePolicy: ConsentPolicy = { region: "unknown", revision: "2", maxAgeDays: null, gpc: false };
const open = async (page: Page) => {
  const customize = page.getByRole("button", { name: "Customize Preferences", exact: true });
  if (await customize.isVisible()) await customize.click();
  else await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
};
const withdraw = async (page: Page) => { await open(page); await page.getByRole("button", { name: "Withdraw consent", exact: true }).click(); };
const saved = async (page: Page) => page.evaluate(() => JSON.parse(localStorage.getItem("jr-consent")!));
const trackingFrame = (page: Page) => page.frames().find((frame) => frame !== page.mainFrame());

async function setup(context: BrowserContext, page: Page, policy = { ...basePolicy }) {
  const requests: string[] = [];
  await context.route(/^https:\/\//, (route) => route.abort());
  await context.route("**/api/privacy/context", (route) => route.fulfill({ json: policy }));
  await context.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ contentType: "text/javascript", body: `
    (() => { window.testLoads = (window.testLoads || 0) + 1;
    window.parentBlocked = false;
    try { parent.document.body.dataset.trackerEscaped = "true"; } catch { window.parentBlocked = true; }
    fbq("track", "PageView");
    setInterval(() => fetch("https://privacy-test.invalid/collect?kind=gtm", { mode: "no-cors" }), 40);
    const heatmap = document.createElement("script"); heatmap.src = "https://privacy-test.invalid/heatmap.js"; document.head.append(heatmap); })();
  ` }));
  await context.route("https://connect.facebook.net/**", (route) => route.fulfill({ contentType: "text/javascript", body: `setInterval(() => fetch("https://privacy-test.invalid/collect?kind=pixel", { mode: "no-cors" }), 40);` }));
  await context.route("https://privacy-test.invalid/**", (route) => route.fulfill({ contentType: "text/javascript", body: route.request().url().endsWith("heatmap.js") ? `setInterval(() => fetch("https://privacy-test.invalid/collect?kind=heatmap", { mode: "no-cors" }), 40);` : "" }));
  page.on("request", (request) => { if (/googletagmanager|connect.facebook|privacy-test/.test(request.url())) requests.push(request.url()); });
  return { requests, policy };
}

test("no consent, rejection, acceptance and returning visits gate all optional requests", async ({ context, page }) => {
  const { requests } = await setup(context, page);
  await page.goto("/contact-us");
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Reject All", exact: true }).click();
  expect(await saved(page)).toMatchObject({ version: 2, region: "unknown", revision: "2", analytics: false, marketing: false, preferences: false });
  await page.reload();
  await expect(page.getByRole("button", { name: "Privacy preferences", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toHaveCount(0);
  expect(requests).toEqual([]);
  await page.evaluate(() => localStorage.removeItem("jr-consent"));
  await page.reload();
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect.poll(() => requests.filter((url) => url.includes("kind=heatmap")).length).toBeGreaterThan(1);
  expect(await saved(page)).toMatchObject({ preferences: true, analytics: true, marketing: true });
  await expect.poll(() => trackingFrame(page)?.evaluate("window.testLoads")).toBe(1);
  await page.reload();
  await expect.poll(() => requests.filter((url) => url.includes("googletagmanager.com/gtm.js")).length).toBe(2);
  await expect.poll(() => trackingFrame(page)?.evaluate("window.testLoads")).toBe(1);
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toHaveCount(0);
});

test("custom category combinations keep the mixed container blocked until both purposes are allowed", async ({ context, page }) => {
  const { requests } = await setup(context, page);
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Customize Preferences", exact: true }).click();
  for (const name of [/^Optional preferences/, /^Analytics/, /^External media/]) await expect(page.getByRole("checkbox", { name })).not.toBeChecked();
  await page.getByRole("checkbox", { name: /^Analytics/ }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  expect(requests).toEqual([]);
  await open(page);
  await page.getByRole("checkbox", { name: /^Analytics/ }).uncheck();
  await page.getByRole("checkbox", { name: /^External media/ }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  expect(requests).toEqual([]);
  await open(page);
  await page.getByRole("checkbox", { name: /^Analytics/ }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await expect.poll(() => requests.filter((url) => url.includes("kind=pixel")).length).toBeGreaterThan(0);
  await expect.poll(() => trackingFrame(page)?.evaluate("window.parentBlocked")).toBe(true);
  expect(await page.locator("body").getAttribute("data-tracker-escaped")).toBeNull();
  expect(await page.evaluate("typeof window.fbq + ':' + typeof window.gtag")).toBe("undefined:undefined");
  await open(page);
  await page.getByRole("checkbox", { name: /^Analytics/ }).uncheck();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
});

test("withdrawal stops GTM, pixel and heatmap requests while preserving the page and form", async ({ context, page }) => {
  const { requests } = await setup(context, page);
  await page.goto("/contact-us");
  const form = page.locator("form").first();
  await form.locator('input[name="name"]').fill("Unsaved inquiry");
  const timeOrigin = await page.evaluate(() => performance.timeOrigin);
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  for (const kind of ["gtm", "pixel", "heatmap"]) await expect.poll(() => requests.filter((url) => url.includes(`kind=${kind}`)).length).toBeGreaterThan(1);
  await page.evaluate(() => {
    document.cookie = "_ga=legacy; Path=/"; document.cookie = "_fbp=legacy; Path=/"; document.cookie = "necessary_test=keep; Path=/";
    localStorage.setItem("_hjSessionUser_123", "legacy"); sessionStorage.setItem("_clsk", "legacy");
  });
  await withdraw(page);
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  const stopped = requests.length;
  await page.waitForTimeout(300); // Observe several periods of every vendor's timer.
  expect(requests).toHaveLength(stopped);
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(timeOrigin);
  await expect(form.locator('input[name="name"]')).toHaveValue("Unsaved inquiry");
  expect(await page.evaluate(() => document.cookie)).toContain("necessary_test=keep");
  expect(await page.evaluate(() => document.cookie)).not.toMatch(/_ga=|_fbp=/);
  expect(await page.evaluate(() => localStorage.getItem("_hjSessionUser_123"))).toBeNull();
  expect(await page.evaluate(() => sessionStorage.getItem("_clsk"))).toBeNull();
  await page.reload();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  expect(requests).toHaveLength(stopped);
});

test("cross-tab withdrawal, storage clearing and live GPC destroy active tracking", async ({ context, page }) => {
  await setup(context, page);
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  const second = await context.newPage();
  await second.goto("/api/privacy/context");
  await second.evaluate(() => localStorage.setItem("jr-consent", JSON.stringify({ ...JSON.parse(localStorage.getItem("jr-consent")!), marketing: false })));
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  await second.evaluate(() => localStorage.clear());
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  await page.evaluate(() => { Object.defineProperty(navigator, "globalPrivacyControl", { configurable: true, value: true }); dispatchEvent(new Event("pageshow")); });
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  await open(page);
  await expect(page.getByRole("checkbox", { name: /^External media/ })).toBeDisabled();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  expect((await saved(page)).marketing).toBe(false);
});

test("policy, region and configured time renewal block saved grants; unset expiry preserves them", async ({ context, page }) => {
  const { policy } = await setup(context, page);
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await page.evaluate(() => localStorage.setItem("jr-consent", JSON.stringify({ ...JSON.parse(localStorage.getItem("jr-consent")!), updatedAt: "2000-01-01T00:00:00.000Z" })));
  await page.reload();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  policy.maxAgeDays = 30; // Test configuration only, not an assumed production rule.
  await page.reload();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  policy.revision = "3";
  await page.reload();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  policy.region = "india";
  await page.reload();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
});

test("configured expiry stops an open visit at its deadline and on back-forward restoration", async ({ context, page }) => {
  await setup(context, page, { ...basePolicy, maxAgeDays: 1 });
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  const nearExpiry = new Date(Date.now() - 86_400_000 + 2000).toISOString();
  await page.evaluate((updatedAt) => {
    localStorage.setItem("jr-consent", JSON.stringify({ ...JSON.parse(localStorage.getItem("jr-consent")!), updatedAt }));
    dispatchEvent(new StorageEvent("storage", { key: "jr-consent" }));
  }, nearExpiry);
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible({ timeout: 6000 });
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  await page.evaluate(() => {
    localStorage.setItem("jr-consent", JSON.stringify({ ...JSON.parse(localStorage.getItem("jr-consent")!), updatedAt: "2000-01-01T00:00:00.000Z" }));
    dispatchEvent(new StorageEvent("storage", { key: "jr-consent" }));
    dispatchEvent(new Event("pageshow"));
  });
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
});

test("regional notices, US opt-out and HTTP GPC are applied without granting optional purposes", async ({ context, page }) => {
  const { policy, requests } = await setup(context, page, { ...basePolicy, region: "us" });
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await open(page);
  await page.getByRole("button", { name: "Opt out of sale or sharing", exact: true }).click();
  expect(await saved(page)).toMatchObject({ analytics: true, marketing: false });
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  policy.gpc = true;
  await page.reload();
  await open(page);
  await expect(page.getByRole("checkbox", { name: /^External media/ })).toBeDisabled();
  const before = requests.length;
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  expect(requests).toHaveLength(before);
  for (const region of ["eea-uk", "india", "other", "unknown"] as const) {
    policy.region = region;
    await page.reload();
    await page.getByRole("button", { name: "Customize Preferences", exact: true }).click();
    await expect(page.getByRole("checkbox", { name: /^Analytics/ })).not.toBeChecked();
    await expect(page.getByRole("checkbox", { name: /^External media/ })).not.toBeChecked();
  }
});

test("storage and context failures stay usable and never restore unverified grants", async ({ context, page }) => {
  const { requests } = await setup(context, page);
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await context.route("**/api/privacy/context", (route) => route.fulfill({ status: 503, json: { error: "unavailable" } }));
  await page.reload();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  const stopped = requests.length;
  await page.waitForTimeout(150);
  expect(requests).toHaveLength(stopped);
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  await page.reload();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await context.route("**/api/privacy/context", (route) => route.fulfill({ json: basePolicy }));
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage unavailable"); } }));
  await page.reload();
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  await expect(page.getByRole("status")).toContainText("Browser storage is unavailable");
  await withdraw(page);
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
});

test("withdrawal during a context outage cannot revive an older stored grant on recovery", async ({ context, page }) => {
  await setup(context, page);
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(1);
  await context.route("**/api/privacy/context", (route) => route.fulfill({ status: 503, json: {} }));
  await page.evaluate(() => dispatchEvent(new Event("pageshow")));
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await withdraw(page);
  expect(await page.evaluate(() => localStorage.getItem("jr-consent"))).toBeNull();
  await context.route("**/api/privacy/context", (route) => route.fulfill({ json: basePolicy }));
  await page.evaluate(() => dispatchEvent(new Event("pageshow")));
  await open(page);
  await expect(page.getByRole("checkbox", { name: /^Analytics/ })).not.toBeChecked();
  await expect(page.getByRole("checkbox", { name: /^External media/ })).not.toBeChecked();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
});

test("future, corrupt and legacy browser records require a new decision", async ({ context, page }) => {
  const { requests } = await setup(context, page);
  await page.goto("/privacy-policy");
  for (const record of [
    { version: 1, preferences: true, analytics: true, marketing: true, updatedAt: new Date().toISOString() },
    { version: 2, region: "unknown", revision: "2", preferences: true, analytics: true, marketing: true, updatedAt: "2999-01-01T00:00:00.000Z" },
    { version: 2, region: "unknown", revision: "2", analytics: "true", updatedAt: "invalid" },
  ]) {
    await page.evaluate((value) => localStorage.setItem("jr-consent", JSON.stringify(value)), record);
    await page.reload();
    await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
    await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  }
  expect(requests).toEqual([]);
});

test("privacy banner and dialog support mobile, keyboard, focus restoration and reduced motion", async ({ context, page }) => {
  await setup(context, page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/privacy-policy");
  for (const width of [1440, 820, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.locator(".consent-banner").evaluate((element) => element.scrollWidth <= element.clientWidth && element.getBoundingClientRect().right <= innerWidth)).toBe(true);
    await page.getByRole("button", { name: "Accessibility", exact: true }).click();
    await page.keyboard.press("Escape");
    if (test.info().project.name === "chromium") await page.screenshot({ path: test.info().outputPath(`privacy-banner-${width}.png`) });
  }
  await page.getByRole("button", { name: "Customize Preferences", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Privacy preferences", exact: true });
  await expect(dialog).toBeVisible();
  const close = page.getByRole("button", { name: "Close privacy preferences", exact: true });
  await close.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Privacy policy", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Customize Preferences", exact: true })).toBeFocused();
  await page.screenshot({ path: test.info().outputPath("privacy-banner.png") });
});

test("real regional endpoint ignores untrusted country claims and never caches location or exposes secrets", async ({ request }) => {
  const response = await request.get("/api/privacy/context?country=IN", { headers: { "x-jr-country": "US", "cf-ipcountry": "GB", "x-jr-geo-token": "untrusted", "sec-gpc": "1" } });
  expect(response.ok()).toBe(true);
  expect(response.headers()["cache-control"]).toContain("no-store");
  expect(await response.json()).toEqual({ ...basePolicy, gpc: true });
});
