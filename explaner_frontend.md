# Frontend explainer

This file explains what each important file in `frontend/` does. The frontend is the active Next.js 16 App Router app for JR Compliance. The old `site/` folder is only a content/media reference; the real UI lives here.

## Big picture

The frontend renders the shared routes plus nineteen Company Registration
detail routes and the first detail route for each of MCA Services, Import
Export Service, Government License & Certification, IPR Services, FSSAI, and
SEBI Business Registration, Tax and Accounting, Labour Compliance, and Fund
Raising, plus the first Bureau of Indian Standards and Pollution Advisory
routes, and the three completed fixed legal routes:

- `/`
- `/about-us`
- `/careers`
- `/contact-us`
- `/privacy-policy`
- `/terms-and-conditions`
- `/purchase-and-billing`
- `/corporate/[slug]` for the nineteen approved Company Registration slugs,
  DSC, IEC Code, Ayush License, Trademark Registration, FSSAI Basic
  Registration, Portfolio Manager Registration, GST Registration, Shop &
  Establishment Registration, and MSME Registration
- `/approval/[...slug]` for ISI Certification, EPR Certification, and later
  complete CMS-only records across all nine Approval families: Bureau of Indian
  Standards, Pollution Advisory, Telecommunication Engineering Centre,
  Wireless Planning and Coordination, Bureau of Energy Efficiency, CDSCO
  Registration, AERB Approval, LMPC Certification, and STQC
- `/globals/[country]` for complete published CMS-only Global country landings
- `/globals/[country]/[slug]` for complete published CMS-only Global
  certificate pages

The three legal routes are fixed sitemap entries, so the current sitemap
contains thirty-seven active routes. The seven new Approval integrations add
no local pages, and the two empty Global collections also add no active or
local route. Additional Approval and Global URLs appear in the sitemap only
after complete records are published in Strapi.

Content comes from Strapi when `STRAPI_URL` and `STRAPI_API_TOKEN` are configured.
Implemented routes fall back to typed local content in
`frontend/data/*-fallback.ts` when Strapi is unavailable or incomplete. The
three legal routes use a restricted semantic Blocks fallback mirrored in the
CMS migration JSON. The seven empty CMS-only Approval families have no fallback
or first page, so their routes exist only after an editor publishes a complete
Strapi record.
The Global route families are also strictly CMS-only: they have no local
fallback, seed content, sample record, or default page and therefore return 404
when Strapi is unavailable or a matching complete published record is absent.

The main flow is:

1. `app/*/page.tsx` asks `lib/content.ts` for page data.
2. `lib/content.ts` calls `lib/strapi.ts`.
3. `lib/strapi.ts` maps Strapi records into types from `lib/types.ts`.
4. If Strapi is missing or fails, local fallback data is used when available;
   CMS-only pages without a fallback return 404.
5. Page components render inside `components/site-page-shell.tsx`, which adds the shared header and footer.

## Root files

`frontend/package.json`
: Defines the frontend package, dependencies, and scripts. It includes Tailwind CSS v4, its PostCSS adapter, and `tsx` for the built-in Node test runner. Important scripts are `npm run dev`, `npm run test`, `npm run typecheck`, `npm run build`, and `npm run start`.

`frontend/package-lock.json`
: Locks exact installed npm dependency versions.

`frontend/next.config.ts`
: Next.js configuration, including production headers and app behavior.

`frontend/tsconfig.json`
: TypeScript configuration.

`frontend/next-env.d.ts`
: Next.js generated TypeScript declarations. Do not manually edit unless you know why.

`frontend/tsconfig.tsbuildinfo`
: TypeScript incremental build cache. Generated file.

`frontend/.env.example`
: Safe environment variable template. Shows names like `STRAPI_URL`, `STRAPI_API_TOKEN`, `SITE_URL`, `STRAPI_REVALIDATE_SECRET`, and the server-only `LEAD_WEBHOOK_BASE_URL`.

`frontend/.env.local`
: Local machine environment values. This can contain secrets and should not be committed.

`frontend/.gitignore`
: Ignore rules for local env files, builds, dependencies, and generated output.

