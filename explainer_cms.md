# CMS explainer

This file explains what each important file in `cms/` does. The CMS is a Strapi v5 TypeScript app. It owns editable JR Compliance content, links, ordering, SEO fields, and media. The Next.js frontend owns layout, styling, animation, and rendering.

## Big picture

The CMS provides content for:

- `/` through the `home-page` single type
- `/about-us` through the `about-page` single type
- `/careers` through the `careers-page` single type
- `/contact-us` through the `contact-page` single type
- the nineteen Company Registration routes through `company-registration-page`
- `/corporate/dsc-certificate` through `mca-service-page`
- `/corporate/iec-registration` through `import-export-service-page`
- `/corporate/ayush-license` through `government-license-certification-page`
- `/corporate/trademark-registration` through `ipr-service-page`
- `/corporate/fssai-certificate` through `fssai-service-page`
- `/corporate/portfolio-manager-registration` through `sebi-business-registration-page`
- `/corporate/gst-registration` through `tax-accounting-page`
- `/corporate/shop-and-establishment-act-registration` through `labour-compliance-page`
- `/corporate/msme-registration` through `fund-raising-page`
- `/approval/isi-certificate` through `bureau-indian-standards-page`
- `/approval/epr-certification` through `pollution-advisory-page`
- future CMS-only Telecommunication Engineering Centre paths through
  `telecommunication-engineering-centre-page`
- future CMS-only Wireless Planning and Coordination paths through
  `wireless-planning-coordination-page`
- future CMS-only Bureau of Energy Efficiency paths through
  `bureau-energy-efficiency-page`
- future CMS-only CDSCO Registration paths through `cdsco-registration-page`
- future CMS-only AERB Approval paths through `aerb-approval-page`
- future CMS-only LMPC Certification paths through `lmpc-certification-page`
- future CMS-only STQC paths through `stqc-page`
- shared header/footer and global consultation-form copy through the `site-setting` single type

The committed model contains five single types, thirty-three collection types,
and forty-six components: thirty-eight content types in total, including
nineteen fixed service-detail collections. The seven new Approval collections
are schema integrations only and contain no bundled records.

The frontend reads published CMS content using a server-only API token. If
Strapi is unavailable, fallback-backed routes use local data from
`frontend/data/*-fallback.ts`; the seven empty Approval families have no local
page and return 404.

The main CMS flow is:

1. Editors update content in Strapi.
2. Strapi stores records in PostgreSQL in both local and deployed environments.
   The retained SQLite file is an offline rollback source only and is never a
   running CMS database.
3. The frontend fetches published single types and related collections through
   REST, including all nineteen fixed service-detail collections filtered by
   exact slug or Approval path.
4. `cms/src/revalidation.ts` can notify Next.js after publish changes.
5. Next.js revalidates the affected cache tags and fetches fresh CMS content.

## Root files

`cms/package.json`
: Defines the Strapi app package, dependencies, Node engine range, and scripts. Important scripts are `npm run develop`, `npm run build`, `npm run start`, and Strapi upgrade helpers.

`cms/package-lock.json`
: Locks exact npm dependency versions for the CMS.

`cms/README.md`
: CMS setup guide. Covers local PostgreSQL development, content transfer,
  permissions, REST endpoints, signed revalidation, and validation commands.

`cms/CONTENT_MODEL.md`
: The main editorial contract. This is the best source for what editors can manage and how frontend fields map to CMS fields.

`cms/.env.example`
: Safe environment variable template.

`cms/.env`
: Local CMS environment values. This can contain secrets and must not be committed.

`cms/.gitignore`
: Ignore rules for local databases, uploads, env files, builds, and generated output.

`cms/.strapi-updater.json`
: Strapi updater metadata.

`cms/favicon.png`
: Favicon used by the Strapi admin.

`cms/tsconfig.json`
: TypeScript configuration for the Strapi app.

## Config files

`cms/config/admin.ts`
: Strapi admin panel configuration. Uses admin-related secrets from environment variables.

`cms/config/api.ts`
: Strapi API settings, such as response behavior and REST API configuration.

`cms/config/database.ts`
: Database configuration. PostgreSQL is the default connection for local and
  deployed environments; `DATABASE_URL`, SSL, and pool values are environment
  controlled.

`cms/config/middlewares.ts`
: Strapi middleware configuration.

`cms/config/plugins.ts`
: Plugin configuration. Currently uses local upload behavior; production still needs durable media storage before launch.

`cms/config/server.ts`
: Server host, port, app keys, and public URL style configuration.

## App entry points

