import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const profiles = [
  ["Seizure Safe", "data-seizure-safe"], ["Blind", "data-blind"],
  ["ADHD Friendly", "data-adhd-friendly"], ["Cognitive", "data-cognitive"],
  ["Motor Impaired", "data-motor-impaired"], ["Low Vision", "data-low-vision"],
] as const;
const dialog = (page: Page) => page.getByRole("dialog", { name: "Accessibility settings", exact: true });
const button = (page: Page, name: string) => dialog(page).getByRole("button", { name, exact: true });
async function open(page: Page) {
  await page.getByRole("button", { name: "Accessibility", exact: true }).click();
  await expect(dialog(page)).toBeVisible();
}
async function toggleProfile(page: Page, name: string) {
  const control = button(page, name);
  const reloads = name === "Blind" && await control.getAttribute("aria-pressed") === "false";
  if (reloads) {
    await Promise.all([page.waitForEvent("domcontentloaded"), control.click()]);
    await expect(page.locator("html")).toHaveAttribute("data-blind", "true");
    await open(page);
  } else {
    await control.click();
  }
  return reloads;
}
async function audit(page: Page) {
  if (test.info().project.name === "firefox") {
    // Firefox 159 crashes when axe follows Playwright ARIA inspection in one page.
    // Use a fresh live page with the same saved settings, media and viewport.
    const state = await page.evaluate(() => ({
      flags: Object.fromEntries(["textEnlarged", "highContrast", "reduceMotion", "seizureSafe", "blind", "adhdFriendly", "cognitive", "motorImpaired", "lowVision", "dyslexiaFont"].map((key) => [key, document.documentElement.dataset[key]])),
      fontSize: document.documentElement.style.fontSize,
      motion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      contrast: matchMedia("(prefers-contrast: more)").matches,
      controls: [...document.querySelectorAll('.accessibility-dialog button[aria-pressed]')].map((button) => ({ label: document.getElementById(button.getAttribute("aria-labelledby")!)?.textContent, pressed: button.getAttribute("aria-pressed"), disabled: button.hasAttribute("disabled") })),
    }));
    const auditPage = await page.context().newPage();
    try {
      if (page.viewportSize()) await auditPage.setViewportSize(page.viewportSize()!);
      await auditPage.emulateMedia({ reducedMotion: state.motion ? "reduce" : "no-preference", contrast: state.contrast ? "more" : "no-preference" });
      await auditPage.goto(page.url());
      await auditPage.waitForFunction(({ flags, fontSize }) => Object.entries(flags).every(([key, value]) => document.documentElement.dataset[key] === value) && document.documentElement.style.fontSize === fontSize, state);
      await auditPage.evaluate(() => document.querySelector<HTMLButtonElement>(".accessibility-launcher")!.click());
      await auditPage.waitForFunction(() => document.querySelector<HTMLDialogElement>(".accessibility-dialog")?.open);
      await auditPage.evaluate(async () => { await document.fonts.ready; });
      const controls = await auditPage.evaluate(() => [...document.querySelectorAll('.accessibility-dialog button[aria-pressed]')].map((button) => ({ label: document.getElementById(button.getAttribute("aria-labelledby")!)?.textContent, pressed: button.getAttribute("aria-pressed"), disabled: button.hasAttribute("disabled") })));
      expect(controls).toEqual(state.controls);
      const result = await new AxeBuilder({ page: auditPage }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(result.violations).toEqual([]);
    } finally {
      await auditPage.close();
    }
    return;
  }
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(result.violations).toEqual([]);
}
async function reflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (await dialog(page).count()) expect(await dialog(page).evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference", contrast: "no-preference" });
  await page.addInitScript(() => localStorage.setItem("jr-consent", JSON.stringify({ version: 2, region: "unknown", revision: "2", updatedAt: new Date().toISOString(), preferences: false, analytics: false, marketing: false })));
  await page.goto("/privacy-policy");
});

