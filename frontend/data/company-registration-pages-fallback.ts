import type {
  CompanyRegistrationPageData,
  Faq,
  RegistrationBreakdownGroup,
  RegistrationDetail,
} from "@/lib/types";

type DetailTuple = readonly [title: string, description: string];
type FaqTuple = readonly [question: string, answer: string];

type RegistrationPageSource = {
  slug: string;
  menuLabel: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  heroDescription: string;
  overview: string | readonly string[];
  challenges: readonly DetailTuple[];
  advantages: readonly DetailTuple[];
  process: readonly DetailTuple[];
  whyChoose: readonly DetailTuple[];
  eligibility: readonly string[];
  documents: readonly string[];
  audiences: readonly string[];
  faqs: readonly FaqTuple[];
};

const details = (items: readonly DetailTuple[]): RegistrationDetail[] =>
  items.map(([title, description]) => ({ title, description }));

const faqItems = (items: readonly FaqTuple[]): Faq[] =>
  items.map(([question, answer]) => ({ question, answer }));

const breakdownGroups = (source: RegistrationPageSource): RegistrationBreakdownGroup[] => [
  { title: "Eligibility", items: [...source.eligibility] },
  { title: "Documents", items: [...source.documents] },
  { title: "Who Needs It", items: [...source.audiences] },
];

const registrationPage = (source: RegistrationPageSource): CompanyRegistrationPageData => ({
  slug: source.slug,
  menuLabel: source.menuLabel,
  seo: {
    title: source.seoTitle,
    description: source.seoDescription,
  },
  hero: {
    eyebrow: "Company Registration",
    title: source.title,
    description: source.heroDescription,
    cta: { label: "Talk to an expert", href: "/contact-us" },
  },
  overview: {
    eyebrow: "Service Overview",
    title: `A clear route to ${source.menuLabel.toLowerCase()}`,
    paragraphs: typeof source.overview === "string" ? [source.overview] : [...source.overview],
  },
  challenges: {
    eyebrow: "What to plan for",
    title: `Challenges of ${source.menuLabel}`,
    items: details(source.challenges),
  },
  advantages: {
    eyebrow: "Business advantages",
    title: `Advantages of ${source.menuLabel}`,
    items: details(source.advantages),
  },
  process: {
    eyebrow: "Service Process",
    title: "From first review to registration",
    items: details(source.process),
  },
  whyChoose: {
    eyebrow: "Why JR Compliance",
    title: "Expert guidance, accountable delivery",
    items: details(source.whyChoose),
  },
  breakdown: {
    eyebrow: "Service Breakdown",
    title: "Know what the application needs",
    groups: breakdownGroups(source),
  },
  faqs: {
    eyebrow: "Need clarity?",
    title: "Frequently asked questions",
    items: faqItems(source.faqs),
  },
  closingCta: {
    title: "Take the next step toward success",
    description:
      "Partner with compliance experts and move your registration forward with a clear, documented process.",
    cta: { label: "Contact Us", href: "/contact-us" },
  },
});

