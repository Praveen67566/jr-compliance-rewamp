# Corporate and Approval sticky-bar content

Content guide for entering service-specific sticky-bar copy in Strapi later.
This document makes no frontend, schema, fallback, navigation, or CMS-record changes.

## Scope and inventory

- Corporate service detail pages at `/corporate/<service-slug>` only.
- Approval service detail pages at `/approval/<service-slug>` only.
- Inventory checked on **31 October 2026** against the configured local PostgreSQL CMS database using a read-only transaction.
- **169 published service records: 105 Corporate and 64 Approval, across 19 collections.** Each service is listed once; its draft version is not counted again.
- Service names and stored slugs come from the published CMS records, including imported services beyond the bundled frontend fallbacks. Category labels come from `frontend/lib/service-route-config.ts`.
- This is a local content snapshot. The local CMS HTTP server was unavailable during preparation, so public-page rendering and the deployed CMS were not verified.

Home, About, Careers, Contact, legal, thank-you, and Global pages are outside this guide.
Category names are internal groups; do not add category segments to the public URLs.

## The three fields

| Strapi field | Content rule |
| --- | --- |
| `stickyBar.title` | The service name from the published record’s `title`. The tables preserve its current wording and capitalization. |
| `stickyBar.description` | The service’s category label from the route registry. Use the same description for every service in that category. |
| `stickyBar.supportingText` | `Get Expert Support for {Service title}`, with the actual service name inserted. Fully written values are provided below. |

The table values are proposed sticky-bar copy, ready to enter manually. They do not describe the current contents of every existing sticky bar.
Enter literal text in Strapi: `{Service title}` is an explanatory placeholder, and Strapi does not interpolate it.

The frontend already loads each service record’s own optional `stickyBar` through the shared content boundary.
It does not automatically derive these three values from the service title or category.
If a service is renamed or moved to another category later, update its sticky-bar copy as well.

**Current display behavior:** `supportingText` is rendered in a `sr-only` paragraph in `frontend/components/sticky-cta-bar.tsx`.
It is available to screen readers and hidden visually. Entering its value in CMS does not make it visible in the bar.
Making it visually visible would be a separate frontend change.

## Enter the content in CMS later

1. In Strapi Content Manager, open the collection named above the relevant table, then find the existing record using its service slug.
2. Open or add its optional **Sticky bar** component.
3. Copy the row’s `title`, `description`, and `supportingText` into the matching fields.
4. Keep the existing CTA, icon, brand logo, points, and logos. These three copy changes do not require edits to those fields.
5. For the bar to render, `enabled` must be `true`, `title` and `description` must be nonempty, and a valid CTA must exist. The frontend treats `supportingText` as optional, but populate it for this content plan.
6. If creating a new bar with no CTA, the supplied reference uses label `Get Free Consultation`, href `/contact-us`, and target `same_tab`.
7. Review the service’s own values, then save and publish that record when ready.

The current schema and shared mapper support these fields on all 19 Corporate/Approval collections.
Adding this copy through Content Manager requires no schema, TypeScript, route, fallback, or seed change.

## Corporate — 105 services

### Company Registration

