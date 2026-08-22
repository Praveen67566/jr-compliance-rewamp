# Strapi v5 content model — homepage, editorial, registration, legal, and Global routes

This is the CMS contract for the new Next.js homepage, the initial editorial
routes (About Us, Careers, Contact Us), the nineteen approved Company
Registration routes, the first approved routes for MCA Services, Import Export
Service, Government License & Certification, IPR Services, FSSAI, SEBI
Business Registration, Tax and Accounting, Labour Compliance, and Fund Raising,
and the first approved Approval routes for Bureau of Indian Standards and
Pollution Advisory. Seven additional Approval families—Telecommunication
Engineering Centre, Wireless Planning and Coordination, Bureau of Energy
Efficiency, CDSCO Registration, AERB Approval, LMPC Certification, and STQC—
have empty CMS-only collections with no bundled first pages, fallbacks, seed
mirrors, or initial records. The model preserves useful legacy content from the
corresponding `site/*.html`, `site/corporate/*.html`, and
`site/approval/*.html` files, but does not preserve Webflow UI. Layout, motion,
colours, and responsive behaviour belong in Next.js; editors own copy, links,
ordering, SEO, and approved media.

Two additional collections provide the separate CMS-only Global system:
`global-country-page` renders `/globals/[country]`, and
`global-certificate-page` renders `/globals/[country]/[slug]`. Both begin empty
and use dedicated fixed Global contracts and shared templates. The legacy
Global HTML files informed structure only; no page copy, fallback, seed,
initial record, Webflow UI, or remote media URL is bundled.

One dedicated fixed `legal-page` collection owns `/privacy-policy`,
`/terms-and-conditions`, and `/purchase-and-billing`. These records reuse the
existing `shared.legal-notice` component, mirror the approved legacy wording in
typed frontend fallback data and a historical CMS JSON source, and do not widen
the model into a generic page builder.

The committed schema contains five single types, thirty-six collection types,
and fifty-nine components: forty-one content types in total. Nineteen of the
collections use the fixed service-detail contract; that count does not include
the legal collection or the two Global collections.

Use named fields rather than a page-builder dynamic zone for these initial routes.
That makes the front-end contract stable and easy for non-technical editors to
use. Do not create a generic `Page`, navigation collection, or separate design
settings type in this phase.

All listed content types use **Draft & Publish**. Start with English only
(i18n disabled); enable i18n on every content type together before adding a
second locale.

## Single types

### `site-setting` — API: `api::site-setting.site-setting`

One global record used by the shared header, footer, and centralized expert
consultation form.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `siteName` | Short text | Required |
| `headerLogo` | Media, single image | Required |
| `footerLogo` | Media, single image | Required |
| `headerMenu` | Repeatable `navigation.menu-item` component | Required |
| `loginButtonEnabled` | Boolean | Optional; defaults to `false` |
| `loginButtonHref` | Short text | Optional site-relative or absolute href; Login renders only when this is set and `loginButtonEnabled` is on |
| `headerCta` | `shared.cta` component | Optional |
| `footerTagline` | Long text | Required |
| `footerCta` | `shared.cta` component | Optional |
| `footerLinkGroups` | Repeatable `navigation.link-group` component | Required |
| `contact` | `shared.contact` component | Required |
| `legalLinks` | Repeatable `shared.link` component | Required |
| `legalNotices` | Repeatable `shared.legal-notice` component | Optional; holds Disclaimer and Intellectual Property copy |
| `socialLinks` | Repeatable `shared.social-link` component | Required |
| `copyrightText` | Short text | Required |
| `leadForm` | `shared.lead-form-settings` component | Optional for backwards-compatible rollout; when absent, the frontend uses its typed form fallback |
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
media. The live submission workflow belongs in Next.js/server infrastructure;
only global form copy belongs in `site-setting.leadForm`.

| Field | Strapi field | Rules / relation |
| --- | --- | --- |
| `hero` | `contact.hero` component | Required; eyebrow, title, description |
| `contactPoints` | Repeatable `contact.point` component | Required; one each for phone, email, and office location |
| `enquiry` | `contact.enquiry` component | Required; secondary direct-contact CTA and supporting note |
| `response` | `contact.response` component | Required; heading and ordered connection steps |
| `finalCta` | `home.cta-band` component | Required |
| `seo` | `shared.seo` component | Required |

## Collection types

All `sortOrder` values are required integers, minimum `0`. The front end sorts
children by this field as a safe fallback; each route's explicit relations
determine which entries appear on that route.

### `legal-page` — API: `api::legal-page.legal-page`

Exactly one published record is allowed for each fixed footer route:
`/privacy-policy`, `/terms-and-conditions`, and `/purchase-and-billing`. This is
a dedicated legal-content contract, not a generic page builder or dynamic
zone.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `slug` | UID from `title` | Required; must match exactly `privacy-policy`, `terms-and-conditions`, or `purchase-and-billing` |
| `eyebrow` | Short text | Required; short label above the H1 |
| `introduction` | Rich Text (Blocks) | Optional; ordered introductory paragraphs and links before the first section |
| `sections` | Repeatable `shared.legal-notice` | Required, minimum one; editor order controls the section/anchor order, while each component preserves its heading and Blocks body |
| `seo` | `shared.seo` | Required; metadata, canonical URL, optional share image, and indexing choice |
| `sortOrder` | Integer, `0` to `2` | Required; Privacy Policy `0`, Terms and Conditions `1`, Purchase and Billing `2` |

