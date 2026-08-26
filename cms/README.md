# JR Compliance CMS

This is the Strapi v5 TypeScript CMS for the active JR Compliance routes:

- `/` — `home-page`
- `/about-us` — `about-page`
- `/careers` — `careers-page`
- `/contact-us` — `contact-page`
- `/privacy-policy`, `/terms-and-conditions`, and `/purchase-and-billing` —
  three fixed `legal-page` collection records
- `/corporate/[slug]` — `company-registration-page` collection (nineteen approved slugs)
- `/corporate/dsc-certificate` — `mca-service-page` collection (first approved MCA Services route)
- `/corporate/iec-registration` — `import-export-service-page` collection (first approved Import Export Service route)
- `/corporate/ayush-license` — `government-license-certification-page` collection (first approved Government License & Certification route)
- `/corporate/trademark-registration` — `ipr-service-page` collection (first approved IPR Services route)
- `/corporate/fssai-certificate` — `fssai-service-page` collection (first approved FSSAI route)
- `/corporate/portfolio-manager-registration` — `sebi-business-registration-page` collection (first approved SEBI Business Registration route)
- `/corporate/gst-registration` — `tax-accounting-page` collection (first approved Tax and Accounting route)
- `/corporate/shop-and-establishment-act-registration` — `labour-compliance-page` collection (first approved Labour Compliance route)
- `/corporate/msme-registration` — `fund-raising-page` collection (first approved Fund Raising route)
- `/approval/isi-certificate` — `bureau-indian-standards-page` collection (first approved Bureau of Indian Standards route)
- `/approval/epr-certification` — `pollution-advisory-page` collection (first approved Pollution Advisory route)
- future `/approval/[...slug]` records — empty CMS-only
  `telecommunication-engineering-centre-page`,
  `wireless-planning-coordination-page`, `bureau-energy-efficiency-page`,
  `cdsco-registration-page`, `aerb-approval-page`,
  `lmpc-certification-page`, and `stqc-page` collections
- future `/globals/[country]` records — empty CMS-only
  `global-country-page` collection
- future `/globals/[country]/[slug]` records — empty CMS-only
  `global-certificate-page` collection
- shared header/footer and global consultation-form copy — `site-setting`

Later approved records in any of the eighteen extensible service families use
their dedicated fixed collection contract. Corporate records render at
globally unique `/corporate/[slug]` routes. All nine Approval families—Bureau
of Indian Standards, Pollution Advisory, Telecommunication Engineering Centre,
Wireless Planning and Coordination, Bureau of Energy Efficiency, CDSCO
Registration, AERB Approval, LMPC Certification, and STQC—render through
`/approval/[...slug]` when published. Enter an Approval `slug` as a relative
path without a leading slash. Flat values such as `isi-certificate` and
slash-separated nested values such as
`bis-certification/fmcs-bis-certification` are accepted; each segment may
contain only letters, numbers, `-`, `_`, `.`, and `~`. Manually keep the full
route path unique across all nine Approval collections.

The exact editorial contract lives in [CONTENT_MODEL.md](./CONTENT_MODEL.md).
Next.js owns the Compliance Network layout, interaction, and motion; Strapi owns
editable copy, links, display order, and approved media.

The two Global collections use their own country-landing and certificate
contracts and do not change or reuse the completed Corporate/Approval schemas.
Both begin empty: no initial record, fallback, seed JSON, or sample page is
created by this integration.

The three footer legal routes use one dedicated fixed `legal-page` collection,
not a generic page builder. Their approved wording is mirrored in
`frontend/data/legal-pages-fallback.ts` and
`cms/src/seed/legal-pages.json`; the latter is a historical content/parity
source, not an active PostgreSQL bootstrap mechanism.

## Run locally

```bash
cd cms
npm ci
cp .env.example .env
npm run develop
```

Open `http://localhost:1337/admin` and create the first administrator. Local
development uses PostgreSQL. Set a local `DATABASE_URL`, keep
`DATABASE_CLIENT=postgres`, and keep all `SEED_*` flags set to `false`. Never
commit `.env`, `.tmp`, `public/uploads`, or generated builds.