Collection: `company-registration-page` · Published services: **19**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/sole-proprietorship-registration` | Sole Proprietorship Registration | Company Registration | Get Expert Support for Sole Proprietorship Registration |
| `/corporate/nidhi-company-registration` | Nidhi Company | Company Registration | Get Expert Support for Nidhi Company |
| `/corporate/ngo-registration` | NGO Registration | Company Registration | Get Expert Support for NGO Registration |
| `/corporate/section-8-company-registration` | Section 8 Company | Company Registration | Get Expert Support for Section 8 Company |
| `/corporate/partnership-firm-registration` | Partnership Firm | Company Registration | Get Expert Support for Partnership Firm |
| `/corporate/producer-company-registration` | Producer Company | Company Registration | Get Expert Support for Producer Company |
| `/corporate/indian-subsidiary` | Indian Subsidiary | Company Registration | Get Expert Support for Indian Subsidiary |
| `/corporate/private-limited-company-registration-consultant` | Pvt Ltd Company | Company Registration | Get Expert Support for Pvt Ltd Company |
| `/corporate/insurance-company-registration` | Insurance Company | Company Registration | Get Expert Support for Insurance Company |
| `/corporate/microfinance-company-registration` | RBI Micro Finance Company | Company Registration | Get Expert Support for RBI Micro Finance Company |
| `/corporate/opc-registration` | One Person Company (OPC) | Company Registration | Get Expert Support for One Person Company (OPC) |
| `/corporate/public-limited-company-registration` | Public Limited Company | Company Registration | Get Expert Support for Public Limited Company |
| `/corporate/nbfc-registration` | RBI NBFC Registration | Company Registration | Get Expert Support for RBI NBFC Registration |
| `/corporate/llp-registration` | Limited Liability Partnership (LLP) | Company Registration | Get Expert Support for Limited Liability Partnership (LLP) |
| `/corporate/asset-reconstruction-company-registration` | RBI Asset Reconstruction Registration | Company Registration | Get Expert Support for RBI Asset Reconstruction Registration |
| `/corporate/mutual-fund-company-registration` | RBI Mutual Fund Company Registration | Company Registration | Get Expert Support for RBI Mutual Fund Company Registration |
| `/corporate/foreign-company-registration` | Foreign Company Reg. | Company Registration | Get Expert Support for Foreign Company Reg. |
| `/corporate/trust-registration` | Trust Registration | Company Registration | Get Expert Support for Trust Registration |
| `/corporate/society-registration` | Society Registration | Company Registration | Get Expert Support for Society Registration |

### MCA Services

Collection: `mca-service-page` · Published services: **20**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/dsc-certificate` | DSC | MCA Services | Get Expert Support for DSC |
| `/corporate/organisation-dsc` | Organisation DSC | MCA Services | Get Expert Support for Organisation DSC |
| `/corporate/addition-of-director` | Addition of Director | MCA Services | Get Expert Support for Addition of Director |
| `/corporate/removal-of-director` | Removal of Director | MCA Services | Get Expert Support for Removal of Director |
| `/corporate/dir-3-kyc` | DIR 3 KYC | MCA Services | Get Expert Support for DIR 3 KYC |
| `/corporate/inc-20a` | INC 20A | MCA Services | Get Expert Support for INC 20A |
| `/corporate/adt-1` | ADT -1 | MCA Services | Get Expert Support for ADT -1 |
| `/corporate/co-name-change` | Co. Name Change | MCA Services | Get Expert Support for Co. Name Change |
| `/corporate/alter-in-moa-aoa` | Alter in MOA/AOA | MCA Services | Get Expert Support for Alter in MOA/AOA |
| `/corporate/change-in-company-pan-tan` | Change in Company Pan/Tan | MCA Services | Get Expert Support for Change in Company Pan/Tan |
| `/corporate/name-approval-run-filing` | Name Approval/RUN filing | MCA Services | Get Expert Support for Name Approval/RUN filing |
| `/corporate/company-conversion` | Company Conversion | MCA Services | Get Expert Support for Company Conversion |
| `/corporate/increase-authorize-paid-up-capital` | Increase Authorize/Paid Up Capital | MCA Services | Get Expert Support for Increase Authorize/Paid Up Capital |
| `/corporate/closure-of-a-company` | Closure of a Company | MCA Services | Get Expert Support for Closure of a Company |
| `/corporate/roc-change-address-change` | ROC Change/Address Change | MCA Services | Get Expert Support for ROC Change/Address Change |
| `/corporate/share-transfer` | Share Transfer | MCA Services | Get Expert Support for Share Transfer |
| `/corporate/post-compliance` | Post Compliance | MCA Services | Get Expert Support for Post Compliance |
| `/corporate/roc-compliance` | ROC Compliance | MCA Services | Get Expert Support for ROC Compliance |
| `/corporate/statutory-compliance` | Statutory Compliance | MCA Services | Get Expert Support for Statutory Compliance |
| `/corporate/annual-compliance` | Annual Compliance | MCA Services | Get Expert Support for Annual Compliance |

