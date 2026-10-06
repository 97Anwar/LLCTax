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
  }>;
}

export const GUIDES_DATA: Record<string, GuideArticle> = {
  'non-resident-us-llc-tax-guide': {
    slug: 'non-resident-us-llc-tax-guide',
    title: 'The 2026 Non-Resident US LLC Compliance & Tax Guide',
    subtitle: 'Mandatory IRS Form 5472, Form 1120 pro-forma, state franchise taxes, and compliance rules for international founders.',
    category: 'International Founders',
    readTime: '8 min read',
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
      { id: 'penalties', label: '3. The $25,000 Failure-to-File Penalty' },
      { id: 'state-taxes', label: '4. State Franchise Taxes vs. Federal Obligations' },
      { id: 'etbus-test', label: '5. The ETBUS Test: Do You Owe Federal Income Tax?' },
      { id: 'compliance-checklist', label: '6. 2026 Non-Resident Filing Checklist' },
    ],
    content: [
      {
        heading: '1. IRS Classification of Foreign-Owned LLCs',
        id: 'irs-classification',
        body: 'Under default US tax principles, a single-member limited liability company (SMLLC) is classified as a "disregarded entity" for federal income tax purposes. However, Treasury Regulation § 301.7701-2(c)(2)(vi) treats a foreign-owned domestic disregarded LLC as a domestic corporation solely for the reporting requirements of Internal Revenue Code (IRC) § 6038A. This means that even if your US LLC generated zero revenue, had no US-connected income, and conducted all operations from abroad, it is strictly required to file annual informational returns with the IRS.',
      },
      {
        heading: '2. Form 5472 & Pro-Forma 1120 Filing Rules',
        id: 'form-5472',
        body: 'Every foreign-owned US single-member LLC must submit IRS Form 5472 (Information Return of a 25% Foreign-Owned U.S. Corporation) attached to a "pro-forma" Form 1120 (U.S. Corporation Income Tax Return). On the pro-forma Form 1120, you only write your company legal name, EIN, address, and check the box indicating it is filed solely for Form 5472 compliance.',
        callout: {
          type: 'warning',
          title: 'Mandatory Reportable Transactions',
          text: 'Any movement of money between the non-resident owner and the US LLC is legally a "reportable transaction" under Part IV of Form 5472. This includes initial formation capital injections, owner contributions, withdrawals, loans, payment of registered agent fees, or software expense reimbursements.',
        },
      },
      {
        heading: '3. The $25,000 Failure-to-File Penalty',
        id: 'penalties',
        body: 'The IRS treats non-filing of Form 5472 with extreme statutory severity. Under IRC § 6038A(d), the statutory penalty for failing to file Form 5472 by the due date (April 15, or October 15 with extension Form 7004), or for filing an incomplete form, is an automatic $25,000 per violation. If the failure continues for more than 90 days after notification from the IRS, an additional $25,000 penalty is assessed for each 30-day period.',
      },
      {
        heading: '4. State Franchise Taxes vs. Federal Obligations',
        id: 'state-taxes',
        body: 'Filing your federal IRS returns does NOT satisfy your state-level legal obligations. State franchise taxes are excise charges for entity legal existence, completely independent of federal tax returns. For example, if you formed in Delaware, you owe Delaware $400 by June 1 (under HB 400). If you formed in Wyoming, you owe at least $60 by the anniversary month. State Secretary of State filings must be completed annually to prevent administrative dissolution.',
      },
      {
        heading: '5. The ETBUS Test: Do You Owe Federal Income Tax?',
        id: 'etbus-test',
        body: 'Non-resident founders frequently ask whether their US LLC owes US federal personal income tax. As a non-resident alien, you are only subject to US income tax if your business is "Engaged in a Trade or Business in the United States" (ETBUS) and earns Effectively Connected Income (ECI). You are generally NOT ETBUS if you have no US employees, no physical office, no warehouse in the US, and independent contractors/services operate entirely outside US borders.',
      },
      {
        heading: '6. 2026 Non-Resident Filing Checklist',
        id: 'compliance-checklist',
        body: 'To ensure complete compliance across all 50 states and federal regulatory bodies in 2026, follow this statutory timeline: (1) Obtain Employer Identification Number (EIN) from the IRS via Form SS-4. (2) Track all reportable transactions between founder and LLC. (3) File Form 5472 and pro-forma Form 1120 via fax or mail by April 15. (4) Submit state Secretary of State annual report/franchise tax before the state-specific deadline. (5) Maintain an active registered agent in your incorporation state.',
      },
    ],
  },

  'delaware-vs-wyoming-vs-florida': {
    slug: 'delaware-vs-wyoming-vs-florida',
    title: 'Delaware vs. Wyoming vs. Florida LLC: 3-Year True Cost Analysis',
    subtitle: 'Uncovering hidden franchise taxes, asset assessments, and late penalty traps across the top 3 incorporation states.',
    category: 'Cost Analysis',
    readTime: '7 min read',
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
        body: 'Entrepreneurs often select their incorporation state based solely on initial setup costs ($50 in Wyoming vs. $90 in Delaware vs. $125 in Florida). This is an expensive mistake. The initial formation fee is paid once, whereas state franchise taxes, annual list charges, and registered agent fees compound every single year over the life of your business.',
      },
      {
        heading: '2. Delaware: HB 400 Tax Hike & Court of Chancery',
        id: 'delaware-costs',
        body: 'Historically, Delaware assessed a flat $300 annual franchise tax on LLCs. Effective for the 2026 tax year, Delaware enacted House Bill 400 (HB 400), increasing the mandatory annual franchise tax to $400. It is due June 1 annually. Missing June 1 triggers an automatic $200 late penalty plus 1.5% compounding monthly interest on the $600 delinquent balance. Delaware requires no public annual disclosure of members, making it private and contractually prestigious, but expensive for small solo operations.',
      },
      {
        heading: '3. Wyoming: Privacy & Asset-Tier Mechanics',
        id: 'wyoming-costs',
        body: 'Wyoming is widely recognized as the most cost-effective and private jurisdiction in the United States. Its baseline annual license tax is $60, due on the first day of the anniversary month of formation. If your business holds over $300,000 in tangible assets physically located inside Wyoming, the tax is calculated as two-tenths of one mill on the dollar ($0.0002). For internet businesses with zero physical property in Wyoming, the annual tax remains capped at $60 indefinitely.',
      },
      {
        heading: '4. Florida: Zero Income Tax & The $400 Late Trap',
        id: 'florida-costs',
        body: 'Florida charges a $138.75 annual report fee due May 1 on Sunbiz.org. Florida has 0% state personal income tax on pass-through LLC profits. However, Florida enforces the most punishing late penalty in the nation: if the report is filed even one minute late on May 2, an automatic, non-negotiable statutory late fine of $400 is added, raising the total fee to $538.75. The statutory waiver provision was repealed by the Florida Legislature, making this fine permanent and mandatory.',
      },
      {
        heading: '5. 3-Year Total Cost Comparison Matrix',
        id: 'cost-table',
        body: 'Assuming baseline registered agent fees of $100/year and on-time filings: Delaware costs $1,590 over 3 years ($90 formation + $400 tax/yr + $100 agent/yr). Florida costs $841 over 3 years ($125 formation + $138.75 report/yr + $100 agent/yr). Wyoming costs $530 over 3 years ($50 formation + $60 license/yr + $100 agent/yr). Wyoming represents a $1,060 savings over Delaware across 36 months.',
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
    readTime: '6 min read',
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
      { id: 'how-to-fix', label: '5. How to Correct Past Non-Registration' },
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
        body: 'Every US state defines what constitutes "transacting intrastate business" within its commercial statutes. You are legally doing business in a state if you: (1) Maintain a physical office, desk, or retail location. (2) Have employees, independent sales reps, or remote workers living in the state. (3) Hold inventory in a state warehouse (including Amazon FBA fulfillment centers). (4) Have managing members actively making business decisions and coding from their home residence inside the state.',
      },
      {
        heading: '3. Case Study: California Revenue & Tax Code § 23101',
        id: 'california-case-study',
        body: 'Under California Rev. & Tax. Code § 23101, an LLC is legally considered "doing business" in California if any member or manager conducts management activities from within the state, or if California sales exceed statutory economic nexus thresholds. If you live in Los Angeles and form a Wyoming LLC, California mandates that you register as a Foreign LLC with the CA Secretary of State and pay California’s $800 minimum franchise tax (FTB 3522) ON TOP of Wyoming’s $60 annual fee.',
        callout: {
          type: 'statute',
          title: 'Dual Maintenance Reality',
          text: 'Failing to register while operating in California results in retroactive assessment of the $800 annual minimum tax for all back years, plus a 25% failure-to-file penalty, interest, and loss of contract enforceability.',
        },
      },
      {
        heading: '4. Penalties for Failure to Foreign Qualify',
        id: 'penalties-noncompliance',
        body: 'If an out-of-state LLC transacts business without obtaining a Certificate of Authority, states enforce severe legal consequences: (1) Door-Closing Statutes: The LLC cannot maintain or initiate a lawsuit in state courts to collect unpaid client debts or enforce contracts. (2) Fines & Back Taxes: States assess statutory civil fines (up to $500/year or $20/day) plus all delinquent franchise taxes. (3) Member Liability: Some jurisdictions strip the liability shield, exposing owners to personal legal claims.',
      },
      {
        heading: '5. How to Correct Past Non-Registration',
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
    readTime: '7 min read',
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
};
