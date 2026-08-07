# JR Compliance rebuild — working context

## Purpose and scope

This repository is a staged rebuild of JR Compliance. The old Webflow export is
kept only as a **content and approved-media reference**. The new frontend is a
standalone, responsive Next.js application with a Strapi v5 content boundary.

The completed scope is the new home page plus the first shared-chrome editorial
routes: `/about-us`, `/careers`, and `/contact-us`. The remaining legacy routes
are still out of scope until their content models and destinations are
validated deliberately.

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
| `frontend/data/*-page-fallback.ts` | Design-stage, typed fallback content normalized from the matching legacy page. It keeps every completed route working before Strapi is deployed. |
| `frontend/lib/types.ts` | Shared shell and rendering contracts (`HomepageContent`, `AboutPageContent`, `CareersPageContent`, `ContactPageContent`). |
| `frontend/lib/strapi.ts` | Server-only Strapi v5 REST client, explicit route-specific populate paths, media URL handling, and schema-to-UI mappers. |
| `frontend/components/` | Reusable shell components; `site-page-shell.tsx` centralizes header/footer, `editorial/` centralizes the Compliance Network route primitives, and route folders compose their pages. |
| `frontend/app/globals.css` | Original responsive visual system and CSS-only motion, with reduced-motion support. |
| `frontend/public/images/` | Small selected copy of approved legacy logo/photo assets. `images/services/` preserves the 15 exact legacy service/flag SVGs; `images/services-blue/` holds their blue-theme derivatives used by the home fallback. Do not point new UI at `site/assets/`. |
| `cms/CONTENT_MODEL.md` | Definitive Strapi v5 model and editor onboarding. Read this before scaffolding the CMS. |
| `theme.md` | Required Compliance Network design system for the home page and all future routes. |

## What is built

- Modern, animated, mobile-responsive pages at `/`, `/about-us`, `/careers`,
  and `/contact-us`, all using the same Compliance Network theme.
- Persistent navy/cobalt header field with a floating cool-white navigation
  rail. Its top breathing room is retained while sticky; the desktop nav is
  grouped in an inset capsule and collapses at 980px.
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
  direct phone/email/location routes; a live enquiry form remains intentionally
  deferred until receiver, validation, consent handling, and spam protection
  are decided.

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
  contact copy, direct CTA, and the legacy future-form copy. Do not migrate its
  commented credential-like webhook.

## Strapi integration behavior

1. With no `STRAPI_URL`, the app renders the matching typed `*-page-fallback.ts`
   source.
2. With `STRAPI_URL` and a server-only `STRAPI_API_TOKEN`, the app requests the
   published `site-setting` plus the matching `home-page`, `about-page`,
   `careers-page`, or `contact-page` single type every 60 seconds.
3. `frontend/lib/strapi.ts` explicitly populates only the nested relations and
   media each route requires. Do not replace this with `populate=deep`.
4. The adapter maps the documented Strapi v5 fields to typed page contracts; it
   keeps fallback values for any unpublished or incomplete field so editors
   cannot blank the live site accidentally.
5. Strapi media URLs are converted to absolute CMS URLs. The current frontend
   uses standard image elements so local and CDN media both work without an
   image-domain configuration change.

Use `frontend/.env.example` as the environment template. The token name must
stay `STRAPI_API_TOKEN` (not `NEXT_PUBLIC_*` and not the old `STRAPI_TOKEN`).

## CMS next step

`cms/` is intentionally a blueprint rather than a generated Strapi project:
the requested phase is “frontend first.” When the CMS phase begins, create a
Strapi v5 TypeScript app **inside `cms/`**, then build the exact five single
types, components, collection types, roles, media policy, and seeding order in
`cms/CONTENT_MODEL.md`. Do not change the Next content model casually; update
the mapper and fallback types together if a CMS field changes.

## Local commands

```bash
cd frontend
npm install
npm run dev
npm run typecheck
npm run build
```

The npm dev/start scripts use port **8123** to avoid the existing service on
port 3000.

`npm run typecheck` and `npm run build` both passed after the initial build.
The project is currently on Next.js 16.3.0; it was selected after resolving the
security advisories detected during installation (`npm install` reports zero
known vulnerabilities).

Next.js generates `frontend/AGENTS.md` during `next dev`. If that file exists,
read the relevant guide under `frontend/node_modules/next/dist/docs/` before
making future Next.js code changes, because the installed major version has
breaking changes.

## Safe next tasks

1. Scaffold and seed the Strapi app from `cms/CONTENT_MODEL.md`, then verify a
   real CMS publish flows through `frontend/lib/strapi.ts`.
2. Implement individual service/detail pages one at a time, using the CMS
   service model and validated URL slugs.
3. Add real enquiry and job-application integrations only after the target receiver,
   validation, consent copy, and spam protection are explicitly decided.
4. Add deploy configuration and Strapi publish webhooks to revalidate the
   `jr-homepage`, `jr-about-page`, `jr-careers-page`, `jr-contact-page`, and
   `jr-site-settings` cache tags after publishing.
