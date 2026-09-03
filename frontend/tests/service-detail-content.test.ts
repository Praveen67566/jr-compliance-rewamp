import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import bureauIndianStandardsSeedPages from "../../cms/src/seed/bureau-indian-standards-pages.json";
import governmentLicenseCertificationSeedPages from "../../cms/src/seed/government-license-certification-pages.json";
import fssaiServiceSeedPages from "../../cms/src/seed/fssai-service-pages.json";
import fundRaisingSeedPages from "../../cms/src/seed/fund-raising-pages.json";
import importExportServiceSeedPages from "../../cms/src/seed/import-export-service-pages.json";
import iprServiceSeedPages from "../../cms/src/seed/ipr-service-pages.json";
import labourComplianceSeedPages from "../../cms/src/seed/labour-compliance-pages.json";
import pollutionAdvisorySeedPages from "../../cms/src/seed/pollution-advisory-pages.json";
import sebiBusinessRegistrationSeedPages from "../../cms/src/seed/sebi-business-registration-pages.json";
import taxAccountingSeedPages from "../../cms/src/seed/tax-accounting-pages.json";
import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import {
  bureauIndianStandardsFallback,
  bureauIndianStandardsSlugs,
  fallbackBureauIndianStandardsPages,
} from "@/data/bureau-indian-standards-pages-fallback";
import {
  fallbackGovernmentLicenseCertificationPages,
  governmentLicenseCertificationFallback,
  governmentLicenseCertificationSlugs,
} from "@/data/government-license-certification-pages-fallback";
import { fallbackHomepage } from "@/data/homepage-fallback";
import {
  fallbackFssaiServicePages,
  fssaiServiceFallback,
  fssaiServiceSlugs,
} from "@/data/fssai-service-pages-fallback";
import {
  fallbackFundRaisingPages,
  fundRaisingFallback,
  fundRaisingSlugs,
} from "@/data/fund-raising-pages-fallback";
import {
  fallbackImportExportServicePages,
  importExportServiceFallback,
  importExportServiceSlugs,
} from "@/data/import-export-service-pages-fallback";
import {
  fallbackLabourCompliancePages,
  labourComplianceFallback,
  labourComplianceSlugs,
} from "@/data/labour-compliance-pages-fallback";
import { mcaServiceSlugs } from "@/data/mca-service-pages-fallback";
import {
  fallbackPollutionAdvisoryPages,
  pollutionAdvisoryFallback,
  pollutionAdvisorySlugs,
} from "@/data/pollution-advisory-pages-fallback";
import {
  fallbackIprServicePages,
  iprServiceFallback,
  iprServiceSlugs,
} from "@/data/ipr-service-pages-fallback";
import {
  fallbackSebiBusinessRegistrationPages,
  sebiBusinessRegistrationFallback,
  sebiBusinessRegistrationSlugs,
} from "@/data/sebi-business-registration-pages-fallback";
import {
  fallbackTaxAccountingPages,
  taxAccountingFallback,
  taxAccountingSlugs,
} from "@/data/tax-accounting-pages-fallback";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function repositoryFile(path: string): string {
  return resolve(repositoryRoot, path);
}

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(repositoryFile(path), "utf8")) as Record<string, unknown>;
}

function sourceBetween(source: string, start: string, end: string): string {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, `Missing source marker: ${start}`);
  assert.notEqual(endIndex, -1, `Missing source marker: ${end}`);
  return source.slice(startIndex, endIndex);
}

const fixedServiceSchemaNames = [
  "company-registration-page",
  "mca-service-page",
  "import-export-service-page",
  "government-license-certification-page",
  "ipr-service-page",
  "fssai-service-page",
  "sebi-business-registration-page",
  "tax-accounting-page",
  "labour-compliance-page",
  "fund-raising-page",
  "bureau-indian-standards-page",
  "pollution-advisory-page",
  "telecommunication-engineering-centre-page",
  "wireless-planning-coordination-page",
  "bureau-energy-efficiency-page",
  "cdsco-registration-page",
  "aerb-approval-page",
  "lmpc-certification-page",
  "stqc-page",
] as const;