### Import Export

Collection: `import-export-service-page` · Published services: **9**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/iec-registration` | IEC Code | Import Export | Get Expert Support for IEC Code |
| `/corporate/ad-code` | AD Code | Import Export | Get Expert Support for AD Code |
| `/corporate/ice-gate-registration` | ICE Gate Registration | Import Export | Get Expert Support for ICE Gate Registration |
| `/corporate/port-registration` | Port Registration | Import Export | Get Expert Support for Port Registration |
| `/corporate/apeda-rcmc-registration` | APEDA/ RCMC Registration | Import Export | Get Expert Support for APEDA/ RCMC Registration |
| `/corporate/spice-board-registration` | Spice Board Registration | Import Export | Get Expert Support for Spice Board Registration |
| `/corporate/coffee-board-registration` | Coffee Board Registration | Import Export | Get Expert Support for Coffee Board Registration |
| `/corporate/tea-board-registration` | Tea Board Registration | Import Export | Get Expert Support for Tea Board Registration |
| `/corporate/tobacco-board-registration` | Tobacco Board Registration | Import Export | Get Expert Support for Tobacco Board Registration |

### Government License & Certification

Collection: `government-license-certification-page` · Published services: **9**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/ayush-license` | Ayush License | Government License & Certification | Get Expert Support for Ayush License |
| `/corporate/psara-licence` | Psara Registration | Government License & Certification | Get Expert Support for Psara Registration |
| `/corporate/trade-license` | Trade License | Government License & Certification | Get Expert Support for Trade License |
| `/corporate/nsic-registration` | NSIC Registration | Government License & Certification | Get Expert Support for NSIC Registration |
| `/corporate/rera-registration` | RERA Registration | Government License & Certification | Get Expert Support for RERA Registration |
| `/corporate/gem-registration` | GEM Registration | Government License & Certification | Get Expert Support for GEM Registration |
| `/corporate/iso-all-types` | ISO (ALL TYPES) | Government License & Certification | Get Expert Support for ISO (ALL TYPES) |
| `/corporate/gmp` | GMP | Government License & Certification | Get Expert Support for GMP |
| `/corporate/haccp` | HACCP | Government License & Certification | Get Expert Support for HACCP |

### IPR Services