`frontend/README.md`
: Frontend-specific setup notes, content architecture, and CMS revalidation notes.

`frontend/AGENTS.md`
: Auto-generated Next.js/Codex guidance. It warns that this installed Next version may have breaking behavior and points agents to local Next docs before code changes.

`frontend/CLAUDE.md`
: Local assistant guidance for another coding assistant, if used.

## App router

`frontend/app/layout.tsx`
: Root layout for the whole app. Loads global CSS and wraps every route.

`frontend/app/globals.css`
: The intentionally small global stylesheet. It imports Tailwind v4, defines the approved Compliance Network tokens, applies baseline/reset rules, and owns only shared primitives (`section`, `eyebrow`), anchor offsets, and reduced-motion behavior. Do not add page or component styling here.

`frontend/app/animations.css`
: Shared keyframes for the existing CSS-only ambient motion. The reduced-motion override remains in `globals.css` so it applies everywhere.

`frontend/app/responsive.css`
: Existing responsive parity rules that span several components. Keep a new responsive rule with its component whenever it does not need to participate in this shared cascade.

`frontend/postcss.config.mjs`
: Enables Tailwind v4 through the official PostCSS adapter.

`frontend/app/page.tsx`
: Home page route. Loads home content and renders the home page component.

`frontend/app/about-us/page.tsx`
: About Us route. Loads About content, metadata, and renders the About page.

`frontend/app/careers/page.tsx`
: Careers route. Loads Careers content, metadata, and renders the Careers page.

`frontend/app/contact-us/page.tsx`
: Contact Us route. Loads Contact content, metadata, and renders the Contact page.

`frontend/app/privacy-policy/page.tsx`
: Static Privacy Policy route. Loads the fixed legal record, generates metadata
  through `pageMetadata`, renders the shared legal template, and revalidates
  every 60 seconds.

`frontend/app/terms-and-conditions/page.tsx`
: Static Terms and Conditions route. Uses the same typed legal loader,
  metadata helper, legal renderer, and 60-second route revalidation.

`frontend/app/purchase-and-billing/page.tsx`
: Static Purchase and Billing route. Uses the same fixed collection contract
  and shared renderer without adding a root-level dynamic catch-all.

`frontend/app/corporate/[slug]/page.tsx`
: Shared dynamic route for the nineteen Company Registration pages plus DSC,
  IEC Code, Ayush License, Trademark Registration, FSSAI Basic Registration,
  Portfolio Manager Registration, GST Registration, Shop & Establishment
  Registration, and MSME Registration. It awaits Next.js 16 route params,
  discovers published CMS-only slugs, generates static params and metadata,
  and returns the framework 404 for an unknown or incomplete slug.

`frontend/app/approval/[...slug]/page.tsx`
: Shared catch-all route for all nine Approval collections. It renders the
  fallback-backed ISI Certification and EPR Certification pages and discovers
  complete flat or nested CMS-only paths from every Approval family. It
  generates static params and metadata and returns the framework 404 for an
  unknown or incomplete path.

`frontend/app/globals/[country]/page.tsx`
: Shared country landing route. It awaits the dynamic country parameter,
  discovers published `global-country-page` slugs for static generation and
  the sitemap, generates record-owned metadata, and returns the framework 404
  for a draft, unpublished, incomplete, unknown, or unavailable CMS record. It
  uses async params, `revalidate = 60`, `dynamicParams = true`, and
  `pageMetadata`.

`frontend/app/globals/[country]/[slug]/page.tsx`
: Shared certificate route. It resolves a published
  `global-certificate-page` by the exact `countrySlug` and `slug`, discovers
  published country/certificate paths, generates record-owned metadata, and
  returns the framework 404 for any incomplete or non-matching record. It also
  uses async params, `revalidate = 60`, `dynamicParams = true`, and
  `pageMetadata`.

`frontend/app/icon.tsx`
: Generates the app icon/fav icon through Next.

`frontend/app/robots.ts`
: Generates `robots.txt`.

`frontend/app/sitemap.ts`
: Generates `sitemap.xml` for the thirty-seven fixed active routes, including
  all three `legalPageSlugs`. Complete published Global country and certificate
  paths are discovered from Strapi; empty Global collections add no URL.

