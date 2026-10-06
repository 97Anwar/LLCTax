import { StateFAQ } from '../types';

export interface StateTaxMeta {
  stateIncomeTaxRate: number; // e.g. 0.093 for CA, 0.0 for FL
  hasZeroStateIncomeTax: boolean;
  stateTaxDescription: string;
  formationFee: number;
  popularAlternatives: string[];
  faqs: StateFAQ[];
  overviewHighlights: string[];
}

// 2026/2027 state tax and compliance data for all 50 states + DC
export const STATE_TAX_DATA: Record<string, StateTaxMeta> = {
  california: {
    stateIncomeTaxRate: 0.093, // California pass-through / top middle tier & elective PTET rate (9.3%)
    hasZeroStateIncomeTax: false,
    stateTaxDescription: '9.3% CA Elective Pass-Through Entity Tax (PTET) / Individual Income Tax (1% to 13.3%)',
    formationFee: 70.0,
    popularAlternatives: ['delaware', 'wyoming', 'nevada', 'texas', 'florida'],
    overviewHighlights: [
      'Mandatory $800 annual minimum franchise tax (FTB 3522) due April 15, regardless of profitability or activity.',
      'Gross receipts surcharge fee (FTB 3536) scales from $900 up to $11,790 on California gross receipts exceeding $250,000.',
      'Biennial Statement of Information (Form LLC-12) due every 2 years with a $250 penalty for late filing.',
      'Elective Pass-Through Entity Tax (PTET) allows 9.3% entity-level deduction against federal adjusted gross income.',
    ],
    faqs: [
      {
        question: 'Do I have to pay California $800 minimum franchise tax in the first year?',
        answer: 'Under California AB 85, new LLCs formed on or after January 1, 2021 are exempt from the $800 minimum franchise tax for their FIRST taxable year only. However, starting in your second taxable year, the $800 minimum franchise tax is mandatory every year, due on April 15 via Form FTB 3522.',
      },
      {
        question: 'What is the California Gross Receipts Fee (FTB 3536)?',
        answer: 'If your LLC earns $250,000 or more in total gross revenue from California sources, you must pay an additional LLC fee on Form FTB 3536 by June 15: $900 ($250k–$499k), $2,500 ($500k–$999k), $6,000 ($1M–$4.99M), and $11,790 ($5M+).',
      },
      {
        question: 'I formed a Delaware LLC, but I live or code in California. Do I still owe California taxes?',
        answer: 'Yes! California law (Cal. Rev. & Tax. Code § 23101) considers an LLC "doing business" in CA if any member or manager conducts operations from California. You must register as a Foreign LLC with the CA SOS and pay California\'s $800 minimum franchise tax in addition to Delaware\'s $400 annual tax (under HB 400).',
      },
      {
        question: 'What happens if I miss the California Statement of Information deadline?',
        answer: 'Failing to file Form LLC-12 ($20 every two years) triggers an immediate $250 penalty assessed by the Franchise Tax Board and puts your LLC at risk of administrative suspension, stripping the company of the right to enforce contracts or defend lawsuits.',
      },
    ],
  },
  delaware: {
    stateIncomeTaxRate: 0.066, // DE personal income tax rate (if operating in DE; 0% if foreign / no DE source income)
    hasZeroStateIncomeTax: false,
    stateTaxDescription: '0% State Tax on non-resident LLCs with no Delaware source income (6.6% if operating physically inside DE)',
    formationFee: 90.0,
    popularAlternatives: ['wyoming', 'florida', 'nevada', 'texas', 'california'],
    overviewHighlights: [
      'Flat $400 annual franchise tax due June 1 annually via the Division of Corporations portal (increased from $300 under HB 400).',
      'No annual report or financial disclosures required for LLCs (unlike corporations).',
      'Immediate non-negotiable $200 late penalty applied at 12:01 AM on June 2.',
      '1.5% compounding monthly interest ($9.00+/mo) assessed on the combined $600 delinquent balance ($400 tax + $200 penalty).',
    ],
    faqs: [
      {
        question: 'Did Delaware increase its LLC annual franchise tax to $400?',
        answer: 'Yes. Under Delaware House Bill 400 (HB 400), the annual franchise tax for Delaware Limited Liability Companies (LLCs), LPs, and GPs was increased from $300 to $400 effective for the 2026 tax year. It remains due on or before June 1 annually.',
      },
      {
        question: 'Why do so many startups choose a Delaware LLC?',
        answer: 'Delaware is renowned for its specialized Court of Chancery (business judges with no juries), deep corporate legal precedent, and strong investor familiarity. Note that while tech startups seeking venture capital typically need Delaware C-Corps, bootstrap founders and freelancers often use Delaware LLCs for contractual prestige.',
      },
      {
        question: 'Can the Delaware $200 late penalty be waived?',
        answer: 'No. Delaware statutory law (6 Del. C. § 18-1107) strictly prohibits the Division of Corporations from waiving the statutory $200 late penalty or the 1.5% monthly compounding interest once the June 1 statutory cutoff has passed.',
      },
      {
        question: 'Do I pay Delaware state income taxes if I live in another state?',
        answer: 'If your Delaware LLC does not conduct business physically within Delaware and has no Delaware-sourced income, you do not owe Delaware state income tax. However, you will owe income taxes in the state where you reside and conduct business.',
      },
    ],
  },
  florida: {
    stateIncomeTaxRate: 0.0,
    hasZeroStateIncomeTax: true,
    stateTaxDescription: '0% State Personal Income Tax (Florida Constitution Art. VII, § 5)',
    formationFee: 125.0,
    popularAlternatives: ['texas', 'wyoming', 'delaware', 'georgia', 'nevada'],
    overviewHighlights: [
      'Zero state personal income tax on LLC profits.',
      '$138.75 annual report fee due May 1 annually on Sunbiz.org.',
      'Catastrophic $400 statutory late fee applied on May 2 if filed even 1 minute late.',
      'Administrative dissolution notices issued in September for delinquent entities.',
    ],
    faqs: [
      {
        question: 'Why is Florida\'s late fee $400?',
        answer: 'Florida Statute § 605.0213 mandates an automatic, non-negotiable $400 statutory late penalty if the Annual Report is not filed by May 1. The total fee immediately jumps from $138.75 to $538.75 on May 2.',
      },
      {
        question: 'Does Florida have a state income tax on LLC earnings?',
        answer: 'No! Florida does not impose a personal income tax on individuals, single-member LLCs (disregarded entities), or multi-member LLCs taxed as partnerships. Only LLCs that elect C-Corporation tax status are subject to Florida\'s 5.5% corporate income tax.',
      },
      {
        question: 'What happens if my Florida LLC is administratively dissolved?',
        answer: 'If you fail to file by the third Friday in September, the state administratively dissolves your LLC. Reinstatement costs $538.75 plus a $100 reinstatement fee ($638.75 total), and during dissolution, your limited liability shield may be vulnerable.',
      },
    ],
  },
  texas: {
    stateIncomeTaxRate: 0.0,
    hasZeroStateIncomeTax: true,
    stateTaxDescription: '0% State Personal Income Tax (Texas Constitution Art. VIII, § 24-a)',
    formationFee: 300.0,
    popularAlternatives: ['florida', 'wyoming', 'delaware', 'nevada'],
    overviewHighlights: [
      'Zero state personal income tax on pass-through LLC profits.',
      '$2.47 Million no-tax-due threshold for Texas franchise margin tax (Senate Bill 3).',
      'Mandatory Form 05-102 (Public Information Report) due May 15 even if $0 tax is owed.',
      '$50 Comptroller late penalty plus forfeiture of corporate charter if PIR is missed.',
    ],
    faqs: [
      {
        question: 'My Texas LLC made under $2.47 Million. Do I still have to file?',
        answer: 'YES! Under Texas Senate Bill 3, while you owe $0 in franchise tax if revenue is $2.47M or less, you MUST still submit Form 05-102 (Public Information Report) by May 15 every year. Failing to file forfeits your right to do business in Texas.',
      },
      {
        question: 'How is Texas Franchise Tax calculated if revenue exceeds $2.47M?',
        answer: 'LLCs with revenue exceeding $2.47M compute margin tax on the lowest of four deductions (typically 70% of total revenue). Wholesale and retail entities pay 0.375%, and all other entities pay 0.75% of taxable margin.',
      },
    ],
  },
  wyoming: {
    stateIncomeTaxRate: 0.0,
    hasZeroStateIncomeTax: true,
    stateTaxDescription: '0% State Personal Income Tax & 0% Corporate Income Tax',
    formationFee: 100.0,
    popularAlternatives: ['delaware', 'florida', 'nevada', 'texas'],
    overviewHighlights: [
      'Zero state personal income tax and zero franchise tax on revenue.',
      'Annual report license tax is just $60 for in-state assets up to $300,000.',
      'Asset tax of $0.0002 per dollar applies only to Wyoming in-state assets exceeding $300,000.',
      'Strongest statutory charging order protection and privacy laws in the United States.',
    ],
    faqs: [
      {
        question: 'How does Wyoming\'s $60 Annual Report License Tax work?',
        answer: 'Wyoming charges a flat $60 minimum license tax due on the first day of your formation anniversary month. If your LLC owns tangible assets physically located inside Wyoming exceeding $300,000, you pay $0.0002 per dollar of in-state assets.',
      },
      {
        question: 'Why do privacy-focused founders prefer Wyoming?',
        answer: 'Wyoming was the first US state to create LLCs in 1977. Wyoming does not require members or managers to be listed on public Secretary of State filings, provides robust charging order protection, and has no state corporate or personal income taxes.',
      },
    ],
  },
  nevada: {
    stateIncomeTaxRate: 0.0,
    hasZeroStateIncomeTax: true,
    stateTaxDescription: '0% State Personal & Corporate Income Tax (Commerce Tax applies over $4M)',
    formationFee: 425.0, // $75 Articles + $150 Initial List + $200 Business License
    popularAlternatives: ['wyoming', 'delaware', 'texas', 'florida'],
    overviewHighlights: [
      'Zero state personal and corporate income tax.',
      'Combined $350 annual requirement: $150 Annual List + $200 State Business License.',
      'Due annually by the last day of your formation anniversary month.',
      '$200 combined late penalty ($100 for List + $100 for License) if deadline is missed.',
    ],
    faqs: [
      {
        question: 'Why are Nevada LLC annual fees $350?',
        answer: 'Nevada mandates two separate annual filings: the Annual List of Managers/Members ($150) under NRS 86.263, and the State Business License ($200) under NRS 76.100, totaling $350 annually.',
      },
      {
        question: 'What is the Nevada Commerce Tax?',
        answer: 'Nevada has no income tax, but imposes a Commerce Tax on businesses with Nevada gross revenue exceeding $4,000,000 in a fiscal year. Rates range from 0.051% to 0.331% depending on the industry.',
      },
    ],
  },
  new_york: {
    stateIncomeTaxRate: 0.0685, // NY PTET / personal tax rate
    hasZeroStateIncomeTax: false,
    stateTaxDescription: '6.85% NY Elective PTET / State Income Tax (4% to 10.9%)',
    formationFee: 200.0,
    popularAlternatives: ['delaware', 'florida', 'new_jersey', 'connecticut'],
    overviewHighlights: [
      'Graduated filing fee on Form IT-204-LL scaling from $25 up to $4,500 based on NY gross income.',
      'Mandatory newspaper publication requirement (Section 206) costing $600 to $1,500 in NYC.',
      'Biennial statement ($9) due every 2 years with the Department of State.',
      'Elective Pass-Through Entity Tax (PTET) available up to 10.9% for federal tax savings.',
    ],
    faqs: [
      {
        question: 'How much is the New York IT-204-LL LLC filing fee?',
        answer: 'New York charges an annual filing fee based on New York source gross income: under $100k ($25), $100k–$249k ($50), $250k–$499k ($175), $500k–$999k ($500), $1M–$4.99M ($1,500), $5M–$24.99M ($3,000), and $25M+ ($4,500). Due March 15.',
      },
      {
        question: 'What is the New York LLC publication requirement?',
        answer: 'Section 206 of the NY Limited Liability Company Law requires all newly formed LLCs to publish a notice in two county-designated newspapers for six consecutive weeks within 120 days of formation, costing between $600 and $1,500 in New York County (Manhattan).',
      },
    ],
  },
  washington: {
    stateIncomeTaxRate: 0.0,
    hasZeroStateIncomeTax: true,
    stateTaxDescription: '0% Personal Income Tax; 1.5% Business & Occupation (B&O) Gross Receipts Tax',
    formationFee: 200.0,
    popularAlternatives: ['oregon', 'wyoming', 'delaware', 'california'],
    overviewHighlights: [
      'Zero personal income tax on individuals and LLC owners.',
      '$60 annual report due on the last day of the formation anniversary month.',
      'State Business & Occupation (B&O) tax levied on gross revenue (1.5% service / 0.471% retailing).',
      'Small Business B&O Tax Credit eliminates or reduces tax for small businesses under ~$56k revenue.',
    ],
    faqs: [
      {
        question: 'Does Washington state tax LLC revenue?',
        answer: 'Yes. Washington does not have an income tax, but levies the Business and Occupation (B&O) tax on gross revenues without deducting expenses. Service businesses pay 1.5% (or 1.75% for large tech businesses), and retailers pay 0.471%.',
      },
    ],
  },
  tennessee: {
    stateIncomeTaxRate: 0.065,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: '6.5% Corporate/LLC Excise Tax on Net Earnings + $300 Min Franchise Tax',
    formationFee: 300.0, // $50/member, min $300, max $3,000
    popularAlternatives: ['florida', 'georgia', 'north_carolina', 'texas'],
    overviewHighlights: [
      'Zero personal income tax on salaries and distributions.',
      'Annual report fee: $300 minimum ($50 per member, up to $3,000 maximum).',
      'Franchise tax: 0.25% of net worth (min $300) plus 6.5% Excise tax on LLC net earnings.',
      'Due April 15 annually on Form FAE 170.',
    ],
    faqs: [
      {
        question: 'Does Tennessee have an LLC franchise and excise tax?',
        answer: 'Yes. Tennessee imposes a 6.5% excise tax on the net earnings of LLCs, plus a franchise tax of 0.25% of the greater of net worth or real and tangible property (minimum $300).',
      },
      {
        question: 'Why is the Tennessee LLC annual report fee calculated per member?',
        answer: 'Under Tenn. Code Ann. § 48-249-1007, the Secretary of State annual report fee is calculated at $50 per member, with a strict statutory minimum fee of $300 (covering up to 6 members) and a maximum fee cap of $3,000. Due April 15.',
      },
    ],
  },
  massachusetts: {
    stateIncomeTaxRate: 0.05,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Flat 5.0% State Personal Income Tax (Plus 4% Millionaire Surtax over $1M)',
    formationFee: 500.0,
    popularAlternatives: ['delaware', 'new_york', 'new_hampshire', 'florida'],
    overviewHighlights: [
      '$500 annual report fee due on the anniversary date of formation.',
      'One of the highest statutory annual maintenance fees in the United States.',
      'Administrative dissolution initiated after persistent non-filing.',
      'Elective Pass-Through Entity Tax (63D) available for 5% SALT deduction workaround.',
    ],
    faqs: [
      {
        question: 'Why is the Massachusetts LLC annual report fee $500?',
        answer: 'Massachusetts General Laws ch. 156C, § 12 sets a statutory $500 fee for filing the LLC annual report ($520 if filed online via Corporations Division). This makes Massachusetts one of the most expensive states in the nation for ongoing LLC maintenance.',
      },
      {
        question: 'When is the Massachusetts LLC annual report due?',
        answer: 'The annual report is due every year on or before the anniversary date of the LLC’s official organization filing with the Secretary of the Commonwealth.',
      },
      {
        question: 'Can Massachusetts annual report late fees be waived?',
        answer: 'Massachusetts does not assess a monetary late fine, but continuing failure to file triggers statutory administrative dissolution proceedings, revoking the company’s corporate legal status.',
      },
    ],
  },
  georgia: {
    stateIncomeTaxRate: 0.0539,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Flat 5.39% State Individual Income Tax Rate (Phasing down)',
    formationFee: 100.0,
    popularAlternatives: ['florida', 'tennessee', 'north_carolina', 'delaware'],
    overviewHighlights: [
      '$50 annual registration fee due April 1 via the Corporations Division portal.',
      '$25 late filing penalty assessed after the April 1 statutory cutoff.',
      'Option to file a 1-year, 2-year, or 3-year annual registration in advance.',
      'Administrative dissolution begins if reports remain unpaid by August.',
    ],
    faqs: [
      {
        question: 'When is the Georgia LLC annual registration due?',
        answer: 'Georgia LLCs must file their annual registration between January 1 and April 1 each year with the Georgia Secretary of State Corporations Division. The fee is $50.',
      },
      {
        question: 'What is the late penalty for a Georgia LLC?',
        answer: 'Missing the April 1 deadline triggers an automatic $25 late penalty. If the annual registration remains delinquent, the Secretary of State will initiate administrative dissolution proceedings in late summer.',
      },
    ],
  },
  illinois: {
    stateIncomeTaxRate: 0.0495,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: '4.95% Personal Income Tax + 1.5% Personal Property Replacement Tax (6.45% total pass-through rate)',
    formationFee: 150.0,
    popularAlternatives: ['indiana', 'delaware', 'wisconsin', 'florida'],
    overviewHighlights: [
      '$75 annual report fee (Form LLC-50.1) due on the first day of the anniversary month.',
      'Substantial $100 statutory late penalty assessed 60 days after the deadline.',
      '1.5% Personal Property Replacement Tax applies to net business earnings of pass-through entities.',
      'Administrative dissolution occurs if reports remain delinquent past statutory notices.',
    ],
    faqs: [
      {
        question: 'When is the Illinois LLC annual report due?',
        answer: 'Under 805 ILCS 180/50-1, the Illinois LLC annual report (Form LLC-50.1) is due before the first day of your LLC’s formation anniversary month. The filing fee is $75.',
      },
      {
        question: 'What is the penalty for filing late in Illinois?',
        answer: 'If your annual report is not filed within 60 days of the statutory due date, the Secretary of State assesses an immediate $100 late penalty, raising total filing costs to $175.',
      },
    ],
  },
  north_carolina: {
    stateIncomeTaxRate: 0.045,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Flat 4.5% State Individual Income Tax Rate (Phasing down)',
    formationFee: 125.0,
    popularAlternatives: ['south_carolina', 'georgia', 'virginia', 'delaware'],
    overviewHighlights: [
      '$200 annual report fee due April 15 via the NC Secretary of State portal.',
      'Strict 60-day notice prior to administrative dissolution for delinquent filings.',
      'Zero annual franchise tax for standard pass-through LLCs (unlike corporations).',
      'Elective pass-through entity tax available for federal SALT deduction maximization.',
    ],
    faqs: [
      {
        question: 'How much does a North Carolina LLC cost annually?',
        answer: 'North Carolina LLCs must pay a $200 annual report fee ($202 if filed online) due annually on April 15 to the Secretary of State.',
      },
      {
        question: 'What happens if I miss the North Carolina annual report deadline?',
        answer: 'While North Carolina does not assess an immediate monetary late penalty, the Department of the Secretary of State issues a 60-day notice of delinquency. Failure to file within 60 days results in administrative dissolution.',
      },
    ],
  },
  new_jersey: {
    stateIncomeTaxRate: 0.0637,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Graduated State Personal Income Tax (1.4% to 10.75%) + Entity Partner Fees',
    formationFee: 125.0,
    popularAlternatives: ['delaware', 'new_york', 'pennsylvania', 'florida'],
    overviewHighlights: [
      '$75 annual report fee due by the last day of your formation anniversary month.',
      'Mandatory $150 per-partner filing fee for multi-member LLCs (Form NJ-CBT-1065).',
      'Electronic filing mandatory via the NJ Division of Revenue and Enterprise Services.',
      'Administrative revocation of business charter following two consecutive years of delinquency.',
    ],
    faqs: [
      {
        question: 'When is the New Jersey LLC annual report due?',
        answer: 'New Jersey requires LLCs to file their annual report by the last day of the anniversary month in which the business was formed, using the Division of Revenue online portal. The fee is $75.',
      },
      {
        question: 'What is the New Jersey $150 per-partner fee?',
        answer: 'Under N.J.S.A. 54:10A-15.11, multi-member LLCs deriving income from New Jersey sources must pay a partnership filing fee of $150 per member (up to a statutory cap of $250,000) on Form NJ-CBT-1065.',
      },
    ],
  },
  pennsylvania: {
    stateIncomeTaxRate: 0.0307,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Flat 3.07% State Individual Income Tax Rate',
    formationFee: 125.0,
    popularAlternatives: ['delaware', 'ohio', 'new_jersey', 'florida'],
    overviewHighlights: [
      'New mandatory $7 annual report requirement under Act 122 (due September 30).',
      'Repealed the former 10-year decennial report requirement for all registered entities.',
      'Administrative dissolution penalties begin taking effect for non-filing.',
      'Low flat 3.07% personal income tax rate on net business profits.',
    ],
    faqs: [
      {
        question: 'Did Pennsylvania change its LLC reporting requirements under Act 122?',
        answer: 'Yes. Pennsylvania enacted Act 122 of 2022, officially repealing the former 10-year decennial report and introducing a mandatory Annual Report for all domestic and foreign LLCs. The annual fee is $7, due on September 30 annually via file.dos.pa.gov.',
      },
      {
        question: 'What happens if a Pennsylvania LLC does not file its annual report?',
        answer: 'Beginning with reports due in the transition period, failing to file results in administrative dissolution and forfeiture of the legal right to exclusive name usage under 15 Pa. Cons. Stat. § 146.',
      },
    ],
  },
  ohio: {
    stateIncomeTaxRate: 0.035,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Graduated State Income Tax (0% to 3.5%) + Commercial Activity Tax (CAT) over $3M',
    formationFee: 99.0,
    popularAlternatives: ['delaware', 'indiana', 'kentucky', 'florida'],
    overviewHighlights: [
      '$0 mandatory annual report fee for standard domestic LLCs.',
      'Commercial Activity Tax (CAT) applies only if Ohio gross receipts exceed $3,000,000.',
      'Ohio Business Gateway handles all state tax accounts and employer filings.',
      'Low formation cost ($99) with zero recurring annual maintenance to the Secretary of State.',
    ],
    faqs: [
      {
        question: 'Does Ohio charge an annual report fee for LLCs?',
        answer: 'No. The Ohio Secretary of State does not require an annual report or periodic renewal fee for domestic limited liability companies. You pay $0 to keep your corporate registration active.',
      },
      {
        question: 'What is the Ohio Commercial Activity Tax (CAT)?',
        answer: 'Ohio does not levy a corporate income tax, but levies the Commercial Activity Tax (CAT) on business gross receipts. For tax years beginning 2024 and beyond, businesses with Ohio gross receipts under $3,000,000 owe $0 CAT tax.',
      },
    ],
  },
  colorado: {
    stateIncomeTaxRate: 0.044,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Flat 4.4% State Individual Income Tax Rate',
    formationFee: 50.0,
    popularAlternatives: ['wyoming', 'utah', 'texas', 'delaware'],
    overviewHighlights: [
      '$10 periodic report fee filed online with the Colorado Secretary of State.',
      'Due during a 2-month window starting the first day of the formation anniversary month.',
      '$50 late fee penalty applied if filed after the statutory 2-month window.',
      'Status shifts to Delinquent and leads to loss of good standing.',
    ],
    faqs: [
      {
        question: 'When is the Colorado LLC periodic report due?',
        answer: 'Under C.R.S. § 7-90-501, the Colorado periodic report is due within a two-month filing window starting on the first day of your LLC’s formation anniversary month. The fee is $10 online.',
      },
      {
        question: 'What is the late fee for a Colorado periodic report?',
        answer: 'If the report is not submitted during the two-month window or the subsequent two-month grace period, an additional $50 penalty is assessed, raising total costs to $60.',
      },
    ],
  },
  arizona: {
    stateIncomeTaxRate: 0.025,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Flat 2.5% State Individual Income Tax Rate (Lowest flat tax in US)',
    formationFee: 50.0,
    popularAlternatives: ['nevada', 'wyoming', 'california', 'texas'],
    overviewHighlights: [
      '$0 annual report fee for domestic LLCs filed with the Arizona Corporation Commission (ACC).',
      'No recurring annual maintenance filings required with the state registry.',
      'Statutory publication requirement in initial formation month outside Maricopa/Pima counties.',
      'Nation-leading low 2.5% flat individual income tax rate on business profits.',
    ],
    faqs: [
      {
        question: 'Does Arizona require an annual report for LLCs?',
        answer: 'No. Under Arizona Revised Statutes Title 29, domestic and foreign LLCs registered with the Arizona Corporation Commission (eCorp) are exempt from annual reports and ongoing periodic filing fees.',
      },
      {
        question: 'Do I have to pay taxes on an Arizona LLC if I make no money?',
        answer: 'No. Arizona does not have a minimum franchise tax (unlike California’s $800 fee). If your LLC earns zero net income, your state income tax liability is $0.',
      },
    ],
  },
  virginia: {
    stateIncomeTaxRate: 0.0575,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Graduated State Individual Income Tax (2% to 5.75%)',
    formationFee: 100.0,
    popularAlternatives: ['delaware', 'maryland', 'north_carolina', 'florida'],
    overviewHighlights: [
      '$50 annual registration fee due by the last day of the formation anniversary month.',
      'Administered by the Virginia State Corporation Commission (SCC Clerk’s Information System).',
      '$25 late penalty applied on the first day of the month following the due date.',
      'Automatic cancellation occurs 3 months after delinquency.',
    ],
    faqs: [
      {
        question: 'When is the Virginia LLC annual registration fee due?',
        answer: 'Virginia LLCs must pay a $50 annual registration fee to the State Corporation Commission (SCC) on or before the last day of the anniversary month of formation.',
      },
      {
        question: 'What happens if I miss the Virginia SCC payment deadline?',
        answer: 'A $25 penalty is assessed if payment is not received on time ($75 total). If delinquent for three months, the LLC is automatically cancelled by operation of law (Va. Code § 13.1-1064).',
      },
    ],
  },
  maryland: {
    stateIncomeTaxRate: 0.0575,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'State Individual Income Tax (2% to 5.75%) + Local County Piggyback Tax (2.25% to 3.2%)',
    formationFee: 100.0,
    popularAlternatives: ['delaware', 'virginia', 'district_of_columbia', 'florida'],
    overviewHighlights: [
      '$300 annual report fee (Form 1) due April 15 via Maryland Business Express.',
      'Mandatory for all active LLCs, even if the business owns zero personal property.',
      'Charter forfeiture occurs if reports are omitted for two consecutive years.',
      'County piggyback income taxes add 2.25% to 3.2% to state tax burdens.',
    ],
    faqs: [
      {
        question: 'Why is Maryland’s LLC annual report $300?',
        answer: 'Maryland Tax-Property Article § 11-101 requires all legal entities to submit an Annual Report & Personal Property Return (Form 1) to the Department of Assessments and Taxation (SDAT) along with a mandatory $300 filing fee, due April 15.',
      },
      {
        question: 'Do inactive Maryland LLCs have to pay the $300 fee?',
        answer: 'Yes. Every entity registered in Maryland must file Form 1 and pay the $300 fee annually to maintain good standing, regardless of whether the business conducted transactions or owned assets.',
      },
    ],
  },
  district_of_columbia: {
    stateIncomeTaxRate: 0.0825,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Graduated Individual Income Tax (4% to 10.75%) + 8.25% Unincorporated Business Franchise Tax',
    formationFee: 220.0,
    popularAlternatives: ['delaware', 'virginia', 'maryland'],
    overviewHighlights: [
      '$300 biennial report fee (Form BRA-25) due April 1 every two years.',
      'Equivalent to an annualized maintenance cost of $150 per year.',
      '$100 statutory late fee assessed if filed after the April 1 cutoff date.',
      '8.25% Unincorporated Business Franchise Tax (UB Tax) applies to gross income over $12,000.',
    ],
    faqs: [
      {
        question: 'How often do DC LLCs file reports?',
        answer: 'Washington D.C. requires a Two-Year Report (Form BRA-25) due April 1 every two years with the Department of Licensing and Consumer Protection (DLCP). The biennial filing fee is $300.',
      },
      {
        question: 'What is the DC Unincorporated Business Franchise Tax?',
        answer: 'D.C. imposes an 8.25% franchise tax on unincorporated businesses (including LLCs and partnerships) with gross revenue exceeding $12,000 derived from DC sources, with a minimum tax of $250 or $1,000 depending on gross income.',
      },
    ],
  },
  missouri: {
    stateIncomeTaxRate: 0.048,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Graduated State Individual Income Tax (0% to 4.8%)',
    formationFee: 50.0,
    popularAlternatives: ['illinois', 'kansas', 'delaware', 'wyoming'],
    overviewHighlights: [
      '$0 annual report fee for limited liability companies.',
      'No recurring periodic filings required with the Missouri Secretary of State.',
      'Low $50 initial filing fee with instant online document issuance.',
      'Pass-through income taxed under graduated individual rates up to 4.8%.',
    ],
    faqs: [
      {
        question: 'Does Missouri require an annual report for an LLC?',
        answer: 'No. Unlike corporations, Missouri LLCs (Chapter 347 RSMo) are not required to file annual reports or pay recurring renewal fees with the Secretary of State.',
      },
      {
        question: 'What ongoing maintenance is required for a Missouri LLC?',
        answer: 'You only need to maintain a registered agent with a physical street address in Missouri and file your regular annual state personal income tax returns with the Missouri Department of Revenue.',
      },
    ],
  },
  michigan: {
    stateIncomeTaxRate: 0.0425,
    hasZeroStateIncomeTax: false,
    stateTaxDescription: 'Flat 4.25% State Individual Income Tax Rate',
    formationFee: 50.0,
    popularAlternatives: ['indiana', 'ohio', 'illinois', 'delaware'],
    overviewHighlights: [
      '$25 annual statement fee due February 15 via LARA online portal.',
      'Administered by Michigan Department of Licensing and Regulatory Affairs.',
      'Loss of good standing occurs after two consecutive years of delinquency.',
      'Low annual cost ($25) compared to Midwest regional averages.',
    ],
    faqs: [
      {
        question: 'When is the Michigan LLC annual statement due?',
        answer: 'Michigan LLCs must file an Annual Statement with LARA (Corporations Division) on or before February 15 each year. The fee is $25. LLCs formed after September 30 do not have to file for the immediately following year.',
      },
      {
        question: 'What is the penalty for filing late in Michigan?',
        answer: 'Michigan does not charge a monetary late fine for annual statements, but the LLC forfeits good standing after two years of delinquency, preventing the company from obtaining certificates of existence.',
      },
    ],
  },
};

