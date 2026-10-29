const assert = require("node:assert/strict");
const { test } = require("node:test");
const { extraContentHtml, fixedContent, headerData, legacyExtraContentHtml, pageData, planExtraContentFormatting, planImport, singleParagraph, sourceContentHtml, trackCommitCallbacks } = require("./import-corporate-services.cjs");

const row = {
  category: "MCA Services", title: "Organisation DSC", sortOrder: 1,
  heroDescription: "Approved hero copy.", definition: "Approved definition.",
  documentation: "- PAN\n- Address <proof>", eligibility: "- A company\\n- An authorised signatory",
  process: "1. Apply.\n2. Verify & sign.", audience: "Companies and LLPs.",
  source: "https://not-imported.example/ignore-me",
};
function menu() {
  return [
    { id: 1, label: "Corporate", children: [], categories: [{ id: 2, title: "MCA Services", logo: { id: 91, url: "/uploads/logo.svg" }, links: [
      { id: 3, label: "Organisation DSC", href: "/#services", target: "same_tab" },
      { id: 4, label: "DSC", href: "/corporate/dsc-certificate", target: "same_tab" },
    ] }] },
    { id: 5, label: "About Us", href: "/about-us", children: [], categories: [] },
  ];
}

test("formats the four source columns in one Extra Content entry with headings and native lists", () => {
  const data = pageData(row, ["logo-one", "logo-two"]);
  assert.equal(data.hero.description, row.heroDescription);
  assert.deepEqual(data.overview.paragraphs, [{ text: row.definition }]);
  assert.equal(data.extraContent.length, 1);
  assert.equal(data.extraContent[0].description, "<h3>Documentation</h3>\n<ul>\n<li>PAN</li>\n<li>Address &lt;proof&gt;</li>\n</ul>\n\n<h3>Eligibility Criteria</h3>\n<ul>\n<li>A company</li>\n<li>An authorised signatory</li>\n</ul>\n\n<h3>Step-by-Step Process</h3>\n<ol>\n<li>Apply.</li>\n<li>Verify &amp; sign.</li>\n</ol>\n\n<h3>Who Needs</h3>\n<p>Companies and LLPs.</p>");
  assert.doesNotMatch(data.extraContent[0].description, /not-imported|<proof>/);
  assert.equal(singleParagraph("First line.\n\nSecond line."), "First line. Second line.");
  assert.equal(data.seo.canonicalUrl, "/corporate/organisation-dsc");
  assert.deepEqual(data.trustedLogos, { set: ["logo-one", "logo-two"] });
  for (const [field, value] of Object.entries(fixedContent)) assert.deepEqual(data[field], value);
  data.faqs.items[0].question = "changed locally";
  assert.equal(pageData(row, []).faqs.items[0].question, "test");
});

test("retains introductions, list boundaries, and literal HTML as escaped text", () => {
  assert.equal(sourceContentHtml("Bring these documents:\n- PAN\n- Aadhaar\nKeep originals."), "<p>Bring these documents:</p>\n<ul>\n<li>PAN</li>\n<li>Aadhaar</li>\n</ul>\n<p>Keep originals.</p>");
  assert.equal(sourceContentHtml("<script>alert('x')</script> & proof"), "<p>&lt;script&gt;alert('x')&lt;/script&gt; &amp; proof</p>");
});

