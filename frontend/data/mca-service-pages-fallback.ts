import type { McaServicePageData } from "@/lib/types";

/**
 * The first approved MCA Services route. Future MCA records keep this fixed
 * content shape in Strapi; no legacy Webflow markup or assets are imported.
 */
export const fallbackMcaServicePages: McaServicePageData[] = [
  {
    slug: "dsc-certificate",
    menuLabel: "DSC",
    seo: {
      title: "Apply For Digital Signature Certificate Online | DSC Registration | DSC Provider",
      description:
        "Looking for an easy way to obtain a DSC certificate? Click here to know about how to apply for Digital Signature Certificate online. Get your Digital Signature Certificate now from best DSC service provider.",
      robots: "index,follow",
    },
    hero: {
      eyebrow: "MCA Services",
      title: "DIGITAL SIGNATURE CERTIFICATE (DSC)",
      description:
        "A Digital Signature Certificate is a legally recognized digital key, it is different for every individual like a digital fingerprint used to identify individuals or organizations in electronic transactions. Issued by authorized Certifying Authorities, it ensures that all transactions are secure, tamper-proof communication used to establish trust. DSCs are essential for e-filing, signing digital documents, and ensuring compliance with legal and regulatory requirements.",
      cta: { label: "Get Free Expert Consultation!", href: "/contact-us" },
    },
    overview: {
      eyebrow: "Service Overview",
      title: "Service Overview",
      paragraphs: [
        "Our DSC service helps get a Digital Signature Certificate to sign electronic documents securely and confidently conduct online transactions. Whether it's for business or personal usage, our service ensures complete adherence to regulatory standards, thereby providing efficiency, security, and reliability in all your digital interactions, saving time and effort.",
      ],
    },
    challenges: {
      eyebrow: "What to plan for",
      title: "Challenges of Filing for a Digital Signature Certificate",
      items: [
        {
          title: "Navigating Legal Compliance in Digital Transactions",
          description:
            "The legal framework for digital signatures can be complex. Our services ensure DSCs comply with the Information Technology Act, 2000, providing legal validity to your e-signed documents.",
        },
        {
          title: "Securing Sensitive Data in Communications",
          description:
            "Digital transactions involve sensitive information. We implement advanced encryption techniques to protect your data, ensuring your DSC is secure, reliable, and resistant to tampering.",
        },
        {
          title: "Overcoming Documentation and Verification Hurdles",
          description:
            "Acquiring a DSC often involves tedious paperwork and verification. Our streamlined process minimizes delays, simplifies documentation, and ensures full adherence to compliance standards without hassle.",
        },
        {
          title: "Addressing Technical Barriers in Usage",
          description:
            "Technical issues during DSC installation or use can be daunting. Our dedicated support team ensures seamless guidance, from application to efficient usage, addressing all technical concerns promptly.",
        },
      ],
    },
    advantages: {
      eyebrow: "Business advantages",
      title: "Advantages Of Registering A Digital Signature Certificate",
      items: [
        {
          title: "Ensures Data Security",
          description:
            "DSCs encrypt sensitive data, ensuring secure transactions and preventing unauthorized access or tampering during online processes.",
        },
        {
          title: "Legally Recognized",
          description:
            "DSCs hold legal validity under the IT Act, 2000, making them admissible in courts and mandatory for certain official transactions.",
        },
        {
          title: "Boosts Operational Efficiency",
          description:
            "Using a DSC speeds up processes, reduces paperwork, and facilitates quick, secure transactions, improving overall efficiency.",
        },
        {
          title: "Significantly Cuts Costs",
          description:
            "By eliminating physical documentation and manual verifications, DSCs help businesses save on operational costs and improve digital workflows.",
        },
      ],
    },
    process: {
      eyebrow: "Service Process",
      title: "Service Process",
      items: [
        {
          title: "Submit Application",
          description:
            "Complete and submit the DSC application form with all required personal or organizational details.",
        },
        {
          title: "Document Verification",
          description:
            "Provide valid identity and address proofs for verification by the Certifying Authority (CA).",
        },
        {
          title: "Authenticate Ident",
          description:
            "Undergo Aadhaar-based eKYC or physical verification, depending on your eligibility and application type.",
        },
        {
          title: "DSC Registration",
          description:
            "Register the issued DSC on the relevant government or regulatory portal to enable its use for official transactions.",
        },
        {
          title: "Issuance of DSC",
          description:
            "After successful verification, your DSC is issued and made available for download via authorized software.",
        },
        {
          title: "Training for Use",
          description:
            "Receive comprehensive guidance on how to use your DSC for signing documents and transactions.",
        },
      ],
    },
    whyChoose: {
      eyebrow: "Why JR Compliance",
      title: "Why Choose JR Compliance?",
      items: [
        {
          title: "Proven Expertise in DSC Compliance",
          description: "We ensure every DSC issued meets legal standards and regulatory requirements.",
        },
        {
          title: "Efficient and Hassle-Free Process",
          description:
            "Our user-friendly process minimizes delays and streamlines documentation and verification.",
        },
        {
          title: "Dedicated Customer Support Team",
          description:
            "Get end-to-end assistance from experts, ensuring a seamless DSC application experience.",
        },
        {
          title: "Affordable, High-Quality Services",
          description:
            "We provide secure, cost-effective DSC solutions without compromising quality or support.",
        },
      ],
    },
    breakdown: {
      eyebrow: "Service Breakdown",
      title: "Service Breakdown",
      groups: [
        {
          title: "Eligibility",
          items: [
            "Indian Citizens: It is valid for individuals who have an Indian citizenship.",
            "Organizations: The businesses and corporate entities should be registered and have documented proof of registration.",
            "Foreign Nationals: It is also valid for Non-Indian residents requiring authorized digital signatures.",
            "Authorized Signatories: Representatives officially designated to sign on behalf of entities must have Digital Signature Certificate.",
          ],
        },
        {
          title: "Documents",
          items: [
            "Identity Proof: Aadhaar, PAN card, or driving license of the applicant.",
            "Address Proof: Recent utility bill, bank statement, or voter ID.",
            "Passport-Sized Photograph: A clear and recent photograph of the applicant.",
            "Application Form: A duly filled and signed form provided by the certifying authority.",
            "Verification Documents: Self-attested copies of all submitted proofs for authentication.",
          ],
        },
        {
          title: "Who Needs It",
          items: [
            "Corporate Entities: It is ideal for businesses that need secure digital authentication for official transactions.",
            "Tax Professionals: DSC is best suited for tax consultants who manage electronic filings and compliance regulations.",
            "Government Contractors: Government contractors enjoy its benefits by participating in government-related projects easily.",
            "E-Tender Participants: It is designed for entities those aim on bidding through electronic tender processes.",
          ],
        },
      ],
    },
    faqs: {
      eyebrow: "Need clarity?",
      title: "FAQ",
      items: [
        {
          question: "What is a Digital Signature Certificate?",
          answer:
            "A DSC is a secure digital key that authenticates identities in electronic transactions, ensuring data integrity and non-repudiation.",
        },
        {
          question: "Who can apply for a DSC?",
          answer: "Individuals, organizations, or foreign nationals can apply for a DSC with valid documentation.",
        },
        {
          question: "How long is a DSC valid?",
          answer: "Typically, DSCs are valid for one or two years and can be renewed before expiry.",
        },
        {
          question: "What are the main uses of a DSC?",
          answer: "DSCs are used for signing digital documents, e-filing tax returns, and participating in e-tenders.",
        },
        {
          question: "How can I renew my DSC?",
          answer:
            "Renewal involves reapplying with updated documents via the issuing Certifying Authority before expiry.",
        },
      ],
    },
    closingCta: {
      title: "Take the next step towards success",
      description:
        "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
      cta: { label: "Contact Us", href: "/contact-us" },
    },
  },
];

export const mcaServiceSlugs = fallbackMcaServicePages.map((page) => page.slug);

export function mcaServiceFallback(slug: string): McaServicePageData | undefined {
  return fallbackMcaServicePages.find((page) => page.slug === slug);
}
