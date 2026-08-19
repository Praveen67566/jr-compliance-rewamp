import "server-only";

import type {
  AboutPageContent,
  AboutValue,
  Achievement,
  CareerGalleryItem,
  CareerRole,
  CareerTestimonial,
  CareersPageContent,
  CompanyRegistrationPageContent,
  BureauIndianStandardsPageContent,
  ContactPageContent,
  ContactPoint,
  Faq,
  FaqCategory,
  FooterContent,
  FooterLinkGroup,
  FssaiServicePageContent,
  FundRaisingPageContent,
  GovernmentLicenseCertificationPageContent,
  HomepageContent,
  ImportExportServicePageContent,
  Insight,
  IprServicePageContent,
  LabourCompliancePageContent,
  PollutionAdvisoryPageContent,
  LegalNotice,
  LeadFormSettings,
  LeadFormTrustItem,
  Link,
  Logo,
  Metric,
  McaServicePageContent,
  NavigationCategory,
  NavigationItem,
  PageChromeContent,
  Recognition,
  RegistrationBreakdownGroup,
  RegistrationDetail,
  SebiBusinessRegistrationPageContent,
  Service,
  ServiceCategory,
  Seo,
  SocialLink,
  TaxAccountingPageContent,
  TeamMember,
  Testimonial,
  TimelineEvent,
} from "@/lib/types";

type UnknownRecord = Record<string, unknown>;
export type SingleTypeSlug =
  | "home-page"
  | "site-setting"
  | "about-page"
  | "careers-page"
  | "contact-page";
export type RevalidatableContentSlug =
  | SingleTypeSlug
  | "company-registration-page"
  | "mca-service-page"
  | "import-export-service-page"
  | "government-license-certification-page"
  | "ipr-service-page"
  | "fssai-service-page"
  | "sebi-business-registration-page"
  | "tax-accounting-page"
  | "labour-compliance-page"
  | "fund-raising-page"
  | "bureau-indian-standards-page"
  | "pollution-advisory-page";
type PopulateValue = true | PopulateTree;

interface PopulateTree {
  [field: string]: PopulateValue;
}

const strapiUrl = process.env.STRAPI_URL?.replace(/\/$/, "");
const strapiApiToken = process.env.STRAPI_API_TOKEN;

/** Shared by the Strapi adapter and the signed publish-webhook receiver. */
export const strapiCacheTagBySlug: Record<RevalidatableContentSlug, string> = {
  "site-setting": "jr-site-settings",
  "home-page": "jr-homepage",
  "about-page": "jr-about-page",
  "careers-page": "jr-careers-page",
  "contact-page": "jr-contact-page",
  "company-registration-page": "jr-company-registration-pages",
  "mca-service-page": "jr-mca-service-pages",
  "import-export-service-page": "jr-import-export-service-pages",
  "government-license-certification-page": "jr-government-license-certification-pages",
  "ipr-service-page": "jr-ipr-service-pages",
  "fssai-service-page": "jr-fssai-service-pages",
  "sebi-business-registration-page": "jr-sebi-business-registration-pages",
  "tax-accounting-page": "jr-tax-accounting-pages",
  "labour-compliance-page": "jr-labour-compliance-pages",
  "fund-raising-page": "jr-fund-raising-pages",
  "bureau-indian-standards-page": "jr-bureau-indian-standards-pages",
  "pollution-advisory-page": "jr-pollution-advisory-pages",
};

/**
 * Strapi v5 does not populate relations, media, or components by default.
 * Keep the population contract explicit and centralized; unbounded `deep`
 * population is intentionally avoided for performance and schema safety.
 */
const populateTrees: Record<SingleTypeSlug, PopulateTree> = {
  "site-setting": {
    headerLogo: true,
    footerLogo: true,
    headerMenu: { children: true, categories: { links: true } },
    headerCta: true,
    footerCta: true,
    footerLinkGroups: { links: true },
    contact: true,
    legalLinks: true,
    legalNotices: true,
    socialLinks: true,
    leadForm: {
      privacyLink: true,
      trustItems: { logo: true, link: true },
    },
    defaultSeo: { shareImage: true },
  },
  "home-page": {
    hero: {
      rotatingTerms: true,
      heroImage: true,
      cta: true,
      cards: { image: true, icon: true, cta: true },
    },
    trustedLogos: { logo: true },
    servicesHeading: true,
    serviceCategories: { services: { icon: true, link: true } },
    whyUs: { heading: true, cards: { image: true } },
    regulatorsHeading: true,
    regulatorLogos: { logo: true },
    story: { heading: true, stats: { icon: true }, featureImage: true, cta: true },
    tickerCta: { cta: true },
    testimonialsHeading: true,
    testimonials: { personPhoto: true, companyLogo: true },
    recognitionHeading: true,
    recognitions: { sourceLogo: true, coverImage: true, link: true },
    faqHeading: true,
    faqCategories: { faqs: true },
    insightsHeading: true,
    insights: { image: true, link: true },
    finalCta: { cta: true },
    seo: { shareImage: true },
  },
  "about-page": {
    hero: { cta: true, image: true },
    overview: { stats: true },
    mantra: { items: { image: true } },
    whyPartner: { items: { image: true } },
    pioneers: { stats: true },
    storyHeading: true,
    timelineEvents: true,
    teamHeading: true,
    teamFeatureImage: true,
    teamCta: true,
    teamMembers: { photo: true, profileLink: true },
    achievementsHeading: true,
    achievements: { logo: true },
    finalCta: { cta: true },
    seo: { shareImage: true },
  },
  "careers-page": {
    hero: { cta: true },
    purpose: true,
    values: { heading: true, items: { image: true } },
    lifeAtJr: { heading: true },
    careerGallery: { image: true },
    openingsHeading: true,
    careerOpenings: true,
    benefits: { heading: true, items: { image: true } },
    testimonialsHeading: true,
    careerTestimonials: { photo: true },
    faqHeading: true,
    careerFaqs: true,
    finalCta: { cta: true },
    seo: { shareImage: true },
  },
  "contact-page": {
    hero: true,
    contactPoints: { icon: true },
    enquiry: { directCta: true },
    response: { steps: true },
    finalCta: { cta: true },
    seo: { shareImage: true },
  },
};

const fixedServiceDetailPopulateTree: PopulateTree = {
  hero: { cta: true },
  overview: { paragraphs: true },
  challenges: { items: true },
  advantages: { items: true },
  process: { items: true },
  whyChoose: { items: true },
  breakdown: { groups: { items: true } },
  faqs: { items: true },
  finalCta: { cta: true },
  seo: { shareImage: true },
};

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/**
 * Relations are editor-orderable in Strapi, but every collection also has a
 * required sortOrder. Keep the API response stable when relation ordering is
 * unavailable (for example after an export/import).
 */
function orderedEntries(value: unknown): unknown[] {
  return asArray(value)
    .map((entry, index) => {
      const sortOrder = record(entry).sortOrder;
      return {
        entry,
        index,
        sortOrder:
          typeof sortOrder === "number" && Number.isFinite(sortOrder)
            ? sortOrder
            : typeof sortOrder === "string" && /^\d+$/.test(sortOrder)
              ? Number(sortOrder)
              : undefined,
      };
    })
    .sort((left, right) => {
      if (left.sortOrder === undefined && right.sortOrder === undefined) {
        return left.index - right.index;
      }

      if (left.sortOrder === undefined) {
        return 1;
      }

      if (right.sortOrder === undefined) {
        return -1;
      }

      return left.sortOrder - right.sortOrder || left.index - right.index;
    })
    .map(({ entry }) => entry);
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function record(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {};
}

function boolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function titleFromHeading(value: unknown, fallback: string): string {
  const heading = record(value);
  const result = [heading.titleBefore, heading.titleHighlight, heading.titleAfter]
    .map(text)
    .filter((part): part is string => Boolean(part))
    .join(" ");

  return result || fallback;
}

function titleFromComponent(value: unknown, fallback: string): string {
  return text(record(value).title) ?? titleFromHeading(value, fallback);
}

function richTextToPlainText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(richTextToPlainText).filter(Boolean).join(" ");
  }

  if (!isRecord(value)) {
    return "";
  }

  const ownText = text(value.text) ?? "";
  const children = richTextToPlainText(value.children);
  return [ownText, children].filter(Boolean).join(" ");
}

