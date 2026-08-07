import type {
  AboutPageContent,
  AboutValue,
  Achievement,
  CareerGalleryItem,
  CareerRole,
  CareerTestimonial,
  CareersPageContent,
  ContactPageContent,
  ContactPoint,
  Faq,
  FaqCategory,
  FooterContent,
  HomepageContent,
  Link,
  Logo,
  Metric,
  NavigationItem,
  PageChromeContent,
  Recognition,
  Service,
  ServiceCategory,
  SocialLink,
  TeamMember,
  Testimonial,
  TimelineEvent,
} from "@/lib/types";

type UnknownRecord = Record<string, unknown>;
type SingleTypeSlug = "home-page" | "site-setting" | "about-page" | "careers-page" | "contact-page";
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
  "about-page": {
    hero: { cta: true, image: true },
    overview: { stats: true },
    mantra: { heading: true, items: { image: true } },
    whyPartner: { heading: true, items: { image: true } },
    pioneers: { heading: true, stats: true },
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

function mapLinkGroups(value: unknown, fallback: FooterContent): FooterContent {
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

/** Maps the shared site-setting record once so every route has identical chrome. */
function mapPageChrome(fallback: PageChromeContent, rawSettings: unknown): PageChromeContent {
  const settings = record(rawSettings);
  const siteContact = record(settings.contact);
  const headerLogo = mediaUrl(settings.headerLogo);
  const footerLogo = mediaUrl(settings.footerLogo);

  return {
    site: {
      ...fallback.site,
      name: text(settings.siteName) ?? fallback.site.name,
      ...(headerLogo ? { logo: headerLogo } : {}),
      ...(footerLogo ? { footerLogo } : {}),
      headerCta: link(settings.headerCta, fallback.site.headerCta),
      phone: text(siteContact.phoneDisplay) ?? fallback.site.phone,
      phoneHref: text(siteContact.phoneE164)
        ? `tel:${text(siteContact.phoneE164)?.replace(/\s/g, "")}`
        : fallback.site.phoneHref,
      email: text(siteContact.email) ?? fallback.site.email,
      footerTagline: text(settings.footerTagline) ?? fallback.site.footerTagline,
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
      disclaimer: mapLegalNotices(settings.legalNotices, fallback.footer.disclaimer),
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
      return title && description ? { title, description, ...(image ? { image } : {}) } : null;
    })
    .filter((item): item is AboutValue => Boolean(item));

  return items.length ? items : fallback;
}

function mapTimeline(value: unknown, fallback: TimelineEvent[]): TimelineEvent[] {
  const events = asArray(value)
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
  const members = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const name = text(item.name);
      const role = text(item.role);
      const image = mediaUrl(item.photo);
      const profileHref = text(record(item.profileLink).href) ?? text(item.profileHref);
      return name && role
        ? { name, role, ...(image ? { image } : {}), ...(profileHref ? { profileHref } : {}) }
        : null;
    })
    .filter((item): item is TeamMember => Boolean(item));

  return members.length ? members : fallback;
}

function mapAchievements(value: unknown, fallback: Achievement[]): Achievement[] {
  const achievements = asArray(value)
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
  const roles = asArray(value)
    .map((entry) => {
      const item = record(entry);
      const title = text(item.title);
      if (!title) {
        return null;
      }

      const fallbackRole = fallback.find((role) => role.title.toLowerCase() === title.toLowerCase());
      const summary = text(item.summary) ?? text(item.description);
      return summary
        ? {
            title,
            department: text(item.department) ?? fallbackRole?.department ?? "JR Compliance",
            location: text(item.location) ?? fallbackRole?.location ?? "Delhi, India",
            employmentType: text(item.workModel) ?? text(item.employmentType) ?? fallbackRole?.employmentType ?? "On-site",
            summary,
            href: link(
              item.applyLink,
              fallbackRole ? { label: fallbackRole.title, href: fallbackRole.href } : { label: title, href: "/contact-us" },
            ).href,
          }
        : null;
    })
    .filter((item): item is CareerRole => Boolean(item));

  return roles.length ? roles : fallback;
}

