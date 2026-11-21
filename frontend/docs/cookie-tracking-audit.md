# Frontend consent enforcement and setup

Updated 21 November 2026. Scope: the active frontend and local browser tests.
The updated Privacy Policy, its CMS content, navigation, forms, lead payloads,
and accessibility controls have not been edited. No deployment or vendor-account
configuration was performed.

## Enforcement

| Technology | Required permission | Withdrawal behavior |
| --- | --- | --- |
| Mixed GTM container `GTM-K938HN3`, its Google analytics/advertising tags, Meta Pixel `1027798165813441`, and any container-loaded trackers | Both analytics AND marketing, with marketing denied under GPC | Destroy the entire sandboxed frame, including its scripts, timers, listeners, nested frames and pending event queue. The page and unfinished forms stay mounted. |
| YouTube privacy-enhanced service videos | Marketing/external media; also blocked by the existing Seizure Safe profile | Remove the player frame. |
| Future independent analytics/heatmap adapters | Analytics; additional marketing permission when the purpose includes advertising | Must implement complete stop/cleanup via `useOptionalIntegration`, or use a removable isolated frame. No direct parent-page heatmap SDK is enabled. |
| Optional preference integrations | Preferences | Stop through the same adapter lifecycle. None is currently configured in production. |
| Navigation, inquiry forms, requested contact links, local assets, necessary accessibility and consent storage | No optional permission required | Continue working. |

No GTM/Meta script, tracking frame, analytics globals, pixel or optional player is
created before the relevant permission. Accept All saves all optional categories;
Reject All saves all off; custom choices remain independently editable. A mixed
container is intentionally blocked for analytics-only or marketing-only choices,
because its independently managed tags cannot safely be assigned one purpose.

