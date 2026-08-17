/** Browser target after converting Strapi's same_tab/new_tab enum. */
export type LinkTarget = "_self" | "_blank";

export type Link = {
  label: string;
  href: string;
  target?: LinkTarget;
};

export type NavigationCategory = {
  title: string;
  links: Link[];
};

export type NavigationItem = Link & {
  children?: Link[];
  /** Desktop mega-menu categories; local fallback protects existing flat CMS menus. */
  categories?: NavigationCategory[];
};

export type Logo = {
  name: string;
  src: string;
  /** Optional public website associated with a CMS-managed brand mark. */
  href?: string;
};

export type Service = Link & {
  shortLabel: string;
  summary?: string;
  /** Optional approved CMS/legacy icon shown as decorative artwork. */
  icon?: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  services: Service[];
};

export type Metric = {
  value: string;
  label: string;
  icon?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  publishedOn: string;
  role?: string;
  image?: string;
  companyLogo?: string;
};

export type Recognition = {
  title: string;
  summary: string;
  href: string;
  target?: LinkTarget;
  linkLabel: string;
  category?: string;
  sourceName?: string;
  sourceLogo?: string;
  coverImage?: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: Faq[];
  icon?: string;
};

export type SectionHeading = {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center";
};

export type HomeCard = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  icon?: string;
  iconAlt?: string;
  cta?: Link;
};

export type Insight = {
  title: string;
  summary: string;
  kind: "article" | "video";
  image: string;
  imageAlt: string;
  href: string;
  target?: LinkTarget;
  linkLabel: string;
  publishedOn?: string;
};

export type SocialLink = Link & {
  abbreviation: string;
};

export type FooterLinkGroup = {
  title: string;
  links: Link[];
};

export type LegalNotice = {
  title: string;
  body: string;
};

export type Seo = {
  title: string;
  description: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  shareImage?: string;
};

export type LeadFormTrustItem = {
  name: string;
  logo?: string;
  link?: Link;
};

/** Global, editor-managed copy for the shared consultation form. */
export type LeadFormSettings = {
  enabled: boolean;
  heading: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  consentText: string;
  privacyLink: Link;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successMessage: string;
  redirectPath: string;
  secureLabel: string;
  durationLabel: string;
  noSpamLabel: string;
  trustHeading?: string;
  trustDescription?: string;
  trustItems: LeadFormTrustItem[];
  experienceText?: string;
};

export type SiteSettings = {
  name: string;
  logo: string;
  footerLogo: string;
  headerCta: Link;
  footerCta?: Link;
  phone: string;
  phoneHref: string;
  email: string;
  whatsAppHref?: string;
  socialLinks: SocialLink[];
  footerTagline: string;
  legalLinks: Link[];
  copyrightText: string;
  leadForm: LeadFormSettings;
};

export type FooterContent = {
  featuredLinks: Link[];
  popularServices: Link[];
  /** CMS link groups preserve editor-provided titles and group ordering. */
  linkGroups?: FooterLinkGroup[];
  disclaimer: string[];
  legalNotices?: LegalNotice[];
};

export type PageChromeContent = {
  site: SiteSettings;
  navigation: NavigationItem[];
  footer: FooterContent;
};

