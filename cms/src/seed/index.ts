import { stat } from "node:fs/promises";
import path from "node:path";

import type { Core } from "@strapi/strapi";

import { withNextRevalidationSuppressed } from "../revalidation";

import {
  achievements,
  blocks,
  brandLogos,
  careerFaqs,
  careerGallery,
  careerTestimonials,
  homeFaqCategories,
  homeTestimonials,
  initialSite,
  jobOpenings,
  newTab,
  recognitions,
  regulatorLogos,
  sameTab,
  sectionHeading,
  serviceCategories,
  teamMembers,
  timelineEvents,
} from "./content";

type SeedDocument = { documentId: string };
type DocumentService = {
  create: (options: { data: Record<string, unknown>; status: "published" }) => Promise<SeedDocument>;
  findFirst: (options: { status: "published" }) => Promise<SeedDocument | null>;
};

const CONTENT_TYPES = {
  siteSetting: "api::site-setting.site-setting",
  homePage: "api::home-page.home-page",
  aboutPage: "api::about-page.about-page",
  careersPage: "api::careers-page.careers-page",
  contactPage: "api::contact-page.contact-page",
  serviceCategory: "api::service-category.service-category",
  service: "api::service.service",
  brandLogo: "api::brand-logo.brand-logo",
  testimonial: "api::testimonial.testimonial",
  recognition: "api::recognition.recognition",
  faqCategory: "api::faq-category.faq-category",
  faq: "api::faq.faq",
  insight: "api::insight.insight",
  timelineEvent: "api::timeline-event.timeline-event",
  teamMember: "api::team-member.team-member",
  achievement: "api::achievement.achievement",
  jobOpening: "api::job-opening.job-opening",
  careerTestimonial: "api::career-testimonial.career-testimonial",
  careerGalleryItem: "api::career-gallery-item.career-gallery-item",
} as const;

function documentService(strapi: Core.Strapi, uid: string): DocumentService {
  // Project schemas are loaded dynamically by Strapi, so generated application
  // UID types are unavailable at this module's compile time.
  return strapi.documents(uid as never) as unknown as DocumentService;
}

async function createPublished(
  strapi: Core.Strapi,
  uid: string,
  data: Record<string, unknown>,
): Promise<SeedDocument> {
  return documentService(strapi, uid).create({ data, status: "published" });
}

function mediaMimeType(source: string): string {
  const extension = path.extname(source).toLowerCase();
  const mediaTypes: Record<string, string> = {
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
  };

  const mediaType = mediaTypes[extension];
  if (!mediaType) {
    throw new Error(`The local seed only supports approved image files. Unsupported media: ${source}`);
  }

  return mediaType;
}

function sourceFile(source: string): string {
  return path.resolve(process.cwd(), "..", "frontend", "public", "images", source);
}

function seedMediaName(source: string, alternativeText: string): string {
  const sourcePart = source.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const altPart = alternativeText
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
  return `jr-seed--${sourcePart}--${altPart || "media"}`;
}

function mediaLibrary(strapi: Core.Strapi) {
  const memoizedIds = new Map<string, Promise<number>>();

  return async function mediaId(source: string, alternativeText: string): Promise<number> {
    // Alternative text belongs to the media-library asset. A reused source can
    // have distinct accessible meaning in two CMS fields, so seed a separate
    // media record for each approved alt-text context.
    const cacheKey = `${source}\u0000${alternativeText}`;
    const cached = memoizedIds.get(cacheKey);
    if (cached) {
      return cached;
    }

    const upload = (async () => {
      const filename = sourceFile(source);
      const name = seedMediaName(source, alternativeText);
      const existing = await strapi.db.query("plugin::upload.file").findOne({ where: { name } });
      if (existing?.id) {
        return existing.id as number;
      }

      const metadata = await stat(filename).catch(() => null);
      if (!metadata?.isFile()) {
        throw new Error(`Approved seed media is missing: ${filename}`);
      }

      const uploadService = strapi.plugin("upload").service("upload") as unknown as {
        upload: (input: {
          data: Record<string, unknown>;
          files: unknown[];
        }) => Promise<Array<{ id: number }>>;
      };
      const uploaded = await uploadService.upload({
        data: { fileInfo: { name, alternativeText } },
        files: [
          {
            filepath: filename,
            originalFilename: path.basename(source),
            mimetype: mediaMimeType(source),
            size: metadata.size,
          },
        ],
      });
      const file = uploaded[0];
      if (!file?.id) {
        throw new Error(`Strapi did not return a media record for ${source}`);
      }

      return file.id;
    })();

    memoizedIds.set(cacheKey, upload);
    return upload;
  };
}

