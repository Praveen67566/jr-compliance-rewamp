# CMS-only Approval service category guide

Use this guide when adding a new Approval detail-page family that must use the
existing Company Registration design, but must start with **no first page**.
Every public page in the family will be created later by an editor in Strapi
Content Manager.

For a category that needs an approved first page, local fallback, and migration
mirror, use `service-category-first-page-guide.md` instead.

## Intended result

A completed CMS-only Approval category has:

- one dedicated Strapi collection with the fixed service-detail contract;
- one named frontend TypeScript contract;
- one Strapi collection configuration, cache tag, and explicit fetch path;
- CMS-only page and slug loaders;
- discovery through the existing `/approval/[...slug]` route and sitemap; and
- no initial public page until an editor creates and publishes a complete
  Strapi record.

It must not add:

- a first-page fallback;
- a seed JSON or automatic seed/backfill behavior;
- an initial CMS content record;
- a new React page, route, page component, or stylesheet;
- a generic Approval page builder or dynamic zone; or
- a `service-category` record unless a Home Service Stack card was separately
  approved.

## Understand what “category” means

The project has three independent category surfaces:

| Category surface | Location | Purpose |
| --- | --- | --- |
| Header mega-menu category | Strapi `site-setting.headerMenu[].categories` and `frontend/data/homepage-fallback.ts` | Displays a category name and its navigation links |
| Home Service Stack category | Strapi `service-category` and `service` collections | Displays cards in the home-page Services section |
| Approval detail-page family | Dedicated collection such as `aerb-approval-page` | Stores complete pages rendered by `/approval/[...slug]` |

Creating a detail-page collection does not automatically create a header
category, navigation link, Home Service Stack card, or public page. Update only
the surfaces explicitly approved for the task.

If the header category already exists, do not add or duplicate it. This was the
case for TEC, WPC, BEE, CDSCO Registration, AERB Approval, LMPC Certification,
and STQC.

## Current reference implementations

The following collections are the reference CMS-only Approval families:

| Public category | Singular API key | REST collection path | TypeScript prefix |
| --- | --- | --- | --- |
| Telecommunication Engineering Centre (TEC) | `telecommunication-engineering-centre-page` | `telecommunication-engineering-centre-pages` | `TelecommunicationEngineeringCentrePage` |
| Wireless Planning and Coordination (WPC) | `wireless-planning-coordination-page` | `wireless-planning-coordination-pages` | `WirelessPlanningCoordinationPage` |
| Bureau of Energy Efficiency (BEE) | `bureau-energy-efficiency-page` | `bureau-energy-efficiency-pages` | `BureauEnergyEfficiencyPage` |
| CDSCO Registration | `cdsco-registration-page` | `cdsco-registration-pages` | `CdscoRegistrationPage` |
| AERB Approval | `aerb-approval-page` | `aerb-approval-pages` | `AerbApprovalPage` |
| LMPC Certification | `lmpc-certification-page` | `lmpc-certification-pages` | `LmpcCertificationPage` |
| STQC | `stqc-page` | `stqc-pages` | `StqcPage` |

Use these concrete references when adding another category:

```text
cms/src/api/aerb-approval-page/
cms/src/revalidation.ts
frontend/lib/types.ts
frontend/lib/strapi.ts
frontend/lib/content.ts
frontend/app/approval/[...slug]/page.tsx
frontend/app/sitemap.ts
frontend/components/company-registration/company-registration-page.tsx
```

## Record the naming contract first

Decide all identifiers before editing code:

| Decision | Example |
| --- | --- |
| Public category label | `AERB Approval` |
| Singular API key | `aerb-approval-page` |
| Plural API key / REST path | `aerb-approval-pages` |
| Database collection name | `aerb_approval_pages` |
| Strapi display name | `AERB Approval Page` |
| TypeScript prefix | `AerbApprovalPage` |
| Frontend/CMS cache tag | `jr-aerb-approval-pages` |
| Shared public route | `/approval/[...slug]` |
| Fallback and seed policy | None |

