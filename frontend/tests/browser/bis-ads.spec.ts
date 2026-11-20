import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { bisAdsPage } from "../../data/bis-ads-fallback";

test.beforeEach(async ({ page }) => {
  // Keep optional vendors and test enquiries on this machine.
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ contentType: "text/javascript", body: "" }));
  await page.route("https://connect.facebook.net/**", (route) => route.fulfill({ contentType: "text/javascript", body: "" }));
  await page.addInitScript(() => localStorage.setItem("jr-consent", JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), preferences: false, analytics: false, marketing: false })));
});

test("static copy, section sequence, metadata, anchors and contact destinations", async ({ page }) => {
  const response = await page.goto("/ads/bis-certification");
  expect(response?.status()).toBe(200);
  await expect(page.locator("[data-bis-announcement]")).toHaveText("Affordable BIS Certification with Expert Support | 10,000+ Certifications · Expert Standards Team");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(bisAdsPage.hero.title);
  expect(await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.getAttribute("aria-labelledby")))).toEqual([
    "bis-hero-heading", "assistance-heading", "certifications-heading", "penalties-heading", "why-jr-heading", "process-heading", "documents-heading", "eligibility-heading", "faqs-heading", "bis-closing-heading",
  ]);
  const text = await page.locator("main").textContent();
  for (const section of [bisAdsPage.assistance, bisAdsPage.certifications, bisAdsPage.penalties, bisAdsPage.whyUs, bisAdsPage.process, bisAdsPage.documents]) {
    expect(text).toContain(section.title);
    if (section.description) expect(text).toContain(section.description);
    for (const card of section.cards) {
      expect(text).toContain(card.title);
      if (card.description) expect(text).toContain(card.description);
      for (const item of card.items ?? []) expect(text).toContain(item);
    }
  }
  for (const item of [...bisAdsPage.hero.services, ...bisAdsPage.hero.proof, ...bisAdsPage.audience.items]) expect(text).toContain(item);
  for (const faq of bisAdsPage.faqs.items) { expect(text).toContain(faq.question); expect(text).toContain(faq.answer); }
  await expect(page.locator("#documents article")).toHaveCount(9);
  await expect(page.locator("#eligibility li")).toHaveCount(8);
  await expect(page.locator("#faqs details")).toHaveCount(10);
  await expect(page.locator("#penalties article")).toHaveCount(6);
  await expect(page.locator("#process ol > li h3")).toHaveText(bisAdsPage.process.cards.map((card) => card.title));
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/ads\/bis-certification$/);
  await expect(page).toHaveTitle(bisAdsPage.seo.title);
  for (const link of await page.locator('a[data-bis-cta="consultation"]').all()) await expect(link).toHaveAttribute("href", "#expert-consultation");
  for (const link of await page.locator('a[data-bis-cta="whatsapp"]').all()) await expect(link).toHaveAttribute("href", /^https:\/\/wa\.me\/919266450125/);
  for (const link of await page.locator('a[data-bis-cta="call"]').all()) await expect(link).toHaveAttribute("href", "tel:1800121410410");
  const navigation = page.getByRole("navigation", { name: "BIS certification sections" });
  await expect(navigation.locator('a[data-bis-cta="navigation"]')).toHaveText(["Included", "Cert Types", "Benefits", "Process", "FAQ"]);
  await expect(page.locator(".site-header")).toHaveCount(0);
  await navigation.getByRole("link", { name: "Process", exact: true }).click();
  await expect(page).toHaveURL(/#process$/);
  await expect(page.locator("#process-heading")).toBeFocused();
  expect(await page.locator("[data-bis-header]").evaluate((header) => header.getBoundingClientRect().top)).toBe(0);
  expect(await page.locator("#process-heading").evaluate((heading) => heading.getBoundingClientRect().top >= document.querySelector("[data-bis-header]")!.getBoundingClientRect().bottom)).toBe(true);
  const summary = page.locator("#faqs summary").first();
  await summary.focus(); await page.keyboard.press("Enter");
  await expect(page.locator("#faqs details").first()).toHaveAttribute("open", "");
});