Collection: `ipr-service-page` · Published services: **18**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/trademark-registration` | TRADEMARK Registration | IPR Services | Get Expert Support for TRADEMARK Registration |
| `/corporate/tm-search` | TM Search | IPR Services | Get Expert Support for TM Search |
| `/corporate/tm-application-filing` | TM Application Filing | IPR Services | Get Expert Support for TM Application Filing |
| `/corporate/formality-check-fail` | Formality Check Fail | IPR Services | Get Expert Support for Formality Check Fail |
| `/corporate/tm-modification` | TM Modification | IPR Services | Get Expert Support for TM Modification |
| `/corporate/tm-objection` | TM Objection | IPR Services | Get Expert Support for TM Objection |
| `/corporate/tm-hearing` | TM Hearing | IPR Services | Get Expert Support for TM Hearing |
| `/corporate/tm-opposition` | TM Opposition | IPR Services | Get Expert Support for TM Opposition |
| `/corporate/trademark-evidence-filing` | Trademark Evidence Filing | IPR Services | Get Expert Support for Trademark Evidence Filing |
| `/corporate/trademark-renewal` | Trademark Renewal | IPR Services | Get Expert Support for Trademark Renewal |
| `/corporate/trademark-transfer` | Trademark Transfer | IPR Services | Get Expert Support for Trademark Transfer |
| `/corporate/lpc` | LPC | IPR Services | Get Expert Support for LPC |
| `/corporate/copyright-registration` | Copyright Registration | IPR Services | Get Expert Support for Copyright Registration |
| `/corporate/copyright-objection` | Copyright Objection | IPR Services | Get Expert Support for Copyright Objection |
| `/corporate/design-registration` | Design Registration | IPR Services | Get Expert Support for Design Registration |
| `/corporate/patent-registration` | Patent Registration | IPR Services | Get Expert Support for Patent Registration |
| `/corporate/legal-agreement` | Legal Agreement | IPR Services | Get Expert Support for Legal Agreement |
| `/corporate/logo-designing` | Logo Designing | IPR Services | Get Expert Support for Logo Designing |

### FSSAI

Collection: `fssai-service-page` · Published services: **7**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/fssai-certificate` | Fssai Basic Registration | FSSAI | Get Expert Support for Fssai Basic Registration |
| `/corporate/fssai-state` | Fssai State | FSSAI | Get Expert Support for Fssai State |
| `/corporate/fssai-central` | Fssai Central | FSSAI | Get Expert Support for Fssai Central |
| `/corporate/fssai-modification` | Fssai Modification | FSSAI | Get Expert Support for Fssai Modification |
| `/corporate/fssai-renewal` | Fssai Renewal | FSSAI | Get Expert Support for Fssai Renewal |
| `/corporate/fssai-return` | Fssai Return | FSSAI | Get Expert Support for Fssai Return |
| `/corporate/water-report` | Water Report | FSSAI | Get Expert Support for Water Report |

### SEBI Business Registration

Collection: `sebi-business-registration-page` · Published services: **1**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/portfolio-manager-registration` | Portfolio Manager Registration | SEBI Business Registration | Get Expert Support for Portfolio Manager Registration |

### Tax & Accounting

Collection: `tax-accounting-page` · Published services: **11**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/gst-registration` | GST Registration | Tax & Accounting | Get Expert Support for GST Registration |
| `/corporate/gst-return` | GST Return | Tax & Accounting | Get Expert Support for GST Return |
| `/corporate/tds-return` | TDS Return | Tax & Accounting | Get Expert Support for TDS Return |
| `/corporate/msme-return-msme-form-1` | MSME Return (MSME Form-1) | Tax & Accounting | Get Expert Support for MSME Return (MSME Form-1) |
| `/corporate/roc-return` | ROC Return | Tax & Accounting | Get Expert Support for ROC Return |
| `/corporate/professional-tax-registration` | Professional Tax Registration | Tax & Accounting | Get Expert Support for Professional Tax Registration |
| `/corporate/income-tax-return-itr` | Income Tax Return (ITR) | Tax & Accounting | Get Expert Support for Income Tax Return (ITR) |
| `/corporate/pan-registration-company` | PAN Registration (Company) | Tax & Accounting | Get Expert Support for PAN Registration (Company) |
| `/corporate/pan-registration-individual` | PAN Registration (Individual) | Tax & Accounting | Get Expert Support for PAN Registration (Individual) |
| `/corporate/accounting` | Accounting | Tax & Accounting | Get Expert Support for Accounting |
| `/corporate/tax-exemption-under-80iac` | Tax Exemption Under 80IAC | Tax & Accounting | Get Expert Support for Tax Exemption Under 80IAC |

### Labour Compliance

