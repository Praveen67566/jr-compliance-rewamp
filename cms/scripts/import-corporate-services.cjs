#!/usr/bin/env node
// Explicit local content import; never called by Strapi bootstrap or seed flags.
const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const cmsDir = path.resolve(__dirname, "..");
const siteUid = "api::site-setting.site-setting";
const homeUid = "api::home-page.home-page";
const categories = {
  "MCA Services": ["mca-service-page", "mca-services"],
  "Import Export Service": ["import-export-service-page", "import-export"],
  "Government License & Certification": ["government-license-certification-page", "government-license-certification"],
  "IPR Services": ["ipr-service-page", "ipr-services"],
  FSSAI: ["fssai-service-page", "fssai"],
  "SEBI Business Registration": ["sebi-business-registration-page", "sebi-business-registration"],
  "Tax and Accounting": ["tax-accounting-page", "tax-accounting"],
  "Labour Compliance": ["labour-compliance-page", "labour-compliance"],
  "Fund Raising": ["fund-raising-page", "fund-raising"],
};
// Existing approved services have legacy slugs and must retain their content.
const existingSlugs = {
  DSC: "dsc-certificate",
  "IEC Code": "iec-registration",
  "Ayush License": "ayush-license",
  "Psara Registration": "psara-licence",
  "TRADEMARK Registration": "trademark-registration",
  "Fssai Basic Registration": "fssai-certificate",
  "Portfolio Manager Registration": "portfolio-manager-registration",
  "GST Registration": "gst-registration",
  "Shop & Establishment Registration": "shop-and-establishment-act-registration",
  MSME: "msme-registration",
  "Startup India Registration": "startup-india-registration",
  CSR: "csr",
};
const contactCta = { label: "Contact Us", href: "/contact-us", target: "same_tab" };
const fixedContent = {
  faqs: {
    eyebrow: "Need clarity?", title: "Frequently asked questions",
    items: [{ question: "test", answer: "test" }],
  },
  finalCta: {
    title: "Take the next step toward success",
    description: "Partner with compliance experts and move your registration forward with a clear, documented process.",
    cta: contactCta,
  },
  tickerCta: { title: "Let's Talk Compliance", description: "Lets Talk", cta: contactCta },
  resultsSection: {
    ratingLabel: "Excellent", ratingSource: "Google Reviews",
    title: "Real Review for Real Speed",
    description: "Ready To Get Your Certification?\nJoin 5,000+ Indian businesses & protect your business today.",
    stats: [
      { value: "5000+", label: "Certifications Done" },
      { value: "25+", label: "Services" },
      { value: "500+", label: "Businesses Served" },
    ],
    quote: "JR Compliance truly simplified certification for us. They were patient with questions, gave good advice, the prices were the best we could find, and the communication all round was very positive.",
    personName: "PN Dhawanjewar", personRole: "Director", companyName: "ElectroTech India",
  },
};

