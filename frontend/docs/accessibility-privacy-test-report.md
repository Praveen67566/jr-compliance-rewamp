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

## Advanced accessibility toolbar — 21 November 2026

This frontend-only update extends the existing toolbar and adds an “Accessibility settings” footer button that opens the same dialog. CMS contracts, CMS data, public routes and the default page theme are unchanged. Profile descriptions are attached to their buttons with `aria-describedby`; pressed states and a polite status region expose changes to assistive technology.

| Profile | Defined behavior |
| --- | --- |
| Seizure Safe | Stops site CSS animation/transitions and JavaScript motion through the existing motion preference; hides GIF images/canvas artwork and decorative layers; unmounts YouTube frames, including videos loaded before enabling the profile. The UI explicitly avoids promising seizure prevention. |
| Blind | Disables automatic site motion and adds focus-moving shortcuts to main content, visible site navigation, footer and current page headings. Existing semantic landmarks and screen-reader behavior remain available with every profile off. |
| ADHD Friendly | Stops automatic site motion, hides decorative layers and enlarges the keyboard focus ring. Content and controls stay available. |
| Cognitive | Increases reading line/word spacing, emphasizes headings, underlines content links and offers page-heading shortcuts. It preserves the original copy. |
| Motor Impaired | Gives interactive targets a minimum 44 × 44 CSS pixel size and strengthens focus indicators. Toolbar Tab/Shift+Tab order is explicit so Safari's limited Tab mode still reaches every enabled control. |
| Low Vision | Requires high contrast and a minimum 150% text scale; permits enlargement through 200%. |

Profiles can be combined. They add minimum requirements without replacing individual text-size, contrast or motion choices. Turning a profile off restores those individual choices; reset clears all profiles and the font preference while retaining system accessibility requirements. Existing `jr-accessibility-v1` records migrate through parsing without losing their original settings. Changes save immediately; the explicit Save control retries saving and announces unavailable storage. Changes from another tab remain synchronized.

The dyslexia-friendly font toggle uses the local Verdana/Arial/sans-serif stack with wider letter/word spacing. It works independently of Cognitive mode and needs no remote font request. Font preference is individual; no reading-outcome guarantee is made.

### Validation scope

- Unit coverage includes old saved records, malformed values, profile combination/removal, text limits and system overrides.
- Browser coverage includes each profile, Enter/Space, Tab/Shift+Tab, Escape, dialog containment, both launcher focus-return paths, landmark/heading focus movement, accessible names/descriptions/pressed states, live status messages, save/reload/reset, blocked storage and cross-tab updates.
- Combined settings include all six profiles, the font toggle and 200% text at 320px, plus shared home/contact/service templates at 320px, 768px and 1280px. Profile-specific overrides correct header, hero text, service shortcuts, phone fields and sticky CTA reflow without changing their default presentation.
- Chromium and WebKit run full applicable axe WCAG A/AA scans for the toolbar states. Firefox runs the same functional tests and native accessibility-tree assertions: its bundled browser crashes inside axe on this macOS host, including focused name/label scans, with software rendering and with contrast disabled. That scanner limitation is annotated in the test, not counted as a successful full Firefox axe audit.
- Mobile projects emulate Pixel 7/Chromium and iPhone 13/WebKit. These are browser simulations, not physical-device runs. WebKit is the Safari engine, not a run of the installed Safari application; installed Edge is not separately tested.
- The video regression confirms that enabling Seizure Safe removes an already loaded frame, reload keeps it blocked, and removing the profile restores the frame only while external-media consent remains granted.
- Mobile toolbar and combined-settings form screenshots were inspected locally.

Human VoiceOver, NVDA and JAWS announcement testing remains unperformed in this environment. Automated semantic checks do not establish complete screen-reader compatibility or WCAG conformance. Visitor settings apply after frontend initialization; the profile cannot certify arbitrary CMS or third-party media as seizure-safe.

### Files changed for this update

- `components/accessibility/accessibility-toolbar.tsx`, `accessibility.css`, `preference-dialog.tsx`: profile controls, font, combined settings, visual overrides and responsive dialog behavior.
- `components/site-footer.tsx`: the toolbar shortcut.
- `components/privacy/consent-video.tsx`: Seizure Safe media blocking, independent of privacy consent.
- `lib/browser-preferences.ts`, `lib/types.ts`, `lib/dialog-focus.ts`: saved preferences, profile contracts/composition and consistent dialog keyboard navigation.
- `playwright.config.ts`, `tests/browser-preferences.test.ts`, `tests/browser/accessibility-profiles.spec.ts`, `tests/browser/accessibility-privacy.spec.ts`: browser projects and regression coverage. The existing enlargement test now dismisses consent before testing the mobile launcher.
- `docs/accessibility-privacy-test-report.md`: behavior and validation evidence.