The approved content exists in matching order in
`frontend/data/legal-pages-fallback.ts` and the historical CMS mirror
`cms/src/seed/legal-pages.json`. The normal bootstrap does not seed or backfill
these records into the active PostgreSQL database. After deploying the schema,
review and create/publish the three records through Content Manager, or import
them through the reviewed Strapi `content,files` transfer workflow after the
required backups. Until then, the three frontend routes use their typed
fallback records.

Site Setting bootstrap migration is separate from record creation. It replaces
the exact original three `#legal` footer-link signature with the three internal
routes above, and only when no editor has a pending Site Setting draft. Any
customized or partially migrated legal-link list is preserved.

### `company-registration-page` — API: `api::company-registration-page.company-registration-page`

One published record per approved `/corporate/[slug]` route. This is a fixed
service-detail contract, not a generic page builder.

Across all nineteen fixed service-detail collections, three fields are optional
for backwards-compatible rollout. `trustedLogos` renders immediately after
`hero`, `youtubeVideos` renders immediately after `whyChoose`, and `tickerCta`
renders after `breakdown` and immediately before `faqs`. None changes the
existing required sections, and no seed, fallback, or database backfill
populates them.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the Company Registration navbar label |
| `slug` | UID from `title` | Required; exact route segment |
| `hero` | `registration.hero` | Required |
| `trustedLogos` | Relation | Optional many-to-many selection of client `brand-logo` records; editor order is display order |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered six-step process |
| `whyChoose` | `registration.card-section` | Required; ordered JR Compliance reasons |
| `youtubeVideos` | `registration.youtube-video-section` | Optional; heading and ordered relevant YouTube videos |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `tickerCta` | `home.cta-band` | Optional; “Let’s Talk Compliance”-style ticker content |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

### `mca-service-page` — API: `api::mca-service-page.mca-service-page`

One published record per approved MCA Services `/corporate/[slug]` route. The
first approved record is `dsc-certificate`. It uses the same fixed
service-detail sequence as Company Registration while remaining a separate,
MCA-specific collection rather than a generic page builder. Later approved MCA
records can be published in Strapi and render on demand only when every
required fixed field is complete.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the MCA Services navbar label |
| `slug` | UID from `title` | Required; exact route segment and globally unique across every `/corporate/[slug]` collection |
| `hero` | `registration.hero` | Required |
| `trustedLogos` | Relation | Optional many-to-many selection of client `brand-logo` records; editor order is display order |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered service process |
| `whyChoose` | `registration.card-section` | Required; ordered JR Compliance reasons |
| `youtubeVideos` | `registration.youtube-video-section` | Optional; heading and ordered relevant YouTube videos |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `tickerCta` | `home.cta-band` | Optional; “Let’s Talk Compliance”-style ticker content |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

### `import-export-service-page` — API: `api::import-export-service-page.import-export-service-page`

One published record per approved Import Export Service `/corporate/[slug]`
route. The first approved record is `iec-registration`. Later complete records
can be created and published only in Strapi; they render through the same fixed
service-detail template without a new React route or local fallback.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the Import Export Service navbar label |
| `slug` | UID from `title` | Required; exact route segment and globally unique across every `/corporate/[slug]` collection |
| `hero` | `registration.hero` | Required |
| `trustedLogos` | Relation | Optional many-to-many selection of client `brand-logo` records; editor order is display order |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered service process |
| `whyChoose` | `registration.card-section` | Required; ordered JR Compliance reasons |
| `youtubeVideos` | `registration.youtube-video-section` | Optional; heading and ordered relevant YouTube videos |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `tickerCta` | `home.cta-band` | Optional; “Let’s Talk Compliance”-style ticker content |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

### `government-license-certification-page` — API: `api::government-license-certification-page.government-license-certification-page`

One published record per approved Government License & Certification
`/corporate/[slug]` route. The first approved record is `ayush-license`.
Later complete records can be created and published only in Strapi; they use
the same fixed service-detail template without borrowing Ayush content.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the Government License & Certification navbar label |
| `slug` | UID from `title` | Required; exact route segment and globally unique across every `/corporate/[slug]` collection |
| `hero` | `registration.hero` | Required |
| `trustedLogos` | Relation | Optional many-to-many selection of client `brand-logo` records; editor order is display order |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered service process |
| `whyChoose` | `registration.card-section` | Required; ordered JR Compliance reasons |
| `youtubeVideos` | `registration.youtube-video-section` | Optional; heading and ordered relevant YouTube videos |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `tickerCta` | `home.cta-band` | Optional; “Let’s Talk Compliance”-style ticker content |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

### `ipr-service-page` — API: `api::ipr-service-page.ipr-service-page`

One published record per approved IPR Services `/corporate/[slug]` route. The
first approved record is `trademark-registration`. Later complete records can
be created and published only in Strapi; they use the same fixed service-detail
template without borrowing Trademark Registration content.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the IPR Services navbar label |
| `slug` | UID from `title` | Required; exact route segment and globally unique across every `/corporate/[slug]` collection |
| `hero` | `registration.hero` | Required |
| `trustedLogos` | Relation | Optional many-to-many selection of client `brand-logo` records; editor order is display order |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered service process |
| `whyChoose` | `registration.card-section` | Required; ordered fixed-slot cards (Trademark currently uses its six source pricing packages) |
| `youtubeVideos` | `registration.youtube-video-section` | Optional; heading and ordered relevant YouTube videos |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `tickerCta` | `home.cta-band` | Optional; “Let’s Talk Compliance”-style ticker content |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

### `fssai-service-page` — API: `api::fssai-service-page.fssai-service-page`