`cms/.tmp/data.db` is retained only as an immutable SQLite rollback source from
the completed migration. Strapi must not be configured to open it. Set separate
production values for `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`,
`TRANSFER_TOKEN_SALT`, `JWT_SECRET`, and `ENCRYPTION_KEY`; do not reuse local
values. See `config/database.ts` for PostgreSQL connection and pool variables.

For the full deployment order, platform-neutral environment templates, content
transfer procedure, media-storage requirement, and launch checks, use
[../prod.md](../prod.md).

## Content bootstrap and legacy seed files

The active local PostgreSQL database already contains the approved page
records, relations, and media. Create another local or hosted CMS environment
by importing a reviewed, encrypted Strapi archive containing only `content` and
`files`; do not copy the SQLite rollback file and do not turn on a seed flag.

`cms/src/seed/` remains as a historical content-source record for the approved
fallback data. The normal CMS bootstrap no longer invokes its seed or backfill
functions, and PostgreSQL-only configuration rejects SQLite. All four flags
must remain `false` in local, staging, and production environments:

```dotenv
SEED_DEMO_CONTENT=false
SEED_COMPANY_REGISTRATION_PAGES=false
SEED_MCA_SERVICE_PAGES=false
SEED_LEAD_FORM_SETTINGS=false
```

Before any Strapi import, take a verified PostgreSQL backup and an uploads
backup. An import replaces selected target content and upload files; it does
not merge editor records, administrator accounts, API tokens, or secrets.

Deploying the Legal Page schema does not create its three records in the active
PostgreSQL database. Review and create/publish them in Content Manager, or move
them through the reviewed `content,files` transfer workflow after the required
backups. Also update the existing reader-token permissions before expecting CMS
records to replace the typed frontend fallbacks. Do not enable a seed flag for
this rollout.

## Schema and editor policy

The committed schemas define five single types, thirty-six collection types,
and sixty components (forty-one content types total), including nineteen
fixed service-detail collections. The fixed service-detail count remains
unchanged; the dedicated Legal Page collection and the two Global collections
are separate contracts. All editorial types use Draft & Publish.
Page-selected relations are intentionally unidirectional, ordered selections; the inverse
pairs are only Service Category → Service and FAQ Category → FAQ.

The shared navbar is edited under **Site Setting → Header Menu**:

- Corporate, Approval, and Global use ordered `categories`. Each category has
  a title and ordered `links`; this drives the two-pane mega menu.
- Careers and About Us use only their direct `href`.
- `children` remains available for a small single-level submenu, but should not
  be combined with `categories` on the same menu item.

To publish the legal routes, open **Legal Page** in Content Manager and create
exactly three records. Each record requires `title`, `eyebrow`, at least one
ordered `shared.legal-notice` section, SEO, and a `slug` matching exactly
`privacy-policy`, `terms-and-conditions`, or `purchase-and-billing`;
`introduction` is optional Blocks content. Use `sortOrder` `0`, `1`, and `2`
for Privacy Policy, Terms and Conditions, and Purchase and Billing
respectively. Review the wording against the historical JSON mirror, save, and
publish each record. Then verify **Site Setting → Legal Links** points to the
three matching internal routes and publish Site Setting.

To publish the first page in one of the seven empty Approval collections, open
that collection in Content Manager, create a record, and complete every fixed
section, `menuLabel`, SEO field, `sortOrder`, and route-safe `slug`. Verify that
the full slug is unique across all nine Approval collections, then save and
publish the record. Update the matching **Site Setting → Header Menu** link to
`/approval/<slug>` and publish Site Setting. The shared route and sitemap
discover the record automatically; no fallback, seed file, React page, or code
deployment is required for the new content record. An incomplete or unpublished
CMS-only record returns 404 by design.

To publish a Global country landing, open **Global Country Page** in Content
Manager and complete `title`, `menuLabel`, its single-segment `slug`, hero,
certificate listing with at least one complete logo card, closing CTA, SEO, and
`sortOrder`. Save and publish it, then add its exact `/globals/<country>` URL
under **Site Setting → Header Menu → Global** and publish Site Setting.

