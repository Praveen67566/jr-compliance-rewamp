import type { TaxAccountingPageData } from "@/lib/types";

/** The first approved Tax and Accounting route. Later records are CMS-only. */
export const fallbackTaxAccountingPages: TaxAccountingPageData[] = [
  {
    slug: "gst-registration",
    menuLabel: "GST Registration",
    seo: {
      title: "GST registration service provider in Delhi | GST Registration Consultants",
      description:
        "Looking for the best GST registration service provider in Delhi? Our expert GST Registration Consultants in Delhi offer seamless and efficient GST registration services, ensuring compliance and accuracy",
      robots: "index,follow",
    },
    hero: {
      eyebrow: "Tax and Accounting",
      title: "GST REGISTRATION",
      description:
        "GST registration simplified through JR Compliance. Our expert team makes everything accurate, quick, and hassle-free compliance so that businesses' tax requirements can be fulfilled while enjoying the benefits of operations.",
      cta: { label: "Get Free Expert Consultation!", href: "/contact-us" },
    },
    overview: {
      eyebrow: "Service Overview",
      title: "Service Overview",
      paragraphs: [
        "GST registration is mandatory for businesses that have crossed their turnover limit specified. It provides legal recognition, enables tax collection, and promotes smooth interstate trade. JR Compliance offers seamless assistance, ensuring businesses can focus on growth while staying compliant with GST regulations.",
      ],
    },
    challenges: {
      eyebrow: "Service Challenges",
      title: "Challenges of Service",
      items: [
        {
          title: "Complex Regulatory Process",
          description:
            "New business owners often face GST registration delays due to document issues and lack of compliance expertise.",
        },
        {
          title: "Understanding Turnover Eligibility Thresholds",
          description:
            "For many businesses confusion over GST eligibility can lead to non-compliance, penalties, and operational issues.",
        },
        {
          title: "Technical Errors during Registration",
          description:
            "Errors while submitting GST application forms or providing incorrect information often lead to rejection of applications or multiple correction processes.",
        },
        {
          title: "Navigating GST Compliance after Registration",
          description:
            "Registered businesses must file GST returns regularly and stay updated on tax laws to avoid penalties.",
        },
      ],
    },
    advantages: {
      eyebrow: "Business advantages",
      title: "Business Advantages",
      items: [
        {
          title: "Legal Compliance and Recognition",
          description:
            "GST registration grants legality to businesses so that they can collect GST without any hurdles and increase consumer trust.",
        },
        {
          title: "Hassle-free Inter-state Trade",
          description:
            "An organisation with registered GST can smoothly run their business across states engaging in trade activities with states and capturing a bigger market reach.",
        },
        {
          title: "Input Tax Credits",
          description:
            "A registered business can claim input tax credits thus lessening tax liability and cost-effective operations.",
        },
      ],
    },
    process: {
      eyebrow: "Service Process",
      title: "Service Process",
      items: [
        {
          title: "Share Basic Business Details",
          description: "Provide initial information to initiate the registration process.",
        },
        {
          title: "Document Collection Begins",
          description: "We guide you on the necessary documents and help gather them.",
        },
        {
          title: "Application Preparation",
          description:
            "Our experts prepare your GST application with precision, eliminating common errors which can cause delay.",
        },
        {
          title: "Verification & Submission",
          description:
            "The application is verified and submitted to the GST portal for further approval.",
        },
        {
          title: "Follow-Up With Authorities",
          description:
            "We coordinate with officials for timely follow ups, application updates and clarifications required.",
        },
        {
          title: "Receive Your GSTIN",
          description:
            "Once approved, your GST registration is complete and ready to use in your business.",
        },
      ],
    },
    whyChoose: {
      eyebrow: "Why Choose JR Compliance?",
      title: "Why Choose JR Compliance?",
      items: [
        {
          title: "Accurate Documentation",
          description:
            "Accurate documentation and an efficient process for seamless GST registration.",
        },
        {
          title: "Dedicated Support",
          description: "Dedicated support for addressing compliance queries and challenges.",
        },
        {
          title: "Complex GST Requirements and Legalities",
          description: "Expertise in handling complex GST requirements and legalities.",
        },
        {
          title: "Faster Registration",
          description: "Ensured faster registration with minimal errors or delays.",
        },
      ],
    },
    breakdown: {
      eyebrow: "Service Breakdown",
      title: "Service Breakdown",
      groups: [
        {
          title: "Who Needs",
          items: [
            "If your business provides goods and services above the GST threshold, it must be registered to operate legally or risk incurring penalties.",
            "Small businesses crossing the GST threshold",
            "E-Commerce Operators and Aggregators",
            "Interstate Suppliers of Goods/Services",
            "Casual and Seasonal Taxable Persons",
          ],
        },
        {
          title: "Eligibility",
          items: [
            "Once an entity crosses the turnover limits, begins interstate trade, or starts engaging in e-commerce businesses, they become subject to obligatory GST registration norms.",
            "Businesses Exceeding Prescribed Turnover Threshold",
            "Involvement in E-Commerce Activities",
            "Suppliers in Multiple States",
            "Importers and Exporters",
          ],
        },
        {
          title: "Documents",
          items: [
            "Obtaining the correct documentation for the GST application is the crucial step, mistakes in the same can cause setbacks in the registration process.",
            "PAN Card of the Business or Proprietor",
            "Aadhaar Card of the Applicant",
            "Business Address Proof",
            "Bank Account Details",
            "Photographs and Signatures",
          ],
        },
      ],
    },
    faqs: {
      eyebrow: "FAQ",
      title: "FAQ",
      items: [
        {
          question: "What is the threshold value for registration of GST?",
          answer:
            "The turnover threshold, exceeding ₹20 lakh (however, it might be lower at, say, ₹10 lakh for some specific states), compels businesses to register with the provisions of GST laws upon them. There are some other businesses with lesser turnover limits in GST and they have the freedom to get GST number, as it gives them some advantages.",
        },
        {
          question: "How long does GST registration take?",
          answer:
            "Depending on the accuracy and completion of the documents submitted with the approval process, as if the documentation is not correct there will be some delay to the process. So, if all cases can go ahead, it takes a response time of 7-10 days after registration in GST.",
        },
        {
          question: "Why get registered under GST?",
          answer:
            "There are several benefits for registering under GST, right from saving the fine by following compliance to expanding trade from one state to another. GST registration is especially beneficial to avail multiple government benefits and schemes.",
        },
        {
          question: "Does a freelancer need to become GST registered?",
          answer:
            "A freelancer must be issued a GST registration now if earning above the prescribed GST threshold. Non-compliance may result in penalties.",
        },
        {
          question: "Can I abolish my GST registration?",
          answer:
            "Yes, the GST registration can be abolished when the business closes or if it no longer requires the GST compliance.",
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

export const taxAccountingSlugs = fallbackTaxAccountingPages.map((page) => page.slug);

export function taxAccountingFallback(slug: string): TaxAccountingPageData | undefined {
  return fallbackTaxAccountingPages.find((page) => page.slug === slug);
}