test("formats only imported targets, preserves their other content, and skips already formatted descriptions", () => {
  const target = { name: "mca-service-page", documentId: "imported-service", title: row.title, slug: "organisation-dsc" };
  const draft = { id: 10, documentId: target.documentId, slug: target.slug, publishedAt: null, hero: { description: "Existing hero" }, extraContent: [{ id: 21, title: row.title, description: legacyExtraContentHtml(row) }] };
  const published = { ...structuredClone(draft), id: 11, publishedAt: "2026-10-21T06:00:00Z" };
  published.extraContent[0].id = 22;
  draft.trustedLogos = [{ documentId: "shared-logo", id: 31, publishedAt: null }];
  published.trustedLogos = [{ documentId: "shared-logo", id: 32, publishedAt: "2026-10-21T06:00:00Z" }];
  const pages = { "mca-service-page": [draft, published, { documentId: "untouched" }] };
  const updates = planExtraContentFormatting([row], pages, [target]);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].documentId, target.documentId);
  assert.equal(updates[0].description, extraContentHtml(row));
  assert.equal(draft.extraContent[0].description, legacyExtraContentHtml(row));
  draft.extraContent[0].description = published.extraContent[0].description = extraContentHtml(row);
  assert.equal(planExtraContentFormatting([row], pages, [target]).length, 0);
  published.hero.description = "Pending edit";
  assert.throws(() => planExtraContentFormatting([row], pages, [target]), /Pending draft edits/);
});

test("preserves both versions of existing pages, updates only new links, and is repeat-safe", () => {
  const originalMenu = menu();
  const pages = { "mca-service-page": [
    { id: 1, documentId: "dsc-existing", slug: "dsc-certificate", menuLabel: "DSC" },
    { id: 2, documentId: "dsc-existing", slug: "dsc-certificate", menuLabel: "DSC" },
  ] };
  const rows = [{ ...row, title: "DSC", sortOrder: 0 }, row];
  const plan = planImport(rows, pages, originalMenu, ["logo-one"]);
  assert.equal(plan.actions.filter(action => !action.existing).length, 1);
  assert.equal(plan.linkChanges.length, 1);
  assert.deepEqual(originalMenu, menu());
  assert.deepEqual(plan.headerMenu[1], originalMenu[1]);
  assert.equal(plan.headerMenu[0].categories[0].links[1].href, "/corporate/dsc-certificate");
  assert.equal(headerData(plan.headerMenu)[0].categories[0].logo, 91);
  assert.equal(headerData(plan.headerMenu)[0].id, undefined);
  pages["mca-service-page"].push({ documentId: "new-service", slug: "organisation-dsc", menuLabel: "Organisation DSC" });
  const again = planImport(rows, pages, plan.headerMenu, ["logo-one"]);
  assert.equal(again.actions.filter(action => !action.existing).length, 0);
  assert.equal(again.linkChanges.length, 0);
});

test("rejects cross-collection slug collisions and missing or ambiguous menu destinations", () => {
  assert.throws(() => planImport([row], { other: [{ slug: "organisation-dsc" }] }, menu(), ["logo"]), /slug collision/);
  const missing = menu();
  missing[0].categories[0].links = [];
  assert.throws(() => planImport([row], {}, missing, ["logo"]), /Expected one header link/);
  assert.throws(() => planImport([row], {}, menu(), []), /trusted logos/);
});

test("preserves the existing PSARA service despite its different Excel name", () => {
  const psara = { ...row, category: "Government License & Certification", title: "Psara Registration" };
  const header = [{ label: "Corporate", categories: [{ title: psara.category, links: [{ label: psara.title, href: "/corporate/psara-licence", target: "same_tab" }] }] }];
  const record = { documentId: "psara-existing", slug: "psara-licence", menuLabel: "PSARA Licence" };
  const plan = planImport([psara], { "government-license-certification-page": [record] }, header, ["logo"]);
  assert.equal(plan.actions[0].existing, record);
  assert.equal(plan.linkChanges.length, 0);
});

test("waits for asynchronous post-commit document events before database shutdown", async () => {
  const callbacks = [];
  const database = { transaction: async work => work({ onCommit: callback => callbacks.push(callback) }) };
  const flush = trackCommitCallbacks(database);
  let release;
  const event = new Promise(resolve => { release = resolve; });
  let finished = false;
  await database.transaction(({ onCommit }) => onCommit(async () => { await event; finished = true; }));
  callbacks.forEach(callback => callback());
  const draining = flush();
  await Promise.resolve();
  assert.equal(finished, false);
  release();
  await draining;
  assert.equal(finished, true);
});
