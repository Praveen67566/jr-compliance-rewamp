import type { HomepageContent } from "@/lib/types";

/**
 * Temporary local source of truth. It mirrors the fields documented in
 * cms/CONTENT_MODEL.md and is replaced at runtime when Strapi is configured.
 * Copy comes from the legacy site's visible index.html content only.
 */
export const fallbackHomepage: HomepageContent = {
  site: {
    name: "JR Compliance",
    logo: "/images/jr-logo.svg",
    footerLogo: "/images/jr-footer-logo.svg",
    phone: "+91-1800-121-410-410",
    phoneHref: "tel:1800121410410",
    email: "support@jrcompliance.com",
    footerTagline: "Your trusted partner for the latest regulatory updates.",
    legalLinks: [
      { label: "Privacy Policy", href: "#legal" },
      { label: "Terms and Conditions", href: "#legal" },
      { label: "Purchase and Billing", href: "#legal" },
    ],
    socialLinks: [
      {
        label: "LinkedIn",
        abbreviation: "in",
        href: "https://www.linkedin.com/company/jr-compliance-&-testing-labs/",
      },
      {
        label: "Facebook",
        abbreviation: "f",
        href: "https://www.facebook.com/jrcompliance",
      },
      { label: "X", abbreviation: "X", href: "https://x.com/JrCompliance" },
      {
        label: "YouTube",
        abbreviation: "▶",
        href: "https://www.youtube.com/@jrcompliance",
      },
    ],
  },
  navigation: [
    {
      label: "Corporate",
      href: "#services",
      children: [
        { label: "Company Registration", href: "#services" },
        { label: "MCA Services", href: "#services" },
        { label: "Import Export Service", href: "#services" },
        { label: "Government License & Certification", href: "#services" },
        { label: "IPR Services", href: "#services" },
      ],
    },
    {
      label: "Approval",
      href: "#services",
      children: [
        { label: "BIS", href: "#services" },
        { label: "Pollution Advisory", href: "#services" },
        { label: "TEC", href: "#services" },
        { label: "WPC", href: "#services" },
        { label: "CDSCO", href: "#services" },
      ],
    },
    {
      label: "Global",
      href: "#services",
      children: [
        { label: "Asia", href: "#services" },
        { label: "Africa", href: "#services" },
        { label: "North America", href: "#services" },
        { label: "South America", href: "#services" },
        { label: "Australia", href: "#services" },
      ],
    },
    { label: "Careers", href: "#contact" },
    { label: "About Us", href: "#about" },
  ],
  hero: {
    prefix: "Bridging",
    rotatingWords: ["Businesses", "Companies", "Manufacturers", "Brands"],
    suffix: "to Worldwide Standards",
    description:
      "Trusted by 1,000+ leading global brands, our award-winning consultants empower businesses with unwavering compliance and certification services, backed by comprehensive expertise and a professional team.",
    primaryCta: { label: "Connect With Us", href: "#contact" },
    image: "/images/team.webp",
    imageAlt: "JR Compliance team members",
    supportingCards: [
      { title: "Business Registration" },
      { title: "Compliance Consultants", description: "Get Certified!" },
      { title: "Global Reach", description: "An extensive network of partners across 20+ countries" },
    ],
  },
  trustedLogos: [
    { name: "Tata Play", src: "/images/tata-play.svg" },
    { name: "Newline", src: "/images/newline.svg" },
    { name: "Lipi", src: "/images/lipi.webp" },
    { name: "Toray", src: "/images/toray.svg" },
    { name: "Sony", src: "/images/sony.svg" },
    { name: "Sennheiser", src: "/images/sennheiser.svg" },
    { name: "Healthify", src: "/images/healthify.svg" },
    { name: "Kaon", src: "/images/kaon.svg" },
    { name: "Halton", src: "/images/halton.svg" },
    { name: "Lenovo", src: "/images/lenovo.svg" },
  ],
  services: {
    eyebrow: "Our Service Stack",
    title: "From Every Corner to Every Regulation",
    categories: [
      {
        id: "technical",
        title: "Technical",
        services: [
          {
            label: "Bureau of Indian Standards (BIS)",
            href: "#contact",
            shortLabel: "BIS",
            icon: "/images/services-blue/bis.svg",
          },
          {
            label: "EPR Pollution Advisory",
            href: "#contact",
            shortLabel: "EPR",
            icon: "/images/services-blue/epr.svg",
          },
          {
            label: "Telecommunication Engineering Centre (TEC)",
            href: "#contact",
            shortLabel: "TEC",
            icon: "/images/services-blue/tec.svg",
          },
          {
            label: "Wireless Planning and Coordination (WPC)",
            href: "#contact",
            shortLabel: "WPC",
            icon: "/images/services-blue/wpc.svg",
          },
          {
            label: "Bureau of Energy Efficiency (BEE)",
            href: "#contact",
            shortLabel: "BEE",
            icon: "/images/services-blue/bee.svg",
          },
        ],
      },
      {
        id: "corporate",
        title: "Corporate",
        services: [
          {
            label: "Company Registration",
            href: "#contact",
            shortLabel: "CO",
            icon: "/images/services-blue/company-registration.svg",
          },
          {
            label: "Government License Registration",
            href: "#contact",
            shortLabel: "GL",
            icon: "/images/services-blue/government-license.svg",
          },
          {
            label: "Trademark Copyright Registration",
            href: "#contact",
            shortLabel: "TM",
            icon: "/images/services-blue/trademark.svg",
          },
          {
            label: "NGO IPR",
            href: "#contact",
            shortLabel: "NG",
            icon: "/images/services-blue/ngo.svg",
          },
          {
            label: "SEBI Business Registration",
            href: "#contact",
            shortLabel: "SE",
            icon: "/images/services-blue/sebi.svg",
          },
        ],
      },
      {
        id: "global",
        title: "Global",
        services: [
          {
            label: "Japan",
            href: "#contact",
            shortLabel: "JP",
            icon: "/images/services-blue/japan.svg",
          },
          {
            label: "United States",
            href: "#contact",
            shortLabel: "US",
            icon: "/images/services-blue/united-states.svg",
          },
          {
            label: "Africa",
            href: "#contact",
            shortLabel: "AF",
            icon: "/images/services-blue/africa.svg",
          },
          {
            label: "Argentina",
            href: "#contact",
            shortLabel: "AR",
            icon: "/images/services-blue/argentina.svg",
          },
          {
            label: "Brazil",
            href: "#contact",
            shortLabel: "BR",
            icon: "/images/services-blue/brazil.svg",
          },
        ],
      },
    ],
  },
  whyUs: {
    title: "We simplify Global Regulatory Compliance with Expert Solutions",
    description:
      "At JR Compliance, we simplify regulatory requirements for businesses worldwide, leveraging our proven expertise. With a team of over 200 experts, we have successfully managed over 150 projects for over 20 national brands across various industries. Our dedication to compliance is reflected in our high success rate, ensuring seamless market access through our extensive network of international partners.",
    highlights: [
      "Instant Compliance Solutions",
      "Guaranteed Global Support",
      "Trusted Corporate Services",
    ],
  },
  metrics: {
    eyebrow: "From Every Corner to Every Regulation",
    title: "Where Data Tells the Story",
    items: [
      { value: "1,000+", label: "Happy Clients" },
      { value: "360", label: "Compliance Services" },
      { value: "13+", label: "Years of Industry Experience" },
    ],
    cta: {
      label: "Discover How We Became the Leading Compliance Experts",
      href: "#about",
    },
  },
  testimonials: {
    title: "Creating Trust-Driven Relationships",
    items: [
      {
        quote:
          "We have worked with JR Compliance for 2 years and with their help, we get the BIS license successfully. They always give us very good service and we really appreciate that.",
        name: "Kate Tran",
        company: "ISC",
        publishedOn: "Published on 4 March 2024",
      },
      {
        quote:
          "We have outsourced the entire BIS certification responsibility of our panels to JR Compliance since 2017 and their service so far has been exemplary.",
        name: "P N Dhawanjewar",
        company: "Lipi",
        publishedOn: "Published on 4 March 2024",
      },
      {
        quote:
          "We have been using JR Compliance services since last 3 years on various BIS related registration testing of our various IT electronic products. We really appreciate your full-fledged excellent support in all respect in this matter.",
        name: "Kate Tran",
        company: "Newline",
        publishedOn: "Published on 4 March 2024",
      },
      {
        quote:
          "Extremely professional company and very prompt service. I am associated with them from last 4 to 5 years. They have never disappointed us in service. Please continue to give this professional service.",
        name: "Atish Bihani",
        company: "JR Compliance client",
        publishedOn: "Published on 4 March 2024",
      },
    ],
  },
  recognitions: {
    title: "Earning Trust, Backed By Recognition",
    description: "Based on 10,000+ customer reviews",
    items: [
      {
        title: "JR Compliance: Revolutionizing Certification Processes with Innovative Solutions",
        summary:
          "JR Compliance provides easy access to global certification via a user-friendly platform.",
        href: "#contact",
      },
      {
        title:
          "JR Compliance: Helping Local Manufacturers Thrive in the Face of COVID-19 Challenges",
        summary:
          "JR Compliance provides comprehensive compliance services to manufacturers to help them meet global standards.",
        href: "#contact",
      },
      {
        title:
          "JR Compliance: Simplifying Global Compliance for Manufacturers Amidst Regulatory Changes.",
        summary:
          "JR Compliance provides manufacturers with knowledge in navigating complex compliance requirements.",
        href: "#contact",
      },
    ],
  },
  faqs: {
    title: "FAQ",
    categories: [
      {
        id: "registration",
        title: "Registration",
        items: [
          {
            question: "What documents are required for business registration?",
            answer:
              "Required documents typically include identity and address proofs for business owners or directors, Articles of Incorporation, registered office address, PAN/TAN (for India), and relevant licenses or permits depending on the business type.",
          },
          {
            question: "How long does the business registration process take?",
            answer:
              "The process duration varies by country and entity type. Sole proprietorships and partnerships take about 5–10 business days. Private limited companies and corporations usually take 10–20 business days, depending on document accuracy and authority processing speed.",
          },
          {
            question: "What are the different types of business entities I can register?",
            answer:
              "Common types include Sole Proprietorship, Partnership, Limited Liability Partnership (LLP), Private Limited Company, and Public Limited Company. Each structure differs in ownership, liability, and regulatory requirements.",
          },
          {
            question: "Do I need to renew my business registration?",
            answer:
              "Yes, business registrations often require annual or biennial renewal, depending on jurisdiction. Failing to renew can lead to penalties or dissolution.",
          },
          {
            question: "Can I change my business structure after registration?",
            answer:
              "Yes, business structure changes are possible but involve legal steps like re-registration and compliance with new regulations. Consult a legal expert for guidance.",
          },
        ],
      },
      {
        id: "compliance",
        title: "Compliance",
        items: [
          {
            question: "What is a compliance certification?",
            answer:
              "A compliance certification confirms that a product, service, or organization meets industry-specific standards, regulations, or guidelines established by regulatory authorities.",
          },
          {
            question: "Why do I need a compliance certification?",
            answer:
              "Compliance certifications are mandatory for legal market access, building customer trust, and ensuring your product meets safety and quality standards.",
          },
          {
            question: "How long does the certification process take?",
            answer:
              "The certification process typically takes between 4 and 12 weeks, depending on the product's complexity and the regulatory body involved.",
          },
          {
            question: "Which industries require compliance certifications?",
            answer:
              "Industries such as electronics, medical devices, automotive, telecommunications, and consumer products require compliance certifications to meet regulatory standards.",
          },
          {
            question: "What documents are needed for compliance certification?",
            answer:
              "Required documents typically include identity and address proofs for business owners or directors, Articles of Incorporation, registered office address, PAN/TAN (for India), and relevant licenses or permits depending on the business type.",
          },
        ],
      },
      {
        id: "tax-audits",
        title: "Tax & Audits",
        items: [
          {
            question: "What is tax compliance?",
            answer:
              "Tax compliance ensures that businesses adhere to tax laws and regulations, including accurate reporting and timely payment of taxes.",
          },
          {
            question: "How can I prepare for an audit?",
            answer:
              "Gather all relevant financial records, ensure proper documentation, and review compliance with tax regulations to be audit-ready.",
          },
          {
            question: "What are the common tax audit triggers?",
            answer:
              "High deductions, discrepancies between reported income and bank statements, and large cash transactions can trigger tax audits.",
          },
          {
            question: "What should I do if I receive an audit notice?",
            answer:
              "Respond promptly, review the notice carefully, gather necessary documents, and consult a tax professional for guidance.",
          },
          {
            question: "How can JR Compliance help with tax issues?",
            answer:
              "JR Compliance offers expert advice on tax regulations, audit preparation, and resolution, ensuring your business stays compliant and reduces audit risks.",
          },
        ],
      },
    ],
  },
  closingCta: {
    title: "Take the Next Step Towards Success",
    description:
      "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
    cta: { label: "Contact Us", href: "#contact" },
  },
  footer: {
    featuredLinks: [
      { label: "BIS FMCS", href: "#services" },
      { label: "BIS CRS", href: "#services" },
      { label: "WPC ETA Approval", href: "#services" },
      { label: "CDSCO License", href: "#services" },
      { label: "EPR Registration", href: "#services" },
      { label: "Company Registration", href: "#services" },
      { label: "Trademark", href: "#services" },
      { label: "Blogs", href: "https://blogs.jrcompliance.com/" },
    ],
    popularServices: [
      { label: "BIS Registration", href: "#services" },
      { label: "WPC ETA Approval", href: "#services" },
      { label: "CPCB Registration", href: "#services" },
      { label: "CDSCO", href: "#services" },
      { label: "FSSAI", href: "#services" },
      { label: "ISI Mark", href: "#services" },
      { label: "FMCS Certification", href: "#services" },
      { label: "CRS Certification", href: "#services" },
      { label: "EPR Registration", href: "#services" },
      { label: "TEC Approval", href: "#services" },
      { label: "Startup India", href: "#services" },
      { label: "Trademark Registration", href: "#services" },
    ],
    disclaimer: [
      "All to whom it may concern, JR Compliance is not liable for any direct, indirect, incidental, special, or consequential damages from the use of any information contained on our website, or from any action or decision taken as a result of using the site.",
      "The information provided on this website is with the sole intention to give information, not a professional opinion.",
      "We do not promote or provide any government-issued documents. We are a private compliance consultancy firm offering professional guidance and support to business owners in obtaining the relevant certifications from the respective government authorities.",
    ],
  },
};
