import React, { useState, useMemo, useEffect } from 'react';
import { CalculationResult } from '../types';
import { STATE_RULES, POPULAR_STATE_KEYS } from '../data/stateRules';
import { calculateLLCCompliance, formatCurrency } from '../utils/calculator';
import { getStateTaxMeta } from '../data/stateTaxData';
import { navigate, getStateUrl } from '../utils/router';
import { updateSEOTags } from '../utils/seo';
import { InfoTooltip } from './InfoTooltip';
import { 
  Building2, 
  DollarSign, 
  ExternalLink, 
  Printer, 
  Copy, 
  Check, 
  ArrowRight, 
  Info, 
  Calendar, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  FileText,
  Clock,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  Download
} from 'lucide-react';

interface CalculatorViewProps {
  selectedStateId: string;
  setSelectedStateId: (id: string) => void;
  onOpenReport: (result: CalculationResult) => void;
  onNavigateToComparison?: (stateKey: string) => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  selectedStateId,
  setSelectedStateId,
  onOpenReport,
  onNavigateToComparison,
}) => {
  const [grossRevenue, setGrossRevenue] = useState<number>(150000);
  const [inStateAssets, setInStateAssets] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(30);
  const [memberCount, setMemberCount] = useState<number>(1);
  const [isLate, setIsLate] = useState<boolean>(false);
  const [monthsLate, setMonthsLate] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'total_burden' | 'statutory_only'>('total_burden');
  const [copied, setCopied] = useState<boolean>(false);

  const currentState = STATE_RULES[selectedStateId] || STATE_RULES['california'];
  const taxMeta = getStateTaxMeta(currentState.id, currentState);

  // Real-time calculation result
  const result: CalculationResult = useMemo(() => {
    return calculateLLCCompliance(
      currentState, 
      grossRevenue, 
      inStateAssets, 
      isLate, 
      monthsLate, 
      profitMargin, 
      memberCount
    );
  }, [currentState, grossRevenue, inStateAssets, isLate, monthsLate, profitMargin, memberCount]);

  const revenuePresets = [
    { label: '$0', value: 0 },
    { label: '$100K', value: 100000 },
    { label: '$350K', value: 350000 },
    { label: '$750K', value: 750000 },
    { label: '$1.5M', value: 1500000 },
    { label: '$3M', value: 3000000 },
  ];

  const handleCopySummary = () => {
    const text = `LLC TaxCheck Compliance Summary:
State: ${result.state.name} (${result.state.abbr})
Due Date: ${result.state.dueSchedule}
Statutory Form: ${result.state.governingForm}
Annual Base Tax: ${formatCurrency(result.baseTax)}
Gross Receipts Surcharge: ${formatCurrency(result.grossReceiptsSurcharge)}
Report / Filing Fee: ${formatCurrency(result.reportFee)}
Estimated State Tax (${taxMeta.stateTaxDescription}): ${formatCurrency(result.estimatedStateTax)}
TOTAL STATUTORY DUE: ${formatCurrency(result.totalStatutoryDue)}
TOTAL ESTIMATED STATE BURDEN: ${formatCurrency(result.totalStateBurden)}
3-Year Projected Cost: ${formatCurrency(result.threeYearProjected)}
Statutory Citation: ${result.state.statutoryCitation}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sortedStates = useMemo(() => {
    return Object.values(STATE_RULES).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const homeFAQs = useMemo(() => [
    {
      question: 'What is an LLC franchise tax versus an annual report fee?',
      answer: 'An LLC annual report fee is an administrative filing fee paid to the Secretary of State to update public corporate records, registered agent details, and principal addresses. A franchise tax (such as California\'s $800 FTB 3522 or Delaware\'s $400 annual tax under HB 400) is a statutory tax levied by state revenue departments for the legal privilege of existing as a limited liability company, regardless of business profit or operational activity.',
    },
    {
      question: 'How much does it cost to maintain an LLC each year by state?',
      answer: 'Across all 50 states, ongoing LLC maintenance costs range from $0 to over $820 per year. The national average baseline fee is approximately $91/year. High-cost states include California ($800 minimum franchise tax), Massachusetts ($500 annual report), Delaware ($400 annual tax under HB 400), Nevada ($350 total annual fees), and Tennessee ($300 minimum filing fee). Zero-fee states include Arizona, Idaho, Missouri, Ohio, and South Carolina ($0 mandatory periodic fee).',
    },
    {
      question: 'Which states have no annual report fee or franchise tax for LLCs?',
      answer: 'Five jurisdictions charge zero mandatory annual fees or franchise taxes for standard domestic LLCs: Arizona ($0 annual report), Idaho ($0 annual report), Missouri ($0 annual report), Ohio ($0 annual report, though CAT tax applies if gross receipts exceed $3M), and South Carolina ($0 annual report). Texas also charges $0 franchise tax for LLCs with gross revenues under the $2.47M no-tax-due threshold (though the Public Information Report must still be filed).',
    },
    {
      question: 'Do inactive or zero-revenue LLCs still have to pay franchise taxes and file annual reports?',
      answer: 'Yes, in almost all states. Franchise taxes (such as California\'s $800 FTB 3522 and Delaware\'s $400 fee) and Secretary of State annual reports are statutory levies for entity existence and limited liability privilege, not business profitability. Dormant or zero-revenue LLCs must continue filing reports and paying statutory minimums until formal Articles of Dissolution or Cancellation are approved by the Secretary of State.',
    },
    {
      question: 'Can I form a Delaware or Wyoming LLC to avoid California or New York taxes?',
      answer: 'No. If you reside, employ staff, lease an office, or conduct active business operations from California or New York, you are legally considered "doing business" in that home state. Under California Revenue and Taxation Code § 23101 and New York Tax Law, you must register your Delaware LLC as a Foreign LLC in your home state and pay the local franchise taxes (e.g., California\'s $800 minimum tax) on top of Delaware\'s $400 annual tax.',
    },
    {
      question: 'What happens if an LLC misses its state annual filing deadline?',
      answer: 'State penalties escalate quickly. For example, Florida assesses an immediate, non-negotiable $400 statutory late fee on May 2. Delaware charges $200 plus 1.5% monthly interest on the $600 delinquent balance. Prolonged delinquency leads to administrative dissolution or corporate charter forfeiture, stripping members of their limited liability protection and exposing them to personal legal liability.',
    },
  ], []);

  useEffect(() => {
    updateSEOTags({
      title: 'LLC Franchise Tax & Annual Fee Calculator 2026/2027 (All 50 States)',
      description: 'Calculate mandatory state LLC annual franchise taxes, Secretary of State report fees, gross receipts surcharges, and late penalty schedules across all 50 US states.',
      canonicalPath: '/',
      keywords: [
        'LLC annual report fee by state',
        'LLC franchise tax calculator',
        'Delaware LLC annual tax 400 HB 400',
        'California 800 minimum franchise tax FTB 3522',
        'Florida LLC 400 late fee Sunbiz',
        'Texas franchise tax no tax due threshold PIR',
        'Wyoming LLC license tax calculator',
        'foreign LLC penalty for doing business without registration',
        'LLC compliance checklist 2026',
      ],
      faqs: homeFAQs,
      breadcrumbs: [
        { name: 'Home', path: '/' },
      ],
    });
  }, [homeFAQs]);

  return (
    <div className="space-y-8">
      {/* Editorial Header - Restrained, Human, No AI-Slop Gradient Blobs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              LLC Franchise Tax & Annual Fee Calculator
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              Calculate statutory annual report fees, minimum franchise taxes, gross receipts surcharges, and late penalties across all 50 states.
            </p>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono shrink-0">
            Updated for 2026/2027
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>51 US Jurisdictions</span>
          <span>•</span>
          <span>Pass-Through Tax Modeling</span>
          <span>•</span>
          <span>Private Client-Side Execution</span>
        </div>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Entity Parameters
              </h2>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {currentState.abbr}
              </span>
            </div>

            {/* State Selection */}
            <div className="space-y-2.5">
              <label htmlFor="state-select" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>State of Registration</span>
                <a
                  href={getStateUrl(currentState.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(getStateUrl(currentState.id));
                  }}
                  className="text-xs text-zinc-900 dark:text-zinc-100 hover:underline inline-flex items-center gap-1 font-normal"
                >
                  <span>{currentState.name} Details</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </label>
              
              <div className="relative">
                <select
                  id="state-select"
                  value={selectedStateId}
                  onChange={(e) => setSelectedStateId(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-colors"
                >
                  {sortedStates.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.abbr}) — {st.baseTax > 0 ? `$${st.baseTax} Base Tax` : `$${st.reportFee} Annual Fee`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Jump Popular States */}
              <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="text-[11px]">Popular:</span>
                {POPULAR_STATE_KEYS.map((key) => {
                  const st = STATE_RULES[key];
                  if (!st) return null;
                  const isSelected = selectedStateId === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedStateId(key)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {st.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Annual Gross Revenue */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="gross-revenue" className="font-medium text-zinc-700 dark:text-zinc-300">
                  Annual Gross Revenue ({currentState.abbr} Source)
                </label>
                <span className="font-mono text-zinc-900 dark:text-zinc-100 font-medium">
                  {formatCurrency(grossRevenue)}
                </span>
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400 text-xs font-mono">
                  $
                </span>
                <input
                  id="gross-revenue"
                  type="number"
                  min="0"
                  step="10000"
                  value={grossRevenue === 0 ? '' : grossRevenue}
                  onChange={(e) => setGrossRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="0"
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-colors"
                />
              </div>

              {/* Revenue Presets */}
              <div className="flex flex-wrap gap-1.5">
                {revenuePresets.map((p) => {
                  const isActive = grossRevenue === p.value;
                  return (
                    <button
                      key={p.label}
                      onClick={() => setGrossRevenue(p.value)}
                      className={`px-2 py-1 text-[11px] rounded font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Profit Margin Slider */}
            <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Estimated Profit Margin
                </span>
                <span className="font-mono text-zinc-900 dark:text-zinc-100 font-medium">
                  {profitMargin}% ({formatCurrency(result.estimatedProfit)} profit)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={profitMargin}
                onChange={(e) => setProfitMargin(parseInt(e.target.value, 10))}
                className="w-full accent-zinc-900 dark:accent-zinc-100 cursor-pointer h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>5% (Low Margin)</span>
                <span>30% (Standard)</span>
                <span>80% (Digital Services)</span>
              </div>
            </div>

            {/* Member Count & Tangible Assets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    LLC Members
                  </span>
                  <InfoTooltip 
                    title="LLC Members & State Tax Impact" 
                    content="Single-member LLCs are disregarded entities for tax purposes (Form 1040 Schedule C). Multi-member LLCs file as partnerships (Form 1065). In most states (CA, DE, TX, FL), statutory fees are flat per company. In Tennessee, annual report fees are $50/member ($300 min). In New Jersey, an extra $150 per member is charged for multi-member LLCs." 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMemberCount(Math.max(1, memberCount - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md font-medium text-sm transition-colors cursor-pointer"
                    aria-label="Decrease members"
                  >
                    -
                  </button>
                  <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 w-8 text-center text-sm">
                    {memberCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMemberCount(memberCount + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md font-medium text-sm transition-colors cursor-pointer"
                    aria-label="Increase members"
                  >
                    +
                  </button>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {memberCount === 1 ? 'Single-Member' : `Multi-Member (${memberCount})`}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                  {currentState.id === 'tennessee' 
                    ? `Tennessee charges $50/member (min $300, max $3,000). Current: $${result.reportFee}`
                    : currentState.id === 'new_jersey'
                    ? (memberCount > 1 ? `New Jersey assesses $150 per partner over 1 (Current: +$${result.memberFee})` : 'New Jersey: Single-member pays $0 partner fee')
                    : `In ${currentState.name}, statutory fees are flat per entity regardless of member count.`}
                </p>
              </div>

              {currentState.hasAssetTax ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="in-state-assets" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block">
                      Tangible Assets in {currentState.name}
                    </label>
                    <InfoTooltip 
                      title="Wyoming In-State Assets Tax" 
                      content="Wyoming assesses annual license tax at $60 or $0.0002 per dollar of assets located and employed in Wyoming (whichever is greater). Assets under $300,000 pay the $60 minimum. Other states do not tax tangible assets on the LLC report." 
                    />
                  </div>
                  <input
                    id="in-state-assets"
                    type="number"
                    min="0"
                    step="50000"
                    value={inStateAssets || ''}
                    onChange={(e) => setInStateAssets(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full px-3 py-1.5 bg-white dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  />
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    {inStateAssets > 300000 
                      ? `Tax: $${(inStateAssets * 0.0002).toFixed(2)} ($0.0002 × $${inStateAssets.toLocaleString()})` 
                      : 'Under $300k: Minimum $60 statutory tax applies'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 hidden sm:block">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block">
                    Statutory Fee Basis
                  </span>
                  <div className="p-2 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    {currentState.hasGrossReceiptsSurcharge 
                      ? `${currentState.name} bases statutory fees on gross revenue tiers. Tangible assets are not taxed.`
                      : `${currentState.name} assesses a flat statutory maintenance fee. Tangible assets are not taxed.`}
                  </div>
                </div>
              )}
            </div>

            {/* Delinquent / Late Filing Simulation */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="late-toggle" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer block">
                    Simulate Delinquent / Late Filing
                  </label>
                  <span className="text-[11px] text-zinc-500 block">
                    Calculate state statutory late fees & interest
                  </span>
                </div>
                
                <button
                  id="late-toggle"
                  type="button"
                  role="switch"
                  aria-checked={isLate}
                  onClick={() => setIsLate(!isLate)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-hidden cursor-pointer ${
                    isLate ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white dark:bg-zinc-900 transition-transform ${
                      isLate ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {isLate && (
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                    <span>Delinquency Duration:</span>
                    <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
                      {monthsLate} Month{monthsLate > 1 ? 's' : ''} Past Due
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={monthsLate}
                    onChange={(e) => setMonthsLate(parseInt(e.target.value, 10))}
                    className="w-full accent-zinc-900 dark:accent-zinc-100 cursor-pointer h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none"
                  />
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    {currentState.lateRuleText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Breakdown Ledger (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xs space-y-5">
            {/* View Mode Toggle Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <span className="text-[11px] text-zinc-500 block uppercase tracking-wider font-mono">
                  Statutory Computation
                </span>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {result.state.name} Compliance Ledger
                </h3>
              </div>

              {/* Segmented Mode Switcher */}
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('total_burden')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    viewMode === 'total_burden'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  Total State Burden
                </button>
                <button
                  onClick={() => setViewMode('statutory_only')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    viewMode === 'statutory_only'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  Statutory SOS Only
                </button>
              </div>
            </div>

            {/* Friendly Primer for Tech / First-Time Founders */}
            <details className="group border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 rounded-xl p-3.5 text-xs text-zinc-900 dark:text-zinc-100">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-2 text-xs select-none">
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>Confused by these numbers? 30-Second US LLC Tax Guide</span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-700/60 space-y-2 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                <p>
                  <strong>1. Two separate bills:</strong> In the US, you pay the <em>Secretary of State</em> an administrative fee (e.g. $20) to keep your company registered, and the <em>Department of Revenue / FTB</em> a statutory franchise tax (e.g. $800 in CA) for the privilege of operating with limited liability.
                </p>
                <p>
                  <strong>2. What if I make $0 profit?</strong> You still <strong>MUST pay the statutory fee ({formatCurrency(result.totalStatutoryDue)})</strong> every year. It is a mandatory minimum maintenance fee, not a profit tax.
                </p>
                <p>
                  <strong>3. Pass-through income tax:</strong> LLC profits pass directly to your personal tax return. The {taxMeta.hasZeroStateIncomeTax ? '$0' : `~${formatCurrency(result.estimatedStateTax)}`} shown is an estimate on your business net profits, paid only at annual tax return time.
                </p>
              </div>
            </details>

            {/* Clear 3-Block Summary: What You Must Pay vs What Is Tax On Profit */}
            <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Block 1: Mandatory Legal Due (Warm Sand / Amber Tint) */}
                <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/80 dark:border-amber-900/40 shadow-2xs">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                      1. You MUST Pay
                    </span>
                    <InfoTooltip 
                      title="Mandatory Legal Cost" 
                      content="The non-negotiable statutory fees you must pay by the state deadline to keep your LLC legal and active. You owe this even if your company made $0 or operated at a loss." 
                    />
                  </div>
                  <div className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(result.totalStatutoryDue)}
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                    Due: <strong className="text-amber-900 dark:text-amber-300 font-medium">{result.state.dueSchedule.split('&')[0] || result.state.dueSchedule}</strong>
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-medium bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-1.5 py-0.5 rounded border border-amber-200/60 dark:border-amber-800/40">
                    Owed even with $0 profit
                  </span>
                </div>

                {/* Block 2: Estimated Profit Tax (Treasury Sage / Emerald Tint) */}
                <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/80 dark:border-emerald-900/40 shadow-2xs">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      2. Est. Tax on Profit
                    </span>
                    <InfoTooltip 
                      title="Tax on Business Earnings" 
                      content="Estimated state personal income or pass-through entity tax on your net business earnings. If your business earns $0 profit, you pay $0." 
                    />
                  </div>
                  <div className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-50">
                    {taxMeta.hasZeroStateIncomeTax ? '$0.00' : formatCurrency(result.estimatedStateTax + result.grossReceiptsSurcharge)}
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                    Due: <span className="text-emerald-900 dark:text-emerald-300 font-medium">At annual tax return filing</span>
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-medium bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/40">
                    {taxMeta.hasZeroStateIncomeTax ? '0% State Income Tax' : `Based on ~${formatCurrency(result.estimatedProfit)} profit`}
                  </span>
                </div>
              </div>

              {/* Grand Total Banner */}
              <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-700/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-center sm:text-left">
                <div>
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                    Total Estimated {currentState.name} Annual Outflow:
                  </span>
                  <p className="text-[11px] text-zinc-500">
                    Legal Registration ({formatCurrency(result.totalStatutoryDue)}) + Taxes on Profit ({formatCurrency(result.estimatedStateTax + result.grossReceiptsSurcharge)})
                  </p>
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-zinc-900 dark:text-zinc-50">
                  {viewMode === 'total_burden' ? formatCurrency(result.totalStateBurden) : formatCurrency(result.totalStatutoryDue)}
                </div>
              </div>
            </div>

            {/* Categorized Itemized Ledger */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
              {/* Category 1 Header: Mandatory Legal Maintenance */}
              <div className="bg-amber-50/40 dark:bg-amber-950/20 px-3.5 py-2 flex items-center justify-between border-b border-amber-200/60 dark:border-amber-900/30">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900 dark:text-amber-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>1. Mandatory State Legal Fees</span>
                </div>
                <span className="text-[10px] font-medium text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/50 px-2 py-0.5 rounded border border-amber-200/50 dark:border-amber-800/40">
                  Must Pay to Stay Active
                </span>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                {/* Base Franchise Tax */}
                <div className="flex justify-between items-center px-3.5 py-2.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium">Annual Franchise / Minimum Tax</span>
                      <InfoTooltip
                        title="Annual Franchise / Minimum Tax"
                        content="Mandatory statutory tax charged for simply having an LLC registered in this state. You must pay this every single year, even if you made zero sales or lost money."
                      />
                    </div>
                    <span className="block text-[11px] text-zinc-500">
                      Form: {currentState.governingForm.split('&')[0] || currentState.governingForm} • Due: {currentState.dueDayDescription || currentState.dueSchedule}
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                    {formatCurrency(result.baseTax)}
                  </span>
                </div>

                {/* Annual Report Fee */}
                <div className="flex justify-between items-center px-3.5 py-2.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium">Annual / Periodic Report Fee</span>
                      <InfoTooltip
                        title="Periodic Report Fee"
                        content="Administrative filing fee paid to the Secretary of State to update public corporate records, principal office address, and registered agent contact details."
                      />
                    </div>
                    <span className="block text-[11px] text-zinc-500 capitalize">
                      {result.state.reportFrequency} schedule • Paid to Secretary of State
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                    {formatCurrency(result.reportFee)}
                  </span>
                </div>

                {/* Member Fee if applicable */}
                {result.memberFee > 0 && (
                  <div className="flex justify-between items-center px-3.5 py-2.5">
                    <div className="space-y-0.5">
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium">Member Entity Filing Fee</span>
                      <span className="block text-[11px] text-zinc-500">Statutory assessment per LLC member</span>
                    </div>
                    <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                      +{formatCurrency(result.memberFee)}
                    </span>
                  </div>
                )}

                {/* Late Penalty & Interest if simulated */}
                {result.latePenalty > 0 && (
                  <div className="flex justify-between items-center px-3.5 py-2.5 text-rose-900 dark:text-rose-200 bg-rose-50/60 dark:bg-rose-950/30 border-y border-rose-100 dark:border-rose-900/30">
                    <span className="font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      Statutory Late Penalty
                    </span>
                    <span className="font-mono font-semibold">+{formatCurrency(result.latePenalty)}</span>
                  </div>
                )}

                {result.statutoryInterest > 0 && (
                  <div className="flex justify-between items-center px-3.5 py-2.5 text-rose-900 dark:text-rose-200 bg-rose-50/60 dark:bg-rose-950/30 border-b border-rose-100 dark:border-rose-900/30">
                    <span className="font-medium">Accrued Statutory Interest ({monthsLate} mo)</span>
                    <span className="font-mono font-semibold">+{formatCurrency(result.statutoryInterest)}</span>
                  </div>
                )}

                {/* Subtotal Part 1 */}
                <div className="flex justify-between items-center px-3.5 py-2 bg-amber-50/30 dark:bg-amber-950/15 font-semibold text-zinc-900 dark:text-zinc-100">
                  <span>Mandatory Legal Subtotal (You must pay this)</span>
                  <span className="font-mono text-sm">{formatCurrency(result.totalStatutoryDue)}</span>
                </div>
              </div>

              {/* Category 2 Header: Profit & Revenue Taxes */}
              {viewMode === 'total_burden' && (
                <>
                  <div className="bg-emerald-50/40 dark:bg-emerald-950/20 px-3.5 py-2 flex items-center justify-between border-t border-b border-emerald-200/60 dark:border-emerald-900/30">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-900 dark:text-emerald-200">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>2. Business Taxes on Revenue & Profit</span>
                    </div>
                    <span className="text-[10px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-200/50 dark:border-emerald-800/40">
                      Paid at Annual Tax Filing
                    </span>
                  </div>

                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                    {/* Gross Receipts Surcharge */}
                    <div className="flex justify-between items-center px-3.5 py-2.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-zinc-800 dark:text-zinc-200 font-medium">Gross Receipts Surcharge Fee</span>
                          <InfoTooltip
                            title="Gross Receipts Surcharge"
                            content="A state fee based on total top-line sales before deducting expenses. Only a few states (like California, Washington, Texas) charge this, and only above high statutory revenue thresholds (e.g. $250k+ in CA)."
                          />
                        </div>
                        <span className="block text-[11px] text-zinc-500">
                          {result.grossReceiptsSurcharge > 0
                            ? `Tier triggered on ${formatCurrency(grossRevenue)} revenue`
                            : `Owed only if revenue exceeds threshold ($250k in ${currentState.abbr})`}
                        </span>
                      </div>
                      <span className={`font-mono font-semibold ${result.grossReceiptsSurcharge > 0 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
                        {formatCurrency(result.grossReceiptsSurcharge)}
                      </span>
                    </div>

                    {/* Pass-Through Income Tax */}
                    <div className="flex justify-between items-center px-3.5 py-2.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                            Est. State Tax on Net Profits
                          </span>
                          <InfoTooltip
                            title="Pass-Through Profit Tax"
                            content="Estimated state personal income or pass-through entity tax on your net business earnings (~$45k profit at 30% margin). In the US, LLC profit passes through to the owner's tax return. If you make $0 profit, you pay $0."
                          />
                        </div>
                        <span className="block text-[11px] text-zinc-500">
                          {taxMeta.hasZeroStateIncomeTax
                            ? '0% state personal income tax jurisdiction'
                            : `${taxMeta.stateTaxDescription} on ~${formatCurrency(result.estimatedProfit)} profit`}
                        </span>
                      </div>
                      <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                        {taxMeta.hasZeroStateIncomeTax ? '$0.00' : `+${formatCurrency(result.estimatedStateTax)}`}
                      </span>
                    </div>

                    {/* Subtotal Part 2 */}
                    <div className="flex justify-between items-center px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800/50 font-semibold text-zinc-900 dark:text-zinc-100">
                      <span>Taxes on Profit Subtotal (Paid at tax return time)</span>
                      <span className="font-mono text-sm">
                        {formatCurrency(result.estimatedStateTax + result.grossReceiptsSurcharge)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Grand Total Footer */}
              <div className="flex justify-between items-center px-3.5 py-3 bg-zinc-100/90 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-50 text-sm border-t border-zinc-200 dark:border-zinc-700">
                <span>Total Statutory Due</span>
                <span className="font-mono text-base">{formatCurrency(result.totalStatutoryDue)}</span>
              </div>
            </div>

            {/* When You Pay What: Chronological Payment Timeline */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>Payment Timeline: When You Pay What</span>
              </div>

              <div className="space-y-2 relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 text-[11px]">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 border-2 border-white dark:border-zinc-900" />
                  <div className="flex justify-between font-medium">
                    <span className="text-zinc-800 dark:text-zinc-200">
                      1. By {result.state.dueSchedule.split('&')[0] || result.state.dueSchedule}
                    </span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(result.baseTax)}
                    </span>
                  </div>
                  <p className="text-zinc-500 mt-0.5">
                    Mandatory Franchise Tax paid to {currentState.governingBody.split('&')[0] || currentState.governingBody} via {currentState.governingForm.split('&')[0] || currentState.governingForm}
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-zinc-600 dark:bg-zinc-400 border-2 border-white dark:border-zinc-900" />
                  <div className="flex justify-between font-medium">
                    <span className="text-zinc-800 dark:text-zinc-200">
                      2. {result.state.reportFrequency === 'biennial' ? 'Every 2 Years' : 'Annual Secretary of State Report'}
                    </span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(result.reportFee)}
                    </span>
                  </div>
                  <p className="text-zinc-500 mt-0.5">
                    Periodic report fee paid to Secretary of State to keep company address and managers active.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600 border-2 border-white dark:border-zinc-900" />
                  <div className="flex justify-between font-medium">
                    <span className="text-zinc-800 dark:text-zinc-200">
                      3. Annual Tax Return Time (April 15)
                    </span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      ~{formatCurrency(result.estimatedStateTax + result.grossReceiptsSurcharge)}
                    </span>
                  </div>
                  <p className="text-zinc-500 mt-0.5">
                    Estimated state income taxes on net business earnings. $0 if business earns no profit.
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Year Projection */}
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/30 rounded-lg border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 font-medium block">
                  3-Year Projected Cost (On-Time Run Rate)
                </span>
                <span className="text-[11px] text-zinc-400 block">
                  Assumes consistent baseline filing schedule.
                </span>
              </div>
              <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                {formatCurrency(result.threeYearProjected)}
              </span>
            </div>

            {/* Official State Filing Information */}
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/30 rounded-lg border border-zinc-200/60 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="font-medium text-zinc-900 dark:text-zinc-200 flex items-center justify-between">
                <span>Required Form: {currentState.governingForm}</span>
                {currentState.filingUrl && (
                  <a
                    href={currentState.filingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-900 dark:text-zinc-100 hover:underline inline-flex items-center gap-1 font-normal"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                {currentState.complianceNote}
              </p>
              <div className="text-[11px] text-zinc-400 font-mono">
                Citation: {currentState.statutoryCitation}
              </div>
            </div>

            {/* Action Buttons: Copy, Print */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                <span>{copied ? 'Copied' : 'Copy Summary'}</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenReport(result)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>

            {/* Quick Navigation Links */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <a
                href={getStateUrl(selectedStateId)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(getStateUrl(selectedStateId));
                }}
                className="text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1"
              >
                <span>Full {currentState.name} Guide</span>
                <ArrowRight className="w-3 h-3" />
              </a>

              {onNavigateToComparison && (
                <button
                  onClick={() => onNavigateToComparison(selectedStateId)}
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Compare States
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Structured SEO Editorial Knowledge Guide */}
      <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-8 text-zinc-900 dark:text-zinc-100">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
            Statutory Guide & Benchmarks
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Understanding LLC Annual Reports & State Franchise Taxes
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Every US limited liability company is subject to mandatory state compliance rules. Failing to file timely reports or remit franchise taxes triggers compounding late penalties and risks administrative dissolution.
          </p>
        </div>

        {/* 2-Column Concept Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <h3 className="font-semibold text-sm">LLC Annual Report Fees (Secretary of State)</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Administrative periodic filings that keep business records current with the Secretary of State (SOS). Most states charge a modest flat fee ($20 in California, $50 in Colorado, $138.75 in Florida) to confirm principal office addresses and registered agent contact information.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <h3 className="font-semibold text-sm">State Franchise Taxes & Minimum Levies</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Statutory privilege taxes assessed by state departments of revenue for the right to operate with limited liability. These taxes (e.g., California’s $800 FTB 3522 or Delaware’s $400 tax under HB 400) are mandatory regardless of whether your business earned revenue or operated at a net loss.
            </p>
          </div>
        </div>

        {/* High-Intent Search Jurisdictions Hub */}
        <div className="space-y-3">
          <h3 className="font-semibold text-base">
            High-Volume Incorporation Hubs (2026/2027 Schedules)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <a
              href="/states/delaware"
              onClick={(e) => { e.preventDefault(); navigate('/states/delaware'); }}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors block group"
            >
              <div className="flex items-center justify-between">
                <strong className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  Delaware LLC Tax (HB 400)
                </strong>
                <span className="font-mono text-zinc-500">$400/yr</span>
              </div>
              <p className="text-zinc-500 mt-1">
                Flat annual franchise tax due June 1. Strict $200 penalty + 1.5% monthly interest on delinquency.
              </p>
            </a>

            <a
              href="/states/california"
              onClick={(e) => { e.preventDefault(); navigate('/states/california'); }}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors block group"
            >
              <div className="flex items-center justify-between">
                <strong className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  California LLC ($800 FTB)
                </strong>
                <span className="font-mono text-zinc-500">$800/yr</span>
              </div>
              <p className="text-zinc-500 mt-1">
                Mandatory minimum franchise tax (FTB 3522) due April 15. Gross receipts fee applies above $250K.
              </p>
            </a>

            <a
              href="/states/florida"
              onClick={(e) => { e.preventDefault(); navigate('/states/florida'); }}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors block group"
            >
              <div className="flex items-center justify-between">
                <strong className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  Florida Annual Report
                </strong>
                <span className="font-mono text-zinc-500">$138.75</span>
              </div>
              <p className="text-zinc-500 mt-1">
                Due May 1 on Sunbiz. Mandatory non-waivable $400 statutory late fine assessed on May 2.
              </p>
            </a>

            <a
              href="/states/texas"
              onClick={(e) => { e.preventDefault(); navigate('/states/texas'); }}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors block group"
            >
              <div className="flex items-center justify-between">
                <strong className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  Texas Franchise Tax (PIR)
                </strong>
                <span className="font-mono text-zinc-500">$0 under $2.47M</span>
              </div>
              <p className="text-zinc-500 mt-1">
                No tax due threshold increased to $2.47M. Public Information Report (Form 05-102) due May 15.
              </p>
            </a>

            <a
              href="/states/wyoming"
              onClick={(e) => { e.preventDefault(); navigate('/states/wyoming'); }}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors block group"
            >
              <div className="flex items-center justify-between">
                <strong className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  Wyoming License Tax
                </strong>
                <span className="font-mono text-zinc-500">$60 min</span>
              </div>
              <p className="text-zinc-500 mt-1">
                Assessed on in-state assets. Due on the first day of the anniversary month of formation.
              </p>
            </a>

            <a
              href="/states/nevada"
              onClick={(e) => { e.preventDefault(); navigate('/states/nevada'); }}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors block group"
            >
              <div className="flex items-center justify-between">
                <strong className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  Nevada Annual List
                </strong>
                <span className="font-mono text-zinc-500">$350 total</span>
              </div>
              <p className="text-zinc-500 mt-1">
                $150 Annual List fee plus mandatory $200 State Business License fee due annually.
              </p>
            </a>
          </div>
        </div>

        {/* Benchmark Comparison Table for High-Intent Organic Search */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 className="font-semibold text-base">
              2026/2027 State LLC Maintenance Fee & Franchise Tax Benchmark
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              Top 8 Incorporation Hubs Compared
            </span>
          </div>
          
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                    <th className="py-2.5 px-3">Jurisdiction</th>
                    <th className="py-2.5 px-3 font-mono">Mandatory Annual Fee</th>
                    <th className="py-2.5 px-3">Due Date / Filing Schedule</th>
                    <th className="py-2.5 px-3 font-mono">Late Filing Penalty</th>
                    <th className="py-2.5 px-3">State Income Tax</th>
                    <th className="py-2.5 px-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800">
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">DE</span>
                        <span>Delaware</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$400.00 / yr</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">June 1 annually</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">+$200 + 1.5%/mo</td>
                    <td className="py-2.5 px-3 text-zinc-500">Graduated (0% to 6.6%)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/delaware" onClick={(e) => { e.preventDefault(); navigate('/states/delaware'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">WY</span>
                        <span>Wyoming</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$60.00 min</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">1st day of anniversary month</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">Dissolution risk</td>
                    <td className="py-2.5 px-3 text-zinc-700 dark:text-zinc-300 font-medium">0% (No state income tax)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/wyoming" onClick={(e) => { e.preventDefault(); navigate('/states/wyoming'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">CA</span>
                        <span>California</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$800.00 min + surcharges</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">April 15 (FTB 3522)</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">5% + interest + $250 SOI</td>
                    <td className="py-2.5 px-3 text-zinc-500">1% to 13.3% (or 9.3% PTET)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/california" onClick={(e) => { e.preventDefault(); navigate('/states/california'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">FL</span>
                        <span>Florida</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$138.75 / yr</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">May 1 annually (Sunbiz)</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">+$400.00 non-waivable</td>
                    <td className="py-2.5 px-3 text-zinc-700 dark:text-zinc-300 font-medium">0% (No state income tax)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/florida" onClick={(e) => { e.preventDefault(); navigate('/states/florida'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">TX</span>
                        <span>Texas</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$0.00 (under $2.47M)</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">May 15 annually (PIR 05-102)</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">+$50.00 penalty</td>
                    <td className="py-2.5 px-3 text-zinc-700 dark:text-zinc-300 font-medium">0% (No state income tax)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/texas" onClick={(e) => { e.preventDefault(); navigate('/states/texas'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">NV</span>
                        <span>Nevada</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$350.00 / yr ($150 + $200)</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">Last day of anniversary month</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">+$75 + $100 penalty</td>
                    <td className="py-2.5 px-3 text-zinc-700 dark:text-zinc-300 font-medium">0% (No state income tax)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/nevada" onClick={(e) => { e.preventDefault(); navigate('/states/nevada'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">NY</span>
                        <span>New York</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$9.00 biennial + IT-204-LL</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">March 15 (IT-204-LL) & Biennial</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">5% / mo + interest</td>
                    <td className="py-2.5 px-3 text-zinc-500">4% to 10.9% (plus NYC if local)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/new_york" onClick={(e) => { e.preventDefault(); navigate('/states/new_york'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">MA</span>
                        <span>Massachusetts</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">$500.00 / yr</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">Anniversary date of formation</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-200">Administrative dissolution</td>
                    <td className="py-2.5 px-3 text-zinc-500">Flat 5.0% (or 9.0% over $1M)</td>
                    <td className="py-2.5 px-3 text-right">
                      <a href="/states/massachusetts" onClick={(e) => { e.preventDefault(); navigate('/states/massachusetts'); }} className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium">
                        Guide →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Foreign LLC Qualification Callout */}
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
            <ShieldCheck className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <span>The "Foreign LLC Qualification" Tax Trap for Remote Entrepreneurs</span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Entrepreneurs using services like Stripe Atlas frequently form Delaware or Wyoming LLCs while residing in California, New York, or Texas. Under state law, operating a business or managing servers from your home state constitutes "transacting intrastate business." You are legally required to foreign qualify in your home state, making you liable for two sets of annual fees and franchise taxes.
          </p>
        </div>

        {/* Interactive FAQ Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">
            Frequently Asked Questions: LLC Compliance & Taxes
          </h3>
          <div className="space-y-2">
            {homeFAQs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-3.5 bg-white dark:bg-zinc-900 text-xs open:bg-zinc-50/50 dark:open:bg-zinc-800/30 transition-colors"
              >
                <summary className="font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer list-none flex items-center justify-between gap-2">
                  <span>{faq.question}</span>
                  <span className="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-2">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
