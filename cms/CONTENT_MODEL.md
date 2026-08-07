# Strapi v5 content model — homepage

This is the CMS contract for the new Next.js homepage. It preserves the useful
content in `site/index.html`, but does **not** preserve its Webflow UI. Layout,
motion, colours, and responsive behaviour belong in Next.js; editors only own
the copy, links, ordering, and approved media.

Use named fields rather than a page-builder dynamic zone for this first page.
That makes the front-end contract stable and easy for non-technical editors to
use. Do not create a generic `Page`, navigation collection, or separate design
settings type in this phase.

All listed content types use **Draft & Publish**. Start with English only
(i18n disabled); enable i18n on every content type together before adding a
second locale.

## Single types

### `site-setting` — API: `api::site-setting.site-setting`

One global record used by the shared header and footer.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `siteName` | Short text | Required |
| `headerLogo` | Media, single image | Required |
| `footerLogo` | Media, single image | Required |
| `headerMenu` | Repeatable `navigation.menu-item` component | Required |
| `headerCta` | `shared.cta` component | Optional |
| `footerTagline` | Long text | Required |
| `footerCta` | `shared.cta` component | Optional |
| `footerLinkGroups` | Repeatable `navigation.link-group` component | Required |
| `contact` | `shared.contact` component | Required |
| `legalLinks` | Repeatable `shared.link` component | Required |
| `legalNotices` | Repeatable `shared.legal-notice` component | Optional; holds Disclaimer and Intellectual Property copy |
| `socialLinks` | Repeatable `shared.social-link` component | Required |
| `copyrightText` | Short text | Required |
| `defaultSeo` | `shared.seo` component | Optional fallback for non-home routes |

### `home-page` — API: `api::home-page.home-page`

One editorially ordered homepage record.

| Field | Strapi field | Rules / relation |
| --- | --- | --- |
| `hero` | `home.hero` component | Required |
| `trustedLogos` | Relation | **Many-way** to `brand-logo`; use `kind=client`, editor order is display order |
| `servicesHeading` | `shared.section-heading` component | Required |
| `serviceCategories` | Relation | **Many-way** to `service-category`; editor order is tab order |
| `whyUs` | `home.why-us` component | Required |
| `regulatorsHeading` | `shared.section-heading` component | Required |
| `regulatorLogos` | Relation | **Many-way** to `brand-logo`; use `kind=regulator` |
| `story` | `home.story` component | Required |
| `tickerCta` | `home.cta-band` component | Optional; the animated “Let’s Talk Compliance” band |
| `testimonialsHeading` | `shared.section-heading` component | Required |
| `testimonials` | Relation | **Many-way** to `testimonial`; editor order is carousel order |
| `recognitionHeading` | `shared.section-heading` component | Required |
| `recognitions` | Relation | **Many-way** to `recognition`; editor order is card order |
| `faqHeading` | `shared.section-heading` component | Required |
| `faqCategories` | Relation | **Many-way** to `faq-category`; editor order is tab order |
| `insightsHeading` | `shared.section-heading` component | Optional; preserve the legacy Regulatory Insights content for later enablement |
| `insights` | Relation | **Many-way** to `insight`; editor order is card order |
| `finalCta` | `home.cta-band` component | Required |
| `seo` | `shared.seo` component | Required |

## Collection types

All `sortOrder` values are required integers, minimum `0`. The front end sorts
children by this field as a safe fallback; the Home Page relations determine
which entries appear on the homepage.

