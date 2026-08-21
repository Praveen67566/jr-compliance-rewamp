# Adding Sections to Fixed Service-Detail Pages

Use this guide when adding another editor-managed section to the shared
Corporate and Approval service-detail pages.

## Project boundaries

- Read `bootstrap.md`, `context.md`, `theme.md`, `explaner_frontend.md`, and
  `explainer_cms.md` before changing the implementation.
- Keep the existing Next.js App Router and Strapi content-type structure.
- Keep all service pages on the shared
  `frontend/components/company-registration/company-registration-page.tsx`
  template.
- Do not convert the fixed service schemas into a page builder or dynamic zone.
- Do not edit `site/`, generated files, build output, uploads, secrets, or local
  databases.
- Make the smallest additive change and preserve every existing field.

## Current section order

The shared service page currently renders:

```text
Hero
Trusted brands (optional)
Overview
Challenges
Advantages
Process
Why JR
YouTube Videos (optional)
Breakdown
Ticker CTA (optional)
FAQ
Closing CTA
```

Choose the new section's exact position before editing any schema or frontend
file. Strapi attribute order controls the editor layout, while React source
order controls the public page layout. Update both deliberately.

## Collections using the fixed contract

Corporate collections:

- `company-registration-page`
- `mca-service-page`
- `import-export-service-page`
- `government-license-certification-page`
- `ipr-service-page`
- `fssai-service-page`
- `sebi-business-registration-page`
- `tax-accounting-page`
- `labour-compliance-page`
- `fund-raising-page`

Approval collections:

- `bureau-indian-standards-page`
- `pollution-advisory-page`
- `telecommunication-engineering-centre-page`
- `wireless-planning-coordination-page`
- `bureau-energy-efficiency-page`
- `cdsco-registration-page`
- `aerb-approval-page`
- `lmpc-certification-page`
- `stqc-page`

Only update the collections that are explicitly included in the request. If a
section applies to the complete shared template, keep its field name, component
type, repeatability, optionality, and relative order identical across all
nineteen schemas.

## Implementation workflow

### 1. Define the editorial contract

Decide the minimum fields editors need. Reuse an existing Strapi component when
its meaning and validation match exactly. Otherwise, add a narrowly named
component under `cms/src/components/registration/`.

For an additive rollout without seed data or database backfill, keep the new
top-level page component optional:

```json
"newSection": {
  "type": "component",
  "component": "registration.new-section",
  "repeatable": false
}
```

Required fields may still be used inside the optional component. This means an
editor who adds the component must complete it, while existing published
records remain valid.

Do not change the requiredness or definition of existing fields. Preserve Draft
& Publish settings, UID validation, collection names, routes, controllers,
services, permissions, and sort-order rules.

### 2. Update the relevant Strapi schemas

Add the field at the intended editor position in each relevant file:

```text
cms/src/api/<collection>/content-types/<collection>/schema.json
```

Do not copy unrelated fields or reformat the entire schema. Validate that every
edited JSON file parses and that the new field is identical across the intended
collections.

### 3. Extend the shared frontend type

Add a focused TypeScript type in `frontend/lib/types.ts`, then add the optional
field to `CompanyRegistrationPageData`. All Corporate and Approval aliases
inherit that shared contract.

The frontend type should contain only normalized values needed for rendering.
For example, external video input is stored by the CMS as a URL but exposed to
the component as a validated `embedUrl`.

### 4. Add explicit Strapi population

Extend `fixedServiceDetailPopulateTree` in `frontend/lib/strapi.ts`.

- Populate only nested components, media, and relations required by the new
  section.
- Keep the population tree explicit.
- Never replace it with `populate=deep`.
- Never expose or rename `STRAPI_API_TOKEN`.

### 5. Map both service-page data paths

Update both shared mappers in `frontend/lib/strapi.ts`:

- `mapFixedServiceDetailPage` for fallback-backed pages.
- `mapCmsOnlyFixedServiceDetailPage` for CMS-only pages.

Create a small mapping helper for the section. Validate and normalize its
content there. If an optional section is absent or malformed, omit only that
section; it must not make an otherwise complete page return 404.

Do not add an optional section to the required page-completeness gate. Do not
borrow section content from another record or category.

### 6. Render through the shared template

Add one conditional block to
`frontend/components/company-registration/company-registration-page.tsx` at the
approved position:

```tsx
{content.newSection ? (
  <section>{/* editor-managed section content */}</section>
) : null}
```

Follow `theme.md` and use Tailwind utilities first. Preserve responsive layouts,
heading hierarchy, focus visibility, contrast, keyboard behavior, and reduced
motion. Reuse existing components or visual primitives only when their purpose
matches.

For external embeds or links:

- Normalize and allow-list URLs on the server before rendering.
- Provide an accessible title or label.
- Lazy-load heavy embeds where supported.
- Avoid autoplay.
- Use `linkTargetProps` for CMS-managed link targets.
- Document any required production Content Security Policy origin in `prod.md`.

### 7. Decide whether fallback or seed content is authorized

Schema support does not automatically require content.

- Do not add fallback content, seed JSON, seed logic, sample records, or a
  database backfill unless the request explicitly asks for them.
- When no content migration is requested, keep the section optional and let
  editors populate it through Strapi after deployment.
- Do not modify existing fallback/seed parity data merely to satisfy a new
  optional type.

### 8. Keep documentation synchronized

When the schema changes, update only documentation made inaccurate by it:

- `cms/CONTENT_MODEL.md` for the definitive editorial contract and component
  count.
- `explainer_cms.md` for editor and CMS behavior.
- `explaner_frontend.md` for mapping and rendering behavior.
- `context.md`, `theme.md`, `cms/README.md`, or `prod.md` only when their existing
  statements, counts, visual sequence, or deployment guidance are affected.

### 9. Add focused tests

Tests should verify, as applicable:

- Every intended collection exposes the correct optional component.
- Existing schema fields and validation remain unchanged.
- Nested component fields have the intended requiredness and minimum counts.
- Explicit Strapi population includes the new nested paths.
- Missing or invalid optional content is omitted safely.
- The React source/render order matches the approved sequence.
- Accessibility, responsive, URL-safety, and performance attributes are present.
- Existing fallback/seed parity tests still pass unchanged.

## Validation commands

After frontend changes:

```bash
cd frontend
npm test
npm run typecheck
npm run build
```

After CMS changes:

```bash
cd cms
npx tsc --noEmit
npm run build
```

Also run a scoped `git diff --check`, review `git status`, and confirm that no
unrequested seed, fallback, route, generated, secret, database, upload, or
legacy-site files changed. If a required command cannot run, record the exact
environmental or application error rather than hiding it.

## Completion checklist

- [ ] The request names the affected collections and exact render position.
- [ ] The new top-level field is optional when no backfill is provided.
- [ ] Existing schema definitions remain untouched.
- [ ] The shared TypeScript contract is updated.
- [ ] Explicit Strapi population is updated.
- [ ] Both shared mapper paths handle the section safely.
- [ ] The shared page template renders the section conditionally.
- [ ] No editor-managed copy is hard-coded in the component.
- [ ] Tests cover schema shape, mapping safety, order, and accessibility.
- [ ] Only documentation made stale is updated.
- [ ] Frontend and CMS validation commands pass or have a clearly reported
  blocker.