One published record per approved FSSAI `/corporate/[slug]` route. The first
approved record is `fssai-certificate`. Later complete records can be created
and published only in Strapi; they use the same fixed service-detail template
without borrowing FSSAI Basic Registration content.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the FSSAI navbar label |
| `slug` | UID from `title` | Required; exact route segment and globally unique across every `/corporate/[slug]` collection |
| `hero` | `registration.hero` | Required |
| `trustedLogos` | Relation | Optional many-to-many selection of client `brand-logo` records; editor order is display order |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered service process |
| `whyChoose` | `registration.card-section` | Required; ordered JR Compliance reasons |
| `youtubeVideos` | `registration.youtube-video-section` | Optional; heading and ordered relevant YouTube videos |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `tickerCta` | `home.cta-band` | Optional; “Let’s Talk Compliance”-style ticker content |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

### `sebi-business-registration-page` — API: `api::sebi-business-registration-page.sebi-business-registration-page`

One published record per approved SEBI Business Registration
`/corporate/[slug]` route. The first approved record is
`portfolio-manager-registration`. Later complete records can be created and
published only in Strapi; they use the same fixed service-detail template
without borrowing Portfolio Manager Registration content.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; matches the SEBI Business Registration navbar label |
| `slug` | UID from `title` | Required; exact route segment and globally unique across every `/corporate/[slug]` collection |
| `hero` | `registration.hero` | Required |
| `trustedLogos` | Relation | Optional many-to-many selection of client `brand-logo` records; editor order is display order |
| `overview` | `registration.overview` | Required |
| `challenges` | `registration.card-section` | Required; ordered page-specific cards |
| `advantages` | `registration.card-section` | Required; ordered page-specific cards |
| `process` | `registration.card-section` | Required; ordered service process |
| `whyChoose` | `registration.card-section` | Required; ordered JR Compliance reasons |
| `youtubeVideos` | `registration.youtube-video-section` | Optional; heading and ordered relevant YouTube videos |
| `breakdown` | `registration.breakdown-section` | Required; Eligibility, Documents, Who Needs It |
| `tickerCta` | `home.cta-band` | Optional; “Let’s Talk Compliance”-style ticker content |
| `faqs` | `registration.faq-section` | Required |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; route editorial order |

### `tax-accounting-page` — API: `api::tax-accounting-page.tax-accounting-page`

One published record per approved Tax and Accounting `/corporate/[slug]`
route. The first approved record is `gst-registration`. Later complete records
can be published only in Strapi and use the same fixed required fields and
validation rules as `mca-service-page`, with `menuLabel` matching the Tax and
Accounting navbar label.

### `labour-compliance-page` — API: `api::labour-compliance-page.labour-compliance-page`

One published record per approved Labour Compliance `/corporate/[slug]` route.
The first approved record is `shop-and-establishment-act-registration`. Later
complete records can be published only in Strapi and use the same fixed required
fields and validation rules as `mca-service-page`, with `menuLabel` matching the
Labour Compliance navbar label.

### `fund-raising-page` — API: `api::fund-raising-page.fund-raising-page`

One published record per approved Fund Raising `/corporate/[slug]` route. The
first approved record is `msme-registration`. Later complete records can be
published only in Strapi and use the same fixed required fields and validation
rules as `mca-service-page`, with `menuLabel` matching the Fund Raising navbar
label.

### `bureau-indian-standards-page` — API: `api::bureau-indian-standards-page.bureau-indian-standards-page`

One published record per approved Bureau of Indian Standards
`/approval/[...slug]` path. The first approved record is `isi-certificate`.
Later complete records can be published only in Strapi and use the same fixed
required fields and validation rules as `mca-service-page`, with `menuLabel`
matching the Bureau of Indian Standards navbar label. The stored `slug` may be
a flat route segment or a slash-separated nested Approval path and must be
globally unique across all nine Approval service collections.

The Approval `slug` UID uses the route-safe pattern
`^[A-Za-z0-9-_.~]+(?:/[A-Za-z0-9-_.~]+)*$`, so editors may enter nested paths
such as `bis-certification/fmcs-bis-certification` without spaces or query
characters.

### `pollution-advisory-page` — API: `api::pollution-advisory-page.pollution-advisory-page`

One published record per approved Pollution Advisory `/approval/[...slug]`
path. The first approved record is `epr-certification`. Later complete records
can be published only in Strapi and use the same fixed required fields and
validation rules as `mca-service-page`, with `menuLabel` matching the Pollution
Advisory navbar label. The stored `slug` may be a flat route segment or a
slash-separated nested Approval path and must be globally unique across all
nine Approval service collections.

### Empty CMS-only Approval collections

These seven collections start with no content record. Their singular API keys
and generated plural REST paths are fixed as follows:

| Approval family | Singular API key | REST collection path |
| --- | --- | --- |
| Telecommunication Engineering Centre (TEC) | `telecommunication-engineering-centre-page` | `telecommunication-engineering-centre-pages` |
| Wireless Planning and Coordination (WPC) | `wireless-planning-coordination-page` | `wireless-planning-coordination-pages` |
| Bureau of Energy Efficiency (BEE) | `bureau-energy-efficiency-page` | `bureau-energy-efficiency-pages` |
| CDSCO Registration | `cdsco-registration-page` | `cdsco-registration-pages` |
| AERB Approval | `aerb-approval-page` | `aerb-approval-pages` |
| LMPC Certification | `lmpc-certification-page` | `lmpc-certification-pages` |
| STQC | `stqc-page` | `stqc-pages` |

There is no category-level public slug. Each record stores its own flat or
slash-separated relative path in `slug` and renders at `/approval/<slug>`.
These collections have no local fallback modules or historical seed JSON; if
Strapi is unavailable, their paths return 404 by design. They are fixed
detail-page families, not records in the separate Home Service Stack
`service-category` collection.