Collection: `labour-compliance-page` · Published services: **4**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/shop-and-establishment-act-registration` | Shop & Establishment Registration | Labour Compliance | Get Expert Support for Shop & Establishment Registration |
| `/corporate/esic-registration` | ESIC Registration | Labour Compliance | Get Expert Support for ESIC Registration |
| `/corporate/epf-registration` | EPF Registration | Labour Compliance | Get Expert Support for EPF Registration |
| `/corporate/pf-esi-return` | PF/ESI Return | Labour Compliance | Get Expert Support for PF/ESI Return |

### Fund Raising

Collection: `fund-raising-page` · Published services: **7**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/corporate/msme-registration` | MSME | Fund Raising | Get Expert Support for MSME |
| `/corporate/seed-funding` | Seed Funding | Fund Raising | Get Expert Support for Seed Funding |
| `/corporate/pitch-deck` | Pitch Deck | Fund Raising | Get Expert Support for Pitch Deck |
| `/corporate/niti-ayog` | NITI AYOG | Fund Raising | Get Expert Support for NITI AYOG |
| `/corporate/fcra-registration` | FCRA Registration | Fund Raising | Get Expert Support for FCRA Registration |
| `/corporate/csr` | CSR | Fund Raising | Get Expert Support for CSR |
| `/corporate/startup-india-registration` | Startup India Registration | Fund Raising | Get Expert Support for Startup India Registration |

## Approval — 64 services

### Bureau of Indian Standards

Collection: `bureau-indian-standards-page` · Published services: **5**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/isi-certificate` | ISI Certification | Bureau of Indian Standards | Get Expert Support for ISI Certification |
| `/approval/bis-certification` | Bis Certification | Bureau of Indian Standards | Get Expert Support for Bis Certification |
| `/approval/fmcs-certification` | FMCS Certification | Bureau of Indian Standards | Get Expert Support for FMCS Certification |
| `/approval/crs-certification` | CRS Certification | Bureau of Indian Standards | Get Expert Support for CRS Certification |
| `/approval/scheme-x` | Scheme-X | Bureau of Indian Standards | Get Expert Support for Scheme-X |

### Pollution Advisory

Collection: `pollution-advisory-page` · Published services: **9**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/epr-certification` | Extended Producer's Responsibility (EPR) | Pollution Advisory | Get Expert Support for Extended Producer's Responsibility (EPR) |
| `/approval/epr-e-waste` | EPR- E waste | Pollution Advisory | Get Expert Support for EPR- E waste |
| `/approval/epr-battery-waste` | EPR- Battery waste | Pollution Advisory | Get Expert Support for EPR- Battery waste |
| `/approval/epr-plastic-waste` | EPR- Plastic waste | Pollution Advisory | Get Expert Support for EPR- Plastic waste |
| `/approval/epr-tyre-waste` | EPR- Tyre waste | Pollution Advisory | Get Expert Support for EPR- Tyre waste |
| `/approval/epr-used-oil-waste` | EPR- Used oil waste | Pollution Advisory | Get Expert Support for EPR- Used oil waste |
| `/approval/cpcb-guidelines` | CPCB Guidelines | Pollution Advisory | Get Expert Support for CPCB Guidelines |
| `/approval/delhi-pollution-control-committee` | Delhi Pollution Control Committee | Pollution Advisory | Get Expert Support for Delhi Pollution Control Committee |
| `/approval/state-pollution-board-pollution-control-committee` | State Pollution Board / Pollution Control Committee | Pollution Advisory | Get Expert Support for State Pollution Board / Pollution Control Committee |

### Telecommunication Engineering Centre

Collection: `telecommunication-engineering-centre-page` · Published services: **4**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/dot-certification` | DOT Certification | Telecommunication Engineering Centre | Get Expert Support for DOT Certification |
| `/approval/tec-certification` | TEC Certification | Telecommunication Engineering Centre | Get Expert Support for TEC Certification |
| `/approval/mtcte-certification` | MTCTE Certification | Telecommunication Engineering Centre | Get Expert Support for MTCTE Certification |
| `/approval/nccs-certification` | NCCS Certification | Telecommunication Engineering Centre | Get Expert Support for NCCS Certification |

### Wireless Planning and Coordination

Collection: `wireless-planning-coordination-page` · Published services: **7**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/eta` | ETA | Wireless Planning and Coordination | Get Expert Support for ETA |
| `/approval/dealer-possession-license` | Dealer Possesion License (DPL) | Wireless Planning and Coordination | Get Expert Support for Dealer Possesion License (DPL) |
| `/approval/non-dealer-possession-license` | Non Dealer Possesion License (NDPL) | Wireless Planning and Coordination | Get Expert Support for Non Dealer Possesion License (NDPL) |
| `/approval/experimental-license` | Experimental License | Wireless Planning and Coordination | Get Expert Support for Experimental License |
| `/approval/vhf` | VHF | Wireless Planning and Coordination | Get Expert Support for VHF |
| `/approval/uhf` | UHF | Wireless Planning and Coordination | Get Expert Support for UHF |
| `/approval/demo-license` | Demo License | Wireless Planning and Coordination | Get Expert Support for Demo License |

