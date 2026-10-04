import React, { useState, useMemo, useEffect } from 'react';
import { StateRule } from '../types';
import { STATE_RULES } from '../data/stateRules';
import { formatCurrency } from '../utils/calculator';
import { updateSEOTags } from '../utils/seo';
import { navigate, getStateUrl } from '../utils/router';
import { 
  Search, 
  ArrowUpDown, 
  ArrowRight
} from 'lucide-react';

interface ComplianceMatrixViewProps {
  onSelectState: (stateId: string) => void;
}

export const ComplianceMatrixView: React.FC<ComplianceMatrixViewProps> = ({ onSelectState }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortField, setSortField] = useState<'name' | 'baseTax' | 'reportFee'>('name');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    updateSEOTags({
      title: '50-State LLC Compliance Matrix & Tax Rates (2026/2027 Master Table)',
      description: 'Filterable 50-state statutory compliance matrix for LLCs. Inspect franchise taxes, report frequencies, governing forms, and delinquency penalty structures.',
      canonicalPath: '/matrix',
      keywords: [
        '50 state LLC compliance matrix',
        'LLC annual fees table all states',
        'state franchise tax matrix',
        'LLC annual report frequency by state',
        'biennial LLC report states',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Statutory Matrix', path: '/matrix' },
      ],
    });
  }, []);

  const allStates = useMemo(() => Object.values(STATE_RULES), []);

  const filteredStates = useMemo(() => {
    return allStates.filter((st) => {
      const matchesSearch = 
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.abbr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.governingForm.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'zero_tax') return st.baseTax === 0;
      if (filterType === 'surcharge') return st.hasGrossReceiptsSurcharge;
      if (filterType === 'strict_penalty') return st.baseLatePenalty >= 100 || st.penaltySeverity === 'critical';
      if (filterType === 'biennial') return st.reportFrequency === 'biennial';
      if (filterType === 'popular') return st.isPopular;

      return true;
    }).sort((a, b) => {
      if (sortField === 'name') {
        return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortField === 'baseTax') {
        return sortAsc ? a.baseTax - b.baseTax : b.baseTax - a.baseTax;
      }
      if (sortField === 'reportFee') {
        return sortAsc ? a.reportFee - b.reportFee : b.reportFee - a.reportFee;
      }
      return 0;
    });
  }, [allStates, searchQuery, filterType, sortField, sortAsc]);

  const toggleSort = (field: 'name' | 'baseTax' | 'reportFee') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search Controller */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              50-State Statutory Compliance Matrix
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              Verified 2026/2027 statutory fee schedules, report frequencies, governing forms, and delinquency penalties.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search state, code, form..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
          {[
            { id: 'all', label: `All (${allStates.length})` },
            { id: 'popular', label: 'Popular' },
            { id: 'zero_tax', label: '$0 Base Tax' },
            { id: 'surcharge', label: 'Tiered Surcharges' },
            { id: 'strict_penalty', label: 'Late Penalties ($100+)' },
            { id: 'biennial', label: 'Biennial' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === item.id
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Data Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => toggleSort('name')}>
                  <div className="flex items-center gap-1">
                    <span>State</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => toggleSort('baseTax')}>
                  <div className="flex items-center gap-1">
                    <span>Base Tax</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => toggleSort('reportFee')}>
                  <div className="flex items-center gap-1">
                    <span>Report Fee</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </th>
                <th className="px-4 py-3">Due Schedule</th>
                <th className="px-4 py-3">Statutory Form</th>
                <th className="px-4 py-3">Late Penalty</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {filteredStates.map((st) => (
                <tr key={st.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-center px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono text-zinc-700 dark:text-zinc-300">
                        {st.abbr}
                      </span>
                      <a
                        href={getStateUrl(st.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(getStateUrl(st.id));
                        }}
                        className="hover:underline text-zinc-900 dark:text-zinc-100"
                      >
                        {st.name}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(st.baseTax)}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    {formatCurrency(st.reportFee)}
                    <span className="text-[10px] text-zinc-400 font-sans ml-1 capitalize">
                      ({st.reportFrequency})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400 max-w-xs">
                    {st.dueSchedule}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400 max-w-xs">
                    <div className="font-medium text-zinc-900 dark:text-zinc-200 line-clamp-1">{st.governingForm}</div>
                    <div className="text-[11px] text-zinc-400 line-clamp-1">{st.governingBody}</div>
                  </td>
                  <td className="px-4 py-3 text-xs max-w-xs">
                    <span className="font-mono text-zinc-900 dark:text-zinc-200">
                      {st.baseLatePenalty > 0 ? `+${formatCurrency(st.baseLatePenalty)}` : '$0'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onSelectState(st.id)}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 rounded transition-colors cursor-pointer"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