export const fallbackCompanyRegistrationPages: CompanyRegistrationPageData[] = [
  registrationPage({
    slug: "sole-proprietorship-registration",
    menuLabel: "Sole Proprietorship",
    title: "Sole Proprietorship",
    seoTitle: "Sole Proprietorship Registration | Sole Proprietorship Company/Firm registration",
    seoDescription:
      "Want to register your sole proprietorship firm? Get your sole proprietorship company registration today from best company registration consultants.",
    heroDescription:
      "Looking to establish your business with ease? Sole proprietorship registration is the simplest and most cost-effective way to start your entrepreneurial journey. At JR Compliance, we simplify the entire process, ensuring compliance and accuracy while providing expert guidance to meet your unique needs. Get started today with sole proprietorship consultants and take the first step toward building your dream business.",
    overview:
      "Sole proprietorship is a straightforward business structure which does not need complex compliance requirements where the proprietorship firm and the proprietor are considered as one and the same. It enables owners to run their businesses without the interference of third parties and can enjoy full revenue for personal or business use. Hence, it is easier to run a sole proprietorship than a big corporation.",
    challenges: [
      [
        "Limited Liability Protection",
        "Sole traders are required by law to account for all business liabilities from start to closure. When a business borrows or enters legal proceedings, the owner’s personal assets may be exposed.",
      ],
      [
        "Difficulty Raising Capital",
        "Securing credit as a sole trader can be difficult because many lenders prefer other business structures, which can restrict financing for expansion.",
      ],
      [
        "Increased Workload and Stress",
        "Managing every aspect of a business alone can lead to burnout. Sole proprietors often juggle several roles, affecting productivity and well-being.",
      ],
      [
        "Limited Longevity and Continuity",
        "The business is directly connected to the owner’s life and participation, so continuity can be affected if the proprietor retires, sells, or passes away.",
      ],
    ],
    advantages: [
      ["Full Control", "The proprietor makes all economic and management decisions and can adapt quickly to market changes."],
      [
        "Simplified Tax Process",
        "Business revenue is treated as personal income, making taxation comparatively straightforward for the owner.",
      ],
      ["Low Startup Costs", "A sole proprietorship generally requires comparatively little capital to establish and operate."],
      [
        "Direct Profit Retention",
        "Profits belong to the owner, who can reinvest them in the business or use them personally without consulting partners.",
      ],
    ],
    process: [
      [
        "Submit KYC Documents",
        "Provide Aadhaar, PAN and address proof, together with utility proof for the principal place of business and an owner NOC where required.",
      ],
      [
        "Choose a Unique Business Name",
        "Select a legally valid, distinctive name that does not conflict with an existing trademark or business identity.",
      ],
      [
        "Register for MSME/Udyam",
        "Complete the applicable MSME registration to access eligible benefits and support the business banking process.",
      ],
      [
        "Get GST Registration",
        "Apply through the GST portal when the business meets the applicable registration threshold or other conditions.",
      ],
      [
        "Apply for Shops & Establishments Registration",
        "Complete the relevant state registration with the Labour Department for the business establishment.",
      ],
      [
        "Obtain Industry-Specific Licences",
        "Secure any additional approval the activity needs, such as an IEC for import and export or FSSAI registration for a food business.",
      ],
    ],
    whyChoose: [
      ["Sole Proprietorship Expertise", "Specialised guidance helps establish the firm with fewer procedural delays."],
      ["Compliance Support", "The team helps identify and complete the regulatory steps needed to operate legally."],
      ["Business-Specific Solutions", "Guidance is adjusted to the proprietor’s activity, stage, and growth plans."],
      ["Ongoing Advice", "Continued support is available for compliance, financing questions, and operational changes."],
    ],
    eligibility: [
      "The proprietor must be at least 18 years old.",
      "The proprietor must lawfully reside in the country where the business operates.",
      "The selected business structure and registrations must suit the proposed activity.",
      "The proprietor must commit to applicable local and sector regulations.",
    ],
    documents: [
      "Identity proof such as Aadhaar, PAN, or voter ID.",
      "Address proof for the proprietor and business location.",
      "Bank statement or cancelled cheque for financial verification.",
      "Business-name proof or declaration where applicable.",
    ],
    audiences: [
      "Aspiring entrepreneurs starting an owner-managed business.",
      "Freelancers and independent consultants.",
      "Home-based business owners.",
      "Professionals providing services directly to clients.",
    ],
    faqs: [
      [
        "What does the term Sole Proprietorship mean?",
        "It is an economical business form controlled by one owner. The proprietor runs the business, receives its profits, and bears its losses and liabilities.",
      ],
      [
        "What procedures apply when registering a Sole Proprietorship?",
        "Choose an appropriate business name, complete the registrations and permissions relevant to the activity, and keep the records required by applicable regulations.",
      ],
      [
        "What benefits do you get as a Sole Proprietor?",
        "The structure offers direct owner control, low establishment costs, comparatively simple administration, and only the licences or registrations relevant to the activity.",
      ],
      [
        "What are the risks of being a Sole Proprietor?",
        "The main risk is unlimited personal liability: business debt or legal claims may put the owner’s personal assets at risk.",
      ],
      [
        "Can a Sole Proprietor employ people?",
        "Yes. The proprietor must comply with employment law and the payroll, tax, and employer-registration obligations that apply.",
      ],
    ],
  }),
  registrationPage({
    slug: "nidhi-company-registration",
    menuLabel: "Nidhi Company",
    title: "Nidhi Company",
    seoTitle: "NIDHI Company Registration - Nidhi Company Registration Online Process",
    seoDescription:
      "Looking for the finest Nidhi company consultant? Get your Nidhi Company Registration today from best company registration consultants.",
    heroDescription:
      "Registering a Nidhi Company lets you create a trusted, community-based savings and lending group. At JR Compliance, we make the process easy and accessible, handling every step with care so you can focus on growing your network.",
    overview:
      "A Nidhi Company is a community-driven financial organization in which members can save and borrow within the organization. It is registered under the Companies Act, 2013 and operates for the mutual benefit of its members. JR Compliance handles the registration and documentation work to make the setup process clear and manageable.",
    challenges: [
      ["Registration Documentation", "The incorporation forms, member details, constitutional documents, and declarations must be complete and consistent."],
      ["Compliance Standards", "The company must understand the Companies Act and the rules that apply to member deposits and lending."],
      ["Transparent Member Services", "Member transactions and records need clear controls so savings and lending remain transparent."],
      ["Financial Reporting", "Ongoing accounts, audits, returns, and member records require structured reporting after incorporation."],
    ],
    advantages: [
      ["Trusted Financial Community", "A registered structure gives members a defined framework for mutual savings and lending."],
      ["Guided Registration", "Dedicated support makes the incorporation and documentation process easier to follow."],
      ["Member-Focused Security", "Governance and record-keeping requirements provide a more structured member environment."],
      ["Accessible Financial Model", "The mutual-benefit structure is designed around the financial needs of registered members."],
    ],
    process: [
      ["Procure DSC and DIN", "Obtain Digital Signature Certificates and Director Identification Numbers for the proposed directors."],
      ["Company Name Approval", "Submit a suitable Nidhi Company name through the Ministry of Corporate Affairs process."],
      ["Prepare Incorporation Forms", "Prepare the incorporation filing with the memorandum, articles, company objective, and supporting declarations."],
      ["Complete Incorporation", "File the application and obtain the certificate of incorporation, PAN, and TAN after approval."],
      ["Post-Registration Compliance", "Set up the member, accounting, and statutory records required after incorporation."],
      ["Regular Compliance Updates", "Maintain scheduled audits, reporting, and filings as the company and its membership develop."],
    ],
    whyChoose: [
      ["Complete Registration Support", "Support runs from initial planning through incorporation and the first compliance steps."],
      ["Compliance Knowledge", "The team helps translate the applicable company and Nidhi rules into a workable application."],
      ["Transparent Delivery", "Clear communication keeps the documents, responsibilities, and status visible throughout the process."],
      ["Experienced Guidance", "Specialists help manage the procedural and documentation needs of the proposed Nidhi Company."],
    ],
    eligibility: [
      "The proposed company must have a mutual-benefit and member-focused purpose.",
      "Promoters must arrange the required directors, members, and capital for incorporation.",
      "The company must comply with the Companies Act and applicable Nidhi rules.",
      "The name and objects must be accepted through the MCA incorporation process.",
    ],
    documents: [
      "Memorandum and Articles of Association.",
      "PAN, Aadhaar, photographs, and address proof for directors and subscribers.",
      "Registered-office proof and owner NOC where applicable.",
      "Shareholder and member information.",
      "Capital and net-worth records required for the application.",
    ],
    audiences: [
      "Community groups building a formal member savings network.",
      "Member associations focused on mutual financial support.",
      "Groups establishing a structured deposit-and-lending organization.",
      "Promoters prepared to maintain member and financial compliance.",
    ],
    faqs: [
      ["What capital is required for a Nidhi Company?", "The applicable capital and member requirements should be confirmed against the current Nidhi Rules before filing."],
      ["How long does registration take?", "The legacy process estimate is about 15–20 days when documents are complete, subject to MCA review and queries."],
      ["Can a Nidhi Company serve non-members?", "No. Its deposit and lending activity is restricted to registered members under the applicable framework."],
      ["Is a Nidhi Company directly regulated by RBI?", "Nidhi Companies are governed primarily through the Companies Act, MCA, and the Nidhi Rules; specific financial rules still apply."],
      ["What ongoing compliance applies?", "The company must maintain member records, accounts, audits, statutory registers, and the returns required by current law."],
    ],
  }),
  registrationPage({
    slug: "ngo-registration",
    menuLabel: "NGO Registration",
    title: "NGO Registration",
    seoTitle: "NGO Registration | NGO Registration in Delhi - Register a Trust, Society, or Non-profit Company",
    seoDescription:
      "Want to register a Trust, Society, or Non-profit Company (NGO)? Click to learn more about the NGO Registration Process, the documents required, and benefits. Get your NGO Registration in Delhi from the best consultants.",
    heroDescription:
      "We strive to move forward in a collective effort towards your goal to work towards social impact initiatives. Our experts invest their skills and sustained efforts in providing you complete support as you take a step further towards your NGO registration online.",
    overview:
      "Non-Government Organizations (NGO) or Non-Profit Organizations (NPO) are organizations, groups, initiatives, or projects started by individuals, activists, or social entrepreneurs to make a social impact. They operate independently of government. It is important to determine under which act or law the NGO will be registered.",
    challenges: [
      ["Funding Restrictions", "Access to grants and donations can depend on the legal structure, registrations, reporting, and donor requirements."],
      ["Legal Requirements", "Trusts, societies, and Section 8 companies follow different laws, authorities, and incorporation documents."],
      ["Domestic Regulations", "Tax, fundraising, governance, and state-specific rules must be understood before selecting a structure."],
      ["Documentation", "Founders, objectives, office proof, and constitutional documents must be prepared accurately for the chosen route."],
    ],
    advantages: [
      ["Access to Funds and Support", "Legal registration can make the organization eligible to pursue suitable grants, donations, and institutional support."],
      ["Tax Exemption Pathways", "Eligible organizations can apply separately for the tax registrations and donor benefits available under current law."],
      ["Access to Assets and Resources", "The registered entity can hold resources and enter formal arrangements for its stated objectives."],
      ["Organizational Bank Account", "Registration supports opening and operating a bank account in the organization’s name."],
    ],
    process: [
      ["Requirement Analysis", "Select the appropriate Trust, Society, or Section 8 Company structure for the founders and objectives."],
      ["Documentation Preparation", "Prepare the constitutional document, founder KYC, office proof, and other structure-specific records."],
      ["Name Approval", "Check and reserve or approve the proposed name through the authority relevant to the chosen structure."],
      ["Application Filing", "File with the Registrar of Societies, Charity Commissioner, MCA, or other competent authority."],
      ["Verification and Clarifications", "Respond to authority checks, document observations, or clarification requests."],
      ["Final Certification", "Receive the registration certificate or incorporation documents after the application is approved."],
    ],
    whyChoose: [
      ["Documentation Assistance", "Specialists help prepare and review the records needed for the selected NGO structure."],
      ["End-to-End Support", "The registration is tracked from structure selection through authority review and certification."],
      ["Structure Guidance", "The team explains the practical differences between a Trust, Society, and Section 8 Company."],
      ["Procedural Accuracy", "Checks before filing reduce avoidable rejection, delay, and incomplete submissions."],
    ],
    eligibility: [
      "At least two founders are generally needed; exact member requirements depend on the structure.",
      "The organization must have a defined non-profit or charitable objective.",
      "Resident and foreign participation must follow the rules for the selected structure.",
      "The proposed entity must comply with the relevant central and state law.",
    ],
    documents: [
      "Memorandum and Articles for a Section 8 Company, where selected.",
      "Trust deed or society Memorandum and Rules, depending on the structure.",
      "Identity and address proof for founders, directors, trustees, or members.",
      "Registered-office proof and owner NOC where applicable.",
    ],
    audiences: [
      "Charitable organizations and social-impact initiatives.",
      "Welfare groups planning a formal non-profit entity.",
      "Advocacy, education, health, or community organizations.",
      "Groups preparing to seek institutional funding or tax registrations.",
    ],
    faqs: [
      ["What is CSR?", "Corporate Social Responsibility is a form of business self-regulation intended to contribute to social, environmental, or community goals."],
      ["Who can be an NGO member?", "Eligibility depends on the chosen structure. Individuals, eligible entities, residents, and in some cases foreign nationals may participate subject to current law."],
      ["What is an 80G registration?", "It is a separate income-tax approval through which eligible donations may receive the tax treatment allowed under current law."],
      ["What is a 12A registration?", "It is a separate tax registration through which an eligible non-profit can seek exemption for qualifying income, subject to compliance."],
      ["Who operates an NGO?", "Its trustees, members, directors, employees, and volunteers work under the entity’s governing document toward its social objectives."],
    ],
  }),
  registrationPage({
    slug: "section-8-company-registration",
    menuLabel: "Section 8 Company",
    title: "Section 8 Company Registration",
    seoTitle: "Section 8 Company Certification Consultants in Delhi",
    seoDescription:
      "Professional Section 8 Company Certification Consultants in Delhi and Section 8 Company Registration Consultants offer expert guidance in forming and maintaining compliance for non-profit organizations under the Indian Companies Act, 2013",
    heroDescription:
      "Section 8 company registration is the legal process of forming a Non-Profit Organisation (NPO) or Non-Government Organisation (NGO) in India. The main focus of the Section 8 company is to promote and carry out charitable activities to bring about change in society. Hence, Section 8 companies are required to comply with the regulations of the Companies Act, 2013.",
    overview:
      "At JR Compliance, our specialized professionals offer all-round services to ensure smooth company registration, legal compliance with all the formalities, and assistance during the incorporation period. We help you pursue your social and charitable objectives for social impact initiatives.",
    challenges: [
      ["Licence and Approvals", "The incorporation and Section 8 licence require coordinated MCA forms, declarations, and authority review."],
      ["Regulatory Standards", "The objects, use of income, governance, and non-distribution requirements must remain compliant."],
      ["Documentation and Legal Process", "The memorandum, articles, director records, and office documents must accurately express the non-profit purpose."],
      ["Ongoing Compliance", "Annual filings, accounts, meetings, tax registrations, and licence conditions continue after incorporation."],
    ],
    advantages: [
      ["Professional Legal Guidance", "Specialist review helps align the proposed objects and structure with Section 8 requirements."],
      ["Simplified Documentation", "The team coordinates incorporation records, declarations, and supporting documents."],
      ["Coordinated Approvals", "A prepared filing and timely responses help the incorporation and licence review move efficiently."],
      ["Ongoing Compliance Support", "Post-incorporation guidance helps the company maintain corporate and non-profit obligations."],
    ],
    process: [
      ["Initial Consultation", "Review the charitable objectives, proposed directors, office, and preferred name."],
      ["DSC and DIN", "Arrange Digital Signature Certificates and the director identification details needed for filing."],
      ["Name Reservation", "Submit a compliant name that reflects the non-profit objects for approval."],
      ["MOA and AOA", "Draft the Memorandum and Articles of Association with suitable charitable objects and governance clauses."],
      ["Incorporation Filing", "Submit the incorporation and Section 8 licence documents through the MCA process."],
      ["Certificate and Licence", "Receive the Certificate of Incorporation and Section 8 licence after approval."],
    ],
    whyChoose: [
      ["Experienced Professionals", "The team has experience in company incorporation and compliance documentation."],
      ["Tailored Service", "The structure and objects are developed around the organization’s goals and proposed activities."],
      ["Transparent Pricing", "The work and expected charges are explained before the filing moves forward."],
      ["Continuous Support", "Guidance remains available during registration and for the compliance that follows."],
    ],
    eligibility: [
      "At least two directors are needed for a private-company structure.",
      "At least one director must satisfy the current resident-director requirement.",
      "The proposed objects must be charitable, social, educational, or otherwise eligible under Section 8.",
      "Profits and income must be applied to the objects rather than distributed as dividends.",
    ],
    documents: [
      "Memorandum and Articles of Association.",
      "PAN, identity, address proof, and photographs for directors and subscribers.",
      "Registered-office proof and owner NOC where applicable.",
      "Declarations, projected activities, and other Section 8 licence records.",
    ],
    audiences: [
      "Non-government and non-profit organizations.",
      "Charitable and social-welfare initiatives.",
      "Educational, research, environmental, or cultural institutions.",
      "Groups seeking a corporate non-profit structure.",
    ],
    faqs: [
      ["What is a Section 8 Company?", "It is a company incorporated for eligible non-profit objects whose income is applied to those objects rather than distributed as dividends."],
      ["Can a foreign national become a director?", "Yes, subject to current incorporation and foreign-participation rules and the requirement for at least one resident director."],
      ["Is minimum capital required?", "The legacy page states that no minimum paid-up capital is prescribed; current incorporation requirements should be checked before filing."],
      ["Can a Section 8 Company seek tax benefits?", "It can apply separately for registrations such as 12A and 80G if it meets the applicable income-tax requirements."],
      ["How long does registration take?", "The legacy estimate is around 20–30 days, subject to document readiness and MCA review."],
    ],
  }),
  registrationPage({
    slug: "partnership-firm-registration",
    menuLabel: "Partnership Firm",
    title: "Partnership Firm",
    seoTitle: "Partnership Firm Registration- All You Need to Know | Partnership Firm",
    seoDescription:
      "JR Compliance- finest partnership firm registration service provider. Get your partnership firm registration today from best firm registration consultants. Click to know benefits, documents required, and registration process.",
    heroDescription:
      "A partnership firm is a system of management and organization of a business, where two or more persons manage and carry out that business together. It encourages the sharing of duties, resources, and profits, which makes it effective in operations as well.",
    overview:
      "JR Compliance offers comprehensive solutions for the registration of partnership firms. Our team assists in the preparation of partnership deeds, obtaining licences, and complying with the legal requirements. We streamline the process and make registering a partnership easier for our clients.",
    challenges: [
      ["Legal Documentation", "The partnership deed must clearly record capital, profit sharing, management, admission, exit, and dispute terms."],
      ["Regulatory Compliance", "Registration, tax, local licences, and sector obligations can vary with the business and its location."],
      ["Profit-Distribution Conflicts", "Unclear commercial terms can create disagreement over profits, drawings, responsibilities, and reinvestment."],
      ["Personal Liability", "In a traditional partnership, business obligations may expose partners’ personal assets."],
    ],
    advantages: [
      ["Accessible Registration", "A partnership can be established through a defined deed and the registrations applicable to its state and activity."],
      ["Expert Guidance", "Professional review helps the partners understand documentation, liability, and compliance."],
      ["Customized Agreement", "The deed can be drafted around the partners’ roles, capital, profit share, and decision-making process."],
      ["Ongoing Support", "Guidance remains available for registrations, deed changes, tax records, and continuing compliance."],
    ],
    process: [
      ["Choose the Firm Name", "Select a suitable name that does not conflict with prohibited or existing business identities."],
      ["Partner Consultation", "Confirm the partners, activity, capital, profit share, responsibilities, and registered office."],
      ["Draft the Partnership Deed", "Prepare the commercial and governance clauses agreed by all partners."],
      ["Submit the Application", "File the deed and required documents with the relevant registrar where registration is pursued."],
      ["Application Follow-Up", "Respond to document observations and complete any registration formalities requested by the authority."],
      ["Post-Registration Support", "Complete tax, bank, licence, and continuing record requirements for the operating firm."],
    ],
    whyChoose: [
      ["Registration Knowledge", "The team helps structure the deed and registration while identifying legal exposure."],
      ["Partner-Specific Solutions", "The work is shaped around the needs of the business and the agreement among partners."],
      ["Transparent Pricing", "The scope and charges are communicated without hidden additions."],
      ["Continuing Assistance", "Support helps the partners manage changes and continuing compliance after registration."],
    ],
    eligibility: [
      "At least two competent partners are required.",
      "Each partner entering the agreement must generally be at least 18 years old.",
      "The partnership deed must be accepted and signed by all partners.",
      "The firm must meet the registration and licence rules for its state and activity.",
    ],
    documents: [
      "Executed partnership deed.",
      "PAN and identity proof for every partner.",
      "Partner and registered-office address proof.",
      "Owner NOC or lease document where applicable.",
      "Bank-account and firm PAN records as required after formation.",
    ],
    audiences: [
      "Small-business owners joining resources and skills.",
      "Startups founded by two or more partners.",
      "Family-run businesses.",
      "Professionals collaborating through a shared firm.",
    ],
    faqs: [
      ["What is a Partnership Firm?", "It is a business operated by two or more partners under an agreement that records their rights, duties, capital, and profit share."],
      ["How can I register my Partnership Firm?", "Prepare and execute the deed, collect partner and office records, and file through the process applicable in the relevant state."],
      ["Can a Partnership convert to another structure?", "Yes. Subject to law and documentation, a firm may move to a structure such as an LLP or private limited company."],
      ["How is a Partnership Firm taxed?", "Tax rates and partner treatment change over time; the firm should obtain current tax advice and maintain the required returns and accounts."],
      ["How can a Partnership be dissolved?", "Dissolution can follow partner agreement, the deed, an agreed end date, insolvency, or a legal order, together with settlement and closure filings."],
    ],
  }),
  registrationPage({
    slug: "producer-company-registration",
    menuLabel: "Producer Company",
    title: "Producer Company",
    seoTitle: "Producer Company Registration | Online Registration Process | Producer company Documents",
    seoDescription:
      "Time to complete Producer Company Registration easily. Get your Producer Company Registration from best company registration consultants. Click here to know all about the producer company incorporation procedure.",
    heroDescription:
      "A Producer Company is a unique legal entity in India which enables a group of producers, such as farmers, to collaborate in order to enhance their economic conditions. It supports collective earning and access to markets for members, opening opportunities to grow within their professions and occupations.",
    overview:
      "Producer Companies make it possible for several producers to come together for better economic welfare. This organization enhances production, marketing, and selling processes while reducing risks to members engaged in industries such as agriculture and dairy.",
    challenges: [
      ["Legal Documentation", "The producer objects, member eligibility, incorporation documents, and governance clauses require careful preparation."],
      ["Limited Access to Capital", "Producer groups can face difficulty arranging the initial resources and finance needed to scale operations."],
      ["Lack of Awareness", "Members may need guidance on the corporate structure, responsibilities, benefits, and continuing compliance."],
      ["Member Coordination", "Collective decisions, procurement, production, marketing, and benefit distribution need a clear framework."],
    ],
    advantages: [
      ["Economies of Scale", "Members can combine production, procurement, infrastructure, and marketing to improve efficiency."],
      ["Risk Diversification", "Collective activity can distribute commercial risk across a broader member and product base."],
      ["Enhanced Market Reach", "A formal company can negotiate, brand, process, and market member produce at greater scale."],
      ["Legal and Financial Protection", "The corporate structure provides defined governance and limited-liability protection subject to law."],
    ],
    process: [
      ["Initial Consultation", "Review the producer activity, proposed members, directors, capital, objects, and office."],
      ["Documentation Preparation", "Collect member and director KYC and draft the memorandum, articles, and declarations."],
      ["MCA Registration", "Reserve the name and submit the incorporation application through the Ministry of Corporate Affairs."],
      ["Member Integration", "Record the eligible producer members, shareholding, governance, and internal operating arrangements."],
      ["Company Incorporation", "Receive the Certificate of Incorporation, PAN, and TAN after the compliant filing is approved."],
      ["Ongoing Support", "Maintain statutory registers, accounts, member records, annual filings, and activity-specific compliance."],
    ],
    whyChoose: [
      ["Legal-Structure Knowledge", "The team understands the incorporation framework used for Producer Companies."],
      ["Step-by-Step Guidance", "Support covers member records, constitutional documents, filing, and initial setup."],
      ["Member Protection Focus", "The structure is documented to support financial and legal clarity for members."],
      ["Collective-Growth Experience", "Guidance helps producer groups organize their shared commercial objectives."],
    ],
    eligibility: [
      "The member composition must meet the current producer-company requirements.",
      "Proposed members must qualify as producers or eligible producer institutions.",
      "The company must appoint the required number of directors.",
      "Its name, objects, and capital must comply with the Companies Act framework.",
    ],
    documents: [
      "Memorandum and Articles of Association.",
      "Identity and address proof for directors and subscribers.",
      "Registered-office proof and owner NOC where applicable.",
      "KYC and producer-status records for the required members.",
      "Bank and capital records needed after incorporation.",
    ],
    audiences: [
      "Farmers and agricultural producer groups.",
      "Artisans, craftspeople, and primary producers.",
      "Small manufacturers organized around eligible produce.",
      "Dairy, fisheries, horticulture, or other producer collectives.",
    ],
    faqs: [
      ["What is a Producer Company?", "It is a corporate structure through which eligible producers collaborate on production, procurement, processing, marketing, and related mutual benefits."],
      ["Who can form a Producer Company?", "Eligible individual producers and producer institutions can form one in the combinations permitted by current company law."],
      ["How is it registered?", "The promoters arrange members and directors, prepare KYC and constitutional documents, reserve a name, and file incorporation through MCA."],
      ["What are the benefits of joining?", "Members can pool resources, improve bargaining and market access, develop shared infrastructure, and operate through a recognized entity."],
      ["What legal requirements apply?", "Member, director, capital, governance, accounts, annual filing, and activity-specific requirements should be confirmed before filing."],
    ],
  }),
  registrationPage({
    slug: "indian-subsidiary",
    menuLabel: "Indian Subsidiary",
    title: "Indian Subsidiary",
    seoTitle: "Indian Subsidiary | Company Registration in India",
    seoDescription:
      "Set up an Indian subsidiary with guidance for MCA incorporation, foreign parent documents, FEMA compliance, tax registrations, and local operations.",
    heroDescription:
      "An Indian Subsidiary allows foreign businesses to operate in India with legal rights and local market access. It can offer full foreign ownership in permitted sectors under the applicable route while establishing brand presence and credibility. JR Compliance guides the incorporation and compliance process for businesses planning an Indian subsidiary.",
    overview:
      "Setting up an Indian subsidiary company is a strategic step for foreign companies looking to expand into one of the world’s fastest-growing economies. It supports integration into the Indian business landscape while allowing operational control, potential tax advantages, and ownership in non-restricted sectors. Our compliance experts coordinate RBI, MCA, and FEMA requirements.",
    challenges: [
      ["Indian Regulatory Framework", "Companies Act, FEMA, FDI, tax, and sector rules must be assessed together before incorporation."],
      ["Sectoral Caps and Restrictions", "Foreign ownership and approval routes vary by sector, investor profile, and proposed activity."],
      ["Legalized Documentation", "Foreign parent and director documents may require notarization, apostille, translation, and precise filing formats."],
      ["Bank and Tax Setup", "Account opening, capital remittance, PAN, TAN, GST, and reporting can add dependencies after incorporation."],
    ],
    advantages: [
      ["Foreign Ownership", "Full foreign ownership may be available in sectors permitted under the applicable automatic or approval route."],
      ["Indian Market Access", "A local entity can contract, hire, invoice, open accounts, and build an operating presence in India."],
      ["Separate Legal Identity", "The subsidiary operates as an Indian company distinct from its foreign parent and shareholders."],
      ["Tax and Regulatory Structure", "A local corporate structure provides a defined route for tax, reporting, investment, and operations."],
    ],
    process: [
      ["Name Reservation", "Reserve an available company name through the MCA process."],
      ["Document Collection", "Collect and legalize parent-company, director, shareholder, and registered-office documents."],
      ["DIN and DSC", "Arrange the director identification and digital signatures needed for incorporation."],
      ["SPICe+ Incorporation", "File the incorporation forms with the memorandum, articles, declarations, and foreign-subscriber records."],
      ["PAN, TAN, and GST", "Complete the tax registrations applicable to the approved company and its activities."],
      ["Bank Account Opening", "Open the corporate account and complete the applicable capital-remittance and reporting steps."],
    ],
    whyChoose: [
      ["Business-Specific Planning", "The proposed activity and investment route are reviewed before documents are prepared."],
      ["Document and Approval Support", "The team coordinates legalized foreign documents and the MCA incorporation process."],
      ["End-to-End Assistance", "Support covers incorporation, tax setup, banking dependencies, and initial reporting."],
      ["Established Compliance Experience", "JR Compliance has supported businesses across Indian regulatory and certification pathways."],
    ],
    eligibility: [
      "A foreign parent entity must be lawfully incorporated in its home jurisdiction.",
      "The Indian company generally needs at least two directors, including one who meets the resident-director requirement.",
      "The proposed activity must be permitted under the applicable FDI route and sector rules.",
      "Foreign subscribers and directors must provide properly legalized records.",
    ],
    documents: [
      "Apostilled or legalized foreign parent incorporation documents.",
      "Board resolution authorizing the Indian subsidiary and investment.",
      "Notarized or apostilled identity and address proof for foreign directors and subscribers.",
      "Indian registered-office proof and owner NOC where applicable.",
      "Memorandum and Articles tailored to the approved Indian activity.",
    ],
    audiences: [
      "Foreign companies establishing an Indian operating entity.",
      "International entrepreneurs entering the Indian market.",
      "Technology and service businesses building a local team.",
      "Global brands planning Indian sales, manufacturing, or support operations.",
    ],
    faqs: [
      ["Can a foreigner own 100% of an Indian Subsidiary?", "Full foreign ownership is available in many sectors, subject to the applicable FDI route, sector caps, FEMA rules, and approvals."],
      ["How long does registration take?", "The legacy estimate is 15–20 working days after complete legalized documents, subject to MCA and other authority review."],
      ["Is an Indian director mandatory?", "At least one director must satisfy the resident-director requirement under current company law."],
      ["Can the company open a bank account before incorporation?", "The corporate account is normally opened after the Certificate of Incorporation, PAN, and related company records are available."],
      ["Are tax benefits available?", "Treatment depends on the activity, structure, applicable tax law, treaties, incentives, and eligibility; current tax advice is required."],
    ],
  }),
  registrationPage({
    slug: "private-limited-company-registration-consultant",
    menuLabel: "Pvt Ltd Company",
    title: "Private Limited Company",
    seoTitle: "Private Limited Company Registration Consultant in India",
    seoDescription:
      "Looking for a reliable Private Limited Company Registration Consultant in India? Our expert team includes top Private Limited Company Certification Consultants in India.",
    heroDescription:
      "A private limited company is a legal entity formed as a company limited by shares and operates separately from its owners. Limited liability helps protect the owners’ and managers’ personal assets from the company’s losses. It suits businesses that need a formal legal structure and limited liability without offering shares to the public market.",
    overview:
      "We focus on the formation and registration of private limited companies and provide continuing support to businesses using this legal structure. Our team assists through the incorporation process, helping address legal requirements and prepare the company for its business operations.",
    challenges: [
      ["Complex Procedures", "Private limited company formation involves several legal formalities, linked filings, and declarations."],
      ["Time-Consuming Documentation", "Collecting the required records and preparing accurate incorporation documents can take time."],
      ["Share-Transfer Restrictions", "A private company has statutory limits and restrictions around membership and share transfers."],
      ["Business Commencement", "The company must complete the applicable post-incorporation steps before or soon after starting business."],
    ],
    advantages: [
      ["Limited Liability", "Shareholders’ personal assets are generally separate from the debts and obligations of the company."],
      ["Increased Credibility", "A registered private company is commonly viewed as a formal, structured business entity."],
      ["Tax and Planning Options", "The corporate form provides defined accounting and tax treatment, subject to current law."],
      ["Access to Funding", "The company can issue shares privately and pursue finance from eligible shareholders, banks, or investors."],
    ],
    process: [
      ["Name Availability", "Check and reserve a unique, compliant company name through the MCA incorporation process."],
      ["Documentation", "Prepare KYC, registered-office records, the Memorandum, Articles, and supporting declarations."],
      ["Incorporation Filing", "Submit the linked incorporation forms and attachments to the Registrar of Companies."],
      ["Certificate, PAN, and TAN", "Receive the Certificate of Incorporation with tax identifiers and prepare to open the company account."],
      ["Post-Incorporation Compliance", "Complete the commencement, statutory register, auditor, meeting, and other applicable setup steps."],
      ["Ongoing Support", "Maintain annual returns, accounts, tax filings, and event-based company compliance."],
    ],
    whyChoose: [
      ["Company-Formation Expertise", "A dedicated team supports private limited incorporation and the legal records around it."],
      ["Efficient Coordination", "Document checks and a clear filing sequence help prevent avoidable delays."],
      ["Personalized Service", "The incorporation approach is aligned with the founders, ownership, activity, and growth plans."],
      ["Compliance Focus", "The team keeps the incorporation and first operational steps aligned with current legal requirements."],
    ],
    eligibility: [
      "At least two shareholders and two directors are generally required.",
      "At least one director must meet the resident-director requirement.",
      "The proposed name and objects must comply with the Companies Act and MCA rules.",
      "Subscribers and directors must provide complete KYC and consent records.",
    ],
    documents: [
      "Memorandum and Articles of Association.",
      "PAN, identity, address proof, and photographs for directors and subscribers.",
      "Registered-office utility bill, occupancy proof, and owner NOC where applicable.",
      "Digital Signature Certificates for the proposed directors and subscribers.",
      "Declarations and beneficial-ownership information required by the filing.",
    ],
    audiences: [
      "Startups building a formal investment-ready structure.",
      "Small and medium businesses seeking limited liability.",
      "Foreign investors establishing an eligible Indian company.",
      "Existing businesses converting to a corporate structure.",
    ],
    faqs: [
      ["How many directors are required?", "A private limited company generally needs at least two directors, subject to current Companies Act requirements."],
      ["Can a minor act as a director?", "No. A person must be legally competent and meet the statutory conditions for appointment as a director."],
      ["Is minimum paid-up capital required?", "The legacy page states that no general minimum paid-up capital is prescribed; the proposed activity and sector may still carry capital conditions."],
      ["Can a private limited company offer shares on a stock exchange?", "A private company cannot make a public offer while it remains private. It would need to meet the legal conditions for conversion and listing."],
      ["What annual obligations apply?", "Annual accounts, audit, board and member records, annual returns, tax filings, and other event-based requirements apply."],
    ],
  }),
  registrationPage({
    slug: "insurance-company-registration",
    menuLabel: "Insurance Company",
    title: "Insurance Company",
    seoTitle: "Insurance Company Registration | Best Consultants in India",
    seoDescription:
      "We make the Insurance Company registration process easy. Get your Insurance Company Registration today from best company registration consultants.",
    heroDescription:
      "Starting an insurance company requires considering regulatory conditions, acquiring licences, and structuring the business. JR Compliance helps identify the route for establishing the company, from compliance checks to required documentation, so the founders can focus on the core business while the registration process is coordinated.",
    overview:
      "Starting an insurance business requires more than a marketing plan: the company must follow sector laws and prepare extensive financial, governance, and operating records. We guide the stages of the application and help build a compliant foundation for the proposed insurance operations.",
    challenges: [
      [
        "Regulatory Framework",
        "Insurance regulation is extensive and changes over time, making current compliance analysis essential before and during the application.",
      ],
      [
        "Licences and Certifications",
        "Regulatory permissions involve detailed submissions, checks, authorizations, and communication with the competent authority.",
      ],
      [
        "Business and Financial Structure",
        "The operating model, capital, solvency, governance, and financial plan must align with regulatory and market expectations.",
      ],
      [
        "Credibility and Trust",
        "The proposed insurer must demonstrate sound management, transparent practices, compliance, and policyholder protection.",
      ],
    ],
    advantages: [
      ["Compliance Support", "The legal and regulatory work is organized so the business can prepare for compliant operations."],
      ["Coordinated Licensing", "Specialists manage documentation, applications, follow-ups, and responses through the licence process."],
      ["Business-Structure Guidance", "The operating, financial, and governance plan is reviewed against insurance-sector expectations."],
      ["Enhanced Credibility", "A properly licensed and governed company can build confidence with policyholders, partners, and regulators."],
    ],
    process: [
      ["Corporate Records", "Prepare certified constitutional and incorporation records for the applicant company."],
      ["Initial Consultation", "Review the proposed insurance activity, promoter profile, capital plan, and regulatory route."],
      ["Document Preparation", "Compile corporate, financial, governance, key-personnel, and operating-plan documents."],
      ["Licence Application", "Submit the applicable application and maintain communication with the regulatory authority."],
      ["Business Structuring", "Finalize compliant operational, financial, risk, and governance arrangements."],
      ["Final Approval and Launch", "Complete authority conditions, obtain the licence, and prepare the company for compliant operations."],
    ],
    whyChoose: [
      ["Expert Regulatory Guidance", "The team guides the complex application and compliance process step by step."],
      ["Reliable Compliance Delivery", "Experience across regulated businesses supports a structured, well-documented application."],
      ["Transparent Communication", "Application status, dependencies, and authority queries are communicated throughout the engagement."],
      ["Customized Solutions", "The work is tailored to the proposed insurance model, promoter profile, and licence category."],
    ],
    eligibility: [
      "The applicant must use a legal entity permitted for the intended insurance activity.",
      "Promoters, directors, and key personnel must satisfy applicable fit-and-proper requirements.",
      "The company must meet the current capital, solvency, governance, and business-plan conditions.",
      "Foreign investment, where proposed, must comply with current sector and ownership rules.",
    ],
    documents: [
      "Certificate of Incorporation, Memorandum, and Articles.",
      "Promoter, director, shareholder, and key-personnel KYC and background records.",
      "Registered-office proof and corporate authorizations.",
      "Capital, solvency, audited-financial, and source-of-funds records.",
      "Detailed business, product, risk, governance, and operational plans.",
    ],
    audiences: [
      "Promoters establishing a regulated insurance business.",
      "Eligible financial firms expanding into insurance activities.",
      "Business groups with an approved insurance strategy and capital plan.",
      "Strategic investors pursuing a compliant insurance venture.",
    ],
    faqs: [
      ["What are the key steps to set up an insurance company?", "The work includes feasibility and promoter review, company structuring, capital planning, documentation, regulatory application, authority review, and operational readiness."],
      ["How long does licensing take?", "The process can take several months and depends on the licence category, document readiness, authority review, and conditions imposed."],
      ["What is needed for the licence?", "Corporate and financial records, promoter and key-personnel information, a detailed business plan, governance controls, and proof of regulatory compliance are generally required."],
      ["Why is compliance crucial?", "It is essential for lawful operation, policyholder protection, ethical conduct, penalty prevention, and public trust."],
      ["Can JR Compliance provide post-launch support?", "Yes. Continuing support can cover regulatory filings, audits, operational changes, and recurring compliance."],
    ],
  }),
  registrationPage({
    slug: "microfinance-company-registration",
    menuLabel: "RBI Micro Finance Company",
    title: "Micro Finance Company",
    seoTitle: "Microfinance Company Registration",
    seoDescription:
      "Looking for expert assistance in Micro finance Company Registration? Click to know all about how to start a microfinance company.",
    heroDescription:
      "Starting a Micro Finance Company allows businesses to provide financial services to individuals in need. With the required registration, the company can build regulatory credibility. JR Compliance guides the setup process so the proposed business can focus on serving small businesses and underserved communities.",
    overview:
      "Microfinance institutions support financial inclusion through small loans and credit facilities for individuals and businesses. A compliant company can operate within the regulatory framework and expand access to finance for underserved sectors. JR Compliance coordinates the registration with professional document and process support.",
    challenges: [
      ["RBI Registration Requirements", "The entity, capital, promoter, business-plan, and application conditions require detailed regulatory preparation."],
      ["Industry-Specific Knowledge", "Microfinance lending, borrower protection, pricing, risk, and reporting rules require specialist understanding."],
      ["Document Verification", "Corporate, financial, KYC, and business-plan records pass through detailed checks that can extend the timeline."],
      ["Capital Adequacy", "The company must demonstrate the capital and prudential position required for its current regulatory category."],
    ],
    advantages: [
      ["Lawful Financial Operations", "Registration provides the legal route to undertake the approved microfinance activity."],
      ["Broader Market Opportunities", "A compliant entity can build partnerships and serve eligible borrower communities at scale."],
      ["Credibility and Trust", "Regulatory approval and structured governance strengthen confidence among borrowers and financial partners."],
      ["Organized Compliance", "A documented framework supports recurring prudential, reporting, and customer-protection obligations."],
    ],
    process: [
      ["Documentation Collection", "Collect incorporation, promoter, financial, registered-office, and KYC records."],
      ["Business Plan Review", "Review the lending model, target customers, risk controls, projections, and regulatory category."],
      ["Application Filing", "Prepare and submit the registration application with the supporting records."],
      ["Verification Assistance", "Respond to document checks, authority queries, and clarifications during review."],
      ["Capital Support", "Document the required capital and financial position for the applicable category."],
      ["Approval and Compliance", "Complete approval conditions and establish the reporting and operational controls required after registration."],
    ],
    whyChoose: [
      ["RBI Registration Guidance", "Specialists coordinate the regulatory process and help prevent documentation errors."],
      ["Document Support", "Corporate, financial, KYC, and business-plan records are checked before filing."],
      ["Business-Specific Planning", "The approach is aligned with the company’s capital, lending model, and compliance needs."],
      ["Registration Experience", "The team supports the application from initial assessment through approval and continuing compliance."],
    ],
    eligibility: [
      "The applicant must be incorporated in the legal form required for the proposed regulated activity.",
      "Promoters and directors should have a clean financial and regulatory background.",
      "The company must meet the current net-owned-fund and prudential conditions for its category.",
      "A detailed and sustainable microfinance business plan is required.",
    ],
    documents: [
      "Certificate of Incorporation and constitutional documents.",
      "Current net-worth and capital evidence.",
      "Promoter, director, and shareholder KYC and background records.",
      "Detailed microfinance business plan and financial projections.",
      "Board resolutions and the prescribed application records.",
    ],
    audiences: [
      "Companies planning small-ticket financial services.",
      "Eligible NBFCs expanding into microfinance.",
      "Organizations pursuing regulated financial-inclusion activity.",
      "Microfinance promoters moving into a formal operating structure.",
    ],
    faqs: [
      ["What is Micro Finance Company registration?", "It is the corporate and regulatory approval process required for an entity to conduct the proposed microfinance activity lawfully."],
      ["How long can RBI registration take?", "The legacy estimate is about 90–120 days, but timing depends on the category, current requirements, documentation, and authority review."],
      ["What minimum capital is required?", "Capital and net-owned-fund requirements change by regulatory category and date. They must be verified against current RBI directions before filing."],
      ["Can an individual start a Micro Finance Company?", "A regulated company application must be made through an eligible incorporated entity; an individual can participate as a promoter subject to the rules."],
      ["How can JR Compliance assist?", "The team reviews eligibility, prepares documents and the business plan, coordinates filing, responds to queries, and supports post-approval compliance."],
    ],
  }),
  registrationPage({
    slug: "opc-registration",
    menuLabel: "One Person Company (OPC)",
    title: "One Person Company (OPC)",
    seoTitle: "One Person Company ( OPC ) Registration | Online Process OPC Incorporation",
    seoDescription:
      "What is a One Person Company registration? Click here to know all about an OPC registration, its benefits, documents required, and the process.",
    heroDescription:
      "One Person Company (OPC) combines single ownership with a corporate legal structure. Designed for an eligible individual business owner, it provides limited liability, a separate legal identity, and a defined compliance framework so the owner can operate through a company.",
    overview:
      "One Person Company registration is suited to an eligible individual who wants to manage a business independently while using a corporate structure. It limits personal liability, maintains single ownership through one member, and provides legal continuity with a nominated successor.",
    challenges: [
      ["Expansion Limits", "The single-member structure may become less suitable as ownership, investment, and management needs expand."],
      ["Conversion and Restructuring", "Changes in business scale or ownership goals can require conversion to another company structure."],
      ["Continuing Compliance", "Although the structure has some concessions, accounts, returns, records, and other company obligations still apply."],
      ["Nominee Appointment", "The member must nominate an eligible person and keep nominee consent and changes properly documented."],
    ],
    advantages: [
      ["Limited Liability", "The company separates the member’s personal assets from corporate obligations, subject to law."],
      ["Independent Control", "One eligible member owns the company and can direct its business within the corporate framework."],
      ["Simplified Corporate Structure", "The OPC receives a distinct legal identity with concessions designed for a single-member company."],
      ["Perpetual Succession", "The nominee mechanism supports continuity if the member dies or becomes incapable."],
    ],
    process: [
      ["Select the Company Name", "Choose a unique name that satisfies the OPC naming and MCA requirements."],
      ["Name Approval", "Submit the proposed name through the incorporation service and address any observations."],
      ["Digital Signature", "Arrange a Digital Signature Certificate for the proposed director and subscriber."],
      ["Director Identification", "Complete the director-identification details through the linked incorporation process."],
      ["Incorporation Forms", "File the memorandum, articles, nominee consent, office proof, KYC, and declarations."],
      ["Certificate of Incorporation", "Receive the incorporation certificate, PAN, and TAN, then complete post-incorporation setup."],
    ],
    whyChoose: [
      ["Accurate OPC Guidance", "Advisors coordinate the single-member and nominee requirements through incorporation."],
      ["Business-Specific Support", "The proposed objects, ownership, nominee, and compliance plan are reviewed together."],
      ["Transparent Pricing", "The filing scope and charges are explained without hidden costs."],
      ["Timely Coordination", "Document preparation and query responses are managed to reduce avoidable delays."],
    ],
    eligibility: [
      "The member and nominee must meet the current citizenship and residency eligibility rules.",
      "The company has one member and one nominee, with the required consents.",
      "The member and director must be legally competent and at least 18 years old.",
      "The proposed activity must be permitted for an OPC under current law.",
    ],
    documents: [
      "Memorandum and Articles of Association.",
      "Nominee consent and nominee KYC documents.",
      "Registered-office proof and owner NOC where applicable.",
      "Member/director PAN, identity, address proof, and photograph.",
      "Digital Signature Certificate and incorporation declarations.",
    ],
    audiences: [
      "Solo founders seeking a separate corporate identity.",
      "Independent consultants moving to a company structure.",
      "Owner-managed service or product businesses.",
      "Entrepreneurs who want limited liability without co-founders.",
    ],
    faqs: [
      ["What is an OPC?", "It is a company with one member that operates as a separate legal entity and appoints a nominee for continuity."],
      ["Who can register an OPC?", "An individual who meets the current statutory eligibility conditions can become its member, subject to the permitted activity and other restrictions."],
      ["Does an OPC require a nominee?", "Yes. Nominee consent and KYC are required so the company has a succession mechanism."],
      ["Is there a turnover limit for an OPC?", "Historic thresholds have changed. Current conversion and eligibility rules should be checked at the time of filing."],
      ["What annual compliance applies?", "The OPC maintains accounts, statutory records, annual returns, tax filings, and other company compliance, with applicable concessions."],
    ],
  }),
  registrationPage({
    slug: "public-limited-company-registration",
    menuLabel: "Public Limited Company",
    title: "Public Limited Company",
    seoTitle: "Public Limited Company Registration Consultant | Apply for Public Limited Company Registration",
    seoDescription:
      "Need a Public Limited Company Registration Consultant? Apply for Public Limited Company Registration with our expert consultants for seamless and professional assistance.",
    heroDescription:
      "A Public Limited Company suits businesses planning substantial growth and access to capital through a wider shareholder base and, where eligible, public offers. We assist with the demanding incorporation and governance framework that supports credibility, investor confidence, and accountable operations.",
    overview:
      "Going public is a major business step. JR Compliance guides the company through incorporation and the compliance structure needed for transparent stakeholder communication, governance, capital access, and preparation for future market opportunities.",
    challenges: [
      ["High Regulatory Compliance", "Public companies face extensive company-law, governance, audit, disclosure, and, where relevant, securities obligations."],
      ["Market Perception", "Stakeholder confidence depends on consistent performance, governance, disclosure, and communication."],
      ["Expanded Oversight", "Boards, committees, auditors, shareholders, and regulators create a more formal oversight environment."],
      ["Disclosure Requirements", "Financial and material business information must be maintained and disclosed with greater transparency."],
    ],
    advantages: [
      ["Enhanced Credibility", "The regulated structure and disclosure framework can strengthen confidence among stakeholders."],
      ["Access to Capital", "The company can pursue a broader shareholder base and eligible capital-market routes."],
      ["Improved Valuation Potential", "Scale, liquidity prospects, governance, and market access can support stronger business valuation."],
      ["Strategic Growth", "A public-company structure can support acquisitions, expansion, employee incentives, and larger investments."],
    ],
    process: [
      ["Company Name", "Select and reserve a compliant public-company name through MCA."],
      ["Obtain DSC and DIN", "Arrange digital signatures and director-identification details for the proposed directors."],
      ["Prepare MOA and AOA", "Draft the objects, capital, governance, and public-company clauses in the constitutional documents."],
      ["PAN and TAN", "Complete the linked incorporation forms and receive the company’s tax identifiers after approval."],
      ["Open the Current Account", "Establish the corporate bank account and complete applicable capital and commencement steps."],
      ["Final Setup", "Create statutory registers, appoint required officers and auditors, and establish continuing governance and filing controls."],
    ],
    whyChoose: [
      ["Public-Company Experience", "The team supports the structured incorporation and governance needs of growth-focused businesses."],
      ["Dedicated Compliance Experts", "Specialists coordinate corporate records, filings, and continuing obligations."],
      ["Tailored Solutions", "The ownership, board, objects, capital, and growth plan shape the registration approach."],
      ["Transparent Delivery", "The process, dependencies, and progress remain clear throughout the engagement."],
    ],
    eligibility: [
      "A public limited company generally requires at least seven members and three directors.",
      "At least one director must satisfy the resident-director condition.",
      "The name, objects, capital, and Articles must meet public-company requirements.",
      "Directors and subscribers must provide complete KYC, consent, and declarations.",
    ],
    documents: [
      "Memorandum and Articles of Association.",
      "Director and subscriber KYC, consent, and Digital Signature Certificates.",
      "Registered-office proof and owner NOC where applicable.",
      "Subscriber and share-capital details.",
      "Statutory declarations and compliance records required for incorporation.",
    ],
    audiences: [
      "Companies planning substantial expansion.",
      "Businesses preparing for a broad investor base.",
      "Established firms seeking larger capital opportunities.",
      "Organizations prepared for enhanced governance and disclosure.",
    ],
    faqs: [
      ["What is a Public Limited Company?", "It is a company permitted to have a wider membership and pursue public capital routes, subject to company and securities law."],
      ["What are its benefits?", "Potential benefits include broader capital access, share transferability, greater visibility, and a structure suited to large-scale growth."],
      ["What legal requirements apply?", "Public companies maintain directors, members, records, accounts, audit, meetings, annual filings, disclosures, and other governance controls required by current law."],
      ["What does going public mean?", "It generally means offering securities to the public through a regulated process after meeting eligibility, disclosure, governance, and market requirements."],
      ["Why is compliance support important?", "It coordinates corporate, financial, governance, disclosure, and authority requirements so the company can operate and pursue capital lawfully."],
    ],
  }),
  registrationPage({
    slug: "nbfc-registration",
    menuLabel: "RBI NBFC Registration",
    title: "RBI NBFC Registration",
    seoTitle: "NBFC Registration | NBFC License Registration - All You Need to Know",
    seoDescription:
      "Looking for a consultant for the registration of NBFC? Click here to know all about NBFC registration. NBFC is known as Non Banking Financial Corporations",
    heroDescription:
      "Register an eligible Non-Banking Financial Company with the Reserve Bank of India through structured expert assistance. We coordinate regulatory requirements and provide end-to-end support for an application aligned with the proposed financial business model.",
    overview:
      "JR Compliance focuses on Non-Banking Financial Company registration with the RBI, helping businesses prepare to operate as regulated financial companies. We coordinate the process from eligibility and application formation through documentation and continuing compliance.",
    challenges: [
      ["RBI Regulatory Framework", "The applicant must interpret current entry, capital, promoter, governance, business, and prudential requirements."],
      ["Documentation and Approval", "Corporate, financial, KYC, and operating records undergo detailed preparation and regulatory review."],
      ["Changing Regulations", "RBI directions and reporting obligations evolve, so the application and operating model need current analysis."],
      ["Capital and Preconditions", "The applicant must maintain the net-owned funds and other prerequisites applicable to its NBFC category."],
    ],
    advantages: [
      ["Legitimate Operations", "Registration provides the lawful basis for the financial activity approved by RBI."],
      ["Business Credibility", "Regulatory approval and a documented governance framework strengthen stakeholder confidence."],
      ["Coordinated Approval", "A complete application and structured responses reduce preventable gaps during review."],
      ["Compliance Risk Management", "Post-registration controls help the company manage reporting, prudential, and customer obligations."],
    ],
    process: [
      ["Online Application", "Prepare and submit the prescribed RBI application with the company and business details."],
      ["Pre-Screening", "Review eligibility, promoter background, capital, documents, and the business plan before final submission."],
      ["Application Reference", "Track the submitted application through its reference number and regulatory workflow."],
      ["Document Submission", "Provide the required corporate, financial, KYC, governance, and operational records."],
      ["Application Review", "Respond to RBI scrutiny, clarifications, and any additional information requests."],
      ["Post-Registration Compliance", "After approval, implement the reporting, prudential, governance, and operational controls for the category."],
    ],
    whyChoose: [
      ["End-to-End Support", "Assistance covers initial consultation, application preparation, review queries, and post-approval compliance."],
      ["Transparent Process", "The status, dependencies, and next steps remain visible throughout the registration."],
      ["Current RBI Guidance", "The application is prepared against the regulatory directions relevant at the time of filing."],
      ["Registration Experience", "A structured process helps businesses pursue NBFC approval with fewer documentation gaps."],
    ],
    eligibility: [
      "The applicant must be incorporated as a company under the Companies Act.",
      "The company must meet the current net-owned-fund requirement for the proposed NBFC category.",
      "Promoters, directors, and significant shareholders should have a clean financial and regulatory record.",
      "A clear, viable, and compliant financial-services business plan is required.",
    ],
    documents: [
      "Certificate of Incorporation, Memorandum, and Articles.",
      "Evidence of current Net Owned Funds and source of capital.",
      "Promoter, director, and shareholder KYC and background records.",
      "Detailed business plan, organizational structure, and financial projections.",
      "Board resolutions and the prescribed RBI application documents.",
    ],
    audiences: [
      "Companies planning regulated lending or financial services.",
      "Microfinance businesses requiring an NBFC framework.",
      "Leasing and hire-purchase companies.",
      "Investment and other eligible non-bank financial businesses.",
    ],
    faqs: [
      ["What minimum capital is required?", "Net-owned-fund requirements vary by NBFC category and have changed over time. The current RBI directions must be checked before filing."],
      ["How long can RBI registration take?", "The legacy estimate is about 90–120 days, subject to application completeness, category, scrutiny, and regulatory queries."],
      ["Must every financial company register as an NBFC?", "Registration depends on the company’s principal business, activity, and applicable exemptions. A regulatory assessment is needed."],
      ["What documents are required?", "Incorporation and constitutional records, capital proof, promoter/director KYC, financial statements, a detailed business plan, and prescribed application documents are commonly required."],
      ["How does JR Compliance help?", "The team assesses eligibility, checks documents and capital records, prepares the application, coordinates queries, and supports continuing compliance."],
    ],
  }),
  registrationPage({
    slug: "llp-registration",
    menuLabel: "Limited Liability Partnership (LLP)",
    title: "Limited Liability Partnership (LLP)",
    seoTitle: "LLP Registration Consultants in India | Online LLP Registration in Delhi",
    seoDescription:
      "Are you searching for LLP Registration Consultants in India? You have arrived at the right place. click here to learn more about LLP Registration in India. So get your LLP Certificate now.",
    heroDescription:
      "A Limited Liability Partnership combines the advantages of a partnership and the limited liability of a company. It is a practical structure for professional and small enterprises needing flexibility, reduced compliance, and protection of personal assets within an ordered system that supports management and growth.",
    overview:
      "Within an LLP, a person enjoys the ease of a partnership and the safeguards of limited liability that come with incorporation. The partners can run the business while assuming less personal financial risk. This is why the structure is common among startups, law offices, consulting firms, and other professional businesses.",
    challenges: [
      [
        "Understanding LLP Regulations",
        "The rules governing Limited Liability Partnerships can be difficult for new entrepreneurs. Correct understanding supports compliance and avoids operational or growth disruption.",
      ],
      [
        "Partner Roles and Responsibilities",
        "Clear allocation of partner duties helps avoid future disputes, supports smooth operations, and improves efficiency and working relationships.",
      ],
      [
        "Accurate Documentation",
        "Timely registration depends on precise documentation. Errors can delay approval, extend the timeline, and create extra work.",
      ],
      [
        "Financial and Legal Updates",
        "The LLP must keep up with changing business laws and financial regulations to avoid penalties and protect its operating status.",
      ],
    ],
    advantages: [
      [
        "Enhanced Liability Protection",
        "The LLP structure protects partners from personal liability for many business debts and supports a lower-risk operating environment, subject to law.",
      ],
      [
        "Simplified Management",
        "Flexible management arrangements let partners define operational duties through their agreement without a rigid corporate hierarchy.",
      ],
      [
        "Tax Treatment",
        "An LLP has a distinct tax framework and avoids the dividend-distribution structure used by a company, subject to current tax law.",
      ],
      [
        "Operational Flexibility",
        "Partners can customize their agreement for different business models while maintaining a recognized legal structure.",
      ],
    ],
    process: [
      ["Initial Consultation", "Review the business needs, proposed partners, activity, ownership, and features of the LLP structure."],
      ["Choose the LLP Name", "Select and reserve a compliant name for the proposed Limited Liability Partnership."],
      ["Document Preparation", "Gather and review partner KYC, office proof, consents, and incorporation records."],
      ["Application Filing", "Submit the incorporation forms and attachments through the MCA LLP process."],
      ["Verification", "Respond promptly to authority queries or observations to prevent avoidable delay."],
      ["Post-Registration Support", "Execute and file the LLP Agreement and maintain the accounts, returns, and changes required after incorporation."],
    ],
    whyChoose: [
      ["LLP Expertise", "Specialists help navigate LLP regulations and incorporation requirements efficiently."],
      ["End-to-End Assistance", "Support covers consultation, documents, incorporation, the LLP Agreement, and post-registration setup."],
      ["Transparent Communication", "Regular updates keep the partners informed throughout the registration process."],
      ["Tailored Service", "The engagement is adapted to the partners, activity, ownership, and business needs."],
    ],
    eligibility: [
      "At least two designated partners are required.",
      "At least one designated partner must meet the resident-in-India requirement.",
      "The proposed business must have lawful and clearly defined objectives.",
      "All designated partners must provide identity records, consent, and digital signatures.",
    ],
    documents: [
      "LLP Agreement after incorporation.",
      "PAN, Aadhaar or passport, and address proof for partners.",
      "Registered-office proof and owner NOC where applicable.",
      "Digital Signature Certificates for designated partners.",
      "Certificate of Incorporation and linked statutory records.",
    ],
    audiences: [
      "Startups founded by two or more partners.",
      "Consulting and professional-service agencies.",
      "Law, accounting, design, and advisory firms.",
      "Family-owned businesses seeking flexible management with limited liability.",
    ],
    faqs: [
      ["How does an LLP differ from a Partnership Firm?", "An LLP is a separate legal entity and generally provides limited liability, while a traditional partnership is governed mainly by its deed and can expose partners personally."],
      ["How long does registration take?", "The legacy estimate is 15–20 business days, subject to name approval, document readiness, and MCA review."],
      ["Does an LLP have annual compliance?", "Yes. An LLP maintains accounts and statutory records and files the annual statements and tax returns applicable to it."],
      ["Can an LLP convert to a Private Limited Company?", "A change of structure may be possible through the legal route available at that time, with tax, asset, contract, and filing implications."],
      ["What costs continue after registration?", "Ongoing costs can include accounting, tax returns, annual LLP filings, agreement changes, licences, and professional support."],
    ],
  }),
  registrationPage({
    slug: "asset-reconstruction-company-registration",
    menuLabel: "RBI Asset Reconstruction Registration",
    title: "Asset Reconstruction Company Registration",
    seoTitle: "Asset Reconstruction Company Registration | JR Compliance",
    seoDescription:
      "We make the Asset Reconstruction Company registration hassle-free to ensure customer satisfaction. Click here to know about Asset Reconstruction Company registration with RBI.",
    heroDescription:
      "Registration of an Asset Reconstruction Company is required under the SARFAESI framework for firms aiming to acquire, manage, and resolve non-performing assets. JR Compliance coordinates the legal, financial, and RBI application requirements to make the registration process structured and reliable.",
    overview:
      "Asset Reconstruction Companies acquire, manage, and restructure distressed financial assets and play an important role in the financial ecosystem. JR Compliance helps prepare an ARC registration in line with the applicable Reserve Bank of India framework so the proposed company can build a compliant operating foundation.",
    challenges: [
      [
        "Stringent RBI Compliance",
        "Meeting RBI guidelines involves legal formalities and detailed documentation. Non-compliance can delay or result in rejection of the application.",
      ],
      [
        "Complex Documentation",
        "The application includes financial statements, legal proofs, recovery planning, and operational records. Errors can prolong the approval process.",
      ],
      [
        "Net-Owned Fund Requirement",
        "The applicant must maintain the current regulatory Net Owned Fund, which requires significant financial planning and evidence.",
      ],
      [
        "Operational and Legal Expertise",
        "An ARC needs compliant recovery, governance, legal, and operating frameworks before it can begin regulated activity.",
      ],
    ],
    advantages: [
      ["Regulatory Coordination", "The RBI requirements are organized into a clear application and compliance pathway."],
      ["Documentation Assistance", "The team supports drafting, checking, and filing the legal, financial, and operational records."],
      ["Efficient Process Management", "A structured review reduces documentation gaps and avoidable back-and-forth."],
      ["Professional Guidance", "Specialists guide the application from eligibility review through approval and operating setup."],
    ],
    process: [
      ["Pre-Eligibility Review", "Assess the proposed business model, promoters, financials, and current ARC registration conditions."],
      ["Document Preparation", "Prepare the application forms, corporate records, financial statements, and legal and operational documents."],
      ["Net-Owned Fund Validation", "Verify and document the Net Owned Fund applicable under the current RBI framework."],
      ["Fit-and-Proper Review", "Prepare background records and declarations for promoters, directors, and significant shareholders."],
      ["Application Filing", "Submit the ARC application to RBI with the required documents and legal declarations."],
      ["Registration Approval", "Complete regulatory queries and approval conditions, then establish post-registration controls."],
    ],
    whyChoose: [
      ["ARC Registration Experience", "The team has experience coordinating complex regulated-company applications."],
      ["Dedicated Professionals", "Specialists provide tailored guidance with a transparent document and review process."],
      ["Timely Coordination", "Structured preparation helps reduce missing records and preventable delays."],
      ["End-to-End Support", "Assistance covers eligibility, documents, application, approval, and initial compliance setup."],
    ],
    eligibility: [
      "The applicant must be incorporated under the Companies Act in the form required by current law.",
      "The company must maintain the current Net Owned Fund prescribed by RBI.",
      "RBI approval is required before conducting Asset Reconstruction Company activity.",
      "Promoters, directors, and shareholders must satisfy current financial-credibility and fit-and-proper conditions.",
    ],
    documents: [
      "Certificate of Incorporation, Memorandum, and Articles.",
      "Evidence of the current Net Owned Fund and source of capital.",
      "Promoter, director, and shareholder KYC and background records.",
      "Audited financial statements and statutory corporate records.",
      "Detailed business plan, asset-recovery strategy, governance, and projections.",
    ],
    audiences: [
      "Financial institutions creating a compliant vehicle for NPA resolution.",
      "Eligible investors pursuing distressed-asset acquisition and restructuring.",
      "Businesses specializing in regulated asset recovery.",
      "Companies building a structured platform for financial-asset resolution.",
    ],
    faqs: [
      ["What is an Asset Reconstruction Company?", "It is a regulated financial entity that acquires non-performing financial assets and works to restructure or recover the outstanding amounts."],
      ["What Net Owned Fund is required?", "The legacy source contains conflicting figures. The current RBI requirement must be verified before the application is planned or published."],
      ["How long can registration take?", "The legacy estimate is about 4–6 weeks, subject to application completeness, scrutiny, current policy, and authority approval."],
      ["What documents are required?", "Corporate records, audited financials, capital evidence, promoter and director records, application forms, and a detailed operating and recovery plan are required."],
      ["How can JR Compliance assist?", "The team supports eligibility review, documentation, financial and governance records, RBI filing, queries, approval, and initial compliance."],
    ],
  }),
  registrationPage({
    slug: "mutual-fund-company-registration",
    menuLabel: "RBI Mutual Fund Company Registration",
    title: "Mutual Fund Company",
    seoTitle: "Mutual Fund Company Registration | How to Start a Mutual Fund Company?",
    seoDescription:
      "Searching for the finest consultants who can assist you in how to start a mutual fund company registration? Click here to know about the mutual fund company registration.",
    heroDescription:
      "Establishing a mutual fund company in India is a specialized process directed by financial regulations designed to protect investors and fund integrity. JR Compliance provides guidance through the application, documentation, and operating framework for the proposed fund-management business.",
    overview:
      "Our services focus on mutual fund company registration, the applicable SEBI requirements, and assistance with documentation, legal formalities, and compliance. We help the proposed business establish a transparent and structured foundation for fund operations and growth.",
    challenges: [
      [
        "Navigating SEBI Regulations",
        "The registration must meet investment, disclosure, reporting, governance, and risk-management standards under the current SEBI framework.",
      ],
      [
        "Document Preparation",
        "Prospectus material, agreements, financial disclosures, organization records, and compliance documents require specialist preparation.",
      ],
      [
        "Approval Process",
        "Regulatory review and clarification cycles can delay launch if documents, personnel, capital, or operating arrangements are incomplete.",
      ],
      [
        "Market Competition",
        "A competitive market requires a clear investment proposition, operating strategy, distribution plan, and understanding of investor needs.",
      ],
    ],
    advantages: [
      ["Compliance Assurance", "The application and operating plan are reviewed against applicable SEBI and regulatory requirements."],
      ["Expert Consultation", "Specialists provide strategic guidance for a sound fund-management and governance foundation."],
      ["Streamlined Registration", "The team coordinates paperwork, responses, and approvals through a defined process."],
      ["Ongoing Support", "Post-registration assistance covers compliance updates, audits, reporting, and operational changes."],
    ],
    process: [
      ["Business-Structure Evaluation", "Review the organization, sponsor, investment objectives, personnel, and proposed regulatory route."],
      ["Documentation", "Prepare the prospectus material, agreements, financial records, and compliance documents required for filing."],
      ["Application Submission", "Submit the completed application to SEBI through the applicable registration process."],
      ["Clarification Responses", "Draft timely, accurate responses to regulatory queries during evaluation."],
      ["Approval and Registration", "Complete approval conditions and finalize the registration and operating arrangements."],
      ["Post-Registration Support", "Maintain reporting, audit, governance, investor-protection, and other recurring obligations."],
    ],
    whyChoose: [
      ["Mutual Fund Registration Expertise", "The team provides structured, business-specific support for the regulatory application."],
      ["Documentation Support", "Specialists coordinate the legal, financial, personnel, and operating records needed for review."],
      ["Process Management", "The engagement is managed from consultation and preparation through authority responses and approval."],
      ["Compliance Monitoring", "Ongoing support helps the registered business respond to changing requirements."],
    ],
    eligibility: [
      "The applicant and associated entities must use the legal forms required by the current SEBI framework.",
      "The sponsor and asset-management arrangements must meet current financial and track-record conditions.",
      "Directors, fund managers, and key personnel need appropriate qualifications, experience, and fit-and-proper status.",
      "The promoters and associated entities must have a clear financial and regulatory record.",
    ],
    documents: [
      "Certificates of Incorporation and constitutional records for relevant entities.",
      "Audited net-worth, financial, and sponsor records required by the current framework.",
      "KYC, experience, qualification, and fit-and-proper records for key people.",
      "Detailed business plan, fund categories, governance, operations, and investor-protection framework.",
      "Draft agreements, disclosures, and prescribed application records.",
    ],
    audiences: [
      "Eligible financial institutions planning pooled investment products.",
      "Businesses establishing regulated investment-management services.",
      "Asset-management organizations pursuing mutual fund operations.",
      "Qualified wealth-management groups expanding into regulated fund products.",
    ],
    faqs: [
      ["How long can registration take?", "The legacy estimate is approximately 3–6 months, subject to the applicant structure, documents, regulatory review, and queries."],
      ["What eligibility criteria apply?", "SEBI requirements cover the sponsor and applicant entities, financial capacity, track record, management expertise, key personnel, governance, and operating arrangements."],
      ["Can foreign investors participate?", "Participation may be possible subject to current SEBI, foreign-investment, ownership, and fit-and-proper requirements."],
      ["What minimum capital is required?", "The legacy source describes several inconsistent scenarios. Current net-worth and capital requirements must be verified for the exact entity and application route."],
      ["Is management expertise required?", "Experienced and appropriately qualified key personnel are central to the regulatory and operational framework for a mutual fund business."],
    ],
  }),
  registrationPage({
    slug: "foreign-company-registration",
    menuLabel: "Foreign Company Reg.",
    title: "Foreign Company Registration",
    seoTitle: "Foreign Company Registration",
    seoDescription:
      "JR Compliance provides support for foreign company registration in India, including structure selection, legalized documents, MCA filings, FEMA reporting, and operational setup.",
    heroDescription:
      "Foreign company registration in India allows overseas entities to establish a legal presence in one of the world’s fastest-growing economies. Whether you are considering a branch office, liaison office, project office, or wholly owned subsidiary, the correct registration route supports lawful operations and local credibility. JR Compliance coordinates the process from structure selection through setup.",
    overview:
      "Registering a foreign company in India involves multiple legal frameworks, including the Companies Act, FEMA guidelines, and RBI regulations. JR Compliance handles documentation and regulatory coordination so the business can navigate the selected route with fewer delays and avoid common legal gaps.",
    challenges: [
      [
        "Indian Legal Frameworks",
        "Companies Act, FEMA, tax, and sector rules affect the available structure and the compliance that follows.",
      ],
      [
        "Multiple Authorities",
        "Foreign businesses may need to coordinate with ROC, MCA, RBI, tax departments, and sector authorities, each with distinct requirements.",
      ],
      [
        "Attestation and Documentation",
        "Foreign records may require notarization, apostille, embassy legalization, certified translation, and exact filing formats.",
      ],
      [
        "Taxation and Repatriation",
        "The structure must account for Indian tax, GST, withholding, FEMA reporting, and the rules for moving funds and profits.",
      ],
    ],
    advantages: [
      ["Indian Market Entry", "The approved presence allows the overseas business to conduct the activities permitted for its selected structure."],
      ["Local Recognition", "A compliant Indian presence can improve confidence among customers, suppliers, employees, banks, and authorities."],
      ["Legal and Brand Protection", "A registered structure can contract and pursue intellectual-property protection in India."],
      ["Finance and Banking Access", "The local entity or office can use the banking and permitted funding routes available to its structure."],
    ],
    process: [
      ["Business Consultation", "Assess the expansion goals and select a subsidiary, branch, liaison, project office, or other permitted route."],
      ["Document Collection", "Collect parent incorporation records, board resolutions, authorizations, and director or representative KYC."],
      ["Apostille and Attestation", "Complete the notarization, apostille, legalization, and translation required for foreign records."],
      ["Name and Application Filing", "Submit the MCA or other authority application appropriate to the selected structure."],
      ["RBI and FEMA Compliance", "Obtain approvals where needed and complete the foreign-investment, remittance, and reporting steps."],
      ["Operational Setup", "Receive the registration and arrange PAN, TAN, GST, bank, accounting, and other operating requirements."],
    ],
    whyChoose: [
      ["Simplified Coordination", "The multi-authority registration is organized into a clear sequence of documents and approvals."],
      ["Current Regulatory Guidance", "Specialists track the company, FEMA, RBI, tax, and sector requirements relevant to the selected route."],
      ["Established Compliance Support", "Experience across regulated businesses supports a professional setup process."],
      ["End-to-End Assistance", "Support runs from structure analysis and document legalization through registration and initial operations."],
    ],
    eligibility: [
      "The foreign parent must be legally incorporated and in good standing in its home jurisdiction.",
      "The proposed Indian activity and structure must be permitted under current company, FEMA, RBI, and sector rules.",
      "The parent board must authorize the Indian setup and its representatives or investment.",
      "Director, representative, residency, capital, and track-record conditions depend on the selected structure.",
    ],
    documents: [
      "Legalized Certificate of Incorporation and constitutional documents of the parent.",
      "Board resolution, power of attorney, and authorized-representative records.",
      "Identity and address proof for directors, representatives, and subscribers.",
      "Certified translations where source documents are not in English.",
      "Indian office proof, business plan, and structure-specific application records.",
    ],
    audiences: [
      "Foreign manufacturers establishing operations or distribution in India.",
      "International service providers entering the Indian market.",
      "Export-import and logistics businesses needing a local presence.",
      "Global SaaS, technology, and support firms expanding into India.",
    ],
    faqs: [
      ["What structures are available?", "Depending on activity and eligibility, an overseas business may consider a liaison, branch, project office, wholly owned subsidiary, or another permitted structure."],
      ["Is RBI approval mandatory?", "It is required for certain structures and activities, especially some branch and liaison routes. Other routes may use different approval or reporting processes."],
      ["Can a foreign director be appointed?", "Yes, subject to current company and immigration requirements. An Indian company must also satisfy the resident-director rule."],
      ["How long does registration take?", "The legacy estimate is 20–25 working days for a company route with complete records; other structures and approvals can take longer."],
      ["What annual compliance applies?", "Requirements can include accounts, audit, annual returns, tax, transfer-pricing, FEMA, foreign-company, and sector reporting based on the structure."],
    ],
  }),
  registrationPage({
    slug: "trust-registration",
    menuLabel: "Trust Registration",
    title: "Trust Registration",
    seoTitle: "Trust Registration | JR Compliance",
    seoDescription:
      "Register a charitable, educational, religious, public, or private trust with support for deed drafting, trustee documents, registrar filing, and post-registration tax applications.",
    heroDescription:
      "Trust registration in India allows individuals or groups to create a legal structure for charitable, educational, religious, or private purposes. Registration can support transparency, recognition, banking, property administration, and eligible tax applications. JR Compliance coordinates the process from trust-deed drafting through registrar submission.",
    overview:
      "Registering a trust creates a documented entity and governance framework that can support asset ownership, bank accounts, donations, and the trust’s stated objectives. Public and private trusts follow different purposes and legal considerations, and eligible charitable trusts may separately apply for registrations such as 12A and 80G.",
    challenges: [
      [
        "Accurate Trust Deed",
        "The deed must clearly define the objectives, trustee powers, beneficiaries, governance, succession, and asset-handling rules.",
      ],
      [
        "Public or Private Structure",
        "Choosing the wrong trust type can restrict operations, beneficiaries, donations, tax treatment, and future plans.",
      ],
      [
        "Tax-Exemption Applications",
        "Separate tax registrations require clear charitable objects, records, declarations, and continuing compliance.",
      ],
      [
        "Verification and Scrutiny",
        "Incomplete documents, deed inconsistencies, or inspection issues can delay or prevent registration.",
      ],
    ],
    advantages: [
      ["Legal Recognition", "A registered deed gives the trust a formal governance framework and improves credibility with institutions."],
      ["Tax-Registration Eligibility", "An eligible charitable trust can apply separately for the tax approvals available under current law."],
      ["Transparent Fund Management", "Defined trustee duties, accounts, and records support accountability and ethical administration."],
      ["Property and Contract Administration", "The registered structure can support holding and managing assets and entering arrangements for trust purposes."],
    ],
    process: [
      ["Initial Consultation", "Review the purpose, public or private nature, settlor, trustees, beneficiaries, assets, and state process."],
      ["Draft the Trust Deed", "Prepare customized objectives, governance, trustee powers, succession, and asset clauses."],
      ["Collect Trustee Documents", "Gather identity, address, photographs, office proof, and the records required by the registrar."],
      ["Execute the Trust Deed", "Sign the deed with the applicable stamp duty, trustees, settlor, and witnesses."],
      ["Submit to the Registrar", "Present the executed deed and supporting records through the state registration process."],
      ["Registration and Next Steps", "Receive the registered deed or certificate and complete PAN, banking, and eligible tax applications."],
    ],
    whyChoose: [
      ["Simplified Process", "The deed, records, execution, and registrar requirements are coordinated through one structured workflow."],
      ["Current Guidance", "The team considers the purpose, trust type, state process, and follow-on compliance."],
      ["Professional Support", "Documentation is prepared around the trust’s objectives and governance needs."],
      ["End-to-End Assistance", "Support covers deed drafting, trustee records, execution, submission, and initial post-registration steps."],
    ],
    eligibility: [
      "The settlor and required trustees must be legally competent under the applicable law.",
      "The purpose and beneficiary structure must suit a public, charitable, religious, educational, or private trust route.",
      "A registered address and property description are required where applicable.",
      "The trust deed must be properly drafted, stamped, signed, witnessed, and registered under the relevant state process.",
    ],
    documents: [
      "Trust deed with objectives and governance clauses.",
      "Identity and address proof for the settlor and trustees.",
      "Recent photographs and signatures required by the registrar.",
      "Registered-office or trust-property proof and owner NOC where applicable.",
      "Stamp-duty, witness, and state-specific registration records.",
    ],
    audiences: [
      "Social reformers and philanthropists.",
      "Charitable and non-government initiatives seeking a trust structure.",
      "Educational, religious, and community institutions.",
      "Corporate foundations establishing a structured CSR vehicle.",
    ],
    faqs: [
      ["How do public and private trusts differ?", "A public trust serves a broader charitable or public purpose, while a private trust benefits identified people or a defined group. Governance and tax treatment differ."],
      ["Can a trust receive foreign donations?", "An eligible trust must obtain the registrations and approvals required under current foreign-contribution law before accepting regulated foreign contributions."],
      ["How long does registration take?", "The legacy estimate is 10–15 working days, but timing varies by state, deed, stamp duty, appointment availability, and document accuracy."],
      ["Is registration mandatory?", "Requirements and consequences depend on the trust type, property, state law, and intended tax or fundraising activity. Legal review is recommended."],
      ["Can trust registration be completed online?", "Some steps may be digital, while deed execution, signatures, witnesses, biometrics, or physical presentation can still be required by the state registrar."],
    ],
  }),
  registrationPage({
    slug: "society-registration",
    menuLabel: "Society Registration",
    title: "Society Registration",
    seoTitle: "Society Registration | JR Compliance",
    seoDescription:
      "Looking to register a society? JR Compliance offers end-to-end society registration services to help you legally establish your society under the Societies Registration Act with ease and speed.",
    heroDescription:
      "Planning to start a society to promote charitable, educational, or cultural objectives? Society registration creates a legal framework for recognition, transparency, and protection of the group’s activities. JR Compliance coordinates the documentation and formalities for a clear, reliable registration process.",
    overview:
      "Society registration under the applicable Societies Registration framework provides legal identity and operational clarity to groups working for non-profit goals. A registered society can establish bank and governance arrangements and may become eligible for grants. JR Compliance makes the process clear and structured around the relevant state rules.",
    challenges: [
      [
        "Legal Procedures and Clauses",
        "The Societies Registration framework and state rules contain mandatory clauses and procedures that can delay an incomplete application.",
      ],
      [
        "State-Wise Requirements",
        "Member composition, documents, filing processes, and supporting records vary across Indian states.",
      ],
      [
        "Accurate Legal Documents",
        "The Memorandum and Rules & Regulations must state lawful objectives, governance, membership, and operating clauses without ambiguity.",
      ],
      [
        "Registrar Coordination",
        "Missing details or incomplete responses to registrar queries can extend the process or lead to rejection.",
      ],
    ],
    advantages: [
      ["Legal Identity and Credibility", "Registration provides formal recognition and supports banking, property, grants, and public confidence."],
      ["Structured Operations", "Defined rules improve transparency, accountability, decision-making, and protection of member interests."],
      ["Grant Eligibility", "A registered society can pursue government or institutional programs for which it otherwise qualifies."],
      ["Perpetual Succession", "The society can continue despite changes in its founding or managing members, subject to compliance."],
    ],
    process: [
      ["Initial Consultation", "Review the objectives, state, proposed members, registered office, and intended operations."],
      ["Document Collection", "Gather member KYC, address proof, office records, consents, and the information needed for drafting."],
      ["Draft MOA and Bylaws", "Prepare the Memorandum and Rules & Regulations in line with the objectives and state requirements."],
      ["File with the Registrar", "Submit the verified application and supporting records to the competent Registrar of Societies."],
      ["Follow-Ups and Queries", "Track the application and respond promptly to registrar observations or objections."],
      ["Registration Certificate", "Receive the certificate and set up post-registration governance, banking, accounts, and filings."],
    ],
    whyChoose: [
      ["Simplified Registration", "The member, office, drafting, and registrar requirements are coordinated through a defined process."],
      ["State-Aware Guidance", "Specialists account for the state-specific filing and documentation route."],
      ["Professional Documentation", "The Memorandum and Rules are developed around the society’s objectives and governance."],
      ["End-to-End Support", "Assistance runs from the first review through registrar queries, certification, and initial compliance."],
    ],
    eligibility: [
      "At least seven founding members are generally required, subject to the relevant state and operating scope.",
      "Member residence or multi-state composition must meet the rules for the selected registration route.",
      "A valid registered-office address is required in the state of registration.",
      "The society must have a clear non-profit, social, educational, cultural, scientific, or other eligible objective.",
    ],
    documents: [
      "Identity and address proof for founding members.",
      "Registered-office proof and owner NOC where applicable.",
      "Memorandum of Association signed by the required members.",
      "Rules and Regulations or bylaws for governance and operations.",
      "Affidavits, declarations, photographs, and state-specific forms where required.",
    ],
    audiences: [
      "Educational and skill-development societies.",
      "Charitable and social-welfare organizations.",
      "Cultural, arts, and community clubs.",
      "Scientific research, innovation, and publication groups.",
    ],
    faqs: [
      ["How many members are required?", "A minimum of seven members is generally required, with additional composition rules possible for all-India or state-specific registration."],
      ["Can a society operate in multiple states?", "It may operate more broadly if its constitution and registration route allow it and it meets the member and compliance rules for that scope."],
      ["How long is registration valid?", "The legal entity can continue indefinitely, subject to annual meetings, accounts, audits, returns, renewal rules where applicable, and state compliance."],
      ["Can foreign nationals be members?", "Foreign participation may be possible, but state rules, resident-member conditions, foreign-contribution law, and KYC requirements must be checked."],
      ["How long does registration take?", "The legacy estimate is 30–45 working days, depending on the state, document accuracy, registrar workload, and queries."],
    ],
  }),
];

export const companyRegistrationSlugs = fallbackCompanyRegistrationPages.map((page) => page.slug);

export function companyRegistrationFallback(slug: string): CompanyRegistrationPageData | undefined {
  return fallbackCompanyRegistrationPages.find((page) => page.slug === slug);
}