for (const [name, width, height] of [["desktop", 1440, 1000], ["tablet", 820, 1180], ["mobile", 390, 844], ["small-mobile", 320, 800]] as const) {
  test(`${name}: reflow, WCAG checks and form-aware sticky CTA`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.goto("/ads/bis-certification");
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator("#expert-consultation")).toBeVisible();
    const floatingWhatsApp = page.getByRole("link", { name: "Chat with JR Compliance on WhatsApp", exact: true });
    await expect(floatingWhatsApp).toBeVisible();
    await expect(floatingWhatsApp).toHaveAttribute("href", /^https:\/\/wa\.me\/919266450125/);
    const floatingBox = await floatingWhatsApp.boundingBox();
    expect(floatingBox!.x).toBeGreaterThan(width / 2);
    expect(await floatingWhatsApp.evaluate((link) => getComputedStyle(link).position)).toBe("fixed");
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: name === "desktop" });
    if (width > 820) {
      await page.locator("#assistance").scrollIntoViewIfNeeded();
      const bar = page.locator(".sticky-cta-bar");
      await expect(bar).toBeVisible();
      const support = bar.getByRole("group", { name: "BIS Certification", exact: true });
      await expect(support.getByText("Compliance Assessment", { exact: true })).toBeVisible();
      await expect(support.getByText("Lab Testing Support", { exact: true })).toBeVisible();
      await expect(support.getByRole("img", { name: "Sony", exact: true })).toBeVisible();
    }
    if (width <= 820) {
      await expect(page.locator("#expert-consultation")).toBeInViewport();
      const menu = page.getByRole("button", { name: "BIS page menu", exact: true });
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await menu.click();
      await page.getByRole("navigation", { name: "BIS certification sections" }).getByRole("link", { name: "Process", exact: true }).click();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#process-heading")).toBeFocused();
      await page.locator("#documents").scrollIntoViewIfNeeded();
      await expect(page.locator(".sticky-cta-bar")).toBeVisible();
      const highlight = page.locator(".sticky-cta-bar").getByRole("button", { name: /Next support highlight/ });
      await expect(highlight).toHaveAttribute("aria-label", /Current: Compliance Assessment/);
      await highlight.click();
      await expect(highlight).toHaveAttribute("aria-label", /Current: Lab Testing Support/);
      await expect.poll(async () => {
        const button = await floatingWhatsApp.boundingBox();
        const bar = await page.locator(".sticky-cta-bar").boundingBox();
        return button!.y + button!.height <= bar!.y;
      }).toBe(true);
      const cta = page.locator('.sticky-cta-bar a[href="#expert-consultation"]');
      await cta.click();
      await expect(page).toHaveURL(/#expert-consultation$/);
    }
  });
}

