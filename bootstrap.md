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

Read the # Service category and first-page creation guide

now we have to create Import Export Service categories pages and it follows the exact same pattern design everything like Company Registration and only create the first page else all the pages going to be added by
strapi cms so also make sure that that get the complete content from file:///Users/yalagalasrinivas/praveen-dev/jr-compliance-rewamp/site/corporate/iec-registration.html and you have to create first page name IEC Code add this and copy content from file:///Users/yalagalasrinivas/praveen-dev/jr-compliance-rewamp/site/corporate/iec-registration.html and follow the exact struture of project dont change anything unnecessary.

now after that in same flow Government License & Certification category create its first page Ayush License
only first page and every other pages are going to be created by strapi cms and get the page content from
file:///Users/yalagalasrinivas/praveen-dev/jr-compliance-rewamp/site/corporate/ayush-license.html now
same don't change the struture and 
after all this create both pages seed into postgres and test everything.

we have to create IPR Services category and its first page TRADEMARK REGISTRATION only and all the other pages is going to be created by strapi cms and follows the exact same pattern design everything like 
Company Registration category and its pages  and get the content from file:///Users/yalagalasrinivas/Downloads/Webflowwebsite%20%7C%20JR%20Compliance%20/site/corporate/trademark-registration.html and take only content from here and follow the Company Registration design and exact pattern and follow the 
existing jr-compliance-rewamp structure exactly don't change anything unneccessary and after that in same 
flow create FSSAI category and its first page Fssai Basic Registration and get the content from 
file:///Users/yalagalasrinivas/Downloads/Webflowwebsite%20%7C%20JR%20Compliance%20/site/approval/wpc-certification.html this and follow the exact same design pattern as Company Registration category pages
then SEBI Business Registration category and its first page PORTFOLIO MANAGER REGISTRATION get the content 
from file:///Users/yalagalasrinivas/Downloads/Webflowwebsite%20%7C%20JR%20Compliance%20/site/corporate/portfolio-manager-registration.html.

follow the already exist consistent page design you can check Company Registration pages 
don't change anything unneccessary 
add the seed data in postgres database also 
test the code
