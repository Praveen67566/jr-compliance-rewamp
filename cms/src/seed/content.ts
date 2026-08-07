/**
 * Approved starter content normalized from the four typed Next.js fallbacks.
 * It intentionally contains editorial data only: no Webflow classes, styles,
 * animation IDs, or `site/assets` URLs are carried into Strapi.
 */

export type SeedLink = {
  label: string;
  href: string;
  target: "same_tab" | "new_tab";
};

export const sameTab = (label: string, href: string): SeedLink => ({
  label,
  href,
  target: "same_tab",
});

export const newTab = (label: string, href: string): SeedLink => ({
  label,
  href,
  target: "new_tab",
});

export const sectionHeading = (
  title: string,
  options: { eyebrow?: string; description?: string; alignment?: "left" | "center" } = {},
) => ({
  ...(options.eyebrow ? { eyebrow: options.eyebrow } : {}),
  titleBefore: title,
  titleHighlight: "",
  titleAfter: "",
  ...(options.description ? { description: options.description } : {}),
  alignment: options.alignment ?? "left",
});

export const blocks = (body: string) => [
  {
    type: "paragraph",
    children: [{ type: "text", text: body }],
  },
];

export const initialSite = {
  siteName: "JR Compliance",
  headerMenu: [
    {
      label: "Corporate",
      href: "#services",
      children: [
        sameTab("Company Registration", "#services"),
        sameTab("MCA Services", "#services"),
        sameTab("Import Export Service", "#services"),
        sameTab("Government License & Certification", "#services"),
        sameTab("IPR Services", "#services"),
      ],
    },
    {
      label: "Approval",
      href: "#services",
      children: [
        sameTab("BIS", "#services"),
        sameTab("Pollution Advisory", "#services"),
        sameTab("TEC", "#services"),
        sameTab("WPC", "#services"),
        sameTab("CDSCO", "#services"),
      ],
    },
    {
      label: "Global",
      href: "#services",
      children: [
        sameTab("Asia", "#services"),
        sameTab("Africa", "#services"),
        sameTab("North America", "#services"),
        sameTab("South America", "#services"),
        sameTab("Australia", "#services"),
      ],
    },
    { label: "Careers", href: "/careers" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  headerCta: sameTab("Contact Us", "/contact-us"),
  footerTagline: "Your trusted partner for the latest regulatory updates.",
  footerCta: sameTab("Contact Us", "/contact-us"),
  footerLinkGroups: [
    {
      title: "Featured services",
      links: [
        sameTab("BIS FMCS", "#services"),
        sameTab("BIS CRS", "#services"),
        sameTab("WPC ETA Approval", "#services"),
        sameTab("CDSCO License", "#services"),
        sameTab("EPR Registration", "#services"),
        sameTab("Company Registration", "#services"),
        sameTab("Trademark", "#services"),
        newTab("Blogs", "https://blogs.jrcompliance.com/"),
      ],
    },
    {
      title: "Popular Services",
      links: [
        sameTab("BIS Registration", "#services"),
        sameTab("WPC ETA Approval", "#services"),
        sameTab("CPCB Registration", "#services"),
        sameTab("CDSCO", "#services"),
        sameTab("FSSAI", "#services"),
        sameTab("ISI Mark", "#services"),
        sameTab("FMCS Certification", "#services"),
        sameTab("CRS Certification", "#services"),
        sameTab("EPR Registration", "#services"),
        sameTab("TEC Approval", "#services"),
        sameTab("Startup India", "#services"),
        sameTab("Trademark Registration", "#services"),
      ],
    },
  ],
  contact: {
    phoneDisplay: "+91-1800-121-410-410",
    phoneE164: "+911800121410410",
    email: "support@jrcompliance.com",
    whatsAppUrl: "https://api.whatsapp.com/send?phone=919266450125&text=Hello",
  },
  legalLinks: [
    sameTab("Privacy Policy", "#legal"),
    sameTab("Terms and Conditions", "#legal"),
    sameTab("Purchase and Billing", "#legal"),
  ],
  legalNotices: [
    {
      title: "Disclaimer",
      body: blocks(
        "All to whom it may concern, JR Compliance is not liable for any direct, indirect, incidental, special, or consequential damages from the use of any information contained on our website, or from any action or decision taken as a result of using the site.",
      ),
    },
    {
      title: "Disclaimer",
      body: blocks(
        "The information provided on this website is with the sole intention to give information, not a professional opinion.",
      ),
    },
    {
      title: "Disclaimer",
      body: blocks(
        "We do not promote or provide any government-issued documents. We are a private compliance consultancy firm offering professional guidance and support to business owners in obtaining the relevant certifications from the respective government authorities.",
      ),
    },
    {
      title: "Intellectual Property",
      body: blocks(
        "This site is our proprietary intellectual property. All the graphics, media, editorial content, and website design used are the intellectual property of JR Compliance and are protected by applicable intellectual property laws.",
      ),
    },
  ],
  socialLinks: [
    { network: "linkedin", url: "https://www.linkedin.com/company/jr-compliance-&-testing-labs/" },
    { network: "facebook", url: "https://www.facebook.com/jrcompliance" },
    { network: "x", url: "https://x.com/JrCompliance" },
    { network: "youtube", url: "https://www.youtube.com/@jrcompliance" },
  ],
  copyrightText: "Copyright © JR Compliance",
  defaultSeo: {
    metaTitle: "JR Compliance | Global Compliance Consultants",
    metaDescription: "Global compliance, certification, and corporate services from JR Compliance.",
    noIndex: false,
  },
};

export const serviceCategories = [
  {
    name: "Technical",
    slug: "technical",
    description: "Technical compliance, certification, and market-access services.",
    sortOrder: 0,
    services: [
      ["Bureau of Indian Standards (BIS)", "bureau-of-indian-standards-bis", "services-blue/bis.svg"],
      ["EPR Pollution Advisory", "epr-pollution-advisory", "services-blue/epr.svg"],
      ["Telecommunication Engineering Centre (TEC)", "telecommunication-engineering-centre-tec", "services-blue/tec.svg"],
      ["Wireless Planning and Coordination (WPC)", "wireless-planning-and-coordination-wpc", "services-blue/wpc.svg"],
      ["Bureau of Energy Efficiency (BEE)", "bureau-of-energy-efficiency-bee", "services-blue/bee.svg"],
    ],
  },
  {
    name: "Corporate",
    slug: "corporate",
    description: "Corporate registrations, licensing, and business advisory services.",
    sortOrder: 1,
    services: [
      ["Company Registration", "company-registration", "services-blue/company-registration.svg"],
      ["Government License Registration", "government-license-registration", "services-blue/government-license.svg"],
      ["Trademark Copyright Registration", "trademark-copyright-registration", "services-blue/trademark.svg"],
      ["NGO IPR", "ngo-ipr", "services-blue/ngo.svg"],
      ["SEBI Business Registration", "sebi-business-registration", "services-blue/sebi.svg"],
    ],
  },
  {
    name: "Global",
    slug: "global",
    description: "Global approval support through an international partner network.",
    sortOrder: 2,
    services: [
      ["Japan", "japan", "services-blue/japan.svg"],
      ["United States", "united-states", "services-blue/united-states.svg"],
      ["Africa", "africa", "services-blue/africa.svg"],
      ["Argentina", "argentina", "services-blue/argentina.svg"],
      ["Brazil", "brazil", "services-blue/brazil.svg"],
    ],
  },
] as const;

export const brandLogos = [
  ["Tata Play", "tata-play.svg", "client"],
  ["Newline", "newline.svg", "client"],
  ["Lipi", "lipi.webp", "client"],
  ["Toray", "toray.svg", "client"],
  ["Sony", "sony.svg", "client"],
  ["Sennheiser", "sennheiser.svg", "client"],
  ["Healthify", "healthify.svg", "client"],
  ["Kaon", "kaon.svg", "client"],
  ["Halton", "halton.svg", "client"],
  ["Lenovo", "lenovo.svg", "client"],
] as const;

export const regulatorLogos = [
  ["BIS", "services-blue/bis.svg"],
  ["EPR", "services-blue/epr.svg"],
  ["TEC", "services-blue/tec.svg"],
  ["WPC", "services-blue/wpc.svg"],
  ["BEE", "services-blue/bee.svg"],
] as const;

export const homeTestimonials = [
  {
    quote:
      "We have worked with JR Compliance for 2 years and with their help, we get the BIS license successfully. They always give us very good service and we really appreciate that.",
    personName: "Kate Tran",
    companyName: "ISC",
    publishedOn: "2024-03-04",
  },
  {
    quote:
      "We have outsourced the entire BIS certification responsibility of our panels to JR Compliance since 2017 and their service so far has been exemplary.",
    personName: "P N Dhawanjewar",
    companyName: "Lipi",
    publishedOn: "2024-03-04",
  },
  {
    quote:
      "We have been using JR Compliance services since last 3 years on various BIS related registration testing of our various IT electronic products. We really appreciate your full-fledged excellent support in all respect in this matter.",
    personName: "Kate Tran",
    companyName: "Newline",
    publishedOn: "2024-03-04",
  },
  {
    quote:
      "Extremely professional company and very prompt service. I am associated with them from last 4 to 5 years. They have never disappointed us in service. Please continue to give this professional service.",
    personName: "Atish Bihani",
    companyName: "JR Compliance client",
    publishedOn: "2024-03-04",
  },
] as const;

export const recognitions = [
  {
    category: "Media",
    title: "JR Compliance: Revolutionizing Certification Processes with Innovative Solutions",
    excerpt: "JR Compliance provides easy access to global certification via a user-friendly platform.",
    href: "https://bit.ly/4dC8SF3",
    sourceName: "ZEE News",
  },
  {
    category: "Media",
    title: "JR Compliance: Helping Local Manufacturers Thrive in the Face of COVID-19 Challenges",
    excerpt:
      "JR Compliance provides comprehensive compliance services to manufacturers to help them meet global standards.",
    href: "https://bit.ly/3XE8Whw",
    sourceName: "Hindustan Times",
  },
  {
    category: "Media",
    title: "JR Compliance: Simplifying Global Compliance for Manufacturers Amidst Regulatory Changes.",
    excerpt:
      "JR Compliance provides manufacturers with knowledge in navigating complex compliance requirements.",
    href: "https://bit.ly/3BdGPhq",
  },
] as const;

export const homeFaqCategories = [
  {
    name: "Registration",
    slug: "registration",
    questions: [
      [
        "What documents are required for business registration?",
        "Required documents typically include identity and address proofs for business owners or directors, Articles of Incorporation, registered office address, PAN/TAN (for India), and relevant licenses or permits depending on the business type.",
      ],
      [
        "How long does the business registration process take?",
        "The process duration varies by country and entity type. Sole proprietorships and partnerships take about 5–10 business days. Private limited companies and corporations usually take 10–20 business days, depending on document accuracy and authority processing speed.",
      ],
      [
        "What are the different types of business entities I can register?",
        "Common types include Sole Proprietorship, Partnership, Limited Liability Partnership (LLP), Private Limited Company, and Public Limited Company. Each structure differs in ownership, liability, and regulatory requirements.",
      ],
      [
        "Do I need to renew my business registration?",
        "Yes, business registrations often require annual or biennial renewal, depending on jurisdiction. Failing to renew can lead to penalties or dissolution.",
      ],
      [
        "Can I change my business structure after registration?",
        "Yes, business structure changes are possible but involve legal steps like re-registration and compliance with new regulations. Consult a legal expert for guidance.",
      ],
    ],
  },
  {
    name: "Compliance",
    slug: "compliance",
    questions: [
      [
        "What is a compliance certification?",
        "A compliance certification confirms that a product, service, or organization meets industry-specific standards, regulations, or guidelines established by regulatory authorities.",
      ],
      [
        "Why do I need a compliance certification?",
        "Compliance certifications are mandatory for legal market access, building customer trust, and ensuring your product meets safety and quality standards.",
      ],
      [
        "How long does the certification process take?",
        "The certification process typically takes between 4 and 12 weeks, depending on the product's complexity and the regulatory body involved.",
      ],
      [
        "Which industries require compliance certifications?",
        "Industries such as electronics, medical devices, automotive, telecommunications, and consumer products require compliance certifications to meet regulatory standards.",
      ],
      [
        "What documents are needed for compliance certification?",
        "Required documents typically include identity and address proofs for business owners or directors, Articles of Incorporation, registered office address, PAN/TAN (for India), and relevant licenses or permits depending on the business type.",
      ],
    ],
  },
  {
    name: "Tax & Audits",
    slug: "tax-audits",
    questions: [
      [
        "What is tax compliance?",
        "Tax compliance ensures that businesses adhere to tax laws and regulations, including accurate reporting and timely payment of taxes.",
      ],
      [
        "How can I prepare for an audit?",
        "Gather all relevant financial records, ensure proper documentation, and review compliance with tax regulations to be audit-ready.",
      ],
      [
        "What are the common tax audit triggers?",
        "High deductions, discrepancies between reported income and bank statements, and large cash transactions can trigger tax audits.",
      ],
      [
        "What should I do if I receive an audit notice?",
        "Respond promptly, review the notice carefully, gather necessary documents, and consult a tax professional for guidance.",
      ],
      [
        "How can JR Compliance help with tax issues?",
        "JR Compliance offers expert advice on tax regulations, audit preparation, and resolution, ensuring your business stays compliant and reduces audit risks.",
      ],
    ],
  },
] as const;

export const careerFaqs = [
  [
    "What career opportunities are available at JR Compliance?",
    "We offer a variety of job positions at JR Compliance in compliance consulting, legal advisory, corporate compliance operations, sales, and marketing. Explore our website to find the best fit for you.",
  ],
  [
    "How can I apply for a job at JR Compliance?",
    "You can browse our current job openings on our Careers Page, select the role that matches your skills, and submit your application online.",
  ],
  [
    "Does JR Compliance offer internship opportunities?",
    "Yes! We provide internships for students and fresh graduates in compliance research, business operations, and marketing. Keep an eye on our internship openings for opportunities.",
  ],
  [
    "What is the work culture like at JR Compliance?",
    "At JR Compliance, we foster a culture of collaboration, growth, and innovation. We believe in work-life balance, continuous learning, and creating an environment where every team member can thrive.",
  ],
] as const;

export const timelineEvents = [
  [
    "2013–14",
    "Establishment Phase",
    "JR Compliance began its operations by conducting market research and forming global partnerships with Sennheiser and Kaon Media, demonstrating our expertise in streamlining compliance services for international clients.",
  ],
  [
    "2015–16",
    "Diversifying into New Sectors",
    "We expanded our reach into the automotive and technology industries by partnering with Delphi, Valeo, Intertek, and SGS Group, expanding our compliance services to include product testing, automotive, and technology sectors.",
  ],
  [
    "2016–17",
    "Embracing Digitalization and Global Expansion",
    "We adopted digital certifications for HTC and incorporated renowned brands such as Lenovo and Supermicro, strengthening our expertise in technology and venturing into the Chinese market.",
  ],
  [
    "2018–19",
    "Attracting Global Leaders",
    "Our clients grew to include Dell, Decathlon, and Vist Group, diversifying our portfolio to include sports technology by certifying Smart Cricket bat sensors used in the ICC World Cup.",
  ],
  [
    "2020–21",
    "Forming Alliances with Industry Titans",
    "We forged partnerships with Milton, Nykaa, and Softbank Robotics to manage compliance in a variety of industries, including homeware, e-commerce, and robotics, thereby solidifying our international reputation.",
  ],
  [
    "2022",
    "Recognized by Industry Powerhouses",
    "Bombay Dyeing and Toray entrusted us with their certification requirements, highlighting our dominance in textiles and industrial products while also continuing our tradition of dependable compliance services on a global scale.",
  ],
] as const;

export const teamMembers = [
  ["Jai Kumar", "General Manager", "about/team/jai-kumar.jpeg", "https://www.linkedin.com/in/jai-choubey-0b924419b/"],
  ["Prashant Nayak", "Regulatory Affairs Specialist", "about/team/prashant-nayak.jpeg", "https://www.linkedin.com/in/prashant-nayak-824a39105/"],
  ["Avinash Sharma", "Digital Marketing Manager", "about/team/avinash-sharma.jpeg", "https://www.linkedin.com/in/avinash-sharma-59742b/"],
  ["Ashish Singh Gusain", "Digital Marketing Executive", "about/team/ashish-singh-gusain.jpeg", "https://www.linkedin.com/in/ashish-gusain/"],
  ["Bhavika Chopra", "Operations Executive", "about/team/bhavika-chopra.jpeg", "https://www.linkedin.com/in/bhavika-chopra-40005825b/"],
  ["Gorakhnath Chaurasiya", "Graphic Designer", "about/team/gorakhnath-chaurasiya.jpeg", "https://www.linkedin.com/in/gorakh-nath-chaurasiyaasiya-91b51824b/"],
  ["Krishan Kumar", "Quality Analyst", "about/team/krishan-kumar.jpeg", "https://www.linkedin.com/in/krishan-kumar-59200b284/"],
  ["Lalit Gupta", "Vice President", "about/team/lalit-gupta.jpeg", "https://www.linkedin.com/in/lalit-gupta-52bbb313/"],
  ["Nancy Tiwari", "Project Co-ordinator", "about/team/nancy-tiwari.jpeg", "https://www.linkedin.com/in/nancy-tiwari/"],
  ["Muskan Aggarwal", "Operations Executive", "about/team/muskan-aggarwal.jpeg", "https://www.linkedin.com/in/muskan-aggarwal-872a311b8/"],
  ["Priyanka Thapliyal", "Project Manager", "about/team/priyanka-thapliyal.jpeg", "https://www.linkedin.com/in/priyanka-thapliyal-760621125/"],
  ["Shweta Sharma", "Corporate Compliance Manager", "about/team/shweta-sharma.jpeg", "https://www.linkedin.com/in/shweta-sharma-57190818/"],
  ["Siddharth Chaudhary", "Admin", "about/team/siddharth-chaudhary.jpeg", ""],
  ["Umesh M.", "Business Development Specialist", "about/team/umesh-m.jpeg", "https://www.linkedin.com/in/umesh-mundotia-a399b213/"],
] as const;

export const achievements = [
  [
    "Dassault Rafale",
    "Proudly secured the prestigious BIS certification for the cutting-edge FLIR system camera installed in the iconic Dassault Rafale fighter jet.",
    "about/achievements/rafale.svg",
  ],
  [
    "Smart Cricket",
    "Pioneered compliance services for Smart Cricket, which provided bat sensors used in multiple ICC World Cup bats.",
    "about/achievements/pioneer.svg",
  ],
  [
    "National Brands",
    "Successfully provided services to 20+ national brands such as Asbill, Nykaa, and more.",
    "about/achievements/nykaa.svg",
  ],
  [
    "Decathlon",
    "Decathlon, the globally renowned sports equipment brand, trusted our compliance services to resolve their customs clearance issues effectively.",
    "about/achievements/decathlon.svg",
  ],
  [
    "Sennheiser",
    "Sennheiser entrusted us with over 100 new projects, reaffirming our longstanding partnership and expertise in handling complex compliance needs.",
    "about/achievements/sennheiser.svg",
  ],
] as const;

export const jobOpenings = [
  [
    "Operations – Corporate Compliance",
    "operations-corporate-compliance",
    "Corporate Compliance",
    "Work on regulatory alignment, internal processes, and compliance operations. Be part of a team dedicated to maintaining integrity, precision, and structured corporate systems.",
  ],
  [
    "DevOps Engineer",
    "devops-engineer",
    "Development",
    "Support seamless integration, automation, and system reliability in a collaborative tech-driven workspace. Join a team focused on innovation, efficiency, and operational excellence.",
  ],
  [
    "Financial Accountant",
    "financial-accountant",
    "Finance",
    "Manage financial records, assist in budgeting, and support strategic planning in a compliance-focused organization offering a collaborative, growth-oriented environment.",
  ],
  [
    "Business Development Manager/Executive",
    "business-development-manager-executive",
    "Business Development",
    "Drive growth and partnerships in a fast-paced environment. Be part of strategic initiatives, client acquisition, and business expansion with a team that values innovation.",
  ],
  [
    "Chartered Accountant (CA)",
    "chartered-accountant-ca",
    "Finance",
    "Join our expert finance team to oversee audits, compliance, and reporting. Contribute to critical financial decisions in a structured yet progressive corporate setup.",
  ],
] as const;

export const careerGallery = [
  ["careers/gallery/culture-1.webp", "JR Compliance team gathering"],
  ["careers/gallery/culture-2.webp", "JR Compliance colleagues together"],
  ["careers/gallery/culture-3.webp", "JR Compliance team activity"],
  ["careers/gallery/culture-4.webp", "JR Compliance workplace moment"],
  ["careers/gallery/culture-5.webp", "JR Compliance team celebration"],
  ["careers/gallery/culture-6.webp", "JR Compliance colleagues at work"],
  ["careers/gallery/culture-7.webp", "JR Compliance workplace culture"],
  ["careers/gallery/culture-8.webp", "JR Compliance team event"],
] as const;

export const careerTestimonials = [
  [
    "The working environment here is very good and the staff and owner are very supportive and I enjoy working here.",
    "Saurabh Sahi",
    "Cinematographer",
    "careers/testimonials/saurabh-sahi.webp",
  ],
  [
    "JR Compliance is one of the finest workplaces I have worked at because of the perfect balance between work and fun.",
    "Shweta Sharma",
    "Compliance Manager",
    "careers/testimonials/shweta-sharma.webp",
  ],
  [
    "Working in JR Compliance is like having a rollercoaster ride filled with ups and downs but you enjoy the hell out of the ride.",
    "Avinash Sharma",
    "Digital Marketing Manager",
    "careers/testimonials/avinash-sharma.webp",
  ],
  [
    "Never seen such an amazing work environment like JR Compliance. JR Compliance is the name of satisfaction that leads to positivity and better performance.",
    "Gorakhnath Chaurasiya",
    "Graphic Designer",
    "careers/testimonials/gorakhnath-chaurasiya.webp",
  ],
  [
    "A very positive working environment and level of respect, empathy, and overall understanding between colleagues is excellent.",
    "Arjita Pandey",
    "EPR Project Co-ordinator",
    "careers/testimonials/arjita-pandey.webp",
  ],
  [
    "Amazing place to work! Good people, good atmosphere, positive vibe, productive environment, and friendly people to work with. Also, the management is very supportive and teaches everyone a lot of stuff.",
    "Anil Kumar",
    "Senior Business Advisor",
    "careers/testimonials/anil-kumar.jpg",
  ],
] as const;
