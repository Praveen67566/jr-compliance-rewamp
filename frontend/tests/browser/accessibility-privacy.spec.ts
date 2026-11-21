import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { build } from "esbuild";
import { resolve } from "node:path";

let bundle: string;
test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/gtm.js?id=GTM-K938HN3", (route) => route.fulfill({
    contentType: "text/javascript", body: 'window.testGtmLoads = (window.testGtmLoads || 0) + 1; fbq("track", "PageView");',
  }));
  await page.route("https://connect.facebook.net/en_US/fbevents.js", (route) => route.fulfill({
    contentType: "text/javascript", body: "window.testMetaLoads = (window.testMetaLoads || 0) + 1;",
  }));
});

test.beforeAll(async () => {
  const result = await build({ entryPoints: [resolve("tests/browser/fixtures/controls.tsx")], bundle: true, write: false, platform: "browser", jsx: "automatic", define: { "process.env.NODE_ENV": '"test"' }, alias: { "next/navigation": resolve("tests/browser/fixtures/navigation.ts"), "@": resolve(".") } });
  bundle = result.outputFiles[0].text;
});

async function fixture(page: Page) {
  await page.goto("/contact-us");
  const styles = await page.locator('link[rel="stylesheet"]').evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href));
  await page.route("**/__test-controls", (route) => route.fulfill({ contentType: "text/html", body: `<!doctype html><html lang="en"><head><title>Preference controls test</title>${styles.map((url) => `<link rel="stylesheet" href="${url}">`).join("")}</head><body><div id="root"></div><script src="/__test-controls.js"></script></body></html>` }));
  await page.route("**/__test-controls.js", (route) => route.fulfill({ contentType: "text/javascript", body: bundle }));
  await page.route("**/__test-analytics.js", (route) => route.fulfill({ contentType: "text/javascript", body: "window.testAnalyticsLoaded = true;" }));
  await page.route("https://www.youtube-nocookie.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<!doctype html><html lang='en'><title>Stub video</title><body>Stub video</body></html>" }));
  await page.goto("/__test-controls");
  await expect(page.getByRole("heading", { name: "Preference controls test" })).toBeVisible();
}

test("GTM consent banner; shared landmarks, skip link, forms and dialogs", async ({ page }) => {
  await page.goto("/contact-us");
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Your privacy choices" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Accessibility settings" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Accessibility", exact: true })).toBeFocused();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("privacy choices are editable and persistent across pages", async ({ page }) => {
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Customize Preferences", exact: true }).click();
  for (const name of [/^Optional preferences/, /^Analytics/, /^External media/]) {
    const choice = page.getByRole("checkbox", { name });
    await expect(choice).toBeEnabled();
    await choice.focus();
    await page.keyboard.press("Space");
    await expect(choice).toBeChecked();
    await expect(choice).toHaveCSS("background-color", "rgb(139, 220, 255)");
  }
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Your privacy choices" })).toHaveCount(0);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  for (const name of [/^Optional preferences/, /^Analytics/, /^External media/]) await expect(page.getByRole("checkbox", { name })).toBeChecked();
  await page.getByRole("checkbox", { name: /^Analytics/ }).click();
  await expect(page.getByRole("checkbox", { name: /^Analytics/ })).not.toBeChecked();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("jr-consent")!))).toMatchObject({ preferences: true, analytics: false, marketing: true });
});

