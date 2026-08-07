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

`npm run dev` and `npm run start` use [http://localhost:8123](http://localhost:8123)
so the project does not conflict with another service on port 3000.

Copy `.env.example` to `.env.local` only when a Strapi instance is available.
Without `STRAPI_URL`, each route renders its typed local content in
`data/*-page-fallback.ts`.

## Content architecture

- `data/*-page-fallback.ts` is the safe, normalized legacy-content fallback
  while Strapi is not live.
- `lib/types.ts` defines the shared shell and page UI contracts.
- `lib/strapi.ts` is a server-only Strapi v5 adapter. It uses explicit REST
  population and maps `site-setting`, `home-page`, `about-page`,
  `careers-page`, and `contact-page` into the UI contracts.
- `components/site-page-shell.tsx` centralizes the shared header/footer;
  `components/editorial/` centralizes the Compliance Network route primitives.
- The CMS schema and editor setup are documented in `../cms/CONTENT_MODEL.md`.

Do not import legacy Webflow styles, scripts, or markup. Use the matching file
under `../site/` only to verify approved content and media, then build original
components. The visual contract for every new route is `../theme.md`.
