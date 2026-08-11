# Strapi v5 content model — homepage, editorial, and registration routes

This is the CMS contract for the new Next.js homepage, the initial editorial
routes (About Us, Careers, Contact Us), and the nineteen approved Company
Registration routes. It preserves useful legacy content from the corresponding
`site/*.html` and `site/corporate/*.html` files, but does **not** preserve
Webflow UI. Layout, motion, colours, and responsive behaviour belong in
Next.js; editors own copy, links, ordering, SEO, and approved media.

Use named fields rather than a page-builder dynamic zone for these initial routes.
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

### `about-page` — API: `api::about-page.about-page`

One record for `/about-us`. Keep timeline, team, and achievement order in
Strapi; the blue Compliance Network layout remains in Next.js.

| Field | Strapi field | Rules / relation |
| --- | --- | --- |
| `hero` | `about.hero` component | Required; title, description, CTA, hero media |
| `overview` | `about.overview` component | Required; proof-copy plus repeatable stats |
| `mantra` | `about.content-cluster` component | Required; heading plus five ordered mantra items |
| `storyHeading` | `shared.section-heading` component | Required |
| `timelineEvents` | Relation | **Many-way** to `timeline-event`; editor order is display order |
| `whyPartner` | `about.content-cluster` component | Required; heading plus partnership reasons |
| `pioneers` | `about.pioneers` component | Required; heading, body, and stats |
| `teamHeading` | `shared.section-heading` component | Required |
| `teamFeatureImage` | Media, single image | Optional |
| `teamCta` | `shared.cta` component | Required |
| `teamMembers` | Relation | **Many-way** to `team-member`; editor order is display order |
| `achievementsHeading` | `shared.section-heading` component | Required |
| `achievements` | Relation | **Many-way** to `achievement`; editor order is display order |
| `finalCta` | `home.cta-band` component | Required |
| `seo` | `shared.seo` component | Required |

### `careers-page` — API: `api::careers-page.careers-page`

One record for `/careers`. Public applicant submissions do not belong in this
CMS content type; only editorial job information and page content do.

| Field | Strapi field | Rules / relation |
| --- | --- | --- |
| `hero` | `careers.hero` component | Required; eyebrow, title, description, CTA |
| `purpose` | `careers.purpose` component | Required; title, vision, mission |
| `values` | `careers.content-cluster` component | Required; heading plus ordered values |
| `lifeAtJr` | `careers.life-at-jr` component | Required; heading, optional copy/highlights |
| `careerGallery` | Relation | **Many-way** to `career-gallery-item`; editor order is display order |
| `openingsHeading` | `shared.section-heading` component | Required |
| `careerOpenings` | Relation | **Many-way** to `job-opening`; editor order is display order |
| `benefits` | `careers.content-cluster` component | Required; heading plus ordered benefit cards |
| `testimonialsHeading` | `shared.section-heading` component | Required |
| `careerTestimonials` | Relation | **Many-way** to `career-testimonial`; editor order is display order |
| `faqHeading` | `shared.section-heading` component | Required |
| `careerFaqs` | Relation | **Many-way** to FAQ; use the existing FAQ type and choose only career FAQs |
| `finalCta` | `home.cta-band` component | Required |
| `seo` | `shared.seo` component | Required |

### `contact-page` — API: `api::contact-page.contact-page`

One record for `/contact-us`. It owns contact-page copy and approved contact
media; a future secure submission workflow belongs in Next.js/server
infrastructure, not in a public CMS field.

| Field | Strapi field | Rules / relation |
| --- | --- | --- |
| `hero` | `contact.hero` component | Required; eyebrow, title, description |
| `contactPoints` | Repeatable `contact.point` component | Required; one each for phone, email, and office location |
| `enquiry` | `contact.enquiry` component | Required; direct contact CTA and future form-copy/note only |
| `response` | `contact.response` component | Required; heading and ordered connection steps |
| `finalCta` | `home.cta-band` component | Required |
| `seo` | `shared.seo` component | Required |