The tracking frame uses `sandbox="allow-scripts"` **without** `allow-same-origin`.
It cannot access the parent document or its storage. Scripts load only after a
parent/frame startup handshake. Consent Mode defaults are denied before granted
signals and before the container starts. Withdrawal destroys the execution
context instead of relying on denied-consent pings to stop tracking. See
[Google's consent-mode model](https://developers.google.com/tag-platform/security/concepts/consent-mode)
and [iframe sandbox behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#sandbox).

Only `page_view`, `cta_click` and `whatsapp_click` events cross the boundary.
The bridge allow-lists pathname, CTA type and CTA location, omitting query strings,
form values, contact data and arbitrary event properties. Route changes do not
reload the container; unchanged consent saves do not reinitialize it. A fresh
grant after withdrawal creates one fresh frame. No rejected-period events are
replayed. Events awaiting initial frame readiness are bounded and discarded on
withdrawal. The existing BIS CTA publisher continues to use the same dataLayer
event contract and consent checks.

Known readable first-party Google, Meta, Hotjar and Clarity identifiers are
removed from cookies/localStorage/sessionStorage for denied categories, including
legacy identifiers created by the old parent-page loader. Necessary storage is
retained. HttpOnly and third-party cookies, identifiers on unrelated paths or
origins, and data already transmitted cannot be erased by frontend code.

## Regional location setup

No provider is selected or contacted. Without configured trusted location, the
region is `unknown`; every optional purpose requires explicit opt-in. The
read-only `/api/privacy/context` endpoint returns only a coarse region, renewal
revision/interval and HTTP GPC flag. It uses `private, no-store` and exposes no
IP address, raw country, proxy secret or CMS token. Static page rendering and
existing CMS content loaders are preserved.

Configure server-only values from `.env.example`:

| Variable | Default | Required setup |
| --- | --- | --- |
| `PRIVACY_GEO_SHARED_SECRET` | Empty; all country headers ignored | At least 32 characters, shared only by the trusted reverse proxy and Next.js. |
| `PRIVACY_GEO_COUNTRY_HEADER` | `x-jr-country` | The header containing the provider's ISO-style two-letter country. |
| `PRIVACY_CONSENT_MAX_AGE_DAYS` | Empty; **no time-based expiry** | Set a positive whole number of days only after an interval is agreed. Test values do not establish production policy. Invalid configured values produce a 503 privacy-context response. |
| `PRIVACY_CONSENT_REVISION` | `2` | Change after an approved purpose/consent-policy change to require a fresh decision. Letters, digits, dots, hyphens and underscores; maximum 64 characters. |

The trusted proxy must **overwrite**, rather than pass through, both the country
header and `x-jr-geo-token`. The latter must contain the shared secret. Strip
client-supplied values; use only the chosen provider's authenticated location
metadata. Keep the Next.js origin bound to loopback/private networking as in
`prod.md`, prevent edge bypass, and disable intermediary caching for the context
endpoint. Never put the token in browser code, a `NEXT_PUBLIC_*` variable, URL or
logs. Comparison in the app uses constant-time comparison of SHA-256 digests.
An ordinary `CF-IPCountry`, `X-Vercel-IP-Country`, query parameter, browser locale
or timezone is not trusted automatically.

Region groups are EEA/UK, India, US, other and unknown. They all retain opt-in
defaults. Regional explanatory copy appears in preferences; US visitors also
receive an explicit sale/sharing opt-out that turns off marketing while retaining
their other saved choices. This does not establish a sale/sharing data pipeline
or claim that one exists. State-level legal distinctions are not inferred.

Browser `navigator.globalPrivacyControl` and HTTP `Sec-GPC: 1` both deny marketing,
including previously saved grants. The signal is rechecked on visibility and page
restoration. Marketing choices are disabled while the signal is active. GPC does
not independently deny analytics-only adapters, but blocks the mixed container.

## Renewal and returning visits

`jr-consent` schema version **2** stores three boolean choices, ISO timestamp,
coarse region and consent revision. It contains no visitor identity or precise
location. Version 1 grants require a fresh choice once because they lack the
new context/revision contract. Missing, corrupt, future-dated, wrong-version,
wrong-revision, changed-region and configured-expired records never activate
tracking. An unset interval preserves otherwise valid records without inventing
a retention period. Review the interval separately from vendor data retention.

When an interval is configured, expiry is checked on restoration and with a
deadline timer during an open visit, including intervals longer than the browser's
maximum timer delay. Storage events synchronize withdrawal/clearing across tabs.
Page restoration rechecks stored decisions and fetches fresh context. A context
failure, malformed response or five-second timeout prevents restoring saved
grants; the visitor can still make a current-visit choice. Those choices are not
persisted while context is unavailable. Blocked localStorage similarly permits
current-visit choices with a visible persistence notice. Optional tracking stays
off throughout initial context loading.

## External dependencies and verification limits

- **GTM owner review is required before release.** The opaque frame intentionally
  denies first-party cookies/storage and access to the real page DOM. Existing
  GTM automatic click/form triggers, DOM variables, advertising attribution,
  cookie-based sessions and heatmap/session-replay tags may fail or report only
  the frame. Review the live published container, remove duplicate base tags,
  use the supplied sanitized events/path variables, and verify analytics/Meta
  delivery and attribution in staging. Frontend tests do not certify reporting.
- Heatmaps requiring the real page DOM stay unavailable until a reviewed adapter
  can stop all future collection. Do not add `allow-same-origin` or parent-page
  SDK injection to work around that restriction. A separate analytics-only
  container or reviewed per-vendor adapter can provide independent measurement.
- Configure and verify the real location provider, proxy stripping/overwriting,
  origin isolation and approved expiry/revision values. None has been installed
  or assumed by this change. Edge CSP must permit the approved frame and scripts;
  a restrictive policy can safely block optional tracking and needs staging QA.
- Infrastructure-injected scripts, server-side tagging, edge/server logs,
  third-party and HttpOnly cookies, Strapi, downstream CRM/webhooks and data
  already sent are outside this frontend boundary. Audit them at deployment.
- Browser tests intercept vendor responses with SDKs that make repeated test
  requests, including a synthetic heatmap. They prove request gating and cessation
  after withdrawal, not actual vendor delivery, historical-data deletion, real
  device behavior or legal compliance. Native screen-reader review remains manual.

## Validation

`tests/privacy-enforcement.test.ts` covers trusted/spoofed location, configuration,
no assumed expiry, exact expiry boundaries, version/revision/region changes,
future timestamps and event payload filtering. `tests/browser/consent-enforcement.spec.ts`
covers no consent, acceptance, rejection, custom combinations, returning visits,
live vendor timers, withdrawal without form loss, storage/cross-tab changes,
configured renewal, GPC, regional opt-out, context/storage failure, keyboard focus,
mobile reflow and automated accessibility. Existing consent/video, campaign,
navigation, form, accessibility-profile and layout regressions are retained.

Validation on 21 November 2026:

| Check | Result |
| --- | --- |
| `npm run test` | 188 passed, zero failed. |
| `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- --workers=2` | 141 passed across desktop Chrome, Firefox, WebKit, Pixel 7 and iPhone 13 emulations. Includes existing navigation, form, layout and accessibility regressions. |
| Final affected-suite rerun after startup scheduling changes | 84 consent/privacy tests passed across all five browser projects, zero failed. |
| Repeated cold Chrome starts | Three consecutive acceptance/returning-visit runs passed after deferring vendor startup until after the isolated document loads. |
| Optimized production build on a separate local port | All 12 consent scenarios passed with intercepted vendor SDKs. |
| `npm run typecheck` | Passed, including the final original Next declaration references. |
| `npm run build` | Passed; 268 pages generated and existing public pages retain static generation. Only the privacy-context endpoint is newly dynamic. |
| `git diff --check` | Passed. |

The final startup scheduling change is also covered by a separate rerun of the
affected consent/privacy suites across the five browser projects. Screenshots at
1440, 820, 390 and 320 pixels are test artifacts; desktop and mobile samples were
visually inspected. Browser emulations do not replace real-device or native
screen-reader review. No live lead was submitted; lead transport was intercepted
in regression tests. The full suite initially exposed launcher overlap and Safari
focus restoration issues; both were corrected and the subsequent full run passed.

## Changed files

- Enforcement/UI: `components/privacy/privacy-provider.tsx`,
  `components/privacy/google-tag-manager.tsx`, `data/privacy-fallback.ts`.
- Contracts and policy: `lib/types.ts`, `lib/browser-preferences.ts`,
  `lib/privacy-policy.ts`, `lib/privacy-tracking.ts`,
  `app/api/privacy/context/route.ts`.
- Setup/documentation: `.env.example`, `docs/cookie-tracking-audit.md`.
- Tests: `playwright.config.ts`, `tests/browser-preferences.test.ts`,
  `tests/privacy-enforcement.test.ts`, `tests/browser/consent-enforcement.spec.ts`,
  `tests/browser/accessibility-privacy.spec.ts`,
  `tests/browser/accessibility-profiles.spec.ts`, `tests/browser/bis-ads.spec.ts`,
  `tests/browser/consultation-form-layout.spec.ts`. Existing fixture records were
  updated for schema 2; assertions now inspect the isolated tracking frame.

The user's edited `bootstrap.md` is preserved. Generated Next.js declarations
are restored to their original references after validation.