function mapCareerGallery(value: unknown, fallback: CareerGalleryItem[]): CareerGalleryItem[] {
  const gallery = asArray(value)
    .map((entry, index) => {
      const item = record(entry);
      const imageRecord = record(item.image);
      const src = mediaUrl(item.image);
      if (!src) {
        return null;
      }

      return {
        src,
        alt: text(imageRecord.alternativeText) ?? text(item.alt) ?? fallback[index]?.alt ?? "JR Compliance workplace culture",
      };
    })
    .filter((item): item is CareerGalleryItem => Boolean(item));

  return gallery.length ? gallery : fallback;
}

function mapCareerTestimonials(value: unknown, fallback: CareerTestimonial[]): CareerTestimonial[] {
  const testimonials = asArray(value)
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
  const faqs = asArray(value)
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
      return title ? { title, ...(text(card.description) ? { description: text(card.description) } : {}) } : null;
    })
    .filter((card): card is { title: string; description?: string } => Boolean(card));
  const whyHighlights = asArray(whyUs.cards)
    .map((card) => text(record(card).title))
    .filter((title): title is string => Boolean(title));

  return {
    ...fallback,
    ...chrome,
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
    seo: {
      title: text(record(page.seo).metaTitle) ?? fallback.seo.title,
      description: text(record(page.seo).metaDescription) ?? fallback.seo.description,
    },
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
    seo: {
      title: text(record(page.seo).metaTitle) ?? fallback.seo.title,
      description: text(record(page.seo).metaDescription) ?? fallback.seo.description,
    },
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
      items: mapValueItems(values.items, fallback.values.items),
    },
    lifeAtJr: {
      ...fallback.lifeAtJr,
      eyebrow: text(record(lifeAtJr.heading).eyebrow) ?? text(lifeAtJr.eyebrow) ?? fallback.lifeAtJr.eyebrow,
      title: text(lifeAtJr.title) ?? titleFromComponent(lifeAtJr.heading, fallback.lifeAtJr.title),
      description: text(record(lifeAtJr.heading).description) ?? text(lifeAtJr.description) ?? fallback.lifeAtJr.description,
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
      items: mapValueItems(benefits.items, fallback.benefits.items),
    },
    testimonials: {
      ...fallback.testimonials,
      eyebrow: text(record(page.testimonialsHeading).eyebrow) ?? fallback.testimonials.eyebrow,
      title: titleFromComponent(page.testimonialsHeading, fallback.testimonials.title),
      items: mapCareerTestimonials(page.careerTestimonials, fallback.testimonials.items),
    },
    faqs: {
      ...fallback.faqs,
      eyebrow: text(record(page.faqHeading).eyebrow) ?? fallback.faqs.eyebrow,
      title: titleFromComponent(page.faqHeading, fallback.faqs.title),
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
    seo: {
      title: text(record(page.seo).metaTitle) ?? fallback.seo.title,
      description: text(record(page.seo).metaDescription) ?? fallback.seo.description,
    },
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

const cacheTagBySlug: Record<SingleTypeSlug, string> = {
  "site-setting": "jr-site-settings",
  "home-page": "jr-homepage",
  "about-page": "jr-about-page",
  "careers-page": "jr-careers-page",
  "contact-page": "jr-contact-page",
};

async function getSingleType(slug: SingleTypeSlug): Promise<unknown> {
  if (!strapiUrl) {
    return null;
  }

  const response = await fetch(`${strapiUrl}/api/${slug}?${queryFor(slug)}`, {
    headers: strapiApiToken ? { Authorization: `Bearer ${strapiApiToken}` } : undefined,
    next: { revalidate: 60, tags: [cacheTagBySlug[slug]] },
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

export async function getAboutPageFromStrapi(
  fallback: AboutPageContent,
): Promise<AboutPageContent | null> {
  if (!strapiUrl) {
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
  if (!strapiUrl) {
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
  if (!strapiUrl) {
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