function mediaUrl(value: unknown): string | undefined {
  const url = text(record(value).url);
  if (!url) {
    return undefined;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return strapiUrl ? new URL(url, strapiUrl).toString() : url;
}

function targetFromStrapi(value: unknown): Link["target"] | undefined {
  const target = text(record(value).target);
  if (target === "new_tab" || target === "_blank") {
    return "_blank";
  }

  if (target === "same_tab" || target === "_self") {
    return "_self";
  }

  return undefined;
}

function link(value: unknown, fallback: Link): Link {
  const source = record(value);
  const target = targetFromStrapi(value) ?? fallback.target;

  return {
    label: text(source.label) ?? fallback.label,
    href: text(source.href) ?? fallback.href,
    ...(target ? { target } : {}),
  };
}

function hasLink(value: unknown): boolean {
  const source = record(value);
  return Boolean(text(source.label) && text(source.href));
}

function mapSeo(value: unknown, fallback: Seo, rawDefaultSeo?: unknown): Seo {
  const seo = record(value);
  const defaultSeo = record(rawDefaultSeo);
  const noIndex = boolean(seo.noIndex) ?? boolean(defaultSeo.noIndex) ?? fallback.noIndex;
  const canonicalUrl = text(seo.canonicalUrl) ?? text(defaultSeo.canonicalUrl) ?? fallback.canonicalUrl;
  const shareImage = mediaUrl(seo.shareImage) ?? mediaUrl(defaultSeo.shareImage) ?? fallback.shareImage;

  return {
    title: text(seo.metaTitle) ?? text(defaultSeo.metaTitle) ?? fallback.title,
    description: text(seo.metaDescription) ?? text(defaultSeo.metaDescription) ?? fallback.description,
    ...(canonicalUrl ? { canonicalUrl } : {}),
    ...(noIndex !== undefined ? { noIndex } : {}),
    ...(shareImage ? { shareImage } : {}),
  };
}

function shortLabel(value: string): string {
  const initials = value
    .replace(/\([^)]*\)/g, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return initials || "JR";
}

function mapNavigation(value: unknown, fallback: NavigationItem[]): NavigationItem[] {
  const menu = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const label = text(item.label);
      if (!label) {
        return null;
      }

      const children = asArray(item.children)
        .map((child) => {
          const childRecord = record(child);
          const childLabel = text(childRecord.label);
          const href = text(childRecord.href);
          return childLabel && href ? link(child, { label: childLabel, href }) : null;
        })
        .filter((child): child is Link => Boolean(child));
      const fallbackItem = fallback.find((fallbackEntry) => fallbackEntry.label === label);
      const categories = asArray(item.categories)
        .map((entry) => {
          const category = record(entry);
          const title = text(category.title);
          const links = asArray(category.links)
            .map((categoryLink) => {
              const categoryLinkRecord = record(categoryLink);
              const categoryLinkLabel = text(categoryLinkRecord.label);
              const href = text(categoryLinkRecord.href);

              return categoryLinkLabel && href
                ? link(categoryLink, { label: categoryLinkLabel, href })
                : null;
            })
            .filter((categoryLink): categoryLink is Link => Boolean(categoryLink));

          return title && links.length ? { title, links } : null;
        })
        .filter((category): category is NavigationCategory => Boolean(category));

      return {
        label,
        href: text(item.href) ?? children[0]?.href ?? "#services",
        ...(children.length ? { children } : {}),
        // Older CMS entries do not have nested categories. Keep the approved
        // local menu available until those records are migrated in Strapi.
        ...(categories.length
          ? { categories }
          : fallbackItem?.categories
            ? { categories: fallbackItem.categories }
            : {}),
      };
    })
    .filter((item): item is NavigationItem => Boolean(item));

  return menu.length ? menu : fallback;
}

function mapLogos(value: unknown, fallback: Logo[]): Logo[] {
  const logos = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const name = text(item.name);
      const src = mediaUrl(item.logo);
      const href = text(item.websiteUrl);
      return name && src ? { name, src, ...(href ? { href } : {}) } : null;
    })
    .filter((logo): logo is Logo => Boolean(logo));

  return logos.length ? logos : fallback;
}

function mapServiceCategories(
  value: unknown,
  fallback: ServiceCategory[],
): ServiceCategory[] {
  const categories = orderedEntries(value)
    .map((entry) => {
      const category = record(entry);
      const title = text(category.name);
      if (!title) {
        return null;
      }

      const id = text(category.slug) ?? title.toLowerCase().replace(/\s+/g, "-");
      const fallbackCategory = fallback.find(
        (candidate) => candidate.id === id || candidate.title.toLowerCase() === title.toLowerCase(),
      );
      const services = orderedEntries(category.services)
        .map((serviceEntry) => {
          const service = record(serviceEntry);
          const label = text(service.title);
          if (!label) {
            return null;
          }

          const fallbackService = fallbackCategory?.services.find(
            (candidate) => candidate.label.toLowerCase() === label.toLowerCase(),
          );
          const serviceLink = link(service.link, fallbackService ?? { label, href: "#contact" });
          const icon = mediaUrl(service.icon) ?? fallbackService?.icon;
          const summary = text(service.summary) ?? fallbackService?.summary;
          const mapped: Service = {
            label,
            href: serviceLink.href,
            shortLabel: fallbackService?.shortLabel ?? shortLabel(label),
            ...(serviceLink.target ? { target: serviceLink.target } : {}),
            ...(summary ? { summary } : {}),
            ...(icon ? { icon } : {}),
          };
          return mapped;
        })
        .filter((service): service is Service => Boolean(service));

      return services.length
        ? {
            id,
            title,
            services,
          }
        : null;
    })
    .filter((category): category is ServiceCategory => Boolean(category));

  return categories.length ? categories : fallback;
}

function mapMetrics(value: unknown, fallback: Metric[]): Metric[] {
  const metrics = orderedEntries(value)
    .map((entry) => {
      const stat = record(entry);
      const number = stat.value;
      const label = text(stat.label);
      const suffix = text(stat.suffix) ?? "";
      const value = typeof number === "number" || typeof number === "string" ? `${number}${suffix}` : undefined;
      const icon = mediaUrl(stat.icon);
      return label && value ? { label, value, ...(icon ? { icon } : {}) } : null;
    })
    .filter((metric): metric is Metric => Boolean(metric));

  return metrics.length ? metrics : fallback;
}

function mapTestimonials(value: unknown, fallback: Testimonial[]): Testimonial[] {
  const testimonials = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const quote = text(item.quote);
      const name = text(item.personName);
      if (!quote || !name) {
        return null;
      }

      const publishedOn = text(item.publishedOn);
      const image = mediaUrl(item.personPhoto);
      const companyLogo = mediaUrl(item.companyLogo);
      return {
        quote,
        name,
        company: text(item.companyName) ?? "JR Compliance client",
        publishedOn: publishedOn ? `Published on ${publishedOn}` : "",
        ...(text(item.personRole) ? { role: text(item.personRole) } : {}),
        ...(image ? { image } : {}),
        ...(companyLogo ? { companyLogo } : {}),
      };
    })
    .filter((testimonial): testimonial is Testimonial => Boolean(testimonial));

  return testimonials.length ? testimonials : fallback;
}

function mapRecognitions(value: unknown, fallback: Recognition[]): Recognition[] {
  const recognitions = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const title = text(item.title);
      const summary = text(item.excerpt);
      if (!title || !summary) {
        return null;
      }

      const recognitionLink = link(item.link, { label: "Read more", href: "#contact" });
      const sourceLogo = mediaUrl(item.sourceLogo);
      const coverImage = mediaUrl(item.coverImage);
      return {
        title,
        summary,
        href: recognitionLink.href,
        ...(recognitionLink.target ? { target: recognitionLink.target } : {}),
        linkLabel: recognitionLink.label,
        ...(text(item.category) ? { category: text(item.category) } : {}),
        ...(text(item.sourceName) ? { sourceName: text(item.sourceName) } : {}),
        ...(sourceLogo ? { sourceLogo } : {}),
        ...(coverImage ? { coverImage } : {}),
      };
    })
    .filter((recognition): recognition is Recognition => Boolean(recognition));

  return recognitions.length ? recognitions : fallback;
}

function mapFaqs(value: unknown, fallback: FaqCategory[]): FaqCategory[] {
  const categories = orderedEntries(value)
    .map((entry) => {
      const category = record(entry);
      const title = text(category.name);
      if (!title) {
        return null;
      }

      const items = orderedEntries(category.faqs)
        .map((faqEntry) => {
          const faq = record(faqEntry);
          const question = text(faq.question);
          const answer = richTextToPlainText(faq.answer);
          return question && answer ? { question, answer } : null;
        })
        .filter((faq): faq is Faq => Boolean(faq));
      const icon = mediaUrl(category.icon);

      return items.length
        ? {
            id: text(category.slug) ?? title.toLowerCase().replace(/\s+/g, "-"),
            title,
            items,
            ...(icon ? { icon } : {}),
          }
        : null;
    })
    .filter((category): category is FaqCategory => Boolean(category));

  return categories.length ? categories : fallback;
}

function mapInsights(value: unknown): Insight[] {
  return orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const title = text(item.title);
      const summary = text(item.summary);
      const kind = text(item.kind);
      const image = mediaUrl(item.image);
      if (!title || !summary || (kind !== "article" && kind !== "video") || !image) {
        return null;
      }

      const insightLink = link(item.link, { label: "Read insight", href: "#contact" });
      const publishedOn = text(item.publishedOn);
      return {
        title,
        summary,
        kind,
        image,
        imageAlt: text(record(item.image).alternativeText) ?? title,
        href: insightLink.href,
        ...(insightLink.target ? { target: insightLink.target } : {}),
        linkLabel: insightLink.label,
        ...(publishedOn ? { publishedOn } : {}),
      };
    })
    .filter((item): item is Insight => Boolean(item));
}

