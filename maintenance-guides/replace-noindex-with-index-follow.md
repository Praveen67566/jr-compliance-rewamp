# Replace site-wide noindex with index,follow

Use this guide when the website is ready to allow search-engine indexing again.
It restores page-level robots settings from Strapi, with `index,follow` as the
default for pages without a robots setting. Pages explicitly marked `noindex`
in the CMS and the `/thank-you` page keep their individual restrictions.

This file contains instructions only. Creating it does not change the website's
current `noindex,nofollow` behavior.

## Copy-and-paste launch prompt

```text
The JR Compliance website is now ready for public indexing. Read bootstrap.md,
context.md, theme.md, explaner_frontend.md, and prod.md first.

Remove the site-wide noindex,nofollow overrides from frontend/app/layout.tsx,
frontend/lib/page-metadata.ts, and frontend/next.config.ts. Restore each page's
Strapi SEO robots setting, defaulting to index,follow only when no page setting
exists. A true seo.noIndex must take precedence over an index,follow string.
Keep /thank-you and any CMS noindex pages excluded from indexing.

Preserve the public crawling rules in frontend/app/robots.ts, its sitemap URL,
and the private/admin/internal exclusions. Do not block /_next/ assets.
Check /llms.txt and /llms-full.txt: they must return published Strapi content,
direct /corporate/[slug], /approval/[slug], and /global/[slug] canonical URLs,
and no draft, noindex, incomplete, ambiguous, or local-fallback service records.
Use the production SITE_URL for all absolute URLs.

Update the affected robots metadata tests. Run npm test, npm run typecheck, and
npm run build in frontend. Report changed files and results. Prepare the change
for review; do not deploy or change CMS content. Keep the work scoped to launch
indexing and crawler checks.
```

Until that prompt is explicitly used for launch, leave all three site-wide
noindex overrides active. The AI text routes retain the same HTTP restriction.

## 1. Remove the global metadata override

In [`frontend/app/layout.tsx`](../frontend/app/layout.tsx), remove this line from
the exported `metadata` object:

```ts
robots: "noindex,nofollow",
```

## 2. Restore CMS-controlled page metadata

In [`frontend/lib/page-metadata.ts`](../frontend/lib/page-metadata.ts), add this
immediately after `const image` inside `pageMetadata`:

```ts
const robots = seo.noIndex ? "noindex,nofollow" : (seo.robots ?? "index,follow");
```

Inside the returned metadata object, replace:

```ts
// Enforce the site-wide policy even when CMS SEO requests indexing.
robots: "noindex,nofollow",
```

with:

```ts
robots,
```

## 3. Remove the site-wide response-header restriction

In [`frontend/next.config.ts`](../frontend/next.config.ts), remove only this entry
from `securityHeaders`:

```ts
{ key: "X-Robots-Tag", value: "noindex, nofollow" },
```

This header existed before the global HTML metadata changes. Restoring only the
previous metadata behavior leaves this header active and still requests
`noindex,nofollow` for every route. Remove it to allow indexing according to each
page's metadata. Keep the other response headers.

For an exact return to the configuration before the global HTML metadata change,
complete steps 1, 2, and 4 while keeping this header.

## 4. Restore the robots test expectations

In [`frontend/tests/seo-robots.test.ts`](../frontend/tests/seo-robots.test.ts),
replace the test named
`enforces noindex,nofollow for fallback pages and overrides CMS robots directives`
with:

```ts
it("emits the CMS robots directive and defaults fallback pages to index,follow", () => {
  const baseSeo = {
    title: "SEO test page",
    description: "SEO test description",
  };

  assert.equal(pageMetadata(baseSeo, "/seo-test").robots, "index,follow");
  assert.equal(
    pageMetadata({ ...baseSeo, robots: "index,follow" }, "/seo-test").robots,
    "index,follow",
  );
  assert.equal(
    pageMetadata({ ...baseSeo, robots: "noindex,follow" }, "/seo-test").robots,
    "noindex,follow",
  );
  assert.equal(
    pageMetadata({ ...baseSeo, noIndex: true }, "/seo-test").robots,
    "noindex,nofollow",
  );
});
```

## 5. Validate and deploy the frontend

From the repository root, run:

```bash
cd frontend
npx tsx --test tests/seo-robots.test.ts
npm run typecheck
npm run build
```

Deploy and restart the frontend using the frontend-only release procedure in
[`prod.md`](../prod.md). Changing source files alone does not update a deployed
production build.

After deployment, inspect a public page such as `/`:

- Its HTML should contain `<meta name="robots" content="index,follow">` unless
  that page has a different CMS robots setting. Whitespace around the comma may
  vary.
- If step 3 was completed, its response should no longer contain the site-wide
  `X-Robots-Tag: noindex, nofollow` header.
- `/thank-you` should continue to emit `noindex,nofollow`.

Leave [`frontend/app/robots.ts`](../frontend/app/robots.ts) unchanged; it allows
public-page crawling, includes the sitemap, and restricts API, admin, private,
internal, preview, and thank-you paths. Check that `/llms.txt` and
`/llms-full.txt` return `200` with the expected published Strapi content and
that the global noindex response header has been removed from them at launch.
