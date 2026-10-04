import React, { useState, useMemo, useEffect } from 'react';
import { STATE_RULES, POPULAR_STATE_KEYS } from '../data/stateRules';
import { getStateTaxMeta } from '../data/stateTaxData';
import { formatCurrency } from '../utils/calculator';
import { updateSEOTags } from '../utils/seo';
import { navigate, getStateUrl } from '../utils/router';
import { 
  Search, 
  ArrowRight, 
  ChevronRight,
  Calendar
} from 'lucide-react';

export const StatesDirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'zero_tax' | 'popular' | 'critical_penalty' | 'tiered'>('all');

  useEffect(() => {
    updateSEOTags({
      title: '50-State LLC Annual Fees & Franchise Taxes Directory (2026/2027)',
      description: 'Directory of official annual report fees, state franchise taxes, gross receipts surcharges, and penalty deadlines for all 50 US states and Washington D.C.',
      canonicalPath: '/states',
      keywords: [
        'LLC annual report fee by state',
        'LLC franchise tax by state directory',
        'state annual report filing costs',
        'zero income tax LLC states',
        'LLC annual report deadlines 2026',
        'foreign LLC registration fee list',
        'Secretary of State LLC fees 50 states',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: '50-State Directory', path: '/states' },
      ],
      faqs: [
        {
          question: 'What states do not require an annual report for an LLC?',
          answer: 'Arizona, Missouri, Ohio, and South Carolina do not require an annual report or periodic fee for limited liability companies. Pennsylvania requires a decennial report (once every 10 years). However, entities in these states may still be subject to state income, gross receipts, or local excise taxes.',
        },
        {
          question: 'Which states have the most expensive annual fees for LLCs?',
          answer: 'California charges an $800 minimum annual franchise tax plus potential gross receipts fees up to $11,790. Massachusetts charges a $500 annual report fee. Delaware charges a flat $300 annual franchise tax. Nevada charges $350 annually ($150 annual list + $200 state business license).',
        },
        {
          question: 'Which states have no state personal income tax on LLC profits?',
          answer: 'Nine states have no individual state income tax: Alaska, Florida, Nevada, New Hampshire (dividends/interest tax expires 2027), South Dakota, Tennessee, Texas, Washington, and Wyoming. Pass-through LLC profits in these states are not taxed at the state individual income tax level.',
        },
      ],
    });
  }, []);

  const statesList = useMemo(() => {
    return Object.values(STATE_RULES);
  }, []);

  const filteredStates = useMemo(() => {
    return statesList.filter((st) => {
      const taxMeta = getStateTaxMeta(st.id, st);
      const matchesSearch = 
        st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.abbr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.governingForm.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'zero_tax') {
        return taxMeta.hasZeroStateIncomeTax;
      }
      if (activeFilter === 'popular') {
        return POPULAR_STATE_KEYS.includes(st.id);
      }
      if (activeFilter === 'critical_penalty') {
        return st.penaltySeverity === 'critical' || st.baseLatePenalty >= 100;
      }
      if (activeFilter === 'tiered') {
        return st.hasGrossReceiptsSurcharge || st.hasAssetTax || st.id === 'new_york' || st.id === 'texas' || st.id === 'washington';
      }

      return true;
    });
  }, [statesList, searchTerm, activeFilter]);

  return (
    <div className="space-y-6 pb-16">
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
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">50-State Directory</span>
      </nav>

      {/* Directory Header - Minimal, Content-first */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              50-State LLC Statutory Directory
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              Statutory filing fees, Secretary of State annual report schedules, gross receipts surcharges, and late penalty structures for all 50 states and Washington D.C.
            </p>
          </div>
          <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
            51 Jurisdictions
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-2 space-y-3">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search state, code (DE, CA, FL), or form..."
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-colors"
            />
          </div>

          {/* Clean Segmented Filter Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              All Jurisdictions ({statesList.length})
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'popular'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Popular Hubs ({POPULAR_STATE_KEYS.length})
            </button>
            <button
              onClick={() => setActiveFilter('zero_tax')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'zero_tax'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              0% State Income Tax
            </button>
            <button
              onClick={() => setActiveFilter('critical_penalty')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'critical_penalty'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              High Late Penalties ($100+)
            </button>
            <button
              onClick={() => setActiveFilter('tiered')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === 'tiered'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Revenue-Tiered
            </button>
          </div>
        </div>
      </div>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((st) => {
          const taxMeta = getStateTaxMeta(st.id, st);
          const stateUrl = getStateUrl(st.id);
          const totalFixed = st.baseTax + st.reportFee;

          return (
            <a
              key={st.id}
              href={stateUrl}
              onClick={(e) => {
                e.preventDefault();
                navigate(stateUrl);
              }}
              className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors flex flex-col justify-between group shadow-2xs"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono font-semibold text-xs flex items-center justify-center">
                      {st.abbr}
                    </span>
                    <div>
                      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                        {st.name}
                      </h2>
                      <span className="text-[11px] text-zinc-500 capitalize">
                        {st.reportFrequency === 'none' ? 'No annual report' : `${st.reportFrequency} filing`}
                      </span>
                    </div>
                  </div>

                  {taxMeta.hasZeroStateIncomeTax ? (
                    <span className="text-[11px] font-mono font-medium text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/40">
                      0% Tax
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {(taxMeta.stateIncomeTaxRate * 100).toFixed(1)}% tax
                    </span>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 text-xs">
                  <div>
                    <span className="text-[11px] text-zinc-500 block">Baseline Statutory</span>
                    <span className={`font-mono font-semibold ${totalFixed === 0 ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-zinc-900 dark:text-zinc-100'}`}>
                      {totalFixed === 0 ? 'Free ($0)' : formatCurrency(totalFixed)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-500 block">Late Penalty</span>
                    <span className={`font-mono font-medium ${st.baseLatePenalty >= 100 ? 'text-rose-700 dark:text-rose-400 font-semibold' : st.baseLatePenalty > 0 ? 'text-zinc-900 dark:text-zinc-200' : 'text-zinc-400'}`}>
                      {st.baseLatePenalty > 0 ? `+${formatCurrency(st.baseLatePenalty)}` : '$0'}
                    </span>
                  </div>
                </div>

                {/* Due Date & Form */}
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    <span>Due: {st.dueSchedule}</span>
                  </div>
                  <div className="truncate text-zinc-400 font-mono">
                    Form: {st.governingForm}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white">
                <span className="font-medium">View Requirements</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