test("each profile has an accessible description, distinct behavior and reversible state", async ({ page }) => {
  await open(page);
  for (const [name, attribute] of profiles) {
    const profile = button(page, name);
    await expect(profile).toHaveAccessibleDescription(/.+/);
    await expect(profile).toHaveAttribute("aria-pressed", "false");
    const reloaded = await toggleProfile(page, name);
    await expect(profile).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).toHaveAttribute(attribute, "true");
    if (!reloaded) await expect(dialog(page).getByRole("status")).toContainText(`${name} profile enabled`);
    if (["Seizure Safe", "Blind", "ADHD Friendly"].includes(name)) {
      await expect(button(page, "Reduced motion")).toBeDisabled();
      await expect(page.locator("html")).toHaveAttribute("data-reduce-motion", "true");
    }
    if (name === "Cognitive") {
      await expect(page.locator("main p").first()).toHaveCSS("line-height", /.+/);
      expect(await page.locator("main h1").evaluate((element) => getComputedStyle(element).fontWeight)).toBe("700");
      await expect(dialog(page).getByRole("combobox", { name: "Jump to a page heading" })).toBeVisible();
    }
    if (name === "Motor Impaired") {
      const target = button(page, "Save preferences");
      const bounds = await target.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.width).toBeGreaterThanOrEqual(44);
    }
    if (name === "Low Vision") {
      await expect(button(page, "High contrast")).toBeDisabled();
      await expect(page.locator("html")).toHaveCSS("font-size", "24px");
      await expect(button(page, "Smaller text")).toBeDisabled();
    }
    await profile.click();
    await expect(page.locator("html")).toHaveAttribute(attribute, "false");
  }
  await expect(page.locator("html")).toHaveCSS("font-size", "16px");
  await expect(page.locator("html")).toHaveAttribute("data-reduce-motion", "false");
});

test("keyboard navigation, modal containment, accessible states and footer focus restoration", async ({ page }) => {
  const shortcut = page.getByRole("button", { name: "Accessibility settings", exact: true });
  await shortcut.focus();
  await page.keyboard.press("Enter");
  const close = button(page, "Close accessibility settings");
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(button(page, "Seizure Safe")).toBeFocused();
  await page.keyboard.press("Space");
  await expect(button(page, "Seizure Safe")).toHaveAttribute("aria-pressed", "true");
  await close.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(button(page, "Reset all settings")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await audit(page);
  await page.keyboard.press("Escape");
  await expect(shortcut).toBeFocused();
  // Pointer activation must restore the same footer trigger in Safari too.
  await shortcut.click();
  await toggleProfile(page, "Blind");
  await button(page, "Main content").click();
  await expect(page.locator("main")).toBeFocused();
  await open(page);
  const heading = page.locator("main h2").first();
  const title = (await heading.textContent())!.trim();
  await dialog(page).getByRole("combobox", { name: "Jump to a page heading" }).selectOption({ label: `H2: ${title}` });
  await expect(heading).toBeFocused();
  await open(page);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Accessibility", exact: true })).toBeFocused();
});

test("all profiles with dyslexia font, 200% text, save, reload and reset remain usable at 320px", async ({ page }) => {
  await open(page);
  for (const [name] of profiles) await toggleProfile(page, name);
  await button(page, "Dyslexia-friendly font").click();
  await button(page, "Larger text").click();
  await button(page, "Larger text").click();
  await expect(page.locator("html")).toHaveCSS("font-size", "32px");
  await expect(page.locator("main h1")).toHaveCSS("font-family", /Verdana/);
  await button(page, "Save preferences").click();
  await expect(dialog(page).getByRole("status")).toHaveText("Accessibility preferences saved.");
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-dyslexia-font", "true");
  for (const [, attribute] of profiles) await expect(page.locator("html")).toHaveAttribute(attribute, "true");
  await page.setViewportSize({ width: 320, height: 740 });
  await reflow(page);
  await open(page);
  await reflow(page);
  await audit(page);
  await button(page, "Reset all settings").click();
  for (const [, attribute] of profiles) await expect(page.locator("html")).toHaveAttribute(attribute, "false");
  await expect(page.locator("html")).toHaveCSS("font-size", "16px");
  await expect(page.locator("html")).toHaveAttribute("data-dyslexia-font", "false");
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-high-contrast", "false");
});

test("profile requirements preserve individual settings; font and cognitive styles combine", async ({ page }) => {
  await open(page);
  await button(page, "Larger text").click();
  await button(page, "High contrast").click();
  await button(page, "Low Vision").click();
  await expect(page.locator("html")).toHaveCSS("font-size", "24px");
  await button(page, "Low Vision").click();
  await expect(page.locator("html")).toHaveCSS("font-size", "20px");
  await expect(button(page, "High contrast")).toHaveAttribute("aria-pressed", "true");
  await button(page, "Cognitive").click();
  await button(page, "Dyslexia-friendly font").click();
  await expect(page.locator("main h1")).toHaveCSS("font-family", /Verdana/);
  await button(page, "Dyslexia-friendly font").click();
  await expect(page.locator("main h1")).not.toHaveCSS("font-family", /Verdana/);
  await expect(page.locator("html")).toHaveAttribute("data-cognitive", "true");
});

test("system settings, blocked storage and cross-tab profile changes", async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: "reduce", contrast: "more" });
  await open(page);
  await button(page, "Reset all settings").click();
  await expect(button(page, "High contrast")).toBeDisabled();
  await expect(button(page, "Reduced motion")).toBeDisabled();
  const second = await context.newPage();
  await second.goto("/privacy-policy");
  await second.evaluate(() => localStorage.setItem("jr-accessibility-v1", JSON.stringify({ profiles: ["cognitive"], dyslexiaFont: true })));
  await expect(button(page, "Cognitive")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-dyslexia-font", "true");
  await second.close();
  await page.keyboard.press("Escape");
  await page.evaluate(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage disabled"); } }));
  await open(page);
  await button(page, "Save preferences").click();
  await expect(dialog(page).getByRole("status")).toContainText("Browser storage is unavailable");
  await expect(button(page, "Cognitive")).toHaveAttribute("aria-pressed", "true");
});

