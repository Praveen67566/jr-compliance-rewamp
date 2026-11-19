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
- Keep public service URLs at `/corporate/[slug]`, `/approval/[slug]`, and
  `/global/[slug]`, with no category or country segment. Categories remain
  internal CMS/navigation groups. Preserve shared templates and typed contracts.
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

# Implementation Task: Website Accessibility & Privacy Controls

**Project:** JR Compliance  
**Website:** https://jrcompliance.com  
**Technology:** Next.js 16 App Router, React, Strapi 5  
**Implementation Scope:** Frontend only (`frontend/`)  
**Target:** WCAG 2.2 Level AA accessibility improvements and frontend privacy controls

## 1. Objective

Implement the following 11 features in the existing Next.js frontend:

1. Accessibility audit
2. WCAG 2.2 AA frontend improvements
3. Keyboard navigation
4. Screen-reader compatibility
5. Accessibility toolbar
6. Visual accessibility improvements
7. Frontend cookie and tracking audit
8. Frontend cookie consent banner
9. Frontend tracking consent controls
10. Privacy preference management
11. Frontend accessibility testing

**This is an implementation task. Do not stop after analyzing the codebase. Identify problems, implement solutions, test the changes, and provide a completion report.**

## 2. Strict Implementation Rules

- All changes must remain inside `frontend/`.
- Do not modify Strapi or its database.
- Do not modify backend APIs or microservices.
- Do not modify Cloudflare or Nginx configurations.
- Do not change existing page URLs or SEO behavior.
- Do not modify existing CMS content.
- Do not change lead submission payloads or API endpoints.
- Do not introduce a new backend or database.
- Use existing libraries where appropriate.
- Avoid unnecessary dependencies.
- Keep code modular and reusable.
- Do not deploy automatically.
- Do not claim legal compliance or full WCAG conformance without appropriate verification.

---

# Phase 1 — Accessibility Audit

## Task 1: Audit the Existing Frontend

Inspect the entire frontend application to identify accessibility problems.

### Components to inspect

- Website header and footer
- Desktop navigation
- Mobile navigation
- Sidebar and dropdown menus
- Buttons and links
- Lead generation forms
- Form validation
- Modal dialogs
- Carousels
- FAQ sections
- Images and icons
- Dynamic Strapi page rendering
- Existing language switcher
- Floating WhatsApp buttons
- Other interactive elements

### Identify problems such as

- Missing image alt text
- Incorrect heading hierarchy
- Missing form labels
- Buttons without accessible names
- Keyboard-inaccessible controls
- Missing focus indicators
- Insufficient color contrast
- Screen-reader incompatibility
- Incorrect ARIA attributes
- Inaccessible dynamic content

### Deliverable

Create:

`frontend/docs/accessibility-audit.md`

Document each issue, affected component, severity, and proposed fix.

**Acceptance criteria:** Shared components and representative page templates have been audited, issues are documented, and implementation proceeds to fixing them.

---

# Phase 2 — Accessibility Implementation

## Task 2: WCAG 2.2 Level AA Frontend Improvements

Fix identified frontend issues using WCAG 2.2 Level AA success criteria.

### Requirements

1. Use appropriate semantic HTML elements.
2. Maintain a meaningful heading hierarchy.
3. Ensure pages have appropriate navigation and main-content landmarks.
4. Implement a skip-to-content link.
5. Provide meaningful accessible names for interactive controls.
6. Ensure informative images have appropriate text alternatives.
7. Fix accessibility issues in forms and validation messages.
8. Use correct ARIA roles and attributes where necessary.
9. Ensure focus is not obscured by sticky headers or floating elements.
10. Support responsive layouts and text enlargement.
11. Respect reduced-motion preferences.
12. Ensure accessibility also works with rendered Strapi content.

Avoid changing existing visual designs unnecessarily.

**Acceptance criteria:** Identified frontend WCAG failures are fixed where possible, and unresolved content or third-party issues are documented.

## Task 3: Keyboard Navigation

Ensure the website can be operated without using a mouse.

### Requirements

- Tab navigates interactive elements.
- Shift+Tab navigates backward.
- Enter activates links and appropriate controls.
- Space activates buttons and other appropriate controls.
- Escape closes applicable menus and dialogs.
- Keyboard focus is always visible.
- Dropdowns support keyboard interaction.
- Mobile navigation is keyboard-accessible.
- Modal focus is managed correctly.
- Focus returns appropriately after closing dialogs.
- No keyboard traps exist.
- All forms can be completed using a keyboard.
- Carousels have keyboard-operable controls.

