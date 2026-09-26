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

Read bootstrap.md, context.md, theme.md, explaner_frontend.md,
explainer_cms.md, prod.md, and any applicable AGENTS.md before changing files.

Goal:
Integrate Strapi’s built-in MCP server so Codex can create and update draft
service-page records using natural-language prompts, without changing the
existing frontend rendering, routing, fallback, Strapi REST, publication,
revalidation, or deployment flows.

Requirements:

1. Use Strapi’s built-in MCP server. Do not create a separate MCP application
   and do not install @modelcontextprotocol/sdk.

2. Keep the public frontend UI unchanged. Do not modify frontend components,
   routes, types, fallback files, service-route registry, or lib/strapi.ts.

3. Enable MCP in cms/config/server.ts using an environment-controlled boolean
   that defaults to false. Document it safely in cms/.env.example.

4. Do not modify any CMS content-type or component schema.

5. Do not change, rename, expose, or reuse STRAPI_API_TOKEN. MCP must use a
   separate Strapi Admin token supplied by the MCP client through an environment
   variable. Never commit or print the token.

6. Document a least-privilege Admin token named jr-mcp-draft-author:
   - Read/Create/Update for the 19 fixed service-detail collections.
   - Read-only access to supporting logo/media records when required.
   - No Delete.
   - No Publish, Unpublish or Discard Draft.
   - No Content-Type Builder, administrator or Site Setting permissions.

7. Document the Codex connection using:
   codex mcp add jr-strapi --url http://localhost:1337/mcp
   --bearer-token-env-var JR_STRAPI_MCP_ADMIN_TOKEN

8. The installed Strapi version is 5.51.2. Test tool discovery before changing
   dependencies. If Codex or MCP Inspector drops or cannot use the advertised
   tools, stop and report that Strapi 5.53+ is required. Do not upgrade Strapi
   without separate approval.

9. Do not create, publish, update or delete production content. Any write smoke
   test must use an isolated local/staging database and must create a draft only.

10. Test:
    - unauthenticated endpoint rejection;
    - authenticated MCP initialization;
    - tool inventory and permission boundaries;
    - one representative draft creation;
    - invalid and incomplete input rejection;
    - absence of publish/delete tools;
    - existing frontend route behavior and revalidation.

11. Run:
    cd cms && npx tsc --noEmit && npm run build
    cd frontend && npm run test && npm run typecheck && npm run build

12. Update only the necessary CMS documentation. Report every changed file,
    all validation results, and any remaining manual token or client setup.
