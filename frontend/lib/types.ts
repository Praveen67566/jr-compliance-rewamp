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
  headerCta: Link;
  phone: string;
  phoneHref: string;
  email: string;
  socialLinks: SocialLink[];
  footerTagline: string;
  legalLinks: Link[];
};

export type FooterContent = {
  featuredLinks: Link[];
  popularServices: Link[];
  disclaimer: string[];
};

export type PageChromeContent = {
  site: SiteSettings;
  navigation: NavigationItem[];
  footer: FooterContent;
};

export type HomepageContent = PageChromeContent & {
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
};

export type AboutValue = {
  title: string;
  description: string;
  image?: string;
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
};

export type Achievement = {
  title: string;
  description: string;
  image?: string;
};

export type AboutPageContent = PageChromeContent & {
  seo: {
    title: string;
    description: string;
  };
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
  href: string;
};

export type CareerGalleryItem = {
  src: string;
  alt: string;
};

export type CareerTestimonial = {
  quote: string;
  name: string;
  role: string;
  image?: string;
};

export type CareersPageContent = PageChromeContent & {
  seo: {
    title: string;
    description: string;
  };
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
    items: AboutValue[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: CareerTestimonial[];
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

export type ContactPoint = {
  label: string;
  value: string;
  href: string;
  detail: string;
  icon?: string;
};

export type ContactPageContent = PageChromeContent & {
  seo: {
    title: string;
    description: string;
  };
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