All nine Approval collections use the same fixed fields as the other
service-detail collections: required `title`, `menuLabel`, route-safe `slug`,
`hero`, optional `trustedLogos`, `overview`, `challenges`, `advantages`,
`process`, `whyChoose`, optional `youtubeVideos`, `breakdown`, optional
`tickerCta`, `faqs`, `finalCta`, `seo`, and `sortOrder`. Every CMS-only record
must complete all required nested
content before publication; the frontend returns 404 for an incomplete record
and never copies content from another page or category.

For each optional video item, enter a visible title and an HTTPS single-video
URL using `youtube.com/watch`, `/shorts`, `/embed`, or `/live`, `youtu.be`, or
`youtube-nocookie.com/embed`. The frontend rejects unsupported hosts, malformed
URLs, playlist-only links, and invalid video IDs; invalid optional video data
is omitted without invalidating the rest of the service record.

#### Editor workflow for a CMS-only Approval page

1. Open the intended family collection in Strapi Content Manager.
2. Create a record and complete `title`, `menuLabel`, every required fixed
   content section, SEO, and `sortOrder`. Add **Trusted Logos**, **YouTube
   Videos**, and **Ticker CTA** only when approved content is available.
3. Enter a route-safe relative `slug` with no leading slash. Manually verify
   that the full path is unique across all nine Approval collections because a
   Strapi UID is unique only within its own collection.
4. Save and publish the complete record.
5. Open **Site Setting → Header Menu**, point the matching navigation link to
   `/approval/<slug>`, and publish Site Setting.
6. Verify the public page, metadata, navigation link, and sitemap entry. No
   React route, fallback file, seed mirror, or deployment is required for that
   content record.

### CMS-only Global collections

The two Global collections begin with no content records. They have no local
fallback modules, seed JSON, sample content, or initial CMS entries. Their
schemas support two shared frontend templates without changing or reusing the
completed Corporate and Approval contracts.

The country page `slug`, certificate `countrySlug`, and certificate `slug` all
use the single-segment route pattern `^[A-Za-z0-9-_.~]+$`. Do not enter
`/globals/`, a leading slash, another slash, spaces, query parameters, or
fragments. Manually keep every
`countrySlug` + `slug` certificate pair unique because these string fields are
not a composite database UID.

#### `global-country-page` — API: `api::global-country-page.global-country-page`

One complete published record per `/globals/[country]` landing page.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; editor-facing navigation label |
| `slug` | UID from `title` | Required; exact single route segment matching `[country]` |
| `hero` | `global.country-hero` | Required; eyebrow, description, image, and CTA; parent `title` is the H1 |
| `certificates` | `global.certificate-listing` | Required; heading and at least one ordered, complete certificate card |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; discovery/editorial order |

#### `global-certificate-page` — API: `api::global-certificate-page.global-certificate-page`

One complete published record per `/globals/[country]/[slug]` certificate
page. The fixed scope section is neutral so editors may describe products,
documents, or requirements without introducing a page builder.

| Field | Strapi field | Rules |
| --- | --- | --- |
| `title` | Short text | Required; public H1 and CMS record name |
| `menuLabel` | Short text | Required; certificate/card label |
| `countryName` | Short text | Required; human-readable country name |
| `countrySlug` | Short text | Required; exact single route segment matching `[country]` |
| `slug` | Short text | Required; exact single route segment matching certificate `[slug]` |
| `hero` | `global.certificate-hero` | Required; eyebrow, description, and CTA; parent `title` is the H1 |
| `overview` | `global.overview` | Required; heading and at least one ordered paragraph |
| `scope` | `global.scope-section` | Required; heading and at least one ordered scope item |
| `process` | `global.process-section` | Required; heading, at least one ordered step, and optional image |
| `ourRole` | `global.role-section` | Required; heading, at least one ordered assistance item, and CTA |
| `conclusion` | `global.conclusion` | Required; heading, at least one ordered paragraph, and CTA |
| `finalCta` | `home.cta-band` | Required |
| `seo` | `shared.seo` | Required |
| `sortOrder` | Integer, minimum `0` | Required; discovery/editorial order |

Every selected country hero image and certificate-card logo must include Media
Library alternative text. The optional process image must include alternative
text when selected. Every CTA/link needs a label, href, and target; every SEO
record needs `metaTitle` and `metaDescription`. Each repeatable section must
contain at least one fully populated item. The frontend strictly validates all
of these requirements and returns 404 for a draft, unpublished, incomplete,
unknown, or unavailable record rather than filling it with another page's
content.

#### Editor workflow for Global pages

1. Create and complete a **Global Country Page**, save it, and publish it.
2. Add its exact `/globals/<country>` URL under **Site Setting → Header Menu →
   Global**, then publish Site Setting. Publishing the country record alone
   does not add a navbar link.
3. Create and publish complete **Global Certificate Page** records using the
   same exact country segment.
4. Add each certificate's exact `/globals/<country>/<slug>` destination to the
   appropriate country record's ordered card, then republish the country.
5. Verify both public templates, metadata, navigation, card links, and sitemap
   entries. The existing two dynamic route files discover complete records; no
   fallback, seed, individual React page, or code deployment is required.

