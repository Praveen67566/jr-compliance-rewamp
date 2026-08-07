# JR Compliance frontend

The active frontend is a Next.js 16 App Router home page for the JR Compliance
rebuild. It is intentionally separate from the legacy Webflow export in
`../site`.

## Run locally

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Copy `.env.example` to `.env.local` only when a Strapi instance is available.
Without `STRAPI_URL`, the page renders the typed content in
`data/homepage-fallback.ts`.

## Content architecture

- `data/homepage-fallback.ts` is the safe fallback while design/CMS work is in
  progress.
- `lib/types.ts` defines the UI data contract.
- `lib/strapi.ts` is a server-only Strapi v5 adapter. It uses explicit REST
  population and maps CMS fields into that UI contract.
- The CMS schema and editor setup are documented in `../cms/CONTENT_MODEL.md`.

Do not import legacy Webflow styles, scripts, or markup. Use `../site/index.html`
only to verify approved home-page content and media, then build new components.