function uid(name) { return `api::${name}.${name}`; }
function collection(name) { return JSON.parse(fs.readFileSync(path.join(cmsDir, "src/api", name, "content-types", name, "schema.json"))).info.pluralName; }
function slugFor(title) { return title.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function normalize(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, ""); }
function withoutIds(value) {
  if (Array.isArray(value)) return value.map(withoutIds);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([key]) => key !== "id").map(([key, item]) => [key, withoutIds(item)]));
  return value;
}
function singleParagraph(value) {
  return value.replace(/\\r\\n|\\n|\\r/g, "\n").split(/\r?\n/)
    .map(line => line.trim().replace(/^(?:[-*•]\s+|\d+[.)]\s+)/, ""))
    .filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function legacyExtraContentHtml(row) {
  const paragraph = [
    ["Documentation", row.documentation], ["Eligibility Criteria", row.eligibility],
    ["Step-by-Step Process", row.process], ["Who Needs", row.audience],
  ].map(([label, content]) => `${label}: ${singleParagraph(content)}`).join(" ");
  return `<p>${escapeHtml(paragraph)}</p>`;
}
function sourceContentHtml(value) {
  const lines = value.replace(/\\r\\n|\\n|\\r/g, "\n").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const blocks = [];
  let list = null;
  for (const line of lines) {
    const bullet = line.match(/^[-*•]\s+(.+)$/);
    const step = line.match(/^\d+[.)]\s+(.+)$/);
    const type = step ? "ol" : bullet ? "ul" : null;
    if (type) {
      if (!list || list.type !== type) {
        list = { type, items: [] };
        blocks.push(list);
      }
      list.items.push(step?.[1] ?? bullet[1]);
    } else {
      list = null;
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks.map(block => block.type === "p"
    ? `<p>${escapeHtml(block.text)}</p>`
    : `<${block.type}>\n${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join("\n")}\n</${block.type}>`).join("\n");
}
function extraContentHtml(row) {
  return [
    ["Documentation", row.documentation], ["Eligibility Criteria", row.eligibility],
    ["Step-by-Step Process", row.process], ["Who Needs", row.audience],
  ].map(([heading, content]) => `<h3>${heading}</h3>\n${sourceContentHtml(content)}`).join("\n\n");
}
function editableContent(record) {
  const { id, createdAt, updatedAt, publishedAt, ...content } = record;
  const editable = withoutIds(content);
  // Draft/published relation payloads contain different version metadata even
  // when the page selects exactly the same ordered Brand Logo documents.
  if (Array.isArray(editable.trustedLogos)) editable.trustedLogos = editable.trustedLogos.map(logo => logo.documentId);
  return editable;
}
function planExtraContentFormatting(rows, pages, targets) {
  return targets.flatMap(target => {
    const row = rows.find(row => categories[row.category]?.[0] === target.name && slugFor(row.title) === target.slug);
    assert.ok(row, `Missing workbook service for imported page: ${target.title}`);
    const versions = (pages[target.name] ?? []).filter(page => page.documentId === target.documentId);
    const draft = versions.find(page => !page.publishedAt);
    const published = versions.find(page => page.publishedAt);
    assert.ok(draft && published, `Both versions are required for ${target.title}.`);
    assert.deepEqual(editableContent(draft), editableContent(published), `Pending draft edits on ${target.title}; preserve them before formatting.`);
    assert.equal(draft.extraContent?.length, 1, `Expected one Extra Content entry on ${target.title}.`);
    const description = extraContentHtml(row);
    if (draft.extraContent[0].description === description) return [];
    assert.equal(draft.extraContent[0].description, legacyExtraContentHtml(row), `Extra Content was edited on ${target.title}; it does not match the original import.`);
    return [{ ...target, description, draft, published }];
  });
}
function pageData(row, logoIds) {
  const slug = slugFor(row.title);
  return {
    title: row.title, menuLabel: row.title, slug, sortOrder: row.sortOrder,
    hero: { eyebrow: row.category, description: row.heroDescription,
      cta: { label: "Talk to an expert", href: "/contact-us", target: "same_tab" } },
    trustedLogos: { set: [...logoIds] },
    overview: { eyebrow: "Service Overview", title: `What is ${row.title}?`, paragraphs: [{ text: row.definition }] },
    extraContent: [{ title: row.title, description: extraContentHtml(row) }],
    ...structuredClone(fixedContent),
    seo: { metaTitle: row.title, metaDescription: row.heroDescription,
      canonicalUrl: `/corporate/${slug}` },
  };
}

function planImport(rows, pages, headerMenu, logoIds) {
  const menu = structuredClone(headerMenu);
  const corporate = menu.find(item => item.label === "Corporate");
  assert.ok(corporate, "Missing Corporate header menu.");
  assert.ok(logoIds.length > 0, "The published Home Page must have trusted logos.");
  const occupied = new Set(Object.values(pages).flat().map(page => page.slug));
  const actions = [], linkChanges = [];
  for (const row of rows) {
    const [name, categorySlug] = categories[row.category] ?? [];
    assert.ok(name, `Unsupported workbook category: ${row.category}`);
    const candidates = (pages[name] ?? []).filter(page => page.slug === (existingSlugs[row.title] ?? slugFor(row.title)) || normalize(page.menuLabel ?? "") === normalize(row.title));
    const documents = new Map(candidates.map(page => [page.documentId, page]));
    assert.ok(documents.size <= 1, `Ambiguous existing service: ${row.title}`);
    const existing = [...documents.values()][0];
    const data = pageData(row, logoIds);
    if (!existing) {
      assert.ok(!occupied.has(data.slug), `Corporate slug collision: ${data.slug}`);
      occupied.add(data.slug);
    }
    const group = corporate.categories?.find(item => normalize(item.title) === normalize(row.category));
    const links = group?.links?.filter(link => normalize(link.label) === normalize(row.title)) ?? [];
    assert.equal(links.length, 1, `Expected one header link for ${row.category} / ${row.title}`);
    // Preserve the twelve original pages and their existing navigation; repair
    // links for newly imported pages on a subsequent run after an interruption.
    if (!existingSlugs[row.title]) {
      const href = `/corporate/${existing?.slug ?? data.slug}`;
      if (links[0].href !== href) {
        linkChanges.push({ label: row.title, before: links[0].href, after: href });
        links[0].href = href;
      }
    }
    actions.push({ row, name, existing, data });
  }
  return { actions, headerMenu: menu, linkChanges };
}

function populateFor(name, component = false) {
  const filename = component
    ? path.join(cmsDir, "src/components", ...name.split(".")) + ".json"
    : path.join(cmsDir, "src/api", name, "content-types", name, "schema.json");
  const schema = JSON.parse(fs.readFileSync(filename));
  return Object.fromEntries(Object.entries(schema.attributes).flatMap(([field, attribute]) => {
    if (attribute.type === "component") {
      const populate = populateFor(attribute.component, true);
      return [[field, Object.keys(populate).length ? { populate } : true]];
    }
    if (attribute.type === "media") return [[field, true]];
    if (attribute.type === "relation") return [[field, attribute.target === "api::brand-logo.brand-logo" ? { populate: { logo: true } } : true]];
    return [];
  }));
}
function addPopulate(params, tree, prefix = "populate") {
  for (const [key, value] of Object.entries(tree)) {
    if (value === true) params.set(`${prefix}[${key}]`, "true");
    else addPopulate(params, value.populate, `${prefix}[${key}][populate]`);
  }
}
function headerData(menu) {
  return menu.map(item => ({
    label: item.label, href: item.href,
    children: item.children?.map(({ label, href, target }) => ({ label, href, target })),
    categories: item.categories?.map(category => ({
      title: category.title, logo: category.logo?.id ?? null,
      links: category.links.map(({ label, href, target }) => ({ label, href, target })),
    })),
  }));
}

async function readState(env) {
  async function get(name, status, extra = {}) {
    const url = new URL(`/api/${name}`, env.STRAPI_URL);
    url.searchParams.set("status", status);
    for (const [key, value] of Object.entries(extra)) url.searchParams.set(key, value);
    const type = name === "site-setting" || name === "home-page" ? name : Object.values(categories).map(([singular]) => singular).concat("company-registration-page").find(singular => collection(singular) === name);
    addPopulate(url.searchParams, populateFor(type));
    const response = await fetch(url, { headers: { Authorization: `Bearer ${env.STRAPI_API_TOKEN}` }, signal: AbortSignal.timeout(20000) });
    assert.ok(response.ok, `CMS read failed: ${name} (${response.status})`);
    const body = await response.json();
    if (body.meta?.pagination) assert.ok(body.meta.pagination.pageCount <= 1, `Unexpected pagination: ${name}`);
    return body.data;
  }
  const names = ["company-registration-page", ...Object.values(categories).map(([name]) => name)];
  const pages = {};
  await Promise.all(names.map(async name => {
    const versions = await Promise.all(["draft", "published"].map(status => get(collection(name), status, { "pagination[pageSize]": "200" })));
    pages[name] = versions.flat();
  }));
  const [home, site, draft] = await Promise.all([get("home-page", "published"), get("site-setting", "published"), get("site-setting", "draft")]);
  assert.ok(home && site && draft, "Published Home Page and published/draft Site Setting are required.");
  return { pages, home, site, draft };
}

function backupDatabase(env, directory) {
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  const url = new URL(env.DATABASE_URL);
  const pgEnv = { ...process.env, PGHOST: url.hostname, PGPORT: url.port || "5432",
    PGDATABASE: decodeURIComponent(url.pathname.slice(1)), PGUSER: decodeURIComponent(url.username),
    PGPASSWORD: decodeURIComponent(url.password) };
  const filename = path.join(directory, "before-import.dump");
  const result = spawnSync("pg_dump", ["--format=custom", "--no-owner", "--file", filename], { env: pgEnv, encoding: "utf8" });
  assert.equal(result.status, 0, "PostgreSQL backup failed; no content was imported.");
  fs.chmodSync(filename, 0o600);
  const listing = spawnSync("pg_restore", ["--list", filename], { encoding: "utf8" });
  assert.equal(listing.status, 0, "PostgreSQL backup could not be read.");
  assert.ok(listing.stdout.includes("TABLE DATA"), "PostgreSQL backup contains no table data.");
  return filename;
}

function trackCommitCallbacks(database) {
  // Strapi 5 schedules document events in onCommit callbacks without awaiting
  // their promises. Keep the database open until those callbacks have finished.
  const transaction = database.transaction.bind(database);
  const pending = [];
  database.transaction = callback => transaction(typeof callback !== "function" ? callback : context => callback({
    ...context,
    onCommit: work => context.onCommit(() => {
      const promise = Promise.resolve().then(work);
      pending.push(promise);
      promise.catch(() => {}); // The flush below reports any rejection.
      return promise;
    }),
  }));
  return async () => {
    let completed = 0;
    while (completed < pending.length) {
      const batch = pending.slice(completed);
      completed += batch.length;
      const results = await Promise.allSettled(batch);
      const failure = results.find(result => result.status === "rejected");
      if (failure) throw failure.reason;
    }
  };
}

async function applyPlan(plan, baseline, auditDir) {
  process.chdir(cmsDir);
  process.env.ENV_PATH = path.join(cmsDir, ".env");
  const { createStrapi } = require("@strapi/strapi");
  const app = createStrapi({ appDir: cmsDir, distDir: path.join(cmsDir, "dist") });
  app.__jrRevalidationSuppressed = true;
  const created = [];
  let flushEvents = async () => {};
  try {
    await app.load();
    flushEvents = trackCommitCallbacks(app.db);
    await app.db.transaction(async () => {
      const settings = app.documents(siteUid);
      if (plan.linkChanges.length) {
        const [published, draft] = await Promise.all(["published", "draft"].map(status => settings.findFirst({ status, populate: populateFor("site-setting") })));
        assert.equal(published?.updatedAt, baseline.site.updatedAt, "Site Setting changed since the preview.");
        assert.equal(draft?.updatedAt, published.updatedAt, "Site Setting has pending draft changes.");
        assert.deepEqual(withoutIds(draft.headerMenu), withoutIds(published.headerMenu), "Site Setting has pending header changes.");
      }
      for (const action of plan.actions.filter(item => !item.existing)) {
        const documents = app.documents(uid(action.name));
        const matches = await Promise.all(["published", "draft"].map(status => documents.findFirst({ status, filters: { slug: action.data.slug } })));
        assert.ok(matches.every(item => !item), `Service appeared after preview: ${action.row.title}`);
        const record = await documents.create({ status: "published", data: action.data });
        created.push({ name: action.name, documentId: record.documentId, title: action.row.title, slug: record.slug });
        console.log(`Created ${created.length}: ${action.row.title}`);
      }
      for (const update of plan.extraContentUpdates ?? []) {
        const documents = app.documents(uid(update.name));
        const [draft, published] = await Promise.all(["draft", "published"].map(status => documents.findOne({ documentId: update.documentId, status, populate: { extraContent: true } })));
        assert.equal(draft?.updatedAt, update.draft.updatedAt, `Draft changed after preview: ${update.title}`);
        assert.equal(published?.updatedAt, update.published.updatedAt, `Published page changed after preview: ${update.title}`);
        await documents.update({ documentId: update.documentId, status: "published", data: {
          extraContent: [{ id: draft.extraContent[0].id, title: draft.extraContent[0].title, description: update.description }],
        } });
        console.log(`Formatted Extra Content: ${update.title}`);
      }
      if (plan.linkChanges.length) {
        // Component IDs belong to each version; let Strapi create fresh header
        // components while retaining category logo media references.
        const headerMenu = headerData(plan.headerMenu);
        await settings.update({ documentId: baseline.site.documentId, status: "published", data: { headerMenu } });
      }
    });
    fs.writeFileSync(path.join(auditDir, "created.json"), JSON.stringify(created, null, 2), { mode: 0o600 });
    if (plan.extraContentUpdates?.length) fs.writeFileSync(path.join(auditDir, "formatted.json"), JSON.stringify(plan.extraContentUpdates.map(({ name, documentId, title, slug }) => ({ name, documentId, title, slug })), null, 2), { mode: 0o600 });
  } finally {
    try { await flushEvents(); } finally { await app.destroy(); }
  }
  return created;
}

async function notifyFrontend(env, names) {
  if (!env.NEXT_REVALIDATE_URL || !env.STRAPI_REVALIDATE_SECRET) return;
  const tags = ["jr-site-settings", ...names.map(name => `jr-${collection(name)}`)];
  const body = JSON.stringify({ event: "entry.publish", tags, model: siteUid, documentIds: [], occurredAt: new Date().toISOString() });
  const signature = createHmac("sha256", env.STRAPI_REVALIDATE_SECRET).update(body).digest("hex");
  const response = await fetch(env.NEXT_REVALIDATE_URL, { method: "POST", headers: { "content-type": "application/json", "x-strapi-event": "entry.publish", "x-strapi-signature": `sha256=${signature}` }, body, signal: AbortSignal.timeout(10000) });
  assert.ok(response.ok, `Content imported, but cache revalidation returned ${response.status}.`);
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const verifyOption = args.find(argument => argument.startsWith("--verify="));
  const verifyDirectory = verifyOption ? path.resolve(verifyOption.slice("--verify=".length)) : null;
  const formatOption = args.find(argument => argument.startsWith("--format-extra-content="));
  const formatDirectory = formatOption ? path.resolve(formatOption.slice("--format-extra-content=".length)) : null;
  const filename = args.find(argument => !argument.startsWith("--"));
  assert.ok(filename && args.every(argument => [filename, "--apply", "--dry-run", verifyOption, formatOption].includes(argument)) && !(apply && args.includes("--dry-run")) && !(verifyDirectory && (apply || args.includes("--dry-run") || formatDirectory)), "Usage: node scripts/import-corporate-services.cjs <workbook.xlsx> [--dry-run | --apply | --verify=<audit-directory>] [--format-extra-content=<original-import-audit-directory>]");
  const dotenv = require("dotenv");
  const cmsEnv = dotenv.parse(fs.readFileSync(path.join(cmsDir, ".env")));
  const frontendEnv = dotenv.parse(fs.readFileSync(path.join(cmsDir, "../frontend/.env.local")));
  const env = { ...cmsEnv, ...frontendEnv };
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(new URL(env.STRAPI_URL).hostname), "This import targets the local CMS only.");
  assert.equal(cmsEnv.DATABASE_CLIENT, "postgres");
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(new URL(cmsEnv.DATABASE_URL).hostname), "This import targets local PostgreSQL only.");
  for (const [key, value] of Object.entries(cmsEnv)) if (key.startsWith("SEED_")) assert.equal(value, "false", `Keep ${key} disabled.`);
  const extracted = spawnSync("python3", [path.join(__dirname, "read-corporate-workbook.py"), path.resolve(filename)], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  assert.equal(extracted.status, 0, extracted.stderr || "Could not read workbook.");
  const rows = JSON.parse(extracted.stdout);
  const baseline = verifyDirectory
    ? JSON.parse(fs.readFileSync(path.join(verifyDirectory, "before-content.json")))
    : await readState(env);
  const logoIds = baseline.home.trustedLogos.map(logo => logo.documentId);
  const plan = planImport(rows, baseline.pages, baseline.site.headerMenu, logoIds);
  const pending = plan.actions.filter(action => !action.existing);
  const formattingManifest = formatDirectory ? path.join(formatDirectory, "created.json")
    : verifyDirectory && fs.existsSync(path.join(verifyDirectory, "formatted.json")) ? path.join(verifyDirectory, "formatted.json") : null;
  const formattingTargets = formattingManifest ? JSON.parse(fs.readFileSync(formattingManifest)) : null;
  if (formattingTargets) {
    const targets = formattingTargets;
    assert.equal(targets.length, 74, "Formatting must target the original 74-page import manifest.");
    assert.equal(new Set(targets.map(page => page.documentId)).size, 74, "Duplicate page in formatting manifest.");
    assert.equal(pending.length, 0, "Formatting existing pages must not create missing services.");
    assert.equal(plan.linkChanges.length, 0, "Formatting existing pages must not change header destinations.");
    plan.extraContentUpdates = planExtraContentFormatting(rows, baseline.pages, targets);
  }
  const formatting = plan.extraContentUpdates ?? [];
  console.log(JSON.stringify({ mode: verifyDirectory ? "verify" : apply ? "apply" : "dry-run", workbookRows: rows.length, create: pending.length, preserve: rows.length - pending.length, headerLinks: plan.linkChanges.length, trustedLogos: logoIds.length,
    formatExtraContent: formatting.length,
    categories: Object.fromEntries(Object.keys(categories).map(category => [category, pending.filter(action => action.row.category === category).length])) }, null, 2));
  if (!apply && !verifyDirectory) {
    for (const action of pending) console.log(`${action.row.excelRow}: ${action.row.title} -> ${action.data.seo.canonicalUrl}`);
    for (const update of formatting) console.log(`Format Extra Content: ${update.title}`);
    return;
  }
  if (!verifyDirectory && !pending.length && !plan.linkChanges.length && !formatting.length) { console.log("Already up to date; no changes required."); return; }
  if (plan.linkChanges.length) assert.equal(baseline.draft.updatedAt, baseline.site.updatedAt, "Site Setting has pending draft changes.");
  const directory = verifyDirectory ?? path.join(os.homedir(), "Downloads/jr-compliance-backups", (formatDirectory ? "corporate-extra-html-" : "corporate-import-") + new Date().toISOString().replace(/[:.]/g, "-"));
  if (!verifyDirectory) {
    console.log(`Verified database backup: ${backupDatabase(cmsEnv, directory)}`);
    fs.writeFileSync(path.join(directory, "before-content.json"), JSON.stringify(baseline), { mode: 0o600 });
  }
  // Use this CMS's environment, not unrelated parent-process database settings.
  Object.assign(process.env, cmsEnv);
  const created = verifyDirectory
    ? JSON.parse(fs.readFileSync(path.join(directory, "created.json")))
    : await applyPlan(plan, baseline, directory);
  await notifyFrontend(cmsEnv, [...new Set([...created, ...formatting].map(page => page.name))]);
  const after = await readState(env);
  for (const [name, before] of Object.entries(baseline.pages)) {
    for (const original of before) {
      const formatted = formatting.find(page => page.name === name && page.documentId === original.documentId);
      if (formatted) {
        const retained = after.pages[name].find(page => page.documentId === original.documentId && Boolean(page.publishedAt) === Boolean(original.publishedAt));
        const expected = editableContent(original);
        expected.extraContent[0].description = formatted.description;
        assert.deepEqual(editableContent(retained), expected, `Unrelated fields changed while formatting ${original.slug}.`);
      } else {
        const retained = after.pages[name].find(page => page.id === original.id);
        assert.deepEqual(retained, original, `Existing ${name} / ${original.slug} changed.`);
      }
    }
  }
  function withoutHeader(settings) {
    const { headerMenu, id, createdAt, updatedAt, publishedAt, ...rest } = settings;
    return withoutIds(rest);
  }
  assert.deepEqual(withoutHeader(after.site), withoutHeader(baseline.site), "Unrelated published Site Setting fields changed.");
  assert.deepEqual(withoutHeader(after.draft), withoutHeader(baseline.draft), "Unrelated draft Site Setting fields changed.");
  assert.deepEqual(withoutIds(after.site.headerMenu), withoutIds(plan.headerMenu), "Published header links do not match the import.");
  if (formattingTargets) {
    assert.deepEqual(after.site, baseline.site, "Formatting changed published Site Setting.");
    assert.deepEqual(after.draft, baseline.draft, "Formatting changed draft Site Setting.");
    assert.deepEqual(after.home, baseline.home, "Formatting changed Home Page.");
    assert.equal(planExtraContentFormatting(rows, after.pages, formattingTargets).length, 0, "Formatting must be repeat-safe.");
  }
  for (const page of created) {
    const record = after.pages[page.name].find(item => item.documentId === page.documentId && item.publishedAt);
    const action = pending.find(item => item.name === page.name && item.data.slug === page.slug);
    assert.ok(record, `Missing published service: ${page.title}`);
    for (const field of ["title", "menuLabel", "slug", "hero", "overview", "extraContent", "faqs", "finalCta", "tickerCta", "resultsSection"])
      assert.deepEqual(withoutIds(record[field]), action.data[field], `Content mismatch: ${page.title} / ${field}`);
    assert.deepEqual(record.trustedLogos.map(logo => logo.documentId), logoIds, `Trusted logos differ: ${page.title}`);
    for (const field of ["challenges", "advantages", "process", "whyChoose", "breakdown", "writtenBy", "youtubeVideos", "stickyBar", "extraContentSidebarHeader", "extraContentSidebarGuides", "extraContentSidebarServices"])
      assert.ok(!record[field] || (Array.isArray(record[field]) && !record[field].length), `Unexpected section: ${page.title} / ${field}`);
  }
  const rerun = planImport(rows, after.pages, after.site.headerMenu, logoIds);
  assert.equal(rerun.actions.filter(action => !action.existing).length, 0);
  assert.equal(rerun.linkChanges.length, 0);
  const report = { created, formattedPages: formatting.map(({ name, documentId, title, slug }) => ({ name, documentId, title, slug })), headerLinksUpdated: plan.linkChanges, trustedLogoCount: logoIds.length, existingContentPreserved: true, rerunChanges: 0 };
  fs.writeFileSync(path.join(directory, "verification.json"), JSON.stringify(report, null, 2), { mode: 0o600 });
  console.log(`Verified ${created.length} new pages, ${formatting.length} formatted Extra Content entries, ${plan.linkChanges.length} header links, preserved unrelated content, and an empty rerun. Audit: ${directory}`);
}

module.exports = { categories, existingSlugs, extraContentHtml, fixedContent, headerData, legacyExtraContentHtml, pageData, planExtraContentFormatting, planImport, singleParagraph, sourceContentHtml, trackCommitCallbacks, withoutIds };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
