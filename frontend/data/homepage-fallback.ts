import type { HomepageContent } from "@/lib/types";

const navigationCategory = (title: string, links: readonly (readonly [string, string])[]) => ({
  title,
  links: links.map(([label, href]) => ({ label, href })),
});

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
    loginButton: { enabled: false, label: "Login" },
    headerCta: { label: "Contact Us", href: "/contact-us" },
    footerCta: { label: "Contact Us", href: "/contact-us" },
    phone: "+91-1800-121-410-410",
    phoneHref: "tel:1800121410410",
    email: "support@jrcompliance.com",
    footerTagline: "Your trusted partner for the latest regulatory updates.",
    copyrightText: "Copyright © JR Compliance",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms and Conditions", href: "/terms-and-conditions" },
      { label: "Purchase and Billing", href: "/purchase-and-billing" },
    ],
    leadForm: {
      enabled: true,
      heading: "Get Expert Consultation",
      subtitle: "Free quote in 2 minutes",
      nameLabel: "Full Name",
      namePlaceholder: "Full Name",
      emailLabel: "Email Address",
      emailPlaceholder: "Email Address",
      phoneLabel: "Mobile Number",
      phonePlaceholder: "Mobile Number",
      messageLabel: "Tell us about your requirements",
      messagePlaceholder: "Tell us about your requirements...",
      consentText: "I agree to be contacted about my enquiry and accept the",
      privacyLink: {
        label: "Privacy Policy",
        href: "/privacy-policy",
        target: "_self",
      },
      submitLabel: "Get Free Consultation",
      submittingLabel: "Sending your request...",
      successTitle: "Thank you",
      successMessage: "Your request has been received. Redirecting you now...",
      redirectPath: "/thank-you",
      secureLabel: "Secure",
      durationLabel: "2 min",
      noSpamLabel: "No spam, ever",
      trustHeading: "Trusted & Recognized By",
      trustDescription: "Featured across reputed platforms",
      trustItems: [],
      experienceText: "15+ Years of Industry Experience",
    },
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
      href: "/#services",
      categories: [
        navigationCategory("Company Registration", [
          ["Sole Proprietorship", "/corporate/sole-proprietorship-registration"],
          ["Nidhi Company", "/corporate/nidhi-company-registration"],
          ["NGO Registration", "/corporate/ngo-registration"],
          ["Section 8 Company", "/corporate/section-8-company-registration"],
          ["Partnership Firm", "/corporate/partnership-firm-registration"],
          ["Producer Company", "/corporate/producer-company-registration"],
          ["Indian Subsidiary", "/corporate/indian-subsidiary"],
          ["Pvt Ltd Company", "/corporate/private-limited-company-registration-consultant"],
          ["Insurance Company", "/corporate/insurance-company-registration"],
          ["RBI Micro Finance Company", "/corporate/microfinance-company-registration"],
          ["One Person Company (OPC)", "/corporate/opc-registration"],
          ["Public Limited Company", "/corporate/public-limited-company-registration"],
          ["RBI NBFC Registration", "/corporate/nbfc-registration"],
          ["Limited Liability Partnership (LLP)", "/corporate/llp-registration"],
          ["RBI Asset Reconstruction Registration", "/corporate/asset-reconstruction-company-registration"],
          ["RBI Mutual Fund Company Registration", "/corporate/mutual-fund-company-registration"],
          ["Foreign Company Reg.", "/corporate/foreign-company-registration"],
          ["Trust Registration", "/corporate/trust-registration"],
          ["Society Registration", "/corporate/society-registration"],
        ]),
        navigationCategory("MCA Services", [
          ["DSC", "/corporate/dsc-certificate"], ["Organisation DSC", "/#services"], ["Addition of Director", "/#services"],
          ["Removal of Director", "/#services"], ["DIR 3 KYC", "/#services"], ["INC 20A", "/#services"],
          ["ADT -1", "/#services"], ["Co. Name Change", "/#services"], ["Alter in MOA/AOA", "/#services"],
          ["Change in Company Pan/Tan", "/#services"], ["Name Approval/RUN filing", "/#services"],
          ["Company Conversion", "/#services"], ["Increase Authorize/Paid Up Capital", "/#services"],
          ["Closure of a Company", "/#services"], ["ROC Change/Address Change", "/#services"],
          ["Share Transfer", "/#services"], ["Post Compliance", "/corporate/post-compliance"],
          ["ROC Compliance", "/#services"], ["Statutory Compliance", "/corporate/statutory-compliance"],
          ["Annual Compliance", "/#services"],
        ]),
        navigationCategory("Import Export Service", [
          ["IEC Code", "/corporate/iec-registration"], ["AD Code", "/#services"],
          ["ICE Gate Registration", "/#services"], ["Port Registration", "/#services"],
          ["APEDA/ RCMC Registration", "/#services"],
          ["Spice Board Registration", "/#services"],
          ["Coffee Board Registration", "/#services"],
          ["Tea Board Registration", "/#services"], ["Tobacco Board Registration", "/#services"],
        ]),
        navigationCategory("Government License & Certification", [
          ["Ayush License", "/corporate/ayush-license"], ["Trade License", "/#services"],
          ["NSIC Registration", "/#services"], ["RERA Registration", "/#services"],
          ["GEM Registration", "/#services"], ["Psara Registration", "/#services"],
          ["ISO (ALL TYPES)", "/#services"], ["GMP", "/#services"],
          ["HACCP", "/#services"],
        ]),
        navigationCategory("IPR Services", [
          ["TRADEMARK Registration", "/corporate/trademark-registration"], ["TM Search", "/#services"],
          ["TM Application Filing", "/#services"], ["Formality Check Fail", "/#services"],
          ["TM Modification", "/#services"], ["TM Objection", "/#services"], ["TM Hearing", "/#services"],
          ["TM Opposition", "/#services"], ["Trademark Evidence Filing", "/#services"],
          ["Trademark Renewal", "/#services"], ["Trademark Transfer", "/#services"], ["LPC", "/#services"],
          ["Copyright Registration", "/#services"], ["Copyright Objection", "/#services"],
          ["Design Registration", "/#services"], ["Patent Registration", "/#services"],
          ["Legal Agreement", "/#services"], ["Logo Designing", "/#services"],
        ]),
        navigationCategory("FSSAI", [
          ["Fssai Basic Registration", "/corporate/fssai-certificate"], ["Fssai State", "/#services"],
          ["Fssai Central", "/#services"], ["Fssai Modification", "/#services"],
          ["Fssai Renewal", "/#services"], ["Fssai Return", "/#services"], ["Water Report", "/#services"],
        ]),
        navigationCategory("SEBI Business Registration", [["Portfolio Manager Registration", "/corporate/portfolio-manager-registration"]]),
        navigationCategory("Tax and Accounting", [
          ["GST Registration", "/corporate/gst-registration"], ["GST Return", "/#services"], ["TDS Return", "/#services"],
          ["MSME Return (MSME Form-1)", "/#services"], ["ROC Return", "/#services"],
          ["Professional Tax Registration", "/#services"], ["Income Tax Return (ITR)", "/#services"],
          ["PAN Registration (Company)", "/#services"], ["PAN Registration (Individual)", "/#services"],
          ["Accounting", "/#services"], ["Tax Exemption Under 80IAC", "/#services"],
        ]),
        navigationCategory("Labour Compliance", [
          ["Shop & Establishment Registration", "/corporate/shop-and-establishment-act-registration"], ["ESIC Registration", "/#services"],
          ["EPF Registration", "/#services"], ["PF/ESI Return", "/#services"],
        ]),
        navigationCategory("Fund Raising", [
          ["MSME", "/corporate/msme-registration"], ["Startup India Registration", "/#services"],
          ["Seed Funding", "/#services"], ["Pitch Deck", "/#services"], ["CSR", "/#services"],
          ["NITI AYOG", "/#services"], ["FCRA Registration", "/#services"],
        ]),
      ],
    },
    {
      label: "Approval",
      href: "/#services",
      categories: [
        navigationCategory("Bureau of Indian Standards (BIS)", [
          ["ISI Certification", "/approval/isi-certificate"], ["FMCS Certification", "/#services"],
          ["CRS Certification", "/#services"], ["Scheme-X", "/#services"],
        ]),
        navigationCategory("Pollution Advisory", [
          ["Extended Producer's Responsibility (EPR)", "/approval/epr-certification"], ["EPR- E waste", "/#services"],
          ["EPR- Battery waste", "/#services"], ["EPR- Plastic waste", "/#services"],
          ["EPR- Tyre waste", "/#services"], ["EPR- Used oil waste", "/#services"],
          ["CPCB Guidelines", "/#services"], ["Delhi Pollution Control Committee", "/#services"],
          ["State Pollution Board / Pollution Control Committee", "/#services"],
        ]),
        navigationCategory("Telecommunication Engineering Centre (TEC)", [
          ["MTCTE", "/approval/wpc-certification"], ["Voluntary", "/#services"], ["Communication Security Certification Scheme (ComSec)", "/#services"],
        ]),
        navigationCategory("Wireless Planning and Coordination (WPC)", [
          ["ETA", "/approval/wpc-certification"], ["Dealer Possesion License (DPL)", "/approval/dealer-possession-license"],
          ["Non Dealer Possesion License (NDPL)", "/approval/non-dealer-possession-license"], ["Experimental License", "/#services"],
          ["VHF", "/#services"], ["UHF", "/#services"], ["Demo License", "/#services"],
        ]),
        navigationCategory("Bureau of Energy Efficiency (BEE)", [
          ["Star Labeling", "/approval/wpc-certification"], ["Energy Conservation Building Code (ECBC)", "/#services"],
        ]),
        navigationCategory("CDSCO Registration", [
          ["MDR CDSCO Registration", "/approval/cdsco-registration/drug-cdsco-registration"], ["Form MD-15 (Import License)", "/#services"],
          ["Form MD-5 (Manufacturing License)", "/#services"], ["Form MD-9 (Manufacturing License)", "/#services"],
          ["Form MD-42 (Sell, Stock, Exhibit)", "/#services"], ["Form MD-6 (Loan License)", "/#services"],
          ["Form MD-10 (Loan License)", "/#services"], ["Cosmetic CDSCO Registration", "/approval/cdsco-registration/cosmetic-cdsco-registration"],
          ["COS-2 (Cosmetic Import License)", "/#services"], ["COS-8 (Manufacturing License)", "/#services"],
          ["CDSCO In Vitro Diagnostics Registration", "/approval/cdsco-registration/in-vitro-diagnostics"],
          ["Drug CDSCO Registration", "/approval/cdsco-registration/drug-cdsco-registration"],
        ]),
        navigationCategory("AERB Approval", [
          ["Diagnostic X Ray Equipment", "/approval/aerb-license/aerb-diagnostic-x-ray-equipment"], ["NOC", "/#services"],
          ["Type Approval", "/#services"], ["License for Operations", "/#services"], ["Nominate RSO", "/#services"],
        ]),
        navigationCategory("LMPC Certification", [["Packaged Commodity Registration", "/approval/wpc-certification"], ["Model Approval", "/#services"]]),
        navigationCategory("STQC", [
          ["STQC Certification", "/#services"], ["ISO 27001 ISMS", "/stqc/iso-27001-isms"], ["ISO 9001 QMS", "/stqc/iso-9001-qms"],
          ["ISO 20000 ITSM", "/stqc/iso-20000-itsm"], ["S-Mark Product Safety", "/stqc/s-mark-product-safety"],
          ["Biometric Devices", "/stqc/biometric-device-certification"], ["Smart Card Certification", "/stqc/smart-card-certification"],
          ["Common Criteria (IC3S)", "/stqc/common-criteria-certification"], ["Website Quality Certification", "/stqc/website-quality-certification"],
          ["Software Certification", "/stqc/software-certification"], ["Software Testing & Assessment", "/stqc/software-testing-assessment"],
          ["Information Security Testing", "/stqc/information-security-testing"], ["e-Procurement (ePS)", "/stqc/e-procurement-certification"],
          ["QR Code Scanner", "/stqc/qr-code-scanner-certification"], ["IoT System Certification", "/stqc/iot-system-certification"],
          ["NCMC Certification", "/stqc/ncmc-certification"], ["Toll Management (TMS)", "/stqc/toll-management-certification"],
        ]),
      ],
    },
    {
      label: "Global",
      href: "/#services",
      categories: [
        navigationCategory("Asia", [
          ["India", "/approval/wpc-certification"], ["Bahrain", "/#services"], ["Brunei", "/#services"], ["Combodia", "/#services"],
          ["Hong Kong", "/#services"], ["Indonesia", "/#services"], ["Israel", "/#services"], ["Jorden", "/#services"],
          ["Kuwait", "/#services"], ["Lebanon", "/#services"], ["Macau", "/#services"], ["Malaysia", "/#services"],
          ["Nepal", "/#services"], ["Oman", "/#services"], ["Pakistan", "/#services"], ["Phillppines", "/#services"],
          ["Qatar", "/#services"], ["Saudi Arabia", "/#services"], ["Sri lanka", "/#services"], ["Singapore", "/#services"],
          ["Thailand", "/#services"], ["Vietnam", "/#services"], ["Yemen", "/#services"], ["UAE", "/#services"],
          ["China", "/#services"], ["Japan", "/#services"], ["Taiwan", "/#services"], ["Russia", "/#services"],
          ["South Korea", "/#services"], ["Bangladesh", "/#services"],
        ]),
        navigationCategory("Africa", [["Egypt", "/approval/wpc-certification"], ["Tanzania", "/#services"], ["Morocoo", "/#services"], ["Tunisia", "/#services"], ["South Africa", "/#services"]]),
        navigationCategory("North America", [["Barbados", "/approval/wpc-certification"], ["Costa Rica", "/#services"], ["Dominican Republic", "/#services"], ["USA", "/#services"], ["Canada", "/#services"]]),
        navigationCategory("South America", [["Chile", "/approval/wpc-certification"], ["Colombia", "/#services"], ["Ecuador", "/#services"], ["Peru", "/#services"], ["Venzuela", "/#services"], ["Mexico", "/#services"], ["Brazil", "/#services"], ["Argentina", "/#services"]]),
        navigationCategory("Australia", [["New Zealand", "/approval/wpc-certification"], ["Australia", "/#services"]]),
      ],
    },
    { label: "Careers", href: "/careers" },
    { label: "About Us", href: "/about-us" },
  ],
  seo: {
    title: "JR Compliance | Global Compliance Consultants",
    description:
      "Global compliance, certification, and corporate services from JR Compliance.",
  },
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
    eyebrow: "Why JR Compliance",
    title: "We simplify Global Regulatory Compliance with Expert Solutions",
    description:
      "At JR Compliance, we simplify regulatory requirements for businesses worldwide, leveraging our proven expertise. With a team of over 200 experts, we have successfully managed over 150 projects for over 20 national brands across various industries. Our dedication to compliance is reflected in our high success rate, ensuring seamless market access through our extensive network of international partners.",
    cards: [
      {
        title: "Instant Compliance Solutions",
        description: "Clear guidance from the first requirement through approval.",
        image: "/images/about/mantra/global.webp",
        imageAlt: "Global compliance support",
      },
      {
        title: "Guaranteed Global Support",
        description: "Connected support across markets and regulatory systems.",
        image: "/images/about/mantra/tailored.webp",
        imageAlt: "Tailored compliance support",
      },
      {
        title: "Trusted Corporate Services",
        description: "Structured services that help businesses move with confidence.",
        image: "/images/about/mantra/comprehensive.webp",
        imageAlt: "Corporate compliance support",
      },
    ],
  },
  regulators: {
    eyebrow: "Regulatory expertise",
    title: "Trusted compliance network",
    description: "Focused support across key compliance pathways.",
    logos: [
      { name: "BIS", src: "/images/services-blue/bis.svg" },
      { name: "EPR", src: "/images/services-blue/epr.svg" },
      { name: "TEC", src: "/images/services-blue/tec.svg" },
      { name: "WPC", src: "/images/services-blue/wpc.svg" },
      { name: "BEE", src: "/images/services-blue/bee.svg" },
    ],
  },
  metrics: {
    eyebrow: "From Every Corner to Every Regulation",
    title: "Where Data Tells the Story",
    featureImage: "/images/team.webp",
    featureImageAlt: "JR Compliance team members",
    featureTitle: "A connected route to compliance",
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
  tickerCta: {
    title: "Let's Talk Compliance",
    description: "Connect with the JR Compliance team.",
    cta: { label: "Contact Us", href: "/contact-us" },
  },
  testimonials: {
    eyebrow: "Client stories",
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
    eyebrow: "Media",
    title: "Earning Trust, Backed By Recognition",
    description: "Based on 10,000+ customer reviews",
    items: [
      {
        title: "JR Compliance: Revolutionizing Certification Processes with Innovative Solutions",
        summary:
          "JR Compliance provides easy access to global certification via a user-friendly platform.",
        linkLabel: "Read more",
        href: "#contact",
      },
      {
        title:
          "JR Compliance: Helping Local Manufacturers Thrive in the Face of COVID-19 Challenges",
        summary:
          "JR Compliance provides comprehensive compliance services to manufacturers to help them meet global standards.",
        linkLabel: "Read more",
        href: "#contact",
      },
      {
        title:
          "JR Compliance: Simplifying Global Compliance for Manufacturers Amidst Regulatory Changes.",
        summary:
          "JR Compliance provides manufacturers with knowledge in navigating complex compliance requirements.",
        linkLabel: "Read more",
        href: "#contact",
      },
    ],
  },
  faqs: {
    eyebrow: "Need clarity?",
    title: "FAQ",
    description: "Find answers from the JR Compliance team.",
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