function mapSocialLinks(value: unknown, fallback: SocialLink[]): SocialLink[] {
  const identity: Record<string, Pick<SocialLink, "label" | "abbreviation">> = {
    linkedin: { label: "LinkedIn", abbreviation: "in" },
    facebook: { label: "Facebook", abbreviation: "f" },
    x: { label: "X", abbreviation: "X" },
    youtube: { label: "YouTube", abbreviation: "▶" },
    instagram: { label: "Instagram", abbreviation: "◎" },
  };

  const links = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const network = text(item.network)?.toLowerCase();
      const href = text(item.url);
      const social = network ? identity[network] : undefined;
      return social && href ? { ...social, href } : null;
    })
    .filter((social): social is SocialLink => Boolean(social));

  return links.length ? links : fallback;
}

function mapLinkGroups(value: unknown, fallback: FooterContent): FooterContent {
  const groups = asArray(value)
    .map((entry) => {
      const group = record(entry);
      const title = text(group.title);
      const links = asArray(group.links)
        .map((entryLink) => {
          const item = record(entryLink);
          const label = text(item.label);
          const href = text(item.href);
          return label && href ? link(entryLink, { label, href }) : null;
        })
        .filter((item): item is Link => Boolean(item));

      return title && links.length ? { title, links } : null;
    })
    .filter((group): group is FooterLinkGroup => Boolean(group));

  const featured = groups.find((group) => group.title.toLowerCase().includes("featured"))?.links;
  const popular = groups.find((group) => group.title.toLowerCase().includes("popular"))?.links;

  return {
    ...fallback,
    ...(groups.length ? { linkGroups: groups } : {}),
    ...(featured ? { featuredLinks: featured } : {}),
    ...(popular ? { popularServices: popular } : {}),
  };
}

function mapLegalNotices(value: unknown): LegalNotice[] {
  const notices = asArray(value)
    .map((entry) => {
      const notice = record(entry);
      const heading = text(notice.title) ?? "Legal notice";
      const body = richTextToPlainText(notice.body);
      return body ? { title: heading, body } : null;
    })
    .filter((notice): notice is LegalNotice => Boolean(notice));

  return notices;
}

function localRedirectPath(value: unknown, fallback: string): string {
  const candidate = text(value);
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//") || candidate.includes("\\")) {
    return fallback;
  }

  try {
    const base = new URL("https://jr-compliance.invalid");
    const parsed = new URL(candidate, base);
    return parsed.origin === base.origin ? `${parsed.pathname}${parsed.search}${parsed.hash}` : fallback;
  } catch {
    return fallback;
  }
}

function mapLeadFormSettings(value: unknown, fallback: LeadFormSettings): LeadFormSettings {
  const settings = record(value);
  const trustItems = asArray(settings.trustItems)
    .map((entry) => {
      const item = record(entry);
      const name = text(item.name);
      if (!name) {
        return null;
      }

      const logo = mediaUrl(item.logo);
      const itemLink = hasLink(item.link)
        ? link(item.link, { label: name, href: "#" })
        : undefined;

      return {
        name,
        ...(logo ? { logo } : {}),
        ...(itemLink ? { link: itemLink } : {}),
      };
    })
    .filter((item): item is LeadFormTrustItem => Boolean(item));

  return {
    enabled: boolean(settings.enabled) ?? fallback.enabled,
    heading: text(settings.heading) ?? fallback.heading,
    subtitle: text(settings.subtitle) ?? fallback.subtitle,
    nameLabel: text(settings.nameLabel) ?? fallback.nameLabel,
    namePlaceholder: text(settings.namePlaceholder) ?? fallback.namePlaceholder,
    emailLabel: text(settings.emailLabel) ?? fallback.emailLabel,
    emailPlaceholder: text(settings.emailPlaceholder) ?? fallback.emailPlaceholder,
    phoneLabel: text(settings.phoneLabel) ?? fallback.phoneLabel,
    phonePlaceholder: text(settings.phonePlaceholder) ?? fallback.phonePlaceholder,
    messageLabel: text(settings.messageLabel) ?? fallback.messageLabel,
    messagePlaceholder: text(settings.messagePlaceholder) ?? fallback.messagePlaceholder,
    consentText: text(settings.consentText) ?? fallback.consentText,
    privacyLink: link(settings.privacyLink, fallback.privacyLink),
    submitLabel: text(settings.submitLabel) ?? fallback.submitLabel,
    submittingLabel: text(settings.submittingLabel) ?? fallback.submittingLabel,
    successTitle: text(settings.successTitle) ?? fallback.successTitle,
    successMessage: text(settings.successMessage) ?? fallback.successMessage,
    redirectPath: localRedirectPath(settings.redirectPath, fallback.redirectPath),
    secureLabel: text(settings.secureLabel) ?? fallback.secureLabel,
    durationLabel: text(settings.durationLabel) ?? fallback.durationLabel,
    noSpamLabel: text(settings.noSpamLabel) ?? fallback.noSpamLabel,
    trustHeading: text(settings.trustHeading) ?? fallback.trustHeading,
    trustDescription: text(settings.trustDescription) ?? fallback.trustDescription,
    trustItems: trustItems.length ? trustItems : fallback.trustItems,
    experienceText: text(settings.experienceText) ?? fallback.experienceText,
  };
}

/** Maps the shared site-setting record once so every route has identical chrome. */
function mapPageChrome(fallback: PageChromeContent, rawSettings: unknown): PageChromeContent {
  const settings = record(rawSettings);
  const siteContact = record(settings.contact);
  const headerLogo = mediaUrl(settings.headerLogo);
  const footerLogo = mediaUrl(settings.footerLogo);
  const whatsAppHref = text(siteContact.whatsAppUrl);
  const legalNotices = mapLegalNotices(settings.legalNotices);

  return {
    site: {
      ...fallback.site,
      name: text(settings.siteName) ?? fallback.site.name,
      ...(headerLogo ? { logo: headerLogo } : {}),
      ...(footerLogo ? { footerLogo } : {}),
      headerCta: link(settings.headerCta, fallback.site.headerCta),
      ...(hasLink(settings.footerCta)
        ? { footerCta: link(settings.footerCta, fallback.site.footerCta ?? fallback.site.headerCta) }
        : fallback.site.footerCta
          ? { footerCta: fallback.site.footerCta }
          : {}),
      phone: text(siteContact.phoneDisplay) ?? fallback.site.phone,
      phoneHref: text(siteContact.phoneE164)
        ? `tel:${text(siteContact.phoneE164)?.replace(/\s/g, "")}`
        : fallback.site.phoneHref,
      email: text(siteContact.email) ?? fallback.site.email,
      ...(whatsAppHref ? { whatsAppHref } : {}),
      footerTagline: text(settings.footerTagline) ?? fallback.site.footerTagline,
      copyrightText: text(settings.copyrightText) ?? fallback.site.copyrightText,
      leadForm: mapLeadFormSettings(settings.leadForm, fallback.site.leadForm),
      legalLinks: asArray(settings.legalLinks).length
        ? asArray(settings.legalLinks).map((item, index) =>
            link(item, fallback.site.legalLinks[index] ?? fallback.site.legalLinks[0]),
          )
        : fallback.site.legalLinks,
      socialLinks: mapSocialLinks(settings.socialLinks, fallback.site.socialLinks),
    },
    navigation: mapNavigation(settings.headerMenu, fallback.navigation),
    footer: {
      ...mapLinkGroups(settings.footerLinkGroups, fallback.footer),
      ...(legalNotices.length ? { legalNotices } : {}),
    },
  };
}

function mapValueItems(value: unknown, fallback: AboutValue[]): AboutValue[] {
  const items = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const title = text(item.title) ?? text(item.name);
      const description = text(item.description) ?? text(item.body);
      const image = mediaUrl(item.image);
      return title && description
        ? {
            title,
            description,
            ...(image ? { image, imageAlt: text(record(item.image).alternativeText) ?? title } : {}),
          }
        : null;
    })
    .filter((item): item is AboutValue => Boolean(item));

  return items.length ? items : fallback;
}

function mapTimeline(value: unknown, fallback: TimelineEvent[]): TimelineEvent[] {
  const events = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const period = text(item.period);
      const title = text(item.title);
      const description = text(item.description) ?? richTextToPlainText(item.body);
      return period && title && description ? { period, title, description } : null;
    })
    .filter((item): item is TimelineEvent => Boolean(item));

  return events.length ? events : fallback;
}

function mapTeamMembers(value: unknown, fallback: TeamMember[]): TeamMember[] {
  const members = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const name = text(item.name);
      const role = text(item.role);
      const image = mediaUrl(item.photo);
      const profile = record(item.profileLink);
      const profileHref = text(profile.href) ?? text(item.profileHref);
      const profileTarget = targetFromStrapi(profile);
      const profileLabel = text(profile.label);
      return name && role
        ? {
            name,
            role,
            ...(image ? { image } : {}),
            ...(profileHref ? { profileHref } : {}),
            ...(profileTarget ? { profileTarget } : {}),
            ...(profileLabel ? { profileLabel } : {}),
          }
        : null;
    })
    .filter((item): item is TeamMember => Boolean(item));

  return members.length ? members : fallback;
}

function mapAchievements(value: unknown, fallback: Achievement[]): Achievement[] {
  const achievements = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const title = text(item.title);
      const description = text(item.description) ?? text(item.body);
      const image = mediaUrl(item.logo);
      return title && description ? { title, description, ...(image ? { image } : {}) } : null;
    })
    .filter((item): item is Achievement => Boolean(item));

  return achievements.length ? achievements : fallback;
}

