# Service category and first-page creation guide

Use this guide when adding a service category that contains several detail
pages, while initially implementing only the first approved page. The current
reference implementation is **MCA Services** with **DSC** at
`/corporate/dsc-certificate`.

The intended result is:

- one dedicated Strapi collection for the category;
- one first-page fallback and matching migration-ready CMS record;
- one shared, fixed frontend template for every page in that category; and
- later pages added through Strapi without requiring a new React page file.

Do not turn the Company Registration collection into a generic page builder.
Do not create a dynamic zone for these pages. A new service category should
have a dedicated, fixed collection contract.

## Understand the three kinds of category

The project uses the word “category” in three related but separate places:

| Category purpose | Where it lives | What it controls |
| --- | --- | --- |
| Header mega-menu category | `site-setting.headerMenu[].categories` and `frontend/data/homepage-fallback.ts` | The category name and links shown in navigation |
| Home Service Stack category | Strapi `service-category` and related `service` records | Cards shown in the home-page Services section |
| Detail-page family | A dedicated collection such as `mca-service-page` | Full pages rendered at `/corporate/[slug]` |

Adding a header category does not automatically create detail pages. Creating a
detail-page collection does not automatically add home-page service cards.
Update only the surfaces approved for the category.

## Two repeatable workflows

### Workflow A: New category and its first page

This is a developer task. It requires CMS schemas, frontend contracts, content
loading, routing, a first-page fallback, and validation.

### Workflow B: Additional page in an existing category

This is normally a Strapi editor task. Once the category integration supports
CMS-only records, create and publish a complete record, then update the
navigation link in the Site Setting. Do not create another React page or route.

## Before starting a new category

Record these values before editing code:

| Decision | Example for MCA Services |
| --- | --- |
| Public category label | `MCA Services` |
| Collection key | `mca-service-page` |
| Collection plural | `mca-service-pages` |
| TypeScript prefix | `McaServicePage` |
| Cache tag | `jr-mca-service-pages` |
| Content migration method | Reviewed encrypted Strapi `content,files` export/import |
| First menu label | `DSC` |
| First route slug | `dsc-certificate` |
| First legacy source | `site/corporate/dsc-certificate.html` |

Confirm all of the following:

1. The public slug is approved and is unique across every collection rendered
   by `/corporate/[slug]`.
2. The legacy source file is known and may be used for content reference.
3. The page fits the existing fixed service-detail sequence.
4. The category and first-page labels are approved for the header.
5. The first page is the only page that needs an offline fallback and an
   initial CMS record for transfer into PostgreSQL.

## Fixed service-detail content contract

Use the existing Company Registration visual sequence when the new category is
approved to follow that design:

1. Hero
2. Overview
3. Challenges
4. Advantages
5. Process
6. Why Choose JR Compliance
7. Service Breakdown
8. FAQs
9. Closing CTA

The dedicated Strapi collection should contain these fields:

| Field | Strapi type | Requirement |
| --- | --- | --- |
| `title` | Short text | Required; page H1 and CMS record name |
| `menuLabel` | Short text | Required; navigation label |
| `slug` | UID from `title` | Required; exact route segment |
| `hero` | `registration.hero` | Required |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required |
| `advantages` | `registration.card-section` | Required |
| `process` | `registration.card-section` | Required |
| `whyChoose` | `registration.card-section` | Required |
| `breakdown` | `registration.breakdown-section` | Required |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required |

Reuse these components only when the section structure matches. If a future
category needs genuinely different sections, define a separate fixed contract
instead of forcing its content into this one.

## Step 1: Extract the first page’s content

Treat `site/` as read-only. Read the approved legacy HTML and transfer only
editorial content into typed data.

Map the visible content as follows:

| Legacy content | Destination |
| --- | --- |
| Page title and meta description | `seo` |
| Category name, H1, introduction and main CTA | `hero` |
| Visible service introduction | `overview` |
| Problem or challenge cards | `challenges` |
| Benefit cards | `advantages` |
| Ordered service steps | `process` |
| JR Compliance reasons | `whyChoose` |
| Eligibility, documents and audience lists | `breakdown` |
| Visible questions and answers | `faqs` |
| Approved final call to action | `closingCta` |

Do not copy:

- Webflow classes, CSS, JavaScript, `data-wf-*` attributes or DOM structure;
- hidden or placeholder sections;
- duplicated sections copied from another legacy service;
- legacy forms, webhook code or transport behavior;
- unrelated testimonials, resources or footer content; or
- URLs into `site/assets/`.

