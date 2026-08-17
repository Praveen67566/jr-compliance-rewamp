# JR Compliance rebuild — working context

## Purpose and scope

This repository is a staged rebuild of JR Compliance. The old Webflow export is
kept only as a **content and approved-media reference**. The new frontend is a
standalone, responsive Next.js application with a Strapi v5 content boundary.

The completed scope is the new home page, the shared-chrome editorial routes
(`/about-us`, `/careers`, `/contact-us`), and the first nineteen Company
Registration detail routes plus the DSC MCA Services route under
`/corporate/[slug]`. Other legacy routes stay
out of scope until their content models and destinations are validated.

## Non-negotiable rules

1. Treat `site/` as read-only. Do not edit, delete, import Webflow CSS/JS, or
   copy `data-wf-*` markup from it.
2. Reuse legacy **content** and approved local media only; create original UI,
   layout, motion, and components. The visual direction is not a Webflow port
   and is not a clone of BimaKavach.
3. Strapi is the intended editor-facing source of truth. Keep rendering,
   animation, and styling in Next.js; keep editable copy, links, order, and
   media in Strapi.
4. Never expose the Strapi API token to the browser. Use only the server-side
   `STRAPI_API_TOKEN` environment variable.
5. Do not make unrelated refactors or modify legacy pages while adding the next
   route. Extend the typed content model and the CMS contract deliberately.
6. `theme.md` is the visual contract for every new route. The Service Stack is
   the canonical compliance-network reference; do not introduce a competing
   colour palette or motion language.

## Repository map

| Path | Role |
| --- | --- |
| `site/` | 354-page legacy Webflow archive; matching legacy HTML files are content-only sources for the completed routes. |
| `frontend/` | New Next.js 16 App Router application. This is the active frontend. |
| `frontend/data/*-page-fallback.ts`, `frontend/data/company-registration-pages-fallback.ts`, `frontend/data/mca-service-pages-fallback.ts` | Typed fallback content normalized from matching legacy pages. It keeps every completed route working before Strapi is deployed. |
| `frontend/lib/types.ts` | Shared shell and rendering contracts, including fixed Company Registration and MCA Services service-detail contracts. |
| `frontend/lib/strapi.ts` | Server-only Strapi v5 REST client, explicit route-specific populate paths, media URL handling, and schema-to-UI mappers. |
| `frontend/components/` | Reusable shell components; `site-page-shell.tsx` centralizes header/footer, `editorial/` centralizes the Compliance Network route primitives, and route folders compose their pages. |
| `frontend/app/globals.css` | Tailwind v4 theme tokens, baseline reset, shared utility primitives, anchor offsets, and reduced-motion support only. |
| `frontend/app/animations.css` | Shared CSS-only keyframes for the Compliance Network ambient motion. |
| `frontend/app/responsive.css` | Responsive parity rules for the existing component visuals; keep route-specific rules out of `globals.css`. |
| `frontend/components/site-header.css`, `site-footer.css`, `home/home.css`, `editorial/editorial.css` | Component-owned Compliance Network artwork, card treatments, pseudo-elements, and layout details. They preserve the current visual output while keeping the stylesheet surface close to its owner. |
| `frontend/postcss.config.mjs` | Tailwind v4 PostCSS integration. |
| `frontend/public/images/` | Small selected copy of approved legacy logo/photo assets. `images/services/` preserves the 15 exact legacy service/flag SVGs; `images/services-blue/` holds their blue-theme derivatives used by the home fallback. Do not point new UI at `site/assets/`. |
| `cms/` | Active Strapi v5 TypeScript project: schemas, core REST APIs, CMS-to-Next revalidation, editor setup, and PostgreSQL configuration for local and deployed environments. |
| `cms/CONTENT_MODEL.md` | Definitive editorial contract: five single types, sixteen collections, and forty-six components. Change it deliberately alongside the schemas and Next mapper. |
| `cms/README.md` | CMS local PostgreSQL workflow, editor permissions, REST contract, transfer policy, and revalidation behavior. |
| `ecosystem.config.js` | PM2 process definition for the 24/7 Linux/VPS deployment: one frontend and one CMS process, bound to loopback-only private ports with no secrets in source. |
| `prod.md` | Required production deployment and launch runbook for the frontend, CMS, PM2, Nginx/TLS, database, media, migration, secrets, and cache invalidation. |
| `theme.md` | Required Compliance Network design system for the home page and all future routes. |