function mapCareerRoles(value: unknown, fallback: CareerRole[]): CareerRole[] {
  const roles = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      if (boolean(item.isOpen) === false) {
        return null;
      }

      const title = text(item.title);
      if (!title) {
        return null;
      }

      const fallbackRole = fallback.find((role) => role.title.toLowerCase() === title.toLowerCase());
      const summary = text(item.summary) ?? text(item.description);
      const applyLink = link(
        item.applyLink,
        fallbackRole
          ? { label: fallbackRole.applyLabel, href: fallbackRole.href, target: fallbackRole.target }
          : { label: "Express interest", href: "/contact-us" },
      );
      const workModel = text(item.workModel) ?? text(item.employmentType);
      const employmentType =
        workModel === "on_site"
          ? "On-site"
          : workModel === "hybrid"
            ? "Hybrid"
            : workModel === "remote"
              ? "Remote"
              : workModel ?? fallbackRole?.employmentType ?? "On-site";
      return summary
        ? {
            title,
            department: text(item.department) ?? fallbackRole?.department ?? "JR Compliance",
            location: text(item.location) ?? fallbackRole?.location ?? "Delhi, India",
            employmentType,
            summary,
            applyLabel: applyLink.label,
            href: applyLink.href,
            ...(applyLink.target ? { target: applyLink.target } : {}),
          }
        : null;
    })
    .filter((item): item is CareerRole => Boolean(item));

  return roles.length ? roles : fallback;
}

function mapCareerGallery(value: unknown, fallback: CareerGalleryItem[]): CareerGalleryItem[] {
  const gallery = orderedEntries(value)
    .map((entry, index) => {
      const item = record(entry);
      const imageRecord = record(item.image);
      const src = mediaUrl(item.image);
      if (!src) {
        return null;
      }

      return {
        src,
        alt:
          text(item.alternativeText) ??
          text(imageRecord.alternativeText) ??
          fallback[index]?.alt ??
          "JR Compliance workplace culture",
        ...(text(item.caption) ? { caption: text(item.caption) } : {}),
      };
    })
    .filter((item): item is CareerGalleryItem => Boolean(item));

  return gallery.length ? gallery : fallback;
}

function mapCareerTestimonials(value: unknown, fallback: CareerTestimonial[]): CareerTestimonial[] {
  const testimonials = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const quote = text(item.quote);
      const name = text(item.personName) ?? text(item.name);
      const role = text(item.role);
      const image = mediaUrl(item.photo);
      return quote && name && role ? { quote, name, role, ...(image ? { image } : {}) } : null;
    })
    .filter((item): item is CareerTestimonial => Boolean(item));

  return testimonials.length ? testimonials : fallback;
}

function mapSimpleFaqs(value: unknown, fallback: Faq[]): Faq[] {
  const faqs = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const question = text(item.question);
      const answer = richTextToPlainText(item.answer);
      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is Faq => Boolean(item));

  return faqs.length ? faqs : fallback;
}

function mapContactPoints(value: unknown, fallback: ContactPoint[]): ContactPoint[] {
  const points = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const label = text(item.label);
      const pointValue = text(item.value);
      const href = text(item.href);
      const detail = text(item.detail);
      const icon = mediaUrl(item.icon);
      return label && pointValue && href && detail
        ? { label, value: pointValue, href, detail, ...(icon ? { icon } : {}) }
        : null;
    })
    .filter((item): item is ContactPoint => Boolean(item));

  return points.length ? points : fallback;
}

function mapTextList(value: unknown, fallback: string[]): string[] {
  const items = asArray(value)
    .map((item) => text(record(item).label) ?? text(record(item).title) ?? text(record(item).text) ?? text(item))
    .filter((item): item is string => Boolean(item));

  return items.length ? items : fallback;
}

function mapHomepage(
  fallback: HomepageContent,
  rawPage: unknown,
  rawSettings: unknown,
): HomepageContent {
  const page = record(rawPage);
  const chrome = mapPageChrome(fallback, rawSettings);
  const hero = record(page.hero);
  const story = record(page.story);
  const finalCta = record(page.finalCta);
  const tickerCta = record(page.tickerCta);
  const regulatorsHeading = record(page.regulatorsHeading);
  const testimonialsHeading = record(page.testimonialsHeading);
  const recognitionHeading = record(page.recognitionHeading);
  const faqHeading = record(page.faqHeading);
  const insightsHeading = record(page.insightsHeading);
  const heroCards = asArray(hero.cards).map(record);
  const rotatingWords = asArray(hero.rotatingTerms)
    .map((term) => text(record(term).text))
    .filter((term): term is string => Boolean(term))
    .slice(0, 8);
  const whyUs = record(page.whyUs);

  const heroImage = mediaUrl(hero.heroImage);
  const heroSupportCards = heroCards
    .map((card) => {
      const title = text(card.title);
      if (!title) {
        return null;
      }

      const image = mediaUrl(card.image);
      const icon = mediaUrl(card.icon);
      const cta = hasLink(card.cta) ? link(card.cta, { label: title, href: "#contact" }) : undefined;
      return {
        title,
        ...(text(card.description) ? { description: text(card.description) } : {}),
        ...(image ? { image, imageAlt: text(record(card.image).alternativeText) ?? title } : {}),
        ...(icon ? { icon, iconAlt: text(record(card.icon).alternativeText) ?? "" } : {}),
        ...(cta ? { cta } : {}),
      };
    })
    .filter((card): card is HomepageContent["hero"]["supportingCards"][number] => Boolean(card));
  const whyCards = asArray(whyUs.cards)
    .map((entry) => {
      const card = record(entry);
      const title = text(card.title);
      const image = mediaUrl(card.image);
      return title
        ? {
            title,
            ...(text(card.description) ? { description: text(card.description) } : {}),
            ...(image ? { image, imageAlt: text(record(card.image).alternativeText) ?? title } : {}),
          }
        : null;
    })
    .filter((card): card is HomepageContent["whyUs"]["cards"][number] => Boolean(card));
  const insightItems = mapInsights(page.insights);
  const tickerTitle = text(tickerCta.title);

  return {
    ...fallback,
    ...chrome,
    seo: mapSeo(page.seo, fallback.seo),
    hero: {
      ...fallback.hero,
      prefix: text(hero.titleBefore) ?? fallback.hero.prefix,
      rotatingWords: rotatingWords.length ? rotatingWords : fallback.hero.rotatingWords,
      suffix: text(hero.titleAfter) ?? fallback.hero.suffix,
      description: text(hero.description) ?? fallback.hero.description,
      primaryCta: link(hero.cta, fallback.hero.primaryCta),
      ...(heroImage ? { image: heroImage } : {}),
      imageAlt: text(record(hero.heroImage).alternativeText) ?? fallback.hero.imageAlt,
      ...(heroSupportCards.length ? { supportingCards: heroSupportCards } : {}),
    },
    trustedLogos: mapLogos(page.trustedLogos, fallback.trustedLogos),
    services: {
      ...fallback.services,
      eyebrow: text(record(page.servicesHeading).eyebrow) ?? fallback.services.eyebrow,
      title: titleFromHeading(page.servicesHeading, fallback.services.title),
      description:
        text(record(page.servicesHeading).description) ?? fallback.services.description,
      categories: mapServiceCategories(page.serviceCategories, fallback.services.categories),
    },
    whyUs: {
      ...fallback.whyUs,
      eyebrow: text(record(whyUs.heading).eyebrow) ?? fallback.whyUs.eyebrow,
      title: titleFromHeading(whyUs.heading, fallback.whyUs.title),
      description: text(record(whyUs.heading).description) ?? fallback.whyUs.description,
      ...(whyCards.length ? { cards: whyCards } : {}),
    },
    regulators: {
      ...fallback.regulators,
      eyebrow: text(regulatorsHeading.eyebrow) ?? fallback.regulators.eyebrow,
      title: titleFromHeading(regulatorsHeading, fallback.regulators.title),
      description: text(regulatorsHeading.description) ?? fallback.regulators.description,
      logos: mapLogos(page.regulatorLogos, fallback.regulators.logos),
    },
    metrics: {
      ...fallback.metrics,
      eyebrow: text(record(story.heading).eyebrow) ?? fallback.metrics.eyebrow,
      title: titleFromHeading(story.heading, fallback.metrics.title),
      description: text(record(story.heading).description) ?? fallback.metrics.description,
      items: mapMetrics(story.stats, fallback.metrics.items),
      cta: link(story.cta, fallback.metrics.cta),
      ...(mediaUrl(story.featureImage)
        ? {
            featureImage: mediaUrl(story.featureImage),
            featureImageAlt:
              text(record(story.featureImage).alternativeText) ?? fallback.metrics.featureImageAlt,
          }
        : {}),
      ...(text(story.featureTitle) ? { featureTitle: text(story.featureTitle) } : {}),
    },
    ...(tickerTitle || hasLink(tickerCta.cta)
      ? {
          tickerCta: {
            title: tickerTitle ?? fallback.tickerCta?.title ?? "Let's Talk Compliance",
            ...(text(tickerCta.description)
              ? { description: text(tickerCta.description) }
              : fallback.tickerCta?.description
                ? { description: fallback.tickerCta.description }
                : {}),
            cta: link(tickerCta.cta, fallback.tickerCta?.cta ?? fallback.closingCta.cta),
          },
        }
      : fallback.tickerCta
        ? { tickerCta: fallback.tickerCta }
        : {}),
    testimonials: {
      ...fallback.testimonials,
      eyebrow: text(testimonialsHeading.eyebrow) ?? fallback.testimonials.eyebrow,
      title: titleFromHeading(testimonialsHeading, fallback.testimonials.title),
      description: text(testimonialsHeading.description) ?? fallback.testimonials.description,
      items: mapTestimonials(page.testimonials, fallback.testimonials.items),
    },
    recognitions: {
      ...fallback.recognitions,
      eyebrow: text(recognitionHeading.eyebrow) ?? fallback.recognitions.eyebrow,
      title: titleFromHeading(recognitionHeading, fallback.recognitions.title),
      description: text(recognitionHeading.description) ?? fallback.recognitions.description,
      items: mapRecognitions(page.recognitions, fallback.recognitions.items),
    },
    faqs: {
      ...fallback.faqs,
      eyebrow: text(faqHeading.eyebrow) ?? fallback.faqs.eyebrow,
      title: titleFromHeading(faqHeading, fallback.faqs.title),
      description: text(faqHeading.description) ?? fallback.faqs.description,
      categories: mapFaqs(page.faqCategories, fallback.faqs.categories),
    },
    ...(insightItems.length
      ? {
          insights: {
            eyebrow: text(insightsHeading.eyebrow),
            title: titleFromHeading(insightsHeading, "Regulatory insights"),
            ...(text(insightsHeading.description)
              ? { description: text(insightsHeading.description) }
              : {}),
            items: insightItems,
          },
        }
      : {}),
    closingCta: {
      ...fallback.closingCta,
      title: text(finalCta.title) ?? fallback.closingCta.title,
      description: text(finalCta.description) ?? fallback.closingCta.description,
      cta: link(finalCta.cta, fallback.closingCta.cta),
    },
  };
}