| Type (API) | Fields | Relations |
| --- | --- | --- |
| **Service Category** (`service-category`, `service-categories`) | `name` short text*, `slug` UID from `name`*, `description` long text, `sortOrder` integer* | `services`: **one-to-many** to Service (inverse of `serviceCategory`) |
| **Service** (`service`, `services`) | `title` short text*, `slug` UID from `title`*, `summary` long text, `icon` single image media*, `link` `shared.link`*, `sortOrder` integer* | `serviceCategory`: **many-to-one** to Service Category* |
| **Brand Logo** (`brand-logo`, `brand-logos`) | `name` short text*, `kind` enum `client` / `regulator`*, `logo` single image media*, `sortOrder` integer*, `websiteUrl` short text | Selected by the Home Page logo relations and the optional fixed-service `trustedLogos` relations; no inverse field |
| **Testimonial** (`testimonial`, `testimonials`) | `quote` long text*, `personName` short text*, `personRole` short text, `companyName` short text, `personPhoto` single image media, `companyLogo` single image media, `publishedOn` date, `sortOrder` integer* | Selected by Home Page |
| **Recognition** (`recognition`, `recognitions`) | `category` short text*, `title` short text*, `excerpt` long text*, `sourceName` short text, `sourceLogo` single image media, `coverImage` single image media, `link` `shared.link`*, `sortOrder` integer* | Selected by Home Page |
| **FAQ Category** (`faq-category`, `faq-categories`) | `name` short text*, `slug` UID from `name`*, `icon` single image media, `sortOrder` integer* | `faqs`: **one-to-many** to FAQ (inverse of `faqCategory`) |
| **FAQ** (`faq`, `faqs`) | `question` short text*, `answer` Rich Text (Blocks)*, `sortOrder` integer* | `faqCategory`: **many-to-one** to FAQ Category* |
| **Insight** (`insight`, `insights`) | `title` short text*, `summary` long text*, `kind` enum `article` / `video`*, `image` single image media*, `link` `shared.link`*, `publishedOn` date, `sortOrder` integer* | Selected by Home Page |

`*` means required. No collection entry should be hard-deleted when it may be
referenced; unpublish it first and remove it from every page relation.

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
relations deliberately live on their parent content types—including fixed
service `trustedLogos`—or the two parent/child collection pairs above.

| Component UID | Exact fields |
| --- | --- |
| `shared.link` | `label` short text*, `href` short text* (absolute URL or site-relative path), `target` enum `same_tab` / `new_tab`* (default `same_tab`) |
| `shared.cta` | `label` short text*, `href` short text*, `target` enum `same_tab` / `new_tab`* (default `same_tab`) |
| `shared.section-heading` | `eyebrow` short text, `titleBefore` short text, `titleHighlight` short text, `titleAfter` short text, `description` long text, `alignment` enum `left` / `center`* (default `left`) |
| `shared.seo` | `metaTitle` short text*, `metaDescription` long text*, `shareImage` single image media, `canonicalUrl` short text, `noIndex` boolean (default `false`) |
| `shared.contact` | `phoneDisplay` short text*, `phoneE164` short text*, `email` email*, `whatsAppUrl` short text* |
| `shared.social-link` | `network` enum `linkedin` / `facebook` / `x` / `youtube` / `instagram`*, `url` short text* |
| `shared.legal-notice` | `title` short text*, `body` Rich Text (Blocks)*; reused for Site Setting footer notices and ordered `legal-page.sections` |
| `shared.lead-form-settings` | `enabled` boolean* (default `true`), `heading` short text*, `subtitle` short text*, `nameLabel` short text*, `namePlaceholder` short text*, `emailLabel` short text*, `emailPlaceholder` short text*, `phoneLabel` short text*, `phonePlaceholder` short text*, `messageLabel` short text*, `messagePlaceholder` short text*, `consentText` long text*, `privacyLink` `shared.link`*, `submitLabel` short text*, `submittingLabel` short text*, `successTitle` short text*, `successMessage` long text*, `redirectPath` short text*, `secureLabel` short text*, `durationLabel` short text*, `noSpamLabel` short text*, `trustHeading` short text, `trustDescription` long text, `trustItems` repeatable `shared.lead-form-trust-item`, `experienceText` short text. The message itself is always required by the form and submission API; the CMS exposes no optional-message switch. |
| `shared.lead-form-trust-item` | `name` short text*, `logo` single image media, `link` `shared.link` component; items render in editor order and may fall back to their name when no logo is selected |
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
| `registration.youtube-video` | `title` short text*, `youtubeUrl` short text* |
| `registration.youtube-video-section` | `eyebrow` short text*, `title` short text*, `description` long text, `videos` repeatable `registration.youtube-video`* (minimum 1) |
| `registration.breakdown-group` | `title` short text*, `items` repeatable `registration.text-item`* |
| `registration.breakdown-section` | `eyebrow` short text*, `title` short text*, `groups` repeatable `registration.breakdown-group`* |
| `registration.faq-item` | `question` short text*, `answer` long text* |
| `registration.faq-section` | `eyebrow` short text*, `title` short text*, `items` repeatable `registration.faq-item`* |

### Global-route components

These eleven components form the two fixed Global templates. They do not form
a dynamic zone and do not count as fixed service-detail components.

| Component UID | Exact fields |
| --- | --- |
| `global.country-hero` | `eyebrow` short text*, `description` long text*, `image` single image media*, `cta` `shared.cta`*; parent country `title` supplies the H1 |
| `global.certificate-card` | `logo` single image media*, `title` short text*, `description` long text*, `link` `shared.cta`* |
| `global.certificate-listing` | `eyebrow` short text*, `title` short text*, `description` long text, `cards` repeatable `global.certificate-card`* (minimum 1) |
| `global.certificate-hero` | `eyebrow` short text*, `description` long text*, `cta` `shared.cta`*; parent certificate `title` supplies the H1 |
| `global.text-item` | `text` long text* |
| `global.overview` | `eyebrow` short text*, `title` short text*, `paragraphs` repeatable `global.text-item`* (minimum 1) |
| `global.scope-section` | `eyebrow` short text*, `title` short text*, `description` long text, `items` repeatable `global.text-item`* (minimum 1) |
| `global.process-step` | `title` short text*, `description` long text* |
| `global.process-section` | `eyebrow` short text*, `title` short text*, `description` long text, `steps` repeatable `global.process-step`* (minimum 1), `image` single image media |
| `global.role-section` | `eyebrow` short text*, `title` short text*, `description` long text, `items` repeatable `global.text-item`* (minimum 1), `cta` `shared.cta`* |
| `global.conclusion` | `eyebrow` short text*, `title` short text*, `paragraphs` repeatable `global.text-item`* (minimum 1), `cta` `shared.cta`* |