test("GTM waits for both categories, stays isolated and is destroyed on withdrawal", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("googletagmanager.com/gtm.js")) requests.push(request.url());
  });
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Reject All", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("checkbox", { name: /^Analytics/ }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  expect(requests).toEqual([]);
  expect(await page.evaluate("typeof window.gtag")).toBe("undefined");
  expect(await page.evaluate("typeof window.fbq")).toBe("undefined");
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("checkbox", { name: /^External media/ }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  const frame = () => page.frames().find((item) => item !== page.mainFrame())!;
  await expect.poll(async () => frame()?.evaluate("window.testGtmLoads || 0")).toBe(1);
  await expect.poll(async () => frame()?.evaluate("window.testMetaLoads || 0")).toBe(1);
  expect(await frame().evaluate("window.fbq.queue")).toEqual([
    ["consent", "grant"], ["init", "1027798165813441"], ["track", "PageView"],
  ]);
  expect(await frame().evaluate("window.dataLayer.filter(entry => entry.event === 'gtm.js').length")).toBe(1);
  await expect(page.locator("#google-tag-manager")).toHaveAttribute("sandbox", "allow-scripts");
  await page.locator('a[href="/about-us"]').first().click();
  await expect(page).toHaveURL(/\/about-us$/);
  await expect.poll(() => requests.length).toBe(2);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  expect(requests).toHaveLength(2);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("button", { name: "Withdraw consent", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  expect(await page.evaluate("typeof window.fbq")).toBe("undefined");
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("checkbox", { name: /^Analytics/ }).check();
  await page.getByRole("checkbox", { name: /^External media/ }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await expect.poll(() => requests.length).toBe(3);
  await expect.poll(async () => frame()?.evaluate("window.testGtmLoads || 0")).toBe(1);
});

test("GPC blocks GTM even with saved analytics and marketing permission", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "globalPrivacyControl", { value: true });
    localStorage.setItem("jr-consent", JSON.stringify({ version: 2, region: "unknown", revision: "2", updatedAt: new Date().toISOString(), preferences: false, analytics: true, marketing: true }));
  });
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: /^External media/ })).toBeDisabled();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
  await expect(page.locator("#meta-pixel-base")).toHaveCount(0);
  expect(await page.evaluate("typeof window.gtag")).toBe("undefined");
  expect(await page.evaluate("typeof window.fbq")).toBe("undefined");
});

test("GTM PageView stays safe when the Meta library is blocked", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("https://connect.facebook.net/en_US/fbevents.js", (route) => route.abort());
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  const frame = () => page.frames().find((item) => item !== page.mainFrame())!;
  await expect.poll(async () => frame()?.evaluate("window.testGtmLoads || 0")).toBe(1);
  expect(await frame().evaluate("window.fbq.queue")).toEqual([
    ["consent", "grant"], ["init", "1027798165813441"], ["track", "PageView"],
  ]);
  expect(errors).toEqual([]);
});

test("isolated GTM cannot use or overwrite a parent-page Pixel", async ({ page }) => {
  await page.addInitScript(`
    window.testMetaCalls = [];
    window.fbq = function () { window.testMetaCalls.push(Array.from(arguments)); };
    window.existingFbq = window.fbq;
  `);
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  const frame = () => page.frames().find((item) => item !== page.mainFrame())!;
  await expect.poll(async () => frame()?.evaluate("window.testGtmLoads || 0")).toBe(1);
  expect(await page.evaluate("window.fbq === window.existingFbq")).toBe(true);
  expect(await page.evaluate("window.testMetaCalls")).toEqual([]);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("button", { name: "Withdraw consent", exact: true }).click();
  await expect(page.locator("#google-tag-manager")).toHaveCount(0);
});

test("FAQ questions keep their full-width themed controls and expand correctly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const question = page.locator("#faq .faq-question").first();
  await question.scrollIntoViewIfNeeded();
  const presentation = await question.evaluate((button) => ({
    width: button.getBoundingClientRect().width,
    parentWidth: button.parentElement!.getBoundingClientRect().width,
    background: getComputedStyle(button).backgroundColor,
    display: getComputedStyle(button).display,
  }));
  expect(presentation.width).toBeCloseTo(presentation.parentWidth, 0);
  expect(presentation.background).toBe("rgba(0, 0, 0, 0)");
  expect(presentation.display).toBe("flex");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(`#${await question.getAttribute("aria-controls")}`)).toBeVisible();
  const results = await new AxeBuilder({ page }).include("#faq").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(question).toBeVisible();
  expect(await question.evaluate((button) => button.getBoundingClientRect().right <= innerWidth)).toBe(true);
});