`cms/src/index.ts`
: Strapi lifecycle entry. On bootstrap it registers the Next.js revalidation
  hooks, safely upgrades only an exact known demo-header signature (including
  the preceding categorized IPR/FSSAI links and former Company Registration
  placeholder variant), preserves any
  pending Site Setting draft, and does not invoke the historical seed or
  backfill helpers.

`cms/src/revalidation.ts`
: Signed webhook sender for Next.js cache revalidation. It watches Strapi document and media lifecycle events, maps changed CMS models to frontend cache tags, signs the payload with HMAC SHA-256, and sends it to `NEXT_REVALIDATE_URL`.

## Historical content-source files

`cms/src/seed/index.ts`
: Historical content-source and guarded legacy seed runner. The normal CMS
  bootstrap no longer invokes it, the active CMS uses PostgreSQL, and every
  `SEED_*` flag must remain `false`; populate a new target with a reviewed
  encrypted Strapi `content,files` import instead.

`cms/src/seed/content.ts`
: The approved historical content source: shared settings, page content, service
  categories, services, logos, testimonials, recognitions, FAQs, team members,
  jobs, gallery items, and related records.

`cms/src/seed/company-registration-pages.json`
: A historical JSON mirror of the nineteen typed frontend registration
  fallbacks. It contains editor data only and is converted to the dedicated
  Strapi components by `seed/index.ts`; it contains no Webflow classes, scripts,
  forms, or legacy asset URLs.

`cms/src/seed/mca-service-pages.json`
: A historical JSON mirror of the approved DSC MCA Services fallback. It is
  converted to the same fixed service-detail components by `seed/index.ts` and
  contains no Webflow classes, scripts, forms, or legacy asset URLs.

`cms/src/seed/import-export-service-pages.json`
: A historical JSON mirror of the approved IEC Code fallback for migration and
  content parity checks.

`cms/src/seed/government-license-certification-pages.json`
: A historical JSON mirror of the approved Ayush License fallback for
  migration and content parity checks.

`cms/src/seed/ipr-service-pages.json`
: A historical JSON mirror of the approved Trademark Registration fallback for
  migration and content parity checks.

`cms/src/seed/fssai-service-pages.json`
: A historical JSON mirror of the approved FSSAI Basic Registration fallback.
  It uses the matching FSSAI corporate source rather than the unrelated legacy
  WPC certification destination.

`cms/src/seed/sebi-business-registration-pages.json`
: A historical JSON mirror of the approved Portfolio Manager Registration
  fallback for migration and content parity checks.

`cms/src/seed/tax-accounting-pages.json`
: A historical JSON mirror of the approved GST Registration fallback for
  migration and content parity checks.

`cms/src/seed/labour-compliance-pages.json`
: A historical JSON mirror of the approved Shop & Establishment Registration
  fallback for migration and content parity checks.

`cms/src/seed/fund-raising-pages.json`
: A historical JSON mirror of the approved MSME Registration fallback for
  migration and content parity checks.

`cms/src/seed/bureau-indian-standards-pages.json`
: A historical JSON mirror of the approved ISI Certification fallback from
  `site/approval/isi-certificate.html` for migration and content parity checks.

`cms/src/seed/pollution-advisory-pages.json`
: A historical JSON mirror of the approved EPR Certification fallback from
  `site/approval/epr-certification.html` for migration and content parity
  checks.

There are no seed JSON files for Telecommunication Engineering Centre,
Wireless Planning and Coordination, Bureau of Energy Efficiency, CDSCO
Registration, AERB Approval, LMPC Certification, or STQC. Their collections
are intentionally empty and their first records are created directly in
Strapi Content Manager.

## API content types

Each content type folder follows the Strapi pattern:

- `content-types/<name>/schema.json` defines fields, relations, draft/publish behavior, and admin labels.
- `controllers/<name>.ts` creates the core REST controller.
- `routes/<name>.ts` creates the REST routes.
- `services/<name>.ts` creates the core service.

### Single types

`cms/src/api/site-setting/`
: Shared site chrome and lead-form copy. Stores site name, header/footer logos,
  header menu, CTAs, footer links, contact details, social/legal links, and the
  centralized consultation-form labels, trust content, consent link, success
  copy, redirect path, and enabled state. It never stores webhook configuration.

`cms/src/api/home-page/`
: Home page content. Stores hero, trusted logos, services section selections, why-us content, metrics, testimonials, recognitions, FAQs, optional insights, and closing CTA.

`cms/src/api/about-page/`
: About Us page content. Stores hero, proof stats, overview/mantra content, timeline selections, partnership reasons, pioneers, team selections, achievements, SEO, and CTA.

