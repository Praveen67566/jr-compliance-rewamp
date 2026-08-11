# JR Compliance UI theme

## Theme name and intent

Use the **Compliance Network** theme for every new JR Compliance page. It
should feel precise, global, and technically assured: a deep navy blueprint
field, cobalt data surfaces, electric-blue signals, pale-blue typography, and
calm network motion.

The home-page Service Stack is the canonical visual reference. New routes must
extend that system instead of introducing a separate campaign style.

## Non-negotiable rules

1. Use only navy, cobalt, electric blue, sky blue, ice blue, and cool white.
   Do not introduce lavender, purple, orange, peach, green, mint, warm beige,
   or a one-off accent colour.
2. Preserve approved legacy copy and media, but create original layouts and
   CSS. Never import Webflow markup, Webflow styling, or `site/assets/` URLs.
3. Decorations must reinforce the compliance-network idea: blueprint grids,
   route lines, nodes, status dots, orbit rings, and soft cobalt glows.
4. Strapi owns editable content, links, order, and media. Next.js owns the
   visual system, spacing, responsive behavior, and motion.
5. Keep `prefers-reduced-motion` support. Motion may clarify hierarchy, but it
   must never distract from reading or interaction.

## Core tokens

Use the existing variables in `frontend/app/globals.css`; do not add a route
specific palette.

```css
:root {
  --blue-navy-950: #030f2b;
  --blue-navy-900: #03132f;
  --blue-navy-800: #041a43;
  --blue-navy-700: #06285f;
  --blue-cobalt-700: #0d5cb8;
  --blue-cobalt-600: #168cf5;
  --blue-electric: #168cf5;
  --blue-sky: #8bdcff;
  --blue-sky-strong: #a8e4ff;
  --blue-ice: #eaf6ff;
  --blue-cloud: #f8fcff;
}
```

Use pale-blue translucent borders on dark surfaces, not pure white borders.
Use `#061a43` / `#0b315f` for dark text on ice-blue reading surfaces.

## Implementation and CSS ownership

Tailwind v4 is the default implementation layer for this theme. The approved
tokens above are exposed to Tailwind from `frontend/app/globals.css`; use those
tokens and arbitrary values based on them rather than inventing a parallel
palette.

- Use Tailwind utilities first for layout, spacing, sizing, typography,
  responsive changes, borders, and standard interactive states.
- Keep `frontend/app/globals.css` limited to tokens, reset/base behavior,
  shared primitives, anchor offsets, and reduced-motion support.
- Keep component-specific visual work beside its owner: header, home, footer,
  and editorial styles are separated under `frontend/components/`; shared
  ambient keyframes and existing cross-component responsive parity rules live
  in `frontend/app/animations.css` and `frontend/app/responsive.css`.
- Use CSS only where utilities would obscure the design: multi-layer bluefield
  gradients, blueprint masks, pseudo-elements, orbit artwork, and keyframes.
- Preserve exact rendered values when migrating an existing surface. This is a
  code-organization change, not authorization to redesign a component.

## Typography

- `--display` is for page headlines, section statements, metric values, and
  high-emphasis card titles.
- `--sans` is for navigation, body copy, labels, tabs, buttons, and metadata.
- Use compact editorial headings: H1 uses `clamp(3.25rem, 5vw, 5.8rem)` at
  `0.92` line height; H2 uses `clamp(2.5rem, 4vw, 4.35rem)` at `0.97`.
- Eyebrows are uppercase sans labels with an electric/sky-blue status dot.
- Reserve italic display text for one intentional headline emphasis only.

## Surface system

### Bluefield

Use for hero areas, services, trust bands, why-JR, recognition, closing CTAs,
and footer areas.

- Base: navy-to-cobalt gradient using the documented tokens.
- Add one low-opacity blueprint grid and one or two cobalt radial glows.
- Headings: `--blue-cloud` / white. Body text: pale blue.
- Cards: navy/cobalt gradients with a `1px` translucent sky-blue border, 20px
  radius, subtle top-corner glow, and blue shadow.

### Ice reading surface

Use for dense reading or decision content such as FAQ and long-form pages.

- Base: `--blue-cloud` / ice-blue gradient.
- Text: navy, with cobalt active states and blue borders.
- Keep any grid or glow extremely subtle and blue-only.
- This is part of the same theme; it is not a neutral white page.

## Shared header

The header uses an inset rounded navigation rail, inspired only by the
information hierarchy of the supplied reference:

- Keep the page-level header a navy/cobalt bluefield so it connects directly to
  the hero. Only the elevated inset navigation rail uses cool white and ice
  blue.