export type HomepageContent = PageChromeContent & {
  seo: Seo;
  hero: {
    prefix: string;
    rotatingWords: string[];
    suffix: string;
    description: string;
    primaryCta: Link;
    image: string;
    imageAlt: string;
    supportingCards: HomeCard[];
  };
  trustedLogos: Logo[];
  services: SectionHeading & {
    eyebrow: string;
    categories: ServiceCategory[];
  };
  whyUs: SectionHeading & {
    description: string;
    cards: HomeCard[];
  };
  regulators: SectionHeading & {
    eyebrow: string;
    logos: Logo[];
  };
  metrics: SectionHeading & {
    eyebrow: string;
    items: Metric[];
    cta: Link;
    featureImage?: string;
    featureImageAlt?: string;
    featureTitle?: string;
  };
  tickerCta?: {
    title: string;
    description?: string;
    cta: Link;
  };
  testimonials: SectionHeading & {
    items: Testimonial[];
  };
  recognitions: SectionHeading & {
    description: string;
    items: Recognition[];
  };
  faqs: SectionHeading & {
    categories: FaqCategory[];
  };
  insights?: SectionHeading & {
    items: Insight[];
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
};

export type AboutValue = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export type TimelineEvent = {
  period: string;
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  profileHref?: string;
  profileTarget?: LinkTarget;
  profileLabel?: string;
};

export type Achievement = {
  title: string;
  description: string;
  image?: string;
};

export type AboutPageContent = PageChromeContent & {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image?: string;
    imageAlt: string;
    cta: Link;
  };
  overview: {
    title: string;
    description: string;
    stats: Metric[];
  };
  mantra: {
    eyebrow: string;
    title: string;
    description: string;
    values: AboutValue[];
  };
  story: {
    eyebrow: string;
    title: string;
    description?: string;
    milestones: TimelineEvent[];
  };
  reasons: {
    eyebrow: string;
    title: string;
    description?: string;
    items: AboutValue[];
  };
  pioneers: {
    eyebrow: string;
    title: string;
    description: string;
    stats: Metric[];
  };
  team: {
    eyebrow: string;
    title: string;
    description: string;
    image?: string;
    imageAlt: string;
    members: TeamMember[];
    cta: Link;
  };
  achievements: {
    eyebrow: string;
    title: string;
    description?: string;
    items: Achievement[];
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
};

export type CareerRole = {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  applyLabel: string;
  href: string;
  target?: LinkTarget;
};

export type CareerGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type CareerTestimonial = {
  quote: string;
  name: string;
  role: string;
  image?: string;
};

export type CareersPageContent = PageChromeContent & {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: Link;
  };
  purpose: {
    eyebrow: string;
    title: string;
    vision: string;
    mission: string;
  };
  values: {
    eyebrow: string;
    title: string;
    description?: string;
    items: AboutValue[];
  };
  lifeAtJr: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
    gallery: CareerGalleryItem[];
  };
  openings: {
    eyebrow: string;
    title: string;
    description: string;
    roles: CareerRole[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    description?: string;
    items: AboutValue[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description?: string;
    items: CareerTestimonial[];
  };
  faqs: {
    eyebrow: string;
    title: string;
    description?: string;
    items: Faq[];
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
};

export type ContactPoint = {
  label: string;
  value: string;
  href: string;
  detail: string;
  icon?: string;
};

export type ContactPageContent = PageChromeContent & {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contactPoints: ContactPoint[];
  enquiry: {
    eyebrow: string;
    title: string;
    description: string;
    topics: string[];
    directCta: Link;
    formNote: string;
  };
  response: {
    eyebrow: string;
    title: string;
    steps: AboutValue[];
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
};

/** A title-and-description pair used by the fixed registration-page sections. */
export type RegistrationDetail = {
  title: string;
  description: string;
};

/** One named group in the service breakdown (for example, Documents). */
export type RegistrationBreakdownGroup = {
  title: string;
  items: string[];
};

/**
 * Editor-managed content shared by every Company Registration detail route.
 * The shape is deliberately fixed: it is a service contract, not a generic
 * page builder, so every route keeps the same information architecture.
 */
export type CompanyRegistrationPageData = {
  slug: string;
  menuLabel: string;
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: Link;
  };
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  challenges: {
    eyebrow: string;
    title: string;
    items: RegistrationDetail[];
  };
  advantages: {
    eyebrow: string;
    title: string;
    items: RegistrationDetail[];
  };
  process: {
    eyebrow: string;
    title: string;
    items: RegistrationDetail[];
  };
  whyChoose: {
    eyebrow: string;
    title: string;
    items: RegistrationDetail[];
  };
  breakdown: {
    eyebrow: string;
    title: string;
    groups: RegistrationBreakdownGroup[];
  };
  faqs: {
    eyebrow: string;
    title: string;
    items: Faq[];
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
};

export type CompanyRegistrationPageContent = PageChromeContent & CompanyRegistrationPageData;

/**
 * Editor-managed content for a fixed MCA Services detail route. It deliberately
 * mirrors the established service-detail information architecture without
 * widening the Company Registration collection into a generic page builder.
 */
export type McaServicePageData = CompanyRegistrationPageData;

export type McaServicePageContent = PageChromeContent & McaServicePageData;

/** Editor-managed content for Import Export Service detail routes. */
export type ImportExportServicePageData = CompanyRegistrationPageData;

export type ImportExportServicePageContent = PageChromeContent & ImportExportServicePageData;

/** Editor-managed content for Government License & Certification detail routes. */
export type GovernmentLicenseCertificationPageData = CompanyRegistrationPageData;

export type GovernmentLicenseCertificationPageContent =
  PageChromeContent & GovernmentLicenseCertificationPageData;