Follow the naming style already used in the repository. Do not rename a
collection after content has been created without a reviewed database migration.

There is no category-level public slug. Each page record owns its complete
relative route path through its `slug` field.

## Fixed page contract

The category must use the existing Company Registration information
architecture:

1. Hero
2. Overview
3. Challenges
4. Advantages
5. Process
6. Why Choose JR Compliance
7. Service Breakdown
8. FAQs
9. Closing CTA

The collection schema contains these top-level fields:

| Field | Strapi type | Requirement |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; final navigation/breadcrumb label |
| `slug` | UID from `title` | Required; exact flat or nested Approval path |
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

Use the Approval route-safe UID pattern:

```text
^[A-Za-z0-9-_.~]+(?:/[A-Za-z0-9-_.~]+)*$
```

This accepts both:

```text
aerb-diagnostic-x-ray-equipment
aerb-license/aerb-diagnostic-x-ray-equipment
```

Do not include `/approval/`, a leading slash, query parameters, spaces, or URL
fragments in the stored slug.

Every nested item must also be complete:

- each overview paragraph needs non-empty `text`;
- every challenge, advantage, process, and Why Choose item needs both `title`
  and `description`;
- every breakdown group needs a `title` and at least one non-empty text item;
- every FAQ needs both `question` and `answer`;
- hero and closing CTAs need `label`, `href`, and `target`; and
- SEO needs `metaTitle` and `metaDescription`.

The frontend strictly validates CMS-only records. A saved or even malformed
record must not borrow content from another page; it returns 404 instead.

## Developer workflow

### 1. Read the project rules and inspect the working tree

Read:

```text
bootstrap.md
context.md
theme.md
explaner_frontend.md
explainer_cms.md
service-category.md
```

Check `git status` and preserve all unrelated user changes. Treat `site/` as
read-only.

### 2. Create the dedicated Strapi collection

Create exactly four source files:

```text
cms/src/api/<category>-page/
├── content-types/<category>-page/schema.json
├── controllers/<category>-page.ts
├── routes/<category>-page.ts
└── services/<category>-page.ts
```

Copy the fixed schema shape from `aerb-approval-page` and change only the
collection-specific identifiers, display name, description, and database
collection name. Keep Draft & Publish enabled, preserve every fixed field, and
preserve the slash-safe slug regex.

The three TypeScript files use Strapi core factories and the same UID:

```ts
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::<category>-page.<category>-page" as never,
);
```

Use `createCoreRouter` in the routes file and `createCoreService` in the service
file. Do not add custom controller behavior unless separately required.

Do not modify:

```text
cms/src/seed/
cms/src/index.ts
cms/src/components/
```

The existing reusable components already provide the required page contract.

### 3. Add CMS-to-Next revalidation

In `cms/src/revalidation.ts`:

1. add `jr-<category>-pages` to `ALL_PAGE_TAGS`; and
2. map `api::<category>-page.<category>-page` to that tag in
   `cacheTagsByUid`.

The frontend cache map must use the identical tag.

### 4. Add named frontend types

In `frontend/lib/types.ts`, add named aliases without changing the shared
structural contract:

```ts
/** Editor-managed content for Example Approval detail routes. */
export type ExampleApprovalPageData = CompanyRegistrationPageData;

export type ExampleApprovalPageContent =
  PageChromeContent & ExampleApprovalPageData;
```

The named type keeps the CMS collection boundary clear while reusing the fixed
Company Registration page component.

### 5. Register the collection in the Strapi adapter

In `frontend/lib/strapi.ts`, add the category to all relevant places:

1. import its named page-content type;
2. extend `RevalidatableContentSlug`;
3. extend `strapiCacheTagBySlug`;
4. extend `FixedServiceContentSlug`;
5. define a `FixedServiceCollectionConfig` with collection path, content slug,
   and public label;
6. export its published slug-list fetcher; and
7. export its page fetcher through
   `getFixedServiceCategoryPageFromStrapi`.

Reuse the existing:

- `fixedServiceDetailPopulateTree`;
- exact-slug query;
- slug-list query;
- `mapFixedServiceCategoryPage`; and
- strict CMS-only validator.

Do not copy a second populate tree or mapper. Never use `populate=deep`.

The page fetcher must accept a nullable fallback because the content loader
will deliberately pass `null`:

```ts
export function getExampleApprovalPageFromStrapi(
  slug: string,
  fallback: ExampleApprovalPageContent | null,
  chromeFallback: PageChromeContent,
): Promise<ExampleApprovalPageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    exampleApprovalCollection,
  );
}
```

### 6. Add CMS-only content loaders

In `frontend/lib/content.ts`, use the existing shared chrome fallback, but pass
no page fallback:

```ts
export const getExampleApprovalPage = cache(
  async function getExampleApprovalPage(
    slug: string,
  ): Promise<ExampleApprovalPageContent | null> {
    return getExampleApprovalPageFromStrapi(
      slug,
      null,
      cmsOnlyApprovalChromeFallback,
    );
  },
);

export const getExampleApprovalSlugs = cache(
  async function getExampleApprovalSlugs(): Promise<string[]> {
    return getExampleApprovalSlugsFromStrapi();
  },
);
```

Do not create an empty fallback module or union the slug list with invented
local slugs. If Strapi is unavailable, the loader must return `null`.

### 7. Extend the existing Approval route

Update `frontend/app/approval/[...slug]/page.tsx`; do not create another route
file.

Add the category’s page and slug loaders to:

- the imports;
- the `Promise.all` in `generateStaticParams`;
- the deduplicated route-path list; and
- the `getApprovalPage` resolution chain.

Preserve:

```ts
export const dynamicParams = true;
```

The catch-all route must continue to:

- split stored paths for static params with `routePath.split("/")`;
- join request segments with `slug.join("/")`;
- generate metadata from the resolved page;
- call `notFound()` for an unknown, unpublished, or incomplete record; and
- render `CompanyRegistrationPage` unchanged.

Resolution order determines which page wins if two collections contain the
same slug. Strapi only enforces UID uniqueness inside one collection, so every
Approval route path must be manually unique across all Approval collections.

### 8. Add the category to the sitemap

In `frontend/app/sitemap.ts`:

1. import the category slug loader;
2. include it in the existing `Promise.all`; and
3. include its values in the deduplicated Approval route-path set.

A collection with no published records adds no URL. Once a complete record is
published and cache revalidation runs, its path is discovered automatically.

### 9. Handle navigation separately

Publishing a page record does not create or change a menu link.

- If the header category already exists, leave its structure unchanged during
  developer integration.
- If the header category does not exist, add it through **Site Setting → Header
  Menu** only when its approved label and links are known, then publish Site
  Setting.
- Update `frontend/data/homepage-fallback.ts` only when approved offline
  navigation is explicitly required.
- Do not overwrite an editor-managed Site Setting through bootstrap or a seed.
- Do not point a link at a page until the full record and exact slug are
  published.

The menu URL must exactly match the stored slug:

```text
stored slug: aerb-diagnostic-x-ray-equipment
menu href:   /approval/aerb-diagnostic-x-ray-equipment
```

or:

```text
stored slug: aerb-license/aerb-diagnostic-x-ray-equipment
menu href:   /approval/aerb-license/aerb-diagnostic-x-ray-equipment
```

### 10. Update the editorial contract and documentation

Update the relevant files together:

```text
cms/CONTENT_MODEL.md
cms/README.md
frontend/README.md
context.md
explaner_frontend.md
explainer_cms.md
```

Each added category increases:

- collection-type count by one;
- total content-type count by one; and
- fixed service-detail collection count by one.

It does not add a fallback-backed active route or bundled CMS record. Do not
increase a documented local route count merely because the empty collection
exists. Update `prod.md` only when deployment variables or behavior change.

### 11. Configure permissions after deploying the schema

Schema deployment does not update an existing custom API token automatically.

Grant:

