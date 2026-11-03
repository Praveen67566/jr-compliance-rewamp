# Bootstrap: move FSSAI from Corporate to Approval before launch

Use this guide to move the entire FSSAI navigation group and all its existing
service pages to Approval before the public launch. This is a routing and CMS
content change; no database schema migration is expected.

This file contains instructions only. Creating it does not change routes,
navigation, CMS records, enquiry handling, or indexing.

## Copy-and-paste implementation prompt

```text
Implement maintenance-guides/move-fssai-to-approval-bootstrap.md before launch.
Read bootstrap.md, context.md, theme.md, explaner_frontend.md,
explainer_cms.md, prod.md, and applicable AGENTS.md instructions first.
Treat this guide's FSSAI scope as the task; do not execute an unrelated task
that may remain in bootstrap.md's Prompt section.

Move the whole FSSAI family from Corporate to Approval, including all existing
complete published records and Water Report. Keep fssai-service-page, its
stored slugs, document IDs, content, media, and fixed shared template.
Use /approval/[slug], with no public category segment.

First inspect current CMS records and navigation read-only, using an existing
authorized connection if available. Recheck the seven-page inventory in this
guide and check for Approval slug collisions. Do not invent missing records,
publish drafts, or recreate CMS-only pages as frontend fallback content.
If CMS access is unavailable, continue repository work and clearly identify
the inventory and CMS verification that remains before release.

Make the smallest scoped repository change: update the FSSAI route family,
fallback navigation and CMS navigation source mirror; add permanent redirects
from old FSSAI Corporate URLs; and normalize known FSSAI links to Approval.
Preserve query parameters, link fragments during normalization, existing
redirects, unrelated routes, and 404 behavior. Audit historical URL aliases
against actual records instead of guessing their destinations.

Prepare an exact, reviewable CMS content update plan that moves the FSSAI
menu group and updates relevant internal links without replacing customized
navigation or publishing pending editor work. Apply it only to an environment
explicitly identified and authorized for content writes; otherwise leave it
as a documented plan. Keep secrets out of files and reports.

Verify Approval breadcrumbs, canonical and Open Graph URLs, sitemap entries,
llms.txt and llms-full.txt, and consultation routing. Existing path-based
logic sends Approval enquiries as technical; document that behavior and do
not add a business-routing exception unless requested.

Update affected tests and FSSAI documentation. Run npm test, npm run typecheck,
and npm run build in frontend. If CMS code changes, run npm run build in cms
and any affected script tests. Report changed files, CMS writes actually
performed, validation results, and remaining release checks.

Do not deploy, change production data, enable indexing, change schemas,
reseed content, redesign pages, or modify unrelated sections as part of this
implementation prompt.
```

## 1. Confirm the inventory and intended URLs

The [existing service inventory](corporate-approval-sticky-bar-content.md)
records these seven published local FSSAI services as of **31 October 2026**.
This guide does not independently verify the current database or deployed CMS.
Recheck the target environment when implementing; include additional FSSAI
records added since that snapshot.

| Service | Previous public URL | New canonical URL |
| --- | --- | --- |
| Fssai Basic Registration | `/corporate/fssai-certificate` | `/approval/fssai-certificate` |
| Fssai State | `/corporate/fssai-state` | `/approval/fssai-state` |
| Fssai Central | `/corporate/fssai-central` | `/approval/fssai-central` |
| Fssai Modification | `/corporate/fssai-modification` | `/approval/fssai-modification` |
| Fssai Renewal | `/corporate/fssai-renewal` | `/approval/fssai-renewal` |
| Fssai Return | `/corporate/fssai-return` | `/approval/fssai-return` |
| Water Report | `/corporate/water-report` | `/approval/water-report` |

Read all pages of the published `fssai-service-page` collection. Record each
service's document ID, stored slug, completeness, and navigation destination.
Check every resulting public slug against all current Approval collections;
ambiguous URLs must not select an arbitrary record or silently remove a page.
Resolve any collision explicitly before release, without automatically
renaming existing services.