Fix obvious encoding corruption such as broken curly quotes. Do not rewrite or
invent editor-managed copy without approval.

## Step 2: Create the dedicated Strapi collection

Use `cms/src/api/mca-service-page/` as the reference. For a collection named
`<category>-page`, create:

```text
cms/src/api/<category>-page/
├── content-types/<category>-page/schema.json
├── controllers/<category>-page.ts
├── routes/<category>-page.ts
└── services/<category>-page.ts
```

The schema must:

- use `kind: "collectionType"`;
- enable Draft & Publish;
- use the fixed fields listed above;
- reuse the existing `registration.*`, `home.cta-band` and `shared.seo`
  components; and
- have a collection-specific description and database collection name.

The controller, router and service should use Strapi core factories with the
new UID, following the MCA files exactly.

Also update:

- `cms/CONTENT_MODEL.md` with the new collection and field contract;
- `cms/src/revalidation.ts` with a collection-specific frontend cache tag in
  both `ALL_PAGE_TAGS` and `cacheTagsByUid`; and
- the read-only API token permissions so the frontend can read the new
  collection’s `find` and `findOne` endpoints.

Strapi enforces a UID only inside one collection. Manually verify that the slug
does not duplicate a Company Registration, MCA Services or other category slug
using `/corporate/[slug]`.

## Step 3: Add the first-page fallback and CMS migration mirror

Create a category-specific frontend fallback such as:

```text
frontend/data/<category>-pages-fallback.ts
```

It should export:

- an array containing the first approved page;
- the known fallback slugs; and
- a lookup function by slug.

Give the category its own named TypeScript types in `frontend/lib/types.ts`.
The type may reuse the fixed structural contract when it is identical, but it
must remain clearly named for the new CMS collection.

Create the matching CMS migration mirror when the content needs to be
transferred between environments:

```text
cms/src/seed/<category>-pages.json
```

The frontend fallback and migration JSON must contain the same editor-managed
page data. The first page can safely render when Strapi is unavailable; later
CMS-only pages are expected to require Strapi.

The historical content-mirror files intentionally use the frontend-shaped data. The shared
`serviceDetailPageData()` helper converts it to Strapi fields—for example,
`hero.title` becomes top-level `title`, `closingCta` becomes `finalCta`, and SEO
`title`/`description` become `metaTitle`/`metaDescription`.

Do not add a new automatic seed or backfill flag. The CMS now uses PostgreSQL
locally and in deployed environments; keep every existing `SEED_*` flag false.
For a new target, include the reviewed record in an encrypted Strapi
`content,files` transfer after verifying that replacement is safe.

## Step 4: Connect Strapi to the frontend

Update `frontend/lib/strapi.ts` using the MCA implementation as the reference.
Add all of the following:

1. A collection-specific revalidation slug and cache tag.
2. An explicit populate tree for every nested component.
3. A published exact-slug query for one page.
4. A published slug-list query for static parameters and the sitemap.
5. A fetch function for the page record.
6. A fetch function for published slugs.
7. A mapper for the category’s fixed contract.

The current slug-list request has a page size of 100. Add deliberate pagination
before using this pattern for a category that can exceed 100 published pages.

Never use `populate=deep`. Never expose `STRAPI_API_TOKEN` to browser code or
rename it to a `NEXT_PUBLIC_*` value.

The mapper must handle two cases:

- **Known first page:** merge valid Strapi values over its typed fallback.
- **Later CMS-only page:** strictly require the complete fixed page record and
  return `null` if a required field is missing.

The strict CMS-only path may reuse the shared header, footer and form fallback.
It must never borrow page copy from the category’s first page.

The current strict helpers have MCA-specific names because MCA is the first
CMS-only category. When another category uses the same fixed shape, reuse or
carefully extract those helpers into fixed-service helpers instead of copying a
second validator implementation.

## Step 5: Add the category content loader

Update `frontend/lib/content.ts` with:

- a cached page loader;
- the first-page fallback lookup; and
- a cached slug loader that unions fallback slugs with published Strapi slugs.

The loader must still call Strapi when the requested slug has no local
fallback. This is what allows later pages to be created only in the CMS.

Use this behavior:

```ts
const page = categoryFallback(slug);
const fallback = page ? { ...page, ...sharedChrome } : null;

return (await getCategoryPageFromStrapi(slug, fallback, sharedChrome)) ?? fallback;
```

Do not return `null` before the Strapi request merely because a local fallback
does not exist.

## Step 6: Connect the shared route and sitemap