## Collection types

All `sortOrder` values are required integers, minimum `0`. The front end sorts
children by this field as a safe fallback; each route's explicit relations
determine which entries appear on that route.

### `company-registration-page` — API: `api::company-registration-page.company-registration-page`

One published record per approved `/corporate/[slug]` route. This is a fixed
service-detail contract, not a generic page builder.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the Company Registration navbar label |
| `slug` | UID from `title` | Required; exact route segment |
| `hero` | `registration.hero` | Required |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered six-step process |
| `whyChoose` | `registration.card-section` | Required; ordered JR Compliance reasons |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

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

### Editorial route collections

All use Draft & Publish and a required integer `sortOrder` (minimum `0`).
Avoid a generic `Page` collection: these types are deliberately named around
the editor's actual content task.

| Type (API) | Fields | Relations |
| --- | --- | --- |
| **Timeline Event** (`timeline-event`, `timeline-events`) | `period` short text*, `title` short text*, `description` long text*, `sortOrder` integer* | Selected and ordered by `about-page.timelineEvents` |
| **Team Member** (`team-member`, `team-members`) | `name` short text*, `role` short text*, `photo` single image media, `profileLink` `shared.link`, `sortOrder` integer* | Selected and ordered by `about-page.teamMembers` |
| **Achievement** (`achievement`, `achievements`) | `title` short text*, `description` long text*, `logo` single image media, `sortOrder` integer* | Selected and ordered by `about-page.achievements` |
| **Job Opening** (`job-opening`, `job-openings`) | `title` short text*, `slug` UID from `title`*, `department` short text*, `location` short text*, `workModel` enum `on_site` / `hybrid` / `remote`*, `summary` long text*, `applyLink` `shared.link`*, `isOpen` boolean*, `sortOrder` integer* | Selected and ordered by `careers-page.careerOpenings` |
| **Career Testimonial** (`career-testimonial`, `career-testimonials`) | `quote` long text*, `personName` short text*, `role` short text*, `photo` single image media, `sortOrder` integer* | Selected and ordered by `careers-page.careerTestimonials` |
| **Career Gallery Item** (`career-gallery-item`, `career-gallery-items`) | `image` single image media*, `alternativeText` short text*, `caption` short text, `sortOrder` integer* | Selected and ordered by `careers-page.careerGallery` |

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
| `navigation.menu-item` | `label` short text*, `href` short text, `children` repeatable `shared.link` component, `categories` repeatable `navigation.menu-category` component; use categories for multi-column mega menus, children for a simple submenu, and `href` alone for Careers/About Us |
| `navigation.menu-category` | `title` short text*, `links` repeatable `shared.link` component* |
| `navigation.link-group` | `title` short text*, `links` repeatable `shared.link` component* |
| `home.rotating-term` | `text` short text* |
| `home.hero-card` | `title` short text*, `description` long text, `image` single image media, `icon` single image media, `cta` `shared.cta` component |
| `home.hero` | `titleBefore` short text*, `rotatingTerms` repeatable `home.rotating-term`*, `titleAfter` short text*, `description` long text*, `cta` `shared.cta` component*, `heroImage` single image media*, `cards` repeatable `home.hero-card` component |
| `home.image-card` | `title` short text*, `description` long text, `image` single image media* |
| `home.why-us` | `heading` `shared.section-heading`*, `cards` repeatable `home.image-card` component* |
| `home.stat` | `value` integer*, `suffix` short text, `label` short text*, `icon` single image media, `sortOrder` integer* |
| `home.story` | `heading` `shared.section-heading`*, `stats` repeatable `home.stat` component*, `featureImage` single image media, `featureTitle` short text, `cta` `shared.cta` component |
| `home.cta-band` | `title` short text*, `description` long text, `cta` `shared.cta` component* |

### Editorial-route components

Keep media and editable prose here; do not add CSS class names, animation
settings, colour pickers, Webflow IDs, or public form endpoints.

