import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("jr-consent", JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), preferences: false, analytics: false, marketing: false })));
});

for (const width of [1440, 320]) {
  test(`shared form labels and dial code match the live layout at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const pathname of ["/contact-us", "/ads/bis-certification"]) {
      await page.goto(pathname);
      const form = page.locator("#expert-consultation");
      const country = form.getByRole("combobox", { name: "Country calling code", exact: true });
      await expect(country).toHaveValue("IN");
      await expect(form.getByRole("textbox", { name: "Full Name", exact: true })).toBeVisible();
      await expect(form.getByRole("textbox", { name: "Email Address", exact: true })).toBeVisible();

      // Hidden labels remain associated with their controls and out of the visual flow.
      for (const field of ["name", "email", "phone", "phone-country"]) {
        const label = form.locator(`label[for$="-${field}"]`);
        const box = await label.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeLessThanOrEqual(1);
        expect(box!.height).toBeLessThanOrEqual(1);
      }

      const phone = form.locator('input[name="phone"]');
      const prefix = form.locator('select[name="phone-country"] + span');
      const phoneBox = await phone.boundingBox();
      const prefixBox = await prefix.boundingBox();
      expect(phoneBox).not.toBeNull();
      expect(prefixBox).not.toBeNull();
      expect(Math.abs(prefixBox!.y + prefixBox!.height / 2 - phoneBox!.y - phoneBox!.height / 2)).toBeLessThanOrEqual(2);

      await country.selectOption("US");
      await expect(prefix).toContainText("US +1");
      await country.focus();
      await expect(country).toBeFocused();
      await country.selectOption("IN");
      await expect(prefix).toContainText("IN +91");
      await form.getByRole("button", { name: /Tell us about your requirements/ }).click();
      await expect(form.getByRole("textbox", { name: /Tell us about your requirements/ })).toBeVisible();
      const messageLabel = await form.locator('label[for$="-message"]').boundingBox();
      expect(messageLabel!.height).toBeLessThanOrEqual(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const result = await new AxeBuilder({ page }).include("#expert-consultation").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(result.violations).toEqual([]);
      await form.screenshot({ path: testInfo.outputPath(`${pathname.includes("ads") ? "campaign" : "contact"}-${width}.png`) });
    }
  });
}
