import { StateRule, CalculationResult } from '../types';
import { getStateTaxMeta } from '../data/stateTaxData';

export function calculateLLCCompliance(
  state: StateRule,
  grossRevenue: number = 0,
  inStateAssets: number = 0,
  isLate: boolean = false,
  monthsLate: number = 1,
  profitMarginPercent: number = 30,
  memberCount: number = 1
): CalculationResult {
  // Sanitize numeric inputs to prevent NaN or negative amounts
  const cleanRevenue = Math.max(0, isNaN(grossRevenue) ? 0 : grossRevenue);
  const cleanAssets = Math.max(0, isNaN(inStateAssets) ? 0 : inStateAssets);
  const cleanMonths = Math.max(1, Math.min(24, isNaN(monthsLate) ? 1 : Math.floor(monthsLate)));
  const cleanMargin = Math.max(0, Math.min(100, isNaN(profitMarginPercent) ? 30 : profitMarginPercent));
  const cleanMembers = Math.max(1, Math.min(100, isNaN(memberCount) ? 1 : Math.floor(memberCount)));

  const estimatedProfit = Math.round(cleanRevenue * (cleanMargin / 100) * 100) / 100;
  const taxMeta = getStateTaxMeta(state.id, state);

  let baseTax = state.baseTax;
  let grossReceiptsSurcharge = 0;
  let memberFee = 0;
  let latePenalty = 0;
  let statutoryInterest = 0;
  const actionItems: string[] = [];
  const statutoryNotes: string[] = [];

  // 1. Gross Receipts Surcharges & Thresholds
  if (state.id === 'california') {
    if (cleanRevenue >= 250000 && cleanRevenue < 500000) {
      grossReceiptsSurcharge = 900;
      statutoryNotes.push('California Form FTB 3536 ($900 fee) applies for gross receipts between $250,000 and $499,999.');
    } else if (cleanRevenue >= 500000 && cleanRevenue < 1000000) {
      grossReceiptsSurcharge = 2500;
      statutoryNotes.push('California Form FTB 3536 ($2,500 fee) applies for gross receipts between $500,000 and $999,999.');
    } else if (cleanRevenue >= 1000000 && cleanRevenue < 5000000) {
      grossReceiptsSurcharge = 6000;
      statutoryNotes.push('California Form FTB 3536 ($6,000 fee) applies for gross receipts between $1M and $4.99M.');
    } else if (cleanRevenue >= 5000000) {
      grossReceiptsSurcharge = 11790;
      statutoryNotes.push('California Form FTB 3536 top tier ($11,790 fee) applies for gross receipts exceeding $5 Million.');
    }
  } else if (state.id === 'new_york') {
    if (cleanRevenue < 100000) {
      baseTax = 25;
    } else if (cleanRevenue >= 100000 && cleanRevenue < 250000) {
      baseTax = 50;
      statutoryNotes.push('New York Form IT-204-LL tier ($50) applies for NY gross receipts between $100k and $249,999.');
    } else if (cleanRevenue >= 250000 && cleanRevenue < 500000) {
      baseTax = 175;
      statutoryNotes.push('New York Form IT-204-LL tier ($175) applies for NY gross receipts between $250k and $499,999.');
    } else if (cleanRevenue >= 500000 && cleanRevenue < 1000000) {
      baseTax = 500;
      statutoryNotes.push('New York Form IT-204-LL tier ($500) applies for NY gross receipts between $500k and $999,999.');
    } else if (cleanRevenue >= 1000000 && cleanRevenue < 5000000) {
      baseTax = 1500;
      statutoryNotes.push('New York Form IT-204-LL tier ($1,500) applies for NY gross receipts between $1M and $4.99M.');
    } else if (cleanRevenue >= 5000000 && cleanRevenue < 25000000) {
      baseTax = 3000;
      statutoryNotes.push('New York Form IT-204-LL tier ($3,000) applies for NY gross receipts between $5M and $24.99M.');
    } else if (cleanRevenue >= 25000000) {
      baseTax = 4500;
      statutoryNotes.push('New York Form IT-204-LL maximum tier ($4,500) applies for NY gross receipts over $25 Million.');
    }
  } else if (state.id === 'texas') {
    const threshold = 2470000;
    if (cleanRevenue <= threshold) {
      baseTax = 0;
      statutoryNotes.push(`Under Texas SB 3, revenue is below the $2.47M threshold: $0 franchise tax is due. However, Form 05-102 (PIR) is still mandatory!`);
    } else {
      // Standard 70% deduction method: taxable margin = revenue * 0.70
      const taxableMargin = cleanRevenue * 0.70;
      grossReceiptsSurcharge = Math.round(taxableMargin * 0.0075 * 100) / 100;
      statutoryNotes.push(`Texas franchise tax computed at 0.75% on 70% taxable margin ($${grossReceiptsSurcharge.toLocaleString()}).`);
    }
  } else if (state.id === 'ohio') {
    if (cleanRevenue > 3000000) {
      const taxableOverThreshold = cleanRevenue - 3000000;
      grossReceiptsSurcharge = Math.round(taxableOverThreshold * 0.0026 * 100) / 100;
      statutoryNotes.push(`Ohio Commercial Activity Tax (0.26% on gross receipts exceeding $3M): $${grossReceiptsSurcharge.toLocaleString()}.`);
    }
  } else if (state.id === 'washington') {
    // Washington Business and Occupation (B&O) tax: 1.5% service / 0.471% retailing
    // Small business credit eliminates tax if under ~$840/yr (approx $56k revenue)
    if (cleanRevenue > 56000) {
      grossReceiptsSurcharge = Math.round(cleanRevenue * 0.015 * 100) / 100;
      statutoryNotes.push(`Washington Business & Occupation (B&O) gross receipts tax (1.5% service rate): $${grossReceiptsSurcharge.toLocaleString()}.`);
    }
  }

  // 2. Member-Based Fees
  let reportFee = state.reportFee;
  if (state.id === 'new_jersey') {
    if (cleanMembers > 1) {
      // NJ imposes $150 per partner fee for entities with > 2 partners or multi-member LLC
      memberFee = (cleanMembers - 1) * 150.0;
      statutoryNotes.push(`New Jersey Form CBT-1065 member filing fee ($150 per additional partner): $${memberFee.toFixed(2)}.`);
    }
  } else if (state.id === 'tennessee') {
    // TN report fee is $50 per member (minimum $300, maximum $3,000)
    reportFee = Math.min(3000, Math.max(300, cleanMembers * 50));
    statutoryNotes.push(`Tennessee Annual Report fee calculated at $50/member: $${reportFee} (min $300, max $3,000).`);
  }

  // 3. Asset-based tax (Wyoming)
  if (state.id === 'wyoming') {
    if (cleanAssets > 300000) {
      baseTax = Math.round(cleanAssets * 0.0002 * 100) / 100;
      statutoryNotes.push(`Wyoming asset-based tax applied: $0.0002 x $${cleanAssets.toLocaleString()} = $${baseTax.toFixed(2)}.`);
    } else {
      baseTax = 60.0;
      statutoryNotes.push('Wyoming minimum license tax of $60 applies (assets under $300,000).');
    }
  }

  // 4. Late Penalties and Interest
  if (isLate) {
    if (state.id === 'delaware') {
      latePenalty = 200.0;
      const combinedBalance = baseTax + latePenalty;
      statutoryInterest = Math.round(combinedBalance * (0.015 * cleanMonths) * 100) / 100;
      actionItems.push('Delaware late penalty of $200 has been assessed automatically.');
      actionItems.push(`Interest accumulates at 1.5%/month ($${(combinedBalance * 0.015).toFixed(2)}/mo) on the total $${combinedBalance} balance.`);
    } else if (state.id === 'florida') {
      latePenalty = 400.0;
      actionItems.push('Florida imposes a MANDATORY, non-waivable $400 late fee on May 2.');
      actionItems.push('Entities that remain delinquent by September are administratively dissolved by the state.');
    } else if (state.id === 'california') {
      const monthlyRate = Math.min(0.25, 0.05 + 0.005 * cleanMonths);
      const taxBase = baseTax + grossReceiptsSurcharge;
      latePenalty = Math.round(taxBase * monthlyRate * 100) / 100;
      latePenalty += 250.0;
      statutoryInterest = Math.round((taxBase + latePenalty) * (0.007 * cleanMonths) * 100) / 100;
      actionItems.push('California imposes 5% + 0.5%/month tax penalty (max 25%) plus statutory interest.');
      actionItems.push('Added $250 California penalty for delinquent Statement of Information (SOI).');
      actionItems.push('Risk: FTB issues suspension notice, causing immediate loss of corporate powers and contracts.');
    } else if (state.id === 'nevada') {
      latePenalty = 200.0;
      actionItems.push('Nevada assesses $100 for late Annual List and $100 for late State Business License.');
    } else if (state.id === 'texas') {
      latePenalty = 50.0;
      if (cleanMonths > 1) {
        latePenalty += 50.0;
      }
      actionItems.push('Texas Comptroller assesses $50 penalty per delinquent report, plus potential forfeiture of charter.');
    } else if (state.latePenaltyType === 'flat') {
      latePenalty = state.baseLatePenalty;
      if (state.monthlyInterestRate > 0) {
        statutoryInterest = Math.round((baseTax + latePenalty) * (state.monthlyInterestRate * cleanMonths) * 100) / 100;
      }
      actionItems.push(`${state.name} assessed statutory flat late fee of $${state.baseLatePenalty}.`);
    } else if (state.latePenaltyType === 'percentage') {
      const taxBase = baseTax + grossReceiptsSurcharge;
      const rate = Math.min(state.maxPenaltyCap || 0.25, 0.05 + 0.01 * cleanMonths);
      latePenalty = Math.max(state.baseLatePenalty, Math.round(taxBase * rate * 100) / 100);
      if (state.monthlyInterestRate > 0) {
        statutoryInterest = Math.round((taxBase + latePenalty) * (state.monthlyInterestRate * cleanMonths) * 100) / 100;
      }
      actionItems.push(`${state.name} assessed percentage delinquency penalty and statutory interest.`);
    } else if (state.latePenaltyType === 'tiered') {
      latePenalty = Math.min(250, cleanMonths * state.baseLatePenalty);
      if (state.monthlyInterestRate > 0) {
        statutoryInterest = Math.round((baseTax + latePenalty) * (state.monthlyInterestRate * cleanMonths) * 100) / 100;
      }
      actionItems.push(`${state.name} assessed tiered monthly penalty of $${state.baseLatePenalty}/month (capped at $250).`);
    } else if (state.latePenaltyType === 'dissolution_only') {
      actionItems.push(`${state.name} does not charge a monetary late fee, but issues an administrative dissolution notice.`);
    }
  }

  // 5. Annualized reporting fee computation
  let annualizedReportFee = reportFee;
  if (state.reportFrequency === 'biennial') {
    annualizedReportFee = reportFee / 2;
  } else if (state.reportFrequency === 'decennial') {
    annualizedReportFee = reportFee / 10;
  } else if (state.reportFrequency === 'none') {
    annualizedReportFee = 0;
  }

  const totalStatutoryDue = Math.round(
    (baseTax + grossReceiptsSurcharge + reportFee + memberFee + latePenalty + statutoryInterest) * 100
  ) / 100;

  // 6. Estimated State Income / Pass-Through Entity Tax
  let estimatedStateTax = 0;
  if (taxMeta.hasZeroStateIncomeTax) {
    estimatedStateTax = 0;
    statutoryNotes.push(`${state.name} has 0% state personal income tax: $0 pass-through state income tax on business profits.`);
  } else if (state.id === 'tennessee') {
    // Tennessee 6.5% Excise tax on LLC net earnings
    estimatedStateTax = Math.round(estimatedProfit * 0.065 * 100) / 100;
    statutoryNotes.push(`Tennessee 6.5% Excise Tax on net earnings ($${estimatedProfit.toLocaleString()} profit): $${estimatedStateTax.toLocaleString()}.`);
  } else {
    estimatedStateTax = Math.round(estimatedProfit * taxMeta.stateIncomeTaxRate * 100) / 100;
  }

  const totalStateBurden = Math.round((totalStatutoryDue + estimatedStateTax) * 100) / 100;

  // 7. Three-Year Projected Cost (Standard on-time baseline)
  const annualBaseRunRate = baseTax + grossReceiptsSurcharge + annualizedReportFee + memberFee;
  const threeYearProjected = Math.round(annualBaseRunRate * 3 * 100) / 100;

  // 8. Flat Fee State Determination & User Feedback
  const isFlatFeeState = !state.hasGrossReceiptsSurcharge && !state.hasAssetTax && state.id !== 'new_york' && state.id !== 'texas' && state.id !== 'washington' && state.id !== 'ohio';

  let flatFeeExplanation = '';
  if (isFlatFeeState) {
    const fixedAmount = baseTax > 0 ? baseTax : state.reportFee;
    flatFeeExplanation = `${state.name} charges a statutory flat fee of $${fixedAmount.toFixed(2)} for annual entity maintenance regardless of revenue volume. Total estimated state tax liability adjusts with your revenue and profit.`;
  } else {
    flatFeeExplanation = `${state.name} calculates statutory fees dynamically based on revenue or asset tiers.`;
  }

  // Helpful action items
  if (!isLate) {
    actionItems.push(`File and pay on or before ${state.dueSchedule} to maintain active good standing.`);
    actionItems.push(`Governing form: ${state.governingForm}.`);
  }

  return {
    state,
    grossRevenue: cleanRevenue,
    inStateAssets: cleanAssets,
    isLate,
    monthsLate: cleanMonths,
    profitMarginPercent: cleanMargin,
    estimatedProfit,
    memberCount: cleanMembers,
    baseTax,
    grossReceiptsSurcharge,
    reportFee,
    memberFee,
    annualizedReportFee,
    latePenalty,
    statutoryInterest,
    totalStatutoryDue,
    estimatedStateTax,
    totalStateBurden,
    threeYearProjected,
    penaltyRiskLevel: state.penaltySeverity,
    isFlatFeeState,
    flatFeeExplanation,
    actionItems,
    statutoryNotes,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

