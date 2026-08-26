# Future CMS-managed service categories

> Planning document only. Nothing described here is implemented yet. Do not
> change the current route registry or migrate existing records until this work
> is separately approved, built, and tested.

## Why this document exists

The current categorized URLs are working, but category routing is owned by the
frontend:

```text
/corporate/{categorySlug}/{serviceSlug}
/approval/{categorySlug}/{servicePath}
```

For example:

```text
/corporate/company-registration/sole-proprietorship-registration
/approval/pollution-advisory/epr-certification
```

Today, Strapi controls each service page's slug and content. The frontend file
`frontend/lib/service-routes.ts` controls the category slug, category label,
route family, and the Strapi collection used for that category.

This means:

| Task today | What is required |
| --- | --- |
| Add another page to an existing category | Create and publish the complete page in its existing Strapi collection. No route code is normally required. |
| Add a completely new category | Add its CMS collection and frontend registry mapping, then deploy the code. |
| Edit a service page's content or service slug | Update the Strapi record. |
| Edit a category label or category slug | Update frontend code and deploy it. |

The future goal is to let an editor add both a new category and its pages from
Strapi without requiring a frontend deployment.

## Recommended safe design

Use a **hybrid system**:

1. Keep all current Corporate and Approval collections and their frontend
   registry mappings unchanged.
2. Add a new CMS model only for future CMS-managed categories.
3. Make the route resolver check the existing fixed registry first, then check
   the new CMS category records.
4. Render both kinds of pages with the existing shared service-page UI.

This protects all existing URLs and content while allowing future categories
to be created dynamically.

Do not reuse the existing Strapi `service-category` collection for this work.
That collection belongs to the homepage Service Stack. A route category needs a
different contract and should have an unambiguous name such as
`service-route-category`.

## Future CMS models

### 1. `service-route-category`

One record represents one public Corporate or Approval category.

Suggested fields:

| Field | Purpose |
| --- | --- |
| `family` | Required enum: `corporate` or `approval`. |
| `categoryLabel` | Breadcrumb and editor-facing label, such as `Business Licenses`. |
| `categorySlug` | URL segment, such as `business-licenses`. |
| `sortOrder` | Optional ordering for discovery or navigation tools. |
| `pages` | Relation to the future service-page records. |

Use Draft & Publish. A category must not appear on the website until it is
published.

The combination of `family` and `categorySlug` must be unique. A CMS category
slug must also be rejected if it conflicts with a category already defined in
the fixed frontend registry.

### 2. `cms-service-page`

One record represents one service page in a CMS-managed category.

Suggested routing fields:

| Field | Purpose |
| --- | --- |
| `category` | Required relation to one `service-route-category`. |
| `title` | Main page title. |
| `menuLabel` | Breadcrumb and navigation label. |
| `servicePath` | The CMS-managed part of the URL. |
| `sortOrder` | Optional page ordering. |

The content fields should follow the same fixed contract already used by the
shared service template: hero, overview, challenges, advantages, process, Why
JR, breakdown, FAQs, closing CTA, SEO, and the existing optional supported
sections.

This should remain a fixed service-page schema. Do not turn it into a generic
page builder or dynamic zone.

Routing rules for `servicePath`:

- Corporate pages use one segment, for example `trade-license`.
- Approval pages may use one or more segments, for example
  `waste/epr-certification`.
- Every segment must be a safe URL slug.
- The combination of category and complete `servicePath` must be unique.

## How a request would be loaded

For a request such as:

```text
/corporate/business-licenses/trade-license
```

the future frontend should:

1. Read the family as `corporate`, the category as `business-licenses`, and the
   service path as `trade-license`.
2. Check the current fixed category registry first.
3. If it is not a fixed category, request a published CMS category matching
   `family=corporate` and `categorySlug=business-licenses`.
4. Request a published, complete page related to that exact category with
   `servicePath=trade-license`.
5. Strictly map the CMS record to the existing typed service-page contract.
6. Render the existing shared page and breadcrumb UI.
7. Return 404 if the category is unknown, the page belongs to another category,
   the record is a draft, or required content is incomplete.

The breadcrumb would be generated from CMS data:

```text
Home / Corporate / Business Licenses / Trade License
```

The same flow applies to Approval, while preserving its complete multi-segment
service path:

```text
/approval/environmental-approvals/waste/epr-certification
```

## What remains frontend-owned

Making categories CMS-managed does not make the whole website code-free. The
frontend should continue to own:

- URL validation and route resolution.
- The shared service-page layout and responsive UI.
- Breadcrumb markup and accessibility.
- Metadata and canonical URL generation.
- Sitemap generation.
- Strict content validation and 404 behavior.
- Legacy redirect safety.

Strapi should own editable category labels/slugs, service paths, page content,
SEO, media, links, and ordering.

If a future category needs a different page structure or visual design, that is
not a CMS-only change. It requires an approved schema and frontend component
change.

## Links, sitemap, and redirects

After the future integration:

- Static parameters and the sitemap should include only complete, published CMS
  categories and pages.
- Canonical metadata must use the categorized URL, regardless of an old CMS
  canonical value.
- A flat legacy service path may redirect only when it matches exactly one
  page. Zero or multiple matches must return 404.
- If editors must rename live slugs later, add a reviewed `legacyPaths` or alias
  system. Strapi does not automatically remember old slugs.
- Category landing pages should not be created unless they are approved as a
  separate feature.

Navigation stays separately managed through Site Setting. Publishing a category
or page should not silently add it to the header. The editor must add the final
categorized URL to the correct Site Setting navigation group and publish that
setting.

## CMS editor workflow after this feature exists

### Add a category

1. Open `Service Route Category` in Content Manager.
2. Choose `Corporate` or `Approval`.
3. Enter the category label and category slug.
4. Save and publish the record.

Example:

```text
Family: Corporate
Label: Business Licenses
Slug: business-licenses
```

### Add a service page

1. Open `CMS Service Page`.
2. Select the published category.
3. Enter a complete service path and all required page content.
4. Complete its SEO fields.
5. Save and publish the page.

Example result:

```text
/corporate/business-licenses/trade-license
```

For Approval, the path may contain multiple segments:

```text
Category: environmental-approvals
Service path: waste/epr-certification
Final URL: /approval/environmental-approvals/waste/epr-certification
```

### Add it to navigation

1. Open Site Setting.
2. Add the final categorized URL to the correct Corporate or Approval group.
3. Save and publish Site Setting.
4. Verify the page, breadcrumb, canonical URL, and sitemap entry.

## Future implementation checklist

### CMS work

- Add and document the two new fixed collections.
- Update `cms/CONTENT_MODEL.md` and the CMS documentation.
- Add their standard Strapi routes, controllers, and services.
- Add validation for family/category/path rules and collisions.
- Add frontend revalidation tags for category, page, and navigation changes.
- Give the server-side read-only API token `find` and `findOne` permissions.
- Keep Public-role access disabled.

### Frontend work

- Add typed category and page contracts in `frontend/lib/types.ts`.
- Add explicit Strapi population and strict mappers in
  `frontend/lib/strapi.ts`. Do not use `populate=deep`.
- Extend `frontend/lib/content.ts` and `frontend/lib/service-routes.ts` with the
  hybrid fixed-registry/CMS resolver.
- Keep `STRAPI_API_TOKEN` server-only; never use a `NEXT_PUBLIC_*` CMS secret.
- Discover published CMS categories/pages for routes and the sitemap.
- Reuse the current service template and breadcrumb UI.
- Add focused route, collision, 404, redirect, canonical, breadcrumb, sitemap,
  and revalidation tests.

## Safe rollout plan

1. Back up Strapi and build the new models in a staging environment.
2. Add the new CMS API without changing any current public route.
3. Add the frontend hybrid resolver while keeping every fixed registry entry.
4. Create one test category and one complete page in staging.
5. Test drafts, wrong-category URLs, multi-segment Approval paths, breadcrumbs,
   canonical URLs, redirects, sitemap output, permissions, and revalidation.
6. Deploy the code, then publish the first CMS-managed category and navigation
   link.

Existing categories do not need to be migrated. Moving them into the new model
later would be a separate, higher-risk migration with content, redirect, and
SEO verification.

## Required validation when implemented

```bash
cd frontend
npm test
npm run typecheck
npm run build

cd ../cms
npx tsc --noEmit
npm run build
```

Also test the final routes against staging Strapi with the read-only frontend
token. Confirm that drafts and incomplete records return 404 and that anonymous
CMS access remains disabled.

## Short answer

After this one-time future integration, an editor could add a new Corporate or
Approval category and its service pages entirely in Strapi. Until that feature
is implemented, new pages inside an existing category are CMS-managed, but a
brand-new category still requires a deliberate code and deployment change.
