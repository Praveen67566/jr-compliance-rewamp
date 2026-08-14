# CMS explainer

This file explains what each important file in `cms/` does. The CMS is a Strapi v5 TypeScript app. It owns editable JR Compliance content, links, ordering, SEO fields, and media. The Next.js frontend owns layout, styling, animation, and rendering.

## Big picture

The CMS provides content for:

- `/` through the `home-page` single type
- `/about-us` through the `about-page` single type
- `/careers` through the `careers-page` single type
- `/contact-us` through the `contact-page` single type
- shared header/footer and global consultation-form copy through the `site-setting` single type

The frontend reads published CMS content using a server-only API token. If Strapi is unavailable, the frontend uses local fallback data from `frontend/data/*-fallback.ts`.

The main CMS flow is:

1. Editors update content in Strapi.
2. Strapi stores records in SQLite locally or PostgreSQL in production.
3. The frontend fetches published single types and related collections through REST, including one Company Registration entry filtered by exact slug.
4. `cms/src/revalidation.ts` can notify Next.js after publish changes.
5. Next.js revalidates the affected cache tags and fetches fresh CMS content.

## Root files

`cms/package.json`
: Defines the Strapi app package, dependencies, Node engine range, and scripts. Important scripts are `npm run develop`, `npm run build`, `npm run start`, and Strapi upgrade helpers.

`cms/package-lock.json`
: Locks exact npm dependency versions for the CMS.

`cms/README.md`
: CMS setup guide. Covers local development, seed behavior, permissions, REST endpoints, signed revalidation, and validation commands.

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
: Database configuration. Uses SQLite for local development by default and supports PostgreSQL through environment variables for production.

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
  the two former Company Registration placeholder links), preserves any
  pending Site Setting draft, and optionally runs the local seed or narrow
  local backfills.

`cms/src/revalidation.ts`
: Signed webhook sender for Next.js cache revalidation. It watches Strapi document and media lifecycle events, maps changed CMS models to frontend cache tags, signs the payload with HMAC SHA-256, and sends it to `NEXT_REVALIDATE_URL`.

## Seed files

`cms/src/seed/index.ts`
: Opt-in local seed runner. The full seed only runs when
  `SEED_DEMO_CONTENT=true`, refuses production, refuses non-SQLite databases,
  refuses existing content, uploads approved media from
  `frontend/public/images`, and creates published demo records. The narrower
  `SEED_COMPANY_REGISTRATION_PAGES=true` backfill is also local-SQLite-only and
  adds missing approved registration slugs without overwriting editor records.
  `SEED_LEAD_FORM_SETTINGS=true` is local-SQLite-only too; it fills an absent
  Lead Form on a published Site Setting without overwriting editor content or
  publishing pending draft changes.

`cms/src/seed/content.ts`
: The actual seed content: shared settings, page content, service categories, services, logos, testimonials, recognitions, FAQs, team members, jobs, gallery items, and related records.

`cms/src/seed/company-registration-pages.json`
: A seed-time JSON mirror of the nineteen typed frontend registration
  fallbacks. It contains editor data only and is converted to the dedicated
  Strapi components by `seed/index.ts`; it contains no Webflow classes, scripts,
  forms, or legacy asset URLs.

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
: Local SQLite database and runtime files. Generated locally; do not commit.

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
- `DATABASE_FILENAME`
- `SEED_DEMO_CONTENT`
- `SEED_COMPANY_REGISTRATION_PAGES`
- `SEED_LEAD_FORM_SETTINGS`
- `NEXT_REVALIDATE_URL`
- `STRAPI_REVALIDATE_SECRET`

Production PostgreSQL variables are defined in `cms/config/database.ts` and documented in `prod.md`.

## Important rules for future CMS changes

- Keep schema changes in source control, not only in a production Content-Type Builder session.
- Do not create a generic page builder unless the content model is deliberately redesigned.
- Do not expose public read access broadly. The frontend should use a read-only server-side API token.
- Do not put secrets in frontend `NEXT_PUBLIC_*` variables.
- Keep REST population explicit in `frontend/lib/strapi.ts`; do not switch to `populate=deep`.
- Do not run seed or backfill flags in production. The full seed is only for a
  fresh local SQLite database; narrow backfills are local-SQLite-only.
- Do not rely on local `public/uploads` for production media durability.
- When a schema changes, update `cms/CONTENT_MODEL.md`, the Strapi schema files, frontend types, frontend mapper, and fallback data together.
