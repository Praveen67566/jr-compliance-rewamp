# JR Compliance frontend

The active frontend is a Next.js 16 App Router rebuild of the JR Compliance
home page, `/about-us`, `/careers`, `/contact-us`, the three fixed footer/legal
routes (`/privacy-policy`, `/terms-and-conditions`, and
`/purchase-and-billing`), and nineteen Company Registration pages plus the
first MCA Services, Import Export Service, Government License & Certification,
IPR Services, FSSAI, and SEBI Business Registration, Tax and Accounting,
Labour Compliance, and Fund Raising pages under `/corporate/[slug]`, plus ISI
Certification and EPR Certification under `/approval/[...slug]`. It is
intentionally separate from the legacy Webflow export in `../site`. That
Approval catch-all is also connected to seven empty CMS-only collections for
Telecommunication Engineering Centre, Wireless Planning and Coordination,
Bureau of Energy Efficiency, CDSCO Registration, AERB Approval, LMPC
Certification, and STQC.

The frontend also includes two separate CMS-only Global templates and dynamic
routes: country landings at `/globals/[country]` and certificate pages at
`/globals/[country]/[slug]`. Their dedicated `global-country-page` and
`global-certificate-page` collections begin empty. No Global fallback, seed,
sample record, or page-specific route is bundled.

The three legal pages use separate static App Router files and one shared
Tailwind renderer at `components/legal/legal-page.tsx`. Their semantic heading,
paragraph, list, inline-formatting, and safe-link content comes from the fixed
`legal-page` collection, with typed local Blocks fallbacks mirrored in
`../cms/src/seed/legal-pages.json`.

Approval slugs are stored as relative route paths: flat values such as
`isi-certificate` and nested values such as
`bis-certification/fmcs-bis-certification` are both supported by the catch-all
route. Future Approval pages are published from Strapi without adding a new
frontend page file. Their full relative paths must be unique across all nine
Approval collections.

The current sitemap contains thirty-seven fixed active routes, including the
three legal routes and eleven category-first service routes (nine Corporate
and two Approval). Seven further Approval families have collection wiring
only, with no first page, local fallback, seed mirror, or initial record, so
they do not increase that thirty-seven-route count. The empty Global
collections likewise add no active or local route; their complete published
records are added to the sitemap automatically. Additional pages in all
eighteen extensible service families are CMS-only whenever no local fallback
exists.

## Run locally

```bash
npm install
npm run dev
npm run test
npm run typecheck
npm run build
```

