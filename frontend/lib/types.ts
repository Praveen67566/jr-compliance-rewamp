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

export type FooterBadge = {
  src: string;
  alt: string;
};

export type LegalNotice = {
  title: string;
  body: string;
};

export type HeaderLoginButton =
  | { enabled: false; label: string }
  | { enabled: true; label: string; href: string };

export type Seo = {
  title: string;
  description: string;
  canonicalUrl?: string;
  robots?: string;
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
  loginButton: HeaderLoginButton;
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
  footerBadges: FooterBadge[];
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
  /** Strapi's document timestamp; local fallback content intentionally omits it. */
  updatedAt?: string;
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

/** The only fixed public routes backed by the dedicated legal-page collection. */
export type LegalPageSlug =
  | "privacy-policy"
  | "terms-and-conditions"
  | "purchase-and-billing";

/** A text leaf supported by Strapi's Blocks editor and the legal renderer. */
export type LegalTextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

/** A safe inline link. Strapi Blocks links contain text leaves only. */
export type LegalLinkNode = {
  type: "link";
  url: string;
  children: LegalTextNode[];
};

export type LegalInlineNode = LegalTextNode | LegalLinkNode;

export type LegalParagraphBlock = {
  type: "paragraph";
  children: LegalInlineNode[];
};

export type LegalHeadingBlock = {
  type: "heading";
  level: 2 | 3 | 4;
  children: LegalInlineNode[];
};

export type LegalListItemBlock = {
  type: "list-item";
  children: LegalInlineNode[];
};

export type LegalListBlock = {
  type: "list";
  format: "ordered" | "unordered";
  children: LegalListItemBlock[];
};

/** Restricted semantic subset of Blocks used by the fixed legal template. */
export type LegalContentBlock =
  | LegalParagraphBlock
  | LegalHeadingBlock
  | LegalListBlock;

export type RegistrationRichText = string | LegalContentBlock[];

export type LegalSection = {
  title: string;
  body: LegalContentBlock[];
};

/**
 * Editor-managed content for the three fixed footer/legal routes. Rich text is
 * deliberately constrained to semantic legal prose rather than a page builder.
 */
export type LegalPageData = {
  slug: LegalPageSlug;
  eyebrow: string;
  title: string;
  introduction: LegalContentBlock[];
  sections: LegalSection[];
  seo: Seo;
};

export type LegalPageContent = PageChromeContent & LegalPageData;

/** A title-and-description pair used by the fixed registration-page sections. */
export type RegistrationDetail = {
  title: string;
  description: RegistrationRichText;
  /** Optional CMS artwork displayed inside the card's decorative signal ring. */
  icon?: string;
};

/** One title-and-rich-description card in the optional extra-content section. */
export type RegistrationExtraContentCard = {
  title: string;
  description: RegistrationRichText;
};

/** One named group in the service breakdown (for example, Documents). */
export type RegistrationBreakdownGroup = {
  title: string;
  items: RegistrationRichText[];
  /** Optional CMS artwork displayed inside the group's decorative signal ring. */
  icon?: string;
};

/** One ordered proof metric in the optional fixed-service results section. */
export type RegistrationResultStat = {
  value: string;
  label: string;
};

/** Optional proof and testimonial content shared by fixed service-detail pages. */
export type RegistrationResultsSection = {
  rating: {
    label: string;
    source: string;
  };
  title: string;
  description: string;
  stats: RegistrationResultStat[];
  quote: string;
  name: string;
  role?: string;
  company?: string;
};

/** One editor-managed YouTube video normalized for privacy-enhanced embedding. */
export type YouTubeVideo = {
  title: string;
  embedUrl: string;
};

/** Optional video collection shared by the fixed Corporate and Approval pages. */
export type YouTubeVideoSection = {
  eyebrow: string;
  title: string;
  description?: string;
  videos: YouTubeVideo[];
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
  /** Optional, editor-ordered client logos rendered directly after the hero. */
  trustedLogos?: Logo[];
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: RegistrationRichText[];
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
  /** Optional editor-ordered cards rendered immediately after Why JR. */
  extraContent?: RegistrationExtraContentCard[];
  youtubeVideos?: YouTubeVideoSection;
  breakdown: {
    eyebrow: string;
    title: string;
    groups: RegistrationBreakdownGroup[];
  };
  resultsSection?: RegistrationResultsSection;
  tickerCta?: {
    title: string;
    description?: string;
    cta: Link;
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

/** Editor-managed content for IPR Services detail routes. */
export type IprServicePageData = CompanyRegistrationPageData;

export type IprServicePageContent = PageChromeContent & IprServicePageData;

/** Editor-managed content for FSSAI detail routes. */
export type FssaiServicePageData = CompanyRegistrationPageData;

export type FssaiServicePageContent = PageChromeContent & FssaiServicePageData;

/** Editor-managed content for SEBI Business Registration detail routes. */
export type SebiBusinessRegistrationPageData = CompanyRegistrationPageData;

export type SebiBusinessRegistrationPageContent =
  PageChromeContent & SebiBusinessRegistrationPageData;

/** Editor-managed content for Tax and Accounting detail routes. */
export type TaxAccountingPageData = CompanyRegistrationPageData;

export type TaxAccountingPageContent = PageChromeContent & TaxAccountingPageData;

/** Editor-managed content for Labour Compliance detail routes. */
export type LabourCompliancePageData = CompanyRegistrationPageData;

export type LabourCompliancePageContent = PageChromeContent & LabourCompliancePageData;

/** Editor-managed content for Fund Raising detail routes. */
export type FundRaisingPageData = CompanyRegistrationPageData;

export type FundRaisingPageContent = PageChromeContent & FundRaisingPageData;

/** Editor-managed content for Bureau of Indian Standards detail routes. */
export type BureauIndianStandardsPageData = CompanyRegistrationPageData;

export type BureauIndianStandardsPageContent =
  PageChromeContent & BureauIndianStandardsPageData;

/** Editor-managed content for Pollution Advisory detail routes. */
export type PollutionAdvisoryPageData = CompanyRegistrationPageData;

export type PollutionAdvisoryPageContent = PageChromeContent & PollutionAdvisoryPageData;

/** Editor-managed content for Telecommunication Engineering Centre detail routes. */
export type TelecommunicationEngineeringCentrePageData = CompanyRegistrationPageData;

export type TelecommunicationEngineeringCentrePageContent =
  PageChromeContent & TelecommunicationEngineeringCentrePageData;

/** Editor-managed content for Wireless Planning and Coordination detail routes. */
export type WirelessPlanningCoordinationPageData = CompanyRegistrationPageData;

export type WirelessPlanningCoordinationPageContent =
  PageChromeContent & WirelessPlanningCoordinationPageData;

/** Editor-managed content for Bureau of Energy Efficiency detail routes. */
export type BureauEnergyEfficiencyPageData = CompanyRegistrationPageData;

export type BureauEnergyEfficiencyPageContent =
  PageChromeContent & BureauEnergyEfficiencyPageData;

/** Editor-managed content for CDSCO Registration detail routes. */
export type CdscoRegistrationPageData = CompanyRegistrationPageData;

export type CdscoRegistrationPageContent = PageChromeContent & CdscoRegistrationPageData;

/** Editor-managed content for AERB Approval detail routes. */
export type AerbApprovalPageData = CompanyRegistrationPageData;

export type AerbApprovalPageContent = PageChromeContent & AerbApprovalPageData;

/** Editor-managed content for LMPC Certification detail routes. */
export type LmpcCertificationPageData = CompanyRegistrationPageData;

export type LmpcCertificationPageContent = PageChromeContent & LmpcCertificationPageData;

/** Editor-managed content for STQC detail routes. */
export type StqcPageData = CompanyRegistrationPageData;

export type StqcPageContent = PageChromeContent & StqcPageData;

/** An approved CMS image with the alternative text required by Global templates. */
export type GlobalPageImage = {
  src: string;
  alt: string;
};

/** One certificate destination displayed on a Global country landing page. */
export type GlobalCertificateCard = {
  title: string;
  description: string;
  logo: GlobalPageImage;
  link: Link;
};

/**
 * Editor-managed country landing content for `/globals/[country]`.
 * The fixed shape is intentionally separate from Corporate and Approval pages.
 */
export type GlobalCountryPageData = {
  slug: string;
  menuLabel: string;
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: GlobalPageImage;
    cta: Link;
  };
  certificates: {
    eyebrow: string;
    title: string;
    description?: string;
    items: GlobalCertificateCard[];
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
};

export type GlobalCountryPageContent = PageChromeContent & GlobalCountryPageData;

/** One ordered step in a Global certificate process. */
export type GlobalCertificateProcessStep = {
  title: string;
  description: string;
};

/**
 * Editor-managed certificate content for `/globals/[country]/[slug]`.
 * Its fixed sequence reflects country certification content rather than the
 * Company Registration information architecture.
 */
export type GlobalCertificatePageData = {
  countryName: string;
  countrySlug: string;
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
  scope: {
    eyebrow: string;
    title: string;
    description?: string;
    items: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    description?: string;
    steps: GlobalCertificateProcessStep[];
    image?: GlobalPageImage;
  };
  ourRole: {
    eyebrow: string;
    title: string;
    description?: string;
    items: string[];
    cta: Link;
  };
  conclusion: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    cta: Link;
  };
  closingCta: {
    title: string;
    description: string;
    cta: Link;
  };
};

export type GlobalCertificatePageContent = PageChromeContent & GlobalCertificatePageData;