test("other pages keep their shared website navigation", async ({ page }) => {
  await page.goto("/contact-us");
  await expect(page.locator(".site-header")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Primary navigation", exact: true })).toBeVisible();
  await expect(page.locator("[data-bis-header]")).toHaveCount(0);
  await page.goto("/ads/bis-certification");
  await expect(page.locator("[data-bis-header]")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Primary navigation", exact: true })).toHaveCount(0);
});

test("campaign uses the existing consultation form design without overrides", async ({ page }) => {
  async function formDesign(target: Page) {
    return target.locator("#expert-consultation").evaluate((form) => {
      const styles = (element: Element, keys: string[]) => Object.fromEntries(keys.map((key) => [key, getComputedStyle(element).getPropertyValue(key)]));
      return {
        classes: form.className,
        surface: styles(form, ["background-image", "background-color", "border-radius", "border-color", "color", "box-shadow"]),
        heading: styles(form.querySelector("h2")!, ["font-family", "font-size", "font-weight", "color", "text-align"]),
        fields: styles(form.querySelector("fieldset")!, ["display", "grid-template-columns"]),
        input: styles(form.querySelector('input[name="name"]')!, ["height", "color", "background-color", "border-radius"]),
        submit: styles(form.querySelector('button[type="submit"]')!, ["min-height", "background-image", "border-radius", "color"]),
      };
    });
  }
  await page.goto("/contact-us");
  const existing = await formDesign(page);
  await page.goto("/ads/bis-certification");
  expect(await formDesign(page)).toEqual(existing);
  await expect(page.getByRole("list", { name: "Contact detail progress" })).toBeVisible();
});

test("previous campaign URL redirects while preserving campaign parameters", async ({ page }) => {
  const query = "utm_source=google&utm_medium=cpc&utm_campaign=bis&tag=one&tag=two&empty=";
  const response = await page.request.get(`/ads/bis?${query}`, { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  const destination = new URL(response.headers().location, "http://localhost:8123");
  expect(destination.pathname).toBe("/ads/bis-certification");
  expect(destination.searchParams.get("utm_source")).toBe("google");
  expect(destination.searchParams.getAll("tag")).toEqual(["one", "two"]);
  expect(destination.searchParams.get("empty")).toBe("");
  await page.goto(`/ads/bis?${query}`);
  await expect(page).toHaveURL(/\/ads\/bis-certification\?/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(bisAdsPage.hero.title);
});

test("shared form validation, normalized payload, UTM capture, failure, loading and success", async ({ page }) => {
  let attempts = 0;
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    attempts++;
    payload = route.request().postDataJSON();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await route.fulfill(attempts === 1 ? { status: 503, json: { message: "Simulated delivery failure" } } : { status: 200, json: { success: true } });
  });
  await page.goto("/ads/bis-certification?utm_source=google&utm_medium=cpc&utm_campaign=bis-test&utm_content=unchanged-contract");
  const form = page.locator("#expert-consultation");
  const submit = form.getByRole("button", { name: "Get Free Consultation", exact: true });
  await submit.click();
  await expect(form.getByRole("textbox", { name: "Full Name", exact: true })).toBeFocused();
  expect(attempts).toBe(0);
  await form.getByRole("textbox", { name: "Full Name", exact: true }).fill("Test BIS Enquiry");
  await form.getByRole("textbox", { name: "Email Address", exact: true }).fill("bis-test@example.com");
  await form.locator('input[name="phone"]').fill("9876543210");
  await form.locator('input[name="consent"]').check();
  await submit.click();
  await expect(form.getByRole("button", { name: "Sending your request..." })).toBeDisabled();
  await expect(form.getByRole("status")).toHaveText("Simulated delivery failure");
  expect(payload).toMatchObject({ name: "Test BIS Enquiry", email: "bis-test@example.com", phone: "+919876543210", consent: true, pathname: "/ads/bis-certification", pageParameters: { utm_source: "google", utm_medium: "cpc", utm_campaign: "bis-test" } });
  expect(payload?.pageParameters).not.toHaveProperty("utm_content");
  await submit.click();
  await expect(form.getByRole("status")).toContainText("Your request has been received");
  await expect(page).toHaveURL(/\/thank-you$/);
  expect(attempts).toBe(2);
});

test("CTA events respect consent, revocation and GPC without duplicate GTM", async ({ page }) => {
  await page.goto("/ads/bis-certification");
  const click = () => page.locator('[data-bis-location="hero"][data-bis-cta="consultation"]').click();
  await click();
  expect(await page.evaluate("window.dataLayer?.filter(e => e.event === 'cta_click').length ?? 0")).toBe(0);
  const setConsent = async (enabled: boolean) => page.evaluate((value) => {
    localStorage.setItem("jr-consent", JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), preferences: false, analytics: value, marketing: value }));
    dispatchEvent(new StorageEvent("storage", { key: "jr-consent" }));
  }, enabled);
  await setConsent(true);
  await expect(page.locator('script#google-tag-manager')).toHaveCount(1);
  await click();
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'cta_click').at(-1)")).toMatchObject({ event: "cta_click", cta_type: "consultation", cta_location: "hero", page_path: "/ads/bis-certification" });
  // Prevent an external WhatsApp visit while exercising the actual tracked anchor.
  await page.evaluate(() => document.addEventListener("click", (event) => { if ((event.target as Element).closest('[data-bis-cta="whatsapp"], .site-floating-control--right')) event.preventDefault(); }));
  await page.locator('[data-bis-location="hero"][data-bis-cta="whatsapp"]').click();
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'whatsapp_click').length")).toBe(1);
  const floatingWhatsApp = page.getByRole("link", { name: "Chat with JR Compliance on WhatsApp", exact: true });
  await floatingWhatsApp.click();
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'whatsapp_click').at(-1)")).toMatchObject({ page_path: "/ads/bis-certification", cta_type: "whatsapp", cta_location: "site-chrome" });
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'whatsapp_click').length")).toBe(2);
  await setConsent(false);
  await floatingWhatsApp.click();
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'whatsapp_click').length")).toBe(2);
  await click();
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'cta_click').length")).toBe(1);
  await setConsent(true);
  await page.evaluate(() => { Object.defineProperty(navigator, "globalPrivacyControl", { configurable: true, value: true }); dispatchEvent(new Event("pageshow")); });
  await click();
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'cta_click').length")).toBe(1);
  expect(await page.evaluate("window.dataLayer.filter(e => e.event === 'gtm.js').length")).toBe(1);
});
