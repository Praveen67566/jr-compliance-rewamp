import { fallbackHomepage } from "@/data/homepage-fallback";
import type { ContactPageContent } from "@/lib/types";

/**
 * Contact content from the visible legacy page. The action remains intentionally
 * absent until an approved server-side enquiry workflow is defined.
 */
export const fallbackContactPage: ContactPageContent = {
  site: fallbackHomepage.site,
  navigation: fallbackHomepage.navigation,
  footer: fallbackHomepage.footer,
  seo: {
    title: "Contact Us | JR Compliance",
    description:
      "Our mantra is to provide technical compliance certifications with click access and at a reasonable cost.",
  },
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
      icon: "/images/contact/phone.svg",
    },
    {
      label: "Email us",
      value: "support@jrcompliance.com",
      href: "mailto:support@jrcompliance.com",
      detail: "Share the details of your requirement.",
      icon: "/images/contact/email.svg",
    },
    {
      label: "Visit us",
      value: "K-8, Bawana Industrial Area, Sector 3, Bawana",
      href: "https://www.google.com/maps/search/?api=1&query=K-8%2C%20Bawana%20Industrial%20Area%2C%20Sector%203%2C%20Bawana",
      detail: "JR Compliance, Delhi, India.",
      icon: "/images/contact/location.svg",
    },
  ],
  enquiry: {
    eyebrow: "Start a conversation",
    title: "A direct route to the right compliance support.",
    description:
      "For a detailed requirement, contact our team by phone or email and we will guide you to the appropriate specialist.",
    topics: ["Technical approvals", "Corporate services", "Global compliance"],
    directCta: { label: "Email our team", href: "mailto:support@jrcompliance.com" },
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
  closingCta: {
    title: "Take the Next Step Towards Success",
    description:
      "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
    cta: { label: "Contact the team", href: "mailto:support@jrcompliance.com" },
  },
};