## Legacy content to migrate

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

### Editorial-route migration map

Create the route records from only their matching legacy page. Normalise mojibake
(`Letâs`, `360Â°`, em dashes, and non-breaking spaces), but do not editorially
invent claims or silently repair source inconsistencies.

| Route | Legacy source | Imported content |
| --- | --- | --- |
| `/about-us` | `site/about-us.html` | Hero “Your #1 Partner for 360° Compliance Solutions”; 13+/100+/4.8 proof stats; the five Our Mantra cards; six dated timeline events (2013–14 through 2022); four “Why partner with us?” cards; Pioneers stats; 14 JRians; five achievement cards; final Contact Us CTA. |
| `/careers` | `site/careers.html` | Hero, Vision/Mission, four values, culture gallery, five active openings, four benefits, six unique employee testimonials, four career FAQs, and final Contact Us CTA. Preserve job labels but have an editor validate legacy department/category inconsistencies before publishing. |
| `/contact-us` | `site/contact-us.html` | “Let's Ensure Your Compliance Together”; phone, email, Bawana office address; direct-contact copy; final CTA anchored to the contact options. Centralized form copy comes from `site-setting.leadForm`; do not copy the commented legacy Bitrix webhook or its credential-like URL. |
| `/privacy-policy` | `site/privacy-policy.html` | Preserve the approved Privacy Policy title, introduction, consent wording, section headings, paragraphs, lists, links, and contact information in ordered Blocks content. Exclude all Webflow markup, CSS, JavaScript, classes, forms, tracking scripts, and `data-wf-*` attributes. |
| `/terms-and-conditions` | `site/terms-and-conditions.html` | Preserve the approved Terms and Conditions title, introductory provisions, ordered section headings, paragraphs, lists, links, and contact information. Exclude all Webflow UI and transport code. |
| `/purchase-and-billing` | `site/purchase-and-billing.html` | Preserve the approved purchase terms for Services and Products, including their heading hierarchy, paragraphs, lists, links, and contact information. Exclude all Webflow UI, scripts, forms, and tracking code. |
| `/corporate/[slug]` (nineteen Company Registration routes) | Matching approved files under `site/corporate/` | Page-specific SEO, hero, overview, four challenges, four advantages, six process steps, Why JR cards, Eligibility/Documents/Who Needs It breakdown, FAQs, and shared final CTA. Exclude the duplicated private-company challenge block, hidden placeholder processes/tabs/resources, copied testimonials, Webflow lead form, and all legacy UI/transport code. |
| `/corporate/dsc-certificate` (MCA Services) | `site/corporate/dsc-certificate.html` | Page-specific SEO, DSC hero and overview, four DSC challenges, four advantages, six service steps, Why JR cards, Eligibility/Documents/Who Needs It breakdown, FAQs, and shared final CTA. Exclude the copied Private Limited Company blocks, hidden Products/Requirements/process templates/resources, Webflow lead form, and all legacy UI/transport code. |
| `/corporate/iec-registration` (Import Export Service) | `site/corporate/iec-registration.html` | Page-specific IEC SEO, hero and overview, four IEC challenges, four advantages, six service steps, Why JR cards, Eligibility/Documents/Who Needs It breakdown, five FAQs, and shared final CTA. Exclude copied Private Limited Company challenges, hidden Products/process/templates/resources, unrelated testimonials, the Webflow form, and all legacy UI/transport code. |
| `/corporate/ayush-license` (Government License & Certification) | `site/corporate/ayush-license.html` | Page-specific Ayush SEO, hero and overview, four Ayush challenges, four advantages, six service steps, Why JR cards, Eligibility/Documents/Who Needs It breakdown, five FAQs, and shared final CTA. Exclude copied Private Limited Company challenges, hidden Products/process/templates/resources, unrelated testimonials, the Webflow form, and all legacy UI/transport code. |
| `/corporate/trademark-registration` (IPR Services) | `site/corporate/trademark-registration.html` | Page-specific Trademark SEO, hero and overview, six post-application/legal consideration cards, five benefits, six service steps, six Pricing package cards carried in the fixed `whyChoose` slot, Eligibility/Documents/Who Needs It breakdown, five FAQs, and shared final CTA. Exclude duplicated Private Limited Company sections, placeholders, unrelated resources/testimonials, Webflow forms, and all legacy UI/transport code. |
| `/corporate/fssai-certificate` (FSSAI) | `site/corporate/fssai-certificate.html` | Page-specific FSSAI SEO, hero and overview, four service-scope cards, four benefits, six service steps, three Why JR cards, Who Needs It/Eligibility/Documents breakdown, five FAQs, and shared final CTA. Do not use `site/approval/wpc-certification.html`: that legacy destination contains WPC ETA content rather than FSSAI content. Exclude placeholders, unrelated resources/testimonials, Webflow forms, and all legacy UI/transport code. |
| `/corporate/portfolio-manager-registration` (SEBI Business Registration) | `site/corporate/portfolio-manager-registration.html` | Page-specific Portfolio Manager Registration SEO, hero and overview, four challenges, four advantages, six service steps, four Why Choose JR Compliance cards, Eligibility/Documents/Who Needs It breakdown, five FAQs, and shared final CTA. Use the documented and FAQ-consistent `₹5 crore` net-worth requirement throughout rather than the source's isolated conflicting `₹2 crore` statement. Exclude duplicated Private Limited Company sections, placeholders, unrelated resources/testimonials, Webflow forms, and all legacy UI/transport code. |
| `/corporate/gst-registration` (Tax and Accounting) | `site/corporate/gst-registration.html` | Page-specific GST SEO, hero and overview, four challenges, three advantages, six service steps, four Why JR cards, Who Needs/Eligibility/Documents breakdown, five FAQs, and shared final CTA. Exclude copied company-registration sections, hidden placeholders, unrelated resources/testimonials, Webflow forms, and all legacy UI/transport code. |
| `/corporate/shop-and-establishment-act-registration` (Labour Compliance) | `site/corporate/shop-and-establishment-act-registration.html` | Page-specific Shop & Establishment SEO, hero and overview, four challenges, four advantages, six service steps, four source support statements carried in the fixed `whyChoose` slot, Eligibility/Documents/Who Needs breakdown, five FAQs, and shared final CTA. Exclude copied company-registration sections, hidden placeholders, unrelated resources/testimonials, Webflow forms, and all legacy UI/transport code. |
| `/corporate/msme-registration` (Fund Raising) | `site/corporate/msme-registration.html` | Page-specific MSME SEO, hero and overview, four challenges, four advantages, six service steps, four Why JR cards, Eligibility/Documents/Who Needs It breakdown, five FAQs, and shared final CTA. Exclude copied company-registration sections, hidden placeholders, unrelated resources/testimonials, Webflow forms, and all legacy UI/transport code. |
| `/approval/isi-certificate` (Bureau of Indian Standards) | `site/approval/isi-certificate.html` | Page-specific ISI Certification SEO, hero and overview, four challenges, four advantages, six service steps, four Why JR cards, Eligibility/Documents/Who Needs It breakdown, five FAQs, and shared final CTA. Exclude duplicated template sections, hidden placeholders, unrelated testimonials/resources, Webflow forms, and all legacy UI/transport code. |
| `/approval/epr-certification` (Pollution Advisory) | `site/approval/epr-certification.html` | Page-specific EPR SEO, hero and overview, five service-scope items, four benefits, four service steps, three Why JR cards, Documents Required breakdown, five FAQs, and shared final CTA. Exclude duplicated template sections, hidden placeholders, unrelated testimonials/resources, Webflow forms, and all legacy UI/transport code. |