test("accept, persistence, custom choices, withdrawal, cleanup and no duplicate initialization", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => { if (/__test-analytics|youtube-nocookie/.test(request.url())) requests.push(request.url()); });
  await fixture(page);
  await expect(page.getByTestId("starts")).toHaveText("0");
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.getByTestId("starts")).toHaveText("1");
  await expect(page.locator("iframe")).toHaveCount(1);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await expect(page.getByTestId("starts")).toHaveText("1");
  await page.reload();
  await expect(page.getByTestId("starts")).toHaveText("1");
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("button", { name: "Withdraw consent", exact: true }).click();
  await expect(page.getByTestId("stops")).toHaveText("1");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(page.locator('script[src="/__test-analytics.js"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("checkbox", { name: /^Analytics/ }).check();
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await expect(page.getByTestId("starts")).toHaveText("2");
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("Seizure Safe removes an already loaded video and keeps consent independent", async ({ page }) => {
  await fixture(page);
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.locator("iframe")).toHaveCount(1);
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  await page.getByRole("button", { name: "Seizure Safe", exact: true }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.getByText(/Video .* is blocked by the Seizure Safe profile/)).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-seizure-safe", "true");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  await page.getByRole("button", { name: "Seizure Safe", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("iframe")).toHaveCount(1);
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.getByRole("button", { name: "Withdraw consent", exact: true }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("reject, GPC, unavailable storage and consent dialog accessibility", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "globalPrivacyControl", { value: true });
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage disabled"); } });
  });
  await fixture(page);
  await page.getByRole("button", { name: "Reject All", exact: true }).click();
  await expect(page.getByTestId("starts")).toHaveText("0");
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: /^External media/ })).toBeDisabled();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button", { name: "Save preferences", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Browser storage is unavailable");
  await page.reload();
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Accept All", exact: true }).click();
  await expect(page.getByTestId("starts")).toHaveText("1");
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("GPC overrides an existing grant; cross-tab withdrawal and policy upgrades stop tracking", async ({ page, context }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "globalPrivacyControl", { value: true });
    localStorage.setItem("jr-consent", JSON.stringify({ version: 2, region: "unknown", revision: "2", updatedAt: new Date().toISOString(), preferences: false, analytics: true, marketing: true }));
  });
  await fixture(page);
  await expect(page.getByTestId("starts")).toHaveText("1");
  await expect(page.locator("iframe")).toHaveCount(0);
  const second = await context.newPage();
  await second.goto("/contact-us");
  await second.evaluate(() => localStorage.setItem("jr-consent", JSON.stringify({ version: 2, region: "unknown", revision: "2", updatedAt: new Date().toISOString(), preferences: false, analytics: false, marketing: false })));
  await expect(page.getByTestId("stops")).toHaveText("1");
  await second.evaluate(() => localStorage.setItem("jr-consent", JSON.stringify({ version: 0, updatedAt: new Date().toISOString(), preferences: true, analytics: true, marketing: true })));
  await expect(page.getByRole("button", { name: "Accept All", exact: true })).toBeVisible();
  await expect(page.getByTestId("starts")).toHaveText("1");
});

test("consent banner has unselected options, accessible mobile controls, reset and focus restoration", async ({ page }) => {
  await fixture(page);
  await page.setViewportSize({ width: 320, height: 740 });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  const customize = page.getByRole("button", { name: "Customize Preferences", exact: true });
  await customize.click();
  await expect(page.getByRole("checkbox", { name: /^Analytics/ })).not.toBeChecked();
  await expect(page.getByRole("checkbox", { name: /^External media/ })).not.toBeChecked();
  await page.getByRole("checkbox", { name: /^Analytics/ }).check();
  await page.getByRole("button", { name: "Reset optional preferences", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: /^Analytics/ })).not.toBeChecked();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Privacy preferences", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  for (let index = 0; index < 4; index++) await page.getByRole("button", { name: "Larger text", exact: true }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Privacy preferences", exact: true }).click();
  expect(await page.getByRole("dialog").evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth)).toBe(true);
});