// Default fallback tax meta for any state not explicitly customized
export function getStateTaxMeta(stateId: string, stateRule: any): StateTaxMeta {
  // Zero income tax states
  const zeroTaxStates = ['alaska', 'florida', 'nevada', 'south_dakota', 'tennessee', 'texas', 'washington', 'wyoming'];
  const isZeroTax = zeroTaxStates.includes(stateId);

  if (STATE_TAX_DATA[stateId]) {
    const custom = STATE_TAX_DATA[stateId];
    if (custom.faqs.length < 4) {
      const extraFaqs: StateFAQ[] = [
        {
          question: `If I live in ${stateRule.name} but formed in Delaware or Wyoming, do I still owe ${stateRule.name} fees?`,
          answer: `Yes. Under state commercial law, operating from ${stateRule.name} constitutes transacting intrastate business. You must register your out-of-state LLC as a Foreign LLC with ${stateRule.governingBody} and pay ${stateRule.name} ongoing fees in addition to your formation state’s costs.`,
        },
        {
          question: `How are LLC profits taxed in ${stateRule.name}?`,
          answer: custom.hasZeroStateIncomeTax
            ? `${stateRule.name} does not levy an individual state personal income tax on pass-through business earnings. Only federal taxes and local taxes apply.`
            : `LLC net earnings pass through to members’ personal returns, subject to ${stateRule.name}’s state individual income tax rate (${custom.stateTaxDescription}).`,
        },
      ];
      return {
        ...custom,
        faqs: [...custom.faqs, ...extraFaqs],
      };
    }
    return custom;
  }

  // Approximate default individual tax rates for pass-through
  const defaultRates: Record<string, number> = {
    alabama: 0.05,
    arizona: 0.025,
    arkansas: 0.044,
    colorado: 0.044,
    connecticut: 0.0699,
    district_of_columbia: 0.0825,
    georgia: 0.0539,
    hawaii: 0.09,
    idaho: 0.058,
    illinois: 0.0495,
    indiana: 0.0305,
    iowa: 0.057,
    kansas: 0.057,
    kentucky: 0.04,
    louisiana: 0.0425,
    maine: 0.0715,
    maryland: 0.0575,
    massachusetts: 0.05,
    michigan: 0.0425,
    minnesota: 0.0785,
    mississippi: 0.05,
    missouri: 0.048,
    montana: 0.059,
    nebraska: 0.0584,
    new_hampshire: 0.0055, // BET
    new_jersey: 0.0637,
    new_mexico: 0.059,
    north_carolina: 0.045,
    north_dakota: 0.0225,
    ohio: 0.035,
    oklahoma: 0.0475,
    oregon: 0.0875,
    pennsylvania: 0.0307,
    rhode_island: 0.0599,
    south_carolina: 0.064,
    utah: 0.0465,
    vermont: 0.066,
    virginia: 0.0575,
    west_virginia: 0.0512,
    wisconsin: 0.053,
  };

  const rate = isZeroTax ? 0.0 : (defaultRates[stateId] || 0.05);

  const feeSummary = stateRule.baseTax > 0 
    ? `statutory franchise tax of $${stateRule.baseTax}`
    : stateRule.reportFee > 0
      ? `periodic report fee of $${stateRule.reportFee}`
      : `zero periodic filing fee ($0)`;

  return {
    stateIncomeTaxRate: rate,
    hasZeroStateIncomeTax: isZeroTax,
    stateTaxDescription: isZeroTax 
      ? '0% State Personal Income Tax' 
      : `${(rate * 100).toFixed(2)}% Estimated State Pass-Through / Income Tax Rate`,
    formationFee: stateRule.reportFee > 0 ? Math.max(50, stateRule.reportFee * 2) : 100.0,
    popularAlternatives: ['delaware', 'wyoming', 'florida', 'texas'],
    overviewHighlights: [
      `Mandatory filing schedule: ${stateRule.dueSchedule} via ${stateRule.governingForm}.`,
      `Statutory assessment: ${feeSummary} paid to ${stateRule.governingBody}.`,
      `Legal enforcement authority: ${stateRule.statutoryCitation}.`,
      `Penalty trigger: ${stateRule.lateRuleText}`,
    ],
    faqs: [
      {
        question: `When is the official statutory deadline for a ${stateRule.name} LLC?`,
        answer: `In ${stateRule.name}, registered limited liability companies must complete their periodic compliance filing by ${stateRule.dueSchedule}. Reports are administered by ${stateRule.governingBody} using form ${stateRule.governingForm}.`,
      },
      {
        question: `How much does it cost to maintain a ${stateRule.name} LLC each year?`,
        answer: `The baseline legal maintenance cost in ${stateRule.name} is ${feeSummary}. This mandatory fee is levied on an ${stateRule.reportFrequency} cycle regardless of whether your business produced a profit.`,
      },
      {
        question: `What are the legal consequences of missing the filing deadline in ${stateRule.name}?`,
        answer: `Under ${stateRule.statutoryCitation}, delinquent filings trigger ${stateRule.lateRuleText}. Continued failure to comply leads to administrative dissolution, stripping the company of legal capacity to enforce contracts and exposing owners to personal liability.`,
      },
      {
        question: `If I live in ${stateRule.name} but formed in Delaware or Wyoming, do I still owe ${stateRule.name} fees?`,
        answer: `Yes. Under state commercial law, operating from ${stateRule.name} constitutes transacting intrastate business. You must register your out-of-state LLC as a Foreign LLC with ${stateRule.governingBody} and pay ${stateRule.name} ongoing fees in addition to your formation state’s costs.`,
      },
      {
        question: `How are LLC profits taxed in ${stateRule.name}?`,
        answer: isZeroTax
          ? `${stateRule.name} does not levy an individual state personal income tax on pass-through business earnings. Only federal taxes and local excise or sales taxes apply.`
          : `LLC net earnings pass through to members’ personal returns, subject to ${stateRule.name}’s state individual income tax rate of approximately ${(rate * 100).toFixed(2)}%. Entities can also evaluate elective pass-through entity tax (PTET) status where applicable.`,
      },
    ],
  };
}