### Bureau of Energy Efficiency

Collection: `bureau-energy-efficiency-page` · Published services: **2**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/star-labeling` | Star Labeling | Bureau of Energy Efficiency | Get Expert Support for Star Labeling |
| `/approval/energy-conservation-building-code-ecbc` | Energy Conservation Building Code (ECBC) | Bureau of Energy Efficiency | Get Expert Support for Energy Conservation Building Code (ECBC) |

### CDSCO Registration

Collection: `cdsco-registration-page` · Published services: **12**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/mdr-cdsco-registration` | MDR CDSCO Registration | CDSCO Registration | Get Expert Support for MDR CDSCO Registration |
| `/approval/form-md-15-import-license` | Form MD-15 (Import License) | CDSCO Registration | Get Expert Support for Form MD-15 (Import License) |
| `/approval/form-md-5-manufacturing-license` | Form MD-5 (Manufacturing License) | CDSCO Registration | Get Expert Support for Form MD-5 (Manufacturing License) |
| `/approval/form-md-9-manufacturing-license` | Form MD-9 (Manufacturing License) | CDSCO Registration | Get Expert Support for Form MD-9 (Manufacturing License) |
| `/approval/form-md-42-sell-stock-exhibit` | Form MD-42 (Sell, Stock, Exhibit) | CDSCO Registration | Get Expert Support for Form MD-42 (Sell, Stock, Exhibit) |
| `/approval/form-md-6-loan-license` | Form MD-6 (Loan License) | CDSCO Registration | Get Expert Support for Form MD-6 (Loan License) |
| `/approval/form-md-10-loan-license` | Form MD-10 (Loan License) | CDSCO Registration | Get Expert Support for Form MD-10 (Loan License) |
| `/approval/cosmetic-cdsco-registration` | Cosmetic CDSCO Registration | CDSCO Registration | Get Expert Support for Cosmetic CDSCO Registration |
| `/approval/cos-2-cosmetic-import-license` | COS-2 (Cosmetic Import License) | CDSCO Registration | Get Expert Support for COS-2 (Cosmetic Import License) |
| `/approval/cos-8-manufacturing-license` | COS-8 (Manufacturing License) | CDSCO Registration | Get Expert Support for COS-8 (Manufacturing License) |
| `/approval/in-vitro-diagnostics` | CDSCO In Vitro Diagnostics Registration | CDSCO Registration | Get Expert Support for CDSCO In Vitro Diagnostics Registration |
| `/approval/drug-cdsco-registration` | Drug CDSCO Registration | CDSCO Registration | Get Expert Support for Drug CDSCO Registration |

### AERB Approval

Collection: `aerb-approval-page` · Published services: **6**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/aerb-certificate` | AERB Certificate | AERB Approval | Get Expert Support for AERB Certificate |
| `/approval/aerb-diagnostic-x-ray-equipment` | Diagnostic X Ray Equipment | AERB Approval | Get Expert Support for Diagnostic X Ray Equipment |
| `/approval/noc` | NOC | AERB Approval | Get Expert Support for NOC |
| `/approval/type-approval` | Type Approval | AERB Approval | Get Expert Support for Type Approval |
| `/approval/license-for-operations` | License for Operations | AERB Approval | Get Expert Support for License for Operations |
| `/approval/rso` | RSO | AERB Approval | Get Expert Support for RSO |

### LMPC Certification

Collection: `lmpc-certification-page` · Published services: **2**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/packaged-commodity-registration` | Packaged Commodity Registration | LMPC Certification | Get Expert Support for Packaged Commodity Registration |
| `/approval/model-approval` | Model Approval | LMPC Certification | Get Expert Support for Model Approval |

