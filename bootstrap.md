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

Make Sure That This is the Strapi CMS intigrated website so keep in mind 


Implement a production-ready, centralized “Get Expert Consultation” lead form for this JR Compliance Next.js + Strapi v5 rebuild.

First inspect `frontend/AGENTS.md` (if present), `theme.md`, the existing frontend/Strapi conventions, and the current typed content + fallback architecture. Work only in the active `frontend/` and `cms/` projects. Do not modify `site/`, import Webflow markup/CSS/JS, expose Strapi secrets, or introduce a generic page builder.

Goal:
Create one reusable consultation-form system that can be rendered on every current and future page without duplicating UI, state, validation, webhook logic, or Strapi mapping.

Current legacy webhook contract that must be preserved:
- Downstream endpoint: `POST https://webhook.jrcompliance.com/{leadType}`
- Lead-type routing:
  - `/approval/*` → `technical`
  - `/corporate/*` → `corporate`
  - `/ad/*` → `technical`
  - all other paths → `global`
- JSON payload sent to the downstream webhook:

  {
    "name": "string",
    "email": "string",
    "phone": "10 digit Indian mobile number without +91",
    "message": "optional; omit when blank",
    "page_name": "Page title - /current-path",
    "page_parameters": {
      "utm_source": "optional",
      "utm_medium": "optional",
      "utm_campaign": "optional"
    }
  }

- Omit `message` when empty.
- Omit `page_parameters` completely if no supported UTM values exist.
- Do not carry over ad-only fields such as `responsible`, `stage`, meeting date/time, or `/api/meeting`.
- Preserve the successful-submission behavior: redirect to `/thank-you`. Create a branded, noindex `/thank-you` route if it does not exist.

Architecture requirements:

1. Create a reusable client component, for example:
   - `frontend/components/forms/consultation-form.tsx`
   - optional shared wrapper/trigger component if useful

   Its public API should be simple enough for any route to use, such as:

   <ConsultationForm
     pageTitle={content.seo.title ?? content.hero.title}
     formName="Corporate service enquiry"
     variant="card"
   />

   The component itself should determine the current pathname and UTM values. Do not make every page reimplement state, progress, validation, or submit logic.

2. Add a server-side Next Route Handler, for example:
   - `frontend/app/api/leads/route.ts`

   The browser must submit only to this same-origin route. The route must:
   - validate and normalize the request server-side;
   - derive/validate the page path and lead type safely;
   - forward the exact compatibility payload above to `https://webhook.jrcompliance.com/{leadType}`;
   - use a server-only environment variable, for example:
     `LEAD_WEBHOOK_BASE_URL=https://webhook.jrcompliance.com`
   - never use `NEXT_PUBLIC_*` for webhook configuration or secrets;
   - set a short timeout with `AbortController`;
   - not automatically retry downstream submissions, to avoid duplicate leads;
   - return a safe, useful error to the UI without leaking internal details;
   - only report success after a successful downstream 2xx response.

   Keep this separate from the existing Strapi cache-revalidation route. Do not modify the signed Strapi → Next revalidation semantics.

3. Add lightweight protection before enabling live leads:
   - required consent checkbox, with Privacy Policy link;
   - hidden honeypot field that must remain empty;
   - server-side rate limiting appropriate for the current single-instance VPS deployment, and document that Nginx/edge rate limiting must also be enabled in production;
   - same-origin/origin validation where practical;
   - no PII in client console logs or verbose server logs.

4. Form UX and design:
   Recreate the supplied consultation-card experience, adapted to the existing Compliance Network design system in `theme.md`:
   - heading: “Get Expert Consultation”
   - subtitle: “Free quote in 2 minutes”
   - three visual progress stages: name → email → mobile
   - Full Name, Email Address, and Indian `🇮🇳 +91` Mobile Number fields
   - optional collapsible message field
   - reassurance row: Secure / 2 min / No spam, ever
   - prominent “Get Free Consultation” button with loading state
   - inline success and error states, then redirect on success
   - optional trust/recognition strip and “15+ Years of Industry Experience” footer when configured
   - responsive on mobile and desktop
   - accessible labels, keyboard support, focus styles, `aria-live` feedback, and reduced-motion support

   Validation:
   - name: trimmed, minimum 3 characters;
   - email: valid email format;
   - phone: normalize to digits and require exactly 10 digits;
   - message: optional with a sensible maximum length;
   - show progress/check indicators without relying on them as the only validation;
   - retain the legacy outbound behavior: send the phone number without `+91`.

5. Centralized Strapi configuration:
   Add one deliberate typed global configuration, preferably a reusable `lead-form-settings` component attached to the existing `site-setting` single type. Do not duplicate the configuration across every page model.

   Make these editable through Strapi, with typed local fallback values:
   - heading, subtitle, submit/loading labels;
   - optional-message label and placeholder;
   - consent/privacy copy and privacy link;
   - trust/reassurance labels;
   - success copy and redirect path;
   - optional recognition logos/links and experience text;
   - enabled/disabled setting.

   Update all relevant places consistently:
   - Strapi schema and content-model documentation;
   - TypeScript content contracts;
   - fallback data;
   - explicit Strapi populate query only for the needed form fields/media;
   - Strapi-to-frontend mapper with field-level fallbacks;
   - cache tags/revalidation behavior for global settings;
   - local seed only if it follows the repository’s safe opt-in seed policy.

   Never expose `STRAPI_API_TOKEN` to the browser. Form copy can come from Strapi; form transport and webhook configuration must not.

6. Integration:
   - Make the form available everywhere through the shared component.
   - Add it to the Contact Us page and use shared route/page templates for Home, editorial pages, and `/corporate/[slug]` pages rather than editing nineteen corporate pages individually.
   - If a page needs only a CTA, provide a reusable trigger that scrolls to or opens the same centralized form; do not duplicate form markup.
   - Keep layout, interaction, and styling in Next.js; CMS controls only editable content/configuration.

7. Quality checks:
   - Preserve the fallback-first behavior when Strapi is unavailable or incomplete.
   - Do not add page-specific CSS to `app/globals.css`; use Tailwind for normal styling and component-owned CSS only when needed.
   - Add focused tests following the project’s existing test convention for validation and successful/failed webhook forwarding. Do not submit real leads during tests.
   - Run and report:
     - `cd frontend && npm run typecheck && npm run build`
     - `cd cms && npx tsc --noEmit && npm run build`
   - Finish with a concise summary of files changed, environment variables required, Strapi fields added, and how to place the form on a new page.

Make reasonable implementation decisions from the existing repository conventions. Do not stop for approval unless the existing webhook response contract conflicts with the compatibility requirements above.

image is provided and add the place of image the contact form in every page for current or either going to build in future