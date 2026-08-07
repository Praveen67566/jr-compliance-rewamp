# JR Compliance frontend

The active frontend is a Next.js 16 App Router rebuild of the JR Compliance
home page plus `/about-us`, `/careers`, and `/contact-us`. It is intentionally
separate from the legacy Webflow export in `../site`.

## Run locally

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

`npm run dev` uses [http://localhost:8123](http://localhost:8123) so the project
does not conflict with another service on port 3000. `npm run start` defaults to
that port locally and honors a host-provided `PORT` in production.

For a production deployment, see [../prod.md](../prod.md).

Copy `.env.example` to `.env.local` only when a Strapi instance is available.
Without `STRAPI_URL`, each route renders its typed local content in
`data/*-page-fallback.ts`.

Set `SITE_URL` to the deployed public origin. It keeps any site-relative CMS
canonical URL absolute in generated metadata; it does not expose credentials.

## Content architecture

- `data/*-page-fallback.ts` is the safe, normalized legacy-content fallback
  while Strapi is not live.
- `lib/types.ts` defines the shared shell and page UI contracts.
- `lib/strapi.ts` is a server-only Strapi v5 adapter. It uses explicit REST
  population and maps `site-setting`, `home-page`, `about-page`,
  `careers-page`, and `contact-page` into the UI contracts.
- CMS link targets, collection `sortOrder` values, shared footer groups, and
  shared SEO are carried through the typed adapter rather than hard-coded in
  individual routes.
- `components/site-page-shell.tsx` centralizes the shared header/footer;
  `components/editorial/` centralizes the Compliance Network route primitives.
- The CMS schema and editor setup are documented in `../cms/CONTENT_MODEL.md`.

## CMS publish revalidation

The frontend exposes `POST /api/revalidate` for signed Strapi publish events.
Set `STRAPI_REVALIDATE_SECRET` on this app and the same value on the CMS. The
CMS uses `NEXT_REVALIDATE_URL` for this endpoint and sends the raw JSON payload
with `X-Strapi-Signature: sha256=<HMAC-SHA256 payload>`, plus the optional
`X-Strapi-Event` header and recognized cache tags for related collections or
media. The receiver verifies the HMAC in constant time and immediately expires
only the recognized Next 16 cache tags. Never place either secret in a
`NEXT_PUBLIC_*` variable.

Do not import legacy Webflow styles, scripts, or markup. Use the matching file
under `../site/` only to verify approved content and media, then build original
components. The visual contract for every new route is `../theme.md`.