The optional service-page trusted-logo, YouTube, and ticker fields are not
sourced from these legacy pages and are not added to frontend fallbacks or
historical seed JSON. Deploying the schema performs no record backfill;
editors populate the fields selectively after review.

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
  files for service embeds; use a vetted HTTPS single-video YouTube URL in
  `youtubeVideos.videos.youtubeUrl`. Home video CTAs continue to use a vetted
  external URL in `href`.
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
| **`next-site-reader` API token** | Custom, read-only: `find` for `site-setting`, `home-page`, `about-page`, `careers-page`, and `contact-page`; `find` and `findOne` for `legal-page`, all nineteen fixed service-detail collections, including `bureau-indian-standards-page`, `pollution-advisory-page`, `telecommunication-engineering-centre-page`, `wireless-planning-coordination-page`, `bureau-energy-efficiency-page`, `cdsco-registration-page`, `aerb-approval-page`, `lmpc-certification-page`, and `stqc-page`; `find` and `findOne` for `global-country-page` and `global-certificate-page`; plus every listed supporting collection type and Upload `find`. No create, update, delete, publish, or admin access. Store only as `STRAPI_API_TOKEN` on the Next server. |
| **Content Editor admin role** | Content Manager create/read/update for the listed types and Media Library upload/edit. No schema access and no delete permission. |
| **Publisher/Admin role** | Editor permissions plus publish. Content Type Builder remains development-only and developer-owned. |

Deploying a schema does not extend an existing custom API token automatically.
Grant `find` and `findOne` for the `legal-page` API, both Global collection
APIs, and the seven empty Approval collection APIs before an editor expects
newly deployed collection records to render. Public access remains disabled.

Use these generated endpoints:

```text
GET /api/site-setting?status=published
GET /api/home-page?status=published
GET /api/about-page?status=published
GET /api/careers-page?status=published
GET /api/contact-page?status=published
GET /api/legal-pages?filters[slug][$eq]=<privacy-policy|terms-and-conditions|purchase-and-billing>&status=published
GET /api/company-registration-pages?filters[slug][$eq]=<slug>&status=published
GET /api/mca-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/import-export-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/government-license-certification-pages?filters[slug][$eq]=<slug>&status=published
GET /api/ipr-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/fssai-service-pages?filters[slug][$eq]=<slug>&status=published
GET /api/sebi-business-registration-pages?filters[slug][$eq]=<slug>&status=published
GET /api/tax-accounting-pages?filters[slug][$eq]=<slug>&status=published
GET /api/labour-compliance-pages?filters[slug][$eq]=<slug>&status=published
GET /api/fund-raising-pages?filters[slug][$eq]=<slug>&status=published
GET /api/bureau-indian-standards-pages?filters[slug][$eq]=<slug>&status=published
GET /api/pollution-advisory-pages?filters[slug][$eq]=<slug>&status=published
GET /api/telecommunication-engineering-centre-pages?filters[slug][$eq]=<slug>&status=published
GET /api/wireless-planning-coordination-pages?filters[slug][$eq]=<slug>&status=published
GET /api/bureau-energy-efficiency-pages?filters[slug][$eq]=<slug>&status=published
GET /api/cdsco-registration-pages?filters[slug][$eq]=<slug>&status=published
GET /api/aerb-approval-pages?filters[slug][$eq]=<slug>&status=published
GET /api/lmpc-certification-pages?filters[slug][$eq]=<slug>&status=published
GET /api/stqc-pages?filters[slug][$eq]=<slug>&status=published
GET /api/global-country-pages?filters[slug][$eq]=<country>&status=published
GET /api/global-certificate-pages?filters[countrySlug][$eq]=<country>&filters[slug][$eq]=<slug>&status=published
```