test("combined settings preserve shared page layouts, menus and form controls", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("jr-accessibility-v1", JSON.stringify({ textScale: 200, dyslexiaFont: true, profiles: ["seizureSafe", "blind", "adhdFriendly", "cognitive", "motorImpaired", "lowVision"] })));
  for (const path of ["/", "/contact-us", "/corporate/private-limited-company-registration-consultant"]) {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(path);
    await expect(page.locator("html")).toHaveCSS("font-size", "32px");
    await reflow(page);
    await page.getByRole("button", { name: "Open menu", exact: true }).focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeFocused();
    const name = page.locator('form input[name="name"]').first();
    if (await name.isVisible()) {
      await name.fill("Accessibility test");
      await expect(name).toHaveValue("Accessibility test");
      expect((await name.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await expect(page.locator('form [role="group"] > div > span[aria-hidden="true"]').first()).toBeVisible();
    }
    for (const width of [768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await reflow(page);
    }
  }
});

test("reference popup layout keeps actions visible while profiles scroll", async ({ page }) => {
  await open(page);
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 740]]) {
    await page.setViewportSize({ width, height });
    const first = await button(page, "Seizure Safe").boundingBox();
    const second = await button(page, "Blind").boundingBox();
    if (width >= 480) {
      expect(first!.y).toBeCloseTo(second!.y, 0);
      expect(second!.x).toBeGreaterThan(first!.x);
    } else {
      expect(first!.x).toBeCloseTo(second!.x, 0);
      expect(second!.y).toBeGreaterThan(first!.y);
    }
    await expect(button(page, "Close accessibility settings")).toBeInViewport({ ratio: 1 });
    await expect(button(page, "Save preferences")).toBeInViewport({ ratio: 1 });
    await expect(button(page, "Reset all settings")).toBeInViewport({ ratio: 1 });
    await dialog(page).locator(".preference-dialog-body").evaluate((element) => { element.scrollTop = element.scrollHeight; });
    await expect(button(page, "Dyslexia-friendly font")).toBeInViewport({ ratio: 1 });
    await expect(button(page, "Close accessibility settings")).toBeInViewport({ ratio: 1 });
    await expect(button(page, "Save preferences")).toBeInViewport({ ratio: 1 });
    await reflow(page);
    await dialog(page).locator(".preference-dialog-body").evaluate((element) => { element.scrollTop = 0; });
  }
});

test("Blind activation reloads once after saving and keeps other choices", async ({ page }) => {
  let navigations = 0;
  page.on("request", (request) => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations++; });
  await open(page);
  await button(page, "Larger text").click();
  await button(page, "High contrast").click();
  await button(page, "Dyslexia-friendly font").click();
  expect(navigations).toBe(0);

  await toggleProfile(page, "Blind");
  expect(navigations).toBe(1);
  await expect(page.locator("html")).toHaveAttribute("data-high-contrast", "true");
  await expect(page.locator("html")).toHaveAttribute("data-dyslexia-font", "true");
  await expect(page.locator("html")).toHaveCSS("font-size", "20px");
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("jr-accessibility-v1")!))).toMatchObject({ profiles: ["blind"], textScale: 125, highContrast: true, dyslexiaFont: true });
  await expect(button(page, "Main content")).toBeVisible();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-blind", "true");
  await open(page);
  expect(navigations).toBe(2);
  await toggleProfile(page, "Blind");
  await expect(page.locator("html")).toHaveAttribute("data-blind", "false");
  await button(page, "Cognitive").click();
  await expect(page.locator("html")).toHaveAttribute("data-cognitive", "true");
  await button(page, "Reset all settings").click();
  await expect(page.locator("html")).toHaveAttribute("data-cognitive", "false");
  expect(navigations).toBe(2);
});

test("Blind stays active without a reload when saving is unavailable", async ({ page }) => {
  let navigations = 0;
  page.on("request", (request) => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations++; });
  await open(page);
  await page.evaluate(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage disabled"); } }));
  await button(page, "Blind").click();
  await expect(button(page, "Blind")).toHaveAttribute("aria-pressed", "true");
  await expect(button(page, "Main content")).toBeVisible();
  await expect(dialog(page).getByRole("status")).toContainText("Browser storage is unavailable");
  expect(navigations).toBe(0);
});