| Component UID | Exact fields |
| --- | --- |
| `about.hero` | `eyebrow` short text, `title` short text*, `description` long text*, `cta` `shared.cta`*, `image` single image media |
| `about.stat` | `value` short text*, `label` short text* |
| `about.overview` | `title` short text*, `description` long text*, `stats` repeatable `about.stat`* |
| `about.value-item` | `title` short text*, `description` long text*, `image` single image media |
| `about.content-cluster` | `eyebrow` short text, `title` short text*, `description` long text, `items` repeatable `about.value-item`* |
| `about.pioneers` | `eyebrow` short text, `title` short text*, `description` long text*, `stats` repeatable `about.stat`* |
| `careers.hero` | `eyebrow` short text, `title` short text*, `description` long text*, `cta` `shared.cta`* |
| `careers.purpose` | `eyebrow` short text, `title` short text*, `vision` long text*, `mission` long text* |
| `careers.content-cluster` | `heading` `shared.section-heading`*, `items` repeatable `about.value-item`* |
| `careers.life-at-jr` | `heading` `shared.section-heading`*, `description` long text, `highlights` repeatable `careers.highlight` component |
| `careers.highlight` | `text` short text* |
| `contact.hero` | `eyebrow` short text, `title` short text*, `description` long text* |
| `contact.point` | `label` short text*, `value` short text*, `href` short text*, `detail` long text*, `icon` single image media |
| `contact.topic` | `text` short text* |
| `contact.enquiry` | `eyebrow` short text, `title` short text*, `description` long text*, `topics` repeatable `contact.topic` component, `directCta` `shared.cta`*, `formNote` long text* |
| `contact.response-step` | `title` short text*, `description` long text* |
| `contact.response` | `eyebrow` short text, `title` short text*, `steps` repeatable `contact.response-step`* |
| `registration.text-item` | `text` long text* |
| `registration.detail-item` | `title` short text*, `description` long text* |
| `registration.hero` | `eyebrow` short text*, `description` long text*, `cta` `shared.cta`*; page H1 comes from the parent `title` |
| `registration.overview` | `eyebrow` short text*, `title` short text*, `paragraphs` repeatable `registration.text-item`* |
| `registration.card-section` | `eyebrow` short text*, `title` short text*, `items` repeatable `registration.detail-item`* |
| `registration.breakdown-group` | `title` short text*, `items` repeatable `registration.text-item`* |
| `registration.breakdown-section` | `eyebrow` short text*, `title` short text*, `groups` repeatable `registration.breakdown-group`* |
| `registration.faq-item` | `question` short text*, `answer` long text* |
| `registration.faq-section` | `eyebrow` short text*, `title` short text*, `items` repeatable `registration.faq-item`* |

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

### Editorial-route seed map

Seed the route records from only their matching legacy page. Normalise mojibake
(`Letâs`, `360Â°`, em dashes, and non-breaking spaces), but do not editorially
invent claims or silently repair source inconsistencies.

| Route | Legacy source | Seed content |
| --- | --- | --- |
| `/about-us` | `site/about-us.html` | Hero “Your #1 Partner for 360° Compliance Solutions”; 13+/100+/4.8 proof stats; the five Our Mantra cards; six dated timeline events (2013–14 through 2022); four “Why partner with us?” cards; Pioneers stats; 14 JRians; five achievement cards; final Contact Us CTA. |
| `/careers` | `site/careers.html` | Hero, Vision/Mission, four values, culture gallery, five active openings, four benefits, six unique employee testimonials, four career FAQs, and final Contact Us CTA. Preserve job labels but have an editor validate legacy department/category inconsistencies before publishing. |
| `/contact-us` | `site/contact-us.html` | “Let's Ensure Your Compliance Together”; phone, email, Bawana office address; direct-contact copy; future form labels/consent/success/error copy; final CTA anchored to the contact options. Do not copy the commented legacy Bitrix webhook or its credential-like URL. |
| `/corporate/[slug]` (nineteen Company Registration routes) | Matching approved files under `site/corporate/` | Page-specific SEO, hero, overview, four challenges, four advantages, six process steps, Why JR cards, Eligibility/Documents/Who Needs It breakdown, FAQs, and shared final CTA. Exclude the duplicated private-company challenge block, hidden placeholder processes/tabs/resources, copied testimonials, Webflow lead form, and all legacy UI/transport code. |

