import type {
  Faq,
  FaqCategory,
  HomepageContent,
  Link,
  Logo,
  Metric,
  NavigationItem,
  Recognition,
  Service,
  ServiceCategory,
  SocialLink,
  Testimonial,
} from "@/lib/types";

type UnknownRecord = Record<string, unknown>;
type SingleTypeSlug = "home-page" | "site-setting";
type PopulateValue = true | PopulateTree;

interface PopulateTree {
  [field: string]: PopulateValue;
}

const strapiUrl = process.env.STRAPI_URL?.replace(/\/$/, "");
const strapiApiToken = process.env.STRAPI_API_TOKEN;

/**
 * Strapi v5 does not populate relations, media, or components by default.
 * Keep the population contract explicit and centralized; unbounded `deep`
 * population is intentionally avoided for performance and schema safety.
 */
const populateTrees: Record<SingleTypeSlug, PopulateTree> = {
  "site-setting": {
    headerLogo: true,
    footerLogo: true,
    headerMenu: { children: true },
    headerCta: true,
    footerCta: true,
    footerLinkGroups: { links: true },
    contact: true,
    legalLinks: true,
    legalNotices: true,
    socialLinks: true,
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
    story: { heading: true, stats: { icon: true }, featureImage: true, cta: true },
    testimonialsHeading: true,
    testimonials: { personPhoto: true, companyLogo: true },
    recognitionHeading: true,
    recognitions: { sourceLogo: true, coverImage: true, link: true },
    faqHeading: true,
    faqCategories: { faqs: true },
    finalCta: { cta: true },
    seo: { shareImage: true },
  },
};

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function record(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {};
}

function titleFromHeading(value: unknown, fallback: string): string {
  const heading = record(value);
  const result = [heading.titleBefore, heading.titleHighlight, heading.titleAfter]
    .map(text)
    .filter((part): part is string => Boolean(part))
    .join(" ");

  return result || fallback;
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

function link(value: unknown, fallback: Link): Link {
  const source = record(value);
  return {
    label: text(source.label) ?? fallback.label,
    href: text(source.href) ?? fallback.href,
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
          return childLabel && href ? { label: childLabel, href } : null;
        })
        .filter((child): child is Link => Boolean(child));

      return {
        label,
        href: text(item.href) ?? children[0]?.href ?? "#services",
        ...(children.length ? { children } : {}),
      };
    })
    .filter((item): item is NavigationItem => Boolean(item));

  return menu.length ? menu : fallback;
}

function mapLogos(value: unknown, fallback: Logo[]): Logo[] {
  const logos = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const name = text(item.name);
      const src = mediaUrl(item.logo);
      return name && src ? { name, src } : null;
    })
    .filter((logo): logo is Logo => Boolean(logo));

  return logos.length ? logos : fallback;
}

function mapServiceCategories(
  value: unknown,
  fallback: ServiceCategory[],
): ServiceCategory[] {
  const categories = asArray(value)
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
      const services = asArray(category.services)
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
          const mapped: Service = {
            label,
            href: serviceLink.href,
            shortLabel: fallbackService?.shortLabel ?? shortLabel(label),
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
  const metrics = asArray(value)
    .map((entry) => {
      const stat = record(entry);
      const number = stat.value;
      const label = text(stat.label);
      const suffix = text(stat.suffix) ?? "";
      const value = typeof number === "number" || typeof number === "string" ? `${number}${suffix}` : undefined;
      return label && value ? { label, value } : null;
    })
    .filter((metric): metric is Metric => Boolean(metric));

  return metrics.length ? metrics : fallback;
}

function mapTestimonials(value: unknown, fallback: Testimonial[]): Testimonial[] {
  const testimonials = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const quote = text(item.quote);
      const name = text(item.personName);
      if (!quote || !name) {
        return null;
      }

      const publishedOn = text(item.publishedOn);
      return {
        quote,
        name,
        company: text(item.companyName) ?? "JR Compliance client",
        publishedOn: publishedOn ? `Published on ${publishedOn}` : "",
      };
    })
    .filter((testimonial): testimonial is Testimonial => Boolean(testimonial));

  return testimonials.length ? testimonials : fallback;
}

function mapRecognitions(value: unknown, fallback: Recognition[]): Recognition[] {
  const recognitions = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const title = text(item.title);
      const summary = text(item.excerpt);
      if (!title || !summary) {
        return null;
      }

      return { title, summary, href: link(item.link, { label: "Read more", href: "#contact" }).href };
    })
    .filter((recognition): recognition is Recognition => Boolean(recognition));

  return recognitions.length ? recognitions : fallback;
}

