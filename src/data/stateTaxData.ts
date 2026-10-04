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
        answer: 'Yes! California law (Cal. Rev. & Tax. Code § 23101) considers an LLC "doing business" in CA if any member or manager conducts operations from California. You must register as a Foreign LLC with the CA SOS and pay California\'s $800 minimum franchise tax in addition to Delaware\'s $300 tax.',
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
      'Flat $300 annual franchise tax due June 1 annually via the Division of Corporations portal.',
      'No annual report or financial disclosures required for LLCs (unlike corporations).',
      'Immediate non-negotiable $200 late penalty applied at 12:01 AM on June 2.',
      '1.5% compounding monthly interest ($7.50+/mo) assessed on the combined $500 delinquent balance.',
    ],
    faqs: [
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
    ],
  },
};

// Default fallback tax meta for any state not explicitly customized
export function getStateTaxMeta(stateId: string, stateRule: any): StateTaxMeta {
  if (STATE_TAX_DATA[stateId]) {
    return STATE_TAX_DATA[stateId];
  }

  // Zero income tax states
  const zeroTaxStates = ['alaska', 'florida', 'nevada', 'south_dakota', 'tennessee', 'texas', 'washington', 'wyoming'];
  const isZeroTax = zeroTaxStates.includes(stateId);

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

  return {
    stateIncomeTaxRate: rate,
    hasZeroStateIncomeTax: isZeroTax,
    stateTaxDescription: isZeroTax 
      ? '0% State Personal Income Tax' 
      : `${(rate * 100).toFixed(2)}% Estimated State Pass-Through / Income Tax Rate`,
    formationFee: stateRule.reportFee > 0 ? Math.max(50, stateRule.reportFee * 2) : 100.0,
    popularAlternatives: ['delaware', 'wyoming', 'florida', 'texas'],
    overviewHighlights: [
      `Filing schedule: ${stateRule.dueSchedule} via ${stateRule.governingForm}.`,
      stateRule.baseTax > 0 
        ? `Annual franchise / minimum tax of $${stateRule.baseTax}.`
        : `Annual / periodic report fee of $${stateRule.reportFee}.`,
      stateRule.lateRuleText,
      `Governing body: ${stateRule.governingBody}.`,
    ],
    faqs: [
      {
        question: `When is the annual filing deadline for a ${stateRule.name} LLC?`,
        answer: `${stateRule.name} LLCs must file on or before ${stateRule.dueSchedule} with ${stateRule.governingBody}. Filing late risks penalties and administrative loss of good standing.`,
      },
      {
        question: `What is the annual filing fee in ${stateRule.name}?`,
        answer: `${stateRule.name} imposes ${stateRule.baseTax > 0 ? `a base tax of $${stateRule.baseTax}` : `an annual report fee of $${stateRule.reportFee}`} (${stateRule.reportFrequency} schedule).`,
      },
      {
        question: `What happens if I don't file the annual report in ${stateRule.name}?`,
        answer: `${stateRule.lateRuleText} Persistent delinquency leads to administrative dissolution, exposing business owners to personal liability.`,
      },
    ],
  };
}
