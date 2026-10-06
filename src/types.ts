export type ReportFrequency = 'annual' | 'biennial' | 'decennial' | 'none';

export type PenaltySeverity = 'critical' | 'high' | 'moderate' | 'low' | 'none';

export interface GrossReceiptsTier {
  min: number;
  max: number;
  fee: number;
  rate?: number;
  description?: string;
}

export interface StateFAQ {
  question: string;
  answer: string;
}

export interface StateRule {
  id: string;
  name: string;
  abbr: string;
  baseTax: number;
  reportFee: number;
  reportFrequency: ReportFrequency;
  dueSchedule: string;
  dueMonthFixed?: number | null; // 1-12 or null if based on anniversary month
  dueDayDescription: string;
  governingBody: string;
  governingForm: string;
  filingUrl?: string;
  hasGrossReceiptsSurcharge: boolean;
  grossReceiptsBrackets?: GrossReceiptsTier[];
  hasAssetTax: boolean;
  assetThreshold?: number;
  assetRate?: number;
  latePenaltyType: 'flat' | 'percentage' | 'tiered' | 'dissolution_only' | 'none';
  baseLatePenalty: number;
  monthlyInterestRate: number; // e.g. 0.015 for 1.5%
  maxPenaltyCap?: number;
  lateRuleText: string;
  complianceNote: string;
  statutoryCitation: string;
  penaltySeverity: PenaltySeverity;
  isPopular?: boolean;
  // State business & personal income tax metadata
  stateIncomeTaxRate?: number; // e.g. 0.093 for CA, 0.0 for FL/TX/WY
  hasZeroStateIncomeTax?: boolean;
  stateTaxDescription?: string;
  formationFee?: number;
  faqs?: StateFAQ[];
  popularAlternatives?: string[]; // state IDs
}

export interface CalculationResult {
  state: StateRule;
  grossRevenue: number;
  inStateAssets: number;
  isLate: boolean;
  monthsLate: number;
  profitMarginPercent: number;
  estimatedProfit: number;
  memberCount: number;
  baseTax: number;
  grossReceiptsSurcharge: number;
  reportFee: number;
  memberFee: number;
  annualizedReportFee: number;
  latePenalty: number;
  statutoryInterest: number;
  totalStatutoryDue: number;
  estimatedStateTax: number;
  totalStateBurden: number;
  threeYearProjected: number;
  penaltyRiskLevel: PenaltySeverity;
  isFlatFeeState: boolean;
  flatFeeExplanation: string;
  actionItems: string[];
  statutoryNotes: string[];
}

export type ActiveTab = 
  | 'calculator' 
  | 'states' 
  | 'state-detail' 
  | 'comparison' 
  | 'matrix' 
  | 'deadlines' 
  | 'methodology'
  | 'guides'
  | 'guide-detail'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'about'
  | 'contact';