| Type (API) | Fields | Relations |
| --- | --- | --- |
| **Service Category** (`service-category`, `service-categories`) | `name` short text*, `slug` UID from `name`*, `description` long text, `sortOrder` integer* | `services`: **one-to-many** to Service (inverse of `serviceCategory`) |
| **Service** (`service`, `services`) | `title` short text*, `slug` UID from `title`*, `summary` long text, `icon` single image media*, `link` `shared.link`*, `sortOrder` integer* | `serviceCategory`: **many-to-one** to Service Category* |
| **Brand Logo** (`brand-logo`, `brand-logos`) | `name` short text*, `kind` enum `client` / `regulator`*, `logo` single image media*, `sortOrder` integer*, `websiteUrl` short text | Selected by the two Home Page many-way relations; no inverse field |
| **Testimonial** (`testimonial`, `testimonials`) | `quote` long text*, `personName` short text*, `personRole` short text, `companyName` short text, `personPhoto` single image media, `companyLogo` single image media, `publishedOn` date, `sortOrder` integer* | Selected by Home Page |
| **Recognition** (`recognition`, `recognitions`) | `category` short text*, `title` short text*, `excerpt` long text*, `sourceName` short text, `sourceLogo` single image media, `coverImage` single image media, `link` `shared.link`*, `sortOrder` integer* | Selected by Home Page |
| **FAQ Category** (`faq-category`, `faq-categories`) | `name` short text*, `slug` UID from `name`*, `icon` single image media, `sortOrder` integer* | `faqs`: **one-to-many** to FAQ (inverse of `faqCategory`) |
| **FAQ** (`faq`, `faqs`) | `question` short text*, `answer` Rich Text (Blocks)*, `sortOrder` integer* | `faqCategory`: **many-to-one** to FAQ Category* |
| **Insight** (`insight`, `insights`) | `title` short text*, `summary` long text*, `kind` enum `article` / `video`*, `image` single image media*, `link` `shared.link`*, `publishedOn` date, `sortOrder` integer* | Selected by Home Page |

`*` means required. No collection entry should be hard-deleted when it may be
referenced; unpublish it first and remove it from the Home Page relation.

## Components

Components have no REST endpoints. Media is allowed in components; collection
relations deliberately live on the two single types or the two parent/child
collection pairs above.

| Component UID | Exact fields |
| --- | --- |
| `shared.link` | `label` short text*, `href` short text* (absolute URL or site-relative path), `target` enum `same_tab` / `new_tab`* (default `same_tab`) |
| `shared.cta` | `label` short text*, `href` short text*, `target` enum `same_tab` / `new_tab`* (default `same_tab`) |
| `shared.section-heading` | `eyebrow` short text, `titleBefore` short text, `titleHighlight` short text, `titleAfter` short text, `description` long text, `alignment` enum `left` / `center`* (default `left`) |
| `shared.seo` | `metaTitle` short text*, `metaDescription` long text*, `shareImage` single image media, `canonicalUrl` short text, `noIndex` boolean (default `false`) |
| `shared.contact` | `phoneDisplay` short text*, `phoneE164` short text*, `email` email*, `whatsAppUrl` short text* |
| `shared.social-link` | `network` enum `linkedin` / `facebook` / `x` / `youtube` / `instagram`*, `url` short text* |
| `shared.legal-notice` | `title` short text*, `body` Rich Text (Blocks)* |
| `navigation.menu-item` | `label` short text*, `href` short text, `children` repeatable `shared.link` component; use children for mega-menu groups and `href` alone for Careers/About Us |
| `navigation.link-group` | `title` short text*, `links` repeatable `shared.link` component* |
| `home.rotating-term` | `text` short text* |
| `home.hero-card` | `title` short text*, `description` long text, `image` single image media, `icon` single image media, `cta` `shared.cta` component |
| `home.hero` | `titleBefore` short text*, `rotatingTerms` repeatable `home.rotating-term`*, `titleAfter` short text*, `description` long text*, `cta` `shared.cta` component*, `heroImage` single image media*, `cards` repeatable `home.hero-card` component |
| `home.image-card` | `title` short text*, `description` long text, `image` single image media* |
| `home.why-us` | `heading` `shared.section-heading`*, `cards` repeatable `home.image-card` component* |
| `home.stat` | `value` integer*, `suffix` short text, `label` short text*, `icon` single image media, `sortOrder` integer* |
| `home.story` | `heading` `shared.section-heading`*, `stats` repeatable `home.stat` component*, `featureImage` single image media, `featureTitle` short text, `cta` `shared.cta` component |
| `home.cta-band` | `title` short text*, `description` long text, `cta` `shared.cta` component* |

## Legacy content to seed

Migrate copy and approved assets from `site/index.html` into the model. The
initial entries should include:

| Legacy section | Initial CMS content |
| --- | --- |
| Hero | “Bridging” + rotating terms **Businesses, Companies, Manufacturers, Brands** + “to Worldwide Standards”; existing trust paragraph; Connect With Us CTA; group-team image |
| Service Stack | Categories **Technical**, **Corporate**, **Global** and their existing five service cards each (BIS/EPR/TEC/WPC/BEE; registrations; country cards) |
| Why JR | “We simplify Global Regulatory Compliance with Expert Solutions”; three image cards: Instant Compliance Solutions, Guaranteed Global Support, Trusted Corporate Services |
| Data story | 1000+ Happy Clients, 360 Compliance Services, 13+ Years of Industry Experience; About Us CTA |
| Trust proof | Existing client marquee logos and four testimonials |
| Recognition | Existing three Media cards and their source links/logos |
| FAQs | Registration, Compliance, Tax & Audits, with the existing five questions in each category |
| Footer | Existing contact phone/email, WhatsApp, social links, policy links, popular service links, and legal notices |