`cms/src/api/careers-page/`
: Careers page content. Stores hero, purpose/vision/mission, values, gallery selections, job openings, benefits, employee stories, FAQs, SEO, and CTA.

`cms/src/api/contact-page/`
: Contact Us page content. Stores hero, contact methods, office/address content, enquiry copy, response steps, SEO, and CTA.

### Collection types

`cms/src/api/company-registration-page/`
: Dedicated detail-page records for the nineteen Company Registration slugs.
Each record uses the fixed hero, overview, challenges, advantages, process,
Why JR, breakdown, FAQ, closing CTA, and SEO fields; it is not a generic page
builder.

`cms/src/api/mca-service-page/`
: Dedicated detail-page records for approved MCA Services slugs. The first DSC
record uses the same fixed hero, overview, challenges, advantages, process,
Why JR, breakdown, FAQ, closing CTA, and SEO fields without widening the
Company Registration collection into a generic page builder.

`cms/src/api/import-export-service-page/`
: Dedicated fixed detail-page records for Import Export Service. IEC Code is
the first approved record; later complete records are added and published in
Strapi without a new frontend route.

`cms/src/api/government-license-certification-page/`
: Dedicated fixed detail-page records for Government License & Certification.
Ayush License is the first approved record; later complete records are added
and published in Strapi without a new frontend route.

`cms/src/api/ipr-service-page/`
: Dedicated fixed detail-page records for IPR Services. Trademark Registration
is the first approved record; later complete records are added and published in
Strapi without a new frontend route.

`cms/src/api/fssai-service-page/`
: Dedicated fixed detail-page records for FSSAI. FSSAI Basic Registration is
the first approved record; later complete records are added and published in
Strapi without a new frontend route.

`cms/src/api/sebi-business-registration-page/`
: Dedicated fixed detail-page records for SEBI Business Registration. Portfolio
Manager Registration is the first approved record; later complete records are
added and published in Strapi without a new frontend route.

`cms/src/api/tax-accounting-page/`
: Dedicated fixed detail-page records for Tax and Accounting. GST Registration
is the first approved record; later complete records are added and published in
Strapi without a new frontend route.

`cms/src/api/labour-compliance-page/`
: Dedicated fixed detail-page records for Labour Compliance. Shop &
Establishment Registration is the first approved record; later complete records
are added and published in Strapi without a new frontend route.

`cms/src/api/fund-raising-page/`
: Dedicated fixed detail-page records for Fund Raising. MSME Registration is
the first approved record; later complete records are added and published in
Strapi without a new frontend route.

`cms/src/api/bureau-indian-standards-page/`
: Dedicated fixed detail-page records for Bureau of Indian Standards. ISI
Certification is the first approved record; later complete records are added
and published in Strapi through the shared Approval route without new frontend
code.

`cms/src/api/pollution-advisory-page/`
: Dedicated fixed detail-page records for Pollution Advisory. EPR
Certification is the first approved record; later complete records are added
and published in Strapi through the shared Approval route without new frontend
code.

`cms/src/api/telecommunication-engineering-centre-page/`
: Empty dedicated fixed detail-page collection for Telecommunication
Engineering Centre. Every record is created and published directly in Strapi
and renders through the shared Approval route.

`cms/src/api/wireless-planning-coordination-page/`
: Empty dedicated fixed detail-page collection for Wireless Planning and
Coordination. It has no bundled first record, fallback, or seed mirror.

`cms/src/api/bureau-energy-efficiency-page/`
: Empty dedicated fixed detail-page collection for Bureau of Energy
Efficiency. Complete published records render through the shared Approval
route.

`cms/src/api/cdsco-registration-page/`
: Empty dedicated fixed detail-page collection for CDSCO Registration.

`cms/src/api/aerb-approval-page/`
: Empty dedicated fixed detail-page collection for AERB Approval.

`cms/src/api/lmpc-certification-page/`
: Empty dedicated fixed detail-page collection for LMPC Certification.

`cms/src/api/stqc-page/`
: Empty dedicated fixed detail-page collection for STQC.

`cms/src/api/service-category/`
: Service category records used by the home Service Stack. Categories group services.

`cms/src/api/service/`
: Individual service cards with labels, summaries, icons, links, and ordering.

`cms/src/api/brand-logo/`
: Client/regulator logos used by logo bands and trust sections.

`cms/src/api/testimonial/`
: Home page testimonials.

`cms/src/api/recognition/`
: Recognition/media cards for the home page.

`cms/src/api/faq-category/`
: FAQ grouping records used by home/careers FAQ sections.

`cms/src/api/faq/`
: Individual FAQ questions and answers.

