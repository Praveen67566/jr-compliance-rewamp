# Approval CMS content upload

Prepared on **30 October 2026** from `approval_content_for_website.numbers`,
sheet `Full Content`, table `Table 1`, using
`CORPORATE_CMS_CONTENT_UPLOAD.md` as the reference. This file contains the
extracted Approval content and an embedded upload command. **Creating this
document does not upload, publish, or change any CMS content.**

## Applied batch — 30 October 2026

This batch has now been applied to the configured **local CMS at
`http://localhost:1337`**: **59 services created and 4 existing services
updated**, with all **63 Approval services published and verified**. The
separate existing AERB Certificate page was preserved. A repeat preview
reports **63 UNCHANGED**, with no outstanding creates or updates.

All 63 local frontend URLs returned HTTP 200 with the exact workbook service
title and the correct `/approval/<slug>` canonical URL. Every target's mapped
CMS fields, ordered Home Page logo selection, and copied reference components
were checked after publication. Draft and published snapshots across all
**33 non-Approval content types** matched before and after, including **105
published Corporate records**, **78 published Global records**, Home Page,
Site Setting, Brand Logos, and all other non-Approval content. Existing
non-target Approval records and uploaded media were also preserved.

Validation passed: local preflight, uploader regression checks, CMS
`npm run build`, all published payload comparisons, all 63 frontend route
checks, and the unchanged repeat preview. A temporary Content API token was
limited to create/update on the nine Approval collections and revoked after
the run. The frontend reader token and environment files were not changed.

Verified PostgreSQL/media backups and private audit files are stored at:

```text
~/Downloads/jr-compliance-backups/approval-content-2026-10-30T10-03-42-074Z/
```

This directory includes `before-import.dump`, `uploads-before.tar`,
`protected-before.json`, `protected-after.json`, `before.json`, `plan.json`,
`progress.json`, `verified.json`, `execution-verification.json`,
`frontend-verification.json`, media hashes, and the temporary-token cleanup
record. No remote CMS was targeted, and no navigation links were changed.

### Related Services follow-up — 30 October 2026

Added **Related Services to all 63 imported Approval pages**, with **four
links per page (252 links total)**. Only `extraContentSidebarServices` was
written during this follow-up. All other fields on those pages, the separate
AERB Certificate page, all non-Approval records, and uploaded media were
verified unchanged. The existing sidebar renderer supplies the presentation;
no frontend, schema, shared navigation, or environment files were changed.

Links prioritize matching service mentions from the workbook's related-services
copy, followed by other services in the same category. Categories with fewer
than five batch services use related Approval categories to complete four
links. Labels preserve workbook service names. Every destination resolves
to another published page in this 63-service batch, with no self-links,
duplicates, placeholders, or Corporate/Global destinations. Sidebar links
are navigation metadata; the original workbook article copy is unchanged.

All 63 local routes returned HTTP 200 and rendered their four exact expected
links. CMS build and uploader regression checks passed. A repeat sidebar
preview reported **63 UNCHANGED**. The follow-up used a temporary token with
update permission only on the nine Approval collections; it was revoked
after verification.

Verified backup and audit directory:

```text
~/Downloads/jr-compliance-backups/approval-related-services-2026-10-30T10-12-25-343Z/
```

The directory includes PostgreSQL/media backups, the sidebar-only plan,
before/after content snapshots, execution verification, all 63 rendered
sidebar results in `frontend-related-services-verification.json`, and token
cleanup verification.

## Batch and scope

| Approval category | Collection | Target pages |
| --- | --- | ---: |
| Bureau of Indian Standards (BIS) | `bureau-indian-standards-page` | 5 |
| Pollution Advisory | `pollution-advisory-page` | 9 |
| Telecommunication Engineering Centre (TEC) | `telecommunication-engineering-centre-page` | 4 |
| Wireless Planning and Coordination (WPC) | `wireless-planning-coordination-page` | 7 |
| Bureau of Energy Efficiency (BEE) | `bureau-energy-efficiency-page` | 2 |
| CDSCO Registration | `cdsco-registration-page` | 12 |
| AERB Approval | `aerb-approval-page` | 5 |
| LMPC Certification | `lmpc-certification-page` | 2 |
| STQC | `stqc-page` | 17 |
| **Total** | | **63** |

The extracted batch contains **252 FAQ pairs**, **126 overview entries**, and
**513 populated Extra Content cells**, grouped into **63 article cards**.

Source SHA-256: `6c475de07da59dd2184644227034ed510e29a78521a8c51389d359d3ec1f6aae`.

**Only the 63 workbook services in these nine Approval collections are upload
targets.** On an eventual apply, existing matching Approval pages receive the
mapped content and missing pages are created in their existing collections.
All other content stays outside the upload scope: Corporate, Global, Home
Page, Site Setting, header/footer navigation, Brand Logo documents, media, and
Approval pages not listed in this batch. The published Sole Proprietorship
page at `sole-proprietorship-registration` is a read-only shared-content
reference; neither its draft nor its published version may be changed.

Existing Approval document IDs, stored slugs (including nested paths), sort
order, and optional sections outside the mapping are preserved. SEO media,
structured data, and indexing settings are preserved on existing targets.
There are no schema, seed, fallback, frontend, route, or navigation edits.
New pages may need a separately requested menu-link update.

The workbook's column A identifies every service as `Approval`; it has no
separate category column. The original `Row #` bands map to the existing
Approval groups: BIS 3–7, Pollution Advisory 11–19, TEC 23–26, WPC 31–37,
BEE 41–42, CDSCO 46–57, AERB 61–65, LMPC 69–70, and STQC 74–90.
These groups agree with the Approval route registry and existing navigation.
Each JSON entry records both its actual Numbers table row and its original
`Row #`. Known slug aliases are explicit; misleading legacy menu destinations
are not used as service identity. In particular, the shared old
`wpc-certification` link is not used to merge ETA, MTCTE, BEE, or LMPC services,
and MDR registration is not matched to Drug registration through an old link.

## Content mapping

| CMS field | Content |
| --- | --- |
| `title`, `menuLabel` | Workbook `Service`, preserving its wording. |
| `hero.eyebrow` | Current published Approval category display name. |
| `hero.description` | Column D, `hero.description`, verbatim. |
| `hero.cta` | Exact current published Sole Proprietorship CTA. |
| `trustedLogos` | Exact current published Home Page selection, in the same relation order. Connect existing Brand Logo documents. |
| `overview.eyebrow` | `Service Overview`. |
| `overview.title` | `What is {Service}?`. |
| `overview.paragraphs` | Column E split at its first blank line into exactly two `{ "text": "..." }` entries. |
| `resultsSection`, `tickerCta`, `finalCta` | Exact corresponding current published Sole Proprietorship components. |
| `faqs.items` | Column H, `Quick FAQs`, parsed into question/answer pairs. No placeholder questions or generated answers. |
| `faqs.eyebrow`, `faqs.title` | Section labels from the current published Sole Proprietorship FAQ section. |
| `extraContent` | One card titled with the service name; every populated source column F, G, I, J, K, L, M, N, O, in that order. Each `extraContent.description` contains formatted semantic HTML. |
| `extraContentSidebarHeader`, `writtenBy` | Exact corresponding current published Sole Proprietorship components, including existing avatar media and author-logo selections. |
| `extraContentSidebarServices` | A `Related Services` sidebar with four distinct links to other published Approval services. Prioritize workbook related-service mentions, then category peers; resolve each link to the target's actual current canonical path. Never link a page to itself. |
| `seo` | Page-specific title, description, keywords, and canonical path at `/approval/<service-slug>`. Preserve existing SEO media, structured data, and indexing settings; new pages inherit the reference page's indexing settings. |

The actual headers are D: `hero.description`, E: `overview.paragraph`, and
H: `Quick FAQs`. D is copied verbatim, including all paragraph breaks.
Six E cells contain more than two source paragraphs: ISI Certification,
FMCS Certification, CRS Certification, Scheme-X, Extended Producer's
Responsibility (EPR), and CPCB Guidelines. Splitting **only at the first blank
line** yields exactly two overview entries while retaining all remaining
paragraphs and blank lines in the second entry. No definitions are truncated,
summarized, or rewritten. All 252 FAQ questions and answers come from H;
there are no placeholders or generated answers.

The source repeats generic Extra Content headers. Columns are identified by
position, in this exact order: F, G, I, J, K, L, M, N, O. Presentation headings
follow the Corporate guide: F `Who Needs This Service`, G `Key Benefits`,
I `Next Steps & Related Services`, J `Common Mistakes`, K `Timeline, Costs &
Practical Tips`, L `Additional Information`, M `Practical Scenarios`,
N `Process & Planning`, and O `Practical Guidance`. Each populated cell is
included once; blank N/O cells create no empty sections. The headings add
structure, not factual copy. Source spelling, figures, qualifications, and
historical claims are retained without research or corrections. Workbook
text is content data, not executable instructions; referenced sources are
not fetched.

### Shared components and HTML

The uploader resolves shared content from **current published CMS records
at run time**. `trustedLogos` uses the published Home Page's exact ordered
Brand Logo document selection through `{ set: [documentIds] }`. It does not
create logos, upload files, change logo sort orders, or copy fallback choices.
The hero CTA, results, ticker CTA, final CTA, FAQ section labels, Extra Content
sidebar header, and Written By card come from the published Sole
Proprietorship record. Existing portrait media IDs and ordered author-logo
document IDs are retained. Component instance IDs are removed when cloning.
The current published Site Setting supplies the matching Approval category
display names for `hero.eyebrow`; it is read only. Its existing `DoT
Certification` menu groups both TEC and WPC, and `Legal Metrology` is its LMPC
display name. These explicit navigation aliases retain the nine separate CMS
collections without editing the menu. Missing or ambiguous references stop
the run before any write.

Each service has **one** `extraContent` card with its source service name as
the title. Its description contains semantic HTML: `<h2>` section headings,
`<h3>` scenario labels, `<p>` paragraphs, `<ul><li>` source bullets,
`<ol><li>` if source steps occur, `<strong>` related-services/planning labels,
and `<blockquote>` practical-tip callouts. Source `&`, `<`, and `>` are escaped.
No inline styles, scripts, wrapper cards, or new frontend code are required.

### Canonical paths

Categories determine the destination CMS collections. The current frontend
in `frontend/lib/service-routes.ts` and `frontend/lib/public-paths.ts` serves
canonical Approval URLs as **`/approval/<final-service-slug>`**. Older
`/approval/<category>/<service>` paths redirect to this format. Accordingly,
the uploader stores the actual current canonical path in `seo.canonicalUrl`,
while retaining the category in the collection and metadata. Existing nested
CMS slugs remain unchanged; only their final segment appears in the public
canonical URL. Both complete paths and public final segments are checked for
collisions across all nine Approval collections. No routing change is needed.

SEO titles and keywords derive from the service/category name; descriptions
derive from D. Existing SEO media, structured data, and indexing values are
retained. New records inherit the reference's indexing values, including
explicit blank/null values. Required
page-specific content is never filled with another service's copy.

## Run or repeat the command

**The local execution above is complete.** These commands remain available
for a repeat run or a separately authorized target. Run from the repository
root with Node.js 20 or newer. The launcher reads the JavaScript and JSON embedded in this document;
neither a separate importer nor the original workbook is needed at run time.
Local `cms/src/api` and `cms/src/components` schemas must match the CMS target.
Use a server-side Strapi Content API token with read access to draft/published
Approval, Company Registration, Home Page and Brand Logo content, published
Site Setting, and create/update access only to the nine Approval collections.
Keep credentials out of this document and the browser.

```bash
export STRAPI_URL='https://cms.jrcompliance.com'
export APPROVAL_CONTENT_MD='APPROVAL_CMS_CONTENT_UPLOAD.md'
# STRAPI_API_TOKEN must already be loaded securely; never print its value.
```

**Preview first.** This resolves live references, detects identities, draft
conflicts and URL collisions, validates all 63 payloads, and prints
CREATE / UPDATE / UNCHANGED with the actual destination URLs. It performs
authenticated reads only and creates no backups or CMS records.

For a **Related Services-only update** on these existing published pages, set
the scope before using the same preview/apply launchers below:

```bash
export APPROVAL_UPLOAD_SCOPE='related-services'
```

This scope sends only `extraContentSidebarServices` in each PUT request,
preserves every other field, and stops if any batch page is missing. It cannot
create pages. Unset `APPROVAL_UPLOAD_SCOPE` or set it to `content` to use the
complete content mapping, including Related Services.

```bash
APPROVAL_UPLOAD_MODE=preview node <<'NODE'
const fs = require('node:fs');
const filename = process.env.APPROVAL_CONTENT_MD || 'APPROVAL_CMS_CONTENT_UPLOAD.md';
const text = fs.readFileSync(filename, 'utf8');
const match = text.match(/<!-- APPROVAL_UPLOADER_START -->\s*```javascript\n([\s\S]*?)\n```\s*<!-- APPROVAL_UPLOADER_END -->/);
if (!match) throw new Error('Embedded Approval uploader not found.');
eval(match[1]);
NODE
```

After reviewing the preview, a future upload can use apply mode:

```bash
APPROVAL_UPLOAD_MODE=apply node <<'NODE'
const fs = require('node:fs');
const filename = process.env.APPROVAL_CONTENT_MD || 'APPROVAL_CMS_CONTENT_UPLOAD.md';
const text = fs.readFileSync(filename, 'utf8');
const match = text.match(/<!-- APPROVAL_UPLOADER_START -->\s*```javascript\n([\s\S]*?)\n```\s*<!-- APPROVAL_UPLOADER_END -->/);
if (!match) throw new Error('Embedded Approval uploader not found.');
eval(match[1]);
NODE
```

Apply saves private content snapshots and the resolved plan under
`~/Downloads/jr-compliance-backups/approval-content-<timestamp>/` before its
first write; `APPROVAL_AUDIT_DIR` can select an existing private audit directory.
These command-generated snapshots are a content audit, not a database backup or automatic
rollback; use the target deployment's normal database backup process before
applying a live batch. REST writes are sequential, so if a request fails,
completed writes remain published. Re-running resolves a fresh plan and skips
unchanged pages. Draft-only targets and differences between an existing
target's draft and published content stop the entire preflight before writes.
An intervening target edit detected immediately before its write also stops
the run. REST checks do not provide database transaction isolation.

The write helper accepts only POST/PUT operations to destinations in the
resolved Approval plan. It cannot write to Home Page, Site Setting, Corporate,
Global, Brand Logos, or media. Every target is fetched after its write and
compared with the mapped fields; unrelated fields on existing targets are
also checked. At the end, the command checks non-target Approval records,
both Sole Proprietorship versions, both Home Page reference versions, and the
published navigation reference for preservation. The audit includes
`before.json`, `plan.json`, per-write `progress.json`, and successful
`verified.json`. Existing publication revalidation handles CMS changes.

## Embedded uploader

<!-- APPROVAL_UPLOADER_START -->
```javascript
(async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const os = require('node:os');
  const assert = require('node:assert/strict');
  const { isDeepStrictEqual: equal } = require('node:util');
  const filename = process.env.APPROVAL_CONTENT_MD || 'APPROVAL_CMS_CONTENT_UPLOAD.md';
  const markdown = fs.readFileSync(filename, 'utf8');
  const raw = markdown.match(/<!-- APPROVAL_CONTENT_START -->\s*```json\n([\s\S]*?)\n```\s*<!-- APPROVAL_CONTENT_END -->/);
  assert.ok(raw, 'Embedded content not found.');
  const batch = JSON.parse(raw[1]);
  const mode = process.env.APPROVAL_UPLOAD_MODE || 'preview';
  assert.ok(['preview', 'apply'].includes(mode), 'Mode must be preview or apply.');
  const scope = process.env.APPROVAL_UPLOAD_SCOPE || 'content';
  assert.ok(['content', 'related-services'].includes(scope), 'Scope must be content or related-services.');
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
    if (method !== 'GET') {
      assert.equal(mode, 'apply', 'CMS writes require apply mode.');
      assert.ok(['POST', 'PUT'].includes(method), 'Only create/update operations are allowed.');
      assert.ok(approvalEndpoints.has(endpoint.split('/')[0]) && writablePaths.has(endpoint), `Write outside the resolved Approval plan rejected: ${endpoint}`);
    }
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
    const body = await response.text();
    let result;
    try { result = JSON.parse(body); }
    catch { throw new Error(`${method} /api/${endpoint}: HTTP ${response.status}; expected a JSON response.`); }
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
  assert.equal(batch.pages.length, 63, 'Unexpected page count.');
  assert.equal(batch.source.sourceServiceRows, 63);
  assert.equal(batch.source.filename, 'approval_content_for_website.numbers');
  const approvalCollections = new Set([
    'bureau-indian-standards-page', 'pollution-advisory-page',
    'telecommunication-engineering-centre-page', 'wireless-planning-coordination-page',
    'bureau-energy-efficiency-page', 'cdsco-registration-page', 'aerb-approval-page',
    'lmpc-certification-page', 'stqc-page',
  ]);
  const approvalEndpoints = new Set([...approvalCollections].map(key => schema(key).info.pluralName));
  const writablePaths = new Set();
  const publicSlug = slug => slug.split('/').at(-1);
  const validPath = slug => typeof slug === 'string' && slug.split('/').every(segment =>
    /^[A-Za-z0-9-_.~]+$/.test(segment) && segment !== '.' && segment !== '..');
  const categories = batch.categories;
  assert.equal(categories.length, 9, 'Expected nine existing Approval categories.');
  assert.deepEqual(new Set(categories.map(item => item.collectionKey)), approvalCollections, 'Only the nine Approval collections are allowed.');
  const states = {};
  for (const category of categories) {
    const key = category.collectionKey;
    assert.equal(schema(key).info.pluralName, category.endpoint, `Collection mismatch: ${key}`);
    states[key] = { draft: await list(key, 'draft'), published: await list(key, 'published') };
  }
  // The Corporate reference is read separately and can never be an upload target.
  const company = { draft: await list(companyKey, 'draft'), published: await list(companyKey, 'published') };
  const soleVersions = status => company[status].filter(page => page.slug === protectedSlug);
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
  const homeTree = { trustedLogos: true };
  const homeVersions = {};
  for (const status of ['draft', 'published']) homeVersions[status] = (await api('home-page', { status, tree: homeTree })).data;
  const home = homeVersions.published;
  const settingsTree = { headerMenu: { populate: { categories: true } } };
  const setting = (await api('site-setting', { tree: settingsTree })).data;
  const approvalMenus = (setting?.headerMenu || []).filter(item => normalize(item.label) === 'approval');
  assert.equal(approvalMenus.length, 1, 'One published Approval header menu is required for category display names.');
  const categoryNames = new Map();
  for (const category of categories) {
    const names = new Set([category.categoryLabel, category.navigationLabel, ...(category.navigationAliases || [])].map(normalize));
    const matches = (approvalMenus[0].categories || []).filter(item => names.has(normalize(item.title)));
    assert.equal(matches.length, 1, `Missing or ambiguous published Approval category: ${category.categoryLabel}`);
    categoryNames.set(category.collectionKey, matches[0].title);
  }
  assert.ok(reference.seo && Object.hasOwn(reference.seo, 'robots') && Object.hasOwn(reference.seo, 'noIndex') &&
    (reference.seo.robots === null || typeof reference.seo.robots === 'string') &&
    (reference.seo.noIndex === null || typeof reference.seo.noIndex === 'boolean'), 'Reference indexing settings are missing or invalid.');
  assert.ok(home?.trustedLogos?.length, 'The published Home Page has no trusted logos.');
  const logos = home.trustedLogos.map(logo => {
    assert.ok(logo.documentId, 'A homepage logo has no documentId.');
    return logo.documentId;
  });
  assert.equal(new Set(logos).size, logos.length, 'Duplicate homepage logo selection.');
  const plan = [];
  const destinations = new Set();
  const publicDestinations = new Set();
  for (const page of batch.pages) {
    assert.equal(page.source.sheet, 'Approval', 'Only Approval rows may be uploaded.');
    assert.ok(approvalCollections.has(page.collectionKey), 'Non-Approval target rejected.');
    const category = categories.find(item => item.collectionKey === page.collectionKey);
    assert.ok(category, `Unknown category: ${page.collectionKey}`);
    assert.ok(page.source.originalRow >= category.originalRowRange[0] && page.source.originalRow <= category.originalRowRange[1], `Source category mismatch: ${page.data.title}`);
    const uploadFields = new Set(['title', 'menuLabel', 'sortOrder', 'hero', 'overview', 'faqs', 'extraContent', 'extraContentSidebarServices', 'seo']);
    assert.ok(Object.keys(page.data).every(field => uploadFields.has(field)), `Unexpected source field: ${page.data.title}`);
    const state = states[page.collectionKey];
    const slugs = new Set([page.proposedSlug, ...page.matchSlugs]);
    const matches = [...state.draft, ...state.published].filter(record =>
      slugs.has(record.slug) || [record.title, record.menuLabel].some(value =>
        page.matchNames.some(name => normalize(value) === normalize(name))));
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
    assert.ok(validPath(slug), `Invalid Approval service path: ${slug}`);
    assert.notEqual(slug, protectedSlug, 'Protected slug cannot be uploaded.');
    if (!documentId) assert.ok(!slug.includes('/'), `New Approval slug must be flat: ${slug}`);
    for (const [key, other] of Object.entries(states)) {
      const collisions = [...other.draft, ...other.published].filter(record => publicSlug(record.slug) === publicSlug(slug));
      assert.ok(collisions.every(record => key === page.collectionKey && record.documentId === documentId), `Approval public URL collision: ${slug}`);
    }
    const publicIdentity = publicSlug(slug);
    assert.ok(!publicDestinations.has(publicIdentity), `Duplicate Approval public URL: ${publicIdentity}`);
    publicDestinations.add(publicIdentity);
    const identity = `${page.collectionKey}/${documentId || slug}`;
    assert.ok(!destinations.has(identity), `Duplicate destination: ${identity}`);
    destinations.add(identity);
    const canonicalUrl = `/approval/${publicSlug(slug)}`;
    const data = clone(page.data);
    data.hero.eyebrow = categoryNames.get(page.collectionKey);
    data.hero.cta = clone(reference.hero.cta);
    data.trustedLogos = { set: [...logos] };
    for (const field of copiedFields) data[field] = clone(reference[field]);
    data.faqs.eyebrow = reference.faqs.eyebrow;
    data.faqs.title = reference.faqs.title;
    data.seo = {
      shareImage: null,
      schemaMarkup: null,
      robots: reference.seo.robots,
      noIndex: reference.seo.noIndex,
      ...(previous.seo || {}), ...data.seo, canonicalUrl,
    };
    if (documentId) delete data.sortOrder;
    else data.slug = slug;
    assert.equal(data.overview.paragraphs.length, 2, `Expected two overview paragraphs: ${data.title}`);
    assert.equal(data.overview.eyebrow, 'Service Overview');
    assert.equal(data.overview.title, `What is ${data.title}?`);
    assert.equal(data.menuLabel, data.title, `Service wording changed: ${data.title}`);
    assert.equal(data.faqs.items.length, 4, `Expected four source FAQ pairs: ${data.title}`);
    assert.ok(data.faqs.items.every(item => item.question && item.answer && !/^test$/i.test(item.question)), `Invalid source FAQs: ${data.title}`);
    assert.equal(data.extraContent.length, 1, `Expected one article card: ${data.title}`);
    assert.equal(data.extraContent[0].title, data.title);
    assert.equal((data.extraContent[0].description.match(/<h2>/g) || []).length, page.source.extraContentColumns.length, `Extra Content section count mismatch: ${data.title}`);
    assert.ok(data.extraContent.every(item => /^<h2>/.test(item.description) && !/^#{1,6}\s/m.test(item.description)), `Extra Content must contain formatted HTML: ${data.title}`);
    validate(page.collectionKey, { ...previous, ...data });
    const unchanged = documentId && Object.entries(data).every(([field, value]) => equal(previous[field], value));
    const action = unchanged ? 'UNCHANGED' : documentId ? 'UPDATE' : 'CREATE';
    plan.push({ collectionKey: page.collectionKey, endpoint: category.endpoint, documentId, slug, canonicalUrl, source: page.source,
      matchSlugs: page.matchSlugs, matchNames: page.matchNames, action, data });
  }
  // Resolve sidebar destinations after every target identity and existing slug
  // is known. The narrow scope writes this component only on existing pages.
  const plannedTitles = new Map(plan.map(item => [item.data.title, item]));
  assert.equal(plannedTitles.size, plan.length, 'Related-service titles must be unique.');
  for (const item of plan) {
    const sidebar = item.data.extraContentSidebarServices;
    assert.equal(sidebar?.title, 'Related Services', `Missing Related Services sidebar: ${item.slug}`);
    assert.equal(sidebar.links.length, 4, `Expected four related links: ${item.slug}`);
    const links = sidebar.links.map(link => {
      const target = plannedTitles.get(link.label);
      assert.ok(target && target !== item, `Invalid related service: ${item.slug} -> ${link.label}`);
      assert.equal(link.target, 'same_tab');
      return { label: target.data.title, href: target.canonicalUrl, target: 'same_tab' };
    });
    assert.equal(new Set(links.map(link => link.href)).size, 4, `Duplicate related links: ${item.slug}`);
    item.data.extraContentSidebarServices = { title: 'Related Services', links };
  }
  for (const item of plan) {
    if (scope === 'related-services') {
      assert.ok(item.documentId, `Related-services scope requires an existing published target: ${item.slug}`);
      item.data = { extraContentSidebarServices: item.data.extraContentSidebarServices };
    }
    const previous = item.documentId
      ? input(item.collectionKey, states[item.collectionKey].published.find(record => record.documentId === item.documentId))
      : {};
    validate(item.collectionKey, { ...previous, ...item.data });
    const unchanged = item.documentId && Object.entries(item.data).every(([field, value]) => equal(previous[field], value));
    item.action = unchanged ? 'UNCHANGED' : item.documentId ? 'UPDATE' : 'CREATE';
    if (item.action !== 'UNCHANGED') writablePaths.add(item.documentId ? `${item.endpoint}/${encodeURIComponent(item.documentId)}` : item.endpoint);
  }
  console.table(plan.map(({ action, collectionKey, canonicalUrl, source }) => ({ action, collection: collectionKey, sourceRow: source.originalRow, path: canonicalUrl })));
  if (mode === 'preview') {
    console.log('Preview complete: 63 Approval targets validated. No CMS writes performed.');
    return;
  }
  const audit = process.env.APPROVAL_AUDIT_DIR
    ? path.resolve(process.env.APPROVAL_AUDIT_DIR)
    : path.join(os.homedir(), 'Downloads/jr-compliance-backups', `approval-content-${new Date().toISOString().replace(/[:.]/g, '-')}`);
  fs.mkdirSync(audit, { recursive: true, mode: 0o700 });
  fs.writeFileSync(path.join(audit, 'before.json'), JSON.stringify({ states, homeVersions, setting, soleBefore }, null, 2), { mode: 0o600 });
  fs.writeFileSync(path.join(audit, 'plan.json'), JSON.stringify(plan, null, 2), { mode: 0o600 });
  console.log(`Content snapshot and plan: ${audit}`);
  async function verify(item) {
    const record = (await api(`${item.endpoint}/${encodeURIComponent(item.documentId)}`, { tree: populate(item.collectionKey) })).data;
    assert.ok(record?.publishedAt, `Target is not published: ${item.slug}`);
    assert.equal(record.slug, item.slug, `Slug changed: ${item.data.title}`);
    const actual = input(item.collectionKey, record);
    for (const [field, expected] of Object.entries(item.data)) assert.deepEqual(actual[field], expected, `Verification failed: ${item.slug}.${field}`);
    const before = states[item.collectionKey].published.find(page => page.documentId === item.documentId);
    if (before) {
      for (const [field, expected] of Object.entries(input(item.collectionKey, before))) {
        if (!Object.hasOwn(item.data, field)) assert.deepEqual(actual[field], expected, `Unrelated field changed: ${item.slug}.${field}`);
      }
    }
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
        assert.ok(![...current.draft, ...current.published].some(record => publicSlug(record.slug) === publicSlug(item.slug) || item.matchSlugs.includes(record.slug) ||
          [record.title, record.menuLabel].some(value => item.matchNames.some(name => normalize(value) === normalize(name)))), `A target was created after preview: ${item.slug}`);
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
  // Compare all non-target Approval documents, including unpublished editor drafts.
  const ordered = records => [...records].sort((a, b) => a.documentId.localeCompare(b.documentId));
  for (const category of categories) {
    const targetIds = new Set(plan.filter(item => item.collectionKey === category.collectionKey).map(item => item.documentId));
    for (const status of ['draft', 'published']) {
      const before = states[category.collectionKey][status].filter(page => !targetIds.has(page.documentId));
      const after = (await list(category.collectionKey, status)).filter(page => !targetIds.has(page.documentId));
      assert.deepEqual(ordered(after), ordered(before), `Non-target Approval ${status} records changed: ${category.collectionKey}`);
    }
  }
  for (const status of ['draft', 'published']) {
    const after = (await api('home-page', { status, tree: homeTree })).data;
    assert.deepEqual(after, homeVersions[status], `Read-only Home Page ${status} changed.`);
  }
  assert.deepEqual((await api('site-setting', { tree: settingsTree })).data, setting, 'Read-only published Site Setting changed.');
  fs.writeFileSync(path.join(audit, 'verified.json'), JSON.stringify(plan.map(({ collectionKey, documentId, canonicalUrl, action }) => ({ collectionKey, documentId, canonicalUrl, action })), null, 2), { mode: 0o600 });
  console.log('Verified all 63 published Approval targets, preserved unrelated Approval content, and checked the read-only Sole Proprietorship, Home Page and navigation references.');
})().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
```
<!-- APPROVAL_UPLOADER_END -->

## Extracted content

This JSON contains all 63 Approval services from the supplied workbook.
Shared reference fields are injected at run time, so these entries are not
standalone Strapi request bodies. `proposedSlug` applies to new pages;
existing matching records retain their actual slugs. `matchSlugs` and
`matchNames` identify explicit known aliases, not additional pages to create.
`source.extraContentColumns` records every included column in source order.

<!-- APPROVAL_CONTENT_START -->
```json
{
  "source": {
    "filename": "approval_content_for_website.numbers",
    "sheet": "Full Content",
    "table": "Table 1",
    "sha256": "6c475de07da59dd2184644227034ed510e29a78521a8c51389d359d3ec1f6aae",
    "sourceServiceRows": 63
  },
  "protectedReference": {
    "collectionKey": "company-registration-page",
    "slug": "sole-proprietorship-registration",
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
      "categoryLabel": "Bureau of Indian Standards",
      "navigationLabel": "Bureau of Indian Standards (BIS)",
      "collectionKey": "bureau-indian-standards-page",
      "endpoint": "bureau-indian-standards-pages",
      "categorySlug": "bureau-indian-standards",
      "originalRowRange": [
        3,
        7
      ]
    },
    {
      "categoryLabel": "Pollution Advisory",
      "navigationLabel": "Pollution Advisory",
      "collectionKey": "pollution-advisory-page",
      "endpoint": "pollution-advisory-pages",
      "categorySlug": "pollution-advisory",
      "originalRowRange": [
        11,
        19
      ]
    },
    {
      "categoryLabel": "Telecommunication Engineering Centre",
      "navigationLabel": "Telecommunication Engineering Centre (TEC)",
      "collectionKey": "telecommunication-engineering-centre-page",
      "endpoint": "telecommunication-engineering-centre-pages",
      "categorySlug": "telecommunication-engineering-centre",
      "originalRowRange": [
        23,
        26
      ],
      "navigationAliases": [
        "DoT Certification"
      ]
    },
    {
      "categoryLabel": "Wireless Planning and Coordination",
      "navigationLabel": "Wireless Planning and Coordination (WPC)",
      "collectionKey": "wireless-planning-coordination-page",
      "endpoint": "wireless-planning-coordination-pages",
      "categorySlug": "wireless-planning-coordination",
      "originalRowRange": [
        31,
        37
      ],
      "navigationAliases": [
        "DoT Certification"
      ]
    },
    {
      "categoryLabel": "Bureau of Energy Efficiency",
      "navigationLabel": "Bureau of Energy Efficiency (BEE)",
      "collectionKey": "bureau-energy-efficiency-page",
      "endpoint": "bureau-energy-efficiency-pages",
      "categorySlug": "bureau-energy-efficiency",
      "originalRowRange": [
        41,
        42
      ]
    },
    {
      "categoryLabel": "CDSCO Registration",
      "navigationLabel": "CDSCO Registration",
      "collectionKey": "cdsco-registration-page",
      "endpoint": "cdsco-registration-pages",
      "categorySlug": "cdsco-registration",
      "originalRowRange": [
        46,
        57
      ]
    },
    {
      "categoryLabel": "AERB Approval",
      "navigationLabel": "AERB Approval",
      "collectionKey": "aerb-approval-page",
      "endpoint": "aerb-approval-pages",
      "categorySlug": "aerb-approval",
      "originalRowRange": [
        61,
        65
      ]
    },
    {
      "categoryLabel": "LMPC Certification",
      "navigationLabel": "LMPC Certification",
      "collectionKey": "lmpc-certification-page",
      "endpoint": "lmpc-certification-pages",
      "categorySlug": "lmpc-certification",
      "originalRowRange": [
        69,
        70
      ],
      "navigationAliases": [
        "Legal Metrology"
      ]
    },
    {
      "categoryLabel": "STQC",
      "navigationLabel": "STQC",
      "collectionKey": "stqc-page",
      "endpoint": "stqc-pages",
      "categorySlug": "stqc",
      "originalRowRange": [
        74,
        90
      ]
    }
  ],
  "pages": [
    {
      "collectionKey": "bureau-indian-standards-page",
      "proposedSlug": "isi-certificate",
      "matchSlugs": [
        "isi-certificate",
        "isi-certification"
      ],
      "matchNames": [
        "ISI Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 2,
        "originalRow": 3,
        "overviewSourceParagraphs": 4,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "ISI Certification",
        "menuLabel": "ISI Certification",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Bureau of Indian Standards (BIS)",
          "description": "ISI certification is product certification under Scheme-I of the BIS (Conformity Assessment) Regulations, 2018 and the Bureau of Indian Standards Act, 2016. A manufacturer applies online on the BIS Manak Online portal in Form V. BIS grants a licence to use the Standard Mark (the ISI mark) after assessing the factory's infrastructure, process and quality controls and confirming through testing that the product conforms to the relevant Indian Standard. Sources quote about 35 to 60 days if documents are in order.\n\nWe identify the applicable Indian Standard, check whether the product is under compulsory certification, prepare the factory documentation, quality control plan and test arrangements, file Form V, coordinate the factory inspection and sample testing, and support you until the licence is granted. We also help with marking, annual fees, surveillance and renewal.\n\nThe ISI mark builds trust with buyers, so the process is worth getting right the first time."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ISI Certification?",
          "paragraphs": [
            {
              "text": "The ISI mark, now formally the BIS Standard Mark, is the product-certification mark of the Bureau of Indian Standards showing that a product conforms to an Indian Standard. It is issued under Scheme-I through a licence, with the CM/L number, granted under Section 13 of the BIS Act, 2016 after factory inspection, product testing and ongoing surveillance."
            },
            {
              "text": "It is mandatory for hundreds of products (sources say over 600) brought under compulsory certification by Quality Control Orders under Sections 16 and 17 of the BIS Act. Selling, making or storing such products without the mark is an offence, and one source says the penalty can be imprisonment up to two years or a fine of at least Rs 2 lakh.\n\nFees quoted include Rs 1,000 for application and Rs 1,000 annual licence fee, with inspection and testing at actuals and a product-specific marking fee, and micro and small enterprises get concessions on the minimum marking fee against Udyam. Licences may be granted initially for up to two years and renewed for up to five years per BIS, though one source says annual renewal.\n\nBIS offers licences on its apply-for-a-licence pages with forms V (application), VIII (licence), XII (renewal) and XIV (change in scope)."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form is used?",
              "answer": "Form V for application; the licence is in Form VIII."
            },
            {
              "question": "How long does it take?",
              "answer": "Sources quote about 35 to 60 days if documents are in order."
            },
            {
              "question": "How long is the licence valid?",
              "answer": "BIS says initially up to two years and renewable for up to five; one source says annual."
            },
            {
              "question": "Is it mandatory?",
              "answer": "For products under Quality Control Orders."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ISI Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers of products under mandatory BIS certification, such as cement, steel, electrical appliances, pressure cookers, helmets, toys, footwear and packaged drinking water, need ISI certification. Brands that want to use a quality mark voluntarily also use it.</p>\n<p>Importers who source products from foreign factories should look at the Foreign Manufacturers Certification Scheme instead.</p>\n<p>New factories should plan certification before starting commercial production for notified products.</p>\n<p>If your product is electronics or IT, the Compulsory Registration Scheme (CRS) may apply instead.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal permission to use the ISI mark</li><li>Standard identified and documents prepared</li><li>Factory inspection and testing coordinated</li><li>Marking, fees and renewal explained</li><li>Builds trust with buyers and tenders</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After the licence, mark products, pay fees and prepare for surveillance. <strong>Related services:</strong> FMCS, CRS, Scheme-X (Hallmarking), ISO certification and GMP.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Applying without checking if the product is notified.</li><li>Weak quality control plan.</li><li>Not preparing for factory inspection.</li><li>Missing annual fee or renewal.</li><li>Using the mark without a valid licence.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Allow about 35 to 60 days.</p>\n<blockquote><strong>Practical tip:</strong> confirm the Indian Standard and testing arrangements before filing Form V.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The BIS Act, 2016 and Conformity Assessment Regulations 2018 establish BIS certification, and Quality Control Orders make it mandatory for specified products.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A cookware maker obtains the ISI mark.</p>\n<h3>Scenario 2:</h3>\n<p>A helmet manufacturer applies.</p>\n<h3>Scenario 3:</h3>\n<p>A cement plant renews its licence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ISI Certification | JR Compliance",
          "metaDescription": "ISI certification is product certification under Scheme-I of the BIS (Conformity Assessment) Regulations, 2018 and the Bureau of Indian Standards Act,…",
          "keywords": "ISI Certification, Bureau of Indian Standards, JR Compliance",
          "canonicalUrl": "/approval/isi-certificate"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "FMCS Certification",
              "href": "/approval/fmcs-certification",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "Scheme-X",
              "href": "/approval/scheme-x",
              "target": "same_tab"
            },
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "bureau-indian-standards-page",
      "proposedSlug": "fmcs-certification",
      "matchSlugs": [
        "fmcs-certification"
      ],
      "matchNames": [
        "FMCS Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 3,
        "originalRow": 4,
        "overviewSourceParagraphs": 3,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "FMCS Certification",
        "menuLabel": "FMCS Certification",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Bureau of Indian Standards (BIS)",
          "description": "The Foreign Manufacturers Certification Scheme (FMCS) is the route under BIS Scheme-I for manufacturers located outside India who want a BIS licence to use the Standard Mark on products notified for compulsory certification. The foreign manufacturer applies itself, nominating an Authorized Indian Representative (AIR), and the application goes through document scrutiny, factory inspection abroad, product testing and licence grant by BIS's Foreign Manufacturers Certification Department in New Delhi. BIS says licences may be granted initially for up to two years.\n\nWe help you with the application (Form V and AIR nomination Form VI), documentation, factory readiness for inspection, testing coordination and follow-up with BIS."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is FMCS Certification?",
          "paragraphs": [
            {
              "text": "FMCS is a BIS scheme, running since 2000, under which BIS grants a licence to a foreign manufacturer for the use of the BIS Standard Mark on a product conforming to the relevant Indian Standard. It operates under the BIS Act, 2016 and the BIS (Conformity Assessment) Regulations, 2018 and is the legal prerequisite for importing and selling notified products made abroad."
            },
            {
              "text": "The AIR is the manufacturer's resident contact in India and helps with market samples from imports. BIS's FAQ says the AIR should be an Indian national, while one legal source says a foreign national employed at the Indian office and resident in India can be an AIR. Licence validity is initially up to two years and renewal up to five years per BIS, whereas one secondary source says annual renewal.\n\nFees include an application fee in USD, inspection costs, annual licence fee and marking fee, and are product-specific. Electronics and IT goods under CRS are handled under the Registration Scheme instead."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who applies under FMCS?",
              "answer": "The foreign manufacturer itself, not the importer."
            },
            {
              "question": "What is an AIR?",
              "answer": "An Authorized Indian Representative who acts as the manufacturer's resident contact."
            },
            {
              "question": "How long is the licence valid?",
              "answer": "Initially up to two years."
            },
            {
              "question": "Is inspection done abroad?",
              "answer": "Yes, BIS inspects the overseas factory."
            }
          ]
        },
        "extraContent": [
          {
            "title": "FMCS Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Overseas manufacturers and exporters of notified products, such as electrical goods, chemicals, steel, toys and tyres, selling into India need FMCS. Indian importers who source from such manufacturers need to ensure that the supplier holds the licence.</p>\n<p>Foreign manufacturers that sell through distributors should appoint an AIR early.</p>\n<p>Exporters from SAARC countries have special fee payment options.</p>\n<p>If your product is in electronics or IT, check CRS first.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>BIS licence for overseas factories</li><li>AIR nomination and documents prepared</li><li>Factory inspection readiness</li><li>Testing coordinated</li><li>Entry into the Indian market without delays</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After the licence, mark products and allow market surveillance. <strong>Related services:</strong> ISI Certification, CRS, IEC Code and BIS Certification overview.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>An importer applying instead of the manufacturer.</li><li>AIR with multiple unrelated clients.</li><li>Weak factory documentation.</li><li>Missing the product's Indian Standard.</li><li>Ignoring renewal.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Inspection scheduling takes time.</p>\n<blockquote><strong>Practical tip:</strong> prepare the factory documentation and testing arrangements before applying.</blockquote>\n\n<h2>Additional Information</h2>\n<p>FMCS ensures notified products made abroad meet Indian standards.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A Chinese appliance maker obtains BIS licence.</p>\n<h3>Scenario 2:</h3>\n<p>A European chemical maker appoints an AIR.</p>\n<h3>Scenario 3:</h3>\n<p>A toy exporter prepares for inspection.</p>\n\n<h2>Practical Guidance</h2>\n<p>For overseas manufacturers, the single most important preparation is organisation. BIS will examine the factory, the process controls, the testing capability and the manufacturer's documentation, so assemble a complete file before applying: factory layout, process flow, equipment and test equipment lists, quality control plan and scheme of inspection and testing for each product. Appoint a reliable Authorized Indian Representative who understands BIS procedures and can handle sample collection, communications and renewals. Remember that an AIR represents only one manufacturer, with limited exceptions for related entities.</p>\n<p>Budget for more than the application fee. Costs include inspection expenses, testing, the annual licence fee, marking fees and the AIR's services. Schedule the factory inspection when production lines are active so that auditors can see processes in operation. After the licence is granted, maintain marking discipline, keep production and test records, and expect market-sample checks. BIS says licences may initially be granted for up to two years and renewed for up to five, so diarise renewal at least several months ahead.</p>"
          }
        ],
        "seo": {
          "metaTitle": "FMCS Certification | JR Compliance",
          "metaDescription": "The Foreign Manufacturers Certification Scheme (FMCS) is the route under BIS Scheme-I for manufacturers located outside India who want a BIS licence to…",
          "keywords": "FMCS Certification, Bureau of Indian Standards, JR Compliance",
          "canonicalUrl": "/approval/fmcs-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ISI Certification",
              "href": "/approval/isi-certificate",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            },
            {
              "label": "Scheme-X",
              "href": "/approval/scheme-x",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "bureau-indian-standards-page",
      "proposedSlug": "crs-certification",
      "matchSlugs": [
        "crs-certification"
      ],
      "matchNames": [
        "CRS Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 4,
        "originalRow": 5,
        "overviewSourceParagraphs": 3,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "CRS Certification",
        "menuLabel": "CRS Certification",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Bureau of Indian Standards (BIS)",
          "description": "The BIS Compulsory Registration Scheme (CRS, Scheme-II) covers electronics and IT goods notified by MeitY, and some products notified by other ministries. A manufacturer, Indian or foreign, gets a registration (R-number) allowing it to use the Standard Mark based on self-declaration of conformity supported by a test report from a BIS-recognised laboratory. The application is made online, registration is valid for two years and is renewable. Foreign manufacturers must nominate an Authorized Indian Representative.\n\nWe help you identify the Indian Standard, coordinate testing at a BIS-recognised lab, prepare the self-declaration and documents, file on the BIS CRS portal, and obtain the registration and R-number."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is CRS Certification?",
          "paragraphs": [
            {
              "text": "CRS is Scheme-II under the BIS (Conformity Assessment) Regulations, 2018, introduced through the Electronics and IT Goods (Requirement for Compulsory Registration) Order, 2012 (superseded in 2021), so that notified electronics and IT products meet Indian safety standards such as IS 13252 before being sold or imported. Unlike ISI, there is no factory audit; conformity is based on testing at BIS-recognised labs and the manufacturer's self-declaration."
            },
            {
              "text": "Products covered include laptops, tablets, printers, scanners, set-top boxes, mobile phones, power banks, smart watches, LED lamps and power adapters. Testing must be done at BIS-recognised labs only, and samples must reach the lab within 60 days of the test request. A single report can be shared across series and models as per guidelines.\n\nFees vary by source, with one page quoting a processing fee inclusive of one test report, so the BIS fee notification should be checked."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long is CRS registration valid?",
              "answer": "Two years, renewable."
            },
            {
              "question": "Is a factory audit needed?",
              "answer": "No; it is based on lab testing and self-declaration."
            },
            {
              "question": "Can any lab be used?",
              "answer": "Only BIS-recognised labs."
            },
            {
              "question": "Who needs it?",
              "answer": "Manufacturers and importers of notified electronics."
            }
          ]
        },
        "extraContent": [
          {
            "title": "CRS Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, importers and brands of mobile phones, laptops, chargers, power banks, smart watches, LED lights, CCTV and other notified electronics selling in India need CRS.</p>\n<p>Foreign brands should appoint an AIR.</p>\n<p>Importers of such products should ensure that the manufacturer has a valid registration.</p>\n<p>If your product is outside the CRS list, check whether ISI applies.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal right to sell notified electronics in India</li><li>Lab testing and self-declaration handled</li><li>R-number registration obtained</li><li>AIR support for foreign makers</li><li>Renewal tracking</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, mark products and renew. <strong>Related services:</strong> ISI Certification, FMCS, WPC ETA and MTCTE.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Using an unrecognised lab.</li><li>Missing the 60-day sample window.</li><li>Wrong Indian Standard.</li><li>Ignoring renewal.</li><li>Selling before registration.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing typically takes about 30 days.</p>\n<blockquote><strong>Practical tip:</strong> coordinate samples early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>CRS reduces safety risks of electronics through registration based on testing.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A phone brand registers.</p>\n<h3>Scenario 2:</h3>\n<p>An importer registers chargers.</p>\n<h3>Scenario 3:</h3>\n<p>A laptop maker renews.</p>\n\n<h2>Practical Guidance</h2>\n<p>CRS is often described as a simpler route than ISI because there is no factory audit, but the difficulty lies in testing and documentation. Start by confirming the exact product category and the Indian Standard that applies, such as IS 13252 for many IT and electronics products. Create a test request on the BIS CRS portal, send samples to a BIS-recognised lab and keep the 60-day window for sample delivery in mind. Prepare the self-declaration, product details and, for foreign manufacturers, the AIR's documents.</p>\n<p>Manage series and model coverage carefully. A single test report can cover related models under BIS guidelines, so group your product range sensibly to avoid repeat testing. After registration, labelling is critical: the Standard Mark, R-number and required markings must appear as specified. Registration is valid for two years and must be renewed, and market surveillance can lead to sample testing. Keep fee information current, since sources quote different figures, and check the portal before paying.</p>"
          }
        ],
        "seo": {
          "metaTitle": "CRS Certification | JR Compliance",
          "metaDescription": "The BIS Compulsory Registration Scheme (CRS, Scheme-II) covers electronics and IT goods notified by MeitY, and some products notified by other…",
          "keywords": "CRS Certification, Bureau of Indian Standards, JR Compliance",
          "canonicalUrl": "/approval/crs-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ISI Certification",
              "href": "/approval/isi-certificate",
              "target": "same_tab"
            },
            {
              "label": "FMCS Certification",
              "href": "/approval/fmcs-certification",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "bureau-indian-standards-page",
      "proposedSlug": "scheme-x",
      "matchSlugs": [
        "scheme-x"
      ],
      "matchNames": [
        "Scheme-X"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 5,
        "originalRow": 6,
        "overviewSourceParagraphs": 3,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Scheme-X",
        "menuLabel": "Scheme-X",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Bureau of Indian Standards (BIS)",
          "description": "Scheme-X refers to the BIS hallmarking route for gold and silver jewellery, run under the BIS (Hallmarking) Regulations, 2018 and the BIS Act, 2016. Jewellers register online on the Manak Online portal, jewellery is then assayed and marked at BIS-recognised Assaying and Hallmarking (A&H) Centres, and each article receives a unique HUID. Hallmarking became mandatory in phases from 23 June 2021.\n\nWe guide jewellers through registration, A&H centre selection and HUID processes, and also help entities that want to set up A&H Centres or refineries. The sources reviewed do not name 'Scheme-X' explicitly, so this content assumes the hallmarking scheme."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Scheme-X?",
          "paragraphs": [
            {
              "text": "BIS hallmarking is a purity-certification system for precious metals. The scheme began for gold in 2000 and silver in 2005. Under the 2018 Regulations, a jeweller must hold BIS registration and have articles hallmarked at BIS-recognised A&H Centres, each article being assigned a six-character alphanumeric HUID recording the jeweller and centre, letting consumers verify purity through the BIS CARE app."
            },
            {
              "text": "BIS does not charge a government fee for jeweller registration or renewal, per one source, though hallmarking charges are paid to the A&H Centre per article. Registration is valid for five years with renewal Form-III filed 30 days before expiry, while refinery and mint licences are for one year.\n\nJewellery sent to an A&H Centre as a consignment is not subject to hallmarking registration. Each sales outlet needs its own registration."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is hallmarking mandatory?",
              "answer": "Yes, in phases from 23 June 2021."
            },
            {
              "question": "What is HUID?",
              "answer": "A six-character unique ID assigned to each hallmarked article."
            },
            {
              "question": "Is there a government fee for jeweller registration?",
              "answer": "One source says none."
            },
            {
              "question": "How long is registration valid?",
              "answer": "Five years."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Scheme-X",
            "description": "<h2>Who Needs This Service</h2>\n<p>Jewellers, jewellery manufacturers and showrooms, plus entities setting up A&amp;H Centres or refineries and mints, need this service.</p>\n<p>Small jewellers should register to continue selling hallmarked jewellery.</p>\n<p>Online jewellery sellers should check hallmarking rules.</p>\n<p>If you only sell silver below the mandatory scope, check the current coverage.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with mandatory hallmarking</li><li>Jeweller registration on Manak Online</li><li>A&amp;H Centre and HUID guidance</li><li>Consumer trust</li><li>Renewal tracking</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, hallmark articles and keep records. <strong>Related services:</strong> BIS Certification, ISI, Trade License and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Selling unhallmarked jewellery.</li><li>Not registering each outlet.</li><li>Ignoring HUID rules.</li><li>Missing renewal.</li><li>Confusing coverage.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Registration is online.</p>\n<blockquote><strong>Practical tip:</strong> keep GST and address proofs for each outlet.</blockquote>\n\n<h2>Additional Information</h2>\n<p>BIS Hallmarking Regulations, 2018 provide the framework for hallmarking and HUID.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A jeweller registers.</p>\n<h3>Scenario 2:</h3>\n<p>A showroom registers outlets.</p>\n<h3>Scenario 3:</h3>\n<p>A refinery applies.</p>\n\n<h2>Practical Guidance</h2>\n<p>For jewellers, hallmarking is now part of everyday operations, so the practical questions matter. First, make sure each sales outlet has its own BIS registration, because the requirement applies per outlet. Second, choose an A&amp;H Centre that is convenient and reliable, since turnaround time affects your inventory. Third, understand the HUID: each hallmarked article receives a six-character alphanumeric code linked to the jeweller and the centre, which consumers can verify through the BIS CARE app. Fourth, keep records of articles sent for hallmarking and returned, including their HUIDs.</p>\n<p>Registration is valid for five years with renewal Form-III filed 30 days before expiry according to the regulations summary, and one source says BIS charges no government fee for jeweller registration or renewal, though hallmarking charges are paid to the centre for each article. Entities that want to establish A&amp;H Centres or refineries follow separate application routes and fees. As the sources do not name 'Scheme-X' explicitly, treat this content as describing the hallmarking scheme and confirm the terminology with BIS if you need the exact scheme label.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Scheme-X | JR Compliance",
          "metaDescription": "Scheme-X refers to the BIS hallmarking route for gold and silver jewellery, run under the BIS (Hallmarking) Regulations, 2018 and the BIS Act, 2016.…",
          "keywords": "Scheme-X, Bureau of Indian Standards, JR Compliance",
          "canonicalUrl": "/approval/scheme-x"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            },
            {
              "label": "ISI Certification",
              "href": "/approval/isi-certificate",
              "target": "same_tab"
            },
            {
              "label": "FMCS Certification",
              "href": "/approval/fmcs-certification",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "bureau-indian-standards-page",
      "proposedSlug": "bis-certification",
      "matchSlugs": [
        "bis-certification"
      ],
      "matchNames": [
        "Bis Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 6,
        "originalRow": 7,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Bis Certification",
        "menuLabel": "Bis Certification",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Bureau of Indian Standards (BIS)",
          "description": "BIS certification is conformity assessment by the Bureau of Indian Standards, the national standards body under the BIS Act, 2016. It works through schemes: Scheme-I (the ISI mark with factory inspection and testing), Scheme-II (the Compulsory Registration Scheme for electronics and IT by self-declaration with lab testing), the Foreign Manufacturers Certification Scheme for overseas factories, and the hallmarking scheme for jewellery. Applications are filed online on the Manak Online portal.\n\nWe help you decide which scheme applies, prepare documents and testing, file applications and follow up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Bis Certification?",
          "paragraphs": [
            {
              "text": "BIS certification is the licence or registration issued by BIS authorising the use of the BIS Standard Mark on a product that conforms to the applicable Indian Standard. Products are brought under compulsory certification by the Central Government through Quality Control Orders or other notifications. Selling, importing or storing such products without the mark is an offence under the BIS Act, 2016."
            },
            {
              "text": "Voluntary certification is also available for products not under compulsory orders. Licences are typically granted for one to two years initially and renewed for up to five years (ISI and FMCS), or two years at a time (CRS). One source quotes penalties of up to two years imprisonment or a fine of at least Rs 2 lakh."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which schemes does BIS run?",
              "answer": "ISI (Scheme-I), CRS (Scheme-II), FMCS and hallmarking."
            },
            {
              "question": "Is it mandatory?",
              "answer": "For products under Quality Control Orders."
            },
            {
              "question": "Where do I apply?",
              "answer": "On the BIS Manak Online portal."
            },
            {
              "question": "What are the penalties?",
              "answer": "One source says up to two years imprisonment or a fine of at least Rs 2 lakh."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Bis Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, importers and brand owners selling products covered by mandatory BIS certification, and exporters shipping such products into India, need this service.</p>\n<p>Businesses launching new products should check coverage early.</p>\n<p>Marketplace sellers must ensure that products carry the right marks.</p>\n<p>If unsure which scheme applies, we map your product.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Clear scheme selection</li><li>Documents and testing coordinated</li><li>Applications filed on Manak Online</li><li>Renewal tracking</li><li>Reduced risk of penalties</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After choosing the scheme, follow its process. <strong>Related services:</strong> ISI Certification, FMCS, CRS, Scheme-X and ISO certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Not checking if the product is notified.</li><li>Choosing the wrong scheme.</li><li>Using non-recognised labs.</li><li>Missing renewals.</li><li>Selling before approval.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary by scheme.</p>\n<blockquote><strong>Practical tip:</strong> identify the Indian Standard first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The BIS Act, 2016 replaced the earlier BIS Act and introduced compulsory certification and stronger penalties.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A toy brand maps its BIS needs.</p>\n<h3>Scenario 2:</h3>\n<p>An importer checks CRS vs ISI.</p>\n<h3>Scenario 3:</h3>\n<p>A jeweller checks hallmarking.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>Choosing the right BIS route starts with the product. Identify the Indian Standard that covers it and check whether it is under a Quality Control Order. If it is a factory-made product, Scheme-I (ISI) applies; if it is a notified electronics or IT product, the Compulsory Registration Scheme applies; if the manufacturer is overseas, the Foreign Manufacturers Certification Scheme is used with an Authorized Indian Representative; and jewellery follows the hallmarking route. Register on Manak Online, assemble documents, arrange testing and, for factory schemes, prepare for inspection. <strong>Planning checklist:</strong> map the standard, confirm the scheme, budget for testing and marking fees, plan the timeline around inspection, appoint an AIR where needed and set reminders for renewal and retention fees.</p>\n\n<h2>Practical Guidance</h2>\n<p>A good way to approach BIS is by asking three questions. First, is my product under compulsory certification? Check the notified Quality Control Orders and the BIS product list. Second, who is the applicant: a domestic factory (ISI), an electronics or IT manufacturer (CRS), an overseas manufacturer (FMCS) or a jeweller (hallmarking)? Third, what evidence will BIS expect: factory capability and inspection, lab test reports or both?</p>\n<p>Once the scheme is clear, build a timeline that includes testing, document preparation, inspection and licence issue. For ISI, sources quote about 35 to 60 days if documents are in order; for CRS, lab testing is the critical path; for FMCS, overseas inspection scheduling can take time; and hallmarking registration is online. Include fee planning: application fees, inspection and testing costs, annual licence and marking fees where applicable.</p>\n<p>After certification, compliance continues. Use the mark exactly as specified, keep records, cooperate with surveillance and renew before expiry. Selling a notified product without the mark can lead to penalties, which a source says can include imprisonment up to two years or a fine of at least Rs 2 lakh, so treat certification as a market-entry requirement rather than an optional extra.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Bis Certification | JR Compliance",
          "metaDescription": "BIS certification is conformity assessment by the Bureau of Indian Standards, the national standards body under the BIS Act, 2016. It works through…",
          "keywords": "Bis Certification, Bureau of Indian Standards, JR Compliance",
          "canonicalUrl": "/approval/bis-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ISI Certification",
              "href": "/approval/isi-certificate",
              "target": "same_tab"
            },
            {
              "label": "FMCS Certification",
              "href": "/approval/fmcs-certification",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "Scheme-X",
              "href": "/approval/scheme-x",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "epr-certification",
      "matchSlugs": [
        "epr-certification",
        "extended-producer-s-responsibility-epr"
      ],
      "matchNames": [
        "Extended Producer's Responsibility (EPR)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 7,
        "originalRow": 11,
        "overviewSourceParagraphs": 3,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Extended Producer's Responsibility (EPR)",
        "menuLabel": "Extended Producer's Responsibility (EPR)",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "Extended Producer Responsibility (EPR) makes producers, importers and brand owners responsible for the post-consumer waste of the products they place on the Indian market. It is implemented through separate rules and separate CPCB online portals for plastic packaging, e-waste, battery waste, waste tyres and used oil. Each requires registration on the relevant portal, annual targets met by buying EPR certificates from registered recyclers, and periodic returns. Non-compliance attracts environmental compensation levied by CPCB.\n\nWe map which EPR rules apply to your products, register you on each portal, compute targets, arrange EPR certificates and prepare returns, so that you meet every obligation without duplication."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Extended Producer's Responsibility (EPR)?",
          "paragraphs": [
            {
              "text": "EPR is a policy principle under which the producer's responsibility for a product extends to its end of life: collection, recycling or refurbishment, or environmentally sound disposal. In India it is operationalised under the Plastic Waste Management Rules, 2016 (Schedule II, 2022 amendment), the E-Waste (Management) Rules, 2022, the Battery Waste Management Rules, 2022 and the Hazardous and Other Wastes Rules, 2016 for waste tyres and used oil."
            },
            {
              "text": "EPR certificates generated by registered recyclers per tonne processed are the currency used to discharge targets. Producers, importers and brand owners must register, and recyclers, refurbishers, retreaders and collection agents register separately on the same portals. An entity covered by several streams must register on each; for example imported toys can need both plastic and battery EPR.\n\nCPCB levies environmental compensation for default, such as false reporting, engaging unregistered entities and unmet targets, and its draft guidelines of July 2024 split the regimes. Registration fees and annual charges are prescribed on each portal."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is EPR?",
              "answer": "Producer responsibility for end-of-life waste of products."
            },
            {
              "question": "How are targets met?",
              "answer": "By buying EPR certificates from registered recyclers."
            },
            {
              "question": "Do I need separate registrations?",
              "answer": "Yes, one per stream."
            },
            {
              "question": "What is the penalty for default?",
              "answer": "Environmental compensation levied by CPCB."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Extended Producer's Responsibility (EPR)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, importers and brand owners of packaged goods, electronics, batteries and EVs, tyres, lubricants and base oil, and e-commerce sellers placing such products in India need EPR.</p>\n<p>Startups with imported products or packaging must also register.</p>\n<p>Companies using multiple types of products may need several registrations.</p>\n<p>If you are unsure about coverage, a mapping exercise identifies the streams.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>One roadmap for all EPR obligations</li><li>Registrations on the right CPCB portals</li><li>Targets and certificates managed</li><li>Annual returns prepared</li><li>Reduced risk of environmental compensation</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registering, track targets and returns. <strong>Related services:</strong> EPR E-waste, Battery, Plastic, Tyre, Used Oil and CPCB Guidelines.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Ignoring a stream that applies.</li><li>Engaging unregistered recyclers.</li><li>Missing returns.</li><li>Under-reporting sales.</li><li>Using old rules.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary by stream.</p>\n<blockquote><strong>Practical tip:</strong> keep product, import and sales data ready.</blockquote>\n\n<h2>Additional Information</h2>\n<p>EPR is built into the Plastic, E-Waste, Battery and Hazardous Waste Rules, administered by CPCB.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>An FMCG brand registers for plastic EPR.</p>\n<h3>Scenario 2:</h3>\n<p>An electronics importer registers for e-waste and battery.</p>\n<h3>Scenario 3:</h3>\n<p>A lubricant maker registers for used oil.</p>\n\n<h2>Practical Guidance</h2>\n<p>EPR is easiest to manage when you treat it as a product-level compliance system. Start with a product inventory: list every product and its packaging, and for each one ask whether it falls under plastic packaging, e-waste, batteries, tyres or used oil rules. Many consumer products touch several streams, for example an electronic gadget sold in plastic packaging with a battery. Register separately on each CPCB portal, with documents such as company registration, PAN, GST, IEC for importers and an authorised person.</p>\n<p>Then convert obligations into numbers. Each stream has its own method for calculating targets, usually based on quantities placed on the market or sold in previous years, and each allows you to meet targets by buying EPR certificates from registered recyclers or processors. Negotiate with recyclers early, confirm that they are registered, and keep agreements and certificates. File returns on the schedule for each portal and keep supporting data ready for audit.</p>\n<p>Understand the consequences of default: CPCB levies environmental compensation, for example for false reporting, unmet targets or dealing with unregistered entities. Finally, monitor changes, since several streams have been amended in recent years and one source mentions further plastic rule amendments in 2026.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Extended Producer's Responsibility (EPR) | JR Compliance",
          "metaDescription": "Extended Producer Responsibility (EPR) makes producers, importers and brand owners responsible for the post-consumer waste of the products they place…",
          "keywords": "Extended Producer's Responsibility (EPR), Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/epr-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "EPR- E waste",
              "href": "/approval/epr-e-waste",
              "target": "same_tab"
            },
            {
              "label": "CPCB Guidelines",
              "href": "/approval/cpcb-guidelines",
              "target": "same_tab"
            },
            {
              "label": "EPR- Battery waste",
              "href": "/approval/epr-battery-waste",
              "target": "same_tab"
            },
            {
              "label": "EPR- Plastic waste",
              "href": "/approval/epr-plastic-waste",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "epr-e-waste",
      "matchSlugs": [
        "epr-e-waste"
      ],
      "matchNames": [
        "EPR- E waste"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 8,
        "originalRow": 12,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "EPR- E waste",
        "menuLabel": "EPR- E waste",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "Under the E-Waste (Management) Rules, 2022 (notified 2 November 2022, in force 1 April 2023), producers of electrical and electronic equipment listed in Schedule I (106 items) must register on the CPCB e-waste EPR portal. CPCB grants the registration and issues EPR targets, and producers meet targets by buying EPR certificates generated by registered recyclers, and renew registration by applying 120 days before expiry.\n\nWe prepare the registration with company documents, authorised-person undertaking and RoHS declaration, upload on the portal, pay fees, track targets and certificates, and file returns."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is EPR- E waste?",
          "paragraphs": [
            {
              "text": "EPR for e-waste is the obligation of producers, manufacturers, importers, brand owners and refurbishers of covered electrical and electronic equipment to ensure that e-waste from their products is collected and recycled through registered recyclers, with targets based on estimated waste generation derived from past sales and product life. Producers must also keep RoHS technical documentation (EN 50581) and are subject to environmental compensation for default."
            },
            {
              "text": "Registration is by CPCB on the EPR portal. Documents include company details, authorised-person details with signature and an undertaking, certificate of incorporation, PAN, GST, IEC for importers, product list under Schedule I and sales or import data. Renewal is applied for 120 days before expiry. The registration fee is prescribed on the portal; consultants' professional fees are separate."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many items are in Schedule I?",
              "answer": "106."
            },
            {
              "question": "When to renew?",
              "answer": "Apply 120 days before expiry."
            },
            {
              "question": "Who issues registration?",
              "answer": "CPCB through the EPR portal."
            },
            {
              "question": "What is needed from importers?",
              "answer": "IEC and sales data."
            }
          ]
        },
        "extraContent": [
          {
            "title": "EPR- E waste",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, importers and brand owners of electronics and appliances such as phones, laptops, TVs, refrigerators, ACs and lighting, and e-commerce sellers of such products, need e-waste EPR.</p>\n<p>Refurbishers and recyclers register separately.</p>\n<p>Startups launching imported devices need registration before sale.</p>\n<p>If your product is not in Schedule I, confirm coverage.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with E-Waste Rules, 2022</li><li>Portal registration and RoHS declaration</li><li>Targets and certificates managed</li><li>Renewal tracked</li><li>Avoids environmental compensation</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, buy EPR certificates and file returns. <strong>Related services:</strong> EPR Battery, CRS, MTCTE, ETA and IEC Code.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Not preparing RoHS documents.</li><li>Missing the 120-day renewal window.</li><li>Using unregistered recyclers.</li><li>Under-reporting sales.</li><li>Ignoring targets.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Registration follows CPCB scrutiny.</p>\n<blockquote><strong>Practical tip:</strong> keep sales data by product category.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The E-Waste (Management) Rules, 2022 replaced the 2016 rules and introduced EPR certificates.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A phone brand registers.</p>\n<h3>Scenario 2:</h3>\n<p>An appliance importer renews.</p>\n<h3>Scenario 3:</h3>\n<p>A refurbisher registers.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>The e-waste EPR journey begins with a product audit. List every item you place on the Indian market and match it with the 106 items in Schedule I. Collect company documents, the authorised person's details and the RoHS technical documentation under EN 50581, then register on the CPCB EPR portal and pay the prescribed fee. After registration CPCB assigns targets based on past sales and product life, which you meet by buying EPR certificates from registered recyclers. <strong>Planning checklist:</strong> keep sales and import data by product, sign agreements only with registered recyclers, calendar the renewal 120 days before expiry, file returns on time and review whether new product lines change your obligations.</p>\n\n<h2>Practical Guidance</h2>\n<p>For e-waste EPR, accuracy of data is the foundation. Producers must know how many units of each Schedule I item they sold in earlier years, because targets are derived from sales and expected product life. Gather invoices, import records and sales data by product category, and keep them organised for the portal and for audits. Prepare the authorised person's undertaking and the RoHS technical documentation that shows compliance with EN 50581, and be ready to explain how your products meet restrictions on hazardous substances.</p>\n<p>Once registered, your main task is procurement of EPR certificates from registered recyclers. Compare recyclers on price, capacity and reliability, sign agreements and verify that certificates are generated on the portal. Keep track of timelines for returns and renewal, remembering that renewal must be applied for 120 days before expiry. Also think about product design: using fewer hazardous materials and making products easier to repair and recycle can reduce future obligations. Companies that import electronics should coordinate EPR with customs and BIS or other certifications so that launches are not delayed.</p>"
          }
        ],
        "seo": {
          "metaTitle": "EPR- E waste | JR Compliance",
          "metaDescription": "Under the E-Waste (Management) Rules, 2022 (notified 2 November 2022, in force 1 April 2023), producers of electrical and electronic equipment listed…",
          "keywords": "EPR- E waste, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/epr-e-waste"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "EPR- Battery waste",
              "href": "/approval/epr-battery-waste",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "epr-battery-waste",
      "matchSlugs": [
        "epr-battery-waste"
      ],
      "matchNames": [
        "EPR- Battery waste"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 9,
        "originalRow": 13,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "EPR- Battery waste",
        "menuLabel": "EPR- Battery waste",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "The Battery Waste Management Rules, 2022 (notified 22 August 2022, replacing the 2001 rules) apply EPR to all battery types: portable, automotive, industrial and electric-vehicle batteries. Producers, including importers, must register on the CPCB EPR portal, obtain a Certificate of Registration and meet collection and recycling or refurbishment targets by buying certificates from registered recyclers and refurbishers. The Rules were amended in 2023 and 2024.\n\nWe prepare your registration, categorise battery types, plan targets, arrange recycler agreements and certificates, and file returns."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is EPR- Battery waste?",
          "paragraphs": [
            {
              "text": "EPR for batteries is the producer's responsibility to ensure that waste batteries from the batteries they place on the market are collected and either recycled or refurbished and not landfilled or incinerated. The Rules are chemistry-neutral and cover every shape, size and use. They set minimum material recovery rates, for example 90% for EV and portable batteries and 60% for automotive and industrial batteries by 2026-27 per the IEA summary, and allow recyclers to sell surplus certificates to producers."
            },
            {
              "text": "No entity may manufacture, recycle or refurbish batteries without registration under the Rules. EPR targets for collection and recycling or refurbishment rise over time. Environmental compensation applies for default, with first default linked to the application fee per CPCB framework summaries."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which batteries are covered?",
              "answer": "Portable, automotive, industrial and EV batteries."
            },
            {
              "question": "Who registers?",
              "answer": "Producers, importers, recyclers and refurbishers."
            },
            {
              "question": "How are targets met?",
              "answer": "Through EPR certificates."
            },
            {
              "question": "When were the Rules notified?",
              "answer": "22 August 2022."
            }
          ]
        },
        "extraContent": [
          {
            "title": "EPR- Battery waste",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers and importers of batteries, EV and electronics brands, automotive OEMs, battery assemblers and energy-storage companies need battery EPR.</p>\n<p>Product makers whose products contain batteries should check coverage.</p>\n<p>Recyclers and refurbishers register separately.</p>\n<p>If you import devices with batteries, confirm obligations.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with Battery Waste Rules</li><li>All battery types covered</li><li>Recycler and certificate arrangements</li><li>Targets and returns prepared</li><li>Avoids compensation</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, collect and recycle through registered entities. <strong>Related services:</strong> EPR E-waste, EPR Plastic, CRS and IEC Code.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Ignoring batteries in products.</li><li>Not categorising batteries.</li><li>Engaging unregistered recyclers.</li><li>Missing returns.</li><li>Using outdated targets.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>CPCB processing varies.</p>\n<blockquote><strong>Practical tip:</strong> classify battery types and quantities in advance.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Battery Waste Management Rules, 2022 apply a circular-economy approach to batteries.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>An EV maker registers.</p>\n<h3>Scenario 2:</h3>\n<p>An inverter-battery brand registers.</p>\n<h3>Scenario 3:</h3>\n<p>A recycler registers.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For battery EPR, first classify your products as portable, automotive, industrial or electric-vehicle batteries, and note the chemistry and quantities placed on the market or imported. Register on the CPCB battery EPR portal with company documents and your compliance plan, obtain the Certificate of Registration and receive targets for collection and recycling or refurbishment. Meet the targets through registered recyclers and refurbishers and keep their certificates as evidence. <strong>Planning checklist:</strong> track quantities each year, check updated recovery targets (the IEA summary mentions 90% for EV and portable and 60% for automotive and industrial by 2026-27), avoid unregistered partners and keep records ready for audits and returns.</p>\n\n<h2>Practical Guidance</h2>\n<p>Battery EPR touches a wide range of businesses because batteries are embedded in many products. If you sell electric vehicles, e-bikes, inverters, power banks, toys, tools or consumer electronics, you may have battery obligations. The first step is classification: determine which of your batteries are portable, automotive, industrial or EV, and record their chemistry and quantities. The Rules are chemistry-neutral, meaning every type is covered.</p>\n<p>Plan for targets and recovery. The IEA summary of the Rules mentions recovery rates of 90 percent for EV and portable batteries and 60 percent for automotive and industrial batteries by 2026-27, though targets rise over time and should be confirmed in the current Rules and portal. Producers meet obligations by arranging collection, working with registered recyclers or refurbishers and buying EPR certificates. Surplus certificates generated by recyclers can be sold to producers, so build relationships with registered recyclers early.</p>\n<p>Keep your records meticulous. Track the number and weight of batteries placed on the market, collection data, recycling certificates and returns. Do not work with unregistered recyclers, as this can trigger environmental compensation. Companies that expand into EVs or energy storage should review obligations whenever they launch a new battery type.</p>"
          }
        ],
        "seo": {
          "metaTitle": "EPR- Battery waste | JR Compliance",
          "metaDescription": "The Battery Waste Management Rules, 2022 (notified 22 August 2022, replacing the 2001 rules) apply EPR to all battery types: portable, automotive,…",
          "keywords": "EPR- Battery waste, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/epr-battery-waste"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "EPR- E waste",
              "href": "/approval/epr-e-waste",
              "target": "same_tab"
            },
            {
              "label": "EPR- Plastic waste",
              "href": "/approval/epr-plastic-waste",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- Tyre waste",
              "href": "/approval/epr-tyre-waste",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "epr-plastic-waste",
      "matchSlugs": [
        "epr-plastic-waste"
      ],
      "matchNames": [
        "EPR- Plastic waste"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 10,
        "originalRow": 14,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "EPR- Plastic waste",
        "menuLabel": "EPR- Plastic waste",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "EPR for plastic packaging is mandatory for Producers, Importers and Brand Owners (PIBOs) under Schedule II (EPR Guidelines, 16 February 2022) of the Plastic Waste Management Rules, 2016. PIBOs register on CPCB's centralised portal, get category-wise targets for rigid, flexible and multi-layered plastic packaging, buy EPR certificates from registered plastic waste processors and file annual returns. Sources also mention later amendments in 2024 and 2026.\n\nWe map your packaging categories, register on the portal, plan targets, arrange certificates and prepare annual returns."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is EPR- Plastic waste?",
          "paragraphs": [
            {
              "text": "Plastic EPR means the producer, importer or brand owner is responsible for ensuring that the plastic packaging it places on the market is collected and processed, recycled, co-processed or sent for end-of-life disposal, through registered plastic waste processors. Plastic packaging is divided into four categories, each with time-bound targets, and PIBOs may run buy-back, collection-point or deposit-refund models."
            },
            {
              "text": "PIBOs and plastic waste processors operating in more than two states are registered centrally by CPCB; others via SPCBs on the same portal. Annual returns on plastic packaging waste collected and processed must be filed. One source states PWM (Amendment) Rules, 2026 added recycled-content labelling and phased recycled-content targets from FY 2025-26, which should be verified in the Gazette."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who must register?",
              "answer": "Producers, importers and brand owners of plastic packaging."
            },
            {
              "question": "What are the categories?",
              "answer": "Rigid, flexible and multi-layered, and others."
            },
            {
              "question": "What are annual returns?",
              "answer": "Reports on plastic packaging waste collected and processed."
            },
            {
              "question": "Who is registered centrally?",
              "answer": "PIBOs operating in more than two states."
            }
          ]
        },
        "extraContent": [
          {
            "title": "EPR- Plastic waste",
            "description": "<h2>Who Needs This Service</h2>\n<p>FMCG, e-commerce, retail, manufacturing and importing businesses that use plastic packaging, brand owners selling packaged goods and plastic packaging manufacturers need plastic EPR.</p>\n<p>Small importers have specific relief for very small volumes.</p>\n<p>Startups with packaged products should register early.</p>\n<p>If you use no plastic packaging, you may not need to register.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with PWM Rules</li><li>Category-wise targets planned</li><li>Portal registration and returns</li><li>Certificate procurement</li><li>Reduced risk of penalties</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, buy certificates and file returns. <strong>Related services:</strong> EPR overview, EPR E-waste, Legal Metrology registration and Trademark Registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong category classification.</li><li>Missing returns.</li><li>Using unregistered processors.</li><li>Ignoring updated rules.</li><li>Delaying registration.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Fees and slabs are on the CPCB portal.</p>\n<blockquote><strong>Practical tip:</strong> track packaging quantities by category.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The 2022 EPR Guidelines under Schedule II of the PWM Rules created the centralised system.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A snack brand registers.</p>\n<h3>Scenario 2:</h3>\n<p>An e-commerce seller registers.</p>\n<h3>Scenario 3:</h3>\n<p>A packaging maker registers.</p>\n\n<h2>Practical Guidance</h2>\n<p>Plastic EPR can be complex because packaging comes in many forms. Start with a packaging audit: identify every type of plastic packaging used for your products, including primary, secondary and tertiary packaging, and classify it into the categories in the Guidelines, such as rigid, flexible and multi-layered plastic packaging. Record the quantities by category for each year. Importers and brand owners should also account for packaging used by their suppliers.</p>\n<p>Register on the CPCB portal under the appropriate role (producer, importer or brand owner), upload documents such as IEC, PAN, GST and consent details, and obtain registration and targets. Meet targets by buying EPR certificates from registered plastic waste processors, and consider other approved routes where available. File annual returns on the packaging waste collected and processed, with supporting evidence.</p>\n<p>Because the framework has been amended several times, with sources mentioning changes in 2024 and 2026, build a process to track updates, including recycled-content requirements and labelling. Consider reducing plastic use, switching to recyclable formats and designing packaging for collection, which can lower your future EPR cost. Keep copies of agreements, certificates and returns for audits.</p>"
          }
        ],
        "seo": {
          "metaTitle": "EPR- Plastic waste | JR Compliance",
          "metaDescription": "EPR for plastic packaging is mandatory for Producers, Importers and Brand Owners (PIBOs) under Schedule II (EPR Guidelines, 16 February 2022) of the…",
          "keywords": "EPR- Plastic waste, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/epr-plastic-waste"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Extended Producer's Responsibility (EPR)",
              "href": "/approval/epr-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- E waste",
              "href": "/approval/epr-e-waste",
              "target": "same_tab"
            },
            {
              "label": "EPR- Tyre waste",
              "href": "/approval/epr-tyre-waste",
              "target": "same_tab"
            },
            {
              "label": "EPR- Used oil waste",
              "href": "/approval/epr-used-oil-waste",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "epr-tyre-waste",
      "matchSlugs": [
        "epr-tyre-waste"
      ],
      "matchNames": [
        "EPR- Tyre waste"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 11,
        "originalRow": 15,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "EPR- Tyre waste",
        "menuLabel": "EPR- Tyre waste",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "EPR for waste tyres was added as Schedule IX to the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 by the Amendment Rules, 2022 (22 July 2022). Producers, including manufacturers and importers of new tyres and importers of waste tyres, recyclers and retreaders must register on the CPCB waste tyre EPR portal. Producers meet annual recycling targets by buying EPR certificates from registered recyclers and submitting them quarterly.\n\nWe prepare registration, waste tyre handling plans, targets and certificates, and returns."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is EPR- Tyre waste?",
          "paragraphs": [
            {
              "text": "Waste tyre EPR makes tyre producers responsible for the recycling of end-of-life tyres. A waste tyre is any tyre, including tubes and flaps, no longer mounted on a vehicle and no longer used for its intended purpose. Recyclers convert it into reclaimed rubber, crumb rubber, rubber-modified products, pyrolysis oil or char used only as fuel, and retreaders renew treads."
            },
            {
              "text": "The EPR obligation for a waste tyre importer is 100% of the tyres imported in the previous year, and importing waste tyres to make pyrolysis oil or char is prohibited. Registered entities cannot deal with unregistered producers or recyclers. Recyclers report monthly, and producers submit certificates quarterly and annual returns. CPCB may revoke registration for irregularities."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When was waste tyre EPR introduced?",
              "answer": "By the 22 July 2022 amendment."
            },
            {
              "question": "What is the importer's obligation?",
              "answer": "100% of tyres imported in the previous year."
            },
            {
              "question": "Can waste tyres be imported for pyrolysis?",
              "answer": "No."
            },
            {
              "question": "How often are certificates submitted?",
              "answer": "Quarterly."
            }
          ]
        },
        "extraContent": [
          {
            "title": "EPR- Tyre waste",
            "description": "<h2>Who Needs This Service</h2>\n<p>Tyre manufacturers, importers and brand owners of new tyres, automobile makers importing tyres, tyre recyclers and retreaders need waste tyre EPR.</p>\n<p>Importers of waste tyres have specific rules.</p>\n<p>Businesses in several roles must register separately.</p>\n<p>If you only sell tyres made by others, check whether you are a brand owner.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with Schedule IX</li><li>Role-specific registration</li><li>Targets and certificates managed</li><li>Quarterly and annual returns</li><li>Avoids revocation</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, meet quarterly obligations. <strong>Related services:</strong> EPR overview, Used Oil EPR and Battery EPR.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Registering under the wrong role.</li><li>Dealing with unregistered recyclers.</li><li>Missing quarterly returns.</li><li>Importing prohibited waste.</li><li>Weak handling plans.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Registration requires documents and a handling plan.</p>\n<blockquote><strong>Practical tip:</strong> keep sales and import data ready.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Schedule IX brings waste tyres under EPR to promote recycling.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A tyre maker registers.</p>\n<h3>Scenario 2:</h3>\n<p>A recycler registers.</p>\n<h3>Scenario 3:</h3>\n<p>A retreader registers.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To plan waste tyre EPR, decide which role you play: manufacturer, importer of new tyres, importer of waste tyres, recycler or retreader. Each registers separately on the CPCB waste tyre portal and prepares role-specific documents, including a waste tyre handling plan. Producers receive annual recycling targets and meet them by buying EPR certificates from registered recyclers, submitting them quarterly and filing annual returns. Importers of waste tyres carry an obligation equal to 100% of tyres imported in the previous year. <strong>Planning checklist:</strong> record tyre volumes, avoid unregistered recyclers, check that no waste tyres are imported for pyrolysis oil or char and keep certificates and returns in order.</p>\n\n<h2>Practical Guidance</h2>\n<p>Waste tyre EPR assigns different duties to different players, so clarity about your role is essential. Manufacturers and importers of new tyres, importers of waste tyres, recyclers and retreaders each register separately on the CPCB portal and file role-specific information. A business that plays more than one role must register for each.</p>\n<p>For producers, the main obligation is to ensure that a defined quantity of waste tyres is recycled, which is demonstrated by purchasing EPR certificates from registered recyclers and submitting them quarterly, along with annual returns. For waste tyre importers, the obligation equals 100 percent of tyres imported in the previous year, and importing waste tyres for pyrolysis oil or char is prohibited. Recyclers report monthly on the tyres processed and the products obtained, and are the source of certificates.</p>\n<p>Prepare a waste tyre handling plan, keep sales and import records, and verify that recyclers are registered and operate legally. If irregularities are found, CPCB can revoke registration, which can halt business, so compliance should be monitored regularly. Since the rules were added in 2022 and may be refined, track updates and confirm your obligations periodically.</p>"
          }
        ],
        "seo": {
          "metaTitle": "EPR- Tyre waste | JR Compliance",
          "metaDescription": "EPR for waste tyres was added as Schedule IX to the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 by the Amendment…",
          "keywords": "EPR- Tyre waste, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/epr-tyre-waste"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Extended Producer's Responsibility (EPR)",
              "href": "/approval/epr-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- Used oil waste",
              "href": "/approval/epr-used-oil-waste",
              "target": "same_tab"
            },
            {
              "label": "EPR- Battery waste",
              "href": "/approval/epr-battery-waste",
              "target": "same_tab"
            },
            {
              "label": "CPCB Guidelines",
              "href": "/approval/cpcb-guidelines",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "epr-used-oil-waste",
      "matchSlugs": [
        "epr-used-oil-waste"
      ],
      "matchNames": [
        "EPR- Used oil waste"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 12,
        "originalRow": 16,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "EPR- Used oil waste",
        "menuLabel": "EPR- Used oil waste",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "Used oil EPR is part of the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 (Rule 26; Second Amendment Rules, 2023) and is effective from 1 April 2024. Producers, including manufacturers and importers of base oil and lubricating oil, collection agents, recyclers and co-processors and used oil importers must register on the CPCB used-oil EPR portal. Producers and importers meet recycling targets by buying EPR certificates from registered recyclers.\n\nWe help with registration, targets, certificate purchase and returns."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is EPR- Used oil waste?",
          "paragraphs": [
            {
              "text": "Used oil EPR makes producers and importers of base oil and lubrication oil responsible for ensuring that the used oil from their products is re-refined into base oil or recovered for energy. 'Used oil' is reprocessable oil listed in Schedule V Part A, such as spent engine, gear, hydraulic, turbine, compressor and transformer oil, while waste oil in Part B is out of scope."
            },
            {
              "text": "Re-refining is the priority route, energy recovery is for oil not suitable for recycling, and import of used oil is permitted only for re-refining. CPCB charges registration and annual maintenance fees based on volume. Producers can buy certificates up to current-year liability plus leftover liability and 10% of the current-year liability."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When did used oil EPR start?",
              "answer": "1 April 2024."
            },
            {
              "question": "Who registers?",
              "answer": "Producers, importers, collection agents and recyclers."
            },
            {
              "question": "What is the priority route?",
              "answer": "Re-refining."
            },
            {
              "question": "Can used oil be imported?",
              "answer": "Only for re-refining."
            }
          ]
        },
        "extraContent": [
          {
            "title": "EPR- Used oil waste",
            "description": "<h2>Who Needs This Service</h2>\n<p>Lubricant and base-oil manufacturers and importers, private-label oil brands, used-oil importers, re-refiners and recyclers, and used-oil collection agents need used oil EPR.</p>\n<p>Automotive service chains should check obligations.</p>\n<p>Importers of lubricants must register.</p>\n<p>If you only retail oils made by others, confirm your role.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with used oil EPR</li><li>Role-specific registration</li><li>Targets and certificates planned</li><li>Returns prepared</li><li>Avoids penalties</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, track targets. <strong>Related services:</strong> EPR overview, Tyre EPR and CPCB Guidelines.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong role registration.</li><li>Buying certificates beyond limits.</li><li>Missing returns.</li><li>Importing used oil for energy.</li><li>Ignoring volume-based fees.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Fees depend on volume.</p>\n<blockquote><strong>Practical tip:</strong> track production, import and sales volumes.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The 2023 amendments to Hazardous Waste Rules bring used oil under EPR.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A lubricant brand registers.</p>\n<h3>Scenario 2:</h3>\n<p>A re-refiner registers.</p>\n<h3>Scenario 3:</h3>\n<p>An importer registers.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>Used oil EPR planning starts by identifying the oils you make or import and the volumes placed on the market. Register on the CPCB used-oil portal as a producer, importer, collection agent or recycler and complete the role-specific form and fees, which depend on volume. Producers and importers meet recycling targets by buying EPR certificates from registered recyclers, within the limit of current-year liability plus leftover liability and 10% of the current year's liability. Used oil may be imported only for re-refining. <strong>Planning checklist:</strong> forecast volumes, contract with registered re-refiners, track certificate purchases against limits and file quarterly and annual returns.</p>\n\n<h2>Practical Guidance</h2>\n<p>Used oil EPR connects the lubricant industry to the recycling sector. Producers and importers of base oil and lubricating oil must ensure that used oil from their products is collected and re-refined, and they demonstrate this by buying EPR certificates from registered recyclers. First, identify the types of oil covered, which sources say are about sixteen categories of used oil, and compute your annual placement on the market.</p>\n<p>Register on the CPCB used-oil portal under the correct role, whether producer, importer, collection agent or recycler, and pay fees based on volumes. Observe the limits on certificate purchase: current-year liability plus leftover liability and 10 percent of the current-year liability. Remember that used oil may be imported only for re-refining, and that re-refining is the priority route with energy recovery for oil that cannot be recycled.</p>\n<p>Work with registered collection agents and recyclers, keep agreements and certificates, and file quarterly and annual returns. For businesses that run service chains or supply to industrial customers, think about how used oil will actually be collected, since a reliable collection network is the practical challenge behind the paperwork.</p>"
          }
        ],
        "seo": {
          "metaTitle": "EPR- Used oil waste | JR Compliance",
          "metaDescription": "Used oil EPR is part of the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 (Rule 26; Second Amendment Rules, 2023) and…",
          "keywords": "EPR- Used oil waste, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/epr-used-oil-waste"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Extended Producer's Responsibility (EPR)",
              "href": "/approval/epr-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- Tyre waste",
              "href": "/approval/epr-tyre-waste",
              "target": "same_tab"
            },
            {
              "label": "CPCB Guidelines",
              "href": "/approval/cpcb-guidelines",
              "target": "same_tab"
            },
            {
              "label": "Delhi Pollution Control Committee",
              "href": "/approval/delhi-pollution-control-committee",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "cpcb-guidelines",
      "matchSlugs": [
        "cpcb-guidelines"
      ],
      "matchNames": [
        "CPCB Guidelines"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 13,
        "originalRow": 17,
        "overviewSourceParagraphs": 3,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "CPCB Guidelines",
        "menuLabel": "CPCB Guidelines",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "CPCB (the Central Pollution Control Board) issues directions under Section 18(1)(b) of the Water Act, 1974 and the Air Act, 1981 that all State Pollution Control Boards and Pollution Control Committees must follow. The best-known set is the harmonised categorisation of industries into Red, Orange, Green and White based on a Pollution Index, with directions of 7 March 2016, modified on 3 June 2016 and revised in 2020, and 2025 directions also referring to a Blue category. The category decides whether an industry needs consent and how long it lasts.\n\nWe help you identify your industrial sector and sub-sector in the latest CPCB and SPCB category lists, understand the consent requirement, and plan applications for Consent to Establish and Consent to Operate. We also track new CPCB directions so that your plans do not rely on outdated lists.\n\nBecause these guidelines decide location choices, timelines and costs, understanding your category early is a smart first step for any project."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is CPCB Guidelines?",
          "paragraphs": [
            {
              "text": "CPCB guidelines on industry categorisation are statutory directions that classify industrial sectors by pollution potential using the Pollution Index (PI), a number from 0 to 100 reflecting emissions, effluents, hazardous waste generated and resource consumption. Under the criteria, a PI of 60 and above is Red, 41 to 59 is Orange, 21 to 40 is Green and up to 20 is White. The 2016 exercise created the White category, with 36 non-polluting sectors initially, which does not require Consent to Operate."
            },
            {
              "text": "As originally listed, there were 60 Red, 83 Orange, 63 Green and 36 White sectors, later expanded. No Red category industry is normally permitted in ecologically fragile or protected areas. Later CPCB directions of 30 April 2020, 12 February 2025, 23 June 2025 on harmonisation including a Blue category and 16 June 2025 on the left-over White category update the lists, and the sources reviewed do not describe the Blue category in detail.\n\nSPCBs and PCCs use these categories for consent management and location decisions. Consent fees and validity are fixed by each SPCB, not by CPCB."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What do the colours mean?",
              "answer": "Red is the most polluting (PI 60 and above), then Orange, Green and White (non-polluting)."
            },
            {
              "question": "Does White need consent?",
              "answer": "No Consent to Operate; many states need only an undertaking."
            },
            {
              "question": "Who sets consent fees?",
              "answer": "Each SPCB or PCC."
            },
            {
              "question": "Is there a Blue category?",
              "answer": "2025 directions refer to one, but details were not retrieved."
            }
          ]
        },
        "extraContent": [
          {
            "title": "CPCB Guidelines",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturing and service units planning a new plant or expansion, environmental consultants and managers, project developers, and local authorities and regulators who classify industries and issue consents need to understand CPCB's categorisation.</p>\n<p>Entrepreneurs choosing a site should know whether their activity is Red, Orange, Green or White, since it affects permissions, time and cost.</p>\n<p>Existing units should check whether the category of their sector has changed in recent directions.</p>\n<p>If your activity is not clearly listed, an expert review can help determine the correct category.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Clear understanding of your pollution category</li><li>Consent requirement mapped before you invest</li><li>Awareness of the latest CPCB directions</li><li>Better site and project planning</li><li>Reduced risk of non-compliance</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After identifying the category, apply for consent. <strong>Related services:</strong> State Pollution Board consent, DPCC consent and EPR services.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Using outdated category lists.</li><li>Assuming one list applies unchanged in all states.</li><li>Ignoring location restrictions.</li><li>Starting construction without consent.</li><li>Mislabelling the sector.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Category determination is quick with the right list.</p>\n<blockquote><strong>Practical tip:</strong> check both CPCB and your SPCB's latest lists.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Section 18(1)(b) of the Water and Air Acts allows CPCB to issue binding directions. Harmonised categories were created to make consent management uniform.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A startup checks its category before choosing a site.</p>\n<h3>Scenario 2:</h3>\n<p>A unit confirms it is White.</p>\n<h3>Scenario 3:</h3>\n<p>A manufacturer finds that its sector moved category.</p>\n\n<h2>Practical Guidance</h2>\n<p>Industry categorisation looks technical, but it drives practical decisions. If your sector is Red, expect a more detailed consent process, tighter conditions and more scrutiny of pollution control equipment. If it is Orange, consent is still required but conditions are typically lighter. Green units usually have simpler processes, and White units may only need an intimation. The categories also influence where you can locate a plant, since Red industries are restricted in ecologically sensitive areas.</p>\n<p>When planning a project, check the category of your exact activity, because sub-sectors within the same industry can sit in different categories. Look at both the CPCB list and your state's list, which adopts the categories through its own order. Remember that lists are revised: 2020 and 2025 directions have updated them, and the 2025 directions refer to a Blue category whose details were not retrieved. Build a note into your project plan to re-check the category before applying for consent and before expansion.</p>"
          }
        ],
        "seo": {
          "metaTitle": "CPCB Guidelines | JR Compliance",
          "metaDescription": "CPCB (the Central Pollution Control Board) issues directions under Section 18(1)(b) of the Water Act, 1974 and the Air Act, 1981 that all State…",
          "keywords": "CPCB Guidelines, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/cpcb-guidelines"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "State Pollution Board / Pollution Control Committee",
              "href": "/approval/state-pollution-board-pollution-control-committee",
              "target": "same_tab"
            },
            {
              "label": "Delhi Pollution Control Committee",
              "href": "/approval/delhi-pollution-control-committee",
              "target": "same_tab"
            },
            {
              "label": "Extended Producer's Responsibility (EPR)",
              "href": "/approval/epr-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- E waste",
              "href": "/approval/epr-e-waste",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "delhi-pollution-control-committee",
      "matchSlugs": [
        "delhi-pollution-control-committee"
      ],
      "matchNames": [
        "Delhi Pollution Control Committee"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 14,
        "originalRow": 18,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Delhi Pollution Control Committee",
        "menuLabel": "Delhi Pollution Control Committee",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "The Delhi Pollution Control Committee (DPCC) is Delhi's pollution control authority under the Water Act, 1974 and the Air Act, 1981. Industries classified Red, Orange or Green must obtain Consent to Establish and then Consent to Operate before running, while White category units submit an undertaking online, with a signed copy within 30 days. DPCC's functions page says Consent to Operate and renewal is granted for 5 years for Red and Orange and 10 years for Green. Applications are online, and a recent notice says new applications have moved to CPCB's UCAMS portal.\n\nWe prepare the application, process description, water and effluent and emission details, premises documents and fee, file online, handle scrutiny and inspection and obtain CTE and CTO. We also help with renewal and compliance conditions."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Delhi Pollution Control Committee?",
          "paragraphs": [
            {
              "text": "DPCC consent is the statutory permission, popularly called pollution NOC, granted by DPCC to industrial units in Delhi that discharge effluents or emit air pollutants. Consent to Establish is needed before construction or installation and Consent to Operate after pollution control systems are built and verified. No CTO is granted until CTE is obtained. DPCC also handles authorisations under waste rules and registrations under the Plastic Waste Management Rules."
            },
            {
              "text": "Industry must be permissible under the Delhi Master Plan land use. Validity statements differ: DPCC's page says 5 years for Red and Orange and 10 years for Green, while third-party sites state other combinations, and DPCC issued an office order of 14 March 2023 on validity. One source says Red category units are not given consent in Delhi, while DPCC pages say Red units apply for consent. Auto-renewal with self-certification was introduced by an office order of 18 June 2021."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What consents are needed?",
              "answer": "Consent to Establish and Consent to Operate for Red, Orange and Green units."
            },
            {
              "question": "What do White units do?",
              "answer": "File an online undertaking."
            },
            {
              "question": "How long is CTO valid?",
              "answer": "DPCC says 5 years for Red and Orange and 10 years for Green; confirm the current order."
            },
            {
              "question": "Where are applications filed?",
              "answer": "Online; a notice says new applications have moved to CPCB's UCAMS portal."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Delhi Pollution Control Committee",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, workshops, hospitals, hotels, building projects and other units in Delhi that fall under Red, Orange or Green categories, and White category units that must file the online undertaking, need DPCC consent.</p>\n<p>Startups setting up small units in Delhi should check Master Plan permissibility first.</p>\n<p>Existing units should keep consent valid and renew on time.</p>\n<p>If you are moving to Delhi from another state, a fresh consent is needed.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Correct category and consent path in Delhi</li><li>Documents and technical details prepared</li><li>Online application handled</li><li>Inspection and scrutiny support</li><li>Renewal reminders</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After CTO, comply with consent conditions. <strong>Related services:</strong> CPCB Guidelines, State Pollution Board consent, EPR registrations and Trade License.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Starting operations without CTO.</li><li>Ignoring Master Plan land use.</li><li>Relying on conflicting validity information.</li><li>Missing renewal.</li><li>Weak documentation.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>DPCC processing depends on category and inspection.</p>\n<blockquote><strong>Practical tip:</strong> confirm the current portal before applying.</blockquote>\n\n<h2>Additional Information</h2>\n<p>DPCC enforces the Water and Air Acts in Delhi through consent management.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A factory in an industrial area applies.</p>\n<h3>Scenario 2:</h3>\n<p>A hospital gets consent.</p>\n<h3>Scenario 3:</h3>\n<p>A White unit files an undertaking.</p>\n\n<h2>Practical Guidance</h2>\n<p>Delhi has particular features that applicants should understand. Land use is governed by the Delhi Master Plan, so a unit must be located where its activity is permitted before DPCC will consider consent. DPCC's pages describe consent committees whose composition depends on the category, and the process includes scrutiny of documents and, where needed, inspection. Applicants should prepare process descriptions, water consumption and effluent details, air emission sources and pollution control equipment, and proof of premises.</p>\n<p>Validity statements vary: DPCC's functions page indicates 5 years for Red and Orange and 10 years for Green, while other sites describe different periods, and DPCC issued an order on 14 March 2023 regarding validity. DPCC also introduced auto-renewal with self-certification by an office order of 18 June 2021. Because portals have changed, with a notice indicating that new applications move to CPCB's UCAMS platform, confirm the current submission channel. Once consent is granted, comply with the conditions, such as monitoring, record-keeping and operation of pollution control devices, and apply for renewal in good time.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Delhi Pollution Control Committee | JR Compliance",
          "metaDescription": "The Delhi Pollution Control Committee (DPCC) is Delhi's pollution control authority under the Water Act, 1974 and the Air Act, 1981. Industries…",
          "keywords": "Delhi Pollution Control Committee, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/delhi-pollution-control-committee"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "CPCB Guidelines",
              "href": "/approval/cpcb-guidelines",
              "target": "same_tab"
            },
            {
              "label": "State Pollution Board / Pollution Control Committee",
              "href": "/approval/state-pollution-board-pollution-control-committee",
              "target": "same_tab"
            },
            {
              "label": "Extended Producer's Responsibility (EPR)",
              "href": "/approval/epr-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- E waste",
              "href": "/approval/epr-e-waste",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "pollution-advisory-page",
      "proposedSlug": "state-pollution-board-pollution-control-committee",
      "matchSlugs": [
        "state-pollution-board-pollution-control-committee"
      ],
      "matchNames": [
        "State Pollution Board / Pollution Control Committee"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 15,
        "originalRow": 19,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "State Pollution Board / Pollution Control Committee",
        "menuLabel": "State Pollution Board / Pollution Control Committee",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "Pollution Advisory",
          "description": "Every state has a State Pollution Control Board (SPCB), and Union Territories have Pollution Control Committees (PCCs), which grant Consent to Establish under Sections 25 and 26 of the Water Act, 1974 and Section 21 of the Air Act, 1981, followed by Consent to Operate before production begins. Red, Orange and Green category units need both; White category units are largely exempt, with an intimation or undertaking in some states. Fees, validity and portals are state-specific.\n\nWe identify the right SPCB and portal, prepare project, process, water and effluent and air emission documents, file CTE and CTO, handle inspection and obtain the consent."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is State Pollution Board / Pollution Control Committee?",
          "paragraphs": [
            {
              "text": "A State Pollution Control Board or Committee is the statutory body that regulates pollution in a state or UT and issues consent, commonly called pollution NOC, to industries and projects that could discharge effluents or emit air pollutants. CTE is a prior approval required before construction or installation, while CTO is granted after the unit's pollution control arrangements are verified. Consent is distinct from Environmental Clearance under the EIA notification, which applies to listed large projects."
            },
            {
              "text": "Validity varies by state and category. Sources give Red 5 years and Orange 10 years in one place, a 3, 2, 1 year schedule in Maharashtra and 'Red shortest, Green longest' elsewhere. Fees are prescribed by each SPCB based on category and capital cost slab, and sometimes water consumption or capacity. Many states now use CPCB's UCAMS portal."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What are CTE and CTO?",
              "answer": "Consent to Establish before construction and Consent to Operate before production."
            },
            {
              "question": "Who issues them?",
              "answer": "The State Pollution Control Board or Committee."
            },
            {
              "question": "Is consent the same as environmental clearance?",
              "answer": "No, EC applies to listed large projects."
            },
            {
              "question": "Do fees vary?",
              "answer": "Yes, by state."
            }
          ]
        },
        "extraContent": [
          {
            "title": "State Pollution Board / Pollution Control Committee",
            "description": "<h2>Who Needs This Service</h2>\n<p>Factories, processing units, hospitals, hotels, real estate and infrastructure projects, and any unit whose activity falls under Red, Orange or Green categories need consent.</p>\n<p>Startups setting up manufacturing should plan consent before construction.</p>\n<p>Units that expand capacity need consent amendments.</p>\n<p>If your activity is White, confirm whether an intimation is needed.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Correct CTE and CTO path for your state</li><li>Process and pollution documents prepared</li><li>Portal filing and inspection support</li><li>Condition compliance guidance</li><li>Renewal tracking</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After CTO, comply with discharge and emission limits. <strong>Related services:</strong> CPCB Guidelines, DPCC consent, EPR services and Trade License.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Starting production before CTO.</li><li>Wrong category.</li><li>Not installing pollution control as declared.</li><li>Missing renewal.</li><li>Ignoring state portal changes.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on category and inspection.</p>\n<blockquote><strong>Practical tip:</strong> prepare water balance and emission details early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Water and Air Acts require consent before industries discharge pollutants.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A textile unit applies for CTE.</p>\n<h3>Scenario 2:</h3>\n<p>A hotel obtains CTO.</p>\n<h3>Scenario 3:</h3>\n<p>A project renews consent.</p>\n\n<h2>Practical Guidance</h2>\n<p>A state consent application should be built like a technical file. Start with the project description: location, land documents, products and capacity. Add the process flow chart and material balance, a water balance showing sources, consumption and effluent generation, a description of effluent treatment or sewage treatment arrangements, air emission sources with stack details and control equipment, and hazardous waste details if applicable. Include the capital cost, because fees are often linked to cost slabs.</p>\n<p>Expect scrutiny at the regional office and, for Red and Orange units, review by a consent appraisal committee. Be prepared for an inspection both before granting CTE and before CTO. After CTE you must construct the unit as declared and install pollution control equipment; the CTO inspection checks that what was approved has actually been built. Consent conditions typically limit water use, discharges and emissions, and require records and periodic reporting. Renew before expiry, and apply for amendments if you expand capacity, change products or alter processes, because operating outside consent conditions can lead to penalties or closure directions.</p>"
          }
        ],
        "seo": {
          "metaTitle": "State Pollution Board / Pollution Control Committee | JR Compliance",
          "metaDescription": "Every state has a State Pollution Control Board (SPCB), and Union Territories have Pollution Control Committees (PCCs), which grant Consent to…",
          "keywords": "State Pollution Board / Pollution Control Committee, Pollution Advisory, JR Compliance",
          "canonicalUrl": "/approval/state-pollution-board-pollution-control-committee"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "CPCB Guidelines",
              "href": "/approval/cpcb-guidelines",
              "target": "same_tab"
            },
            {
              "label": "Delhi Pollution Control Committee",
              "href": "/approval/delhi-pollution-control-committee",
              "target": "same_tab"
            },
            {
              "label": "Extended Producer's Responsibility (EPR)",
              "href": "/approval/epr-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- E waste",
              "href": "/approval/epr-e-waste",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "telecommunication-engineering-centre-page",
      "proposedSlug": "dot-certification",
      "matchSlugs": [
        "dot-certification"
      ],
      "matchNames": [
        "DOT Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 16,
        "originalRow": 23,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "DOT Certification",
        "menuLabel": "DOT Certification",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Telecommunication Engineering Centre (TEC)",
          "description": "'DOT certification' is not a single certificate. For telecom equipment it normally means the Department of Telecommunications' mandatory testing and certification regime: MTCTE conformity certification by the Telecommunication Engineering Centre (TEC), security certification by the National Centre for Communication Security (NCCS), and, for radio equipment and licences, approvals from the Wireless Planning and Coordination (WPC) wing such as ETA. The DoT rule is that every telecom equipment must undergo mandatory testing and certification before sale, import or use in India.\n\nWe identify which approvals apply to your product and plan them together."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is DOT Certification?",
          "paragraphs": [
            {
              "text": "DoT certification covers the compliance routes through which telecom equipment is approved for the Indian market: conformity to Essential Requirements (MTCTE, TEC), security assurance against ITSAR (NCCS ComSec scheme) and wireless or spectrum-related approvals (WPC). The Indian Telegraph (Amendment) Rules, 2017 made mandatory testing and certification a condition for sale, import or use, and the Telecommunications Act, 2023 and the 2025 Framework Rules now prescribe a Certificate of Conformity Assessment."
            },
            {
              "text": "Applications may require test reports from TEC-designated labs, security reports from TSTLs, and wireless approvals depending on whether the equipment uses licence-exempt bands."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is DOT certification one certificate?",
              "answer": "No, it is an umbrella of MTCTE, NCCS and WPC approvals."
            },
            {
              "question": "Who certifies conformity?",
              "answer": "TEC under MTCTE."
            },
            {
              "question": "Who certifies security?",
              "answer": "NCCS under ITSAR."
            },
            {
              "question": "Which wireless approval applies?",
              "answer": "ETA for licence-exempt bands, plus licences where needed."
            }
          ]
        },
        "extraContent": [
          {
            "title": "DOT Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Telecom equipment manufacturers, importers and brands (routers, switches, IoT, CPE, base stations), e-commerce sellers and system integrators need to plan DoT approvals.</p>\n<p>Startups designing connected devices should check which approvals apply.</p>\n<p>Importers should ensure suppliers hold valid certificates.</p>\n<p>If your product is wireless, WPC approvals are also relevant.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Clear roadmap across TEC, NCCS and WPC</li><li>Right approvals identified</li><li>Documents and labs coordinated</li><li>Faster market entry</li><li>Reduced compliance risk</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After mapping, start with MTCTE and ETA. <strong>Related services:</strong> TEC Certification, MTCTE, NCCS, ETA and CRS.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Assuming one certificate covers everything.</li><li>Skipping security certification.</li><li>Using unrecognised labs.</li><li>Importing before approvals.</li><li>Ignoring wireless approvals.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on lab testing.</p>\n<blockquote><strong>Practical tip:</strong> plan lab slots early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The 2017 Telegraph Rules and the Telecommunications Act, 2023 underpin certification.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A router maker maps approvals.</p>\n<h3>Scenario 2:</h3>\n<p>An IoT startup checks ETA and MTCTE.</p>\n<h3>Scenario 3:</h3>\n<p>An importer verifies supplier certificates.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>A practical DoT approvals plan starts with a product map. Decide whether the product is telecom equipment covered by MTCTE, whether it carries security functions that fall under an ITSAR, and whether it radiates in licence-exempt or licensed bands. Then sequence the work: register on the MTCTE portal, test at a TEC-designated lab, obtain the TEC certificate, apply to NCCS if security certification applies, and obtain ETA or licences from WPC. <strong>Planning checklist:</strong> book lab slots early, keep model and series details consistent across applications, plan labels and packaging, brief your importer on the certificates required at customs and monitor notifications for new equipment categories.</p>\n\n<h2>Practical Guidance</h2>\n<p>Approaching DoT compliance in a structured way saves months. Create a matrix with your products in rows and the relevant approvals in columns: MTCTE (TEC), security certification (NCCS), ETA or licences (WPC) and any BIS requirement such as CRS for electronics. For each cell, note whether it applies, which authority issues it, what testing is needed and how long it takes. This simple tool reveals the critical path and helps you schedule lab bookings.</p>\n<p>Remember that the regime has been evolving. The Telecommunications Act, 2023 and the 2025 Framework Rules provide for a Certificate of Conformity Assessment, while MTCTE procedures have been amended, most recently in version 3.0. Wireless possession and licensing has also been changing, with DoT notices in 2026 about authorisations replacing older licences. Build a monitoring habit: check the DoT eServices, TEC and NCCS pages regularly. Finally, think about supply chain: if you import, make sure your overseas manufacturer supplies the technical files and test reports you will need, and that your importer-of-record understands the certificates required at customs.</p>"
          }
        ],
        "seo": {
          "metaTitle": "DOT Certification | JR Compliance",
          "metaDescription": "'DOT certification' is not a single certificate. For telecom equipment it normally means the Department of Telecommunications' mandatory testing and…",
          "keywords": "DOT Certification, Telecommunication Engineering Centre, JR Compliance",
          "canonicalUrl": "/approval/dot-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "TEC Certification",
              "href": "/approval/tec-certification",
              "target": "same_tab"
            },
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "NCCS Certification",
              "href": "/approval/nccs-certification",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "telecommunication-engineering-centre-page",
      "proposedSlug": "tec-certification",
      "matchSlugs": [
        "tec-certification"
      ],
      "matchNames": [
        "TEC Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 17,
        "originalRow": 24,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "TEC Certification",
        "menuLabel": "TEC Certification",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Telecommunication Engineering Centre (TEC)",
          "description": "TEC certification is the conformity certificate issued by the Telecommunication Engineering Centre, which functions under DoT as the Telegraph Authority for administering the Mandatory Testing and Certification of Telecom Equipment (MTCTE) procedure. Any OEM, importer or dealer who wants to sell or import telecom equipment in India must obtain the certificate and affix the certification label. TEC also has voluntary routes such as the Certificate of Approval.\n\nWe register you on the MTCTE portal, choose the right scheme, coordinate TEC-designated labs, file the application with fees, and follow through to the certificate."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is TEC Certification?",
          "paragraphs": [
            {
              "text": "A TEC certificate states that a model of telecom equipment has been tested by a TEC-designated lab against TEC's Essential Requirements (ERs) and complies with them. The ERs cover areas such as safety, EMI/EMC, technical parameters and security aspects. Certification is issued per model after TEC evaluates the test report. TEC also issues generic and interface requirements and designates testing labs."
            },
            {
              "text": "Under the amended MTCTE procedure v3.0 (TEC 93009:2024), certification becomes effective from the date mandatory testing is notified for that equipment or six months from the certificate issue, whichever is later. Two schemes are listed: General Certification Scheme and Simplified Certification Scheme. Fees are prescribed in the procedure."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who issues TEC certificates?",
              "answer": "The Telecommunication Engineering Centre."
            },
            {
              "question": "What schemes exist?",
              "answer": "General and Simplified Certification Schemes."
            },
            {
              "question": "Who tests?",
              "answer": "TEC-designated labs."
            },
            {
              "question": "Is a label required?",
              "answer": "Yes, certified equipment carries the certification label."
            }
          ]
        },
        "extraContent": [
          {
            "title": "TEC Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>OEMs, importers and dealers of telecom and networking equipment such as routers, switches, modems, CPE, IoT gateways, base stations and optical equipment need TEC certification.</p>\n<p>Brands selling through marketplaces should ensure certificates.</p>\n<p>Startups building networking products should plan testing.</p>\n<p>If your product is not on the MTCTE list, confirm.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Right MTCTE scheme chosen</li><li>Lab testing coordinated</li><li>Portal filing and fees handled</li><li>Certificate for your model</li><li>Smooth import and sale</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After the certificate, affix labels and manage modifications. <strong>Related services:</strong> MTCTE, NCCS, ETA, CRS and DOT Certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong scheme choice.</li><li>Unrecognised labs.</li><li>Missing model details.</li><li>Ignoring modifications.</li><li>Selling before certification.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing and evaluation take time.</p>\n<blockquote><strong>Practical tip:</strong> pick the lab and model list early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>TEC administers MTCTE under the Telegraph Rules and the Telecommunications Act.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A router brand obtains TEC certificates.</p>\n<h3>Scenario 2:</h3>\n<p>An importer certifies switches.</p>\n<h3>Scenario 3:</h3>\n<p>A startup certifies an IoT gateway.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To obtain a TEC certificate, first confirm that your product appears on the MTCTE list under either the General or the Simplified Certification Scheme and identify the Essential Requirements for it. Register on the MTCTE portal as an OEM, importer or dealer, send samples to a TEC-designated lab, and upload the lab's test report with the application and fees. TEC evaluates the file and issues the certificate for the model, after which you affix the certification label. <strong>Planning checklist:</strong> finalise hardware before testing, group models into series where the procedure allows, keep technical documents consistent, plan for modifications and renewal and keep copies of certificates for customs and marketplaces.</p>\n\n<h2>Practical Guidance</h2>\n<p>A TEC certification project works best when engineering and compliance teams collaborate. Engineering should freeze the hardware and firmware version to be tested, because changes after testing can invalidate the report. Compliance should map the Essential Requirements for the product category, choose the scheme, and book the TEC-designated lab. Provide the lab with clear model information, accessories and configuration so that the test report matches the product you will sell.</p>\n<p>During application, ensure that company details, model names and series information are consistent across the portal entries, the test reports and the labels. Pay attention to variants: if you sell several models, check whether the procedure allows grouping them in a series so you do not need to retest each. After certification, apply the TEC certification label as required and keep records. Plan for modifications: if you change components, software or design, check whether you must notify TEC, apply for a modification or retest. Finally, keep track of renewal and surveillance requirements, and make sure marketplaces and distributors have copies of the certificate.</p>"
          }
        ],
        "seo": {
          "metaTitle": "TEC Certification | JR Compliance",
          "metaDescription": "TEC certification is the conformity certificate issued by the Telecommunication Engineering Centre, which functions under DoT as the Telegraph…",
          "keywords": "TEC Certification, Telecommunication Engineering Centre, JR Compliance",
          "canonicalUrl": "/approval/tec-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "NCCS Certification",
              "href": "/approval/nccs-certification",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "telecommunication-engineering-centre-page",
      "proposedSlug": "mtcte-certification",
      "matchSlugs": [
        "mtcte-certification"
      ],
      "matchNames": [
        "MTCTE Certification",
        "MTCTE"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 18,
        "originalRow": 25,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "MTCTE Certification",
        "menuLabel": "MTCTE Certification",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Telecommunication Engineering Centre (TEC)",
          "description": "MTCTE (Mandatory Testing and Certification of Telecom Equipment) is the scheme formulated by DoT in October 2018 and launched on 1 October 2019, under which telecom equipment must be tested for TEC's Essential Requirements and certified before sale, import or use. The current procedure is the amended MTCTE Procedure v3.0 (TEC 93009:2024). Applications are made on the MTCTE portal and approved by TEC after designated labs submit test reports.\n\nWe guide you through scheme selection, test planning, application and follow-up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is MTCTE Certification?",
          "paragraphs": [
            {
              "text": "MTCTE is the mandatory conformity-assessment framework for telecom equipment in India. It is administered by TEC under the Indian Telegraph (Amendment) Rules, 2017 and now sits within the Telecommunications Act, 2023 framework, including the Telecommunications (Framework to Notify Standards, Conformity Assessment and Certification) Rules, 2025, which prescribe a Certificate of Conformity Assessment."
            },
            {
              "text": "Testing is against TEC Essential Requirements in areas such as safety, EMI/EMC, technical requirements, with security requirements handled separately by NCCS. Certification can be provisional or full, and the procedure covers modification, renewal, surveillance and non-conformity actions. Special criteria exist for routers, LAN switches, DWDM and base stations."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When did MTCTE start?",
              "answer": "Launched on 1 October 2019."
            },
            {
              "question": "What is the current procedure?",
              "answer": "MTCTE Procedure v3.0 (TEC 93009:2024)."
            },
            {
              "question": "Who tests?",
              "answer": "TEC-designated labs."
            },
            {
              "question": "Is it mandatory?",
              "answer": "Yes, for notified equipment."
            }
          ]
        },
        "extraContent": [
          {
            "title": "MTCTE Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers and importers of telecom and networking equipment, including IoT and CPE, seeking to sell in India need MTCTE.</p>\n<p>Dealers and e-commerce sellers must ensure certification.</p>\n<p>Startups need to plan for testing time.</p>\n<p>If your equipment is listed in phases, check the notification dates.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with mandatory certification</li><li>Essential Requirements mapped</li><li>Lab testing coordinated</li><li>Certificates for your models</li><li>Reduced customs and market risk</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After MTCTE, manage renewals and surveillance. <strong>Related services:</strong> TEC Certification, NCCS, ETA and DOT Certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Importing untested equipment.</li><li>Missing model variants.</li><li>Wrong scheme.</li><li>Ignoring surveillance.</li><li>Late renewal.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Allow time for testing and evaluation.</p>\n<blockquote><strong>Practical tip:</strong> plan test samples in advance.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MTCTE ensures safety and security of telecom equipment connected to Indian networks.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A modem maker certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A distributor checks certificates.</p>\n<h3>Scenario 3:</h3>\n<p>A brand modifies a model.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>MTCTE planning is about sequencing and documentation. Start by reading the amended procedure v3.0 (TEC 93009:2024) and the user instructions, then identify the scheme, the Essential Requirements and the designated labs. Prepare the product and model details, test at an approved lab, submit the report with the application and fees and respond to TEC's queries. Certification becomes effective from the date mandatory testing is notified for that equipment or six months from issue, whichever is later. <strong>Planning checklist:</strong> check the notified equipment list regularly, keep series details accurate, plan surveillance and modification requests and brief customs brokers on the certificates needed for import.</p>\n\n<h2>Practical Guidance</h2>\n<p>MTCTE is easiest to manage when you understand its logic. TEC defines Essential Requirements for each equipment category, designated labs test against them, and TEC certifies the model. The amended procedure v3.0 (TEC 93009:2024) and the user instructions describe each step, from registration and sample submission to evaluation, certification, modification and surveillance. Equipment is brought under mandatory certification in phases through notifications, so your product may be on the list now or added later.</p>\n<p>For planning, find out whether your product is already notified and the date from which certification is mandatory. Certification becomes effective from that date or six months from the certificate issue, whichever is later, so timing can affect when you can sell. Choose a lab with the right scope, ask for a realistic test schedule and plan for the possibility of failures and retesting. DoT clarifications cover special cases such as routers, LAN switches, DWDM and base stations, so check them if your product falls in these categories. Maintain a technical file with test reports, models and labels, and keep it available for customs, marketplaces and surveillance.</p>"
          }
        ],
        "seo": {
          "metaTitle": "MTCTE Certification | JR Compliance",
          "metaDescription": "MTCTE (Mandatory Testing and Certification of Telecom Equipment) is the scheme formulated by DoT in October 2018 and launched on 1 October 2019, under…",
          "keywords": "MTCTE Certification, Telecommunication Engineering Centre, JR Compliance",
          "canonicalUrl": "/approval/mtcte-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "TEC Certification",
              "href": "/approval/tec-certification",
              "target": "same_tab"
            },
            {
              "label": "NCCS Certification",
              "href": "/approval/nccs-certification",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "DOT Certification",
              "href": "/approval/dot-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "telecommunication-engineering-centre-page",
      "proposedSlug": "nccs-certification",
      "matchSlugs": [
        "nccs-certification"
      ],
      "matchNames": [
        "NCCS Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 19,
        "originalRow": 26,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "NCCS Certification",
        "menuLabel": "NCCS Certification",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Telecommunication Engineering Centre (TEC)",
          "description": "NCCS (the National Centre for Communication Security, a DoT centre in Bengaluru) runs the Communication Security Certification Scheme (ComSec) for security certification of telecom equipment against Indian Telecom Security Assurance Requirements (ITSAR). Equipment is tested in NCCS-designated Telecom Security Testing Laboratories (TSTLs), and NCCS evaluates reports and issues the security certificate, which since a 14 September 2023 amendment is valid for ten years, earlier five, subject to ITSAR compliance.\n\nWe identify the ITSAR, prepare the application and coordinate TSTL testing."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is NCCS Certification?",
          "paragraphs": [
            {
              "text": "NCCS certification is security assurance for telecom products. ITSARs are country-specific security requirements developed by NCCS for each type of equipment, for example firewall, SIM and eUICC, operating system, cryptographic controls and 5G lawful interception systems, with more drafts for routers, Wi-Fi CPE, smart meters and cameras. The scheme covers equipment, not modules or components, to be sold in India and complements MTCTE conformity testing."
            },
            {
              "text": "A model is certified individually, and each independent equipment needs separate certification. Some models can be certified without testing on specified conditions. Renewal gives a fresh certificate for another ten years."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long is the certificate valid?",
              "answer": "Ten years after a 14 September 2023 amendment."
            },
            {
              "question": "Who tests?",
              "answer": "NCCS-designated TSTLs."
            },
            {
              "question": "What does it cover?",
              "answer": "Equipment, not modules."
            },
            {
              "question": "Is it separate from MTCTE?",
              "answer": "Yes, it complements it."
            }
          ]
        },
        "extraContent": [
          {
            "title": "NCCS Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Telecom equipment OEMs and importers, including core network, CPE, routers, firewalls, SIM and eUICC, IoT, smart meters and cameras as ITSARs are enforced, and labs seeking TSTL designation need NCCS certification.</p>\n<p>Vendors selling to telecom operators should plan for it.</p>\n<p>Startups building secure devices should check ITSAR coverage.</p>\n<p>If your product is not yet covered, monitor enforcement.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Security assurance against ITSAR</li><li>Ten-year certificate validity</li><li>TSTL testing coordinated</li><li>Application support</li><li>Market access</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After NCCS certification, maintain compliance with ITSAR updates. <strong>Related services:</strong> MTCTE, TEC Certification, ETA and DOT Certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong ITSAR.</li><li>Unapproved lab.</li><li>Ignoring variants.</li><li>Assuming MTCTE covers security.</li><li>Missing renewal.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing time depends on ITSAR.</p>\n<blockquote><strong>Practical tip:</strong> confirm the ITSAR early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>ComSec enhances trust in telecom networks through security certification.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A firewall vendor certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A CPE maker tests.</p>\n<h3>Scenario 3:</h3>\n<p>A lab seeks TSTL status.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For NCCS security certification, begin by finding the ITSAR that applies to your equipment type and checking whether it is enforced. Apply to NCCS under the security certification procedure with product details, select an NCCS-designated TSTL, and let the lab test the product against the ITSAR. NCCS reviews the lab reports and issues the certificate, valid for ten years after the 2023 amendment, subject to continued compliance. <strong>Planning checklist:</strong> design security features to the ITSAR from the start, keep firmware versions controlled, plan retesting when major changes occur and diarise renewal well before the ten years end.</p>\n\n<h2>Practical Guidance</h2>\n<p>Security certification is a design question as much as a testing one. ITSARs define security requirements for each equipment type, such as authentication, access control, cryptography, logging and secure update. If your engineering team builds to these requirements from the start, testing is smoother and cheaper. If you wait until the product is complete, you may need redesign.</p>\n<p>Select an NCCS-designated TSTL with scope for your ITSAR and discuss the test plan. The lab performs tests and sends reports to NCCS, which evaluates them and issues the certificate. Since the 14 September 2023 amendment, certificates are valid for ten years, subject to continued ITSAR compliance, so you must also manage product updates. When you issue new software versions or change hardware, assess whether the change affects certified functions and whether NCCS needs to be informed or the product retested.</p>\n<p>Also coordinate with MTCTE, since TEC conformity and NCCS security are separate processes with different evidence. Keep a security documentation set, including architecture, test results, vulnerability handling procedures and update policies, because buyers and regulators may ask for them.</p>"
          }
        ],
        "seo": {
          "metaTitle": "NCCS Certification | JR Compliance",
          "metaDescription": "NCCS (the National Centre for Communication Security, a DoT centre in Bengaluru) runs the Communication Security Certification Scheme (ComSec) for…",
          "keywords": "NCCS Certification, Telecommunication Engineering Centre, JR Compliance",
          "canonicalUrl": "/approval/nccs-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "TEC Certification",
              "href": "/approval/tec-certification",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "DOT Certification",
              "href": "/approval/dot-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "wireless-planning-coordination-page",
      "proposedSlug": "eta",
      "matchSlugs": [
        "eta"
      ],
      "matchNames": [
        "ETA"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 20,
        "originalRow": 31,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "ETA",
        "menuLabel": "ETA",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Wireless Planning and Coordination (WPC)",
          "description": "ETA (Equipment Type Approval) is the WPC wing's approval for wireless and RF devices operating in licence-exempt (de-licensed) frequency bands such as 2.4 GHz and 5 GHz Wi-Fi and Bluetooth, 865 to 867 MHz RFID and the 26.957 to 27.383 MHz citizen band. It is applied for on the Saral Sanchar portal and is needed before importing, manufacturing or selling such devices. For many categories, a self-declaration ETA and a system-generated import undertaking replaced the earlier scrutiny-based process.\n\nWe check the product's frequency band against the National Frequency Allocation Plan, register on Saral Sanchar, prepare the datasheet, RF test report, manuals and undertaking, file the application, handle queries and obtain the ETA certificate for use in import and sale. Sources conflict on the fee, with one saying about Rs 10,000 and another saying no government fee when the RF report comes from an accredited foreign lab, so we confirm the position at filing."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ETA?",
          "paragraphs": [
            {
              "text": "Equipment Type Approval is a certificate from DoT's Wireless Planning and Coordination Wing confirming that a model of wireless equipment conforms to the technical norms for the licence-exempt band in which it works, so it can be sold and imported without an individual spectrum licence. It is different from the WPC import licence, which is permission to import wireless equipment, and from TEC's MTCTE certificate, which confirms conformity to Essential Requirements."
            },
            {
              "text": "Typical documents are the product technical datasheet showing frequency range, power and specifications, a user manual and photographs, a test report for the RF parameters from an accredited lab, including foreign ILAC-accredited labs per consultants, a self-declaration, GST or IEC for importers and an authorised Indian representative for foreign manufacturers. Approval time quoted by consultants is roughly 15 to 30 working days."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What devices need ETA?",
              "answer": "Wireless devices in licence-exempt bands such as Wi-Fi, Bluetooth and RFID."
            },
            {
              "question": "Where is it applied?",
              "answer": "On the Saral Sanchar portal."
            },
            {
              "question": "What is the fee?",
              "answer": "Sources conflict; confirm at filing."
            },
            {
              "question": "Is ETA the same as MTCTE?",
              "answer": "No, MTCTE is TEC's conformity certification."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ETA",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, importers and sellers of Wi-Fi routers, Bluetooth devices, wireless keyboards and earbuds, smart home devices, RFID products, drones and walkie-talkies in licence-exempt bands need ETA.</p>\n<p>E-commerce sellers of imported wireless gadgets must ensure suppliers hold ETA.</p>\n<p>Startups designing connected products should plan ETA with MTCTE.</p>\n<p>If your device operates in licensed bands, a separate licence is needed.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal sale and import of licence-exempt wireless devices</li><li>Frequency band check and documents prepared</li><li>Saral Sanchar filing handled</li><li>ETA certificate for customs and sale</li><li>Reduced shipment delays</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After ETA, apply for MTCTE where needed and import with undertakings. <strong>Related services:</strong> MTCTE, CRS, IEC Code and DOT Certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong frequency band assumptions.</li><li>Using non-accredited reports.</li><li>Missing manuals and datasheets.</li><li>Importing before approval.</li><li>Confusing ETA and licences.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Consultants quote 15 to 30 working days.</p>\n<blockquote><strong>Practical tip:</strong> keep an RF test report ready.</blockquote>\n\n<h2>Additional Information</h2>\n<p>WPC regulates radio equipment under the Indian Wireless Telegraphy framework.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A router importer obtains ETA.</p>\n<h3>Scenario 2:</h3>\n<p>A smart-bulb maker certifies.</p>\n<h3>Scenario 3:</h3>\n<p>An RFID vendor applies.</p>\n\n<h2>Practical Guidance</h2>\n<p>ETA depends on understanding which frequency bands are exempt from licensing. The National Frequency Allocation Plan and DoT orders list bands that can be used without an individual licence, such as 2.4 GHz and 5 GHz for Wi-Fi and Bluetooth, 865 to 867 MHz for RFID and the citizen band. If your device operates in those bands within prescribed power limits, it needs ETA rather than a spectrum licence.</p>\n<p>Prepare the application carefully. The datasheet should state frequency range, output power, modulation and antenna details. The test report should demonstrate compliance with the technical limits. If the test report comes from a foreign accredited lab, check whether it is accepted under current rules, since consultant sources say it can be. If you are a foreign manufacturer, appoint an authorised Indian representative. Import then follows the DoT procedure for equipment with ETA, including undertakings.</p>\n<p>Keep ETA separate in your mind from MTCTE and BIS. A router, for instance, might need ETA for the Wi-Fi radio, TEC certification for network functions and CRS registration under BIS, depending on its type. Plan all approvals together so that no single missing document delays your launch.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ETA | JR Compliance",
          "metaDescription": "ETA (Equipment Type Approval) is the WPC wing's approval for wireless and RF devices operating in licence-exempt (de-licensed) frequency bands such as…",
          "keywords": "ETA, Wireless Planning and Coordination, JR Compliance",
          "canonicalUrl": "/approval/eta"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "DOT Certification",
              "href": "/approval/dot-certification",
              "target": "same_tab"
            },
            {
              "label": "Dealer Possesion License (DPL)",
              "href": "/approval/dealer-possession-license",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "wireless-planning-coordination-page",
      "proposedSlug": "dealer-possession-license",
      "matchSlugs": [
        "dealer-possession-license",
        "dealer-possesion-license-dpl"
      ],
      "matchNames": [
        "Dealer Possesion License (DPL)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 21,
        "originalRow": 32,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Dealer Possesion License (DPL)",
        "menuLabel": "Dealer Possesion License (DPL)",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Wireless Planning and Coordination (WPC)",
          "description": "The Dealer Possession Licence (DPL) lets an authorised dealer possess, stock and sell wireless equipment such as walkie-talkies and radio modems. DoT's eServices page lists a Rs 60 fee, a 1-year validity and a process of online application on Saral Sanchar, WPC scrutiny, police verification, letter of intent and licence download. Important: a DoT notice states that acceptance of new DPL and NDPL applications and renewals under the Indian Telegraph Act, 1885 stopped from 3 July 2026, and new applications now go through Radio Equipment Possession Authorisation under the Radio Equipment Possession Authorisation Rules, 2026, enabled from 6 August 2026.\n\nWe explain both routes, prepare documents such as CIN certificate, PAN, equipment details, technical literature and premises address, and handle filing under the route that applies."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Dealer Possesion License (DPL)?",
          "paragraphs": [
            {
              "text": "A DPL is a licence from DoT's WPC Wing allowing a dealer or distributor of wireless equipment to possess, stock and sell radio-frequency devices. It was issued under the Indian Telegraph Act, 1885 and the Indian Wireless Telegraphy Act, 1933 framework. Under the new Telecommunications Act, 2023 regime, possession of radio equipment is being brought under an authorisation framework."
            },
            {
              "text": "Eligible applicants were distributors and dealers who are individuals or companies registered under the Companies Act, 2013. The process included police verification and a letter of intent before licence issue. A notice on DoT's eServices pre-production site says that from 3 July 2026 applications under the old regime are not accepted on Saral Sanchar or NSWS, and that the new Authorisation Portal is enabled from 6 August 2026, while the main eServices page still shows older text, so the live portal should be checked."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is the DPL fee?",
              "answer": "DoT lists Rs 60 and a one-year validity."
            },
            {
              "question": "Has the process changed?",
              "answer": "A DoT notice says new applications moved to the Authorisation Portal in 2026."
            },
            {
              "question": "Who can apply?",
              "answer": "Dealers who are individuals or companies."
            },
            {
              "question": "Is police verification required?",
              "answer": "Yes in the earlier process."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Dealer Possesion License (DPL)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Distributors, traders and retailers of walkie-talkies, wireless sets, radio modems and similar RF equipment need DPL or the new possession authorisation.</p>\n<p>Importers who sell radio equipment domestically should check their position.</p>\n<p>Existing DPL holders should check migration instructions.</p>\n<p>If you only use equipment for your own business, the NDPL or its equivalent is relevant.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Clarity on old DPL and new authorisation routes</li><li>Documents and technical literature prepared</li><li>Filing on the correct portal</li><li>Police verification support</li><li>Compliance for dealers</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After authorisation, follow stock and sale conditions. <strong>Related services:</strong> NDPL, ETA, VHF and UHF licences and GST Registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Using the old portal after the change.</li><li>Missing documents.</li><li>Trading without authorisation.</li><li>Ignoring renewals.</li><li>Mixing DPL and NDPL.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on verification.</p>\n<blockquote><strong>Practical tip:</strong> confirm the live portal and rules.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Radio equipment possession is regulated by DoT; the 2026 Rules change the framework.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A walkie-talkie dealer applies.</p>\n<h3>Scenario 2:</h3>\n<p>A distributor checks the new route.</p>\n<h3>Scenario 3:</h3>\n<p>An existing holder checks migration.</p>\n\n<h2>Practical Guidance</h2>\n<p>The DPL is a good example of how regulation changes. Under the older system, a dealer applied on Saral Sanchar, went through scrutiny and police verification and received a letter of intent before the licence. DoT's eServices page listed a Rs 60 fee and one-year validity. A DoT notice then stated that from 3 July 2026 new DPL applications and renewals under the Indian Telegraph Act, 1885 were no longer being accepted, and that Radio Equipment Possession Authorisation under the 2026 Rules was enabled on the Authorisation Portal from 6 August 2026.</p>\n<p>Because the main eServices page still displayed older text when we reviewed it, dealers should verify the current position directly on the live portal before acting. If you hold an existing DPL, ask DoT how it will be handled: whether it continues until expiry, must be migrated or replaced. Keep your stock register, invoices and customer records in order, since possession and sale of radio equipment are regulated activities, and make sure that the equipment you sell has ETA or other required approvals. Good record-keeping will make the transition smoother.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Dealer Possesion License (DPL) | JR Compliance",
          "metaDescription": "The Dealer Possession Licence (DPL) lets an authorised dealer possess, stock and sell wireless equipment such as walkie-talkies and radio modems. DoT's…",
          "keywords": "Dealer Possesion License (DPL), Wireless Planning and Coordination, JR Compliance",
          "canonicalUrl": "/approval/dealer-possession-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Non Dealer Possesion License (NDPL)",
              "href": "/approval/non-dealer-possession-license",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "VHF",
              "href": "/approval/vhf",
              "target": "same_tab"
            },
            {
              "label": "UHF",
              "href": "/approval/uhf",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "wireless-planning-coordination-page",
      "proposedSlug": "non-dealer-possession-license",
      "matchSlugs": [
        "non-dealer-possession-license",
        "non-dealer-possesion-license-ndpl"
      ],
      "matchNames": [
        "Non Dealer Possesion License (NDPL)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 22,
        "originalRow": 33,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Non Dealer Possesion License (NDPL)",
        "menuLabel": "Non Dealer Possesion License (NDPL)",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "Wireless Planning and Coordination (WPC)",
          "description": "The Non-Dealer Possession Licence (NDPL) is for an organisation or individual that is not a dealer but wants to possess and use certain wireless equipment, for example a company using walkie-talkies in warehouses. It was issued by DoT's WPC wing through the Saral Sanchar portal under the Indian Telegraph Act framework. A DoT notice says new NDPL applications and renewals stopped from 3 July 2026 and are replaced by Radio Equipment Possession Authorisation under the 2026 Rules.\n\nWe help you determine the route, prepare documents including equipment details, purpose of use and premises, and file under the correct portal."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Non Dealer Possesion License (NDPL)?",
          "paragraphs": [
            {
              "text": "An NDPL is a licence allowing a non-dealer to possess wireless equipment for its own use. It is separate from the DPL for dealers and from spectrum licences needed to operate certain radio equipment. WPC contact pages list issue, renewal and surrender of both DPL and NDPL, and issue of destruction certificates."
            },
            {
              "text": "Applications included equipment make, model, frequency, quantity and purpose of use, identity or entity documents, premises address, photo, signature and PAN of the authorised person, technical literature and police verification where applicable. DPL is listed at Rs 60 and one year, but NDPL fee and validity were not separately confirmed. Under the DoT notice, new applications and renewals under the old regime are not being accepted, and the new authorisation route should be used."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who needs an NDPL?",
              "answer": "Non-dealers who possess restricted wireless equipment for own use."
            },
            {
              "question": "Is it still available?",
              "answer": "A DoT notice says the old route stopped from 3 July 2026."
            },
            {
              "question": "What replaces it?",
              "answer": "Radio Equipment Possession Authorisation under the 2026 Rules."
            },
            {
              "question": "Is a fee quoted?",
              "answer": "NDPL fee was not separately confirmed."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Non Dealer Possesion License (NDPL)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Companies and individuals using walkie-talkies or other restricted wireless equipment without trading in it, such as warehouses, security agencies, logistics firms and event companies, need NDPL or the new authorisation.</p>\n<p>Businesses that hire radio sets should confirm who holds the authorisation.</p>\n<p>Organisations with existing NDPLs should check renewal rules.</p>\n<p>If you only use licence-exempt devices, ETA covers the device, not possession.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Clear route for possession of wireless equipment</li><li>Documents prepared</li><li>Portal filing handled</li><li>Compliance for own-use radio sets</li><li>Renewal and surrender guidance</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After authorisation, use equipment per conditions. <strong>Related services:</strong> DPL, ETA, VHF and UHF licences.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Using old forms.</li><li>Not checking if equipment needs authorisation.</li><li>Missing renewal.</li><li>Ignoring surrender rules.</li><li>Sharing equipment without approval.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on DoT.</p>\n<blockquote><strong>Practical tip:</strong> confirm the current route first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>WPC controls possession of radio equipment to manage spectrum and security.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A warehouse applies.</p>\n<h3>Scenario 2:</h3>\n<p>A security agency checks the new route.</p>\n<h3>Scenario 3:</h3>\n<p>An event company surrenders old licence.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>Plan NDPL or its replacement by first listing the radio equipment your organisation holds or intends to buy, with make, model, frequency and quantity, and the purpose of use. Because a DoT notice says old-regime applications and renewals stopped from 3 July 2026 and new Radio Equipment Possession Authorisation applications opened on 6 August 2026, check the live Authorisation Portal for the process that applies. Prepare identity or entity documents, premises details and technical literature, and complete any verification requested. <strong>Planning checklist:</strong> keep an equipment register, confirm authorisation before purchase, renew or migrate existing licences as instructed and surrender or destroy equipment properly when no longer needed.</p>\n\n<h2>Practical Guidance</h2>\n<p>For organisations that use radio equipment but do not sell it, the main risk is complacency. Walkie-talkies and radio sets are often bought in bulk by facilities, security teams and logistics operations and then passed between staff without much thought for licensing. Create an equipment register listing each set, its model, frequency, assigned user and location. Check which sets need possession authorisation and which are licence-exempt devices that only need to carry ETA.</p>\n<p>Given the 2026 changes announced in a DoT notice, review how your organisation holds authorisation today. If you have an NDPL, find out how it will be treated; if you are buying new equipment, check whether the new Radio Equipment Possession Authorisation applies and apply on the Authorisation Portal. Make sure the person responsible understands what is required, such as technical literature, purpose of use and premises details. Also plan for end-of-life: surrender or destroy equipment properly, and obtain destruction certificates where the process provides for them. Keeping an updated register is the simplest control against accidental non-compliance.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Non Dealer Possesion License (NDPL) | JR Compliance",
          "metaDescription": "The Non-Dealer Possession Licence (NDPL) is for an organisation or individual that is not a dealer but wants to possess and use certain wireless…",
          "keywords": "Non Dealer Possesion License (NDPL), Wireless Planning and Coordination, JR Compliance",
          "canonicalUrl": "/approval/non-dealer-possession-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Dealer Possesion License (DPL)",
              "href": "/approval/dealer-possession-license",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "VHF",
              "href": "/approval/vhf",
              "target": "same_tab"
            },
            {
              "label": "UHF",
              "href": "/approval/uhf",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "wireless-planning-coordination-page",
      "proposedSlug": "experimental-license",
      "matchSlugs": [
        "experimental-license"
      ],
      "matchNames": [
        "Experimental License"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 23,
        "originalRow": 34,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Experimental License",
        "menuLabel": "Experimental License",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "Wireless Planning and Coordination (WPC)",
          "description": "An Experimental Licence from WPC is needed to carry out trials, research or demonstrations with wireless equipment that radiates on frequencies not otherwise authorised. DoT's orders list categories such as experimental (non-radiating) indoors and experimental (radiating) indoors and outdoors, and technology trials. Applications are made on the Saral Sanchar portal. A DoT notice also says Manufacturing and Testing licences under the Telegraph Act are no longer accepted from 3 July 2026 in favour of the new authorisation framework.\n\nWe help you choose the category, prepare equipment, frequency and location details and file the application."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Experimental License?",
          "paragraphs": [
            {
              "text": "An experimental wireless licence authorises an organisation or individual to operate wireless equipment for research, testing, trials or demonstrations under conditions specified by WPC for frequency, location, power and duration. It is distinct from a Demo licence, which is for demonstrating equipment, and from commercial network licences."
            },
            {
              "text": "Documents include organisation details, purpose of experiment, equipment make and model, frequency band, power and location, technical documents, test plan, equipment type approval or import undertaking where applicable, PAN and authorisation. Fees and validity depend on the category and are set by DoT and were not retrieved. Whether the Telegraph Act-based licence is still accepted under the 2026 notice should be checked."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is an experimental licence needed?",
              "answer": "For trials or research with non-exempt radiating equipment."
            },
            {
              "question": "Where is it applied?",
              "answer": "On Saral Sanchar."
            },
            {
              "question": "What categories exist?",
              "answer": "Indoor and outdoor, radiating and non-radiating, and technology trials."
            },
            {
              "question": "Are fees fixed?",
              "answer": "They depend on category and were not retrieved."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Experimental License",
            "description": "<h2>Who Needs This Service</h2>\n<p>R&amp;D labs, universities, telecom and IoT startups, equipment makers testing new radios and organisations running technology trials need experimental licences.</p>\n<p>Companies planning field trials of 5G or IoT equipment need appropriate categories.</p>\n<p>If your equipment uses licence-exempt bands, ETA may be enough.</p>\n<p>Outdoor radiating trials need careful planning.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Right trial category chosen</li><li>Documents and test plan prepared</li><li>Saral Sanchar filing</li><li>Frequency and siting guidance</li><li>Compliance during trials</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After the licence, operate within conditions. <strong>Related services:</strong> ETA, Demo licence, VHF and UHF licences and MTCTE.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Running trials without licence.</li><li>Wrong category.</li><li>Exceeding power or location limits.</li><li>Missing renewal.</li><li>Ignoring 2026 changes.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary by category.</p>\n<blockquote><strong>Practical tip:</strong> share a clear test plan.</blockquote>\n\n<h2>Additional Information</h2>\n<p>WPC licences control experimental use of spectrum.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A university tests a radio.</p>\n<h3>Scenario 2:</h3>\n<p>A startup runs an outdoor trial.</p>\n<h3>Scenario 3:</h3>\n<p>A vendor tests a prototype.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For an experimental licence, start with the experiment design: what equipment, which frequency, what power, indoors or outdoors, for how long and where. Choose the category listed in DoT's orders, such as non-radiating or radiating trials, register on Saral Sanchar, upload the technical documents and test plan and pay the fee. WPC may coordinate frequency and siting before granting the licence. <strong>Planning checklist:</strong> keep the trial small and well defined, confirm whether your device could instead use a licence-exempt band with ETA, obtain equipment approvals or import undertakings before the trial, follow licence conditions strictly and check how the 2026 changes to Telegraph Act licences affect your application.</p>\n\n<h2>Practical Guidance</h2>\n<p>The experimental licence category covers more situations than many engineers realise. DoT's orders list categories such as indoor non-radiating, indoor radiating, outdoor radiating and technology trials, and each has its own conditions. A test inside a shielded lab with no radiation is very different from an outdoor field trial with active transmission, and the approvals, siting clearances and durations reflect that.</p>\n<p>When preparing an application, describe the experiment clearly: objectives, equipment, frequency, power, antenna, location, duration and safeguards against interference. Provide technical documents and, where relevant, equipment approvals or import undertakings. For outdoor radiating setups, siting clearance may be needed through the usual WPC processes. Keep the scope tight, because licences are specific and operating beyond them is a violation.</p>\n<p>Because a DoT notice in 2026 refers to changes affecting Telegraph Act-based licences, check the live portal for the current process and whether experimental licences are handled in the same way. After the trial, report as required, surrender or let the licence lapse as instructed and keep records of results, since they may be useful for later commercial licence applications or equipment approvals.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Experimental License | JR Compliance",
          "metaDescription": "An Experimental Licence from WPC is needed to carry out trials, research or demonstrations with wireless equipment that radiates on frequencies not…",
          "keywords": "Experimental License, Wireless Planning and Coordination, JR Compliance",
          "canonicalUrl": "/approval/experimental-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "VHF",
              "href": "/approval/vhf",
              "target": "same_tab"
            },
            {
              "label": "UHF",
              "href": "/approval/uhf",
              "target": "same_tab"
            },
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "wireless-planning-coordination-page",
      "proposedSlug": "vhf",
      "matchSlugs": [
        "vhf"
      ],
      "matchNames": [
        "VHF"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 24,
        "originalRow": 35,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "VHF",
        "menuLabel": "VHF",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "Wireless Planning and Coordination (WPC)",
          "description": "VHF here refers to WPC's frequency-assignment licences for radio sets operating in HF, VHF and UHF bands below 806 MHz, the 'Fixed or Land Mobile - HF/VHF/UHF (below 806 MHz)' network licence module on Saral Sanchar, used for two-way radios and similar communication. Frequency assignment, amendment, renewal and surrender for these bands are handled by the WPC wing's frequency assignment cell. Some low-power bands such as the citizen band 26.957 to 27.383 MHz are licence-exempt.\n\nWe assess whether you need a licence, prepare the application, equipment details and fees, and follow through."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is VHF?",
          "paragraphs": [
            {
              "text": "A VHF licence from WPC authorises an organisation to operate radio communication equipment on assigned frequencies in the VHF band (30 to 300 MHz) for fixed or land mobile use, as in walkie-talkie networks of industries, security, utilities and transport. The equipment must be type-approved, and the frequency, power and location are specified in the licence."
            },
            {
              "text": "Documents include entity documents, PAN, authorised signatory ID, justification of need and area of operation, equipment details with ETA, SACFA siting clearance for towers where required, licence or royalty fee payment through Bharatkosh and a possession licence or authorisation for radio sets. Fees follow DoT's schedule and depend on bandwidth and location. All WPC licences moved online from 2020."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which band is VHF?",
              "answer": "30 to 300 MHz, within the below-806 MHz land mobile module."
            },
            {
              "question": "Is a licence always needed?",
              "answer": "Not for licence-exempt equipment such as citizen band radios."
            },
            {
              "question": "Where is it applied?",
              "answer": "On Saral Sanchar."
            },
            {
              "question": "How are fees paid?",
              "answer": "Through Bharatkosh."
            }
          ]
        },
        "extraContent": [
          {
            "title": "VHF",
            "description": "<h2>Who Needs This Service</h2>\n<p>Industries, security agencies, transport and logistics operators, utilities, hospitals and events that run VHF walkie-talkie or radio networks need this licence.</p>\n<p>Organisations using licence-exempt radios may not need it.</p>\n<p>Companies setting up towers need siting clearance.</p>\n<p>If your radios are in UHF, see the UHF licence.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Right module and fees identified</li><li>Equipment and siting documents prepared</li><li>Bharatkosh payment guidance</li><li>Licence filing and follow-up</li><li>Compliance with frequency conditions</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After the licence, operate within the assigned frequency. <strong>Related services:</strong> UHF licence, ETA, DPL and NDPL.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Using unlicensed frequencies.</li><li>Not type-approving equipment.</li><li>Skipping siting clearance.</li><li>Missing fee payment.</li><li>Ignoring renewal.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on WPC.</p>\n<blockquote><strong>Practical tip:</strong> prepare area and equipment details early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>WPC assigns frequencies to avoid interference and manage spectrum.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A factory sets up a VHF network.</p>\n<h3>Scenario 2:</h3>\n<p>A transport firm applies.</p>\n<h3>Scenario 3:</h3>\n<p>A hospital applies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To plan a VHF radio network, first define who will communicate, over what area and with how many radios. Check whether licence-exempt options such as the citizen band can meet the need. If not, choose the Fixed or Land Mobile HF/VHF/UHF below 806 MHz module on Saral Sanchar, prepare entity documents, equipment details with ETA, area of operation and siting clearance for towers if required, pay licence and royalty fees through Bharatkosh and file. Also arrange possession authorisation for the radio sets. <strong>Planning checklist:</strong> size the network realistically, buy type-approved radios, keep fee receipts and plan renewals.</p>\n\n<h2>Practical Guidance</h2>\n<p>VHF licensing can look straightforward but benefits from planning. Start by defining your communication need: how many users, how large an area, indoors or outdoors, and whether voice only or data. Then check whether licence-exempt options meet it, for example the citizen band at 26.957 to 27.383 MHz, which needs no licence but has limited range and performance. If you need reliable coverage, assigned frequency is usually the better option.</p>\n<p>Select the right module on Saral Sanchar, which is the Fixed or Land Mobile HF, VHF and UHF module for frequencies below 806 MHz. Prepare entity documents, equipment details with ETA, the area of operation and any tower or antenna details. Pay licence and royalty fees through Bharatkosh and upload the receipt. WPC may coordinate with other users and seek siting clearance for towers. Once the licence is issued, operate within the assigned frequency, power and location, maintain logs as required and renew on time.</p>\n<p>Do not forget possession authorisation for the radio sets themselves, which may follow the new 2026 route described by DoT. Budget for recurring costs and plan renewals, since licence fees can be significant for larger networks.</p>"
          }
        ],
        "seo": {
          "metaTitle": "VHF | JR Compliance",
          "metaDescription": "VHF here refers to WPC's frequency-assignment licences for radio sets operating in HF, VHF and UHF bands below 806 MHz, the 'Fixed or Land Mobile -…",
          "keywords": "VHF, Wireless Planning and Coordination, JR Compliance",
          "canonicalUrl": "/approval/vhf"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "UHF",
              "href": "/approval/uhf",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "Dealer Possesion License (DPL)",
              "href": "/approval/dealer-possession-license",
              "target": "same_tab"
            },
            {
              "label": "Non Dealer Possesion License (NDPL)",
              "href": "/approval/non-dealer-possession-license",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "wireless-planning-coordination-page",
      "proposedSlug": "uhf",
      "matchSlugs": [
        "uhf"
      ],
      "matchNames": [
        "UHF"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 25,
        "originalRow": 36,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "UHF",
        "menuLabel": "UHF",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "Wireless Planning and Coordination (WPC)",
          "description": "UHF licensing at WPC covers frequency assignments in the UHF band, below 806 MHz in the same HF, VHF, UHF fixed or land mobile module and above 806 MHz in a separate module, plus a short-range UHF handheld radio licence category. The licence is applied for on Saral Sanchar and frequency is assigned by WPC. Some low-power UHF devices such as 865 to 867 MHz RFID are licence-exempt and need only ETA.\n\nWe determine the module, prepare the application and documents and follow through."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is UHF?",
          "paragraphs": [
            {
              "text": "A UHF radio licence from WPC authorises operation of two-way or trunked radio equipment in the ultra-high-frequency band (300 MHz to 3 GHz), for example business walkie-talkies, captive trunking and handheld radios. WPC also lists Short Range UHF handheld radio licences. Equipment must be type-approved, and the licensee pays licence or royalty fees as set by DoT."
            },
            {
              "text": "Documents include entity documents, PAN, ID of the authorised person, site and area details, equipment technical details with ETA, possession licence or authorisation for the sets, fee payment through Bharatkosh with a GAR-7 receipt and SACFA siting clearance for towers where needed."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which UHF modules exist?",
              "answer": "Below 806 MHz and above 806 MHz, plus short-range handheld."
            },
            {
              "question": "Is RFID licensed?",
              "answer": "865 to 867 MHz RFID is licence-exempt and needs ETA."
            },
            {
              "question": "How are fees paid?",
              "answer": "Through Bharatkosh."
            },
            {
              "question": "Do radio sets need possession authorisation?",
              "answer": "Yes."
            }
          ]
        },
        "extraContent": [
          {
            "title": "UHF",
            "description": "<h2>Who Needs This Service</h2>\n<p>Businesses and institutions using UHF radio networks, such as security, warehouses, construction, hospitality, event management, utilities and transport, need UHF licences.</p>\n<p>Short-range handheld users should check the specific category.</p>\n<p>Licence-exempt RFID users need only ETA.</p>\n<p>Possession authorisation applies to radio sets.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Correct UHF module identified</li><li>Documents and fees prepared</li><li>Application and follow-up</li><li>Siting and equipment guidance</li><li>Compliance with conditions</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After licence, operate within conditions. <strong>Related services:</strong> VHF licence, ETA, DPL and NDPL.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Choosing the wrong module.</li><li>Using non-approved radios.</li><li>Missing siting clearance.</li><li>Non-payment of fees.</li><li>Ignoring renewals.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary.</p>\n<blockquote><strong>Practical tip:</strong> confirm frequency need and equipment.</blockquote>\n\n<h2>Additional Information</h2>\n<p>WPC licences UHF use to manage interference.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A construction firm uses UHF radios.</p>\n<h3>Scenario 2:</h3>\n<p>A resort applies.</p>\n<h3>Scenario 3:</h3>\n<p>A logistics hub applies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To plan a UHF network, decide whether you need a below-806 MHz or above-806 MHz module, or the short-range handheld category, and whether a licence-exempt band such as 865 to 867 MHz RFID could serve your purpose with ETA alone. Prepare entity documents, equipment details and ETA, site and area information, and pay fees through Bharatkosh with the GAR-7 receipt. WPC processes the request and assigns frequency, with SACFA clearance if towers are used. <strong>Planning checklist:</strong> confirm possession authorisation for the radios, document the coverage area, track the licence term and renewal and review the setup when you add sites.</p>\n\n<h2>Practical Guidance</h2>\n<p>UHF networks are widely used because they perform well in buildings and urban environments, which is why security teams, hotels, construction sites and event companies favour them. The licensing route depends on the band and the type of use. Below 806 MHz, UHF belongs to the same Fixed or Land Mobile module as HF and VHF; above 806 MHz there is a separate module; and short-range handheld radios have their own category. Some UHF bands, such as 865 to 867 MHz for RFID, are licence-exempt and need only ETA for the devices.</p>\n<p>To prepare, determine the number of sets, area and sites, and the frequency band you plan to use. Choose equipment that has ETA or other required approvals. Compile entity documents, the technical details of radios and any towers, and pay fees through Bharatkosh. WPC assigns frequencies to avoid interference and may require SACFA clearance for tower sites.</p>\n<p>After licensing, follow conditions on power, location and operation, and track renewals. If your radios are obtained from a dealer, ask for evidence that the dealer holds the required authorisation. Since possession rules are changing under the 2026 framework, confirm the current requirement for holding the equipment.</p>"
          }
        ],
        "seo": {
          "metaTitle": "UHF | JR Compliance",
          "metaDescription": "UHF licensing at WPC covers frequency assignments in the UHF band, below 806 MHz in the same HF, VHF, UHF fixed or land mobile module and above 806 MHz…",
          "keywords": "UHF, Wireless Planning and Coordination, JR Compliance",
          "canonicalUrl": "/approval/uhf"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "VHF",
              "href": "/approval/vhf",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "Dealer Possesion License (DPL)",
              "href": "/approval/dealer-possession-license",
              "target": "same_tab"
            },
            {
              "label": "Non Dealer Possesion License (NDPL)",
              "href": "/approval/non-dealer-possession-license",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "wireless-planning-coordination-page",
      "proposedSlug": "demo-license",
      "matchSlugs": [
        "demo-license"
      ],
      "matchNames": [
        "Demo License"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 26,
        "originalRow": 37,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          },
          {
            "column": "O",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Guidance"
          }
        ]
      },
      "data": {
        "title": "Demo License",
        "menuLabel": "Demo License",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "Wireless Planning and Coordination (WPC)",
          "description": "A WPC Demo Licence permits demonstrating wireless equipment, for example at exhibitions, trade shows or customer demonstrations, for a limited period. DoT's orders list Demo categories such as 'Demo indoor (non-radiating or very low power radiating)' alongside experimental and technology-trial categories. It is applied for on the Saral Sanchar portal.\n\nWe prepare the application with event, equipment and frequency details and follow up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Demo License?",
          "paragraphs": [
            {
              "text": "A demonstration licence is a short-term WPC permission to operate wireless equipment for demonstration purposes without a regular spectrum licence, subject to conditions on location, frequency, power and duration. It is separate from Experimental licences for research and trials and from commercial network licences."
            },
            {
              "text": "Documents include details of the demonstrating entity, event or venue and dates, equipment make and model, frequency and power, entity documents, PAN, authorisation letter, technical datasheets, ETA or import undertaking details and the prescribed fee. Validity and fee were not retrieved from the sources, and a DoT notice in 2026 moved some Telegraph Act licences to the new framework, so check whether Demo licences follow."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "When is a Demo licence needed?",
              "answer": "When demonstrating non-exempt wireless equipment."
            },
            {
              "question": "Where is it applied?",
              "answer": "On Saral Sanchar."
            },
            {
              "question": "How long is it valid?",
              "answer": "Not retrieved; set by DoT."
            },
            {
              "question": "Is it the same as Experimental?",
              "answer": "No, experimental is for research and trials."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Demo License",
            "description": "<h2>Who Needs This Service</h2>\n<p>Wireless equipment vendors, importers and telecom or IoT companies demonstrating products at exhibitions or to customers need Demo licences.</p>\n<p>Companies showing products at trade fairs should apply early.</p>\n<p>Equipment in licence-exempt bands may not need it.</p>\n<p>Outdoor demos need careful planning.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal demonstration of wireless products</li><li>Event and equipment details prepared</li><li>Saral Sanchar filing</li><li>Frequency and power guidance</li><li>Event readiness</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After the licence, demonstrate within conditions. <strong>Related services:</strong> Experimental licence, ETA, VHF and UHF licences.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Demonstrating without licence.</li><li>Exceeding power or site limits.</li><li>Late application before an event.</li><li>Missing equipment approvals.</li><li>Ignoring surrender after the event.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Apply well before the event.</p>\n<blockquote><strong>Practical tip:</strong> share a clear event and equipment plan.</blockquote>\n\n<h2>Additional Information</h2>\n<p>WPC controls demonstrations to prevent interference.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A vendor demos at an expo.</p>\n<h3>Scenario 2:</h3>\n<p>A startup demos to a client.</p>\n<h3>Scenario 3:</h3>\n<p>A telecom company demos a new radio.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>A demo licence plan starts from the event calendar. List the event, venue, dates, equipment, frequency and power, and decide whether the equipment is indoor and non-radiating or very low power radiating. Register on Saral Sanchar, select the Demo module, upload the datasheets, ETA or import undertaking details and authorisation letter, and pay the fee. WPC grants the licence with conditions on site, dates and power. <strong>Planning checklist:</strong> apply well before the event, keep a copy of the licence at the venue, operate only within the permitted limits, and surrender or let the licence lapse after the demonstration as instructed.</p>\n\n<h2>Practical Guidance</h2>\n<p>A Demo licence is a short-term permission, and most of the work lies in timing and precision. Trade shows and customer demonstrations have fixed dates, so apply well in advance, because WPC processing and any queries can take time. Describe the event, venue, dates, equipment, frequency band, power and the purpose of the demonstration. Attach datasheets and ETA or import undertaking details, and include the authorisation letter of the person signing.</p>\n<p>Check first whether a licence is needed at all. If your demonstration equipment operates in a licence-exempt band within the prescribed power limits and has ETA, you may not need a Demo licence. If it uses restricted frequencies or higher power, apply under the Demo module on Saral Sanchar. DoT's orders list categories such as Demo indoor for non-radiating or very low-power radiating equipment, and categories can differ for outdoor or higher-power use.</p>\n<p>During the event, operate only within the licence conditions, carry a copy of the licence and be ready to show it to officials. After the event, close out the licence as instructed. Because the sources do not give fees or validity and a 2026 DoT notice moved some Telegraph Act licences to a new framework, confirm current details on the portal.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Demo License | JR Compliance",
          "metaDescription": "A WPC Demo Licence permits demonstrating wireless equipment, for example at exhibitions, trade shows or customer demonstrations, for a limited period.…",
          "keywords": "Demo License, Wireless Planning and Coordination, JR Compliance",
          "canonicalUrl": "/approval/demo-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "VHF",
              "href": "/approval/vhf",
              "target": "same_tab"
            },
            {
              "label": "UHF",
              "href": "/approval/uhf",
              "target": "same_tab"
            },
            {
              "label": "Dealer Possesion License (DPL)",
              "href": "/approval/dealer-possession-license",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "bureau-energy-efficiency-page",
      "proposedSlug": "star-labeling",
      "matchSlugs": [
        "star-labeling"
      ],
      "matchNames": [
        "Star Labeling"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 27,
        "originalRow": 41,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Star Labeling",
        "menuLabel": "Star Labeling",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "Bureau of Energy Efficiency (BEE)",
          "description": "BEE Star Labelling is the Standards and Labelling programme of the Bureau of Energy Efficiency, run under Section 14 of the Energy Conservation Act, 2001, which rates appliances from 1 to 5 stars by energy efficiency. BEE's own overview says 41 appliances are covered, 17 under mandatory and 24 under voluntary labelling. Manufacturers, importers and brand owners register their company and model on the BEE S&L portal after testing at an NABL-accredited lab, pay the prescribed fees and get permission to display the label.\n\nWe check whether your appliance is mandatory or voluntary, arrange NABL lab testing in BEE-approved labs, register your company and brand, file model applications with test reports, handle fees and security deposits and guide label display and reporting."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Star Labeling?",
          "paragraphs": [
            {
              "text": "The BEE Star Label is a mandatory or voluntary energy-efficiency label displayed on appliances such as air conditioners, refrigerators, LED lamps, washing machines, colour TVs, ceiling fans and geysers. It tells buyers how efficient a model is compared with others in the same category. The programme began in 2006 as voluntary and moves appliances to mandatory in phases, and BEE enforces it through check testing and challenge testing of market samples."
            },
            {
              "text": "Testing at an NABL-accredited lab is mandatory regardless of any international certification, and not every lab is authorised for every product. Labels are valid for a label period fixed by BEE, and missed fee payments or production reports can lead to suspension of label permission. Coverage numbers differ across sources: BEE's 2025 overview says 41 appliances, while other pages say about 29 to 30, an older figure."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many appliances are covered?",
              "answer": "BEE's 2025 overview says 41, with 17 mandatory and 24 voluntary."
            },
            {
              "question": "Who tests?",
              "answer": "BEE-approved NABL-accredited labs."
            },
            {
              "question": "Is labelling mandatory?",
              "answer": "For listed appliances."
            },
            {
              "question": "How long is the label valid?",
              "answer": "For a label period fixed by BEE."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Star Labeling",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, importers and brands of ACs, refrigerators, LED lamps, TVs, washing machines, fans, geysers and other covered appliances need star labelling.</p>\n<p>Importers of appliances should check whether labelling applies.</p>\n<p>Brands wanting to signal efficiency may opt for voluntary labelling.</p>\n<p>If your appliance is not covered, confirm the current schedule.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with mandatory labelling</li><li>Lab and portal processes managed</li><li>Model registration and fees handled</li><li>Label display guidance</li><li>Reduced risk of suspension</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, display labels and file reports. <strong>Related services:</strong> BIS Certification, ISO certification, EPR E-waste and CRS.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong lab.</li><li>Missing reports.</li><li>Using old schedules.</li><li>Selling before approval.</li><li>Ignoring check testing.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on testing.</p>\n<blockquote><strong>Practical tip:</strong> confirm the lab is BEE-approved.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Energy Conservation Act, 2001 empowers BEE to prescribe labelling.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>An AC maker registers models.</p>\n<h3>Scenario 2:</h3>\n<p>An importer labels refrigerators.</p>\n<h3>Scenario 3:</h3>\n<p>A fan brand renews.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Star Labeling | JR Compliance",
          "metaDescription": "BEE Star Labelling is the Standards and Labelling programme of the Bureau of Energy Efficiency, run under Section 14 of the Energy Conservation Act,…",
          "keywords": "Star Labeling, Bureau of Energy Efficiency, JR Compliance",
          "canonicalUrl": "/approval/star-labeling"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- E waste",
              "href": "/approval/epr-e-waste",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "Energy Conservation Building Code (ECBC)",
              "href": "/approval/energy-conservation-building-code-ecbc",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "bureau-energy-efficiency-page",
      "proposedSlug": "energy-conservation-building-code-ecbc",
      "matchSlugs": [
        "energy-conservation-building-code-ecbc"
      ],
      "matchNames": [
        "Energy Conservation Building Code (ECBC)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 28,
        "originalRow": 42,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Energy Conservation Building Code (ECBC)",
        "menuLabel": "Energy Conservation Building Code (ECBC)",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "Bureau of Energy Efficiency (BEE)",
          "description": "ECBC sets minimum energy-performance requirements for the design and construction of buildings under the Energy Conservation Act, 2001. ECBC 2017 applies to commercial buildings with connected load of 100 kW or more or contract demand of 120 kVA or more. States must notify it as their own rules, and the 2022 Amendment Act is moving it to an Energy Conservation and Sustainability Building Code and making the residential Eco Niwas Samhita mandatory. Compliance is checked through the state nodal agency or urban local body during building approvals.\n\nWe help developers and architects identify applicability, choose a compliance approach, document envelope, HVAC, lighting and electrical systems and submit for approval."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Energy Conservation Building Code (ECBC)?",
          "paragraphs": [
            {
              "text": "The Energy Conservation Building Code (ECBC) is a national code developed by BEE, first launched in May 2007, updated in 2017 and amended in 2020, that defines minimum standards for building envelope, comfort systems and controls, lighting and controls, and electrical and renewable energy systems. It offers three compliance approaches: Mandatory, Prescriptive and Whole Building Performance, and 'ECBC Plus' and 'Super ECBC' levels for higher performance."
            },
            {
              "text": "States have the flexibility to modify the code and must notify rules to enforce it. As of the sources, about 23 of 28 states had notified ECBC rules, with only 15 on ECBC 2017, and states such as Gujarat and Maharashtra were yet to notify. One source also mentions a built-up area of 1,000 sq m as a trigger, which should be confirmed with the state."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which buildings are covered?",
              "answer": "Commercial buildings with 100 kW connected load or 120 kVA contract demand."
            },
            {
              "question": "Who enforces ECBC?",
              "answer": "States, through notified rules."
            },
            {
              "question": "What are the compliance approaches?",
              "answer": "Mandatory, Prescriptive and Whole Building Performance."
            },
            {
              "question": "What is Eco Niwas Samhita?",
              "answer": "The residential building code made mandatory by the 2022 Amendment Act."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Energy Conservation Building Code (ECBC)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Developers, architects, hotel, hospital, office and mall builders and owners of commercial buildings above the load thresholds, and state urban authorities enforcing the code, need ECBC compliance.</p>\n<p>Existing buildings whose load rises to the threshold must comply.</p>\n<p>Green-building projects often go beyond ECBC.</p>\n<p>If your state has not notified ECBC, check local rules.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with ECBC for building approvals</li><li>Applicability and approach identified</li><li>Documents and simulations prepared</li><li>State agency submission</li><li>Energy savings over the building's life</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After approval, implement design and maintain records. <strong>Related services:</strong> Star Labelling, Trade License, RERA and ISO certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Ignoring state notification.</li><li>Wrong compliance approach.</li><li>Poor documentation.</li><li>Late consultant involvement.</li><li>Overlooking load thresholds.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Approval timing follows building plan approval.</p>\n<blockquote><strong>Practical tip:</strong> engage an ECBC consultant at design stage.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Energy Conservation Act, 2001 and its 2022 amendment support building energy codes.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A mall developer complies.</p>\n<h3>Scenario 2:</h3>\n<p>A hotel uses whole building simulation.</p>\n<h3>Scenario 3:</h3>\n<p>A hospital checks thresholds.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Energy Conservation Building Code (ECBC) | JR Compliance",
          "metaDescription": "ECBC sets minimum energy-performance requirements for the design and construction of buildings under the Energy Conservation Act, 2001. ECBC 2017…",
          "keywords": "Energy Conservation Building Code (ECBC), Bureau of Energy Efficiency, JR Compliance",
          "canonicalUrl": "/approval/energy-conservation-building-code-ecbc"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Star Labeling",
              "href": "/approval/star-labeling",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "ISI Certification",
              "href": "/approval/isi-certificate",
              "target": "same_tab"
            },
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "mdr-cdsco-registration",
      "matchSlugs": [
        "mdr-cdsco-registration"
      ],
      "matchNames": [
        "MDR CDSCO Registration"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 29,
        "originalRow": 46,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "MDR CDSCO Registration",
        "menuLabel": "MDR CDSCO Registration",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Medical devices in India are regulated by CDSCO under the Medical Devices Rules, 2017, in force from 1 January 2018. Devices are classed A to D by risk. Manufacturing licences for Class A and B are issued by the State Licensing Authority (Form MD-3 application, MD-5 licence), for Class C and D by the Central Licensing Authority (MD-7 application, MD-9 licence), and import licences for all classes by the CLA (MD-14 application, MD-15 licence). Applications go through the CDSCO online system for medical devices.\n\nWe classify your device, choose the route, prepare the Device Master File and documents and file."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is MDR CDSCO Registration?",
          "paragraphs": [
            {
              "text": "MDR CDSCO registration refers to the licensing and registration of medical devices, including IVDs, under the Medical Devices Rules, 2017, which sit under the Drugs and Cosmetics Act, 1940. Licences are required before manufacturing, importing or selling most devices. Class A devices that are both non-sterile and non-measuring are exempted from mandatory licensing and need voluntary registration only, per the CDSCO pathway note and secondary sources."
            },
            {
              "text": "Licences remain valid perpetually if the retention fee is paid every five years. Import requires an Indian authorised agent holding a wholesale licence in Form MD-42. Clinical investigation or performance evaluation permissions apply where required."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How are devices classified?",
              "answer": "Class A to D by risk."
            },
            {
              "question": "Who licenses Class A/B manufacturing?",
              "answer": "The State Licensing Authority."
            },
            {
              "question": "Who licenses Class C/D and imports?",
              "answer": "The Central Licensing Authority."
            },
            {
              "question": "How long is a licence valid?",
              "answer": "Perpetual with retention fee every five years."
            }
          ]
        },
        "extraContent": [
          {
            "title": "MDR CDSCO Registration",
            "description": "<h2>Who Needs This Service</h2>\n<p>Medical device manufacturers, importers, brand owners using loan licences, foreign manufacturers using Indian authorised agents and sellers of devices need MDR licensing.</p>\n<p>Startups developing devices should classify early.</p>\n<p>Importers must have MD-42 holders as agents.</p>\n<p>If your product is a drug or cosmetic, other rules apply.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Clear classification and route</li><li>Documents and DMF prepared</li><li>Portal filing</li><li>Retention fee reminders</li><li>Reduced regulatory risk</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After licensing, comply with post-market duties. <strong>Related services:</strong> MD-15, MD-5, MD-9, MD-42, loan licences and IVD registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong classification.</li><li>Missing DMF.</li><li>No MD-42 agent for imports.</li><li>Missing retention fee.</li><li>Selling before licence.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary by class.</p>\n<blockquote><strong>Practical tip:</strong> build the Device Master File early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 brought medical devices under a dedicated regulatory regime.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A syringe maker licenses.</p>\n<h3>Scenario 2:</h3>\n<p>An importer applies.</p>\n<h3>Scenario 3:</h3>\n<p>A startup classifies its device.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>Start your medical device plan with classification. Use CDSCO's lists to place the device in Class A, B, C or D, then choose the route: manufacture (MD-3 or MD-7), loan licence (MD-4 or MD-8) or import (MD-14 with an MD-42 holder as agent). Prepare the Device Master File, labelling, instructions for use, quality documents and entity details, register on the CDSCO medical device portal and file with fees. The State or Central Licensing Authority scrutinises, inspects where required and grants the licence, which stays perpetual with a retention fee every five years. <strong>Planning checklist:</strong> build the DMF early, decide whether you need clinical or performance data, appoint an Indian agent for imports, track retention fee dates and monitor CDSCO circulars.</p>"
          }
        ],
        "seo": {
          "metaTitle": "MDR CDSCO Registration | JR Compliance",
          "metaDescription": "Medical devices in India are regulated by CDSCO under the Medical Devices Rules, 2017, in force from 1 January 2018. Devices are classed A to D by…",
          "keywords": "MDR CDSCO Registration, CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/mdr-cdsco-registration"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-15 (Import License)",
              "href": "/approval/form-md-15-import-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-5 (Manufacturing License)",
              "href": "/approval/form-md-5-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-9 (Manufacturing License)",
              "href": "/approval/form-md-9-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-42 (Sell, Stock, Exhibit)",
              "href": "/approval/form-md-42-sell-stock-exhibit",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "form-md-15-import-license",
      "matchSlugs": [
        "form-md-15-import-license"
      ],
      "matchNames": [
        "Form MD-15 (Import License)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 30,
        "originalRow": 47,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Form MD-15 (Import License)",
        "menuLabel": "Form MD-15 (Import License)",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Form MD-15 is the import licence for medical devices granted by the Central Licensing Authority (CDSCO) on an application in Form MD-14, made through the CDSCO medical device online system. It is needed for all classes of imported devices and for imported IVDs. The applicant must be an Indian entity holding a wholesale licence in Form MD-42, acting as the Indian Authorised Agent of the foreign manufacturer. The licence is valid perpetually subject to a retention fee every five years.\n\nWe prepare the MD-14 application, manufacturer documents, DMF and fee and follow through."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Form MD-15 (Import License)?",
          "paragraphs": [
            {
              "text": "An MD-15 import licence is the permission under the Medical Devices Rules, 2017 to import a specified medical device, including IVDs, into India for sale or distribution. It is issued to the Indian authorised agent for the devices, manufacturing sites and models listed in the application, and is separate from test licences (MD-16 and MD-17) used for evaluation, clinical investigation or demonstration imports."
            },
            {
              "text": "Documents include MD-14 with fee, the agent's MD-42, power of attorney from the manufacturer, free-sale and regulatory approvals, ISO 13485 certificate, Device Master File, labelling and IFU, technical or clinical data and performance evaluation reports for notified IVDs. All documents must be in English."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who applies for MD-15?",
              "answer": "The Indian authorised agent with an MD-42 licence."
            },
            {
              "question": "Which form is used to apply?",
              "answer": "Form MD-14."
            },
            {
              "question": "How long is it valid?",
              "answer": "Perpetual with retention fee every five years."
            },
            {
              "question": "Does it cover all classes?",
              "answer": "Yes, imports of all classes."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Form MD-15 (Import License)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Importers and foreign manufacturers (through Indian authorised agents) of medical devices and IVD kits sold in India need MD-15.</p>\n<p>Agents should first obtain MD-42.</p>\n<p>Brands importing multiple devices should list all models.</p>\n<p>If you import for testing only, use MD-16 or MD-17.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal import of medical devices</li><li>MD-14 and documents prepared</li><li>Agent and manufacturer documents aligned</li><li>Portal filing</li><li>Retention fee tracking</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After MD-15, import and distribute under conditions. <strong>Related services:</strong> MD-42, MDR registration and IVD registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Applying without MD-42.</li><li>Missing manufacturer approvals.</li><li>Incomplete DMF.</li><li>Unpaid retention fee.</li><li>Importing before licence.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on CDSCO scrutiny.</p>\n<blockquote><strong>Practical tip:</strong> keep ISO 13485 and approvals ready.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 requires import licences for devices to ensure quality and safety.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A distributor imports implants.</p>\n<h3>Scenario 2:</h3>\n<p>An agent imports diagnostic devices.</p>\n<h3>Scenario 3:</h3>\n<p>A brand updates models.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To obtain an MD-15 import licence, first confirm that your Indian entity holds a valid MD-42 wholesale licence and has authority from the foreign manufacturer. Prepare the manufacturer's regulatory approvals, ISO 13485 certificate, Device Master File, labelling and instructions for use, technical or clinical data and, for notified IVDs, performance evaluation reports. File Form MD-14 on the CDSCO portal with fees, respond to queries and receive MD-15. <strong>Planning checklist:</strong> list every model and manufacturing site, keep all documents in English, track the five-year retention fee and update the licence when products or sites change.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Form MD-15 (Import License) | JR Compliance",
          "metaDescription": "Form MD-15 is the import licence for medical devices granted by the Central Licensing Authority (CDSCO) on an application in Form MD-14, made through…",
          "keywords": "Form MD-15 (Import License), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/form-md-15-import-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-42 (Sell, Stock, Exhibit)",
              "href": "/approval/form-md-42-sell-stock-exhibit",
              "target": "same_tab"
            },
            {
              "label": "CDSCO In Vitro Diagnostics Registration",
              "href": "/approval/in-vitro-diagnostics",
              "target": "same_tab"
            },
            {
              "label": "Form MD-5 (Manufacturing License)",
              "href": "/approval/form-md-5-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-9 (Manufacturing License)",
              "href": "/approval/form-md-9-manufacturing-license",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "form-md-5-manufacturing-license",
      "matchSlugs": [
        "form-md-5-manufacturing-license"
      ],
      "matchNames": [
        "Form MD-5 (Manufacturing License)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 31,
        "originalRow": 48,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Form MD-5 (Manufacturing License)",
        "menuLabel": "Form MD-5 (Manufacturing License)",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Form MD-5 is the manufacturing licence for Class A and Class B medical devices on the manufacturer's own premises. The application is made in Form MD-3 to the State Licensing Authority through the CDSCO medical device portal, the SLA inspects the site, and grants the licence in Form MD-5. It stays valid perpetually if the retention fee is paid before every five years.\n\nWe prepare MD-3, premises and staff documents, the DMF and quality system and prepare you for inspection."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Form MD-5 (Manufacturing License)?",
          "paragraphs": [
            {
              "text": "An MD-5 licence is the State Licensing Authority's permission under the Medical Devices Rules, 2017 to manufacture low-risk (Class A) and low-moderate-risk (Class B) devices for sale or distribution at a specified manufacturing site. The manufacturer must maintain the quality management and technical documentation required by the Rules and is subject to inspection."
            },
            {
              "text": "Documents include constitution documents, premises ownership or lease proof and site plan, details of technical staff and qualifications, manufacturing process, machinery and testing facilities, Device Master File, labelling and IFU, and undertakings. Class A sterile or measuring devices also require a licence, while Class A non-sterile non-measuring devices are exempt."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who issues MD-5?",
              "answer": "The State Licensing Authority."
            },
            {
              "question": "Which classes are covered?",
              "answer": "Class A (sterile/measuring) and Class B."
            },
            {
              "question": "Which form applies?",
              "answer": "MD-3 application and MD-5 licence."
            },
            {
              "question": "How long is it valid?",
              "answer": "Perpetual with retention fee every five years."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Form MD-5 (Manufacturing License)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Domestic manufacturers of Class A and B devices such as dressings, syringes, thermometers, gloves and stethoscopes need MD-5.</p>\n<p>Startups with a small production unit should plan facility and staff.</p>\n<p>Brands using contract manufacturers can use loan licences.</p>\n<p>Class C and D manufacturers need MD-9.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal manufacturing of low-risk devices</li><li>Documents and DMF prepared</li><li>Inspection readiness</li><li>Portal filing</li><li>Perpetual validity with retention</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After MD-5, maintain QMS. <strong>Related services:</strong> MD-9, MD-6, MD-15 and MDR registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong class.</li><li>Weak facility.</li><li>Missing staff qualifications.</li><li>Incomplete DMF.</li><li>Unpaid retention fee.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on SLA inspection.</p>\n<blockquote><strong>Practical tip:</strong> prepare premises and QMS before filing.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 requires manufacturing licences for devices to ensure quality.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A glove maker applies.</p>\n<h3>Scenario 2:</h3>\n<p>A thermometer maker applies.</p>\n<h3>Scenario 3:</h3>\n<p>A startup builds a facility.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To get an MD-5 licence, start with the premises and the quality system. Make sure the site, equipment and testing facilities suit Class A or B devices, appoint qualified technical staff and prepare the Device Master File, manufacturing process description, labelling and instructions for use. File Form MD-3 on the CDSCO portal for the State Licensing Authority with fees, prepare for inspection and respond to queries. <strong>Planning checklist:</strong> keep premises ownership or lease documents ready, document staff qualifications, run a mock audit before inspection, and diarise the retention fee due before each five-year period ends.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Form MD-5 (Manufacturing License) | JR Compliance",
          "metaDescription": "Form MD-5 is the manufacturing licence for Class A and Class B medical devices on the manufacturer's own premises. The application is made in Form MD-3…",
          "keywords": "Form MD-5 (Manufacturing License), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/form-md-5-manufacturing-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-9 (Manufacturing License)",
              "href": "/approval/form-md-9-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-6 (Loan License)",
              "href": "/approval/form-md-6-loan-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-15 (Import License)",
              "href": "/approval/form-md-15-import-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-42 (Sell, Stock, Exhibit)",
              "href": "/approval/form-md-42-sell-stock-exhibit",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "form-md-9-manufacturing-license",
      "matchSlugs": [
        "form-md-9-manufacturing-license"
      ],
      "matchNames": [
        "Form MD-9 (Manufacturing License)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 32,
        "originalRow": 49,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Form MD-9 (Manufacturing License)",
        "menuLabel": "Form MD-9 (Manufacturing License)",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Form MD-9 is the manufacturing licence for Class C and Class D medical devices on the manufacturer's own premises. The application is made in Form MD-7 to the Central Licensing Authority (CDSCO) through the online system, and after audit or inspection the licence is granted in Form MD-9, valid perpetually subject to the five-yearly retention fee.\n\nWe prepare MD-7, the DMF, QMS, clinical or performance data and prepare you for CDSCO audit."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Form MD-9 (Manufacturing License)?",
          "paragraphs": [
            {
              "text": "An MD-9 licence is the Central Licensing Authority's permission under the Medical Devices Rules, 2017 to manufacture moderate-high (Class C) and high-risk (Class D) devices for sale or distribution at a specified site. Because of the higher risk, the application requires a full Device Master File and evidence of safety and performance, and may require clinical data."
            },
            {
              "text": "Documents include MD-7 with fee, constitution documents, premises proof and plant layout, DMF under the Fourth Schedule, risk management, QMS documents such as ISO 13485, validation records, details of technical staff, equipment and testing facilities, clinical investigation or performance evaluation data or permission, labelling and IFU. Validity is perpetual subject to the retention fee as per CDSCO's circular of 15 May 2024."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who grants MD-9?",
              "answer": "The Central Licensing Authority (CDSCO)."
            },
            {
              "question": "Which classes?",
              "answer": "Class C and Class D."
            },
            {
              "question": "Which form applies?",
              "answer": "MD-7 application."
            },
            {
              "question": "Is clinical data needed?",
              "answer": "It may be required."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Form MD-9 (Manufacturing License)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers of higher-risk devices such as implants, ventilators, infusion pumps and IVD kits (Class C and D) need MD-9.</p>\n<p>Companies scaling from Class B to C need to upgrade.</p>\n<p>Brands outsourcing manufacturing can use MD-10 loan licence.</p>\n<p>If your device is Class A or B, use MD-5.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal manufacturing of higher-risk devices</li><li>DMF and QMS prepared</li><li>Clinical data guidance</li><li>CDSCO audit readiness</li><li>Perpetual validity</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After MD-9, maintain QMS and report. <strong>Related services:</strong> MD-5, MD-10, MD-15 and IVD registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Weak clinical evidence.</li><li>Incomplete QMS.</li><li>Wrong classification.</li><li>Skipping audit prep.</li><li>Unpaid retention fee.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on CDSCO.</p>\n<blockquote><strong>Practical tip:</strong> prepare risk management and validation records early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 applies stricter controls to higher-risk devices.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>An implant maker applies.</p>\n<h3>Scenario 2:</h3>\n<p>A ventilator maker applies.</p>\n<h3>Scenario 3:</h3>\n<p>An IVD maker applies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>An MD-9 plan is heavier because Class C and D devices carry higher risk. Build a complete Device Master File, risk management file, quality management system (such as ISO 13485) and validation records, and assemble clinical or performance evidence where needed. File Form MD-7 with the Central Licensing Authority, prepare for audit and inspection and answer queries promptly. <strong>Planning checklist:</strong> invest early in quality systems, plan time for clinical data, train staff, keep labelling and instructions consistent with the DMF and track the retention fee under CDSCO's circular of 15 May 2024.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Form MD-9 (Manufacturing License) | JR Compliance",
          "metaDescription": "Form MD-9 is the manufacturing licence for Class C and Class D medical devices on the manufacturer's own premises. The application is made in Form MD-7…",
          "keywords": "Form MD-9 (Manufacturing License), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/form-md-9-manufacturing-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-5 (Manufacturing License)",
              "href": "/approval/form-md-5-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-10 (Loan License)",
              "href": "/approval/form-md-10-loan-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-15 (Import License)",
              "href": "/approval/form-md-15-import-license",
              "target": "same_tab"
            },
            {
              "label": "CDSCO In Vitro Diagnostics Registration",
              "href": "/approval/in-vitro-diagnostics",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "form-md-42-sell-stock-exhibit",
      "matchSlugs": [
        "form-md-42-sell-stock-exhibit"
      ],
      "matchNames": [
        "Form MD-42 (Sell, Stock, Exhibit)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 33,
        "originalRow": 50,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Form MD-42 (Sell, Stock, Exhibit)",
        "menuLabel": "Form MD-42 (Sell, Stock, Exhibit)",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Form MD-42 is the licence to sell, stock, exhibit or offer for sale or distribute medical devices, wholesale or retail, applied for in Form MD-41 under the Medical Devices Rules, 2017. CDSCO's citizen charter lists MD-41 and MD-42. It matters for importers because the Indian entity acting as authorised agent of a foreign manufacturer must hold a valid wholesale licence in MD-42 before applying for an import licence (MD-15).\n\nWe prepare MD-41, premises and storage documents and competent person details and follow up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Form MD-42 (Sell, Stock, Exhibit)?",
          "paragraphs": [
            {
              "text": "An MD-42 licence is a sale or wholesale licence for medical devices granted under the Medical Devices Rules, 2017. It authorises the licensee to stock and sell or distribute devices from specified premises under conditions such as storage, record-keeping and a competent person. For an Indian authorised agent of a foreign manufacturer it is the pre-condition for filing Form MD-14."
            },
            {
              "text": "Documents include MD-41 with fee, constitution documents, PAN, GST, ID of proprietor, partners or directors, premises ownership or lease proof, layout and storage details including cold chain for relevant devices, qualification details of the competent person or registered pharmacist, and undertaking. The sources reviewed list the form but do not state the issuing authority in detail or the validity terms."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is MD-42?",
              "answer": "A wholesale or sale licence for medical devices."
            },
            {
              "question": "Why do importers need it?",
              "answer": "The Indian authorised agent must hold it before applying for MD-15."
            },
            {
              "question": "Which form applies?",
              "answer": "MD-41 application."
            },
            {
              "question": "Is storage important?",
              "answer": "Yes, storage conditions must meet requirements."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Form MD-42 (Sell, Stock, Exhibit)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Distributors, wholesalers, retailers and importers or authorised agents dealing in medical devices need MD-42.</p>\n<p>Hospitals and clinics that buy directly may not need it, but suppliers do.</p>\n<p>Importers must obtain it before MD-14.</p>\n<p>If your premises are not suitable, upgrade before applying.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal sale and distribution of devices</li><li>Premises and storage documents prepared</li><li>Competent person details</li><li>Pre-condition for MD-15 met</li><li>Portal filing</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After MD-42, follow record-keeping rules. <strong>Related services:</strong> MD-15, MDR registration and loan licences.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Inadequate premises.</li><li>No competent person.</li><li>Missing documents.</li><li>Selling before licence.</li><li>Wrong authority.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary.</p>\n<blockquote><strong>Practical tip:</strong> confirm the issuing authority on the portal.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 regulates sale to ensure proper storage and traceability.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A distributor applies.</p>\n<h3>Scenario 2:</h3>\n<p>An importer's agent applies.</p>\n<h3>Scenario 3:</h3>\n<p>A retailer applies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For an MD-42 licence, prepare suitable premises with proper storage, including cold chain where devices need it, and nominate a competent person with the required qualification. Gather constitution documents, PAN, GST, identity of owners or directors, premises proof and layout, then file Form MD-41 on the portal with fees. The licensing authority may inspect. <strong>Planning checklist:</strong> keep storage records, maintain traceability of devices, check the authority and validity terms on the portal, and obtain MD-42 before applying for MD-15 if you are an import agent.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Form MD-42 (Sell, Stock, Exhibit) | JR Compliance",
          "metaDescription": "Form MD-42 is the licence to sell, stock, exhibit or offer for sale or distribute medical devices, wholesale or retail, applied for in Form MD-41 under…",
          "keywords": "Form MD-42 (Sell, Stock, Exhibit), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/form-md-42-sell-stock-exhibit"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-15 (Import License)",
              "href": "/approval/form-md-15-import-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-6 (Loan License)",
              "href": "/approval/form-md-6-loan-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-10 (Loan License)",
              "href": "/approval/form-md-10-loan-license",
              "target": "same_tab"
            },
            {
              "label": "Cosmetic CDSCO Registration",
              "href": "/approval/cosmetic-cdsco-registration",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "form-md-6-loan-license",
      "matchSlugs": [
        "form-md-6-loan-license"
      ],
      "matchNames": [
        "Form MD-6 (Loan License)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 34,
        "originalRow": 51,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Form MD-6 (Loan License)",
        "menuLabel": "Form MD-6 (Loan License)",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Form MD-6 is a loan licence to manufacture Class A and Class B medical devices at another licensed manufacturer's premises. The applicant, the loan licensee, applies in Form MD-4 to the State Licensing Authority, the licence is issued in Form MD-6 and remains valid perpetually if the retention fee is paid before every five years.\n\nWe prepare MD-4, the host agreement and documents and follow up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Form MD-6 (Loan License)?",
          "paragraphs": [
            {
              "text": "A loan licence is a legal authorisation for an entity without its own manufacturing facility to have devices manufactured at the licensed premises of another manufacturer. Under the Medical Devices Rules, 2017, MD-6 covers Class A and B devices, while MD-10 covers Class C and D. The loan licensee is responsible for the product, labelling and quality alongside the host manufacturer."
            },
            {
              "text": "Documents include MD-4 with fee, a copy of the host's valid MD-5 licence and the consent or agreement with the host, constitution documents, ID and address proofs and premises details of the loan licensee, device list, labelling and IFU, technical documents, quality arrangements and undertakings."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is a loan licence?",
              "answer": "Permission to manufacture at another licensee's premises."
            },
            {
              "question": "Who issues MD-6?",
              "answer": "The State Licensing Authority."
            },
            {
              "question": "Which classes?",
              "answer": "Class A and B."
            },
            {
              "question": "Is a host licence required?",
              "answer": "Yes, the host must hold MD-5."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Form MD-6 (Loan License)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Startups and brand owners who outsource manufacturing of low-risk medical devices to contract manufacturers need MD-6.</p>\n<p>Companies launching new devices without a plant benefit.</p>\n<p>Hosts must hold valid MD-5.</p>\n<p>If you want to own production, apply for MD-5.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Brand launch without owning a plant</li><li>Host agreement and documents prepared</li><li>Portal filing</li><li>Perpetual validity with retention</li><li>Quality responsibility clarity</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After MD-6, manage quality with the host. <strong>Related services:</strong> MD-5, MD-10, MD-42 and MDR registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Weak host agreement.</li><li>Host licence not valid.</li><li>Missing labelling.</li><li>Unclear responsibility.</li><li>Unpaid retention fee.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on SLA.</p>\n<blockquote><strong>Practical tip:</strong> confirm host licence validity.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 allows loan licensing with shared responsibility.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A brand outsources dressings.</p>\n<h3>Scenario 2:</h3>\n<p>A startup outsources thermometers.</p>\n<h3>Scenario 3:</h3>\n<p>A company adds devices.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To obtain an MD-6 loan licence, first choose a host manufacturer with a valid MD-5 licence for the devices you want to make, and sign a clear manufacturing agreement covering quality, labelling, responsibilities and changes. Prepare your constitution documents, device list, labelling, instructions for use and quality arrangements, then file Form MD-4 on the CDSCO portal with fees. <strong>Planning checklist:</strong> verify the host's licence status, define who handles complaints and recalls, keep both parties' documents aligned and diarise the retention fee.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Form MD-6 (Loan License) | JR Compliance",
          "metaDescription": "Form MD-6 is a loan licence to manufacture Class A and Class B medical devices at another licensed manufacturer's premises. The applicant, the loan…",
          "keywords": "Form MD-6 (Loan License), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/form-md-6-loan-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-5 (Manufacturing License)",
              "href": "/approval/form-md-5-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-10 (Loan License)",
              "href": "/approval/form-md-10-loan-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-42 (Sell, Stock, Exhibit)",
              "href": "/approval/form-md-42-sell-stock-exhibit",
              "target": "same_tab"
            },
            {
              "label": "Cosmetic CDSCO Registration",
              "href": "/approval/cosmetic-cdsco-registration",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "form-md-10-loan-license",
      "matchSlugs": [
        "form-md-10-loan-license"
      ],
      "matchNames": [
        "Form MD-10 (Loan License)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 35,
        "originalRow": 52,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Form MD-10 (Loan License)",
        "menuLabel": "Form MD-10 (Loan License)",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Form MD-10 is the loan licence to manufacture Class C and Class D medical devices at another licensee's premises. The application is made in Form MD-8. CDSCO's regulatory pathway lists MD-8 to MD-10 among the Central Licensing Authority's Class C and D licences, while one legal source says the State Licensing Authority issues it after inspection. It remains valid permanently if the retention fee is paid every five years, and one source lists the retention fee as Rs 50,000 per manufacturing site plus Rs 1,000 per distinct device.\n\nWe prepare MD-8, the host MD-9 and agreement, DMF and documents and prepare for inspection."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Form MD-10 (Loan License)?",
          "paragraphs": [
            {
              "text": "A Class C and D loan licence lets an entity without a factory manufacture higher-risk medical devices at the licensed premises of another manufacturer holding an MD-9 licence. It is governed by Rules 21 to 25 and 29 of the Medical Devices Rules, 2017."
            },
            {
              "text": "Documents include MD-8 with fee, a copy of the host's valid MD-9 and the agreement with the host, constitution documents and ID proofs of the applicant, Device Master File, labelling, IFU, technical and clinical documents and details of quality arrangements. The licence is issued after verification and a physical site inspection. The issuing authority differs between sources, so confirm on the portal."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which classes does MD-10 cover?",
              "answer": "Class C and D."
            },
            {
              "question": "Who issues it?",
              "answer": "CDSCO pathway shows the CLA; one source says the SLA."
            },
            {
              "question": "Is a host licence needed?",
              "answer": "Yes, MD-9."
            },
            {
              "question": "What is the retention fee?",
              "answer": "One source says Rs 50,000 per site plus Rs 1,000 per device."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Form MD-10 (Loan License)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Brand owners and startups marketing higher-risk devices such as implants, IVD kits and equipment made at contract manufacturers need MD-10.</p>\n<p>Companies without capital for a factory use this route.</p>\n<p>Hosts must hold MD-9.</p>\n<p>If your devices are Class A or B, use MD-6.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Brand launch without owning a plant</li><li>Host and documents verified</li><li>Inspection prepared</li><li>Portal filing</li><li>Perpetual validity</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After MD-10, manage quality with the host. <strong>Related services:</strong> MD-9, MD-6, MD-42 and MDR registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong authority assumption.</li><li>Weak host agreement.</li><li>Missing DMF.</li><li>Unpaid retention fee.</li><li>Skipping inspection prep.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on inspection.</p>\n<blockquote><strong>Practical tip:</strong> confirm the authority on the portal.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 allows loan licensing for higher-risk devices with oversight.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A brand outsources implants.</p>\n<h3>Scenario 2:</h3>\n<p>A startup outsources IVD kits.</p>\n<h3>Scenario 3:</h3>\n<p>A company changes host.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For an MD-10 loan licence, select a host with a valid MD-9 licence and agree responsibilities for quality, change control and complaint handling. Prepare the Device Master File, labelling, instructions for use and technical or clinical documents, then file Form MD-8 on the CDSCO portal with fees. Expect verification and a site inspection. Because the issuing authority is described differently in sources, confirm it on the portal. <strong>Planning checklist:</strong> check the retention fee (one source says Rs 50,000 per site plus Rs 1,000 per device), keep the host agreement current and plan for audits.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Form MD-10 (Loan License) | JR Compliance",
          "metaDescription": "Form MD-10 is the loan licence to manufacture Class C and Class D medical devices at another licensee's premises. The application is made in Form MD-8.…",
          "keywords": "Form MD-10 (Loan License), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/form-md-10-loan-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-9 (Manufacturing License)",
              "href": "/approval/form-md-9-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-6 (Loan License)",
              "href": "/approval/form-md-6-loan-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-42 (Sell, Stock, Exhibit)",
              "href": "/approval/form-md-42-sell-stock-exhibit",
              "target": "same_tab"
            },
            {
              "label": "Cosmetic CDSCO Registration",
              "href": "/approval/cosmetic-cdsco-registration",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "cosmetic-cdsco-registration",
      "matchSlugs": [
        "cosmetic-cdsco-registration"
      ],
      "matchNames": [
        "Cosmetic CDSCO Registration"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 36,
        "originalRow": 53,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Cosmetic CDSCO Registration",
        "menuLabel": "Cosmetic CDSCO Registration",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "Cosmetics in India are regulated under the Drugs and Cosmetics Act, 1940 and the Cosmetics Rules, 2020 (notified 15 December 2020). Imported cosmetics need an Import Registration Certificate (Form COS-1 application, Form COS-2 certificate) from CDSCO (Central Licensing Authority) via the SUGAM portal. Domestic manufacture needs a licence from the State Licensing Authority (COS-5 application, COS-8 licence; loan licence COS-6 and COS-9). Both are valid in perpetuity subject to a retention fee every five years.\n\nWe prepare the application, product categories, variants and documents and follow up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Cosmetic CDSCO Registration?",
          "paragraphs": [
            {
              "text": "Cosmetic registration is the legal approval required to import or manufacture articles that fall within the definition of 'cosmetic' under the Cosmetics Rules, 2020, covering around 80 product categories. Registration records the product categories, pack sizes, variants and manufacturing sites. Novel cosmetics need prior permission (Form COS-12 application, COS-3 permission)."
            },
            {
              "text": "Documents for import include manufacturer and importer details, power of attorney, free-sale or manufacturing licence from the country of origin, product list, labels, ingredient lists and GMP details. Fees (Third Schedule) include USD 1,000 per category, USD 500 per manufacturing site and USD 50 per variant. Validity is perpetual with retention fee per the Rules, though one page says five years. Processing time is quoted as 90 days, 180 working days or six months by different sources. A 22 July 2026 CDSCO circular asked authorities to step up vigilance against sale of imported cosmetics without a valid IRC."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form registers imports?",
              "answer": "COS-1 application and COS-2 certificate."
            },
            {
              "question": "Who licenses manufacture?",
              "answer": "The State Licensing Authority (COS-5 and COS-8)."
            },
            {
              "question": "How long is registration valid?",
              "answer": "Perpetual with retention fee; one page says five years."
            },
            {
              "question": "Are novel cosmetics treated differently?",
              "answer": "Yes, they need prior permission."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Cosmetic CDSCO Registration",
            "description": "<h2>Who Needs This Service</h2>\n<p>Importers, brand owners and manufacturers of skin care, hair care, makeup, personal care and other cosmetics sold in India need cosmetic registration.</p>\n<p>Foreign brands entering India need COS-2.</p>\n<p>Domestic manufacturers need COS-8 from the state authority.</p>\n<p>Contract-manufactured brands use loan licences.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal import and manufacture of cosmetics</li><li>Categories and variants mapped</li><li>SUGAM filing</li><li>Fee planning</li><li>Compliance with labelling</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, maintain labelling and renew. <strong>Related services:</strong> COS-2, COS-8, Trademark Registration and Legal Metrology registration.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Selling imported cosmetics without COS-2.</li><li>Wrong categories.</li><li>Incomplete documents.</li><li>Ignoring retention fee.</li><li>Relying on old timelines.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary widely.</p>\n<blockquote><strong>Practical tip:</strong> list categories, variants and sites before applying.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Cosmetics Rules, 2020 regulate import, manufacture and sale.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A foreign brand registers.</p>\n<h3>Scenario 2:</h3>\n<p>A manufacturer licenses.</p>\n<h3>Scenario 3:</h3>\n<p>A brand uses a loan licence.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Cosmetic CDSCO Registration | JR Compliance",
          "metaDescription": "Cosmetics in India are regulated under the Drugs and Cosmetics Act, 1940 and the Cosmetics Rules, 2020 (notified 15 December 2020). Imported cosmetics…",
          "keywords": "Cosmetic CDSCO Registration, CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/cosmetic-cdsco-registration"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "COS-2 (Cosmetic Import License)",
              "href": "/approval/cos-2-cosmetic-import-license",
              "target": "same_tab"
            },
            {
              "label": "COS-8 (Manufacturing License)",
              "href": "/approval/cos-8-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "CDSCO In Vitro Diagnostics Registration",
              "href": "/approval/in-vitro-diagnostics",
              "target": "same_tab"
            },
            {
              "label": "Drug CDSCO Registration",
              "href": "/approval/drug-cdsco-registration",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "cos-2-cosmetic-import-license",
      "matchSlugs": [
        "cos-2-cosmetic-import-license"
      ],
      "matchNames": [
        "COS-2 (Cosmetic Import License)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 37,
        "originalRow": 54,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "COS-2 (Cosmetic Import License)",
        "menuLabel": "COS-2 (Cosmetic Import License)",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "COS-2 is the Import Registration Certificate issued by the Central Licensing Authority (CDSCO) under rule 13 of the Cosmetics Rules, 2020 after an application in Form COS-1 on the SUGAM portal. A single application and single certificate can cover several cosmetics made by the same manufacturer at one manufacturing unit, including conjointly operating factories. It is valid in perpetuity if the retention fee is paid before five years from issue.\n\nWe prepare COS-1, product lists, authorisations and documents and follow up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is COS-2 (Cosmetic Import License)?",
          "paragraphs": [
            {
              "text": "A COS-2 is the registration certificate that permits import of specified cosmetic categories, brands, variants and pack sizes from named manufacturing sites into India. Cosmetics cannot be imported or sold without it. The applicant may be the manufacturer, its authorised agent, the Indian importer or the manufacturer's Indian subsidiary."
            },
            {
              "text": "Fees (Third Schedule): USD 1,000 per category for grant or retention, USD 500 per manufacturing site, USD 50 per variant and USD 1,000 per additional category. Processing is quoted as 90 days per a 2014 CDSCO circular, six months limit for refusal per Mondaq and up to 180 working days per another guide. Some categories are prohibited from import."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who issues COS-2?",
              "answer": "CDSCO's Central Licensing Authority."
            },
            {
              "question": "What are the fees?",
              "answer": "USD 1,000 per category, USD 500 per site and USD 50 per variant."
            },
            {
              "question": "Is it perpetual?",
              "answer": "Yes with retention fee per the Rules."
            },
            {
              "question": "Who can apply?",
              "answer": "Manufacturer, agent, importer or Indian subsidiary."
            }
          ]
        },
        "extraContent": [
          {
            "title": "COS-2 (Cosmetic Import License)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Importers and brand owners of foreign cosmetics (skin care, hair care, makeup, fragrances) selling in India need COS-2.</p>\n<p>Indian subsidiaries of foreign brands can apply.</p>\n<p>Distributors must ensure suppliers' registrations.</p>\n<p>If you manufacture in India, COS-8 applies.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal import of cosmetics</li><li>Category, site and variant fees planned</li><li>SUGAM filing</li><li>Documents prepared</li><li>Perpetual validity</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After COS-2, import and sell with labelling. <strong>Related services:</strong> Cosmetic CDSCO Registration, COS-8 and IEC Code.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Missing variants in application.</li><li>Wrong fee calculation.</li><li>Importing before COS-2.</li><li>Incomplete authorisation.</li><li>Ignoring retention.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Processing time varies by source.</p>\n<blockquote><strong>Practical tip:</strong> list variants and pack sizes carefully.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Rule 13 of the Cosmetics Rules, 2020 provides for import registration.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A skincare brand registers.</p>\n<h3>Scenario 2:</h3>\n<p>An importer adds variants.</p>\n<h3>Scenario 3:</h3>\n<p>A subsidiary applies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>A COS-2 plan starts with a list of every cosmetic you want to import: categories, brands, variants and pack sizes, and each manufacturing site. Collect authorisation from the manufacturer, free-sale or manufacturing licence from the country of origin, labels, ingredient lists and GMP details, and register on SUGAM. File Form COS-1 with the fees (USD 1,000 per category, USD 500 per site and USD 50 per variant per the sources). CDSCO scrutinises and issues COS-2. <strong>Planning checklist:</strong> avoid prohibited categories, check whether any product is a novel cosmetic needing COS-3, keep the retention fee in mind and ensure labels comply before shipping.</p>"
          }
        ],
        "seo": {
          "metaTitle": "COS-2 (Cosmetic Import License) | JR Compliance",
          "metaDescription": "COS-2 is the Import Registration Certificate issued by the Central Licensing Authority (CDSCO) under rule 13 of the Cosmetics Rules, 2020 after an…",
          "keywords": "COS-2 (Cosmetic Import License), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/cos-2-cosmetic-import-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Cosmetic CDSCO Registration",
              "href": "/approval/cosmetic-cdsco-registration",
              "target": "same_tab"
            },
            {
              "label": "COS-8 (Manufacturing License)",
              "href": "/approval/cos-8-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "CDSCO In Vitro Diagnostics Registration",
              "href": "/approval/in-vitro-diagnostics",
              "target": "same_tab"
            },
            {
              "label": "Drug CDSCO Registration",
              "href": "/approval/drug-cdsco-registration",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "cos-8-manufacturing-license",
      "matchSlugs": [
        "cos-8-manufacturing-license"
      ],
      "matchNames": [
        "COS-8 (Manufacturing License)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 38,
        "originalRow": 55,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "COS-8 (Manufacturing License)",
        "menuLabel": "COS-8 (Manufacturing License)",
        "sortOrder": 9,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "COS-8 is the cosmetics manufacturing licence granted by the State Licensing Authority under the Cosmetics Rules, 2020, on an application in Form COS-5 made through the online portal. A loan licence, to use another licensee's site, is applied for in Form COS-6 and issued in Form COS-9. According to a regulatory guide, the licence or loan licence is granted or refused within 45 days of application. It remains valid permanently as long as the retention fee is paid every five years.\n\nWe prepare COS-5 or COS-6, premises and staff documents and follow up."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is COS-8 (Manufacturing License)?",
          "paragraphs": [
            {
              "text": "A COS-8 manufacturing licence authorises a manufacturer to make cosmetics for sale or distribution at an inspected site within the State Licensing Authority's jurisdiction. Fees are set per ten items of each category of cosmetics and for additional items. A loan licence (COS-9) covers a brand owner using another licensee's site."
            },
            {
              "text": "Documents include COS-5 or COS-6 with fee, constitution documents, ID and address proofs, premises proof and plan, details of technical staff, machinery and testing facilities and product categories, and a self-certificate or undertaking of compliance. False information can lead to cancellation."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who issues COS-8?",
              "answer": "The State Licensing Authority."
            },
            {
              "question": "Which forms apply?",
              "answer": "COS-5 for own site and COS-6 for loan."
            },
            {
              "question": "How fast is the decision?",
              "answer": "A guide says within 45 days."
            },
            {
              "question": "How long is it valid?",
              "answer": "Permanent with retention fee every five years."
            }
          ]
        },
        "extraContent": [
          {
            "title": "COS-8 (Manufacturing License)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Domestic cosmetic manufacturers, contract manufacturers and brands that outsource production need COS-8 or COS-9.</p>\n<p>Startups launching beauty products from a facility need COS-8.</p>\n<p>Brands using contract units need COS-9.</p>\n<p>If you import, COS-2 is needed instead.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal manufacture of cosmetics</li><li>Documents and site plan prepared</li><li>State portal filing</li><li>Perpetual validity with retention</li><li>Loan licence option</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After COS-8, maintain GMP and labelling. <strong>Related services:</strong> Cosmetic CDSCO Registration, COS-2, GMP and Legal Metrology.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Weak premises.</li><li>Missing staff details.</li><li>False declarations.</li><li>Unpaid retention.</li><li>Mixing import and manufacturing routes.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Decision may take about 45 days.</p>\n<blockquote><strong>Practical tip:</strong> prepare site plan and staff details.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Cosmetics Rules, 2020 require state licences for manufacture.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A startup licenses a facility.</p>\n<h3>Scenario 2:</h3>\n<p>A brand uses COS-9.</p>\n<h3>Scenario 3:</h3>\n<p>A manufacturer adds categories.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For a COS-8 licence, prepare a suitable manufacturing site with the required staff, machinery and testing facilities and list the product categories. File Form COS-5 (or COS-6 for a loan licence) with the State Licensing Authority through the portal with the fee, which is set per ten items of each category. A guide says a decision is made within 45 days. <strong>Planning checklist:</strong> keep layout and staff documents ready, make a truthful self-certificate of compliance, plan GMP and labelling, pay the retention fee every five years and use COS-9 if you outsource production.</p>"
          }
        ],
        "seo": {
          "metaTitle": "COS-8 (Manufacturing License) | JR Compliance",
          "metaDescription": "COS-8 is the cosmetics manufacturing licence granted by the State Licensing Authority under the Cosmetics Rules, 2020, on an application in Form COS-5…",
          "keywords": "COS-8 (Manufacturing License), CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/cos-8-manufacturing-license"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Cosmetic CDSCO Registration",
              "href": "/approval/cosmetic-cdsco-registration",
              "target": "same_tab"
            },
            {
              "label": "COS-2 (Cosmetic Import License)",
              "href": "/approval/cos-2-cosmetic-import-license",
              "target": "same_tab"
            },
            {
              "label": "CDSCO In Vitro Diagnostics Registration",
              "href": "/approval/in-vitro-diagnostics",
              "target": "same_tab"
            },
            {
              "label": "Drug CDSCO Registration",
              "href": "/approval/drug-cdsco-registration",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "in-vitro-diagnostics",
      "matchSlugs": [
        "in-vitro-diagnostics",
        "cdsco-in-vitro-diagnostics-registration"
      ],
      "matchNames": [
        "CDSCO In Vitro Diagnostics Registration"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 39,
        "originalRow": 56,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "CDSCO In Vitro Diagnostics Registration",
        "menuLabel": "CDSCO In Vitro Diagnostics Registration",
        "sortOrder": 10,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "In vitro diagnostic (IVD) kits and reagents are regulated as medical devices under the Medical Devices Rules, 2017. CDSCO's IVD page lists the routes: import licence in MD-15 on application MD-14 for all classes; manufacturing licences for Class A and B (MD-5, on MD-3, State Licensing Authority) and Class C and D (MD-9, on MD-7, Central Licensing Authority); test licences (MD-12 and MD-13 for manufacture, MD-16 and MD-17 for import); and clinical performance evaluation (MD-24 application, MD-25 permission) for new IVDs.\n\nWe classify your IVD, plan performance evaluation and route and file."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is CDSCO In Vitro Diagnostics Registration?",
          "paragraphs": [
            {
              "text": "IVD medical devices are reagents, kits, calibrators and instruments used to examine specimens, such as blood, for diagnosis. They are classified A, B, C and D by risk, for example HIV, HBsAg and HCV kits fall in the higher classes. Certain IVDs need performance evaluation by designated labs such as NIB, NIV or AIIMS before licences are granted."
            },
            {
              "text": "Documents include application forms, Device Master File, ISO 13485 certificate, stability and analytical performance data, labelling and IFU, performance evaluation report from a CDSCO-listed laboratory for notified kits, entity documents, premises proof and QMS documents, and for imports an Indian authorised agent with MD-42 and the manufacturer's regulatory approvals. IVD classification lists were updated in 2021, 2023 and 2026."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Are IVDs medical devices?",
              "answer": "Yes, under MDR 2017."
            },
            {
              "question": "Who grants manufacturing licences?",
              "answer": "SLA for Class A/B; CLA for Class C/D."
            },
            {
              "question": "What is MD-25?",
              "answer": "Permission for clinical performance evaluation."
            },
            {
              "question": "Do all IVDs need evaluation?",
              "answer": "New IVDs need clinical performance evaluation."
            }
          ]
        },
        "extraContent": [
          {
            "title": "CDSCO In Vitro Diagnostics Registration",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers and importers of diagnostic test kits and reagents, rapid tests, blood glucose strips, HIV, HBV and HCV kits, molecular tests and IVD analysers, and their Indian authorised agents, need IVD registration.</p>\n<p>Startups developing diagnostics should plan performance evaluation early.</p>\n<p>Any new IVD needs clinical performance evaluation.</p>\n<p>If your kit is for research use only, check status.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Route identified by class</li><li>Performance evaluation planned</li><li>Documents prepared</li><li>Portal filing</li><li>Import or manufacturing licence obtained</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After licensing, comply with post-market requirements. <strong>Related services:</strong> MDR registration, MD-15, MD-9 and GMP.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong class.</li><li>Missing evaluation.</li><li>Weak stability data.</li><li>No MD-42 agent.</li><li>Unpaid retention fee.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on evaluation.</p>\n<blockquote><strong>Practical tip:</strong> schedule evaluation early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>MDR 2017 treats IVDs as devices with risk-based classification.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A rapid test maker licenses.</p>\n<h3>Scenario 2:</h3>\n<p>An importer registers kits.</p>\n<h3>Scenario 3:</h3>\n<p>A startup plans evaluation.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>An IVD plan starts with risk classification using CDSCO's lists. Decide whether you will import (MD-14 and MD-15 with an MD-42 agent) or manufacture (MD-3 and MD-5 for Class A and B, MD-7 and MD-9 for Class C and D), and whether you need a test licence (MD-12, MD-13, MD-16, MD-17) or clinical performance evaluation (MD-24 and MD-25). Arrange performance evaluation at a listed lab such as NIB for notified kits, assemble the Device Master File, ISO 13485 certificate and stability and analytical data, then file. <strong>Planning checklist:</strong> book evaluation slots early, keep documents in English, plan the retention fee and track classification list updates.</p>"
          }
        ],
        "seo": {
          "metaTitle": "CDSCO In Vitro Diagnostics Registration | JR Compliance",
          "metaDescription": "In vitro diagnostic (IVD) kits and reagents are regulated as medical devices under the Medical Devices Rules, 2017. CDSCO's IVD page lists the routes:…",
          "keywords": "CDSCO In Vitro Diagnostics Registration, CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/in-vitro-diagnostics"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Form MD-15 (Import License)",
              "href": "/approval/form-md-15-import-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-9 (Manufacturing License)",
              "href": "/approval/form-md-9-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Drug CDSCO Registration",
              "href": "/approval/drug-cdsco-registration",
              "target": "same_tab"
            },
            {
              "label": "MDR CDSCO Registration",
              "href": "/approval/mdr-cdsco-registration",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "cdsco-registration-page",
      "proposedSlug": "drug-cdsco-registration",
      "matchSlugs": [
        "drug-cdsco-registration"
      ],
      "matchNames": [
        "Drug CDSCO Registration"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 40,
        "originalRow": 57,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          }
        ]
      },
      "data": {
        "title": "Drug CDSCO Registration",
        "menuLabel": "Drug CDSCO Registration",
        "sortOrder": 11,
        "hero": {
          "eyebrow": "CDSCO Registration",
          "description": "For drugs, CDSCO handles the central routes under the Drugs and Cosmetics Act, 1940 and Rules, 1945 and the New Drugs and Clinical Trials Rules, 2019: Registration Certificate for import of drugs (application Form 40, certificate Form 41) and import licence (application Form 8, licence Form 10; Forms 8A and 10A for Schedule X drugs), plus new-drug and clinical-trial permissions. A foreign manufacturer's premises and each drug must first be registered before the import licence can be applied for.\n\nWe prepare Form 40 and documents, the agent and Site Master File and apply for import licence."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Drug CDSCO Registration?",
          "paragraphs": [
            {
              "text": "CDSCO registration for drugs means that a foreign manufacturer's site and its drugs are registered with CDSCO through an Indian authorised agent holding a wholesale licence, after which an Indian importer obtains an import licence. The Registration Certificate (Form 41) is generally valid for three years, and the import licence (Form 10 or 10A) is generally valid for three years or until the Registration Certificate expires, whichever is earlier."
            },
            {
              "text": "New drugs additionally need permission under the New Drugs and Clinical Trials Rules, 2019 before import or manufacture. Fees are in USD or INR equivalent: USD 1,500 for registration of premises or manufacturer per CDSCO guidance plus USD 1,000 for each drug per one source. Domestic manufacturing and sale licences follow separate state-level routes not covered here."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form registers drugs for import?",
              "answer": "Form 40 application and Form 41 certificate."
            },
            {
              "question": "Which form is the import licence?",
              "answer": "Form 10 (10A for Schedule X)."
            },
            {
              "question": "How long is Form 41 valid?",
              "answer": "Generally three years."
            },
            {
              "question": "Is registration needed before import licence?",
              "answer": "Yes."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Drug CDSCO Registration",
            "description": "<h2>Who Needs This Service</h2>\n<p>Foreign drug manufacturers, their Indian authorised agents, pharmaceutical importers and companies introducing new drugs in India need this service.</p>\n<p>Importers of Schedule X drugs use Forms 8A and 10A.</p>\n<p>Domestic manufacturers use state licences.</p>\n<p>Companies with new drugs also need permissions.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Registration and import licence route clear</li><li>Form 40 and documents prepared</li><li>Agent and SMF support</li><li>Import licence application</li><li>Renewal tracking</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After licensing, import and keep records. <strong>Related services:</strong> MDR registration, GMP, IEC Code and Legal Agreement drafting.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Applying for import licence before registration.</li><li>Weak SMF.</li><li>No wholesale agent.</li><li>Missing fees in USD.</li><li>Ignoring validity.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary by CDSCO scrutiny.</p>\n<blockquote><strong>Practical tip:</strong> confirm current fees.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Drugs and Cosmetics Rules, 1945 govern import and registration of drugs.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A foreign pharma registers.</p>\n<h3>Scenario 2:</h3>\n<p>An importer applies for Form 10.</p>\n<h3>Scenario 3:</h3>\n<p>A company seeks new drug permission.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Drug CDSCO Registration | JR Compliance",
          "metaDescription": "For drugs, CDSCO handles the central routes under the Drugs and Cosmetics Act, 1940 and Rules, 1945 and the New Drugs and Clinical Trials Rules, 2019:…",
          "keywords": "Drug CDSCO Registration, CDSCO Registration, JR Compliance",
          "canonicalUrl": "/approval/drug-cdsco-registration"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "MDR CDSCO Registration",
              "href": "/approval/mdr-cdsco-registration",
              "target": "same_tab"
            },
            {
              "label": "Form MD-15 (Import License)",
              "href": "/approval/form-md-15-import-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-5 (Manufacturing License)",
              "href": "/approval/form-md-5-manufacturing-license",
              "target": "same_tab"
            },
            {
              "label": "Form MD-9 (Manufacturing License)",
              "href": "/approval/form-md-9-manufacturing-license",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "aerb-approval-page",
      "proposedSlug": "aerb-diagnostic-x-ray-equipment",
      "matchSlugs": [
        "aerb-license/aerb-diagnostic-x-ray-equipment",
        "aerb-diagnostic-x-ray-equipment",
        "diagnostic-x-ray-equipment"
      ],
      "matchNames": [
        "Diagnostic X Ray Equipment"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 41,
        "originalRow": 61,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Diagnostic X Ray Equipment",
        "menuLabel": "Diagnostic X Ray Equipment",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "AERB Approval",
          "description": "Medical diagnostic X-ray equipment, including X-ray, CT, C-arm, mammography and dental units, cannot be used on patients without a licence from the Atomic Energy Regulatory Board (AERB) under the Atomic Energy (Radiation Protection) Rules, 2004. Users apply through AERB's e-governance system eLORA: register the institute, get an approved Radiological Safety Officer (RSO), obtain permission to procure equipment (type-approved models only), then apply for the licence for operation, valid for five years. Manufacturers and suppliers have their own authorisation routes.\n\nWe guide you through institute registration, RSO approval, procurement permission, QA tests and licence application."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Diagnostic X Ray Equipment?",
          "paragraphs": [
            {
              "text": "AERB regulation of diagnostic X-ray equipment is the legal control of design, manufacture, supply, installation, operation and decommissioning of medical X-ray equipment to protect patients, staff and the public from radiation. AERB Safety Code (AERB/SC/Med-2) sets the requirements. The regulatory chain is: manufacturers need a licence for commercial production, suppliers and service agencies need authorisation, equipment models need type approval, and users need a licence for operation with an RSO."
            },
            {
              "text": "Only AERB type-approved or registered models can be selected in eLORA. For pre-owned imports the maximum equipment age is ten years when the supplier is authorised by the OEM and seven years for a service agency. Facilities must have radiation safety devices and minimum qualified personnel. A separate RSO approval applies for CT and interventional radiology. One secondary source says no licence or processing fee is currently charged."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long is the licence valid?",
              "answer": "Up to five years."
            },
            {
              "question": "Is an RSO required?",
              "answer": "Yes, an AERB-approved RSO."
            },
            {
              "question": "Can any model be bought?",
              "answer": "Only type-approved models."
            },
            {
              "question": "Is there a fee?",
              "answer": "One source says none currently."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Diagnostic X Ray Equipment",
            "description": "<h2>Who Needs This Service</h2>\n<p>Hospitals, diagnostic centres, clinics, dental practices and mobile X-ray units need this licence. Suppliers, service agencies and manufacturers who serve them have separate requirements.</p>\n<p>New clinics should plan approvals before buying equipment.</p>\n<p>Existing facilities must renew before expiry.</p>\n<p>If you buy pre-owned equipment, check age limits.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal operation of X-ray equipment</li><li>eLORA registration and RSO handled</li><li>Procurement permission obtained</li><li>Licence application prepared</li><li>Renewal support</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After licensing, perform QA and report. <strong>Related services:</strong> AERB RSO, Type Approval, NOC and Operating Licence.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Buying unapproved equipment.</li><li>No RSO.</li><li>Weak shielding.</li><li>Missing QA.</li><li>Late renewal.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on AERB review.</p>\n<blockquote><strong>Practical tip:</strong> obtain procurement permission first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Atomic Energy (Radiation Protection) Rules, 2004 require licensing of radiation practices.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A clinic licenses X-ray.</p>\n<h3>Scenario 2:</h3>\n<p>A hospital licenses CT.</p>\n<h3>Scenario 3:</h3>\n<p>A dental centre renews.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>The X-ray licensing path has a clear order. Register your institute on eLORA, nominate an RSO and get approval, obtain procurement permission, buy only a type-approved model from an authorised supplier, install in a properly shielded room and complete QA tests. Then apply for the licence for operation with the layout, QA report and personnel qualifications. <strong>Planning checklist:</strong> check the age limits for pre-owned equipment (ten years via an OEM-authorised supplier, seven via a service agency), keep TLD badges and records, plan periodic QA and renew before the five-year validity ends.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Diagnostic X Ray Equipment | JR Compliance",
          "metaDescription": "Medical diagnostic X-ray equipment, including X-ray, CT, C-arm, mammography and dental units, cannot be used on patients without a licence from the…",
          "keywords": "Diagnostic X Ray Equipment, AERB Approval, JR Compliance",
          "canonicalUrl": "/approval/aerb-diagnostic-x-ray-equipment"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "RSO",
              "href": "/approval/rso",
              "target": "same_tab"
            },
            {
              "label": "Type Approval",
              "href": "/approval/type-approval",
              "target": "same_tab"
            },
            {
              "label": "NOC",
              "href": "/approval/noc",
              "target": "same_tab"
            },
            {
              "label": "License for Operations",
              "href": "/approval/license-for-operations",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "aerb-approval-page",
      "proposedSlug": "noc",
      "matchSlugs": [
        "noc"
      ],
      "matchNames": [
        "NOC"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 42,
        "originalRow": 62,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "NOC",
        "menuLabel": "NOC",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "AERB Approval",
          "description": "AERB issues No Objection Certificates (NOCs) in the equipment approval chain. For X-ray based equipment, an NOC for import of a prototype for type approval is needed before a recognised supplier imports a model for evaluation, and the Equipment Type Approval, Type Registration or NOC route on eLORA covers consumer products and scanning facilities. Without a valid type approval or NOC, the end user cannot select the equipment in eLORA.\n\nWe prepare supplier registration, technical details and filing."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is NOC?",
          "paragraphs": [
            {
              "text": "An AERB NOC is a regulatory clearance under the Atomic Energy (Radiation Protection) Rules, 2004 confirming that an import or equipment model may proceed in the licensing process, for example import of a prototype X-ray machine for type-approval testing, or NOC for self-shielded X-ray based equipment used for baggage scanning, X-ray inspection, XRF or XRD. It is issued only if the equipment satisfies the AERB safety code and standards in force."
            },
            {
              "text": "Documents include supplier registration on eLORA, technical details and specifications, radiation safety data and test reports, technical reference tables and RSO details where a test facility exists. Fees and timelines were not retrieved from AERB pages."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is an AERB NOC?",
              "answer": "Clearance in the equipment approval and import process."
            },
            {
              "question": "When is it needed?",
              "answer": "For prototype imports for type approval and certain equipment categories."
            },
            {
              "question": "Where is it applied?",
              "answer": "On eLORA."
            },
            {
              "question": "Can users buy without approval?",
              "answer": "No."
            }
          ]
        },
        "extraContent": [
          {
            "title": "NOC",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers and suppliers of X-ray equipment, baggage and food scanners, X-ray inspection systems, XRF and XRD devices and PCB analysers, and their importers, need NOCs.</p>\n<p>Startups building scanning products should plan NOC.</p>\n<p>Importers should obtain NOC before import.</p>\n<p>Users should check supplier approvals.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Clearance for import and approval steps</li><li>eLORA filing</li><li>Technical documents</li><li>Smooth type approval path</li><li>Reduced import delays</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After NOC, proceed to type approval. <strong>Related services:</strong> Type Approval, Diagnostic X-ray licence and RSO.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Importing without NOC.</li><li>Weak data.</li><li>No RSO for test facility.</li><li>Wrong category.</li><li>Late filing.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines unknown.</p>\n<blockquote><strong>Practical tip:</strong> confirm requirements on eLORA.</blockquote>\n\n<h2>Additional Information</h2>\n<p>AERB regulates radiation equipment to protect safety.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A supplier imports a prototype.</p>\n<h3>Scenario 2:</h3>\n<p>A scanner maker applies.</p>\n<h3>Scenario 3:</h3>\n<p>An XRF vendor checks requirements.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To use the NOC and type approval chain, suppliers first register on eLORA and, where they have a test facility, obtain RSO approval. They apply for an NOC to import a prototype if needed, import and test it, and then apply for Equipment Type Approval, Type Registration or NOC with technical data, shielding and radiation safety information. Users later choose approved models in eLORA. <strong>Planning checklist:</strong> keep technical files organised, plan prototype testing time, confirm the safety code applicable to your equipment category and track any updates to the NOC process.</p>"
          }
        ],
        "seo": {
          "metaTitle": "NOC | JR Compliance",
          "metaDescription": "AERB issues No Objection Certificates (NOCs) in the equipment approval chain. For X-ray based equipment, an NOC for import of a prototype for type…",
          "keywords": "NOC, AERB Approval, JR Compliance",
          "canonicalUrl": "/approval/noc"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Type Approval",
              "href": "/approval/type-approval",
              "target": "same_tab"
            },
            {
              "label": "Diagnostic X Ray Equipment",
              "href": "/approval/aerb-diagnostic-x-ray-equipment",
              "target": "same_tab"
            },
            {
              "label": "RSO",
              "href": "/approval/rso",
              "target": "same_tab"
            },
            {
              "label": "License for Operations",
              "href": "/approval/license-for-operations",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "aerb-approval-page",
      "proposedSlug": "type-approval",
      "matchSlugs": [
        "type-approval"
      ],
      "matchNames": [
        "Type Approval"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 43,
        "originalRow": 63,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Type Approval",
        "menuLabel": "Type Approval",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "AERB Approval",
          "description": "AERB Type Approval, or Type Registration, certifies that a model of radiation-emitting equipment meets the safety specifications of the applicable AERB code. For X-ray based equipment such as X-ray inspection systems, food scanners, X-ray diffractometers and handheld or cabinet XRF devices and PCB analysers, foreign-make suppliers must obtain it through eLORA before sale. Source Type Approval applies to equipment with radioactive sources made in India.\n\nWe prepare supplier registration, technical files and test data and file."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Type Approval?",
          "paragraphs": [
            {
              "text": "Type approval is AERB's approval of the design or model of equipment containing radiation sources or X-ray generators, evaluated against the AERB Safety Code and standards. It is granted to the model, after which units of that model can be supplied and licensed. For diagnostic X-ray equipment, models must be AERB type-approved before users can buy them, and X-ray tube and tube-insert models must be registered through eLORA."
            },
            {
              "text": "Documents include technical documentation of the model, specifications, shielding and safety interlocks, radiation leakage and performance data, test reports, samples or prototype under NOC, evaluation tables for self-shielded equipment and declarations including lifetime servicing for diagnostic X-ray equipment. Fees and validity were not retrieved."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Why is type approval needed?",
              "answer": "Users can select only type-approved models in eLORA."
            },
            {
              "question": "Is it per model?",
              "answer": "Yes."
            },
            {
              "question": "What data is needed?",
              "answer": "Technical specs, shielding and test data."
            },
            {
              "question": "Is servicing required?",
              "answer": "Lifetime servicing is a declaration for diagnostic X-ray equipment."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Type Approval",
            "description": "<h2>Who Needs This Service</h2>\n<p>X-ray equipment and tube manufacturers, suppliers and importers, and makers of scanners, XRF and XRD and inspection systems need type approval.</p>\n<p>Brands planning new models should plan testing.</p>\n<p>Users need approved models.</p>\n<p>If you only resell approved models, check supplier authorisation.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Model approved for supply</li><li>Technical file prepared</li><li>eLORA filing</li><li>Test coordination</li><li>Market access</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After approval, supply to licensed users. <strong>Related services:</strong> NOC, Diagnostic X-ray licence and RSO.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Incomplete technical file.</li><li>No prototype NOC.</li><li>Ignoring updates.</li><li>Selling unapproved models.</li><li>Weak servicing plan.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on evaluation.</p>\n<blockquote><strong>Practical tip:</strong> prepare test data early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Type approval ensures equipment design meets safety codes.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A maker gets approval.</p>\n<h3>Scenario 2:</h3>\n<p>An importer approves a model.</p>\n<h3>Scenario 3:</h3>\n<p>A supplier registers tubes.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>A type approval plan starts with the model's technical dossier: specifications, shielding, interlocks, radiation leakage and performance data, test reports and a servicing commitment. Register as a supplier on eLORA, import a prototype under NOC if required, submit the application and respond to AERB's evaluation. Once approved, the model appears in eLORA so users can buy it. <strong>Planning checklist:</strong> freeze the design before testing, retain test evidence, maintain manufacturing consistency and inform AERB of significant design changes.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Type Approval | JR Compliance",
          "metaDescription": "AERB Type Approval, or Type Registration, certifies that a model of radiation-emitting equipment meets the safety specifications of the applicable AERB…",
          "keywords": "Type Approval, AERB Approval, JR Compliance",
          "canonicalUrl": "/approval/type-approval"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "NOC",
              "href": "/approval/noc",
              "target": "same_tab"
            },
            {
              "label": "Diagnostic X Ray Equipment",
              "href": "/approval/aerb-diagnostic-x-ray-equipment",
              "target": "same_tab"
            },
            {
              "label": "RSO",
              "href": "/approval/rso",
              "target": "same_tab"
            },
            {
              "label": "License for Operations",
              "href": "/approval/license-for-operations",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "aerb-approval-page",
      "proposedSlug": "license-for-operations",
      "matchSlugs": [
        "license-for-operations"
      ],
      "matchNames": [
        "License for Operations"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 44,
        "originalRow": 64,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "License for Operations",
        "menuLabel": "License for Operations",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "AERB Approval",
          "description": "A Licence for Operation from AERB is mandatory for operating medical diagnostic X-ray equipment under the Atomic Energy (Radiation Protection) Rules, 2004. No equipment may be operated for patient diagnosis without it. It is applied for through eLORA after RSO approval and procurement permission, is valid up to five years and is renewed through the eLORA renewal facility. Manufacturers of X-ray equipment and tubes need a separate a-priori licence for commercial production.\n\nWe prepare documents, QA reports, layouts and file."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is License for Operations?",
          "paragraphs": [
            {
              "text": "A licence for operation is the regulatory permission to use a radiation facility or equipment after AERB is satisfied that the installation, personnel and safety systems comply with the safety code. For existing, new and pre-owned diagnostic X-ray equipment, eLORA has separate application paths. Licence conditions include responsibilities of the employer, licensee and RSO under the Rules and AERB/SC/Med-2, periodic safety status reports and renewal before expiry."
            },
            {
              "text": "Documents include eLORA institute registration, approved RSO with TLD number and training certificate, valid type approval or NOC of the equipment, procurement permission, QA report, room layout and shielding details, radiation safety devices, qualification certificates and previous licence details for renewal."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long is it valid?",
              "answer": "Up to five years."
            },
            {
              "question": "What is needed first?",
              "answer": "RSO approval and procurement permission."
            },
            {
              "question": "Is there a fee?",
              "answer": "One source says none currently."
            },
            {
              "question": "Can I use equipment before licence?",
              "answer": "No."
            }
          ]
        },
        "extraContent": [
          {
            "title": "License for Operations",
            "description": "<h2>Who Needs This Service</h2>\n<p>Hospitals, diagnostic centres, dental clinics, mobile X-ray services and other users of regulated diagnostic X-ray equipment need this licence.</p>\n<p>New facilities need it before use.</p>\n<p>Existing licensees must renew in time.</p>\n<p>Suppliers should confirm customers' licences.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Legal use of X-ray equipment</li><li>Documents and QA prepared</li><li>eLORA filing</li><li>Valid up to five years</li><li>Renewal reminders</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After licensing, submit periodic reports. <strong>Related services:</strong> Diagnostic X-ray, RSO, Type Approval and NOC.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Using equipment before licence.</li><li>No QA.</li><li>Poor layout.</li><li>Missing RSO.</li><li>Late renewal.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on AERB review.</p>\n<blockquote><strong>Practical tip:</strong> complete QA tests before applying.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Licensing ensures safe operation of radiation equipment.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A clinic licenses.</p>\n<h3>Scenario 2:</h3>\n<p>A hospital renews.</p>\n<h3>Scenario 3:</h3>\n<p>A mobile unit applies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To obtain the operating licence, complete the preparatory steps in order: institute registration, RSO approval and procurement permission. After installation, run QA tests and collect the layout and shielding details, type approval of the equipment, personnel qualifications and previous licence details if you are renewing. Apply on eLORA, respond to AERB queries and receive the licence valid up to five years. <strong>Planning checklist:</strong> submit periodic safety reports, request modifications through eLORA when you change equipment or layout, and renew before expiry.</p>"
          }
        ],
        "seo": {
          "metaTitle": "License for Operations | JR Compliance",
          "metaDescription": "A Licence for Operation from AERB is mandatory for operating medical diagnostic X-ray equipment under the Atomic Energy (Radiation Protection) Rules,…",
          "keywords": "License for Operations, AERB Approval, JR Compliance",
          "canonicalUrl": "/approval/license-for-operations"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Diagnostic X Ray Equipment",
              "href": "/approval/aerb-diagnostic-x-ray-equipment",
              "target": "same_tab"
            },
            {
              "label": "RSO",
              "href": "/approval/rso",
              "target": "same_tab"
            },
            {
              "label": "Type Approval",
              "href": "/approval/type-approval",
              "target": "same_tab"
            },
            {
              "label": "NOC",
              "href": "/approval/noc",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "aerb-approval-page",
      "proposedSlug": "rso",
      "matchSlugs": [
        "rso"
      ],
      "matchNames": [
        "RSO",
        "Nominate RSO"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 45,
        "originalRow": 65,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "RSO",
        "menuLabel": "RSO",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "AERB Approval",
          "description": "A Radiological Safety Officer (RSO) is the person responsible for radiation safety at an AERB-regulated facility, and an AERB-approved RSO is mandatory for obtaining any operating licence. The RSO registers in eLORA as a radiation professional, the employer nominates the RSO through the Nominate RSO form, and AERB grants approval. Separate RSO approval applies for CT and interventional radiology. Approval is time-bound, and renewal or re-nomination is initiated by the employer.\n\nWe help with RP registration, documents, TLD number and nomination."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is RSO?",
          "paragraphs": [
            {
              "text": "The RSO is the designated radiation safety professional who ensures the facility meets the AERB Safety Code and the Atomic Energy (Radiation Protection) Rules, 2004: monitoring exposures, QA, maintaining records and liaising with AERB through eLORA. The minimum qualification and training are prescribed by AERB. For diagnostic radiology, safety documents list, for example, an X-ray technologist from a recognised institution with three years' experience as one acceptable qualification."
            },
            {
              "text": "Documents include the RP registration form, certificate of the course 'Radiation Safety and Quality Assurance in Diagnostic Radiology', educational and experience certificates, ID proof, photograph, TLD number and employer's nomination in eLORA. Approval is time-bound; the renomination button is deactivated one month before expiry for currently approved RSOs per AERB guidelines."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who nominates the RSO?",
              "answer": "The employer through eLORA."
            },
            {
              "question": "Is a TLD number needed?",
              "answer": "Yes for most practices."
            },
            {
              "question": "Is separate approval needed for CT?",
              "answer": "Yes, for CT and interventional radiology."
            },
            {
              "question": "Is approval time-bound?",
              "answer": "Yes, with renewal."
            }
          ]
        },
        "extraContent": [
          {
            "title": "RSO",
            "description": "<h2>Who Needs This Service</h2>\n<p>Radiologists, X-ray technologists, medical physicists and safety professionals designated as RSOs in hospitals, diagnostic centres, supplier and service agencies and manufacturers need this approval.</p>\n<p>Facilities must nominate an RSO for every licence.</p>\n<p>RSOs leaving a facility must be undesignated.</p>\n<p>If you use CT or interventional radiology, separate approval applies.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>RSO approval for licence</li><li>eLORA nomination handled</li><li>Documents and TLD guidance</li><li>Renewal and re-nomination</li><li>Compliance continuity</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After approval, apply for licence. <strong>Related services:</strong> Diagnostic X-ray licence, License for Operations, Type Approval and NOC.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Missing training certificate.</li><li>No TLD number.</li><li>Late renewal.</li><li>No undesignation on exit.</li><li>Wrong practice category.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Approval timing depends on AERB.</p>\n<blockquote><strong>Practical tip:</strong> complete the training course first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>RSOs are mandated under AERB safety codes to protect staff and patients.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A technologist becomes RSO.</p>\n<h3>Scenario 2:</h3>\n<p>A hospital replaces an RSO.</p>\n<h3>Scenario 3:</h3>\n<p>An RSO renews.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>The RSO route starts with training. The candidate completes the course on radiation safety and QA in diagnostic radiology, registers on eLORA as a radiation professional with certificates and ID, and obtains a TLD number. The employer then files the Nominate RSO form, and AERB grants approval. <strong>Planning checklist:</strong> check separate approvals for CT and interventional radiology, renew or re-nominate before expiry (the renomination option closes one month before expiry), undesignate departing RSOs promptly and keep dosimetry records.</p>"
          }
        ],
        "seo": {
          "metaTitle": "RSO | JR Compliance",
          "metaDescription": "A Radiological Safety Officer (RSO) is the person responsible for radiation safety at an AERB-regulated facility, and an AERB-approved RSO is mandatory…",
          "keywords": "RSO, AERB Approval, JR Compliance",
          "canonicalUrl": "/approval/rso"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Diagnostic X Ray Equipment",
              "href": "/approval/aerb-diagnostic-x-ray-equipment",
              "target": "same_tab"
            },
            {
              "label": "License for Operations",
              "href": "/approval/license-for-operations",
              "target": "same_tab"
            },
            {
              "label": "Type Approval",
              "href": "/approval/type-approval",
              "target": "same_tab"
            },
            {
              "label": "NOC",
              "href": "/approval/noc",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "lmpc-certification-page",
      "proposedSlug": "packaged-commodity-registration",
      "matchSlugs": [
        "packaged-commodity-registration"
      ],
      "matchNames": [
        "Packaged Commodity Registration"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 46,
        "originalRow": 69,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Packaged Commodity Registration",
        "menuLabel": "Packaged Commodity Registration",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "LMPC Certification",
          "description": "Every manufacturer, packer or importer of pre-packaged commodities in India must register under Rule 27 of the Legal Metrology (Packaged Commodities) Rules, 2011 (Legal Metrology Act, 2009) with the Controller of Legal Metrology of the state where the unit is located. Applications are made on the state or central Legal Metrology portal with entity documents, sample label and the prescribed fee (Rs 750 in one state's published SOP), and the registration must be applied for within 90 days of starting packing or importing.\n\nWe prepare documents, label declarations and file."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Packaged Commodity Registration?",
          "paragraphs": [
            {
              "text": "LMPC registration is the registration that allows a business to pre-pack or import commodities for sale in India, subject to the mandatory declarations on the package: name and address of the manufacturer, packer or importer, common or generic name, net quantity, month and year of manufacture or import, maximum retail price (MRP) and consumer care details. The labelling rules are in Rules 6 to 17 of the Packaged Commodities Rules, 2011."
            },
            {
              "text": "Registration is with the Controller of Legal Metrology of the state. Validity differs: Goa's department says one-time approval, while another source says importer registration is effective for five years and renewable. Fees and portals vary by state. Certain items are exempt under Rule 26."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who must register?",
              "answer": "Manufacturers, packers and importers of pre-packaged commodities."
            },
            {
              "question": "Within how many days?",
              "answer": "Within 90 days of starting packing or importing, per a state SOP."
            },
            {
              "question": "Is registration one-time?",
              "answer": "Goa says one-time; another source says five years for importers."
            },
            {
              "question": "What must the label show?",
              "answer": "Name and address, net quantity, MRP, date and consumer care details."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Packaged Commodity Registration",
            "description": "<h2>Who Needs This Service</h2>\n<p>Food, FMCG, cosmetics, garment and other manufacturers and packers, e-commerce sellers who pack goods and importers of packaged goods need registration.</p>\n<p>Startups launching packaged products must register.</p>\n<p>Importers must register before selling.</p>\n<p>If your product is exempt, confirm.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Compliance with packaging declarations</li><li>State registration done correctly</li><li>Label checked for MRP and net quantity</li><li>Fee and portal handled</li><li>Reduced penalties</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After registration, follow labelling and MRP rules. <strong>Related services:</strong> Model Approval, Trademark Registration, FSSAI registration and EPR Plastic.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Missing declarations.</li><li>Wrong net quantity units.</li><li>Not registering.</li><li>Wrong state portal.</li><li>Ignoring updates.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary by state.</p>\n<blockquote><strong>Practical tip:</strong> check label drafts first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The Legal Metrology Act, 2009 protects consumers through standard declarations.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A snack brand registers.</p>\n<h3>Scenario 2:</h3>\n<p>An importer registers.</p>\n<h3>Scenario 3:</h3>\n<p>A packer updates labels.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To register under the Packaged Commodities Rules, first review your labels for the mandatory declarations: name and address of the manufacturer, packer or importer, common name, net quantity, month and year of manufacture or import, MRP and consumer care details. Prepare entity documents, a sample label and, for importers, the IEC. File on your state's Legal Metrology portal within 90 days of starting packing or importing, and pay the fee, for example Rs 750 in one state's SOP. <strong>Planning checklist:</strong> confirm your state's validity rule (one-time or five years), keep label proofs, update registration after address changes and check whether your product is exempt.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Packaged Commodity Registration | JR Compliance",
          "metaDescription": "Every manufacturer, packer or importer of pre-packaged commodities in India must register under Rule 27 of the Legal Metrology (Packaged Commodities)…",
          "keywords": "Packaged Commodity Registration, LMPC Certification, JR Compliance",
          "canonicalUrl": "/approval/packaged-commodity-registration"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Model Approval",
              "href": "/approval/model-approval",
              "target": "same_tab"
            },
            {
              "label": "EPR- Plastic waste",
              "href": "/approval/epr-plastic-waste",
              "target": "same_tab"
            },
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            },
            {
              "label": "ISO 9001 QMS",
              "href": "/approval/iso-9001-qms",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "lmpc-certification-page",
      "proposedSlug": "model-approval",
      "matchSlugs": [
        "model-approval"
      ],
      "matchNames": [
        "Model Approval"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 47,
        "originalRow": 70,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Model Approval",
        "menuLabel": "Model Approval",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "LMPC Certification",
          "description": "Under the Legal Metrology (Approval of Models) Rules, 2011, manufacturers and importers of weighing and measuring instruments prescribed under the Legal Metrology Act, 2009 must obtain government approval of the model before manufacturing or importing it. The application goes to the Director of Legal Metrology (Department of Consumer Affairs) in the prescribed form, with technical drawings and specifications, and the model approval certificate is issued only after the model passes the required checks and tests.\n\nWe prepare drawings, specifications and samples and file."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Model Approval?",
          "paragraphs": [
            {
              "text": "Model approval, or pattern approval, is the central approval of the design of a weighing or measuring instrument, such as weighing scales, fuel dispensers and taximeters, confirming that it conforms to the Act and Rules and is capable of being verified. Only approved models can then be manufactured, imported, verified and stamped. It is separate from state-level manufacturer, dealer, repairer and importer licences and registrations."
            },
            {
              "text": "Documents include the application, model technical drawing and specifications, description of the instrument and metrological features, sample(s) for testing, test reports, entity documents and for importers authorisation and IEC. Sources quote different fees for digital and analog equipment. Importer registration, where applicable, is effective for five years per one source."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who approves models?",
              "answer": "The Director of Legal Metrology."
            },
            {
              "question": "Is approval needed before import?",
              "answer": "Yes."
            },
            {
              "question": "What is needed?",
              "answer": "Technical drawings, specifications and samples."
            },
            {
              "question": "Are fees the same?",
              "answer": "Sources quote different fees for digital and analog."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Model Approval",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers and importers of weighing scales, weights, fuel dispensers, taximeters and other legal metrology instruments need model approval.</p>\n<p>Startups building smart scales should plan approval.</p>\n<p>Importers must obtain approval first.</p>\n<p>State licences follow approval.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Approved model for manufacture and import</li><li>Drawings and samples prepared</li><li>Central filing</li><li>Testing support</li><li>Foundation for state licences</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After approval, apply for state licences. <strong>Related services:</strong> Packaged Commodity registration, ISO certification and BIS Certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Importing before approval.</li><li>Weak drawings.</li><li>No samples.</li><li>Wrong fee.</li><li>Skipping state licences.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on tests.</p>\n<blockquote><strong>Practical tip:</strong> prepare samples and drawings.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Model approval ensures instruments are accurate and verifiable.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A scale maker applies.</p>\n<h3>Scenario 2:</h3>\n<p>A dispenser maker applies.</p>\n<h3>Scenario 3:</h3>\n<p>An importer applies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For model approval, prepare a technical dossier: drawings, specifications, description of the instrument and its metrological features, and samples for testing. File the application with the Director of Legal Metrology in the Department of Consumer Affairs with the fee, which differs for digital and analog equipment according to sources. The model is tested and, if it complies, a model approval certificate is issued. <strong>Planning checklist:</strong> finalise the design before filing, keep test reports, apply for state licences (manufacturer, dealer, repairer, importer) after approval and plan verification and stamping of units.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Model Approval | JR Compliance",
          "metaDescription": "Under the Legal Metrology (Approval of Models) Rules, 2011, manufacturers and importers of weighing and measuring instruments prescribed under the…",
          "keywords": "Model Approval, LMPC Certification, JR Compliance",
          "canonicalUrl": "/approval/model-approval"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Packaged Commodity Registration",
              "href": "/approval/packaged-commodity-registration",
              "target": "same_tab"
            },
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            },
            {
              "label": "EPR- Plastic waste",
              "href": "/approval/epr-plastic-waste",
              "target": "same_tab"
            },
            {
              "label": "ISO 9001 QMS",
              "href": "/approval/iso-9001-qms",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "stqc-certification",
      "matchSlugs": [
        "stqc-certification"
      ],
      "matchNames": [
        "STQC Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 48,
        "originalRow": 74,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "STQC Certification",
        "menuLabel": "STQC Certification",
        "sortOrder": 0,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC (Standardisation Testing and Quality Certification Directorate) is an attached office of the Ministry of Electronics and Information Technology (MeitY). Its Certification Services offer management-system certification (ISO 9001 QMS, ISO 27001 ISMS and ITSM) and product and system certification (S-Mark safety, biometric devices, QR code scanners, smart cards, Common Criteria, website quality, e-procurement, IoT, toll management and NCMC). STQC's certification services are accredited by NABCB (QCI) and managed through four regional certification offices.\n\nWe help you choose the right scheme, prepare documents and applications and follow through."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is STQC Certification?",
          "paragraphs": [
            {
              "text": "STQC certification is third-party conformity assessment by the Government of India's STQC Directorate confirming that an organisation's management system, an IT or electronic product or an e-Governance system conforms to specified Indian or international standards or scheme rules. STQC says it became the first Indian-origin third-party certification agency in 1991 for QMS certification and in 1993 for safety certification."
            },
            {
              "text": "Some STQC schemes are mandatory for specific programmes, for example Aadhaar biometric devices, NCMC and government websites, while others such as S-Mark are voluntary per one secondary source. Documents depend on the scheme: scheme-specific application form, certification agreement, manuals, test reports and fee. Fees are scheme-specific and the application fee is usually paid to the Pay and Accounts Officer, MeitY at the regional office."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is STQC?",
              "answer": "An attached office of MeitY providing testing and certification."
            },
            {
              "question": "Is STQC certification accredited?",
              "answer": "Its certification services are NABCB-accredited."
            },
            {
              "question": "Is it mandatory?",
              "answer": "Some schemes are mandatory for specific programmes."
            },
            {
              "question": "Where do I pay application fees?",
              "answer": "Typically to the Pay and Accounts Officer, MeitY at the regional office."
            }
          ]
        },
        "extraContent": [
          {
            "title": "STQC Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Product makers, IT and e-Governance solution providers, government departments and companies seeking QMS or ISMS certification or approval for Aadhaar, NCMC, toll, e-procurement or IoT products need STQC.</p>\n<p>Vendors to government projects often need STQC-backed assurance.</p>\n<p>Startups with security or biometric products should check schemes.</p>\n<p>If you only need ISO certification, other accredited bodies also exist.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Government-backed assurance</li><li>Right scheme chosen</li><li>Documents and applications prepared</li><li>NABCB-accredited services</li><li>Support through audit and testing</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After choosing a scheme, follow its process. <strong>Related services:</strong> ISO certification, STQC ISO 27001, Common Criteria and MTCTE.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Picking the wrong scheme.</li><li>Weak documents.</li><li>Missing certification agreement.</li><li>Ignoring surveillance.</li><li>Assuming all schemes are voluntary.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines are scheme-specific.</p>\n<blockquote><strong>Practical tip:</strong> download forms from stqc.gov.in.</blockquote>\n\n<h2>Additional Information</h2>\n<p>STQC supports quality assurance in IT and electronics under MeitY.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A vendor certifies a biometric device.</p>\n<h3>Scenario 2:</h3>\n<p>A company gets ISO 27001.</p>\n<h3>Scenario 3:</h3>\n<p>A department certifies its website.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To use STQC well, start by matching your need to a scheme: management systems (ISO 9001 or ISO 27001), safety (S-Mark), biometric and QR devices, smart cards, Common Criteria, website quality, e-procurement, IoT, NCMC or toll systems. Download the scheme's form, rules and certification agreement from stqc.gov.in, prepare documents and test reports, pay the fee as prescribed, and complete testing or audits. The certification committee reviews and certificates are issued. <strong>Planning checklist:</strong> confirm whether the scheme is mandatory for your target programme, plan testing time, keep surveillance dates and note that certificates have different validity periods across schemes.</p>"
          }
        ],
        "seo": {
          "metaTitle": "STQC Certification | JR Compliance",
          "metaDescription": "STQC (Standardisation Testing and Quality Certification Directorate) is an attached office of the Ministry of Electronics and Information Technology…",
          "keywords": "STQC Certification, STQC, JR Compliance",
          "canonicalUrl": "/approval/stqc-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ISO 27001 ISMS",
              "href": "/approval/iso-27001-isms",
              "target": "same_tab"
            },
            {
              "label": "Common Criteria (IC3S)",
              "href": "/approval/common-criteria-certification",
              "target": "same_tab"
            },
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "ISO 9001 QMS",
              "href": "/approval/iso-9001-qms",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "iso-27001-isms",
      "matchSlugs": [
        "iso-27001-isms"
      ],
      "matchNames": [
        "ISO 27001 ISMS"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 49,
        "originalRow": 75,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "ISO 27001 ISMS",
        "menuLabel": "ISO 27001 ISMS",
        "sortOrder": 1,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC IT Certification Services certifies Information Security Management Systems against ISO/IEC 27001. The applicant fills STQC's ISMS F-03 application (new certification, scope change or re-certification), pays the application fee to the Pay and Accounts Officer, MeitY at the regional office and undergoes a Stage 1 and Stage 2 audit under procedure ISMS/P07. STQC's certification services are accredited by NABCB.\n\nWe prepare the ISMS, risk assessment, Statement of Applicability, application and audit readiness."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ISO 27001 ISMS?",
          "paragraphs": [
            {
              "text": "ISO/IEC 27001 is the international standard for an Information Security Management System: a systematic approach to managing information security risks through policies, controls (Annex A) and continual improvement. STQC ISMS certification is a third-party assessment, promoted by MeitY, that confirms an organisation's ISMS meets the standard for a defined scope."
            },
            {
              "text": "Documents include the ISMS F-03 application with scope and excluded controls, locations and activities, number of employees, ISMS documents (policies, procedures, risk assessment and treatment, Statement of Applicability and records), copy of the certification agreement and fee. Applications are accepted only if infrastructure and manpower under the scope meet review criteria. Fees and audit durations are determined by STQC from the scope."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which form is used?",
              "answer": "ISMS F-03."
            },
            {
              "question": "How are audits done?",
              "answer": "Stage 1 and Stage 2 under ISMS/P07."
            },
            {
              "question": "Who accredits STQC?",
              "answer": "NABCB."
            },
            {
              "question": "Can the scope be changed?",
              "answer": "Yes, through a scope change application."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ISO 27001 ISMS",
            "description": "<h2>Who Needs This Service</h2>\n<p>IT service companies, data centres, government departments, fintechs and vendors that need ISMS certification for tenders and customers need this.</p>\n<p>Startups serving enterprises often need ISO 27001.</p>\n<p>Organisations handling sensitive data benefit.</p>\n<p>If your ISMS is not implemented, prepare first.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>ISMS implemented and audit-ready</li><li>Application and scope prepared</li><li>Stage 1 and 2 audit support</li><li>Closure of non-conformities</li><li>Certificate for tenders</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, run surveillance audits. <strong>Related services:</strong> STQC certification, Information Security Testing and ISO 9001.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Weak risk assessment.</li><li>Wrong scope.</li><li>No internal audit.</li><li>Missing SoA.</li><li>Ignoring surveillance.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on readiness.</p>\n<blockquote><strong>Practical tip:</strong> complete internal audit first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>ISO 27001 is a global security management standard.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A data centre certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A fintech certifies.</p>\n<h3>Scenario 3:</h3>\n<p>A vendor changes scope.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>An ISO 27001 plan covers six practical steps. Define the scope, run a risk assessment, choose controls and write the Statement of Applicability, implement policies and procedures, train staff and run an internal audit and management review. Then submit ISMS F-03 with the scope, locations and staff numbers, pay the fee, and undergo Stage 1 and Stage 2 audits with STQC. Close non-conformities and receive the certificate. <strong>Planning checklist:</strong> keep evidence of risk treatment, define clear asset ownership, schedule surveillance audits and update the scope when you add sites or services.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ISO 27001 ISMS | JR Compliance",
          "metaDescription": "STQC IT Certification Services certifies Information Security Management Systems against ISO/IEC 27001. The applicant fills STQC's ISMS F-03…",
          "keywords": "ISO 27001 ISMS, STQC, JR Compliance",
          "canonicalUrl": "/approval/iso-27001-isms"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            },
            {
              "label": "Information Security Testing",
              "href": "/approval/information-security-testing",
              "target": "same_tab"
            },
            {
              "label": "ISO 9001 QMS",
              "href": "/approval/iso-9001-qms",
              "target": "same_tab"
            },
            {
              "label": "ISO 20000 ITSM",
              "href": "/approval/iso-20000-itsm",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "iso-9001-qms",
      "matchSlugs": [
        "iso-9001-qms"
      ],
      "matchNames": [
        "ISO 9001 QMS"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 50,
        "originalRow": 76,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "ISO 9001 QMS",
        "menuLabel": "ISO 9001 QMS",
        "sortOrder": 2,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC offers ISO 9001 Quality Management System certification through its Regional Certification offices and says it was the first Indian-origin third-party certification agency, in 1991, to offer QMS certification. The certification services are accredited by NABCB (QCI India). The process is the standard third-party route: application, document review, Stage 1 and Stage 2 audits, certification decision and surveillance audits.\n\nWe prepare your QMS, documentation, internal audit and application."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ISO 9001 QMS?",
          "paragraphs": [
            {
              "text": "ISO 9001 is the international standard for Quality Management Systems, setting requirements for consistent products and services and customer satisfaction through process control and continual improvement. STQC QMS certification confirms that an organisation's QMS meets ISO 9001 for a stated scope, assessed by an accredited certification body."
            },
            {
              "text": "Documents include the application form with scope, sites and employee numbers, quality manual or equivalent documentation, internal audit and management review records, entity documents and the certification agreement. Fees are per STQC's schedule available on request. STQC's newer website menu lists ISO 9001 and ISO 27001 under management-system certification."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is STQC accredited for ISO 9001?",
              "answer": "Its certification services are NABCB-accredited."
            },
            {
              "question": "What are the audit stages?",
              "answer": "Stage 1 and Stage 2."
            },
            {
              "question": "Who can apply?",
              "answer": "Any organisation for a defined scope."
            },
            {
              "question": "Is surveillance needed?",
              "answer": "Yes, annually."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ISO 9001 QMS",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers, service providers and government agencies seeking ISO 9001 certification, including those wanting a government-backed certification body, need this.</p>\n<p>Suppliers to government projects often prefer STQC.</p>\n<p>Startups scaling operations benefit from a QMS.</p>\n<p>If you need a different standard, other bodies also exist.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Government-backed ISO 9001 certification</li><li>QMS documents prepared</li><li>Audit readiness</li><li>Surveillance guidance</li><li>Customer confidence</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, maintain the QMS. <strong>Related services:</strong> ISO certification, STQC ISO 27001 and GMP.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Documentation without implementation.</li><li>Wrong scope.</li><li>No internal audit.</li><li>Missing management review.</li><li>Ignoring surveillance.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on readiness.</p>\n<blockquote><strong>Practical tip:</strong> run internal audits.</blockquote>\n\n<h2>Additional Information</h2>\n<p>ISO 9001 supports quality management across industries.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A manufacturer certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A service firm certifies.</p>\n<h3>Scenario 3:</h3>\n<p>A department certifies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For ISO 9001 with STQC, document your processes, set quality objectives, assign responsibilities, collect records and run an internal audit and management review. Apply to the regional certification office with the scope, sites and employee count, pay fees, and go through Stage 1 and Stage 2 audits. After closure of findings, you receive the certificate, followed by annual surveillance audits and re-certification. <strong>Planning checklist:</strong> keep the scope realistic, train staff on procedures, use corrective actions to improve and prepare for surveillance each year.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ISO 9001 QMS | JR Compliance",
          "metaDescription": "STQC offers ISO 9001 Quality Management System certification through its Regional Certification offices and says it was the first Indian-origin…",
          "keywords": "ISO 9001 QMS, STQC, JR Compliance",
          "canonicalUrl": "/approval/iso-9001-qms"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ISO 27001 ISMS",
              "href": "/approval/iso-27001-isms",
              "target": "same_tab"
            },
            {
              "label": "ISO 20000 ITSM",
              "href": "/approval/iso-20000-itsm",
              "target": "same_tab"
            },
            {
              "label": "S-Mark Product Safety",
              "href": "/approval/s-mark-product-safety",
              "target": "same_tab"
            },
            {
              "label": "Biometric Devices",
              "href": "/approval/biometric-device-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "iso-20000-itsm",
      "matchSlugs": [
        "iso-20000-itsm"
      ],
      "matchNames": [
        "ISO 20000 ITSM"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 51,
        "originalRow": 77,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "ISO 20000 ITSM",
        "menuLabel": "ISO 20000 ITSM",
        "sortOrder": 3,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC's earlier certification pages list ISO/IEC 20000-1 IT Service Management (ITSM) certification alongside ISMS and QMS, as a third-party management-system scheme promoted by STQC for IT service providers. STQC's current website menu shows ISMS and QMS under management-system certification, so confirm that ITSM certification is still offered before applying.\n\nWe check availability, prepare your service management system and apply where offered."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is ISO 20000 ITSM?",
          "paragraphs": [
            {
              "text": "ISO/IEC 20000-1 is the international standard for an IT Service Management System (SMS): requirements for planning, delivering, operating and improving IT services. STQC's ITSM certification assessed an IT service provider's service management system against the standard through system assessment and surveillance."
            },
            {
              "text": "Documents include the application with scope of services, locations and staff numbers, service management documentation (service catalogue, SLAs, incident, change and problem management procedures, records), internal audit and management review, entity documents, certification agreement and fee. Fees and durations were not retrieved, and availability needs confirmation."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is ITSM still offered by STQC?",
              "answer": "Older pages list it; the current menu does not, so confirm."
            },
            {
              "question": "What is ISO 20000-1?",
              "answer": "An IT service management standard."
            },
            {
              "question": "Who needs it?",
              "answer": "IT service providers."
            },
            {
              "question": "Are fees published?",
              "answer": "Not in the sources reviewed."
            }
          ]
        },
        "extraContent": [
          {
            "title": "ISO 20000 ITSM",
            "description": "<h2>Who Needs This Service</h2>\n<p>IT service providers, BPO and ITES companies, data-centre operators and government IT service departments need ITSM.</p>\n<p>Managed service providers use it for tenders.</p>\n<p>Organisations with ITIL practices benefit.</p>\n<p>If STQC does not offer it, use another accredited body.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Availability checked first</li><li>SMS prepared</li><li>Application support</li><li>Audit readiness</li><li>Structured IT services</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After checking, proceed with certification. <strong>Related services:</strong> STQC ISO 27001, ISO 9001 and ISO certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Assuming availability.</li><li>Weak SMS.</li><li>No internal audit.</li><li>Wrong scope.</li><li>Ignoring surveillance.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Availability should be confirmed with STQC.</p>\n<blockquote><strong>Practical tip:</strong> ask STQC IT Certification Services.</blockquote>\n\n<h2>Additional Information</h2>\n<p>ISO 20000-1 supports reliable IT service delivery.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>An IT provider checks availability.</p>\n<h3>Scenario 2:</h3>\n<p>A data centre prepares SMS.</p>\n<h3>Scenario 3:</h3>\n<p>A department plans certification.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>Because ITSM may not appear in STQC's current menu, begin by asking STQC IT Certification Services whether ISO/IEC 20000-1 certification is currently offered. If it is, prepare your service management system: service catalogue, SLAs, incident, change and problem management procedures and records, then run an internal audit and management review and apply with scope and fees. If it is not offered, consider another accredited body. <strong>Planning checklist:</strong> document service processes, measure SLAs, keep customer feedback records and align with ISO 27001 where relevant.</p>"
          }
        ],
        "seo": {
          "metaTitle": "ISO 20000 ITSM | JR Compliance",
          "metaDescription": "STQC's earlier certification pages list ISO/IEC 20000-1 IT Service Management (ITSM) certification alongside ISMS and QMS, as a third-party…",
          "keywords": "ISO 20000 ITSM, STQC, JR Compliance",
          "canonicalUrl": "/approval/iso-20000-itsm"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "ISO 27001 ISMS",
              "href": "/approval/iso-27001-isms",
              "target": "same_tab"
            },
            {
              "label": "ISO 9001 QMS",
              "href": "/approval/iso-9001-qms",
              "target": "same_tab"
            },
            {
              "label": "S-Mark Product Safety",
              "href": "/approval/s-mark-product-safety",
              "target": "same_tab"
            },
            {
              "label": "Biometric Devices",
              "href": "/approval/biometric-device-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "s-mark-product-safety",
      "matchSlugs": [
        "s-mark-product-safety"
      ],
      "matchNames": [
        "S-Mark Product Safety"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 52,
        "originalRow": 78,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "S-Mark Product Safety",
        "menuLabel": "S-Mark Product Safety",
        "sortOrder": 4,
        "hero": {
          "eyebrow": "STQC",
          "description": "The STQC Safety Certification ('S' Mark) scheme is a third-party scheme for electronics products run by STQC Certification Services under MeitY. It certifies conformity to IEC safety standards through factory inspection, product testing and surveillance, and conforms to ISO/IEC 17065. STQC is a member of the IECEE CB Scheme, so an S-Mark can be issued without further testing on the basis of an accepted CB report and certificate.\n\nWe identify the standard, prepare test reports and the application and follow through."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is S-Mark Product Safety?",
          "paragraphs": [
            {
              "text": "The S-Mark is India's national safety mark under STQC for electronic and electrical products. It gives confidence that a product meets the relevant IEC safety standard, for example for consumer electronics, IT and office equipment, lighting, electro-medical equipment, household appliances and components. It is distinct from the BIS Standard Mark and, per one secondary source, is a voluntary scheme."
            },
            {
              "text": "Documents include the application with product details and standard, test reports from recognised labs or IECEE CB test report and certificate, factory details and quality system documents. One secondary source says a documented quality system meeting ISO 9001 is required before applying and certificate validity is three years with annual monitoring, which should be confirmed with STQC."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is S-Mark mandatory?",
              "answer": "One source says voluntary."
            },
            {
              "question": "What standards apply?",
              "answer": "IEC safety standards."
            },
            {
              "question": "Can CB reports be used?",
              "answer": "Yes, STQC is an IECEE CB scheme member."
            },
            {
              "question": "How long is it valid?",
              "answer": "One source says three years with annual monitoring."
            }
          ]
        },
        "extraContent": [
          {
            "title": "S-Mark Product Safety",
            "description": "<h2>Who Needs This Service</h2>\n<p>Manufacturers and exporters of electronic and electrical products that want a government safety mark or CB-based Indian certification need S-Mark.</p>\n<p>Brands seeking differentiation use it.</p>\n<p>Exporters with CB certificates benefit.</p>\n<p>If your product needs BIS ISI or CRS, those apply separately.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Government safety mark</li><li>CB-based route available</li><li>Test reports and application prepared</li><li>Factory inspection support</li><li>Surveillance guidance</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After S-Mark, maintain surveillance. <strong>Related services:</strong> BIS Certification, CRS, ISO certification and MTCTE.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Confusing S-Mark with BIS marks.</li><li>Wrong standard.</li><li>Missing CB reports.</li><li>Weak quality system.</li><li>Ignoring monitoring.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on tests.</p>\n<blockquote><strong>Practical tip:</strong> use CB reports where possible.</blockquote>\n\n<h2>Additional Information</h2>\n<p>S-Mark supports safety assurance for electronics.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A maker certifies a charger.</p>\n<h3>Scenario 2:</h3>\n<p>An exporter uses CB report.</p>\n<h3>Scenario 3:</h3>\n<p>A brand certifies lighting.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For the S-Mark, pick the IEC safety standard for your product, gather test reports (or an IECEE CB report and certificate), and prepare the factory and quality system documents. Apply to STQC Certification Services with the application and fee. STQC may inspect the factory and test the product, then issues the certificate and licence for the mark. <strong>Planning checklist:</strong> use CB reports to avoid repeat testing, keep your quality system up to date, plan surveillance and renewal and confirm validity terms with STQC since a secondary source mentions three years with annual monitoring.</p>"
          }
        ],
        "seo": {
          "metaTitle": "S-Mark Product Safety | JR Compliance",
          "metaDescription": "The STQC Safety Certification ('S' Mark) scheme is a third-party scheme for electronics products run by STQC Certification Services under MeitY. It…",
          "keywords": "S-Mark Product Safety, STQC, JR Compliance",
          "canonicalUrl": "/approval/s-mark-product-safety"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Bis Certification",
              "href": "/approval/bis-certification",
              "target": "same_tab"
            },
            {
              "label": "CRS Certification",
              "href": "/approval/crs-certification",
              "target": "same_tab"
            },
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "Biometric Devices",
              "href": "/approval/biometric-device-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "biometric-device-certification",
      "matchSlugs": [
        "biometric-device-certification",
        "biometric-devices"
      ],
      "matchNames": [
        "Biometric Devices"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 53,
        "originalRow": 79,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Biometric Devices",
        "menuLabel": "Biometric Devices",
        "sortOrder": 5,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC operates the Biometric Device Certification Scheme (BDCS) to certify biometric devices against UIDAI's Aadhaar specifications. The scheme covers fingerprint image scanners and iris cameras for enrolment and authentication devices, including pre-certified hardware, and QR code scanners for offline authentication. UIDAI's procurement requires STQC certification.\n\nWe prepare the application, documents, samples and testing."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Biometric Devices?",
          "paragraphs": [
            {
              "text": "Biometric device certification confirms that a fingerprint scanner, iris scanner or similar device is reliable, safe and secure and meets the technical specifications of UIDAI's Aadhaar registered device framework, including image quality, safety and electromagnetic compatibility. The list of certified devices is published by STQC."
            },
            {
              "text": "Documents include the application (BDCS-F01 or older BDCS-03-05) with device specifications, ISO 9001 certificate for device development and supply, safety certification (UL/ANSI, IEC 60825-1 or RoHS) and calibration compliance certificate in the older form, design document, user manual, SDK or API and driver software, test samples such as three devices, certification agreement and fee. Rules and procedures are in STQC/BDCS/D01 and procedures P10 and P11."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which devices are covered?",
              "answer": "Fingerprint scanners, iris cameras and QR code scanners for Aadhaar."
            },
            {
              "question": "Who requires certification?",
              "answer": "UIDAI's procurement."
            },
            {
              "question": "What samples are needed?",
              "answer": "Test samples such as three devices."
            },
            {
              "question": "What forms apply?",
              "answer": "BDCS-F01 or earlier BDCS-03-05."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Biometric Devices",
            "description": "<h2>Who Needs This Service</h2>\n<p>Aadhaar-ecosystem device makers, biometric attendance and e-KYC vendors and system integrators need BDCS.</p>\n<p>Device makers entering government projects need certification.</p>\n<p>Vendors supplying to UIDAI partners benefit.</p>\n<p>If your device is not for Aadhaar use, other standards may apply.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>UIDAI-aligned certification</li><li>Application and samples prepared</li><li>Testing coordinated</li><li>Listing as certified device</li><li>Government project readiness</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, maintain compliance. <strong>Related services:</strong> QR Code Scanner, STQC certification and ISO 9001.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Outdated specifications.</li><li>Missing ISO or safety certificates.</li><li>Incomplete SDK.</li><li>Wrong samples.</li><li>Ignoring updates.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing takes time.</p>\n<blockquote><strong>Practical tip:</strong> check latest UIDAI specs.</blockquote>\n\n<h2>Additional Information</h2>\n<p>BDCS ensures biometric devices meet Aadhaar security requirements.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A scanner maker certifies.</p>\n<h3>Scenario 2:</h3>\n<p>An iris device maker certifies.</p>\n<h3>Scenario 3:</h3>\n<p>A vendor lists certified devices.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For BDCS certification, start by reading UIDAI's specifications and the STQC BDCS rules and procedures (D01, P10 and P11). Prepare the application (BDCS-F01), device specifications, ISO 9001 and safety certificates, design document, user manual, SDK or API and driver software, and supply the required samples. STQC tests image quality, safety and EMC and issues certification, after which the device is listed. <strong>Planning checklist:</strong> lock firmware before testing, keep SDK documentation consistent, track UIDAI specification updates and plan re-certification for product changes.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Biometric Devices | JR Compliance",
          "metaDescription": "STQC operates the Biometric Device Certification Scheme (BDCS) to certify biometric devices against UIDAI's Aadhaar specifications. The scheme covers…",
          "keywords": "Biometric Devices, STQC, JR Compliance",
          "canonicalUrl": "/approval/biometric-device-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "QR Code Scanner",
              "href": "/approval/qr-code-scanner-certification",
              "target": "same_tab"
            },
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            },
            {
              "label": "ISO 9001 QMS",
              "href": "/approval/iso-9001-qms",
              "target": "same_tab"
            },
            {
              "label": "Smart Card Certification",
              "href": "/approval/smart-card-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "smart-card-certification",
      "matchSlugs": [
        "smart-card-certification"
      ],
      "matchNames": [
        "Smart Card Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 54,
        "originalRow": 80,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Smart Card Certification",
        "menuLabel": "Smart Card Certification",
        "sortOrder": 6,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC's Smart Card Testing and Certification scheme was developed with the National Informatics Centre (NIC), under an MOU, for the Ministry of Transport and other Indian smart card programmes. Cards used for driving licence and registration certificates, MNIC, RSBY and e-Passport are tested jointly by NIC and STQC using test tools developed by IIT Kanpur and certified for the SCOSTA operating system.\n\nWe guide you through the scheme, samples and testing."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Smart Card Certification?",
          "paragraphs": [
            {
              "text": "Smart card certification verifies that contact and contactless cards, modules and inlays comply with the SCOSTA specification, specifically the ISO 7816 command set in soft and hard masks, and interoperate with application software. The scope excludes smart card readers, terminals, networks, application software, back-end systems and operational processes such as personalisation and issuance."
            },
            {
              "text": "Documents include the application to STQC and NIC with card details, samples of the cards, modules or inlays, SCOSTA operating system details, test reports from the scheme test tools and supporting documents as per the SCOSTA scheme document (scosta.gov.in) and fee."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who tests smart cards?",
              "answer": "NIC and STQC jointly."
            },
            {
              "question": "What standard applies?",
              "answer": "SCOSTA with ISO 7816 commands."
            },
            {
              "question": "Are readers covered?",
              "answer": "No."
            },
            {
              "question": "Where are details?",
              "answer": "On scosta.gov.in."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Smart Card Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Smart card manufacturers, chip and OS vendors and card personalisation vendors serving Indian government projects need this.</p>\n<p>Vendors for DL and RC cards use it.</p>\n<p>E-passport and MNIC vendors benefit.</p>\n<p>If you only sell readers, it does not apply.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>SCOSTA compliance verified</li><li>Samples and documents prepared</li><li>Joint testing coordinated</li><li>Listing for government projects</li><li>Interoperability confidence</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, supply to government programmes. <strong>Related services:</strong> NCMC certification, Common Criteria and STQC certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong specification version.</li><li>Incomplete samples.</li><li>Assuming readers are covered.</li><li>Weak OS details.</li><li>Ignoring scheme updates.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing depends on card type.</p>\n<blockquote><strong>Practical tip:</strong> obtain the scheme document first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>SCOSTA provides a common standard for Indian smart cards.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A vendor certifies DL cards.</p>\n<h3>Scenario 2:</h3>\n<p>A chip vendor tests an OS.</p>\n<h3>Scenario 3:</h3>\n<p>A personalisation vendor checks scope.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For smart card certification, obtain the SCOSTA scheme document and test scripts, ready samples of cards, modules or inlays and OS details, and apply to STQC and NIC with fees. The cards are tested jointly for ISO 7816 command set compliance and interoperability. After results are reviewed, certified products are listed for government programmes. <strong>Planning checklist:</strong> test your OS against the scripts first, keep samples consistent with production, remember that readers and applications are outside the scope and plan re-testing after OS changes.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Smart Card Certification | JR Compliance",
          "metaDescription": "STQC's Smart Card Testing and Certification scheme was developed with the National Informatics Centre (NIC), under an MOU, for the Ministry of…",
          "keywords": "Smart Card Certification, STQC, JR Compliance",
          "canonicalUrl": "/approval/smart-card-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "NCMC Certification",
              "href": "/approval/ncmc-certification",
              "target": "same_tab"
            },
            {
              "label": "Common Criteria (IC3S)",
              "href": "/approval/common-criteria-certification",
              "target": "same_tab"
            },
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            },
            {
              "label": "Website Quality Certification",
              "href": "/approval/website-quality-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "common-criteria-certification",
      "matchSlugs": [
        "common-criteria-certification",
        "common-criteria-ic3s"
      ],
      "matchNames": [
        "Common Criteria (IC3S)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 55,
        "originalRow": 81,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Common Criteria (IC3S)",
        "menuLabel": "Common Criteria (IC3S)",
        "sortOrder": 7,
        "hero": {
          "eyebrow": "STQC",
          "description": "The Indian Common Criteria Certification Scheme (IC3S), operated by STQC under MeitY, evaluates and certifies IT security products and protection profiles against Common Criteria (ISO/IEC 15408) at assurance levels EAL1 to EAL4. India is a CCRA Certificate Authorizing Nation, so certificates are recognised by other CCRA members. STQC is the sole certification body; evaluations are done by licensed Common Criteria Test Laboratories (CCTLs).\n\nWe guide you on scheme, Security Target, CCTL and certification."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Common Criteria (IC3S)?",
          "paragraphs": [
            {
              "text": "Common Criteria certification is an independent, internationally recognised evaluation of the security functionality and assurance of an IT product such as firewalls, smart cards, operating systems or encryption modules. The IC3S defines the roles of developers or sponsors, CCTLs and the STQC certification body, and certificates give buyers a metric for comparing security capabilities."
            },
            {
              "text": "Documents include the application and sponsor details, Security Target or Protection Profile, product documentation and evidence as per the chosen EAL, evaluation contract with a CCTL and the CCTL's evaluation reports, documents per the IC3S Guidance to Applicants (D06) and fee."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which levels are covered?",
              "answer": "EAL1 to EAL4."
            },
            {
              "question": "Who evaluates?",
              "answer": "Licensed CCTLs."
            },
            {
              "question": "Who certifies?",
              "answer": "STQC."
            },
            {
              "question": "Is it recognised abroad?",
              "answer": "Yes, under CCRA."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Common Criteria (IC3S)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Vendors of firewalls, HSMs, smart cards, operating systems, VPN and encryption products and other IT security products selling to governments and enterprises need this.</p>\n<p>Startups with security products benefit.</p>\n<p>Buyers specify Common Criteria in tenders.</p>\n<p>If you only need ISO 27001, that is a different scheme.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>CCRA-recognised certification</li><li>Security Target prepared</li><li>CCTL coordination</li><li>Certified products list</li><li>Government and export credibility</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, maintain the product. <strong>Related services:</strong> STQC certification, Information Security Testing and NCCS certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Weak Security Target.</li><li>Wrong EAL.</li><li>Late evidence.</li><li>Ignoring guidance D06.</li><li>Unlicensed lab.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Evaluation takes time.</p>\n<blockquote><strong>Practical tip:</strong> choose the EAL needed by buyers.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Common Criteria is a global standard for security evaluation.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A firewall vendor certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A smart card vendor certifies.</p>\n<h3>Scenario 3:</h3>\n<p>A startup prepares an ST.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>A Common Criteria plan begins with choosing the assurance level (EAL1 to EAL4) that your buyers need. Prepare the Security Target or Protection Profile, collect development and testing evidence, sign a contract with a licensed CCTL, and apply to the certification body using the IC3S guidance to applicants (D06). The CCTL evaluates, STQC validates the report and issues the certificate and certification report. <strong>Planning checklist:</strong> scope the target of evaluation tightly, keep documentation consistent, plan for evaluator questions and consider maintenance of the certificate when you update the product.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Common Criteria (IC3S) | JR Compliance",
          "metaDescription": "The Indian Common Criteria Certification Scheme (IC3S), operated by STQC under MeitY, evaluates and certifies IT security products and protection…",
          "keywords": "Common Criteria (IC3S), STQC, JR Compliance",
          "canonicalUrl": "/approval/common-criteria-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            },
            {
              "label": "Information Security Testing",
              "href": "/approval/information-security-testing",
              "target": "same_tab"
            },
            {
              "label": "NCCS Certification",
              "href": "/approval/nccs-certification",
              "target": "same_tab"
            },
            {
              "label": "Website Quality Certification",
              "href": "/approval/website-quality-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "website-quality-certification",
      "matchSlugs": [
        "website-quality-certification"
      ],
      "matchNames": [
        "Website Quality Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 56,
        "originalRow": 82,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Website Quality Certification",
        "menuLabel": "Website Quality Certification",
        "sortOrder": 8,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC's Website Quality Certification Scheme (WQCS) certifies websites, mainly of government organisations, against the Guidelines for Indian Government Websites (GIGW 3.0). The applicant submits the WQCS application form (STQC/WQCS/F01) with the certification agreement and a Website Quality Manual to the STQC Website Certification Cell. Assessment covers quality, accessibility and security, and certified sites can display the STQC website quality certification mark.\n\nWe prepare the manual, application and security audit."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Website Quality Certification?",
          "paragraphs": [
            {
              "text": "Website quality certification is a third-party evaluation that a website meets quality requirements such as usability, accessibility, content, security and compliance with GIGW 3.0. For security, STQC's scheme refers to security audits by CERT-In empanelled test laboratories, network security and web application security. An organisation certified for ISMS, QMS or ITSM may mention it in the application."
            },
            {
              "text": "Documents include the application (STQC/WQCS/F01), certification agreement, Website Quality Manual, website URL, hosting and CMS details, ISMS certificates for the data centre where relevant, security audit report from a CERT-In empanelled lab and charges payable on receipt of the invoice."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Which guidelines apply?",
              "answer": "GIGW 3.0."
            },
            {
              "question": "Who handles applications?",
              "answer": "The STQC Website Certification Cell."
            },
            {
              "question": "Is a security audit needed?",
              "answer": "Yes, by a CERT-In empanelled lab as per the scheme."
            },
            {
              "question": "Who can apply?",
              "answer": "Mainly government organisations."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Website Quality Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Government departments and agencies, PSUs and organisations that need assured quality for their websites need WQCS.</p>\n<p>Private companies can also apply.</p>\n<p>Departments launching new portals benefit.</p>\n<p>If you only need an accessibility check, a smaller audit may do.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>GIGW 3.0 compliance verified</li><li>Quality manual and application prepared</li><li>Security audit coordinated</li><li>Certification mark</li><li>Public trust</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, maintain the site. <strong>Related services:</strong> Information Security Testing, Software Testing and Assessment and STQC certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Weak accessibility.</li><li>No security audit.</li><li>Incomplete manual.</li><li>Ignoring updates.</li><li>Wrong URL scope.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on testing.</p>\n<blockquote><strong>Practical tip:</strong> audit accessibility and security first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>GIGW sets quality norms for Indian government websites.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A department certifies a portal.</p>\n<h3>Scenario 2:</h3>\n<p>A PSU certifies its site.</p>\n<h3>Scenario 3:</h3>\n<p>A startup seeks assurance.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For website certification, begin with a self-review against GIGW 3.0 for content, accessibility, usability and security. Prepare the Website Quality Manual, complete the WQCS application (STQC/WQCS/F01) and certification agreement, obtain a security audit from a CERT-In empanelled lab as per the scheme and submit them to the Website Certification Cell with charges. STQC assesses and issues the certificate and mark. <strong>Planning checklist:</strong> fix accessibility issues early, document hosting and CMS details, retest after major changes and keep the certification current.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Website Quality Certification | JR Compliance",
          "metaDescription": "STQC's Website Quality Certification Scheme (WQCS) certifies websites, mainly of government organisations, against the Guidelines for Indian Government…",
          "keywords": "Website Quality Certification, STQC, JR Compliance",
          "canonicalUrl": "/approval/website-quality-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Information Security Testing",
              "href": "/approval/information-security-testing",
              "target": "same_tab"
            },
            {
              "label": "Software Testing & Assessment",
              "href": "/approval/software-testing-assessment",
              "target": "same_tab"
            },
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            },
            {
              "label": "Software Certification",
              "href": "/approval/software-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "software-certification",
      "matchSlugs": [
        "software-certification"
      ],
      "matchNames": [
        "Software Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 57,
        "originalRow": 83,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Software Certification",
        "menuLabel": "Software Certification",
        "sortOrder": 9,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC provides software and system certification as conformity assessment and quality evaluation of IT projects, made up of reviews, testing and audit of key aspects of the system. Its specific named schemes include e-Procurement System certification, Toll Management System certification, IoT, website and security product certifications, while software process assessment and software testing services are offered through its IT centres.\n\nWe identify the right scheme for your software and prepare the application and documents."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Software Certification?",
          "paragraphs": [
            {
              "text": "Software certification by STQC is a third-party attestation that a software product or IT system has been tested and audited against defined requirements for functionality, security, performance and applicable government guidelines. STQC IT centres provide the testing and assessment, and the STQC certification body issues the certificate for certified schemes."
            },
            {
              "text": "Documents depend on the scheme: application form, software or system documentation (requirements, design, user and development documents), internal functional and security test reports, application security report from STQC or a CERT-In empanelled agency and the schedule of charges. Applications go to the respective STQC IT centre with the consent of the certification body, as described for the Toll Management scheme. Fees and validity vary by scheme."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Is there one software certificate?",
              "answer": "No, it is a family of schemes and services."
            },
            {
              "question": "Who tests?",
              "answer": "STQC IT centres."
            },
            {
              "question": "Where do I apply?",
              "answer": "At the respective IT centre."
            },
            {
              "question": "Are fees fixed?",
              "answer": "They vary by scheme."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Software Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Software vendors, system integrators and government project owners who need independent assurance of IT systems need this.</p>\n<p>Vendors bidding for e-Governance projects benefit.</p>\n<p>Product companies wanting independent testing can use testing services.</p>\n<p>If no scheme exists for your product, testing may be enough.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Right scheme identified</li><li>Documentation prepared</li><li>Testing and audit coordinated</li><li>Certificate or test report</li><li>Confidence for government buyers</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After mapping, apply under the right scheme. <strong>Related services:</strong> e-Procurement, TMS, IoT, Website Quality and Software Testing.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Assuming one scheme covers all.</li><li>Weak documentation.</li><li>No security report.</li><li>Wrong centre.</li><li>Ignoring scheme rules.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines vary.</p>\n<blockquote><strong>Practical tip:</strong> contact the IT centre early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>STQC supports quality assurance of IT systems.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A vendor certifies an e-procurement system.</p>\n<h3>Scenario 2:</h3>\n<p>A company tests a portal.</p>\n<h3>Scenario 3:</h3>\n<p>A developer maps schemes.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To plan software certification, first identify whether a named STQC scheme fits your product (for example ePS, TMS, IoT or website). If it does, follow that scheme's forms and testing; if not, request testing and assessment services from the relevant STQC IT centre. Prepare requirement, design and user documents, internal functional and security test reports and an application security report, then apply with the consent of the certification body where the scheme requires it. <strong>Planning checklist:</strong> align documents with the scheme, schedule testing, keep version control and plan re-certification for major releases.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Software Certification | JR Compliance",
          "metaDescription": "STQC provides software and system certification as conformity assessment and quality evaluation of IT projects, made up of reviews, testing and audit…",
          "keywords": "Software Certification, STQC, JR Compliance",
          "canonicalUrl": "/approval/software-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "e-Procurement (ePS)",
              "href": "/approval/e-procurement-certification",
              "target": "same_tab"
            },
            {
              "label": "Toll Management (TMS)",
              "href": "/approval/toll-management-certification",
              "target": "same_tab"
            },
            {
              "label": "IoT System Certification",
              "href": "/approval/iot-system-certification",
              "target": "same_tab"
            },
            {
              "label": "Website Quality Certification",
              "href": "/approval/website-quality-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "software-testing-assessment",
      "matchSlugs": [
        "software-testing-assessment"
      ],
      "matchNames": [
        "Software Testing & Assessment"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 58,
        "originalRow": 84,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Software Testing & Assessment",
        "menuLabel": "Software Testing & Assessment",
        "sortOrder": 10,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC's IT centres provide independent Software Quality Assurance services: software functional testing, application security testing, vulnerability assessment and penetration testing (VAPT), application performance testing, embedded device and software security testing, acceptance testing of e-Governance projects and camera testing. STQC also offers software process assessment as part of its Software and System Testing services.\n\nWe scope your testing, share documents and coordinate with the STQC IT centre."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Software Testing & Assessment?",
          "paragraphs": [
            {
              "text": "Software testing and assessment is the independent verification of software and IT systems for functionality, performance and security before deployment or acceptance. STQC provides these services to government organisations and the corporate sector, and its testing underpins the certification schemes."
            },
            {
              "text": "Documents include the request to the STQC IT centre, requirement specification, design documents, user manuals, test plans and builds or URLs, access to the test environment, scope, IP or URL details for security testing, previous audit reports and work order. Services are offered through STQC IT centres such as Hyderabad, Delhi, Bangalore and Kolkata, and fees are project-specific."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What testing is offered?",
              "answer": "Functional, security, VAPT, performance and acceptance testing."
            },
            {
              "question": "Who provides it?",
              "answer": "STQC IT centres."
            },
            {
              "question": "Are fees fixed?",
              "answer": "No, they are project-specific."
            },
            {
              "question": "Is software process assessment offered?",
              "answer": "Yes, as part of Software and System Testing."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Software Testing & Assessment",
            "description": "<h2>Who Needs This Service</h2>\n<p>Government e-Governance projects, software vendors, banks and fintechs and organisations needing independent testing before go-live need this.</p>\n<p>Companies facing acceptance testing for government contracts benefit.</p>\n<p>Product firms can use performance and security testing.</p>\n<p>If you only need internal QA, this may be extra.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Independent functional, security and performance testing</li><li>Acceptance testing for e-Governance</li><li>Clear reports</li><li>Fix and retest cycle</li><li>Credible assurance</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After testing, fix findings and retest. <strong>Related services:</strong> Information Security Testing, Website Quality and Software Certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Unclear scope.</li><li>Missing documents.</li><li>No test environment.</li><li>Ignoring findings.</li><li>Late engagement.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on scope.</p>\n<blockquote><strong>Practical tip:</strong> define scope and environment early.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Independent testing reduces risk in government IT projects.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A portal is tested before go-live.</p>\n<h3>Scenario 2:</h3>\n<p>A bank tests an app.</p>\n<h3>Scenario 3:</h3>\n<p>A vendor runs acceptance tests.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For STQC testing services, define the objective first: functional verification, security testing, performance testing or acceptance testing. Contact the IT centre, agree scope and fee, share documentation and the test environment, and sign the work order. STQC prepares a test plan, runs tests, reports defects and retests after fixes, and finally issues the report. <strong>Planning checklist:</strong> freeze the build before testing, provide realistic test data, assign a point of contact and allow time for fix-and-retest cycles.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Software Testing & Assessment | JR Compliance",
          "metaDescription": "STQC's IT centres provide independent Software Quality Assurance services: software functional testing, application security testing, vulnerability…",
          "keywords": "Software Testing & Assessment, STQC, JR Compliance",
          "canonicalUrl": "/approval/software-testing-assessment"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Information Security Testing",
              "href": "/approval/information-security-testing",
              "target": "same_tab"
            },
            {
              "label": "Website Quality Certification",
              "href": "/approval/website-quality-certification",
              "target": "same_tab"
            },
            {
              "label": "Software Certification",
              "href": "/approval/software-certification",
              "target": "same_tab"
            },
            {
              "label": "e-Procurement (ePS)",
              "href": "/approval/e-procurement-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "information-security-testing",
      "matchSlugs": [
        "information-security-testing"
      ],
      "matchNames": [
        "Information Security Testing"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 59,
        "originalRow": 85,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Information Security Testing",
        "menuLabel": "Information Security Testing",
        "sortOrder": 11,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC's Information Security Testing and Assessment service covers application security testing, vulnerability assessment and penetration testing (VAPT) and security audits for government and private systems. STQC also certifies information security management systems (ISO 27001) and IT security products (Common Criteria). STQC's IT centres carry out testing, while CERT-In empanelled agencies can also issue application security reports for some schemes.\n\nWe scope the test, coordinate and support retesting."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Information Security Testing?",
          "paragraphs": [
            {
              "text": "Information security testing is the technical evaluation of applications, networks and devices for vulnerabilities and compliance with security requirements, for example OWASP Top 10 for web applications. The outcome is a test report with findings and recommendations, which may be required for website, e-procurement and IoT certification."
            },
            {
              "text": "Documents include the scope (applications, URLs or IP ranges, environment, architecture), work request with authorisation and fee, network diagram, application documentation, test credentials or environment access, previous audit reports and fix reports for retesting. Testing is performed by STQC IT centres or empanelled labs, and fees depend on scope and effort."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What is covered?",
              "answer": "Application security testing, VAPT and security audits."
            },
            {
              "question": "Who performs the tests?",
              "answer": "STQC IT centres or empanelled labs."
            },
            {
              "question": "Is it needed for certification?",
              "answer": "Often, for website, ePS and IoT schemes."
            },
            {
              "question": "Are fees fixed?",
              "answer": "They depend on scope."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Information Security Testing",
            "description": "<h2>Who Needs This Service</h2>\n<p>Government portals, banks, fintechs, e-commerce and SaaS companies that need independent security testing or must satisfy a certification scheme need this.</p>\n<p>Organisations preparing for audits benefit.</p>\n<p>Developers launching apps should test first.</p>\n<p>If you only need ISMS certification, see ISO 27001.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>VAPT and application security testing</li><li>Clear findings and recommendations</li><li>Retest after fixes</li><li>Support for certification schemes</li><li>Reduced breach risk</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After the test, fix issues and retest. <strong>Related services:</strong> Website Quality, Software Testing, Common Criteria and ISO 27001.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Unclear scope.</li><li>No test environment.</li><li>Ignoring findings.</li><li>Late retest.</li><li>Poor documentation.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Duration depends on scope.</p>\n<blockquote><strong>Practical tip:</strong> prepare architecture documents.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Security testing identifies vulnerabilities before attackers do.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A portal undergoes VAPT.</p>\n<h3>Scenario 2:</h3>\n<p>A bank tests an app.</p>\n<h3>Scenario 3:</h3>\n<p>A vendor retests after fixes.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For information security testing, scope the systems to be tested, including URLs, IP ranges, architecture and environment, and decide between vulnerability assessment, penetration testing and application security testing. Provide documentation, credentials and a stable environment, and sign the work order. STQC or an empanelled lab runs the tests and delivers a report with findings and recommendations. Fix the issues, request a retest and obtain a closure report. <strong>Planning checklist:</strong> back up systems, inform stakeholders about testing windows, prioritise high-risk findings and keep the reports for certification schemes that require them.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Information Security Testing | JR Compliance",
          "metaDescription": "STQC's Information Security Testing and Assessment service covers application security testing, vulnerability assessment and penetration testing (VAPT)…",
          "keywords": "Information Security Testing, STQC, JR Compliance",
          "canonicalUrl": "/approval/information-security-testing"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Website Quality Certification",
              "href": "/approval/website-quality-certification",
              "target": "same_tab"
            },
            {
              "label": "Software Testing & Assessment",
              "href": "/approval/software-testing-assessment",
              "target": "same_tab"
            },
            {
              "label": "Common Criteria (IC3S)",
              "href": "/approval/common-criteria-certification",
              "target": "same_tab"
            },
            {
              "label": "ISO 27001 ISMS",
              "href": "/approval/iso-27001-isms",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "e-procurement-certification",
      "matchSlugs": [
        "e-procurement-certification",
        "e-procurement-eps"
      ],
      "matchNames": [
        "e-Procurement (ePS)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 60,
        "originalRow": 86,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "e-Procurement (ePS)",
        "menuLabel": "e-Procurement (ePS)",
        "sortOrder": 12,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC's eProcurement System (EPS) certification evaluates e-procurement applications and the supporting system against STQC's Guidelines for Compliance to Quality Requirements of eProcurement Systems: security, transparency and functionality, including compliance with GFR 2017, CVC guidelines, the IT Act and MeitY EPS guidelines. Testing generally takes two to three months, certification is valid for three years and is followed by surveillance audits.\n\nWe prepare the application, security reports and documents."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is e-Procurement (ePS)?",
          "paragraphs": [
            {
              "text": "An e-procurement system certificate states that an e-tendering or auction application and its deployment infrastructure have been reviewed, tested and audited for functional correctness, security including penetration testing and storage security, performance and procedural compliance. Certification uses a Statement of Conformity, and the system must use Class 3 digital certificates for signing and encryption."
            },
            {
              "text": "Documents include the EPS application form (STQC-IT/EPS/FM-01) and certification agreement, product nomenclature, version and release, production and test URLs, application security test report from STQC lab or CERT-In empanelled agency, VAPT and network security assessment, system documentation, GFR and CVC compliance checklist, impact-analysis format for changes and charges. Re-certification should be applied 3 to 4 months before expiry."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How long is ePS valid?",
              "answer": "Three years."
            },
            {
              "question": "How long is testing?",
              "answer": "Generally two to three months."
            },
            {
              "question": "What must be reported?",
              "answer": "Significant changes with impact analysis."
            },
            {
              "question": "When to re-certify?",
              "answer": "Apply 3 to 4 months before expiry."
            }
          ]
        },
        "extraContent": [
          {
            "title": "e-Procurement (ePS)",
            "description": "<h2>Who Needs This Service</h2>\n<p>e-Procurement platform vendors and government departments or PSUs running e-tendering platforms need ePS certification.</p>\n<p>Vendors bidding for state e-procurement projects need it.</p>\n<p>Departments procuring platforms should require it.</p>\n<p>If you only buy a platform, check vendor certificates.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Certified e-procurement system</li><li>Security and compliance checked</li><li>Three-year validity</li><li>Surveillance guidance</li><li>Trust in public procurement</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, undergo surveillance audits. <strong>Related services:</strong> Information Security Testing, Software Certification and Website Quality.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Weak security report.</li><li>Ignoring changes.</li><li>Missing Class 3 DSC use.</li><li>Late re-certification.</li><li>Incomplete documentation.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing takes two to three months.</p>\n<blockquote><strong>Practical tip:</strong> complete VAPT first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>ePS certification ensures secure, transparent public procurement platforms.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A vendor certifies a platform.</p>\n<h3>Scenario 2:</h3>\n<p>A state department requires ePS.</p>\n<h3>Scenario 3:</h3>\n<p>A vendor re-certifies.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>An ePS plan begins with the STQC guidelines for compliance to quality requirements of e-procurement systems. Prepare the application form (STQC-IT/EPS/FM-01), certification agreement, system documents and test and production URLs, and obtain an application security report and VAPT. STQC tests functionality, security, performance and procedural compliance for two to three months and, after closure of findings, issues a three-year certificate with surveillance audits. <strong>Planning checklist:</strong> use Class 3 DSCs correctly, report significant changes with impact analysis and apply for re-certification three to four months before expiry.</p>"
          }
        ],
        "seo": {
          "metaTitle": "e-Procurement (ePS) | JR Compliance",
          "metaDescription": "STQC's eProcurement System (EPS) certification evaluates e-procurement applications and the supporting system against STQC's Guidelines for Compliance…",
          "keywords": "e-Procurement (ePS), STQC, JR Compliance",
          "canonicalUrl": "/approval/e-procurement-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Information Security Testing",
              "href": "/approval/information-security-testing",
              "target": "same_tab"
            },
            {
              "label": "Software Certification",
              "href": "/approval/software-certification",
              "target": "same_tab"
            },
            {
              "label": "Website Quality Certification",
              "href": "/approval/website-quality-certification",
              "target": "same_tab"
            },
            {
              "label": "QR Code Scanner",
              "href": "/approval/qr-code-scanner-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "qr-code-scanner-certification",
      "matchSlugs": [
        "qr-code-scanner-certification",
        "qr-code-scanner"
      ],
      "matchNames": [
        "QR Code Scanner"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 61,
        "originalRow": 87,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "QR Code Scanner",
        "menuLabel": "QR Code Scanner",
        "sortOrder": 13,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC certifies QR code scanners used for offline Aadhaar authentication under the Biometric Device Certification Scheme (BDCS), following STQC/BDCS/P11 (procedure for test, evaluation and certification of QR code scanners). UIDAI developed a secure QR code that carries digitally signed demographic data and photograph, and scanners must meet UIDAI specifications.\n\nWe prepare the application, samples and tests."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is QR Code Scanner?",
          "paragraphs": [
            {
              "text": "A QR code scanner certified under BDCS is a device or software scanner that can read and verify UIDAI's secure Aadhaar QR code for offline authentication in government programmes. Certification confirms conformance to the UIDAI and STQC specification (STQC/BDCS/D08) after testing."
            },
            {
              "text": "Documents include the application (STQC/BDCS/F01) with device specifications and certification agreement, device documentation, SDK or API, test samples and software build, compliance documents per D08 and P11 and the testing and certification fee. Certified scanners are listed with biometric device certification."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What does it certify?",
              "answer": "Scanners for Aadhaar secure QR codes."
            },
            {
              "question": "Which procedure applies?",
              "answer": "STQC/BDCS/P11."
            },
            {
              "question": "Which spec?",
              "answer": "STQC/BDCS/D08."
            },
            {
              "question": "Is an SDK needed?",
              "answer": "Yes, device documentation and SDK or API."
            }
          ]
        },
        "extraContent": [
          {
            "title": "QR Code Scanner",
            "description": "<h2>Who Needs This Service</h2>\n<p>Vendors of QR code scanners and POS devices that read Aadhaar QR codes for e-KYC or attendance need this.</p>\n<p>Device makers serving government programmes benefit.</p>\n<p>App developers should check scanner requirements.</p>\n<p>If your device is not used for Aadhaar, it may not apply.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Certified QR scanner</li><li>UIDAI spec compliance</li><li>Application and samples prepared</li><li>Test coordination</li><li>Listing</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, maintain compliance. <strong>Related services:</strong> Biometric Devices, STQC certification and ISO 9001.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Outdated spec.</li><li>Incomplete SDK.</li><li>Wrong samples.</li><li>Ignoring updates.</li><li>Missing documents.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing time varies.</p>\n<blockquote><strong>Practical tip:</strong> check D08 spec first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>Secure QR codes enable offline authentication.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A POS maker certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A scanner vendor certifies.</p>\n<h3>Scenario 3:</h3>\n<p>An app vendor checks.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For a QR code scanner, read the BDCS-P11 procedure and the D08 specification, prepare the application (BDCS-F01) with device details, SDK or API, documents and samples, and submit with the certification agreement and fee. STQC tests the scanner against UIDAI requirements and, if it passes, certifies and lists it. <strong>Planning checklist:</strong> test decoding and signature verification in varied lighting and conditions, keep software versions consistent with the tested build and plan re-testing if the scanner or app changes.</p>"
          }
        ],
        "seo": {
          "metaTitle": "QR Code Scanner | JR Compliance",
          "metaDescription": "STQC certifies QR code scanners used for offline Aadhaar authentication under the Biometric Device Certification Scheme (BDCS), following STQC/BDCS/P11…",
          "keywords": "QR Code Scanner, STQC, JR Compliance",
          "canonicalUrl": "/approval/qr-code-scanner-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Biometric Devices",
              "href": "/approval/biometric-device-certification",
              "target": "same_tab"
            },
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            },
            {
              "label": "ISO 9001 QMS",
              "href": "/approval/iso-9001-qms",
              "target": "same_tab"
            },
            {
              "label": "IoT System Certification",
              "href": "/approval/iot-system-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "iot-system-certification",
      "matchSlugs": [
        "iot-system-certification"
      ],
      "matchNames": [
        "IoT System Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 62,
        "originalRow": 88,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "IoT System Certification",
        "menuLabel": "IoT System Certification",
        "sortOrder": 14,
        "hero": {
          "eyebrow": "STQC",
          "description": "The IoT System Certification Scheme (IoTSCS), operated by STQC under MeitY, certifies IoT devices and systems at three assessment levels, with each higher level more comprehensive. Applications (STQC/IoTSCS/F01) with a Technical Construction File (F03) and product series details (F02) are sent to the IoTSCS cell, and procedures exist for CCTV test, evaluation and certification (P01). STQC states that certificates issued so far under IoTSCS are not deemed valid for the Public Procurement (Preference) Order for cameras issued by MeitY.\n\nWe prepare the application, files and assessments."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is IoT System Certification?",
          "paragraphs": [
            {
              "text": "IoT system certification is a security and conformance assessment of IoT products such as CCTV cameras, smart meters and gateways: vulnerability assessment, configuration audit and other tests as defined at each assessment level in IoTSCS rules and procedures (STQC/IoTSCS/D01)."
            },
            {
              "text": "Documents include the application (F01), product series details (F02), Technical Construction File (F03), assessor checklists and test evidence (F04), CCTV-specific procedure P01 where relevant, product samples, firmware or build and documentation and fee. Level 2 includes vulnerability assessment and configuration audit for specified product classes. The camera-PPO note should be checked before relying on a certificate."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "How many levels exist?",
              "answer": "Three assessment levels."
            },
            {
              "question": "Which forms apply?",
              "answer": "F01, F02, F03 and F04."
            },
            {
              "question": "Is it valid for the camera PPO?",
              "answer": "STQC states certificates so far are not deemed valid for the PPO."
            },
            {
              "question": "Does CCTV have a procedure?",
              "answer": "Yes, P01."
            }
          ]
        },
        "extraContent": [
          {
            "title": "IoT System Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>IoT device makers and CCTV, smart-meter and gateway vendors and procurers that require STQC-assessed devices need this.</p>\n<p>Startups building connected devices benefit.</p>\n<p>Buyers set certification in tenders.</p>\n<p>If you need camera PPO eligibility, check STQC's notice.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Security assessment at chosen level</li><li>Technical file prepared</li><li>Application filed</li><li>Product listing</li><li>Buyer confidence</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, maintain the product. <strong>Related services:</strong> MTCTE, NCCS certification, ETA and Information Security Testing.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Wrong level.</li><li>Incomplete TCF.</li><li>Ignoring PPO notice.</li><li>Outdated firmware.</li><li>Weak documentation.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on level.</p>\n<blockquote><strong>Practical tip:</strong> confirm which level buyers need.</blockquote>\n\n<h2>Additional Information</h2>\n<p>IoTSCS improves trust in connected devices.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A CCTV maker certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A meter maker certifies.</p>\n<h3>Scenario 3:</h3>\n<p>A startup selects a level.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>An IoT certification plan starts with choosing the assessment level that suits your product and your buyers. Prepare the application (F01), product series details (F02), Technical Construction File (F03) and assessor checklists (F04), and for CCTV products follow procedure P01. Submit to the IoTSCS cell, support the vulnerability assessment and configuration audit and close findings. STQC issues the certificate. <strong>Planning checklist:</strong> harden firmware, control update processes, document security features and check STQC's note on the camera procurement order before relying on the certificate for tenders.</p>"
          }
        ],
        "seo": {
          "metaTitle": "IoT System Certification | JR Compliance",
          "metaDescription": "The IoT System Certification Scheme (IoTSCS), operated by STQC under MeitY, certifies IoT devices and systems at three assessment levels, with each…",
          "keywords": "IoT System Certification, STQC, JR Compliance",
          "canonicalUrl": "/approval/iot-system-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "MTCTE Certification",
              "href": "/approval/mtcte-certification",
              "target": "same_tab"
            },
            {
              "label": "NCCS Certification",
              "href": "/approval/nccs-certification",
              "target": "same_tab"
            },
            {
              "label": "ETA",
              "href": "/approval/eta",
              "target": "same_tab"
            },
            {
              "label": "Information Security Testing",
              "href": "/approval/information-security-testing",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "ncmc-certification",
      "matchSlugs": [
        "ncmc-certification"
      ],
      "matchNames": [
        "NCMC Certification"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 63,
        "originalRow": 89,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "NCMC Certification",
        "menuLabel": "NCMC Certification",
        "sortOrder": 15,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC is assigned the responsibility of assessing and certifying the National Common Mobility Card (NCMC) ecosystem as per Parts 4 to 7 of the NCMC specification, under MoHUA's 'One Nation, One Card' initiative for metro, bus, rail, toll and parking payments. Vendors of NCMC cards, terminals and related products must comply with the NCMC interface specification and obtain STQC certification.\n\nWe prepare product registration, pre-testing and application."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is NCMC Certification?",
          "paragraphs": [
            {
              "text": "NCMC certification is conformity testing of cards and automatic fare collection (AFC) terminals and systems against the NCMC interface specification (version 1.2, Parts IV to VII), ensuring interoperability across transport operators and banks. Certification is managed by the NCMC Certification Scheme at STQC Directorate."
            },
            {
              "text": "Documents include the application to the scheme with product details, test reports or evidence from NCMC test suites and compliant NCMC cards for terminal testing, product documentation and interface specification compliance details and fee. Third-party test tool vendors provide test suites and compliant cards, and STQC performs final certification."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "Who certifies NCMC products?",
              "answer": "STQC."
            },
            {
              "question": "Which specification parts apply?",
              "answer": "Parts 4 to 7."
            },
            {
              "question": "Do test suites exist?",
              "answer": "Third-party vendors provide test suites and cards."
            },
            {
              "question": "Who needs it?",
              "answer": "Card and terminal vendors."
            }
          ]
        },
        "extraContent": [
          {
            "title": "NCMC Certification",
            "description": "<h2>Who Needs This Service</h2>\n<p>Card manufacturers, AFC and terminal vendors, banks and transit operators building NCMC-compatible products need NCMC certification.</p>\n<p>Metro and bus system integrators benefit.</p>\n<p>Payment terminal vendors targeting transit use it.</p>\n<p>If your product is not NCMC-related, it does not apply.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>NCMC interoperability verified</li><li>Pre-testing and application support</li><li>STQC certification</li><li>Listing for deployments</li><li>Transit-market access</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, supply to operators. <strong>Related services:</strong> Smart Card Certification, STQC certification and Common Criteria.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Outdated spec version.</li><li>Skipping pre-testing.</li><li>Incomplete documents.</li><li>Wrong product scope.</li><li>Ignoring updates.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Testing time varies.</p>\n<blockquote><strong>Practical tip:</strong> pre-test with suites first.</blockquote>\n\n<h2>Additional Information</h2>\n<p>NCMC enables one card for multiple transit and payment uses.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A card maker certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A terminal vendor tests.</p>\n<h3>Scenario 3:</h3>\n<p>A bank checks compliance.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>For NCMC certification, obtain the NCMC interface specification (Parts 4 to 7) and the test suites from the vendors, build or procure compliant cards for terminal testing, and pre-test your product. Apply to the NCMC Certification Scheme at STQC with product details, test evidence and fee. STQC assesses and certifies, and certified products can be used in deployments. <strong>Planning checklist:</strong> keep software versions aligned with the tested build, repeat tests after changes and coordinate with transit operators and banks.</p>"
          }
        ],
        "seo": {
          "metaTitle": "NCMC Certification | JR Compliance",
          "metaDescription": "STQC is assigned the responsibility of assessing and certifying the National Common Mobility Card (NCMC) ecosystem as per Parts 4 to 7 of the NCMC…",
          "keywords": "NCMC Certification, STQC, JR Compliance",
          "canonicalUrl": "/approval/ncmc-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Smart Card Certification",
              "href": "/approval/smart-card-certification",
              "target": "same_tab"
            },
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            },
            {
              "label": "Common Criteria (IC3S)",
              "href": "/approval/common-criteria-certification",
              "target": "same_tab"
            },
            {
              "label": "Toll Management (TMS)",
              "href": "/approval/toll-management-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    },
    {
      "collectionKey": "stqc-page",
      "proposedSlug": "toll-management-certification",
      "matchSlugs": [
        "toll-management-certification",
        "toll-management-tms"
      ],
      "matchNames": [
        "Toll Management (TMS)"
      ],
      "source": {
        "sheet": "Approval",
        "numbersTableRow": 64,
        "originalRow": 90,
        "overviewSourceParagraphs": 2,
        "extraContentColumns": [
          {
            "column": "F",
            "sourceHeader": "Extra content",
            "displayHeading": "Who Needs This Service"
          },
          {
            "column": "G",
            "sourceHeader": "Extra content",
            "displayHeading": "Key Benefits"
          },
          {
            "column": "I",
            "sourceHeader": "Extracontent",
            "displayHeading": "Next Steps & Related Services"
          },
          {
            "column": "J",
            "sourceHeader": "Extra content",
            "displayHeading": "Common Mistakes"
          },
          {
            "column": "K",
            "sourceHeader": "Extra content",
            "displayHeading": "Timeline, Costs & Practical Tips"
          },
          {
            "column": "L",
            "sourceHeader": "Extra content",
            "displayHeading": "Additional Information"
          },
          {
            "column": "M",
            "sourceHeader": "Extra content",
            "displayHeading": "Practical Scenarios"
          },
          {
            "column": "N",
            "sourceHeader": "Extra content",
            "displayHeading": "Process & Planning"
          }
        ]
      },
      "data": {
        "title": "Toll Management (TMS)",
        "menuLabel": "Toll Management (TMS)",
        "sortOrder": 16,
        "hero": {
          "eyebrow": "STQC",
          "description": "STQC's Toll Management System and Products Certification Scheme certifies TMS software and installed products such as the TMS application, cameras and RFID for NHAI and IHMCL. The customer applies to the respective STQC IT centre with the consent of the STQC certification body, submitting the application form, TMS manual and user and development documents, internal security and functional test reports and charges. On successful assessment the certificate and the 'Certified Toll System (CTS)' mark are awarded.\n\nWe prepare documents and coordinate testing."
        },
        "overview": {
          "eyebrow": "Service Overview",
          "title": "What is Toll Management (TMS)?",
          "paragraphs": [
            {
              "text": "Toll management system certification verifies that trusted toll software and products meet the scheme's security and functional requirements, addressing the risks identified by NHAI and IHMCL. Assessment includes testing of the TMS application, product testing and a check of the provider's back-end processes. Some applicants go through a selected STQC empanelled test laboratory (SETL)."
            },
            {
              "text": "Documents include a duly filled application form and certification agreement, TMS manual and related user and development documents, internal security and functional test reports, product details (TMS application, camera, RFID) and samples as required and certification charges. The Certification Committee reviews and recommends, and certificate validity and charges are in scheme documents."
            }
          ]
        },
        "faqs": {
          "items": [
            {
              "question": "What does the scheme certify?",
              "answer": "TMS software and products such as cameras and RFID."
            },
            {
              "question": "Who applies?",
              "answer": "Vendors via an STQC IT centre with the certification body's consent."
            },
            {
              "question": "What mark is awarded?",
              "answer": "The Certified Toll System (CTS) mark."
            },
            {
              "question": "Is SETL an option?",
              "answer": "Some applicants use a selected empanelled test laboratory."
            }
          ]
        },
        "extraContent": [
          {
            "title": "Toll Management (TMS)",
            "description": "<h2>Who Needs This Service</h2>\n<p>Toll system integrators, TMS software vendors and device makers such as cameras and RFID readers supplying NHAI and IHMCL projects need this.</p>\n<p>Vendors bidding for toll plazas benefit.</p>\n<p>Concessionaires may require certified systems.</p>\n<p>If you only supply generic hardware, check scope.</p>\n\n<h2>Key Benefits</h2>\n<ul><li>Certified Toll System mark</li><li>Software and products tested</li><li>Back-end processes assessed</li><li>Application support</li><li>Trust for NHAI projects</li></ul>\n\n<h2>Next Steps &amp; Related Services</h2>\n<p>After certification, maintain compliance. <strong>Related services:</strong> Software Certification, Information Security Testing and IoT System Certification.</p>\n\n<h2>Common Mistakes</h2>\n<ul><li>Missing test reports.</li><li>Weak manual.</li><li>Ignoring back-end assessment.</li><li>Wrong centre.</li><li>Late engagement.</li></ul>\n\n<h2>Timeline, Costs &amp; Practical Tips</h2>\n<p>Timelines depend on testing.</p>\n<blockquote><strong>Practical tip:</strong> prepare internal test reports.</blockquote>\n\n<h2>Additional Information</h2>\n<p>The scheme reduces risks in electronic toll systems.</p>\n\n<h2>Practical Scenarios</h2>\n<h3>Scenario 1:</h3>\n<p>A TMS vendor certifies.</p>\n<h3>Scenario 2:</h3>\n<p>A camera maker certifies.</p>\n<h3>Scenario 3:</h3>\n<p>A vendor uses a SETL.</p>\n\n<h2>Process &amp; Planning</h2>\n<p>To certify a toll management system, gather the TMS manual, user and development documents, internal security and functional test reports and product details for cameras and RFID. Apply to the STQC IT centre with the form, certification agreement and charges, with the certification body's consent, or through an empanelled test lab. STQC tests the application and products and assesses back-end processes, the Certification Committee reviews and the certificate with the CTS mark is awarded. <strong>Planning checklist:</strong> keep test reports current, plan for process audits and maintain compliance as software evolves.</p>"
          }
        ],
        "seo": {
          "metaTitle": "Toll Management (TMS) | JR Compliance",
          "metaDescription": "STQC's Toll Management System and Products Certification Scheme certifies TMS software and installed products such as the TMS application, cameras and…",
          "keywords": "Toll Management (TMS), STQC, JR Compliance",
          "canonicalUrl": "/approval/toll-management-certification"
        },
        "extraContentSidebarServices": {
          "title": "Related Services",
          "links": [
            {
              "label": "Software Certification",
              "href": "/approval/software-certification",
              "target": "same_tab"
            },
            {
              "label": "Information Security Testing",
              "href": "/approval/information-security-testing",
              "target": "same_tab"
            },
            {
              "label": "IoT System Certification",
              "href": "/approval/iot-system-certification",
              "target": "same_tab"
            },
            {
              "label": "STQC Certification",
              "href": "/approval/stqc-certification",
              "target": "same_tab"
            }
          ]
        }
      }
    }
  ]
}
```
<!-- APPROVAL_CONTENT_END -->