`frontend/app/api/revalidate/route.ts`
: Secure Strapi webhook endpoint. It verifies an HMAC signature from Strapi and revalidates the matching Next cache tags after publish/unpublish/delete events,
  including `jr-legal-pages`, `jr-global-country-pages`, and
  `jr-global-certificate-pages`. Only allow-listed tags are accepted, and
  webhook invalidation complements the normal 60-second fetch revalidation.

`frontend/app/api/leads/route.ts`
: Same-origin consultation endpoint. It validates and normalizes the required
  fields, checks consent/honeypot/origin, applies the single-instance rate
  limit, derives the legacy lead type from the page path, and makes one
  server-side downstream request with an exact allow-listed payload.

`frontend/app/thank-you/page.tsx`
: Branded, noindex confirmation route used only after the downstream webhook
  returns a successful 2xx response. It is intentionally absent from sitemap.

## Shared components

`frontend/components/site-page-shell.tsx`
: Shared page wrapper. Adds `SiteHeader`, page content, and `SiteFooter`.

`frontend/components/site-header.tsx`
: Shared navbar/header. It renders the JR logo, desktop navigation, a two-pane category/link mega menu, contact CTA, and mobile navigation. Layout and responsive styling use Tailwind utilities; it consumes CMS/fallback navigation data.
  Global country links remain editor-managed through the existing
  `site-setting.headerMenu` Global category. Publishing a Global page does not
  add it to the navbar automatically.

`frontend/components/site-header.css`
: Header-only bluefield, navigation rail, popover, and mobile-menu artwork. It is imported once by the root layout to preserve the established cascade.

`frontend/components/site-footer.tsx`
: Shared footer. Renders logo, contact details, social links, link groups,
  popular services, legal links, and disclaimers from CMS/fallback data. Its
  three legal links now resolve to the completed local legal routes.

`frontend/components/site-footer.css`
: Footer-only network field, glass panel, and legal-area styling.

`frontend/components/forms/consultation-form.tsx`
: The one reusable consultation form. It owns field state, accessible feedback,
  required-message validation, UTM capture, consent, honeypot, loading state,
  same-origin submission, and redirect. Form copy/trust content comes from the
  global typed Site Setting contract.

`frontend/components/forms/consultation-form-trigger.tsx`
: Small anchor helper for a CTA-only surface that should navigate to the shared
  form instead of duplicating form markup.

## Home components

`frontend/components/home/home-page.tsx`
: Composes the full home page: hero, logo band, service stack, why JR, regulators, metrics, ticker CTA, testimonials, recognitions, FAQ, insights, and closing CTA.

`frontend/components/home/hero.tsx`
: Home hero section. Handles the main headline, rotating words, CTA, and the
  centralized form. The previous team image/supporting-card artwork remains the
  fallback when the CMS disables the form.

`frontend/components/home/home.css`
: Home-only visual details, including the hero, service stack, bands, cards, FAQ, and closing CTA. Use Tailwind utilities in the TSX for ordinary layout/spacing; retain this file for complex layered art, pseudo-elements, and animation hooks.

`frontend/components/home/service-stack.tsx`
: Main service tabs/cards section. Uses service category data and service icon fallbacks.

`frontend/components/home/faq.tsx`
: Home FAQ tabs and accordion behavior.

## Editorial components

`frontend/components/editorial/route-hero.tsx`
: Shared hero primitive for editorial routes like About, Careers, and Contact.

`frontend/components/editorial/route-closing-cta.tsx`
: Shared final CTA section for editorial routes.

`frontend/components/editorial/editorial.css`
: Shared About, Careers, and Contact visual details, including their route hero and closing CTA. Route-specific bluefield/ice-surface treatments are kept here instead of in the global stylesheet.

## Route page components

`frontend/components/about/about-page.tsx`
: Renders the About Us page sections: hero, proof stats, mantra, timeline, partnership reasons, pioneers, team, achievements, and CTA.

`frontend/components/careers/careers-page.tsx`
: Renders the Careers page sections: hero, vision/mission, values, culture gallery, openings, benefits, employee stories, FAQ, and CTA.

