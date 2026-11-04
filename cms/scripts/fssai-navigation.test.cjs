const assert = require("node:assert/strict");
const { test } = require("node:test");
const { initialSite } = require("../src/seed/content.ts");
const { migrateLegacySiteSettingLinks } = require("../src/seed/index.ts");

// Retain the two historical exact signatures, including their old alias values.
const historicalLinks = {
  "TM Search": "/corporate/trademark-registration/trademark-search",
  "TM Application Filing": "/corporate/trademark-registration/trademark-application-filing",
  "Formality Check Fail": "/corporate/trademark-registration/trademark-formality-check-fail",
  "TM Modification": "/corporate/trademark-registration/trademark-modification",
  "TM Objection": "/corporate/trademark-registration/trademark-objection",
  "TM Hearing": "/corporate/trademark-registration/trademark-hearing",
  "TM Opposition": "/corporate/trademark-registration/trademark-opposition",
  "Trademark Evidence Filing": "/corporate/trademark-registration/trademark-evidence-filing",
  "Trademark Renewal": "/corporate/trademark-registration/trademark-renewal",
  LPC: "/corporate/trademark-registration/legal-proceedings-certificate",
  "Copyright Registration": "/corporate/copyright-registration",
  "Copyright Objection": "/corporate/copyright-objection",
  "Design Registration": "/corporate/design-registration",
  "Patent Registration": "/corporate/patent-registration-consultant",
  "Fssai State": "/corporate/fssai/fssai-state-license",
  "Fssai Central": "/corporate/fssai/fssai-central-license",
  "Fssai Return": "/corporate/fssai/fssai-return-filing",
  "Water Report": "/corporate/water-report",
};

function historicalMenu(placeholders) {
  const menu = structuredClone(initialSite.headerMenu);
  const corporate = menu.find(item => item.label === "Corporate");
  const approval = menu.find(item => item.label === "Approval");
  const fssai = approval.categories.find(category => category.title === "FSSAI");
  approval.categories = approval.categories.filter(category => category !== fssai);
  fssai.links[0].href = "/corporate/fssai-certificate";
  corporate.categories.splice(5, 0, fssai);
  for (const item of menu) for (const category of item.categories ?? []) for (const link of category.links) {
    if (historicalLinks[link.label]) link.href = historicalLinks[link.label];
    if (placeholders && ["Indian Subsidiary", "RBI Mutual Fund Company Registration"].includes(link.label)) link.href = "/#services";
  }
  return menu;
}

async function previewMigration(headerMenu, pending = false) {
  const published = { documentId: "settings", updatedAt: "2026-10-31T00:00:00Z", headerMenu, legalLinks: initialSite.legalLinks };
  const draft = structuredClone(published);
  if (pending) draft.updatedAt = "2026-11-01T00:00:00Z";
  const updates = [];
  await migrateLegacySiteSettingLinks({
    documents: () => ({
      findFirst: async ({ status }) => status === "published" ? published : draft,
      update: async options => { updates.push(options); return published; },
    }),
    log: { info() {} },
  });
  return updates;
}

test("the CMS navigation mirror contains FSSAI once under Approval with only its approved fallback URL", () => {
  const corporate = initialSite.headerMenu.find(item => item.label === "Corporate");
  const approval = initialSite.headerMenu.find(item => item.label === "Approval");
  assert.ok(!corporate.categories.some(category => category.title === "FSSAI"));
  const groups = approval.categories.filter(category => category.title === "FSSAI");
  assert.equal(groups.length, 1);
  assert.deepEqual(groups[0].links.map(link => link.label), ["Fssai Basic Registration", "Fssai State", "Fssai Central", "Fssai Modification", "Fssai Renewal", "Fssai Return", "Water Report"]);
  assert.equal(groups[0].links[0].href, "/approval/fssai-certificate");
  assert.ok(groups[0].links.slice(1).every(link => link.href === "/#services"));
});

test("the existing exact historical signatures still match after moving the source mirror", async () => {
  for (const placeholders of [false, true]) {
    const menu = historicalMenu(placeholders);
    const original = structuredClone(menu);
    const updates = await previewMigration(menu);
    assert.equal(updates.length, 1);
    assert.deepEqual(updates[0].data, { headerMenu: initialSite.headerMenu });
    assert.deepEqual(menu, original);
  }
});

test("the signature guard still preserves customized menus and pending drafts", async () => {
  const customized = historicalMenu(false);
  customized.find(item => item.label === "Corporate").categories[0].title = "Custom editor category";
  assert.deepEqual(await previewMigration(customized), []);
  assert.deepEqual(await previewMigration(historicalMenu(false), true), []);
  assert.deepEqual(await previewMigration(initialSite.headerMenu), []);
});