Use native HTML keyboard behavior wherever possible.

**Acceptance criteria:** A visitor can navigate the website, access services, fill out forms, and submit inquiries using only a keyboard.

## Task 4: Screen-Reader Compatibility

Improve compatibility with common assistive technologies.

### Requirements

- Use correct HTML landmarks.
- Provide accessible labels for input fields.
- Add accessible names to icon-only buttons.
- Expose expanded/collapsed states of menus.
- Announce relevant dynamic form errors.
- Announce form submission success and failure.
- Ensure dialogs have accessible titles.
- Make FAQs and accordions understandable.
- Ensure navigation has meaningful labels.
- Apply correct language attributes.
- Ensure translated content has appropriate language identification.
- Prevent decorative elements from creating unnecessary announcements.

Use native semantic HTML wherever possible.

**Acceptance criteria:** Page structure, navigation, controls, forms, and important status messages are understandable through a screen reader.

---

# Phase 3 — Accessibility Toolbar and Visual Improvements

## Task 5: Accessibility Toolbar

Create a reusable accessibility toolbar component.

### Required functionality

1. Increase text size.
2. Decrease text size.
3. Reset text size.
4. Enable/disable high-contrast mode.
5. Enable/disable reduced-motion mode.
6. Reset all accessibility preferences.

### Requirements

- Integrate into the existing shared layout.
- Work across all website pages.
- Support desktop and mobile.
- Be fully keyboard-accessible.
- Provide accessible labels and state announcements.
- Store preferences using localStorage when available.
- Restore stored preferences on subsequent visits.
- Handle unavailable or disabled browser storage.
- Respect operating-system accessibility preferences.
- Avoid interfering with existing floating buttons.
- Do not modify Strapi or backend services.

The toolbar must enhance accessibility, not replace underlying WCAG improvements.

**Acceptance criteria:** Visitors can customize supported accessibility settings, navigate normally, and restore default settings without breaking the layout.

## Task 6: Visual Accessibility Improvements

Improve visual accessibility across the frontend.

### Requirements

- Normal text contrast: at least 4.5:1.
- Large text contrast: at least 3:1.
- Relevant UI component and graphical-object contrast: at least 3:1.
- Support text resizing up to 200%.
- Support narrow-screen reflow without unnecessary horizontal scrolling.
- Ensure keyboard focus indicators are clearly visible.
- Improve undersized interactive pointer targets according to WCAG 2.2 AA.
- Prevent text overlap and clipping.
- Respect `prefers-reduced-motion`.
- Ensure errors are not communicated only through color.
- Ensure form inputs remain readable and accessible.
- Maintain readability in translated languages.
- Check contrast and layout in optional toolbar modes.

**Acceptance criteria:** The website remains readable, navigable, and functional across desktop, mobile, enlarged text, and supported visual accessibility settings.

---

# Phase 4 — Cookie and Privacy Features

## Task 7: Frontend Cookie and Tracking Audit

Inspect all frontend-managed cookies, browser storage, and tracking integrations.

### Identify

- Google Analytics
- Google Tag Manager
- Google Ads scripts
- Meta Pixel
- Marketing integrations
- Third-party widgets
- Browser cookies
- localStorage
- sessionStorage
- Other tracking technologies initiated by the frontend

### Categorize

- Necessary
- Preferences
- Analytics
- Marketing

### Deliverable

Create:

`frontend/docs/cookie-tracking-audit.md`

Document each identified technology, its purpose, category, and how it is loaded.

Clearly distinguish frontend-managed technologies from server-side or third-party processing that cannot be controlled under this task.

**Acceptance criteria:** All identifiable frontend-managed tracking technologies are documented, and optional scripts that require consent are identified.

## Task 8: Frontend Cookie Consent Banner

Create a reusable cookie consent banner.

### Required interface

- Accept All
- Reject All
- Customize Preferences

### Requirements

- Use a clean, responsive design.
- Work on desktop and mobile.
- Support keyboard navigation and screen readers.
- Use clear descriptions of optional tracking.
- Provide equal ease of accepting and rejecting.
- Do not preselect optional categories.
- Do not block essential website navigation.
- Integrate into the shared Next.js layout.
- Use localStorage for preference persistence where available.
- Include a consent policy version for future updates.

**Important:** Implement the reusable banner, but display it only when the website has optional tracking or storage that requires consent. Do not show a misleading banner if no such technology exists.

**Acceptance criteria:** When consent is required, visitors can accept, reject, or customize their preferences before optional frontend tracking starts.