## What is built

- Modern, animated, mobile-responsive pages at `/`, `/about-us`, `/careers`,
  and `/contact-us`, all using the same Compliance Network theme.
- Persistent navy/cobalt header field with a floating cool-white navigation
  rail. Its top breathing room is retained while sticky; the desktop nav is
  grouped in an inset capsule and collapses at 980px. Corporate, Approval, and
  Global open a bounded two-pane mega menu: a navy category rail and an ice
  three-column link panel populated by Strapi, with the typed home fallback
  covering offline and pre-migration CMS records.
- Shared footer continues the same navy/cobalt network field through a
  structured blue-glass content panel, subtle grid/orbit detail, and responsive
  service/legal groups.
- Hero word rotation, photo/card composition, client-logo marquee, service tabs,
  contact ticker, trust/metrics, testimonials, recognition cards, FAQ tabs and
  accordions, closing CTA, and comprehensive footer.
- The Service Stack is a navy/cobalt compliance-network panel. Its 15 fallback
  service SVGs are blue-theme derivatives of the approved legacy geometry;
  the unmodified copies remain in `images/services/`. Global cards use the
  country artwork with CSS-only float/signal motion. Strapi `service.icon`
  overrides the fallback files when published, and a missing CMS icon falls
  back to the matching local blue asset.
- The high-contrast navy client-logo band deliberately preserves the original
  white brand SVGs. It includes all ten legacy client logos and pauses its
  marquee on hover.
- Every home-page surface now uses the Compliance Network palette: navy,
  cobalt, electric blue, sky blue, and ice-blue reading surfaces only.
- `prefers-reduced-motion` disables decorative animation.
- Tailwind v4 is the frontend utility layer. Shared containers, section rhythm, eyebrows, reset, fonts, and responsive spacing use Tailwind; complex bluefield art, pseudo-elements, and keyframes stay in small owner-oriented stylesheets so visual parity is retained without a monolithic global file.
- Content in the fallback was normalized for encoding issues from the legacy
  export (for example curly quotes and em dashes).
- The old post-footer duplicate BIS FAQ was deliberately excluded as a legacy
  artifact.
- About Us uses the visible legacy hero, proof stats, mantra, timeline,
  partnership reasons, pioneers, JRians, achievements, and closing CTA.
- Careers uses the legacy vision/mission, values, culture gallery, five current
  openings, benefits, employee stories, and career FAQs. Job-application
  transport is intentionally not implemented until its security workflow is
  approved.
- Contact Us uses the legacy contact methods and Bawana address. It offers
  direct phone/email/location routes plus the centralized, server-validated
  consultation form shared by every current hero template.
- Nineteen Company Registration pages use one dynamic App Router route and one
  fixed Tailwind template. Their approved legacy hero, overview, challenges,
  advantages, process, breakdown, and FAQ content lives in a typed fallback and
  the matching Strapi collection. Repeated private-company blocks, hidden
  placeholder tabs/processes, Webflow forms, and copied resource sections were
  deliberately excluded.
- The first MCA Services page, `/corporate/dsc-certificate`, uses the same
  fixed Tailwind template with its own dedicated `mca-service-page` CMS
  collection, typed fallback, migration record, cache tag, and legacy DSC
  content.
  The other MCA links remain intentionally out of scope until their routes and
  fixed content records are approved.
- The Strapi v5 CMS is implemented in `cms/`: five single types (`site-setting`,
  `home-page`, `about-page`, `careers-page`, `contact-page`), sixteen
  collections, forty-six components, and core REST route/controller/service
  files for all twenty-one types. All editorial content uses Draft & Publish;
  i18n is intentionally off.
