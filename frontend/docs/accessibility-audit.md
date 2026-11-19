# Frontend accessibility audit

Audit date: 19 November 2026. Scope: all active `app/`, `components/` and frontend renderers; shared chrome, home, editorial, legal, Corporate/Approval service, Global and standalone BIS campaign templates. No production deployment or CMS writes. Findings below describe the initial source review and the implemented treatment; browser results are recorded separately.

The target is WCAG 2.2 AA improvement, not a conformance certification. References: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum), and [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).

| Issue | Component / criterion | Severity | Fix / disposition |
| --- | --- | --- | --- |
| Repeated header had no skip navigation or focusable main destination | Root layout, shell, campaign; 2.4.1 | High | Add first-focus skip link and one `main#main-content` per page. |
| Focus depended on individual component styles and was sometimes removed | Shared controls; 2.4.7, 1.4.11 | High | Shared two-colour focus ring, including native summaries, inputs and toolbar controls; preserve forced-colour system outline. |
| Sticky header and bottom UI could obscure focused targets | Header, sticky CTA, WhatsApp; 2.4.11 | High | Measure header and CTA heights, use scroll clearance, place toolbar opposite WhatsApp, compact/static header when text is enlarged. |
| Dropdown child-only popover had no matching controlled ID; keyboard entry was unclear | Header; 2.1.1, 4.1.2 | Medium | Match IDs; ArrowDown opens and focuses contents, Escape restores trigger, close when focus leaves header. Existing category tabs retain arrow/Home/End behavior; mobile uses disclosures. |
| FAQ tabs lacked roving focus, panel names, and keyboard arrows | Home FAQ; 2.1.1, 4.1.2 | High | Add selected-tab focus, stable IDs, named panel, arrow/Home/End handling and semantic question headings. |
| FAQ categories changed after two seconds, contradicting the existing one-minute regression contract | Home FAQ; 2.2.2 | High | Restore one-minute interval; add pause control and preserve focus/open-answer/reduced-motion safeguards. |
| Mobile services auto-scrolled without explicit previous/next controls | Service stack; 2.1.1, 2.2.2 | Medium | Add previous/next and pause buttons; manual navigation stops automatic scrolling. |
| JS/WebGL animation only followed OS settings | Earth, hero typing, logos, service slider, FAQ, reveal sections, sticky CTA; 2.2.2 | Medium | Shared motion observer combines OS and toolbar preference, disposes animation work and timers on changes; CSS motion is reduced globally. |
| Typed hero word exposed changing partial content to assistive technology | Hero; 1.3.1 | Medium | Keep visual typing decorative and expose a stable complete list of CMS-provided words. |
| WhatsApp hover/focus preview could not be dismissed without moving focus | Floating contact link; 1.4.13 | Medium | Escape hides the preview while preserving focus and contact navigation. |
| Campaign automatically opened a modal after five seconds | BIS campaign; 2.4.3, 3.2.1 | High | Open only from visitor controls; native dialog focus containment, Escape and explicit return focus. |
| Form labels were visually hidden; honeypot was exposed to screen readers | Shared consultation form; 1.3.1, 3.3.2 | Medium | Visible CMS labels; hidden honeypot; retain named fields, invalid/error associations, first-error focus and live submission status. Endpoints and payloads remain unchanged. |
| New preference dialogs needed correct focus and accessible titles | Accessibility/privacy components; 2.1.2, 2.4.3, 4.1.2 | High | Native modal dialog, labelled title, visible close control, Escape, browser focus containment and restored trigger. |
| No site-wide enlargement, contrast or motion controls | Root layout; enhancement | Medium | Persistent bounded 100–200% text size, reset, high contrast, reduced motion; browser storage failures fall back to current visit. OS settings remain effective. |
| Fixed-pixel text utilities ignored root text enlargement | Header and campaign text; 1.4.4 | Medium | Convert text size utilities to equivalent rem values while retaining layout sizes. |
| CMS Markdown could insert additional h1s or headings at the wrong template level | Registration renderer; 1.3.1 | Medium | Nest rendered Markdown and structured Blocks below existing template headings without editing CMS data; editor heading order still requires review. |
| CMS image descriptions, video captions and transcript quality cannot be inferred from markup | CMS media and third-party video; 1.1.1, 1.2.x | Medium | Preserve existing alt contracts and decorative empty alts; content owners must verify informative descriptions, captions, transcripts and language of published records. |
| Some palette combinations / opacity may fail contrast on actual backgrounds | Shared and template surfaces; 1.4.3, 1.4.11 | High | Run axe across representative templates; make evidence-based palette-preserving corrections; optional high contrast supplements underlying fixes. See test report for results and limitations. |

## Coverage and retained accessible patterns

Footer links and social controls have text or accessible names. WhatsApp is an ordinary named external link, not a loaded widget. Service and career FAQs use native details/summary. Shared service template, editorial templates and Global templates already provide sections, headings, image alts and typed content boundaries. Duplicate logo/recognition rails are hidden from assistive technology and their links are removed from tab order. Existing service category tabs support arrows. YouTube frames already had titles and privacy-enhanced hosts; they now require optional-media consent.

No language switcher, translated route system or translation widget was found in the active frontend. `html lang="en"` matches the current English contract. The many “Global” service routes describe countries; they are not locale routes. No translation integration was added or removed. Future translations need correct language tags and layout testing with their actual content.

## Required manual / content verification

Verify NVDA/Firefox or Chrome and VoiceOver/Safari reading order, live status announcements, native dialog entry/exit and disclosure announcements. Check 200% browser zoom, 400% reflow, text spacing, long translated strings, Windows forced colours, touch target spacing, visible focus around fixed UI, and actual vendor player keyboard/captions. Review every new Strapi publication for alt quality, hierarchy and table headers. Global has no local content records; publish representative records in a review environment before claiming runtime coverage. Do not claim legal compliance or complete WCAG conformance from automated checks.