Strapi does not populate relations, components, or media by default. The Next
CMS client must attach one centralized, explicit populate object for every
route request (the legal query uses `populate[sections]=true` and
`populate[seo][populate][shareImage]=true`; other trees cover hero/card media,
logo media, Global text/process/CTA fields, category → services → icon, FAQ
category → FAQs, testimonial media, recognition media, team media, careers
gallery media, and SEO share images). Do not use unbounded deep-population
plugins or issue a browser request per card. The API token is sent as
`Authorization: Bearer <token>` by the Next server only.
Global slug/path discovery uses published collection queries with only the
fields needed for static params and sitemap URLs; an empty collection produces
no route.

Signed publish/unpublish/delete revalidation maps `legal-page` to
`jr-legal-pages`, `global-country-page` to `jr-global-country-pages`, and
`global-certificate-page` to `jr-global-certificate-pages`. Brand Logo changes
invalidate the homepage and all nineteen fixed-service cache tags. These tags
are recognized by the frontend receiver and included when a shared Site
Setting or media change requires broad page invalidation. The normal 60-second
cache window remains a fallback.

## Onboarding checklist

1. Create a Strapi v5 TypeScript project inside `cms/` (or point this folder to
   the separately deployed CMS) and configure PostgreSQL for local, staging,
   and production environments. The retained SQLite file is an offline rollback
   source only, not a runtime option.
2. Set `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
   `ENCRYPTION_KEY`, database values, the upload-provider credentials, and the
   public CMS URL. Never commit them.
3. In local development, create the components above first, then the homepage
   and editorial collection types, then `site-setting`, `home-page`,
   `about-page`, `careers-page`, `contact-page`, and the dedicated
   `company-registration-page`, `mca-service-page`, `import-export-service-page`,
   `government-license-certification-page`, `ipr-service-page`,
   `fssai-service-page`, `sebi-business-registration-page`,
   `tax-accounting-page`, `labour-compliance-page`, `fund-raising-page`,
   `bureau-indian-standards-page`, `pollution-advisory-page`,
   `telecommunication-engineering-centre-page`,
   `wireless-planning-coordination-page`, `bureau-energy-efficiency-page`,
   `cdsco-registration-page`, `aerb-approval-page`,
   `lmpc-certification-page`, `stqc-page`, `legal-page`,
   `global-country-page`, and `global-certificate-page` collections. Enable
   Draft & Publish on all of them. Commit Strapi’s generated schemas to git; do
   not create schema changes directly in production.
4. Configure the media provider and migrate the approved legacy images/logos.
   Add filename, alt text, and captions before selecting them in content.
5. Create the service categories/services, logos, FAQ categories/FAQs,
   testimonials, recognitions, and optional insights. Set `sortOrder` values.
6. Fill and publish `site-setting`, including the ordered Header Menu categories
   and their ordered links, then fill the four single-page records and one
   Company Registration record for each approved slug and the approved first
   records for MCA Services, Import Export Service, Government License &
   Certification, IPR Services, FSSAI, SEBI Business Registration, Tax and
   Accounting, Labour Compliance, Fund Raising, Bureau of Indian Standards, and
   Pollution Advisory. Create and publish the three exact Legal Page records in
   `sortOrder` 0–2, and set Site Setting legal links to their matching internal
   routes. Select the intended ordered relations and verify every link and
   media item. Leave the seven new CMS-only Approval collections empty until an
   editor creates the first complete approved record through the workflow
   above. Also leave both Global collections empty until editors create their
   complete country and certificate records in Content Manager. Keep all
   `SEED_*` flags false; the legal JSON mirror is not a normal bootstrap path.
   To populate another PostgreSQL
   target with the approved content, use a reviewed encrypted Strapi
   `content,files` export/import after a verified database and media backup;
   imports replace selected target content and upload files rather than merging
   editor records.
7. Create the `next-site-reader` custom API token and apply the permissions
   above. Put `STRAPI_URL` and `STRAPI_API_TOKEN` in the Next server environment
   (never `NEXT_PUBLIC_*`).
8. Wire the typed route fetchers to the five single-type endpoints, the exact
   allow-listed Legal Page slug query, and all exact-slug service-detail
   collection queries and Approval path queries with explicit populate
   contracts, plus the exact Global country/certificate queries and path
   discovery. Render only published data, and add signed Strapi publish
   webhooks to invalidate the matching Next cache tags.
9. Test with an editor: change home or route hero copy, reorder a service/team
   member/opening, replace media, save a draft, publish it, and confirm the
   live page updates without a code change.

Useful Strapi references: [Content-Type Builder](https://docs.strapi.io/cms/features/content-type-builder), [REST API](https://docs.strapi.io/cms/api/rest), and [API tokens](https://docs.strapi.io/cms/features/api-tokens).
