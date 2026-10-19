export interface GuideArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: 'International Founders' | 'Cost Analysis' | 'Multi-State Compliance' | 'Legal Reinstatement';
  readTime: string;
  publishedDate: string;
  lastUpdated: string;
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  summary: string;
  tableOfContents: Array<{ id: string; label: string }>;
  content: Array<{
    heading: string;
    id: string;
    body: string;
    subsections?: Array<{ title: string; text: string }>;
    callout?: {
      type: 'warning' | 'tip' | 'statute';
      title: string;
      text: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
      caption?: string;
    };
  }>;
}

export const GUIDES_DATA: Record<string, GuideArticle> = {
  'non-resident-us-llc-tax-guide': {
    slug: 'non-resident-us-llc-tax-guide',
    title: 'The 2026 Non-Resident US LLC Compliance & Tax Guide',
    subtitle: 'Mandatory IRS Form 5472, Form 1120 pro-forma, state franchise taxes, and compliance rules for international founders.',
    category: 'International Founders',
    readTime: '9 min read',
    publishedDate: 'January 15, 2026',
    lastUpdated: 'October 2026',
    author: {
      name: 'Michael Vance, CPA',
      role: 'Cross-Border Corporate Tax Specialist',
      credentials: 'CPA, LL.M. in Taxation',
    },
    summary: 'A definitive, step-by-step statutory compliance blueprint for non-US citizens and remote entrepreneurs operating US limited liability companies via Stripe Atlas, Firstbase, or Doola. Covers federal IRS informational returns, state franchise taxes, and the strict $25,000 penalty regime under IRC § 6038A.',
    tableOfContents: [
      { id: 'irs-classification', label: '1. IRS Classification of Foreign-Owned LLCs' },
      { id: 'form-5472', label: '2. Form 5472 & Pro-Forma 1120 Filing Rules' },
      { id: 'reportable-transactions', label: '3. What Constitutes a Reportable Transaction' },
      { id: 'penalties', label: '4. The $25,000 Failure-to-File Penalty Regime' },
      { id: 'etbus-test', label: '5. The ETBUS Test: Effectively Connected Income' },
      { id: 'state-taxes', label: '6. State Franchise Taxes vs. Federal Obligations' },
      { id: 'compliance-checklist', label: '7. 2026 Non-Resident Filing Checklist' },
    ],
    content: [
      {
        heading: '1. IRS Classification of Foreign-Owned LLCs',
        id: 'irs-classification',
        body: 'Under default US federal tax principles, a single-member limited liability company (SMLLC) is classified as a "disregarded entity" for federal income tax purposes. However, Treasury Regulation § 301.7701-2(c)(2)(vi) treats a foreign-owned domestic disregarded LLC as a domestic corporation solely for the reporting requirements of Internal Revenue Code (IRC) § 6038A. This statutory reclassification means that even if your US LLC generated zero dollars in revenue, had no US customers, and conducted all development activities from abroad, it is strictly required by federal law to file annual informational returns with the IRS.',
        subsections: [
          {
            title: 'Who is Considered a 25% Foreign Shareholder?',
            text: 'Under IRC § 6038A, any non-resident alien, foreign corporation, or foreign partnership that directly or indirectly owns 25% or more of the total voting power or total value of all classes of stock of the entity triggers reporting. In a single-member LLC owned 100% by a non-resident alien, this requirement applies unconditionally.',
          },
        ],
      },
      {
        heading: '2. Form 5472 & Pro-Forma 1120 Filing Rules',
        id: 'form-5472',
        body: 'Every foreign-owned US single-member LLC must submit IRS Form 5472 (Information Return of a 25% Foreign-Owned U.S. Corporation) attached to a "pro-forma" Form 1120 (U.S. Corporation Income Tax Return). On the pro-forma Form 1120, you do NOT report ordinary corporate income calculations. Instead, you only complete the corporate header with your company legal name, address, Employer Identification Number (EIN), formation date, and write "Foreign-owned U.S. DE pursuant to TD 9796" across the top margin.',
        callout: {
          type: 'warning',
          title: 'Filing Method Restrictions',
          text: 'Unlike domestic individual tax returns, pro-forma Form 1120 with Form 5472 cannot be e-filed through commercial tax software by foreign-owned disregarded entities without specialized IRS-authorized e-file transmitters. The primary official submission methods are secure fax to the IRS Ogden Service Center (+1-855-887-0024) or tracked international courier mail.',
        },
      },
      {
        heading: '3. What Constitutes a Reportable Transaction',
        id: 'reportable-transactions',
        body: 'Under Part IV of Form 5472, the IRS mandates the disclosure of all monetary and non-monetary transactions between the reporting LLC and the foreign owner or related parties during the tax year. Founders often incorrectly assume that only sales revenue counts as a transaction.',
        table: {
          caption: 'Common Reportable Transactions under IRC § 6038A',
          headers: ['Transaction Type', 'Form 5472 Line Item', 'Mandatory Reporting Requirement'],
          rows: [
            ['Capital Contributions', 'Part IV, Line 19', 'Initial capital injected to open Mercury/Relay bank accounts'],
            ['Owner Distributions', 'Part IV, Line 20', 'Profit withdrawals sent to foreign personal accounts or Wise'],
            ['Loans & Advances', 'Part IV, Lines 21–22', 'Founder personal funds loaned to LLC for SaaS hosting/tools'],
            ['Expense Reimbursements', 'Part IV, Line 23', 'Reimbursements for formation or legal fees paid by founder'],
            ['Software & License Fees', 'Part IV, Line 14', 'Royalties or software licenses granted by founder to LLC'],
          ],
        },
      },
      {
        heading: '4. The $25,000 Failure-to-File Penalty Regime',
        id: 'penalties',
        body: 'The IRS treats non-filing of Form 5472 with extreme statutory severity. Under IRC § 6038A(d), the statutory penalty for failing to file Form 5472 by the due date (April 15, or October 15 with extension Form 7004), or for filing an incomplete or inaccurate form, is an automatic $25,000 per violation per year. If the failure continues for more than 90 days after notification from the IRS, an additional $25,000 penalty is assessed for each 30-day period with no statutory maximum cap.',
        subsections: [
          {
            title: 'Can the $25,000 Penalty Be Abated?',
            text: 'Abatement is strictly limited to demonstrable "reasonable cause" under Treas. Reg. § 1.6038A-4(b). Ignorance of the law or relying on unverified internet blogs does not meet the legal standard for reasonable cause. Professional CPA representation and contemporaneous written records are required to request penalty relief.',
          },
        ],
      },
      {
        heading: '5. The ETBUS Test: Effectively Connected Income',
        id: 'etbus-test',
        body: 'Non-resident founders frequently ask whether their US LLC owes US federal personal income tax. As a non-resident alien, you are only subject to US federal income tax if your business is "Engaged in a Trade or Business in the United States" (ETBUS) and earns Effectively Connected Income (ECI) under IRC § 864.',
        callout: {
          type: 'tip',
          title: 'The Physical Presence Rule',
          text: 'If you have no employees physically residing in the US, maintain no US office, warehouse, or retail showroom, and work exclusively from outside the US, you are generally NOT ETBUS. In this scenario, you owe $0 in US federal income tax on your business profits, but you must still file Form 5472.',
        },
      },
      {
        heading: '6. State Franchise Taxes vs. Federal Obligations',
        id: 'state-taxes',
        body: 'Filing your federal IRS returns does NOT satisfy your state-level legal obligations. State franchise taxes are excise charges for legal charter existence, completely separate from federal tax returns. For example, if you formed in Delaware, you owe Delaware $400 by June 1 (under HB 400). If you formed in Wyoming, you owe at least $60 by the anniversary month. If you formed in Florida, you owe $138.75 by May 1. State Secretary of State filings must be completed annually to prevent administrative dissolution.',
      },
      {
        heading: '7. 2026 Non-Resident Filing Checklist',
        id: 'compliance-checklist',
        body: 'To ensure complete compliance across all 50 states and federal regulatory bodies in 2026, follow this statutory timeline: (1) Maintain an Employer Identification Number (EIN). (2) Track every financial interaction between yourself and the company. (3) Prepare and file Form 5472 + pro-forma Form 1120 by April 15 (or file Form 7004 for a 6-month extension to October 15). (4) Submit state Secretary of State annual report/franchise tax before the state-specific deadline. (5) File FinCEN Beneficial Ownership Information (BOI) reports upon initial formation or whenever ownership changes. (6) Retain registered agent service in your charter state.',
      },
    ],
  },

  'delaware-vs-wyoming-vs-florida': {
    slug: 'delaware-vs-wyoming-vs-florida',
    title: 'Delaware vs. Wyoming vs. Florida LLC: 3-Year True Cost Analysis',
    subtitle: 'Uncovering hidden franchise taxes, asset assessments, and late penalty traps across the top 3 incorporation states.',
    category: 'Cost Analysis',
    readTime: '8 min read',
    publishedDate: 'February 10, 2026',
    lastUpdated: 'October 2026',
    author: {
      name: 'Sarah Jenkins, Esq.',
      role: 'Commercial Entity & Corporate Attorney',
      credentials: 'J.D., Member of the California & Delaware Bar',
    },
    summary: 'A mathematical and statutory comparison of recurring maintenance costs in Delaware, Wyoming, and Florida. Explores Delaware’s 2026 tax hike to $400 under HB 400, Wyoming’s asset-based license tax structure, and Florida’s non-waivable $400 late fee.',
    tableOfContents: [
      { id: 'overview', label: '1. The Formation Fee Illusion' },
      { id: 'delaware-costs', label: '2. Delaware: HB 400 Tax Hike & Court of Chancery' },
      { id: 'wyoming-costs', label: '3. Wyoming: Privacy & Asset-Tier Mechanics' },
      { id: 'florida-costs', label: '4. Florida: Zero Income Tax & The $400 Late Trap' },
      { id: 'cost-table', label: '5. 3-Year Total Cost Comparison Matrix' },
      { id: 'verdict', label: '6. Strategic Recommendations by Business Type' },
    ],
    content: [
      {
        heading: '1. The Formation Fee Illusion',
        id: 'overview',
        body: 'Entrepreneurs often select their incorporation state based solely on initial setup costs ($50 in Wyoming vs. $90 in Delaware vs. $125 in Florida). This is an expensive mistake. The initial formation fee is paid once, whereas state franchise taxes, annual list charges, and registered agent fees compound every single year over the life of your business. Over a 36-month horizon, recurring state compliance represents 80% to 92% of your legal entity overhead.',
      },
      {
        heading: '2. Delaware: HB 400 Tax Hike & Court of Chancery',
        id: 'delaware-costs',
        body: 'Historically, Delaware assessed a flat $300 annual franchise tax on LLCs. Effective for the 2026 tax year, Delaware enacted House Bill 400 (HB 400), increasing the mandatory annual franchise tax to $400. It is due June 1 annually. Missing June 1 triggers an automatic $200 late penalty plus 1.5% compounding monthly interest on the $600 delinquent balance. Delaware requires no public annual disclosure of members, making it private and contractually prestigious, but expensive for small solo operations.',
        subsections: [
          {
            title: 'Court of Chancery vs. High Annual Tax',
            text: 'Delaware is the gold standard for institutional venture capital because of its Court of Chancery, where corporate litigation is decided by specialized chancellors rather than juries. However, 95% of early-stage LLCs never face shareholder litigation, making the $400 annual flat tax an unnecessary overhead burden for solo consulting or bootstrapped software businesses.',
          },
        ],
      },
      {
        heading: '3. Wyoming: Privacy & Asset-Tier Mechanics',
        id: 'wyoming-costs',
        body: 'Wyoming is widely recognized as the most cost-effective and private jurisdiction in the United States. Its baseline annual license tax is $60, due on the first day of the anniversary month of formation. If your business holds over $300,000 in tangible assets physically located inside Wyoming, the tax is calculated as two-tenths of one mill on the dollar ($0.0002). For internet businesses with zero physical property in Wyoming, the annual tax remains capped at $60 indefinitely.',
        callout: {
          type: 'tip',
          title: 'Charging Order Protection',
          text: 'Wyoming statutory law (Wyo. Stat. § 17-29-503) provides single-member LLCs with statutory charging order protection as the exclusive legal remedy for personal creditors, shielding entity assets from seizure.',
        },
      },
      {
        heading: '4. Florida: Zero Income Tax & The $400 Late Trap',
        id: 'florida-costs',
        body: 'Florida charges a $138.75 annual report fee due May 1 on Sunbiz.org. Florida has 0% state personal income tax on pass-through LLC profits. However, Florida enforces the most punishing late penalty in the nation: if the report is filed even one minute late on May 2, an automatic, non-negotiable statutory late fine of $400 is added, raising the total fee to $538.75. The statutory waiver provision was repealed by the Florida Legislature, making this fine permanent and mandatory.',
      },
      {
        heading: '5. 3-Year Total Cost Comparison Matrix',
        id: 'cost-table',
        body: 'The table below details total mandatory statutory cash outflow over a 3-year operating period for a typical online business, assuming $100/year registered agent expenses.',
        table: {
          caption: '3-Year Statutory Cost Comparison: DE vs. WY vs. FL',
          headers: ['Metric', 'Delaware (DE)', 'Wyoming (WY)', 'Florida (FL)'],
          rows: [
            ['Initial Filing Fee', '$90.00', '$50.00', '$125.00'],
            ['Annual Base Tax', '$400.00 / yr (HB 400)', '$60.00 / yr', '$138.75 / yr'],
            ['Annual Report Schedule', 'June 1 Fixed', 'Anniversary Month', 'May 1 Fixed'],
            ['Statutory Late Penalty', '+$200.00 + 1.5% mo.', '+$50.00 after 60 days', '+$400.00 immediate (May 2)'],
            ['Registered Agent (3 Yrs)', '$300.00 ($100/yr)', '$300.00 ($100/yr)', '$300.00 ($100/yr)'],
            ['3-Year Total Minimum Cost', '$1,590.00', '$530.00', '$841.25'],
            ['Privacy Standard', 'High (No public members)', 'Maximum (No public officers)', 'Low (Public on Sunbiz)'],
          ],
        },
      },
      {
        heading: '6. Strategic Recommendations by Business Type',
        id: 'verdict',
        body: 'If you are building an online business, freelancing, or bootstrapping an international software company, Wyoming offers the best combination of low fees and statutory privacy. If you operate physical retail, consulting, or local services in Florida, incorporate locally in Florida. If you intend to raise institutional venture capital, incorporate a Delaware C-Corporation rather than an LLC.',
      },
    ],
  },

  'foreign-llc-qualification-rules': {
    slug: 'foreign-llc-qualification-rules',
    title: 'The Foreign LLC Doing Business Trap: When Multi-State Filing is Mandatory',
    subtitle: 'Why forming in Delaware or Wyoming doesn’t exempt you from home state taxes, and how to avoid double franchise fees.',
    category: 'Multi-State Compliance',
    readTime: '8 min read',
    publishedDate: 'March 1, 2026',
    lastUpdated: 'October 2026',
    author: {
      name: 'David Reynolds, CPA',
      role: 'State & Local Tax (SALT) Director',
      credentials: 'CPA, MST',
    },
    summary: 'An indispensable guide for remote founders and tech creators residing in high-tax states like California, New York, or Illinois who formed out-of-state entities. Analyzes the statutory legal definition of "transacting intrastate business", foreign qualification registration, and penalties for unauthorized operations.',
    tableOfContents: [
      { id: 'the-myth', label: '1. The Out-of-State Incorporation Myth' },
      { id: 'doing-business-test', label: '2. The Statutory "Doing Business" Test' },
      { id: 'california-case-study', label: '3. Case Study: California Revenue & Tax Code § 23101' },
      { id: 'penalties-noncompliance', label: '4. Penalties for Failure to Foreign Qualify' },
      { id: 'how-to-fix', label: '5. Step-by-Step Remediation Procedure' },
    ],
    content: [
      {
        heading: '1. The Out-of-State Incorporation Myth',
        id: 'the-myth',
        body: 'One of the most persistent misconceptions on the internet is that forming an LLC in a zero-tax state like Wyoming or Nevada allows you to escape taxes in the state where you live. State revenue departments have comprehensive statutory rules designed to capture revenue from businesses operating within their borders, regardless of where the entity’s charter was originally granted.',
      },
      {
        heading: '2. The Statutory "Doing Business" Test',
        id: 'doing-business-test',
        body: 'Every US state defines what constitutes "transacting intrastate business" within its commercial statutes. You are legally doing business in a state if you meet any of the following statutory nexus triggers:',
        table: {
          caption: 'State Nexus Triggers Mandating Foreign LLC Registration',
          headers: ['Nexus Type', 'Statutory Trigger Criteria', 'Mandatory Action'],
          rows: [
            ['Physical Presence', 'Maintaining a physical office, desk, or retail location', 'Register Foreign LLC with SOS'],
            ['Payroll Nexus', 'Hiring employees or paying remote staff living in the state', 'Register Foreign LLC + Payroll Tax Account'],
            ['Inventory Nexus', 'Storing inventory in warehouses (including Amazon FBA)', 'Register Foreign LLC + Sales Tax Permit'],
            ['Economic Nexus', 'Exceeding revenue thresholds (e.g., $100k-$500k in sales)', 'Register for State Sales & Income Tax'],
            ['Managerial Nexus', 'Managing members actively directing business from home', 'Register Foreign LLC in residence state'],
          ],
        },
      },
      {
        heading: '3. Case Study: California Revenue & Tax Code § 23101',
        id: 'california-case-study',
        body: 'Under California Rev. & Tax. Code § 23101, an LLC is legally considered "doing business" in California if any member or manager conducts management activities from within the state, or if California sales exceed statutory economic nexus thresholds. If you live in Los Angeles and form a Wyoming LLC, California mandates that you register as a Foreign LLC with the CA Secretary of State and pay California’s $800 minimum franchise tax (FTB 3522) ON TOP of Wyoming’s $60 annual fee.',
        callout: {
          type: 'statute',
          title: 'Dual Maintenance Reality',
          text: 'Failing to register while operating in California results in retroactive assessment of the $800 annual minimum tax for all back years, plus a 25% failure-to-file penalty, interest, and loss of contract enforceability under Cal. Rev. & Tax. Code § 23304.1.',
        },
      },
      {
        heading: '4. Penalties for Failure to Foreign Qualify',
        id: 'penalties-noncompliance',
        body: 'If an out-of-state LLC transacts business without obtaining a Certificate of Authority, states enforce severe legal consequences: (1) Door-Closing Statutes: The LLC cannot maintain or initiate a lawsuit in state courts to collect unpaid client debts or enforce contracts. (2) Fines & Back Taxes: States assess statutory civil fines (up to $500/year or $20/day) plus all delinquent franchise taxes. (3) Member Liability: Some jurisdictions strip the liability shield, exposing owners to personal legal claims.',
      },
      {
        heading: '5. Step-by-Step Remediation Procedure',
        id: 'how-to-fix',
        body: 'If you have been operating an out-of-state LLC from your home state without foreign qualification, you can resolve the issue by: (1) Obtaining a Certificate of Good Standing from your formation state. (2) Submitting an Application for Registration as a Foreign LLC with your home Secretary of State. (3) Appointing an in-state registered agent. (4) Filing retroactive state tax returns if revenue was earned in prior years.',
      },
    ],
  },

  'how-to-reinstate-dissolved-llc': {
    slug: 'how-to-reinstate-dissolved-llc',
    title: 'LLC Administrative Dissolution & Forfeiture: Reinstatement Guide',
    subtitle: 'What happens when you miss annual report deadlines, losing limited liability protection, and step-by-step restoration.',
    category: 'Legal Reinstatement',
    readTime: '8 min read',
    publishedDate: 'March 20, 2026',
    lastUpdated: 'October 2026',
    author: {
      name: 'Sarah Jenkins, Esq.',
      role: 'Commercial Entity & Corporate Attorney',
      credentials: 'J.D., Member of the California & Delaware Bar',
    },
    summary: 'A detailed legal explainer covering the administrative dissolution and charter revocation process across US states. Explains why administrative dissolution destroys the corporate liability veil and provides a practical roadmap to file Articles of Reinstatement.',
    tableOfContents: [
      { id: 'what-is-dissolution', label: '1. What is Administrative Dissolution?' },
      { id: 'liability-consequences', label: '2. The Danger: Piercing the Corporate Veil' },
      { id: 'state-timelines', label: '3. State Dissolution Timelines & Late Fees' },
      { id: 'reinstatement-steps', label: '4. Step-by-Step Reinstatement Procedure' },
      { id: 'lost-name-risk', label: '5. The Business Name Forfeiture Risk' },
    ],
    content: [
      {
        heading: '1. What is Administrative Dissolution?',
        id: 'what-is-dissolution',
        body: 'Administrative dissolution occurs when a Secretary of State or state department of revenue revokes an LLC’s legal charter due to failure to file annual reports, failure to pay franchise taxes, or failure to maintain an active registered agent. Unlike voluntary dissolution (where owners choose to wind down a business), administrative dissolution is an involuntary enforcement action taken by the state government.',
      },
      {
        heading: '2. The Danger: Piercing the Corporate Veil',
        id: 'liability-consequences',
        body: 'The greatest danger of administrative dissolution is the immediate destruction of your limited liability protection. When an LLC is dissolved or forfeited, it legally ceases to exist as an independent corporate entity. If you continue operating, signing contracts, or selling products while the entity is administratively dissolved, state courts can hold members and managers personally liable for business debts and lawsuits.',
        callout: {
          type: 'warning',
          title: 'Court Precedents on Personal Liability',
          text: 'In numerous appellate decisions, courts have ruled that contracts executed while an LLC was dissolved create personal liability for the executing officer, because no legal entity existed with the authority to enter into agreements.',
        },
      },
      {
        heading: '3. State Dissolution Timelines & Late Fees',
        id: 'state-timelines',
        body: 'Dissolution timelines vary widely by jurisdiction: (1) Florida: Annual reports are due May 1. Late fee of $400 is assessed May 2. Administrative dissolution occurs on the fourth Friday in September. Reinstatement costs $538.75 plus a $100 reinstatement fee ($638.75 total). (2) Delaware: Unpaid taxes incur $200 penalty and 1.5% interest. If delinquent for two years, the charter is declared void by the Governor. (3) Texas: Missing the May 15 PIR report forfeits corporate privileges, followed by tax charter forfeiture under Chapter 171.',
        table: {
          caption: 'Administrative Dissolution Consequences Across Major Jurisdictions',
          headers: ['State', 'Default Deadline', 'Statutory Late Fee', 'Dissolution Threshold', 'Reinstatement Cost'],
          rows: [
            ['Florida (FL)', 'May 1', '$400.00 flat', '4th Friday of September', '$638.75 + back fees'],
            ['Delaware (DE)', 'June 1', '$200.00 + 1.5%/mo.', '2 consecutive delinquent years', '$200 penalty + interest + $400/yr tax'],
            ['California (CA)', 'April 15 (FTB 3522)', '5%/mo up to 25% + interest', 'FTB suspension after notice', '$800/yr + revivor fee + penalty'],
            ['Texas (TX)', 'May 15', '$50.00 + 5-10% penalty', 'Chapter 171 forfeiture', 'Back PIR reports + 10% penalty'],
            ['Wyoming (WY)', 'Anniversary Month', '$50.00 after 60 days', 'Revocation after 60 days', '$300 reinstatement fee + back taxes'],
          ],
        },
      },
      {
        heading: '4. Step-by-Step Reinstatement Procedure',
        id: 'reinstatement-steps',
        body: 'To reinstate an administratively dissolved LLC: (1) Order a Status Certificate or Tax Clearance Certificate from the Department of Revenue confirming all taxes are settled. (2) File all past-due annual reports and pay all delinquent fees and accumulated penalties. (3) Submit an Application for Reinstatement (or Certificate of Revival) with the Secretary of State. (4) Verify that your registered agent service is active.',
      },
      {
        heading: '5. The Business Name Forfeiture Risk',
        id: 'lost-name-risk',
        body: 'In most states, when an entity is administratively dissolved, its legal business name becomes available for registration by any other member of the public after a statutory grace period (often 1 to 3 years). If a competitor registers your business name while your company is forfeited, you will be forced to choose an entirely new name upon reinstatement.',
      },
    ],
  },

  'california-800-franchise-tax-exemption-guide': {
    slug: 'california-800-franchise-tax-exemption-guide',
    title: 'California $800 Franchise Tax: Exemption Rules, AB 85, and Gross Receipts Surcharges',
    subtitle: 'Everything founders need to know about Form FTB 3522, first-year exemptions under AB 85, and FTB Form 3536 fee tiers.',
    category: 'Multi-State Compliance',
    readTime: '9 min read',
    publishedDate: 'April 5, 2026',
    lastUpdated: 'October 2026',
    author: {
      name: 'David Reynolds, CPA',
      role: 'State & Local Tax (SALT) Director',
      credentials: 'CPA, MST',
    },
    summary: 'A comprehensive regulatory analysis of California’s mandatory $800 annual franchise tax under Cal. Rev. & Tax. Code § 17941. Explains the AB 85 first-year relief rules, FTB Form 3522 due dates, progressive gross receipts fee schedules under Form FTB 3536, and the biennial Statement of Information (LLC-12).',
    tableOfContents: [
      { id: 'california-statutory-basis', label: '1. Statutory Authority: Cal. Rev. & Tax. Code § 17941' },
      { id: 'ab-85-first-year-relief', label: '2. The AB 85 First-Year Exemption Explained' },
      { id: 'ftb-3522-deadlines', label: '3. Form FTB 3522 Filing Deadlines & Traps' },
      { id: 'ftb-3536-gross-receipts', label: '4. Progressive Gross Receipts Fee Schedule (FTB 3536)' },
      { id: 'statement-of-information', label: '5. Biennial Statement of Information (Form LLC-12)' },
      { id: 'suspension-consequences', label: '6. FTB Suspension & Voidability of Contracts' },
    ],
    content: [
      {
        heading: '1. Statutory Authority: Cal. Rev. & Tax. Code § 17941',
        id: 'california-statutory-basis',
        body: 'Every limited liability company (LLC) that is formed in California, registered to do business in California, or transacting intrastate business in California is subject to an annual minimum franchise tax of $800 under California Revenue and Taxation Code (R&TC) § 17941. This statutory tax is an excise fee levied for the privilege of exercising corporate powers inside California, meaning it is owed even if the LLC is inactive, generates zero revenue, or operates at a net financial loss.',
      },
      {
        heading: '2. The AB 85 First-Year Exemption Explained',
        id: 'ab-85-first-year-relief',
        body: 'Under California Assembly Bill 85 (AB 85), enacted to assist small business formation, LLCs that organize or register in California between January 1, 2021, and December 31, 2026, receive a statutory exemption from the $800 annual minimum franchise tax for their FIRST taxable year only. However, founders must understand three critical nuances: (1) The exemption applies solely to the $800 minimum franchise tax; it does NOT exempt the LLC from the gross receipts surcharge under FTB Form 3536. (2) The tax year is based on California taxable days—if you form in December, your first tax year is only one month long. (3) In Year 2, the $800 tax is due on the 15th day of the 4th month.',
        callout: {
          type: 'tip',
          title: 'The Short Tax Year Trap',
          text: 'If your LLC files Articles of Organization on December 15, your first taxable year ends on December 31 (a 16-day tax year). Your AB 85 exemption is consumed by those 16 days, and your second tax year begins January 1, requiring the full $800 payment by April 15.',
        },
      },
      {
        heading: '3. Form FTB 3522 Filing Deadlines & Traps',
        id: 'ftb-3522-deadlines',
        body: 'The $800 annual franchise tax is remitted to the California Franchise Tax Board (FTB) using Form FTB 3522 (LLC Tax Voucher). For calendar-year entities, payment is strictly due on or before April 15 of the taxable year (not the following year). Failure to pay on time results in a 5% monthly penalty up to 25%, plus statutory compounding interest under R&TC § 19101.',
      },
      {
        heading: '4. Progressive Gross Receipts Fee Schedule (FTB 3536)',
        id: 'ftb-3536-gross-receipts',
        body: 'In addition to the $800 baseline minimum franchise tax, California imposes an additional progressive fee under R&TC § 17942 on LLCs with total California-apportioned gross receipts of $250,000 or greater. This fee is calculated and reported on Form FTB 3536 (Estimated Fee for LLCs) and Form 568.',
        table: {
          caption: 'California LLC Gross Receipts Fee Brackets (FTB Form 3536 / Form 568)',
          headers: ['California Gross Receipts Bracket', 'Statutory Additional Fee', 'Total Minimum State Tax'],
          rows: [
            ['Under $250,000', '$0.00', '$800.00'],
            ['$250,000 to $499,999', '$900.00', '$1,700.00'],
            ['$500,000 to $999,999', '$2,500.00', '$3,300.00'],
            ['$1,000,000 to $4,999,999', '$6,000.00', '$6,800.00'],
            ['$5,000,000 and Over', '$11,790.00', '$12,590.00'],
          ],
        },
      },
      {
        heading: '5. Biennial Statement of Information (Form LLC-12)',
        id: 'statement-of-information',
        body: 'Completely separate from the Franchise Tax Board tax filings, the California Secretary of State requires every LLC to file a Statement of Information (Form LLC-12) every two years (biennially). The initial filing is due within 90 days of formation, followed by biennial filings during the calendar month of formation. The statutory filing fee is $20.00. Failing to submit Form LLC-12 triggers an automatic $250 penalty assessed by the FTB on behalf of the Secretary of State.',
      },
      {
        heading: '6. FTB Suspension & Voidability of Contracts',
        id: 'suspension-consequences',
        body: 'If an LLC fails to pay the $800 annual tax, fails to submit Form FTB 3536, or fails to file Form 568, the FTB initiates administrative suspension. Under California R&TC § 23304.1, all contracts executed by a suspended LLC during the suspension period are voidable at the discretion of the opposing contracting party. Furthermore, suspended LLCs lose all rights to prosecute or defend legal claims in California courts.',
      },
    ],
  },

  'texas-franchise-tax-no-tax-due-report': {
    slug: 'texas-franchise-tax-no-tax-due-report',
    title: 'Texas Franchise Tax 2026/2027: PIR Form 05-102 and the $2.47M Threshold',
    subtitle: 'Understanding Texas Comptroller Chapter 171 rules, the No Tax Due threshold, and Public Information Reports.',
    category: 'Cost Analysis',
    readTime: '7 min read',
    publishedDate: 'April 12, 2026',
    lastUpdated: 'October 2026',
    author: {
      name: 'Michael Vance, CPA',
      role: 'Cross-Border Corporate Tax Specialist',
      credentials: 'CPA, LL.M. in Taxation',
    },
    summary: 'A detailed operational guide to Texas franchise tax obligations under Texas Tax Code Chapter 171. Explains the $2.47M revenue threshold exemption, the mandatory Public Information Report (PIR), the May 15 statutory deadline, and avoiding corporate charter forfeiture.',
    tableOfContents: [
      { id: 'texas-threshold', label: '1. The $2.47M No Tax Due Threshold' },
      { id: 'mandatory-pir', label: '2. The Mandatory Public Information Report (PIR)' },
      { id: 'may-15-deadline', label: '3. May 15 Deadline & The $50 Late Penalty' },
      { id: 'chapter-171-forfeiture', label: '4. Texas Comptroller Forfeiture of Corporate Privileges' },
      { id: 'tax-calculation-methods', label: '5. Margin Tax Calculation Methods (For Entities Over $2.47M)' },
    ],
    content: [
      {
        heading: '1. The $2.47M No Tax Due Threshold',
        id: 'texas-threshold',
        body: 'The Texas franchise tax is an entity-level privilege tax imposed on taxable entities organized or doing business in Texas under Texas Tax Code Chapter 171. Under Senate Bill 3 (SB 3) enacted by the 88th Texas Legislature, the "No Tax Due" revenue threshold was increased to $2.47 million for reports due in 2024 through 2027. If your LLC’s total annualized gross revenue is at or below $2,470,000, your statutory franchise tax liability is exactly $0.00.',
      },
      {
        heading: '2. The Mandatory Public Information Report (PIR)',
        id: 'mandatory-pir',
        body: 'While entities below the $2.47 million threshold owe $0.00 in franchise taxes, they are NOT exempt from annual filing requirements. Under Texas law, every LLC must annually submit a Public Information Report (PIR, Form 05-102) to the Texas Comptroller of Public Accounts. The PIR lists current company officers, directors, managers, and registered agent details. Starting in 2024, entities below the threshold no longer need to file Form 05-163 (No Tax Due Report), but filing the PIR remains strictly mandatory.',
        callout: {
          type: 'warning',
          title: 'The Zero-Revenue Trap',
          text: 'Failing to file the Public Information Report because your LLC earned zero revenue or owed zero tax is the single most common cause of corporate charter forfeiture in Texas.',
        },
      },
      {
        heading: '3. May 15 Deadline & The $50 Late Penalty',
        id: 'may-15-deadline',
        body: 'Texas franchise tax reports and PIR filings are strictly due on or before May 15 each year. If May 15 falls on a weekend or legal holiday, the deadline moves to the next business day. Under Texas Tax Code § 171.362, an entity that fails to file a report when due incurs an immediate $50 penalty, even if no tax was owed. If tax is owed, an additional 5% penalty is assessed immediately on May 16, rising to 10% after 30 days.',
      },
      {
        heading: '4. Texas Comptroller Forfeiture of Corporate Privileges',
        id: 'chapter-171-forfeiture',
        body: 'If an LLC fails to file its annual PIR or settle outstanding penalties, the Comptroller initiates forfeiture under Chapter 171. Forfeiture occurs in two statutory stages: (1) Forfeiture of Corporate Privileges: The company loses the right to sue or defend in Texas courts, and members become personally liable for debts created after the date of forfeiture under § 171.255. (2) Forfeiture of Charter: The Secretary of State revokes the legal existence of the entity.',
      },
      {
        heading: '5. Margin Tax Calculation Methods (For Entities Over $2.47M)',
        id: 'tax-calculation-methods',
        body: 'For businesses with annual revenue exceeding $2.47 million, Texas assesses franchise tax based on "Taxable Margin". Taxable margin is calculated using the lowest of four formulas: (1) 70% of total revenue. (2) Total revenue minus cost of goods sold (COGS). (3) Total revenue minus compensation (capped per employee). (4) Total revenue minus $1 million. The tax rate is 0.75% for wholesale/retail and 0.375% for other industries.',
      },
    ],
  },

  'delaware-hb-400-tax-hike-compliance': {
    slug: 'delaware-hb-400-tax-hike-compliance',
    title: 'Delaware HB 400 Compliance Guide: The $400 LLC Flat Franchise Tax',
    subtitle: 'Detailed analysis of Delaware’s statutory tax increase, June 1 deadlines, and the non-waivable $200 penalty.',
    category: 'Cost Analysis',
    readTime: '7 min read',
    publishedDate: 'April 20, 2026',
    lastUpdated: 'October 2026',
    author: {
      name: 'Sarah Jenkins, Esq.',
      role: 'Commercial Entity & Corporate Attorney',
      credentials: 'J.D., Member of the California & Delaware Bar',
    },
    summary: 'A legal examination of Delaware House Bill 400 (HB 400) enacted by the 152nd General Assembly. Explains the increase from $300 to $400 for LLC annual franchise taxes under 6 Del. C. § 18-1107, June 1 deadline enforcement, and online payment portal procedures.',
    tableOfContents: [
      { id: 'hb-400-legislative-overview', label: '1. Legislative Overview: House Bill 400' },
      { id: 'june-1-cutoff', label: '2. The June 1 Statutory Deadline' },
      { id: 'the-200-late-penalty', label: '3. The $200 Non-Waivable Penalty & Interest' },
      { id: 'llc-vs-c-corp-delaware', label: '4. Delaware LLC vs. Delaware C-Corp Tax Calculations' },
      { id: 'efiling-portal-walkthrough', label: '5. Division of Corporations E-Filing Procedure' },
    ],
    content: [
      {
        heading: '1. Legislative Overview: House Bill 400',
        id: 'hb-400-legislative-overview',
        body: 'During the 152nd General Assembly, the State of Delaware enacted House Bill 400 (HB 400), amending Title 6 and Title 8 of the Delaware Code. Under amended 6 Del. C. § 18-1107, the annual flat franchise tax assessed on limited liability companies, limited partnerships (LPs), and general partnerships (GPs) was increased from $300.00 to $400.00, effective for tax years beginning on or after January 1, 2026. This marks Delaware’s first major LLC fee adjustment in several years.',
      },
      {
        heading: '2. The June 1 Statutory Deadline',
        id: 'june-1-cutoff',
        body: 'The Delaware LLC franchise tax is due on or before June 1 annually. Unlike domestic Delaware corporations (whose annual reports are due March 1), LLCs and LPs are given until June 1 to remit their flat $400 tax. There are no state extensions available under Delaware law for the franchise tax payment.',
      },
      {
        heading: '3. The $200 Non-Waivable Penalty & Interest',
        id: 'the-200-late-penalty',
        body: 'Under 6 Del. C. § 18-1107(b), if the annual $400 tax is not received by the Delaware Division of Corporations on or before June 1, an automatic, non-waivable statutory late penalty of $200.00 is assessed on June 2. Furthermore, interest begins accruing immediately at a rate of 1.5% per month (18% annualized) on the combined delinquent balance ($600.00 total: $400 tax + $200 late penalty), adding at least $9.00 per month in compounded interest.',
        callout: {
          type: 'statute',
          title: 'Mandatory Statutory Language',
          text: 'Delaware state law prohibits the Secretary of State from waiving the $200 penalty or interest unless the taxpayer can demonstrate an official error made by the Division of Corporations.',
        },
      },
      {
        heading: '4. Delaware LLC vs. Delaware C-Corp Tax Calculations',
        id: 'llc-vs-c-corp-delaware',
        body: 'It is essential to distinguish between Delaware LLC franchise taxes and Delaware Corporation franchise taxes. LLCs pay a flat $400 annual fee with no financial reports required. Corporations, however, must file a detailed Annual Report and calculate franchise tax using either the Authorized Shares Method ($175 minimum to $200,000 maximum) or the Assumed Par Value Capital Method ($400 minimum).',
        table: {
          caption: 'Delaware Legal Entities Compared: LLC vs. C-Corporation',
          headers: ['Feature', 'Delaware LLC', 'Delaware C-Corporation'],
          rows: [
            ['Governing Statute', '6 Del. C. § 18-1107', '8 Del. C. § 503'],
            ['Annual Franchise Tax', 'Flat $400.00', 'Calculated ($175 to $200,000)'],
            ['Annual Report Form', 'None required for LLCs', 'Mandatory Corporate Annual Report ($50 fee)'],
            ['Filing Deadline', 'June 1 annually', 'March 1 annually'],
            ['Statutory Late Penalty', '$200.00 + 1.5%/month', '$200.00 + 1.5%/month'],
            ['Public Director Disclosure', 'None (Private)', 'Mandatory (Directors listed publicly)'],
          ],
        },
      },
      {
        heading: '5. Division of Corporations E-Filing Procedure',
        id: 'efiling-portal-walkthrough',
        body: 'To pay your Delaware LLC franchise tax: (1) Visit the official Delaware Division of Corporations portal at corp.delaware.gov/paytax/. (2) Enter your 7-digit Delaware Business Entity File Number. (3) Confirm your entity name. (4) Remit the $400 fee via ACH direct debit or credit card ($1.75% surcharge for cards). (5) Save the confirmation PDF for your corporate records.',
      },
    ],
  },
};