type DatabaseFinder = {
  findOne: (options?: { select?: string[] }) => Promise<unknown>;
};

async function hasExistingEditorContent(strapi: Core.Strapi): Promise<boolean> {
  const entries = await Promise.all(
    Object.values(CONTENT_TYPES).map(async (uid) => {
      const query = strapi.db.query(uid as never) as unknown as DatabaseFinder;
      return query.findOne({ select: ["id"] });
    }),
  );
  const uploadedMedia = await strapi.db
    .query("plugin::upload.file")
    .findOne({ select: ["id"] });

  return entries.some(Boolean) || Boolean(uploadedMedia);
}

/**
 * Opt-in fresh-database seed. It uploads the approved local media copies and
 * creates published content for the complete current route scope. It never
 * overwrites editor data and it deliberately excludes legacy detail routes.
 */
export async function seedInitialContent(strapi: Core.Strapi): Promise<void> {
  if (process.env.SEED_DEMO_CONTENT !== "true") {
    return;
  }

  const databaseClient = process.env.DATABASE_CLIENT ?? "sqlite";
  if (process.env.NODE_ENV === "production" || databaseClient !== "sqlite") {
    strapi.log.warn(
      "JR CMS seed refused: it is restricted to a fresh local SQLite database and cannot run in production.",
    );
    return;
  }

  if (await hasExistingEditorContent(strapi)) {
    strapi.log.warn(
      "JR CMS seed skipped: the local database already contains editor content or media. Start with a fresh database instead of duplicating content.",
    );
    return;
  }

  return withNextRevalidationSuppressed(strapi, async () => {
    const mediaId = mediaLibrary(strapi);
    strapi.log.info("Seeding approved JR Compliance media and published editorial content…");

  const clientBrands: SeedDocument[] = [];
  for (const [name, source] of brandLogos) {
    clientBrands.push(
      await createPublished(strapi, CONTENT_TYPES.brandLogo, {
        name,
        kind: "client",
        logo: await mediaId(source, `${name} logo`),
        sortOrder: clientBrands.length,
      }),
    );
  }

  const regulators: SeedDocument[] = [];
  for (const [name, source] of regulatorLogos) {
    regulators.push(
      await createPublished(strapi, CONTENT_TYPES.brandLogo, {
        name,
        kind: "regulator",
        logo: await mediaId(source, `${name} regulatory mark`),
        sortOrder: regulators.length,
      }),
    );
  }

  const categoryDocuments: SeedDocument[] = [];
  for (const category of serviceCategories) {
    const categoryDocument = await createPublished(strapi, CONTENT_TYPES.serviceCategory, {
      name: category.name,
      slug: category.slug,
      description: category.description,
      sortOrder: category.sortOrder,
    });
    categoryDocuments.push(categoryDocument);

    for (const [title, slug, source] of category.services) {
      await createPublished(strapi, CONTENT_TYPES.service, {
        title,
        slug,
        icon: await mediaId(source, `${title} service icon`),
        link: sameTab(title, "#contact"),
        sortOrder: category.services.findIndex((service) => service[1] === slug),
        serviceCategory: categoryDocument.documentId,
      });
    }
  }

  const faqCategoryDocuments: SeedDocument[] = [];
  for (const category of homeFaqCategories) {
    const categoryDocument = await createPublished(strapi, CONTENT_TYPES.faqCategory, {
      name: category.name,
      slug: category.slug,
      sortOrder: faqCategoryDocuments.length,
    });
    faqCategoryDocuments.push(categoryDocument);

    for (const [question, answer] of category.questions) {
      await createPublished(strapi, CONTENT_TYPES.faq, {
        question,
        answer: blocks(answer),
        sortOrder: category.questions.findIndex((faq) => faq[0] === question),
        faqCategory: categoryDocument.documentId,
      });
    }
  }

  const careerFaqCategory = await createPublished(strapi, CONTENT_TYPES.faqCategory, {
    name: "Careers",
    slug: "careers",
    sortOrder: faqCategoryDocuments.length,
  });
  const careerFaqDocuments: SeedDocument[] = [];
  for (const [question, answer] of careerFaqs) {
    careerFaqDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.faq, {
        question,
        answer: blocks(answer),
        sortOrder: careerFaqDocuments.length,
        faqCategory: careerFaqCategory.documentId,
      }),
    );
  }

  const testimonialDocuments: SeedDocument[] = [];
  for (const testimonial of homeTestimonials) {
    testimonialDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.testimonial, {
        ...testimonial,
        sortOrder: testimonialDocuments.length,
      }),
    );
  }

  const recognitionDocuments: SeedDocument[] = [];
  for (const recognition of recognitions) {
    recognitionDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.recognition, {
        ...recognition,
        link: newTab("Read coverage", recognition.href),
        sortOrder: recognitionDocuments.length,
      }),
    );
  }

  const timelineDocuments: SeedDocument[] = [];
  for (const [period, title, description] of timelineEvents) {
    timelineDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.timelineEvent, {
        period,
        title,
        description,
        sortOrder: timelineDocuments.length,
      }),
    );
  }

  const teamDocuments: SeedDocument[] = [];
  for (const [name, role, image, profileHref] of teamMembers) {
    teamDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.teamMember, {
        name,
        role,
        photo: await mediaId(image, `${name} portrait`),
        ...(profileHref ? { profileLink: newTab("View profile", profileHref) } : {}),
        sortOrder: teamDocuments.length,
      }),
    );
  }

  const achievementDocuments: SeedDocument[] = [];
  for (const [title, description, image] of achievements) {
    achievementDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.achievement, {
        title,
        description,
        logo: await mediaId(image, `${title} achievement mark`),
        sortOrder: achievementDocuments.length,
      }),
    );
  }

  const galleryDocuments: SeedDocument[] = [];
  for (const [image, alternativeText] of careerGallery) {
    galleryDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.careerGalleryItem, {
        image: await mediaId(image, alternativeText),
        alternativeText,
        sortOrder: galleryDocuments.length,
      }),
    );
  }

  const openingDocuments: SeedDocument[] = [];
  for (const [title, slug, department, summary] of jobOpenings) {
    openingDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.jobOpening, {
        title,
        slug,
        department,
        location: "Delhi, India",
        workModel: "on_site",
        summary,
        applyLink: sameTab("Express interest", "/contact-us"),
        isOpen: true,
        sortOrder: openingDocuments.length,
      }),
    );
  }

  const careerTestimonialDocuments: SeedDocument[] = [];
  for (const [quote, personName, role, photo] of careerTestimonials) {
    careerTestimonialDocuments.push(
      await createPublished(strapi, CONTENT_TYPES.careerTestimonial, {
        quote,
        personName,
        role,
        photo: await mediaId(photo, `${personName} portrait`),
        sortOrder: careerTestimonialDocuments.length,
      }),
    );
  }

  const homeHeroImage = await mediaId("team.webp", "JR Compliance team members");
  const whyUsImages = await Promise.all([
    mediaId("about/mantra/global.webp", "Global compliance support"),
    mediaId("about/mantra/tailored.webp", "Tailored compliance support"),
    mediaId("about/mantra/comprehensive.webp", "Corporate compliance support"),
  ]);

  await createPublished(strapi, CONTENT_TYPES.homePage, {
    hero: {
      titleBefore: "Bridging",
      rotatingTerms: ["Businesses", "Companies", "Manufacturers", "Brands"].map((text) => ({ text })),
      titleAfter: "to Worldwide Standards",
      description:
        "Trusted by 1,000+ leading global brands, our award-winning consultants empower businesses with unwavering compliance and certification services, backed by comprehensive expertise and a professional team.",
      cta: sameTab("Connect With Us", "#contact"),
      heroImage: homeHeroImage,
      cards: [
        { title: "Business Registration" },
        { title: "Compliance Consultants", description: "Get Certified!" },
        {
          title: "Global Reach",
          description: "An extensive network of partners across 20+ countries",
        },
      ],
    },
    trustedLogos: clientBrands.map((entry) => entry.documentId),
    servicesHeading: sectionHeading("From Every Corner to Every Regulation", {
      eyebrow: "Our Service Stack",
    }),
    serviceCategories: categoryDocuments.map((entry) => entry.documentId),
    whyUs: {
      heading: sectionHeading("We simplify Global Regulatory Compliance with Expert Solutions", {
        description:
          "At JR Compliance, we simplify regulatory requirements for businesses worldwide, leveraging our proven expertise. With a team of over 200 experts, we have successfully managed over 150 projects for over 20 national brands across various industries. Our dedication to compliance is reflected in our high success rate, ensuring seamless market access through our extensive network of international partners.",
      }),
      cards: [
        {
          title: "Instant Compliance Solutions",
          description: "Clear guidance from the first requirement through approval.",
          image: whyUsImages[0],
        },
        {
          title: "Guaranteed Global Support",
          description: "Connected support across markets and regulatory systems.",
          image: whyUsImages[1],
        },
        {
          title: "Trusted Corporate Services",
          description: "Structured services that help businesses move with confidence.",
          image: whyUsImages[2],
        },
      ],
    },
    regulatorsHeading: sectionHeading("Trusted compliance network", {
      eyebrow: "Regulatory expertise",
      description: "Focused support across key compliance pathways.",
    }),
    regulatorLogos: regulators.map((entry) => entry.documentId),
    story: {
      heading: sectionHeading("Where Data Tells the Story", {
        eyebrow: "From Every Corner to Every Regulation",
      }),
      stats: [
        { value: 1000, suffix: "+", label: "Happy Clients", sortOrder: 0 },
        { value: 360, suffix: "", label: "Compliance Services", sortOrder: 1 },
        { value: 13, suffix: "+", label: "Years of Industry Experience", sortOrder: 2 },
      ],
      featureImage: homeHeroImage,
      featureTitle: "A connected route to compliance",
      cta: sameTab("Discover How We Became the Leading Compliance Experts", "/about-us"),
    },
    tickerCta: {
      title: "Let's Talk Compliance",
      description: "Connect with the JR Compliance team.",
      cta: sameTab("Contact Us", "/contact-us"),
    },
    testimonialsHeading: sectionHeading("Creating Trust-Driven Relationships", {
      eyebrow: "Client stories",
    }),
    testimonials: testimonialDocuments.map((entry) => entry.documentId),
    recognitionHeading: sectionHeading("Earning Trust, Backed By Recognition", {
      eyebrow: "Media",
      description: "Based on 10,000+ customer reviews",
    }),
    recognitions: recognitionDocuments.map((entry) => entry.documentId),
    faqHeading: sectionHeading("FAQ", {
      eyebrow: "Need clarity?",
      description: "Find answers from the JR Compliance team.",
    }),
    faqCategories: faqCategoryDocuments.map((entry) => entry.documentId),
    finalCta: {
      title: "Take the Next Step Towards Success",
      description:
        "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
      cta: sameTab("Contact Us", "/contact-us"),
    },
    seo: {
      metaTitle: "JR Compliance | Global Compliance Consultants",
      metaDescription: "Global compliance, certification, and corporate services from JR Compliance.",
      shareImage: homeHeroImage,
      noIndex: false,
    },
  });

  const aboutHeroImage = await mediaId("about/team-hero.webp", "JR Compliance team");
  await createPublished(strapi, CONTENT_TYPES.aboutPage, {
    hero: {
      eyebrow: "About JR Compliance",
      title: "Your #1 Partner for 360° Compliance Solutions",
      description:
        "As the number one choice for compliance, we've partnered with 1,000+ leading brands and delivered over a decade of exceptional service.",
      cta: sameTab("Meet our team", "#team"),
      image: aboutHeroImage,
    },
    overview: {
      title: "A trusted route through every requirement",
      description:
        "Our work brings clear thinking, practical support, and a connected compliance network to businesses at every stage.",
      stats: [
        { value: "13+", label: "Years — over a decade of expertise" },
        { value: "100+", label: "Holistic business solutions" },
        { value: "4.8", label: "Stars from 10,000+ customers globally" },
      ],
    },
    mantra: {
      eyebrow: "Our Mantra",
      title: "Compliance made accessible, clear, and dependable.",
      description:
        "Our mission is to offer comprehensive technical compliance certifications that are easily accessible with just a click. We strive to provide these services at an affordable cost, ensuring high-quality standards while simplifying the certification process for businesses of all sizes.",
      items: [
        {
          title: "Global Reach",
          description: "We made our mission possible to make our services accessible to reach clients on a global level.",
          image: await mediaId("about/mantra/global.webp", "Global Reach"),
        },
        {
          title: "Tailored Industry Solutions",
          description: "We at JR Compliance believe in providing a personalised approach addressing each client's unique challenges.",
          image: await mediaId("about/mantra/tailored.webp", "Tailored Industry Solutions"),
        },
        {
          title: "Time-Efficient",
          description: "Adhering to multiple compliance regulations is very time-consuming; we reduce this time by simplifying the process.",
          image: await mediaId("about/mantra/time-efficient.webp", "Time-Efficient"),
        },
        {
          title: "Comprehensive Services",
          description: "We offer end-to-end solutions, modified according to your needs.",
          image: await mediaId("about/mantra/comprehensive.webp", "Comprehensive Services"),
        },
        {
          title: "Commitment to Innovation",
          description:
            "We embrace ever-evolving technology and adapt to it, staying ahead of regulatory changes to make the process seamless.",
          image: await mediaId("about/mantra/innovation.webp", "Commitment to Innovation"),
        },
      ],
    },
    storyHeading: sectionHeading("Our path to compliance", { eyebrow: "Our Story" }),
    timelineEvents: timelineDocuments.map((entry) => entry.documentId),
    whyPartner: {
      eyebrow: "Why partner with us?",
      title: "Expert guidance, accountable delivery.",
      items: [
        {
          title: "Expertise and Experience",
          description: "With over 15 years in regulatory compliance, JR Compliance's experts provide industry-leading solutions.",
        },
        {
          title: "Proven Track Record",
          description:
            "JR Compliance has successfully guided 500+ clients through complex regulatory landscapes, ensuring 98% compliance and client satisfaction.",
        },
        {
          title: "Customized Approach",
          description:
            "We offer personalized compliance strategies, adapting to industry specifics and client requirements, leading to a 95% success rate.",
        },
        {
          title: "Transparent Communication",
          description:
            "JR Compliance ensures clear, open dialogue throughout the process, with 100% client satisfaction in understanding and support.",
        },
      ],
    },
    pioneers: {
      eyebrow: "Our Pioneers of Compliance",
      title: "Leading by example, building confidence together.",
      description:
        "Our founding members have led by example, guiding all Compliance Sarathis and setting high standards in compliance and certification, ensuring excellence across our services and industry leadership.",
      stats: [
        { value: "2013", label: "Founded" },
        { value: "20+", label: "National brands" },
        { value: "100+", label: "New projects" },
      ],
    },
    teamHeading: sectionHeading("Our compliance Sarathis.", {
      eyebrow: "Meet JRians",
      description: "Our team of experts is always ready to guide you on your path to compliance.",
    }),
    teamFeatureImage: aboutHeroImage,
    teamCta: sameTab("Talk to our team", "/contact-us"),
    teamMembers: teamDocuments.map((entry) => entry.documentId),
    achievementsHeading: sectionHeading("Progress measured in trusted outcomes.", {
      eyebrow: "Achievements and Awards",
    }),
    achievements: achievementDocuments.map((entry) => entry.documentId),
    finalCta: {
      title: "Take the next step toward success",
      description:
        "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
      cta: sameTab("Contact Us", "/contact-us"),
    },
    seo: {
      metaTitle: "About Us | JR Compliance",
      metaDescription:
        "Since 2013, JR Compliance has been providing 360-degree compliance services to startups, firms and establishments with the motive to make compliance services unchallenging for everyone.",
      shareImage: aboutHeroImage,
      noIndex: false,
    },
  });

  await createPublished(strapi, CONTENT_TYPES.careersPage, {
    hero: {
      eyebrow: "Careers at JR Compliance",
      title: "Join us and be a part of our compliance legacy",
      description:
        "Bring your curiosity, ownership, and expertise to a team making regulatory compliance clearer for businesses everywhere.",
      cta: sameTab("View current openings", "#current-openings"),
    },
    purpose: {
      eyebrow: "Our purpose",
      title: "Explore the driving force of our company.",
      vision:
        "Our vision is to be the most trusted compliance partner, fostering a culture of trust, efficiency, transparency, and growth while simplifying regulatory approvals and certification processes for businesses globally.",
      mission:
        "Our mission is to streamline and simplify compliance for businesses of all sizes, by providing expert consultancy, end-to-end certification support, and seamless regulatory solutions. Accuracy, efficiency, and exact legal standards are what we strive for, enabling businesses to run confidently and credibly.",
    },
    values: {
      heading: sectionHeading("The standards we bring to work, every day.", { eyebrow: "Values" }),
      items: [
        {
          title: "Integrity and Transparency",
          description: "We maintain the highest ethical standards to secure honesty and clarity in every compliance process.",
        },
        {
          title: "Client-Centric Approach",
          description: "Our client's need is the priority to provide personalized solutions hassle-free.",
        },
        {
          title: "Accuracy and Reliability",
          description:
            "Compliance being our expertise, we ensure accurate documentation and seamless navigation through the regulatory landscape.",
        },
        {
          title: "Accountability and Excellence",
          description:
            "We take responsibility for delivering quality results, ensuring businesses achieve compliance with ease.",
        },
      ],
    },
    lifeAtJr: {
      heading: sectionHeading("Learn, Grow and Succeed.", { eyebrow: "Life at JR Compliance" }),
      description: "",
      highlights: [],
    },
    careerGallery: galleryDocuments.map((entry) => entry.documentId),
    openingsHeading: sectionHeading("Find the role where you can make a difference.", {
      eyebrow: "Current Openings",
      description:
        "Explore the open roles below, then contact our team to express your interest in the position that fits you.",
    }),
    careerOpenings: openingDocuments.map((entry) => entry.documentId),
    benefits: {
      heading: sectionHeading("A culture designed to support your best work.", {
        eyebrow: "Employee benefits",
      }),
      items: [
        {
          title: "Performance-Based Rewards",
          description:
            "Hard work never goes unnoticed at JR Compliance! We offer competitive salaries, incentives, and recognition programs to appreciate your contributions.",
        },
        {
          title: "Collaborative & Inclusive Culture",
          description:
            "Join a team-driven and innovation-focused workplace where your ideas are valued and collaboration leads to success.",
        },
        {
          title: "Flexible Working Hours",
          description:
            "We understand the importance of work-life balance. Our flexible working hours allow employees to manage their schedules efficiently while ensuring productivity and personal well-being.",
        },
        {
          title: "Women's Safety & Inclusive Workplace",
          description:
            "At JR Compliance, we are committed to fostering a safe, respectful, and inclusive work environment for women. We have strict anti-harassment policies, POSH compliance, secure office premises, and supportive grievance redressal mechanisms to ensure a workplace where every woman feels safe, valued, and empowered to thrive.",
        },
      ],
    },
    testimonialsHeading: sectionHeading("A team that grows together.", {
      eyebrow: "Employee Testimonials",
    }),
    careerTestimonials: careerTestimonialDocuments.map((entry) => entry.documentId),
    faqHeading: sectionHeading("Questions about joining JR Compliance.", { eyebrow: "FAQ" }),
    careerFaqs: careerFaqDocuments.map((entry) => entry.documentId),
    finalCta: {
      title: "Take the Next Step Towards Success",
      description:
        "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
      cta: sameTab("Contact Us", "/contact-us"),
    },
    seo: {
      metaTitle: "Work with the best compliance consultants | JR Compliance",
      metaDescription:
        "Join JR Compliance and help businesses move through compliance with confidence, accuracy, and care.",
      noIndex: false,
    },
  });

  await createPublished(strapi, CONTENT_TYPES.contactPage, {
    hero: {
      eyebrow: "Contact JR Compliance",
      title: "Let's Ensure Your Compliance Together",
      description:
        "Tell us where you are in the compliance process and connect directly with the JR Compliance team.",
    },
    contactPoints: [
      {
        label: "Call us",
        value: "1800-121-410-410",
        href: "tel:1800121410410",
        detail: "Speak with a compliance expert.",
        icon: await mediaId("contact/phone.svg", "Phone"),
      },
      {
        label: "Email us",
        value: "support@jrcompliance.com",
        href: "mailto:support@jrcompliance.com",
        detail: "Share the details of your requirement.",
        icon: await mediaId("contact/email.svg", "Email"),
      },
      {
        label: "Visit us",
        value: "K-8, Bawana Industrial Area, Sector 3, Bawana",
        href: "https://www.google.com/maps/search/?api=1&query=K-8%2C%20Bawana%20Industrial%20Area%2C%20Sector%203%2C%20Bawana",
        detail: "JR Compliance, Delhi, India.",
        icon: await mediaId("contact/location.svg", "Location"),
      },
    ],
    enquiry: {
      eyebrow: "Start a conversation",
      title: "A direct route to the right compliance support.",
      description:
        "For a detailed requirement, contact our team by phone or email and we will guide you to the appropriate specialist.",
      topics: ["Technical approvals", "Corporate services", "Global compliance"].map((text) => ({ text })),
      directCta: sameTab("Email our team", "mailto:support@jrcompliance.com"),
      formNote:
        "A secure request form will be connected after the approved submission, consent, and spam-protection workflow is in place.",
    },
    response: {
      eyebrow: "Connect with confidence",
      title: "Choose the channel that works for you.",
      steps: [
        { title: "Call", description: "Talk through your compliance requirement with our team." },
        { title: "Email", description: "Send the details, documents, or questions you want to discuss." },
        { title: "Visit", description: "Meet the team at our Bawana Industrial Area office." },
      ],
    },
    finalCta: {
      title: "Take the Next Step Towards Success",
      description:
        "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
      cta: sameTab("Contact the team", "mailto:support@jrcompliance.com"),
    },
    seo: {
      metaTitle: "Contact Us | JR Compliance",
      metaDescription:
        "Our mantra is to provide technical compliance certifications with click access and at a reasonable cost.",
      noIndex: false,
    },
  });

  await createPublished(strapi, CONTENT_TYPES.siteSetting, {
    ...initialSite,
    headerLogo: await mediaId("jr-logo.svg", "JR Compliance logo"),
    footerLogo: await mediaId("jr-footer-logo.svg", "JR Compliance footer logo"),
    defaultSeo: {
      ...initialSite.defaultSeo,
      shareImage: homeHeroImage,
    },
  });

    strapi.log.info("JR CMS seed completed. All current pages and shared chrome are published.");
  });
}
