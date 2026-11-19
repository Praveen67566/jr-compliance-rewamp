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
- Keep public service URLs at `/corporate/[slug]`, `/approval/[slug]`, and
  `/global/[slug]`, with no category or country segment. Categories remain
  internal CMS/navigation groups. Preserve shared templates and typed contracts.
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

This change is frontend only i don't want exiting website flow to be affected add only this new add page.

# Task 13 — Build Static BIS Certification Ads Landing Page

## Project Details

- **Website:** https://jrcompliance.com
- **New Route:** `/ads/bis`
- **Framework:** Next.js 16 App Router
- **Reference Website:** https://corpbiz.io/ads/bis
- **Content:** Use the complete "BIS CERTIFICATE-LANDING PAGE CONTENT" provided with this task.
- **Design Theme:** Follow the existing JR Compliance website theme.

## Objective

Build a professional, responsive, conversion-focused static BIS Certification landing page.

Study the reference website carefully and reproduce its overall layout structure, section arrangement, card designs, navigation flow, form placement, and CTA positioning.

However, use JR Compliance branding, existing theme colors, typography, and reusable components. Do not copy Corpbiz branding, source code, images, or proprietary assets.

## Implementation Requirements

### 1. Static Page

- Create the page at `frontend/src/app/ads/bis/page.tsx`, or the equivalent route location in the existing project.
- Keep all landing page content static within the frontend.
- Do not fetch page content from Strapi.
- Do not modify the database or backend.
- Ensure the page loads independently without affecting other routes.

### 2. Page Content and Section Structure

Use the exact content supplied for this task and arrange the sections in the following order:

1. **Hero Section**
   - Main BIS Certification heading.
   - ISI Mark, Hallmarking, FMCS, BIS Lab Recognition, and CRS services.
   - 2000+ Certifications, Industry Expert Consultants, 500+ Product Categories, and Pan India Service.
   - Free consultation CTA and WhatsApp CTA.
   - Lead generation form displayed prominently.

2. **Complete BIS Certification Consultation Assistance**
   - Compliance Assessment.
   - Lab Testing Support.
   - BIS Portal Filing Assistance.
   - Factory Audit Coordination.
   - Query Response Guidance.
   - Post Certificate Compliance.

3. **Our BIS Certifications Consultations for Quick Approval**
   - ISI Mark Certification.
   - CRS Registration.
   - FMCS Certification.
   - Hallmarking.
   - ISI Mark Renewal.
   - BIS Lab Recognition.

4. **Legal Penalties of Selling Without a BIS Certificate**
   - Imprisonment.
   - Import Detention.
   - Financial Fines.
   - Online Marketplace Ban.
   - Product Seizure.
   - Court Injunction.

5. **Why JR Compliance for BIS Certificate?**
   - Easy and Legal Market Entry.
   - Customer Trust and Credibility.
   - E-Commerce Compliance.
   - Government Tenders.
   - Global Market Credibility.
   - Quick BIS Certificate Issuance.

6. **6 Steps of BIS Certification Process**
   - Compliance Assessment.
   - Product Testing.
   - BIS Portal Filing.
   - Factory Inspection.
   - Query Response.
   - Issuance of Certification.

7. **Mandatory Documents for BIS Certification**
   - All nine document categories from the supplied content.

8. **Who Needs a BIS Certificate?**
   - All eight customer categories from the supplied content.

9. **Frequently Asked Questions**
   - Include all 10 provided FAQs.
   - Implement an accessible accordion layout.

10. **Final Conversion Section**
    - Strong consultation CTA.
    - Call expert button.
    - WhatsApp expert chat button.

Do not omit any supplied content, headings, descriptions, bullet points, or FAQs.

Do not invent testimonials, ratings, offers, or additional company statistics. Flag factual or legal claims that require verification, particularly penalties, regulatory applicability, certification timelines, and approval guarantees, before production publication.

### 3. UI/UX Design

- Follow the existing JR Compliance theme.
- Use the reference page for visual structure and layout inspiration.
- Create modern cards, sections, icons, and spacing.
- Use consistent typography and branding.
- Provide a responsive desktop and mobile layout.
- Add a mobile sticky CTA if appropriate.
- Include section navigation with anchor links.
- Keep the page conversion-focused.
- Avoid unnecessary animations and heavy dependencies.

### 4. Lead Generation Form

- Reuse the existing JR Compliance lead form functionality and API.
- Include Name, Phone, Email, and State where supported by the existing integration.
- Preserve the existing API payload contract.
- Capture UTM parameters and page source information.
- Set the lead source/page identification to `/ads/bis`.
- Include proper validation, loading state, and submission feedback.
- Ensure the form actually submits leads to the existing backend.

### 5. Call and WhatsApp CTAs

- Reuse existing JR Compliance phone and WhatsApp contact configuration.
- Make all consultation buttons functional.
- Scroll to the lead form or open the appropriate contact action.
- Preserve existing WhatsApp click tracking where available.
- Do not use any Corpbiz contact information.

### 6. Google Tag Manager

- Reuse the existing `GTM-K938HN3` integration if installed.
- Preserve UTM tracking.
- Track landing page CTA interactions using the existing tracking conventions.
- Avoid duplicate GTM initialization.
- Respect the existing cookie consent and privacy preferences.

### 7. SEO, Accessibility, and Performance

- Add page-specific title and description metadata.
- Follow the existing canonical and robots conventions for ads landing pages.
- Use semantic HTML and proper heading hierarchy.
- Follow WCAG 2.2 AA frontend accessibility practices.
- Support keyboard navigation and screen readers.
- Optimize images, fonts, and loading performance.
- Prevent unnecessary layout shifts.
- Keep the page mobile-friendly.

## Strict Restrictions

1. Do not modify Strapi.
2. Do not modify backend APIs or database schemas.
3. Do not change existing website routes.
4. Do not disturb existing pages or functionality.
5. Do not change the global website theme.
6. Do not unnecessarily modify the existing header or footer.
7. Do not add unnecessary dependencies.
8. Do not deploy automatically.
9. Keep the implementation confined to the frontend.

## Final Verification

After implementation:

- Verify `/ads/bis` loads correctly.
- Verify all supplied content appears in the correct order.
- Compare the layout structure against the reference website.
- Test desktop, tablet, and mobile layouts.
- Test lead form submission.
- Test all Call and WhatsApp CTAs.
- Test UTM capture and existing tracking.
- Verify accessibility and performance.
- Run the available lint, type-check, and build commands.
- Confirm existing website pages are unaffected.

**Expected Result:** A complete static BIS Certification advertising landing page at `https://jrcompliance.com/ads/bis`, inspired by the reference layout, containing all provided JR Compliance content, using the existing website theme, and integrating with the existing lead generation and tracking systems.

Implement the page completely rather than creating only a wireframe or placeholder.