function mapFaqs(value: unknown, fallback: FaqCategory[]): FaqCategory[] {
  const categories = asArray(value)
    .map((entry) => {
      const category = record(entry);
      const title = text(category.name);
      if (!title) {
        return null;
      }

      const items = asArray(category.faqs)
        .map((faqEntry) => {
          const faq = record(faqEntry);
          const question = text(faq.question);
          const answer = richTextToPlainText(faq.answer);
          return question && answer ? { question, answer } : null;
        })
        .filter((faq): faq is Faq => Boolean(faq));

      return items.length
        ? {
            id: text(category.slug) ?? title.toLowerCase().replace(/\s+/g, "-"),
            title,
            items,
          }
        : null;
    })
    .filter((category): category is FaqCategory => Boolean(category));

  return categories.length ? categories : fallback;
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

function mapLinkGroups(value: unknown, fallback: HomepageContent["footer"]): HomepageContent["footer"] {
  const groups = asArray(value)
    .map((entry) => {
      const group = record(entry);
      const title = text(group.title)?.toLowerCase() ?? "";
      const links = asArray(group.links)
        .map((entryLink) => {
          const item = record(entryLink);
          const label = text(item.label);
          const href = text(item.href);
          return label && href ? { label, href } : null;
        })
        .filter((item): item is Link => Boolean(item));

      return { title, links };
    })
    .filter((group) => group.links.length);

  const featured = groups.find((group) => group.title.includes("featured"))?.links;
  const popular = groups.find((group) => group.title.includes("popular"))?.links;

  return {
    ...fallback,
    ...(featured ? { featuredLinks: featured } : {}),
    ...(popular ? { popularServices: popular } : {}),
  };
}

function mapLegalNotices(value: unknown, fallback: string[]): string[] {
  const notices = asArray(value)
    .map((entry) => {
      const notice = record(entry);
      const heading = text(notice.title);
      const body = richTextToPlainText(notice.body);
      return body ? (heading ? `${heading}: ${body}` : body) : null;
    })
    .filter((notice): notice is string => Boolean(notice));

  return notices.length ? notices : fallback;
}

function mapHomepage(
  fallback: HomepageContent,
  rawPage: unknown,
  rawSettings: unknown,
): HomepageContent {
  const page = record(rawPage);
  const settings = record(rawSettings);
  const hero = record(page.hero);
  const story = record(page.story);
  const finalCta = record(page.finalCta);
  const siteContact = record(settings.contact);
  const heroCards = asArray(hero.cards).map(record);
  const rotatingWords = asArray(hero.rotatingTerms)
    .map((term) => text(record(term).text))
    .filter((term): term is string => Boolean(term))
    .slice(0, 8);
  const whyUs = record(page.whyUs);

  const headerLogo = mediaUrl(settings.headerLogo);
  const footerLogo = mediaUrl(settings.footerLogo);
  const heroImage = mediaUrl(hero.heroImage);
  const heroSupportCards = heroCards
    .map((card) => {
      const title = text(card.title);
      return title ? { title, ...(text(card.description) ? { description: text(card.description) } : {}) } : null;
    })
    .filter((card): card is { title: string; description?: string } => Boolean(card));
  const whyHighlights = asArray(whyUs.cards)
    .map((card) => text(record(card).title))
    .filter((title): title is string => Boolean(title));

  const footer = {
    ...mapLinkGroups(settings.footerLinkGroups, fallback.footer),
    disclaimer: mapLegalNotices(settings.legalNotices, fallback.footer.disclaimer),
  };

  return {
    ...fallback,
    site: {
      ...fallback.site,
      name: text(settings.siteName) ?? fallback.site.name,
      ...(headerLogo ? { logo: headerLogo } : {}),
      ...(footerLogo ? { footerLogo } : {}),
      phone: text(siteContact.phoneDisplay) ?? fallback.site.phone,
      phoneHref: text(siteContact.phoneE164)
        ? `tel:${text(siteContact.phoneE164)?.replace(/\s/g, "")}`
        : fallback.site.phoneHref,
      email: text(siteContact.email) ?? fallback.site.email,
      footerTagline: text(settings.footerTagline) ?? fallback.site.footerTagline,
      legalLinks: asArray(settings.legalLinks).length
        ? asArray(settings.legalLinks).map((item, index) => link(item, fallback.site.legalLinks[index] ?? fallback.site.legalLinks[0]))
        : fallback.site.legalLinks,
      socialLinks: mapSocialLinks(settings.socialLinks, fallback.site.socialLinks),
    },
    navigation: mapNavigation(settings.headerMenu, fallback.navigation),
    hero: {
      ...fallback.hero,
      prefix: text(hero.titleBefore) ?? fallback.hero.prefix,
      rotatingWords: rotatingWords.length ? rotatingWords : fallback.hero.rotatingWords,
      suffix: text(hero.titleAfter) ?? fallback.hero.suffix,
      description: text(hero.description) ?? fallback.hero.description,
      primaryCta: link(hero.cta, fallback.hero.primaryCta),
      ...(heroImage ? { image: heroImage } : {}),
      ...(heroSupportCards.length ? { supportingCards: heroSupportCards } : {}),
    },
    trustedLogos: mapLogos(page.trustedLogos, fallback.trustedLogos),
    services: {
      ...fallback.services,
      eyebrow: text(record(page.servicesHeading).eyebrow) ?? fallback.services.eyebrow,
      title: titleFromHeading(page.servicesHeading, fallback.services.title),
      categories: mapServiceCategories(page.serviceCategories, fallback.services.categories),
    },
    whyUs: {
      ...fallback.whyUs,
      title: titleFromHeading(whyUs.heading, fallback.whyUs.title),
      description: text(record(whyUs.heading).description) ?? fallback.whyUs.description,
      ...(whyHighlights.length ? { highlights: whyHighlights } : {}),
    },
    metrics: {
      ...fallback.metrics,
      eyebrow: text(record(story.heading).eyebrow) ?? fallback.metrics.eyebrow,
      title: titleFromHeading(story.heading, fallback.metrics.title),
      items: mapMetrics(story.stats, fallback.metrics.items),
      cta: link(story.cta, fallback.metrics.cta),
    },
    testimonials: {
      ...fallback.testimonials,
      title: titleFromHeading(page.testimonialsHeading, fallback.testimonials.title),
      items: mapTestimonials(page.testimonials, fallback.testimonials.items),
    },
    recognitions: {
      ...fallback.recognitions,
      title: titleFromHeading(page.recognitionHeading, fallback.recognitions.title),
      description:
        text(record(page.recognitionHeading).description) ?? fallback.recognitions.description,
      items: mapRecognitions(page.recognitions, fallback.recognitions.items),
    },
    faqs: {
      ...fallback.faqs,
      title: titleFromHeading(page.faqHeading, fallback.faqs.title),
      categories: mapFaqs(page.faqCategories, fallback.faqs.categories),
    },
    closingCta: {
      ...fallback.closingCta,
      title: text(finalCta.title) ?? fallback.closingCta.title,
      description: text(finalCta.description) ?? fallback.closingCta.description,
      cta: link(finalCta.cta, fallback.closingCta.cta),
    },
    footer,
  };
}

function queryFor(slug: SingleTypeSlug): string {
  const params = new URLSearchParams({ status: "published" });

  const addPopulateTree = (tree: PopulateTree, prefix = "populate") => {
    Object.entries(tree).forEach(([field, nested]) => {
      const fieldPrefix = `${prefix}[${field}]`;
      if (nested === true) {
        params.set(fieldPrefix, "true");
      } else {
        addPopulateTree(nested, `${fieldPrefix}[populate]`);
      }
    });
  };

  addPopulateTree(populateTrees[slug]);
  return params.toString();
}

async function getSingleType(slug: SingleTypeSlug): Promise<unknown> {
  if (!strapiUrl) {
    return null;
  }

  const response = await fetch(`${strapiUrl}/api/${slug}?${queryFor(slug)}`, {
    headers: strapiApiToken ? { Authorization: `Bearer ${strapiApiToken}` } : undefined,
    next: { revalidate: 60, tags: ["jr-homepage", "jr-site-settings"] },
  });

  if (!response.ok) {
    throw new Error(`Strapi request for ${slug} failed with ${response.status}`);
  }

  const body = (await response.json()) as { data?: unknown };
  return body.data;
}

export async function getHomepageFromStrapi(
  fallback: HomepageContent,
): Promise<HomepageContent | null> {
  if (!strapiUrl) {
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
