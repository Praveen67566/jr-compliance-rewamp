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

In cms seo section i need to add more things:-

data is example only don't add any dummy data this all going to added by cms manager.

1. URL = https://www.jrcompliance.com/approval/aerb-license
2. Keywords =  AERB License, AERB Certificate, AERB License Consultant, AERB Certification, AERB Approval, AERB Registration, AERB Certificate For X Ray
3. Schema markup :
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.jrcompliance.com/#organization",
      "name": "JR Compliance",
      "url": "https://www.jrcompliance.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.jrcompliance.com/JRlogo2.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-1800-121-410-410",
        "contactType": "Customer Service",
        "email": "info@jrcompliance.com",
        "areaServed": "IN",
        "availableLanguage": [
          "English",
          "Hindi"
        ]
      },
      "sameAs": [
        "	",
        "https://x.com/JrCompliance",
        "https://www.linkedin.com/company/jr-compliance-%26-testing-labs",
        "https://www.instagram.com/jrcompliance"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.jrcompliance.com/#website",
      "url": "https://www.jrcompliance.com/",
      "name": "JR Compliance",
      "publisher": {
        "@id": "https://www.jrcompliance.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jrcompliance.com/approval/aerb-license/#webpage",
      "url": "https://www.jrcompliance.com/approval/aerb-license",
      "name": "AERB License Consultant | AERB Certificate for X-Ray",
      "description": "Looking for an AERB Certificate for X-ray? Our AERB License Consultants handle registration, certification, approvals, renewals and amendments across India.",
      "keywords": [
        "AERB License",
        "AERB Certificate",
        "AERB Registration",
        "AERB Approval",
        "AERB License Consultant",
        "AERB Certificate for X-Ray"
      ],
      "inLanguage": "en-IN",
      "image": "https://www.jrcompliance.com/images/aerb-license.jpg",
      "isPartOf": {
        "@id": "https://www.jrcompliance.com/#website"
      },
      "about": {
        "@id": "https://www.jrcompliance.com/approval/aerb-license/#service"
      },
      "breadcrumb": {
        "@id": "https://www.jrcompliance.com/approval/aerb-license/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jrcompliance.com/approval/aerb-license/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jrcompliance.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AERB License",
          "item": "https://www.jrcompliance.com/approval/aerb-license"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.jrcompliance.com/approval/aerb-license/#service",
      "name": "AERB License Consultant",
      "serviceType": "AERB Licensing & Registration Consultancy",
      "description": "JR Compliance provides consultancy for AERB registration, certification, approvals, renewals and amendments for hospitals, diagnostic centres, dental clinics and industrial radiography facilities across India.",
      "url": "https://www.jrcompliance.com/approval/aerb-license",
      "image": "https://www.jrcompliance.com/images/aerb-license.jpg",
      "provider": {
        "@id": "https://www.jrcompliance.com/#organization"
      },
      "mainEntityOfPage": {
        "@id": "https://www.jrcompliance.com/approval/aerb-license/#webpage"
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.jrcompliance.com/approval/aerb-license",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "INR"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AERB Licensing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AERB Certificate for X-Ray"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AERB Registration for Medical Radiation Equipment"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Industrial Radiography AERB License"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AERB License Renewal & Amendment"
            }
          }
        ]
      }
    }
  ]
}
</script>

these three things need to be added in seo section and don't add any dummy or seed data also this is going to be for seo so place where it is going to be placed.