### STQC

Collection: `stqc-page` · Published services: **17**

| Service URL | `title` | `description` | `supportingText` |
| --- | --- | --- | --- |
| `/approval/stqc-certification` | STQC Certification | STQC | Get Expert Support for STQC Certification |
| `/approval/iso-27001-isms` | ISO 27001 ISMS | STQC | Get Expert Support for ISO 27001 ISMS |
| `/approval/iso-9001-qms` | ISO 9001 QMS | STQC | Get Expert Support for ISO 9001 QMS |
| `/approval/iso-20000-itsm` | ISO 20000 ITSM | STQC | Get Expert Support for ISO 20000 ITSM |
| `/approval/biometric-device-certification` | Biometric Devices | STQC | Get Expert Support for Biometric Devices |
| `/approval/smart-card-certification` | Smart Card Certification | STQC | Get Expert Support for Smart Card Certification |
| `/approval/common-criteria-certification` | Common Criteria (IC3S) | STQC | Get Expert Support for Common Criteria (IC3S) |
| `/approval/website-quality-certification` | Website Quality Certification | STQC | Get Expert Support for Website Quality Certification |
| `/approval/software-certification` | Software Certification | STQC | Get Expert Support for Software Certification |
| `/approval/software-testing-assessment` | Software Testing & Assessment | STQC | Get Expert Support for Software Testing & Assessment |
| `/approval/information-security-testing` | Information Security Testing | STQC | Get Expert Support for Information Security Testing |
| `/approval/e-procurement-certification` | e-Procurement (ePS) | STQC | Get Expert Support for e-Procurement (ePS) |
| `/approval/qr-code-scanner-certification` | QR Code Scanner | STQC | Get Expert Support for QR Code Scanner |
| `/approval/iot-system-certification` | IoT System Certification | STQC | Get Expert Support for IoT System Certification |
| `/approval/ncmc-certification` | NCMC Certification | STQC | Get Expert Support for NCMC Certification |
| `/approval/toll-management-certification` | Toll Management (TMS) | STQC | Get Expert Support for Toll Management (TMS) |
| `/approval/s-mark-product-safety` | S-Mark Product Safety | STQC | Get Expert Support for S-Mark Product Safety |

## Adding another Corporate or Approval service later

Use the new record’s actual service title, its existing category label from the route registry, and `Get Expert Support for <service title>`.
Store those literal values in that record’s `stickyBar`; use its actual `/corporate/<slug>` or `/approval/<slug>` URL when extending this inventory.
For an existing slash-separated stored slug, preserve the CMS identity and use only its final segment in the public URL, following the existing routing rules.

## Source references

- [Bootstrap instructions](../bootstrap.md)
- [Service category labels and collection registry](../frontend/lib/service-route-config.ts)
- [Public service slug rules](../frontend/lib/public-paths.ts)
- [Sticky-bar CMS component](../cms/src/components/shared/sticky-bar.json)
- [CTA CMS component](../cms/src/components/shared/cta.json)
- [Existing CMS content contract](../cms/CONTENT_MODEL.md)
- [Shared Strapi mapper](../frontend/lib/strapi.ts)
- [Sticky-bar renderer](../frontend/components/sticky-cta-bar.tsx)

## Validation for this document

Inventory totals, unique public URLs, all 19 collection mappings, and the three copy values were checked against the read-only local CMS inventory and route registry.
Frontend typecheck/build and CMS build were not run because this change adds only this Markdown document.

