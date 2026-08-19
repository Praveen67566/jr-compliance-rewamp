import type { FundRaisingPageData } from "@/lib/types";

/** The first approved Fund Raising route. Later records are CMS-only. */
export const fallbackFundRaisingPages: FundRaisingPageData[] = [
  {
    slug: "msme-registration",
    menuLabel: "MSME",
    seo: {
      title: "MSME Registration Online | MSME Certification Consultant Near me",
      description:
        "We make MSME registration unchallenging without compromising our client's time constraints and do MSME Registration online. Get MSME Certificate Online. Contact us to know the benefits and process of MSME registration.",
    },
    hero: {
      eyebrow: "Fund Raising",
      title: "MSME REGISTRATION IN INDIA",
      description:
        "If you register your Micro, Small, or Medium Enterprise (MSME) with JR Compliance, you unlock benefits such as access to government schemes, tax relief, and financial assistance, that boost your business growth and recognition.",
      cta: { label: "Get Free Expert Consultation!", href: "/contact-us" },
    },
    overview: {
      eyebrow: "Service Overview",
      title: "Service Overview",
      paragraphs: [
        "MSME Registration is a key step for businesses that helps them gain credibility, access loans, and benefit from various government schemes, easing financial challenges. It is essential to support your business growth and economic development.",
      ],
    },
    challenges: {
      eyebrow: "What to plan for",
      title: "Challenges of Filing for a MSME Registration",
      items: [
        {
          title: "Complex Documentation",
          description:
            "Companies often struggle with collecting the correct type of documents for MSME registration, which also may differ based on the business type.",
        },
        {
          title: "Time-Consuming Process",
          description:
            "The registration process can be very lengthy, that requires multiple verifications and approvals before completion.",
        },
        {
          title: "Lack of Awareness",
          description:
            "Many businesses are often unaware of the full scope of the benefits available through MSME registration, which limits their potential opportunities.",
        },
        {
          title: "Adherence to Compliance",
          description:
            "It can be difficult to be updated with compliance requirements and when government policies can be overwhelming for businesses.",
        },
      ],
    },
    advantages: {
      eyebrow: "Business advantages",
      title: "Advantages Of Registering A MSME",
      items: [
        {
          title: "Easier Loans Access",
          description:
            "MSME registration provides easier access to financial support from banks and financial institutions at lower interest rates.",
        },
        {
          title: "Government Scheme Eligibility",
          description:
            "Businesses can avail themselves of numerous government schemes and incentives designed to promote MSMEs in India.",
        },
        {
          title: "Tax Benefits",
          description:
            "Registered businesses can enjoy tax exemptions such as central excise duty exemptions and deductions on direct taxes.",
        },
        {
          title: "Reduced Registration Costs",
          description:
            "MSME registration offers subsidies and discounts on patent and trademark registrations, reducing your overall costs.",
        },
      ],
    },
    process: {
      eyebrow: "Service Process",
      title: "Service Process",
      items: [
        {
          title: "Application Submission",
          description:
            "Fill out the MSME registration form online, providing essential details like your business name and Aadhar number.",
        },
        {
          title: "Document Upload",
          description:
            "Upload the required documents, such as identity proof and business registration details, for verification.",
        },
        {
          title: "Udyam Portal Account Creation",
          description:
            "Create an account on the official Udyam Registration portal to initiate and track the application process.",
        },
        {
          title: "Verification",
          description:
            "JR Compliance experts verify your submitted details to ensure accuracy and compliance with MSME regulations.",
        },
        {
          title: "Certification Issuance",
          description:
            "Once your application is approved, the MSME registration certificate is issued, granting you official recognition.",
        },
        {
          title: "Ongoing Support",
          description:
            "We provide ongoing support for tracking your registration progress and ensuring continued compliance with MSME requirements.",
        },
      ],
    },
    whyChoose: {
      eyebrow: "Why JR Compliance",
      title: "Why Choose JR Compliance?",
      items: [
        {
          title: "Deep Expertise",
          description:
            "JR Compliance offers deep expertise in MSME registration and tailored guidance for a smooth process.",
        },
        {
          title: "Simplified Processes",
          description:
            "We simplify complex processes, ensuring swift MSME registration and full compliance.",
        },
        {
          title: "Continuous Support",
          description:
            "Our team is committed to providing continuous support and answers to any queries you may have during registration.",
        },
        {
          title: "Proven Experience",
          description:
            "We have successfully helped numerous businesses, including well-known brands, achieve MSME registration with ease.",
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
            "Investment Limits: Businesses must meet the investment criteria in manufacturing or services to qualify for MSME registration.",
            "Business Type: MSME registration is for various business types, which can include sole proprietorship, partnership as well as companies.",
            "Sector: Both manufacturing and service sector enterprises are eligible for MSME registration but it depends on their investment.",
            "Income Status: Businesses with an annual turnover within the MSME limits are eligible for this registration.",
          ],
        },
        {
          title: "Documents",
          items: [
            "Aadhar Number: A valid ID like an Aadhar number is necessary for MSME registration to verify the business owner’s identity.",
            "Business Documents: Business registration for MSME needs documents like PAN, partnership deed, or Memorandum of Association (MoA) that are necessary for the process.",
            "Proof of Address: Address proof which can include utility bills or rental agreements must be submitted as the documented proof for the location where the business operations take place.",
            "Investment Details: The details and proof have to be submitted about the business’s investment in the machinery, equipment, or services utilized or necessary to execute business operations.",
          ],
        },
        {
          title: "Who Needs It",
          items: [
            "Micro-Enterprises: Businesses with minimal investment in manufacturing or service sectors that seek government benefits.",
            "Small Enterprises: Enterprises requiring financial assistance and government support to scale their operations.",
            "Medium Enterprises: Established businesses needing official recognition and access to larger loans and subsidies.",
            "Startups: New ventures aiming for credibility and benefits to help them grow in competitive markets.",
          ],
        },
      ],
    },
    faqs: {
      eyebrow: "Need clarity?",
      title: "FAQ",
      items: [
        {
          question: "What is MSME registration?",
          answer:
            "MSME registration is a helpful way to certify that the business is either a Micro, Small or Medium Enterprise. This helps them to get access to various government benefits and multiple schemes that benefit the business growth.",
        },
        {
          question: "How long does MSME registration take to complete?",
          answer:
            "The MSME registration process typically takes 7-10 working days after the document is submitted and fully verified.",
        },
        {
          question: "What documents are required for MSME registration?",
          answer:
            "The documents needed for MSME registration are PAN card, Aadhar card, along with address proof, and for companies, incorporation documents such as Memorandum Of Association (MoA) and Articles of Association (AOA).",
        },
        {
          question: "Can I apply for MSME registration online?",
          answer:
            "Yes, you can apply online to register for MSME, through the official portal for MSME registration. It can be a lengthy process so you can also seek help from professionals to make the process hassle free.",
        },
        {
          question: "What is Udyog Aadhar number?",
          answer:
            "Udyog Aadhar just like the ordinary Aadhar used by Indian citizens contains a 12 digit number. This 12 digit number contains the details of all the information about the micro, small and medium enterprises.",
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

export const fundRaisingSlugs = fallbackFundRaisingPages.map((page) => page.slug);

export function fundRaisingFallback(slug: string): FundRaisingPageData | undefined {
  return fallbackFundRaisingPages.find((page) => page.slug === slug);
}