### Final results — 21 November 2026

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed. |
| `npm run build` | Passed; production compilation, TypeScript and 268 static routes completed. |
| `npm test` | 181 passed, zero failed. |
| Accessibility/privacy browser scenarios | All 54 passed in the final run: 24 Chromium regression cases and 30 profile cases across desktop Chromium, Firefox, WebKit, Pixel 7 emulation and iPhone 13 emulation. |
| Full `npm run test:e2e` | 65 passed, one unrelated failure. `tests/browser/bis-ads.spec.ts:33` expects eight `#eligibility li` elements; the unchanged BIS fallback contains seven audience items and the page renders seven. The campaign content and its test were left unchanged. |
| Final source whitespace check | `git diff --check` passed. |

The browser run used `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/jr-accessibility-browsers`; matching browsers were downloaded for the installed Playwright version. Screenshots and generated reports remain local/ignored. Firefox's full axe scanner and human screen-reader limitations above still apply; the passing count includes native Firefox semantics checks, not a full Firefox axe scan.

## Popup reference update — 21 November 2026

This update supersedes the earlier UI and verification results above.

The popup follows the supplied reference with a clean header, six icon cards in two columns on larger screens, visible toggle indicators, compact text-size buttons and separate display controls. Below 480px and with enlarged text, the cards become one column. Its content scrolls independently while Close, Save and Reset remain in view. The dialog description is explicitly associated with its accessible name. Accessible control names include their visible labels (Smaller, Larger, Default, Save preferences and Reset all settings), including speech-input label matching. An early footer request is retained until the toolbar listener is ready, preventing hydration from losing the first keyboard activation.

Additional files for this revision are `components/accessibility/preference-icons.tsx` (profile icons) and `tests/browser/bis-ads.spec.ts` (the stale eight-item assertion now uses the unchanged audience array’s length). No campaign content or CMS record was changed.

### Firefox audit coverage

The full WCAG A/AA axe rules now run for Firefox as well. Its current engine crashes when axe follows Playwright ARIA inspection in the same page. The audit opens a fresh live application page with the same saved preferences, viewport and OS media settings. It checks matching effective root flags, text scale, profile/control labels, pressed states and disabled states before running axe. This page retains the actual Next.js application and all its interaction code. Keyboard, focus, persistence and profile tests run on the original live page. No axe rule is disabled or omitted; no static HTML substitute is used in the final tests.

### Real assistive-technology verification

Real VoiceOver automation was attempted in a dedicated visible browser. Despite the user's permission changes, the current execution process continued to report `AXIsProcessTrusted() = false`, and macOS returned `osascript is not allowed assistive access (-1719)`. Reading VoiceOver's last spoken phrase timed out. VoiceOver was initially stopped and was confirmed stopped afterward. This is a blocked check, not a passing screen-reader test. A fresh session with effective macOS assistive access, or a human VoiceOver session, is still required. NVDA/JAWS require a Windows environment and were not run here.

Desktop, display-control and mobile screenshots were inspected locally against the supplied reference. Automated layout coverage checks two-column/single-column behavior and verifies that Close, Save and Reset stay in the viewport while the content scrolls at 1440px, 768px, 390px and 320px.

### Completed automated verification for the revised popup

| Check | Final result |
| --- | --- |
| `npm run typecheck` | Passed. |
| `npm run build` | Passed after the final accessible-label update. |
| `npm test` | 181 passed, zero failed. |
| Full browser suite | 71 passed, zero failed, zero skipped, across Chromium, Firefox, WebKit and both mobile-emulation projects. |
| Accessibility/privacy subset | 59 passed: 24 shared regressions and 35 profile/UI scenarios. |
| Existing BIS regression | Passed after deriving the eligibility count from the existing content array; all campaign content remained unchanged. |
| Whitespace/source check | `git diff --check` passed. |
| Real VoiceOver speech verification | Blocked by macOS assistive-access denial; not recorded as passed. |

The full browser run completed in 2.6 minutes. All automated checks are complete. Physical-device testing and real VoiceOver/NVDA/JAWS speech verification are not covered by those passing results. The fresh live Firefox audit procedure described above is used by the final suite.