The checked-in fallback contains only Basic Registration. The other six pages
depend on complete published CMS records. A menu link alone does not prove a
working page exists. Keep missing, draft, unpublished, incomplete, and unknown
CMS-only records out of public discovery.

## 2. Preserve the CMS model and existing content

Keep the `fssai-service-page` collection and its REST endpoint
`/api/fssai-service-pages`. The route family is currently assigned in frontend
code, rather than stored as a Corporate/Approval field on each FSSAI record.
Changing that assignment does not require moving records between collections.

Preserve document IDs, slugs, page copy, optional sections, media, relations,
sort order, and publication state. Keep the existing server-only token name,
explicit population, typed contracts, loaders, and revalidation tags. Do not
create a generic Approval collection or a separate component for each page.

The expected database changes are limited to editor-managed navigation and
relevant URL values. Use Strapi Content Manager or its supported document
operations, rather than editing component tables directly. Take a verified
backup before applying content updates, following [prod.md](../prod.md).

## 3. Make the scoped frontend changes

### Routing and redirects

- In [service-route-config.ts](../frontend/lib/service-route-config.ts), change
  only the FSSAI definition's `family` from `corporate` to `approval`. Keep
  `contentType: "fssai-service-page"` and `categorySlug: "fssai"`.
- Reuse [service-routes.ts](../frontend/lib/service-routes.ts) and the existing
  [Approval route](../frontend/app/approval/[slug]/page.tsx). All eligible
  records in the collection should move together, including future records.
- Add permanent 308 redirects for the old direct Corporate URLs and validated
  older forms such as `/corporate/fssai/<slug>` and `/fssai/<slug>`. Preserve
  repeated and empty query parameters, including campaign attribution.
- Merely changing the registry makes the existing Corporate lookup stop finding
  FSSAI. Its direct and nested routes therefore need explicit compatibility
  handling, or narrowly scoped rules in
  [next.config.ts](../frontend/next.config.ts).
- Avoid a blanket Corporate-to-Approval redirect. Retain existing non-FSSAI
  redirects and routes, and prevent redirect loops and unnecessary chains.
- Audit historical aliases in [seed/index.ts](../cms/src/seed/index.ts), such
  as `fssai-state-license`, `fssai-central-license`, and `fssai-return-filing`.
  Add an alias only when its target is verified. Do not reuse the unrelated
  legacy WPC certification destination.

### Links and navigation sources

- In [homepage-fallback.ts](../frontend/data/homepage-fallback.ts), move the
  FSSAI group from Corporate to Approval. Preserve labels, ordering within the
  group, and placeholders for services with no local fallback.
- Mirror the group placement and approved fallback URLs in
  [seed/content.ts](../cms/src/seed/content.ts). Editing this source does not
  update existing editor-managed CMS navigation. Keep all seed flags disabled.
- In [public-paths.ts](../frontend/lib/public-paths.ts), account for the family
  change when normalizing known old FSSAI links. The current implementation
  retains an explicit `/corporate/` prefix, so changing the registry alone
  does not rewrite `/corporate/fssai-certificate`.
- Match verified FSSAI identities or aliases, including Water Report; a
  `fssai-*` prefix alone does not cover the section. Preserve queries and
  fragments, external destinations, media URLs, and unrelated service links.
  Runtime compatibility should also work for known older CMS link values.

The shared template, shell, header, and footer should need no layout or styling
changes. Registry-driven breadcrumbs, static params, canonical metadata,
sitemap discovery, and crawler exports should follow Approval automatically;
verify them instead of duplicating those systems.

## 4. Prepare and apply the targeted CMS content update

For the explicitly authorized content environment:

1. Snapshot the current published navigation and affected link values. Inspect
   drafts separately; do not overwrite or publish pending editor changes.
2. Under **Site Setting → Header Menu**, move the entire **FSSAI** category
   from **Corporate** to **Approval**, preserving its logo, seven service
   labels, link targets, and internal order. Include later verified additions.
3. Change its working links to the new direct `/approval/<slug>` destinations.
   Preserve every unrelated menu category and setting.