`frontend/components/contact/contact-page.tsx`
: Renders the Contact page sections: hero, contact methods, office/address content, and CTA.

`frontend/components/legal/legal-page.tsx`
: One responsive, Tailwind-first renderer for all three legal routes. It wraps
  the page in `SitePageShell`, renders a bluefield hero and ice reading surface,
  derives unique section anchors and an accessible sticky navigation list, and
  preserves semantic paragraphs, H2-H4 headings, ordered/unordered lists,
  inline formatting, and allow-listed links. It never injects legacy HTML.

`frontend/components/company-registration/company-registration-page.tsx`
: One fixed Tailwind-first service template for every Company Registration
  route and every fixed category detail route. It renders the bluefield hero, overview,
  challenges, advantages, process, Why JR, service breakdown, native-details
  FAQ, and shared closing CTA without page-specific CSS or legacy markup.

`frontend/components/global/global-country-page.tsx`
: Dedicated responsive country-landing template. It renders the CMS-owned hero
  image, title, description and CTA, followed by the ordered certificate cards
  with required logos, descriptions, and links, then the shared closing CTA.
  Certificate links are managed on these country cards and should use the exact
  `/globals/<country>/<certificate>` destination.

`frontend/components/global/global-certificate-page.tsx`
: Dedicated responsive certificate template. It renders the fixed
  certificate-specific sequence: hero, overview paragraphs, neutral scope
  items, ordered process, JR Compliance role, conclusion, and closing CTA. Both
  Global templates use the Compliance Network theme and shared site shell; they
  are separate from the completed Corporate/Approval template. The certificate
  hero renders the centralized `ConsultationForm` only when
  `site.leadForm.enabled` is true.

## Data fallbacks

`frontend/data/homepage-fallback.ts`
: Typed local fallback for the home page and shared chrome. Its navbar includes
  nested categories and links for Corporate, Approval, and Global so the menu
  remains complete while Strapi is unavailable or an older CMS record is
  awaiting migration. Its footer legal links point to the three completed
  routes, and its consultation privacy link points to `/privacy-policy`.

`frontend/data/about-page-fallback.ts`
: Typed local fallback for About Us content.

`frontend/data/careers-page-fallback.ts`
: Typed local fallback for Careers content.

`frontend/data/contact-page-fallback.ts`
: Typed local fallback for Contact Us content.

`frontend/data/legal-pages-fallback.ts`
: Typed, normalized fallback for Privacy Policy, Terms and Conditions, and
  Purchase and Billing. It exports `fallbackLegalPages`, `legalPageSlugs`, and
  `legalPageFallback`, preserves ordered sections and a restricted semantic
  Blocks subset, and stays identical to
  `cms/src/seed/legal-pages.json` for CMS migration parity.

`frontend/data/company-registration-pages-fallback.ts`
: The normalized content source for the nineteen approved legacy Company
Registration pages. It exports the exact route slugs and a fixed content
shape shared by routing, sitemap generation, Strapi fallback mapping, and the
local CMS seed mirror.

`frontend/data/mca-service-pages-fallback.ts`
: The normalized content source for the first approved MCA Services legacy
route, DSC. It uses the same fixed service-detail shape while its dedicated
Strapi collection remains separate from Company Registration.

`frontend/data/import-export-service-pages-fallback.ts`
: The complete normalized IEC Code content from the approved legacy source.
It is the first offline-safe record for the dedicated Import Export Service
collection; later records are CMS-only by default.

`frontend/data/government-license-certification-pages-fallback.ts`
: The complete normalized Ayush License content from the approved legacy
source. It is the first offline-safe record for the dedicated Government
License & Certification collection; later records are CMS-only by default.

`frontend/data/ipr-service-pages-fallback.ts`
: The complete normalized Trademark Registration content from the approved
legacy source. It is the first offline-safe record for the dedicated IPR
Services collection; later records are CMS-only by default.

`frontend/data/fssai-service-pages-fallback.ts`
: The complete normalized FSSAI Basic Registration content from
`site/corporate/fssai-certificate.html`. The legacy WPC certification link is
not used because it contains unrelated WPC ETA content. Later FSSAI records are
CMS-only by default.

