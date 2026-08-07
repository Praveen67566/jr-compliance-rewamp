import { fallbackHomepage } from "@/data/homepage-fallback";
import type { CareersPageContent } from "@/lib/types";

/** Visible legacy Careers content, normalized for the typed Strapi fallback. */
export const fallbackCareersPage: CareersPageContent = {
  site: fallbackHomepage.site,
  navigation: fallbackHomepage.navigation,
  footer: fallbackHomepage.footer,
  seo: {
    title: "Work with the best compliance consultants | JR Compliance",
    description:
      "Join JR Compliance and help businesses move through compliance with confidence, accuracy, and care.",
  },
  hero: {
    eyebrow: "Careers at JR Compliance",
    title: "Join us and be a part of our compliance legacy",
    description:
      "Bring your curiosity, ownership, and expertise to a team making regulatory compliance clearer for businesses everywhere.",
    cta: { label: "View current openings", href: "#current-openings" },
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
    eyebrow: "Values",
    title: "The standards we bring to work, every day.",
    items: [
      {
        title: "Integrity and Transparency",
        description:
          "We maintain the highest ethical standards to secure honesty and clarity in every compliance process.",
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
    eyebrow: "Life at JR Compliance",
    title: "Learn, Grow and Succeed.",
    description: "",
    highlights: [],
    gallery: [
      { src: "/images/careers/gallery/culture-1.webp", alt: "JR Compliance team gathering" },
      { src: "/images/careers/gallery/culture-2.webp", alt: "JR Compliance colleagues together" },
      { src: "/images/careers/gallery/culture-3.webp", alt: "JR Compliance team activity" },
      { src: "/images/careers/gallery/culture-4.webp", alt: "JR Compliance workplace moment" },
      { src: "/images/careers/gallery/culture-5.webp", alt: "JR Compliance team celebration" },
      { src: "/images/careers/gallery/culture-6.webp", alt: "JR Compliance colleagues at work" },
      { src: "/images/careers/gallery/culture-7.webp", alt: "JR Compliance workplace culture" },
      { src: "/images/careers/gallery/culture-8.webp", alt: "JR Compliance team event" },
    ],
  },
  openings: {
    eyebrow: "Current Openings",
    title: "Find the role where you can make a difference.",
    description:
      "Explore the open roles below, then contact our team to express your interest in the position that fits you.",
    roles: [
      {
        title: "Operations – Corporate Compliance",
        department: "Corporate Compliance",
        location: "Delhi, India",
        employmentType: "On-site",
        summary:
          "Work on regulatory alignment, internal processes, and compliance operations. Be part of a team dedicated to maintaining integrity, precision, and structured corporate systems.",
        href: "/contact-us",
      },
      {
        title: "DevOps Engineer",
        department: "Development",
        location: "Delhi, India",
        employmentType: "On-site",
        summary:
          "Support seamless integration, automation, and system reliability in a collaborative tech-driven workspace. Join a team focused on innovation, efficiency, and operational excellence.",
        href: "/contact-us",
      },
      {
        title: "Financial Accountant",
        department: "Finance",
        location: "Delhi, India",
        employmentType: "On-site",
        summary:
          "Manage financial records, assist in budgeting, and support strategic planning in a compliance-focused organization offering a collaborative, growth-oriented environment.",
        href: "/contact-us",
      },
      {
        title: "Business Development Manager/Executive",
        department: "Business Development",
        location: "Delhi, India",
        employmentType: "On-site",
        summary:
          "Drive growth and partnerships in a fast-paced environment. Be part of strategic initiatives, client acquisition, and business expansion with a team that values innovation.",
        href: "/contact-us",
      },
      {
        title: "Chartered Accountant (CA)",
        department: "Finance",
        location: "Delhi, India",
        employmentType: "On-site",
        summary:
          "Join our expert finance team to oversee audits, compliance, and reporting. Contribute to critical financial decisions in a structured yet progressive corporate setup.",
        href: "/contact-us",
      },
    ],
  },
  benefits: {
    eyebrow: "Employee benefits",
    title: "A culture designed to support your best work.",
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
  testimonials: {
    eyebrow: "Employee Testimonials",
    title: "A team that grows together.",
    items: [
      {
        quote: "The working environment here is very good and the staff and owner are very supportive and I enjoy working here.",
        name: "Saurabh Sahi",
        role: "Cinematographer",
        image: "/images/careers/testimonials/saurabh-sahi.webp",
      },
      {
        quote: "JR Compliance is one of the finest workplaces I have worked at because of the perfect balance between work and fun.",
        name: "Shweta Sharma",
        role: "Compliance Manager",
        image: "/images/careers/testimonials/shweta-sharma.webp",
      },
      {
        quote: "Working in JR Compliance is like having a rollercoaster ride filled with ups and downs but you enjoy the hell out of the ride.",
        name: "Avinash Sharma",
        role: "Digital Marketing Manager",
        image: "/images/careers/testimonials/avinash-sharma.webp",
      },
      {
        quote: "Never seen such an amazing work environment like JR Compliance. JR Compliance is the name of satisfaction that leads to positivity and better performance.",
        name: "Gorakhnath Chaurasiya",
        role: "Graphic Designer",
        image: "/images/careers/testimonials/gorakhnath-chaurasiya.webp",
      },
      {
        quote: "A very positive working environment and level of respect, empathy, and overall understanding between colleagues is excellent.",
        name: "Arjita Pandey",
        role: "EPR Project Co-ordinator",
        image: "/images/careers/testimonials/arjita-pandey.webp",
      },
      {
        quote:
          "Amazing place to work! Good people, good atmosphere, positive vibe, productive environment, and friendly people to work with. Also, the management is very supportive and teaches everyone a lot of stuff.",
        name: "Anil Kumar",
        role: "Senior Business Advisor",
        image: "/images/careers/testimonials/anil-kumar.jpg",
      },
    ],
  },
  faqs: {
    eyebrow: "FAQ",
    title: "Questions about joining JR Compliance.",
    items: [
      {
        question: "What career opportunities are available at JR Compliance?",
        answer:
          "We offer a variety of job positions at JR Compliance in compliance consulting, legal advisory, corporate compliance operations, sales, and marketing. Explore our website to find the best fit for you.",
      },
      {
        question: "How can I apply for a job at JR Compliance?",
        answer:
          "You can browse our current job openings on our Careers Page, select the role that matches your skills, and submit your application online.",
      },
      {
        question: "Does JR Compliance offer internship opportunities?",
        answer:
          "Yes! We provide internships for students and fresh graduates in compliance research, business operations, and marketing. Keep an eye on our internship openings for opportunities.",
      },
      {
        question: "What is the work culture like at JR Compliance?",
        answer:
          "At JR Compliance, we foster a culture of collaboration, growth, and innovation. We believe in work-life balance, continuous learning, and creating an environment where every team member can thrive.",
      },
    ],
  },
  closingCta: {
    title: "Take the Next Step Towards Success",
    description:
      "Partner with Compliance Experts—Secure Your Business with Proven Solutions. Get in Touch Today!",
    cta: { label: "Contact Us", href: "/contact-us" },
  },
};
