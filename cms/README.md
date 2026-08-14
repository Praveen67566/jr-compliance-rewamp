# JR Compliance CMS

This is the Strapi v5 TypeScript CMS for the active JR Compliance routes:

- `/` — `home-page`
- `/about-us` — `about-page`
- `/careers` — `careers-page`
- `/contact-us` — `contact-page`
- `/corporate/[slug]` — `company-registration-page` collection (nineteen approved slugs)
- shared header/footer and global consultation-form copy — `site-setting`

The exact editorial contract lives in [CONTENT_MODEL.md](./CONTENT_MODEL.md).
Next.js owns the Compliance Network layout, interaction, and motion; Strapi owns
editable copy, links, display order, and approved media.

## Run locally

```bash
cd cms
npm ci
cp .env.example .env
npm run develop
```

Open `http://localhost:1337/admin` and create the first administrator. Local
development uses SQLite at `.tmp/data.db`. Never commit `.env`, `.tmp`,
`public/uploads`, or generated builds.

Use PostgreSQL in deployed environments. Set production values for `APP_KEYS`,
`API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, and
`ENCRYPTION_KEY`; do not reuse local values. See `config/database.ts` for the
supported PostgreSQL variables.

For the full deployment order, platform-neutral environment templates, content
transfer procedure, media-storage requirement, and launch checks, use
[../prod.md](../prod.md).

## First-content seed

The opt-in seed creates all current page records, shared header/footer content,
collections, relationships, and approved media from `../frontend/public/images`.
It only runs against a fresh local SQLite database, refuses production and
non-SQLite environments, and never overwrites existing editor content or media.

```bash
# In cms/.env, for one fresh local run only:
SEED_DEMO_CONTENT=true
npm run develop
```

After the log reports completion, set `SEED_DEMO_CONTENT=false` and restart.
The seed uploads media with meaningful alternative text; editors should review
each crop/caption before production publishing. It does not read from nor expose
`site/assets` in the frontend.

For an existing local SQLite CMS, use the narrower backfill once instead of the
full demo seed. It creates only missing approved Company Registration slugs and
never updates an editor's existing record:

```bash
# In cms/.env, for one local run only:
SEED_DEMO_CONTENT=false
SEED_COMPANY_REGISTRATION_PAGES=true
npm run develop
```

After the completion log, set `SEED_COMPANY_REGISTRATION_PAGES=false` and
restart. The backfill refuses production and non-SQLite databases. Existing
deployment content must be moved through the reviewed Strapi transfer/import
workflow instead of an automatic production write.

## Schema and editor policy

The committed schemas define five single types, fifteen collection types, and
forty-six components. All editorial types use Draft & Publish. Page-selected
relations are intentionally unidirectional, ordered selections; the inverse
pairs are only Service Category → Service and FAQ Category → FAQ.

The shared navbar is edited under **Site Setting → Header Menu**:

- Corporate, Approval, and Global use ordered `categories`. Each category has
  a title and ordered `links`; this drives the two-pane mega menu.
- Careers and About Us use only their direct `href`.
- `children` remains available for a small single-level submenu, but should not
  be combined with `categories` on the same menu item.

The centralized form copy is edited under **Site Setting → Lead Form**. Its
message label and placeholder are editor-managed, but the message remains
required in frontend and server validation. Webhook configuration and form
transport do not live in Strapi.

The fresh local seed includes all currently approved navbar categories, links,
and nineteen Company Registration records. On startup, the CMS also migrates
only an exact known demo-menu signature: either the original flat menu or the
previous categorized seed whose Indian Subsidiary and Mutual Fund links still
pointed to `/#services`. The check is idempotent and signature-based; any
customized menu or pending Site Setting draft is left untouched. Until an
unmatched custom menu is completed and published, the frontend retains its
matching typed fallback.

Do not create a generic `Page`, a dynamic-zone page builder, a navigation
collection, CSS fields, animation settings, or public submission endpoints.
Schema changes are made in this repository and deployed from source, never in a
production-only Content-Type Builder session.

Set permissions deliberately:

- Public role: no reads for these content types and no Upload access.
- `next-site-reader` API token: read-only access to the five single types,
  the `company-registration-page` collection, listed supporting collections,
  and Upload `find` only.
- Content Editor: create/read/update listed content and media, but no schema or
  delete access.
- Publisher/Admin: editor access plus publish.

The frontend receives only these server-side environment variables:

```bash
# frontend/.env.local
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<next-site-reader-token>
```

Never use a `NEXT_PUBLIC_*` prefix for the token. The Next app requests only
published documents with explicit population paths and uses its local fallback
when either value is absent.

## REST endpoints

Core routers/controllers/services are committed for every defined content type.
The frontend uses these published single-type endpoints:

```text
GET /api/site-setting?status=published
GET /api/home-page?status=published
GET /api/about-page?status=published
GET /api/careers-page?status=published
GET /api/contact-page?status=published
GET /api/company-registration-pages?filters[slug][$eq]=<slug>&status=published
```

Relations, media, and nested components are not populated by default. Keep the
centralized explicit populate trees in `frontend/lib/strapi.ts`; do not switch
them to `populate=deep`.

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

## Validation

```bash
cd cms
npm run build

cd ../frontend
npm run typecheck
npm run build
```

Before handing off a schema change, test an editor workflow: change a hero,
reorder a selected service/team member/job, replace media, save a draft, publish,
and confirm the matching page updates without a frontend code change.