- Keep the bluefield padding above and below that rail in both normal and
  sticky states. Do not switch to a full-width white bar on scroll.
- JR logo on the left, a centered ice navigation capsule, and electric-blue
  Contact Us CTA on the right.
- Desktop dropdowns use an ice surface with cobalt hover rows. Escape closes an
  open menu.
- Collapse to the compact menu at `980px`; keep the mobile menu as a structured
  navy/cobalt panel, never a generic white drawer.
- Header and section anchors use a `102px` scroll offset.

## Editorial route system

About Us, Careers, and Contact Us use the shared `SitePageShell` and the
`RouteHero` / `RouteClosingCta` primitives. New editorial routes should extend
those shared components before adding route-specific CSS.

- Begin with a bluefield route hero: blueprint grid, one or two slow orbit
  rings, a signal node, pale-blue copy, and an optional approved media frame.
- Alternate dark bluefields with ice reading surfaces so long editorial content
  stays easy to scan. Do not introduce an unrelated white marketing page.
- Use numbered cards, timeline nodes, blue-glass panels, and understated image
  overlays to create hierarchy. Cards may lift on hover, but content should
  never move continuously.
- Use a dark bluefield final CTA and the shared network footer for every route.
- Page data must remain in an explicit `*-page` Strapi single type with a typed
  local fallback; never hard-code route copy in a component.

## Component rules

| Component | Required treatment |
| --- | --- |
| Hero | Bluefield, blueprint grid, cobalt glow, sky status signal, blue-tinted media frame, and blue proof cards. |
| Trusted brands | Navy network rail with visible approved logo artwork, sky-blue label, quiet marquee, and blue hover elevation. |
| Service Stack | Canonical reference: navy grid, cobalt cards, orbit icons, route line, status dots, and electric tab control. |
| Ticker | Cobalt/electric-blue system alert with cool-white text and sky separators; never a warm accent. |
| Why JR and recognition | Bluefields with network routes and dark blue-glass cards. |
| Metrics and testimonials | Dark cobalt data cards and pale-blue type; vary opacity/elevation, not colour families. |
| FAQ | Ice-blue reading surface with cobalt category and accordion states. |
| Closing CTA and footer | Darkest navy continuation with sky-blue interaction states and route/grid detail. |

## Buttons, tabs, cards, and icons

- Primary CTA: electric-blue/cobalt gradient, cool-white label, sky-blue border
  highlight, and a small upward-right arrow.
- Secondary CTA: transparent or ice surface with a cobalt border; do not create
  a new accent colour.
- Tabs belong in a grouped navy or ice capsule. Active state uses electric blue
  plus a sky status dot; provide a matching `:focus-visible` state.
- Interactive card lift is limited to `translateY(-8px)` to `translateY(-10px)`.
- Use `frontend/public/images/services-blue/` for fallback service icons. The
  unmodified copies in `images/services/` remain archival approved assets.
- Treat adjacent labelled service artwork as decorative (`alt=""`). Do not
  recolour client logos.

## Motion

- Entry: opacity plus `translateY(12px–22px)` over `450ms–780ms`.
- Hover: `180ms–280ms`; preserve keyboard focus equivalents.
- Ambient grids, orbit rings, signals, and Global artwork: CSS-only,
  low-amplitude, roughly `4s–19s`.
- Card stagger: `70ms–100ms`.
- Pause marquees on hover and focus where practical.
- Never animate layout dimensions, continuously bounce content, or layer
  unrelated effects in one component.

## Responsive and accessibility rules

- Keep content width at 1320px and use 32px / 22px / 18px horizontal padding
  across desktop / tablet / mobile.
- Keep section rhythm at 112px / 72px / 56px vertically.
- Use existing breakpoints: 1100px, 980px for header collapse, 820px, 560px.
- Preserve arrow-key navigation for tab interfaces. All selected/open states
  need more than a colour-only cue and need a visible keyboard focus state.
- Decorative grids, rings, glows, and duplicated logo-marquee items must be
  hidden from assistive technology.
- Verify long card titles and tab labels at mobile widths; no horizontal page
  overflow is allowed.

## Checklist for a future route

1. Read `context.md` and this file before adding UI.
2. Start with the shared header/footer and choose Bluefield or Ice reading
   surface for every section.
3. Use only the documented tokens and component recipes.
4. Keep route content in the typed Strapi/fallback boundary; do not hard-code a
   new visual data model in a page.
5. Test desktop, tablet, mobile, keyboard focus, and reduced motion.
6. Run `npm run typecheck` and `npm run build` before handoff.