Correct legacy character-encoding artefacts and duplicated FAQ text during
migration; do not bring over Webflow classes, inline styles, animation IDs, or
legacy asset paths.

## Media policy

- Upload a copy of every approved legacy asset to Strapi Media Library; the
  frontend must never reference `site/assets/...` or Webflow-hosted URLs.
- Set every media item’s `alternativeText` before publishing. `name` is not an
  accessibility substitute.
- Image-only media fields accept SVG, WebP, PNG, or JPG. Prefer SVG for logos,
  WebP/JPG for photography, and preserve transparent logos. Do not upload video
  for the current homepage; video CTAs use a vetted external URL in `href`.
- Use consistent crops: hero at least 1600×1000, card images at least 900×700,
  people at least 400×400, and logos with transparent padding. The current
  frontend deliberately uses a standard image element so its media URLs can
  move between local and CDN storage without a code/config change.
- Use local uploads in development and an object-storage upload provider in
  production. Keep the provider bucket private unless public delivery is a
  deliberate deployment decision; expose media through the provider/CDN URL.

## REST access contract

The Next app reads only published content, server-side. Strapi v5 REST response
attributes are flattened and documents use `documentId`; do not copy v4
`data.attributes` code.

| Consumer | Allowed permissions |
| --- | --- |
| **Public role** | None for these content types or Upload. The browser never receives a Strapi token. |
| **`next-homepage-reader` API token** | Custom, read-only: `find` for `site-setting` and `home-page`; `find` and `findOne` for every listed collection type; Upload `find`. No create, update, delete, publish, or admin access. Store only as `STRAPI_API_TOKEN` on the Next server. |
| **Content Editor admin role** | Content Manager create/read/update for the listed types and Media Library upload/edit. No schema access and no delete permission. |
| **Publisher/Admin role** | Editor permissions plus publish. Content Type Builder remains development-only and developer-owned. |

Use these generated endpoints:

```text
GET /api/site-setting?status=published
GET /api/home-page?status=published
```

Strapi does not populate relations, components, or media by default. The Next
CMS client must attach one centralized, explicit populate object for both
requests (hero/card media, logo media, category → services → icon, FAQ
category → FAQs, testimonial media, recognition media, insight media, and SEO
share images). Do not use unbounded deep-population plugins or issue a browser
request per card. The API token is sent as `Authorization: Bearer <token>` by
the Next server only.

## Onboarding checklist

1. Create a Strapi v5 TypeScript project inside `cms/` (or point this folder to
   the separately deployed CMS) and configure SQLite only for local development;
   use PostgreSQL plus production secrets for deployment.
2. Set `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
   `ENCRYPTION_KEY`, database values, the upload-provider credentials, and the
   public CMS URL. Never commit them.
3. In local development, create the components above first, then the eight
   collection types, then `site-setting` and `home-page`. Enable Draft &
   Publish on all of them. Commit Strapi’s generated schemas to git; do not
   create schema changes directly in production.
4. Configure the media provider and migrate the approved legacy images/logos.
   Add filename, alt text, and captions before selecting them in content.
5. Create the service categories/services, logos, FAQ categories/FAQs,
   testimonials, recognitions, and optional insights. Set `sortOrder` values.
6. Fill and publish `site-setting`, then fill `home-page` and select the
   intended ordered relation entries. Verify every link and media item.
7. Create the `next-homepage-reader` custom API token and apply the permissions
   above. Put `STRAPI_URL` and `STRAPI_API_TOKEN` in the Next server environment
   (never `NEXT_PUBLIC_*`).
8. Wire one typed fetcher to the two single-type endpoints with the explicit
   populate contract, render only published data, and add a signed Strapi
   publish webhook to invalidate the Next homepage cache.
9. Test with an editor: change hero copy, reorder a service, replace a logo,
   save a draft, publish it, and confirm the live page updates without a code
   change.

Useful Strapi references: [Content-Type Builder](https://docs.strapi.io/cms/features/content-type-builder), [REST API](https://docs.strapi.io/cms/api/rest), and [API tokens](https://docs.strapi.io/cms/features/api-tokens).
