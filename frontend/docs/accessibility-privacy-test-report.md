# Accessibility and privacy test report

Test date: 19 November 2026. Local Next.js development server; desktop Google Chrome through Playwright, including 320px mobile viewport emulation. The server already running on localhost:8123 was reused. Existing local CMS content was read by the application; no CMS content, backend endpoint or production configuration was changed. Optional vendor requests and lead submissions in browser tests were intercepted; no test inquiry was delivered.

## Commands and results

| Test / command | Result | Evidence and limits |
| --- | --- | --- |
| `npm test` | Passed: 160 tests, 22 suites | Existing routing, SEO/robots, sitemap, legal contracts, Strapi/schema mapping, lead validation and transport, media normalization, markdown sanitization, sticky UI and animation contracts; new preference parsing/category tests. |
| `npm run typecheck` | Passed | TypeScript contracts and browser test source. |
| `npm run build` | Passed | Next.js production compilation, TypeScript and static generation. Build is local only. |
| `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` | Passed: 19 tests | Real application pages and isolated real-component consent fixture. See detailed cases below. |
| Lint | Not available | This repository has no lint script/configuration. No lint result is claimed. |
| `git diff --check -- frontend` | Passed | Scope excludes the pre-existing user edit in root bootstrap.md. |
| Screenshot review | Performed | Inspected local mobile consultation form, enlarged home and accessibility dialog screenshots; fixed dialog header/control clipping observed during review. Screenshots alone do not establish complete visual accessibility. |
| Human screen-reader / cross-browser testing | Required; not performed | No claim of NVDA, VoiceOver, JAWS, Safari, Firefox or complete WCAG conformance. |

The initial sandbox prevented tsx's IPC socket and dependency-network access. These operations were rerun successfully with the execution tool's approved permissions. There is no remaining testing blocker from those initial attempts. Baseline source also contained a failing FAQ contract (two-second timer versus expected one minute); the timer was corrected. Other intermediate failures exposed scroll-region focus, invalid author-badge ARIA, small-text contrast, modal focus boundaries and enlarged-dialog clipping; these were fixed before the final passing run.

## Reproducing the checks