describe("service-detail content mirrors", () => {
  it("adds every optional shared field to all fixed service schemas in the fixed order", () => {
    assert.equal(fixedServiceSchemaNames.length, 19);

    for (const schemaName of fixedServiceSchemaNames) {
      const schema = readJson(
        `cms/src/api/${schemaName}/content-types/${schemaName}/schema.json`,
      );
      const attributes = schema.attributes as Record<string, Record<string, unknown>>;

      assert.deepEqual(attributes.trustedLogos, {
        type: "relation",
        relation: "manyToMany",
        target: "api::brand-logo.brand-logo",
      });
      assert.deepEqual(attributes.youtubeVideos, {
        type: "component",
        component: "registration.youtube-video-section",
        repeatable: false,
      });
      assert.deepEqual(attributes.extraContent, {
        type: "component",
        component: "registration.extra-content-card",
        repeatable: true,
      });
      assert.deepEqual(attributes.resultsSection, {
        type: "component",
        component: "registration.results-section",
        repeatable: false,
      });
      assert.deepEqual(attributes.tickerCta, {
        type: "component",
        component: "home.cta-band",
        repeatable: false,
      });

      const fields = Object.keys(attributes);
      assert.ok(fields.indexOf("hero") < fields.indexOf("trustedLogos"));
      assert.ok(fields.indexOf("trustedLogos") < fields.indexOf("overview"));
      assert.ok(fields.indexOf("whyChoose") < fields.indexOf("extraContent"));
      assert.ok(fields.indexOf("extraContent") < fields.indexOf("youtubeVideos"));
      assert.ok(fields.indexOf("youtubeVideos") < fields.indexOf("breakdown"));
      assert.ok(fields.indexOf("breakdown") < fields.indexOf("resultsSection"));
      assert.ok(fields.indexOf("resultsSection") < fields.indexOf("tickerCta"));
      assert.ok(fields.indexOf("tickerCta") < fields.indexOf("faqs"));
    }
  });

  it("keeps extra-content cards limited to a title and rich description", () => {
    const extraContentCard = readJson(
      "cms/src/components/registration/extra-content-card.json",
    );
    const attributes = extraContentCard.attributes as Record<
      string,
      Record<string, unknown>
    >;

    assert.deepEqual(Object.keys(attributes), ["title", "description"]);
    assert.deepEqual(attributes.title, { type: "string", required: true });
    assert.deepEqual(attributes.description, { type: "richtext", required: true });
  });

  it("keeps results content bounded and both service icon fields optional", () => {
    const resultsSection = readJson(
      "cms/src/components/registration/results-section.json",
    );
    const detailItem = readJson(
      "cms/src/components/registration/detail-item.json",
    );
    const breakdownGroup = readJson(
      "cms/src/components/registration/breakdown-group.json",
    );
    const resultsAttributes = resultsSection.attributes as Record<
      string,
      Record<string, unknown>
    >;
    const detailAttributes = detailItem.attributes as Record<string, Record<string, unknown>>;
    const breakdownAttributes = breakdownGroup.attributes as Record<
      string,
      Record<string, unknown>
    >;
    const optionalImage = {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
    };

    for (const field of [
      "ratingLabel",
      "ratingSource",
      "title",
      "description",
      "quote",
      "personName",
    ]) {
      assert.equal(resultsAttributes[field]?.required, true);
    }
    assert.deepEqual(resultsAttributes.ratingLabel, { type: "string", required: true });
    assert.deepEqual(resultsAttributes.ratingSource, { type: "string", required: true });
    assert.deepEqual(resultsAttributes.title, { type: "string", required: true });
    assert.deepEqual(resultsAttributes.description, { type: "text", required: true });
    assert.deepEqual(resultsAttributes.stats, {
      type: "component",
      component: "about.stat",
      repeatable: true,
      required: true,
      min: 1,
      max: 3,
    });
    assert.deepEqual(resultsAttributes.quote, { type: "text", required: true });
    assert.deepEqual(resultsAttributes.personName, { type: "string", required: true });
    assert.deepEqual(resultsAttributes.personRole, { type: "string" });
    assert.deepEqual(resultsAttributes.companyName, { type: "string" });
    assert.deepEqual(detailAttributes.icon, optionalImage);
    assert.deepEqual(breakdownAttributes.icon, optionalImage);
  });

  it("keeps the YouTube component contract fixed and editor ordered", () => {
    const video = readJson("cms/src/components/registration/youtube-video.json");
    const section = readJson(
      "cms/src/components/registration/youtube-video-section.json",
    );
    const videoAttributes = video.attributes as Record<string, Record<string, unknown>>;
    const sectionAttributes = section.attributes as Record<string, Record<string, unknown>>;

    assert.deepEqual(videoAttributes.title, { type: "string", required: true });
    assert.deepEqual(videoAttributes.youtubeUrl, { type: "string", required: true });
    assert.deepEqual(sectionAttributes.eyebrow, { type: "string", required: true });
    assert.deepEqual(sectionAttributes.title, { type: "string", required: true });
    assert.deepEqual(sectionAttributes.description, { type: "text" });
    assert.deepEqual(sectionAttributes.videos, {
      type: "component",
      component: "registration.youtube-video",
      repeatable: true,
      required: true,
      min: 1,
    });
  });

  it("renders and maps the optional sections in their fixed order", () => {
    const component = readFileSync(
      repositoryFile(
        "frontend/components/company-registration/company-registration-page.tsx",
      ),
      "utf8",
    );
    const strapiAdapter = readFileSync(
      repositoryFile("frontend/lib/strapi.ts"),
      "utf8",
    );
    const heroIndex = component.indexOf('id="top"');
    const trustedLogosIndex = component.indexOf("{content.trustedLogos ?");
    const overviewIndex = component.indexOf('id="overview"');
    const whyChooseIndex = component.indexOf("{content.whyChoose.items.map");
    const extraContentIndex = component.indexOf("{content.extraContent?.length ?");
    const youtubeIndex = component.indexOf("{content.youtubeVideos ?");
    const breakdownIndex = component.indexOf('id="breakdown"');
    const resultsIndex = component.indexOf("{content.resultsSection ?");
    const tickerIndex = component.indexOf("{content.tickerCta ?");
    const faqIndex = component.indexOf('id="faq"');

    assert.ok(heroIndex >= 0);
    assert.ok(heroIndex < trustedLogosIndex);
    assert.ok(trustedLogosIndex < overviewIndex);
    assert.match(
      component,
      /import \{ TrustedBrandsMarquee \} from "@\/components\/home\/trusted-brands-marquee"/,
    );
    assert.match(component, /<TrustedBrandsMarquee logos=\{content\.trustedLogos\} \/>/);
    assert.ok(whyChooseIndex >= 0);
    assert.ok(whyChooseIndex < extraContentIndex);
    assert.ok(extraContentIndex < youtubeIndex);
    assert.ok(youtubeIndex < breakdownIndex);
    assert.ok(breakdownIndex < resultsIndex);
    assert.ok(resultsIndex < tickerIndex);
    assert.ok(tickerIndex < faqIndex);
    assert.match(component, /loading="lazy"/);
    assert.match(component, /referrerPolicy="strict-origin-when-cross-origin"/);
    assert.match(component, /allowFullScreen/);
    assert.match(component, /src=\{video\.embedUrl\}/);
    assert.match(component, /title=\{video\.title\}/);
    assert.match(component, /<figcaption/);
    assert.doesNotMatch(component, /autoplay/i);
    assert.match(component, /className="contact-ticker"/);
    assert.match(component, /aria-labelledby="service-results-heading"/);
    assert.match(component, /<dl className=/);
    assert.match(component, /<blockquote className=/);
    assert.match(component, /<cite className="not-italic">/);
    assert.match(component, /Array\.from\(\{ length: 5 \}/);
    assert.doesNotMatch(component, /Doola|Trustpilot/i);
    assert.match(strapiAdapter, /trustedLogos: \{ logo: true \}/);
    assert.equal(
      strapiAdapter.match(/const trustedLogos = mapLogos\(page\.trustedLogos, \[\]\);/g)?.length,
      2,
    );
    assert.equal(
      strapiAdapter.match(/\.\.\.\(trustedLogos\.length \? \{ trustedLogos \} : \{\}\)/g)?.length,
      2,
    );
    assert.match(strapiAdapter, /trustedLogos: _fallbackTrustedLogos/);
    const cmsOnlyMapper = strapiAdapter.slice(
      strapiAdapter.indexOf("function mapCmsOnlyFixedServiceDetailPage"),
      strapiAdapter.indexOf("function mapFixedServiceDetailPage"),
    );
    const cmsOnlyCompletenessGate = cmsOnlyMapper.slice(
      cmsOnlyMapper.indexOf("if ("),
      cmsOnlyMapper.indexOf("return {"),
    );
    assert.doesNotMatch(cmsOnlyCompletenessGate, /trustedLogos/);
    assert.doesNotMatch(cmsOnlyCompletenessGate, /extraContent/);
    assert.doesNotMatch(cmsOnlyCompletenessGate, /resultsSection/);
    assert.doesNotMatch(cmsOnlyCompletenessGate, /icon/);
    assert.match(strapiAdapter, /youtubeVideos: \{ videos: true \}/);
    assert.match(strapiAdapter, /extraContent: true/);
    assert.match(strapiAdapter, /resultsSection: \{ stats: true \}/);
    assert.match(strapiAdapter, /tickerCta: \{ cta: true \}/);
    assert.equal(
      strapiAdapter.match(
        /const resultsSection = mapFixedServiceResultsSection\(page\.resultsSection\);/g,
      )?.length,
      2,
    );
    assert.equal(
      strapiAdapter.match(/\.\.\.\(resultsSection \? \{ resultsSection \} : \{\}\)/g)?.length,
      2,
    );
    assert.match(strapiAdapter, /resultsSection: _fallbackResultsSection/);
    assert.equal(
      strapiAdapter.match(
        /const extraContent = mapRegistrationExtraContent\(page\.extraContent\);/g,
      )?.length,
      2,
    );
    assert.equal(
      strapiAdapter.match(/\.\.\.\(extraContent \? \{ extraContent \} : \{\}\)/g)?.length,
      2,
    );
    assert.match(strapiAdapter, /extraContent: _fallbackExtraContent/);
    const extraContentSection = sourceBetween(
      component,
      "{content.extraContent?.length ?",
      "{content.youtubeVideos ?",
    );
    assert.match(extraContentSection, /aria-label="Additional service information"/);
    assert.match(extraContentSection, /id="extra-content"/);
    assert.match(extraContentSection, /content\.extraContent\.map\(\(item, index\)/);
    assert.match(extraContentSection, /<h2 className=/);
    assert.match(
      extraContentSection,
      /<RegistrationRichTextView[\s\S]*?value=\{item\.description\}/,
    );
    const resultsMapper = strapiAdapter.slice(
      strapiAdapter.indexOf("function mapFixedServiceResultsSection"),
      strapiAdapter.indexOf("function strictTextList"),
    );
    assert.match(resultsMapper, /\.slice\(0, 3\)/);
    assert.match(
      resultsMapper,
      /ratingLabel && ratingSource && title && description && stats\.length && quote && name/,
    );
    assert.match(resultsMapper, /: null;/);
  });

  it("explicitly loads and safely maps optional icons through both service data paths", () => {
    const strapiAdapter = readFileSync(repositoryFile("frontend/lib/strapi.ts"), "utf8");
    const populateTree = sourceBetween(
      strapiAdapter,
      "const fixedServiceDetailPopulateTree",
      "const legalPagePopulateTree",
    );

    assert.match(populateTree, /challenges: \{ items: \{ icon: true \} \}/);
    assert.match(populateTree, /advantages: \{ items: \{ icon: true \} \}/);
    assert.match(populateTree, /process: \{ items: \{ icon: true \} \}/);
    assert.match(populateTree, /whyChoose: \{ items: \{ icon: true \} \}/);
    assert.match(populateTree, /breakdown: \{ groups: \{ icon: true, items: true \} \}/);
    assert.equal(populateTree.match(/icon: true/g)?.length, 5);
    assert.doesNotMatch(strapiAdapter, /populate=deep/);

    const mediaUrlMapper = sourceBetween(
      strapiAdapter,
      "function mediaUrl",
      "function targetFromStrapi",
    );
    assert.match(mediaUrlMapper, /if \(!url\) \{[\s\S]*?return undefined;/);
    assert.match(mediaUrlMapper, /\^https\?:\\\/\\\//);
    assert.match(mediaUrlMapper, /new URL\(url, strapiUrl\)\.toString\(\)/);

    const fallbackDetailMapper = sourceBetween(
      strapiAdapter,
      "function mapRegistrationDetails",
      "function mapRegistrationCardSection",
    );
    const strictDetailMapper = sourceBetween(
      strapiAdapter,
      "function strictRegistrationDetails",
      "function strictFixedServiceCardSection",
    );
    for (const mapper of [fallbackDetailMapper, strictDetailMapper]) {
      assert.match(mapper, /const icon = mediaUrl\(item\.icon\);/);
      assert.match(
        mapper,
        /title && description[\s\S]*?\{ title, description, \.\.\.\(icon \? \{ icon \} : \{\}\) \}/,
      );
    }

    const fallbackBreakdownMapper = sourceBetween(
      strapiAdapter,
      "function mapRegistrationBreakdown",
      "function mapRegistrationFaqSection",
    );
    const strictBreakdownMapper = sourceBetween(
      strapiAdapter,
      "function strictFixedServiceBreakdown",
      "function strictFixedServiceFaqSection",
    );
    for (const mapper of [fallbackBreakdownMapper, strictBreakdownMapper]) {
      assert.match(mapper, /const icon = mediaUrl\(group\.icon\);/);
      assert.match(mapper, /\.\.\.\(icon \? \{ icon \} : \{\}\)/);
    }

    const cmsOnlyMapper = sourceBetween(
      strapiAdapter,
      "function mapCmsOnlyFixedServiceDetailPage",
      "function mapFixedServiceDetailPage",
    );
    const fallbackMapper = sourceBetween(
      strapiAdapter,
      "function mapFixedServiceDetailPage",
      "function mapFixedServiceCategoryPage",
    );
    for (const field of ["challenges", "advantages", "process", "whyChoose"]) {
      assert.match(
        cmsOnlyMapper,
        new RegExp(`const ${field} = strictFixedServiceCardSection\\(page\\.${field}\\);`),
      );
      assert.match(
        fallbackMapper,
        new RegExp(`${field}: mapRegistrationCardSection\\(page\\.${field}, fallback\\.${field}\\)`),
      );
    }
    assert.match(
      cmsOnlyMapper,
      /const breakdown = strictFixedServiceBreakdown\(page\.breakdown\);/,
    );
    assert.match(
      fallbackMapper,
      /breakdown: mapRegistrationBreakdown\(page\.breakdown, fallback\.breakdown\)/,
    );
    assert.doesNotMatch(cmsOnlyMapper, /(?:item|group)\.icon/);
    assert.doesNotMatch(fallbackMapper, /(?:item|group)\.icon/);
  });

  it("renders every service icon in a stationary decorative layer without removing its number", () => {
    const component = readFileSync(
      repositoryFile(
        "frontend/components/company-registration/company-registration-page.tsx",
      ),
      "utf8",
    );
    const iconHelper = sourceBetween(
      component,
      "function DecorativeCardIcon",
      "function DetailCard",
    );
    assert.match(iconHelper, /<img[\s\S]*?alt=""/);
    assert.match(iconHelper, /<img[\s\S]*?aria-hidden="true"/);
    assert.match(iconHelper, /<img[\s\S]*?loading="lazy"/);
    assert.match(iconHelper, /height=\{standard \? 40 : 28\}/);
    assert.match(iconHelper, /width=\{standard \? 40 : 28\}/);
    assert.match(iconHelper, /z-10/);
    assert.match(iconHelper, /pointer-events-none select-none object-contain/);
    assert.match(iconHelper, /standard \? "size-12" : "size-8"/);
    assert.match(iconHelper, /bg-ice\/95/);
    assert.match(iconHelper, /bg-navy-950\/90/);

    const whyChooseCard = sourceBetween(component, "function DetailCard", "function PlanningCard");
    assert.match(whyChooseCard, /item\.icon \?/);
    assert.match(whyChooseCard, /absolute right-5 top-5 size-16/);
    assert.match(
      whyChooseCard,
      /<DecorativeCardIcon size="standard" src=\{item\.icon\} surface=\{light \? "light" : "dark"\} \/>/,
    );
    assert.match(whyChooseCard, /z-0[\s\S]*?motion-safe:animate/);
    assert.match(whyChooseCard, /String\(index \+ 1\)\.padStart\(2, "0"\)/);

    const challengesCard = sourceBetween(
      component,
      "function PlanningCard",
      "function AdvantageCard",
    );
    assert.match(challengesCard, /item\.icon \?/);
    assert.match(challengesCard, /relative size-14 shrink-0/);
    assert.match(
      challengesCard,
      /<DecorativeCardIcon size="standard" src=\{item\.icon\} surface="light" \/>/,
    );
    assert.match(challengesCard, /z-0[\s\S]*?motion-safe:animate/);
    assert.match(challengesCard, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
    assert.match(
      challengesCard,
      /:\s*\(\s*<span className="size-2 rounded-full border border-sky\/70 bg-sky/,
    );

    const advantagesCard = sourceBetween(
      component,
      "function AdvantageCard",
      "function ResultsSection",
    );
    assert.match(advantagesCard, /item\.icon \?/);
    assert.match(advantagesCard, /absolute right-5 top-5 size-16/);
    assert.match(
      advantagesCard,
      /<DecorativeCardIcon size="standard" src=\{item\.icon\} surface="dark" \/>/,
    );
    assert.match(advantagesCard, /z-0[\s\S]*?motion-safe:animate/);
    assert.match(advantagesCard, /String\(index \+ 1\)\.padStart\(2, "0"\)/);

    const processSection = sourceBetween(
      component,
      'id="process"',
      '<section className="relative overflow-hidden bg-cobalt-700',
    );
    assert.match(processSection, /content\.process\.items\.map/);
    assert.match(processSection, /item\.icon \?/);
    assert.match(processSection, /relative size-10 shrink-0/);
    assert.match(
      processSection,
      /<DecorativeCardIcon size="compact" src=\{item\.icon\} surface="light" \/>/,
    );
    assert.match(processSection, /z-0[\s\S]*?motion-safe:animate/);
    assert.equal(
      processSection.match(/String\(index \+ 1\)\.padStart\(2, "0"\)/g)?.length,
      2,
    );

    const whyChooseSection = sourceBetween(
      component,
      "{content.whyChoose.items.map",
      "{content.extraContent?.length ?",
    );
    assert.match(
      whyChooseSection,
      /<DetailCard item=\{item\} index=\{index\} key=\{item\.title\} light \/>/,
    );

    const breakdownSection = sourceBetween(
      component,
      'id="breakdown"',
      "{content.resultsSection ?",
    );
    assert.match(breakdownSection, /group\.icon \?/);
    assert.match(breakdownSection, /relative size-9/);
    assert.match(
      breakdownSection,
      /<DecorativeCardIcon size="compact" src=\{group\.icon\} surface="light" \/>/,
    );
    assert.match(breakdownSection, /z-0[\s\S]*?motion-safe:animate/);
    assert.match(breakdownSection, /String\(groupIndex \+ 1\)\.padStart\(2, "0"\)/);
  });

  it("preserves registration rich text in overview, cards, and breakdown items", () => {
    const component = readFileSync(
      repositoryFile(
        "frontend/components/company-registration/company-registration-page.tsx",
      ),
      "utf8",
    );
    const strapiAdapter = readFileSync(repositoryFile("frontend/lib/strapi.ts"), "utf8");
    const fallbackBreakdownMapper = sourceBetween(
      strapiAdapter,
      "function mapRegistrationBreakdown",
      "function mapRegistrationFaqSection",
    );
    const strictBreakdownMapper = sourceBetween(
      strapiAdapter,
      "function strictFixedServiceBreakdown",
      "function strictFixedServiceFaqSection",
    );
    const cmsOnlyMapper = sourceBetween(
      strapiAdapter,
      "function mapCmsOnlyFixedServiceDetailPage",
      "function mapFixedServiceDetailPage",
    );
    const breakdownSection = sourceBetween(
      component,
      'id="breakdown"',
      "{content.resultsSection ?",
    );

    assert.match(
      fallbackBreakdownMapper,
      /mapRegistrationRichTextList\(group\.items, fallbackGroup\?\.items \?\? \[\]\)/,
    );
    assert.match(
      strictBreakdownMapper,
      /strictRegistrationRichTextList\(group\.items\)/,
    );
    assert.match(
      cmsOnlyMapper,
      /const overviewParagraphs = strictRegistrationRichTextList\(overview\.paragraphs\);/,
    );
    assert.match(breakdownSection, /<RegistrationRichTextView/);
    assert.match(breakdownSection, /value=\{item\}/);
    assert.doesNotMatch(breakdownSection, /<span className="min-w-0 break-words">\{item\}<\/span>/);
  });

  it("keeps all 19 service collections on the existing cache and media revalidation path", () => {
    const strapiAdapter = readFileSync(repositoryFile("frontend/lib/strapi.ts"), "utf8");
    const revalidation = readFileSync(repositoryFile("cms/src/revalidation.ts"), "utf8");
    const collectionList = sourceBetween(
      strapiAdapter,
      "const fixedServiceCollections = [",
      "] as const satisfies readonly FixedServiceCollectionConfig[];",
    );
    const allPageTags = sourceBetween(
      revalidation,
      "const ALL_PAGE_TAGS = [",
      "] as const;",
    );
    const cacheTagsByUid = sourceBetween(
      revalidation,
      "const cacheTagsByUid",
      "type NotificationPayload",
    );

    assert.equal(collectionList.match(/^\s+\w+Collection,$/gm)?.length, 19);
    for (const schemaName of fixedServiceSchemaNames) {
      const parts = schemaName.replace(/-page$/, "").split("-");
      const collectionVariable = `${parts[0]}${parts
        .slice(1)
        .map((part) => `${part[0]?.toUpperCase()}${part.slice(1)}`)
        .join("")}Collection`;
      const tag = `jr-${schemaName}s`;

      assert.match(
        strapiAdapter,
        new RegExp(
          `const ${collectionVariable} = \\{[\\s\\S]{0,300}?contentSlug: "${schemaName}"`,
        ),
      );
      assert.match(collectionList, new RegExp(`\\b${collectionVariable},`));
      assert.match(
        strapiAdapter,
        new RegExp(`"${schemaName}":\\s*"${tag}"`),
      );
      assert.match(allPageTags, new RegExp(`"${tag}"`));
      assert.match(
        cacheTagsByUid,
        new RegExp(
          `"api::${schemaName}\\.${schemaName}":\\s*\\[\\s*"${tag}",?\\s*\\]`,
        ),
      );
    }

    const fixedServiceRequest = sourceBetween(
      strapiAdapter,
      "async function getFixedServiceEntry",
      "export const getFixedServiceSitemapPagesFromStrapi",
    );
    assert.match(fixedServiceRequest, /revalidate: 60/);
    assert.match(
      fixedServiceRequest,
      /tags: \[strapiCacheTagBySlug\[collection\.contentSlug\]\]/,
    );

    const mediaRevalidation = sourceBetween(
      revalidation,
      "strapi.db.lifecycles.subscribe({",
      "\n  });\n}",
    );
    assert.match(mediaRevalidation, /models: \["plugin::upload\.file"\]/);
    for (const hook of ["afterCreate", "afterUpdate", "afterDelete"]) {
      assert.match(
        mediaRevalidation,
        new RegExp(
          `async ${hook}\\(event\\) \\{[\\s\\S]*?notifyFrontend\\(strapi, "media\\.update", event\\.model\\.uid, ALL_PAGE_TAGS, event\\.result\\);`,
        ),
      );
    }
  });

  it("keeps IEC Code fallback content identical to its CMS migration mirror", () => {
    assert.deepEqual(fallbackImportExportServicePages, importExportServiceSeedPages);
  });

  it("keeps Ayush License fallback content identical to its CMS migration mirror", () => {
    assert.deepEqual(
      fallbackGovernmentLicenseCertificationPages,
      governmentLicenseCertificationSeedPages,
    );
  });

  it("keeps the three new first-page fallbacks identical to their CMS mirrors", () => {
    assert.deepEqual(fallbackIprServicePages, iprServiceSeedPages);
    assert.deepEqual(fallbackFssaiServicePages, fssaiServiceSeedPages);
    assert.deepEqual(fallbackSebiBusinessRegistrationPages, sebiBusinessRegistrationSeedPages);
  });

  it("keeps the Tax, Labour, and Fund Raising fallbacks identical to their CMS mirrors", () => {
    assert.deepEqual(fallbackTaxAccountingPages, taxAccountingSeedPages);
    assert.deepEqual(fallbackLabourCompliancePages, labourComplianceSeedPages);
    assert.deepEqual(fallbackFundRaisingPages, fundRaisingSeedPages);
  });

  it("keeps the BIS and Pollution Advisory fallbacks identical to their CMS mirrors", () => {
    assert.deepEqual(fallbackBureauIndianStandardsPages, bureauIndianStandardsSeedPages);
    assert.deepEqual(fallbackPollutionAdvisoryPages, pollutionAdvisorySeedPages);
  });

  it("retains every approved fixed section from both legacy sources", () => {
    for (const [page, expectedWhyChooseItems] of [
      [fallbackImportExportServicePages[0], 4],
      [fallbackGovernmentLicenseCertificationPages[0], 4],
      [fallbackIprServicePages[0], 6],
      [fallbackFssaiServicePages[0], 3],
      [fallbackSebiBusinessRegistrationPages[0], 4],
      [fallbackLabourCompliancePages[0], 4],
      [fallbackFundRaisingPages[0], 4],
    ] as const) {
      assert.ok(page);
      assert.ok(page.overview.paragraphs.length >= 1);
      assert.ok(page.challenges.items.length >= 4);
      assert.ok(page.advantages.items.length >= 4);
      assert.equal(page.process.items.length, 6);
      assert.equal(page.whyChoose.items.length, expectedWhyChooseItems);
      assert.equal(page.breakdown.groups.length, 3);
      assert.equal(page.faqs.items.length, 5);
    }

    const gst = fallbackTaxAccountingPages[0];
    assert.ok(gst);
    assert.ok(gst.overview.paragraphs.length >= 1);
    assert.equal(gst.challenges.items.length, 4);
    assert.equal(gst.advantages.items.length, 3);
    assert.equal(gst.process.items.length, 6);
    assert.equal(gst.whyChoose.items.length, 4);
    assert.equal(gst.breakdown.groups.length, 3);
    assert.equal(gst.faqs.items.length, 5);
  });

  it("keeps every local corporate route slug globally unique", () => {
    const slugs = [
      ...companyRegistrationSlugs,
      ...mcaServiceSlugs,
      ...importExportServiceSlugs,
      ...governmentLicenseCertificationSlugs,
      ...iprServiceSlugs,
      ...fssaiServiceSlugs,
      ...sebiBusinessRegistrationSlugs,
      ...taxAccountingSlugs,
      ...labourComplianceSlugs,
      ...fundRaisingSlugs,
    ];

    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("keeps every local Approval route path unique", () => {
    const routePaths = [...bureauIndianStandardsSlugs, ...pollutionAdvisorySlugs];
    assert.equal(new Set(routePaths).size, routePaths.length);
  });

  it("resolves only the approved first-page fallbacks", () => {
    assert.equal(importExportServiceFallback("iec-registration")?.menuLabel, "IEC Code");
    assert.equal(governmentLicenseCertificationFallback("ayush-license")?.menuLabel, "Ayush License");
    assert.equal(importExportServiceFallback("ad-code-registration"), undefined);
    assert.equal(governmentLicenseCertificationFallback("trade-license"), undefined);
    assert.equal(iprServiceFallback("trademark-registration")?.menuLabel, "TRADEMARK Registration");
    assert.equal(fssaiServiceFallback("fssai-certificate")?.menuLabel, "Fssai Basic Registration");
    assert.equal(
      sebiBusinessRegistrationFallback("portfolio-manager-registration")?.menuLabel,
      "Portfolio Manager Registration",
    );
    assert.equal(iprServiceFallback("trademark-search"), undefined);
    assert.equal(fssaiServiceFallback("fssai-state-license"), undefined);
    assert.equal(sebiBusinessRegistrationFallback("sebi-mutual-fund"), undefined);
    assert.equal(taxAccountingFallback("gst-registration")?.menuLabel, "GST Registration");
    assert.equal(
      labourComplianceFallback("shop-and-establishment-act-registration")?.menuLabel,
      "Shop & Establishment Registration",
    );
    assert.equal(fundRaisingFallback("msme-registration")?.menuLabel, "MSME");
    assert.equal(taxAccountingFallback("gst-return"), undefined);
    assert.equal(labourComplianceFallback("esic-registration"), undefined);
    assert.equal(fundRaisingFallback("startup-india-registration"), undefined);
    assert.equal(
      bureauIndianStandardsFallback("isi-certificate")?.menuLabel,
      "ISI Certification",
    );
    assert.equal(
      pollutionAdvisoryFallback("epr-certification")?.menuLabel,
      "Extended Producer's Responsibility (EPR)",
    );
    assert.equal(bureauIndianStandardsFallback("bis-certification/fmcs-bis-certification"), undefined);
    assert.equal(pollutionAdvisoryFallback("epr-certification/e-waste-compliance"), undefined);
  });

  it("keeps later BIS and Pollution Advisory links on the services placeholder", () => {
    const approval = fallbackHomepage.navigation.find((item) => item.label === "Approval");
    const bis = approval?.categories?.find(
      (category) => category.title === "Bureau of Indian Standards (BIS)",
    );
    const pollution = approval?.categories?.find(
      (category) => category.title === "Pollution Advisory",
    );

    assert.equal(
      bis?.links[0]?.href,
      "/approval/bureau-indian-standards/isi-certificate",
    );
    assert.ok(bis?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(
      pollution?.links[0]?.href,
      "/approval/pollution-advisory/epr-certification",
    );
    assert.ok(pollution?.links.slice(1).every((link) => link.href === "/#services"));
  });

  it("keeps unimplemented links in both new categories on the services placeholder", () => {
    const corporate = fallbackHomepage.navigation.find((item) => item.label === "Corporate");
    const importExport = corporate?.categories?.find(
      (category) => category.title === "Import Export Service",
    );
    const government = corporate?.categories?.find(
      (category) => category.title === "Government License & Certification",
    );
    const ipr = corporate?.categories?.find((category) => category.title === "IPR Services");
    const fssai = corporate?.categories?.find((category) => category.title === "FSSAI");
    const sebi = corporate?.categories?.find(
      (category) => category.title === "SEBI Business Registration",
    );
    const taxAccounting = corporate?.categories?.find(
      (category) => category.title === "Tax and Accounting",
    );
    const labourCompliance = corporate?.categories?.find(
      (category) => category.title === "Labour Compliance",
    );
    const fundRaising = corporate?.categories?.find(
      (category) => category.title === "Fund Raising",
    );

    assert.equal(importExport?.links[0]?.href, "/corporate/import-export/iec-registration");
    assert.ok(importExport?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(
      government?.links[0]?.href,
      "/corporate/government-license-certification/ayush-license",
    );
    assert.ok(government?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(ipr?.links[0]?.href, "/corporate/ipr-services/trademark-registration");
    assert.ok(ipr?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(fssai?.links[0]?.href, "/corporate/fssai/fssai-certificate");
    assert.ok(fssai?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(
      sebi?.links[0]?.href,
      "/corporate/sebi-business-registration/portfolio-manager-registration",
    );
    assert.ok(sebi?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(taxAccounting?.links[0]?.href, "/corporate/tax-accounting/gst-registration");
    assert.ok(taxAccounting?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(
      labourCompliance?.links[0]?.href,
      "/corporate/labour-compliance/shop-and-establishment-act-registration",
    );
    assert.ok(labourCompliance?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(fundRaising?.links[0]?.href, "/corporate/fund-raising/msme-registration");
    assert.ok(fundRaising?.links.slice(1).every((link) => link.href === "/#services"));
  });
});