Copy the approved media into Strapi Media Library first. The local Next.js
fallback copies are development safety nets only; a published Strapi record
should use its own approved media relation and alternative text.

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
| **`next-site-reader` API token** | Custom, read-only: `find` for `site-setting`, `home-page`, `about-page`, `careers-page`, and `contact-page`; `find` and `findOne` for `company-registration-page` and every listed supporting collection type; Upload `find`. No create, update, delete, publish, or admin access. Store only as `STRAPI_API_TOKEN` on the Next server. |
| **Content Editor admin role** | Content Manager create/read/update for the listed types and Media Library upload/edit. No schema access and no delete permission. |
| **Publisher/Admin role** | Editor permissions plus publish. Content Type Builder remains development-only and developer-owned. |

Use these generated endpoints:

```text
GET /api/site-setting?status=published
GET /api/home-page?status=published
GET /api/about-page?status=published
GET /api/careers-page?status=published
GET /api/contact-page?status=published
GET /api/company-registration-pages?filters[slug][$eq]=<slug>&status=published
```

Strapi does not populate relations, components, or media by default. The Next
CMS client must attach one centralized, explicit populate object for every
route request (hero/card media, logo media, category → services → icon, FAQ
category → FAQs, testimonial media, recognition media, team media, careers
gallery media, and SEO share images). Do not use unbounded deep-population
plugins or issue a browser request per card. The API token is sent as
`Authorization: Bearer <token>` by the Next server only.

## Onboarding checklist

1. Create a Strapi v5 TypeScript project inside `cms/` (or point this folder to
   the separately deployed CMS) and configure SQLite only for local development;
   use PostgreSQL plus production secrets for deployment.
2. Set `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
   `ENCRYPTION_KEY`, database values, the upload-provider credentials, and the
   public CMS URL. Never commit them.
3. In local development, create the components above first, then the homepage
   and editorial collection types, then `site-setting`, `home-page`,
   `about-page`, `careers-page`, `contact-page`, and the dedicated
   `company-registration-page` collection. Enable Draft & Publish on all of
   them. Commit Strapi’s generated schemas to git; do not create schema changes
   directly in production.
4. Configure the media provider and migrate the approved legacy images/logos.
   Add filename, alt text, and captions before selecting them in content.
5. Create the service categories/services, logos, FAQ categories/FAQs,
   testimonials, recognitions, and optional insights. Set `sortOrder` values.
6. Fill and publish `site-setting`, including the ordered Header Menu categories
   and their ordered links, then fill the four single-page records and one
   Company Registration record for each approved slug. Select the intended
   ordered relations and verify every link and media item. An existing local
   SQLite CMS may use the one-time
   `SEED_COMPANY_REGISTRATION_PAGES=true` backfill to create only missing
   approved slugs; it is refused in production and never updates an existing
   record.
7. Create the `next-site-reader` custom API token and apply the permissions
   above. Put `STRAPI_URL` and `STRAPI_API_TOKEN` in the Next server environment
   (never `NEXT_PUBLIC_*`).
8. Wire the typed route fetchers to the five single-type endpoints and the
   exact-slug registration collection query with explicit populate contracts,
   render only published data, and add signed Strapi publish webhooks to
   invalidate the matching Next cache tags.
9. Test with an editor: change home or route hero copy, reorder a service/team
   member/opening, replace media, save a draft, publish it, and confirm the
   live page updates without a code change.

Useful Strapi references: [Content-Type Builder](https://docs.strapi.io/cms/features/content-type-builder), [REST API](https://docs.strapi.io/cms/api/rest), and [API tokens](https://docs.strapi.io/cms/features/api-tokens).