`cms/src/api/insight/`
: Optional home insight/article/video cards.

`cms/src/api/timeline-event/`
: About page timeline entries.

`cms/src/api/team-member/`
: About page team member profiles.

`cms/src/api/achievement/`
: About page achievement/client proof cards.

`cms/src/api/job-opening/`
: Careers page job opening records.

`cms/src/api/career-testimonial/`
: Careers page employee testimonial records.

`cms/src/api/career-gallery-item/`
: Careers page culture gallery images.

## Components

Strapi components are reusable field groups stored as JSON schemas in `cms/src/components/`.

`cms/src/components/shared/`
: Cross-page primitives: `link`, `cta`, `seo`, `section-heading`, `contact`, `social-link`, and `legal-notice`.

`cms/src/components/navigation/`
: Header/footer navigation structures: `menu-item`, nested `menu-category`, and `link-group`.

`cms/src/components/home/`
: Home page field groups: hero, rotating terms, hero cards, stats, stories, image cards, CTA band, and why-us content.

`cms/src/components/about/`
: About page field groups: hero, overview, stats, value items, content clusters, and pioneers.

`cms/src/components/careers/`
: Careers page field groups: hero, purpose, values/highlights, content clusters, and life-at-JR content.

`cms/src/components/contact/`
: Contact page field groups: hero, contact points, enquiry topics, response steps, response content.

`cms/src/components/registration/`
: Fixed Company Registration field groups for hero copy, overview paragraphs,
  detail cards, breakdown groups, FAQs, and their section wrappers.

## Admin customization

`cms/src/admin/app.example.tsx`
: Example Strapi admin customization entry. Not the active admin app unless copied/renamed as Strapi expects.

`cms/src/admin/tsconfig.json`
: TypeScript configuration for admin customizations.

`cms/src/admin/vite.config.example.ts`
: Example Vite config for Strapi admin customization.

`cms/src/extensions/.gitkeep`
: Keeps the extensions folder in source control for future plugin/admin extensions.

## Database and public files

`cms/database/migrations/.gitkeep`
: Keeps the migrations folder in Git. Add database migrations here if the project adopts Strapi migration files.

`cms/public/robots.txt`
: Public robots file for the CMS server.

`cms/public/uploads/`
: Local uploaded media. Generated by Strapi local upload provider. Do not commit this folder; production needs durable media storage.

## Generated files and folders

`cms/types/generated/components.d.ts`
: Generated TypeScript declarations for Strapi components.

`cms/types/generated/contentTypes.d.ts`
: Generated TypeScript declarations for Strapi content types.

`cms/.strapi/client/`
: Generated Strapi admin client files.

`cms/node_modules/`
: Installed npm packages. Generated by `npm install` or `npm ci`; do not edit.

`cms/.tmp/`
: Retained historical SQLite rollback database and runtime scratch files. Do
  not commit, delete, rename, or configure Strapi to open them during normal
  PostgreSQL development.

`cms/dist/` and `cms/build/`
: Strapi build output when generated; do not edit manually.

## Environment variables

Common local variables:

- `HOST`
- `PORT`
- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`
- `DATABASE_CLIENT`
- `DATABASE_URL`
- `DATABASE_SSL`
- `DATABASE_POOL_MIN`
- `DATABASE_POOL_MAX`
- `SEED_DEMO_CONTENT`
- `SEED_COMPANY_REGISTRATION_PAGES`
- `SEED_MCA_SERVICE_PAGES`
- `SEED_LEAD_FORM_SETTINGS`
- `NEXT_REVALIDATE_URL`
- `STRAPI_REVALIDATE_SECRET`

PostgreSQL variables for local and deployed CMS environments are defined in
`cms/config/database.ts` and documented in `cms/.env.example` and `prod.md`.

## Important rules for future CMS changes

- Keep schema changes in source control, not only in a production Content-Type Builder session.
- Do not create a generic page builder unless the content model is deliberately redesigned.
- Do not expose public read access broadly. The frontend should use a read-only server-side API token.
- Do not put secrets in frontend `NEXT_PUBLIC_*` variables.
- Keep REST population explicit in `frontend/lib/strapi.ts`; do not switch to `populate=deep`.
- Keep every `SEED_*` flag disabled. The current local PostgreSQL content came
  from a verified transfer; use the reviewed export/import workflow for another
  target rather than a seed or backfill.
- Do not rely on local `public/uploads` for production media durability.
- When a schema changes, update `cms/CONTENT_MODEL.md`, the Strapi schema files,
  frontend types, frontend mapper, and any applicable fallback data together.
  CMS-only collections with no local record do not require an empty fallback
  module.