To publish a certificate, open **Global Certificate Page** and complete
`title`, `menuLabel`, `countryName`, single-segment `countrySlug` and `slug`,
hero, overview paragraphs, neutral scope items, process steps, JR Compliance
role, conclusion, closing CTA, SEO, and `sortOrder`. Save and publish it, then
put its exact `/globals/<country>/<slug>` URL on the appropriate country-page
card. The two shared frontend templates, static-param discovery, metadata, and
sitemap require no page-specific code deployment. Draft, incomplete,
unpublished, unknown, and unavailable Global records return 404. Publishing a
record does not automatically expose it in navigation.

The centralized form copy is edited under **Site Setting → Lead Form**. Its
message label and placeholder are editor-managed, but the message remains
required in frontend and server validation. Webhook configuration and form
transport do not live in Strapi.

The populated local PostgreSQL CMS includes all currently approved navbar
categories and links, nineteen Company Registration records, and the first
approved records for MCA Services, Import Export Service, Government License &
Certification, IPR Services, FSSAI, SEBI Business Registration, Tax and
Accounting, Labour Compliance, Fund Raising, Bureau of Indian Standards, and
Pollution Advisory. The Legal Page schema and its fallback/historical mirrors
are committed, but the active PostgreSQL environment still requires the three
records to be reviewed and published through Content Manager or a reviewed
transfer. The Telecommunication Engineering Centre, Wireless
Planning and Coordination, Bureau of Energy Efficiency, CDSCO Registration,
AERB Approval, LMPC Certification, and STQC collections are present but begin
empty: they have no bundled first records, fallback modules, or seed JSON. The
two Global collections also begin empty and have no fallback, seed, sample, or
initial record. On startup, the CMS also migrates only exact known Site Setting
signatures: either the original flat menu or one of the two preceding
categorized menus. Those
known signatures retain the former IPR/FSSAI later-page URLs and may also retain
the older Indian Subsidiary and Mutual Fund placeholders; separately, the exact
original three `#legal` footer links are replaced with `/privacy-policy`,
`/terms-and-conditions`, and `/purchase-and-billing`. The checks are idempotent
and signature-based. Any customized or partially migrated values, or any
pending Site Setting draft, are left untouched. Until an unmatched custom
setting is completed and published, the frontend retains its matching typed
fallback.

Do not create a generic `Page`, a dynamic-zone page builder, a navigation
collection, CSS fields, animation settings, or public submission endpoints.
Schema changes are made in this repository and deployed from source, never in a
production-only Content-Type Builder session.

Set permissions deliberately:

- Public role: no reads for these content types and no Upload access.
- `next-site-reader` API token: `find` for the five single types and `find` plus
  `findOne` for `legal-page`, `company-registration-page`, `mca-service-page`,
  `import-export-service-page`, `government-license-certification-page`,
  `ipr-service-page`, `fssai-service-page`, and
  `sebi-business-registration-page`, `tax-accounting-page`,
  `labour-compliance-page`, `fund-raising-page`,
  `bureau-indian-standards-page`, `pollution-advisory-page`,
  `telecommunication-engineering-centre-page`,
  `wireless-planning-coordination-page`, `bureau-energy-efficiency-page`,
  `cdsco-registration-page`, `aerb-approval-page`,
  `lmpc-certification-page`, `stqc-page`, `global-country-page`, and
  `global-certificate-page` collections, listed supporting collections, and
  Upload `find` only.
- Content Editor: create/read/update listed content and media, but no schema or
  delete access.
- Publisher/Admin: editor access plus publish.

After deploying the schemas, update every existing `next-site-reader` token
policy to include `find` and `findOne` for `legal-page`, both Global
collections, and the seven empty Approval collections before relying on a new
CMS record. Leave the Public role with no access.

The frontend receives only these server-side environment variables:

```bash
# frontend/.env.local
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<next-site-reader-token>
```