Keep the existing App Router structure. For categories using the same service
design, extend `frontend/app/corporate/[slug]/page.tsx` instead of creating one
route file per service.

The route must:

- keep `dynamicParams = true` so a newly published CMS slug can render;
- include the category’s CMS and fallback slugs in `generateStaticParams`;
- check the category loader when resolving `/corporate/[slug]`;
- generate metadata from the resolved record; and
- render the existing fixed service-detail template.

Resolution order matters when multiple collections share the same dynamic
route. This is another reason every corporate slug must be globally unique.

Update `frontend/app/sitemap.ts` so it includes the category’s published and
fallback slugs. The slug-list request must use the same category cache tag so a
publish revalidation refreshes both pages and sitemap discovery.

If the shared page component displays a category breadcrumb or eyebrow, read
it from content. `content.hero.eyebrow` supplies the category/breadcrumb label,
and `content.menuLabel` supplies the final page label. Do not hard-code the
first category’s name into the shared template.

## Step 7: Add the navigation category and first link

For fallback/offline navigation, update the appropriate menu in
`frontend/data/homepage-fallback.ts`:

- add the approved category label;
- link the first page to `/corporate/<slug>`; and
- keep unimplemented page links at `/#services` until their records and slugs
  are approved and published.

For a new PostgreSQL CMS target, include the same approved header menu in the
reviewed content/files transfer. Do not enable a seed flag or modify an
editor-managed header automatically.

For an existing CMS, edit and publish the Header Menu in the Strapi Site
Setting. Do not automatically overwrite an editor-managed header. Add a code
migration only when a narrowly defined, exact-signature migration is explicitly
approved.

## Step 8: Update documentation

For a new category integration, update the relevant descriptions and counts in:

- `context.md`;
- `explaner_frontend.md`;
- `explainer_cms.md`;
- `cms/CONTENT_MODEL.md`;
- `cms/README.md` and `frontend/README.md`; and
- `prod.md` only when deployment variables, permissions or behavior change.

Update documented collection/type/route counts when the new collection changes
them.

Do not claim that later pages are implemented merely because their navigation
labels exist. Document exactly which first page is available and which pages
remain CMS work.

## Workflow B: Add later pages through Strapi

After Workflow A is complete, use this process for every additional page in
the same category:

1. Confirm the approved slug is globally unique under `/corporate/[slug]`.
2. Extract and clean content from the approved source using Step 1.
3. Open **Content Manager** in Strapi.
4. Open the category’s page collection, such as **MCA Service Page**.
5. Create one record and complete every required fixed section.
6. Set `menuLabel`, `slug`, SEO fields and `sortOrder`.
7. Save and publish the record.
8. Open the published Site Setting and change that page’s header link from
   `/#services` to `/corporate/<slug>`.
9. Publish the Site Setting.
10. Verify the public route, metadata, navigation link and sitemap entry.

No new page component, App Router file, fallback or migration entry is required for
a CMS-only page. If Strapi is unavailable, that page will return 404 because it
has no local fallback; this is expected. If offline availability is later
required, add an approved fallback and matching migration record deliberately.

An incomplete CMS-only record also returns 404. Complete all required fields
instead of inserting copy from the first page.

Deploy the collection schema and update the frontend token permission before
depending on a CMS-only page in production.

## Validation checklist

After frontend changes:

```bash
cd frontend
npm run typecheck
npm run build
```

After CMS changes:

```bash
cd cms
npm run build
```

Before handing off the category, also verify:

- the first fallback and migration mirror contain the same content;
- `git diff --check` passes;
- the first route loads with Strapi unavailable;
- the first route loads from its published Strapi record;
- a complete CMS-only test record renders without a local fallback;
- an incomplete CMS-only test record returns 404;
- page metadata uses the record’s SEO values;
- the sitemap contains published category slugs;
- the header category and first link work on desktop and mobile; and
- no files under `site/` or generated folders were changed.

## MCA Services reference files

Use these existing files as the concrete reference implementation:

```text
cms/src/api/mca-service-page/
cms/src/seed/mca-service-pages.json (historical content mirror)
cms/src/seed/index.ts (not invoked by PostgreSQL bootstrap)
cms/src/revalidation.ts
frontend/data/mca-service-pages-fallback.ts
frontend/lib/types.ts
frontend/lib/strapi.ts
frontend/lib/content.ts
frontend/app/corporate/[slug]/page.tsx
frontend/app/sitemap.ts
frontend/components/company-registration/company-registration-page.tsx
```

The MCA implementation is the pattern for “create the category and its first
page once, then add the remaining pages through Strapi.”
