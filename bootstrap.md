# Bootstrap instructions

Read this file before making changes in this repository.

## First steps

1. Read `context.md`.
2. Read `theme.md`.
3. If working on frontend, read `explaner_frontend.md`.
4. If working on CMS, read `explainer_cms.md`.
5. If changing production/deployment behavior, read `prod.md`.

## Main rule

Do not change everything. Do not redesign the whole project. Do not change the folder structure unless I clearly ask for it.

Make only the smallest safe change needed for the request.

## Project boundaries

- `frontend/` is the active Next.js app.
- `cms/` is the active Strapi CMS.
- `site/` is a legacy Webflow export and must be treated as read-only.
- Use `site/` only for approved content/media reference.
- Do not import Webflow CSS, JavaScript, classes, or `data-wf-*` markup into the new frontend.

## Frontend rules

- Keep the existing Next.js App Router structure.
- Keep shared layout in `components/site-page-shell.tsx`.
- Keep shared navbar in `components/site-header.tsx`.
- Keep shared footer in `components/site-footer.tsx`.
- Keep page content loading through `lib/content.ts` and `lib/strapi.ts`.
- Keep TypeScript contracts in `lib/types.ts`.
- Keep fallback content in `data/*-fallback.ts`.
- Keep repeated Company Registration routes in `app/corporate/[slug]` with one
  shared Tailwind page component and the fixed typed fallback contract.
- Match the Compliance Network theme from `theme.md`.
- Do not create a new color palette.
- Do not hard-code editor-managed copy in components if it belongs in Strapi/fallback data.

## CMS rules

- Strapi is connected and must be respected.
- Do not expose `STRAPI_API_TOKEN` to the browser.
- Do not rename `STRAPI_API_TOKEN`.
- Do not use `NEXT_PUBLIC_*` for CMS secrets.
- Keep Strapi REST population explicit in `frontend/lib/strapi.ts`.
- Do not replace explicit populate paths with `populate=deep`.
- Keep editable content, links, order, SEO, and media in Strapi/fallback data.
- Use the dedicated `company-registration-page` collection for those service
  routes; do not turn it into a generic page builder or dynamic zone.
- If a CMS schema changes, update all related files together:
  - `cms/CONTENT_MODEL.md`
  - CMS schema files
  - `frontend/lib/types.ts`
  - `frontend/lib/strapi.ts`
  - relevant `frontend/data/*-fallback.ts`

## Styling rules

- Follow `theme.md`.
- Use navy, cobalt, electric blue, sky blue, ice blue, and cool white.
- Do not introduce random accent colors.
- Use Tailwind utilities first for layout, spacing, typography, sizing, responsive states, borders, and palette use.
- Keep `frontend/app/globals.css` limited to Tailwind theme tokens, resets, shared primitives, anchor offsets, and reduced-motion behavior.
- Keep only design-specific CSS that Tailwind cannot express clearly (layered blueprint artwork, pseudo-elements, and keyframes) in the stylesheet colocated with its owner. Do not add page-specific selectors back to `globals.css`.
- Keep responsive behavior for desktop, tablet, and mobile.
- Preserve accessibility: focus states, keyboard behavior, readable contrast, and reduced-motion support.

## Change safety

- Do not refactor unrelated files.
- Do not remove existing user changes.
- Do not run destructive Git commands.
- Do not edit generated folders like `node_modules/`, `.next/`, `.tmp/`, `dist/`, or `build/`.
- Do not commit secrets, local databases, uploads, or `.env` files.

## Validation

After frontend changes, run:

```bash
cd frontend
npm run typecheck
npm run build
```

After CMS changes, run:

```bash
cd cms
npm run build
```

If a command cannot be run, clearly explain why.

## How to respond to my prompts

- First understand the existing structure.
- Then make the requested change.
- Keep the work scoped.
- Tell me what files changed.
- Tell me what validation passed or failed.

## Prompt:-

Read bootstrap.md, context.md, theme.md, explaner_frontend.md, explainer_cms.md, and the service-category.md.

Build a new CMS-only Global system without changing, refactoring, or renaming the completed Corporate and Approval routes, schemas, components, fallbacks, or content.
Use /globals consistently for both page types:
- /globals/[country]
- /globals/[country]/[slug]
Create two dedicated Strapi collections:
1. global-country-page
2. global-certificate-page
Content managers must be able to create and publish every Global page directly through Strapi Content Manager.
Shared frontend UI
Build two complete, responsive shared templates:
- GlobalCountryPage renders the country hero image, title, description, CTA, and multiple certificate cards containing a logo, title, description, and link.
- GlobalCertificatePage renders the certificate hero, overview, products/documents/requirements, certification process, JR Compliance’s role, conclusion, and closing CTA.
Follow the theme.md and build a better design.
“CMS-only” means no hard-coded page content, fallback, seed, initial CMS record, or individual component for every page. It does not mean no frontend UI. These two shared templates must render all published CMS records using the Compliance Network theme.
Use these files only as structural references:
- site/global-approvals/china.html for the country-page structure.
- site/china-cel-certification.html for the certificate-page structure.
Treat site/ as read-only. Do not copy legacy markup, CSS, scripts, forms, classes, or remote asset URLs.
Create only two dynamic Next.js route files. A published record should render automatically based on its country and certificate slugs. Draft, incomplete, unknown, or unpublished records must return 404.
Add strict TypeScript contracts, server-only Strapi loaders, explicit populate paths, cache tags, signed revalidation, metadata, and sitemap discovery. Never use populate=deep or expose STRAPI_API_TOKEN to the browser.
