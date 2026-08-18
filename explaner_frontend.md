# Frontend explainer

This file explains what each important file in `frontend/` does. The frontend is the active Next.js 16 App Router app for JR Compliance. The old `site/` folder is only a content/media reference; the real UI lives here.

## Big picture

The frontend renders the shared routes plus nineteen Company Registration
detail routes and the first detail route for each of MCA Services, Import
Export Service, Government License & Certification, IPR Services, FSSAI, and
SEBI Business Registration:

- `/`
- `/about-us`
- `/careers`
- `/contact-us`
- `/corporate/[slug]` for the nineteen approved Company Registration slugs,
  DSC, IEC Code, Ayush License, Trademark Registration, FSSAI Basic
  Registration, and Portfolio Manager Registration

Content comes from Strapi when `STRAPI_URL` and `STRAPI_API_TOKEN` are configured. If Strapi is unavailable or incomplete, the app falls back to typed local content in `frontend/data/*-fallback.ts`.

The main flow is:

1. `app/*/page.tsx` asks `lib/content.ts` for page data.
2. `lib/content.ts` calls `lib/strapi.ts`.
3. `lib/strapi.ts` maps Strapi records into types from `lib/types.ts`.
4. If Strapi is missing or fails, local fallback data is used.
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

`frontend/app/corporate/[slug]/page.tsx`
: Shared dynamic route for the nineteen Company Registration pages plus DSC,
  IEC Code, Ayush License, Trademark Registration, FSSAI Basic Registration,
  and Portfolio Manager Registration. It awaits Next.js 16 route params,
  discovers published CMS-only slugs, generates static params and metadata, and
  returns the framework 404 for an unknown or incomplete slug.

`frontend/app/icon.tsx`
: Generates the app icon/fav icon through Next.

`frontend/app/robots.ts`
: Generates `robots.txt`.

`frontend/app/sitemap.ts`
: Generates `sitemap.xml` for the active routes.

`frontend/app/api/revalidate/route.ts`
: Secure Strapi webhook endpoint. It verifies an HMAC signature from Strapi and revalidates the matching Next cache tags after publish/unpublish/delete events.

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

`frontend/components/site-header.css`
: Header-only bluefield, navigation rail, popover, and mobile-menu artwork. It is imported once by the root layout to preserve the established cascade.

`frontend/components/site-footer.tsx`
: Shared footer. Renders logo, contact details, social links, link groups, popular services, legal links, and disclaimers from CMS/fallback data.

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

`frontend/components/company-registration/company-registration-page.tsx`
: One fixed Tailwind-first service template for every Company Registration
  route and every fixed category detail route. It renders the bluefield hero, overview,
  challenges, advantages, process, Why JR, service breakdown, native-details
  FAQ, and shared closing CTA without page-specific CSS or legacy markup.

## Data fallbacks

`frontend/data/homepage-fallback.ts`
: Typed local fallback for the home page and shared chrome. Its navbar includes nested categories and links for Corporate, Approval, and Global so the menu remains complete while Strapi is unavailable or an older CMS record is awaiting migration.

`frontend/data/about-page-fallback.ts`
: Typed local fallback for About Us content.

`frontend/data/careers-page-fallback.ts`
: Typed local fallback for Careers content.

`frontend/data/contact-page-fallback.ts`
: Typed local fallback for Contact Us content.

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

These files keep the site working when Strapi is offline. They also document the expected content shape for editors/developers.

## Library files

`frontend/lib/types.ts`
: The main TypeScript content contract. Defines shared link, navigation, site
  settings, footer, SEO, editorial pages, and the fixed
  named Company Registration, MCA Services, Import Export Service, and
  Government License & Certification, IPR Services, FSSAI, and SEBI Business
  Registration service-detail models.

`frontend/lib/strapi.ts`
: Server-side Strapi v5 adapter. Builds explicit populate queries—including
  `headerMenu.categories.links` and every nested registration-page component—
  fetches published single types or exact-slug entries from all seven fixed
  service-detail collections, converts media URLs, and safely falls back when
  known local fallback data is available. Later CMS-only category records are
  strictly validated before rendering.

`frontend/lib/content.ts`
: Small route-facing content loader. Exposes functions used by pages to get
home/about/careers/contact content plus cached pages and slug discovery for all
seven fixed service-detail collections.

`frontend/lib/page-metadata.ts`
: Converts page SEO data into Next metadata.

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