function mapAboutPage(
  fallback: AboutPageContent,
  rawPage: unknown,
  rawSettings: unknown,
): AboutPageContent {
  const page = record(rawPage);
  const chrome = mapPageChrome(fallback, rawSettings);
  const hero = record(page.hero);
  const overview = record(page.overview);
  const mantra = record(page.mantra);
  const story = record(page.story);
  const reasons = record(page.whyPartner);
  const pioneers = record(page.pioneers);
  const team = record(page.team);
  const achievements = record(page.achievements);
  const finalCta = record(page.finalCta);
  const heroImage = mediaUrl(hero.image);
  const teamImage = mediaUrl(page.teamFeatureImage) ?? mediaUrl(team.image);

  return {
    ...fallback,
    ...chrome,
    seo: mapSeo(page.seo, fallback.seo, record(rawSettings).defaultSeo),
    hero: {
      ...fallback.hero,
      eyebrow: text(hero.eyebrow) ?? fallback.hero.eyebrow,
      title: titleFromComponent(hero, fallback.hero.title),
      description: text(hero.description) ?? fallback.hero.description,
      cta: link(hero.cta, fallback.hero.cta),
      ...(heroImage ? { image: heroImage } : {}),
      imageAlt: text(record(hero.image).alternativeText) ?? fallback.hero.imageAlt,
    },
    overview: {
      ...fallback.overview,
      title: titleFromComponent(overview, fallback.overview.title),
      description: text(overview.description) ?? fallback.overview.description,
      stats: mapMetrics(overview.stats, fallback.overview.stats),
    },
    mantra: {
      ...fallback.mantra,
      eyebrow: text(record(mantra.heading).eyebrow) ?? text(mantra.eyebrow) ?? fallback.mantra.eyebrow,
      title: text(mantra.title) ?? titleFromComponent(mantra.heading, fallback.mantra.title),
      description: text(record(mantra.heading).description) ?? text(mantra.description) ?? fallback.mantra.description,
      values: mapValueItems(mantra.items, fallback.mantra.values),
    },
    story: {
      ...fallback.story,
      eyebrow:
        text(record(page.storyHeading).eyebrow) ?? text(record(story.heading).eyebrow) ?? text(story.eyebrow) ?? fallback.story.eyebrow,
      title: text(story.title) ?? titleFromComponent(page.storyHeading, titleFromComponent(story.heading, fallback.story.title)),
      description:
        text(record(page.storyHeading).description) ?? text(record(story.heading).description) ?? text(story.description) ?? fallback.story.description,
      milestones: mapTimeline(page.timelineEvents ?? story.timelineEvents, fallback.story.milestones),
    },
    reasons: {
      ...fallback.reasons,
      eyebrow: text(record(reasons.heading).eyebrow) ?? text(reasons.eyebrow) ?? fallback.reasons.eyebrow,
      title: text(reasons.title) ?? titleFromComponent(reasons.heading, fallback.reasons.title),
      description:
        text(record(reasons.heading).description) ?? text(reasons.description) ?? fallback.reasons.description,
      items: mapValueItems(reasons.items, fallback.reasons.items),
    },
    pioneers: {
      ...fallback.pioneers,
      eyebrow: text(record(pioneers.heading).eyebrow) ?? text(pioneers.eyebrow) ?? fallback.pioneers.eyebrow,
      title: text(pioneers.title) ?? titleFromComponent(pioneers.heading, fallback.pioneers.title),
      description: text(record(pioneers.heading).description) ?? text(pioneers.description) ?? fallback.pioneers.description,
      stats: mapMetrics(pioneers.stats, fallback.pioneers.stats),
    },
    team: {
      ...fallback.team,
      eyebrow:
        text(record(page.teamHeading).eyebrow) ?? text(record(team.heading).eyebrow) ?? text(team.eyebrow) ?? fallback.team.eyebrow,
      title: text(team.title) ?? titleFromComponent(page.teamHeading, titleFromComponent(team.heading, fallback.team.title)),
      description:
        text(record(page.teamHeading).description) ?? text(record(team.heading).description) ?? text(team.description) ?? fallback.team.description,
      ...(teamImage ? { image: teamImage } : {}),
      imageAlt: text(record(page.teamFeatureImage).alternativeText) ?? text(record(team.image).alternativeText) ?? fallback.team.imageAlt,
      members: mapTeamMembers(page.teamMembers ?? team.members, fallback.team.members),
      cta: link(page.teamCta ?? team.cta, fallback.team.cta),
    },
    achievements: {
      ...fallback.achievements,
      eyebrow:
        text(record(page.achievementsHeading).eyebrow) ?? text(record(achievements.heading).eyebrow) ?? text(achievements.eyebrow) ?? fallback.achievements.eyebrow,
      title:
        text(achievements.title) ?? titleFromComponent(page.achievementsHeading, titleFromComponent(achievements.heading, fallback.achievements.title)),
      description:
        text(record(page.achievementsHeading).description) ??
        text(record(achievements.heading).description) ??
        fallback.achievements.description,
      items: mapAchievements(page.achievements ?? achievements.items, fallback.achievements.items),
    },
    closingCta: {
      ...fallback.closingCta,
      title: text(finalCta.title) ?? fallback.closingCta.title,
      description: text(finalCta.description) ?? fallback.closingCta.description,
      cta: link(finalCta.cta, fallback.closingCta.cta),
    },
  };
}

