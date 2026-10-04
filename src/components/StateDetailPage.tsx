import React, { useState, useMemo, useEffect } from 'react';
import { StateRule, CalculationResult } from '../types';
import { STATE_RULES } from '../data/stateRules';
import { getStateTaxMeta } from '../data/stateTaxData';
import { calculateLLCCompliance, formatCurrency } from '../utils/calculator';
import { updateSEOTags, getStateSEOMeta } from '../utils/seo';
import { navigate, getStateUrl } from '../utils/router';
import { InfoTooltip } from './InfoTooltip';
import { 
  Building2, 
  Calendar, 
  AlertTriangle, 
  ExternalLink, 
  HelpCircle, 
  ArrowRight, 
  Share2, 
  FileText, 
  Scale, 
  Check, 
  ChevronRight,
  Info,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface StateDetailPageProps {
  stateId: string;
  onOpenReport: (result: CalculationResult) => void;
  onSelectState?: (stateId: string) => void;
}

export const StateDetailPage: React.FC<StateDetailPageProps> = ({
  stateId,
  onOpenReport,
  onSelectState,
}) => {
  const state: StateRule = STATE_RULES[stateId] || STATE_RULES.california;
  const taxMeta = getStateTaxMeta(state.id, state);

  // Calculator states
  const [grossRevenue, setGrossRevenue] = useState<number>(150000);
  const [inStateAssets, setInStateAssets] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(30);
  const [memberCount, setMemberCount] = useState<number>(1);
  const [isLate, setIsLate] = useState<boolean>(false);
  const [monthsLate, setMonthsLate] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'total_burden' | 'statutory_only'>('total_burden');
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic SEO meta updating on state change with Schema.org JSON-LD FAQs & Breadcrumbs
  useEffect(() => {
    const seo = getStateSEOMeta(
      state.name, 
      state.abbr, 
      state.dueSchedule, 
      state.baseTax, 
      state.reportFee,
      state.governingForm,
      state.statutoryCitation
    );
    updateSEOTags({
      ...seo,
      canonicalPath: `/states/${state.id}`,
      faqs: taxMeta.faqs,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: '50-State Directory', path: '/states' },
        { name: `${state.name} LLC`, path: `/states/${state.id}` },
      ],
    });
  }, [state, taxMeta]);

  // Compute live calculation
  const result: CalculationResult = useMemo(() => {
    return calculateLLCCompliance(
      state,
      grossRevenue,
      inStateAssets,
      isLate,
      monthsLate,
      profitMargin,
      memberCount
    );
  }, [state, grossRevenue, inStateAssets, isLate, monthsLate, profitMargin, memberCount]);

  const revenuePresets = [
    { label: '$0', value: 0 },
    { label: '$100K', value: 100000 },
    { label: '$350K', value: 350000 },
    { label: '$750K', value: 750000 },
    { label: '$1.5M', value: 1500000 },
    { label: '$3M', value: 3000000 },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const alternatives = (taxMeta.popularAlternatives || ['delaware', 'wyoming', 'florida', 'texas'])
    .filter(altId => altId !== state.id && STATE_RULES[altId])
    .map(altId => STATE_RULES[altId]);

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          Calculator
        </a>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <a 
          href="/states" 
          onClick={(e) => { e.preventDefault(); navigate('/states'); }}
          className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          50-State Directory
        </a>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">{state.name} LLC</span>
      </nav>

      {/* State Hero Banner - Clean Editorial Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
                {state.abbr}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Statutory Code: {state.statutoryCitation}
              </span>
              {taxMeta.hasZeroStateIncomeTax && (
                <span className="text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/40">
                  0% State Income Tax
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {state.name} LLC Franchise Tax & Annual Filing Requirements
            </h1>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Official annual filing fees, franchise tax calculations, Secretary of State deadlines, and statutory penalty enforcement under {state.statutoryCitation}.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-amber-50/30 dark:bg-amber-950/15 border border-amber-200/60 dark:border-amber-900/30 rounded-lg p-3">
                <span className="text-[11px] text-amber-800 dark:text-amber-300 font-medium block">Filing Deadline</span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate block mt-0.5" title={state.dueSchedule}>
                  {state.dueSchedule}
                </span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 rounded-lg p-3">
                <span className="text-[11px] text-zinc-500 block">Baseline Statutory Fee</span>
                <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 block mt-0.5">
                  {state.baseTax > 0 ? formatCurrency(state.baseTax) : formatCurrency(state.reportFee)}
                </span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 rounded-lg p-3">
                <span className="text-[11px] text-zinc-500 block">Governing Form</span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate block mt-0.5" title={state.governingForm}>
                  {state.governingForm}
                </span>
              </div>
              <div className="bg-rose-50/30 dark:bg-rose-950/15 border border-rose-200/60 dark:border-rose-900/30 rounded-lg p-3">
                <span className="text-[11px] text-rose-800 dark:text-rose-300 font-medium block">Late Penalty</span>
                <span className={`text-xs font-mono font-semibold block mt-0.5 ${state.baseLatePenalty > 0 ? 'text-rose-700 dark:text-rose-300' : 'text-zinc-900 dark:text-zinc-100'}`}>
                  {state.baseLatePenalty > 0 ? `+${formatCurrency(state.baseLatePenalty)}` : '$0 / Varies'}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[200px] shrink-0">
            {state.filingUrl && (
              <a
                href={state.filingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3.5 py-2 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-medium text-xs rounded-lg transition-colors"
              >
                <span>Official Filing Portal</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            )}
            <button
              onClick={() => navigate(`/compare?state=${state.id}`)}
              className="inline-flex items-center justify-center px-3.5 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
              <span>Compare vs Other States</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center px-3.5 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 mr-1 text-zinc-800 dark:text-zinc-200" /> : <Share2 className="w-3.5 h-3.5 mr-1" />}
              <span>{copiedLink ? 'Link Copied' : 'Share State Guide'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded State Calculator */}
      <section className="bg-white dark:bg-zinc-900 rounded-xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Interactive {state.name} Compliance Simulation
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Simulate revenue-tier adjustments, member counts, and late delinquency costs.
            </p>
          </div>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('total_burden')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'total_burden'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Total State Burden
            </button>
            <button
              onClick={() => setViewMode('statutory_only')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'statutory_only'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Statutory SOS Only
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Revenue Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Annual Gross Revenue ({state.abbr} Sourced)
                </span>
                <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(grossRevenue)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="10000"
                value={grossRevenue === 0 ? '' : grossRevenue}
                onChange={(e) => setGrossRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0"
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg font-mono text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex flex-wrap gap-1.5">
                {revenuePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setGrossRevenue(preset.value)}
                    className={`px-2 py-1 text-[11px] rounded font-medium transition-colors cursor-pointer ${
                      grossRevenue === preset.value
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Profit Margin Slider */}
            <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Operating Profit Margin
                </span>
                <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
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
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none"
              />
            </div>

            {/* Member Count & Tangible Assets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block">
                  LLC Members
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMemberCount(Math.max(1, memberCount - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md font-medium text-sm transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 w-8 text-center text-sm">
                    {memberCount}
                  </span>
                  <button
                    onClick={() => setMemberCount(memberCount + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md font-medium text-sm transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {state.hasAssetTax && (
                <div className="space-y-1.5">
                  <label htmlFor="state-detail-assets" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block">
                    Tangible Assets in {state.name}
                  </label>
                  <input
                    id="state-detail-assets"
                    type="number"
                    min="0"
                    step="50000"
                    value={inStateAssets || ''}
                    onChange={(e) => setInStateAssets(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="$0"
                    className="w-full px-3 py-1.5 bg-white dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg font-mono text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              )}
            </div>

            {/* Delinquency / Late Filing Simulation */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block">
                    Simulate Delinquent / Late Filing
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Apply {state.abbr} late fees and compounding interest
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLate(!isLate)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
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
                <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 rounded-lg p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                    <span>Months Past Statutory Deadline:</span>
                    <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">{monthsLate} Month(s) Late</span>
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
                    {state.lateRuleText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Display Column (5 cols) - Transparent & Clear Financial Ledger */}
          <div className="lg:col-span-5 space-y-4">
            {/* Clear 3-Block Summary */}
            <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Block 1: Mandatory Legal Due */}
                <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      1. You MUST Pay
                    </span>
                    <InfoTooltip 
                      title="Mandatory Legal Cost" 
                      content="Mandatory statutory fees you must pay by the state deadline to keep your LLC active. You owe this even if you made $0 or operated at a loss." 
                    />
                  </div>
                  <div className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(result.totalStatutoryDue)}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Due: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{state.dueSchedule.split('&')[0] || state.dueSchedule}</strong>
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                    Owed even with $0 profit
                  </span>
                </div>

                {/* Block 2: Estimated Profit Tax */}
                <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      2. Est. Tax on Profit
                    </span>
                    <InfoTooltip 
                      title="Tax on Business Earnings" 
                      content="Estimated state personal income or pass-through entity tax on net business earnings. If your business earns $0 profit, this is $0." 
                    />
                  </div>
                  <div className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-50">
                    {taxMeta.hasZeroStateIncomeTax ? '$0.00' : formatCurrency(result.estimatedStateTax + result.grossReceiptsSurcharge)}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Due: <span className="text-zinc-700 dark:text-zinc-300 font-medium">At annual tax return filing</span>
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
                    {taxMeta.hasZeroStateIncomeTax ? '0% State Income Tax' : `Based on ~${formatCurrency(result.estimatedProfit)} profit`}
                  </span>
                </div>
              </div>

              {/* Grand Total Banner */}
              <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-700/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-center sm:text-left">
                <div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    Total Estimated {state.name} Annual Outflow:
                  </span>
                  <p className="text-[11px] text-zinc-400">
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
              <div className="bg-zinc-100 dark:bg-zinc-800 px-3.5 py-2 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>1. Mandatory State Legal Fees</span>
                </div>
                <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
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
                        content="Mandatory statutory tax charged for having an active LLC in this state. Must be paid every year regardless of sales or revenue."
                      />
                    </div>
                    <span className="block text-[11px] text-zinc-500">
                      Form: {state.governingForm.split('&')[0] || state.governingForm} • Due: {state.dueDayDescription || state.dueSchedule}
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
                        content="Administrative filing fee paid to the Secretary of State to update official corporate records, registered agent, and addresses."
                      />
                    </div>
                    <span className="block text-[11px] text-zinc-500 capitalize">
                      {state.reportFrequency} schedule • Secretary of State
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

                {/* Late Penalty & Interest */}
                {isLate && (
                  <>
                    <div className="flex justify-between items-center px-3.5 py-2.5 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20">
                      <span className="font-medium">Statutory Late Penalties:</span>
                      <span className="font-mono font-semibold">+{formatCurrency(result.latePenalty)}</span>
                    </div>
                    {result.statutoryInterest > 0 && (
                      <div className="flex justify-between items-center px-3.5 py-2.5 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20">
                        <span>Accrued Statutory Interest ({monthsLate} mo):</span>
                        <span className="font-mono font-semibold">+{formatCurrency(result.statutoryInterest)}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Subtotal Part 1 */}
                <div className="flex justify-between items-center px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800/50 font-semibold text-zinc-900 dark:text-zinc-100">
                  <span>Mandatory Legal Subtotal (You must pay this)</span>
                  <span className="font-mono text-sm">{formatCurrency(result.totalStatutoryDue)}</span>
                </div>
              </div>

              {/* Category 2 Header: Profit & Revenue Taxes */}
              {viewMode === 'total_burden' && (
                <>
                  <div className="bg-zinc-100 dark:bg-zinc-800 px-3.5 py-2 flex items-center justify-between border-t border-b border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                      <DollarSign className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>2. Business Taxes on Revenue & Profit</span>
                    </div>
                    <span className="text-[10px] font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
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
                            content="A fee on total business sales before expenses. Only applies in a few states (like CA, WA, TX) when sales exceed high statutory levels ($250k+ in CA)."
                          />
                        </div>
                        <span className="block text-[11px] text-zinc-500">
                          {result.grossReceiptsSurcharge > 0
                            ? `Tier triggered on ${formatCurrency(grossRevenue)} revenue`
                            : `Owed only if revenue exceeds threshold ($250k in ${state.abbr})`}
                        </span>
                      </div>
                      <span className={`font-mono font-semibold ${result.grossReceiptsSurcharge > 0 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
                        {formatCurrency(result.grossReceiptsSurcharge)}
                      </span>
                    </div>

                    {/* Pass-Through Income Tax */}
                    <div className="flex justify-between items-center px-3.5 py-2.5 bg-blue-50/30 dark:bg-blue-950/10">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                            Est. State Tax on Net Profits
                          </span>
                          <InfoTooltip
                            title="Pass-Through Profit Tax"
                            content="Estimated state personal income or pass-through entity tax on net business earnings. If your business earns $0 profit, you pay $0."
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

            {/* When You Pay What Timeline */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>Payment Timeline: When You Pay What</span>
              </div>

              <div className="space-y-2 relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 text-[11px]">
                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-600 border-2 border-white dark:border-zinc-900" />
                  <div className="flex justify-between font-medium">
                    <span className="text-zinc-800 dark:text-zinc-200">
                      1. By {state.dueSchedule.split('&')[0] || state.dueSchedule}
                    </span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(result.baseTax)}
                    </span>
                  </div>
                  <p className="text-zinc-500 mt-0.5">
                    Mandatory Franchise Tax paid to {state.governingBody.split('&')[0] || state.governingBody} via {state.governingForm.split('&')[0] || state.governingForm}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white dark:border-zinc-900" />
                  <div className="flex justify-between font-medium">
                    <span className="text-zinc-800 dark:text-zinc-200">
                      2. {state.reportFrequency === 'biennial' ? 'Every 2 Years' : 'Annual Secretary of State Report'}
                    </span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(result.reportFee)}
                    </span>
                  </div>
                  <p className="text-zinc-500 mt-0.5">
                    Periodic report fee paid to Secretary of State to keep public registration in good standing.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-zinc-400 border-2 border-white dark:border-zinc-900" />
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

            {/* Action Button */}
            <button
              onClick={() => onOpenReport(result)}
              className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Generate Official {state.abbr} Audit PDF</span>
            </button>

            {/* 3-Year Projection Box */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3.5 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 font-medium block">3-Year Projected Cost</span>
                <span className="text-[11px] text-zinc-400">On-time annual baseline run rate</span>
              </div>
              <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                {formatCurrency(result.threeYearProjected)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive State Compliance Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Statutory Rules & Checklists */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statutory Filing Details */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {state.name} Statutory Filing Schedule & Deadlines
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {state.complianceNote}
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Statutory Authority:</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-mono font-semibold">{state.statutoryCitation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Governing Agency:</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">{state.governingBody}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Official Periodic Form:</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">{state.governingForm}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Filing Frequency:</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium capitalize">{state.reportFrequency} Report</span>
              </div>
            </div>
          </div>

          {/* Late Penalty & Dissolution Traps */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              <AlertTriangle className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <h3 className="text-base font-semibold">
                Enforcement Traps & Late Penalties in {state.name}
              </h3>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 rounded-lg text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              {state.lateRuleText}
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              When an LLC falls out of good standing with {state.governingBody}, the company forfeits its legal capacity. This prevents initiating or defending lawsuits in state courts, risks contract enforceability, and can expose members to personal liability claims.
            </p>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Frequently Asked Questions ({state.abbr} LLC)
              </h3>
            </div>
            <div className="space-y-3 pt-1">
              {taxMeta.faqs.map((faq, idx) => (
                <div key={idx} className="border border-zinc-200/60 dark:border-zinc-800 rounded-lg p-3.5 space-y-1 text-xs">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {faq.question}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Cross-State Links & Alternatives */}
        <div className="space-y-6">
          {/* Compare with Alternative States */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Compare {state.name} vs Other States
            </h3>
            <p className="text-xs text-zinc-500">
              Founders considering {state.name} frequently cross-compare these jurisdictions:
            </p>
            <div className="space-y-1.5 pt-1">
              {alternatives.map((alt) => (
                <a
                  key={alt.id}
                  href={getStateUrl(alt.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(getStateUrl(alt.id));
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800 font-mono font-medium text-[11px] text-zinc-800 dark:text-zinc-200">
                      {alt.abbr}
                    </span>
                    <div>
                      <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                        {alt.name}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {alt.baseTax > 0 ? `$${alt.baseTax} Tax` : `$${alt.reportFee} Fee`}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
            <button
              onClick={() => navigate(`/compare?state=${state.id}`)}
              className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-medium rounded-lg transition-colors text-center block cursor-pointer"
            >
              Side-by-Side Cost Comparison Tool →
            </button>
          </div>

          {/* Full Directory CTA */}
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-center space-y-2.5">
            <Building2 className="w-6 h-6 text-zinc-400 mx-auto" />
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Browse All 50 States & DC
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Check annual report fees, franchise taxes, and statutory deadlines for any US state.
            </p>
            <a
              href="/states"
              onClick={(e) => {
                e.preventDefault();
                navigate('/states');
              }}
              className="inline-flex items-center justify-center px-3.5 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-lg transition-colors"
            >
              Open 50-State Directory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