Never use a `NEXT_PUBLIC_*` prefix for the token. The Next app requests only
published documents with explicit population paths. Fallback-backed routes use
local content when either value is absent; Global routes have no fallback and
return 404.

## REST endpoints

Core routers/controllers/services are committed for every defined content type.
The frontend uses these published single-type, legal, fixed service, and Global
endpoints:

```text
GET /api/site-setting?status=published
GET /api/home-page?status=published
GET /api/about-page?status=published
GET /api/careers-page?status=published
GET /api/contact-page?status=published
GET /api/legal-pages?filters[slug][$eq]=<privacy-policy|terms-and-conditions|purchase-and-billing>&status=published
GET /api/company-registration-pages?filters[slug][$eq]=<slug>&status=published
GET /api/mca-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/import-export-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/government-license-certification-pages?filters[slug][$eq]=<slug>&status=published
GET /api/ipr-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/fssai-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/sebi-business-registration-pages?filters[slug][$eq]=<slug>&status=published
GET /api/tax-accounting-pages?filters[slug][$eq]=<slug>&status=published
GET /api/labour-compliance-pages?filters[slug][$eq]=<slug>&status=published
GET /api/fund-raising-pages?filters[slug][$eq]=<slug>&status=published
GET /api/bureau-indian-standards-pages?filters[slug][$eq]=<slug>&status=published
GET /api/pollution-advisory-pages?filters[slug][$eq]=<slug>&status=published
GET /api/telecommunication-engineering-centre-pages?filters[slug][$eq]=<slug>&status=published
GET /api/wireless-planning-coordination-pages?filters[slug][$eq]=<slug>&status=published
GET /api/bureau-energy-efficiency-pages?filters[slug][$eq]=<slug>&status=published
GET /api/cdsco-registration-pages?filters[slug][$eq]=<slug>&status=published
GET /api/aerb-approval-pages?filters[slug][$eq]=<slug>&status=published
GET /api/lmpc-certification-pages?filters[slug][$eq]=<slug>&status=published
GET /api/stqc-pages?filters[slug][$eq]=<slug>&status=published
GET /api/global-country-pages?filters[slug][$eq]=<country>&status=published
GET /api/global-certificate-pages?filters[countrySlug][$eq]=<country>&filters[slug][$eq]=<slug>&status=published
```

Relations, media, and nested components are not populated by default. Keep the
centralized explicit populate trees in `frontend/lib/strapi.ts`; do not switch
them to `populate=deep`. The legal query explicitly uses
`populate[sections]=true` and
`populate[seo][populate][shareImage]=true`; Global slug/path discovery uses the
same published collection endpoints with only the route fields needed for
static params and the sitemap.

## Signed cache revalidation

On a published create/update, publish, unpublish, delete, or media change,
`src/revalidation.ts` sends an HMAC SHA-256 signed JSON request to the frontend. Configure the same high-entropy
secret in both applications:

```bash
# cms/.env (on a shared VPS, keep the webhook private over loopback)
NEXT_REVALIDATE_URL=http://127.0.0.1:8123/api/revalidate
STRAPI_REVALIDATE_SECRET=<shared-random-secret>

# frontend/.env.local
STRAPI_REVALIDATE_SECRET=<same-shared-random-secret>
```

The receiver validates `X-Strapi-Signature: sha256=<digest>` before invalidating
only its allow-listed Next cache tags. CMS collection changes route to their
affected page tags; a shared-site-setting change refreshes all routes. Failed
notifications never block publishing because the frontend also revalidates via
the normal 60-second cache window.

`global-country-page` changes invalidate `jr-global-country-pages`, and
`global-certificate-page` changes invalidate
`jr-global-certificate-pages`. `legal-page` changes invalidate the dedicated
`jr-legal-pages` tag. All use the same signed webhook contract.

## Validation

```bash
cd cms
npm run build

cd ../frontend
npm run typecheck
npm run build
```

Before handing off a schema change, test an editor workflow: change a hero,
reorder a selected service/team member/job or legal section, replace media,
save a draft, publish, and confirm the matching page updates without a frontend
code change.