function mapCareersPage(
  fallback: CareersPageContent,
  rawPage: unknown,
  rawSettings: unknown,
): CareersPageContent {
  const page = record(rawPage);
  const chrome = mapPageChrome(fallback, rawSettings);
  const hero = record(page.hero);
  const purpose = record(page.purpose);
  const values = record(page.values);
  const lifeAtJr = record(page.lifeAtJr);
  const openingsHeading = record(page.openingsHeading);
  const benefits = record(page.benefits);
  const finalCta = record(page.finalCta);

  return {
    ...fallback,
    ...chrome,
    seo: mapSeo(page.seo, fallback.seo, record(rawSettings).defaultSeo),
    hero: {
      ...fallback.hero,
      eyebrow: text(hero.eyebrow) ?? fallback.hero.eyebrow,
      title: titleFromComponent(hero, fallback.hero.title),
      description: text(hero.description) ?? fallback.hero.description,
      cta: link(hero.cta, fallback.hero.cta),
    },
    purpose: {
      ...fallback.purpose,
      eyebrow: text(purpose.eyebrow) ?? fallback.purpose.eyebrow,
      title: titleFromComponent(purpose, fallback.purpose.title),
      vision: text(purpose.vision) ?? fallback.purpose.vision,
      mission: text(purpose.mission) ?? fallback.purpose.mission,
    },
    values: {
      ...fallback.values,
      eyebrow: text(record(values.heading).eyebrow) ?? text(values.eyebrow) ?? fallback.values.eyebrow,
      title: text(values.title) ?? titleFromComponent(values.heading, fallback.values.title),
      description:
        text(record(values.heading).description) ?? text(values.description) ?? fallback.values.description,
      items: mapValueItems(values.items, fallback.values.items),
    },
    lifeAtJr: {
      ...fallback.lifeAtJr,
      eyebrow: text(record(lifeAtJr.heading).eyebrow) ?? text(lifeAtJr.eyebrow) ?? fallback.lifeAtJr.eyebrow,
      title: text(lifeAtJr.title) ?? titleFromComponent(lifeAtJr.heading, fallback.lifeAtJr.title),
      description:
        [text(record(lifeAtJr.heading).description), text(lifeAtJr.description)]
          .filter((item): item is string => Boolean(item))
          .join(" ") || fallback.lifeAtJr.description,
      highlights: mapTextList(lifeAtJr.highlights, fallback.lifeAtJr.highlights),
      gallery: mapCareerGallery(page.careerGallery ?? lifeAtJr.gallery, fallback.lifeAtJr.gallery),
    },
    openings: {
      ...fallback.openings,
      eyebrow: text(openingsHeading.eyebrow) ?? fallback.openings.eyebrow,
      title: titleFromComponent(openingsHeading, fallback.openings.title),
      description: text(openingsHeading.description) ?? fallback.openings.description,
      roles: mapCareerRoles(page.careerOpenings, fallback.openings.roles),
    },
    benefits: {
      ...fallback.benefits,
      eyebrow: text(record(benefits.heading).eyebrow) ?? text(benefits.eyebrow) ?? fallback.benefits.eyebrow,
      title: text(benefits.title) ?? titleFromComponent(benefits.heading, fallback.benefits.title),
      description:
        text(record(benefits.heading).description) ?? text(benefits.description) ?? fallback.benefits.description,
      items: mapValueItems(benefits.items, fallback.benefits.items),
    },
    testimonials: {
      ...fallback.testimonials,
      eyebrow: text(record(page.testimonialsHeading).eyebrow) ?? fallback.testimonials.eyebrow,
      title: titleFromComponent(page.testimonialsHeading, fallback.testimonials.title),
      description:
        text(record(page.testimonialsHeading).description) ?? fallback.testimonials.description,
      items: mapCareerTestimonials(page.careerTestimonials, fallback.testimonials.items),
    },
    faqs: {
      ...fallback.faqs,
      eyebrow: text(record(page.faqHeading).eyebrow) ?? fallback.faqs.eyebrow,
      title: titleFromComponent(page.faqHeading, fallback.faqs.title),
      description: text(record(page.faqHeading).description) ?? fallback.faqs.description,
      items: mapSimpleFaqs(page.careerFaqs, fallback.faqs.items),
    },
    closingCta: {
      ...fallback.closingCta,
      title: text(finalCta.title) ?? fallback.closingCta.title,
      description: text(finalCta.description) ?? fallback.closingCta.description,
      cta: link(finalCta.cta, fallback.closingCta.cta),
    },
  };
}

function mapContactPage(
  fallback: ContactPageContent,
  rawPage: unknown,
  rawSettings: unknown,
): ContactPageContent {
  const page = record(rawPage);
  const chrome = mapPageChrome(fallback, rawSettings);
  const hero = record(page.hero);
  const enquiry = record(page.enquiry);
  const response = record(page.response);
  const finalCta = record(page.finalCta);

  return {
    ...fallback,
    ...chrome,
    seo: mapSeo(page.seo, fallback.seo, record(rawSettings).defaultSeo),
    hero: {
      ...fallback.hero,
      eyebrow: text(hero.eyebrow) ?? fallback.hero.eyebrow,
      title: titleFromComponent(hero, fallback.hero.title),
      description: text(hero.description) ?? fallback.hero.description,
    },
    contactPoints: mapContactPoints(page.contactPoints, fallback.contactPoints),
    enquiry: {
      ...fallback.enquiry,
      eyebrow: text(enquiry.eyebrow) ?? fallback.enquiry.eyebrow,
      title: text(enquiry.title) ?? titleFromComponent(enquiry, fallback.enquiry.title),
      description: text(enquiry.description) ?? fallback.enquiry.description,
      topics: mapTextList(enquiry.topics, fallback.enquiry.topics),
      directCta: link(enquiry.directCta, fallback.enquiry.directCta),
      formNote: text(enquiry.formNote) ?? fallback.enquiry.formNote,
    },
    response: {
      ...fallback.response,
      eyebrow: text(response.eyebrow) ?? fallback.response.eyebrow,
      title: text(response.title) ?? titleFromComponent(response, fallback.response.title),
      steps: mapValueItems(response.steps, fallback.response.steps),
    },
    closingCta: {
      ...fallback.closingCta,
      title: text(finalCta.title) ?? fallback.closingCta.title,
      description: text(finalCta.description) ?? fallback.closingCta.description,
      cta: link(finalCta.cta, fallback.closingCta.cta),
    },
  };
}

type RegistrationCardSection = CompanyRegistrationPageContent["challenges"];

function mapRegistrationDetails(
  value: unknown,
  fallback: RegistrationDetail[],
): RegistrationDetail[] {
  const items = orderedEntries(value)
    .map((entry) => {
      const item = record(entry);
      const title = text(item.title);
      const description = text(item.description);
      return title && description ? { title, description } : null;
    })
    .filter((item): item is RegistrationDetail => Boolean(item));

  return items.length ? items : fallback;
}

function mapRegistrationCardSection(
  value: unknown,
  fallback: RegistrationCardSection,
): RegistrationCardSection {
  const section = record(value);

  return {
    eyebrow: text(section.eyebrow) ?? fallback.eyebrow,
    title: text(section.title) ?? fallback.title,
    items: mapRegistrationDetails(section.items, fallback.items),
  };
}

function mapRegistrationBreakdown(
  value: unknown,
  fallback: CompanyRegistrationPageContent["breakdown"],
): CompanyRegistrationPageContent["breakdown"] {
  const section = record(value);
  const groups = orderedEntries(section.groups)
    .map((entry) => {
      const group = record(entry);
      const title = text(group.title);
      if (!title) {
        return null;
      }

      const fallbackGroup = fallback.groups.find(
        (candidate) => candidate.title.toLowerCase() === title.toLowerCase(),
      );
      const items = mapTextList(group.items, fallbackGroup?.items ?? []);
      return items.length ? { title, items } : null;
    })
    .filter((group): group is RegistrationBreakdownGroup => Boolean(group));

  return {
    eyebrow: text(section.eyebrow) ?? fallback.eyebrow,
    title: text(section.title) ?? fallback.title,
    groups: groups.length ? groups : fallback.groups,
  };
}

function mapRegistrationFaqSection(
  value: unknown,
  fallback: CompanyRegistrationPageContent["faqs"],
): CompanyRegistrationPageContent["faqs"] {
  const section = record(value);

  return {
    eyebrow: text(section.eyebrow) ?? fallback.eyebrow,
    title: text(section.title) ?? fallback.title,
    items: mapSimpleFaqs(section.items, fallback.items),
  };
}

function strictLink(value: unknown): Link | null {
  const source = record(value);
  const label = text(source.label);
  const href = text(source.href);
  const target = targetFromStrapi(source);

  return label && href ? { label, href, ...(target ? { target } : {}) } : null;
}

function strictTextList(value: unknown): string[] | null {
  const source = orderedEntries(value);
  const items = source.map(
    (item) => text(record(item).label) ?? text(record(item).title) ?? text(record(item).text) ?? text(item),
  );

  return items.length && items.every((item): item is string => Boolean(item)) ? items : null;
}

function strictRegistrationDetails(value: unknown): RegistrationDetail[] | null {
  const source = orderedEntries(value);
  const items = source.map((entry) => {
    const item = record(entry);
    const title = text(item.title);
    const description = text(item.description);
    return title && description ? { title, description } : null;
  });

  return items.length && items.every((item): item is RegistrationDetail => Boolean(item)) ? items : null;
}

function strictFixedServiceCardSection(
  value: unknown,
): CompanyRegistrationPageContent["challenges"] | null {
  const section = record(value);
  const eyebrow = text(section.eyebrow);
  const title = text(section.title);
  const items = strictRegistrationDetails(section.items);

  return eyebrow && title && items ? { eyebrow, title, items } : null;
}

function strictFixedServiceBreakdown(
  value: unknown,
): CompanyRegistrationPageContent["breakdown"] | null {
  const section = record(value);
  const eyebrow = text(section.eyebrow);
  const title = text(section.title);
  const source = orderedEntries(section.groups);
  const groups = source.map((entry) => {
    const group = record(entry);
    const groupTitle = text(group.title);
    const items = strictTextList(group.items);
    return groupTitle && items ? { title: groupTitle, items } : null;
  });

  return eyebrow && title && groups.length && groups.every((group): group is RegistrationBreakdownGroup => Boolean(group))
    ? { eyebrow, title, groups }
    : null;
}

function strictFixedServiceFaqSection(
  value: unknown,
): CompanyRegistrationPageContent["faqs"] | null {
  const section = record(value);
  const eyebrow = text(section.eyebrow);
  const title = text(section.title);
  const source = orderedEntries(section.items);
  const items = source.map((entry) => {
    const faq = record(entry);
    const question = text(faq.question);
    const answer = richTextToPlainText(faq.answer);
    return question && answer ? { question, answer } : null;
  });

  return eyebrow && title && items.length && items.every((item): item is Faq => Boolean(item))
    ? { eyebrow, title, items }
    : null;
}

function strictFixedServiceSeo(value: unknown): Seo | null {
  const seo = record(value);
  const title = text(seo.metaTitle);
  const description = text(seo.metaDescription);
  const canonicalUrl = text(seo.canonicalUrl);
  const noIndex = boolean(seo.noIndex);
  const shareImage = mediaUrl(seo.shareImage);

  return title && description
    ? {
        title,
        description,
        ...(canonicalUrl ? { canonicalUrl } : {}),
        ...(noIndex !== undefined ? { noIndex } : {}),
        ...(shareImage ? { shareImage } : {}),
      }
    : null;
}