- Every active page and shared header/footer has a typed CMS mapping. CMS
  controls copy, links/targets, order, SEO, imagery/alt text, shared navigation,
  footer groups, legal notices, and optional home insights. Next.js continues to
  own layout, interaction, animation, and the visual theme.
- Local CMS content now lives in an isolated PostgreSQL database. It was
  transferred with content/files parity from the original SQLite source; the
  retained `cms/.tmp/data.db` file is an offline rollback source only and must
  never be selected as the running database. All `SEED_*` flags remain false.
  Use a reviewed encrypted Strapi content/files export and import when another
  PostgreSQL target needs the same content and media.
- The frontend emits an app icon, `robots.txt`, and a sitemap for all twenty-four
  active routes. It uses `SITE_URL` for the production origin and has baseline
  response hardening headers; the host still needs TLS-edge HSTS, rate limiting,
  and a tested CSP for the selected CMS/media origin.
- `frontend` production start honors a host-provided `PORT` and otherwise uses
  `8123`, preserving the local port convention.
- `ecosystem.config.js` is the production PM2 entry point for a single VPS. It
  starts the frontend on `127.0.0.1:8123` and the CMS on
  `127.0.0.1:1337` as single forked processes; Nginx proxies public HTTPS
  traffic to those private ports. CMS publish notifications call the frontend
  directly over loopback rather than exposing the revalidation endpoint.

## Content source already mapped from `site/index.html`

- Header: Corporate, Approval, Global, Careers, About Us, Contact Us.
- Hero: “Bridging [Businesses / Companies / Manufacturers / Brands] to
  Worldwide Standards”, original trust paragraph and CTAs.
- Services: Technical, Corporate, Global tabs and their five legacy entries.
- Why JR narrative, three stated highlights, stats, four testimonials, three
  media recognitions, Registration/Compliance/Tax & Audits FAQ sets, final CTA,
  phone/email/social/legal/footer links.

Do not copy any placeholder or mis-linked legacy navigation routes without
first validating the destination. The shared header now routes Careers, About
Us, and Contact Us to their completed pages; service links intentionally point
to `/#services` until validated detail pages are migrated.

## Editorial route content sources

- `site/about-us.html`: About hero, 13+/100+/4.8 proof cards, five mantra
  pillars, six timeline events, four partnership reasons, pioneers, 14 team
  members, five achievements, and final CTA.
- `site/careers.html`: Careers hero, vision/mission, values, culture gallery,
  five openings, benefits, six employee testimonials, four FAQs, and final CTA.
- `site/contact-us.html`: Contact hero, phone/email/Bawana office details,
  contact copy, and direct CTA. The new form is an original centralized Next.js
  implementation; do not migrate the legacy commented credential-like webhook.
- The nineteen approved files under `site/corporate/` matching the Company
  Registration navbar slugs: service hero/overview, four challenges, four
  advantages, six process steps, eligibility/documents/audience breakdown, and
  FAQs. These files are content-only sources; shared Webflow template artifacts
  and unverified duplicate sections are not migrated.
- `site/corporate/dsc-certificate.html`: first approved MCA Services source for
  DSC SEO, hero, overview, challenges, advantages, process, Why JR, breakdown,
  FAQ, and closing CTA. The copied Private Limited Company blocks, hidden
  placeholders, Webflow form, and legacy UI/transport are excluded.

## Strapi integration behavior

1. With no `STRAPI_URL`, the app renders the matching typed `*-page-fallback.ts`
   source.
2. With `STRAPI_URL` and a server-only `STRAPI_API_TOKEN`, the app requests the
   published `site-setting` plus the matching `home-page`, `about-page`,
   `careers-page`, or `contact-page` single type, or filters the published
   `company-registration-pages` or `mca-service-pages` collection by exact
   slug, every 60 seconds.
3. `frontend/lib/strapi.ts` explicitly populates only the nested relations and
   media each route requires. Do not replace this with `populate=deep`.