`frontend/data/sebi-business-registration-pages-fallback.ts`
: The complete normalized Portfolio Manager Registration content from the
approved legacy source. It is the first offline-safe record for the dedicated
SEBI Business Registration collection; later records are CMS-only by default.

`frontend/data/tax-accounting-pages-fallback.ts`
: The complete normalized GST Registration content from the approved legacy
source. It is the first offline-safe record for the dedicated Tax and
Accounting collection; later records are CMS-only by default.

`frontend/data/labour-compliance-pages-fallback.ts`
: The complete normalized Shop & Establishment Registration content from the
approved legacy source. It is the first offline-safe record for the dedicated
Labour Compliance collection; later records are CMS-only by default.

`frontend/data/fund-raising-pages-fallback.ts`
: The complete normalized MSME Registration content from the approved legacy
source. It is the first offline-safe record for the dedicated Fund Raising
collection; later records are CMS-only by default.

`frontend/data/bureau-indian-standards-pages-fallback.ts`
: The complete normalized ISI Certification content from
  `site/approval/isi-certificate.html`. It is the first offline-safe record for
  the dedicated Bureau of Indian Standards collection; later records are
  CMS-only by default.

`frontend/data/pollution-advisory-pages-fallback.ts`
: The complete normalized EPR Certification content from
  `site/approval/epr-certification.html`. It is the first offline-safe record
  for the dedicated Pollution Advisory collection; later records are CMS-only
  by default.

There are deliberately no fallback modules for Telecommunication Engineering
Centre, Wireless Planning and Coordination, Bureau of Energy Efficiency,
CDSCO Registration, AERB Approval, LMPC Certification, or STQC. Those seven
families begin empty in Strapi and every page in them is CMS-only.

There are also no fallback modules for `global-country-page` or
`global-certificate-page`. Editors create every country and certificate record
directly in Strapi. The dynamic route files and shared UI templates exist, but
they render no local or placeholder content.

The existing fallback files keep their implemented routes working when Strapi
is offline. They also document the expected content shape for
editors/developers.

## Library files

`frontend/lib/types.ts`
: The main TypeScript content contract. Defines shared link, navigation, site
  settings, footer, SEO, editorial pages, the three fixed `LegalPageSlug`
  values, and the legal paragraph/heading/list/inline Blocks nodes, plus the
  fixed named Company Registration, MCA Services, Import Export Service, and
  Government License & Certification, IPR Services, FSSAI, and SEBI Business
  Registration, Tax and Accounting, Labour Compliance, Fund Raising, Bureau of
  Indian Standards, Pollution Advisory, Telecommunication Engineering Centre,
  Wireless Planning and Coordination, Bureau of Energy Efficiency, CDSCO
  Registration, AERB Approval, LMPC Certification, and STQC service-detail
  models. It also defines the separate `GlobalCountryPageData` /
  `GlobalCountryPageContent` and `GlobalCertificatePageData` /
  `GlobalCertificatePageContent` contracts used only by the Global templates.

`frontend/lib/strapi.ts`
: Server-side Strapi v5 adapter. Builds explicit populate queries—including
  `headerMenu.categories.links` and every nested registration-page component—
  fetches published single types or exact-slug entries from all nineteen fixed
  service-detail collections, converts media URLs, and safely falls back when
  known local fallback data is available. The separate legal-page query allows
  only the three fixed slugs, requests published content, explicitly populates
  ordered `sections` plus `seo.shareImage`, applies the `jr-legal-pages` tag,
  and strictly maps supported Blocks before falling back to complete local
  legal content. Later CMS-only category records are strictly validated before
  rendering. The two Global collections have their
  own explicit hero, card, CTA, SEO, text-item, process, and media populate
  trees and strict mappers; they are filtered by exact route segments, request
  only `status=published`, convert media URLs to absolute CMS URLs, and never
  use `populate=deep` or a local page fallback.

