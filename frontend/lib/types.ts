export type Link = {
  label: string;
  href: string;
};

export type NavigationItem = Link & {
  children?: Link[];
};

export type Logo = {
  name: string;
  src: string;
};

export type Service = Link & {
  shortLabel: string;
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
};

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  publishedOn: string;
};

export type Recognition = {
  title: string;
  summary: string;
  href: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: Faq[];
};

export type SocialLink = Link & {
  abbreviation: string;
};

export type SiteSettings = {
  name: string;
  logo: string;
  footerLogo: string;
  phone: string;
  phoneHref: string;
  email: string;
  socialLinks: SocialLink[];
  footerTagline: string;
  legalLinks: Link[];
};

export type HomepageContent = {
  site: SiteSettings;
  navigation: NavigationItem[];
  hero: {
    prefix: string;
    rotatingWords: string[];
    suffix: string;
    description: string;
    primaryCta: Link;
    image: string;
    imageAlt: string;
    supportingCards: { title: string; description?: string }[];
  };
  trustedLogos: Logo[];
  services: {
    eyebrow: string;
    title: string;
    categories: ServiceCategory[];
  };
  whyUs: {
    title: string;
    description: string;
    highlights: string[];
  };
  metrics: {
    eyebrow: string;
    title: string;
    items: Metric[];
    cta: Link;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  recognitions: {
    title: string;
    description: string;
    items: Recognition[];
  };
  faqs: {
    title: string;
    categories: FaqCategory[];
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
  footer: {
    featuredLinks: Link[];
    popularServices: Link[];
    disclaimer: string[];
  };
};