test("system motion and contrast, dialog keyboard containment and blocked accessibility storage", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage disabled"); } }));
  await page.emulateMedia({ reducedMotion: "reduce", contrast: "more" });
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  await expect(page.getByRole("button", { name: "Reduced motion", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "High contrast", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Larger text", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("Browser storage is unavailable");
  await page.getByRole("button", { name: "Close accessibility settings", exact: true }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Reset all settings", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Close accessibility settings", exact: true })).toBeFocused();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button", { name: "Reset all settings", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-reduce-motion", "true");
});

test("campaign modal is visitor initiated and restores focus; WhatsApp preview dismisses", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/gpt-ad/bis-certification");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const trigger = page.getByRole("button", { name: /consultation/i }).first();
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.goto("/contact-us");
  const whatsapp = page.getByRole("link", { name: /Chat with .* on WhatsApp/ });
  await whatsapp.focus();
  await expect(page.getByRole("tooltip")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toBeHidden();
  await expect(whatsapp).toBeFocused();
});

test("toolbar persists enlargement, contrast and motion; reset restores defaults", async ({ page }) => {
  await page.goto("/privacy-policy");
  await page.getByRole("button", { name: "Reject All", exact: true }).click();
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  for (let index = 0; index < 4; index++) await page.getByRole("button", { name: "Larger text", exact: true }).click();
  await page.getByRole("button", { name: "High contrast", exact: true }).click();
  await page.getByRole("button", { name: "Reduced motion", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("html")).toHaveAttribute("data-text-enlarged", "true");
  await expect(page.locator("html")).toHaveAttribute("data-high-contrast", "true");
  await expect(page.locator("html")).toHaveAttribute("data-reduce-motion", "true");
  expect(await page.locator("html").evaluate((root) => getComputedStyle(root).fontSize)).toBe("32px");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-high-contrast", "true");
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  expect(await page.getByRole("dialog").evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Smaller text", exact: true }).click();
  expect(await page.locator("html").evaluate((root) => getComputedStyle(root).fontSize)).toBe("28px");
  await page.getByRole("button", { name: "Default text size", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-high-contrast", "true");
  await page.getByRole("button", { name: "Reset all settings", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-high-contrast", "false");
  expect(await page.locator("html").evaluate((root) => getComputedStyle(root).fontSize)).toBe("16px");
});

test("desktop and mobile menus, FAQs, form validation and simulated lead payload", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const corporate = page.getByRole("button", { name: "Corporate", exact: true });
  await corporate.focus(); await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("searchbox")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(corporate).toBeFocused();
  const tab = page.getByRole("tablist", { name: "Frequently asked question categories" }).getByRole("tab").first();
  await tab.focus(); await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tablist", { name: "Frequently asked question categories" }).getByRole("tab").nth(1)).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("button", { name: "Expand Corporate menu", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeFocused();
  await page.goto("/contact-us");
  const form = page.getByRole("form").first();
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('input[name="name"]')).toBeFocused();
  await expect(form.getByRole("status")).toContainText("Please check");
  await form.locator('input[name="name"]').fill("Test Visitor");
  await form.locator('input[name="email"]').fill("visitor@example.com");
  await form.locator('input[name="phone"]').fill("9876543210");
  await form.locator('input[name="consent"]').check();
  let body: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => { body = route.request().postDataJSON(); await route.fulfill({ status: 503, json: { message: "Simulated delivery failure" } }); });
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("status")).toContainText("Simulated delivery failure");
  expect(body).toMatchObject({ name: "Test Visitor", email: "visitor@example.com", phone: "+919876543210", consent: true, pathname: "/contact-us" });
});

for (const path of ["/", "/about-us", "/careers", "/privacy-policy", "/corporate/private-limited-company-registration-consultant", "/approval/fssai-certificate", "/gpt-ad/bis-certification", "/thank-you"]) {
  test(`representative template axe and reflow: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
    await page.setViewportSize({ width: 320, height: 740 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const mobile = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(mobile.violations).toEqual([]);
    await page.evaluate(() => localStorage.setItem("jr-accessibility-v1", JSON.stringify({ textScale: 200, highContrast: false, reduceMotion: true })));
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-text-enlarged", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