## Task 9: Frontend Tracking Consent Controls

Implement actual consent-based script activation.

### Requirements

1. Do not initialize optional analytics before required consent.
2. Do not initialize optional marketing scripts before required consent.
3. Load optional frontend scripts only when their category is permitted.
4. Prevent repeat initialization of tracking scripts.
5. Maintain the necessary scripts required for website operation.
6. Allow preferences to be updated during the current session.
7. Stop future optional processing after consent withdrawal.
8. Implement appropriate cleanup for frontend-managed integrations where supported.
9. Respect applicable Global Privacy Control signals for frontend-controlled tracking.
10. Make tracking integration behavior testable.

**Important:** Changing consent preferences must actually affect tracking behavior, not just change the banner display.

Do not attempt to modify server-side tracking or backend integrations.

**Acceptance criteria:** Optional frontend-managed tracking remains inactive when it is not permitted, and activates only under the applicable consent rules.

## Task 10: Privacy Preference Management

Create a reusable privacy preference management component.

### Required features

- View current preferences.
- Update optional tracking categories.
- Save preferences.
- Withdraw consent.
- Reset optional preferences.
- Reopen preferences from a footer link.

### Requirements

- Store a versioned consent preference record locally.
- Restore preferences after page reloads.
- Handle unavailable browser storage safely.
- Keep preferences synchronized with frontend-managed tracking scripts.
- Make the interface accessible by keyboard and screen reader.
- Avoid collecting unnecessary personal information.
- Do not create backend consent APIs.
- Do not introduce database tables.

**Acceptance criteria:** A visitor can review or change optional frontend tracking preferences at any time, and the website applies those choices.

---

# Phase 5 — Testing

## Task 11: Frontend Accessibility and Privacy Testing

Implement automated tests and perform available manual checks.

### Accessibility tests

- Semantic HTML and landmarks
- Form labels
- Accessible button names
- Keyboard navigation
- Focus visibility and management
- Modal accessibility
- Dropdown accessibility
- Screen-reader announcements
- Color contrast
- Text resizing
- Responsive layouts
- Reduced-motion behavior

### Privacy tests

- Initial consent state
- Accept All
- Reject All
- Custom category selection
- Consent persistence
- Consent withdrawal
- Tracking blocked before required consent
- Tracking activation after consent
- Global Privacy Control behavior
- Browser storage unavailable
- Cookie banner accessibility

### Regression tests

- Existing multilingual support
- Header and footer
- Navigation
- Forms and lead submission
- Strapi content rendering
- Existing page routes
- SEO metadata
- Mobile responsiveness
- WhatsApp functionality

Use Playwright and axe-core where appropriate, reusing existing testing infrastructure.

Run available lint, type-check, build, and test commands.

Do not report unexecuted tests as passing.

### Deliverable

Create:

`frontend/docs/accessibility-privacy-test-report.md`

Include the test name, result, issues, and any required manual verification.

---

# Phase 6 — Completion Report

After implementing and testing all tasks, provide a final report.

| Task | Status | Files Modified | Testing Result |
|---|---|---|---|
| Accessibility audit | | | |
| WCAG 2.2 AA improvements | | | |
| Keyboard navigation | | | |
| Screen-reader compatibility | | | |
| Accessibility toolbar | | | |
| Visual accessibility | | | |
| Cookie and tracking audit | | | |
| Cookie consent banner | | | |
| Tracking consent controls | | | |
| Privacy preference management | | | |
| Accessibility testing | | | |

Use the following statuses:

- Completed
- Partially completed
- Blocked
- Not applicable

Clearly document work that cannot be completed without backend, CMS, infrastructure, third-party vendor, or legal changes.

## Final Acceptance Criteria

The implementation is complete when:

1. All 11 tasks have been addressed.
2. The frontend accessibility fixes are implemented.
3. Keyboard navigation works across interactive components.
4. Screen-reader compatibility is substantially improved.
5. The accessibility toolbar works across the website.
6. Visual accessibility improvements are applied.
7. Frontend tracking has been audited.
8. A reusable consent interface is implemented.
9. Applicable optional frontend tracking is controlled by consent.
10. Visitors can update their privacy preferences.
11. Automated tests pass and manual verification requirements are documented.
12. Existing website functionality remains intact.
13. No files outside `frontend/` have been changed.

**Implementation instruction:** Analyze the existing codebase, implement all eligible frontend changes, run tests, and provide a detailed completion report. Do not stop at creating an implementation plan. Do not deploy to production.