4. Audit footer links, service cards, related guides/services, CTAs, explicit
   SEO canonicals, and URL-bearing structured data for old FSSAI destinations.
   Update only confirmed FSSAI URL values. Inspect Markdown/HTML hyperlinks
   separately; the generic link-field normalizer does not parse prose.
5. Review and publish only the intended content changes. Publishing Site
   Setting can publish other pending settings, so do not publish it blindly.
6. Verify signed cache invalidation, or allow the normal revalidation interval,
   then check the rendered navigation and pages.

Do not replace the whole menu with fallback/seed data, enable broad bootstrap
rewrites, rerun the bulk Corporate importer, or import a database to accomplish
this move. If the historical importer remains supported, audit its FSSAI-only
path/menu handling so a later run cannot recreate Corporate links. Preserve
historical old-URL signatures used to recognize legacy data.

## 5. Check enquiry routing and documentation

In [leads.ts](../frontend/lib/leads.ts), `/approval/*` currently maps to the
`technical` enquiry type, while `/corporate/*` maps to `corporate`. Record that
FSSAI's new URLs inherit the Approval behavior and verify it matches the
intended enquiry destination before release. Any exception to retain Corporate
handling is a separate business decision. Use mocks or an authorized staging
receiver for form checks; do not create production test leads.

Update affected FSSAI references in `context.md`, `explaner_frontend.md`,
`explainer_cms.md`, `cms/CONTENT_MODEL.md`, and relevant setup documentation.
Keep the dated service inventory as a historical snapshot, with a note linking
to the completed move when it happens. Do not bulk-replace historical legacy
source paths such as `site/corporate/fssai-certificate.html`.

## 6. Validate before release

Update the existing routing tests, including `service-route-hierarchy.test.ts`,
`public-service-routing.test.ts`, and `public-paths.test.ts`. Add focused cases
for FSSAI family ownership, redirects, old-link normalization, CMS-only pages,
slug conflicts, and enquiry classification. Check the affected sitemap and
`llms` tests as well.

From the repository root:

```bash
cd frontend
npm test
npm run typecheck
npm run build
```

If CMS source code changes, also run in `cms`:

```bash
npm run build
```

Run affected importer tests if that script changes. A CMS content-only edit
does not require rebuilding Strapi. Explain any command that cannot run.

- Every verified new FSSAI URL returns `200` with its own existing content.
- Each old URL returns `308` to the correct new URL; queries survive. Unknown
  and ambiguous destinations retain the intended `404` behavior.
- Desktop and mobile menus show FSSAI once under Approval, with keyboard
  behavior and category artwork preserved.
- Breadcrumbs show Approval; canonical and `og:url` values use the new paths
  and configured `SITE_URL` origin.
- Eligible FSSAI sitemap and `/llms.txt` / `/llms-full.txt` entries use Approval.
  Keep their current exclusions for noindex, draft, incomplete, ambiguous, and
  CMS-only missing records; crawler exports must not invent fallback records.
- CMS-unavailable checks retain the Basic Registration fallback at its new
  URL; additional CMS-only pages retain their current unavailable behavior.
- Other Corporate, Approval, Global, legal, and advertisement routes retain
  their behavior. No duplicate canonical FSSAI pages remain under Corporate.

## 7. Coordinate the pre-launch release

Complete and validate the code and CMS changes in staging before public launch.
During the separately authorized release, coordinate the new frontend build
and targeted CMS navigation publication in the pre-launch window so users do
not encounter a menu whose links are unsupported by the active frontend.
Follow [prod.md](../prod.md) for release activation and cache checks. Rebuild
and reload the CMS only if its source code changed.

Keep the previous frontend release and the exact pre-change navigation/link
snapshot. If rollback is needed, restore compatible code and those targeted
CMS values together, preserving any newer editor work. No table migration or
whole-database restore should be necessary for this move.

Keep the current indexing restrictions throughout this task. Enable public
indexing separately using
[replace-noindex-with-index-follow.md](replace-noindex-with-index-follow.md)
only after the FSSAI launch checks pass.