function mapCmsOnlyFixedServiceDetailPage<T extends CompanyRegistrationPageContent>(
  chromeFallback: PageChromeContent,
  requestedSlug: string,
  rawPage: unknown,
  rawSettings: unknown,
): T | null {
  const page = record(rawPage);
  const hero = record(page.hero);
  const overview = record(page.overview);
  const finalCta = record(page.finalCta);
  const slug = text(page.slug);
  const menuLabel = text(page.menuLabel);
  const pageTitle = text(page.title);
  const heroEyebrow = text(hero.eyebrow);
  const heroDescription = text(hero.description);
  const heroCta = strictLink(hero.cta);
  const overviewEyebrow = text(overview.eyebrow);
  const overviewTitle = text(overview.title);
  const overviewParagraphs = strictTextList(overview.paragraphs);
  const challenges = strictFixedServiceCardSection(page.challenges);
  const advantages = strictFixedServiceCardSection(page.advantages);
  const process = strictFixedServiceCardSection(page.process);
  const whyChoose = strictFixedServiceCardSection(page.whyChoose);
  const breakdown = strictFixedServiceBreakdown(page.breakdown);
  const faqs = strictFixedServiceFaqSection(page.faqs);
  const closingTitle = text(finalCta.title);
  const closingDescription = text(finalCta.description) ?? "";
  const closingCta = strictLink(finalCta.cta);
  const seo = strictFixedServiceSeo(page.seo);

  if (
    !slug ||
    slug !== requestedSlug ||
    !menuLabel ||
    !pageTitle ||
    !heroEyebrow ||
    !heroDescription ||
    !heroCta ||
    !overviewEyebrow ||
    !overviewTitle ||
    !overviewParagraphs ||
    !challenges ||
    !advantages ||
    !process ||
    !whyChoose ||
    !breakdown ||
    !faqs ||
    !closingTitle ||
    !closingCta ||
    !seo
  ) {
    return null;
  }

  return {
    ...mapPageChrome(chromeFallback, rawSettings),
    slug,
    menuLabel,
    seo,
    hero: {
      eyebrow: heroEyebrow,
      title: pageTitle,
      description: heroDescription,
      cta: heroCta,
    },
    overview: {
      eyebrow: overviewEyebrow,
      title: overviewTitle,
      paragraphs: overviewParagraphs,
    },
    challenges,
    advantages,
    process,
    whyChoose,
    breakdown,
    faqs,
    closingCta: {
      title: closingTitle,
      description: closingDescription,
      cta: closingCta,
    },
  } as T;
}

function mapFixedServiceDetailPage<T extends CompanyRegistrationPageContent>(
  fallback: T,
  rawPage: unknown,
  rawSettings: unknown,
): T {
  const page = record(rawPage);
  const chrome = mapPageChrome(fallback, rawSettings);
  const hero = record(page.hero);
  const overview = record(page.overview);
  const finalCta = record(page.finalCta);

  return {
    ...fallback,
    ...chrome,
    slug: text(page.slug) ?? fallback.slug,
    menuLabel: text(page.menuLabel) ?? fallback.menuLabel,
    seo: mapSeo(page.seo, fallback.seo, record(rawSettings).defaultSeo),
    hero: {
      eyebrow: text(hero.eyebrow) ?? fallback.hero.eyebrow,
      title: text(page.title) ?? fallback.hero.title,
      description: text(hero.description) ?? fallback.hero.description,
      cta: link(hero.cta, fallback.hero.cta),
    },
    overview: {
      eyebrow: text(overview.eyebrow) ?? fallback.overview.eyebrow,
      title: text(overview.title) ?? fallback.overview.title,
      paragraphs: mapTextList(overview.paragraphs, fallback.overview.paragraphs),
    },
    challenges: mapRegistrationCardSection(page.challenges, fallback.challenges),
    advantages: mapRegistrationCardSection(page.advantages, fallback.advantages),
    process: mapRegistrationCardSection(page.process, fallback.process),
    whyChoose: mapRegistrationCardSection(page.whyChoose, fallback.whyChoose),
    breakdown: mapRegistrationBreakdown(page.breakdown, fallback.breakdown),
    faqs: mapRegistrationFaqSection(page.faqs, fallback.faqs),
    closingCta: {
      title: text(finalCta.title) ?? fallback.closingCta.title,
      description: text(finalCta.description) ?? fallback.closingCta.description,
      cta: link(finalCta.cta, fallback.closingCta.cta),
    },
  } as T;
}

function mapCompanyRegistrationPage(
  fallback: CompanyRegistrationPageContent,
  rawPage: unknown,
  rawSettings: unknown,
): CompanyRegistrationPageContent {
  return mapFixedServiceDetailPage(fallback, rawPage, rawSettings);
}

function mapFixedServiceCategoryPage<T extends CompanyRegistrationPageContent>(
  fallback: T | null,
  chromeFallback: PageChromeContent,
  requestedSlug: string,
  rawPage: unknown,
  rawSettings: unknown,
): T | null {
  return fallback
    ? mapFixedServiceDetailPage(fallback, rawPage, rawSettings)
    : mapCmsOnlyFixedServiceDetailPage<T>(
        chromeFallback,
        requestedSlug,
        rawPage,
        rawSettings,
      );
}

function addPopulateTree(params: URLSearchParams, tree: PopulateTree, prefix = "populate") {
  Object.entries(tree).forEach(([field, nested]) => {
    const fieldPrefix = `${prefix}[${field}]`;
    if (nested === true) {
      params.set(fieldPrefix, "true");
    } else {
      addPopulateTree(params, nested, `${fieldPrefix}[populate]`);
    }
  });
}

function queryFor(slug: SingleTypeSlug): string {
  const params = new URLSearchParams({ status: "published" });

  addPopulateTree(params, populateTrees[slug]);
  return params.toString();
}

type FixedServiceContentSlug =
  | "company-registration-page"
  | "mca-service-page"
  | "import-export-service-page"
  | "government-license-certification-page"
  | "ipr-service-page"
  | "fssai-service-page"
  | "sebi-business-registration-page"
  | "tax-accounting-page"
  | "labour-compliance-page"
  | "fund-raising-page"
  | "bureau-indian-standards-page"
  | "pollution-advisory-page";

type FixedServiceCollectionConfig = {
  collectionPath: string;
  contentSlug: FixedServiceContentSlug;
  label: string;
};

const companyRegistrationCollection = {
  collectionPath: "company-registration-pages",
  contentSlug: "company-registration-page",
  label: "Company Registration",
} as const satisfies FixedServiceCollectionConfig;

const mcaServiceCollection = {
  collectionPath: "mca-service-pages",
  contentSlug: "mca-service-page",
  label: "MCA Services",
} as const satisfies FixedServiceCollectionConfig;

const importExportServiceCollection = {
  collectionPath: "import-export-service-pages",
  contentSlug: "import-export-service-page",
  label: "Import Export Service",
} as const satisfies FixedServiceCollectionConfig;

const governmentLicenseCertificationCollection = {
  collectionPath: "government-license-certification-pages",
  contentSlug: "government-license-certification-page",
  label: "Government License & Certification",
} as const satisfies FixedServiceCollectionConfig;

const iprServiceCollection = {
  collectionPath: "ipr-service-pages",
  contentSlug: "ipr-service-page",
  label: "IPR Services",
} as const satisfies FixedServiceCollectionConfig;

const fssaiServiceCollection = {
  collectionPath: "fssai-service-pages",
  contentSlug: "fssai-service-page",
  label: "FSSAI",
} as const satisfies FixedServiceCollectionConfig;

const sebiBusinessRegistrationCollection = {
  collectionPath: "sebi-business-registration-pages",
  contentSlug: "sebi-business-registration-page",
  label: "SEBI Business Registration",
} as const satisfies FixedServiceCollectionConfig;

const taxAccountingCollection = {
  collectionPath: "tax-accounting-pages",
  contentSlug: "tax-accounting-page",
  label: "Tax and Accounting",
} as const satisfies FixedServiceCollectionConfig;

const labourComplianceCollection = {
  collectionPath: "labour-compliance-pages",
  contentSlug: "labour-compliance-page",
  label: "Labour Compliance",
} as const satisfies FixedServiceCollectionConfig;

const fundRaisingCollection = {
  collectionPath: "fund-raising-pages",
  contentSlug: "fund-raising-page",
  label: "Fund Raising",
} as const satisfies FixedServiceCollectionConfig;

const bureauIndianStandardsCollection = {
  collectionPath: "bureau-indian-standards-pages",
  contentSlug: "bureau-indian-standards-page",
  label: "Bureau of Indian Standards (BIS)",
} as const satisfies FixedServiceCollectionConfig;

const pollutionAdvisoryCollection = {
  collectionPath: "pollution-advisory-pages",
  contentSlug: "pollution-advisory-page",
  label: "Pollution Advisory",
} as const satisfies FixedServiceCollectionConfig;

