import type { PollutionAdvisoryPageData } from "@/lib/types";

/** The first approved Pollution Advisory route. Later records are CMS-only. */
export const fallbackPollutionAdvisoryPages: PollutionAdvisoryPageData[] = [
  {
    slug: "epr-certification",
    menuLabel: "Extended Producer's Responsibility (EPR)",
    seo: {
      title:
        "EPR Certificate | EPR Registration - A Certificate For E-Waste Management | Extended Producer Responsibility",
      description:
        "We make the EPR certification procedure hassle-free to ensure customer satisfaction. Click here to know how to get an EPR certificate. Get your EPR Registration today. EPR stands for Extended Producer Responsibility",
      robots: "index,follow",
    },
    hero: {
      eyebrow: "Pollution Advisory",
      title: "EPR compliance: Responsible response to environmental regulations",
      description:
        "Do you need comprehensive EPR solutions? Look no further. We at JR Compliance ensure proper management of the product lifecycle and updated legal compliance by providing you with the means of achieving environmental sustainability.",
      cta: { label: "Get Free Expert Consultation!", href: "/contact-us" },
    },
    overview: {
      eyebrow: "Service Overview",
      title: "EPR Overview",
      paragraphs: [
        "Extended Producer Responsibility (EPR) is considered a policy approach that involves the care of a manufacturer for a product from its beginning until its ultimate disposal. It involves the safe collection and recycling of used and discarded products with the intent of containing their adverse effects on the environment.",
        "EPR compliance holds high importance for sectors related to electronics, plastics, and packaging materials. The companies observe their ecological footprint minimization, adhere to CPCB guidelines, and act as stepping stones toward a healthy future.",
        "Product Life Cycle: From design through product retirement at the end of life, the aim is to provide the least environmental harm.",
        "Recycling Responsibilities: Product recycling is aimed at generating minimum waste and helping towards sustainability.",
        "Conforming to Environment: Supporting environmental national and international regulations to ensure eco-friendly disposal and responsible product supervision.",
      ],
    },
    challenges: {
      eyebrow: "Service Scope",
      title: "Elements of EPR",
      items: [
        {
          title: "Plastic",
          description:
            "Plastic qualifies if its lifecycle (production, use, disposal) poses environmental challenges. Determine applicability by checking local recycling mandates and waste management regulations.",
        },
        {
          title: "Battery",
          description:
            "If batteries contain hazardous components requiring specialized recycling. Check if your battery design mandates compliance with safe disposal and recovery regulations.",
        },
        {
          title: "E-waste",
          description:
            "Verify e-waste compliance by assessing material composition, repairability, and regulatory e-waste guidelines. The products qualify as if they incorporate complex circuits and hazardous materials.",
        },
        {
          title: "Tyre",
          description:
            "Determining the applicability of EPR on tyres depends on their durability and disposal challenges by reviewing material composition, recycling feasibility, and relevant environmental waste policies.",
        },
        {
          title: "Used Oil",
          description:
            "Used oil qualifies under EPR if it poses environmental risks via improper disposal. Confirm applicability by evaluating contamination levels and availability of recycling methods.",
        },
      ],
    },
    advantages: {
      eyebrow: "Business advantages",
      title: "Benefits of EPR",
      items: [
        {
          title: "Legal Compliance",
          description:
            "EPR ensures that your company is complying with environmental laws, hence avoiding fines and legal ramifications.",
        },
        {
          title: "Eco-Friendly Image",
          description:
            "EPR registration builds a healthy image of your organization as responsible towards the environment.",
        },
        {
          title: "Cost Efficiency",
          description:
            "The long-term cost implications can be perceived with proper waste management since such action may result in long-term savings with the management of disposal and raw material sourcing.",
        },
        {
          title: "Sustainability Goals",
          description:
            "Contribute to a circular economy by recycling materials that, in turn, decrease the overall amount of waste.",
        },
      ],
    },
    process: {
      eyebrow: "Service Process",
      title: "How it works?",
      items: [
        {
          title: "Registration",
          description: "Register under applicable EPR regulations.",
        },
        {
          title: "Implementation",
          description:
            "Develop a collection and recycling strategy for waste made according to the product.",
        },
        {
          title: "Monitoring",
          description: "Keep track of ongoing compliance with the EPR regulations.",
        },
        {
          title: "Reporting",
          description:
            "Furnish routine reports on the management of wastes and status regarding compliance with the appropriate authorities.",
        },
      ],
    },
    whyChoose: {
      eyebrow: "Why Choose JR Compliance?",
      title: "How JR helps",
      items: [
        {
          title: "EPR Registration",
          description:
            "We help you register your business under specific Extended Producer Responsibility (EPR) law for various sectors.",
        },
        {
          title: "Waste Management Plans",
          description:
            "To collect, recycle, and manage post-consumer products, plans are customized based on Plastic Waste Management standards.",
        },
        {
          title: "Compliance Monitoring",
          description:
            "Periodic tracking should be done to assure compliance with EPR law and avoid liability through monitoring as per directives issued by the Central Pollution Control Board.",
        },
      ],
    },
    breakdown: {
      eyebrow: "Service Breakdown",
      title: "Documents Required",
      groups: [
        {
          title: "Documents Required",
          items: [
            "Business Registration Documents: The documented proof of the business incorporation is required which includes, GST certificate, Import Export Code (IEC), Certificate of incorporation, MSME (Optional).",
            "Director KYC Documents: Documents are mandatory for the KYC of directors Aadhar card/ Pan Card/ Email/ Contact Details or Authorized Signatory and Designation of the Authorized Signatory and Authorization.",
            "Techinical Details: Sales and purchase data of the last 2 financial years (state-wise) with Product details (Photograph of Products).",
            "Process of Registration: The final stages of the application requires collecting documents, preparation of technical submission of the application, scrutiny of the application. If any query arises, we revert back for the solution of the query. Otherwise, the application will be approved and a certificate will be issued.",
          ],
        },
      ],
    },
    faqs: {
      eyebrow: "FAQ",
      title: "FAQ",
      items: [
        {
          question: "What is EPR compliance?",
          answer:
            "EPR compliance is a directive by which producers are obliged to take responsibility for disposal at the end of the life cycle of their product to achieve proper recycling and environmental protection.",
        },
        {
          question: "Which sectors have to follow EPR regulation?",
          answer:
            "Product sectors: electronic, plastic, or packaging material manufacturers, importers, and brand owners have to adhere to the EPR regulation.",
        },
        {
          question: "How do I register for EPR compliance?",
          answer:
            "You may get the process done through the respective environmental authority or let us handle everything on your behalf.",
        },
        {
          question: "What would be the implications if I'm not compliant with EPR?",
          answer:
            "Non-compliance would lead to some form of penalty, fine, or restriction for selling the products in specific markets.",
        },
        {
          question: "What are the benefits of EPR to my business?",
          answer:
            "EPR registration improves the environmentally friendly profile of your business, fulfills the legal requirements, and eventually saves cost on waste management.",
        },
      ],
    },
    closingCta: {
      title: "Take the Next Step Towards Success",
      description:
        "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
      cta: { label: "Contact Us", href: "/contact-us" },
    },
  },
];

export const pollutionAdvisorySlugs = fallbackPollutionAdvisoryPages.map((page) => page.slug);

export function pollutionAdvisoryFallback(
  slug: string,
): PollutionAdvisoryPageData | undefined {
  return fallbackPollutionAdvisoryPages.find((page) => page.slug === slug);
}
