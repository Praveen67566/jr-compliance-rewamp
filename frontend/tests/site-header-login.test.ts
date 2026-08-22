import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { fallbackHomepage } from "@/data/homepage-fallback";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function source(path: string): string {
  return readFileSync(resolve(repositoryRoot, path), "utf8");
}

describe("optional Site Setting login button", () => {
  it("keeps the fallback header unchanged until CMS enables a valid href", () => {
    assert.deepEqual(fallbackHomepage.site.loginButton, {
      enabled: false,
      label: "Login",
    });
  });

  it("uses only an optional toggle and href in the Site Setting schema", () => {
    const schema = JSON.parse(
      source("cms/src/api/site-setting/content-types/site-setting/schema.json"),
    ) as { attributes: Record<string, Record<string, unknown>> };

    assert.deepEqual(schema.attributes.loginButtonEnabled, {
      type: "boolean",
      default: false,
    });
    assert.deepEqual(schema.attributes.loginButtonHref, { type: "string" });
  });

  it("requires both the CMS toggle and a nonblank href without adding scalar populate paths", () => {
    const adapter = source("frontend/lib/strapi.ts");
    const siteSettingPopulate = adapter.slice(
      adapter.indexOf('"site-setting": {'),
      adapter.indexOf('"home-page": {'),
    );

    assert.match(
      adapter,
      /const loginButtonHref = text\(settings\.loginButtonHref\)/,
    );
    assert.match(
      adapter,
      /const loginButtonEnabled = boolean\(settings\.loginButtonEnabled\) === true/,
    );
    assert.match(adapter, /loginButtonEnabled && loginButtonHref/);
    assert.match(adapter, /\? \{ enabled: true,[^}]+href: loginButtonHref \}/);
    assert.match(adapter, /: \{ enabled: false, label: fallback\.site\.loginButton\.label \}/);
    assert.equal(siteSettingPopulate.includes("loginButton"), false);
    assert.equal(adapter.includes("populate=deep"), false);
  });

  it("renders Login before Contact Us in the desktop and mobile header actions", () => {
    const header = source("frontend/components/site-header.tsx");
    const mobileStart = header.indexOf('aria-label="Mobile navigation"');
    const desktop = header.slice(header.indexOf('className="header-utility-area"'), mobileStart);
    const mobile = header.slice(mobileStart, header.indexOf("</nav>", mobileStart));

    assert.equal(header.match(/\{site\.loginButton\.enabled \? \(/g)?.length, 2);
    assert.ok(desktop.indexOf("site.loginButton.href") < desktop.indexOf('className="header-cta"'));
    assert.ok(
      mobile.indexOf("site.loginButton.href") < mobile.indexOf('className="mobile-contact-link"'),
    );
    assert.match(desktop, /max-\[980px\]:hidden/);
    assert.equal(header.match(/href=\{sharedHref\(site\.loginButton\.href\)\}/g)?.length, 2);
  });
});