function fixedServiceDetailQuery(slug: string): string {
  const params = new URLSearchParams({ status: "published" });
  params.set("filters[slug][$eq]", slug);
  params.set("pagination[pageSize]", "1");
  addPopulateTree(params, fixedServiceDetailPopulateTree);
  return params.toString();
}

function fixedServiceSlugsQuery(): string {
  const params = new URLSearchParams({ status: "published" });
  params.set("fields[0]", "slug");
  params.set("pagination[pageSize]", "100");
  return params.toString();
}

async function getSingleType(slug: SingleTypeSlug): Promise<unknown> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  const response = await fetch(`${strapiUrl}/api/${slug}?${queryFor(slug)}`, {
    headers: { Authorization: `Bearer ${strapiApiToken}` },
    next: { revalidate: 60, tags: [strapiCacheTagBySlug[slug]] },
  });

  if (!response.ok) {
    throw new Error(`Strapi request for ${slug} failed with ${response.status}`);
  }

  const body = (await response.json()) as { data?: unknown };
  return body.data;
}

async function getFixedServiceEntry(
  collection: FixedServiceCollectionConfig,
  slug: string,
): Promise<unknown> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  const response = await fetch(
    `${strapiUrl}/api/${collection.collectionPath}?${fixedServiceDetailQuery(slug)}`,
    {
      headers: { Authorization: `Bearer ${strapiApiToken}` },
      next: {
        revalidate: 60,
        tags: [strapiCacheTagBySlug[collection.contentSlug]],
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Strapi request for ${collection.contentSlug} failed with ${response.status}`);
  }

  const body = (await response.json()) as { data?: unknown };
  return asArray(body.data)[0] ?? null;
}

async function getFixedServiceSlugsFromStrapi(
  collection: FixedServiceCollectionConfig,
): Promise<string[]> {
  if (!strapiUrl || !strapiApiToken) {
    return [];
  }

  try {
    const response = await fetch(
      `${strapiUrl}/api/${collection.collectionPath}?${fixedServiceSlugsQuery()}`,
      {
        headers: { Authorization: `Bearer ${strapiApiToken}` },
        next: {
          revalidate: 60,
          tags: [strapiCacheTagBySlug[collection.contentSlug]],
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Strapi request for ${collection.contentSlug} slugs failed with ${response.status}`,
      );
    }

    const body = (await response.json()) as { data?: unknown };
    return asArray(body.data)
      .map((entry) => text(record(entry).slug))
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.warn(
      `Unable to load ${collection.label} slugs from Strapi; using local route fallbacks.`,
      error,
    );
    return [];
  }
}

export function getMcaServiceSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(mcaServiceCollection);
}

export function getImportExportServiceSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(importExportServiceCollection);
}

export function getGovernmentLicenseCertificationSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(governmentLicenseCertificationCollection);
}

export function getIprServiceSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(iprServiceCollection);
}

export function getFssaiServiceSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(fssaiServiceCollection);
}

export function getSebiBusinessRegistrationSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(sebiBusinessRegistrationCollection);
}

export function getTaxAccountingSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(taxAccountingCollection);
}

export function getLabourComplianceSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(labourComplianceCollection);
}

export function getFundRaisingSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(fundRaisingCollection);
}

export function getBureauIndianStandardsSlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(bureauIndianStandardsCollection);
}

export function getPollutionAdvisorySlugsFromStrapi(): Promise<string[]> {
  return getFixedServiceSlugsFromStrapi(pollutionAdvisoryCollection);
}

export async function getHomepageFromStrapi(
  fallback: HomepageContent,
): Promise<HomepageContent | null> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  try {
    const [page, settings] = await Promise.all([
      getSingleType("home-page"),
      getSingleType("site-setting"),
    ]);

    return mapHomepage(fallback, page, settings);
  } catch (error) {
    // The fallback keeps local design work and a temporarily unavailable CMS
    // from breaking the public experience. The server log retains the reason.
    console.error("Unable to load content from Strapi; using fallback content.", error);
    return null;
  }
}

export async function getAboutPageFromStrapi(
  fallback: AboutPageContent,
): Promise<AboutPageContent | null> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  try {
    const [page, settings] = await Promise.all([
      getSingleType("about-page"),
      getSingleType("site-setting"),
    ]);

    return mapAboutPage(fallback, page, settings);
  } catch (error) {
    console.error("Unable to load About content from Strapi; using fallback content.", error);
    return null;
  }
}

export async function getCareersPageFromStrapi(
  fallback: CareersPageContent,
): Promise<CareersPageContent | null> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  try {
    const [page, settings] = await Promise.all([
      getSingleType("careers-page"),
      getSingleType("site-setting"),
    ]);

    return mapCareersPage(fallback, page, settings);
  } catch (error) {
    console.error("Unable to load Careers content from Strapi; using fallback content.", error);
    return null;
  }
}

export async function getContactPageFromStrapi(
  fallback: ContactPageContent,
): Promise<ContactPageContent | null> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  try {
    const [page, settings] = await Promise.all([
      getSingleType("contact-page"),
      getSingleType("site-setting"),
    ]);

    return mapContactPage(fallback, page, settings);
  } catch (error) {
    console.error("Unable to load Contact content from Strapi; using fallback content.", error);
    return null;
  }
}

export async function getCompanyRegistrationPageFromStrapi(
  slug: string,
  fallback: CompanyRegistrationPageContent,
): Promise<CompanyRegistrationPageContent | null> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  try {
    const [page, settings] = await Promise.all([
      getFixedServiceEntry(companyRegistrationCollection, slug),
      getSingleType("site-setting"),
    ]);

    return page ? mapCompanyRegistrationPage(fallback, page, settings) : null;
  } catch (error) {
    console.warn(
      `Unable to load ${slug} from Strapi; using company-registration fallback content.`,
      error,
    );
    return null;
  }
}

async function getFixedServiceCategoryPageFromStrapi<T extends CompanyRegistrationPageContent>(
  slug: string,
  fallback: T | null,
  chromeFallback: PageChromeContent,
  collection: FixedServiceCollectionConfig,
): Promise<T | null> {
  if (!strapiUrl || !strapiApiToken) {
    return null;
  }

  try {
    const [page, settings] = await Promise.all([
      getFixedServiceEntry(collection, slug),
      getSingleType("site-setting"),
    ]);

    return page
      ? mapFixedServiceCategoryPage(fallback, chromeFallback, slug, page, settings)
      : null;
  } catch (error) {
    console.warn(
      `Unable to load ${slug} from Strapi; using ${collection.label} fallback content.`,
      error,
    );
    return null;
  }
}

export function getMcaServicePageFromStrapi(
  slug: string,
  fallback: McaServicePageContent | null,
  chromeFallback: PageChromeContent,
): Promise<McaServicePageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    mcaServiceCollection,
  );
}

export function getImportExportServicePageFromStrapi(
  slug: string,
  fallback: ImportExportServicePageContent | null,
  chromeFallback: PageChromeContent,
): Promise<ImportExportServicePageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    importExportServiceCollection,
  );
}

export function getGovernmentLicenseCertificationPageFromStrapi(
  slug: string,
  fallback: GovernmentLicenseCertificationPageContent | null,
  chromeFallback: PageChromeContent,
): Promise<GovernmentLicenseCertificationPageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    governmentLicenseCertificationCollection,
  );
}

export function getIprServicePageFromStrapi(
  slug: string,
  fallback: IprServicePageContent | null,
  chromeFallback: PageChromeContent,
): Promise<IprServicePageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    iprServiceCollection,
  );
}

export function getFssaiServicePageFromStrapi(
  slug: string,
  fallback: FssaiServicePageContent | null,
  chromeFallback: PageChromeContent,
): Promise<FssaiServicePageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    fssaiServiceCollection,
  );
}

export function getSebiBusinessRegistrationPageFromStrapi(
  slug: string,
  fallback: SebiBusinessRegistrationPageContent | null,
  chromeFallback: PageChromeContent,
): Promise<SebiBusinessRegistrationPageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    sebiBusinessRegistrationCollection,
  );
}

export function getTaxAccountingPageFromStrapi(
  slug: string,
  fallback: TaxAccountingPageContent | null,
  chromeFallback: PageChromeContent,
): Promise<TaxAccountingPageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    taxAccountingCollection,
  );
}

export function getLabourCompliancePageFromStrapi(
  slug: string,
  fallback: LabourCompliancePageContent | null,
  chromeFallback: PageChromeContent,
): Promise<LabourCompliancePageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    labourComplianceCollection,
  );
}

export function getFundRaisingPageFromStrapi(
  slug: string,
  fallback: FundRaisingPageContent | null,
  chromeFallback: PageChromeContent,
): Promise<FundRaisingPageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    fundRaisingCollection,
  );
}

export function getBureauIndianStandardsPageFromStrapi(
  slug: string,
  fallback: BureauIndianStandardsPageContent | null,
  chromeFallback: PageChromeContent,
): Promise<BureauIndianStandardsPageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    bureauIndianStandardsCollection,
  );
}

export function getPollutionAdvisoryPageFromStrapi(
  slug: string,
  fallback: PollutionAdvisoryPageContent | null,
  chromeFallback: PageChromeContent,
): Promise<PollutionAdvisoryPageContent | null> {
  return getFixedServiceCategoryPageFromStrapi(
    slug,
    fallback,
    chromeFallback,
    pollutionAdvisoryCollection,
  );
}
