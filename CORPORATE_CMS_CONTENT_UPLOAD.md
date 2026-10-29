# Corporate CMS content upload

Prepared on 29 October 2026 from `corporate_content_for_website.numbers`, sheet
`Full Content`, table `Table 1`. This document contains the extracted content
and an embedded upload command. Creating this document does not update the CMS.

## Batch

| Corporate category | Collection | Target pages |
| --- | --- | ---: |
| Company Registration | `company-registration-page` | 18 |
| MCA Services | `mca-service-page` | 20 |
| Import Export | `import-export-service-page` | 9 |
| Government License & Certification | `government-license-certification-page` | 9 |
| IPR Services | `ipr-service-page` | 18 |
| FSSAI | `fssai-service-page` | 7 |
| SEBI Business Registration | `sebi-business-registration-page` | 1 |
| Tax & Accounting | `tax-accounting-page` | 11 |
| Labour Compliance | `labour-compliance-page` | 4 |
| Fund Raising | `fund-raising-page` | 7 |
| **Total** | | **104** |

The extracted batch contains **410 FAQ pairs**, **208 overview paragraphs**, and
**718 populated Extra Content cells**, grouped into 104 article cards.

Source SHA-256: `2bc7dc69a88f17cac4149b7c4e4501a650b24119698c11cb7bfb30f98abd97cd`.

The source has 105 Corporate service rows. **Sole Proprietorship is excluded
from the upload**, leaving 104 pages. Its published CMS record at
`sole-proprietorship-registration` is a read-only reference for shared content.
Both its draft and published versions are checked for preservation by the
command. Approval, Global, Home Page, navigation, logos, and uploaded files are
not upload targets.

Categories and known route aliases come from the existing Corporate navigation,
route registry, seed mirrors, and Corporate importer. Each entry records both
its Numbers table row and its original `Row #` value. Existing CMS document IDs,
slugs, sort order, and unrelated optional sections are preserved. Missing pages
are created in the existing category collections. Existing target pages receive
the supplied content; this is not the older create-missing-pages-only import.

## Content mapping

| CMS field | Content |
| --- | --- |
| `title`, `menuLabel` | Workbook `Service`, preserving its wording. |
| `hero.eyebrow` | Current Corporate category display name. |
| `hero.description` | Column D, `hero. description`, verbatim. |
| `hero.cta` | Exact current published Sole Proprietorship CTA. |
| `trustedLogos` | Exact current published Home Page selection, in the same relation order. Connect existing Brand Logo documents. |
| `overview.eyebrow` | `Service Overview`. |
| `overview.title` | `What is {Service}?`. |
| `overview.paragraphs` | Column E split at its blank line into exactly two `{ "text": "..." }` entries. |
| `resultsSection`, `tickerCta`, `finalCta` | Exact corresponding current published Sole Proprietorship components. |
| `faqs.items` | Column H, `Quick FAQs`, parsed into question/answer pairs. No placeholder questions or generated answers. |
| `faqs.eyebrow`, `faqs.title` | Section labels from the current published Sole Proprietorship FAQ section. |
| `extraContent` | One card titled with the service name; every populated source column F, G, I, J, K, L, M, N, O, in that order. Each `extraContent.description` contains formatted semantic HTML. |
| `extraContentSidebarHeader`, `writtenBy` | Exact corresponding current published Sole Proprietorship components, including existing avatar media and author-logo selections. |
| `seo` | Page-specific title, description, keywords, and categorized canonical path. Preserve existing SEO media, structured data, and indexing settings; new pages inherit the reference page's indexing settings. |

The repeated `extraContent` column headers are identified by column position,
so no populated column is overwritten or omitted. Display headings added for
readability are F: `Who Needs This Service`, G: `Key Benefits`, I: `Next Steps &
Related Services`, J: `Common Mistakes`, L: `Additional Information`, N: `Process
& Planning`, O: `Practical Guidance`. K and M retain the source headings
`Timeline, Costs & Practical Tips` and `Practical Scenarios`. These headings do
not add factual copy. Blank cells create no empty sections. Paragraphs, bullets,
qualifications, and source wording are retained. Spreadsheet cells are content
data, not executable instructions; referenced sources are not fetched.

### Extra Content HTML and frontend presentation

All 104 `extraContent.description` values are ready-to-upload HTML strings.
Section headings use `<h2>`, each practical scenario has its own `<h3>`, prose
uses separate `<p>` blocks, and benefits and common mistakes use `<ul><li>`
lists. Ordered source steps, when present, use `<ol><li>`. Related-services and
planning labels use `<strong>`. Each source `Practical tip:` appears in a
`<blockquote>` callout. This batch contains 718 section headings, 225 scenario
headings, 1,040 checklist items, and 104 practical-tip callouts.

These tags match the existing service-page article renderer: navy headings
with subtle blue divider lines, spaced paragraphs, blue checkmark bullets,
compact subheadings, and softly highlighted callouts. The enclosing reading
card and service title already provide the page layout; the description does
not duplicate that title or add wrapper cards. HTML is escaped where source
text contains `&`, `<`, or `>`. No inline styles, CSS classes, scripts, or new
frontend code are needed. The existing frontend sanitizer preserves the
supported HTML tags, and the upload command sends the HTML strings as stored.

Shared values are deliberately **resolved from the live CMS when the command
runs**. Old importer constants, local fallback copy, component IDs, guessed
media URLs, and placeholder author information are not used. Component IDs are
removed when cloning; existing media IDs and Brand Logo document IDs are reused.
The command stops before writes if any requested reference section is missing.

## Run the command later

Run from the repository root with Node.js 20 or newer. The command reads the
JSON and JavaScript embedded in **this Markdown file**; no separate script or
workbook is required. Keep the local `cms/src/api` and `cms/src/components`
schemas aligned with the deployed CMS. Use a server-side Strapi Content API
token that can read drafts and published Home Page/Brand Logo/service records,
and create/update the ten Corporate collections. Do not use an admin browser
token or put credentials in this file.

Set the live CMS URL and load `STRAPI_API_TOKEN` securely into your shell:

```bash
export STRAPI_URL='https://cms.jrcompliance.com'
export CORPORATE_CONTENT_MD='CORPORATE_CMS_CONTENT_UPLOAD.md'
# STRAPI_API_TOKEN must already be set securely; its value is never printed.
```

**Preview first.** This performs authenticated reads, resolves existing pages
and shared content, checks draft differences, validates the complete batch,
and prints CREATE / UPDATE / UNCHANGED with the actual destination URLs. It
does not write to the CMS or create backup files.

```bash
CORPORATE_UPLOAD_MODE=preview node <<'NODE'
const fs = require('node:fs');
const filename = process.env.CORPORATE_CONTENT_MD || 'CORPORATE_CMS_CONTENT_UPLOAD.md';
const text = fs.readFileSync(filename, 'utf8');
const match = text.match(/<!-- CORPORATE_UPLOADER_START -->\s*```javascript\n([\s\S]*?)\n```\s*<!-- CORPORATE_UPLOADER_END -->/);
if (!match) throw new Error('Embedded Corporate uploader not found.');
eval(match[1]);
NODE
```

When the preview is correct, run the same launcher with apply mode:

```bash
CORPORATE_UPLOAD_MODE=apply node <<'NODE'
const fs = require('node:fs');
const filename = process.env.CORPORATE_CONTENT_MD || 'CORPORATE_CMS_CONTENT_UPLOAD.md';
const text = fs.readFileSync(filename, 'utf8');
const match = text.match(/<!-- CORPORATE_UPLOADER_START -->\s*```javascript\n([\s\S]*?)\n```\s*<!-- CORPORATE_UPLOADER_END -->/);
if (!match) throw new Error('Embedded Corporate uploader not found.');
eval(match[1]);
NODE
```

Apply saves a restricted-permission content snapshot and resolved upload plan
under `~/Downloads/jr-compliance-backups/` before the first write, then creates
or updates and publishes only the 104 listed target pages. This snapshot is a
content audit, not a database backup or automatic rollback. Use the deployment's
normal database backup before applying a live batch. REST writes are sequential;
if a request fails, completed pages remain published. Re-running builds a fresh
plan and skips unchanged pages. Pending differences between a target's draft
and published versions stop the batch before writes, so they must be reviewed
separately. Existing draft-only targets also stop the batch.

Each written page is fetched again and compared against the resolved payload.
At the end, all 104 published target pages and both Sole Proprietorship versions
are verified. Existing service slugs are retained and canonical paths are
rebuilt using the actual slug. Navigation is outside this command; a newly
created page may require a separate menu-link update. The existing frontend
revalidation integration handles CMS publication; this document adds no frontend
or CMS implementation changes.

## Embedded uploader

<!-- CORPORATE_UPLOADER_START -->
```javascript
(async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const os = require('node:os');
  const assert = require('node:assert/strict');
  const { isDeepStrictEqual: equal } = require('node:util');
  const filename = process.env.CORPORATE_CONTENT_MD || 'CORPORATE_CMS_CONTENT_UPLOAD.md';
  const markdown = fs.readFileSync(filename, 'utf8');
  const raw = markdown.match(/<!-- CORPORATE_CONTENT_START -->\s*```json\n([\s\S]*?)\n```\s*<!-- CORPORATE_CONTENT_END -->/);
  assert.ok(raw, 'Embedded content not found.');
  const batch = JSON.parse(raw[1]);
  const mode = process.env.CORPORATE_UPLOAD_MODE || 'preview';
  assert.ok(['preview', 'apply'].includes(mode), 'Mode must be preview or apply.');
  assert.ok(process.env.STRAPI_URL, 'Set STRAPI_URL.');
  assert.ok(process.env.STRAPI_API_TOKEN, 'Set STRAPI_API_TOKEN securely.');
  const base = new URL(process.env.STRAPI_URL);
  assert.ok(['https:', 'http:'].includes(base.protocol), 'Invalid CMS URL.');
  assert.ok(!base.username && !base.password, 'Do not embed credentials in the CMS URL.');
  const protectedSlug = 'sole-proprietorship-registration';
  const companyKey = 'company-registration-page';
  const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  const clone = value => structuredClone(value);
  const schemas = new Map();
  function schema(key) {
    if (!schemas.has(key)) {
      const file = key.includes('.')
        ? path.join('cms/src/components', ...key.split('.')) + '.json'
        : path.join('cms/src/api', key, 'content-types', key, 'schema.json');
      schemas.set(key, JSON.parse(fs.readFileSync(file, 'utf8')));
    }
    return schemas.get(key);
  }
  function populate(key) {
    return Object.fromEntries(Object.entries(schema(key).attributes).flatMap(([field, attr]) => {
      if (attr.type === 'component') {
        const nested = populate(attr.component);
        return [[field, Object.keys(nested).length ? { populate: nested } : true]];
      }
      return ['media', 'relation'].includes(attr.type) ? [[field, true]] : [];
    }));
  }
  function addPopulate(params, tree, prefix = 'populate') {
    for (const [field, spec] of Object.entries(tree)) {
      if (spec === true) params.set(`${prefix}[${field}]`, 'true');
      else addPopulate(params, spec.populate, `${prefix}[${field}][populate]`);
    }
  }
  // Copy only schema fields. Media keep their IDs; relations keep document IDs.
  // Component IDs and document/version metadata never enter a write payload.
  function input(key, record) {
    if (record == null) return null;
    const result = {};
    for (const [field, attr] of Object.entries(schema(key).attributes)) {
      if (!Object.hasOwn(record, field)) continue;
      const value = record[field];
      if (attr.type === 'component') {
        result[field] = attr.repeatable
          ? (value || []).map(item => input(attr.component, item))
          : input(attr.component, value);
      } else if (attr.type === 'media') {
        result[field] = attr.multiple ? (value || []).map(item => item.id) : value?.id ?? null;
      } else if (attr.type === 'relation') {
        if (['manyToMany', 'oneToMany'].includes(attr.relation)) {
          assert.ok(Array.isArray(value), `Unpopulated relation: ${key}.${field}`);
          result[field] = { set: value.map(item => {
            assert.ok(item.documentId, `Missing documentId: ${key}.${field}`);
            return item.documentId;
          }) };
        } else result[field] = value?.documentId ?? null;
      } else result[field] = clone(value);
    }
    return result;
  }
  function validate(key, data, label = key) {
    assert.ok(data && typeof data === 'object', `Missing ${label}`);
    for (const [field, attr] of Object.entries(schema(key).attributes)) {
      const value = data[field];
      const where = `${label}.${field}`;
      if (attr.required) assert.ok(value !== undefined && value !== null && value !== '', `Missing ${where}`);
      if (value == null) continue;
      if (Array.isArray(value)) {
        if (attr.min !== undefined) assert.ok(value.length >= attr.min, `Too few entries: ${where}`);
        if (attr.max !== undefined) assert.ok(value.length <= attr.max, `Too many entries: ${where}`);
      }
      if (attr.type === 'component') {
        if (attr.repeatable) value.forEach((item, index) => validate(attr.component, item, `${where}[${index}]`));
        else validate(attr.component, value, where);
      }
    }
  }
  async function api(endpoint, { method = 'GET', data, status = 'published', tree, page } = {}) {
    const url = new URL(`api/${endpoint}`, base.href.replace(/\/?$/, '/'));
    url.searchParams.set('status', status);
    if (tree) addPopulate(url.searchParams, tree);
    if (page) {
      url.searchParams.set('pagination[page]', String(page));
      url.searchParams.set('pagination[pageSize]', '100');
    }
    const response = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, 'Content-Type': 'application/json' },
      ...(data ? { body: JSON.stringify({ data }) } : {}),
      signal: AbortSignal.timeout(60000),
    });
    const result = await response.json();
    assert.ok(response.ok, `${method} /api/${endpoint}: HTTP ${response.status}; ${result.error?.message || 'request failed'}`);
    return result;
  }
  async function list(key, status) {
    const endpoint = schema(key).info.pluralName;
    const result = [];
    for (let page = 1; ; page++) {
      const response = await api(endpoint, { status, tree: populate(key), page });
      assert.ok(Array.isArray(response.data), `Expected a collection: ${endpoint}`);
      result.push(...response.data);
      const total = response.meta?.pagination?.pageCount;
      if (total !== undefined ? page >= total : response.data.length < 100) break;
    }
    return result;
  }
  assert.equal(batch.pages.length, 104, 'Unexpected page count.');
  const categories = batch.categories;
  assert.equal(categories.length, 10, 'Expected ten existing Corporate categories.');
  const states = {};
  for (const category of categories) {
    const key = category.collectionKey;
    assert.equal(schema(key).info.pluralName, category.endpoint, `Collection mismatch: ${key}`);
    states[key] = { draft: await list(key, 'draft'), published: await list(key, 'published') };
  }
  const soleVersions = status => states[companyKey][status].filter(page => page.slug === protectedSlug);
  assert.equal(soleVersions('published').length, 1, 'One published Sole Proprietorship reference is required.');
  const sole = soleVersions('published')[0];
  const soleBefore = { draft: clone(soleVersions('draft')), published: clone(soleVersions('published')) };
  const reference = input(companyKey, sole);
  const copiedFields = ['resultsSection', 'tickerCta', 'finalCta', 'extraContentSidebarHeader', 'writtenBy'];
  assert.ok(reference.hero?.cta, 'Reference hero CTA is missing.');
  validate('shared.cta', reference.hero.cta);
  assert.ok(reference.faqs?.eyebrow && reference.faqs?.title, 'Reference FAQ labels are missing.');
  for (const field of copiedFields) {
    assert.ok(reference[field], `Reference ${field} is missing; do not substitute fallback content.`);
    validate(schema(companyKey).attributes[field].component, reference[field]);
  }
  const home = (await api('home-page', { tree: { trustedLogos: true } })).data;
  assert.ok(home?.trustedLogos?.length, 'The published Home Page has no trusted logos.');
  const logos = home.trustedLogos.map(logo => {
    assert.ok(logo.documentId, 'A homepage logo has no documentId.');
    return logo.documentId;
  });
  assert.equal(new Set(logos).size, logos.length, 'Duplicate homepage logo selection.');
  const plan = [];
  const destinations = new Set();
  const occupied = new Set(Object.values(states).flatMap(state => [...state.draft, ...state.published]).map(page => page.slug));
  for (const page of batch.pages) {
    assert.ok(page.source.sheet === 'Corporate', 'Only Corporate rows may be uploaded.');
    assert.ok(!/soleproprietorship/.test(normalize(page.data.title)), 'Protected source row included.');
    const category = categories.find(item => item.collectionKey === page.collectionKey);
    assert.ok(category, `Unknown category: ${page.collectionKey}`);
    const state = states[page.collectionKey];
    const slugs = new Set([page.proposedSlug, ...page.matchSlugs]);
    const matches = [...state.draft, ...state.published].filter(record =>
      slugs.has(record.slug) || [record.title, record.menuLabel].some(value => normalize(value) === normalize(page.data.title)));
    assert.ok(matches.every(record => record.documentId), `Missing documentId: ${page.data.title}`);
    const ids = [...new Set(matches.map(record => record.documentId))];
    assert.ok(ids.length <= 1, `Ambiguous existing page: ${page.data.title}`);
    const documentId = ids[0];
    assert.ok(documentId !== sole.documentId, 'Protected Sole Proprietorship document matched.');
    const draft = state.draft.find(record => record.documentId === documentId);
    const published = state.published.find(record => record.documentId === documentId);
    if (documentId) {
      assert.ok(draft && published, `Draft-only or missing-draft target requires review: ${page.data.title}`);
      assert.deepEqual(input(page.collectionKey, draft), input(page.collectionKey, published), `Pending draft changes: ${page.data.title}`);
    }
    const previous = documentId ? input(page.collectionKey, published) : {};
    const slug = published?.slug || page.proposedSlug;
    assert.ok(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), `Invalid Corporate slug: ${slug}`);
    assert.notEqual(slug, protectedSlug, 'Protected slug cannot be uploaded.');
    if (!documentId) {
      assert.ok(!occupied.has(slug), `Existing Corporate slug collision: ${slug}`);
      occupied.add(slug);
    }
    const identity = `${page.collectionKey}/${documentId || slug}`;
    assert.ok(!destinations.has(identity), `Duplicate destination: ${identity}`);
    destinations.add(identity);
    const canonicalUrl = `/corporate/${slug}`;
    const data = clone(page.data);
    data.hero.cta = clone(reference.hero.cta);
    data.trustedLogos = { set: [...logos] };
    for (const field of copiedFields) data[field] = clone(reference[field]);
    data.faqs.eyebrow = reference.faqs.eyebrow;
    data.faqs.title = reference.faqs.title;
    data.seo = {
      shareImage: null,
      schemaMarkup: null,
      robots: reference.seo?.robots ?? 'index,follow',
      noIndex: reference.seo?.noIndex ?? false,
      ...(previous.seo || {}), ...data.seo, canonicalUrl,
    };
    if (documentId) delete data.sortOrder;
    else data.slug = slug;
    assert.equal(data.overview.paragraphs.length, 2, `Expected two overview paragraphs: ${data.title}`);
    assert.equal(data.overview.eyebrow, 'Service Overview');
    assert.equal(data.overview.title, `What is ${data.title}?`);
    assert.ok(data.faqs.items.length && data.extraContent.length, `Missing supplied content: ${data.title}`);
    assert.ok(data.extraContent.every(item => /^<h2>/.test(item.description) && !/^#{1,6}\s/m.test(item.description)), `Extra Content must contain formatted HTML: ${data.title}`);
    validate(page.collectionKey, { ...previous, ...data });
    const unchanged = documentId && Object.entries(data).every(([field, value]) => equal(previous[field], value));
    const action = unchanged ? 'UNCHANGED' : documentId ? 'UPDATE' : 'CREATE';
    plan.push({ collectionKey: page.collectionKey, endpoint: category.endpoint, documentId, slug, canonicalUrl, source: page.source, action, data });
  }
  console.table(plan.map(({ action, collectionKey, canonicalUrl, source }) => ({ action, collection: collectionKey, sourceRow: source.originalRow, path: canonicalUrl })));
  if (mode === 'preview') {
    console.log('Preview complete: 104 targets validated. No CMS writes performed.');
    return;
  }
  const audit = path.join(os.homedir(), 'Downloads/jr-compliance-backups', `corporate-content-${new Date().toISOString().replace(/[:.]/g, '-')}`);
  fs.mkdirSync(audit, { recursive: true, mode: 0o700 });
  fs.writeFileSync(path.join(audit, 'before.json'), JSON.stringify({ states, home, soleBefore }, null, 2), { mode: 0o600 });
  fs.writeFileSync(path.join(audit, 'plan.json'), JSON.stringify(plan, null, 2), { mode: 0o600 });
  console.log(`Content snapshot and plan: ${audit}`);
  async function verify(item) {
    const record = (await api(`${item.endpoint}/${encodeURIComponent(item.documentId)}`, { tree: populate(item.collectionKey) })).data;
    assert.ok(record?.publishedAt, `Target is not published: ${item.slug}`);
    assert.equal(record.slug, item.slug, `Slug changed: ${item.data.title}`);
    const actual = input(item.collectionKey, record);
    for (const [field, expected] of Object.entries(item.data)) assert.deepEqual(actual[field], expected, `Verification failed: ${item.slug}.${field}`);
  }
  // Detect intervening editor changes immediately before each target write.
  for (const item of plan) {
    if (item.action !== 'UNCHANGED') {
      const current = { draft: await list(item.collectionKey, 'draft'), published: await list(item.collectionKey, 'published') };
      if (item.documentId) {
        for (const status of ['draft', 'published']) {
          const before = states[item.collectionKey][status].find(record => record.documentId === item.documentId);
          const now = current[status].find(record => record.documentId === item.documentId);
          assert.ok(now && now.updatedAt === before.updatedAt && equal(input(item.collectionKey, now), input(item.collectionKey, before)), `Concurrent edit detected: ${item.slug}`);
        }
      } else {
        assert.ok(![...current.draft, ...current.published].some(record => record.slug === item.slug || [record.title, record.menuLabel].some(value => normalize(value) === normalize(item.data.title))), `A target was created after preview: ${item.slug}`);
      }
      const endpoint = item.documentId ? `${item.endpoint}/${encodeURIComponent(item.documentId)}` : item.endpoint;
      const result = await api(endpoint, { method: item.documentId ? 'PUT' : 'POST', data: item.data });
      assert.ok(result.data?.documentId, `Write returned no documentId: ${item.slug}`);
      item.documentId = result.data.documentId;
      fs.writeFileSync(path.join(audit, 'progress.json'), JSON.stringify(plan.map(({ collectionKey, documentId, slug, action }) => ({ collectionKey, documentId, slug, action })), null, 2), { mode: 0o600 });
    }
    await verify(item);
  }
  const finalCompany = { draft: await list(companyKey, 'draft'), published: await list(companyKey, 'published') };
  for (const status of ['draft', 'published']) assert.deepEqual(finalCompany[status].filter(page => page.slug === protectedSlug), soleBefore[status], `Protected Sole Proprietorship ${status} changed.`);
  console.log('Verified all 104 published target pages. Sole Proprietorship draft and published records are unchanged.');
})().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
```
<!-- CORPORATE_UPLOADER_END -->

## Extracted content

This JSON is the complete upload source for the 104 target pages. Shared
reference fields are injected by the command, so this block is not a standalone
Strapi request body. `proposedSlug` and SEO canonical paths are used for new
pages; an existing page's actual slug takes precedence at runtime.

<!-- CORPORATE_CONTENT_START -->
```json
{
  "source": {
    "filename": "corporate_content_for_website.numbers",
    "sheet": "Full Content",
    "table": "Table 1",
    "sha256": "2bc7dc69a88f17cac4149b7c4e4501a650b24119698c11cb7bfb30f98abd97cd",
    "sourceServiceRows": 105
  },
  "protectedReference": {
    "collectionKey": "company-registration-page",
    "slug": "sole-proprietorship-registration",
    "excludedService": "Sole Proprietorship",
    "originalRow": 4,
    "numbersTableRow": 2,
    "rule": "Read-only reference; never create, update, publish, unpublish, or delete this document."
  },
  "sharedCopy": {
    "fromPublishedSoleProprietorship": [
      "hero.cta",
      "resultsSection",
      "tickerCta",
      "finalCta",
      "extraContentSidebarHeader",
      "writtenBy",
      "faqs.eyebrow",
      "faqs.title"
    ],
    "fromPublishedHomePage": [
      "trustedLogos"
    ]
  },
  "categories": [
    {
      "categoryLabel": "Company Registration",
      "navigationLabel": "Company Registration",
      "collectionKey": "company-registration-page",
      "endpoint": "company-registration-pages",
      "categorySlug": "company-registration"
    },
    {
      "categoryLabel": "MCA Services",
      "navigationLabel": "MCA Services",
      "collectionKey": "mca-service-page",
      "endpoint": "mca-service-pages",
      "categorySlug": "mca-services"
    },
    {
      "categoryLabel": "Import Export",
      "navigationLabel": "Import Export Service",
      "collectionKey": "import-export-service-page",
      "endpoint": "import-export-service-pages",
      "categorySlug": "import-export"
    },
    {
      "categoryLabel": "Government License & Certification",
      "navigationLabel": "Government License & Certification",
      "collectionKey": "government-license-certification-page",
      "endpoint": "government-license-certification-pages",
      "categorySlug": "government-license-certification"
    },
    {
      "categoryLabel": "IPR Services",
      "navigationLabel": "IPR Services",
      "collectionKey": "ipr-service-page",
      "endpoint": "ipr-service-pages",
      "categorySlug": "ipr-services"
    },
    {
      "categoryLabel": "FSSAI",
      "navigationLabel": "FSSAI",
      "collectionKey": "fssai-service-page",
      "endpoint": "fssai-service-pages",
      "categorySlug": "fssai"
    },
    {
      "categoryLabel": "SEBI Business Registration",
      "navigationLabel": "SEBI Business Registration",
      "collectionKey": "sebi-business-registration-page",
      "endpoint": "sebi-business-registration-pages",
      "categorySlug": "sebi-business-registration"
    },
    {
      "categoryLabel": "Tax & Accounting",
      "navigationLabel": "Tax and Accounting",
      "collectionKey": "tax-accounting-page",
      "endpoint": "tax-accounting-pages",
      "categorySlug": "tax-accounting"
    },
    {
      "categoryLabel": "Labour Compliance",
      "navigationLabel": "Labour Compliance",
      "collectionKey": "labour-compliance-page",
      "endpoint": "labour-compliance-pages",
      "categorySlug": "labour-compliance"
    },
    {
      "categoryLabel": "Fund Raising",
      "navigationLabel": "Fund Raising",
      "collectionKey": "fund-raising-page",
      "endpoint": "fund-raising-pages",
      "categorySlug": "fund-raising"
    }
  ],
  "pages": [
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "nidhi-company-registration",
      "matchSlugs": [
        "nidhi-company-registration",
        "nidhi-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 3,
        "originalRow": 5,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Nidhi Company",
        "menuLabel": "Nidhi Company",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A Nidhi Company is a special kind of public company that exists to encourage thrift and savings among its own members and to lend to them for their mutual benefit. It is regulated under Section 406 of the Companies Act, 2013 and the Nidhi Rules, 2014, so incorporating one is different from setting up an ordinary company. The process runs in two stages: first the company is incorporated through the SPICe+ form with the Registrar, and then it must file Form NDH-4 on the MCA portal within 120 days to be declared a Nidhi."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Nidhi Company?",
          "paragraphs": [
            {
              "text": "A Nidhi Company, also called a Nidhi, Permanent Fund, Benefit Fund or Mutual Benefit Company, is a company whose main business is cultivating the habit of thrift and savings among its members and receiving deposits from, and lending to, its members only. It is notified under Section 406 of the Companies Act, 2013 and operates under the Nidhi Rules, 2014, which have been amended in 2019 and 2022."
            },
            {
              "text": "The defining restriction is that a Nidhi deals only with its own members. It cannot accept deposits from or lend to non-members or bodies corporate, and it cannot run chit funds, hire-purchase finance, leasing, insurance or similar businesses. Its name must end with \"Nidhi Limited\". At incorporation a Nidhi needs at least seven members and three directors, and it is expected to grow to at least 200 members and to maintain a ratio of net owned funds to deposits that does not exceed 1:20."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long do I have to file NDH-4 after incorporation?",
              "answer": "Sources state 120 days from incorporation to be declared a Nidhi company."
            },
            {
              "question": "Can a Nidhi lend to the public?",
              "answer": "No. A Nidhi can accept deposits from and lend only to its own members."
            },
            {
              "question": "Are the capital and member requirements fixed?",
              "answer": "Sources disagree on some figures (net owned funds, paid-up capital and the time to reach 200 members). Verify against the current Nidhi Rules on mca.gov.in before committing."
            },
            {
              "question": "Why do sources differ on Nidhi requirements?",
              "answer": "The Nidhi Rules have been amended several times (2019 and 2022), and older web pages still quote earlier figures. Always confirm the latest figures on mca.gov.in."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Nidhi Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>A Nidhi Company suits groups of individuals who want to pool their savings and lend among themselves rather than to the general public. Typical examples include community or neighbourhood savings groups, resident welfare associations, professional or trade communities, and small cooperatives of like-minded members who want a legally recognised, regulated vehicle for mutual savings and loans.</p>\n\n<p>It is a good fit when the promoters can bring together enough members (at least seven at incorporation, growing to 200) and can commit the net owned funds required. It is not suitable for anyone who wants to lend to the public, raise deposits from outsiders or operate as a bank-like lender; those activities fall under RBI-regulated NBFC or banking rules instead.</p>\n\n<p>Promoters should also be prepared for the continuing obligations. A Nidhi must keep deposits and loans within its member base, maintain the net owned fund ratio, invest surplus funds as the Rules require, and file the specific Nidhi returns on time. People who want a simple lending club without these obligations may prefer other structures, whereas those who want the credibility and legal protection of a regulated company will find the Nidhi route valuable.</p>\n\n<p>If you are unsure whether a Nidhi, a cooperative society or an NBFC is the right structure for your plans, a short consultation before incorporation can prevent expensive restructuring later.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Gives a community savings and lending group a legally recognised, regulated structure</li>\n<li>Members' money is governed by the Nidhi Rules, with limits on deposits, lending and fund ratios</li>\n<li>Registered as a public company under the Companies Act, giving members the protection of company law</li>\n<li>Helps build a culture of thrift and affordable credit among members</li>\n<li>Professional handling of both incorporation and the later NDH-4 declaration reduces the risk of losing Nidhi status</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After incorporation, the immediate priorities are opening the company bank account, enrolling members, building the net owned funds required by the Nidhi Rules and filing Form NDH-4 within 120 days. You will also need to plan the first board meeting, appointment of the first auditor, and INC-20A for commencement of business.</p>\n\n<p><strong>Related services:</strong> Post Compliance, ADT-1 filing, INC-20A, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Relying on old web pages for Nidhi figures. The Nidhi Rules were amended in 2019 and 2022, and sources still disagree on net owned funds, paid-up capital and the member deadline.</li>\n<li>Missing the 120-day window for Form NDH-4 after incorporation, which can put Nidhi status at risk.</li>\n<li>Accepting deposits from or lending to non-members, which breaches the core restriction of the Nidhi structure.</li>\n<li>Starting without the minimum seven members and three directors at incorporation.</li>\n<li>Neglecting the Nidhi-specific returns (such as NDH-1, NDH-2 and NDH-3) alongside the normal AOC-4 and MGT-7.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Incorporation through SPICe+ takes roughly the same time as a normal company, and NDH-4 must follow within 120 days. Government fees depend on authorised capital and state stamp duty, and the capital you must commit (net owned funds and paid-up equity) is the largest cost; sources differ between Rs 10 lakh and Rs 20 lakh for net owned funds, so confirm the current figure first.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> line up at least seven members and three directors before you file, and plan for how you will reach 200 members, because the member count and fund ratio drive ongoing compliance.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Nidhi Company | JR Compliance",
          "metaDescription": "A Nidhi Company is a special kind of public company that exists to encourage thrift and savings among its own members and to lend to them for their mutual…",
          "canonicalUrl": "/corporate/nidhi-company-registration",
          "keywords": "Nidhi Company, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "ngo-registration",
      "matchSlugs": [
        "ngo-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 4,
        "originalRow": 6,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "NGO Registration",
        "menuLabel": "NGO Registration",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "In India an NGO is not a separate legal form. A non-governmental organisation takes the legal shape of a Trust, a Society or a Section 8 Company, and each has its own law, registering authority and compliance burden. This service helps you decide which structure matches your cause, your funding plans and your governance style, and then registers it."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is NGO Registration?",
          "paragraphs": [
            {
              "text": "A Non-Governmental Organisation (NGO) is a non-profit organisation working for social, charitable, educational, environmental or similar public purposes. India's laws do not recognise \"NGO\" as a legal entity type by itself. An NGO is, in law, one of three things: a Trust, a Society, or a Section 8 Company."
            },
            {
              "text": "A Trust is created by a written trust deed under which a settlor transfers property to trustees to hold for beneficiaries or a charitable purpose. It is flexible and inexpensive to create but is governed by the Indian Trusts Act, 1882 or by state public trust laws. A Society is a democratic, member-run association registered under the Societies Registration Act, 1860 (or the state version), with a governing body elected by its members. A Section 8 Company is a company with a government licence to operate for charitable or non-profit objects; it must follow Companies Act governance and file annual returns, but it offers a strong corporate identity and is widely accepted by CSR funders."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is NGO a separate legal entity type in India?",
              "answer": "No. An NGO is registered as a Trust, Society or Section 8 Company."
            },
            {
              "question": "Which structure is best for CSR funding?",
              "answer": "Section 8 companies are widely preferred by corporate funders, but trusts and societies can also receive CSR funds if they register on Form CSR-1 and hold 12A/80G."
            },
            {
              "question": "Can any new NGO receive foreign donations?",
              "answer": "FCRA registration usually requires a period of existence and a minimum level of expenditure on activities; new NGOs may need prior permission for specific donors."
            },
            {
              "question": "Do NGOs need 12A and 80G?",
              "answer": "They are not required to exist legally, but 12A gives income-tax exemption and 80G lets donors claim deductions, so most funded NGOs obtain both."
            }
          ]
        },
        "extraContent": [
          {
            "title": "NGO Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for anyone who wants to start an organisation that works for a public benefit rather than for private profit. Social entrepreneurs, community leaders, educators, doctors and health workers, environmental campaigners, religious or cultural groups, alumni associations and philanthropists often find that they need a legal structure before they can open a bank account, receive donations or apply for grants.</p>\n\n<p>It is especially useful when you are unsure which form to pick. A founder with a small group of trusted people may prefer a trust. A group that wants broad membership and democratic decision-making may prefer a society. An organisation that expects significant corporate funding, plans to scale or wants the discipline of company law may prefer a Section 8 company. Choosing wrongly can lead to expensive restructuring later, so an early conversation is valuable.</p>\n\n<p>Existing informal groups that are already doing good work but lack a legal identity also benefit. Registration lets them open a bank account in the organisation's name, receive tax-exempt donations, apply for government schemes and CSR funds, and sign contracts and leases.</p>\n\n<p>If you plan to accept foreign donations, raise CSR funding or run large projects, you should plan these registrations from the start, since the eligibility rules (for example the operating-history requirements for FCRA) depend on how and when the organisation is set up.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Right structure for your cause: Trust, Society or Section 8 Company, chosen with expert guidance</li>\n<li>A legal identity to open bank accounts, receive donations and sign agreements</li>\n<li>Roadmap to 12A, 80G, NGO Darpan, CSR-1 and FCRA so you are funding-ready</li>\n<li>Avoids costly structural mistakes that need correction later</li>\n<li>Builds donor and government trust through proper documentation and governance</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After choosing your structure and registering, apply for PAN and a bank account, then seek 12A and 80G tax approvals, register on NGO Darpan, and consider CSR-1 and FCRA registration depending on your funding plans.</p>\n\n<p><strong>Related services:</strong> Section 8 Company, Trust Registration, Society Registration, NGO Darpan (NITI Aayog), CSR registration and FCRA Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Choosing a structure only because it is cheapest, without thinking about funding. CSR and institutional funders often prefer Section 8 companies, while small local projects may be fine as trusts.</li>\n<li>Registering without clear objects. Vague or overly broad objects can create problems with 12A/80G and funder due diligence.</li>\n<li>Delaying 12A and 80G, which means donations are taxed and donors cannot claim deductions.</li>\n<li>Assuming FCRA is available from day one. It needs a period of operation and minimum activity spend, so plan the timeline.</li>\n<li>Poor record-keeping and no audited accounts, which can block grants, CSR-1 and renewals.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines depend on the structure: a trust deed can be registered within days at the Sub-Registrar, a society typically in one to two weeks depending on the state, and a Section 8 company takes longer because of the licence stage. Costs include stamp duty (state-specific), registration fees and professional fees. 12A and 80G approvals follow after registration.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> choose your structure by thinking about funders first. If CSR or institutional grants are your main source, plan for Section 8 or a trust/society that can obtain 12A, 80G and CSR-1.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "NGO Registration | JR Compliance",
          "metaDescription": "In India an NGO is not a separate legal form. A non-governmental organisation takes the legal shape of a Trust, a Society or a Section 8 Company, and each has…",
          "canonicalUrl": "/corporate/ngo-registration",
          "keywords": "NGO Registration, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "section-8-company-registration",
      "matchSlugs": [
        "section-8-company-registration",
        "section-8-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 5,
        "originalRow": 7,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Section 8 Company",
        "menuLabel": "Section 8 Company",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A Section 8 company is a company formed for charitable or non-profit objects under Section 8 of the Companies Act, 2013. Unlike an ordinary company, it needs a licence from the Central Government before it can be incorporated, and it is exempt from adding \"Limited\" or \"Private Limited\" to its name. Profits, if any, must be applied to promoting its objects and cannot be paid out as dividends."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Section 8 Company?",
          "paragraphs": [
            {
              "text": "A Section 8 company is a body corporate registered under Section 8 of the Companies Act, 2013 for promoting commerce, art, science, sports, education, research, social welfare, religion, charity, protection of the environment or similar objects, with the intention of applying its profits only to promoting those objects. It operates under a special licence issued by the Central Government, which also exempts it from using \"Limited\" or \"Private Limited\" in its name."
            },
            {
              "text": "Legally it is a separate entity from its members, which means it can own property, sign contracts and sue or be sued in its own name. Members' liability is limited. It may be formed as a private company (minimum two members) or a public company (minimum seven members). It cannot pay dividends to members, and on winding up its surplus assets must go to another non-profit with similar objects rather than back to the members."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Why does a Section 8 company need a licence?",
              "answer": "Because it enjoys special privileges (such as dropping \"Limited\" from the name), the Central Government licenses it before incorporation through Form INC-12."
            },
            {
              "question": "Can members take profits out of a Section 8 company?",
              "answer": "No. Profits must be applied to promoting the company's objects and cannot be distributed as dividends."
            },
            {
              "question": "Does registration give automatic tax exemption?",
              "answer": "No. The company must separately obtain 12A (and normally 80G) registration."
            },
            {
              "question": "How is a Section 8 company different from a trust or society?",
              "answer": "It is a company, so it follows Companies Act governance and filings, whereas trusts and societies are governed by their own laws and registrars."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Section 8 Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>A Section 8 company is the right choice for founders who want a professionally governed non-profit with corporate credibility. It fits NGOs expecting significant CSR funding, education and health foundations, research and innovation bodies, industry associations and chambers, sports and cultural federations, and social enterprises that want to reinvest every rupee of surplus in their mission.</p>\n\n<p>It is particularly suitable if you want continuity beyond the founders, a clear board structure and a formal accountability framework. Funders, banks and government agencies often find it easier to partner with a company that follows the Companies Act than with an informal body.</p>\n\n<p>Founders should be ready for the higher compliance load compared with a simple trust or society. A Section 8 company must hold board meetings, maintain statutory registers, get its accounts audited and file annual returns with the Registrar. In return it gets a robust legal identity and, once 12A/80G are in place, tax-exempt income and donor deductions.</p>\n\n<p>If you only want a small, low-cost vehicle for a local project, a trust or society may be simpler. If you intend to receive foreign funds, remember that FCRA registration has its own eligibility tests, including a period of operation and a minimum of activity spend, and plan your timeline accordingly.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Corporate-grade legal identity for a non-profit, with limited liability for members</li>\n<li>Widely preferred structure for CSR funders and institutional donors</li>\n<li>Profits are reinvested in the objects, building trust with donors and regulators</li>\n<li>Clear governance under the Companies Act, supporting long-term continuity</li>\n<li>Pathway to 12A/12AB and 80G tax benefits and later FCRA registration</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>Once the licence is granted and the company is incorporated, complete the post-incorporation steps, apply for 12A/12AB and 80G, register on NGO Darpan and, where relevant, file CSR-1. Maintain annual compliance to protect the licence.</p>\n\n<p><strong>Related services:</strong> NGO Registration, Annual Compliance, DIR-3 KYC, CSR registration and FCRA Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Trying to incorporate directly without the Section 8 licence. The licence (Form INC-12) must be obtained first.</li>\n<li>Writing objects that are not clearly charitable or non-profit, which can lead to rejection of the licence application.</li>\n<li>Under-preparing the three-year income and expenditure estimate that the licence application requires.</li>\n<li>Assuming tax exemption is automatic. 12A/12AB and 80G approvals are separate.</li>\n<li>Letting annual filings lapse; non-compliance can lead to licence cancellation.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The licence stage (Form INC-12 to the Regional Director) takes additional time before SPICe+ incorporation, so plan for a longer overall timeline than a normal company. Costs include government fees, stamp duty and professional fees; 12A/12AB and 80G applications are separate.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare a realistic three-year income and expenditure estimate and clear charitable objects, because these are the most scrutinised parts of the licence application.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Section 8 Company | JR Compliance",
          "metaDescription": "A Section 8 company is a company formed for charitable or non-profit objects under Section 8 of the Companies Act, 2013. Unlike an ordinary company, it needs…",
          "canonicalUrl": "/corporate/section-8-company-registration",
          "keywords": "Section 8 Company, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "partnership-firm-registration",
      "matchSlugs": [
        "partnership-firm-registration",
        "partnership-firm"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 6,
        "originalRow": 8,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Partnership Firm",
        "menuLabel": "Partnership Firm",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A partnership firm is formed when two or more people agree, through a partnership deed, to carry on a business together and share its profits. It is governed by the Indian Partnership Act, 1932. Registration with the state Registrar of Firms is optional, but a registered firm enjoys stronger legal rights, particularly the ability to enforce claims in court. There is no fixed deadline to apply, and the process is simple: draft and notarise the deed, file Form No. 1 with the Registrar along with a certified copy of the deed and the prescribed fee, and receive a certificate with a firm number."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Partnership Firm?",
          "paragraphs": [
            {
              "text": "A partnership is the relationship between persons who agree to share the profits of a business carried on by all or any of them acting for all, as defined in the Indian Partnership Act, 1932. It is created by agreement, normally recorded in a written partnership deed, though an oral agreement can also create a partnership. A registered firm is entered in the Register of Firms maintained by the state Registrar and receives a certificate of registration with a firm number."
            },
            {
              "text": "A partnership firm is not a separate legal entity from its partners. The partners are jointly and severally liable for the firm's debts, which means each partner can be required to pay the full amount from personal assets if the firm cannot. This unlimited liability is the most important thing to weigh when choosing the structure, and it is the main reason many growing businesses later move to an LLP or company."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is registering a partnership firm compulsory?",
              "answer": "No, registration is optional, but a registered firm has more legal rights."
            },
            {
              "question": "How many partners can a firm have?",
              "answer": "At least two; the Assam Registrar of Firms notes a maximum of twenty under the Act."
            },
            {
              "question": "Do partners have limited liability?",
              "answer": "No. Partners are jointly and severally liable for the firm's debts unless it is converted into an LLP or company."
            },
            {
              "question": "Can a partnership firm be converted later?",
              "answer": "Yes. A partnership can later be converted into an LLP or a private limited company when the business grows."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Partnership Firm",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>A partnership firm is a natural fit when two or more people want to start or run a business together with low cost, light compliance and flexibility in how they run it. Family businesses, small traders and wholesalers, professional practices such as clinics, consultancies and small agencies, and friends or colleagues pooling skills and capital often choose this structure.</p>\n\n<p>It works best when the partners trust each other and are comfortable sharing personal liability. Because each partner can bind the firm and can be held responsible for its debts, the deed should define authority, capital, drawings, profit-sharing and exit rules carefully.</p>\n\n<p>Registration is particularly valuable for firms that deal with customers, suppliers or banks regularly, because a registered firm can enforce its claims in court while an unregistered firm cannot easily do so. It also gives lenders, landlords and government departments confidence in the firm's existence.</p>\n\n<p>If you expect outside investors, plan to scale fast, or want to limit each partner's liability, consider an LLP or a private limited company instead. A partnership can later be converted into either, so many firms start here and upgrade as they grow.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Easy to set up with minimal cost and simple compliance</li>\n<li>A written deed clarifies roles, profit-sharing and exits, preventing disputes</li>\n<li>Registered firms can enforce claims in court, unlike unregistered firms</li>\n<li>Flexible management with no need for formal board meetings or an AGM</li>\n<li>Profits are taxed once at the firm level, with partners receiving their share</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, obtain the firm's PAN, open a bank account in the firm's name, register for GST if your turnover or business requires it, and register on Udyam. Keep the partnership deed updated when partners or terms change, and file the firm's income tax return every year.</p>\n\n<p><strong>Related services:</strong> GST Registration, Udyam (MSME) registration, Income Tax Return and, when you outgrow the structure, LLP or Private Limited conversion.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Operating on a verbal understanding. A written, notarised deed prevents disputes about profit-sharing, authority and exits.</li>\n<li>Skipping registration and then discovering that an unregistered firm cannot easily enforce its claims in court.</li>\n<li>Not defining what happens when a partner retires, dies or wants to exit.</li>\n<li>Forgetting that partners have unlimited and joint liability, so one partner's dealings can bind the others.</li>\n<li>Ignoring state-specific forms and fees; the Registrar of Firms is a state authority.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Drafting and notarising the deed can usually be done in a few days, and registration with the Registrar of Firms depends on the state. The fee is small (for example Rs 5 in one state) but stamp duty on the deed and notary charges vary by state. Registration has no fixed deadline.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> register the firm early, because many benefits, including the right to enforce claims in court, depend on registration, and update the deed whenever partners or terms change.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Partnership Firm | JR Compliance",
          "metaDescription": "A partnership firm is formed when two or more people agree, through a partnership deed, to carry on a business together and share its profits. It is governed…",
          "canonicalUrl": "/corporate/partnership-firm-registration",
          "keywords": "Partnership Firm, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "producer-company-registration",
      "matchSlugs": [
        "producer-company-registration",
        "producer-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 7,
        "originalRow": 9,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Producer Company",
        "menuLabel": "Producer Company",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A Producer Company is a company of primary producers such as farmers, dairy producers, artisans and handloom or handicraft makers. It is registered under Part IXA of the Companies Act, 1956, which continues to apply, and it brings together the cooperative spirit of collective action with the governance and legal strength of a company. Registration is done electronically through SPICe+ with the Registrar of Companies, and the name must end with \"Producer Company Limited\"."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Producer Company?",
          "paragraphs": [
            {
              "text": "A Producer Company is a body corporate having the objects specified in Section 581B of the Companies Act, 1956 and registered as a Producer Company. It can be formed by ten or more individual producers, or by two or more producer institutions, or a combination of both. A \"producer\" here means a person engaged in the production of primary produce (including agriculture, animal husbandry, horticulture, handloom and handicrafts), and a \"producer institution\" means a producer company or similar body of producers."
            },
            {
              "text": "On registration the company is treated as a private limited company, but with no limit on the number of members, and it can never become a public limited company. It is a separate legal entity with limited liability for its members, and it can operate across India, unlike a cooperative society that is registered under state law and generally limited to a state."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many members are needed to form a Producer Company?",
              "answer": "At least ten individual producers, or two producer institutions, or a combination."
            },
            {
              "question": "Can a Producer Company become a public company?",
              "answer": "No. It is treated as a private company with no limit on members and can never become a public limited company."
            },
            {
              "question": "What must the name include?",
              "answer": "The name must end with \"Producer Company Limited\"."
            },
            {
              "question": "Is agricultural income of a Producer Company tax-exempt?",
              "answer": "The Income Tax Act contains provisions on agricultural income and producer companies; consult a tax professional for the treatment that applies to your activities."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Producer Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>A Producer Company is designed for farmers, farmer-producer groups (FPOs), dairy and fisheries producers, artisans, handloom weavers and handicraft makers who want to do business collectively. If a group of at least ten producers wants to pool produce, bargain for better prices, share storage or processing facilities, access finance as a company or enter markets directly, this is the right structure.</p>\n\n<p>It is also well suited to NGOs, cooperatives and promoting institutions that organise farmers into producer collectives. Government agencies and development organisations often help set up FPOs as Producer Companies because the structure combines member control with business discipline.</p>\n\n<p>The structure is less suitable for a single entrepreneur or a small family business, which can use a private limited company or LLP instead. Groups should also be ready for the governance obligations that come with a company: regular board meetings, general meetings, audited accounts and annual filings.</p>\n\n<p>If your members span several states, the Producer Company's pan-India registration is an important advantage over cooperative societies registered under state laws.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Collective bargaining power and shared infrastructure for primary producers</li>\n<li>Company-grade legal structure with limited liability for members</li>\n<li>Operates across India, unlike state-registered cooperatives</li>\n<li>Can process, market, export and finance members' produce under one entity</li>\n<li>Governance by members, with the surplus shared among producers</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After incorporation, obtain the firm's PAN, TAN and bank account, then focus on member enrolment, share capital, governance and annual compliance. Producer companies may also benefit from FSSAI, APEDA or other sector registrations depending on their produce.</p>\n\n<p><strong>Related services:</strong> FSSAI registration, APEDA RCMC, Annual Compliance and ROC returns.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Copying an ordinary private company's articles. A Producer Company must be drafted for Part IXA, with objects consistent with Section 581B.</li>\n<li>Registering with fewer than ten producers or without proper producer-member status.</li>\n<li>Forgetting that the name must end with \"Producer Company Limited\".</li>\n<li>Treating it as a cooperative society. It is a company with full Companies Act compliance.</li>\n<li>Neglecting annual filings and governance once members are enrolled.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Incorporation is done through SPICe+ and the Companies Act provides that the Registrar registers the company within 30 days of receiving the required documents. Costs include government fees based on authorised capital, stamp duty and professional fees.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare a clear member list showing that at least ten producers (or two producer institutions) are involved, and draft the objects specifically for primary produce activities under Section 581B.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Producer Companies exist because Parliament amended the Companies Act, 1956 by adding Part IXA to give farmers and other primary producers a corporate vehicle with cooperative principles. Section 581B lists the objects a Producer Company may pursue, including production, harvesting, procurement, grading, pooling, handling, marketing, selling and export of primary produce, and processing activities. This legal basis matters because a Producer Company's articles and activities must stay within those objects, and the continuing application of Part IXA means that members, directors and advisers should refer to that Part, along with the Companies Act, 2013, when drafting documents and running the company.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Producer Company | JR Compliance",
          "metaDescription": "A Producer Company is a company of primary producers such as farmers, dairy producers, artisans and handloom or handicraft makers. It is registered under Part…",
          "canonicalUrl": "/corporate/producer-company-registration",
          "keywords": "Producer Company, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "indian-subsidiary",
      "matchSlugs": [
        "indian-subsidiary"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 8,
        "originalRow": 10,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Indian Subsidiary",
        "menuLabel": "Indian Subsidiary",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "An Indian subsidiary is a company incorporated in India under the Companies Act, 2013 whose shares are held wholly or partly by a foreign or Indian parent. For a foreign group, it is the most common way to set up a full-fledged operating presence in India, because it is a separate Indian legal entity that can own assets, employ staff, sign contracts and do business like any other Indian company."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Indian Subsidiary?",
          "paragraphs": [
            {
              "text": "A subsidiary company is a company in which another company (the parent or holding company) holds control, typically by owning a majority of shares or controlling the board. A wholly owned subsidiary (WOS) is 100% owned by the parent. A joint-venture subsidiary shares ownership with partners. Once incorporated in India, a subsidiary is an Indian company in every legal sense, even if its parent is foreign."
            },
            {
              "text": "It is a separate legal entity from its parent, which means its liabilities are its own, and the parent's exposure is generally limited to the capital invested. It follows Indian company law (annual filings, audit, board meetings), Indian tax law (it is taxed as an Indian company), and foreign exchange law (FEMA and RBI reporting for foreign investment)."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Can a foreign company own 100% of an Indian subsidiary?",
              "answer": "In most sectors yes, under the automatic route; some sectors have caps or require approval."
            },
            {
              "question": "What is FC-GPR?",
              "answer": "The RBI reporting form filed on the FIRMS portal after shares are allotted to a foreign investor."
            },
            {
              "question": "How many directors and shareholders are needed?",
              "answer": "A private company needs at least two directors and two shareholders, with at least one director resident in India."
            },
            {
              "question": "Is a branch office the same as a subsidiary?",
              "answer": "No. A branch or liaison office is an extension of the foreign parent, while a subsidiary is a separate Indian legal entity."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Indian Subsidiary",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for foreign companies and multinational groups that want a full operating business in India. Technology and software firms setting up development or service centres, manufacturers entering the Indian market, trading and distribution businesses, consulting and professional services firms, and startups from abroad that want an Indian entity for contracts and employees all fit this description.</p>\n\n<p>It is also relevant to Indian groups that want to create a separate subsidiary for a new business line, to ring-fence risk or to bring in a minority investor, and to joint ventures between foreign and Indian partners.</p>\n\n<p>A subsidiary is the right choice when you plan to hire locally, sign contracts in India, own property or intellectual property, and want limited liability. If your activity is limited to representation or market research, a liaison office may be enough; if you need to carry on trading activity but not as a separate company, a branch office is another option. These are covered under the Foreign Company Registration service.</p>\n\n<p>Because FDI rules, sector caps and RBI reporting are specialised, even experienced multinationals benefit from structured support when entering India for the first time.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Separate Indian legal entity with limited liability for the foreign parent</li>\n<li>Full operational freedom: hire staff, own assets and sign contracts locally</li>\n<li>100% foreign ownership is allowed in most sectors under the automatic route</li>\n<li>Smooth FEMA compliance through correct FC-GPR reporting</li>\n<li>Easier access to Indian banking, licences, tenders and local fundraising</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After incorporation, bring in capital from the foreign parent, allot shares and file FC-GPR on the RBI's FIRMS portal, open the bank account and register for GST and other licences as needed. Then set up the compliance calendar for ROC, tax and FEMA filings.</p>\n\n<p><strong>Related services:</strong> Post Compliance, GST Registration, IEC Code, Annual Compliance and Foreign Company Registration for branch or liaison options.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the RBI reporting on Form FC-GPR after allotting shares to the foreign parent; sources differ on whether the clock starts from allotment or receipt of funds, so file early.</li>\n<li>Not apostilling or notarising foreign documents, which causes rejection.</li>\n<li>Ignoring sector caps and approval requirements under the FDI policy.</li>\n<li>Appointing no Indian-resident director; at least one is required.</li>\n<li>Overlooking transfer-pricing and other tax implications of dealings with the foreign parent.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Incorporation takes about the same time as a private company, but foreign documents must be notarised and apostilled first, which can add days. After shares are allotted, Form FC-GPR must be filed on the RBI's FIRMS portal; sources say within 30 days. Costs include government fees, stamp duty, apostille and professional fees.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm that your sector allows 100% FDI under the automatic route before starting, and plan the bank account and capital inflow carefully so FC-GPR can be filed on time.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Indian Subsidiary | JR Compliance",
          "metaDescription": "An Indian subsidiary is a company incorporated in India under the Companies Act, 2013 whose shares are held wholly or partly by a foreign or Indian parent…",
          "canonicalUrl": "/corporate/indian-subsidiary",
          "keywords": "Indian Subsidiary, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "private-limited-company-registration-consultant",
      "matchSlugs": [
        "private-limited-company-registration-consultant",
        "pvt-ltd-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 9,
        "originalRow": 11,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Pvt Ltd Company",
        "menuLabel": "Pvt Ltd Company",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A Private Limited Company is the most popular business structure for startups and growing businesses in India. It is a separate legal entity registered with the Registrar of Companies under the Companies Act, 2013, offering limited liability to its shareholders, perpetual succession and the credibility that banks, investors and large customers look for."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Pvt Ltd Company?",
          "paragraphs": [
            {
              "text": "A Private Limited Company is a company registered with the Registrar of Companies under the Companies Act, 2013 that restricts the transfer of its shares, limits its members to a maximum of 200, and cannot invite the public to subscribe to its shares. Its name must end with \"Private Limited\"."
            },
            {
              "text": "It is a legal person separate from its owners. It can own property, enter into contracts and sue or be sued in its own name. Shareholders enjoy limited liability, meaning their risk is limited to the unpaid amount on their shares. The company continues to exist despite changes in shareholders or directors, which is called perpetual succession."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many directors and shareholders do I need?",
              "answer": "A minimum of two directors and two shareholders; at least one director must be an Indian resident."
            },
            {
              "question": "How long does registration take?",
              "answer": "Sources typically quote about seven to ten working days once documents are complete."
            },
            {
              "question": "Is a minimum capital required?",
              "answer": "No minimum paid-up capital is required."
            },
            {
              "question": "Can NRIs and foreign nationals be directors or shareholders?",
              "answer": "Yes, subject to FEMA and FDI rules; foreign documents usually need to be notarised and apostilled."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Pvt Ltd Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>A Private Limited Company suits founders who plan to build a scalable business and want credibility with customers, banks and investors. Technology startups, consumer brands, manufacturers, e-commerce businesses, service providers and any business that expects to raise venture or angel funding typically choose this structure because investors prefer to buy shares in a company.</p>\n\n<p>It is also the right choice for businesses that want limited liability to protect personal assets, for entrepreneurs who want to attract talent through ESOPs, for foreign investors and NRIs who want to hold equity in an Indian business, and for existing proprietors, partnerships or LLPs that want to convert into a corporate structure as they grow.</p>\n\n<p>Founders should be comfortable with the added compliance: audited accounts, annual filings with the ROC, income tax and GST returns, and regular board and shareholder meetings. In exchange they get a structure that is recognised for government tenders, supplier contracts, bank loans and funding rounds, and that can be eligible for DPIIT startup recognition and related benefits.</p>\n\n<p>If you are working alone with a small business and no plans for outside investment, a sole proprietorship or LLP may be lighter. A short consultation can help you decide.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Limited liability protects your personal assets</li>\n<li>Separate legal entity with perpetual succession and strong credibility</li>\n<li>Best structure for raising equity funding and issuing ESOPs</li>\n<li>One SPICe+ filing covers name, DIN, PAN and TAN, with optional GST and EPFO/ESIC</li>\n<li>No minimum paid-up capital requirement</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After receiving the Certificate of Incorporation, open the company bank account, hold the first board meeting within 30 days, appoint the first auditor and file ADT-1, issue share certificates within 60 days, and file INC-20A within 180 days. Then register for GST, Udyam or other licences as your business requires.</p>\n\n<p><strong>Related services:</strong> Post Compliance, ADT-1, INC-20A, GST Registration, Trademark Registration and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Not checking name availability and trademark conflicts before filing; a company name approval does not protect against trademark disputes.</li>\n<li>Using an address without the required proof (rent agreement, NOC and recent utility bill).</li>\n<li>Forgetting post-incorporation duties: first board meeting within 30 days, ADT-1 for the auditor, share certificates within 60 days and INC-20A within 180 days.</li>\n<li>Not drafting the MOA and AOA to match the business plan, which later forces expensive amendments.</li>\n<li>Treating the company like a proprietorship by mixing personal and company funds.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Sources typically quote about seven to ten working days for incorporation once documents are in order. Government fees and stamp duty depend on authorised capital and the state of the registered office. There is no minimum paid-up capital.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep the registered office documents (rent agreement, NOC and utility bill not older than two months) ready with the DSC and name approval, because address proof and name issues are the most common causes of delay.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Pvt Ltd Company | JR Compliance",
          "metaDescription": "A Private Limited Company is the most popular business structure for startups and growing businesses in India. It is a separate legal entity registered with…",
          "canonicalUrl": "/corporate/private-limited-company-registration-consultant",
          "keywords": "Pvt Ltd Company, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "insurance-company-registration",
      "matchSlugs": [
        "insurance-company-registration",
        "insurance-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 10,
        "originalRow": 12,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Insurance Company",
        "menuLabel": "Insurance Company",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "Starting an insurance company in India is a regulated, capital-intensive undertaking. No company can carry on life, general, health or reinsurance business without a Certificate of Registration from the Insurance Regulatory and Development Authority of India (IRDAI) under the Insurance Act, 1938 and the IRDAI Act, 1999. The application is made in Form IRDA/R1 and is examined closely: IRDAI looks at the promoters' suitability, the adequacy and source of capital, the business plan, governance and infrastructure, and reinsurance arrangements before granting registration (the R3 certificate)."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Insurance Company?",
          "paragraphs": [
            {
              "text": "An insurance company is an Indian company registered with IRDAI to underwrite risk and pay claims. Life insurers cover events such as death and survival; general insurers cover property, motor, travel and similar risks; health insurers specialise in medical cover; and reinsurers insure other insurers. Each class of business needs its own registration."
            },
            {
              "text": "Legally it must be a company incorporated in India under the Companies Act, 2013, and it must hold an IRDAI Certificate of Registration before it commences business. IRDAI regulates every aspect of the business: capital, solvency, investments, product filing, distribution, claims handling and policyholder protection. Registration can be refused if capital is inadequate, promoters are not fit and proper, or the applicant does not meet requirements under laws such as PMLA, FEMA or the Companies Act."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What capital is required for an insurer?",
              "answer": "Sources state a minimum paid-up capital of Rs 100 crore for life, general or health insurers and Rs 200 crore for reinsurers."
            },
            {
              "question": "Who grants the licence?",
              "answer": "IRDAI, by granting a Certificate of Registration (R3) after reviewing the Form IRDA/R1 application."
            },
            {
              "question": "Is foreign ownership allowed?",
              "answer": "Yes, subject to the FDI cap for insurance, which has changed over time. Verify the current cap with IRDAI before structuring."
            },
            {
              "question": "Can IRDAI refuse registration?",
              "answer": "Yes, for example for inadequate capital, adverse promoter record or failure to meet statutory requirements."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Insurance Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Insurance company registration is for large, well-capitalised groups and strategic investors who want to enter the insurance market. Banks and financial conglomerates, large corporate houses, global insurers seeking an Indian presence through joint ventures, and consortia of investors with long-term capital can all be candidates.</p>\n\n<p>It is not a route for small businesses. The capital requirement, the depth of regulatory scrutiny and the compliance burden mean that only entities with substantial funds, strong governance and a credible multi-year business plan should consider it. Smaller players who want to be in the insurance space may find it more practical to become insurance intermediaries, such as agents, brokers or corporate agents, which have lower capital requirements under separate IRDAI rules.</p>\n\n<p>If you are exploring whether to apply, the first step is to test the economics: the capital, the expected break-even period, the choice between life, general, health or reinsurance, and the partners and distribution channels you will rely on. A preliminary review of these questions before spending on formal applications is usually valuable.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Early planning against IRDAI's scrutiny of promoters, capital and governance</li>\n<li>A properly structured Indian company ready to hold the insurance licence</li>\n<li>Clear understanding of capital and foreign ownership requirements before you commit</li>\n<li>Well-organised R1 file that reduces clarification rounds</li>\n<li>Guidance on reinsurance planning and compliance framework from the start</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>The next stage is typically capital raising, board and management appointments, systems and actuarial set-up, reinsurance arrangements and product filing, followed by compliance with IRDAI's continuing reporting.</p>\n\n<p><strong>Related services:</strong> Pvt Ltd or Public Limited Company registration, DIN/DSC for directors, Foreign Company or Indian Subsidiary set-up where foreign partners are involved, and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Underestimating the capital requirement and its documentation. Sources state Rs 100 crore for life, general or health insurers and Rs 200 crore for reinsurers.</li>\n<li>Relying on an outdated foreign ownership cap. Verify the current limit.</li>\n<li>Weak promoter documentation or unclear source of funds, which can lead to refusal.</li>\n<li>Filing a thin business plan that does not address governance, infrastructure and reinsurance.</li>\n<li>Starting business before the registration certificate (R3) is granted.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The IRDAI process is long and depends on the completeness of the Form IRDA/R1 file, so there is no fixed timeline. The largest cost is the Rs 100 crore (or Rs 200 crore for reinsurance) paid-up capital stated in the sources, along with IRDAI fees and professional costs.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> begin with a feasibility review of capital, partners and distribution before filing, and keep proof of the source of funds ready, because IRDAI examines it closely.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Insurance Company | JR Compliance",
          "metaDescription": "Starting an insurance company in India is a regulated, capital-intensive undertaking. No company can carry on life, general, health or reinsurance business…",
          "canonicalUrl": "/corporate/insurance-company-registration",
          "keywords": "Insurance Company, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "microfinance-company-registration",
      "matchSlugs": [
        "microfinance-company-registration",
        "rbi-micro-finance-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 11,
        "originalRow": 13,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "RBI Micro Finance Company",
        "menuLabel": "RBI Micro Finance Company",
        "sortOrder": 9,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "Microfinance in India can be carried out by a not-for-profit Section 8 company or by an NBFC-MFI, which is a non-deposit-taking NBFC registered with the Reserve Bank of India under Section 45-IA of the RBI Act, 1934. This service focuses on the NBFC-MFI route, where the company lends mainly to low-income households through small, collateral-free loans that meet the RBI's definition of qualifying assets."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is RBI Micro Finance Company?",
          "paragraphs": [
            {
              "text": "An NBFC-MFI is, according to RBI's directions, a non-deposit-taking NBFC (other than a Section 8 company) that satisfies the minimum NOF condition and keeps a prescribed share of its assets as qualifying assets. Qualifying assets are small, collateral-free loans to households that meet specified income and loan-size limits. NBFCs that do not qualify as NBFC-MFI could, under the 2011 Directions, lend to the microfinance sector only up to 10% of total assets."
            },
            {
              "text": "The business is distinctive because the borrowers are typically women and low-income households, repayments are often collected in small instalments through group or individual lending, and the RBI imposes consumer-protection norms: a loan card for each borrower, restrictions on pricing and recovery practices, prudential limits and grievance redressal. An NBFC-MFI cannot accept public deposits."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What net owned fund is required?",
              "answer": "Rs 5 crore (Rs 2 crore for the North-Eastern region), as stated in RBI's directions."
            },
            {
              "question": "Can an NBFC-MFI accept deposits?",
              "answer": "No. It is a non-deposit-taking NBFC."
            },
            {
              "question": "Are qualifying-asset percentages fixed?",
              "answer": "No. Sources cite 85%, 75% and 60% at different times, so confirm the current RBI Master Direction."
            },
            {
              "question": "Is there a non-profit option?",
              "answer": "Yes, a Section 8 company can carry out microfinance with no minimum net worth requirement."
            }
          ]
        },
        "extraContent": [
          {
            "title": "RBI Micro Finance Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for social-finance entrepreneurs and institutions that want to provide small loans to low-income households, women's self-help groups, small farmers and micro-entrepreneurs. Founders of microfinance startups, existing NBFCs that want to convert to the NBFC-MFI category, NGOs considering a regulated lending arm and investors in financial inclusion often use this route.</p>\n\n<p>It is suitable if you can commit the Rs 5 crore net owned fund (or Rs 2 crore in the North-East), build the operations to reach and serve low-income borrowers, and operate within RBI's consumer protection and pricing norms. It is not suitable for lenders that want to take deposits from the public or lend to higher-income customers.</p>\n\n<p>If your aim is purely social and you do not need to raise commercial capital, a Section 8 company may be simpler. If you want to scale with institutional investors and bank funding, NBFC-MFI registration gives the credibility and regulatory standing that funders expect.</p>\n\n<p>Because the rules governing qualifying assets and borrower income limits have evolved, it is wise to review the current framework before finalising your business model.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>RBI-recognised status as an NBFC-MFI, giving credibility with lenders and investors</li>\n<li>Clear framework for lending to low-income households under RBI norms</li>\n<li>Structured support for NOF planning and the COSMOS application</li>\n<li>Consumer-protection and loan-card compliance built into your design</li>\n<li>Guidance on choosing between NBFC-MFI and a Section 8 microfinance company</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After RBI approval you will need to build the loan operations, borrower onboarding, credit bureau reporting and monitoring systems, and maintain the capital adequacy and provisioning norms.</p>\n\n<p><strong>Related services:</strong> RBI NBFC Registration, Section 8 Company registration, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Using outdated qualifying-asset or borrower income limits; they have changed several times.</li>\n<li>Forgetting the borrower loan card and consumer-protection norms.</li>\n<li>Mixing up Section 8 microfinance with NBFC-MFI; their capital and distribution rules differ.</li>\n<li>Not certifying the NOF properly through the statutory auditor before applying.</li>\n<li>Accepting public deposits, which an NBFC-MFI cannot do.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>RBI review times are long and vary; plan for several months. The main cost is the Rs 5 crore net owned fund (Rs 2 crore in the North-East).</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm the current qualifying-asset percentage and borrower income limits from the latest RBI Master Direction before building your lending model, because sources have quoted different figures over time.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "RBI Micro Finance Company | JR Compliance",
          "metaDescription": "Microfinance in India can be carried out by a not-for-profit Section 8 company or by an NBFC-MFI, which is a non-deposit-taking NBFC registered with the…",
          "canonicalUrl": "/corporate/microfinance-company-registration",
          "keywords": "RBI Micro Finance Company, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "opc-registration",
      "matchSlugs": [
        "opc-registration",
        "one-person-company-opc"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 12,
        "originalRow": 14,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "One Person Company (OPC)",
        "menuLabel": "One Person Company (OPC)",
        "sortOrder": 10,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A One Person Company (OPC) gives a single entrepreneur a company with limited liability under Section 2(62) of the Companies Act, 2013. It is aimed at solo founders who want the protection and credibility of a company without needing a second shareholder. The single member can also be the sole director, and the member must nominate another person who will take over if the member dies or becomes incapable."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is One Person Company (OPC)?",
          "paragraphs": [
            {
              "text": "A One Person Company is a company with only one person as its member or shareholder. It is a separate legal entity, so the owner's personal assets are generally protected from business debts, and the company has perpetual succession through the nominee. The name must carry the words \"OPC\" as per MCA naming norms (for example \"OPC Private Limited\")."
            },
            {
              "text": "Only a natural person who is an Indian citizen can be the member of an OPC, and one person can be a member of only one OPC at a time. The nominee must also be a natural person and an Indian citizen. The nominee's consent is filed in Form INC-3, and the member can change the nominee later."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Can an OPC have more than one shareholder?",
              "answer": "No. An OPC has a single member, though it can later be converted into a private company."
            },
            {
              "question": "Who is the nominee?",
              "answer": "A person named by the member to take over the company on the member's death or incapacity; consent is filed in Form INC-3."
            },
            {
              "question": "Can an NRI form an OPC?",
              "answer": "Sources conflict. Some allow Indian citizen NRIs since April 2021; others require residency. We verify the current rule for you."
            },
            {
              "question": "Can one person own multiple OPCs?",
              "answer": "No, one person can be a member of only one OPC at a time."
            }
          ]
        },
        "extraContent": [
          {
            "title": "One Person Company (OPC)",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>An OPC is designed for solo entrepreneurs who want limited liability and a professional structure without bringing in a partner. Freelancers who have grown into agencies, consultants, small manufacturers, e-commerce sellers, content creators and traders who have outgrown a sole proprietorship are the most common users.</p>\n\n<p>It suits you if you intend to retain full ownership and control, want to separate personal and business risk, and want to deal with larger clients, platforms and banks that prefer working with companies. Because the structure has only one member, it is less suited to founders who plan to raise outside equity quickly; in that case a private limited company is a better base from the start.</p>\n\n<p>Check eligibility before you apply. Under most readings the member and nominee must be Indian citizens, and the rules on NRI members are described differently across sources. Also remember the restriction of one OPC per person.</p>\n\n<p>If your business grows, an OPC can be converted into a private limited company, so choosing the OPC does not close doors for future funding or expansion.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Limited liability for a single founder, protecting personal assets</li>\n<li>Full ownership and control without needing a co-founder</li>\n<li>Greater credibility than a proprietorship with banks, platforms and customers</li>\n<li>Perpetual succession through the nominee</li>\n<li>Can be converted later into a private limited company as the business grows</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After incorporation, open the company bank account, appoint the auditor, file INC-20A and set up annual compliance.</p>\n\n<p><strong>Related services:</strong> Post Compliance, INC-20A, ADT-1, GST Registration, Annual Compliance and Company Conversion to a private limited company when you grow.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Assuming NRIs can or cannot form an OPC without checking the current rule; sources conflict.</li>\n<li>Forgetting to appoint a nominee or to file the nominee's consent (INC-3).</li>\n<li>Trying to hold more than one OPC at the same time.</li>\n<li>Overlooking that the name must carry the OPC identifier.</li>\n<li>Not planning conversion when outside investors or co-founders are needed.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Filing firms quote about ten to fifteen working days for OPC incorporation after documents are ready. Government fees depend on authorised capital, and there is no minimum capital requirement.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> decide your nominee early, get their consent in INC-3, and check your eligibility as a citizen and resident, because the NRI rule is described differently across sources.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The OPC was introduced by the Companies Act, 2013 to give single entrepreneurs the benefit of limited liability without needing a second shareholder. Section 2(62) defines it as a company with only one person as a member, and the Companies (Incorporation) Rules, 2014 set eligibility conditions for the member and nominee. This matters because the structure fills the gap between a sole proprietorship, where the owner has unlimited liability, and a private company, which needs at least two shareholders. It also explains why the nominee requirement exists: the company must have continuity if the single member dies or becomes incapable of contracting.</p>"
          }
        ],
        "seo": {
          "metaTitle": "One Person Company (OPC) | JR Compliance",
          "metaDescription": "A One Person Company (OPC) gives a single entrepreneur a company with limited liability under Section 2(62) of the Companies Act, 2013. It is aimed at solo…",
          "canonicalUrl": "/corporate/opc-registration",
          "keywords": "One Person Company (OPC), Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "public-limited-company-registration",
      "matchSlugs": [
        "public-limited-company-registration",
        "public-limited-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 13,
        "originalRow": 15,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Public Limited Company",
        "menuLabel": "Public Limited Company",
        "sortOrder": 11,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A Public Limited Company is a company whose shares can be offered to the public and freely transferred. It is registered under the Companies Act, 2013 through the SPICe+ form on the MCA portal and needs a minimum of seven shareholders and three directors, with no upper limit on members. Filing firms quote about ten to fourteen working days for incorporation."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Public Limited Company?",
          "paragraphs": [
            {
              "text": "A Public Limited Company is owned by shareholders whose shares can be offered to the public, typically through a stock exchange, and are freely transferable unlike a private company's shares. Its name ends with \"Limited\". It is a separate legal entity, with limited liability for shareholders and perpetual succession."
            },
            {
              "text": "The Companies Act requires at least seven members, with no maximum, and at least three directors, with a maximum of fifteen that can be extended by special resolution. At least one director must be resident in India. The registered office must be in India. Sources say there is no minimum paid-up capital, although one filing firm states a minimum authorised capital of Rs 1 lakh at registration, which should be verified on the MCA website."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many members and directors are needed?",
              "answer": "At least seven shareholders and three directors."
            },
            {
              "question": "Can a public company be listed immediately?",
              "answer": "Listing requires separate compliance with SEBI regulations and stock-exchange rules."
            },
            {
              "question": "Is there a minimum capital?",
              "answer": "Sources say there is no minimum paid-up capital; one source mentions Rs 1 lakh authorised capital, so verify on mca.gov.in."
            },
            {
              "question": "Can I start private and convert later?",
              "answer": "Yes. A private company can be converted to a public company by special resolution and filing of INC-27."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Public Limited Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>A Public Limited Company is meant for businesses that expect to raise large amounts of capital from the public, list on a stock exchange or build a broad shareholder base. Large manufacturers, infrastructure and financial companies, and groups that plan an IPO in the medium term typically choose it.</p>\n\n<p>It is also used by promoters who want free transferability of shares, a structure that regulators and institutional investors recognise, or a vehicle for activities such as certain financial services that are reserved for public companies.</p>\n\n<p>For small and early-stage businesses, a private limited company is usually the better starting point, because it has lighter compliance and can be converted to a public company later when the business is ready. Promoters who are not sure when they will need public funds can take that route.</p>\n\n<p>If you do start with a public limited company, be prepared for the governance obligations: a minimum of three directors, stricter board and committee requirements, and careful documentation of shareholders, since the number of members can be large.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Ability to raise capital from the public and list on a stock exchange</li>\n<li>Freely transferable shares offering liquidity to shareholders</li>\n<li>Limited liability and separate legal identity</li>\n<li>High credibility with institutional investors, banks and regulators</li>\n<li>No upper limit on the number of shareholders</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After incorporation, hold the first board meeting, appoint the auditor, file INC-20A, open the bank account and set up governance and compliance systems.</p>\n\n<p><strong>Related services:</strong> DSC, Post Compliance, ADT-1, INC-20A, Increase Authorised Capital, Company Conversion and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Starting with fewer than seven shareholders or three directors.</li>\n<li>Assuming a public company can raise money from the public immediately; listing and offers to the public involve separate SEBI compliance.</li>\n<li>Underestimating the governance load compared with a private company.</li>\n<li>Not checking the minimum authorised capital statement from some sources against MCA's current rules.</li>\n<li>Choosing a public company when a private company would be lighter and can be converted later.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Filing firms quote about ten to fourteen working days for public company incorporation. Costs include government fees based on authorised capital, stamp duty and professional fees; sources say there is no minimum paid-up capital.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> line up seven shareholders and three directors, including a resident director, before you start, and plan for the heavier governance requirements from day one.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Companies Act, 2013 distinguishes public from private companies under Section 2(71) and Section 2(68), and the public company is the vehicle through which a business can invite the public to subscribe to its securities. The extra governance obligations, including independent directors in listed and larger companies, audit committees and stricter disclosure, exist because public shareholders cannot directly supervise management. When a public company lists its shares, SEBI's listing and disclosure regulations apply as well. Knowing this background helps promoters understand why the structure takes more effort to maintain but gives access to wider capital.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Public Limited Company | JR Compliance",
          "metaDescription": "A Public Limited Company is a company whose shares can be offered to the public and freely transferred. It is registered under the Companies Act, 2013 through…",
          "canonicalUrl": "/corporate/public-limited-company-registration",
          "keywords": "Public Limited Company, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "nbfc-registration",
      "matchSlugs": [
        "nbfc-registration",
        "rbi-nbfc-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 14,
        "originalRow": 16,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "RBI NBFC Registration",
        "menuLabel": "RBI NBFC Registration",
        "sortOrder": 12,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A Non-Banking Financial Company (NBFC) provides loans, investments and similar financial services without being a bank. No company can carry on non-banking financial business in India without a Certificate of Registration (CoR) from the Reserve Bank of India under Section 45-IA of the RBI Act, 1934. The application is filed online on the RBI's COSMOS portal after the company has been incorporated and has built the required Net Owned Fund (NOF)."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is RBI NBFC Registration?",
          "paragraphs": [
            {
              "text": "An NBFC is a company registered under the Companies Act that carries on the business of a non-banking financial institution, as defined in Section 45-I(f) of the RBI Act, 1934. NBFCs lend, finance assets, invest in securities, provide factoring and related services, but they cannot accept demand deposits like a bank and are not part of the payment and settlement system in the way banks are."
            },
            {
              "text": "Net Owned Fund is paid-up equity capital plus free reserves, less accumulated losses, intangible assets and specified investments, as defined in Section 45-IA(7). The RBI requires a minimum NOF of Rs 10 crore for most categories such as investment and credit companies, with lower amounts for some specialised categories (for example Rs 5 crore for NBFC-MFI). A company must also satisfy the 50-50 test: more than half of its assets and income must come from financial activity."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the minimum NOF for an NBFC?",
              "answer": "Most sources state Rs 10 crore for the main categories; lower for some specialised categories."
            },
            {
              "question": "How long does RBI approval take?",
              "answer": "Sources vary from about 90 days to 12 months depending on completeness and queries."
            },
            {
              "question": "Is there an application fee?",
              "answer": "Sources conflict (none vs Rs 50,000). Confirm on the RBI portal."
            },
            {
              "question": "Can an LLP or partnership apply?",
              "answer": "No. Only a company can apply; Section 8 companies are not eligible."
            }
          ]
        },
        "extraContent": [
          {
            "title": "RBI NBFC Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>An NBFC licence is for entrepreneurs and institutions who want to build a lending or financial-services business with the flexibility of a non-bank. Fintech lenders, vehicle and equipment finance companies, gold-loan and housing-related lenders, investment companies and groups that want to run an infrastructure or factoring business can all use this route.</p>\n\n<p>It requires substantial capital (Rs 10 crore NOF for most categories), a credible business plan and promoters who meet RBI's fit-and-proper standards. It is not suited to individuals or very small businesses.</p>\n\n<p>If you only want to lend to low-income households, the NBFC-MFI route might be more appropriate; if you want to take deposits from the public as a bank, you would need a banking licence, which is a different regime altogether. If you plan a lending business but do not want to raise capital, partnering with an existing NBFC as a lending service provider may be an alternative.</p>\n\n<p>Because the RBI's framework, thresholds and timelines change, it is important to plan the capital and governance structure early and to verify current rules before committing funds.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>RBI-registered status enabling lending and financial services</li>\n<li>Structured preparation of NOF certification, business plan and promoter documents</li>\n<li>Reduced risk of application rejection or delays through RBI-aligned drafting</li>\n<li>Clear understanding of scale-based regulation and ongoing compliance</li>\n<li>Single partner for incorporation and RBI application</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the CoR, you must comply with RBI directions on capital adequacy, provisioning, returns and customer protection.</p>\n\n<p><strong>Related services:</strong> Pvt Ltd or Public Limited Company registration, Annual Compliance, ROC Compliance and, if relevant, RBI MFI Company registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying before the company has the full NOF in place and certified.</li>\n<li>Missing the fit-and-proper documentation for promoters and directors.</li>\n<li>Choosing the wrong NBFC category, which changes capital and regulatory requirements.</li>\n<li>Relying on old fee and timeline information from web pages; sources conflict.</li>\n<li>Carrying on financial business before the Certificate of Registration is granted.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Sources quote review windows from about 90 days to 12 months, so build time into your plan. The main cost is the Rs 10 crore NOF for most categories; application fee statements conflict (none versus Rs 50,000).</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> have the auditor's NOF certificate and the promoters' fit-and-proper documents ready before applying, and keep the business plan realistic, because RBI reviews it closely.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "RBI NBFC Registration | JR Compliance",
          "metaDescription": "A Non-Banking Financial Company (NBFC) provides loans, investments and similar financial services without being a bank. No company can carry on non-banking…",
          "canonicalUrl": "/corporate/nbfc-registration",
          "keywords": "RBI NBFC Registration, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "llp-registration",
      "matchSlugs": [
        "llp-registration",
        "limited-liability-partnership-llp"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 15,
        "originalRow": 17,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Limited Liability Partnership (LLP)",
        "menuLabel": "Limited Liability Partnership (LLP)",
        "sortOrder": 13,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A Limited Liability Partnership (LLP) combines the flexibility of a partnership with the limited liability protection of a company. It is incorporated under the LLP Act, 2008 through the Ministry of Corporate Affairs, and it is a separate legal entity: it can own assets, enter into contracts and sue or be sued in its own name, while the partners are generally not personally liable for the LLP's debts beyond their agreed contribution."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Limited Liability Partnership (LLP)?",
          "paragraphs": [
            {
              "text": "A Limited Liability Partnership is a form of business incorporated under the LLP Act, 2008 that blends partnership flexibility with the protection normally associated with a corporate structure. It is a body corporate and a separate legal entity from its partners. Partners' liability is limited to their agreed contribution, except in cases of fraud or wrongful acts for which a partner is personally responsible."
            },
            {
              "text": "An LLP needs at least two partners, and at least one designated partner must be resident in India. Every designated partner must have a DPIN (allotted through FiLLiP) and a Class 3 DSC. The registered office must be in India, and a virtual office address is accepted. The LLP's rights and duties among partners are set by the LLP Agreement, which can be customised far more freely than a company's articles."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many partners are required?",
              "answer": "At least two partners, with at least one designated partner resident in India."
            },
            {
              "question": "When must the LLP Agreement be filed?",
              "answer": "Within 30 days of incorporation."
            },
            {
              "question": "Can an LLP raise equity investment?",
              "answer": "Not in the way a company can; investors typically prefer shares in a private limited company."
            },
            {
              "question": "Does an LLP automatically get startup benefits?",
              "answer": "No. DPIIT recognition and related benefits require separate application."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Limited Liability Partnership (LLP)",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>An LLP suits professionals and small to medium businesses that want limited liability without the heavier compliance of a company. Chartered accountants, company secretaries, lawyers, architects, consultants, creative and marketing agencies, trading firms, family businesses and joint ventures between a few partners are common examples.</p>\n\n<p>It is a good fit when the founders do not expect to raise equity from venture investors in the near term, when they value flexibility in profit sharing and management, and when they want a lower compliance burden. It is also commonly used by existing partnership firms that want to convert and gain limited liability.</p>\n\n<p>If you plan to raise equity funding or issue ESOPs, a private limited company is usually more suitable, because investors typically take shares. If you want a very simple structure with a single owner, a sole proprietorship or OPC may be enough.</p>\n\n<p>A clear LLP Agreement is critical, because partners can structure rights and duties as they please. We recommend using the agreement to settle contributions, capital changes, decision-making, partner exit and dispute resolution before the LLP begins operating.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Limited liability for partners, protecting personal assets</li>\n<li>Separate legal entity with perpetual existence</li>\n<li>Flexible internal management under a customised LLP Agreement</li>\n<li>Lower compliance cost than a private limited company</li>\n<li>Credible structure for professional and service businesses</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After incorporation, file the LLP Agreement, obtain PAN and open a bank account, then register for GST if applicable and set up annual compliance.</p>\n\n<p><strong>Related services:</strong> DSC, DIR-3 KYC equivalent DPIN requirements, GST Registration, Trademark Registration, Annual Compliance and Company Conversion if you later move to a private limited company.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Filing the LLP Agreement late or leaving it too generic; it should cover contributions, profit sharing, roles, admission/exit and disputes.</li>\n<li>Appointing designated partners without DPIN or DSC.</li>\n<li>Assuming LLP registration automatically gives Startup India benefits.</li>\n<li>Forgetting that at least one designated partner must be resident in India.</li>\n<li>Mixing LLP and personal funds, or skipping annual filings.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Filing firms quote about seven to fifteen working days for LLP registration, and the LLP Agreement must be filed within 30 days of incorporation. Government fees depend on the partners' contribution slab, and stamp duty on the LLP Agreement varies by state.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> spend time on the LLP Agreement, because it governs profit sharing, roles and exits, and cannot be easily fixed later.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The LLP Act, 2008 created a new corporate form to give small businesses and professionals limited liability with flexible internal management. An LLP is a body corporate with perpetual succession, but unlike a company its internal rules are set by the LLP Agreement and not by a prescribed set of Articles. The Act also requires annual filing of a statement of accounts and solvency and an annual return. This matters because it explains why LLPs are popular among professionals: they combine liability protection with fewer procedural requirements than a company, but they cannot raise equity in the usual way.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Limited Liability Partnership (LLP) | JR Compliance",
          "metaDescription": "A Limited Liability Partnership (LLP) combines the flexibility of a partnership with the limited liability protection of a company. It is incorporated under…",
          "canonicalUrl": "/corporate/llp-registration",
          "keywords": "Limited Liability Partnership (LLP), Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "asset-reconstruction-company-registration",
      "matchSlugs": [
        "asset-reconstruction-company-registration",
        "rbi-asset-reconstruction-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 16,
        "originalRow": 18,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "RBI Asset Reconstruction Registration",
        "menuLabel": "RBI Asset Reconstruction Registration",
        "sortOrder": 14,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "An Asset Reconstruction Company (ARC) buys non-performing assets from banks and financial institutions and works to recover or reconstruct them. It must hold a Certificate of Registration from the Reserve Bank of India under Section 3 of the SARFAESI Act, 2002 before it begins securitisation or asset reconstruction business. The RBI's Master Direction on Asset Reconstruction Companies (2024) requires a minimum Net Owned Fund of Rs 300 crore, both to commence business and on an ongoing basis."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is RBI Asset Reconstruction Registration?",
          "paragraphs": [
            {
              "text": "An Asset Reconstruction Company is a company registered with the RBI under Section 3 of the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest (SARFAESI) Act, 2002 that acquires non-performing assets from banks and financial institutions for the purpose of reconstruction or securitisation and recovery. ARCs are limited to the activities in Section 10 of the Act. Sections 45-IA, 45-IB and 45-IC of the RBI Act do not apply to a registered ARC."
            },
            {
              "text": "The capital requirement has risen over time: Rs 100 crore from 2017, and Rs 300 crore for certificates of registration issued on or after 11 October 2022, with existing ARCs given a transition period to reach Rs 300 crore by 31 March 2026. An ARC must also become a member of at least one RBI-registered credit information company."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the minimum capital for an ARC?",
              "answer": "The RBI Master Direction requires a minimum NOF of Rs 300 crore to commence business and on an ongoing basis."
            },
            {
              "question": "Which law governs ARC registration?",
              "answer": "Section 3 of the SARFAESI Act, 2002, with RBI's Master Direction on ARCs."
            },
            {
              "question": "Must an ARC join a credit information company?",
              "answer": "Yes, it must be a member of at least one RBI-registered credit information company."
            }
          ]
        },
        "extraContent": [
          {
            "title": "RBI Asset Reconstruction Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for banks, financial institutions, private equity and distressed-asset investors and large business groups that want to build a dedicated stressed-asset platform. It is suitable only for promoters who can commit Rs 300 crore or more of capital and who have credible experience in credit, legal recovery and restructuring.</p>\n\n<p>It is also relevant for existing financial groups that want to expand into asset reconstruction as a separate regulated business, and for investors who want to participate in the resolution of non-performing assets through an established, regulated vehicle.</p>\n\n<p>It is not suitable for small companies or individuals who want to buy a few loans; those who simply want exposure to distressed assets can invest through alternative investment funds or purchase security receipts issued by ARCs.</p>\n\n<p>Because the registration is regulated by the RBI and the amounts involved are large, expert preparation of the application and governance structure is essential.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>RBI-registered status needed to operate legally as an ARC</li>\n<li>Structured planning of the Rs 300 crore NOF and its auditor certification</li>\n<li>Governance and board composition aligned to RBI requirements</li>\n<li>Clear understanding of the SARFAESI Act framework and permissible activities</li>\n<li>Support for responding to RBI queries during the application</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, an ARC must meet the RBI's directions on internal controls, disclosures and reporting.</p>\n\n<p><strong>Related services:</strong> Public Limited or Private Limited Company registration, RBI NBFC Registration, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Underestimating the NOF requirement and its certification method.</li>\n<li>Setting objects broader than securitisation and asset reconstruction.</li>\n<li>Weak board composition or fit-and-proper documentation.</li>\n<li>Starting asset acquisition before obtaining the Certificate of Registration.</li>\n<li>Overlooking credit information company membership.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>RBI review timelines are not fixed and depend on the quality of the application. The key cost is the Rs 300 crore NOF requirement.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm board composition and promoter documentation before applying, and prepare the auditor's NOF certificate using the RBI's computation method.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The SARFAESI Act, 2002 allows secured creditors to enforce security without court intervention and created the legal framework for asset reconstruction companies. Banks and financial institutions can sell non-performing assets to ARCs, which then pursue recovery or restructuring. Because ARCs handle large volumes of distressed debt, the RBI regulates them tightly through registration, capital requirements, governance and disclosure norms. The Rs 300 crore NOF requirement is intended to ensure that an ARC has the financial strength to absorb losses and give comfort to the banks selling assets and the investors holding its security receipts.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A bank group wants to hive off a pool of stressed loans into a regulated entity and sets up an ARC with the required Rs 300 crore net owned fund.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A private equity investor with distressed-debt experience partners with a financial sponsor to launch an ARC and needs help with board composition and promoter documents.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An existing ARC that was registered earlier needs to check whether it has reached the Rs 300 crore requirement within the transition period.</p>"
          }
        ],
        "seo": {
          "metaTitle": "RBI Asset Reconstruction Registration | JR Compliance",
          "metaDescription": "An Asset Reconstruction Company (ARC) buys non-performing assets from banks and financial institutions and works to recover or reconstruct them. It must hold…",
          "canonicalUrl": "/corporate/asset-reconstruction-company-registration",
          "keywords": "RBI Asset Reconstruction Registration, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "mutual-fund-company-registration",
      "matchSlugs": [
        "mutual-fund-company-registration",
        "rbi-mutual-fund-company-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 17,
        "originalRow": 19,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "RBI Mutual Fund Company Registration",
        "menuLabel": "RBI Mutual Fund Company Registration",
        "sortOrder": 15,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A mutual fund in India is set up as a trust with three key parties: a sponsor, trustees and an Asset Management Company (AMC). It must be registered with SEBI, not the RBI, by applying in Form A as prescribed in the regulations. The sponsor must meet SEBI's criteria on track record, net worth and fit-and-proper status, and must contribute at least 40% of the AMC's net worth."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is RBI Mutual Fund Company Registration?",
          "paragraphs": [
            {
              "text": "A mutual fund is a trust that pools money from investors and invests it in securities under schemes managed by an Asset Management Company. It follows a three-tier structure. The sponsor sets up the mutual fund and must be approved by SEBI; any person holding 40% or more of the AMC's net worth is deemed a sponsor. The trustees hold the fund's property for unit-holders and supervise the AMC. The AMC manages the schemes."
            },
            {
              "text": "Under the 1996 Regulations, a sponsor needed a sound track record: about five years in financial services, positive net worth in the preceding five years, net worth in the preceding year above its capital contribution to the AMC, and profit in at least three of the preceding five years. The sponsor had to contribute at least 40% to the AMC's net worth, and the AMC's net worth requirement was Rs 50 crore (it was originally Rs 10 crore). The AMC and trustees need independent directors, and a custodian must be appointed."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who registers mutual funds in India?",
              "answer": "SEBI. The sheet title mentions RBI, but the regulator is SEBI."
            },
            {
              "question": "How much must the sponsor contribute?",
              "answer": "At least 40% of the AMC's net worth."
            },
            {
              "question": "What is the AMC net worth requirement?",
              "answer": "Sources state Rs 50 crore under the earlier regulations; confirm the exact figures in the 2026 Regulations."
            },
            {
              "question": "Are independent directors required?",
              "answer": "Yes, trustees and the AMC need independent directors as per SEBI norms."
            }
          ]
        },
        "extraContent": [
          {
            "title": "RBI Mutual Fund Company Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for established financial-services groups that want to sponsor and launch a mutual fund business. Banks, NBFCs, insurance groups, wealth managers, brokerage houses and large financial conglomerates that have the capital, track record and governance depth to meet SEBI's criteria are the typical candidates.</p>\n\n<p>It may also interest strategic investors who want to enter the asset management business through the newer sponsor route described in the 2026 Regulations, subject to confirming eligibility under the notified text.</p>\n\n<p>It is not suitable for small startups or individual advisers. Those who want to manage investor money at smaller scale may look at SEBI-registered portfolio managers, alternative investment funds or investment advisers, which have different registration regimes.</p>\n\n<p>Starting preparation early is important because the application requires financial history, group disclosures, board and trustee structures and a clear plan for operations, compliance and risk management.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Clear assessment of sponsor eligibility before you invest in the application</li>\n<li>Structured set-up of the trust, trustee company and AMC</li>\n<li>Awareness of the 2026 SEBI Regulations and the route that suits you</li>\n<li>Organised Form A with disclosures and fit-and-proper declarations</li>\n<li>Reduced risk of rejection through SEBI-aligned preparation</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, the fund launches schemes by filing offer documents with SEBI and follows continuing compliance.</p>\n\n<p><strong>Related services:</strong> Public Limited Company registration, Portfolio Manager Registration, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Relying on the 1996 thresholds when the 2026 Regulations now apply.</li>\n<li>Weak sponsor disclosures on track record, net worth and group entities.</li>\n<li>Setting up the AMC and trustee structure without independent directors.</li>\n<li>Treating the application as an RBI process; mutual funds are registered with SEBI.</li>\n<li>Launching schemes before registration is granted.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>SEBI processing is lengthy and depends on due diligence. The main financial commitment is the AMC net worth (Rs 50 crore under earlier regulations) and the sponsor's 40% contribution.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> check the sponsor's track-record tests under the new 2026 Regulations before investing in the application, because they replace the 1996 framework.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "RBI Mutual Fund Company Registration | JR Compliance",
          "metaDescription": "A mutual fund in India is set up as a trust with three key parties: a sponsor, trustees and an Asset Management Company (AMC). It must be registered with…",
          "canonicalUrl": "/corporate/mutual-fund-company-registration",
          "keywords": "RBI Mutual Fund Company Registration, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "foreign-company-registration",
      "matchSlugs": [
        "foreign-company-registration",
        "foreign-company-reg"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 18,
        "originalRow": 20,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Foreign Company Reg.",
        "menuLabel": "Foreign Company Reg.",
        "sortOrder": 16,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A foreign company that wants a presence in India without forming an Indian subsidiary can open a Branch Office, a Liaison Office or a Project Office. These are extensions of the foreign parent, not separate legal entities. They require prior RBI approval under FEMA (application in Form FNC through an Authorised Dealer bank), followed by registration with the Registrar of Companies in Form FC-1 within 30 days under Section 380 of the Companies Act, 2013."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Foreign Company Reg.?",
          "paragraphs": [
            {
              "text": "A foreign company is, under Section 2(42) of the Companies Act, 2013, a company incorporated outside India that has a place of business in India. It can operate through three forms of office."
            },
            {
              "text": "A Liaison Office is representational only. It can promote the parent's interests, facilitate export and import and act as a communication channel, but it cannot carry on commercial activity or earn income in India. A Branch Office can carry on permitted activities such as export and import of goods, rendering professional or consultancy services, research work and similar activities, and is liable to tax in India on its income. A Project Office is set up to execute a specific contract awarded by an Indian company."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Can a liaison office earn income in India?",
              "answer": "No. A liaison office is limited to representational activities."
            },
            {
              "question": "How soon after RBI approval must FC-1 be filed?",
              "answer": "Within 30 days under Section 380 of the Companies Act."
            },
            {
              "question": "Can a partnership firm open a branch in India?",
              "answer": "No. Partnerships and proprietary concerns set up abroad cannot open these offices."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Foreign Company Reg.",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for overseas companies that want to enter India in a lighter way than forming a subsidiary. It is useful for companies exploring the market, those that want a local representative to liaise with customers and suppliers, businesses that want to execute a specific project contract, and parents that want to carry on permitted trading or service activity directly.</p>\n\n<p>It is the right choice if your foreign parent meets the profit and net-worth thresholds and is comfortable with being directly responsible for the Indian office. If you want to hire large teams, own property or intellectual property locally with limited liability, or carry out a full operating business, an Indian subsidiary may be better.</p>\n\n<p>Companies in regulated sectors such as banking and insurance have separate approval routes. Early-stage startups that do not meet the profit-making track-record test may need to consider a subsidiary instead.</p>\n\n<p>Choosing the correct form at the start avoids unnecessary re-registration later, so a short planning discussion is valuable.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Enter India without forming a separate Indian company</li>\n<li>Choose between liaison, branch and project office as your activity requires</li>\n<li>Correct sequencing of RBI approval and ROC registration</li>\n<li>Support with parent documents, apostille and notarisation</li>\n<li>Guidance on annual FC-3, FC-4 and tax compliance</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After approval and registration, open a non-interest-bearing INR current account, obtain PAN and TAN, register for GST if required and file annual FC-3 and FC-4.</p>\n\n<p><strong>Related services:</strong> Indian Subsidiary, PAN Registration, GST Registration, IEC Code and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Choosing a liaison office when you actually need to carry on commercial activity.</li>\n<li>Not meeting the profit track record and net-worth thresholds.</li>\n<li>Starting operations before RBI approval and ROC registration.</li>\n<li>Missing the 30-day FC-1 deadline.</li>\n<li>Forgetting annual FC-3/FC-4 and income tax return obligations.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>RBI approval time varies, and Form FC-1 must be filed with the ROC within 30 days after approval. Costs include fees, apostille and professional charges, plus annual compliance.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> check the profit and net-worth thresholds (five years and USD 100,000 for a branch; three years and USD 50,000 for a liaison office) before preparing documents.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 380 of the Companies Act, 2013 and the Companies (Registration of Foreign Companies) Rules require foreign companies establishing a place of business in India to register with the Registrar. In parallel, the Foreign Exchange Management (Establishment in India of a Branch Office or a Liaison Office or a Project Office or any other place of business) Regulations, 2016 make RBI approval necessary. This dual framework exists to monitor foreign entities operating in India for both company law and foreign exchange purposes, and it explains why you must complete both the RBI approval and the ROC registration before starting operations.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Foreign Company Reg. | JR Compliance",
          "metaDescription": "A foreign company that wants a presence in India without forming an Indian subsidiary can open a Branch Office, a Liaison Office or a Project Office. These…",
          "canonicalUrl": "/corporate/foreign-company-registration",
          "keywords": "Foreign Company Reg., Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "trust-registration",
      "matchSlugs": [
        "trust-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 19,
        "originalRow": 21,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Trust Registration",
        "menuLabel": "Trust Registration",
        "sortOrder": 17,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A trust is created when a settlor transfers property to trustees to hold for the benefit of beneficiaries or a charitable purpose, under a written trust deed. Private trusts are governed by the Indian Trusts Act, 1882; several states, such as Maharashtra, Gujarat and Rajasthan, have their own public trust laws. The deed is signed by the settlor and trustees in the presence of two witnesses and registered at the local Sub-Registrar under the Registration Act, 1908."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Trust Registration?",
          "paragraphs": [
            {
              "text": "A trust, as defined in the Indian Trusts Act, 1882, is a fiduciary relationship in which a trustee holds property for the benefit of beneficiaries. It is created by a settlor (the author of the trust) through a trust deed that names trustees, objects, powers and rules. A trust is not a company and not a separate legal person in the way a company is; property is held in the trustees' names for the trust's purposes."
            },
            {
              "text": "Trusts are broadly private or public. Private trusts are created for the benefit of specified persons, such as family members, often for wealth management and succession planning. Public trusts are created for charitable, religious or educational purposes for the benefit of the public. Only public trusts can obtain 12A and 80G tax benefits."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many trustees are needed?",
              "answer": "At least two; the settlor can also be a trustee."
            },
            {
              "question": "Where is a trust deed registered?",
              "answer": "At the local Sub-Registrar's office under the Registration Act, 1908."
            },
            {
              "question": "Which trusts get 12A and 80G?",
              "answer": "Only public trusts can obtain these approvals."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Trust Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for people who want to hold property or run a charitable activity through a trust. Families that want to manage wealth and plan succession use private trusts. Founders of schools, hospitals, temples, charitable foundations, scholarship funds and community organisations use public trusts.</p>\n\n<p>A trust works well when a small group of trusted people will run the organisation, when the founders want a low-cost structure, and when broad membership and elections are not needed. It is suitable for local charitable projects and for family arrangements.</p>\n\n<p>If you expect significant CSR funding, want a corporate governance framework or plan to scale, a Section 8 company may be better. If you want a member-run democratic body, a society may fit better.</p>\n\n<p>Because public trusts are subject to state laws and sometimes to additional registration with state authorities, it is wise to check the rules of your state before drafting the deed.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Simple, low-cost structure for charity or family wealth management</li>\n<li>A written deed that records objects, trustee powers and succession</li>\n<li>Registered deed with the Sub-Registrar gives legal certainty</li>\n<li>Public trusts can seek 12A/80G tax benefits and CSR eligibility</li>\n<li>Flexible governance with few formal compliance requirements</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, obtain PAN, open a bank account and, for public trusts, apply for 12A and 80G, NGO Darpan and CSR-1.</p>\n\n<p><strong>Related services:</strong> NGO Registration, Society Registration, Section 8 Company, CSR registration and FCRA Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Vague objects or powers in the deed that later cause disputes.</li>\n<li>Not paying the correct stamp duty; it varies by state.</li>\n<li>Forgetting state-specific public trust registration.</li>\n<li>Assuming a private trust can claim 12A or 80G.</li>\n<li>Ignoring record-keeping and annual accounts.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>A trust deed can often be signed and registered within days, subject to Sub-Registrar appointments. Costs are stamp duty on the deed (state-specific) and registration fee (sources quote a range of roughly Rs 100 to Rs 5,000 or more).</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm whether your state has its own public trust law, because some states require additional registration for public trusts.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Indian Trusts Act, 1882 sets out how private trusts are created and the duties of trustees, while the Registration Act, 1908 explains when documents must be registered. Public charitable trusts are additionally governed by state-level laws in some states and by the Income Tax Act for exemptions. This background matters because a trust has no separate legal personality: property is held in the trustees' names, and the trust deed is the primary instrument. Properly drafted powers, succession and dissolution clauses protect the trust's assets and the trustees from later disputes.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Trust Registration | JR Compliance",
          "metaDescription": "A trust is created when a settlor transfers property to trustees to hold for the benefit of beneficiaries or a charitable purpose, under a written trust deed…",
          "canonicalUrl": "/corporate/trust-registration",
          "keywords": "Trust Registration, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "company-registration-page",
      "proposedSlug": "society-registration",
      "matchSlugs": [
        "society-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 20,
        "originalRow": 22,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Society Registration",
        "menuLabel": "Society Registration",
        "sortOrder": 18,
        "hero": {
          "eyebrow": "Company Registration",
          "description": "A society is an association of persons who come together for a literary, scientific, charitable or other lawful purpose and register under the Societies Registration Act, 1860 or the state version of it. The Act says that any seven or more persons can form a society by subscribing a memorandum of association and filing it with the Registrar. A registered society can sue and be sued in its own name and is run on democratic lines."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Society Registration?",
          "paragraphs": [
            {
              "text": "A society is a voluntary association of persons formed for a lawful purpose and registered with the Registrar of Societies. It is a body corporate, in the sense that it can hold property and sue or be sued in its own name, and it acts through a governing body (commonly a president, secretary and treasurer) elected by its members, who also meet in annual general meetings."
            },
            {
              "text": "The central Act requires at least seven persons; some state laws require more, and sources mention nine or ten in states such as Uttar Pradesh, Madhya Pradesh and Rajasthan. The memorandum of association states the society's name, objects, registered address and details of the founding members and governing body. The rules and regulations (bye-laws) set out how the society is run."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many members are needed?",
              "answer": "At least seven under the central Act; some states require more (nine or ten per some sources)."
            },
            {
              "question": "Who runs a society?",
              "answer": "A governing body elected by members, usually with at least a president, secretary and treasurer."
            },
            {
              "question": "Can a society claim tax exemption?",
              "answer": "Yes, after obtaining 12A (and 80G for donor deductions)."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Society Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for groups that want a member-driven organisation: residents' welfare associations, sports and cultural clubs, alumni groups, professional associations, educational and cultural institutions, and community and charitable organisations.</p>\n\n<p>It suits you if you have at least the minimum number of founding members, want democratic decision-making through an elected governing body, and are comfortable with the state's registrar-based compliance, which usually includes filing an annual list of managing committee members and financial statements.</p>\n\n<p>If you plan to raise large CSR or institutional funding, or you want the stricter governance of company law, a Section 8 company may be better. If you want a small, founder-led structure with no membership body, a trust may be simpler.</p>\n\n<p>Because rules differ by state, we advise on the right Act and Registrar for your location before drafting the documents.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Democratic, member-run structure suited to associations and clubs</li>\n<li>Legal identity to hold property and sue or be sued</li>\n<li>Eligible for 12A and 80G after registration</li>\n<li>Registered by a state Registrar, often with a quick process</li>\n<li>Simpler compliance than a company</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, obtain PAN, open a bank account, apply for 12A/80G, register on NGO Darpan and maintain annual filings.</p>\n\n<p><strong>Related services:</strong> NGO Registration, Trust Registration, Section 8 Company, CSR registration and FCRA Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Registering with fewer members than the state law requires.</li>\n<li>Writing objects that are not permitted purposes under the Act.</li>\n<li>Not filing the annual list of managing committee members and accounts.</li>\n<li>Skipping bye-laws, causing governance disputes.</li>\n<li>Forgetting to apply for 12A/80G after registration.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Filing firms quote about seven to fourteen days, though state processing varies. Costs include stamp duty on the memorandum and bye-laws and the Registrar's fee.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm the minimum number of members in your state, since some states require more than seven, and draft clear bye-laws on membership, elections and meetings.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Societies Registration Act, 1860 allows seven or more persons to form a society for literary, scientific, charitable and similar purposes by registering a memorandum of association. Many states have their own versions with modified rules, which is why the minimum number of members differs. The registered society can hold property, enter into contracts and sue or be sued, and is run by a governing body elected by members. Understanding this background helps founders appreciate why bye-laws and annual filings are central to the society's legal standing.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>Residents of a housing complex form a welfare association and register it as a society so it can open a bank account and manage common funds.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A group of artists sets up a cultural society to run workshops and receive small grants.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An alumni group wants a legal identity to collect contributions for a scholarship fund and later applies for 12A and 80G.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Society Registration | JR Compliance",
          "metaDescription": "A society is an association of persons who come together for a literary, scientific, charitable or other lawful purpose and register under the Societies…",
          "canonicalUrl": "/corporate/society-registration",
          "keywords": "Society Registration, Company Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "dsc-certificate",
      "matchSlugs": [
        "dsc-certificate",
        "dsc"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 21,
        "originalRow": 26,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "DSC",
        "menuLabel": "DSC",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "A Digital Signature Certificate (DSC) is the electronic equivalent of your handwritten signature and identity proof. It lets you sign documents and file forms online on government portals such as the Ministry of Corporate Affairs, Income Tax, GST and DGFT, and it gives a digitally signed document legal validity under the Information Technology Act, 2000. Since 1 January 2021, only Class 3 certificates are issued, because Class 2 was discontinued, and all e-services on the MCA portal need a Class 3 DSC."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is DSC?",
          "paragraphs": [
            {
              "text": "A Digital Signature Certificate is an electronic credential issued by a Certifying Authority licensed by the Controller of Certifying Authorities (CCA) under Section 24 of the Information Technology Act, 2000. It binds a person's identity (name, email, and other details) to a cryptographic key pair. When you sign a document digitally, the signature proves who signed it and that the content has not changed since."
            },
            {
              "text": "Certificates have classes, with Class 3 now the standard and highest assurance level. A certificate can be 'Sign only', used to sign documents and forms, or 'Sign + Encrypt', which also lets you encrypt documents, for example for e-tenders. The certificate holds the holder's verified name, email, public key, the name of the issuing Certifying Authority and the validity period."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which class of DSC do I need for MCA filings?",
              "answer": "Class 3. Class 2 is no longer issued from 1 January 2021."
            },
            {
              "question": "How long is a DSC valid?",
              "answer": "Sources differ (one to three years); the Certifying Authority shows the options."
            },
            {
              "question": "What documents are needed?",
              "answer": "PAN, Aadhaar or passport, a photograph, email ID and a mobile number, with video verification or Aadhaar e-KYC."
            },
            {
              "question": "Do I need a new DSC for each portal?",
              "answer": "No, the same certificate can be registered on multiple portals."
            }
          ]
        },
        "extraContent": [
          {
            "title": "DSC",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Anyone who needs to sign electronic filings or documents needs a DSC. Directors and subscribers of companies must have Class 3 DSCs before incorporation forms such as SPICe+ can be signed. Designated partners of LLPs need them for FiLLiP and annual forms. Taxpayers whose accounts are audited need them for income tax and GST filings, and bidders in e-tenders need Sign + Encrypt certificates.</p>\n\n<p>Professionals such as chartered accountants, company secretaries and cost accountants need DSCs to certify and file forms for clients. Importers and exporters use them for DGFT and ICEGATE, and many government portals now require them for authorised signatories.</p>\n\n<p>If you are starting a company, plan to get DSCs for every proposed director at the very beginning, because name approval, SPICe+ and DIN-related forms all depend on them. If your business files returns regularly, keep the token safe and set a reminder for renewal so that filings are not delayed.</p>\n\n<p>Individuals who only need to e-verify an income tax return can often use Aadhaar OTP instead, so check what the portal requires before buying a certificate.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legally valid digital signature under the IT Act, 2000</li>\n<li>Works across MCA, GST, Income Tax, DGFT and many tender portals</li>\n<li>Guided video KYC or Aadhaar e-KYC, so no physical visit is usually required</li>\n<li>Choice of Sign only or Sign + Encrypt to suit filings and tenders</li>\n<li>Saves time on every filing once registered on the relevant portals</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>Once you have your DSC, register it on the MCA portal and other portals, then use it for incorporation, DIN and tax filings.</p>\n\n<p><strong>Related services:</strong> Organisation DSC, Pvt Ltd Company registration, LLP registration, DIR-3 KYC and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying for a lower class certificate that portals no longer accept.</li>\n<li>Entering a name or email that does not match PAN or Aadhaar, causing rejection.</li>\n<li>Forgetting to register the DSC on the MCA or GST portal before filing.</li>\n<li>Letting the certificate expire just before a filing deadline.</li>\n<li>Sharing the token or password with others.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>A DSC is typically issued within a day or two after video verification once documents are correct. Fees depend on the Certifying Authority, class and validity, and sources differ on validity options (one to three years).</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> use the same name, email and mobile as on your PAN and Aadhaar, and register the certificate on every portal before the filing deadline.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Information Technology Act, 2000 gives digital signatures the same legal recognition as handwritten signatures when created with a valid certificate issued by a licensed Certifying Authority. The Controller of Certifying Authorities licenses and supervises these authorities. Government portals use DSCs to verify the identity of the person filing and to ensure the integrity of the filed document. This background explains why regulators insist on Class 3 certificates for company, LLP and tax filings, and why the certificate and token must be treated as a personal signature.</p>"
          }
        ],
        "seo": {
          "metaTitle": "DSC | JR Compliance",
          "metaDescription": "A Digital Signature Certificate (DSC) is the electronic equivalent of your handwritten signature and identity proof. It lets you sign documents and file forms…",
          "canonicalUrl": "/corporate/dsc-certificate",
          "keywords": "DSC, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "organisation-dsc",
      "matchSlugs": [
        "organisation-dsc"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 22,
        "originalRow": 27,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Organisation DSC",
        "menuLabel": "Organisation DSC",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "An Organisation DSC is a Class 3 digital signature certificate issued to an authorised signatory in the name of an organisation, such as a company, LLP, firm or institution. It allows that person to sign electronic documents and filings on behalf of the entity, and it identifies both the individual and the organisation in the certificate."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Organisation DSC?",
          "paragraphs": [
            {
              "text": "An Organisation DSC is a Class 3 digital signature certificate in which the certificate holder is an individual acting for a named organisation. Where a standard DSC identifies only a person, an organisation DSC adds the entity's name, so a signature made with it shows that the person signed on behalf of the organisation."
            },
            {
              "text": "Like any DSC it has the same legal validity under the Information Technology Act, 2000 and is issued by Certifying Authorities licensed by the CCA. Sources we reviewed note that organisation DSCs are used for e-tenders, GST and other portal filings, and for signing electronic documents in the entity's name."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How is an organisation DSC different from an individual DSC?",
              "answer": "It includes the organisation's name and needs extra documents such as an authorisation letter and incorporation proof."
            },
            {
              "question": "Who can be the authorised signatory?",
              "answer": "A director, partner or other person authorised by the organisation."
            },
            {
              "question": "Is it Class 3?",
              "answer": "Yes, Class 3 is the class now issued."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Organisation DSC",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies, LLPs, partnership firms, trusts and government-linked institutions that want a designated person to sign on their behalf need an organisation DSC. Procurement and tender teams use it to submit bids, finance teams use it for tax and regulatory filings, and compliance officers use it for portal submissions.</p>\n\n<p>It is particularly useful for organisations that bid regularly for government or PSU tenders, where the portal may require the organisation's identity to appear in the certificate. It also simplifies management when the signatory changes, because the organisation can authorise a new person and obtain a fresh certificate.</p>\n\n<p>If your only need is for directors to sign MCA forms, individual Class 3 DSCs for directors may be enough. Check the portal requirements before choosing.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Signatures that carry the organisation's identity along with the signatory's</li>\n<li>Suited for e-tenders, GST and MCA filings</li>\n<li>Clear authorisation trail through the letter of authority</li>\n<li>Easy replacement when the authorised person changes</li>\n<li>Issued by licensed Certifying Authorities with legal validity</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After issue, register the DSC on the portals where it will be used.</p>\n\n<p><strong>Related services:</strong> DSC, GST Registration, GeM Registration, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the authorisation letter or using one without proper company authority.</li>\n<li>Applying in the wrong entity name or PAN.</li>\n<li>Not revoking the certificate when the signatory leaves.</li>\n<li>Using an individual DSC for an e-tender that needs an organisation certificate.</li>\n<li>Ignoring the Certifying Authority's validity and renewal reminders.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Issuance typically takes a few days because the organisation's documents and the signatory's identity are both verified. Fees depend on the Certifying Authority and validity.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare the authorisation letter on company letterhead and the organisation's PAN and incorporation proof in advance, and keep a record of who holds the token.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Under the Information Technology Act, 2000, digital signature certificates can identify the holder along with the organisation they represent. Organisation certificates are used when filings or contracts need to carry the entity's identity, for example in e-tenders and company filings. The Certifying Authority verifies the entity through documents such as PAN and incorporation proof, and the authorised signatory through KYC. This matters because it creates a clear chain of authority: if the person leaves, the certificate can be revoked so that the organisation is not bound by someone who is no longer authorised.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A manufacturing company bids regularly for government tenders and obtains an organisation DSC for its authorised signatory so that bids carry the company's identity.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A finance manager who files GST and MCA returns is replaced, and the company revokes the old certificate and issues a new one to the new signatory.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An LLP with several partners decides to use one authorised signatory for portal filings instead of sharing individual tokens.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Organisation DSC | JR Compliance",
          "metaDescription": "An Organisation DSC is a Class 3 digital signature certificate issued to an authorised signatory in the name of an organisation, such as a company, LLP, firm…",
          "canonicalUrl": "/corporate/organisation-dsc",
          "keywords": "Organisation DSC, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "addition-of-director",
      "matchSlugs": [
        "addition-of-director"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 23,
        "originalRow": 28,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Addition of Director",
        "menuLabel": "Addition of Director",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Adding a director is one of the most common changes a company makes. A director can be added in two ways: the Board can appoint an additional director if the Articles permit (Section 161), or the shareholders can appoint one at a general meeting (Section 152). The new director must have a DIN and give consent and declarations, and the company must file Form DIR-12 with the Registrar within 30 days. A private company must have between two and fifteen directors, and at least one must be resident in India."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Addition of Director?",
          "paragraphs": [
            {
              "text": "Appointment of a director is the process by which a company's Board or shareholders appoint an individual to the Board under the Companies Act, 2013. Only an individual can be a director, as Section 149 provides. A director owes duties to the company and is responsible for its governance, and is therefore subject to qualification and disqualification rules, including Section 164."
            },
            {
              "text": "An additional director is appointed by the Board if the Articles authorise it, and holds office until the next annual general meeting, when the shareholders must regularise the appointment. A director appointed by shareholders at a general meeting follows the general appointment rules. Where the company has a Nomination and Remuneration Committee, its recommendation is needed."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Within how many days must DIR-12 be filed?",
              "answer": "Within 30 days of the appointment."
            },
            {
              "question": "Can the Board appoint a director directly?",
              "answer": "Yes, as an additional director if the Articles permit."
            },
            {
              "question": "What is the director limit for a private company?",
              "answer": "Minimum two and maximum fifteen, extendable by special resolution."
            },
            {
              "question": "Does the new director need a DIN?",
              "answer": "Yes, and their DIR-3 KYC should be current."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Addition of Director",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies add directors when founders bring in co-founders, investors ask for nominee seats, the company needs independent or executive directors, a director resigns and must be replaced, or the board must meet the minimum number of directors under the Act. Startups raising funds frequently add investor nominees as part of the term sheet.</p>\n\n<p>It is also essential for growing companies that need to meet governance requirements. For example, certain companies need independent directors and a woman director, and a company with only two directors may want to add a third for quorum and risk management.</p>\n\n<p>Individuals who are invited to join a board should check that their DIN is active, their KYC is up to date and that they are not disqualified. The company should check the AOA and any shareholder agreement before appointment.</p>\n\n<p>If you are unsure whether the Board can appoint directly or shareholder approval is needed, a quick review of the Articles settles the question.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct appointment route based on the Articles</li>\n<li>Complete set of consents and declarations (DIR-2, DIR-8, MBP-1)</li>\n<li>Timely DIR-12 filing within 30 days to keep MCA records accurate</li>\n<li>Regularisation of additional directors at the next AGM</li>\n<li>Compliance with director limits and residency requirements</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After appointment, update statutory registers, issue the letter of appointment and, if required, file other forms.</p>\n\n<p><strong>Related services:</strong> DSC, DIR-3 KYC, Removal of Director, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Appointing without checking whether the Articles allow Board appointment.</li>\n<li>Missing the DIR-12 filing deadline of 30 days.</li>\n<li>Not obtaining DIR-2, DIR-8 and MBP-1 from the director.</li>\n<li>Forgetting to regularise an additional director at the next AGM.</li>\n<li>Appointing a director who is disqualified or without a valid DIN.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>DIR-12 must be filed within 30 days of the appointment. Costs are the filing fee based on authorised capital plus professional fees, and a DIN fee only if the person has none.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> collect DIR-2, DIR-8 and MBP-1 before the Board meeting, and ensure the director's DIR-3 KYC is up to date.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Sections 149, 152, 161 and 164 of the Companies Act, 2013 govern the number of directors, their appointment and their disqualification, and Rule 12A and related rules deal with DINs and KYC. Section 149 requires directors to be individuals and sets minimum and maximum numbers, while Section 161 lets the Board appoint additional directors if the Articles permit. These provisions exist to ensure that every company has accountable individuals at the helm and that the public record shows who they are. Timely DIR-12 filing keeps that record reliable.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Addition of Director | JR Compliance",
          "metaDescription": "Adding a director is one of the most common changes a company makes. A director can be added in two ways: the Board can appoint an additional director if the…",
          "canonicalUrl": "/corporate/addition-of-director",
          "keywords": "Addition of Director, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "removal-of-director",
      "matchSlugs": [
        "removal-of-director"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 24,
        "originalRow": 29,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Removal of Director",
        "menuLabel": "Removal of Director",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "A director can leave the Board in two ways: by resignation under Section 168, or by removal by shareholders before the end of the term under Section 169. Both routes end with the company filing Form DIR-12 with the Registrar of Companies, and a resigning director also files Form DIR-11. The change is reflected in the MCA master data only after DIR-12 is filed; the director's own DIR-11 does not remove the name on its own."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Removal of Director?",
          "paragraphs": [
            {
              "text": "Removal of a director is the cessation of a director's office before the term ends, by shareholders passing an ordinary resolution at a general meeting after special notice, as provided in Section 169 of the Companies Act, 2013. It differs from resignation under Section 168, where the director leaves voluntarily by giving notice to the company."
            },
            {
              "text": "Removal requires the shareholders' action; the Board cannot remove a director on its own. A shareholder gives special notice to the company of the intention to move the resolution, the Board calls a general meeting and the resolution is passed by a simple majority. Because removal can be contentious, the process should be followed carefully, and the sources we reviewed give limited detail on hearing rights, which should be confirmed against the Act."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Can the Board remove a director?",
              "answer": "No. Removal under Section 169 needs an ordinary resolution of shareholders after special notice."
            },
            {
              "question": "Who files DIR-11 and DIR-12?",
              "answer": "The resigning director files DIR-11; the company files DIR-12."
            },
            {
              "question": "Is the director removed from MCA records after DIR-11?",
              "answer": "No. The records change only after DIR-12 is filed."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Removal of Director",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service helps companies and directors when a director's role is ending. Founders who are parting ways, investors who are exiting, directors who change jobs or want to step down, companies that restructure their boards, and shareholders who want to remove a director for non-performance all need it.</p>\n\n<p>It is especially important when there are disagreements. A clean, properly documented resignation or removal protects the company and the director, because the MCA records and statutory registers show the correct position and avoid later disputes about who was responsible for filings during a given period.</p>\n\n<p>Directors who resign should also ensure that DIR-11 is filed and that the company files DIR-12. Companies should check the shareholders' agreement and Articles, because some include special rights for investor directors that affect removal.</p>\n\n<p>If you are not sure which route applies, a short consultation can confirm the right sequence and the documents to prepare.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct choice between resignation (Section 168) and removal (Section 169)</li>\n<li>Complete documentation: special notice, resolutions and DIR-11/DIR-12</li>\n<li>Timely DIR-12 filing so MCA records are updated</li>\n<li>Compliance with minimum director requirements after the exit</li>\n<li>Reduced risk of disputes over who held office when</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the exit, update statutory registers and consider appointing a new director.</p>\n\n<p><strong>Related services:</strong> Addition of Director, DIR-3 KYC, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Filing only the director's DIR-11 and forgetting the company's DIR-12.</li>\n<li>Trying to remove a director by Board resolution alone.</li>\n<li>Letting the board fall below the minimum number of directors.</li>\n<li>Not checking the shareholders' agreement for special nomination rights.</li>\n<li>Delaying DIR-12 beyond 30 days.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>DIR-12 must be filed within 30 days of the change. Removal under Section 169 also needs time for special notice and the general meeting.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> for a resignation, make sure both the director's DIR-11 and the company's DIR-12 are filed, because the MCA record changes only after DIR-12.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 168 of the Companies Act, 2013 allows a director to resign by notice, and Section 169 allows shareholders to remove a director before the end of the term through an ordinary resolution after special notice. These sections balance two interests: a director's freedom to leave and the shareholders' right to control who governs the company. Because directors have statutory duties and liabilities, the dates of joining and leaving matter; accurate MCA records through DIR-12 protect both the company and the individual.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A co-founder is leaving the startup, so the company records the resignation, files DIR-11 and DIR-12 and updates its registers.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>Shareholders lose confidence in a director and use the Section 169 route, giving special notice and passing an ordinary resolution at a general meeting.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An investor nominee wants to step down after exiting the company and needs the MCA record to show the correct end date.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Removal of Director | JR Compliance",
          "metaDescription": "A director can leave the Board in two ways: by resignation under Section 168, or by removal by shareholders before the end of the term under Section 169. Both…",
          "canonicalUrl": "/corporate/removal-of-director",
          "keywords": "Removal of Director, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "dir-3-kyc",
      "matchSlugs": [
        "dir-3-kyc"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 25,
        "originalRow": 30,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "DIR 3 KYC",
        "menuLabel": "DIR 3 KYC",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "DIR-3 KYC is the Know-Your-Customer filing that every individual holding an approved DIN must complete with the Ministry of Corporate Affairs, whether or not they are currently a director. It confirms the DIN holder's personal details, mobile number and email through OTP verification. If it is not filed by the due date, the DIN is marked 'Deactivated due to non-filing of DIR-3 KYC', and the person cannot sign MCA forms until it is reactivated with a fee of Rs 5,000."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is DIR 3 KYC?",
          "paragraphs": [
            {
              "text": "DIR-3 KYC is required under Rule 12A of the Companies (Appointment and Qualification of Directors) Rules, 2014 from every person allotted a Director Identification Number. The filing keeps the MCA database of directors accurate and verified, and it applies to all DIN holders, including those who have resigned but have not surrendered their DIN."
            },
            {
              "text": "There are two forms. The DIR-3 KYC e-form is used for the first filing or when details such as mobile number or email change; it needs identity proof, address proof and a photograph, along with a digital signature and certification by a CA, CS or cost accountant. The DIR-3 KYC-WEB form is a simplified web-based process for repeat filers with no change, and it needs only OTP verification of the registered mobile number and email, with a zero-rupee challan."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who must file DIR-3 KYC?",
              "answer": "Every individual holding an approved DIN."
            },
            {
              "question": "What happens if it is missed?",
              "answer": "The DIN is deactivated and a fee of Rs 5,000 is payable to reactivate it."
            },
            {
              "question": "Is it annual or every three years?",
              "answer": "Older guides say annual (30 September); newer 2026 sources say once every three financial years with no change. Confirm on mca.gov.in."
            },
            {
              "question": "Do I need documents each year?",
              "answer": "The web-based DIR-3 KYC-WEB needs only OTP verification when nothing has changed."
            }
          ]
        },
        "extraContent": [
          {
            "title": "DIR 3 KYC",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every director and every person who holds a DIN needs to complete DIR-3 KYC. That includes directors of private and public companies, designated partners of LLPs, persons who have resigned but still have an active DIN, and people who obtained a DIN for a future directorship but have not yet been appointed.</p>\n\n<p>Companies also have a direct interest. If a director's DIN is deactivated, the director cannot sign forms, and the company may be unable to file annual returns, appointment forms or other statutory filings on time, which can lead to late fees and penalties.</p>\n\n<p>If you hold directorships in several companies, you file one KYC for your DIN, not one per company. If you no longer want a DIN, you can apply to surrender it after resigning from all directorships.</p>\n\n<p>Keeping your mobile number and email updated and unique is important, because the OTP verification depends on them.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Avoids DIN deactivation and the Rs 5,000 reactivation fee</li>\n<li>OTP-verified, error-free filing</li>\n<li>Tracking of the correct due date under the latest MCA notification</li>\n<li>Protects the company's ability to file forms signed by the director</li>\n<li>One filing covers all companies linked to the DIN</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, keep the acknowledgement and watch for the next due date.</p>\n\n<p><strong>Related services:</strong> DSC, Addition of Director, Removal of Director, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Assuming it is only for current directors; resigned directors with active DINs must also file.</li>\n<li>Using a mobile number or email shared with another DIN holder.</li>\n<li>Missing the due date and finding the DIN deactivated just before a filing.</li>\n<li>Using the web-based form when details have changed, instead of the e-form.</li>\n<li>Relying on old guides for the due date.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The web-based DIR-3 KYC-WEB takes minutes with OTP verification, while the e-form takes longer because of attachments and certification. There is no government fee if filed on time, and Rs 5,000 to reactivate a deactivated DIN.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep your registered mobile and email active, and verify the current due date on mca.gov.in, since newer sources describe a three-year cycle.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "DIR 3 KYC | JR Compliance",
          "metaDescription": "DIR-3 KYC is the Know-Your-Customer filing that every individual holding an approved DIN must complete with the Ministry of Corporate Affairs, whether or not…",
          "canonicalUrl": "/corporate/dir-3-kyc",
          "keywords": "DIR 3 KYC, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "inc-20a",
      "matchSlugs": [
        "inc-20a"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 26,
        "originalRow": 31,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "INC 20A",
        "menuLabel": "INC 20A",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Form INC-20A is the director's declaration of commencement of business under Section 10A of the Companies Act, 2013 (Rule 23A). A company with share capital incorporated on or after 2 November 2018 cannot start business or exercise borrowing powers until this declaration is filed with the Registrar. It must be filed within 180 days of incorporation and must be supported by proof that every subscriber to the memorandum has paid for their shares."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is INC 20A?",
          "paragraphs": [
            {
              "text": "INC-20A is a declaration filed by a director with the Registrar confirming that every subscriber to the memorandum has paid the value of shares agreed to be taken, and that the company has verified its registered office. It is verified by a practising chartered accountant, company secretary or cost accountant. It applies to companies having share capital incorporated on or after 2 November 2018."
            },
            {
              "text": "Section 10A was introduced to prevent shell companies from beginning activity without capital actually being contributed. Without the declaration, the company cannot commence business or borrow, and the Registrar can take action to strike off the company if it appears to be inactive."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the INC-20A deadline?",
              "answer": "Within 180 days of incorporation."
            },
            {
              "question": "Who certifies the form?",
              "answer": "A practising CA, CS or cost accountant."
            },
            {
              "question": "What happens if it is missed?",
              "answer": "Penalties apply and the Registrar may start strike-off action; sources differ on the late-fee multiplier."
            },
            {
              "question": "Who needs it?",
              "answer": "Companies with share capital incorporated on or after 2 November 2018."
            }
          ]
        },
        "extraContent": [
          {
            "title": "INC 20A",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every newly incorporated private company, public company or OPC with share capital that wants to start business or borrow money needs INC-20A. It is especially relevant for startups that incorporate first and then take time to raise capital, because the 180-day deadline can pass quickly.</p>\n\n<p>Founders who deposit subscription money late, or who use a different account or names that do not match the subscribers, often run into problems at the filing stage. It is therefore wise to deposit the capital soon after incorporation and keep the bank statement ready.</p>\n\n<p>Companies that missed the deadline should file as early as possible, paying the additional fee, to avoid penalties and possible strike-off proceedings.</p>\n\n<p>If your company was incorporated before 2 November 2018, this requirement does not apply to it in the same way, so check your date of incorporation.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Allows the company to legally start business and borrow</li>\n<li>Avoids a Rs 50,000 penalty on the company and daily penalties on officers</li>\n<li>Complete document set: board resolution, bank proof and professional certification</li>\n<li>Checks that subscribers' payments match the subscribers' names</li>\n<li>Protects against strike-off action</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After INC-20A, the company can begin operations and borrow.</p>\n\n<p><strong>Related services:</strong> Post Compliance, ADT-1, Annual Compliance, GST Registration and Increase of Authorised Capital.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Depositing subscription money in a personal account or not matching subscribers' names.</li>\n<li>Forgetting to verify the registered office through INC-22.</li>\n<li>Waiting until the last days of the 180-day window.</li>\n<li>Starting business or borrowing before filing.</li>\n<li>Not keeping the bank statement and board resolution on record.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>INC-20A must be filed within 180 days of incorporation. Costs are the filing fee based on authorised capital plus professional certification charges. Late filing triggers extra fees and a Rs 50,000 penalty on the company.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> deposit subscription money as soon as the company is incorporated, from accounts matching each subscriber's name, and keep the bank statement ready.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 10A of the Companies Act, 2013, inserted in 2019, requires companies with share capital to file a declaration that subscribers have paid for their shares before they commence business or exercise borrowing powers. It was introduced to curb shell companies that incorporate without bringing in capital. The Registrar can also treat a company that has not filed the declaration as inactive and consider striking it off. Understanding this purpose helps founders see why bank statements and certification are central to the filing.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A newly incorporated startup raises its first seed money and finds that INC-20A must be filed before it can borrow or start operations.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A founder deposited subscription money late and needs a bank statement and certification to file within the 180-day window.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company that missed the deadline wants to file with additional fees to avoid strike-off action.</p>"
          }
        ],
        "seo": {
          "metaTitle": "INC 20A | JR Compliance",
          "metaDescription": "Form INC-20A is the director's declaration of commencement of business under Section 10A of the Companies Act, 2013 (Rule 23A). A company with share capital…",
          "canonicalUrl": "/corporate/inc-20a",
          "keywords": "INC 20A, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "adt-1",
      "matchSlugs": [
        "adt-1"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 27,
        "originalRow": 32,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "ADT -1",
        "menuLabel": "ADT -1",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Form ADT-1 informs the Registrar of Companies about the appointment of a statutory auditor under Section 139 of the Companies Act, 2013. It must be filed within 15 days of the appointment. For a newly incorporated company, the Board appoints the first auditor within 30 days of incorporation; for later years, the shareholders appoint the auditor at the AGM, usually for a five-year term, and ADT-1 is filed within 15 days of the meeting."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ADT -1?",
          "paragraphs": [
            {
              "text": "ADT-1 is the e-form by which a company intimates the Registrar of the appointment or re-appointment of its statutory auditor under Section 139 read with Rule 4 of the Companies (Audit and Auditors) Rules, 2014. The auditor is an independent chartered accountant or firm who audits the company's financial statements and reports to shareholders."
            },
            {
              "text": "For the first auditor, the Board appoints within 30 days of incorporation, and the auditor holds office until the conclusion of the first AGM. If the Board fails to do so, the members can appoint the auditor at an extraordinary general meeting within 90 days. For later appointments, the shareholders appoint the auditor at the AGM for a five-year term."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How soon must ADT-1 be filed?",
              "answer": "Within 15 days of the appointment."
            },
            {
              "question": "Who appoints the first auditor?",
              "answer": "The Board, within 30 days of incorporation."
            },
            {
              "question": "Is ADT-1 needed for the first auditor?",
              "answer": "Most sources say yes; one says not mandatory. We confirm the current rule."
            },
            {
              "question": "How long is an auditor's term?",
              "answer": "Generally five years for auditors appointed at an AGM."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ADT -1",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every company needs ADT-1: newly incorporated companies when they appoint the first auditor, existing companies when they appoint or re-appoint an auditor at the AGM, and companies that change auditors for any reason, including resignation or removal.</p>\n\n<p>Startups often overlook it because the first auditor is appointed by the Board soon after incorporation and the filing seems like a formality. Missing it can create default entries in the MCA record and late fees.</p>\n\n<p>If you are unsure whether ADT-1 is needed for the first auditor, consult the current rules or ask us. Companies should also remember to ensure that the auditor meets the eligibility conditions and gives written consent before the appointment, since an invalid appointment can cause audit and filing problems later.</p>\n\n<p>Companies that rotate auditors should track the five-year term and the rules on rotation, where applicable.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Timely intimation to the ROC within 15 days</li>\n<li>Complete documentation: consent, eligibility certificate and resolutions</li>\n<li>Compliance with the 30-day first-auditor rule after incorporation</li>\n<li>Avoids late filing fees and MCA default records</li>\n<li>Supports a smooth audit and annual filing cycle</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After ADT-1, the auditor begins the audit cycle, and the company proceeds to the AGM and annual filings.</p>\n\n<p><strong>Related services:</strong> Post Compliance, INC-20A, Annual Compliance and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Appointing an auditor without obtaining written consent and the Section 141 eligibility certificate.</li>\n<li>Missing the 30-day Board appointment window for the first auditor.</li>\n<li>Forgetting to file a fresh ADT-1 after the AGM re-appointment.</li>\n<li>Assuming the first-auditor ADT-1 is optional without checking the latest rules.</li>\n<li>Choosing a disqualified auditor.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>ADT-1 must be filed within 15 days of the appointment, and the first auditor should be appointed within 30 days of incorporation. Costs are the filing fee plus professional charges; late filing attracts additional fees.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> get the auditor's consent and eligibility certificate before the Board meeting, and calendar the 15-day deadline.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 139 of the Companies Act, 2013 and the Companies (Audit and Auditors) Rules, 2014 regulate the appointment of auditors, and Section 141 sets eligibility and disqualifications. An independent audit is a core investor-protection mechanism, so the Registrar must be told promptly who the auditor is. The five-year term and rotation rules are designed to maintain independence. ADT-1 creates the public record of the appointment, and delays can indicate poor governance.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A new private company appoints its first auditor by Board resolution within 30 days and files ADT-1 within 15 days.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>At the AGM, shareholders re-appoint the existing auditor for the next term and the company files a fresh ADT-1.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company changes auditors after a resignation and must record the new appointment with the Registrar.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ADT -1 | JR Compliance",
          "metaDescription": "Form ADT-1 informs the Registrar of Companies about the appointment of a statutory auditor under Section 139 of the Companies Act, 2013. It must be filed…",
          "canonicalUrl": "/corporate/adt-1",
          "keywords": "ADT -1, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "co-name-change",
      "matchSlugs": [
        "co-name-change"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 28,
        "originalRow": 33,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Co. Name Change",
        "menuLabel": "Co. Name Change",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "A company can change its name under Section 13 of the Companies Act, 2013 by passing a special resolution at a general meeting and obtaining the approval of the Central Government, which is handled through the Regional Director and the Registrar. The new name is first reserved through the RUN service on the MCA portal. The special resolution is filed in Form MGT-14 within 30 days, Form INC-24 is then filed for approval, and on approval the Registrar issues a fresh Certificate of Incorporation in the new name."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Co. Name Change?",
          "paragraphs": [
            {
              "text": "Change of company name is the legal alteration of the name clause of a company's Memorandum of Association, and the corresponding Articles, under Sections 13 and 14 of the Companies Act, 2013. It requires shareholder approval by special resolution, which means at least 75% of the votes cast in favour, and then the approval of the Central Government."
            },
            {
              "text": "After approval, the Registrar enters the new name in the register of companies, notes the former name, and issues a new Certificate of Incorporation. The company's legal identity continues; only its name changes. Any pending legal proceedings by or against the company continue under the new name, and existing rights and obligations are not affected."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What approval is needed for a name change?",
              "answer": "A special resolution of shareholders and approval of the Central Government through INC-24."
            },
            {
              "question": "How long does the Registrar hold a reserved name?",
              "answer": "Sources describe about 20 days after RUN approval."
            },
            {
              "question": "Does the company's legal status change?",
              "answer": "No. Only the name changes; all rights and obligations continue."
            },
            {
              "question": "Does a company name approval protect my brand?",
              "answer": "No. Trademark protection is separate and needs a trademark registration."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Co. Name Change",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies that want to rebrand, change their business focus, align their name with a new trademark, resolve a dispute over a similar name or reflect a merger, acquisition or restructuring need this service. Startups that began with a working name and now want a more suitable brand, and companies converting from private to public or vice versa (where the name suffix changes) are typical users.</p>\n\n<p>It is also relevant for companies that have been told by a regulator, customer or marketplace that the existing name causes confusion with another business. The service helps you choose a name that will pass approval and avoid repeated rejections.</p>\n\n<p>A name change should be planned with the business: marketing materials, domain names, contracts, licences and registrations such as GST, FSSAI, IEC and bank accounts will all need updating. Companies with many licences should prepare a complete list before starting so that nothing is missed.</p>\n\n<p>If your intention is only to adopt a new brand for products, without changing the company's legal name, a trademark registration or trade name may be enough, and a company name change is not needed.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct sequence: RUN, special resolution, MGT-14 and INC-24</li>\n<li>Name checked against MCA rules and existing company names before filing</li>\n<li>Fresh Certificate of Incorporation in the new name</li>\n<li>Checklist for updating PAN, GST, bank, licences and contracts</li>\n<li>Reduced risk of repeated rejections and delays</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the new certificate is issued, update PAN and TAN, GST, bank accounts, licences, letterheads and websites.</p>\n\n<p><strong>Related services:</strong> RUN / Name Approval, Alteration of MOA/AOA, Change in PAN/TAN, Trademark Registration and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Choosing a name that is too similar to an existing company or trademark.</li>\n<li>Filing INC-24 before MGT-14 and the RUN approval.</li>\n<li>Forgetting to update PAN, GST and other registrations after approval.</li>\n<li>Missing the 30-day MGT-14 filing deadline.</li>\n<li>Assuming that a company name approval gives trademark rights.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The process involves name reservation, a general meeting and two filings, so allow several weeks overall; the MGT-14 must be filed within 30 days of the resolution. Costs include government fees for RUN, MGT-14 and INC-24, plus professional charges.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> run a trademark search at the same time as the RUN reservation, so that the name you obtain is also usable as a brand.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Co. Name Change | JR Compliance",
          "metaDescription": "A company can change its name under Section 13 of the Companies Act, 2013 by passing a special resolution at a general meeting and obtaining the approval of…",
          "canonicalUrl": "/corporate/co-name-change",
          "keywords": "Co. Name Change, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "alter-in-moa-aoa",
      "matchSlugs": [
        "alter-in-moa-aoa"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 29,
        "originalRow": 34,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Alter in MOA/AOA",
        "menuLabel": "Alter in MOA/AOA",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "The Memorandum of Association (MOA) states the fundamental conditions on which a company exists: its name, registered office state, objects, liability and capital. The Articles of Association (AOA) contain the rules for running the company internally. The MOA can be altered under Section 13 of the Companies Act, 2013 and the AOA under Section 14, in most cases by a special resolution passed at a general meeting, followed by filing Form MGT-14 within 30 days. An alteration takes effect only once it is registered."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Alter in MOA/AOA?",
          "paragraphs": [
            {
              "text": "Alteration of MOA and AOA is the legal process of amending a company's constitutional documents. The MOA is the charter of the company and can be altered only as permitted by Section 13 for the name, situation (registered office state), objects and liability clauses, while the capital clause is altered under Section 61. The AOA, which sets out internal management rules such as director appointment, meeting procedures and share transfers, is altered under Section 14."
            },
            {
              "text": "Almost every alteration needs a special resolution of shareholders, meaning at least 75% of votes cast in favour. The main exception is an increase of authorised capital, which is done by ordinary resolution under Section 61. Some alterations need extra approvals: a name change needs Central Government approval (INC-24), a move of the registered office to another state needs Regional Director approval (INC-23 followed by INC-28), and changes to the objects clause must be filed with MGT-14 within 30 days. One of the sources we reviewed mentions an additional form for the objects clause that others do not, so current MCA rules should be checked."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What approval is needed to alter the Articles?",
              "answer": "A special resolution of shareholders under Section 14, followed by MGT-14."
            },
            {
              "question": "Within how many days must MGT-14 be filed?",
              "answer": "Within 30 days of passing the resolution."
            },
            {
              "question": "Does an increase in authorised capital need a special resolution?",
              "answer": "No, an ordinary resolution under Section 61 is enough, if the Articles permit."
            },
            {
              "question": "When does the alteration take effect?",
              "answer": "Only when it is registered."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Alter in MOA/AOA",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies need this service when they want to expand or change their business activities, adopt a new name, move their registered office to another state, change their liability structure or revise internal governance rules. It is often needed before fundraising, when investors ask for changes to the Articles such as protective provisions, board rights or share transfer restrictions.</p>\n\n<p>Startups that have outgrown their original objects clause, companies preparing for a merger or restructuring, and companies that want to convert between private and public status all rely on alterations of MOA and AOA. It is also needed when a company adopts the Articles recommended by a new shareholders' agreement.</p>\n\n<p>If you are not sure whether your plan needs an alteration, we review the existing MOA and AOA and tell you whether the current objects and rules already permit what you want to do. In many cases only the AOA needs a change, which is simpler than altering the MOA.</p>\n\n<p>Companies should also review their AOA periodically, because outdated Articles can block routine actions such as Board appointments of additional directors.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Clause-wise plan with the correct approval route for each change</li>\n<li>Properly drafted special resolutions, notices and explanatory statements</li>\n<li>MGT-14 and related forms filed in the right order and on time</li>\n<li>Altered MOA/AOA that match your business and investor requirements</li>\n<li>Avoids rejected filings and invalid alterations</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, update statutory records and communicate changes to banks and stakeholders.</p>\n\n<p><strong>Related services:</strong> Company Name Change, ROC / Address Change, Increase of Authorised Capital, Company Conversion and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Changing the objects without checking the correct filing route.</li>\n<li>Forgetting the MGT-14 filing or filing it late.</li>\n<li>Altering the AOA in a way that conflicts with the Companies Act or a shareholders' agreement.</li>\n<li>Using outdated templates.</li>\n<li>Assuming the alteration is effective as soon as the resolution is passed.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Allow a few weeks from the resolution to registration, longer if Regional Director approval is needed. Costs include MCA filing fees and professional charges, plus stamp duty for certain capital changes.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare the full set of notices, explanatory statement and altered documents before calling the meeting, so the filing can follow quickly.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Sections 13 and 14 of the Companies Act, 2013 control how a company's constitution can be changed, and Section 61 deals with capital alterations. The special resolution requirement protects minority shareholders by ensuring that fundamental changes have broad support. Registration with the Registrar makes the change effective, because the public relies on the registered MOA and AOA. This background explains why informal changes or unregistered resolutions have no legal effect.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Alter in MOA/AOA | JR Compliance",
          "metaDescription": "The Memorandum of Association (MOA) states the fundamental conditions on which a company exists: its name, registered office state, objects, liability and…",
          "canonicalUrl": "/corporate/alter-in-moa-aoa",
          "keywords": "Alter in MOA/AOA, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "change-in-company-pan-tan",
      "matchSlugs": [
        "change-in-company-pan-tan"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 30,
        "originalRow": 35,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Change in Company Pan/Tan",
        "menuLabel": "Change in Company Pan/Tan",
        "sortOrder": 9,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "A company's PAN and TAN records can be corrected or updated when its name, address or other details change. The PAN correction is requested by filing the 'Request for New PAN Card or/and Changes or Correction in PAN Data' application with one of the two authorised providers, Protean eGov Technologies (formerly NSDL) or UTIITSL, either online or offline. Companies usually need it after a name change or a change of registered office."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Change in Company Pan/Tan?",
          "paragraphs": [
            {
              "text": "PAN (Permanent Account Number) is the unique 10-character identifier issued by the Income Tax Department to taxpayers, including companies, firms and trusts. TAN (Tax Deduction and Collection Account Number) is the identifier for persons responsible for deducting or collecting tax at source and is quoted on challans and TDS returns. PAN cannot replace TAN where TAN is required."
            },
            {
              "text": "A change or correction request updates the entity's demographic details in the Income Tax database and, if requested, issues a reprinted PAN card. Details that commonly change include the entity name, registered address, contact details and the authorised signatory. Mismatches between PAN, GST, bank and MCA records can cause problems in tax filing, TDS credit, refunds and bank KYC."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who processes PAN corrections?",
              "answer": "Protean (NSDL) and UTIITSL only."
            },
            {
              "question": "What document is needed after a name change?",
              "answer": "The registration certificate showing the new name."
            },
            {
              "question": "Is the form still 49A?",
              "answer": "Most guides say so; one source says Form 93 replaced it from April 2026. Confirm with the provider."
            },
            {
              "question": "Do I need to correct TAN separately?",
              "answer": "Yes, TAN details are maintained separately; confirm the current process with the Income Tax Department."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Change in Company Pan/Tan",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies that have changed their name, shifted their registered office, changed authorised signatories or found errors in their PAN or TAN details need this service. It is also relevant after a merger, conversion or restructuring that changes the entity's legal details.</p>\n\n<p>Businesses that file TDS returns regularly should take special care. If the TAN details do not match the PAN or the company name, TDS credit may not be matched correctly in the deductee's Form 26AS, and notices can follow. Correcting mismatches early saves rework later.</p>\n\n<p>It is useful as well for companies applying for bank loans, tenders or licences that require consistent records across PAN, GST and MCA. If the PAN data is out of date, the verification systems may reject your application.</p>\n\n<p>Companies should also review their records after any significant change and make updates across all registrations together.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Single point of support for aligning PAN and TAN records with MCA and GST</li>\n<li>Correct application category and supporting documents</li>\n<li>Reduced risk of TDS credit mismatches and notices</li>\n<li>Cleaner KYC with banks and regulators</li>\n<li>Guidance on the changing form numbers (Form 49A vs Form 93)</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After correction, update GST, bank and other records, and check Form 26AS.</p>\n\n<p><strong>Related services:</strong> Company Name Change, ROC / Address Change, PAN Registration, TDS Return and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Changing the name or address at MCA but not updating PAN and TAN.</li>\n<li>Ticking more fields than needed in the correction form.</li>\n<li>Using the wrong category of the form for a non-individual entity.</li>\n<li>Submitting documents that do not match the claimed change.</li>\n<li>Ignoring TAN mismatches that affect TDS credits.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing time quoted by one source is about 15 days after documents reach the provider. The fee is set on the provider's portal.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> apply for the PAN update soon after the MCA change is approved, and check that the same details appear on your GST registration and bank KYC.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Income Tax Act, 1961 and the Income Tax Rules provide for PAN as the identifier for taxpayers and TAN for persons deducting or collecting tax at source. The systems that match TDS credits, refunds and returns depend on consistent PAN and TAN details. When a company's name or address changes at MCA, the tax database must be updated too, otherwise notices, refund failures and TDS mismatches can result. This is why correction is not a cosmetic step but part of keeping tax compliance reliable.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Change in Company Pan/Tan | JR Compliance",
          "metaDescription": "A company's PAN and TAN records can be corrected or updated when its name, address or other details change. The PAN correction is requested by filing the…",
          "canonicalUrl": "/corporate/change-in-company-pan-tan",
          "keywords": "Change in Company Pan/Tan, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "name-approval-run-filing",
      "matchSlugs": [
        "name-approval-run-filing"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 31,
        "originalRow": 36,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Name Approval/RUN filing",
        "menuLabel": "Name Approval/RUN filing",
        "sortOrder": 10,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "RUN, short for Reserve Unique Name, is the MCA service used to apply for approval and reservation of a company or LLP name, either before incorporation or for a change of name. You propose up to two names, pay the fee of Rs 1,000 as quoted by the sources, and the Central Registration Centre usually responds within one to two working days. An approved name is reserved for 20 days, within which you must file the SPICe+ form. Name reservation can also be done through Part A of SPICe+."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Name Approval/RUN filing?",
          "paragraphs": [
            {
              "text": "Name approval is the process by which the Ministry of Corporate Affairs, through the Central Registration Centre, checks that a proposed company name is unique and follows the naming rules before a company is incorporated or renamed. The name must be unique, not identical or confusingly similar to an existing company, LLP or registered trademark, and must end with the correct suffix such as 'Private Limited', 'Limited', 'OPC Private Limited' or 'LLP'."
            },
            {
              "text": "The name must not be offensive or suggest government patronage, and words such as Bank, Insurance, Reserve, Stock Exchange, National, Central or Government need prior approval of the relevant authority. Abbreviations are generally not allowed unless they are well established."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many names can I propose?",
              "answer": "Up to two in a RUN application."
            },
            {
              "question": "How long is the name reserved?",
              "answer": "Sources say 20 days after approval."
            },
            {
              "question": "Does company name approval protect my brand?",
              "answer": "No. Only a trademark registration protects the brand in trade."
            },
            {
              "question": "Can I use words like 'National' or 'Bank'?",
              "answer": "Only with prior approval from the relevant authority."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Name Approval/RUN filing",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Founders about to incorporate a private limited company, public company, OPC, LLP or Section 8 company need name approval. So do existing companies planning a name change. If you are launching a brand, it is wise to settle the name early, because documents such as the MOA and AOA depend on it.</p>\n\n<p>It is also useful for founders who have been rejected before and are unsure why. Common reasons include similarity with an existing name, use of restricted words, or inclusion of terms that suggest a government link.</p>\n\n<p>Brand-conscious founders benefit from combining RUN with a trademark search. A name that is available at the MCA but already registered as a trademark can lead to objections, legal notices or forced rebranding later.</p>\n\n<p>If your name is critical to your brand, you may want to prepare several alternatives. Since only two names can be proposed per RUN application, choosing them carefully increases the chance of approval.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Names pre-checked against MCA rules and existing company names</li>\n<li>Faster approval with fewer rejections</li>\n<li>Reservation timed to match the incorporation filing</li>\n<li>Awareness of trademark conflicts before you invest in branding</li>\n<li>Support for alternate names if the first choice is rejected</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>Once the name is approved, file SPICe+ (or the change-of-name forms) within the reservation window.</p>\n\n<p><strong>Related services:</strong> Pvt Ltd Company registration, LLP registration, Company Name Change, TM Search and Trademark Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Proposing names too close to existing companies or trademarks.</li>\n<li>Using restricted words without prior approval.</li>\n<li>Missing the reservation window and losing the name.</li>\n<li>Assuming MCA approval gives brand protection.</li>\n<li>Choosing a name that is hard to spell or not aligned with the business.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>RUN typically takes one to two working days for a decision, per the sources reviewed. The fee is Rs 1,000 as quoted, and the name is reserved for 20 days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare four to five alternatives and your DSCs and documents before applying, so that you can file SPICe+ promptly after the name is approved.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Companies (Incorporation) Rules, 2014 and the MCA's naming guidelines set out how company names are approved. The Registrar will reject names identical or too similar to existing companies or those that violate the Emblems and Names (Prevention of Improper Use) Act, 1950, for example suggesting government patronage. The RUN service provides a faster, standardised way to reserve a name. Because the Trade Marks Act, 1999 is a separate regime, company name approval and trademark protection operate independently.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>Two founders choose a brand name for their private limited company and use RUN to confirm it is available.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company that wants to rebrand reserves a new name before starting the name-change forms.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A founder whose name was rejected for being too similar to an existing company picks a differentiated name after a pre-check.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Name Approval/RUN filing | JR Compliance",
          "metaDescription": "RUN, short for Reserve Unique Name, is the MCA service used to apply for approval and reservation of a company or LLP name, either before incorporation or for…",
          "canonicalUrl": "/corporate/name-approval-run-filing",
          "keywords": "Name Approval/RUN filing, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "company-conversion",
      "matchSlugs": [
        "company-conversion"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 32,
        "originalRow": 37,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Company Conversion",
        "menuLabel": "Company Conversion",
        "sortOrder": 11,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Company conversion changes the legal type of an existing company. The best-documented route is converting a private limited company into a public limited company under Section 14 of the Companies Act, 2013. This is done by passing a special resolution to alter the Memorandum and Articles, removing the restrictions that define a private company and dropping 'Private' from the name, filing Form MGT-14 within 30 days, and then filing Form INC-27 with the Registrar (sources say within 15 days under Rule 33)."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Company Conversion?",
          "paragraphs": [
            {
              "text": "Conversion of a company is the process of changing its status by altering its Articles (and Memorandum) under Section 14 of the Companies Act, 2013 so that they either remove or include the restrictions that define a private company in Section 2(68). The company continues as the same legal entity, and the Registrar issues a fresh Certificate of Incorporation that reflects the new status and name."
            },
            {
              "text": "A private company restricts transfer of its shares, limits its members to 200 and cannot invite the public to subscribe to its securities. A public company has no such restrictions, needs at least seven members and three directors, and must follow stricter governance. When a private company converts to a public company, it must therefore satisfy those requirements, and its securities must be dematerialised after conversion."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What approval is needed for converting private to public?",
              "answer": "A special resolution (75% majority) to alter the MOA and AOA, followed by MGT-14 and INC-27."
            },
            {
              "question": "Within how many days must forms be filed?",
              "answer": "MGT-14 within 30 days of the resolution; INC-27 within 15 days under Rule 33, according to two sources."
            },
            {
              "question": "Is NCLT approval needed?",
              "answer": "Sources say yes for public to private under Section 14(2); verify the current authority."
            },
            {
              "question": "Does the company remain the same legal entity?",
              "answer": "Yes, only its status and name change."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Company Conversion",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies that have outgrown their original structure need this service. A private company planning an IPO, raising funds from the public or wanting to attract a broader shareholder base converts to public. A company that no longer wants public status converts to private. OPCs that have reached the limits of their structure and want to bring in investors convert to private or public companies. Partnership firms and LLPs may want to convert into a company for investors.</p>\n\n<p>It also suits companies that want a stronger governance framework as they scale, or that need a particular status to access certain markets or licences.</p>\n\n<p>Before converting, the company should consider the consequences: a public company faces more disclosures, minimum number of directors and members, and additional regulatory scrutiny. A careful review of timing and readiness avoids a conversion that creates more burdens than benefits.</p>\n\n<p>If you are unsure which route to take, we compare options, such as converting versus incorporating a new entity, and explain the tax and legal implications.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Smooth change of corporate status with the same legal entity</li>\n<li>Properly drafted resolutions and altered MOA/AOA</li>\n<li>MGT-14 and INC-27 filed in the right order and on time</li>\n<li>Fresh Certificate of Incorporation reflecting the new status</li>\n<li>Guidance on governance changes after conversion</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After conversion, comply with public company governance and update PAN, GST, bank and licences.</p>\n\n<p><strong>Related services:</strong> Public Limited Company registration, MOA/AOA Alteration, Company Name Change, Increase of Authorised Capital and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Converting without checking that the company can meet public company requirements (seven members, three directors).</li>\n<li>Not dematerialising securities after conversion to public.</li>\n<li>Missing the MGT-14 or INC-27 deadlines.</li>\n<li>Dropping 'Private' from the name without altering the MOA.</li>\n<li>Assuming the same procedure applies to all conversions.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Allow several weeks from the board decision to the fresh certificate. Costs include MCA fees, stamp duty on altered documents (state-specific) and professional charges.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare the lists of members and creditors and directors' declarations before the EGM, so INC-27 can be filed quickly.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Company Conversion | JR Compliance",
          "metaDescription": "Company conversion changes the legal type of an existing company. The best-documented route is converting a private limited company into a public limited…",
          "canonicalUrl": "/corporate/company-conversion",
          "keywords": "Company Conversion, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "increase-authorize-paid-up-capital",
      "matchSlugs": [
        "increase-authorize-paid-up-capital"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 33,
        "originalRow": 38,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Increase Authorize/Paid Up Capital",
        "menuLabel": "Increase Authorize/Paid Up Capital",
        "sortOrder": 12,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "A company can increase its authorised share capital under Section 61(1)(a) of the Companies Act, 2013 by passing an ordinary resolution at a general meeting, provided the Articles permit it. It then files Form SH-7 with the Registrar within 30 days along with the altered Memorandum, and pays the ROC fee and the state stamp duty on the increase. Paid-up capital is increased separately, by issuing and allotting new shares and filing Form PAS-3."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Increase Authorize/Paid Up Capital?",
          "paragraphs": [
            {
              "text": "Authorised share capital is the maximum amount of share capital a company is permitted to issue, as stated in the capital clause of its Memorandum. Issued capital is the part actually offered to shareholders, and paid-up capital is the amount received on those shares. Increasing authorised capital only raises the ceiling and does not itself bring in money or issue shares; paid-up capital increases only when new shares are allotted and paid for. Paid-up capital can never exceed authorised capital."
            },
            {
              "text": "An increase needs an ordinary resolution of shareholders, meaning a simple majority, under Section 61, as long as the Articles authorise it. If they do not, the Articles must first be altered by special resolution under Section 14. Form SH-7 is filed with the Registrar within 30 days, with the altered MOA, and stamp duty is payable on the increase as per the law of the state where the registered office is located. One source gives examples such as Rs 1,000 per Rs 5 lakh of increase in Maharashtra, 0.15% (capped at Rs 25 lakh) in Haryana and about 0.15% in Delhi, but these rates should be verified for the current year."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which resolution is needed to increase authorised capital?",
              "answer": "An ordinary resolution under Section 61, if the Articles permit."
            },
            {
              "question": "Within how many days must SH-7 be filed?",
              "answer": "Within 30 days of the resolution."
            },
            {
              "question": "Does increasing authorised capital bring in money?",
              "answer": "No. Money comes in only when shares are allotted and paid for."
            },
            {
              "question": "Is stamp duty payable?",
              "answer": "Yes, as per the state of the registered office; rates vary."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Increase Authorize/Paid Up Capital",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies that are about to raise funds from investors, issue ESOPs, make a bonus issue or bring in new shareholders need this service. If the authorised capital has been used up, the company cannot allot new shares until it increases the limit.</p>\n\n<p>Startups often incorporate with a small authorised capital to save on fees and stamp duty, and then need to increase it when they raise a funding round. Planning the increase before the term sheet is signed avoids delays at closing.</p>\n\n<p>Existing companies that want to expand operations, acquire assets or convert loans into equity also need to increase capital. Foreign-owned subsidiaries that receive additional foreign capital must increase capital and also report the allotment to the RBI.</p>\n\n<p>If you only want to raise funds without issuing new shares, such as through loans, you do not need to increase authorised capital.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Capital headroom ready for funding rounds, ESOPs and bonus issues</li>\n<li>Correct resolution, SH-7 filing and stamp duty for your state</li>\n<li>Clear separation between authorised and paid-up capital steps</li>\n<li>Support for PAS-3, share certificates and registers</li>\n<li>Avoids delays at investor closing</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the increase, allot shares as needed and file PAS-3.</p>\n\n<p><strong>Related services:</strong> MOA/AOA Alteration, Share Transfer, Annual Compliance, Seed Funding and Pitch Deck.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Increasing authorised capital without checking the Articles.</li>\n<li>Missing the 30-day SH-7 deadline.</li>\n<li>Underpaying stamp duty because of the wrong state rate.</li>\n<li>Confusing authorised capital with paid-up capital.</li>\n<li>Allotting shares before the increase is registered.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>SH-7 must be filed within 30 days of the resolution. Costs include ROC fees (which depend on the amount of the increase), state stamp duty and professional fees.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> increase the authorised capital a little above the immediate requirement so that another increase is not needed for the next round.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 61 of the Companies Act, 2013 allows a limited company with share capital to alter its capital clause, including increasing authorised capital, if its Articles permit. The capital clause is part of the Memorandum, so any change must be reported to the Registrar through Form SH-7. State stamp duty laws, derived from the Indian Stamp Act, 1899, impose duty on the increase, and rates vary by state. Understanding the difference between authorised, issued and paid-up capital avoids errors in fundraising documents.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Increase Authorize/Paid Up Capital | JR Compliance",
          "metaDescription": "A company can increase its authorised share capital under Section 61(1)(a) of the Companies Act, 2013 by passing an ordinary resolution at a general meeting…",
          "canonicalUrl": "/corporate/increase-authorize-paid-up-capital",
          "keywords": "Increase Authorize/Paid Up Capital, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "closure-of-a-company",
      "matchSlugs": [
        "closure-of-a-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 34,
        "originalRow": 39,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "Closure of a Company",
        "menuLabel": "Closure of a Company",
        "sortOrder": 13,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Closing a company properly is as important as starting it. The most common way to close an inactive company is voluntary strike-off under Section 248(2) of the Companies Act, 2013, by filing Form STK-2, which is processed centrally by C-PACE since April 2023. It needs a special resolution or the consent of 75% of members, a position of nil assets and liabilities, and an indemnity bond and affidavit from each director. The government fee quoted is Rs 10,000, and sources estimate about 60 to 110 days to three to six months to dissolution."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Closure of a Company?",
          "paragraphs": [
            {
              "text": "Closure, or strike-off, of a company means removing the company's name from the Register of Companies so that it ceases to exist legally. Under Section 248, the Registrar can strike off a defunct company on its own initiative (Form STK-1) or on the company's application (Form STK-2). Once the Registrar publishes the notice of dissolution in the Official Gazette (STK-7), the company stands dissolved."
            },
            {
              "text": "It is different from simply stopping operations or becoming dormant. A company that is merely inactive still has to file annual returns and pay compliance costs, and its directors remain responsible. A formally struck-off company no longer has those obligations, but directors' liability for undisclosed liabilities continues after dissolution under Section 248(7), so the closure must be done honestly and completely."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form is used for voluntary strike-off?",
              "answer": "Form STK-2 under Section 248(2)."
            },
            {
              "question": "What is the government fee?",
              "answer": "Sources quote Rs 10,000."
            },
            {
              "question": "How long does it take?",
              "answer": "Sources say roughly 60 to 110 days to three to six months."
            },
            {
              "question": "Does closure end directors' liability?",
              "answer": "Not for undisclosed liabilities; directors remain liable under Section 248(7)."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Closure of a Company",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>This service is for promoters of inactive or failed businesses, startups that never began operations, companies whose projects have ended, subsidiaries of foreign groups that have exited India, and companies that merged their business elsewhere and no longer need the entity.</p>\n\n<p>Keeping a dormant company alive has a cost. Annual ROC filings, audit, tax returns and fees continue even without business, and defaults lead to penalties and director disqualification. Closing a company stops these obligations and removes the risk of accumulating defaults.</p>\n\n<p>Directors should be aware that they give a personal indemnity bond and affidavit, so they must be sure that all liabilities are cleared. Companies with outstanding loans, tax disputes or litigation are not suitable for strike-off and should consider other routes.</p>\n\n<p>If you are unsure whether your company qualifies, we review the facts and advise before any filing is made.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Ends annual compliance costs and risk of penalties for an inactive company</li>\n<li>Complete document set: resolution, STK-3, STK-4 and CA-certified accounts</li>\n<li>Eligibility check to avoid rejected applications</li>\n<li>Guidance on closing GST, tax and bank registrations</li>\n<li>Clear advice on alternatives such as liquidation</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After strike-off, keep records as required and ensure all registrations are closed.</p>\n\n<p><strong>Related services:</strong> Annual Compliance, ROC Compliance, GST Registration cancellation guidance and Statutory Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying while liabilities, loans or litigation remain.</li>\n<li>Not filing pending annual returns before applying.</li>\n<li>Forgetting to close GST, tax and bank accounts.</li>\n<li>Giving incorrect affidavits, which can lead to later liability.</li>\n<li>Assuming strike-off can easily be reversed.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Sources estimate about 60 to 110 days to three to six months. The government fee is Rs 10,000, with professional and certification costs extra.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> clear pending ROC and tax filings first; most delays come from outstanding returns, mismatched accounts or missing certifications.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "Closure of a Company | JR Compliance",
          "metaDescription": "Closing a company properly is as important as starting it. The most common way to close an inactive company is voluntary strike-off under Section 248(2) of…",
          "canonicalUrl": "/corporate/closure-of-a-company",
          "keywords": "Closure of a Company, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "roc-change-address-change",
      "matchSlugs": [
        "roc-change-address-change"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 35,
        "originalRow": 40,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          }
        ]
      },
      "data": {
        "title": "ROC Change/Address Change",
        "menuLabel": "ROC Change/Address Change",
        "sortOrder": 14,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "A company's registered office is its official address with the Registrar of Companies, and changing it follows different routes depending on how far you move. Within the same city, a Board resolution and Form INC-22 are enough. Outside the city but within the same ROC jurisdiction, a special resolution, MGT-14 and INC-22 are needed. To another ROC in the same state, Regional Director approval through INC-23 is required, followed by INC-28 and INC-22. To another state, the situation clause of the MOA must also be altered and the Regional Director or Central Government must confirm the change."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ROC Change/Address Change?",
          "paragraphs": [
            {
              "text": "The registered office is the address where the company receives official notices and communications, and it determines which Registrar of Companies has jurisdiction over the company. Changing it, which is sometimes also called an ROC change when the new address falls under a different ROC, requires intimation to or approval from authorities under Section 12 and Section 13 of the Companies Act, 2013."
            },
            {
              "text": "Moving within the same city, town or village needs only a Board resolution and filing of INC-22. Moving outside the city but within the same ROC needs a special resolution, MGT-14 within 30 days and INC-22. Moving to a different ROC within the same state needs Regional Director approval through INC-23, followed by INC-28 and INC-22. Moving to another state requires alteration of the MOA's situation clause (Clause II), a special resolution, INC-23 and confirmation by the Regional Director or Central Government."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form is used to notify the new address?",
              "answer": "Form INC-22 in all routes."
            },
            {
              "question": "When is Regional Director approval needed?",
              "answer": "For a move to a different ROC in the same state (INC-23) and for inter-state moves."
            },
            {
              "question": "What documents prove the new address?",
              "answer": "Ownership or rent agreement, NOC from the owner and a recent utility bill."
            },
            {
              "question": "Is a special resolution always needed?",
              "answer": "Not for a move within the same city, which needs only a Board resolution."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ROC Change/Address Change",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies that move offices, expand or consolidate operations, relocate to a different state for incentives or talent, or discover that their existing registered office address is incorrect or no longer valid need this service. Startups that began at a founder's home and are moving to a commercial space often use it.</p>\n\n<p>It is also relevant for companies that must align their registered office with the state of their main operations to qualify for state subsidies or benefits.</p>\n\n<p>If the move is within the same city, the process is simple. For moves across jurisdictions or states, the process is longer and requires public notices and Regional Director involvement, so early planning is important.</p>\n\n<p>Companies should also keep in mind that a change of address affects GST, PAN, bank, trademark and licence records, and these should be updated together.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct route identified for your type of move</li>\n<li>Complete documentation for the new address</li>\n<li>Proper filing of INC-22, MGT-14, INC-23 and INC-28 as applicable</li>\n<li>Smooth update of PAN, TAN, GST, bank and licences</li>\n<li>Reduced risk of non-compliance and mismatched records</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the change, update PAN, GST, bank accounts, licences and trademarks.</p>\n\n<p><strong>Related services:</strong> Company Name Change, MOA/AOA Alteration, GST Registration, Statutory Compliance and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Treating an inter-state move like a simple local move.</li>\n<li>Not publishing the required notices or informing creditors where needed.</li>\n<li>Missing the 30-day deadline for MGT-14 or INC-22.</li>\n<li>Using an address without valid ownership or rent documents.</li>\n<li>Forgetting to update GST, PAN and other registrations.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines range from about a week for a same-city change to several months for an inter-state move. Costs include MCA fees, newspaper advertisement costs and professional charges.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm your new address documents (rent agreement, NOC and utility bill) before starting, because address proof is the most common source of delay.</p>\n</blockquote>"
          }
        ],
        "seo": {
          "metaTitle": "ROC Change/Address Change | JR Compliance",
          "metaDescription": "A company's registered office is its official address with the Registrar of Companies, and changing it follows different routes depending on how far you move…",
          "canonicalUrl": "/corporate/roc-change-address-change",
          "keywords": "ROC Change/Address Change, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "share-transfer",
      "matchSlugs": [
        "share-transfer"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 36,
        "originalRow": 41,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Share Transfer",
        "menuLabel": "Share Transfer",
        "sortOrder": 15,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "In a private limited company, shares are transferred using a share transfer deed in Form SH-4 signed by both the transferor and the transferee, stamped as required, and submitted with the original share certificate to the company within 60 days of execution for physical shares. The Board approves the transfer, the Register of Members is updated, and new certificates are issued within one month."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Share Transfer?",
          "paragraphs": [
            {
              "text": "Share transfer is the voluntary transfer of ownership of shares from a shareholder (the transferor) to another person (the transferee). In a private company it is governed by the Companies Act, 2013 (Section 56) and by the company's Articles, which usually restrict free transfer by providing for rights of first refusal and Board approval. A private company is also limited to 200 members."
            },
            {
              "text": "It is different from transmission, which happens by operation of law, for example on death or insolvency, and does not require an SH-4 or stamp duty. Shares held in dematerialised form move through the depository system (NSDL or CDSL) rather than by SH-4."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form is used for share transfer?",
              "answer": "Form SH-4, the share transfer deed."
            },
            {
              "question": "When must the transfer instrument reach the company?",
              "answer": "Within 60 days of execution for physical shares."
            },
            {
              "question": "What is the stamp duty?",
              "answer": "Sources conflict (0.015% vs 0.25% for physical shares). We verify the current rate for your state."
            },
            {
              "question": "Is transmission the same as transfer?",
              "answer": "No. Transmission occurs by operation of law and needs no SH-4."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Share Transfer",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Founders exiting or selling a stake, investors buying shares, family members receiving shares by gift or inheritance, employees exercising and transferring shares, and companies restructuring ownership all need this service.</p>\n\n<p>Startups in particular need clean share transfers because investors and acquirers examine the cap table and shareholding records. Errors, missing stamp duty or poor documentation can delay funding or create valuation disputes.</p>\n\n<p>Non-resident investors and Indian entities with foreign shareholders should pay attention to FEMA rules, including pricing guidelines and reporting.</p>\n\n<p>If you plan to transfer shares in a company with a shareholders' agreement, check it carefully, since it may include lock-in periods, tag-along or drag-along rights and consent requirements in addition to the Articles.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Properly executed SH-4 with correct stamp duty</li>\n<li>Board approval and updated Register of Members</li>\n<li>Timely issue of share certificates</li>\n<li>Support for FEMA/FC-TRS where non-residents are involved</li>\n<li>Clean records for fundraising and due diligence</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the transfer, update the cap table and statutory registers and file any required forms.</p>\n\n<p><strong>Related services:</strong> Increase of Authorised Capital, MOA/AOA Alteration, Annual Compliance, ROC Compliance and Seed Funding.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Ignoring Articles restrictions such as right of first refusal.</li>\n<li>Not paying stamp duty or using the wrong rate.</li>\n<li>Delivering the SH-4 to the company after 60 days.</li>\n<li>Skipping FEMA reporting for non-resident transfers.</li>\n<li>Not updating the Register of Members and cap table.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The company has one month after receiving the transfer instrument to issue the new certificate. Costs include stamp duty (rate disputed across sources), professional charges and, where relevant, FEMA filing.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> agree the price and valuation in writing and confirm Board approval before signing SH-4.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 56 of the Companies Act, 2013 requires companies to register transfers on a properly executed instrument of transfer and to deliver new certificates within one month. Section 44 treats shares as movable property transferable in the manner provided by the Articles. Stamp duty under the Indian Stamp Act, 1899 applies to transfer instruments, and capital gains tax under the Income Tax Act applies to the seller. For private companies, the Articles often restrict transfers, which is why they must always be checked first.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Share Transfer | JR Compliance",
          "metaDescription": "In a private limited company, shares are transferred using a share transfer deed in Form SH-4 signed by both the transferor and the transferee, stamped as…",
          "canonicalUrl": "/corporate/share-transfer",
          "keywords": "Share Transfer, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "post-compliance",
      "matchSlugs": [
        "post-compliance"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 37,
        "originalRow": 42,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Post Compliance",
        "menuLabel": "Post Compliance",
        "sortOrder": 16,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Post-incorporation compliance is the first set of actions a new company must complete after receiving its Certificate of Incorporation. These include opening a bank account and depositing the subscribed capital, holding the first Board meeting within 30 days, appointing the first auditor and filing ADT-1, issuing share certificates within 60 days, and filing INC-20A within 180 days before the company starts business. First-year annual filings such as the first AGM, AOC-4 and MGT-7 or MGT-7A follow."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Post Compliance?",
          "paragraphs": [
            {
              "text": "Post compliance means the mandatory steps a company must take after incorporation to start operating legally and avoid penalties. Its main elements are depositing subscribed capital in the company bank account, confirming the registered office, appointing the first auditor, issuing share certificates and filing the declaration of commencement of business under Section 10A."
            },
            {
              "text": "The deadlines are specific. The first Board meeting must be held within 30 days of incorporation. The first auditor must be appointed by the Board within 30 days, and ADT-1 filed within 15 days of the appointment. Share certificates must be issued within 60 days of incorporation. INC-20A must be filed within 180 days of incorporation, and the company cannot commence business or borrow until it is filed; the penalty is Rs 50,000 for the company."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When must the first Board meeting be held?",
              "answer": "Within 30 days of incorporation."
            },
            {
              "question": "When must INC-20A be filed?",
              "answer": "Within 180 days of incorporation."
            },
            {
              "question": "When should share certificates be issued?",
              "answer": "Within 60 days of incorporation."
            },
            {
              "question": "Can the company start business without INC-20A?",
              "answer": "No. It cannot commence business or borrow until INC-20A is filed."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Post Compliance",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every newly incorporated private limited company, OPC or public company needs this service. Startups that have just received their Certificate of Incorporation and want to raise funds, hire employees or start trading benefit most from a structured checklist.</p>\n\n<p>Founders who are new to company law often overlook items such as depositing subscription money from matching accounts, holding the first Board meeting on time or filing ADT-1. These are easy to fix when caught early but costly when penalties and late fees accumulate.</p>\n\n<p>Companies that want to approach investors soon after incorporation should note that investors will look at the compliance record. A clean post-incorporation record improves confidence.</p>\n\n<p>If your company was incorporated some time ago and you are not sure which items have been done, we can run a compliance health check and fix gaps.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Clear checklist with deadlines for the first 180 days</li>\n<li>Avoids penalties such as Rs 50,000 for missing INC-20A</li>\n<li>Proper first Board meeting, auditor appointment and share certificates</li>\n<li>Clean compliance record for investors and banks</li>\n<li>Smooth transition into annual compliance</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After post-incorporation compliance, move to annual compliance and register for licences such as GST.</p>\n\n<p><strong>Related services:</strong> ADT-1, INC-20A, DSC, Annual Compliance, GST Registration and ROC Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Treating incorporation as the finish line.</li>\n<li>Not depositing subscription money in the company account.</li>\n<li>Skipping the first Board meeting or ADT-1 deadline.</li>\n<li>Forgetting share certificates and statutory registers.</li>\n<li>Starting business before INC-20A.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The key deadlines are 30 days (first Board meeting, first auditor), 60 days (share certificates) and 180 days (INC-20A). Costs are mainly MCA filing fees for ADT-1 and INC-20A and professional fees.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> set calendar reminders on the day you receive the Certificate of Incorporation.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Companies Act, 2013 sets several time-bound obligations after incorporation. Section 173 requires the first Board meeting within 30 days of incorporation, Section 139(6) requires the Board to appoint the first auditor within 30 days, Section 46 requires share certificates to be issued within 60 days, and Section 10A requires a declaration of commencement of business within 180 days. These provisions together ensure that a new company is properly capitalised, governed and audited from the start.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup receives its Certificate of Incorporation and uses a checklist to hold the first Board meeting, appoint the auditor and issue share certificates.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A founder realises the subscription money was never deposited and fixes it before filing INC-20A.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company approaching investors wants a compliance health check so that the early record is clean.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>A useful way to think about post-incorporation compliance is as a sequence of three clocks that start the day the Certificate of Incorporation is issued: 30 days for the first board meeting and first auditor, 60 days for share certificates and 180 days for INC-20A. Missing the early clocks rarely causes immediate penalties, but it creates a trail of defaults that investors and banks notice later.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Post Compliance | JR Compliance",
          "metaDescription": "Post-incorporation compliance is the first set of actions a new company must complete after receiving its Certificate of Incorporation. These include opening…",
          "canonicalUrl": "/corporate/post-compliance",
          "keywords": "Post Compliance, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "roc-compliance",
      "matchSlugs": [
        "roc-compliance"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 38,
        "originalRow": 43,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "ROC Compliance",
        "menuLabel": "ROC Compliance",
        "sortOrder": 17,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "ROC compliance is the set of filings a company makes with the Registrar of Companies, both periodic and event-based. The annual ROC filings for a private company are Form AOC-4 (financial statements), MGT-7 or MGT-7A (annual return) and ADT-1 (auditor), together with DIR-3 KYC, DPT-3, MSME-1, PAS-6 and BEN-2 where applicable. Event-based filings include DIR-12 for director changes, MGT-14 for resolutions, SH-7 for capital changes and INC-22 and INC-24 for address and name changes."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ROC Compliance?",
          "paragraphs": [
            {
              "text": "ROC (Registrar of Companies) compliance covers all forms and returns that a company must file on the MCA portal under the Companies Act, 2013 to keep the public record accurate. Under Sections 92 and 137, the company reports its annual return and financial statements. It also reports events such as the appointment or resignation of directors, resolutions passed, changes in capital, registered office or name."
            },
            {
              "text": "Due dates run from the AGM or from the event. AOC-4 is due within 30 days of the AGM and MGT-7 or MGT-7A within 60 days, and ADT-1 within 15 days of an auditor appointment. MGT-14 and DIR-12 are due within 30 days of the relevant event. Small companies and OPCs can use the simplified MGT-7A; one source defines a small company as paid-up capital up to Rs 10 crore and turnover up to Rs 100 crore, which should be verified."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What are the main annual ROC forms?",
              "answer": "AOC-4, MGT-7 or MGT-7A, ADT-1 and, where applicable, DPT-3, MSME-1 and DIR-3 KYC."
            },
            {
              "question": "What are the key deadlines?",
              "answer": "AOC-4 within 30 days and MGT-7 within 60 days of the AGM; ADT-1 within 15 days."
            },
            {
              "question": "What happens if filings are missed?",
              "answer": "Late fees, penalties and, in serious cases, strike-off and director disqualification."
            },
            {
              "question": "Do inactive companies need to file?",
              "answer": "Yes, unless the company has been struck off or granted dormant status."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ROC Compliance",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every company registered with the ROC needs this service, whether or not it has business activity. Startups, small and medium companies, subsidiaries of foreign groups and dormant companies all must file. Companies that are preparing for funding or due diligence should ensure that their ROC record is complete.</p>\n\n<p>Founders who run lean operations may be tempted to skip filings during slow periods, but defaults accumulate quickly and become expensive. Companies that have missed filings for several years can still regularise them, but at the cost of additional fees.</p>\n\n<p>Directors should also be aware that continued default can lead to their disqualification under the Companies Act, which can affect all other companies in which they are directors.</p>\n\n<p>If you are unsure about your company's compliance status, we can review the MCA record and prepare a catch-up plan.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Complete and timely annual and event-based ROC filings</li>\n<li>Avoids late fees, penalties and director disqualification</li>\n<li>Clean MCA record for investors, banks and tenders</li>\n<li>Compliance calendar tailored to your company</li>\n<li>Support for small-company relaxations such as MGT-7A</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, keep acknowledgements and update statutory registers.</p>\n\n<p><strong>Related services:</strong> Annual Compliance, Statutory Compliance, ADT-1, DIR-3 KYC and MSME Form-1.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Treating inactive companies as exempt from filing.</li>\n<li>Waiting until after the AGM to prepare documents.</li>\n<li>Missing event-based forms such as DIR-12 and MGT-14.</li>\n<li>Filing MGT-7 instead of MGT-7A for eligible small companies, or vice versa.</li>\n<li>Ignoring late-fee implications.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Deadlines are 30, 60 and 15 days from the AGM or auditor appointment depending on the form. Costs include MCA fees (based on authorised capital), certification and professional charges.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> hold the AGM early so that AOC-4 and MGT-7 deadlines are comfortable.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Sections 92 and 137 of the Companies Act, 2013 require companies to file an annual return and financial statements with the Registrar, and other sections require event-based filings. The Registrar maintains a public register so that anyone dealing with the company can check its status. Failure to file attracts additional fees under the Companies (Registration Offices and Fees) Rules and can lead to strike-off under Section 248 and disqualification of directors under Section 164(2). This is why ROC compliance is more than a formality.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A small company holds its AGM and files AOC-4 and MGT-7A within the deadlines.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company appoints a new director and files DIR-12 on time.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company that missed several years of filings approaches us to regularise its MCA record and avoid strike-off.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>ROC compliance works best when treated as a year-round routine rather than a once-a-year rush. Event-based forms such as DIR-12 and MGT-14 arrive unpredictably during the year, while AOC-4, MGT-7 and ADT-1 follow the AGM. Keeping a single tracker for both types prevents the common mistake of filing the annual forms on time while an earlier event-based filing remains pending.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ROC Compliance | JR Compliance",
          "metaDescription": "ROC compliance is the set of filings a company makes with the Registrar of Companies, both periodic and event-based. The annual ROC filings for a private…",
          "canonicalUrl": "/corporate/roc-compliance",
          "keywords": "ROC Compliance, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "statutory-compliance",
      "matchSlugs": [
        "statutory-compliance"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 39,
        "originalRow": 44,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Statutory Compliance",
        "menuLabel": "Statutory Compliance",
        "sortOrder": 18,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Statutory compliance is the full set of legal obligations a company must meet: ROC filings (AOC-4, MGT-7 or MGT-7A, ADT-1, DPT-3, MSME-1, DIR-3 KYC), secretarial requirements (Board meetings, AGM, minutes and statutory registers) and tax filings (income tax return ITR-6, GST returns and TDS returns)."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Statutory Compliance?",
          "paragraphs": [
            {
              "text": "Statutory compliance means following the laws and regulations that apply to a company's operations. For a private limited company, this typically spans three layers. The first is secretarial compliance under the Companies Act, 2013: holding Board meetings (a minimum of four a year with gaps of not more than 120 days, with relaxation for small companies and OPCs), an AGM, maintaining minutes and statutory registers. The second is ROC compliance: filing financial statements and annual returns. The third is tax compliance under the Income Tax Act and GST law."
            },
            {
              "text": "Quoted dates include the AGM by 30 September, income tax return ITR-6 by 31 October for audit cases, the GST annual return GSTR-9 by 31 December and DPT-3 by 30 June. Sector-specific laws, such as labour laws, FSSAI and environmental clearances, add further obligations depending on the business."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What does statutory compliance include?",
              "answer": "Company law (ROC and secretarial), tax filings (income tax, GST, TDS) and sector-specific laws."
            },
            {
              "question": "What are common deadlines?",
              "answer": "AGM by 30 September, ITR-6 by 31 October for audit cases, GSTR-9 by 31 December, DPT-3 by 30 June."
            },
            {
              "question": "Do all companies have the same obligations?",
              "answer": "No. The licences you hold and your activities add extra requirements."
            },
            {
              "question": "Can I outsource it?",
              "answer": "Yes, and a single coordinated plan is often the most reliable."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Statutory Compliance",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every company needs statutory compliance support, but it is particularly valuable for businesses with multiple registrations and licences, such as manufacturers with factory and labour registrations, food businesses with FSSAI licences, importers and exporters with IEC and customs requirements and companies with employees under PF and ESI.</p>\n\n<p>Founders who handle compliance themselves often find that deadlines from different laws collide, and that a missed GST return or TDS filing can have knock-on effects. A single coordinated compliance plan removes this risk.</p>\n\n<p>If you are raising funds or preparing for due diligence, a clean statutory compliance record is expected by investors. A compliance gap discovered late can delay or reduce valuation.</p>\n\n<p>If you are not sure which obligations apply to your business, a short review of your registrations and activities produces a tailored list.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>One compliance calendar across company law, tax and sector licences</li>\n<li>Fewer missed deadlines and penalties</li>\n<li>Coordinated filings by one team</li>\n<li>Investor-ready compliance record</li>\n<li>Regular reminders and review of changes in law</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After setting up the calendar, review it each quarter and after any change in business.</p>\n\n<p><strong>Related services:</strong> Annual Compliance, ROC Compliance, GST Return, TDS Return and Income Tax Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Handling company, tax and sector compliances separately with no shared calendar.</li>\n<li>Ignoring licences that carry their own annual returns.</li>\n<li>Missing small deadlines like DPT-3 or MSME-1.</li>\n<li>Not keeping minutes and registers up to date.</li>\n<li>Relying on memory instead of a tracked calendar.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Typical annual anchors are 30 June (DPT-3), 30 September (AGM), 31 October (ITR-6 for audit cases) and 31 December (GSTR-9). Costs depend on the number of filings and licences.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> build the calendar once at the start of the financial year and review it every quarter.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Companies Act, 2013, the Income Tax Act, 1961 and the Central and State GST Acts together create a layered compliance system for companies. Each law has its own authority, forms and deadlines, and they interact: for instance, financial statements filed with the Registrar should reconcile with income tax and GST returns. This is why a coordinated approach is valuable, since inconsistencies between filings can trigger queries from authorities.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A manufacturing company with GST, TDS, PF and ESI registrations wants one compliance calendar across all its laws.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A growing startup finds that its accountant files tax returns while another adviser handles ROC forms, and wants coordination.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company preparing for due diligence reviews its statutory compliance to find and fix gaps.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Statutory compliance becomes manageable when each law is mapped to an owner and a date. For a typical private company, the Companies Act drives Board meetings, the AGM and ROC filings; the Income Tax Act drives advance tax, TDS and the annual return; and GST drives monthly or quarterly returns. Sector licences add their own renewals and returns, such as FSSAI Form D-1 or PF and ESI. The value of a combined calendar is that it reveals clashes, for example a GST return, a TDS deposit and a PF payment all falling in the same week, so resources can be planned in advance.</p>\n\n<p>Another practical point is reconciliation. The turnover in GST returns, the revenue in audited accounts and the income in the tax return should tell the same story. When they do not, authorities may ask questions. A quarterly review in which the accountant compares these figures is far cheaper than responding to a notice. Companies should also keep statutory registers, minutes and resolutions up to date, because these are the first documents requested in due diligence, bank reviews and inspections.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Statutory Compliance | JR Compliance",
          "metaDescription": "Statutory compliance is the full set of legal obligations a company must meet: ROC filings (AOC-4, MGT-7 or MGT-7A, ADT-1, DPT-3, MSME-1, DIR-3 KYC)…",
          "canonicalUrl": "/corporate/statutory-compliance",
          "keywords": "Statutory Compliance, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "mca-service-page",
      "proposedSlug": "annual-compliance",
      "matchSlugs": [
        "annual-compliance"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 40,
        "originalRow": 45,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "Annual Compliance",
        "menuLabel": "Annual Compliance",
        "sortOrder": 19,
        "hero": {
          "eyebrow": "MCA Services",
          "description": "Annual compliance is the set of meetings, audits and filings a private limited company must complete every financial year, whatever its turnover. It covers Board meetings and the AGM, the statutory audit, ROC filings (AOC-4 within 30 days of the AGM, MGT-7 or MGT-7A within 60 days, ADT-1 within 15 days), DPT-3, MSME-1, DIR-3 KYC and tax returns (ITR-6 and the GST annual return)."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Annual Compliance?",
          "paragraphs": [
            {
              "text": "Annual compliance means the recurring legal and regulatory obligations a company must meet each year to stay in good standing with the Registrar of Companies and the tax authorities. It has three parts: secretarial compliance (Board meetings, AGM, registers and minutes), ROC and MCA filings of financial statements and annual returns, and tax compliance."
            },
            {
              "text": "A private company must hold at least four Board meetings a year with not more than 120 days between meetings, though small companies and OPCs have relaxations, with one source mentioning two meetings. The AGM is held by 30 September for a company with a 31 March year-end, and the accounts must be audited before it. AOC-4 is due within 30 days and MGT-7 or MGT-7A within 60 days of the AGM, ADT-1 within 15 days of auditor appointment, DPT-3 by 30 June and MSME-1 by 30 April and 31 October. The income tax return ITR-6 is due by 31 October for audit cases, and the GST annual return GSTR-9 by 31 December."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is the AGM due?",
              "answer": "Typically by 30 September for a 31 March year-end."
            },
            {
              "question": "What are the filing deadlines after the AGM?",
              "answer": "AOC-4 within 30 days and MGT-7 or MGT-7A within 60 days."
            },
            {
              "question": "Do zero-revenue companies file?",
              "answer": "Yes. Annual compliance applies regardless of turnover."
            },
            {
              "question": "Is DIR-3 KYC annual?",
              "answer": "Older guides say annual; 2026 sources say once every three financial years. We confirm the current rule."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Annual Compliance",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>All private limited companies, including startups and companies with no revenue, need annual compliance. The obligations apply regardless of turnover, so a company that is not yet earning must still file annual returns and hold an AGM.</p>\n\n<p>Small and medium businesses that do not have an in-house finance and compliance team benefit the most. Founders who focus on product and sales can leave the annual cycle with a professional team that follows the calendar.</p>\n\n<p>Companies preparing for fundraising or due diligence need clean annual compliance records, since investors and acquirers check them closely.</p>\n\n<p>If you have missed past years, we can help regularise the filings and reduce the cost of catching up.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Complete annual cycle managed from books to ROC and tax filings</li>\n<li>Reminders before every deadline</li>\n<li>Avoids late fees, penalties and director disqualification</li>\n<li>Investor-ready compliance record</li>\n<li>Updated for the latest thresholds and due dates</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After annual filings, plan the next year's calendar and review any changes in law.</p>\n\n<p><strong>Related services:</strong> ROC Compliance, Statutory Compliance, ADT-1, DIR-3 KYC, GST Return and Income Tax Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Skipping the AGM or audit because there is no revenue.</li>\n<li>Filing late and paying additional fees.</li>\n<li>Confusing MGT-7 with MGT-7A.</li>\n<li>Forgetting DPT-3 and MSME-1 where applicable.</li>\n<li>Relying on outdated due dates.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The annual cycle runs through the year, with major deadlines around 30 June, 30 September, 31 October and 31 December. Costs include audit fees, MCA filing fees and professional charges.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> close the books soon after 31 March so that the audit and AGM are completed comfortably before 30 September.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Companies Act, 2013 requires annual general meetings (Section 96), audited financial statements (Sections 129 and 143), an annual return (Section 92) and filing with the Registrar (Section 137). The Income Tax Act requires annual returns and, for audited companies, tax audit reports, and the GST laws require annual returns. These obligations together provide transparency to shareholders, regulators and the public, and they apply every year, regardless of turnover.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Annual Compliance | JR Compliance",
          "metaDescription": "Annual compliance is the set of meetings, audits and filings a private limited company must complete every financial year, whatever its turnover. It covers…",
          "canonicalUrl": "/corporate/annual-compliance",
          "keywords": "Annual Compliance, MCA Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "iec-registration",
      "matchSlugs": [
        "iec-registration",
        "iec-code"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 41,
        "originalRow": 49,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          }
        ]
      },
      "data": {
        "title": "IEC Code",
        "menuLabel": "IEC Code",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Import Export",
          "description": "The Importer Exporter Code (IEC) is a 10-digit alphanumeric code issued by the Directorate General of Foreign Trade (DGFT) and is mandatory for commercial import and export of goods. Without it, customs will not clear your shipments, banks will not process foreign remittances for trade, and you cannot claim export incentives. The application is entirely online on the DGFT portal using Form ANF-2A, the government fee is Rs 500, and sources quote about one to three working days for issue."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is IEC Code?",
          "paragraphs": [
            {
              "text": "An Importer Exporter Code is a unique business identification number issued by DGFT under the Ministry of Commerce and Industry, based on the Foreign Trade (Development and Regulation) Act, 1992. It identifies an importer or exporter to customs, banks and DGFT, and it is needed for customs clearance, receiving foreign remittances and claiming export incentives."
            },
            {
              "text": "Any individual or entity, including proprietorships, partnerships, LLPs, companies and trusts, can apply, and you do not need an existing business. The application is in the name of the entity and uses its PAN. The IEC is not required for personal-use imports or gifts below the prescribed value."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the fee for IEC?",
              "answer": "Rs 500 as quoted in the sources."
            },
            {
              "question": "How long is an IEC valid?",
              "answer": "For life, but you must update the profile every year between April and June."
            },
            {
              "question": "Is GST needed to get an IEC?",
              "answer": "No, but you need it for actual trade."
            },
            {
              "question": "Who can apply?",
              "answer": "Any individual or entity, including proprietorships, partnerships, LLPs and companies."
            }
          ]
        },
        "extraContent": [
          {
            "title": "IEC Code",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Any person who wants to import or export goods commercially needs an IEC. Merchant exporters who buy and sell goods, manufacturer exporters, online sellers shipping abroad, traders importing raw materials or finished products, and service providers who want benefits under the Foreign Trade Policy are common applicants.</p>\n\n<p>Startups planning to sell on cross-border marketplaces, small manufacturers who receive an export enquiry, and importers who bring in machinery or components need to obtain the IEC before they ship or clear goods.</p>\n\n<p>Individuals importing for personal use do not need one, but freelancers who export services may still choose to obtain an IEC to claim certain benefits and to enable some bank and marketplace payment flows.</p>\n\n<p>If you plan to export food, spices, coffee or tea, you will also need the relevant commodity board registration after getting the IEC.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Mandatory identity for customs clearance and foreign trade payments</li>\n<li>Lifetime validity with a simple annual update</li>\n<li>Quick online issue, typically within one to three working days</li>\n<li>Gateway to export incentives and schemes under the Foreign Trade Policy</li>\n<li>Foundation for AD Code, ICEGATE and commodity board registrations</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the IEC, register your AD Code with a bank, set up ICEGATE and complete any commodity board registration.</p>\n\n<p><strong>Related services:</strong> AD Code, ICEGATE Registration, Port Registration, APEDA RCMC, Spice Board Registration and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Forgetting the April to June annual update and finding the IEC deactivated.</li>\n<li>Using a bank account or PAN that does not match the entity name.</li>\n<li>Applying in an individual's name for a business entity.</li>\n<li>Not linking the IEC with the AD Code before the first shipment.</li>\n<li>Delaying the update after a change of name or address.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Issue is typically within one to three working days, and the fee is Rs 500.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep the cancelled cheque or bank certificate (ANF-2A(I)) and your DSC ready, since mismatches between the PAN name and bank account name are the most common cause of delay.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Foreign Trade (Development and Regulation) Act, 1992 empowers the Central Government and DGFT to regulate imports and exports and to issue the IEC. The requirement exists so that every trader can be identified and tracked in customs, banking and incentive systems. The annual update rule ensures that the DGFT database holds current contact and business details.</p>"
          }
        ],
        "seo": {
          "metaTitle": "IEC Code | JR Compliance",
          "metaDescription": "The Importer Exporter Code (IEC) is a 10-digit alphanumeric code issued by the Directorate General of Foreign Trade (DGFT) and is mandatory for commercial…",
          "canonicalUrl": "/corporate/iec-registration",
          "keywords": "IEC Code, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "ad-code",
      "matchSlugs": [
        "ad-code"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 42,
        "originalRow": 50,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "AD Code",
        "menuLabel": "AD Code",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Import Export",
          "description": "An Authorised Dealer (AD) Code is a 14-digit code generated by an RBI-authorised bank to link an exporter's or importer's bank account with its IEC for customs purposes. After the bank issues the AD Code letter, it is registered on the ICEGATE portal. As per CBIC's ICES Advisory 10/2022 dated 14 June 2022, registration at any one customs port is enough, and the AD Code can then be used at all ports."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is AD Code?",
          "paragraphs": [
            {
              "text": "The Authorised Dealer Code is a unique 14-digit number generated by a bank authorised by the Reserve Bank of India to deal in foreign exchange. It is used by Indian Customs to associate the exporter's or importer's IEC with the bank account used for foreign exchange realisation. A business can have multiple AD Codes if it uses multiple bank accounts."
            },
            {
              "text": "The code is requested through the bank, which issues a letter on its letterhead. The exporter then registers the code on ICEGATE (Bank Account Management / AD Code registration), selects a customs port and uploads the letter. A customs officer verifies and approves the registration."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is an AD Code?",
              "answer": "A 14-digit code from your bank linking your IEC and bank account for customs."
            },
            {
              "question": "Do I need to register at every port?",
              "answer": "No. Per ICES Advisory 10/2022, registration at one port is valid at all ports."
            },
            {
              "question": "Is there a government fee?",
              "answer": "Customs charges none; the bank may charge a processing fee."
            },
            {
              "question": "Where do I register it?",
              "answer": "On ICEGATE under Bank Account Management / AD Code registration."
            }
          ]
        },
        "extraContent": [
          {
            "title": "AD Code",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every exporter who wants to file shipping bills needs an AD Code, and importers making or receiving foreign exchange payments through banks also need to link their bank account. Manufacturers exporting directly, merchant exporters, e-commerce sellers shipping internationally and service exporters who need to link payments are typical users.</p>\n\n<p>If you change your bank account or open an additional one for exports, you need to register a new AD Code or update the existing registration.</p>\n\n<p>Businesses working with freight forwarders and customs brokers should confirm that their AD Code is registered before the first shipment, because delays at this stage can hold up the entire export.</p>\n\n<p>If you have an old AD Code registered at one port and now ship from another, you do not have to register again, as per the single-port rule.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Enables shipping bills and foreign exchange realisation tracking</li>\n<li>One registration at any port works across all customs ports</li>\n<li>Correct bank letter and ICEGATE upload handled for you</li>\n<li>Reduces rejection from name or account mismatches</li>\n<li>Supports multiple bank accounts when needed</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After AD Code registration, start filing shipping bills.</p>\n\n<p><strong>Related services:</strong> IEC Code, ICEGATE Registration, Port Registration, GST Registration and APEDA RCMC.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Following older guides and registering at every port unnecessarily.</li>\n<li>Submitting a bank letter that does not match the IEC details.</li>\n<li>Changing the bank account without updating the AD Code.</li>\n<li>Starting shipments before the customs officer approves the registration.</li>\n<li>Forgetting to link multiple bank accounts as separate AD Codes.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Banks take a few working days to issue the letter (one source says three to seven). Customs approval follows once documents are uploaded.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> ask the bank for the letter in the format prescribed by Customs, and ensure the IEC, PAN, GST and bank details all use exactly the same name.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Customs procedures under the Customs Act, 1962 and the Shipping Bill (Electronic Integration) framework require that export proceeds can be traced to the exporter's bank account. The AD Code allows Customs and banks to match shipping bills with foreign exchange realisation under FEMA. The 2022 advisory simplified the process by removing multi-port registration.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A merchant exporter receives a first export order and needs an AD Code before filing a shipping bill.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An exporter opens a new bank account for dollar receipts and registers a second AD Code.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A business that registered at several ports under older rules learns it only needs one port registration now.</p>"
          }
        ],
        "seo": {
          "metaTitle": "AD Code | JR Compliance",
          "metaDescription": "An Authorised Dealer (AD) Code is a 14-digit code generated by an RBI-authorised bank to link an exporter's or importer's bank account with its IEC for…",
          "canonicalUrl": "/corporate/ad-code",
          "keywords": "AD Code, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "ice-gate-registration",
      "matchSlugs": [
        "ice-gate-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 43,
        "originalRow": 51,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "ICE Gate Registration",
        "menuLabel": "ICE Gate Registration",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Import Export",
          "description": "ICEGATE (Indian Customs Electronic Gateway) is the portal of Indian Customs for electronically filing Bills of Entry, Shipping Bills and other customs documents. Importers and exporters register on icegate.gov.in using their IEC, usually with a Class 3 DSC, choose between simplified and full registration, and receive a User ID after customs verification, which sources say takes about 24 to 48 hours."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ICE Gate Registration?",
          "paragraphs": [
            {
              "text": "ICEGATE is the e-commerce portal of Indian Customs, run by the Central Board of Indirect Taxes and Customs (CBIC) with the National Informatics Centre. It enables traders, customs brokers and shipping agents to submit customs documents online, track status, pay duties, register AD Codes and manage digital signatures."
            },
            {
              "text": "Registration types include DSC-based (full) registration, DSC-less or simplified registration, and IEC-holder registration, depending on what the user needs to do. Simplified registration is for users who do not need to file customs documents. Full registration with a Class 3 DSC is needed to sign and file Bills of Entry and Shipping Bills."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What do I need to register?",
              "answer": "IEC, PAN, GST, bank details and a Class 3 DSC for full registration."
            },
            {
              "question": "How long does verification take?",
              "answer": "About 24 to 48 hours according to one source."
            },
            {
              "question": "Is a DSC always needed?",
              "answer": "Full registration needs one; simplified registration may not."
            },
            {
              "question": "Where is it used?",
              "answer": "At over 250 customs ports connected to the ICES system."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ICE Gate Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Importers and exporters who file customs documents themselves, customs brokers, freight forwarders, shipping lines and agents, and trade facilitators need ICEGATE accounts. Exporters shipping through freight forwarders still benefit from having their own account to track filings and register their AD Code.</p>\n\n<p>New exporters who have just received their IEC should register on ICEGATE as the next step, since many subsequent registrations, such as the AD Code, depend on it.</p>\n\n<p>Businesses that handle high volumes should also ensure that more than one authorised person has DSC access and that the account details are current. For smaller businesses, a simplified registration may be enough if all filings are handled by a customs broker.</p>\n\n<p>If your IEC details change, update them on ICEGATE so that your shipping documents match.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Gateway account for customs filings and tracking</li>\n<li>Correct role and registration type chosen for your needs</li>\n<li>Support with DSC, documents and customs verification</li>\n<li>Smooth follow-up with AD Code and port registration</li>\n<li>Reduces filing errors and delays</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After ICEGATE registration, register your AD Code and port details and start filing.</p>\n\n<p><strong>Related services:</strong> IEC Code, AD Code, Port Registration, DSC and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Choosing simplified registration when full filing rights are needed.</li>\n<li>Mismatched IEC, PAN or GST details.</li>\n<li>Using an expired or unregistered DSC.</li>\n<li>Not updating contact details and then missing customs messages.</li>\n<li>Forgetting to link the AD Code after registration.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Customs verification typically takes one to two days. Registration on ICEGATE carries no government fee as far as the sources reviewed show.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep your IEC, PAN and GST details identical across all systems and obtain the DSC first, so that the registration can be completed in one go.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Customs Act, 1962 and the Customs (Electronic Declaration and Filing) framework require customs documents to be filed electronically through the ICES system. ICEGATE is the interface that lets trade stakeholders do so. Digital filing speeds up clearance and keeps an auditable record, and it is why registration and DSC use are mandatory for filers.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A garment exporter obtains an IEC and then registers on ICEGATE so it can track shipping bills.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A small importer uses a customs broker for filing but takes a simplified registration for status tracking.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company changes its authorised signatory and updates the DSC details on ICEGATE.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>ICEGATE registration is the digital doorway to Customs, and choosing the right registration type saves effort later. A trader who plans to file documents personally needs full registration with a Class 3 DSC, whereas one who relies entirely on a customs broker may be content with simplified registration for tracking. Because ICEGATE data feeds the AD Code and shipping bill process, any mismatch in IEC, PAN or GST details can delay the first shipment, so verify these before submitting.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ICE Gate Registration | JR Compliance",
          "metaDescription": "ICEGATE (Indian Customs Electronic Gateway) is the portal of Indian Customs for electronically filing Bills of Entry, Shipping Bills and other customs…",
          "canonicalUrl": "/corporate/ice-gate-registration",
          "keywords": "ICE Gate Registration, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "port-registration",
      "matchSlugs": [
        "port-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 44,
        "originalRow": 52,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Port Registration",
        "menuLabel": "Port Registration",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Import Export",
          "description": "In import-export practice, 'port registration' refers to registering an IEC's AD Code (bank account) with Indian Customs at a customs port or ICES location. Since ICES Advisory 10/2022 of 14 June 2022, registering at one port is enough, and it is valid for all customs locations. The port you choose becomes the port of registration, through which any later change to that AD Code must be made."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Port Registration?",
          "paragraphs": [
            {
              "text": "Port registration, in this context, is the process of recording an exporter's or importer's AD Code and associated bank account against a customs port in the ICEGATE/ICES system so that shipping bills can be filed. The port where it is registered is the 'port of registration' and is the single controlling port for that AD Code."
            },
            {
              "text": "Earlier, the AD Code had to be registered at every port where shipments were filed, which was time-consuming for exporters using several ports. The CBIC advisory of 14 June 2022 changed this: once registered at any one port, the AD Code works at all ports. Businesses can hold multiple AD Codes for multiple bank accounts, each with its own port of registration. For AD Codes registered before June 2022, the port where the last shipping bill was filed was treated as the port of registration. Special Economic Zone units register against the SEZ customs port location."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Do I need to register at each port?",
              "answer": "No. After the 2022 advisory, one port registration is valid everywhere."
            },
            {
              "question": "Where do I change my AD Code details?",
              "answer": "At the port of registration, through ICEGATE."
            },
            {
              "question": "Is there a fee?",
              "answer": "One source says Customs charges none."
            },
            {
              "question": "Can I have more than one AD Code?",
              "answer": "Yes, each with its own port of registration."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Port Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Exporters and importers who file shipping bills or bills of entry, SEZ units, merchant exporters shipping through multiple ports and businesses changing their bank accounts need this service.</p>\n\n<p>New exporters can choose a port that is closest to their business or most convenient for follow-ups, since that port will handle any changes in the future. Businesses that already have older registrations at several ports should know that they no longer need to repeat the process.</p>\n\n<p>Companies that change banks, or open a new account for foreign exchange, need to register a fresh AD Code and select a port of registration.</p>\n\n<p>If you are unsure which port to use, we can help you decide based on your shipping pattern and the ease of follow-up.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>One registration valid across all customs ports</li>\n<li>Clear choice of a convenient port of registration</li>\n<li>Smooth handling of changes to AD Code details</li>\n<li>Avoids duplicated registrations under older rules</li>\n<li>Support for multiple bank accounts</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After port registration, you can file shipping bills from any customs location.</p>\n\n<p><strong>Related services:</strong> IEC Code, AD Code, ICEGATE Registration and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Registering at several ports out of habit and duplicating effort.</li>\n<li>Choosing a distant port that makes later changes inconvenient.</li>\n<li>Forgetting that changes must be made at the port of registration.</li>\n<li>Not matching the bank details with the AD Code letter.</li>\n<li>Assuming SEZ units follow the same port rules without checking.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Approval times depend on the customs office.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> choose the port where you will most often file, because changes to the bank account or AD Code details must be raised there.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>CBIC's ICES Advisory 10/2022 and related customs public notices simplified AD Code registration under the Customs Act, 1962 framework to reduce compliance burden for exporters. Because customs and banks must reconcile shipping bills with foreign exchange receipts under FEMA, the system still needs a single controlling port for each AD Code.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A new exporter based near a major port chooses it as the port of registration for its AD Code.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An exporter changes its bank account and raises the change at the original port of registration.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An SEZ unit registers its AD Code against the SEZ customs location.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Think of the port of registration as the home port for your AD Code. Even though the code works everywhere, changes are processed at the home port, so pick one with a responsive office.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Port Registration | JR Compliance",
          "metaDescription": "In import-export practice, 'port registration' refers to registering an IEC's AD Code (bank account) with Indian Customs at a customs port or ICES location…",
          "canonicalUrl": "/corporate/port-registration",
          "keywords": "Port Registration, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "apeda-rcmc-registration",
      "matchSlugs": [
        "apeda-rcmc-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 45,
        "originalRow": 53,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "APEDA/ RCMC Registration",
        "menuLabel": "APEDA/ RCMC Registration",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Import Export",
          "description": "APEDA (the Agricultural and Processed Food Products Export Development Authority) registration gives exporters of scheduled agricultural and processed-food products a Registration-cum-Membership Certificate (RCMC). Since 17 July 2023, APEDA issues the RCMC through the DGFT e-RCMC platform, after the exporter has an IEC. The online fee quoted by APEDA's notice is about Rs 5,900 including GST, and the RCMC is valid for five years."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is APEDA/ RCMC Registration?",
          "paragraphs": [
            {
              "text": "APEDA is a statutory authority set up under the Agricultural and Processed Food Products Export Development Authority Act, 1985, under the Ministry of Commerce and Industry, to develop and promote exports of scheduled products. These include fresh fruits and vegetables, floriculture, animal products, cereals, organic and processed foods and similar items."
            },
            {
              "text": "The RCMC (Registration-cum-Membership Certificate) is the certificate showing that an exporter is registered with APEDA and is mandatory for exporting products listed in the Act's schedule. Registration also qualifies exporters for APEDA's financial assistance schemes."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Where is the APEDA RCMC applied for?",
              "answer": "On the DGFT e-RCMC platform, per APEDA's notice."
            },
            {
              "question": "What is the fee?",
              "answer": "About Rs 5,900 including GST, as quoted."
            },
            {
              "question": "How long is the RCMC valid?",
              "answer": "Five years."
            },
            {
              "question": "Is an IEC required?",
              "answer": "Yes."
            }
          ]
        },
        "extraContent": [
          {
            "title": "APEDA/ RCMC Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Exporters of fruits and vegetables, rice and cereals, dairy and meat products, honey, processed foods, floriculture and organic products need APEDA registration. Farmer producer organisations, agri startups, food processing companies and merchant exporters sourcing from farmers are common applicants.</p>\n\n<p>If you already export under a different category, such as spices or coffee, you also need the registration of the relevant commodity board. Products that fall under APEDA's schedule must be exported by an exporter with a valid RCMC.</p>\n\n<p>Businesses that want to take advantage of APEDA's promotional programmes, such as participation in international trade fairs, should register early.</p>\n\n<p>If you are unsure whether your product is under APEDA or another board, we help you check the schedule and find the right authority.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legally required for scheduled agri and processed-food exports</li>\n<li>Access to APEDA's support and promotion programmes</li>\n<li>Five-year validity of the RCMC</li>\n<li>Support with merchant or manufacturer category and documents</li>\n<li>Filed through the DGFT e-RCMC platform with expert guidance</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the RCMC, plan your export shipments and certifications.</p>\n\n<p><strong>Related services:</strong> IEC Code, AD Code, ICEGATE Registration, FSSAI registration and Spice, Coffee and Tea Board registrations.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying on an older APEDA portal instead of the DGFT e-RCMC route.</li>\n<li>Missing product-specific licences for manufacturer exporters.</li>\n<li>Registering under the wrong exporter category.</li>\n<li>Letting the five-year RCMC expire without renewal.</li>\n<li>Assuming APEDA covers all agri exports; spices, coffee and tea have their own boards.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The RCMC is issued after APEDA verifies the application. The quoted fee is about Rs 5,900 including GST and validity is five years.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep your FSSAI or Udyam proof and product list ready so that APEDA does not raise queries about the manufacturing category.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The APEDA Act, 1985 empowers the authority to register exporters of scheduled products and to promote exports. The RCMC is also linked to the Foreign Trade Policy, which uses RCMCs to give access to export benefits. The shift to the DGFT e-RCMC platform in 2023 aimed to simplify applications for exporters.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A fruit exporter applies for an APEDA RCMC through the DGFT e-RCMC platform before its first shipment.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A farmer producer company that processes products applies as a manufacturer exporter and submits FSSAI proof.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An exporter whose RCMC is nearing the end of its five-year validity applies for renewal.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>APEDA registration is most smoothly handled when the exporter has already decided on its category. A merchant exporter sources from others and needs proof of its trade identity, whereas a manufacturer exporter must prove production capability through licences such as FSSAI or Udyam. Because APEDA covers a wide range of agricultural and processed products, check the schedule for your exact HS product before applying.</p>"
          }
        ],
        "seo": {
          "metaTitle": "APEDA/ RCMC Registration | JR Compliance",
          "metaDescription": "APEDA (the Agricultural and Processed Food Products Export Development Authority) registration gives exporters of scheduled agricultural and processed-food…",
          "canonicalUrl": "/corporate/apeda-rcmc-registration",
          "keywords": "APEDA/ RCMC Registration, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "spice-board-registration",
      "matchSlugs": [
        "spice-board-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 46,
        "originalRow": 54,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Spice Board Registration",
        "menuLabel": "Spice Board Registration",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "Import Export",
          "description": "Exporters of spices must register with the Spices Board of India and obtain a Certificate of Registration as Exporter of Spices (CRES) under Section 11 of the Spices Board Act, 1986, in addition to their IEC. According to the Board's FAQ, CRES is treated as the RCMC, so a separate RCMC is not required. Registration is as a merchant exporter or manufacturer exporter, and applications are filed online through the Board's exporter registration window."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Spice Board Registration?",
          "paragraphs": [
            {
              "text": "The Spices Board of India is a statutory body under the Ministry of Commerce and Industry, set up under the Spices Board Act, 1986, to develop and promote the export of spices such as pepper, cardamom, turmeric, cumin, coriander, chillies and ginger. A CRES is the registration that legally authorises a person to export scheduled spices from India. Domestic traders and retailers who do not export are exempt."
            },
            {
              "text": "Two categories exist: merchant exporters, who trade in spices, and manufacturer exporters, who process or pack spices and must show proof of manufacturing, such as FSSAI licence or Udyam. The registration can be suspended or cancelled under the Act and Rules if conditions are violated."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is an IEC required?",
              "answer": "Yes, CRES is mandatory in addition to the IEC."
            },
            {
              "question": "Is a separate RCMC needed?",
              "answer": "The Board's FAQ treats CRES as the RCMC; a secondary source says they are separate. Confirm with the Board."
            },
            {
              "question": "How long is CRES valid?",
              "answer": "Sources say three or five years; confirm the current period."
            },
            {
              "question": "Who needs it?",
              "answer": "Anyone exporting scheduled spices, as merchant or manufacturer."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Spice Board Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Exporters of whole and ground spices, spice oils and oleoresins, spice processors and packers, merchant exporters sourcing from farmers, and e-commerce sellers shipping spices abroad need this registration.</p>\n\n<p>New exporters who have just obtained an IEC should apply to the Spices Board at the start, because shipments without registration can be stopped at customs. Spice farmer producer companies planning direct exports also need it.</p>\n\n<p>Manufacturers should be ready with FSSAI and other licences for their processing units. Merchants should be able to show how they source spices and where they pack them.</p>\n\n<p>If you export other commodities as well, such as tea or coffee, you will need separate registrations with those boards.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal authority to export scheduled spices</li>\n<li>Correct exporter category and documentation</li>\n<li>Registration on the Board's online window with follow-up</li>\n<li>Access to Spices Board promotional schemes</li>\n<li>Clarity on CRES and RCMC treatment</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After CRES, plan certifications, packaging and shipments.</p>\n\n<p><strong>Related services:</strong> IEC Code, AD Code, FSSAI registration, ICEGATE Registration and APEDA, Coffee and Tea Board registrations.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Exporting before getting CRES.</li>\n<li>Using the wrong category (merchant vs manufacturer).</li>\n<li>Relying on a conflicting validity period without checking.</li>\n<li>Missing FSSAI or Udyam proof for manufacturers.</li>\n<li>Letting the registration lapse.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing time varies with documents and verification. Fees and renewal details differ across sources.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm validity and fee directly on the Board's exporter registration page before applying.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Spices Board Act, 1986 empowers the Board to register exporters, regulate quality and promote exports. Exporters must follow the Spices Board (Registration of Exporters) rules. The registration helps ensure product quality and the reputation of Indian spices in global markets.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A spice trader sourcing from farmers registers as a merchant exporter before booking international orders.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A masala manufacturer with its own packing unit registers as a manufacturer exporter with FSSAI proof.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An exporter checks whether the CRES doubles as the RCMC before applying for another certificate.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Spice exporters often assume the IEC is enough, but the Spices Board registration is a separate legal requirement. Plan for it at the same time as the IEC so that your first order is not delayed at customs.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Spice Board Registration | JR Compliance",
          "metaDescription": "Exporters of spices must register with the Spices Board of India and obtain a Certificate of Registration as Exporter of Spices (CRES) under Section 11 of the…",
          "canonicalUrl": "/corporate/spice-board-registration",
          "keywords": "Spice Board Registration, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "coffee-board-registration",
      "matchSlugs": [
        "coffee-board-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 47,
        "originalRow": 55,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Coffee Board Registration",
        "menuLabel": "Coffee Board Registration",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "Import Export",
          "description": "Exporters of coffee must register with the Coffee Board of India under the Coffee Act, 1942 and the Coffee Rules, 1955 and obtain a Registration-cum-Membership Certificate (RCMC). An IEC is a prerequisite, the registration is valid for three years, and applications are filed online on the Board's website. The Board's own guidelines state a registration fee of Rs 5,000, while some secondary sources quote Rs 6,200 plus GST, so the current fee chart should be confirmed."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Coffee Board Registration?",
          "paragraphs": [
            {
              "text": "The Coffee Board of India is a statutory body constituted under the Coffee Act, 1942 to promote the development of Indian coffee, including its production, marketing and export. Exporter registration is the Board's registration of a person as an exporter of coffee, and the RCMC issued on registration is proof that the exporter is a member of the Board."
            },
            {
              "text": "The certificate is not inheritable or transferable. The Board can cancel or de-register an exporter for violating the conditions or the Act. Exporters are expected to abide by the Coffee Act and rules and to submit post-shipment proof, typically customs-stamped export documents, after exports."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the registration fee?",
              "answer": "The Board's document states Rs 5,000; some sources quote Rs 6,200 plus GST. Confirm the current chart."
            },
            {
              "question": "How long is the registration valid?",
              "answer": "Three years."
            },
            {
              "question": "Is an IEC needed?",
              "answer": "Yes."
            },
            {
              "question": "What must exporters submit after shipments?",
              "answer": "Post-shipment proof such as customs-stamped documents."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Coffee Board Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Exporters of green coffee, roasted coffee, ground coffee, instant coffee and other coffee products need this registration. Coffee growers who want to export directly, estates with processing units, roasters and merchants buying from curers and growers all fall in this group.</p>\n\n<p>Startups building direct-to-consumer coffee brands for international customers should note that shipments of coffee are controlled, so they must register before they export, even in small quantities.</p>\n\n<p>If your company already has an IEC and exports other products, you will still need to add the Coffee Board registration for coffee shipments. Manufacturer exporters should be ready with their FSSAI licence and other documents.</p>\n\n<p>Merchants who only source and sell coffee domestically do not need exporter registration, but they will if they begin exporting.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal authority to export coffee under the Coffee Act</li>\n<li>Three-year registration with a clear renewal path</li>\n<li>Documents and fee handled correctly the first time</li>\n<li>Support with post-shipment obligations</li>\n<li>Credibility with international buyers</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, plan shipments, FSSAI compliance and renewals.</p>\n\n<p><strong>Related services:</strong> IEC Code, AD Code, FSSAI registration, ICEGATE Registration and APEDA RCMC.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Exporting without the Coffee Board registration.</li>\n<li>Quoting an outdated fee.</li>\n<li>Missing FSSAI or Udyam documents for manufacturer exporters.</li>\n<li>Forgetting post-shipment document submissions.</li>\n<li>Letting the three-year registration expire.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The Board reviews applications after documents are uploaded, and secondary sources suggest about one to three weeks. The registration lasts three years.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep a scanned set of IEC, GST, FSSAI and authorised signatory letter ready before you start the online form.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Coffee Act, 1942 and Coffee Rules, 1955 give the Board power to register exporters and regulate the coffee trade. The aim is to maintain quality and orderly marketing, and the registration helps the Board track exports and exporters.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A coffee estate that wants to sell directly to overseas buyers registers as an exporter with the Coffee Board.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A roaster begins exporting packaged coffee and registers as a manufacturer exporter with FSSAI.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A merchant exporter renews its registration before the three-year validity ends.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Coffee exports are quality-sensitive, and the Board's registration is part of how the industry maintains standards. Keep a clear file of IEC, GST, FSSAI and authorised signatory documents so renewals every three years are routine rather than a scramble.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Coffee Board Registration | JR Compliance",
          "metaDescription": "Exporters of coffee must register with the Coffee Board of India under the Coffee Act, 1942 and the Coffee Rules, 1955 and obtain a…",
          "canonicalUrl": "/corporate/coffee-board-registration",
          "keywords": "Coffee Board Registration, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "tea-board-registration",
      "matchSlugs": [
        "tea-board-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 48,
        "originalRow": 56,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Tea Board Registration",
        "menuLabel": "Tea Board Registration",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "Import Export",
          "description": "To export tea from India, an exporter needs a Tea Board exporter licence under the Tea (Distribution and Export) Control Order, 2005 (TDECO) and then a Registration-cum-Membership Certificate (RCMC) from the Tea Board for export-import policy benefits. Applications go through the Tea Board's online portal (eGiCCS), and one source says the RCMC is issued within two days of application. The Tea Board has also eased licensing with auto-renewal on payment of the renewal fee and longer validity."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Tea Board Registration?",
          "paragraphs": [
            {
              "text": "The Tea Board of India is a statutory body established on 1 April 1954 under the Tea Act, 1953 to regulate and promote the production, marketing and export of tea. The RCMC is the certificate proving that an exporter of bulk tea, instant tea, packet tea or tea bags is registered with the Board and is needed to access benefits under the Foreign Trade Policy."
            },
            {
              "text": "The RCMC is separate from the exporter licence, which is the Board's authorisation to export tea under TDECO, 2005. An exporter needs both: the licence to operate under the tea trade rules, and the RCMC for incentives and policy benefits."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Do I need both a licence and an RCMC?",
              "answer": "Yes. The exporter licence authorises export under TDECO, and the RCMC gives access to policy benefits."
            },
            {
              "question": "What is the RCMC fee?",
              "answer": "Sources conflict (free vs Rs 5,600). Confirm on teaboard.gov.in."
            },
            {
              "question": "How fast is the RCMC issued?",
              "answer": "One source says within two days of application."
            },
            {
              "question": "Is an IEC needed?",
              "answer": "Yes."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Tea Board Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Exporters of Indian tea, including bulk tea, tea bags, packet and instant tea, tea estates and factories that export directly, blenders and packers, and merchant exporters who source tea from auctions or producers need this service.</p>\n\n<p>New tea brands planning international sales through e-commerce or distributors must complete the licence and RCMC steps before shipping. Even small shipments for samples or trade fairs may require the right documents.</p>\n\n<p>Established exporters should keep their licences and RCMCs current, because renewal or validity changes can affect their shipments.</p>\n\n<p>Companies that export multiple commodities will need separate registrations for each board, and should plan documentation together.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal authority to export tea under TDECO, 2005</li>\n<li>RCMC for Foreign Trade Policy benefits</li>\n<li>Online filing with the Tea Board's portal</li>\n<li>Guidance on licence and RCMC differences</li>\n<li>Support with renewals and updates</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the licence and RCMC, plan shipments and compliance.</p>\n\n<p><strong>Related services:</strong> IEC Code, AD Code, ICEGATE Registration, FSSAI registration and Coffee and Spice Board registrations.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Treating the exporter licence and the RCMC as the same thing.</li>\n<li>Quoting an old RCMC fee or validity.</li>\n<li>Missing documents such as the licence copy or manufacturer proof.</li>\n<li>Not renewing the licence in time.</li>\n<li>Exporting before both approvals are in place.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Approval timing varies, with one source saying the RCMC is issued within two days. Fees and validity are described differently across sources (the RCMC fee is described as free, Rs 5,600 valid five years or approximate).</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm fee and validity on the Tea Board's website before filing.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Tea Act, 1953 and the Tea (Distribution and Export) Control Order, 2005 give the Tea Board power to license exporters and regulate the trade. The system aims to support quality and orderly marketing while allowing exporters to access incentives under the Foreign Trade Policy.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A tea company obtains the Tea Board exporter licence and then the RCMC before shipping packet tea abroad.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A tea bag brand uses the RCMC to access benefits under the Foreign Trade Policy.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A merchant exporter renews its licence under the new auto-renewal provision.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Tea Board Registration | JR Compliance",
          "metaDescription": "To export tea from India, an exporter needs a Tea Board exporter licence under the Tea (Distribution and Export) Control Order, 2005 (TDECO) and then a…",
          "canonicalUrl": "/corporate/tea-board-registration",
          "keywords": "Tea Board Registration, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "import-export-service-page",
      "proposedSlug": "tobacco-board-registration",
      "matchSlugs": [
        "tobacco-board-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 49,
        "originalRow": 57,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Tobacco Board Registration",
        "menuLabel": "Tobacco Board Registration",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "Import Export",
          "description": "Under the Tobacco Board Act, 1975, exporters of tobacco and tobacco products register with the Tobacco Board (annual registration) and then obtain an RCMC, which is issued only through the DGFT e-RCMC platform. Registration is granted as merchant or manufacturer exporter. The Board says it issues the RCMC in about five working days when the application is in order. Growers of Virginia tobacco have separate registrations and barn licences."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Tobacco Board Registration?",
          "paragraphs": [
            {
              "text": "The Tobacco Board is a statutory body established under the Tobacco Board Act, 1975, with headquarters in Guntur, to regulate the production, marketing and export of Virginia tobacco and to promote the industry. The Act provides for registration of growers, nursery growers, curers, processors, manufacturers, exporters, packers, auctioneers and dealers."
            },
            {
              "text": "An RCMC is the certificate showing the exporter's registration with the Board for export benefits. For tobacco, the Board's official page says RCMC applications, whether fresh, renewal or amendment, are to be made on the DGFT e-RCMC platform. Exporters must first be registered with the Board under the relevant category, and registration under the Act is annual."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Where is the RCMC applied for?",
              "answer": "On the DGFT e-RCMC platform."
            },
            {
              "question": "How fast is it?",
              "answer": "The Board says about five working days when the application is in order."
            },
            {
              "question": "Is the registration annual?",
              "answer": "Exporter registration under the Act is annual."
            },
            {
              "question": "Are growers covered?",
              "answer": "No, growers have separate registrations."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Tobacco Board Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Exporters and merchant exporters of unmanufactured tobacco and tobacco products, and manufacturers exporting directly, need this service. Companies that buy tobacco from auctions and export it, processors and packers, and manufacturers of cigars, smokeless products or other tobacco goods for export are typical applicants.</p>\n\n<p>Growers, curers and barn operators use separate Tobacco Board registrations and are not covered by exporter RCMC alone.</p>\n\n<p>Exporters should plan registration well before their first shipment, because shipments without a valid registration and RCMC can be held at customs.</p>\n\n<p>If you export both tobacco and other goods, you may need other commodity board registrations in addition to this one.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Compliance with the Tobacco Board Act for exporters</li>\n<li>RCMC through the DGFT e-RCMC route</li>\n<li>Support for merchant and manufacturer categories</li>\n<li>Annual renewal tracking</li>\n<li>Fewer delays at customs</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, prepare shipments and keep registrations current.</p>\n\n<p><strong>Related services:</strong> IEC Code, AD Code, ICEGATE Registration, Trade Licence and other commodity board registrations.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying for the RCMC without first registering with the Tobacco Board.</li>\n<li>Missing proof of manufacturing for manufacturer exporters.</li>\n<li>Forgetting the annual renewal.</li>\n<li>Relying on an outdated checklist or fee.</li>\n<li>Confusing grower registrations with exporter registration.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The Board states about five working days for the RCMC when the application is in order. The official page does not give the full fee and document list, so it should be confirmed.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep your IEC, entity documents and manufacturing proof ready before applying.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Tobacco Board Act, 1975 provides for registration of various categories of persons in the tobacco trade, including exporters. This allows the Board to monitor exports, protect the industry's reputation and enforce quality norms.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A merchant exporter of tobacco registers with the Tobacco Board and then applies for the RCMC on the DGFT portal.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A manufacturer exporter submits proof of manufacturing such as an Udyam registration.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An exporter renews its annual registration with the Board to avoid shipment delays.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Tobacco exports combine two layers: registration with the Tobacco Board as an exporter and the RCMC through the DGFT platform. Sequence them correctly, and remember that growers and curers have separate registrations that do not substitute for the exporter's.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Tobacco Board Registration | JR Compliance",
          "metaDescription": "Under the Tobacco Board Act, 1975, exporters of tobacco and tobacco products register with the Tobacco Board (annual registration) and then obtain an RCMC…",
          "canonicalUrl": "/corporate/tobacco-board-registration",
          "keywords": "Tobacco Board Registration, Import Export, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "ayush-license",
      "matchSlugs": [
        "ayush-license"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 50,
        "originalRow": 61,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Ayush License",
        "menuLabel": "Ayush License",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "An AYUSH manufacturing licence is needed to manufacture Ayurvedic, Siddha, Sowa-Rigpa and Unani drugs under the Drugs and Cosmetics Act, 1940 and Rules, 1945 (Rules 153 and 156). Application is made in Form 24D through the e-AUSHADHI portal or the State Licensing Authority portal. After a site inspection, the State Licensing Authority issues the licence in Form 25D. A loan licence (Form 25E) lets a firm use another licensee's manufacturing facility."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Ayush License?",
          "paragraphs": [
            {
              "text": "An AYUSH licence is the statutory permission granted by the State Licensing Authority under the Drugs and Cosmetics Rules, 1945 to manufacture Ayurvedic, Siddha, Unani and Sowa-Rigpa medicines. It ensures that such traditional medicines meet safety, quality and Good Manufacturing Practice requirements. Making or selling these medicines without the required licence is an offence."
            },
            {
              "text": "Technical supervision must be provided by qualified persons: sources mention a pharmacist in Ayurvedic or Unani systems with at least eight years' experience, or a registered vaid or hakim with at least four years' experience in manufacturing Siddha or Unani drugs. Premises, equipment and GMP compliance must be suitable for the drugs proposed."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form is used to apply?",
              "answer": "Form 24D, with the licence in Form 25D."
            },
            {
              "question": "What is a loan licence?",
              "answer": "Form 25E, allowing a firm to use another licensee's manufacturing facility."
            },
            {
              "question": "How long is the licence valid?",
              "answer": "Perpetual, subject to a retention fee every five years, per sources."
            },
            {
              "question": "Do fees vary?",
              "answer": "Yes, they vary by state."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Ayush License",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Manufacturers of Ayurvedic, Siddha, Unani and Sowa-Rigpa medicines, herbal and proprietary formulations, brands that want to launch traditional medicine products, and startups building wellness products based on traditional systems need this licence.</p>\n\n<p>Companies that want to outsource production should look at the loan licence route. Those that plan to expand their product range will need to apply for additional products on their licence.</p>\n\n<p>If your products are classified as food supplements or cosmetics rather than drugs, a different licence, such as FSSAI or a cosmetic licence, may apply. A review of your product claims and ingredients helps determine the right regulatory category.</p>\n\n<p>Founders should also note that GMP infrastructure and qualified technical staff are required, so budgeting for a compliant facility is an important part of planning.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal permission to manufacture traditional medicines</li>\n<li>Properly prepared Form 24D with technical and premises documents</li>\n<li>Preparation for inspection by the licensing authority</li>\n<li>Loan licence option for brands without a plant</li>\n<li>Reduced risk of rejection and delays</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the licence, maintain GMP, labelling and advertising compliance.</p>\n\n<p><strong>Related services:</strong> GMP Certification, Trade Licence, Trademark Registration, FSSAI registration and Legal Metrology registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Underestimating the technical staff qualifications required.</li>\n<li>Making medical claims that violate advertising rules.</li>\n<li>Applying without proper premises and GMP-ready infrastructure.</li>\n<li>Ignoring state-specific forms and fees.</li>\n<li>Missing the five-year retention fee.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines depend on the state authority and the inspection. Fees vary by state, with sources quoting Rs 3,000 plus Rs 2,000 per product.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare the site, staff qualifications and product formulae documents before applying to avoid repeated queries.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Drugs and Cosmetics Act, 1940 and Rules, 1945 regulate the manufacture and sale of drugs, including traditional systems of medicine under Chapter IVA. The licensing system ensures that traditional medicines are manufactured under quality standards and that technical supervision is in the hands of qualified persons.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A herbal wellness startup wants to manufacture Ayurvedic tablets and applies for Form 24D with premises and staff details.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A brand owner without a plant uses a loan licence to have products made at a licensed unit.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A manufacturer adds new products to its existing licence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Ayush License | JR Compliance",
          "metaDescription": "An AYUSH manufacturing licence is needed to manufacture Ayurvedic, Siddha, Sowa-Rigpa and Unani drugs under the Drugs and Cosmetics Act, 1940 and Rules, 1945…",
          "canonicalUrl": "/corporate/ayush-license",
          "keywords": "Ayush License, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "trade-license",
      "matchSlugs": [
        "trade-license"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 51,
        "originalRow": 62,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Trade License",
        "menuLabel": "Trade License",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "A trade licence is issued by the local urban body, such as a municipal corporation, municipality or panchayat, for carrying on a specific trade or business at a specific address within its limits. It is governed by each state's Municipal Corporation Act, so the process, documents and fees differ from state to state. Licences are usually valid for one year and must be renewed annually, with late renewal attracting a penalty."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Trade License?",
          "paragraphs": [
            {
              "text": "A trade licence is a permit granted by the local municipal authority that allows a person or business to operate a particular trade at given premises, mainly to enforce health, safety and environmental standards. It is trade-specific and location-specific. It does not imply ownership of the property."
            },
            {
              "text": "It is separate from the Shops and Establishments licence issued under the state labour law and from MSME or Udyam registration. A business may need all of them. Examples of the state laws include the Delhi Municipal Corporation Act, 1957, the Mumbai Municipal Corporation Act, 1888, the Kolkata Municipal Corporation Act, 1980 and the Karnataka Municipal Corporations Act, 1976."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who issues a trade licence?",
              "answer": "The local municipal body, such as the municipal corporation, municipality or panchayat."
            },
            {
              "question": "How long is it valid?",
              "answer": "Usually one year, with annual renewal."
            },
            {
              "question": "Is it the same as Shop and Establishment registration?",
              "answer": "No. They are separate and a business may need both."
            },
            {
              "question": "What happens if I renew late?",
              "answer": "Penalties of roughly 25 to 50 percent of the fee in some corporations."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Trade License",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Shops, restaurants and cafes, factories and workshops, warehouses, clinics, salons, hotels and other businesses operating from commercial premises within municipal limits need a trade licence. Businesses dealing in food, hazardous goods or activities that affect public health are usually subject to closer scrutiny.</p>\n\n<p>Startups and small businesses that rent commercial space should check with the local authority at the start, because operating without a licence can result in fines and closure notices.</p>\n\n<p>Home-based businesses may also need a licence depending on the activity and local rules. Online-only businesses that do not operate from a physical premises may not need one but should check state rules.</p>\n\n<p>Landlords sometimes ask tenants for a trade licence before finalising a lease, so having one in place helps you move into premises smoothly.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal authority to operate from your premises</li>\n<li>Correct authority, form and fee identified for your city</li>\n<li>Support through inspection and follow-up</li>\n<li>Renewal reminders to avoid penalties</li>\n<li>Smoother dealings with banks, landlords and regulators</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After obtaining the licence, display it at the premises and renew on time.</p>\n\n<p><strong>Related services:</strong> Shop &amp; Establishment Registration, FSSAI registration, GST Registration, PSARA and Legal Metrology registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Assuming a Shop and Establishment registration replaces a trade licence.</li>\n<li>Operating before the licence is issued.</li>\n<li>Forgetting annual renewal and paying penalties.</li>\n<li>Using an address without proper ownership or NOC documents.</li>\n<li>Ignoring local zoning and fire safety requirements.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines and fees depend on the municipal body.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm the exact trade category and document list on your municipal corporation's website, and keep the property tax receipt and NOC from the owner ready.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>State Municipal Corporation Acts empower local bodies to license trades that may affect public health, safety or the environment. The licence helps the authority regulate where and how such trades operate, and renewal allows periodic checks.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A restaurant owner applies for a trade licence from the municipal corporation before opening.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A warehouse operator renews its trade licence before the annual deadline to avoid a penalty.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A salon moving to a new location applies for a fresh licence for the new address.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Trade License | JR Compliance",
          "metaDescription": "A trade licence is issued by the local urban body, such as a municipal corporation, municipality or panchayat, for carrying on a specific trade or business at…",
          "canonicalUrl": "/corporate/trade-license",
          "keywords": "Trade License, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "nsic-registration",
      "matchSlugs": [
        "nsic-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 52,
        "originalRow": 63,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "NSIC Registration",
        "menuLabel": "NSIC Registration",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "NSIC (National Small Industries Corporation, a Mini Ratna PSU under the Ministry of MSME) registers eligible micro and small enterprises under its Single Point Registration Scheme (SPRS) so that they can qualify for benefits under the Public Procurement Policy, such as tender fee and EMD waivers and preference in government purchases. Applicants must already hold Udyam registration and apply online on nsic.co.in with a turnover-linked fee."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is NSIC Registration?",
          "paragraphs": [
            {
              "text": "An NSIC registration is a certificate issued by the National Small Industries Corporation under its Single Point Registration Scheme to micro and small enterprises (MSEs) that supply goods or services to the government. It helps MSEs participate in government tenders and avail purchase preference, tender fee waiver and priority in procurement under the Public Procurement Policy for MSEs."
            },
            {
              "text": "NSIC registration is voluntary and builds on rather than replaces Udyam registration. To register, the enterprise must be a micro or small enterprise with a valid Udyam registration and be an operational manufacturing or service enterprise. Some categories cannot apply, and the list of exclusions is on the NSIC website."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is Udyam required?",
              "answer": "Yes, NSIC registration requires a valid Udyam registration."
            },
            {
              "question": "Is registration mandatory?",
              "answer": "No, it is voluntary."
            },
            {
              "question": "What is the fee?",
              "answer": "One source quotes Rs 5,000 plus GST for turnover up to Rs 1 crore; confirm on nsic.co.in."
            },
            {
              "question": "Who can apply?",
              "answer": "Micro and small enterprises, subject to NSIC's exclusions."
            }
          ]
        },
        "extraContent": [
          {
            "title": "NSIC Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Micro and small manufacturers and service providers that want to sell to government departments, PSUs and defence organisations should consider NSIC registration. Examples include furniture and equipment makers, IT hardware assemblers, printing and packaging firms, service providers such as housekeeping and security and small contractors.</p>\n\n<p>Startups with Udyam registration that plan to bid for government tenders can use the certificate to reduce the cost of bids through fee waivers.</p>\n\n<p>Medium enterprises are not eligible for MSE benefits, so businesses should first check their Udyam classification, which depends on investment and turnover limits.</p>\n\n<p>If you are not targeting government customers, NSIC registration may not add much value, and Udyam alone may be enough.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Tender fee and EMD waivers for eligible MSE bids</li>\n<li>Preference in government purchases under the Public Procurement Policy</li>\n<li>Documents prepared in the format NSIC requires</li>\n<li>Support with inspection and queries</li>\n<li>Credibility with government buyers</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After NSIC registration, register on GeM and watch for tenders.</p>\n\n<p><strong>Related services:</strong> Udyam (MSME) registration, GeM Registration, GST Registration and ISO certification.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying before getting Udyam registration.</li>\n<li>Assuming a medium enterprise can claim MSE benefits.</li>\n<li>Not checking the NSIC exclusion list.</li>\n<li>Forgetting to maintain turnover and financial records.</li>\n<li>Relying on an old fee schedule.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing time depends on NSIC's verification and possible inspection.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep audited financials, Udyam, GST and PAN documents consistent, and check the current fee schedule on nsic.co.in before paying.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Public Procurement Policy for Micro and Small Enterprises Order, 2012 (as amended) requires government departments to procure a share of goods and services from MSEs and gives them benefits such as fee waivers. NSIC's Single Point Registration Scheme helps MSEs access these benefits through one registration.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A micro manufacturer with Udyam wants to bid for government tenders and registers with NSIC to gain tender fee waivers.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A small IT hardware assembler uses the NSIC certificate to qualify for purchase preference.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A growing business checks its Udyam classification before applying to ensure it still qualifies as an MSE.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>NSIC registration should be seen as a procurement tool, not a general business certificate. Its value comes when you actually bid for government tenders where MSE preference applies, such as fee waivers and purchase preference. Before applying, test whether your target buyers use the Public Procurement Policy for MSEs, whether your product or service is covered, and whether your turnover keeps you within the micro or small classification, because crossing into medium status can end MSE benefits. Keep audited financials and Udyam details consistent, since NSIC verifies them, and review the fee schedule so that you pay the correct turnover-based amount.</p>"
          }
        ],
        "seo": {
          "metaTitle": "NSIC Registration | JR Compliance",
          "metaDescription": "NSIC (National Small Industries Corporation, a Mini Ratna PSU under the Ministry of MSME) registers eligible micro and small enterprises under its Single…",
          "canonicalUrl": "/corporate/nsic-registration",
          "keywords": "NSIC Registration, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "rera-registration",
      "matchSlugs": [
        "rera-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 53,
        "originalRow": 64,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "RERA Registration",
        "menuLabel": "RERA Registration",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "Under the Real Estate (Regulation and Development) Act, 2016, a promoter must register a real estate project with the State Real Estate Regulatory Authority (RERA) before advertising, marketing, booking or selling any plot, apartment or building in it. Real estate agents must also register before they facilitate sales in a registered project. Registration is done online on the respective state RERA portal, and the Act provides a 30-day decision window after which the project is deemed registered under Section 5."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is RERA Registration?",
          "paragraphs": [
            {
              "text": "RERA registration is the mandatory registration of a real estate project, by its promoter, or of a real estate agent, with the State Real Estate Regulatory Authority established under the RERA Act, 2016, which came into force on 1 May 2016. It aims to protect home buyers and bring transparency, accountability and standardisation to the real estate sector. Registered projects receive a RERA registration number, valid for the completion period declared by the promoter, extendable on application under Section 6."
            },
            {
              "text": "According to the Goa RERA's official FAQ, a project needs to be registered where the land area exceeds 500 square metres or the project has more than 8 apartments. One secondary page wrongly says both conditions must apply, so the official 'or' reading should be followed. Exemptions under Section 3(2) include projects that had already received a completion certificate before the Act and small projects below the thresholds."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is RERA registration required?",
              "answer": "When the land area exceeds 500 square metres or the project has more than 8 apartments, per Goa RERA's FAQ."
            },
            {
              "question": "Do agents need to register?",
              "answer": "Yes, real estate agents must register before facilitating sales in registered projects."
            },
            {
              "question": "What happens if the Authority does not decide in 30 days?",
              "answer": "The project is deemed registered under Section 5."
            },
            {
              "question": "Are fees the same everywhere?",
              "answer": "No, fees vary by state."
            }
          ]
        },
        "extraContent": [
          {
            "title": "RERA Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Builders, developers and promoters of residential and commercial projects, including plotted developments and redevelopment projects, need this service. Real estate agents, brokers and consultants who facilitate sale or purchase in RERA-registered projects must also register.</p>\n\n<p>Developers launching new phases of an existing project, or projects that were ongoing when RERA came into force and had not received a completion certificate, should check whether they need registration.</p>\n\n<p>Landowners entering into joint development agreements with builders should understand the registration requirements, since the promoter is responsible for compliance but the landowner's interests can be affected.</p>\n\n<p>Home buyers and investors can also benefit from understanding RERA registration, because buying in an unregistered project exposes them to greater risk.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal permission to advertise, market and sell units in the project</li>\n<li>Documents and escrow arrangements prepared correctly for your state portal</li>\n<li>Reduced risk of penalties and stop-work notices</li>\n<li>Credibility with buyers, banks and investors</li>\n<li>Support with quarterly updates and extensions</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, display the RERA number in advertisements, maintain the escrow account and submit quarterly updates.</p>\n\n<p><strong>Related services:</strong> Trade Licence, GST Registration, Legal Agreement drafting, Trademark Registration and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Starting sales or advertising before the project is registered.</li>\n<li>Reading the threshold as both conditions instead of either one.</li>\n<li>Not maintaining the designated escrow account as required.</li>\n<li>Missing quarterly progress updates.</li>\n<li>Using the wrong state portal or forms.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The Authority should decide within 30 days under Section 5, but real timelines depend on the completeness of documents and state processes. Fees vary widely by state, project type and size.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep approved plans, title documents and the escrow account details ready before starting the online form.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The RERA Act, 2016 was passed to address delays, lack of transparency and unfair practices in real estate. It requires registration of projects and agents, standardised disclosures and a dispute-resolution mechanism through state authorities and appellate tribunals.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A builder launching a residential tower with more than 8 apartments registers the project on the state RERA portal before opening bookings.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A broker who regularly sells flats in registered projects obtains agent registration to stay compliant.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A developer with an ongoing project nearing its deadline applies for an extension under Section 6.</p>"
          }
        ],
        "seo": {
          "metaTitle": "RERA Registration | JR Compliance",
          "metaDescription": "Under the Real Estate (Regulation and Development) Act, 2016, a promoter must register a real estate project with the State Real Estate Regulatory Authority…",
          "canonicalUrl": "/corporate/rera-registration",
          "keywords": "RERA Registration, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "gem-registration",
      "matchSlugs": [
        "gem-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 54,
        "originalRow": 65,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "GEM Registration",
        "menuLabel": "GEM Registration",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "GeM (Government e-Marketplace), launched in August 2016, is India's national public-procurement portal. Sellers register online at gem.gov.in using PAN and Aadhaar and their business details. According to most current sources, registration is free of government fee and takes from minutes to a few days, though some sellers, such as OEMs and certain categories, also need a separate Vendor Assessment."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is GEM Registration?",
          "paragraphs": [
            {
              "text": "The Government e-Marketplace is an online platform where central and state government departments, PSUs and local bodies buy goods and services from registered sellers and service providers. GeM aims for transparency, efficiency and competitive pricing in public procurement."
            },
            {
              "text": "Seller registration creates the supplier's account and links verified PAN, GST, Aadhaar and bank details. It allows the seller to list products or services, respond to bids, receive orders and get paid through the platform. Vendor assessment or empanelment is an additional verification that applies to OEMs or specific categories, and sources quote different assessment fees, such as Rs 11,200 plus GST, Rs 12,000 plus GST or Rs 5,000 to 25,000."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is GeM registration free?",
              "answer": "Most current sources say yes; one older page lists a seller fee. Confirm on gem.gov.in."
            },
            {
              "question": "What documents are needed?",
              "answer": "PAN, Aadhaar, GST, bank details and business registration proof."
            },
            {
              "question": "Do I need vendor assessment?",
              "answer": "For OEMs and certain categories; fees quoted vary by source."
            },
            {
              "question": "Who can register?",
              "answer": "Proprietorships, partnerships, companies, LLPs, MSMEs and startups."
            }
          ]
        },
        "extraContent": [
          {
            "title": "GEM Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>MSMEs, startups, manufacturers, traders and service providers who want to sell to government departments and PSUs benefit from GeM. Examples include suppliers of office furniture, electronics, stationery, uniforms, vehicles on hire, housekeeping and security services, IT services and construction materials.</p>\n\n<p>Startups with DPIIT recognition and MSMEs with Udyam registration can use GeM to access preferential treatment in some categories. Women-led enterprises and local suppliers can also benefit from specific provisions.</p>\n\n<p>Businesses that have been selling to government through offline tenders can use GeM to reach more departments with less paperwork.</p>\n\n<p>Sellers should be ready for the operational side: accurate catalogue details, timely delivery and responding to bids. A well-prepared profile improves visibility.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Access to a large pool of government buyers on one portal</li>\n<li>Profile, catalogue and documents set up correctly</li>\n<li>Guidance on vendor assessment and OEM empanelment</li>\n<li>Support for startup and MSME benefits</li>\n<li>Reduced paperwork compared with offline tenders</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, upload your catalogue, respond to bids and manage orders.</p>\n\n<p><strong>Related services:</strong> Udyam (MSME) registration, NSIC Registration, GST Registration, Startup India Registration and ISO certification.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Leaving the profile or catalogue incomplete.</li>\n<li>Not verifying PAN, GST and Aadhaar details properly.</li>\n<li>Missing vendor assessment requirements for OEMs.</li>\n<li>Quoting prices without understanding delivery and payment rules.</li>\n<li>Ignoring updates to categories and rules.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Registration can take from minutes to a few days according to sources. Vendor assessment fees vary widely across sources.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> complete the profile fully and keep GST and bank details consistent, since mismatches slow approval.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>GeM was set up by the Government to bring transparency and efficiency to public procurement under the General Financial Rules. Government buyers are encouraged or required to purchase available items through GeM, which makes seller registration an important route to government business.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A small stationery manufacturer with Udyam registers on GeM and lists its products for departmental orders.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A security services company registers as a service provider and bids for contracts.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An IT hardware OEM completes vendor assessment so it can list its branded products.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>GeM success depends as much on the quality of your catalogue as on registration. Government buyers compare listings, so accurate specifications, clear photographs, correct HSN codes and reliable delivery commitments matter. Treat the GeM profile as a living storefront and keep your GST, bank and Udyam details current.</p>"
          }
        ],
        "seo": {
          "metaTitle": "GEM Registration | JR Compliance",
          "metaDescription": "GeM (Government e-Marketplace), launched in August 2016, is India's national public-procurement portal. Sellers register online at gem.gov.in using PAN and…",
          "canonicalUrl": "/corporate/gem-registration",
          "keywords": "GEM Registration, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "psara-licence",
      "matchSlugs": [
        "psara-licence",
        "psara-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 55,
        "originalRow": 66,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Psara Registration",
        "menuLabel": "Psara Registration",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "A PSARA licence is mandatory to run a private security agency in India under the Private Security Agencies (Regulation) Act, 2005, supported by the Private Security Agencies Central Model Rules, 2006. It is granted by the Controlling Authority of the state concerned, an officer not below the rank of Joint Secretary, after document and police verification and a tie-up with a recognised security training institute. The licence is state-specific and the process typically takes 45 to 60 days."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Psara Registration?",
          "paragraphs": [
            {
              "text": "PSARA stands for the Private Security Agencies (Regulation) Act, 2005. A PSARA licence is the legal authorisation issued by the State Controlling Authority, usually under the Home Department, that allows a person or company to operate a private security agency and supply security guards. It regulates licensing, training, antecedent checks, uniforms and monitoring of agencies, and operating without it is an offence."
            },
            {
              "text": "The application is made in Form I with the state fee. The applicant must provide constitution documents, identity and address proof of directors or partners, police verification or character certificates, proof of premises, and an MOU with a training institute recognised by the state. The agency's uniform and insignia details must also be submitted."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which law governs private security agencies?",
              "answer": "The Private Security Agencies (Regulation) Act, 2005 and the Central Model Rules, 2006."
            },
            {
              "question": "Who grants the licence?",
              "answer": "The Controlling Authority of the state."
            },
            {
              "question": "Is a licence valid across states?",
              "answer": "No, a separate licence is needed in each state."
            },
            {
              "question": "Is a training MOU required?",
              "answer": "Yes, an MOU with a recognised training institute is required."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Psara Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Individuals and companies planning to start a security guard agency, event security providers, close-protection services, housekeeping and facility management companies that want to offer guarding services, and existing agencies that want to expand to new states need a PSARA licence.</p>\n\n<p>Clients such as corporates, banks, hospitals and housing societies who hire security agencies should also understand it, because they are expected to hire only licensed agencies.</p>\n\n<p>Existing agencies should keep their licence renewed and update it when directors or addresses change.</p>\n\n<p>If you only plan to hire security guards for your own establishment, as in-house staff, you may not need an agency licence, but you should check state rules.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal authorisation to run a private security agency</li>\n<li>Correct state forms, documents and fee prepared</li>\n<li>Training institute MOU and uniform details arranged</li>\n<li>Support through police verification</li>\n<li>Reduced risk of rejection or delay</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the licence, train guards, maintain registers and comply with reporting.</p>\n\n<p><strong>Related services:</strong> Trade Licence, GST Registration, Shop &amp; Establishment Registration, EPF Registration and ESIC Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Operating without a PSARA licence.</li>\n<li>Assuming one state's licence covers other states.</li>\n<li>Missing the training institute MOU.</li>\n<li>Weak police verification documents.</li>\n<li>Not following uniform and insignia rules.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The process typically takes 45 to 60 days. Fees vary by state.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm the state authority's checklist and complete police verification of directors early, since it often determines the timeline.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The PSARA Act, 2005 was enacted to regulate the growing private security industry, ensure training and verification of guards and protect clients and the public. State rules add details on fees and procedures.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A new company wants to provide security guards to offices and applies for a PSARA licence in its state.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An agency licensed in one state wants to expand to a neighbouring state and applies for a licence there.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A facility management company adds guarding services and obtains PSARA registration.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Psara Registration | JR Compliance",
          "metaDescription": "A PSARA licence is mandatory to run a private security agency in India under the Private Security Agencies (Regulation) Act, 2005, supported by the Private…",
          "canonicalUrl": "/corporate/psara-licence",
          "keywords": "Psara Registration, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "iso-all-types",
      "matchSlugs": [
        "iso-all-types"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 56,
        "originalRow": 67,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "ISO (ALL TYPES)",
        "menuLabel": "ISO (ALL TYPES)",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "ISO certification confirms that an organisation's management system meets an international standard such as ISO 9001 (quality), ISO 14001 (environment), ISO 45001 (occupational health and safety), ISO 27001 (information security) or ISO 22000 (food safety). It is obtained from an accredited certification body, such as one accredited by NABCB, or through BIS for its management-system schemes, after gap analysis, documentation, internal audit and a two-stage external audit. Certificates are valid for three years with annual surveillance audits."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ISO (ALL TYPES)?",
          "paragraphs": [
            {
              "text": "ISO (the International Organization for Standardization) publishes international standards, and ISO certification means that a third-party certification body has audited an organisation and confirmed that its management system conforms to a particular standard. Common standards include ISO 9001 for quality management, ISO 14001 for environmental management, ISO 45001 for occupational health and safety, ISO/IEC 27001 for information security, ISO 22000 for food safety, ISO 13485 for medical devices and ISO 50001 for energy."
            },
            {
              "text": "ISO standards are voluntary, though customers, tenders and exporters often require them. Certification is for a defined scope, such as a set of products, services or sites."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long is an ISO certificate valid?",
              "answer": "Three years, with annual surveillance audits."
            },
            {
              "question": "What are the audit stages?",
              "answer": "Stage 1 (documentation and readiness) and Stage 2 (implementation on site)."
            },
            {
              "question": "Is ISO certification mandatory?",
              "answer": "Generally no, but customers and tenders often require it."
            },
            {
              "question": "Does the certification body matter?",
              "answer": "Yes, use an accredited body such as NABCB-accredited agencies."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ISO (ALL TYPES)",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Manufacturers, exporters, construction and infrastructure contractors bidding for tenders, IT and data-handling companies, food businesses, hospitals, educational institutions and service providers often need ISO certification. Companies that want to demonstrate quality, safety or environmental responsibility to customers also benefit.</p>\n\n<p>Startups that serve enterprise clients may be asked for ISO 27001 or ISO 9001 as part of vendor due diligence. Companies in regulated sectors may need specific standards such as ISO 13485 for medical devices.</p>\n\n<p>Organisations that already have good processes but no formal certification can get certified with relatively modest changes, while those without structured processes will need more work.</p>\n\n<p>If you are unsure which standard fits your needs, we help you choose based on your customers, tenders and risks.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Recognised proof of quality, safety, environmental or security practices</li>\n<li>Eligibility for tenders and enterprise contracts</li>\n<li>Structured gap analysis, documentation and audit preparation</li>\n<li>Accredited certification body selected for you</li>\n<li>Process improvement through internal audits and reviews</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After certification, keep the management system running, conduct internal audits and prepare for surveillance audits.</p>\n\n<p><strong>Related services:</strong> GMP Certification, HACCP, FSSAI registration, BIS certification and STQC certification.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Buying a certificate without implementing the system.</li>\n<li>Choosing a non-accredited body.</li>\n<li>Setting an unrealistic scope.</li>\n<li>Skipping internal audits and management review.</li>\n<li>Missing surveillance audits.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines depend on how ready your processes are. Fees vary by body and scope.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> choose the standard that matches your customers' requirements and define the scope carefully so that the certificate is useful in tenders.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>International standards help organisations apply good practice in a consistent way. In India, certification bodies are accredited by NABCB (a Quality Council of India board), and BIS provides management-system certification for certain standards.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A software company obtains ISO 27001 to satisfy enterprise customers' security requirements.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A manufacturer secures ISO 9001 to qualify for government tenders.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A food processor combines ISO 22000 with FSSAI compliance to supply organised retail.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Selecting the right ISO standard is the most important decision. Choose according to what your customers and regulators ask for, not what sounds impressive: quality (9001) for general supply, information security (27001) for data-sensitive services, food safety (22000) for food businesses, environment (14001) and safety (45001) where tenders require them. Define the scope carefully, because the certificate applies only to what is inside it.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ISO (ALL TYPES) | JR Compliance",
          "metaDescription": "ISO certification confirms that an organisation's management system meets an international standard such as ISO 9001 (quality), ISO 14001 (environment), ISO…",
          "canonicalUrl": "/corporate/iso-all-types",
          "keywords": "ISO (ALL TYPES), Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "gmp",
      "matchSlugs": [
        "gmp"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 57,
        "originalRow": 68,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "GMP",
        "menuLabel": "GMP",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "Good Manufacturing Practices (GMP) are quality and hygiene standards for manufacturing. In India, pharmaceutical GMP is mandatory under Schedule M of the Drugs Rules, 1945 (revised Schedule M notified on 28 December 2023), enforced by state drug controllers and CDSCO. Exporters usually also need a WHO-GMP certificate and product-wise COPP from CDSCO, applied for on the ONDLS portal and typically valid for three years. Food GMP and GHP are covered by Schedule 4 of the FSSAI licensing regulations, and cosmetics by Schedule M-II."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is GMP?",
          "paragraphs": [
            {
              "text": "GMP stands for Good Manufacturing Practices, a system of requirements ensuring that products are consistently produced and controlled to quality standards. It covers premises, equipment, personnel, documentation, hygiene, validation and self-inspection. Revised Schedule M requires a Pharmaceutical Quality System, including Quality Risk Management, an annual product quality review, validation and computerised-system provisions, aligned with WHO-GMP and PIC/S."
            },
            {
              "text": "The term 'GMP certification' can mean two things. One is compliance with Schedule M for the manufacturing licence, which is mandatory for pharmaceutical manufacturers. The other is a WHO-GMP certificate issued after inspection, which is voluntary except where importing countries or tenders require it, mainly for exports."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is GMP mandatory for pharma manufacturers?",
              "answer": "Yes, compliance with Schedule M is mandatory for pharmaceutical manufacturing licences."
            },
            {
              "question": "What is WHO-GMP?",
              "answer": "A certificate issued after inspection, mainly for exports, typically valid for three years."
            },
            {
              "question": "When did revised Schedule M come into force?",
              "answer": "It was notified on 28 December 2023; transition timelines differ, so confirm with CDSCO."
            },
            {
              "question": "Does GMP apply to food and cosmetics?",
              "answer": "Yes, through FSSAI Schedule 4 for food and Schedule M-II for cosmetics."
            }
          ]
        },
        "extraContent": [
          {
            "title": "GMP",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Pharmaceutical manufacturers, nutraceutical and cosmetic producers, food manufacturers, and exporters needing WHO-GMP or COPP certificates all need this service. Firms bidding for government pharma tenders often need proof of GMP compliance.</p>\n\n<p>MSME pharma units must plan for revised Schedule M requirements, which involve upgrades to systems and documentation. Contract manufacturers who serve multiple brands should maintain strong quality systems because their clients audit them.</p>\n\n<p>Startups planning to launch pharmaceutical or cosmetic products should build GMP into their facility design from the start, since retrofitting is expensive.</p>\n\n<p>If you only need a basic food safety licence, FSSAI GMP and GHP may be enough, but export customers may ask for more.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Clear understanding of which GMP rules apply to your products</li>\n<li>Gap assessment and upgrade plan for premises and quality systems</li>\n<li>Site Master File and documentation prepared</li>\n<li>Support for CDSCO WHO-GMP and COPP applications</li>\n<li>Better readiness for audits and exports</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After GMP compliance, maintain the quality system and prepare for inspections.</p>\n\n<p><strong>Related services:</strong> CDSCO registrations, HACCP, ISO certification, FSSAI registration and AYUSH licence.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Relying on old Schedule M requirements.</li>\n<li>Treating WHO-GMP as the same as a manufacturing licence.</li>\n<li>Underestimating documentation and validation effort.</li>\n<li>Not planning equipment and facility upgrades in time.</li>\n<li>Ignoring client audits and self-inspections.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines depend on the readiness of your facility and the inspection schedule. WHO-GMP certificates are typically valid for three years.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> run a gap assessment early and prioritise changes that affect product quality and documentation.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Schedule M of the Drugs Rules, 1945 sets GMP requirements for pharmaceutical products. The 2023 revision aligns India's requirements with international standards to improve quality and support exports.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A mid-size pharma plant performs a gap assessment to meet revised Schedule M.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An exporter applies for a WHO-GMP certificate and COPP to supply to overseas buyers.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A cosmetics manufacturer aligns its facility with Schedule M-II.</p>"
          }
        ],
        "seo": {
          "metaTitle": "GMP | JR Compliance",
          "metaDescription": "Good Manufacturing Practices (GMP) are quality and hygiene standards for manufacturing. In India, pharmaceutical GMP is mandatory under Schedule M of the…",
          "canonicalUrl": "/corporate/gmp",
          "keywords": "GMP, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "government-license-certification-page",
      "proposedSlug": "haccp",
      "matchSlugs": [
        "haccp"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 58,
        "originalRow": 69,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "HACCP",
        "menuLabel": "HACCP",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "Government License & Certification",
          "description": "HACCP (Hazard Analysis and Critical Control Points) is a preventive food-safety system based on seven Codex Alimentarius principles. Businesses implement a HACCP plan covering preliminary steps, hazard analysis, critical control points, critical limits, monitoring, corrective action, verification and records, and may then be assessed by an accredited third-party body in a two-stage audit, often as part of ISO 22000 or FSSC 22000."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is HACCP?",
          "paragraphs": [
            {
              "text": "HACCP is a systematic, science-based approach that identifies, evaluates and controls hazards, biological, chemical and physical, at specific critical control points in the food chain, rather than relying only on end-product testing. Its seven principles are conducting a hazard analysis, identifying critical control points, establishing critical limits, establishing monitoring procedures, establishing corrective actions, establishing verification procedures and maintaining records and documentation."
            },
            {
              "text": "HACCP is built into ISO 22000:2018 and FSSC 22000 and is often implemented alongside prerequisite programmes such as GMP, sanitation, pest control, supplier approval, traceability and recall, and calibration."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What are the principles of HACCP?",
              "answer": "Seven: hazard analysis, critical control points, critical limits, monitoring, corrective actions, verification and record-keeping."
            },
            {
              "question": "Is HACCP mandatory?",
              "answer": "Sources differ; check FSSAI licensing conditions for your category."
            },
            {
              "question": "How is it certified?",
              "answer": "By an accredited third-party body in a two-stage audit."
            },
            {
              "question": "Is HACCP the same as ISO 22000?",
              "answer": "No, but HACCP is built into ISO 22000."
            }
          ]
        },
        "extraContent": [
          {
            "title": "HACCP",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Food manufacturers, processors, restaurants and caterers, cloud kitchens, packaged-food brands, exporters to markets such as the EU and US, and suppliers to organised retail who need to prove food-safety systems benefit from HACCP.</p>\n\n<p>Startups launching packaged food products should build HACCP into their processes early, because retrofitting after launch can be difficult and expensive.</p>\n\n<p>Businesses that already hold FSSAI licences may use HACCP to strengthen controls and to meet buyer requirements.</p>\n\n<p>If you want a broader food safety management system certification, ISO 22000 or FSSC 22000 may be better, and we help you decide.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Preventive control of food-safety hazards</li>\n<li>Documented plan with seven principles applied to your process</li>\n<li>Training and audit readiness</li>\n<li>Credibility with buyers and exporters</li>\n<li>Foundation for ISO 22000 or FSSC 22000</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After HACCP certification, maintain monitoring records and prepare for surveillance audits.</p>\n\n<p><strong>Related services:</strong> FSSAI Basic, State and Central licences, ISO certification, GMP and Water Report.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Writing a HACCP plan without a proper hazard analysis.</li>\n<li>Ignoring prerequisite programmes.</li>\n<li>Poor record-keeping and no verification.</li>\n<li>Choosing a non-accredited certification body.</li>\n<li>Treating HACCP as a one-time exercise.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines depend on process complexity and readiness.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> map your process flow carefully, because accurate flow diagrams make hazard analysis and critical control point identification much easier.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>HACCP principles come from the Codex Alimentarius Commission and are widely used in food regulation. In India, FSSAI's licensing and hygiene requirements incorporate GMP and GHP and encourage HACCP-based systems.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A packaged snack manufacturer builds a HACCP plan for fryers and packaging lines.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A catering company implements HACCP in its central kitchen.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An exporter of processed fruit pulp obtains HACCP certification to meet a buyer's requirement.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>HACCP works because it shifts attention from checking finished food to controlling the steps that create risk. The seven principles are only as good as the process knowledge behind them, so involve the people who run production when drawing flow diagrams and identifying hazards. Remember that prerequisite programmes such as hygiene, pest control, supplier approval and traceability are the foundation; a HACCP plan built on weak basics will not hold. Finally, check how HACCP interacts with your FSSAI licence conditions and any buyer or export requirements, since sources describe the regulatory position differently.</p>"
          }
        ],
        "seo": {
          "metaTitle": "HACCP | JR Compliance",
          "metaDescription": "HACCP (Hazard Analysis and Critical Control Points) is a preventive food-safety system based on seven Codex Alimentarius principles. Businesses implement a…",
          "canonicalUrl": "/corporate/haccp",
          "keywords": "HACCP, Government License & Certification, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "trademark-registration",
      "matchSlugs": [
        "trademark-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 59,
        "originalRow": 73,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "TRADEMARK Registration",
        "menuLabel": "TRADEMARK Registration",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "Trademark registration protects a brand name, logo, symbol or slogan under the Trade Marks Act, 1999 and the Trade Marks Rules, 2017. The application is filed in Form TM-A with the Trade Marks Registry, and it then goes through formalities check, examination, publication in the Trade Marks Journal and an opposition window before the registration certificate is issued. Registration is valid for 10 years and can be renewed. E-filing fee is Rs 4,500 per class for individuals, startups and small enterprises, and Rs 9,000 per class for others."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TRADEMARK Registration?",
          "paragraphs": [
            {
              "text": "A trademark is a mark capable of being represented graphically that distinguishes the goods or services of one person from those of others. It may include the shape of goods, packaging and colour combinations. Registration under the Trade Marks Act, 1999 gives the owner the exclusive right to use the mark for the registered goods or services and to take action against infringement."
            },
            {
              "text": "The Registrar can refuse registration on absolute grounds under Section 9, for example where the mark is not distinctive, is descriptive or has become customary in trade, and on relative grounds under Section 11, where the mark conflicts with an earlier mark. Applications are made class-wise: there are 45 Nice classes, with classes 1 to 34 covering goods and 35 to 45 covering services, and the fee is payable per class."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the government fee?",
              "answer": "Rs 4,500 per class for individuals, startups and small enterprises; Rs 9,000 per class for others (e-filing)."
            },
            {
              "question": "How long does registration last?",
              "answer": "Ten years from filing, renewable."
            },
            {
              "question": "How long is the opposition window?",
              "answer": "Four months under the Trade Marks Rules, 2017."
            },
            {
              "question": "Can I use the TM symbol before registration?",
              "answer": "Yes, many brands use the TM symbol while the application is pending; the circled R is used only after registration."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TRADEMARK Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Startups, MSMEs, established brands, e-commerce sellers, manufacturers, service providers and professionals who want exclusive rights to a name or logo should register a trademark. It is especially important for businesses that sell online, because marketplaces ask for trademark registration for brand registry and brand protection programmes.</p>\n\n<p>Founders who are about to launch a product, put up a website or begin advertising should file as early as possible, because trademark rights depend largely on who applies first, and use claims can be contested.</p>\n\n<p>Companies that plan to franchise, license their brand or sell it later need registration to create a transferable asset.</p>\n\n<p>If you are only using a descriptive or generic name, registration may be difficult, and a more distinctive brand name or logo is advisable. A search and professional advice before filing can help avoid objections.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Exclusive rights to your brand name, logo or slogan</li>\n<li>Ability to take legal action against infringers</li>\n<li>Class selection and TM-A filing done correctly</li>\n<li>Support through objection, hearing and opposition stages</li>\n<li>Ten-year validity with renewal reminders</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, track the status, respond to objections and renew before expiry.</p>\n\n<p><strong>Related services:</strong> TM Search, TM Application Filing, TM Objection reply, TM Opposition and Trademark Renewal.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Filing without a trademark search.</li>\n<li>Choosing the wrong class or too few classes.</li>\n<li>Using a descriptive or generic name.</li>\n<li>Ignoring examination reports and deadlines.</li>\n<li>Forgetting renewal after ten years.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Examination reports typically arrive in about three to six months after filing, and the whole process can take longer if there are objections or oppositions.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> file as soon as you finalise the brand and keep your logo files and class list ready.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Trade Marks Act, 1999 and the Trade Marks Rules, 2017 provide the legal framework for registration, opposition, renewal and enforcement of trademarks in India. Registration is the foundation for infringement actions and for building the brand as a transferable asset.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A D2C skincare startup registers its brand name and logo before launching on marketplaces.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A restaurant chain registers its name in the services classes before opening franchises.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A manufacturer registers its product brand in the goods class relevant to its products.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TRADEMARK Registration | JR Compliance",
          "metaDescription": "Trademark registration protects a brand name, logo, symbol or slogan under the Trade Marks Act, 1999 and the Trade Marks Rules, 2017. The application is filed…",
          "canonicalUrl": "/corporate/trademark-registration",
          "keywords": "TRADEMARK Registration, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "tm-search",
      "matchSlugs": [
        "tm-search"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 60,
        "originalRow": 74,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "TM Search",
        "menuLabel": "TM Search",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A trademark search checks whether a brand name or logo is already registered or applied for before you file. IP India offers a free public search on its trademark portal with three search types: wordmark, phonetic and Vienna code (for logos), run one class at a time. A search is not mandatory but is strongly advised, because it reduces the risk of objection or opposition and wasted fees."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TM Search?",
          "paragraphs": [
            {
              "text": "A trademark search, also called an availability search, is a search of the Trade Marks Register and pending applications to find identical or deceptively similar marks in the same or related classes. A wordmark search looks for the same or similar text. A phonetic search looks for names that sound alike regardless of spelling. A Vienna code search looks for similar logo elements using the six-digit Vienna classification."
            },
            {
              "text": "The Controller General introduced free public search on the IP India website by notification dated 13 January 2011. Searches are run one class at a time, and there are 45 Nice classes, so a thorough search covers all classes where the brand may be used."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is the IP India search free?",
              "answer": "Yes, the public search is free."
            },
            {
              "question": "Which searches should I run?",
              "answer": "Wordmark, phonetic and, for logos, Vienna code searches in all relevant classes."
            },
            {
              "question": "Does a clear search guarantee registration?",
              "answer": "No, the Registrar may still object, and market use is not covered by the register search."
            },
            {
              "question": "Why does the portal address differ across guides?",
              "answer": "The portal has moved over time; use the link on ipindia.gov.in."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TM Search",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Founders choosing a brand name, businesses launching new products, companies planning to file a trademark and those worried about infringement should run a search first. It is also useful for brand owners checking whether competitors have applied for similar marks.</p>\n\n<p>Startups often fall in love with a name before checking whether it is available, and a search at the start saves rebranding costs later.</p>\n\n<p>If you already operate under a name and have not registered it, a search can tell you whether someone else has filed, and how urgent it is for you to apply.</p>\n\n<p>For important brands, a professional search with an opinion on risk is worth the cost.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Early warning of conflicting marks before you spend on filing</li>\n<li>Wordmark, phonetic and logo (Vienna code) checks across relevant classes</li>\n<li>Clear risk assessment and alternative suggestions</li>\n<li>Fewer objections and oppositions later</li>\n<li>Saves time and rebranding costs</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the search, decide whether to proceed, change the name or file.</p>\n\n<p><strong>Related services:</strong> Trademark Registration, TM Application Filing, Name Approval/RUN and Logo Designing.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Searching only the exact spelling.</li>\n<li>Searching only one class.</li>\n<li>Ignoring phonetic similarity.</li>\n<li>Assuming the register shows all uses of a name.</li>\n<li>Skipping the search to save time.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>A basic search takes minutes on the IP India portal, while a professional report may take a day or two.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> run searches for every spelling variant and for each class you plan to use before you finalise branding.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Trade Marks Registry maintains the Register of Trade Marks, and the public search lets anyone check it. Under Section 11 of the Act, the Registrar refuses marks that are identical or deceptively similar to earlier marks for similar goods or services.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A founder checks three candidate names and drops one that has a similar registered mark.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A brand owner uses a Vienna code search to check whether a similar logo has been filed.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company expanding to new product lines searches additional classes.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>A trademark search is most valuable when it is systematic: every spelling variant, phonetic equivalent and relevant class, not just the exact name. Record the results and the date, because they also help later if you need to explain why your mark is distinguishable.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TM Search | JR Compliance",
          "metaDescription": "A trademark search checks whether a brand name or logo is already registered or applied for before you file. IP India offers a free public search on its…",
          "canonicalUrl": "/corporate/tm-search",
          "keywords": "TM Search, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "tm-application-filing",
      "matchSlugs": [
        "tm-application-filing"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 61,
        "originalRow": 75,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "TM Application Filing",
        "menuLabel": "TM Application Filing",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "The trademark application is filed in Form TM-A on the IP India e-filing portal, or physically at one of the five Trade Marks Registry offices at Mumbai, Delhi, Kolkata, Chennai or Ahmedabad, with the fee per class. After filing, an application number is generated and the Registry begins its formalities check and examination. E-filing fee is Rs 4,500 per class for individuals, startups and small enterprises and Rs 9,000 per class for others."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TM Application Filing?",
          "paragraphs": [
            {
              "text": "Trademark application filing is the formal submission of Form TM-A to the Trade Marks Registry requesting registration of a mark for specified goods or services. The date of filing fixes the applicant's priority, and the 10-year term runs from that date. The application can be for a mark already in use, with a user date, or for a mark proposed to be used."
            },
            {
              "text": "One application covers one mark and can cover multiple classes, with the fee payable for each class. The Registry office is determined by the applicant's principal place of business, with five offices serving different regions. The mark must be capable of distinguishing goods or services and not fall under Sections 9 or 11."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Where is the application filed?",
              "answer": "On the IP India e-filing portal, or at one of the five Trade Marks Registry offices."
            },
            {
              "question": "What form is used?",
              "answer": "Form TM-A, with TM-48 if filed through an agent."
            },
            {
              "question": "Can I file for a mark I have not yet used?",
              "answer": "Yes, a proposed-to-be-used mark can be filed."
            },
            {
              "question": "Is the fee per class?",
              "answer": "Yes."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TM Application Filing",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Brand owners, startups, MSMEs and agents or attorneys filing on behalf of clients need to file applications. Businesses that have chosen a name and are about to launch should file at once.</p>\n\n<p>Companies that have been using a mark for some time without registration should file with the user date to establish priority.</p>\n\n<p>If you have several brands or product lines, plan classes carefully so that each important mark is protected where it matters most.</p>\n\n<p>Applicants who want to claim reduced fees should prepare their Udyam or startup certificate in advance.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct class selection and description of goods or services</li>\n<li>TM-48 and mark representation prepared properly</li>\n<li>Reduced fee claimed where eligible</li>\n<li>Filing receipt and application number delivered quickly</li>\n<li>Lower risk of formality check failure</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, track the status and be ready to respond to formality or examination reports.</p>\n\n<p><strong>Related services:</strong> TM Search, Formality Check Fail, TM Objection, TM Hearing and Trademark Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Filing in the wrong class.</li>\n<li>Poor logo quality or format.</li>\n<li>Not signing TM-48 properly.</li>\n<li>Choosing a description that is too narrow.</li>\n<li>Missing the formality fail deadline.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Filing itself can be done within a day once documents are ready.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep your logo in the required format, the proposed classes and goods and services list, and applicant details ready so that the application can be filed without delay.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Under the Trade Marks Rules, 2017, applications are made in prescribed forms with prescribed fees. Filing establishes the priority date, which matters in disputes over who first claimed the mark.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup files a TM-A for its brand name and logo in two classes.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A family business that has used a name for years files with a user date.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A small enterprise claims the concessional fee by attaching its Udyam certificate.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>The most common cause of avoidable delay in trademark applications is the application itself: wrong class, a poorly described list of goods or services, or an invalid authorisation. Treat the filing as a drafting exercise. Describe goods and services precisely enough to cover your business and expansion plans, but not so broadly that you invite objections. Choose classes based on what you sell today and what you expect to sell in the next few years, and keep your user date evidence handy if you claim prior use. Once filed, monitor the status regularly so that formality notices and examination reports are answered inside the time limits.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TM Application Filing | JR Compliance",
          "metaDescription": "The trademark application is filed in Form TM-A on the IP India e-filing portal, or physically at one of the five Trade Marks Registry offices at Mumbai…",
          "canonicalUrl": "/corporate/tm-application-filing",
          "keywords": "TM Application Filing, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "formality-check-fail",
      "matchSlugs": [
        "formality-check-fail"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 62,
        "originalRow": 76,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Formality Check Fail",
        "menuLabel": "Formality Check Fail",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "'Formalities Chk Fail' is a status on the IP India portal showing that the Trade Marks Registry found a procedural or documentary deficiency in a trademark application, for example a missing or defective Form TM-48, a wrong class, a logo mismatch, a missing translation or a fee error. It is not a rejection. The applicant must correct the deficiency, generally within 30 days, by filing a reply (MIS-F, with Form TM-M if details need to be amended), or the application may be treated as abandoned."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Formality Check Fail?",
          "paragraphs": [
            {
              "text": "Formality check is the Registry's preliminary administrative screening of a trademark application before examination on merits. A 'Formality Check Fail' means the application, representation, fee or supporting documents did not meet the formal requirements, and the Registry issues a notice describing the defect. Passing the formality check moves the application to substantive examination."
            },
            {
              "text": "Typical defects include missing or improperly executed Form TM-48 (power of attorney), absence of translation or transliteration certificates for non-English marks, missing user affidavit, errors in applicant details or identity documents, unclear logo files, incorrect goods and services description and class errors."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is a formality fail a rejection?",
              "answer": "No, it is a request to correct a deficiency."
            },
            {
              "question": "How long do I have to reply?",
              "answer": "Generally 30 days, as per the sources reviewed."
            },
            {
              "question": "How do I reply?",
              "answer": "Usually through MIS-F on the portal; TM-M may be used for amendments."
            },
            {
              "question": "What if I miss the deadline?",
              "answer": "The application may be treated as abandoned."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Formality Check Fail",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Applicants and agents whose applications show 'Formalities Chk Fail', especially those who filed without a valid TM-48 or with class or logo errors, need this service.</p>\n\n<p>Businesses that filed themselves through the portal without professional help often receive formality notices for avoidable reasons, such as images not matching the requirements.</p>\n\n<p>If you have received a notice and are not sure what it requires, a quick review of the notice and documents can tell you exactly what needs to be fixed.</p>\n\n<p>Brands that are close to a launch date should act quickly to avoid delays in getting through examination.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Exact deficiency identified and corrected</li>\n<li>Reply filed within the time limit</li>\n<li>Application moves forward to examination without losing the filing date</li>\n<li>Reduced risk of abandonment</li>\n<li>Clear guidance on documents such as TM-48 and translations</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the reply, monitor the status until it moves to examination.</p>\n\n<p><strong>Related services:</strong> TM Application Filing, TM Modification, TM Objection and Trademark Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Ignoring the notice.</li>\n<li>Replying without fixing the specific defect.</li>\n<li>Using the wrong reply route.</li>\n<li>Submitting a poor-quality logo again.</li>\n<li>Missing the 30-day deadline.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The reply must be filed within about 30 days of the notice.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> download the notice from the portal immediately and keep your TM-48, translations and logo files ready.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Trade Marks Rules, 2017 require applications to comply with formal requirements before examination. The formality check is an administrative step that screens applications for completeness.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup that filed without TM-48 receives a formality fail and files a correct authorisation.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An applicant with a non-English mark adds the required translation.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A brand corrects a class error identified in the notice.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>A formalities notice is best handled by reading it literally. The Registry states what is missing or wrong, and the reply should fix exactly that and nothing else. Responding promptly keeps your filing date intact, which can matter if another applicant files a similar mark soon after you. If the notice is unclear, getting a professional to review it is cheaper than a second round of correction.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Formality Check Fail | JR Compliance",
          "metaDescription": "'Formalities Chk Fail' is a status on the IP India portal showing that the Trade Marks Registry found a procedural or documentary deficiency in a trademark…",
          "canonicalUrl": "/corporate/formality-check-fail",
          "keywords": "Formality Check Fail, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "tm-modification",
      "matchSlugs": [
        "tm-modification"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 63,
        "originalRow": 77,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "TM Modification",
        "menuLabel": "TM Modification",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "Trademark modification means amending a trademark application or correcting and updating a registered mark's records. Before registration, errors and amendments are requested on Form TM-M under Rule 37 of the Trade Marks Rules, 2017. After registration, changes to the proprietor's name, address or description are recorded on Form TM-P under Section 58, and alteration of the mark itself is limited under Section 59 and requires advertisement."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TM Modification?",
          "paragraphs": [
            {
              "text": "Modification (amendment) of a trademark covers three things: correction of clerical errors or amendment of a pending application under Rule 37 using Form TM-M; correction of the register or recording changes in the registered proprietor's name, address or description under Section 58 using Form TM-P; and alteration of a registered mark under Section 59, which does not allow a change that substantially alters the identity of the mark."
            },
            {
              "text": "Changing the mark itself, for example modifying a logo, is not a Section 58 correction. A significantly new logo would normally require a fresh application. Pre-registration amendments can include changes to applicant details, agent details, clerical errors and restrictions of goods or services. Post-registration changes can be requested only by the registered proprietor or a claimed subsequent proprietor."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form corrects a pending application?",
              "answer": "Form TM-M under Rule 37."
            },
            {
              "question": "Which form records a change of name or address after registration?",
              "answer": "Form TM-P under Section 58."
            },
            {
              "question": "Can I change my logo through modification?",
              "answer": "Not if it substantially alters the mark; section 59 has limits and a new application may be needed."
            },
            {
              "question": "What documents are needed for a name change?",
              "answer": "A certified copy of the document showing the change, such as a fresh Certificate of Incorporation."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TM Modification",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Applicants who made errors in their application, companies that changed their name or converted their business, proprietors who moved to new premises or businesses restructured after a merger need this service.</p>\n\n<p>Brand owners who have changed their legal entity, for example from a proprietorship to a company, should consider whether they need assignment rather than just modification.</p>\n\n<p>Updating the register promptly avoids problems with renewal, enforcement and assignment, because the Registry sends notices to the address on record.</p>\n\n<p>If you are unsure whether a change is a correction or requires a new application, a short review can clarify the correct route.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct form (TM-M or TM-P) selected for your change</li>\n<li>Supporting documents prepared properly</li>\n<li>Register updated with your current legal details</li>\n<li>Reduced risk of missed notices</li>\n<li>Clarity on when a new application is needed</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the register is updated, update your records and renewals.</p>\n\n<p><strong>Related services:</strong> Trademark Assignment/Transfer, Trademark Renewal, TM Application Filing and Company Name Change.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Using modification to change the identity of the mark.</li>\n<li>Forgetting to update the address after a move.</li>\n<li>Not providing certified proof for name changes.</li>\n<li>Using outdated form numbers.</li>\n<li>Delaying updates until renewal.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing time depends on the Registry. Fees quoted include about Rs 900 for address change and Rs 1,800 for name change, but confirm in the official schedule.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> update the register as soon as the legal change happens.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Sections 58 and 59 of the Trade Marks Act, 1999 provide for correction of the register and alteration of registered marks, and Rule 37 of the Rules provides for amendments to applications. The system ensures that the register stays accurate while preventing substantial changes to a mark's identity.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A company changes its name after a restructure and records the change on its trademarks.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An applicant corrects a clerical error in a pending application.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A proprietor moves premises and updates the address for service.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TM Modification | JR Compliance",
          "metaDescription": "Trademark modification means amending a trademark application or correcting and updating a registered mark's records. Before registration, errors and…",
          "canonicalUrl": "/corporate/tm-modification",
          "keywords": "TM Modification, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "tm-objection",
      "matchSlugs": [
        "tm-objection"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 64,
        "originalRow": 78,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "TM Objection",
        "menuLabel": "TM Objection",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A trademark objection is raised in the Registry's examination report when the examiner finds that the mark fails Section 9 (absolute grounds) or Section 11 (relative grounds) of the Trade Marks Act, 1999. The applicant must file a written reply within one month (commonly stated as 30 days) of receiving the report, under Rule 33(4) of the Trade Marks Rules, 2017. If the Registrar is not satisfied, a show-cause hearing is fixed, and if no reply is filed the application may be treated as abandoned."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TM Objection?",
          "paragraphs": [
            {
              "text": "A trademark objection is the Registrar's written statement in the examination report that an application cannot be accepted as filed. Under Section 9, the Registrar may object that the mark lacks distinctiveness, is descriptive or customary. Under Section 11, the objection arises because the mark is identical or deceptively similar to an earlier mark for similar goods or services."
            },
            {
              "text": "The applicant's reply must answer each ground with arguments and evidence. For Section 9 objections, evidence of use and reputation showing acquired distinctiveness is critical, such as sales figures, advertising spend and customer recognition. For Section 11 objections, arguments typically focus on differences between the marks, the goods or services, or consent from the earlier owner."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long do I have to reply?",
              "answer": "One month from receipt of the examination report under Rule 33(4)."
            },
            {
              "question": "Can the time be extended?",
              "answer": "Sources differ; one says an extension can be requested on TM-M, another says it is not available."
            },
            {
              "question": "What happens if I do not reply?",
              "answer": "The application may be treated as abandoned."
            },
            {
              "question": "Is an objection the same as an opposition?",
              "answer": "No. An objection is raised by the Registry; an opposition is filed by a third party after publication."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TM Objection",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Applicants whose trademark applications have received an examination report with objections need this service. Brand owners defending a refused or objected mark and startups that filed without professional help and are unsure how to respond also benefit.</p>\n\n<p>Businesses that rely heavily on a brand name, and those that have already invested in packaging and marketing, should treat objections seriously and respond promptly.</p>\n\n<p>If your mark is descriptive, building evidence of use, such as invoices and advertisements, early can strengthen your reply.</p>\n\n<p>If the objection is based on a similar earlier mark, we can explore whether a consent letter or coexistence agreement is possible.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Careful analysis of each Section 9 and Section 11 ground</li>\n<li>Evidence of use compiled and organised</li>\n<li>Legal arguments and case law in the reply</li>\n<li>Reply filed within the time limit</li>\n<li>Preparation for a hearing if needed</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the reply, the Registrar either accepts the mark or schedules a hearing.</p>\n\n<p><strong>Related services:</strong> TM Hearing, Trademark Registration, TM Opposition and Trademark Evidence Filing.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the one-month deadline.</li>\n<li>Filing a generic reply without addressing each ground.</li>\n<li>Not attaching evidence of use.</li>\n<li>Ignoring the possibility of consent from earlier owners.</li>\n<li>Assuming an objection means the mark cannot be registered.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The reply must be filed within one month.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> start collecting invoices, advertisements and sales data as soon as you receive the report, because evidence takes time to compile.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Rule 33 of the Trade Marks Rules, 2017 governs examination reports and the applicant's reply. Sections 9 and 11 of the Act set out the grounds for refusal, and Section 131 deals with extensions of time.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup receives an objection that its name is descriptive and responds with evidence of use.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company receives a Section 11 objection citing a similar mark and files a reply with arguments on differences.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A brand obtains a consent letter from the earlier owner to support its reply.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TM Objection | JR Compliance",
          "metaDescription": "A trademark objection is raised in the Registry's examination report when the examiner finds that the mark fails Section 9 (absolute grounds) or Section 11…",
          "canonicalUrl": "/corporate/tm-objection",
          "keywords": "TM Objection, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "tm-hearing",
      "matchSlugs": [
        "tm-hearing"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 65,
        "originalRow": 79,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "TM Hearing",
        "menuLabel": "TM Hearing",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A trademark hearing is a show-cause hearing before the Registrar of Trade Marks, called when the Registrar is not satisfied with the applicant's reply to an examination report. The Registry typically gives notice about 15 days before the hearing, the applicant or the attorney argues the Section 9 or Section 11 objections, and the Registrar then passes an order under Rule 33(8). Adjournments can be requested on Form TM-M."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TM Hearing?",
          "paragraphs": [
            {
              "text": "A trademark hearing is a formal quasi-judicial proceeding before the Registrar or a Deputy Registrar where the applicant defends a trademark application against objections raised in the examination report. After the hearing, the Registrar may accept the mark absolutely, accept it subject to conditions or limitations such as restriction of goods or disclaimers, or refuse the application with a written order."
            },
            {
              "text": "The hearing is typically listed when the application status shows 'Ready for show cause hearing' after the examiner is not satisfied with the reply. Notice is normally issued about 15 days before the hearing, though one source says hearings are listed within three to six months of the status change."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is a show-cause hearing?",
              "answer": "A hearing before the Registrar where the applicant explains why the mark should be accepted despite the objections."
            },
            {
              "question": "How much notice is given?",
              "answer": "About 15 days according to one source."
            },
            {
              "question": "Can I request an adjournment?",
              "answer": "Yes, on Form TM-M; one source quotes Rs 900."
            },
            {
              "question": "What can the Registrar decide?",
              "answer": "Accept absolutely, accept with conditions or refuse."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TM Hearing",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Applicants whose objection replies were not accepted, and attorneys handling contested trademark prosecutions, need this service. Businesses with a significant brand investment should not leave the hearing to chance.</p>\n\n<p>Founders who are not familiar with trademark law often benefit from professional representation, because hearing practice involves legal arguments and case law.</p>\n\n<p>If your hearing notice has arrived, it is important to prepare early, since notice periods are short. Applicants who cannot attend on the notified date should request an adjournment in advance.</p>\n\n<p>If a refusal seems likely, discuss alternatives such as limiting the goods and services, adding disclaimers or seeking consent from earlier owners.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Written submissions and case law prepared for your case</li>\n<li>Evidence of use and reputation organised</li>\n<li>Attendance at the hearing, in person or virtually</li>\n<li>Adjournment handled if required</li>\n<li>Higher chance of acceptance with proper advocacy</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the hearing, the mark is accepted for publication or refused.</p>\n\n<p><strong>Related services:</strong> TM Objection, Trademark Registration, Trademark Opposition and Trademark Evidence Filing.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Not appearing at the hearing.</li>\n<li>Relying only on the original reply without new arguments.</li>\n<li>Not submitting evidence of use.</li>\n<li>Ignoring the option of limiting goods or services.</li>\n<li>Missing the adjournment request deadline.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Hearing dates are set by the Registry and notice can be short.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> begin preparing written submissions immediately when the hearing notice arrives and gather any additional evidence of use.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Rule 33 of the Trade Marks Rules, 2017 provides for hearings where the Registrar is not satisfied with the reply to an examination report. The Registrar's order can be accepted or challenged through the legal process available under the Act.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A brand that received a Section 11 objection attends the hearing with arguments on differences between marks.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company with a descriptive mark presents sales and advertising evidence.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An applicant requests an adjournment to collect additional documents.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Hearing outcomes often turn on preparation rather than rhetoric. A concise written submission that addresses each objection, supported by dated evidence of use and reputation and relevant case law, gives the Registrar a clear basis to accept the mark. Consider offering reasonable limitations on goods or services if that resolves the conflict, because partial acceptance can be better than refusal.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TM Hearing | JR Compliance",
          "metaDescription": "A trademark hearing is a show-cause hearing before the Registrar of Trade Marks, called when the Registrar is not satisfied with the applicant's reply to an…",
          "canonicalUrl": "/corporate/tm-hearing",
          "keywords": "TM Hearing, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "tm-opposition",
      "matchSlugs": [
        "tm-opposition"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 66,
        "originalRow": 80,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "TM Opposition",
        "menuLabel": "TM Opposition",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "After an accepted trademark is advertised in the Trade Marks Journal, any person can oppose its registration by filing Form TM-O (notice of opposition) within four months under Section 21 and Rule 42 of the Trade Marks Rules, 2017. The applicant must file a counter-statement within two months of receiving the notice (Rule 44) or the application is deemed abandoned. Evidence rounds and a hearing follow. The fee is Rs 2,700 per class for e-filing and Rs 3,000 for physical filing."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TM Opposition?",
          "paragraphs": [
            {
              "text": "Trademark opposition is the post-publication proceeding in which a third party objects to registration of an advertised mark, usually on the ground that it is identical or deceptively similar to the opponent's earlier mark or is otherwise barred by the Act. It is a contested proceeding before the Registrar with pleadings (notice of opposition and counter-statement), evidence by affidavit and a hearing, ending in an order."
            },
            {
              "text": "The Registrar can reject the opposition, partly accept it by restricting goods or services, or refuse the application. Any person can oppose, though in practice the opponent is usually the owner of an earlier right."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the window to file opposition?",
              "answer": "Four months from publication in the Trade Marks Journal."
            },
            {
              "question": "How long does the applicant have to reply?",
              "answer": "Two months from receiving the notice, to file a counter-statement."
            },
            {
              "question": "What is the fee?",
              "answer": "Rs 2,700 per class (e-filing); Rs 3,000 physical."
            },
            {
              "question": "Who can oppose?",
              "answer": "Any person, usually an owner of an earlier right."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TM Opposition",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Brand owners who find a similar mark advertised in the journal need to oppose it to protect their rights. Companies that monitor the journal regularly for conflicting filings use opposition as a protective tool.</p>\n\n<p>Applicants who receive a notice of opposition against their own marks need to respond promptly, because the counter-statement has a strict two-month deadline.</p>\n\n<p>Opposition can also be a negotiation tool: many oppositions end in settlement, coexistence agreements or withdrawal.</p>\n\n<p>If you have a valuable brand, watching the journal systematically is advisable, because the four-month window to oppose is short.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Timely notice or counter-statement filed within the deadlines</li>\n<li>Clear pleadings of grounds and facts</li>\n<li>Evidence prepared under Rules 45, 46 and 47</li>\n<li>Hearing representation and written submissions</li>\n<li>Option of settlement where useful</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After pleadings, parties file evidence and attend a hearing.</p>\n\n<p><strong>Related services:</strong> Trademark Evidence Filing, TM Hearing, Trademark Registration and LPC.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the four-month opposition window.</li>\n<li>Not filing the counter-statement within two months.</li>\n<li>Weak or late evidence.</li>\n<li>Not monitoring the journal for conflicting marks.</li>\n<li>Ignoring settlement possibilities.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Oppositions can take months or longer depending on evidence rounds and hearing dates.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> set up journal watching and a calendar for the four-month and two-month deadlines.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 21 of the Trade Marks Act, 1999 and Rules 42 to 47 of the Trade Marks Rules, 2017 provide the opposition framework. The process gives third parties a chance to object before a mark is registered.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A brand owner opposes a similar mark advertised in the journal.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An applicant files a counter-statement and evidence defending its mark.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>Two parties settle an opposition through a coexistence agreement.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Because oppositions are time-bound, the discipline is in the calendar. Watch the Trade Marks Journal if you own valuable marks, note the four-month opposition window, and track the two-month counter-statement and evidence deadlines. Many oppositions settle, so keeping channels open with the other side is often worthwhile.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TM Opposition | JR Compliance",
          "metaDescription": "After an accepted trademark is advertised in the Trade Marks Journal, any person can oppose its registration by filing Form TM-O (notice of opposition) within…",
          "canonicalUrl": "/corporate/tm-opposition",
          "keywords": "TM Opposition, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "trademark-evidence-filing",
      "matchSlugs": [
        "trademark-evidence-filing"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 67,
        "originalRow": 81,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Trademark Evidence Filing",
        "menuLabel": "Trademark Evidence Filing",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "In a trademark opposition, each side files evidence by affidavit under Rules 45, 46 and 47 of the Trade Marks Rules, 2017. The opponent files first, within two months of receiving the counter-statement, then the applicant, within two months, and optionally the opponent replies. Missing the Rule 45 deadline means the opposition is deemed abandoned. A party can instead file a letter stating that it relies on its pleadings."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Trademark Evidence Filing?",
          "paragraphs": [
            {
              "text": "Trademark evidence filing is the stage of an opposition proceeding where parties support their pleadings with sworn evidence, such as affidavits and exhibits showing registration, use, sales, advertising and reputation. Rule 45 governs the opponent's evidence in support of opposition, Rule 46 the applicant's evidence in support of application, and Rule 47 the opponent's reply evidence. After evidence is complete, the Registry lists the matter for hearing."
            },
            {
              "text": "The time limits are two months for the opponent from service of the counter-statement, two months for the applicant from the opponent's evidence, and, according to one source, one month for reply evidence. If the opponent does not take any action under Rule 45, the opposition is deemed abandoned."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who files evidence first?",
              "answer": "The opponent, within two months of the counter-statement under Rule 45."
            },
            {
              "question": "What if the opponent does not file evidence?",
              "answer": "The opposition is deemed abandoned."
            },
            {
              "question": "Can the time be extended?",
              "answer": "The case law sources conflict; treat the deadline as strict."
            },
            {
              "question": "Can a party rely on pleadings only?",
              "answer": "Yes, by filing a letter, though it may weaken the case."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Trademark Evidence Filing",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Opponents and applicants in contested trademark oppositions, and their IP attorneys, need to file evidence. Brand owners who want to show reputation and long use as support for their claim should start collecting evidence early.</p>\n\n<p>Businesses that did not keep organised records of sales and advertising often find it hard to prepare evidence, so keeping a brand file is a good practice.</p>\n\n<p>If you are an applicant defending against an opposition, you should check whether the opponent's evidence is complete and respond within the time limit.</p>\n\n<p>If neither side wants to spend on evidence, a letter relying on pleadings is possible, though it usually weakens a party's position.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Evidence affidavits and exhibits prepared properly</li>\n<li>Deadlines under Rules 45, 46 and 47 tracked</li>\n<li>Service on the other party and filing handled</li>\n<li>Organised proof of use and reputation</li>\n<li>Reduced risk of abandonment</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After evidence, the matter is listed for hearing.</p>\n\n<p><strong>Related services:</strong> TM Opposition, TM Hearing, Trademark Registration and LPC.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the Rule 45 deadline.</li>\n<li>Filing evidence without exhibits.</li>\n<li>Not serving a copy on the other side.</li>\n<li>Relying on an extension without checking the law.</li>\n<li>Submitting undated or inconsistent documents.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Each evidence stage has a two-month limit in the sources reviewed.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> gather invoices, advertisements and certificates before the counter-statement arrives, so you can file quickly.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Rules 45, 46 and 47 of the Trade Marks Rules, 2017 set the evidence framework for oppositions. Form TM-56 is used for extension requests, and the law on extension has been discussed in court decisions.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>An opponent files evidence of earlier registrations and sales.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An applicant files evidence of long use.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A party decides to rely on its pleadings and files a letter.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Evidence wins oppositions only when it is relevant, dated and organised. Invoices that show sales under the mark over time, advertising with dates and reach, and independent recognition carry more weight than general claims. Present exhibits in a logical order and make sure each is referred to in the affidavit.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Trademark Evidence Filing | JR Compliance",
          "metaDescription": "In a trademark opposition, each side files evidence by affidavit under Rules 45, 46 and 47 of the Trade Marks Rules, 2017. The opponent files first, within…",
          "canonicalUrl": "/corporate/trademark-evidence-filing",
          "keywords": "Trademark Evidence Filing, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "trademark-renewal",
      "matchSlugs": [
        "trademark-renewal"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 68,
        "originalRow": 82,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Trademark Renewal",
        "menuLabel": "Trademark Renewal",
        "sortOrder": 9,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A registered trademark is valid for 10 years and is renewed by filing Form TM-R under Section 25 of the Trade Marks Act, 1999. Most sources say renewal can be filed up to one year before expiry. If missed, a six-month grace period allows renewal with a surcharge, and the mark can be restored with renewal between six months and one year after expiry at a higher fee. The Registry sends a reminder (Form O-3) about six months before expiry."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Trademark Renewal?",
          "paragraphs": [
            {
              "text": "Trademark renewal is the process of extending the registration of a mark for a further period of 10 years from the date of expiry of the last registration, by filing Form TM-R and paying the prescribed fee. If neither the renewal fee nor the surcharge is paid within the grace period, the Registrar may remove the mark from the register. It can then be restored under Section 25(4) with a restoration fee."
            },
            {
              "text": "Only the registered proprietor, or a recorded subsequent proprietor, can renew. The window is up to one year before expiry according to most sources (Rules 57 and 58), while one source says six months. The grace period is six months after expiry with a surcharge, and restoration is possible after that within one year of expiry."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When can I file TM-R?",
              "answer": "Up to one year before expiry per most sources."
            },
            {
              "question": "What if I miss the date?",
              "answer": "A six-month grace period with surcharge, then restoration within a year."
            },
            {
              "question": "How long is each renewal?",
              "answer": "Ten years."
            },
            {
              "question": "Who can renew?",
              "answer": "The registered proprietor or recorded subsequent proprietor."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Trademark Renewal",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>All registered trademark owners need to renew. Companies with large portfolios should maintain a renewal calendar so that no mark lapses by accident.</p>\n\n<p>Brand owners who have changed their name or address should update the register before renewal, so the Registry's notices reach the right place.</p>\n\n<p>If your mark expired and you are within the grace or restoration period, act quickly, because fees rise and risks increase over time.</p>\n\n<p>Businesses that plan to sell or license their brand should ensure that renewals are up to date, because buyers check them.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Renewal dates tracked so that marks do not lapse</li>\n<li>Form TM-R filed correctly and on time</li>\n<li>Late renewal and restoration handled</li>\n<li>Register records updated</li>\n<li>Brand protection continues without gaps</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After renewal, record the next date ten years ahead.</p>\n\n<p><strong>Related services:</strong> TM Modification, Trademark Transfer, TM Opposition and Trademark Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Forgetting renewal because reminders go to an old address.</li>\n<li>Waiting until after expiry and paying higher fees.</li>\n<li>Using wrong fee figures.</li>\n<li>Not updating ownership records before renewal.</li>\n<li>Assuming the Registry will automatically renew.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Fees quoted: Rs 9,000 e-filing renewal per class, about Rs 13,500 with surcharge, about Rs 18,000 for restoration.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> renew within the year before expiry to avoid surcharges.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 25 of the Trade Marks Act, 1999 provides for renewal and restoration. Rules 57 to 60 of the Rules set the time limits and procedure. The Registry can remove marks from the register if renewal is not paid.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A company renews its mark six months before expiry.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A brand files late renewal with surcharge within the grace period.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A business restores a mark that expired a few months earlier.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Renewal is a data-management task. Keep a register of every mark with its filing date, expiry date, class and owner details, and update the owner's address with the Registry so reminders arrive. File inside the one-year window before expiry whenever possible, because late renewal costs more and restoration costs still more.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Trademark Renewal | JR Compliance",
          "metaDescription": "A registered trademark is valid for 10 years and is renewed by filing Form TM-R under Section 25 of the Trade Marks Act, 1999. Most sources say renewal can be…",
          "canonicalUrl": "/corporate/trademark-renewal",
          "keywords": "Trademark Renewal, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "trademark-transfer",
      "matchSlugs": [
        "trademark-transfer"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 69,
        "originalRow": 83,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Trademark Transfer",
        "menuLabel": "Trademark Transfer",
        "sortOrder": 10,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A trademark is transferred by an assignment deed and the new owner (assignee) must record title with the Trade Marks Registry by filing Form TM-P for registered marks under Section 45. Sources say the filing should be done within six months of the assignment. The e-filing fee is Rs 9,000 per mark. Assignments without goodwill need advertisement as directed by the Registrar. Until recorded, the assignment is ineffective against third parties who acquire a conflicting interest without notice."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Trademark Transfer?",
          "paragraphs": [
            {
              "text": "Trademark assignment is the transfer of ownership of a trademark by its registered proprietor (the assignor) to another person (the assignee), with or without the goodwill of the business, as provided in Sections 37 to 45 of the Trade Marks Act, 1999. A registered mark may be assigned in whole or only for some of the goods or services."
            },
            {
              "text": "Transmission is a transfer by operation of law, for example succession, and is recorded by the same Form TM-P. Marks that are still pending applications can be assigned by recording the assignment through Form TM-M."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form records an assignment of a registered mark?",
              "answer": "Form TM-P."
            },
            {
              "question": "Is the assignment effective immediately?",
              "answer": "It should be recorded; unrecorded assignments may not bind third parties."
            },
            {
              "question": "What is the fee?",
              "answer": "Rs 9,000 per mark in e-filing, per sources."
            },
            {
              "question": "Can pending applications be assigned?",
              "answer": "Yes, by recording through Form TM-M."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Trademark Transfer",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Brand owners selling or acquiring a brand, companies restructuring or merging, heirs or successors of a proprietor, and businesses that want to move a trademark between group entities need this service.</p>\n\n<p>Startups that are acquired often need to assign trademarks to the buyer as part of the deal, and investors check that trademark ownership is properly recorded.</p>\n\n<p>If a business converts from a proprietorship to a company, its trademarks may need to be assigned to the new entity.</p>\n\n<p>Recording the assignment promptly protects the buyer, because an unrecorded assignment may not be effective against third parties.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Assignment deed with correct stamp duty</li>\n<li>Form TM-P prepared and filed with supporting documents</li>\n<li>Advertisement requirement handled where needed</li>\n<li>Register updated with the new proprietor</li>\n<li>Clean chain of title for enforcement and sale</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the transfer, update renewals and enforcement records.</p>\n\n<p><strong>Related services:</strong> TM Modification, Trademark Renewal, Legal Agreement drafting and LPC.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Not recording the assignment.</li>\n<li>Underpaying stamp duty.</li>\n<li>Ignoring advertisement for assignments without goodwill.</li>\n<li>Using the wrong form for pending applications.</li>\n<li>Delaying beyond the recommended period.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The Registry may take about three to six months to register the assignee.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> record the assignment within six months and keep the executed deed, NOC and registration certificate ready.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Sections 37 to 45 of the Trade Marks Act, 1999 govern assignment and transmission. Recording the assignment under Section 45 makes the assignee the registered proprietor.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A founder sells a brand to a buyer and records the assignment.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A proprietor transfers marks to a newly formed company.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An heir records transmission of a mark after succession.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>A trademark assignment is a transfer of an asset and should be treated like any other transaction: confirm title, check the status of the mark, document the price and the goodwill position, pay stamp duty and record the change promptly. The recording step is what makes the new owner visible on the register and able to enforce the mark.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Trademark Transfer | JR Compliance",
          "metaDescription": "A trademark is transferred by an assignment deed and the new owner (assignee) must record title with the Trade Marks Registry by filing Form TM-P for…",
          "canonicalUrl": "/corporate/trademark-transfer",
          "keywords": "Trademark Transfer, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "lpc",
      "matchSlugs": [
        "lpc"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 70,
        "originalRow": 84,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "LPC",
        "menuLabel": "LPC",
        "sortOrder": 11,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A Legal Proceedings Certificate (LPC) is issued by the Registrar of Trade Marks and records the status and history of a trademark, such as the mark, date of application, date of user claimed, conditions and disclaimers, assignments, licences and renewals, for use as evidence in court or other proceedings. The Delhi High Court has directed that a plaintiff in a trademark suit should file either the LPC or the registration certificate with the journal extract along with the plaint."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is LPC?",
          "paragraphs": [
            {
              "text": "A Legal Proceedings Certificate is a certificate issued by the Trade Marks Registry showing the registration particulars and current status of a trademark, and certifying that proceedings, such as an infringement suit or opposition, relating to the mark are pending. It serves as evidence of the pendency of legal proceedings and of the mark's registration details."
            },
            {
              "text": "Both plaintiff and defendant in a suit can obtain it. Courts rely on it because the register is the official record, and it shows the mark's status accurately at a given time. Delhi High Court directions require parties to file either an LPC or the registration certificate with the journal extract with the plaint, and to state that an LPC has been applied for."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What does an LPC show?",
              "answer": "The registration details and status of a mark, and pending proceedings."
            },
            {
              "question": "Who can apply?",
              "answer": "Parties to a suit or opposition, plaintiff or defendant."
            },
            {
              "question": "What is the fee?",
              "answer": "One source quotes Rs 3,000 or Rs 5,000 depending on the proceeding; confirm in the fee table."
            },
            {
              "question": "Is it mandatory for a suit?",
              "answer": "Delhi High Court directions require an LPC or the registration certificate with the journal extract."
            }
          ]
        },
        "extraContent": [
          {
            "title": "LPC",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Plaintiffs and defendants in trademark infringement or passing-off suits and parties to trademark oppositions who must prove the status of a mark need an LPC. Brand owners who plan to take legal action against infringers should keep the registration and renewal records up to date to obtain a clean LPC.</p>\n\n<p>Law firms and in-house counsel use LPCs routinely in litigation.</p>\n\n<p>If your mark has recently been assigned, renewed or modified, make sure the register reflects these changes before applying for an LPC.</p>\n\n<p>Businesses unfamiliar with court procedure should ask their lawyer which documents are required.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Official evidence of the mark's status for court</li>\n<li>Application prepared with correct details</li>\n<li>Follow-up with the Registry</li>\n<li>Certificate ready for filing with the plaint</li>\n<li>Support for infringement and opposition cases</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the LPC, file it in court.</p>\n\n<p><strong>Related services:</strong> TM Opposition, Trademark Evidence Filing, Trademark Renewal and Trademark Transfer.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying before the register is updated.</li>\n<li>Using an outdated LPC in court.</li>\n<li>Not stating that an LPC has been applied for.</li>\n<li>Confusing LPC with the registration certificate.</li>\n<li>Using the wrong fee or form.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing time depends on the Registry.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> apply early enough to have the certificate before the filing date.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The register of trade marks is the official record, and certificates from the Registry are used as evidence. The Delhi High Court's directions on documents to be filed in trademark suits make the LPC a practical requirement.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A brand owner files an infringement suit and attaches an LPC.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A defendant obtains an LPC to show the status of its own mark.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A party in an opposition files an LPC to prove pending proceedings.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>An LPC is a snapshot of a mark's status for a legal purpose, so timing matters. Apply close to the date you need to file, check that renewals and assignments are already recorded, and give the Registry accurate case details. If you are the defendant, an LPC for your own mark can be as useful as a plaintiff's.</p>"
          }
        ],
        "seo": {
          "metaTitle": "LPC | JR Compliance",
          "metaDescription": "A Legal Proceedings Certificate (LPC) is issued by the Registrar of Trade Marks and records the status and history of a trademark, such as the mark, date of…",
          "canonicalUrl": "/corporate/lpc",
          "keywords": "LPC, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "copyright-registration",
      "matchSlugs": [
        "copyright-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 71,
        "originalRow": 85,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Copyright Registration",
        "menuLabel": "Copyright Registration",
        "sortOrder": 12,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "Copyright registration records ownership of an original work with the Registrar of Copyrights under the Copyright Act, 1957 and the Copyright Rules, 2013. The application is made in Form XIV, along with the Statement of Particulars, on the Copyright Office portal at copyright.gov.in. A diary number is issued, a mandatory 30-day objection period follows, then the Registrar examines the application and enters the work in the Register of Copyrights. Software can be registered as a literary work."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Copyright Registration?",
          "paragraphs": [
            {
              "text": "Copyright is the exclusive legal right of the creator of an original literary, dramatic, musical or artistic work, cinematograph film or sound recording to use, reproduce and authorise use of the work. In India, copyright arises automatically when an original work is created and fixed in a tangible form, so registration is not mandatory. However, a registration certificate is prima facie evidence of ownership and helps in enforcement, infringement proceedings and licensing."
            },
            {
              "text": "The Copyright Office's FAQ confirms that computer programmes, tables and compilations, including databases, are treated as literary works. Works published before 21 January 1958 can also be registered if copyright still subsists."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is copyright registration mandatory?",
              "answer": "No, copyright arises automatically, but registration provides evidence and helps enforcement."
            },
            {
              "question": "Which form is used?",
              "answer": "Form XIV with the Statement of Particulars."
            },
            {
              "question": "How long is the objection period?",
              "answer": "A mandatory 30-day waiting period after the diary number."
            },
            {
              "question": "Can software be registered?",
              "answer": "Yes, as a literary work."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Copyright Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Authors, artists, photographers, filmmakers, musicians, designers, software developers, publishers, content creators and companies that want proof of ownership of creative or software work need copyright registration. It is particularly valuable where the work is licensed, sold or used by others.</p>\n\n<p>Software companies and app developers often register source code or documentation as literary works to support their claims. Creators who sell digital products or want to enforce rights against copying also benefit.</p>\n\n<p>Businesses that commission creative work should obtain written assignments from the creators before applying, because registration requires clarity on who owns the copyright.</p>\n\n<p>If you only want to protect a brand name or logo as an identifier of goods or services, a trademark may be more appropriate, though logos may also be protected as artistic works.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Official record of ownership of your creative or software work</li>\n<li>Prima facie evidence in infringement disputes</li>\n<li>Form XIV and Statement of Particulars prepared correctly</li>\n<li>Objections and discrepancies handled</li>\n<li>Supports licensing and sale of rights</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, use the certificate to license and protect your work.</p>\n\n<p><strong>Related services:</strong> Copyright Objection reply, Trademark Registration, Logo Designing and Legal Agreement drafting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying without clarity on who owns the copyright.</li>\n<li>Not preparing the work copy in the required format.</li>\n<li>Ignoring discrepancy letters.</li>\n<li>Confusing copyright with trademark protection.</li>\n<li>Waiting until after infringement to register.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Overall timelines of about two to eight months are quoted by filing firms.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep dated drafts and proof of creation, since they support your claim if a dispute arises.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Copyright Act, 1957 protects original works, and Section 45 provides for registration in the Register of Copyrights. The Copyright Rules, 2013 set the procedure and forms, including the 30-day objection period.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A software developer registers source code as a literary work.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A photographer registers a portfolio before licensing images.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A publisher registers a book and obtains an extract of the Register for contract negotiations.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Copyright Registration | JR Compliance",
          "metaDescription": "Copyright registration records ownership of an original work with the Registrar of Copyrights under the Copyright Act, 1957 and the Copyright Rules, 2013. The…",
          "canonicalUrl": "/corporate/copyright-registration",
          "keywords": "Copyright Registration, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "copyright-objection",
      "matchSlugs": [
        "copyright-objection"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 72,
        "originalRow": 86,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Copyright Objection",
        "menuLabel": "Copyright Objection",
        "sortOrder": 13,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A copyright objection can arise in two ways: the Copyright Office examiner issues a discrepancy letter on the application, or a third party files an objection to the application within 30 days of its publication under Rule 70(6) of the Copyright Rules, 2013. The applicant has to reply within 30 days with evidence, and a hearing before the Registrar follows if the matter is contested. An unanswered discrepancy can lead to rejection or abandonment."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Copyright Objection?",
          "paragraphs": [
            {
              "text": "A copyright objection is a formal challenge raised against a pending copyright registration application, either by the Registrar of Copyrights through a discrepancy letter pointing out defects or doubts about originality, ownership or particulars, or by a third party who claims prior rights or that the work is copied. The Registrar decides after hearing both sides, and contested matters may go further to the Copyright Board or courts."
            },
            {
              "text": "A discrepancy letter usually asks for clarifications, additional documents or corrections within 30 days. A third-party objection must be filed within 30 days of publication and sets out grounds and evidence of the objector's rights."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long do I have to reply to a discrepancy letter?",
              "answer": "Generally 30 days."
            },
            {
              "question": "When can a third party object?",
              "answer": "Within 30 days of the application's publication under Rule 70(6)."
            },
            {
              "question": "What evidence helps?",
              "answer": "Proof of authorship, creation date, publication, agreements and affidavits."
            },
            {
              "question": "What if I do not respond?",
              "answer": "The application may be treated as abandoned."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Copyright Objection",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Applicants who received a discrepancy letter or third-party objection on their copyright application need this service. So do rights-holders who want to oppose another party's copyright filing.</p>\n\n<p>Creators and companies who commissioned work from freelancers may face objections about ownership, so keeping written assignments is helpful.</p>\n\n<p>If your work is similar to another work, be ready with evidence of independent creation.</p>\n\n<p>Businesses whose registration is critical to a launch or a licence deal should respond to objections promptly.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Point-wise replies with supporting evidence</li>\n<li>Corrected documents and affidavits</li>\n<li>Reply filed within 30 days</li>\n<li>Hearing representation</li>\n<li>Support for objecting to others' filings</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the reply and hearing, the application proceeds or is refused.</p>\n\n<p><strong>Related services:</strong> Copyright Registration, Legal Agreement drafting and Trademark Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the 30-day deadline.</li>\n<li>Not attaching proof of authorship.</li>\n<li>Ignoring ownership issues with commissioned work.</li>\n<li>Filing a generic reply.</li>\n<li>Skipping the hearing.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The reply deadline is generally 30 days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> assemble creation records, drafts and agreements early so the reply can be filed on time.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Rule 70 of the Copyright Rules, 2013 provides for objections and examination of applications. The Registrar acts quasi-judicially when parties dispute ownership or originality.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>An author responds to a discrepancy letter with the missing particulars.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company defends against a third-party claim by producing its assignment deed.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A rights-holder objects to a filing that copies its work.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>A copyright objection is easier to defend when the creative record is solid. Keep dated drafts, source files, publication evidence, contracts with contributors and any assignment deeds. If the objection claims similarity with another work, show independent creation and any differences. When ownership is the issue, a clear chain of title from author to applicant resolves most queries.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Copyright Objection | JR Compliance",
          "metaDescription": "A copyright objection can arise in two ways: the Copyright Office examiner issues a discrepancy letter on the application, or a third party files an objection…",
          "canonicalUrl": "/corporate/copyright-objection",
          "keywords": "Copyright Objection, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "design-registration",
      "matchSlugs": [
        "design-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 73,
        "originalRow": 87,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Design Registration",
        "menuLabel": "Design Registration",
        "sortOrder": 14,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "Industrial design registration in India is governed by the Designs Act, 2000 and the Designs Rules, 2001, administered by the Design Office under the CGPDTM. The application is made in Form 1 with representations of the design and the Locarno class, followed by examination and registration. Registration lasts 10 years and can be extended by 5 more years. The Designs Rules created a lower fee for small entities."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Design Registration?",
          "paragraphs": [
            {
              "text": "A design, under the Designs Act, 2000, means the features of shape, configuration, pattern, ornament or composition of lines or colours applied to an article, in two or three dimensions or both, by any industrial process or means, which appeal to and are judged solely by the eye. It protects only the visual appearance of an article, not its function or the idea behind it, and does not cover trademarks or artistic works."
            },
            {
              "text": "A registered design gives the proprietor the exclusive right to apply the design to the article in the registered class. The design must be new or original, not previously published or registered anywhere in the world, and must not be contrary to public order or morality. A guide mentions a six-month grace period for certain disclosures before filing."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What does design registration protect?",
              "answer": "The visual appearance of an article, not its function."
            },
            {
              "question": "What is the term?",
              "answer": "Ten years, extendable by five."
            },
            {
              "question": "Which form is used?",
              "answer": "Form 1 with representations and the Locarno class."
            },
            {
              "question": "Can I file after publishing the design?",
              "answer": "Novelty is required; check any grace period rules before filing."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Design Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Manufacturers, product designers, furniture, packaging, toy, jewellery, fashion, electronics and consumer-goods makers, and startups with new product shapes or patterns need design registration. Companies that invest in industrial design as a competitive advantage should protect it before launch.</p>\n\n<p>Because novelty is required, designs should be filed before they are published or sold, subject to any grace period rules. Designers working with clients should clarify ownership of the design.</p>\n\n<p>Businesses that want to protect the look of a logo or label as a trademark should use trademark registration rather than design registration, because designs protect shape and pattern applied to articles.</p>\n\n<p>If your product is innovative in function, a patent may also be needed.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Exclusive rights over the visual appearance of your product</li>\n<li>Novelty search and correct class selection</li>\n<li>Representations prepared to the Design Office's requirements</li>\n<li>Ten-year protection with five-year extension</li>\n<li>Support with objections and certificate</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, use the design on products and extend as needed.</p>\n\n<p><strong>Related services:</strong> Patent Registration, Trademark Registration, Copyright Registration and Logo Designing.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Publishing the design before filing.</li>\n<li>Choosing the wrong class.</li>\n<li>Poor representations.</li>\n<li>Confusing design with trademark or patent protection.</li>\n<li>Missing extension of the term.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Examination and registration can take months.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep dated sketches and avoid public disclosure until the application is filed.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Designs Act, 2000 protects industrial designs and gives the registered proprietor exclusive rights against copying. Rules prescribe fees for natural persons, small entities and others.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A furniture maker registers a new chair shape.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A packaging company registers a bottle design.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A startup protects the shape of a new gadget.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Design Registration | JR Compliance",
          "metaDescription": "Industrial design registration in India is governed by the Designs Act, 2000 and the Designs Rules, 2001, administered by the Design Office under the CGPDTM…",
          "canonicalUrl": "/corporate/design-registration",
          "keywords": "Design Registration, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "patent-registration",
      "matchSlugs": [
        "patent-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 74,
        "originalRow": 88,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Patent Registration",
        "menuLabel": "Patent Registration",
        "sortOrder": 15,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "A patent in India is granted under the Patents Act, 1970 (as amended) and the Patents Rules, 2003 by the Patent Office under the CGPDTM. The applicant files Form 1 with a provisional or complete specification (Form 2). The application is published after 18 months, examination starts only after a Request for Examination (Form 18), and a grant gives a 20-year term from the filing date. The process usually takes two to four years, and expedited examination (Form 18A) is available to startups, small entities and certain other applicants."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Patent Registration?",
          "paragraphs": [
            {
              "text": "A patent is a statutory exclusive right granted for an invention, which is a new product or process involving an inventive step and capable of industrial application under Section 2(1)(j). It lets the patentee prevent others from making, using, selling or importing the invention in India without consent for 20 years from the filing date, in exchange for full public disclosure."
            },
            {
              "text": "Certain subject matter is excluded under Section 3, for example mere discoveries. A provisional specification secures the priority date, and the complete specification must follow within 12 months. After publication at 18 months, the applicant must request examination, after which the examiner issues the First Examination Report; replies are typically allowed for about six months."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long does a patent last?",
              "answer": "20 years from the filing date."
            },
            {
              "question": "What is a provisional specification?",
              "answer": "A first filing that secures the priority date; the complete specification must follow in 12 months."
            },
            {
              "question": "When is the application published?",
              "answer": "After 18 months."
            },
            {
              "question": "When must I request examination?",
              "answer": "Most sources say within 48 months; one says 31 months for new applications. Confirm the rule."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Patent Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Inventors, R&amp;D-driven companies, startups with novel products or processes, universities and research institutions, and manufacturers developing new technology need patents. Deep-tech and pharma companies depend on them to protect investments.</p>\n\n<p>Because novelty is essential, inventors should avoid public disclosure before filing at least a provisional application.</p>\n\n<p>Startups may qualify for reduced fees and expedited examination, and should check eligibility.</p>\n\n<p>If your innovation is a product's appearance rather than technical, consider a design registration; if it is a brand, a trademark.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Exclusive rights for 20 years over your invention</li>\n<li>Search, drafting and filing support</li>\n<li>Provisional filing to secure priority</li>\n<li>Startup and small-entity fee concessions</li>\n<li>Support through examination and grant</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After grant, pay renewal fees and consider foreign filings.</p>\n\n<p><strong>Related services:</strong> Design Registration, Trademark Registration, Copyright Registration and Startup India Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Disclosing the invention before filing.</li>\n<li>Drafting weak or overly narrow claims.</li>\n<li>Missing the 12-month complete specification deadline.</li>\n<li>Missing the examination request deadline.</li>\n<li>Not paying renewal fees.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The whole process usually takes two to four years.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> file a provisional application early to secure the date, then refine the invention before the complete filing.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Patents Act, 1970 grants a limited monopoly in exchange for disclosure. Rules prescribe forms and fees, with concessions for startups and small entities.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A deep-tech startup files a provisional patent before a demo.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A manufacturer patents a new process.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A university protects a research invention.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Patent Registration | JR Compliance",
          "metaDescription": "A patent in India is granted under the Patents Act, 1970 (as amended) and the Patents Rules, 2003 by the Patent Office under the CGPDTM. The applicant files…",
          "canonicalUrl": "/corporate/patent-registration",
          "keywords": "Patent Registration, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "legal-agreement",
      "matchSlugs": [
        "legal-agreement"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 75,
        "originalRow": 89,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Legal Agreement",
        "menuLabel": "Legal Agreement",
        "sortOrder": 16,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "Legal agreement drafting prepares a written contract between parties, such as a partnership deed, shareholders' agreement, service agreement, NDA, lease or vendor agreement, so that it is enforceable under the Indian Contract Act, 1872. A valid agreement needs the essentials in Section 10 (free consent, competent parties, lawful consideration and object), must be stamped as per the applicable stamp law, and some agreements must also be registered under the Registration Act, 1908."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Legal Agreement?",
          "paragraphs": [
            {
              "text": "A legal agreement is a written understanding between two or more parties that creates rights and obligations. Under Section 2(h) of the Indian Contract Act, 1872, an agreement enforceable by law is a contract. To be enforceable it must satisfy Section 10: offer and acceptance, free consent of competent parties, lawful consideration and lawful object. Section 11 requires parties to be of the age of majority and of sound mind, and Section 23 declares agreements with unlawful objects void."
            },
            {
              "text": "Electronic contracts have the same legal effect as paper contracts under the IT Act, 2000 and the Evidence Act, 1872. The Contract Act does not require writing or registration, but other laws do: stamp duty under the Indian Stamp Act, 1899 and state laws, and registration under Section 17 of the Registration Act, 1908 for certain documents such as some immovable property transactions."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Does an agreement need stamp duty?",
              "answer": "Yes as per the stamp law of the relevant state; rates vary."
            },
            {
              "question": "Does every agreement need registration?",
              "answer": "No, only documents covered by Section 17 of the Registration Act."
            },
            {
              "question": "Are electronic contracts valid?",
              "answer": "Yes, under the IT Act, 2000."
            },
            {
              "question": "Is a written agreement mandatory?",
              "answer": "The Contract Act does not require it, but writing is strongly advised."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Legal Agreement",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Founders and companies entering partnerships, investments, employment or vendor relationships, landlords and tenants, freelancers and agencies, franchisors, joint venture partners and anyone who needs a written, enforceable record of a deal need legal agreements.</p>\n\n<p>Startups raising money need shareholders' agreements and term sheets. Businesses sharing confidential information need NDAs. Service providers need master service agreements and statements of work.</p>\n\n<p>Informal arrangements based on emails or verbal promises often lead to disputes, so putting the deal in writing early is wise.</p>\n\n<p>For high-value or complex transactions, a lawyer's review is advisable in addition to drafting support.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Clear, enforceable agreement tailored to your deal</li>\n<li>Advice on stamp duty and registration</li>\n<li>Termination, indemnity and dispute resolution clauses</li>\n<li>Support for e-signing and execution</li>\n<li>Fewer disputes and better records</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After signing, keep executed copies and track renewals and obligations.</p>\n\n<p><strong>Related services:</strong> Partnership Firm registration, Trademark Transfer, Copyright Registration and Share Transfer.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Using templates that do not match the deal.</li>\n<li>Not stamping the agreement properly.</li>\n<li>Omitting dispute resolution and termination clauses.</li>\n<li>Signing without checking party authority.</li>\n<li>Not keeping executed copies.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Drafting time depends on complexity.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> share a short term sheet of the deal before drafting so that the agreement reflects the commercial terms.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Indian Contract Act, 1872 is the main law for contracts. Stamp and registration laws add formal requirements and affect admissibility as evidence.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>Two founders sign a shareholders' agreement.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company signs an NDA with a vendor.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A landlord and tenant sign a stamped lease.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Legal Agreement | JR Compliance",
          "metaDescription": "Legal agreement drafting prepares a written contract between parties, such as a partnership deed, shareholders' agreement, service agreement, NDA, lease or…",
          "canonicalUrl": "/corporate/legal-agreement",
          "keywords": "Legal Agreement, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "ipr-service-page",
      "proposedSlug": "logo-designing",
      "matchSlugs": [
        "logo-designing"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 76,
        "originalRow": 90,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Logo Designing",
        "menuLabel": "Logo Designing",
        "sortOrder": 17,
        "hero": {
          "eyebrow": "IPR Services",
          "description": "Logo designing creates a brand mark, such as a wordmark, symbol or both, that can then be protected legally. The artistic design of a logo is protected as an artistic work under the Copyright Act, 1957 (automatic on creation, registration optional), and its use as a brand identifier can be registered as a device mark under the Trade Marks Act, 1999. Ownership must be settled in writing when a freelancer or agency designs it."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Logo Designing?",
          "paragraphs": [
            {
              "text": "A logo is a graphic mark, name or symbol used to identify a business. Legally it can be both an artistic work under Section 2(c) of the Copyright Act, 1957, which covers drawings whether or not they possess artistic quality, and a trademark (device mark) if it is distinctive and capable of identifying the goods or services of one business."
            },
            {
              "text": "Copyright protects the artistic design, and lasts for the author's lifetime plus 60 years according to IP firm sources. Trademark protects the logo as a brand indicator in trade and is renewable every 10 years."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who owns a logo designed by a freelancer?",
              "answer": "The designer, unless a written assignment transfers ownership."
            },
            {
              "question": "Can a logo be registered as a trademark?",
              "answer": "Yes, as a device mark if it is distinctive."
            },
            {
              "question": "Is copyright registration needed?",
              "answer": "Not mandatory, but it provides evidence of ownership."
            },
            {
              "question": "How long does copyright last?",
              "answer": "Lifetime of the author plus 60 years, per IP firm sources."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Logo Designing",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Startups and new businesses creating a brand identity, companies rebranding, and designers and agencies delivering logos who must hand over clear ownership need this service.</p>\n\n<p>Businesses that used a free or template logo may find that they cannot register it as a trademark because it lacks originality or may conflict with others.</p>\n\n<p>Companies that commissioned a logo without a written agreement should obtain an assignment now.</p>\n\n<p>If your logo will appear on products in many forms, consider the combination of copyright, trademark and design protection.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>A distinctive logo designed with trademark registration in mind</li>\n<li>Written copyright assignment so you own it</li>\n<li>Final files in useful formats</li>\n<li>Trademark search and filing support</li>\n<li>Brand protection from the start</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the logo is final, search, register and use it consistently.</p>\n\n<p><strong>Related services:</strong> TM Search, Trademark Registration, Copyright Registration and Design Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Using stock or template elements that cannot be protected.</li>\n<li>Not getting a written assignment from the designer.</li>\n<li>Skipping a trademark search.</li>\n<li>Choosing a logo too similar to others.</li>\n<li>Not saving original editable files.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Design timelines depend on the number of concepts and revisions.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> agree on deliverables, file formats and ownership terms in writing before design begins.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Copyright Act, 1957 and the Trade Marks Act, 1999 together protect logos. Assignments must be in writing under the Copyright Act.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup commissions a logo and gets a written assignment.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company registers its logo as a device mark.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A brand updates its logo and files a fresh application.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>The cleanest logo projects start with ownership. Agree in writing who owns the final artwork, source files and any rights in concepts, and keep the agreement with the artwork. That single document prevents most later disputes.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Logo Designing | JR Compliance",
          "metaDescription": "Logo designing creates a brand mark, such as a wordmark, symbol or both, that can then be protected legally. The artistic design of a logo is protected as an…",
          "canonicalUrl": "/corporate/logo-designing",
          "keywords": "Logo Designing, IPR Services, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fssai-service-page",
      "proposedSlug": "fssai-certificate",
      "matchSlugs": [
        "fssai-certificate",
        "fssai-basic-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 77,
        "originalRow": 94,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Fssai Basic Registration",
        "menuLabel": "Fssai Basic Registration",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "FSSAI",
          "description": "FSSAI Basic Registration is the entry-level food business registration under the Food Safety and Standards Act, 2006 for petty food businesses with annual turnover up to Rs 12 lakh. It is applied for in Form A on the FoSCoS portal (foscos.fssai.gov.in) with a government fee of Rs 100 per year, and the registration certificate is issued by the local Registering Authority."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Fssai Basic Registration?",
          "paragraphs": [
            {
              "text": "FSSAI Basic Registration is a certificate issued by the Food Safety and Standards Authority of India to petty food business operators, such as small retailers, hawkers, vendors and small manufacturers. It authorises them to carry on food business legally and gives a 14-digit registration number that must be displayed on premises and printed on packaging. It is different from a State or Central licence, which are for larger businesses and use Form B."
            },
            {
              "text": "A petty food business is generally one with turnover up to Rs 12 lakh a year, and one source also mentions petty manufacturing capacity up to 100 kg or litres a day. The business must operate in one state or union territory, and up to 12 vending machines in one state qualify."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the fee?",
              "answer": "Rs 100 per year for Basic Registration."
            },
            {
              "question": "Who qualifies?",
              "answer": "Petty food businesses with turnover up to Rs 12 lakh and limited operations."
            },
            {
              "question": "Is registration mandatory?",
              "answer": "Yes, for eligible food businesses before starting."
            },
            {
              "question": "What if turnover grows?",
              "answer": "Upgrade to a State or Central licence."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Fssai Basic Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Street vendors, small shops and kiosks, home-based food sellers, small tea stalls, petty manufacturers of snacks and sweets, tiffin services and startups with turnover below Rs 12 lakh need Basic Registration.</p>\n\n<p>Home bakers and cloud-kitchen startups that sell through apps are often required to have FSSAI registration by the platforms.</p>\n\n<p>Businesses that cross the turnover threshold, operate in several states or have higher production capacity should upgrade to a State or Central licence.</p>\n\n<p>If you are unsure whether your business is petty or needs a licence, we review your turnover, activity and scale and recommend the right category.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal permission to run a small food business</li>\n<li>Form A filed correctly on FoSCoS</li>\n<li>Registration number for display and packaging</li>\n<li>Options for one to five years validity</li>\n<li>Clear upgrade path to State or Central licence</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, display the number, follow labelling rules and renew before expiry.</p>\n\n<p><strong>Related services:</strong> FSSAI State and Central licences, FSSAI Renewal, FSSAI Return, Udyam registration and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Operating before getting registration.</li>\n<li>Not displaying the registration number.</li>\n<li>Applying for Basic Registration when turnover or scale requires a licence.</li>\n<li>Forgetting renewal.</li>\n<li>Using an outdated turnover limit.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Registration is usually issued within a few days to weeks after verification. The fee is Rs 100 per year.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> choose a multi-year validity to avoid frequent renewals.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The Food Safety and Standards Act, 2006 requires all food business operators to register or obtain a licence. The Licensing and Registration Regulations set out categories and conditions.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A home baker registers before selling on delivery apps.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A street food vendor obtains registration for his stall.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A small snack maker registers a petty manufacturing unit.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Fssai Basic Registration | JR Compliance",
          "metaDescription": "FSSAI Basic Registration is the entry-level food business registration under the Food Safety and Standards Act, 2006 for petty food businesses with annual…",
          "canonicalUrl": "/corporate/fssai-certificate",
          "keywords": "Fssai Basic Registration, FSSAI, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fssai-service-page",
      "proposedSlug": "fssai-state",
      "matchSlugs": [
        "fssai-state"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 78,
        "originalRow": 95,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Fssai State",
        "menuLabel": "Fssai State",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "FSSAI",
          "description": "The FSSAI State Licence is for food businesses with annual turnover from Rs 12 lakh up to Rs 20 crore operating within a single state. It is applied for in Form B on FoSCoS with an annual fee quoted as Rs 2,000 (manufacturing) to Rs 5,000 depending on the business category, and is issued by the State Food Safety Authority after document verification and, where required, inspection."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Fssai State?",
          "paragraphs": [
            {
              "text": "A State FSSAI licence is a licence under the Food Safety and Standards (Licensing and Registration) Regulations issued by the State or UT Food Safety Commissioner's licensing authority to medium-sized food businesses. It permits manufacturing, storage, distribution, retail, restaurant or other food activity within the state and carries a 14-digit licence number that must be printed on packaging and displayed at the premises."
            },
            {
              "text": "The turnover band is from Rs 12 lakh to Rs 20 crore, and transport businesses with up to 100 vehicles and up to 100 vending machines in one state also qualify. Fees depend on the category of business, and sources quote Rs 2,000 for manufacturing and Rs 2,000 to Rs 5,000 for others."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What turnover does a State licence cover?",
              "answer": "Rs 12 lakh to Rs 20 crore."
            },
            {
              "question": "What is the fee?",
              "answer": "Sources quote Rs 2,000 for manufacturing and Rs 2,000 to Rs 5,000 for other categories."
            },
            {
              "question": "Is inspection needed?",
              "answer": "The authority may inspect the premises."
            },
            {
              "question": "Do I need a water report?",
              "answer": "Yes, a chemical and bacteriological analysis report is usually required."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Fssai State",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Restaurants and cafes, caterers, medium manufacturers and processors, wholesalers and warehouses, cold storage operators, dairy and bakery units and retailers with turnover between Rs 12 lakh and Rs 20 crore need a State licence.</p>\n\n<p>Businesses that operate in more than one state, import food or exceed Rs 20 crore turnover need a Central licence instead.</p>\n\n<p>Cloud kitchens and food delivery startups that outgrow petty status often move to the State licence.</p>\n\n<p>If your activity changes, such as starting manufacturing, review your licence category.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct licence category for your turnover and activity</li>\n<li>Complete Form B and supporting documents</li>\n<li>Water test report and layout prepared</li>\n<li>Support through inspection</li>\n<li>Choice of one to five years validity</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After licensing, display the licence, follow hygiene rules and file returns if applicable.</p>\n\n<p><strong>Related services:</strong> FSSAI Central, Modification, Renewal, Return, Water Report and HACCP.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying under the wrong category.</li>\n<li>Missing the water test report or Form IX.</li>\n<li>Weak layout or hygiene arrangements at inspection.</li>\n<li>Forgetting renewal.</li>\n<li>Operating in another state without the right licence.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The authority may take 30 to 60 days including inspection.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> have your layout, equipment list and water report ready before applying.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The FSS (Licensing and Registration) Regulations, 2011 define registration and licence categories by scale of business. State licences cover medium operations within a state.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A restaurant with Rs 1 crore turnover obtains a State licence.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A bakery expands production and upgrades.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A warehouse storing packaged food applies for a State licence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Fssai State | JR Compliance",
          "metaDescription": "The FSSAI State Licence is for food businesses with annual turnover from Rs 12 lakh up to Rs 20 crore operating within a single state. It is applied for in…",
          "canonicalUrl": "/corporate/fssai-state",
          "keywords": "Fssai State, FSSAI, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fssai-service-page",
      "proposedSlug": "fssai-central",
      "matchSlugs": [
        "fssai-central"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 79,
        "originalRow": 96,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Fssai Central",
        "menuLabel": "Fssai Central",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "FSSAI",
          "description": "The FSSAI Central Licence is for large food businesses with annual turnover above Rs 20 crore, and for specified categories such as importers, 100% export-oriented units, operators in airports and seaports and businesses operating in multiple states. It uses Form B on FoSCoS, with an annual fee of Rs 7,500, and is issued by the Central Licensing Authority of FSSAI."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Fssai Central?",
          "paragraphs": [
            {
              "text": "A Central FSSAI licence is issued by FSSAI's central licensing authority to food businesses that operate on a large scale or across states. It covers manufacturing, importing, exporting and other activities requiring central oversight, and typically requires a Food Safety Management System plan or certificate from an accredited agency."
            },
            {
              "text": "The turnover threshold is above Rs 20 crore, though one source applies Rs 30 crore for transport and wholesaler businesses. The licence is mandatory for 100% export-oriented units, importers, large manufacturers and businesses in airports, seaports and certain central government premises, as well as multi-state operators."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the Central licence fee?",
              "answer": "Rs 7,500 per year."
            },
            {
              "question": "Who needs it?",
              "answer": "Businesses above Rs 20 crore turnover, importers, export units and multi-state operators."
            },
            {
              "question": "Is an FSMS plan needed?",
              "answer": "Typically, a plan or certificate is required."
            },
            {
              "question": "What validity can I choose?",
              "answer": "One to five years."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Fssai Central",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Large food manufacturers, importers, exporters, multi-state food businesses, food courts and restaurants in airports and seaports, and companies with turnover above Rs 20 crore need a Central licence.</p>\n\n<p>Food startups that scale quickly across states may need to upgrade from State licences.</p>\n\n<p>Importers of food products should obtain the Central licence before customs clearance.</p>\n\n<p>Companies that are unsure whether they qualify should review turnover, locations and activities.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct central licence category for large or multi-state operations</li>\n<li>FSMS plan and documents prepared</li>\n<li>Smooth handling of queries and inspection</li>\n<li>Annual fee and validity options explained</li>\n<li>Support for importers and exporters</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After licensing, maintain hygiene and file returns.</p>\n\n<p><strong>Related services:</strong> FSSAI State, Modification, Renewal, Return, IEC Code and HACCP.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying for a State licence when a Central one is required.</li>\n<li>Missing IEC for importers.</li>\n<li>Weak FSMS documentation.</li>\n<li>Not renewing in time.</li>\n<li>Ignoring annual return filing.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Central licences involve scrutiny and possible inspection.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare the FSMS plan, layout and IEC documents before applying.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The FSS Licensing and Registration Regulations assign central licensing to FSSAI for large-scale and import-related businesses.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A large packaged-food manufacturer obtains a Central licence.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An importer of food ingredients applies before importing.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A restaurant chain operating at airports obtains a Central licence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Fssai Central | JR Compliance",
          "metaDescription": "The FSSAI Central Licence is for large food businesses with annual turnover above Rs 20 crore, and for specified categories such as importers, 100%…",
          "canonicalUrl": "/corporate/fssai-central",
          "keywords": "Fssai Central, FSSAI, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fssai-service-page",
      "proposedSlug": "fssai-modification",
      "matchSlugs": [
        "fssai-modification"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 80,
        "originalRow": 97,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "extraContent",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Fssai Modification",
        "menuLabel": "Fssai Modification",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "FSSAI",
          "description": "FSSAI licence or registration modification is the process of updating details on an existing licence, such as address, constitution, product categories, production capacity, nominee or contact details, through the FoSCoS portal. Sources quote a government fee of Rs 1,000 for a licence and Rs 100 for a registration certificate. The change is not effective until approved."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Fssai Modification?",
          "paragraphs": [
            {
              "text": "A modification application is a request on FoSCoS to amend the particulars recorded in an FSSAI licence or registration after issue. It can include changes in business details, products, capacity, address or other recorded information, and conversion between licence categories, for example from registration to a State licence or from State to Central."
            },
            {
              "text": "FSSAI's own orders require such modification through an online application with the prescribed fee. The applicant must hold a valid licence or registration, and changes should be applied for before or at the time they take effect."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What can be modified?",
              "answer": "Address, constitution, products, capacity, nominee and similar details."
            },
            {
              "question": "What is the fee?",
              "answer": "Sources quote Rs 1,000 for licences and Rs 100 for registrations."
            },
            {
              "question": "Do I need a new licence when turnover grows?",
              "answer": "You may need to move to a higher category."
            },
            {
              "question": "Where is it applied?",
              "answer": "On FoSCoS."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Fssai Modification",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Food businesses that move premises, change ownership or constitution, add products, expand capacity, change the nominee or cross a turnover threshold need modification.</p>\n\n<p>Startups that have scaled from home to a facility need to update their address and production details.</p>\n\n<p>Businesses that change from sole proprietorship to a company must update the licence in the company's name.</p>\n\n<p>If you are unsure whether a change needs modification or a new licence, we review the facts and advise.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Licence details updated to match actual operations</li>\n<li>Correct documents for each change</li>\n<li>Conversion between categories handled</li>\n<li>Fee paid and application tracked</li>\n<li>Reduced risk during inspection</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After modification, download the updated certificate and update packaging.</p>\n\n<p><strong>Related services:</strong> FSSAI Basic, State, Central, Renewal and Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Delaying updates after a change.</li>\n<li>Using the old licence for a new premises.</li>\n<li>Missing supporting documents.</li>\n<li>Not changing category after growth.</li>\n<li>Not updating packaging labels.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing depends on the licensing authority.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> apply for modification before moving premises or adding products.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>FSSAI regulations require licence details to reflect actual operations. Modifications keep the public record accurate.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A bakery moves to a bigger kitchen and updates its address.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A partnership converts to a company and updates the licence.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A manufacturer adds new product categories.</p>\n\n<h2>Process &amp; Planning</h2>\n\n<p>Start by logging in to FoSCoS with your existing licence or registration number and reviewing every detail on the certificate, because a modification is only needed where the recorded information no longer matches reality. Typical triggers are a change of address, a change in the legal constitution (for example from proprietorship to company), new product categories, higher production capacity, a new nominee and updated contact details. Next, collect the documents that prove the change, such as new address proof, the partnership deed or incorporation certificate and a revised layout. Pay the modification fee quoted by sources (Rs 1,000 for licences and Rs 100 for registrations), submit and wait for approval.</p>\n\n<p><strong>Planning checklist:</strong> confirm the change before it takes effect, check whether your turnover now requires a higher licence category, update labels and packaging with the new details, inform your marketplace partners and keep a copy of the updated certificate for inspections.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Fssai Modification | JR Compliance",
          "metaDescription": "FSSAI licence or registration modification is the process of updating details on an existing licence, such as address, constitution, product categories…",
          "canonicalUrl": "/corporate/fssai-modification",
          "keywords": "Fssai Modification, FSSAI, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fssai-service-page",
      "proposedSlug": "fssai-renewal",
      "matchSlugs": [
        "fssai-renewal"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 81,
        "originalRow": 98,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Fssai Renewal",
        "menuLabel": "Fssai Renewal",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "FSSAI",
          "description": "FSSAI licences and registrations must be renewed before they expire, through the FoSCoS portal using the existing licence number. The renewal fee equals the original fee. FSSAI says renewal can be initiated as early as 180 days before expiry. Other points, such as the late fee before expiry, the post-expiry grace window and penalties, are described differently by different sources."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Fssai Renewal?",
          "paragraphs": [
            {
              "text": "Renewal is the extension of an FSSAI licence or registration for a further period of one to five years by filing a renewal application and paying the licence fee. FSSAI's 2025 consultation notice also discusses introducing fixed renewal cycles and prolonged validity so that all licences have uniform expiry dates."
            },
            {
              "text": "Older pages say a late fee of Rs 100 per day applies if filed within 30 days of expiry and up to Rs 100 per day after expiry, while a source quoting FSSAI's 2025 consultation paper says the pre-expiry late fee was discontinued after instant renewals. Some sources say renewal is allowed up to 180 days after expiry with penalties of up to three times or five times the annual fee, others say an expired licence needs a fresh application."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How early can I renew?",
              "answer": "FSSAI says as early as 180 days before expiry."
            },
            {
              "question": "What is the renewal fee?",
              "answer": "Same as the original fee."
            },
            {
              "question": "What if I miss the date?",
              "answer": "Late fee and penalty rules are described differently; confirm on FoSCoS."
            },
            {
              "question": "Can the validity be extended?",
              "answer": "You can choose one to five years."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Fssai Renewal",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>All food businesses with FSSAI registrations or licences need renewal, especially those with multiple premises and different expiry dates.</p>\n\n<p>Businesses selling on marketplaces must keep their licences valid, because platforms check them.</p>\n\n<p>Companies that changed details since the last licence should also modify before or during renewal.</p>\n\n<p>If your licence has expired, act quickly to reduce penalties and avoid business disruption.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Renewal tracked before expiry</li>\n<li>Updated details and documents prepared</li>\n<li>Correct fee and late fee guidance</li>\n<li>Clear route if the licence has expired</li>\n<li>Continuous legal operation</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After renewal, update packaging and records.</p>\n\n<p><strong>Related services:</strong> FSSAI Basic, State, Central, Modification and Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Waiting until after expiry.</li>\n<li>Using an old fee figure.</li>\n<li>Not updating details at renewal.</li>\n<li>Overlooking multiple licence expiry dates.</li>\n<li>Assuming an expired licence can always be renewed.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Renewal can be initiated up to 180 days before expiry.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> renew at least a month ahead and choose a longer validity to reduce frequency.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>FSSAI licences have fixed validity, and renewal ensures continued compliance. FSSAI has proposed fixed renewal cycles to simplify tracking.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A restaurant renews three months before expiry.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A manufacturer with multiple units aligns renewals.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A business that missed the date seeks advice on reinstating its licence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Fssai Renewal | JR Compliance",
          "metaDescription": "FSSAI licences and registrations must be renewed before they expire, through the FoSCoS portal using the existing licence number. The renewal fee equals the…",
          "canonicalUrl": "/corporate/fssai-renewal",
          "keywords": "Fssai Renewal, FSSAI, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fssai-service-page",
      "proposedSlug": "fssai-return",
      "matchSlugs": [
        "fssai-return"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 82,
        "originalRow": 99,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Fssai Return",
        "menuLabel": "Fssai Return",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "FSSAI",
          "description": "FSSAI annual returns are filed online on FoSCoS. Form D-1 (annual) is due by 31 May for the preceding financial year and must be filed by licensed manufacturers, importers, packers, repackers, labellers and relabellers, with a separate return per licence. Form D-2 is a half-yearly return for milk and milk-product businesses. There is no government fee, but a late fee of Rs 100 per day is quoted for delay."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Fssai Return?",
          "paragraphs": [
            {
              "text": "The FSSAI annual return is a mandatory declaration of the quantity and value of food products manufactured, imported, exported or sold by licensed food businesses in the preceding financial year, filed under the Food Safety and Standards (Licensing and Registration) Regulations. Form D-1 is the annual return, and Form D-2 is the half-yearly return filed by dairy businesses."
            },
            {
              "text": "Traders who only sell, store, distribute or handle food are generally not required to file. Petty registered-only businesses are also generally exempt. The return is filed online, and the details include product-wise quantities (in tonnes), values, package sizes, import or export rates and sources of raw materials."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is D-1 due?",
              "answer": "By 31 May for the preceding financial year."
            },
            {
              "question": "Who must file?",
              "answer": "Licensed manufacturers, importers, packers, repackers, labellers and relabellers."
            },
            {
              "question": "Is there a fee?",
              "answer": "No government fee, but a Rs 100 per day late fee is quoted."
            },
            {
              "question": "What is D-2?",
              "answer": "A half-yearly return for dairy businesses; due dates vary across sources."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Fssai Return",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Licensed food manufacturers and processors, importers and exporters, packers, repackers, labellers and relabellers, cloud kitchens that manufacture, and dairy units need to file returns.</p>\n\n<p>Businesses with multiple licences must file separate returns for each.</p>\n\n<p>Companies that only trade packaged foods without manufacturing may not need to file, but they should confirm their licence conditions.</p>\n\n<p>If you missed past returns, we can help regularise filings and reduce late fee exposure.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Timely filing of D-1 (and D-2 where applicable)</li>\n<li>Accurate product-wise data</li>\n<li>Separate returns per licence</li>\n<li>Reduced late fees</li>\n<li>Acknowledgement and records maintained</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, keep the acknowledgement and plan next year's data collection.</p>\n\n<p><strong>Related services:</strong> FSSAI Renewal, Modification, State and Central licences and GST Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the 31 May deadline.</li>\n<li>Filing one return for multiple licences.</li>\n<li>Inaccurate or incomplete product data.</li>\n<li>Assuming traders must file.</li>\n<li>Relying on wrong D-2 dates.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The return is due by 31 May.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> maintain monthly production and sales records so the annual return can be filed quickly.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>FSSAI's licensing conditions require licensed businesses to file annual returns. The returns help in market surveillance.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A food manufacturer files D-1 with product-wise data.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A dairy files D-2 returns.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An importer files a return for its licence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Fssai Return | JR Compliance",
          "metaDescription": "FSSAI annual returns are filed online on FoSCoS. Form D-1 (annual) is due by 31 May for the preceding financial year and must be filed by licensed…",
          "canonicalUrl": "/corporate/fssai-return",
          "keywords": "Fssai Return, FSSAI, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fssai-service-page",
      "proposedSlug": "water-report",
      "matchSlugs": [
        "water-report"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 83,
        "originalRow": 100,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Water Report",
        "menuLabel": "Water Report",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "FSSAI",
          "description": "A water test report is a laboratory analysis of the water used as an ingredient or in food handling, required as a supporting document for an FSSAI State or Central licence application, and often for renewal. FoSCoS asks for a chemical and bacteriological analysis report from a recognised or public health laboratory confirming potability, showing the name of the lab representative who collected the sample and the date of collection."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Water Report?",
          "paragraphs": [
            {
              "text": "A water analysis (potability) report certifies that the water used in food preparation or as an ingredient meets drinking-water standards, i.e. potable water as per BIS IS 10500. It covers chemical and bacteriological parameters. For packaged drinking or mineral water units, the licence application also needs a pesticide residue report of the source water and, for ground-water extraction, a CGWA NOC."
            },
            {
              "text": "The FoSCoS sample document says reports should be from a 'recognized/public health laboratory', while a private compliance guide says only NABL-accredited labs are accepted, so using an NABL-accredited or FSSAI-notified lab is the safe choice. One source says reports should be recent, not older than six months."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What does the report cover?",
              "answer": "Chemical and bacteriological analysis to confirm potability."
            },
            {
              "question": "Which lab should I use?",
              "answer": "An NABL-accredited or FSSAI-notified/recognised lab."
            },
            {
              "question": "Who collects the sample?",
              "answer": "The lab's authorised representative, whose name and date appear in the report."
            },
            {
              "question": "Is it needed for renewal?",
              "answer": "Often yes; check FoSCoS."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Water Report",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Restaurants, caterers, food manufacturers, packaged drinking water and beverage units, and any food business applying for or renewing a State or Central FSSAI licence need a water test report.</p>\n\n<p>Businesses that use municipal water, borewell water or treated water should all test, because the licence authority wants proof of potability.</p>\n\n<p>Companies that use water as a key ingredient, such as beverage makers, need to maintain regular testing.</p>\n\n<p>If your water source changes, you should test again.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Report from a suitable lab with required sample details</li>\n<li>Chemical and bacteriological parameters covered</li>\n<li>Extra reports for packaged water units</li>\n<li>Upload-ready documents</li>\n<li>Regular testing schedule advice</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the report, upload it with the FSSAI application.</p>\n\n<p><strong>Related services:</strong> FSSAI State and Central licences, Renewal, HACCP and GMP.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Sending your own sample instead of lab collection.</li>\n<li>Using a non-recognised lab.</li>\n<li>Using an old report.</li>\n<li>Missing pesticide residue tests for packaged water.</li>\n<li>Not retesting after changing water source.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Lab turnaround is typically several days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> book the test early, since the report is needed before filing.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>FSSAI hygiene requirements under Schedule 4 require use of potable water in food handling. The report provides evidence of compliance.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A restaurant tests borewell water before licence application.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A beverage unit tests process water.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A packaged water plant obtains pesticide and microbiological reports.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Water Report | JR Compliance",
          "metaDescription": "A water test report is a laboratory analysis of the water used as an ingredient or in food handling, required as a supporting document for an FSSAI State or…",
          "canonicalUrl": "/corporate/water-report",
          "keywords": "Water Report, FSSAI, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "sebi-business-registration-page",
      "proposedSlug": "portfolio-manager-registration",
      "matchSlugs": [
        "portfolio-manager-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 84,
        "originalRow": 104,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Portfolio Manager Registration",
        "menuLabel": "Portfolio Manager Registration",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "SEBI Business Registration",
          "description": "Portfolio management services (PMS) in India can be offered only by entities registered with SEBI under the SEBI (Portfolio Managers) Regulations, 2020, in force from 21 January 2020. The applicant files Form A through the SEBI Intermediary Portal with supporting documents under Schedule I, and on satisfaction SEBI grants the Certificate of Registration in Form B. The key requirements are a net worth of Rs 5 crore and a Principal Officer holding the specified NISM certification."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Portfolio Manager Registration?",
          "paragraphs": [
            {
              "text": "A Portfolio Manager is a body corporate that, under a contract with a client, advises or directs or undertakes on the client's behalf the management or administration of a portfolio of securities or the client's funds. Services can be discretionary, non-discretionary or advisory. A portfolio manager must hold a SEBI certificate of registration, charge fees as agreed, fixed, return-based or a combination, with no guaranteed returns and no upfront fees, and follow SEBI's conduct, disclosure and reporting requirements."
            },
            {
              "text": "The applicant must be a body corporate and fit and proper. The minimum net worth is Rs 5 crore, up from Rs 2 crore earlier, with existing portfolio managers given a 36-month grace period. Net worth means paid-up equity capital plus free reserves as defined in the Regulations. The Principal Officer must have the prescribed qualification and hold NISM Series XXI-B certification at all times."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the minimum net worth?",
              "answer": "Rs 5 crore."
            },
            {
              "question": "Which form is used?",
              "answer": "Form A, with the certificate in Form B."
            },
            {
              "question": "Who qualifies as Principal Officer?",
              "answer": "A person with the prescribed qualification and NISM Series XXI-B certification."
            },
            {
              "question": "Are there exemptions?",
              "answer": "Co-investment portfolio managers are exempt from the net worth requirement."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Portfolio Manager Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Wealth managers, asset management groups, investment boutiques, brokerage houses, banks and NBFCs that want to offer discretionary or non-discretionary portfolio management to high-net-worth and institutional clients need PMS registration.</p>\n\n<p>Experienced fund managers who want to start their own PMS business need to build the required net worth and compliance infrastructure.</p>\n\n<p>Companies that run AIFs may opt for co-investment portfolio manager status and enjoy relief on net worth.</p>\n\n<p>If you only want to give investment advice, investment adviser registration may be more suitable than PMS.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Clear route to SEBI registration as a portfolio manager</li>\n<li>Net worth planning and certification</li>\n<li>Principal Officer and compliance set-up guidance</li>\n<li>Complete Form A and Schedule I documents</li>\n<li>Support with client agreements and disclosures</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, comply with SEBI's ongoing requirements.</p>\n\n<p><strong>Related services:</strong> Public or Private Limited Company registration, Mutual Fund registration, Annual Compliance and Accounting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Underestimating net worth and its certification.</li>\n<li>Appointing a Principal Officer without the required certification.</li>\n<li>Weak compliance infrastructure.</li>\n<li>Promising returns or charging upfront fees.</li>\n<li>Neglecting client disclosures.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>SEBI processing takes time depending on completeness.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> confirm the registration fee and document list on the current SEBI regulations before filing.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>SEBI (Portfolio Managers) Regulations, 2020 regulate PMS to protect investors. They set eligibility, conduct and disclosure rules.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A wealth firm applies for PMS registration.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A fund manager sets up a new PMS entity.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An AIF manager considers co-investment portfolio manager status.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Portfolio management is a regulated, trust-based business. Beyond registration, SEBI expects clear client agreements, disclosure documents, segregation of client assets, reporting and a compliance culture. Build these into the firm from the start, not after registration.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Portfolio Manager Registration | JR Compliance",
          "metaDescription": "Portfolio management services (PMS) in India can be offered only by entities registered with SEBI under the SEBI (Portfolio Managers) Regulations, 2020, in…",
          "canonicalUrl": "/corporate/portfolio-manager-registration",
          "keywords": "Portfolio Manager Registration, SEBI Business Registration, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "gst-registration",
      "matchSlugs": [
        "gst-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 85,
        "originalRow": 108,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "GST Registration",
        "menuLabel": "GST Registration",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "GST registration gives a business its 15-digit GSTIN under the CGST Act, 2017. It is applied for online on gst.gov.in in Form GST REG-01, with Part A to get a Temporary Reference Number and Part B for the full application. There is no government fee. Standard approval takes about 7 working days after Aadhaar authentication, and sources say an optional simplified route (Rule 14A, live from 1 November 2025) can approve low-risk applications in 3 working days."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is GST Registration?",
          "paragraphs": [
            {
              "text": "Goods and Services Tax (GST) registration is the process by which a supplier becomes a registered person under GST, allowed to charge GST, claim input tax credit and file returns. Registration is PAN-based and state-wise. It is mandatory once aggregate turnover crosses the threshold in Section 22 of the CGST Act, and for specified categories irrespective of turnover under Section 24, such as inter-state suppliers of goods, e-commerce operators and sellers, persons liable under reverse charge, casual and non-resident taxable persons."
            },
            {
              "text": "The general thresholds are Rs 40 lakh for goods in most states and Rs 20 lakh for services, with lower limits in special-category states, and sources differ on some figures (for example one says Telangana keeps Rs 20 lakh for goods). Voluntary registration is also allowed. The composition scheme is optional for goods suppliers up to Rs 1.5 crore turnover, lower in special-category states."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the threshold?",
              "answer": "Rs 40 lakh for goods (most states) and Rs 20 lakh for services, with lower limits in special-category states."
            },
            {
              "question": "Is there a government fee?",
              "answer": "No."
            },
            {
              "question": "How long does it take?",
              "answer": "About 7 working days; some sources mention a 3-day simplified route."
            },
            {
              "question": "Who must register regardless of turnover?",
              "answer": "Inter-state suppliers of goods, e-commerce sellers and others under Section 24."
            }
          ]
        },
        "extraContent": [
          {
            "title": "GST Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Businesses crossing the GST turnover threshold, e-commerce sellers, inter-state suppliers, service providers who want to claim input tax credit and businesses dealing with clients that require a GSTIN need registration.</p>\n\n<p>Startups often register voluntarily to sell to businesses, claim credit on purchases and appear more credible.</p>\n\n<p>Freelancers and consultants whose turnover is below the threshold may still need registration if they supply across states in specific situations.</p>\n\n<p>If you are unsure whether you need registration, we review your turnover, nature of supply and states of operation.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct determination of mandatory or voluntary registration</li>\n<li>Documents and business details prepared for REG-01</li>\n<li>Aadhaar authentication and queries handled</li>\n<li>Guidance on composition vs regular scheme</li>\n<li>GSTIN and certificate delivered with return calendar</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After GSTIN, issue invoices and file returns.</p>\n\n<p><strong>Related services:</strong> GST Return, TDS Return, Udyam registration, IEC Code and Accounting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying with mismatched PAN and address details.</li>\n<li>Missing the 30-day window after becoming liable.</li>\n<li>Choosing the wrong scheme.</li>\n<li>Using a virtual office without proper documents.</li>\n<li>Not filing returns after registration.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Approval typically takes about seven working days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep address proof, rent agreement with NOC and bank proof ready and consistent with PAN details.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The CGST Act, 2017 and state GST Acts require registration for taxable persons above thresholds and in specified cases. It enables the input tax credit system.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A trader crosses Rs 40 lakh and registers.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An e-commerce seller registers regardless of turnover.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A startup registers voluntarily to claim input credit.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Remember that GST registration is not a one-time event: changes in address, partners or business activities must be updated, and registration can be cancelled if returns are not filed.</p>"
          }
        ],
        "seo": {
          "metaTitle": "GST Registration | JR Compliance",
          "metaDescription": "GST registration gives a business its 15-digit GSTIN under the CGST Act, 2017. It is applied for online on gst.gov.in in Form GST REG-01, with Part A to get a…",
          "canonicalUrl": "/corporate/gst-registration",
          "keywords": "GST Registration, Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "gst-return",
      "matchSlugs": [
        "gst-return"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 86,
        "originalRow": 109,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "GST Return",
        "menuLabel": "GST Return",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "Regular GST taxpayers file GSTR-1 (outward supplies) and GSTR-3B (summary return with tax payment). Monthly filers file GSTR-1 by the 11th and GSTR-3B by the 20th of the next month. Taxpayers with turnover up to Rs 5 crore can opt for the QRMP scheme with quarterly returns and monthly tax payment through PMT-06. The annual return GSTR-9 is due by 31 December of the following financial year. Late fee is Rs 50 per day (Rs 20 for nil returns) plus 18% interest on late tax."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is GST Return?",
          "paragraphs": [
            {
              "text": "A GST return is a periodic statement of sales, purchases, tax collected and input tax credit that every registered person must file on the GST portal under Section 39 of the CGST Act, 2017. GSTR-1 reports outward supplies. GSTR-3B is the summary return through which tax liability is paid. GSTR-9 and 9C are the annual return and reconciliation. Composition taxpayers file CMP-08 quarterly and GSTR-4 annually. Nil returns must be filed even when there were no transactions."
            },
            {
              "text": "Due dates quoted by sources: GSTR-1 on the 11th and GSTR-3B on the 20th for monthly filers; under QRMP, GSTR-1 on the 13th after quarter end and GSTR-3B on the 22nd or 24th depending on the state; CMP-08 on the 18th after the quarter; GSTR-4 by 30 April; GSTR-9 by 31 December."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is GSTR-3B due?",
              "answer": "By the 20th of the next month for monthly filers."
            },
            {
              "question": "What is QRMP?",
              "answer": "A scheme for taxpayers with turnover up to Rs 5 crore to file quarterly returns with monthly payment."
            },
            {
              "question": "What is the late fee?",
              "answer": "Rs 50 per day, Rs 20 for nil returns, plus 18% interest on tax."
            },
            {
              "question": "When is the annual return due?",
              "answer": "By 31 December of the next financial year."
            }
          ]
        },
        "extraContent": [
          {
            "title": "GST Return",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>All GST-registered businesses, including startups, traders, e-commerce sellers and service providers, must file returns. Businesses with turnover up to Rs 5 crore can consider QRMP to reduce frequency of filing.</p>\n\n<p>Companies with high purchase volumes should reconcile GSTR-2B with books every month to claim credit correctly.</p>\n\n<p>Businesses that have been registered but inactive still need to file nil returns to avoid late fees and cancellation risk.</p>\n\n<p>If your returns are overdue, we can help regularise and reduce penalties.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>On-time GSTR-1 and GSTR-3B filing</li>\n<li>Credit reconciliation with GSTR-2B</li>\n<li>QRMP and nil return support</li>\n<li>Annual return GSTR-9 and 9C</li>\n<li>Reduced late fees and notices</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, keep records for audit.</p>\n\n<p><strong>Related services:</strong> GST Registration, TDS Return, Income Tax Return and Accounting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Claiming credit not shown in GSTR-2B.</li>\n<li>Missing nil returns.</li>\n<li>Mismatching GSTR-1 and GSTR-3B.</li>\n<li>Late filing and interest.</li>\n<li>Not reconciling annual return.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Monthly deadlines fall on the 11th and 20th.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> reconcile books with GSTR-2B before the 20th to avoid errors in credit claims.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 39 of the CGST Act requires returns, and the Rules set forms and due dates. Late fee provisions apply under Section 47.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A trader files monthly returns.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A small service firm opts for QRMP.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company reconciles and files GSTR-9.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>GST returns are easiest when reconciliation is routine. Compare your sales register with GSTR-1 before filing, match purchases with GSTR-2B before claiming credit, and make sure GSTR-3B ties to both. File on time even when liability is nil, because late fees apply to nil returns too. If you are eligible for QRMP, evaluate whether quarterly filing with monthly payment suits your cash flow, and keep the annual return reconciliation in view throughout the year so that GSTR-9 does not become a year-end surprise.</p>"
          }
        ],
        "seo": {
          "metaTitle": "GST Return | JR Compliance",
          "metaDescription": "Regular GST taxpayers file GSTR-1 (outward supplies) and GSTR-3B (summary return with tax payment). Monthly filers file GSTR-1 by the 11th and GSTR-3B by the…",
          "canonicalUrl": "/corporate/gst-return",
          "keywords": "GST Return, Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "tds-return",
      "matchSlugs": [
        "tds-return"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 87,
        "originalRow": 110,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "TDS Return",
        "menuLabel": "TDS Return",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "TDS (Tax Deducted at Source) returns are quarterly statements filed with the Income Tax Department by every deductor holding a TAN: Form 24Q (salary), 26Q (non-salary payments to residents), 27Q (payments to non-residents) and 27EQ for TCS. Due dates are 31 July, 31 October, 31 January and 31 May for the March quarter. A late fee of Rs 200 per day applies under Section 234E, capped at the TDS amount."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TDS Return?",
          "paragraphs": [
            {
              "text": "A TDS return, or statement, is the quarterly summary of tax deducted at source, deductee PANs and the challans through which tax was deposited. It must be filed under Section 200(3) of the Income Tax Act by every deductor who has deducted tax, and the details flow to the deductee's Form 26AS or AIS so credit can be claimed. TAN is mandatory for anyone deducting TDS."
            },
            {
              "text": "Due dates for non-government deductors are 31 July for Q1, 31 October for Q2, 31 January for Q3 and 31 May for Q4. TDS must be deposited by the 7th of the following month. Section 234E late fee is Rs 200 per day until filing, not exceeding the TDS amount, and Section 271H provides a penalty of Rs 10,000 to Rs 1,00,000 for non-filing or incorrect filing."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What forms are used?",
              "answer": "24Q for salary, 26Q for resident non-salary, 27Q for non-residents and 27EQ for TCS."
            },
            {
              "question": "When are returns due?",
              "answer": "31 July, 31 October, 31 January and 31 May."
            },
            {
              "question": "What is the late fee?",
              "answer": "Rs 200 per day under Section 234E, up to the TDS amount."
            },
            {
              "question": "Do I need a TAN?",
              "answer": "Yes."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TDS Return",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies, LLPs, firms and individuals who pay salaries, contractor or professional fees, rent, interest or other payments subject to TDS need to file TDS returns.</p>\n\n<p>Startups that engage freelancers and consultants should deduct and file correctly, since errors affect payees' tax credits.</p>\n\n<p>Businesses with employees must deposit TDS and file 24Q.</p>\n\n<p>If you missed filings, we can help correct and file with late fees to limit penalties.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct TDS rates and timely deposit</li>\n<li>Quarterly statements filed on time</li>\n<li>PAN validation and default correction on TRACES</li>\n<li>Form 16 and 16A issued</li>\n<li>Avoids Section 234E fees and penalties</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, issue certificates and reconcile TRACES.</p>\n\n<p><strong>Related services:</strong> Income Tax Return, GST Return, PAN/TAN correction and Accounting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing deposit deadlines.</li>\n<li>Wrong PANs of deductees.</li>\n<li>Using wrong rates.</li>\n<li>Not issuing Form 16/16A.</li>\n<li>Ignoring TRACES defaults.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>TDS must be deposited by the 7th and returns filed quarterly.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> validate PANs before filing to avoid higher-rate deductions and mismatches.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 200(3) of the Income Tax Act requires statements, and Section 234E provides the late fee. TRACES is the portal for corrections.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A company files 24Q for salaries.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A firm files 26Q for contractors.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A startup corrects a default on TRACES.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>TDS compliance has four moving parts: deducting at the correct rate, depositing by the 7th, filing the quarterly statement and issuing certificates. Errors usually arise in the first and third. Maintain a master of vendors with PANs, sections and rates, check PAN status before payments to avoid higher-rate deductions, and reconcile the statement with TRACES to correct defaults early. The Section 234E late fee is small per day but accumulates, so filing on time is cheaper than correcting later.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TDS Return | JR Compliance",
          "metaDescription": "TDS (Tax Deducted at Source) returns are quarterly statements filed with the Income Tax Department by every deductor holding a TAN: Form 24Q (salary), 26Q…",
          "canonicalUrl": "/corporate/tds-return",
          "keywords": "TDS Return, Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "msme-return-msme-form-1",
      "matchSlugs": [
        "msme-return-msme-form-1"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 88,
        "originalRow": 111,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "MSME Return (MSME Form-1)",
        "menuLabel": "MSME Return (MSME Form-1)",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "Form MSME-1 is a half-yearly return filed with the Registrar of Companies under Section 405 of the Companies Act, 2013. A company that has outstanding payments to micro or small enterprise suppliers for more than 45 days from acceptance of goods or services must report the amount and the reasons for delay. Due dates are 31 October for April to September and 30 April for October to March."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is MSME Return (MSME Form-1)?",
          "paragraphs": [
            {
              "text": "MSME Form 1 is the e-form by which specified companies disclose to the ROC the dues pending beyond 45 days to micro and small enterprise suppliers. It links to Section 15 of the MSMED Act, 2006, which requires buyers to pay MSMEs within 45 days or the agreed shorter period. It covers only micro and small suppliers, not medium enterprises."
            },
            {
              "text": "A related provision, Section 43B(h) of the Income Tax Act, can disallow the expense for unpaid MSME dues beyond the permitted period. Penalty for non-filing under Section 405(4) is Rs 20,000 on the company and on every officer in default, according to ClearTax."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is MSME-1 due?",
              "answer": "31 October for April-September and 30 April for October-March."
            },
            {
              "question": "Who needs to file?",
              "answer": "Companies with MSME dues beyond 45 days."
            },
            {
              "question": "What is the penalty?",
              "answer": "Rs 20,000 on the company and officers per ClearTax."
            },
            {
              "question": "Is a nil return needed?",
              "answer": "Sources differ."
            }
          ]
        },
        "extraContent": [
          {
            "title": "MSME Return (MSME Form-1)",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Companies buying goods or services from MSME vendors, especially manufacturers, retailers and service companies with large payables, need MSME-1.</p>\n\n<p>Startups that outsource to small vendors should track payment dates carefully.</p>\n\n<p>Companies that pay all MSME vendors on time may not need to file, though some sources say a nil return is required, so check current practice.</p>\n\n<p>If you have overdue payables, clearing them before the half-year end can avoid filing and tax issues.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct identification of MSME vendors and dues</li>\n<li>Timely MSME-1 filing</li>\n<li>Avoids Section 405 penalties</li>\n<li>Awareness of Section 43B(h) tax impact</li>\n<li>Supplier relationships protected</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, plan to clear dues.</p>\n\n<p><strong>Related services:</strong> ROC Compliance, Annual Compliance, Accounting and Udyam registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Not verifying vendors' MSME status.</li>\n<li>Missing the half-yearly dates.</li>\n<li>Ignoring tax consequences.</li>\n<li>Omitting reasons for delay.</li>\n<li>Assuming medium enterprises are covered.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Filing windows are twice a year.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> maintain an MSME vendor list with Udyam numbers and payment dates.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 405 of the Companies Act and the MSMED Act, 2006 protect small suppliers from delayed payments.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A manufacturer reports unpaid dues to a small vendor.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A startup files after clearing dues.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company reviews vendor status.</p>"
          }
        ],
        "seo": {
          "metaTitle": "MSME Return (MSME Form-1) | JR Compliance",
          "metaDescription": "Form MSME-1 is a half-yearly return filed with the Registrar of Companies under Section 405 of the Companies Act, 2013. A company that has outstanding…",
          "canonicalUrl": "/corporate/msme-return-msme-form-1",
          "keywords": "MSME Return (MSME Form-1), Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "roc-return",
      "matchSlugs": [
        "roc-return"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 89,
        "originalRow": 112,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "ROC Return",
        "menuLabel": "ROC Return",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "ROC returns are the annual filings a company makes with the Registrar of Companies: Form AOC-4 (financial statements) within 30 days of the AGM and Form MGT-7 (annual return; MGT-7A for small companies and OPCs) within 60 days of the AGM, along with ADT-1 for auditor appointment, DPT-3, MSME-1 and DIR-3 KYC as applicable. Delay attracts additional fees and, in prolonged cases, strike-off and director disqualification."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ROC Return?",
          "paragraphs": [
            {
              "text": "A ROC return is the set of statutory forms through which a company reports its financial position (AOC-4) and its members, directors, shareholding and other particulars (MGT-7 or MGT-7A) to the Registrar of Companies under Sections 92 and 137 of the Companies Act, 2013. Together with event-based forms they keep the company's public record current."
            },
            {
              "text": "AOC-4 includes the audited balance sheet, profit and loss statement, notes and the directors' report, and may require XBRL for certain companies. MGT-7 includes details of shareholders, directors, meetings and other matters. MGT-7A is the simplified annual return for small companies and OPCs; one source defines a small company as paid-up capital up to Rs 10 crore and turnover up to Rs 100 crore, which should be verified."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What are the deadlines?",
              "answer": "AOC-4 within 30 days and MGT-7 within 60 days of the AGM."
            },
            {
              "question": "Who can use MGT-7A?",
              "answer": "Small companies and OPCs."
            },
            {
              "question": "Do inactive companies file?",
              "answer": "Yes."
            },
            {
              "question": "What if I file late?",
              "answer": "Additional fees and penalties apply."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ROC Return",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>All private limited companies, public companies and OPCs need to file ROC returns every year. LLPs file Form 11 and Form 8 instead.</p>\n\n<p>Companies preparing for fundraising or due diligence should ensure their ROC record is up to date, because investors check filing history.</p>\n\n<p>Companies that missed filings in past years can regularise them with additional fees.</p>\n\n<p>If you are unsure whether you can use MGT-7A, we check eligibility.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Accurate AOC-4 and MGT-7/7A filing</li>\n<li>Required certifications arranged</li>\n<li>Deadlines tracked</li>\n<li>Reduced late fees and penalties</li>\n<li>Clean MCA record for investors</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, keep acknowledgements and prepare for the next cycle.</p>\n\n<p><strong>Related services:</strong> Annual Compliance, ROC Compliance, ADT-1 and Accounting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Filing before the AGM date is fixed.</li>\n<li>Filing MGT-7 when MGT-7A is allowed.</li>\n<li>Errors in financial data.</li>\n<li>Missing XBRL where needed.</li>\n<li>Ignoring late fee exposure.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Deadlines run from the AGM.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> hold the AGM early and complete the audit before 30 September.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Sections 92 and 137 of the Companies Act, 2013 require annual return and financial statement filing.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup files AOC-4 and MGT-7A.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company files late with extra fees.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company checks small company status.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ROC Return | JR Compliance",
          "metaDescription": "ROC returns are the annual filings a company makes with the Registrar of Companies: Form AOC-4 (financial statements) within 30 days of the AGM and Form MGT-7…",
          "canonicalUrl": "/corporate/roc-return",
          "keywords": "ROC Return, Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "professional-tax-registration",
      "matchSlugs": [
        "professional-tax-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 90,
        "originalRow": 113,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Professional Tax Registration",
        "menuLabel": "Professional Tax Registration",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "Professional tax is a state-level tax on employment, profession, trade or calling, authorised by Article 276 of the Constitution with a ceiling of Rs 2,500 per person per year. Employers register for a Professional Tax Registration Certificate (PTRC) to deduct it from salaries, and professionals or entities may need a Professional Tax Enrolment Certificate (PTEC). Registration is done on the state's commercial tax portal, and rules, slabs and return dates differ by state."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Professional Tax Registration?",
          "paragraphs": [
            {
              "text": "Professional Tax is a tax levied by state governments, and local bodies, on income from salary, profession, trade or employment. Each state has its own Act, such as the Maharashtra State Tax on Professions, Trades, Callings and Employments Act, 1975 and the Karnataka Tax on Professions Act, 1976. PTRC is the employer's registration to deduct and deposit PT on employees' pay, while PTEC is the enrolment of the person or business for its own PT."
            },
            {
              "text": "Not every state levies the tax. Sources count about 20 or 21 states and union territories including Maharashtra, Karnataka, West Bengal, Tamil Nadu, Telangana, Andhra Pradesh, Gujarat, Madhya Pradesh, Kerala, Assam and Odisha, while Delhi, Rajasthan, Uttar Pradesh, Haryana, Punjab and Uttarakhand do not levy it."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the maximum PT?",
              "answer": "Rs 2,500 per person per year, as capped by the Constitution."
            },
            {
              "question": "Do all states levy it?",
              "answer": "No; about 20 to 21 states and UTs do."
            },
            {
              "question": "What is PTRC?",
              "answer": "The employer's registration to deduct PT from employees."
            },
            {
              "question": "What is PTEC?",
              "answer": "Enrolment for the person's own PT."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Professional Tax Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Employers with salaried staff in PT-levying states, companies and firms with operations in those states, and self-employed professionals such as doctors, lawyers, CAs and consultants need Professional Tax registration.</p>\n\n<p>Businesses with offices in several states must register in each state where PT applies.</p>\n\n<p>Startups that hire their first employees should check whether the state levies PT.</p>\n\n<p>If you operate in a non-PT state, you may not need registration, but you should confirm the state rule.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Correct PTRC or PTEC registration per state</li>\n<li>Slab-wise deduction guidance</li>\n<li>Payment and return schedules set up</li>\n<li>Avoids interest and penalties</li>\n<li>Multi-state support</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, deduct and deposit PT as per the state schedule.</p>\n\n<p><strong>Related services:</strong> Shop &amp; Establishment Registration, EPF, ESIC and PF/ESI Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Assuming PT applies in every state.</li>\n<li>Missing registration within 30 days.</li>\n<li>Using wrong slabs.</li>\n<li>Not filing periodic returns.</li>\n<li>Ignoring multi-state obligations.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Registration typically takes a few days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> check slabs and due dates on your state's portal.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Article 276 of the Constitution allows states to levy taxes on professions, trades, callings and employments.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A company in Maharashtra registers PTRC.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A doctor obtains PTEC.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A firm with offices in two states registers in both.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Professional Tax Registration | JR Compliance",
          "metaDescription": "Professional tax is a state-level tax on employment, profession, trade or calling, authorised by Article 276 of the Constitution with a ceiling of Rs 2,500…",
          "canonicalUrl": "/corporate/professional-tax-registration",
          "keywords": "Professional Tax Registration, Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "income-tax-return-itr",
      "matchSlugs": [
        "income-tax-return-itr"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 91,
        "originalRow": 114,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Income Tax Return (ITR)",
        "menuLabel": "Income Tax Return (ITR)",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "An Income Tax Return (ITR) is filed annually on the Income Tax e-filing portal by individuals, firms, LLPs, companies and other taxpayers. The form depends on the taxpayer: ITR-1 and ITR-2 for individuals, ITR-3 and ITR-4 for business or professional income, ITR-5 for firms and LLPs, ITR-6 for companies and ITR-7 for those claiming Section 11 exemption. For AY 2026-27, sources give due dates of 31 July (ITR-1 and 2), 31 August (non-audit ITR-3 and 4) and 31 October (companies and audit cases). A belated return can be filed up to 31 December 2026 with a Section 234F fee and Section 234A interest."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Income Tax Return (ITR)?",
          "paragraphs": [
            {
              "text": "An income tax return is the statement of income, deductions and tax paid that a person furnishes to the Income Tax Department under Section 139 of the Income Tax Act, 1961 for an assessment year. It is used to compute the tax payable or refund, carry forward losses and serve as income proof for loans and visas. Filing in the wrong form can make the return defective under Section 139(9)."
            },
            {
              "text": "ITR-1 (Sahaj) is for resident individuals with income up to Rs 50 lakh, one house property and limited long-term capital gains. ITR-3 and ITR-4 are for business or professional income, with ITR-4 for presumptive taxation. ITR-5 is for partnership firms and LLPs, and ITR-6 for companies."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form is for companies?",
              "answer": "ITR-6."
            },
            {
              "question": "What is the late fee?",
              "answer": "Rs 1,000 or Rs 5,000 depending on income, plus interest."
            },
            {
              "question": "Until when can I file a belated return?",
              "answer": "Up to 31 December of the assessment year."
            },
            {
              "question": "Do I need to e-verify?",
              "answer": "Yes, to complete filing."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Income Tax Return (ITR)",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Individuals, HUFs, proprietors, partnership firms, LLPs and companies whose income exceeds the exemption limit need to file. People with losses to carry forward, foreign assets or refund claims should also file.</p>\n\n<p>Businesses and professionals should keep books and, where required, tax audit reports, before filing.</p>\n\n<p>Salaried individuals with simple income can use ITR-1, while those with capital gains or business income need other forms.</p>\n\n<p>If you missed the due date, a belated return can still be filed, with fees and interest.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Right ITR form and deadline for your category</li>\n<li>Accurate computation and deductions</li>\n<li>E-verification and refund tracking</li>\n<li>Support for audit cases and belated returns</li>\n<li>Notice response</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, track refunds and respond to notices.</p>\n\n<p><strong>Related services:</strong> TDS Return, GST Return, Accounting and PAN Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Choosing the wrong ITR form.</li>\n<li>Missing tax audit deadlines.</li>\n<li>Not reconciling AIS and Form 26AS.</li>\n<li>Forgetting e-verification.</li>\n<li>Ignoring notices.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Key dates include 31 July, 31 August and 31 October depending on the taxpayer.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> reconcile AIS and Form 26AS before filing.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 139 of the Income Tax Act requires returns, and Sections 234A and 234F provide interest and fee for delays.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A salaried person files ITR-1.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A freelancer files ITR-4.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A company files ITR-6 with audit.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Choosing and filing the correct ITR form is half the work of tax compliance. Match your income sources to the form: salary and limited other income for ITR-1, capital gains or multiple properties for ITR-2, business or profession for ITR-3 or ITR-4, firms and LLPs for ITR-5 and companies for ITR-6. Reconcile your return with AIS and Form 26AS, keep proof of deductions, and e-verify promptly. Audit cases have an earlier audit report deadline and a later return deadline, so plan the timeline backwards from 31 October.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Income Tax Return (ITR) | JR Compliance",
          "metaDescription": "An Income Tax Return (ITR) is filed annually on the Income Tax e-filing portal by individuals, firms, LLPs, companies and other taxpayers. The form depends on…",
          "canonicalUrl": "/corporate/income-tax-return-itr",
          "keywords": "Income Tax Return (ITR), Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "pan-registration-company",
      "matchSlugs": [
        "pan-registration-company"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 92,
        "originalRow": 115,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "PAN Registration (Company)",
        "menuLabel": "PAN Registration (Company)",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "For companies incorporated through the MCA (SPICe+), the PAN is allotted automatically at incorporation and appears on the Certificate of Incorporation. Entities not incorporated via MCA, such as trusts, societies, partnership firms and AOPs, apply for PAN separately through Protean (NSDL) or UTIITSL on the new PAN application form (Form 49A, replaced by Form 93 from 1 April 2026 per one source) with a fee of Rs 107 for an Indian address."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is PAN Registration (Company)?",
          "paragraphs": [
            {
              "text": "PAN (Permanent Account Number) is the 10-character alphanumeric identifier issued by the Income Tax Department to every taxpayer, including companies, firms, LLPs and trusts. It is needed for tax filing, TDS, bank accounts and high-value transactions. For a company, the PAN is allotted along with CIN and TAN when the Registrar issues the Certificate of Incorporation."
            },
            {
              "text": "Indian entities apply on Form 49A (or Form 93 under the newer rules), and foreign companies use Form 49AA (Form 95 under newer rules). The fee is Rs 107 for an Indian communication address and Rs 1,017 for a foreign address. One source says allotment takes about 7 to 15 working days."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Do companies need to apply for PAN?",
              "answer": "No, it is allotted at incorporation through SPICe+."
            },
            {
              "question": "What is the fee?",
              "answer": "Rs 107 for an Indian address; Rs 1,017 for a foreign address."
            },
            {
              "question": "Which form is used?",
              "answer": "Form 49A, or Form 93 under newer rules per one source."
            },
            {
              "question": "How long does it take?",
              "answer": "About 7 to 15 working days for physical applications."
            }
          ]
        },
        "extraContent": [
          {
            "title": "PAN Registration (Company)",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Newly incorporated companies and LLPs get PAN automatically. Trusts, societies, partnership firms, AOPs and other entities need to apply.</p>\n\n<p>Foreign companies and entities opening Indian bank accounts or filing returns need PAN too.</p>\n\n<p>If your entity's name or details have changed, a correction request is needed instead.</p>\n\n<p>If you are unsure whether PAN has been allotted, check the certificate or the Income Tax portal.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>PAN set up for your entity type</li>\n<li>Correct form and documents</li>\n<li>Fee paid and application tracked</li>\n<li>Smooth bank and tax onboarding</li>\n<li>Guidance on the form change</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After PAN, open bank accounts and register for GST and TDS.</p>\n\n<p><strong>Related services:</strong> PAN Registration (Individual), Change in PAN/TAN, GST Registration and TDS Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying again for a company that already has PAN.</li>\n<li>Using the wrong form category.</li>\n<li>Mismatching names across documents.</li>\n<li>Using an outdated form number.</li>\n<li>Not linking PAN with other records.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing takes days to weeks.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep the authorised signatory's ID and the registration certificate consistent.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 139A of the Income Tax Act provides for PAN, and Protean and UTIITSL process applications.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A new company gets PAN with its certificate.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A trust applies for PAN.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A partnership firm obtains PAN.</p>"
          }
        ],
        "seo": {
          "metaTitle": "PAN Registration (Company) | JR Compliance",
          "metaDescription": "For companies incorporated through the MCA (SPICe+), the PAN is allotted automatically at incorporation and appears on the Certificate of Incorporation…",
          "canonicalUrl": "/corporate/pan-registration-company",
          "keywords": "PAN Registration (Company), Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "pan-registration-individual",
      "matchSlugs": [
        "pan-registration-individual"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 93,
        "originalRow": 116,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "PAN Registration (Individual)",
        "menuLabel": "PAN Registration (Individual)",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "An individual can get a PAN instantly and free of cost as an e-PAN through the Income Tax e-filing portal if the person is an adult with a valid Aadhaar and an Aadhaar-linked mobile number. Otherwise the application is made through Protean (NSDL) or UTIITSL on Form 49A for Indian citizens or Form 49AA for foreign citizens, and newer sources mention Form 93 and 95 from 1 April 2026. The fee for a physical card to an Indian address is Rs 107, and Rs 1,017 for a foreign address."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is PAN Registration (Individual)?",
          "paragraphs": [
            {
              "text": "PAN for an individual is a unique 10-character identifier linked to the person's tax records, required for filing income tax returns, opening bank and demat accounts, paying or receiving large sums and for GST registration of a proprietor. An e-PAN is the digitally signed electronic version. PAN and Aadhaar must be linked."
            },
            {
              "text": "Instant e-PAN is available only to individuals aged 18 or more with a valid Aadhaar and an Aadhaar-linked mobile number. Minors can have a PAN through a representative assessee who signs the application. Indian citizens, NRIs and OCIs use Form 49A, while foreign citizens use Form 49AA."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Can I get PAN instantly?",
              "answer": "Yes, as e-PAN if you have Aadhaar with a linked mobile."
            },
            {
              "question": "What is the fee for a physical PAN?",
              "answer": "Rs 107 for an Indian address."
            },
            {
              "question": "Can a minor get PAN?",
              "answer": "Yes, through a representative."
            },
            {
              "question": "Are PAN and Aadhaar linked?",
              "answer": "They must be linked."
            }
          ]
        },
        "extraContent": [
          {
            "title": "PAN Registration (Individual)",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Salaried people, freelancers, proprietors, investors, students turning 18 and anyone who needs a PAN to file returns or transact financially need this service.</p>\n\n<p>NRIs and foreign citizens with Indian income also need PAN.</p>\n\n<p>If you already have a PAN, you should not apply again; use correction instead.</p>\n\n<p>If your Aadhaar mobile is not linked, you will need the regular route.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Instant e-PAN where eligible</li>\n<li>Correct form for citizens and foreign nationals</li>\n<li>Aadhaar linking guidance</li>\n<li>Documents prepared correctly</li>\n<li>Physical card delivery if needed</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After PAN, link it with Aadhaar and use it for returns.</p>\n\n<p><strong>Related services:</strong> Income Tax Return, GST Registration, Udyam registration and Sole Proprietorship.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying for a second PAN.</li>\n<li>Mismatched names with Aadhaar.</li>\n<li>Using the wrong form for foreign citizens.</li>\n<li>Not linking PAN with Aadhaar.</li>\n<li>Relying on unofficial sites.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Instant e-PAN is available quickly.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep your Aadhaar-linked mobile handy for OTP.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 139A of the Income Tax Act requires PAN for specified persons and transactions.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A student gets e-PAN at 18.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A freelancer obtains PAN for tax filing.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An NRI applies for a physical PAN.</p>"
          }
        ],
        "seo": {
          "metaTitle": "PAN Registration (Individual) | JR Compliance",
          "metaDescription": "An individual can get a PAN instantly and free of cost as an e-PAN through the Income Tax e-filing portal if the person is an adult with a valid Aadhaar and…",
          "canonicalUrl": "/corporate/pan-registration-individual",
          "keywords": "PAN Registration (Individual), Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "accounting",
      "matchSlugs": [
        "accounting"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 94,
        "originalRow": 117,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Accounting",
        "menuLabel": "Accounting",
        "sortOrder": 9,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "Accounting for a company in India means maintaining books of account and financial statements as required by Section 128 and Section 129 of the Companies Act, 2013. Books must be kept at the registered office on an accrual basis and under the double-entry system, preserved for at least eight financial years, and financial statements must follow Schedule III and the notified accounting standards before audit. Income Tax Act bookkeeping requirements apply in addition."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Accounting?",
          "paragraphs": [
            {
              "text": "Accounting, or bookkeeping, is the systematic recording, classification and summarising of a business's financial transactions so that financial statements give a true and fair view of its affairs. For companies, the Companies Act requires proper books of account covering sales, purchases, receipts, payments, assets, liabilities, branch records and, where notified, cost records."
            },
            {
              "text": "Books must be kept on the accrual basis with double-entry. They must be kept at the registered office or another place in India and be open to inspection by any director. The Board nominates a responsible person, such as the managing director, whole-time director, CFO or another officer, to ensure proper accounts. Electronic books must be backed up on servers physically located in India."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which basis is required for companies?",
              "answer": "Accrual basis with double-entry."
            },
            {
              "question": "How long must books be kept?",
              "answer": "At least eight financial years."
            },
            {
              "question": "Where must electronic books be backed up?",
              "answer": "On servers physically located in India."
            },
            {
              "question": "Who is responsible?",
              "answer": "The Board nominates a responsible person such as the MD, whole-time director or CFO."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Accounting",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every company, LLP and business that needs reliable books for tax filing, audit, funding and compliance needs accounting. Startups need clean accounts for investor due diligence.</p>\n\n<p>Businesses with multiple GST registrations or branches need structured accounting.</p>\n\n<p>Small businesses may start with simple systems but should maintain vouchers and reconciliation.</p>\n\n<p>If your books are behind, we can help catch up.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Accrual and double-entry books as required</li>\n<li>Vouchers, reconciliations and monthly accounts</li>\n<li>Schedule III financial statements</li>\n<li>Audit support</li>\n<li>Investor-ready records</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After accounting, file returns and prepare for audit.</p>\n\n<p><strong>Related services:</strong> GST Return, TDS Return, Income Tax Return, Annual Compliance and ROC Return.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Cash-basis books for companies.</li>\n<li>Missing vouchers.</li>\n<li>Not reconciling bank and GST.</li>\n<li>Mixing personal and company expenses.</li>\n<li>Not backing up records.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Monthly closing is recommended.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> reconcile bank and GST data monthly to reduce year-end work.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 128 of the Companies Act, 2013 requires books of account, and Section 129 requires financial statements to follow Schedule III.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup sets up bookkeeping.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company closes books for audit.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A business catches up on delayed accounts.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Accounting | JR Compliance",
          "metaDescription": "Accounting for a company in India means maintaining books of account and financial statements as required by Section 128 and Section 129 of the Companies Act…",
          "canonicalUrl": "/corporate/accounting",
          "keywords": "Accounting, Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "tax-accounting-page",
      "proposedSlug": "tax-exemption-under-80iac",
      "matchSlugs": [
        "tax-exemption-under-80iac"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 95,
        "originalRow": 118,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Tax Exemption Under 80IAC",
        "menuLabel": "Tax Exemption Under 80IAC",
        "sortOrder": 10,
        "hero": {
          "eyebrow": "Tax & Accounting",
          "description": "Section 80-IAC of the Income Tax Act, 1961 gives an eligible startup a 100% deduction of profits and gains from an eligible business for three consecutive assessment years chosen out of its first ten years from incorporation. The startup must be DPIIT-recognised and hold an eligibility certificate from the Inter-Ministerial Board of Certification (IMB), be incorporated on or after 1 April 2016 and before 1 April 2030 as extended, and have turnover not exceeding Rs 100 crore."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Tax Exemption Under 80IAC?",
          "paragraphs": [
            {
              "text": "The 80-IAC tax holiday is a deduction from taxable profits available to an eligible startup, a company or LLP engaged in an eligible business involving innovation, development or improvement of products or processes or a scalable business model with employment or wealth creation potential. DPIIT recognition alone does not entitle a startup to the deduction; a separate IMB certificate is mandatory."
            },
            {
              "text": "The deduction is 100% of profits for any three consecutive assessment years within the first ten years. The audit report in Form 10CCB must be furnished electronically one month before the due date of the return. The IMB certificate can be revoked if obtained on false information."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the deduction?",
              "answer": "100% of profits for three consecutive assessment years within the first ten."
            },
            {
              "question": "Who certifies?",
              "answer": "The Inter-Ministerial Board of Certification."
            },
            {
              "question": "What is the turnover limit?",
              "answer": "Rs 100 crore."
            },
            {
              "question": "Which entities qualify?",
              "answer": "Companies and LLPs."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Tax Exemption Under 80IAC",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>DPIIT-recognised startups, companies and LLPs, expecting profits in their first ten years that want a 100% income tax holiday for three years can use this scheme.</p>\n\n<p>Startups with losses in early years should plan which three years to choose.</p>\n\n<p>Founders should check turnover limits and the definition of eligible business.</p>\n\n<p>If your startup is not yet DPIIT-recognised, obtain recognition first.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Tax holiday for three consecutive years</li>\n<li>IMB application prepared properly</li>\n<li>Form 10CCB support</li>\n<li>Correct claim in the return</li>\n<li>Eligibility check</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the certificate, claim the deduction when profitable.</p>\n\n<p><strong>Related services:</strong> Startup India Registration, Income Tax Return and Accounting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Assuming DPIIT recognition is enough.</li>\n<li>Missing Form 10CCB.</li>\n<li>Choosing years without profits.</li>\n<li>Ignoring turnover limits.</li>\n<li>Applying with incomplete documents.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>IMB review takes weeks to months.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare accounts and returns for the last three years.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 80-IAC of the Income Tax Act supports startups through tax relief.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A profitable software startup applies for the IMB certificate.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A startup chooses its three tax-free years.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An LLP checks eligibility.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Tax Exemption Under 80IAC | JR Compliance",
          "metaDescription": "Section 80-IAC of the Income Tax Act, 1961 gives an eligible startup a 100% deduction of profits and gains from an eligible business for three consecutive…",
          "canonicalUrl": "/corporate/tax-exemption-under-80iac",
          "keywords": "Tax Exemption Under 80IAC, Tax & Accounting, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "labour-compliance-page",
      "proposedSlug": "shop-and-establishment-act-registration",
      "matchSlugs": [
        "shop-and-establishment-act-registration",
        "shop-and-establishment-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 96,
        "originalRow": 122,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Shop & Establishment Registration",
        "menuLabel": "Shop & Establishment Registration",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Labour Compliance",
          "description": "Registration under the state Shops and Establishments Act is mandatory for most commercial establishments, including shops, offices, hotels, restaurants, service providers and even many online or home-based businesses with employees. There is no single central law; each state has its own Act administered by its Labour Department, and registration is generally required within 30 days of starting operations, with some sources saying 30 to 60 days. Fees, validity and renewal differ by state."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Shop & Establishment Registration?",
          "paragraphs": [
            {
              "text": "The Shops and Establishments Act is state-level legislation, such as the Bombay Shops and Establishments Act, 1948, Delhi Shops and Establishments Act, 1954, Kerala Shops and Commercial Establishments Act, 1960, Karnataka Shops and Commercial Establishments Act, 1961 and Goa Shops and Establishments Act, 1973. It regulates working conditions in non-factory commercial establishments, covering working hours, weekly offs, leave, holidays, wages, employment of women and young persons, termination notice and registration."
            },
            {
              "text": "The Shop and Establishment licence, called a Shop Act licence or Gumasta in Maharashtra, is the certificate showing that the establishment is registered. The threshold for registration varies by state: some states require registration only from 10 employees, while others apply it from the first employee."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who issues the licence?",
              "answer": "The state Labour Department under the state Shops and Establishments Act."
            },
            {
              "question": "When must I register?",
              "answer": "Generally within 30 days of starting; some states allow up to 60 days."
            },
            {
              "question": "Is it the same as a trade licence?",
              "answer": "No, a trade licence is issued by the municipal body."
            },
            {
              "question": "Is it valid for life?",
              "answer": "Validity varies; some states give one year, some three, some lifetime."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Shop & Establishment Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Retail shops, offices, restaurants and cafes, hotels, IT and service companies, clinics, salons, gyms, warehouses with commercial activity, and startups with staff need registration. Online and home-based businesses that employ people may also be covered.</p>\n\n<p>Businesses with outlets in several states must register in each state.</p>\n\n<p>Employers that cross the employee threshold in their state need to register or update their registration.</p>\n\n<p>If your business is a pure sole proprietorship with no staff, check whether the state requires registration anyway, since many states apply it from the first employee or from the start of business.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Legal licence to operate commercial premises</li>\n<li>Correct state forms and fees</li>\n<li>Useful proof of business for banks and other registrations</li>\n<li>Renewal reminders</li>\n<li>Updates for employee and address changes</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, display the certificate and follow labour rules.</p>\n\n<p><strong>Related services:</strong> Trade License, EPF, ESIC, Professional Tax and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Assuming one state registration covers other states.</li>\n<li>Missing the 30-day window.</li>\n<li>Not updating employee counts.</li>\n<li>Not renewing in time.</li>\n<li>Ignoring leave and working hour rules.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Timelines depend on the state portal.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep PAN, address proof, rent agreement with NOC and employee list ready.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>State Shops and Establishments Acts protect employees in commercial establishments and require employers to register and follow working-hour and leave norms.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A cafe registers before opening.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>An IT startup registers its office.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A retailer updates employee numbers.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>Keep your Shop and Establishment certificate displayed and updated; it is one of the first documents inspectors and banks ask to see.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Shop & Establishment Registration | JR Compliance",
          "metaDescription": "Registration under the state Shops and Establishments Act is mandatory for most commercial establishments, including shops, offices, hotels, restaurants…",
          "canonicalUrl": "/corporate/shop-and-establishment-act-registration",
          "keywords": "Shop & Establishment Registration, Labour Compliance, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "labour-compliance-page",
      "proposedSlug": "esic-registration",
      "matchSlugs": [
        "esic-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 97,
        "originalRow": 123,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "extraContent",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "ESIC Registration",
        "menuLabel": "ESIC Registration",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Labour Compliance",
          "description": "ESIC registration under the Employees' State Insurance Act, 1948 is mandatory for non-seasonal factories and establishments with 10 or more employees (20 in some states) paying wages up to Rs 21,000 a month (Rs 25,000 for persons with disability). The employer registers within 15 days of the Act becoming applicable by filing Employer Registration Form 1 on the ESIC portal and paying the advance contribution; a 17-digit employer code and registration letter (C-11) are then issued. Contribution is 3.25% by the employer and 0.75% by the employee."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ESIC Registration?",
          "paragraphs": [
            {
              "text": "ESIC (Employees' State Insurance Corporation) is a statutory social security body under the Ministry of Labour that provides medical care and cash benefits, including sickness, maternity, disablement, dependants' benefit and funeral expenses, to covered employees. ESIC registration enrols the employer and gives it a unique employer code, and employees are then registered and receive Pehchan cards."
            },
            {
              "text": "Coverage applies to non-seasonal factories and establishments with more than 10 employees according to some sources, 10 or more according to others, and 20 in some states, paying wages up to Rs 21,000 per month. Employees with daily wages below Rs 176 do not contribute. Registration must be done within 15 days, and the clock starts once the headcount threshold is crossed."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the wage ceiling?",
              "answer": "Rs 21,000 per month (Rs 25,000 for persons with disability)."
            },
            {
              "question": "What is the contribution rate?",
              "answer": "3.25% by the employer and 0.75% by the employee."
            },
            {
              "question": "Within how many days must I register?",
              "answer": "15 days from the Act becoming applicable."
            },
            {
              "question": "Who needs it?",
              "answer": "Establishments with 10 or more employees (20 in some states)."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ESIC Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Employers such as factories, shops, hotels, restaurants, schools, medical institutions and private offices that cross the employee threshold and pay eligible wages need ESIC registration.</p>\n\n<p>Startups that grow beyond the threshold need to register when the headcount is reached.</p>\n\n<p>Employees earning above the wage ceiling are not covered.</p>\n\n<p>If your state has a higher threshold, confirm it before registering.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Health and cash benefits for covered employees</li>\n<li>Employer code and employee enrolment handled</li>\n<li>Advance contribution and contribution schedule set up</li>\n<li>Compliance with the ESI Act</li>\n<li>Avoids penalties</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, pay contributions monthly and file returns.</p>\n\n<p><strong>Related services:</strong> EPF Registration, PF/ESI Return, Shop &amp; Establishment Registration and Professional Tax.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Delaying registration after crossing the threshold.</li>\n<li>Not enrolling eligible employees.</li>\n<li>Missing monthly contributions.</li>\n<li>Using wrong wage ceilings.</li>\n<li>Ignoring state variations.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Registration must happen within 15 days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep the establishment certificate and wage register ready.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The ESI Act, 1948 provides social security through medical and cash benefits to employees in covered establishments.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A factory with 25 employees registers.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A growing shop crosses the threshold.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A school registers its staff.</p>\n\n<h2>Practical Guidance</h2>\n\n<p>ESIC coverage decisions depend on headcount and wage limits, and both change as the business grows. Review them every quarter. When a threshold is crossed, the registration clock starts, so do not wait for the annual review. Also check the contribution split: the employer pays 3.25% and the employee 0.75%, and employees with very low daily wages do not contribute. Good payroll data, with correct wage heads and attendance, makes monthly contributions and half-yearly returns straightforward.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ESIC Registration | JR Compliance",
          "metaDescription": "ESIC registration under the Employees' State Insurance Act, 1948 is mandatory for non-seasonal factories and establishments with 10 or more employees (20 in…",
          "canonicalUrl": "/corporate/esic-registration",
          "keywords": "ESIC Registration, Labour Compliance, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "labour-compliance-page",
      "proposedSlug": "epf-registration",
      "matchSlugs": [
        "epf-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 98,
        "originalRow": 124,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "EPF Registration",
        "menuLabel": "EPF Registration",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Labour Compliance",
          "description": "EPF registration enrols an establishment with the Employees' Provident Fund Organisation (EPFO) under the Employees' Provident Funds and Miscellaneous Provisions Act, 1952, and sources also refer to the Code on Social Security, 2020. It is mandatory for establishments with 20 or more employees and is done online through the Unified Shram Suvidha Portal using a Class 3 DSC. EPFO then issues an establishment code and UANs for employees. Voluntary registration is allowed for smaller establishments."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is EPF Registration?",
          "paragraphs": [
            {
              "text": "The Employees' Provident Fund is a retirement savings scheme administered by EPFO in which employer and employee each contribute 12% of basic wages plus dearness allowance. Of the employer's 12%, 8.33% goes to the Employees' Pension Scheme (subject to the wage ceiling) and 3.67% to EPF, and employers also pay administration and EDLI charges, about 0.5% each per one source. Each member gets a 12-digit UAN, and the establishment gets a PF Establishment Code."
            },
            {
              "text": "Registration is mandatory at 20 or more employees, within about 30 days of reaching that number per one source, and coverage continues even if headcount falls below 20. The wage ceiling for mandatory contribution is Rs 15,000 per month. Damages of 5 to 25 percent can apply for non-registration or delay under Section 14B."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is EPF mandatory?",
              "answer": "When an establishment has 20 or more employees."
            },
            {
              "question": "What are the contribution rates?",
              "answer": "12% by employee and 12% by employer, as per sources."
            },
            {
              "question": "Is a DSC needed?",
              "answer": "Yes, a Class 3 DSC for the authorised signatory."
            },
            {
              "question": "Can smaller employers register?",
              "answer": "Yes, voluntarily."
            }
          ]
        },
        "extraContent": [
          {
            "title": "EPF Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Employers with 20 or more employees, such as startups, IT firms, factories and shops, need EPF registration. Smaller employers can register voluntarily to offer PF benefits and attract talent.</p>\n\n<p>Companies that have crossed 20 employees should register without delay.</p>\n\n<p>Employees benefit from retirement savings, pension and insurance cover.</p>\n\n<p>If you hire contract workers, check whether the principal employer or contractor must register.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Retirement benefits that help attract and retain staff</li>\n<li>Portal registration and DSC set up</li>\n<li>UANs generated for employees</li>\n<li>Monthly ECR process set up</li>\n<li>Compliance with EPFO rules</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, file monthly ECRs and deposit contributions.</p>\n\n<p><strong>Related services:</strong> PF/ESI Return, ESIC Registration, DSC and Shop &amp; Establishment Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Delaying registration after crossing 20 employees.</li>\n<li>Not linking Aadhaar and UAN.</li>\n<li>Missing monthly ECR filing.</li>\n<li>Using wrong wage ceilings.</li>\n<li>Ignoring damages and interest.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Code allotment takes a few days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> obtain the DSC first.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The EPF &amp; MP Act, 1952 provides for provident fund, pension and insurance schemes for employees.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A startup with 22 employees registers.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A small firm registers voluntarily.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A factory generates UANs.</p>"
          }
        ],
        "seo": {
          "metaTitle": "EPF Registration | JR Compliance",
          "metaDescription": "EPF registration enrols an establishment with the Employees' Provident Fund Organisation (EPFO) under the Employees' Provident Funds and Miscellaneous…",
          "canonicalUrl": "/corporate/epf-registration",
          "keywords": "EPF Registration, Labour Compliance, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "labour-compliance-page",
      "proposedSlug": "pf-esi-return",
      "matchSlugs": [
        "pf-esi-return"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 99,
        "originalRow": 125,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "PF/ESI Return",
        "menuLabel": "PF/ESI Return",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Labour Compliance",
          "description": "PF and ESI returns are monthly and half-yearly filings by employers registered with EPFO and ESIC. PF contributions and the Electronic Challan-cum-Return (ECR) are filed together on the EPFO portal by the 15th of the following month. ESI contributions are deposited by the 15th, though one source says the 21st, with a half-yearly ESI return (Form 5) due by 11 or 12 November and 11 or 12 May. Late PF payment attracts 12% annual interest plus damages."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is PF/ESI Return?",
          "paragraphs": [
            {
              "text": "A PF return is the monthly Electronic Challan-cum-Return (ECR) that lists each member's wages and the employer and employee contributions deposited with EPFO. An ESI return is the periodic statement of contributions deposited for insured employees, with contributions paid monthly and the formal return (Form 5) filed half-yearly. Together they prove statutory social-security compliance."
            },
            {
              "text": "Sources differ on key points: the ESI due date (15th or 21st), half-yearly dates (11th or 12th), PF annual return date (30 April, 25 April or 31 May) and damages (5 to 25 percent vs up to 100 percent). Interest at 12% per annum applies to late PF payments under Section 7Q, and Income Tax disallows PF and ESI paid after the due date."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is PF due?",
              "answer": "By the 15th of the following month."
            },
            {
              "question": "Is there a PF half-yearly return?",
              "answer": "No separate half-yearly return is needed for PF."
            },
            {
              "question": "What is the interest on late PF?",
              "answer": "12% per annum."
            },
            {
              "question": "What is Form 5?",
              "answer": "The half-yearly ESI return."
            }
          ]
        },
        "extraContent": [
          {
            "title": "PF/ESI Return",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Every employer registered with EPFO and ESIC, especially startups and SMEs that run monthly payroll, needs this service.</p>\n\n<p>Companies with fluctuating headcount should maintain accurate records.</p>\n\n<p>Businesses that missed filings should regularise them to reduce interest and damages.</p>\n\n<p>If you outsource payroll, check that returns are filed on time.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Accurate monthly ECR and ESI filings</li>\n<li>UAN and Aadhaar linkage handled</li>\n<li>Interest and damages avoided</li>\n<li>Tax deduction protected</li>\n<li>Notices handled</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After filing, keep challans and reconcile.</p>\n\n<p><strong>Related services:</strong> EPF, ESIC, Accounting and Professional Tax.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Missing the 15th deadline.</li>\n<li>Unlinked UANs.</li>\n<li>Wrong wage data.</li>\n<li>Ignoring Form 5.</li>\n<li>Paying after the due date and losing tax deduction.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Monthly deadlines fall around the 15th.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> run payroll early.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 7Q and 14B of the EPF Act provide interest and damages for delay.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A company files ECR monthly.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A firm files Form 5 in November.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A business corrects a rejected ECR.</p>"
          }
        ],
        "seo": {
          "metaTitle": "PF/ESI Return | JR Compliance",
          "metaDescription": "PF and ESI returns are monthly and half-yearly filings by employers registered with EPFO and ESIC. PF contributions and the Electronic Challan-cum-Return…",
          "canonicalUrl": "/corporate/pf-esi-return",
          "keywords": "PF/ESI Return, Labour Compliance, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fund-raising-page",
      "proposedSlug": "msme-registration",
      "matchSlugs": [
        "msme-registration",
        "msme"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 100,
        "originalRow": 129,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "MSME",
        "menuLabel": "MSME",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Fund Raising",
          "description": "MSME (Udyam) registration recognises a business as a Micro, Small or Medium Enterprise under the MSMED Act, 2006. It is free, fully online and paperless on udyamregistration.gov.in, based on self-declaration with Aadhaar and PAN. Investment and turnover data are fetched automatically from PAN and GST databases, and the Udyam Registration Certificate with a 19-digit number is generated immediately. Revised classification limits apply from 1 April 2025."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is MSME?",
          "paragraphs": [
            {
              "text": "An MSME is an enterprise classified by investment in plant and machinery or equipment and annual turnover. Under the revised criteria effective 1 April 2025, a micro enterprise has investment up to Rs 2.5 crore and turnover up to Rs 10 crore; a small enterprise up to Rs 25 crore and Rs 100 crore; and a medium enterprise up to Rs 125 crore and Rs 500 crore."
            },
            {
              "text": "Udyam Registration replaced the earlier Udyog Aadhaar memorandum and gives access to government schemes, credit facilities, tender benefits, delayed-payment protection and TReDS invoice financing. The classification depends on both parameters, and the higher category applies if either limit is crossed. No enterprise can file more than one Udyam registration. Informal micro enterprises without PAN or GST can register through the Udyam Assist Platform."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is Udyam registration free?",
              "answer": "Yes, no government fee."
            },
            {
              "question": "What documents are needed?",
              "answer": "Aadhaar and PAN; no uploads."
            },
            {
              "question": "How fast is the certificate?",
              "answer": "Generated instantly after submission."
            },
            {
              "question": "What are the micro limits?",
              "answer": "Investment up to Rs 2.5 crore and turnover up to Rs 10 crore from April 2025."
            }
          ]
        },
        "extraContent": [
          {
            "title": "MSME",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Manufacturers, traders and service providers, whether micro, small or medium, who want government schemes, bank loans, tender preference, delayed-payment protection and subsidies need Udyam registration.</p>\n\n<p>It is also a prerequisite for NSIC registration and several fund-raising schemes.</p>\n\n<p>Freelancers and small businesses without GST can use the Udyam Assist route.</p>\n\n<p>If you are a startup, combine Udyam with DPIIT recognition for more benefits.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Free registration with instant certificate</li>\n<li>Access to MSME schemes and credit</li>\n<li>Correct classification and data</li>\n<li>Linking with GST, NSIC and GeM</li>\n<li>Delayed-payment protection</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After registration, update details annually.</p>\n\n<p><strong>Related services:</strong> NSIC Registration, GeM Registration, GST Registration and Startup India Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Using old classification limits.</li>\n<li>Registering through unofficial sites that charge fees.</li>\n<li>Mismatched PAN and GST data.</li>\n<li>Registering more than once.</li>\n<li>Not updating turnover.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>The certificate is usually immediate.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> use only udyamregistration.gov.in.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>The MSMED Act, 2006 defines MSMEs and provides benefits such as delayed-payment protection.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A small manufacturer registers for loans.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A trader registers for tenders.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A freelancer uses Udyam Assist.</p>"
          }
        ],
        "seo": {
          "metaTitle": "MSME | JR Compliance",
          "metaDescription": "MSME (Udyam) registration recognises a business as a Micro, Small or Medium Enterprise under the MSMED Act, 2006. It is free, fully online and paperless on…",
          "canonicalUrl": "/corporate/msme-registration",
          "keywords": "MSME, Fund Raising, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fund-raising-page",
      "proposedSlug": "startup-india-registration",
      "matchSlugs": [
        "startup-india-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 101,
        "originalRow": 130,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Startup India Registration",
        "menuLabel": "Startup India Registration",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Fund Raising",
          "description": "Startup India registration means obtaining DPIIT recognition as a startup on the Startup India portal. Recognition is free, 100% online and unlocks benefits such as the Section 80-IAC tax holiday (with a separate IMB certificate), angel tax exemption, easier public procurement, Fund of Funds access and self-certified compliances. Sources quote one to seven working days for the certificate once the application is complete."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Startup India Registration?",
          "paragraphs": [
            {
              "text": "DPIIT recognition is the official startup status granted by the Department for Promotion of Industry and Internal Trade under the Startup India initiative to eligible, innovative, scalable entities. It is separate from incorporation, so the entity must be registered first as a company, LLP or partnership, and then apply for recognition."
            },
            {
              "text": "The entity must be less than 10 years old (up to 20 years for deep tech per one source), with annual turnover not exceeding Rs 100 crore in any financial year, working on innovation or a scalable business model, and not formed by splitting up or reconstructing an existing business. Most sources include private limited companies, LLPs and registered partnership firms, while a few say only companies and LLPs."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is DPIIT recognition free?",
              "answer": "Yes."
            },
            {
              "question": "What is the age limit?",
              "answer": "Less than 10 years (deep tech up to 20 per one source)."
            },
            {
              "question": "What is the turnover limit?",
              "answer": "Rs 100 crore."
            },
            {
              "question": "Does it give tax exemption?",
              "answer": "No, 80-IAC needs a separate IMB certificate."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Startup India Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Early-stage innovative startups, whether private limited, LLP or partnership, seeking tax benefits, government funding, IP fee rebates, tender relaxations and investor credibility need DPIIT recognition.</p>\n\n<p>Founders planning to apply for SISFS or Fund of Funds benefits must have recognition.</p>\n\n<p>Mature companies beyond the age or turnover limit may not qualify.</p>\n\n<p>If you are unsure about innovation criteria, we review your business description.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Official startup status</li>\n<li>Pathway to tax, funding and compliance benefits</li>\n<li>Documents and innovation note prepared</li>\n<li>Fast online process</li>\n<li>Guidance on follow-up benefits</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After recognition, apply for tax and funding benefits.</p>\n\n<p><strong>Related services:</strong> Tax Exemption Under 80IAC, Seed Funding, Pitch Deck and GeM Registration.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying before incorporation.</li>\n<li>Weak innovation description.</li>\n<li>Assuming recognition gives tax exemption.</li>\n<li>Exceeding limits.</li>\n<li>Using the founder's PAN instead of the entity's.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Recognition can take one to seven working days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> write a clear note on innovation and scalability.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>DPIIT recognition is part of the Startup India initiative to promote entrepreneurship.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A tech startup gets recognised before applying for SISFS.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A founder prepares for an 80-IAC application.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A startup uses recognition for tenders.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Startup India Registration | JR Compliance",
          "metaDescription": "Startup India registration means obtaining DPIIT recognition as a startup on the Startup India portal. Recognition is free, 100% online and unlocks benefits…",
          "canonicalUrl": "/corporate/startup-india-registration",
          "keywords": "Startup India Registration, Fund Raising, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fund-raising-page",
      "proposedSlug": "seed-funding",
      "matchSlugs": [
        "seed-funding"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 102,
        "originalRow": 131,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Seed Funding",
        "menuLabel": "Seed Funding",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Fund Raising",
          "description": "The Startup India Seed Fund Scheme (SISFS), launched by DPIIT with an outlay of Rs 945 crore, gives seed support to early-stage startups through DPIIT-selected incubators: up to Rs 20 lakh as a grant for proof of concept, prototype and product trials, and up to Rs 50 lakh through convertible debentures or debt-linked instruments for market entry and scaling. Startups apply online on the Startup India portal and can choose up to three incubators."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Seed Funding?",
          "paragraphs": [
            {
              "text": "Seed funding is the earliest stage of external financing for a startup, used to validate an idea and reach a prototype or first customers. Under SISFS, the Government funds eligible incubators, which disburse the seed support to startups. The grant is paid in milestone-based instalments, and seed money cannot be used to create facilities."
            },
            {
              "text": "Eligibility includes DPIIT recognition, incorporation not more than two years before application, not more than Rs 10 lakh of monetary support from other central or state government schemes, use of technology in the core product or model, and scope to scale. One incubator says Indian promoters must hold at least 51% shareholding at application. A startup can obtain grant and convertible debt support only once each, and can reapply after three months if rejected."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How much can a startup get?",
              "answer": "Up to Rs 20 lakh grant and up to Rs 50 lakh in convertible debt or debentures."
            },
            {
              "question": "Who disburses the money?",
              "answer": "DPIIT-selected incubators."
            },
            {
              "question": "Is DPIIT recognition needed?",
              "answer": "Yes."
            },
            {
              "question": "How many incubators can I choose?",
              "answer": "Up to three."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Seed Funding",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Pre-revenue and early-revenue tech-enabled startups needing money for proof of concept, prototypes, product trials or first commercialisation can use this scheme.</p>\n\n<p>Startups older than two years or those that received large government grants are not eligible.</p>\n\n<p>Founders should check incubator focus areas before applying.</p>\n\n<p>Application windows should be checked on the Startup India portal.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Access to grants up to Rs 20 lakh and convertible instruments up to Rs 50 lakh</li>\n<li>Business plan and fund use plan prepared</li>\n<li>Incubator shortlisting support</li>\n<li>Pitch preparation</li>\n<li>Eligibility check</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After selection, follow milestones and report utilisation.</p>\n\n<p><strong>Related services:</strong> Startup India Registration, Pitch Deck, Increase of Authorised Capital and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying beyond two years of incorporation.</li>\n<li>Weak business plan.</li>\n<li>Ignoring incubator focus.</li>\n<li>Misusing funds for facilities.</li>\n<li>Missing reporting.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Selection depends on incubator committees.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> check open windows on the Startup India portal.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>SISFS supports early-stage startups through incubators with milestone-based funding.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A deep-tech startup applies to three incubators.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A founder prepares a milestone plan.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A startup converts debt support to equity later.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Seed Funding | JR Compliance",
          "metaDescription": "The Startup India Seed Fund Scheme (SISFS), launched by DPIIT with an outlay of Rs 945 crore, gives seed support to early-stage startups through…",
          "canonicalUrl": "/corporate/seed-funding",
          "keywords": "Seed Funding, Fund Raising, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fund-raising-page",
      "proposedSlug": "pitch-deck",
      "matchSlugs": [
        "pitch-deck"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 103,
        "originalRow": 132,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "extraContent",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Pitch Deck",
        "menuLabel": "Pitch Deck",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Fund Raising",
          "description": "A pitch deck is a short presentation, usually 10 to 15 slides, that startups use to communicate the opportunity, traction and funding ask to investors. Indian sources suggest a 10 to 12 slide structure covering problem, solution, market size, business model, traction, team, financials and the ask, often with competition, go-to-market and use of funds. There is no government form or licence for it; it is a business document."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Pitch Deck?",
          "paragraphs": [
            {
              "text": "A pitch deck is a concise, investor-facing presentation that tells the story of a startup: the customer problem, the product solution, how big the market is, how the business makes money, evidence that it works (traction), why the team can execute, key financials and how much money is being raised and for what. It is designed to win the next meeting, not to explain everything."
            },
            {
              "text": "Seed decks are typically 10 to 12 slides, while Series A decks run up to about 15, with a longer appendix for diligence. Indian investor guidance mentions bottom-up market sizing, evidence-based traction, clear unit economics, an ask tied to milestones and a full-time founding team. Common mistakes include too many slides or text, top-down market maths, unclear revenue paths, unrealistic financials and asks without milestones."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many slides?",
              "answer": "Seed decks typically 10 to 12; Series A up to about 15."
            },
            {
              "question": "Should it include financials?",
              "answer": "Yes, with assumptions."
            },
            {
              "question": "What format?",
              "answer": "A PDF, often under about 8 MB."
            },
            {
              "question": "Is there an official format?",
              "answer": "No, it is a business document."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Pitch Deck",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Founders raising angel, seed or Series A funding, applying to accelerators or incubators (including SISFS), or approaching strategic investors need a pitch deck.</p>\n\n<p>First-time founders benefit from structure and feedback.</p>\n\n<p>Startups with strong traction should show it clearly.</p>\n\n<p>If you are applying to many investors, a tailored intro email matters as much as the deck.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Clear investor story</li>\n<li>Traction and unit economics framed well</li>\n<li>Clean design and structure</li>\n<li>Appendix for diligence</li>\n<li>Rehearsal support</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the deck, approach investors and refine.</p>\n\n<p><strong>Related services:</strong> Seed Funding, Startup India Registration, Increase of Authorised Capital and Legal Agreement drafting.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Too many slides.</li>\n<li>Top-down market sizing.</li>\n<li>No traction data.</li>\n<li>Unrealistic financials.</li>\n<li>Ask without milestones.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Preparation takes days to weeks.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> lead with traction and the ask.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>There is no regulation; best practice from investors guides structure.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A seed-stage startup builds a 12-slide deck.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A Series A company adds appendix.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A founder prepares an accelerator pitch.</p>\n\n<h2>Process &amp; Planning</h2>\n\n<p>A strong pitch deck is built in layers. First, write the one-sentence story: who has the problem, how you solve it and why now. Second, collect proof: customer numbers, revenue or pilots, retention and any independent validation. Third, build the market view bottom-up by counting customers you can realistically reach and multiplying by price. Fourth, explain the business model and unit economics, showing what you earn on each customer after acquisition cost. Fifth, introduce the team and why it can execute, and finish with the ask, stating how much you are raising and which milestones the money will fund.</p>\n\n<p><strong>Planning checklist:</strong> keep the main deck to about 10 to 12 slides for seed, move detailed financials to an appendix, test the deck with two or three mentors, prepare a short email intro, send it as a PDF and keep a data room ready for diligence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Pitch Deck | JR Compliance",
          "metaDescription": "A pitch deck is a short presentation, usually 10 to 15 slides, that startups use to communicate the opportunity, traction and funding ask to investors. Indian…",
          "canonicalUrl": "/corporate/pitch-deck",
          "keywords": "Pitch Deck, Fund Raising, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fund-raising-page",
      "proposedSlug": "csr",
      "matchSlugs": [
        "csr"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 104,
        "originalRow": 133,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "CSR",
        "menuLabel": "CSR",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Fund Raising",
          "description": "CSR (Corporate Social Responsibility) under Section 135 of the Companies Act, 2013 requires companies with net worth of Rs 500 crore or more, turnover of Rs 1,000 crore or more, or net profit of Rs 5 crore or more in the preceding financial year to spend at least 2% of their average net profit of the last three years on Schedule VII activities. For NGOs and implementing agencies, CSR funding is accessed by registering on MCA via Form CSR-1 to obtain a CSR Registration Number and holding 12A and 80G approval."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is CSR?",
          "paragraphs": [
            {
              "text": "CSR is the statutory obligation of eligible companies to contribute to social development under Section 135, the Companies (CSR Policy) Rules, 2014 (amended 2021) and Schedule VII. Net profit is calculated as per Section 198. Companies must constitute a CSR Committee, adopt a CSR policy and annual action plan, and can spend directly or through eligible implementing agencies such as trusts, societies and Section 8 companies."
            },
            {
              "text": "Unspent amounts must be moved to an unspent CSR account for ongoing projects within 30 days or to a Schedule VII fund within six months for non-ongoing amounts. Companies with average CSR obligation of Rs 10 crore or more must do impact assessment of larger projects."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which companies must spend on CSR?",
              "answer": "Those meeting net worth, turnover or net profit thresholds."
            },
            {
              "question": "What is the spend?",
              "answer": "At least 2% of average net profit of the last three years."
            },
            {
              "question": "What is CSR-1?",
              "answer": "Registration of implementing agencies on MCA."
            },
            {
              "question": "What happens to unspent funds?",
              "answer": "Moved to an unspent CSR account or Schedule VII fund."
            }
          ]
        },
        "extraContent": [
          {
            "title": "CSR",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>Large companies subject to Section 135, and NGOs, trusts, societies and Section 8 companies seeking corporate funding need this service.</p>\n\n<p>NGOs should prepare strong proposals and compliance documents.</p>\n\n<p>Companies need policies, committees and reporting.</p>\n\n<p>If you are an NGO without 12A and 80G, obtain them first.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>CSR-1 registration and CRN</li>\n<li>Schedule VII project mapping</li>\n<li>12A, 80G and NGO Darpan guidance</li>\n<li>Policy and reporting support for companies</li>\n<li>Funding pathway</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After CSR-1, approach companies with proposals.</p>\n\n<p><strong>Related services:</strong> NGO Registration, Section 8 Company, NGO Darpan and FCRA.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying for CSR-1 without 12A and 80G.</li>\n<li>Weak project proposals.</li>\n<li>Misaligned Schedule VII categories.</li>\n<li>Missing impact assessment.</li>\n<li>Ignoring reporting.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>CSR-1 is filed online.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare past three years of activity and audited accounts.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>Section 135 of the Companies Act, 2013 institutionalises CSR spending.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>An NGO registers CSR-1.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A company sets up its CSR Committee.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>A trust applies for CSR funds.</p>"
          }
        ],
        "seo": {
          "metaTitle": "CSR | JR Compliance",
          "metaDescription": "CSR (Corporate Social Responsibility) under Section 135 of the Companies Act, 2013 requires companies with net worth of Rs 500 crore or more, turnover of Rs…",
          "canonicalUrl": "/corporate/csr",
          "keywords": "CSR, Fund Raising, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fund-raising-page",
      "proposedSlug": "niti-ayog",
      "matchSlugs": [
        "niti-ayog"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 105,
        "originalRow": 134,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "extraContent",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "NITI AYOG",
        "menuLabel": "NITI AYOG",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "Fund Raising",
          "description": "The NITI Aayog service listed here is NGO Darpan (ngodarpan.gov.in), the NITI Aayog and NIC portal where NGOs, trusts, societies and Section 8 companies register to get a Unique Darpan ID. Registration is free and online, verification by NITI Aayog is said to take about 15 to 30 working days, and the ID is needed for many central government grants, CSR listings and FCRA applications."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is NITI AYOG?",
          "paragraphs": [
            {
              "text": "NGO Darpan, meaning 'mirror of NGOs', is an official online platform managed by NITI Aayog and the National Informatics Centre for voluntary organisations. It maintains a central database of non-profits so government departments and donors can verify them. The Unique ID is the NGO's government identity for grants and schemes and is separate from legal registration."
            },
            {
              "text": "Required documents include the NGO's PAN, registration certificate, and details of at least three office bearers with PAN and Aadhaar, though one source says only Aadhaar is accepted. A unique mobile number and email for the organisation are also needed."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is NGO Darpan free?",
              "answer": "Yes."
            },
            {
              "question": "What documents are needed?",
              "answer": "PAN, registration certificate and details of three office bearers."
            },
            {
              "question": "How long is verification?",
              "answer": "About 15 to 30 working days."
            },
            {
              "question": "Is it needed for FCRA?",
              "answer": "It is commonly needed for grants and FCRA applications."
            }
          ]
        },
        "extraContent": [
          {
            "title": "NITI AYOG",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>NGOs, trusts, societies and Section 8 companies seeking government grants, CSR funding or FCRA registration need NGO Darpan.</p>\n\n<p>Newly registered NGOs should register early.</p>\n\n<p>Organisations with changed office bearers should update.</p>\n\n<p>If your PAN name differs from the registration certificate, fix it first.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Unique ID for grants and CSR</li>\n<li>Documents verified before filing</li>\n<li>Free government portal</li>\n<li>Profile built well</li>\n<li>Follow-up support</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After the ID, apply for grants, CSR and FCRA.</p>\n\n<p><strong>Related services:</strong> NGO Registration, CSR, FCRA Registration and Section 8 Company.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Name mismatches between PAN and certificate.</li>\n<li>Missing office bearer details.</li>\n<li>Using a shared mobile or email.</li>\n<li>Not updating changes.</li>\n<li>Expecting grants automatically.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Verification can take weeks.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> keep consistent names across documents.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>NGO Darpan helps government verify and engage with voluntary organisations.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>A new trust registers for the ID.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A society updates office bearers.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An NGO uses the ID for grants.</p>\n\n<h2>Process &amp; Planning</h2>\n\n<p>NGO Darpan registration is a data-entry exercise that rewards preparation. Gather the NGO's PAN (the name must match the registration certificate), the trust deed, society certificate or Section 8 incorporation certificate, the registered address and details of at least three office bearers with their PAN or Aadhaar. Create the account with a unique mobile number and email, verify by OTP, complete the profile covering sectors of work, bank details and FCRA status if any, upload documents and submit. NITI Aayog verifies the profile, which one source says takes about 15 to 30 working days, after which the Unique ID is generated.</p>\n\n<p><strong>Planning checklist:</strong> fix name mismatches first, update office bearers when they change, keep the ID handy for grants, CSR-1 and FCRA applications and revisit the profile each year.</p>"
          }
        ],
        "seo": {
          "metaTitle": "NITI AYOG | JR Compliance",
          "metaDescription": "The NITI Aayog service listed here is NGO Darpan (ngodarpan.gov.in), the NITI Aayog and NIC portal where NGOs, trusts, societies and Section 8 companies…",
          "canonicalUrl": "/corporate/niti-ayog",
          "keywords": "NITI AYOG, Fund Raising, JR Compliance"
        }
      }
    },
    {
      "collectionKey": "fund-raising-page",
      "proposedSlug": "fcra-registration",
      "matchSlugs": [
        "fcra-registration"
      ],
      "source": {
        "sheet": "Corporate",
        "numbersTableRow": 106,
        "originalRow": 135,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "extraContent",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "extraContent",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "extraContent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "extraContent",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Timeline, Costs & Practical Tips",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "extraContent",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Practical Scenarios",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "FCRA Registration",
        "menuLabel": "FCRA Registration",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "Fund Raising",
          "description": "FCRA registration from the Ministry of Home Affairs under the Foreign Contribution (Regulation) Act, 2010 is mandatory for NGOs, trusts, societies and Section 8 companies to receive foreign contributions. The application is filed online (Form FC-3A or FC-3 for registration, FC-3B for prior permission) on the MHA FCRA portal, and the organisation must have a designated FCRA account at SBI New Delhi Main Branch. Registration is valid for five years and renewed on Form FC-3C, with annual returns in Form FC-4."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is FCRA Registration?",
          "paragraphs": [
            {
              "text": "The Foreign Contribution (Regulation) Act, 2010 regulates acceptance and use of foreign donations to ensure they do not harm national interest. FCRA registration is the certificate allowing an association to accept foreign contributions after satisfying eligibility conditions, while prior permission allows receiving a specific contribution from a specific donor for a specific purpose."
            },
            {
              "text": "Eligibility includes being a society, trust or Section 8 company, normally existing for at least three years, with spending of about Rs 15 lakh on core activities in the last three years (sources quote Rs 10 to 15 lakh). Fees quoted conflict: Rs 10,000 for registration and Rs 5,000 for prior permission per several sources, versus Rs 5,000 for registration per one source. Processing time is quoted as 90 to 120 working days."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long is FCRA registration valid?",
              "answer": "Five years."
            },
            {
              "question": "Which account is needed?",
              "answer": "The designated FCRA account at SBI New Delhi Main Branch."
            },
            {
              "question": "What is prior permission?",
              "answer": "Permission for a specific contribution from a specific donor."
            },
            {
              "question": "What are the fees?",
              "answer": "Sources conflict; confirm with MHA."
            }
          ]
        },
        "extraContent": [
          {
            "title": "FCRA Registration",
            "description": "<h2>Who Needs This Service</h2>\n\n<p>NGOs, trusts, societies, research institutions and Section 8 companies that receive or plan to receive foreign donations need FCRA.</p>\n\n<p>New NGOs without three years can seek prior permission for specific donors.</p>\n\n<p>NGOs should also keep annual returns and account records.</p>\n\n<p>If you are unsure about eligibility, check spending and history.</p>\n\n<h2>Key Benefits</h2>\n\n<ul>\n<li>Compliant foreign funding</li>\n<li>Designated account and documents prepared</li>\n<li>Eligibility and spending checks</li>\n<li>MHA queries handled</li>\n<li>Annual return support</li>\n</ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n\n<p>After FCRA, use only the designated account.</p>\n\n<p><strong>Related services:</strong> NGO Registration, NGO Darpan, Section 8 Company and Annual Compliance.</p>\n\n<h2>Common Mistakes</h2>\n\n<ul>\n<li>Applying without meeting history and spending criteria.</li>\n<li>Not using the designated account.</li>\n<li>Missing FC-4 returns.</li>\n<li>Ignoring change reporting.</li>\n<li>Relying on uncertain fee information.</li>\n</ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n\n<p>Processing is quoted at 90 to 120 working days.</p>\n\n<blockquote>\n<p><strong>Practical tip:</strong> prepare audited accounts and activity reports early.</p>\n</blockquote>\n\n<h2>Additional Information</h2>\n\n<p>FCRA, 2010 controls foreign contributions and imposes strict compliance.</p>\n\n<h2>Practical Scenarios</h2>\n\n<h3>Scenario 1:</h3>\n\n<p>An NGO with three years of work applies.</p>\n\n<h3>Scenario 2:</h3>\n\n<p>A new NGO seeks prior permission.</p>\n\n<h3>Scenario 3:</h3>\n\n<p>An NGO files FC-4.</p>"
          }
        ],
        "seo": {
          "metaTitle": "FCRA Registration | JR Compliance",
          "metaDescription": "FCRA registration from the Ministry of Home Affairs under the Foreign Contribution (Regulation) Act, 2010 is mandatory for NGOs, trusts, societies and Section…",
          "canonicalUrl": "/corporate/fcra-registration",
          "keywords": "FCRA Registration, Fund Raising, JR Compliance"
        }
      }
    }
  ]
}
```
<!-- CORPORATE_CONTENT_END -->
