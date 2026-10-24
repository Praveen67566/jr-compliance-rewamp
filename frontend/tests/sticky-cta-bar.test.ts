import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { shouldRevealStickyBar, StickyCtaBar } from "@/components/sticky-cta-bar";
import type { StickyBarContent } from "@/lib/types";

const existingBar: StickyBarContent = {
  title: "BIS Certification",
  description: "Bureau of Indian Standards",
  cta: { label: "Get quotes", href: "#expert-consultation" },
};

describe("CMS-managed sticky bar rendering", () => {
  it("waits until the complete contact form has scrolled past on compact screens", () => {
    assert.equal(shouldRevealStickyBar(800, true, 300), false);
    assert.equal(shouldRevealStickyBar(1_400, true, 1), false);
    assert.equal(shouldRevealStickyBar(1_401, true, 0), true);
    assert.equal(shouldRevealStickyBar(1_500, true, -99), true);
    assert.equal(shouldRevealStickyBar(1_000, true, 400), false);
  });

  it("retains the scroll threshold on desktop or when no form exists", () => {
    assert.equal(shouldRevealStickyBar(239, false, -10), false);
    assert.equal(shouldRevealStickyBar(240, false, 500), true);
    assert.equal(shouldRevealStickyBar(239, true, null), false);
    assert.equal(shouldRevealStickyBar(240, true, null), true);
  });

  it("keeps an existing bar usable without new branding or proof fields", () => {
    const markup = renderToStaticMarkup(createElement(StickyCtaBar, { content: existingBar }));

    assert.match(markup, /BIS Certification/);
    assert.match(markup, /Bureau of Indian Standards/);
    assert.match(markup, /href="#expert-consultation"/);
    assert.doesNotMatch(markup, /<ul/);
    assert.match(markup, /aria-hidden="true"/);
    assert.match(markup, /tabindex="-1"/);
  });

  it("renders editor-selected branding, ordered support points, and informative logos", () => {
    const markup = renderToStaticMarkup(createElement(StickyCtaBar, {
      content: {
        ...existingBar,
        brandLogo: { src: "/images/jr-logo.svg", alt: "JR Compliance" },
        icon: "/bis-mark.svg",
        supportingText: "Speak to a certification expert",
        points: [
          { title: "Documentation", description: "Complete filing support", icon: "/documents.svg" },
          { title: "Expert guidance", description: "At every step" },
          { title: "Reliable service" },
        ],
        logos: [
          { src: "/partner-a.svg", alt: "Partner A" },
          { src: "/partner-b.svg", alt: "Partner B" },
        ],
        cta: { label: "Talk to our team", href: "https://example.test/consult", target: "_blank" },
      },
    }));

    assert.match(markup, /src="\/images\/jr-logo.svg"/);
    assert.match(markup, /alt="JR Compliance"/);
    assert.match(markup, /alt=""[^>]*src="\/bis-mark.svg"/);
    assert.match(markup, /alt=""[^>]*src="\/documents.svg"/);
    assert.match(markup, /Complete filing support/);
    assert.ok(markup.indexOf("Documentation") < markup.indexOf("Expert guidance"));
    assert.ok(markup.indexOf("Expert guidance") < markup.indexOf("Reliable service"));
    const desktopPoints = markup.slice(markup.indexOf('role="group"'), markup.indexOf("</ul>"));
    assert.match(desktopPoints, /Documentation/);
    assert.match(desktopPoints, /Expert guidance/);
    assert.doesNotMatch(desktopPoints, /Reliable service/);
    assert.ok(markup.indexOf('alt="Partner A"') < markup.indexOf('alt="Partner B"'));
    assert.match(markup, /Speak to a certification expert/);
    assert.match(markup, /Talk to our team/);
    assert.match(markup, /target="_blank"/);
    assert.match(markup, /rel="noreferrer"/);
    assert.match(markup, /Next support highlight \(stops automatic rotation\)/);
    assert.doesNotMatch(markup, /(?:Pause|Play) support highlights/);
    assert.equal((markup.match(/<button\b/g) ?? []).length, 1);
  });
});