`frontend/lib/content.ts`
: Small route-facing content loader. Exposes functions used by pages to get
home/about/careers/contact content, the cached fixed `getLegalPage` loader, plus
cached pages and slug discovery for all nineteen fixed service-detail
collections. The legal loader combines the matching typed fallback with shared
fallback chrome and the published exact-slug CMS record. The seven empty
Approval families pass no page fallback to the Strapi adapter. It also exposes
cached Global country and certificate loaders as `getGlobalCountryPage`,
`getGlobalCountrySlugs`, `getGlobalCertificatePage`, and
`getGlobalCertificatePaths`. Unavailable or incomplete Global content stays
`null`, and discovery returns no Global path when Strapi is unavailable.

`frontend/lib/page-metadata.ts`
: Converts page SEO data into Next metadata. Each static legal route supplies
  its fixed pathname; when `SITE_URL` is configured the helper emits an
  absolute canonical from that path or a site-relative CMS override, while an
  editor-provided absolute canonical remains authoritative.

`frontend/lib/site-url.ts`
: Resolves the public site URL from environment values, used for canonical URLs and sitemap metadata.

`frontend/lib/link-props.ts`
: Converts CMS link targets into safe anchor props. Adds `rel="noreferrer"` for new-tab links.

`frontend/lib/leads.ts`
: Pure consultation validation, phone/path normalization, lead-type routing,
  and exact webhook payload construction. Focused tests cover this contract.

`frontend/lib/lead-rate-limit.ts`
: Bounded in-memory fixed-window protection for the current single frontend
  process. Production also requires the documented Nginx/edge limit.

## Tests

`frontend/tests/legal-pages.test.ts`
: Verifies exact fallback/CMS mirror parity, the three fixed slugs, approved
  paragraph/heading/list hierarchy and contact details, exclusion of Webflow
  and encoding artifacts, fallback and CMS-managed footer destinations, the
  fixed Draft and Publish schema, all three metadata route files, explicit
  Strapi population, matching signed `jr-legal-pages` tags, safe Site Setting
  migration wiring, and fixed sitemap inclusion.

## Public assets

Everything under `frontend/public/` is served directly from the site root.

`frontend/public/images/jr-logo.svg`
: Header logo.

`frontend/public/images/jr-footer-logo.svg`
: Footer logo.

`frontend/public/images/team.webp`
: Home hero team image.

Client logos in `frontend/public/images/`
: `tata-play.svg`, `newline.svg`, `lipi.webp`, `toray.svg`, `sony.svg`, `sennheiser.svg`, `healthify.svg`, `kaon.svg`, `halton.svg`, and `lenovo.svg`. Used in the trusted brands/logo band.

`frontend/public/images/services/`
: Original approved legacy service/flag SVG assets. Keep these as archival approved shapes.

`frontend/public/images/services-blue/`
: Blue-theme versions of the service/flag SVGs used by the current Compliance Network theme.

`frontend/public/images/about/`
: About page media: hero/team image, mantra images, team photos, and achievement logos.

`frontend/public/images/careers/`
: Careers page media: culture gallery images and employee testimonial portraits.

`frontend/public/images/contact/`
: Contact page icons for phone, email, and location.

## Generated folders

`frontend/node_modules/`
: Installed npm packages. Generated by `npm install` or `npm ci`; do not edit.

`frontend/.next/`
: Next.js build/dev output. Generated by `npm run dev` or `npm run build`; do not edit.

## Important rules for future changes

- Prefer Tailwind utilities for new layout, spacing, typography, sizing, color, borders, and responsive styling. The approved color tokens are exposed to Tailwind in `app/globals.css`.
- Keep `app/globals.css` global. Put bespoke visual work beside the component that owns it; reserve CSS for complex gradients, pseudo-elements, masking, and keyframes where utilities would be less clear.
- Keep editable content, links, order, and media in Strapi or typed fallback files.
- Keep layout, animation, interaction, and theme styling in Next components/CSS.
- Do not expose `STRAPI_API_TOKEN` to the browser. It must stay server-only.
- Do not import Webflow CSS/JS/markup from `site/`.
- Use `theme.md` as the visual contract before changing UI.
- For service pages, validate real destinations before changing `#services` links into route links.