4. The adapter maps the documented Strapi v5 fields to typed page contracts; it
   keeps fallback values for any unpublished or incomplete field so editors
   cannot blank the live site accidentally. CMS-only MCA Services records are
   instead strictly validated and return a 404 when a required fixed field is
   missing, so they never borrow DSC copy.
5. Strapi media URLs are converted to absolute CMS URLs. The current frontend
   uses standard image elements so local and CDN media both work without an
   image-domain configuration change.

Use `frontend/.env.example` as the environment template. The token name must
stay `STRAPI_API_TOKEN` (not `NEXT_PUBLIC_*` and not the old `STRAPI_TOKEN`).

## CMS implementation and deployment status

The CMS is implemented, not a blueprint. The local PostgreSQL migration has
verified exact parity with the preserved SQLite source: 132 logical documents,
2,908 component instances, 220 ordered relations, 78 media records, and 149
referenced upload payloads. Strapi starts against PostgreSQL, anonymous reads
are denied, and the CMS admin/media endpoints respond locally. The original
frontend API token was deliberately not transferred because Strapi exports do
not include API tokens; create a local read-only token before authenticated
frontend runtime checks. Frontend fallback-mode rendering, typed validation,
and production builds have passed.

The deployed integration still requires durable object/media storage,
production secrets, a production read-only frontend token, and an explicitly
authorized, backed-up content import. `cms/config/plugins.ts` currently has
only the local upload provider, so do not run it on ephemeral production
storage.

At the latest audit, frontend production dependencies have zero known
vulnerabilities. The CMS dependency tree has 29 findings, including three
high-severity findings in the current Strapi upload/admin chain. The latest
checked Strapi release is also `5.51.2` and pins the affected upload dependency,
so wait for vendor remediation or obtain formal security risk acceptance; do
not override it or apply `npm audit fix --force` blindly.

The intended CMS source/config is tracked by Git. Keep `.env`, `.tmp/`,
`public/uploads/`, generated builds, and `.strapi/` ignored before any
Git-based deployment. The full ordered deployment and rollback procedure is in
`prod.md`.

For a 24/7 self-hosted Linux server, deploy through the committed PM2 ecosystem
file rather than leaving `npm run start` attached to a terminal. Run PM2 as the
non-root deploy user, use `pm2 startup` plus `pm2 save` for reboot persistence,
and keep the frontend at one instance until its cache can be shared safely.
Store ignored production environment files before builds, bind application ports
only to loopback, and build each update in a new release checkout rather than
changing dependencies beneath a running process.

## Local commands

```bash
cd frontend
npm ci
npm run dev
npm run typecheck
npm run build

cd ../cms
npm ci
npx tsc --noEmit
npm run build
```

The frontend dev script uses port **8123** to avoid the existing service on
port 3000. Its production start script uses `$PORT` when the host provides it,
then falls back to `8123` locally.

Validation on 2026-08-07 passed: frontend clean install, typecheck, production
build, page/asset/link/fragment smoke checks, metadata routes, security-header
checks, signed webhook checks, and CMS-to-frontend end-to-end checks; CMS clean
install, TypeScript check, production build, schema validation, and API runtime
smoke. The subsequent PostgreSQL migration verified exact content/media parity.
The remaining deployment gates are intentionally documented above and in
`prod.md`.

Next.js generates `frontend/AGENTS.md` during `next dev`. If that file exists,
read the relevant guide under `frontend/node_modules/next/dist/docs/` before
making future Next.js code changes, because the installed major version has
breaking changes.

## Safe next tasks

1. Monitor for a Strapi release that remediates the current production audit
   findings, test it in staging, and rerun the complete validation suite (or
   obtain a formal security risk acceptance before any launch).
2. Choose/configure durable CMS media storage, keep PostgreSQL as the only CMS
   runtime database, rehearse encrypted content/media migration on staging,
   and follow `prod.md`.
3. Continue with the next approved service category using a dedicated fixed
   content contract and validated URL slugs; do not widen the Company
   Registration model into a generic page builder.
4. Add real enquiry and job-application integrations only after the target
   receiver, validation, consent copy, and spam protection are explicitly
   decided.