Run `npm ci`, `npm test`, `npm run typecheck` and `npm run build` from frontend/. For browser tests, install Chromium with `npx playwright install chromium` and run `npm run test:e2e`, or use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` with an installed Google Chrome. Playwright reuses a running local frontend or starts the dev server. Normal local CMS/fallback configuration is used; test fixtures are intercepted by the browser and never become public routes. Reports and failure traces are ignored under playwright-report/ and test-results/.

## Browser cases

| Test name / coverage | Result | Issues and required manual verification |
| --- | --- | --- |
| Shared landmarks, skip navigation, forms and preference dialog | Passed | One main and h1 on sampled pages; first Tab reaches skip link, Enter focuses main; Escape closes dialog and restores launcher. Native screen-reader announcements still need human verification. |
| Accept All, initial blocked tracking, persistence, custom analytics selection, withdrawal, script/timer cleanup, no repeat initialization | Passed | Synthetic analytics starts only on permission; script is removed and timer cleaned on withdrawal. Actual YouTube frame appears only with marketing permission and is removed on withdrawal. YouTube request is intercepted rather than contacting the vendor. |
| Reject All, unavailable localStorage and GPC | Passed | No optional starts before permission; GPC blocks media/marketing; analytics can still be granted. With blocked storage, current-visit state works, persistence warning appears and reload requests a new decision. |
| Existing consent + GPC, cross-tab withdrawal, old policy version | Passed | Stored marketing grant is overridden by GPC; another tab can stop analytics; version mismatch blocks optional processing and reopens banner. |
| Consent banner, initial unchecked optional categories, mobile axe, reset and footer reopening | Passed | Equal accept/reject controls; categories without current-page integrations remain editable; GPC locks marketing off; reset clears optional choices; Escape returns to footer trigger. Privacy dialog stays within 320px width at 200% text. |
| OS motion/contrast, blocked accessibility storage, dialog Tab/Shift+Tab containment | Passed | System preferences remain effective through reset; state announcement reports storage failure; modal edge navigation stays inside available controls; axe found no applicable violations in this state. |
| Campaign modal, Escape return focus and WhatsApp preview dismissal | Passed | Campaign dialog is visitor initiated; named dialog passes axe; Escape restores its trigger. WhatsApp preview dismisses without moving focus or changing the link destination. |
| Toolbar enlargement, decrease, text-only reset, full reset, high contrast, reduced motion and reload | Passed | Text reaches 200%, decrease works, all settings persist, reset restores defaults. Enlarged dialog has no horizontal scrolling at 320px. |
| Desktop dropdown, mobile disclosure, FAQ arrow keys, form validation and simulated submission | Passed | ArrowDown enters desktop menu, Escape returns trigger; mobile Escape closes menu; FAQ roving focus works. Empty consultation focuses first invalid field; valid inputs produce unchanged expected lead fields and announce simulated transport failure. |
| Home `/` | Passed | Desktop and 320px axe scan, one h1, no page overflow at 320px or 200% toolbar text. |
| About `/about-us` | Passed | Same checks, including keyboard-focusable timeline scroll region. |
| Careers `/careers` | Passed | Same checks; native job/FAQ content retained. Job application transport remains the existing intentionally unimplemented workflow. |
| Legal `/privacy-policy` | Passed | Same checks; legal Blocks markup and policy navigation retained. Other legal-route contracts covered in unit tests. |
| Corporate `/corporate/private-limited-company-registration-consultant` | Passed | Same checks through shared service template. The actual existing slug is used; no route was created or renamed. |
| Approval `/approval/fssai-certificate` | Passed | Same checks with available CMS content, optional author/logo rendering and shared renderer. |
| Campaign `/gpt-ad/bis-certification` | Passed | Same checks with standalone layout, forms, logo rail and shared root preferences. |
| Thank-you `/thank-you` | Passed | Same checks with shared shell and return link. |

Axe scans use WCAG 2 A/AA, 2.1 AA and 2.2 AA rule tags, including automated text-contrast checks. Zero reported violations is limited to rendered states that axe can evaluate. Gradients, imagery, graphical contrast, clipped content, screen-reader usability and all potential CMS records still require human review. The eight template tests scan desktop and mobile normal modes and check 200% text reflow; they do not establish exhaustive contrast or no clipping in every enlarged state.

## Popup and FAQ UI revision — 19 November 2026

Both preference dialogs now use the existing navy/cobalt blueprint theme, icon headers and compact controls. The accessibility launcher is an icon button aligned opposite WhatsApp; the overlapping local development indicator is disabled; text-size controls use −, + and = with complete accessible names. Contrast and motion controls display their current switch position and preserve OS restrictions.

Privacy category checkboxes now accept site-wide choices even when the current page has no integration in that category. Only the marketing category is locked by an active GPC signal. Keyboard and pointer selection, a visible sky-blue selected background/checkmark, saved-state restoration and absence of a misleading cookie banner are covered by the new no-integrations regression case.

The FAQ question buttons retain semantic heading wrappers and now have an explicit `faq-question` class used by both desktop and responsive styles. A regression test checks that the buttons span their row, avoid native browser button backgrounds, expand their answers and stay within the mobile viewport. The rotation control uses a compact pause/play treatment.

Desktop and mobile screenshot reviews were performed for both dialogs and the FAQ. Final follow-up validation: 160 unit tests and 19 Playwright/axe browser tests passed; typecheck and production build passed. The manual verification limits below still apply.

## Footer and floating-control alignment revision — 19 November 2026

Removed the unconditional six-rem shell padding that exposed a flat navy strip after the footer, including its enlarged-text override. Floating-button clearance is retained within the footer's own background. Accessibility and WhatsApp share one responsive positioning rule, equal 60px circles and mirrored safe-area spacing. The campaign's sticky-bar height is also shared with the root accessibility control. Footer privacy and policy actions share the same font, line height, target height and alignment. The Next.js development-only indicator is hidden so it cannot cover the accessibility control.

Local Chrome checks at 1440px and 390px confirmed zero shell padding on the sampled homepage, equal control sizes and vertical coordinates, symmetric side offsets, and matching footer action font/height. Campaign mobile controls also aligned. Footer axe scans found no applicable violations at either width; screenshots were reviewed. Three affected browser regressions, typecheck and the production build passed. No deployment was performed.

## Regression and verification limits

- Existing routes, redirects, canonical metadata, structured data and content loaders were retained; production build and route/SEO tests passed. No new application route was added for test fixtures.
- Shared header/footer, keyboard menus, native disclosures, contact links, and WhatsApp link behavior were preserved. Browser tests do not navigate to external contact destinations or submit real inquiries.
- Consultation form validation/error associations and status messages are exercised in Chrome. Existing transport tests cover successful/failed deliveries with mocks. Real webhook/CRM/email delivery was deliberately not invoked.
- No language switcher or translation implementation exists in this checkout. Current pages use English and `lang="en"`; no multilingual feature was removed. Actual translated content needs language tagging and reflow checks if later introduced.
- Global templates were source audited and their route/CMS contracts are covered by existing unit tests. They have no bundled fallback records, and no Global runtime page was fabricated or published for this task. Representative published country/certificate records require review-environment browser checks.
- CMS media alts and video captions/transcripts remain content-owner responsibilities. Arbitrary future remote images, scripts, embeds or content can change accessibility/privacy behavior and need review on publication.
- Live YouTube playback, captions, vendor-side storage/retention and already transmitted data cannot be validated by intercepted test requests. The production frame gate is exercised with the real component and a stub response.
- Production-injected scripts, server/edge cookies, network logs, backend consent handling, retention policy and legal wording were not changed or certified.

## Manual verification checklist

1. Use NVDA and VoiceOver with real desktop/mobile browsers: headings/landmarks, tab and expanded-state announcements, labels/validation, status announcements, dialog titles/focus return, FAQ and sidebar disclosure reading order.
2. Navigate all menus/forms/links and optional CMS features with only Tab, Shift+Tab, Enter, Space, arrows and Escape; verify focus is visible and clear of sticky/floating UI throughout long pages.
3. Check browser zoom at 200%, reflow at 400%, WCAG text spacing, portrait/landscape, Windows forced colours, enlarged/high-contrast combinations and touch-target spacing on real devices. Verify each retained image/diagram and complex gradient for contrast/readability.
4. Review actual translated content and language attributes if translations are introduced; test long names and service titles. Check complete Global country/certificate records after editorial publication in a review environment.
5. With an approved real optional-media sample, inspect browser requests/storage before permission, after grant, after withdrawal and with GPC. Confirm vendor captions/transcripts and independent player keyboard behavior. Inspect production edge/server integrations separately.
6. Obtain owner/legal review of category descriptions, policy-version changes and legal notices before making jurisdiction-specific compliance claims.

## Completion matrix

Every eligible frontend workstream has an implementation. “Partially completed” indicates verification or content/vendor work still required, not an unimplemented toolbar or placeholder consent UI. All paths below are relative to frontend/.

| Task | Status | Files modified | Testing result |
| --- | --- | --- | --- |
| Accessibility audit | Completed | docs/accessibility-audit.md | Shared components and representative templates source audited; browser discoveries incorporated. |
| WCAG 2.2 AA improvements | Partially completed | app/layout.tsx, app/globals.css; site-page-shell, site-header, forms, FAQ, service renderer; accessibility/*; lib/registration-markdown.ts | Implemented eligible semantic/focus/form/heading fixes; sampled axe checks pass. Content and full conformance verification remain manual. |
| Keyboard navigation | Completed | site-header.tsx; home/faq.tsx, service-stack.tsx; about/about-page.tsx; BIS page; accessibility/preference-dialog.tsx, dismissible-contact-link.tsx; lib/dialog-focus.ts | Browser menu/tab/dialog/form navigation checks pass; explicit carousel controls and native disclosures retained. Full assistive-technology matrix remains manual. |
| Screen-reader compatibility | Partially completed | Shell, forms, FAQ, hero, service renderer, toolbar and privacy components | Landmarks/names/states/live regions automated checks pass; NVDA/VoiceOver and content-language/caption review still required. |
| Accessibility toolbar | Completed | components/accessibility/*; app/layout.tsx; lib/browser-preferences.ts, motion-preference.ts | Enlargement/decrease/reset/contrast/motion, OS preferences, storage failure and reload checks pass. |
| Visual accessibility | Partially completed | app/globals.css; accessibility/accessibility.css; header, legal/service/form text; motion-aware home/editorial/Earth/sticky components | Sampled desktop/mobile axe, contrast and 200% reflow checks pass; screenshot fixes applied. Complex graphical contrast, text spacing, zoom and real devices remain manual. |
| Cookie and tracking audit | Completed | docs/cookie-tracking-audit.md | No GA/GTM/Ads/Meta initializers found; YouTube, local storage, fonts, media, contact attribution and boundaries documented. |
| Cookie consent banner | Completed | components/privacy/privacy-provider.tsx; app/layout.tsx | Banner hidden without optional integrations; accept/reject/customize, keyboard and mobile axe checks pass. |
| Tracking consent controls | Completed | privacy/consent-video.tsx, privacy-provider.tsx; service page; lib/browser-preferences.ts | Before-consent blocking, grant, withdrawal, cleanup, duplicate prevention, versioning and GPC checks pass. No unused production analytics vendor configured. |
| Privacy preference management | Completed | privacy-provider.tsx; site-footer.tsx; BIS footer | Footer reopening, save/reset/withdrawal, reload, cross-tab and disabled-storage behavior pass. |
| Accessibility testing | Partially completed | playwright.config.ts; tests/browser/*, browser-preferences.test.ts; existing Markdown/video contract tests; package.json/lock; .gitignore; this report | 160 unit tests and 19 Chrome browser tests pass; typecheck/build pass. Human screen-reader, other browsers, production and content/vendor checks explicitly outstanding. |

## Changed-file inventory

- Shared integration: next.config.ts (development indicator only), app/layout.tsx, app/globals.css, app/responsive.css, components/site-page-shell.tsx, site-header.tsx, site-footer.tsx, site-footer.css, sticky-cta-bar.tsx.
- New controls/helpers: components/accessibility/accessibility-toolbar.tsx, accessibility.css, preference-dialog.tsx, preference-icons.tsx, dismissible-contact-link.tsx; components/privacy/privacy-provider.tsx, consent-video.tsx; lib/browser-preferences.ts, motion-preference.ts, dialog-focus.ts.
- Targeted template fixes: components/forms/consultation-form.tsx; components/bis-ad/bis-ad-form.tsx, bis-certification-ad-page.tsx; components/home/faq.tsx, hero.tsx, home-page.tsx, home.css, service-stack.tsx, trusted-brands-marquee.tsx, keychain-reveal-section.tsx; components/editorial/route-closing-cta.tsx; components/visuals/rotating-earth-background.tsx; components/about/about-page.tsx; components/legal/legal-page.tsx; components/company-registration/company-registration-page.tsx; lib/registration-markdown.ts.
- Testing/docs: package.json, package-lock.json, playwright.config.ts, .gitignore; tests/browser-preferences.test.ts, tests/browser/accessibility-privacy.spec.ts, tests/browser/fixtures/controls.tsx, navigation.ts; tests/registration-markdown.test.ts, service-detail-content.test.ts; the three reports in docs/.

All authored changes are inside frontend/. Existing root bootstrap.md changes were present before this task and preserved. No deployment, CMS/database mutation, backend/API change, lead payload change, URL change or SEO metadata change was performed.
