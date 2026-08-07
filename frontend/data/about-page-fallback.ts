import { fallbackHomepage } from "@/data/homepage-fallback";
import type { AboutPageContent } from "@/lib/types";

/**
 * Design-stage About page source. Copy is normalized from the visible legacy
 * About Us page and remains the safe fallback until `about-page` is published
 * in Strapi.
 */
export const fallbackAboutPage: AboutPageContent = {
  site: fallbackHomepage.site,
  navigation: fallbackHomepage.navigation,
  footer: fallbackHomepage.footer,
  seo: {
    title: "About Us | JR Compliance",
    description:
      "Since 2013, JR Compliance has been providing 360-degree compliance services to startups, firms and establishments with the motive to make compliance services unchallenging for everyone.",
  },
  hero: {
    eyebrow: "About JR Compliance",
    title: "Your #1 Partner for 360° Compliance Solutions",
    description:
      "As the number one choice for compliance, we've partnered with 1,000+ leading brands and delivered over a decade of exceptional service.",
    image: "/images/about/team-hero.webp",
    imageAlt: "JR Compliance team",
    cta: { label: "Meet our team", href: "#team" },
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
    values: [
      {
        title: "Global Reach",
        description:
          "We made our mission possible to make our services accessible to reach clients on a global level.",
        image: "/images/about/mantra/global.webp",
      },
      {
        title: "Tailored Industry Solutions",
        description:
          "We at JR Compliance believe in providing a personalised approach addressing each client's unique challenges.",
        image: "/images/about/mantra/tailored.webp",
      },
      {
        title: "Time-Efficient",
        description:
          "Adhering to multiple compliance regulations is very time-consuming; we reduce this time by simplifying the process.",
        image: "/images/about/mantra/time-efficient.webp",
      },
      {
        title: "Comprehensive Services",
        description: "We offer end-to-end solutions, modified according to your needs.",
        image: "/images/about/mantra/comprehensive.webp",
      },
      {
        title: "Commitment to Innovation",
        description:
          "We embrace ever-evolving technology and adapt to it, staying ahead of regulatory changes to make the process seamless.",
        image: "/images/about/mantra/innovation.webp",
      },
    ],
  },
  story: {
    eyebrow: "Our Story",
    title: "Our path to compliance",
    milestones: [
      {
        period: "2013–14",
        title: "Establishment Phase",
        description:
          "JR Compliance began its operations by conducting market research and forming global partnerships with Sennheiser and Kaon Media, demonstrating our expertise in streamlining compliance services for international clients.",
      },
      {
        period: "2015–16",
        title: "Diversifying into New Sectors",
        description:
          "We expanded our reach into the automotive and technology industries by partnering with Delphi, Valeo, Intertek, and SGS Group, expanding our compliance services to include product testing, automotive, and technology sectors.",
      },
      {
        period: "2016–17",
        title: "Embracing Digitalization and Global Expansion",
        description:
          "We adopted digital certifications for HTC and incorporated renowned brands such as Lenovo and Supermicro, strengthening our expertise in technology and venturing into the Chinese market.",
      },
      {
        period: "2018–19",
        title: "Attracting Global Leaders",
        description:
          "Our clients grew to include Dell, Decathlon, and Vist Group, diversifying our portfolio to include sports technology by certifying Smart Cricket bat sensors used in the ICC World Cup.",
      },
      {
        period: "2020–21",
        title: "Forming Alliances with Industry Titans",
        description:
          "We forged partnerships with Milton, Nykaa, and Softbank Robotics to manage compliance in a variety of industries, including homeware, e-commerce, and robotics, thereby solidifying our international reputation.",
      },
      {
        period: "2022",
        title: "Recognized by Industry Powerhouses",
        description:
          "Bombay Dyeing and Toray entrusted us with their certification requirements, highlighting our dominance in textiles and industrial products while also continuing our tradition of dependable compliance services on a global scale.",
      },
    ],
  },
  reasons: {
    eyebrow: "Why partner with us?",
    title: "Expert guidance, accountable delivery.",
    items: [
      {
        title: "Expertise and Experience",
        description:
          "With over 15 years in regulatory compliance, JR Compliance's experts provide industry-leading solutions.",
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
  team: {
    eyebrow: "Meet JRians",
    title: "Our compliance Sarathis.",
    description: "Our team of experts is always ready to guide you on your path to compliance.",
    image: "/images/about/team-hero.webp",
    imageAlt: "JR Compliance team",
    cta: { label: "Talk to our team", href: "/contact-us" },
    members: [
      {
        name: "Jai Kumar",
        role: "General Manager",
        image: "/images/about/team/jai-kumar.jpeg",
        profileHref: "https://www.linkedin.com/in/jai-choubey-0b924419b/",
      },
      {
        name: "Prashant Nayak",
        role: "Regulatory Affairs Specialist",
        image: "/images/about/team/prashant-nayak.jpeg",
        profileHref: "https://www.linkedin.com/in/prashant-nayak-824a39105/",
      },
      {
        name: "Avinash Sharma",
        role: "Digital Marketing Manager",
        image: "/images/about/team/avinash-sharma.jpeg",
        profileHref: "https://www.linkedin.com/in/avinash-sharma-59742b103/",
      },
      {
        name: "Ashish Singh Gusain",
        role: "Digital Marketing Executive",
        image: "/images/about/team/ashish-singh-gusain.jpeg",
        profileHref: "https://www.linkedin.com/in/ashish-gusain/",
      },
      {
        name: "Bhavika Chopra",
        role: "Operations Executive",
        image: "/images/about/team/bhavika-chopra.jpeg",
        profileHref: "https://www.linkedin.com/in/bhavika-chopra-40005825b/",
      },
      {
        name: "Gorakhnath Chaurasiya",
        role: "Graphic Designer",
        image: "/images/about/team/gorakhnath-chaurasiya.jpeg",
        profileHref: "https://www.linkedin.com/in/gorakh-nath-chaurasiyaasiya-91b51824b/",
      },
      {
        name: "Krishan Kumar",
        role: "Quality Analyst",
        image: "/images/about/team/krishan-kumar.jpeg",
        profileHref: "https://www.linkedin.com/in/krishan-kumar-59200b284/",
      },
      {
        name: "Lalit Gupta",
        role: "Vice President",
        image: "/images/about/team/lalit-gupta.jpeg",
        profileHref: "https://www.linkedin.com/in/lalit-gupta-52bbb313/",
      },
      {
        name: "Nancy Tiwari",
        role: "Project Co-ordinator",
        image: "/images/about/team/nancy-tiwari.jpeg",
        profileHref: "https://www.linkedin.com/in/nancy-tiwari/",
      },
      {
        name: "Muskan Aggarwal",
        role: "Operations Executive",
        image: "/images/about/team/muskan-aggarwal.jpeg",
        profileHref: "https://www.linkedin.com/in/muskan-aggarwal-872a311b8/",
      },
      {
        name: "Priyanka Thapliyal",
        role: "Project Manager",
        image: "/images/about/team/priyanka-thapliyal.jpeg",
        profileHref: "https://www.linkedin.com/in/priyanka-thapliyal-760621125/",
      },
      {
        name: "Shweta Sharma",
        role: "Corporate Compliance Manager",
        image: "/images/about/team/shweta-sharma.jpeg",
        profileHref: "https://www.linkedin.com/in/shweta-sharma-57190818/",
      },
      {
        name: "Siddharth Chaudhary",
        role: "Admin",
        image: "/images/about/team/siddharth-chaudhary.jpeg",
      },
      {
        name: "Umesh M.",
        role: "Business Development Specialist",
        image: "/images/about/team/umesh-m.jpeg",
        profileHref: "https://www.linkedin.com/in/umesh-mundotia-a399b213/",
      },
    ],
  },
  achievements: {
    eyebrow: "Achievements and Awards",
    title: "Progress measured in trusted outcomes.",
    items: [
      {
        title: "Dassault Rafale",
        description:
          "Proudly secured the prestigious BIS certification for the cutting-edge FLIR system camera installed in the iconic Dassault Rafale fighter jet.",
        image: "/images/about/achievements/rafale.svg",
      },
      {
        title: "Smart Cricket",
        description:
          "Pioneered compliance services for Smart Cricket, which provided bat sensors used in multiple ICC World Cup bats.",
        image: "/images/about/achievements/pioneer.svg",
      },
      {
        title: "National Brands",
        description: "Successfully provided services to 20+ national brands such as Asbill, Nykaa, and more.",
        image: "/images/about/achievements/nykaa.svg",
      },
      {
        title: "Decathlon",
        description:
          "Decathlon, the globally renowned sports equipment brand, trusted our compliance services to resolve their customs clearance issues effectively.",
        image: "/images/about/achievements/decathlon.svg",
      },
      {
        title: "Sennheiser",
        description:
          "Sennheiser entrusted us with over 100 new projects, reaffirming our longstanding partnership and expertise in handling complex compliance needs.",
        image: "/images/about/achievements/sennheiser.svg",
      },
    ],
  },
  closingCta: {
    title: "Take the next step toward success",
    description:
      "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
    cta: { label: "Contact Us", href: "/contact-us" },
  },
};