- `next-site-reader`: `find` and `findOne` for the new collection;
- Content Editor: create/read/update access as approved;
- Publisher/Admin: publish access; and
- Public role: no access.

Keep the token only in the frontend server’s `STRAPI_API_TOKEN`. Never expose
it through `NEXT_PUBLIC_*`.

Restart/redeploy Strapi so the new content type is registered, then rebuild or
restart the frontend according to the normal deployment workflow.

## Strapi editor workflow for every page

After the developer integration and permissions are deployed:

1. Open **Content Manager**.
2. Open the correct category page collection.
3. Create a new record.
4. Complete `title`, `menuLabel`, every fixed section, all required nested
   items, SEO, `sortOrder`, and the exact relative `slug`.
5. Confirm the full route path is unique across all Approval collections.
6. Save the record.
7. Click **Publish**. A saved draft is not visible to the frontend.
8. Open **Site Setting → Header Menu**.
9. Set the matching link to `/approval/<exact-slug>`.
10. Publish Site Setting.
11. Verify the public page, metadata, navigation link, and sitemap entry.

A slug alone does not make a valid page. The full fixed record must be complete
and published.

## Troubleshooting a CMS-only page

If the frontend returns 404, check in this order:

1. **Publication:** if Strapi still shows a **Publish** action, the entry is a
   draft. The frontend requests only `status=published`.
2. **Exact URL:** verify that the browser/menu path exactly equals
   `/approval/` plus the stored slug. Flat and nested paths are different.
3. **Collection permission:** grant the server-side `next-site-reader` token
   `find` and `findOne` for the correct collection.
4. **Complete nested content:** confirm all item titles/descriptions, breakdown
   text, FAQ answers, CTAs, and required SEO fields are populated.
5. **Strapi connection:** confirm server-side `STRAPI_URL` and
   `STRAPI_API_TOKEN` are configured. Do not inspect or expose their values in
   browser code.
6. **Cache:** allow the normal 60-second revalidation window or verify the
   signed publish webhook is configured and succeeding.
7. **Slug collision:** search every Approval collection for the same full
   path. The first collection in route resolution order wins.

Creating a page in the wrong category collection is editorially incorrect even
if its globally unique slug happens to resolve through the shared route.

## Validation checklist

After developer changes, run:

```bash
cd frontend
npm run typecheck
npm run build

cd ../cms
npm run build
```

Also verify:

- `git diff --check` passes for the files changed by the task;
- the new schema parses and contains the complete fixed field list;
- all four API files use the same Strapi UID;
- the CMS and frontend cache tags match exactly;
- no fallback or seed file was created;
- no generated folder, secret, local database, upload, or `site/` file changed;
- the empty category adds no local route when Strapi is unavailable;
- a complete published record renders through `/approval/<slug>`;
- an unpublished or incomplete record returns 404;
- flat and nested slugs resolve at their exact URLs;
- page metadata comes from the record’s SEO component;
- the published slug appears in the sitemap;
- the menu link works on desktop and mobile; and
- publishing, unpublishing, and deleting the record invalidate the matching
  cache tag.

## Future request template

Use this prompt when another CMS-only Approval category is needed:

```text
Read bootstrap.md, context.md, theme.md, explaner_frontend.md,
explainer_cms.md, and service-category.md.

Add one new CMS-only Approval service category:
- Public label: <label>
- Singular API key: <category>-page
- Plural API key: <category>-pages
- Database collection: <category>_pages
- TypeScript prefix: <Category>Page
- Cache tag: jr-<category>-pages

Use the existing fixed Company Registration design and
/approval/[...slug] route. Create no first page, fallback, seed JSON,
initial CMS record, new route, component, stylesheet, or generic page builder.
Editors will create every complete page directly in Strapi after deployment.
Keep navigation separate and do not duplicate an existing menu category.
Update all required CMS/frontend contracts, revalidation, sitemap discovery,
permissions documentation, and content-model counts. Run the required frontend
and CMS validation commands and report every changed file.
```