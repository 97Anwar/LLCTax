import React, { useState, useMemo, useEffect } from 'react';
import { STATE_RULES } from '../data/stateRules';
import { calculateLLCCompliance, formatCurrency } from '../utils/calculator';
import { updateSEOTags } from '../utils/seo';
import { 
  ArrowLeftRight, 
  Plus, 
  Trash2, 
  Calendar, 
  ArrowRight
} from 'lucide-react';

interface StateComparisonViewProps {
  onSelectStateForCalculator: (stateId: string) => void;
}

export const StateComparisonView: React.FC<StateComparisonViewProps> = ({
  onSelectStateForCalculator,
}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const st = params.get('state')?.toLowerCase();
      if (st && STATE_RULES[st]) {
        const defaults = ['delaware', 'wyoming', 'california', 'texas'].filter(id => id !== st);
        return [st, ...defaults.slice(0, 3)];
      }
    }
    return ['delaware', 'wyoming', 'california', 'texas'];
  });
  const [compRevenue, setCompRevenue] = useState<number>(250000);
  const [compAssets, setCompAssets] = useState<number>(100000);

  // Sync state if URL query param changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const st = params.get('state')?.toLowerCase();
      if (st && STATE_RULES[st] && !selectedStates.includes(st)) {
        setSelectedStates(prev => [st, ...prev.filter(id => id !== st).slice(0, 3)]);
      }
    }
  }, []);

  useEffect(() => {
    updateSEOTags({
      title: 'Compare LLC Fees & Franchise Taxes by State (2026/2027 Benchmark)',
      description: 'Side-by-side LLC cost comparison tool. Benchmark California, Delaware, Wyoming, Nevada, Texas, Florida, and other states on annual franchise taxes, report fees, and penalties.',
      canonicalPath: '/compare',
      keywords: [
        'compare LLC fees by state',
        'Delaware vs Wyoming LLC cost',
        'California vs Delaware LLC franchise tax',
        'cheapest state to form an LLC',
        'LLC annual maintenance cost comparison',
        'best state for online business LLC',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'State Cost Comparison', path: '/compare' },
      ],
    });
  }, []);

  const availableStates = useMemo(() => {
    return Object.values(STATE_RULES).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const addState = (stateId: string) => {
    if (!selectedStates.includes(stateId) && selectedStates.length < 4) {
      setSelectedStates([...selectedStates, stateId]);
    }
  };

  const removeState = (stateId: string) => {
    if (selectedStates.length > 2) {
      setSelectedStates(selectedStates.filter((id) => id !== stateId));
    }
  };

  const comparisonData = useMemo(() => {
    return selectedStates.map((id) => {
      const state = STATE_RULES[id] || STATE_RULES['delaware'];
      const calc = calculateLLCCompliance(state, compRevenue, compAssets, false, 1);
      const lateCalc = calculateLLCCompliance(state, compRevenue, compAssets, true, 2);
      return {
        state,
        calc,
        lateCalc,
      };
    });
  }, [selectedStates, compRevenue, compAssets]);

  return (
    <div className="space-y-6">
      {/* Header Banner - Clean, Minimal */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Cross-State LLC Compliance Benchmark
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Compare 2 to 4 US jurisdictions under identical financial parameters to evaluate annual statutory run rates, gross receipts surcharges, and penalty enforcement.
            </p>
          </div>

          {/* Revenue and Assets Input Controller */}
          <div className="flex flex-wrap items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80">
            <div>
              <label htmlFor="comp-revenue" className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                Annual Revenue:
              </label>
              <input
                id="comp-revenue"
                type="number"
                min="0"
                step="50000"
                value={compRevenue}
                onChange={(e) => setCompRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-28 px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label htmlFor="comp-assets" className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                In-State Assets:
              </label>
              <input
                id="comp-assets"
                type="number"
                min="0"
                step="50000"
                value={compAssets}
                onChange={(e) => setCompAssets(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-28 px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* State Selector Chips to Add */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-medium">Add State:</span>
          {availableStates
            .filter((st) => !selectedStates.includes(st.id))
            .slice(0, 8)
            .map((st) => (
              <button
                key={st.id}
                onClick={() => addState(st.id)}
                disabled={selectedStates.length >= 4}
                className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-700 dark:text-zinc-300 text-xs rounded border border-zinc-200 dark:border-zinc-700/80 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 text-zinc-500" />
                <span>{st.name}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Comparison Grid Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${
        selectedStates.length === 2 ? 'lg:grid-cols-2' :
        selectedStates.length === 3 ? 'lg:grid-cols-3' :
        'lg:grid-cols-4'
      } gap-4`}>
        {comparisonData.map(({ state, calc }) => (
          <div 
            key={state.id}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xs flex flex-col justify-between space-y-4"
          >
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  {state.abbr}
                </span>
                {selectedStates.length > 2 && (
                  <button
                    onClick={() => removeState(state.id)}
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-1 rounded transition-colors cursor-pointer"
                    title="Remove from comparison"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{state.name}</h2>
              <p className="text-[11px] text-zinc-500 truncate">{state.governingBody}</p>
            </div>

            {/* Total Annual Cost Highlight Box */}
            <div className={`rounded-lg p-3.5 border text-center transition-colors ${
              calc.totalStatutoryDue === 0
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40'
                : calc.totalStatutoryDue >= 500
                ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40'
                : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200/80 dark:border-zinc-800'
            }`}>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">
                Year 1 Statutory Total
              </span>
              <div className={`text-2xl font-mono font-bold mt-0.5 ${
                calc.totalStatutoryDue === 0
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-zinc-900 dark:text-zinc-50'
              }`}>
                {calc.totalStatutoryDue === 0 ? 'Free ($0)' : formatCurrency(calc.totalStatutoryDue)}
              </div>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-1">
                Due: {state.dueSchedule}
              </span>
            </div>

            {/* Metrics List */}
            <div className="space-y-2.5 text-xs divide-y divide-zinc-100 dark:divide-zinc-800/80">
              <div className="flex justify-between pt-1">
                <span className="text-zinc-600 dark:text-zinc-400">Base Annual Tax:</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(calc.baseTax)}</span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-zinc-600 dark:text-zinc-400">Gross Receipts Surcharge:</span>
                <span className={`font-mono font-semibold ${calc.grossReceiptsSurcharge > 0 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
                  {formatCurrency(calc.grossReceiptsSurcharge)}
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-zinc-600 dark:text-zinc-400">Periodic Report Fee:</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(calc.reportFee)} ({state.reportFrequency})
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-zinc-600 dark:text-zinc-400">3-Year Run Rate:</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(calc.threeYearProjected)}
                </span>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-zinc-600 dark:text-zinc-400">Late Penalty:</span>
                  <span className="text-[11px] font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                    {state.baseLatePenalty > 0 ? `+${formatCurrency(state.baseLatePenalty)}` : '$0'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 bg-zinc-50 dark:bg-zinc-800/30 p-2 rounded border border-zinc-200/60 dark:border-zinc-800 leading-normal">
                  {state.lateRuleText}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onSelectStateForCalculator(state.id)}
              className="w-full py-2 px-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium text-xs transition-colors text-center cursor-pointer"
            >
              Open in Calculator
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