`npm run dev` uses [http://localhost:8123](http://localhost:8123) so the project
does not conflict with another service on port 3000. `npm run start` defaults to
that port locally and honors a host-provided `PORT` in production.

For a production deployment, see [../prod.md](../prod.md).

Copy `.env.example` to `.env.local` only when a Strapi instance is available.
Without `STRAPI_URL`, implemented routes render their typed local content in
`data/*-page-fallback.ts`; the seven empty CMS-only Approval families have no
offline page and return 404 until Strapi supplies a complete published record.
The three legal routes remain complete through `data/legal-pages-fallback.ts`.
The Global routes are always CMS-only and return 404 without a complete exact
match from Strapi.

Set `SITE_URL` to the deployed public origin. It keeps any site-relative CMS
canonical URL absolute in generated metadata and is the strict origin allow-list
for `/api/leads`; production lead intake fails closed if it is missing or
invalid. Each legal route passes its fixed pathname to `pageMetadata`, so the
helper emits the route canonical when `SITE_URL` is configured while preserving
an editor-provided absolute canonical override. It does not expose credentials.

Set the server-only `LEAD_WEBHOOK_BASE_URL` to
`https://webhook.jrcompliance.com`. The browser sends consultation requests to
the same-origin `/api/leads` route; it never receives the downstream receiver
configuration or the Strapi token.

## Content architecture

- `data/*-page-fallback.ts` and
  the category-specific `data/*-pages-fallback.ts` modules are the safe,
  normalized legacy-content fallbacks while Strapi is not live.
- `data/legal-pages-fallback.ts` holds the three normalized legal records in a
  restricted, typed Blocks shape. It stays exactly aligned with the CMS
  migration mirror at `../cms/src/seed/legal-pages.json`.
- `lib/types.ts` defines the shared shell and page UI contracts, including the
  fixed legal slugs and semantic paragraph, heading, list, text, and link nodes.
- `lib/strapi.ts` is a server-only Strapi v5 adapter. It uses explicit REST
  population and maps `site-setting`, `home-page`, `about-page`,
  `careers-page`, `contact-page`, `legal-page`, and exact-slug
  `company-registration-page`, `mca-service-page`, `import-export-service-page`,
  `government-license-certification-page`, `ipr-service-page`,
  `fssai-service-page`, `sebi-business-registration-page`,
  `tax-accounting-page`, `labour-compliance-page`, `fund-raising-page`,
  `bureau-indian-standards-page`, `pollution-advisory-page`,
  `telecommunication-engineering-centre-page`,
  `wireless-planning-coordination-page`, `bureau-energy-efficiency-page`,
  `cdsco-registration-page`, `aerb-approval-page`,
  `lmpc-certification-page`, `stqc-page`, `global-country-page`, and
  `global-certificate-page` collection entries into the UI contracts.
- Legal reads filter one of the three fixed slugs, request only published
  records, explicitly populate the ordered legal sections and SEO share image,
  and use the `jr-legal-pages` cache tag with 60-second revalidation. Invalid or
  incomplete CMS Blocks retain the complete typed fallback.
- DSC, IEC Code, Ayush License, Trademark Registration, FSSAI Basic
  Registration, Portfolio Manager Registration, GST Registration, Shop &
  Establishment Registration, MSME Registration, ISI Certification, and EPR
  Certification have typed local fallbacks. Later fully populated records in
  their dedicated category collections are discovered for the shared route and
  sitemap without borrowing the first page’s content.
- Telecommunication Engineering Centre, Wireless Planning and Coordination,
  Bureau of Energy Efficiency, CDSCO Registration, AERB Approval, LMPC
  Certification, and STQC deliberately have no local fallback modules. Their
  first and later pages are all complete CMS-only records.
- Global country and certificate records also have no fallback modules. The
  adapter requests only published records, filters exact single-segment route
  values, explicitly populates every component/link/SEO/media field, and
  rejects incomplete data rather than borrowing another page's content.
- CMS link targets, collection `sortOrder` values, shared footer groups, and
  shared SEO are carried through the typed adapter rather than hard-coded in
  individual routes.
- `app/privacy-policy/page.tsx`, `app/terms-and-conditions/page.tsx`, and
  `app/purchase-and-billing/page.tsx` are static route modules that load their
  fixed record, reuse `pageMetadata` for SEO/canonical handling, and render the
  same legal template with `revalidate = 60`.
- `components/site-page-shell.tsx` centralizes the shared header/footer;
  `components/editorial/` centralizes the Compliance Network route primitives.
- `components/legal/legal-page.tsx` is the one responsive legal-page template.
  It renders the bluefield hero, ice reading surface, keyboard-focusable anchor
  navigation, semantic H2-H4 content, lists, formatting, and allow-listed links
  without importing or injecting legacy HTML.
- `components/company-registration/company-registration-page.tsx` is the
  Tailwind-first fixed template shared by the Company Registration routes and
  all nineteen fixed service-detail collections, including the seven empty
  CMS-only Approval families once records are published.
- `components/global/global-country-page.tsx` and
  `components/global/global-certificate-page.tsx` are the two shared,
  responsive Global UI templates. The first renders the CMS hero and ordered
  logo cards; the second renders the certificate hero, overview, scope,
  process, JR role, conclusion, and closing CTA. They do not reuse or change
  the completed Corporate/Approval page structure.
- `components/forms/consultation-form.tsx` owns the form UI, required-message
  validation, consent, honeypot, UTM capture, submission state, and redirect.
  `app/api/leads/route.ts` validates it again, rate-limits requests, derives the
  lead type from the page path, and forwards one exact allow-listed payload.
- Shared fallback and CMS-managed Site Setting legal links point to the three
  completed local routes; the consultation form privacy link points to
  `/privacy-policy`.
- `tests/legal-pages.test.ts` verifies fallback/CMS mirror parity, legal
  hierarchy and contact copy, legacy-artifact exclusion, fixed route/footer
  links, the dedicated CMS contract, metadata routes, explicit population,
  matching revalidation tags, and sitemap wiring.
- The CMS schema and editor setup are documented in `../cms/CONTENT_MODEL.md`.

Global navigation stays editor-managed. After a complete country record is
published, add its exact `/globals/<country>` URL under **Site Setting → Header
Menu → Global** and publish Site Setting. Put each certificate's exact
`/globals/<country>/<slug>` URL on the matching country card. Publishing a page
record does not automatically add it to the navbar, and the frontend does not
enumerate every CMS record into navigation.

## Centralized consultation form

The global form copy is `site-setting.leadForm` in Strapi and
`fallbackHomepage.site.leadForm` locally. Home, the shared editorial hero, and
the shared Company Registration template render the same component in their
hero visual slot, which covers every current fixed service-detail route without
per-page form markup, including all eleven category-first pages. Publishing Site
Setting refreshes all page cache tags.

For a future page whose content extends `PageChromeContent`, place the same form
in its intended hero slot:

```tsx
<ConsultationForm
  pageTitle={content.seo.title}
  settings={content.site.leadForm}
/>
```

For a CTA-only surface, use `ConsultationFormTrigger`; it links to the shared
`expert-consultation` anchor instead of creating another form. If editors turn
off `leadForm.enabled`, current hero templates retain their existing artwork.

The server route sends `technical` leads for `/approval/*` and `/ad/*`,
`corporate` leads for `/corporate/*`, and `global` leads for all other paths.
The message is required and always forwarded. Supported UTM values are omitted
as a group when none are present. Successful requests redirect to the noindex
`/thank-you` page.

## CMS publish revalidation

The frontend exposes `POST /api/revalidate` for signed Strapi publish events.
Set `STRAPI_REVALIDATE_SECRET` on this app and the same value on the CMS. The
CMS uses `NEXT_REVALIDATE_URL` for this endpoint and sends the raw JSON payload
with `X-Strapi-Signature: sha256=<HMAC-SHA256 payload>`, plus the optional
`X-Strapi-Event` header and recognized cache tags for related collections or
media. The receiver verifies the HMAC in constant time and immediately expires
only the recognized Next 16 cache tags. Never place either secret in a
`NEXT_PUBLIC_*` variable.
Legal publish events use the allow-listed `jr-legal-pages` tag, while Global
publish events use `jr-global-country-pages` and
`jr-global-certificate-pages`. The CMS signs each notification, the frontend
accepts only known tags, and the 60-second fetch revalidation remains a fallback
if a webhook notification fails.

Do not import legacy Webflow styles, scripts, or markup. Use the matching file
under `../site/` only to verify approved content and media, then build original
components. The visual contract for every new route is `../theme.md`.
