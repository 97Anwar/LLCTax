import React, { useState, useEffect } from 'react';
import { STATE_RULES } from '../data/stateRules';
import { updateSEOTags } from '../utils/seo';
import { 
  CalendarClock, 
  AlertTriangle, 
  Calendar, 
  ArrowRight
} from 'lucide-react';

interface DeadlinesRadarViewProps {
  onSelectState: (stateId: string) => void;
}

export const DeadlinesRadarView: React.FC<DeadlinesRadarViewProps> = ({ onSelectState }) => {
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'anniversary'>('all');

  useEffect(() => {
    updateSEOTags({
      title: 'LLC Filing Deadlines & Statutory Penalty Calendar (2026/2027)',
      description: 'Track mandatory state filing dates, critical cutoff deadlines, and statutory late penalties across all 50 states. Avoid Florida $400 late fee and Delaware $200 penalties.',
      canonicalPath: '/deadlines',
      keywords: [
        'LLC annual report deadlines 2026',
        'Florida Sunbiz late fee May 1',
        'Delaware LLC annual tax due June 1',
        'California FTB 3522 due April 15',
        'LLC filing penalty calendar',
        'avoid administrative dissolution LLC',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Deadlines Radar', path: '/deadlines' },
      ],
    });
  }, []);

  const deadlineTraps = [
    {
      stateId: 'florida',
      stateName: 'Florida',
      cutoffDate: 'May 1',
      penalty: '$400 Mandatory Late Fee',
      headline: 'May 1 Late Penalty Enforcement',
      description: 'Florida assesses an automatic statutory $400 late fee if filed past midnight on May 1. Total fee jumps from $138.75 to $538.75 immediately. Administrative dissolution follows in September.',
      citation: 'Fla. Stat. § 605.0213',
    },
    {
      stateId: 'delaware',
      stateName: 'Delaware',
      cutoffDate: 'June 1',
      penalty: '$200 Penalty + 1.5%/mo Interest',
      headline: 'June 1 Annual Tax Cutoff',
      description: 'Delaware LLCs must pay $400 by June 1 (under HB 400). Delinquency on June 2 incurs an immediate $200 penalty plus 1.5% compounding monthly interest on the $600 delinquent balance.',
      citation: '6 Del. C. § 18-1107',
    },
    {
      stateId: 'california',
      stateName: 'California',
      cutoffDate: 'April 15 & June 15',
      penalty: '$800 Minimum Tax + Surcharges',
      headline: 'Mandatory Minimum Tax & Dual Cutoff',
      description: 'California requires $800 FTB 3522 by April 15, regardless of revenue or activity. LLCs with gross receipts > $250k owe FTB 3536 by June 15. Statements of Information have separate filing timelines.',
      citation: 'Cal. Rev. & Tax. Code §§ 17941, 17942',
    },
    {
      stateId: 'texas',
      stateName: 'Texas',
      cutoffDate: 'May 15',
      penalty: '$50 Penalty + Charter Forfeiture',
      headline: 'Public Information Report Mandatory Requirement',
      description: 'Even if revenue is under the no-tax-due threshold and $0 franchise tax is owed, LLCs must still file Form 05-102 (Public Information Report) by May 15.',
      citation: 'Tex. Tax Code § 171.203',
    },
    {
      stateId: 'nevada',
      stateName: 'Nevada',
      cutoffDate: 'Anniversary Month End',
      penalty: '$200 Combined Late Penalty',
      headline: 'Annual List & State Business License',
      description: 'Nevada mandates an Annual List ($150) and a State Business License ($200). Missing the deadline triggers a $100 penalty for each filing requirement ($550 total due).',
      citation: 'NRS 76.100 & NRS 86.263',
    },
  ];

  const calendarSchedules = [
    {
      quarter: 'Q1',
      title: 'Q1 (January – March)',
      items: [
        { state: 'Alaska', due: 'Jan 2 (Biennial)', form: 'Biennial Report', id: 'alaska' },
        { state: 'Michigan', due: 'Feb 15', form: 'Annual Statement', id: 'michigan' },
        { state: 'New York', due: 'March 15', form: 'IT-204-LL Gross Filing Fee', id: 'new_york' },
        { state: 'Alabama', due: 'March 15', form: 'Form BPT-IN Privilege Tax', id: 'alabama' },
        { state: 'Vermont', due: 'March 15', form: 'Annual Report', id: 'vermont' },
        { state: 'Connecticut', due: 'March 31', form: 'Annual Report', id: 'connecticut' },
        { state: 'Iowa', due: 'March 31 (Odd Years)', form: 'Biennial Report', id: 'iowa' },
      ],
    },
    {
      quarter: 'Q2',
      title: 'Q2 (April – June) — Peak Statutory Season',
      items: [
        { state: 'Georgia', due: 'April 1', form: 'Annual Registration', id: 'georgia' },
        { state: 'District of Columbia', due: 'April 1 (Biennial)', form: 'Form BRA-25', id: 'district_of_columbia' },
        { state: 'New Hampshire', due: 'April 1', form: 'Annual Report', id: 'new_hampshire' },
        { state: 'California', due: 'April 15', form: 'FTB 3522 ($800 Minimum)', id: 'california' },
        { state: 'North Carolina', due: 'April 15', form: 'Annual Report ($200)', id: 'north_carolina' },
        { state: 'Maryland', due: 'April 15', form: 'Form 1 Annual Report ($300)', id: 'maryland' },
        { state: 'Tennessee', due: 'April 15', form: 'Franchise & Excise Return ($300 min)', id: 'tennessee' },
        { state: 'Montana', due: 'April 15', form: 'Annual Report', id: 'montana' },
        { state: 'Florida', due: 'May 1', form: 'Sunbiz Annual Report ($400 late fee May 2)', id: 'florida' },
        { state: 'Arkansas', due: 'May 1', form: 'Franchise Tax Report', id: 'arkansas' },
        { state: 'Rhode Island', due: 'May 1', form: 'Form 632 Annual Report', id: 'rhode_island' },
        { state: 'Texas', due: 'May 15', form: 'Form 05-102 PIR (Mandatory)', id: 'texas' },
        { state: 'Delaware', due: 'June 1', form: 'Delaware LLC Franchise Tax ($400 under HB 400)', id: 'delaware' },
        { state: 'Maine', due: 'June 1', form: 'Annual Report', id: 'maine' },
        { state: 'California (Fee)', due: 'June 15', form: 'FTB 3536 Gross Surcharge Fee', id: 'california' },
        { state: 'Kentucky', due: 'June 30', form: 'Annual Report', id: 'kentucky' },
      ],
    },
    {
      quarter: 'Q3',
      title: 'Q3 (July – September)',
      items: [
        { state: 'West Virginia', due: 'July 1', form: 'Annual Report', id: 'west_virginia' },
        { state: 'Pennsylvania', due: 'September 30', form: 'Annual Report (Act 122)', id: 'pennsylvania' },
      ],
    },
    {
      quarter: 'Q4',
      title: 'Q4 (October – December)',
      items: [
        { state: 'North Dakota', due: 'November 15', form: 'Annual Report', id: 'north_dakota' },
        { state: 'Minnesota', due: 'December 31', form: 'Annual Renewal ($0 fee, mandatory)', id: 'minnesota' },
      ],
    },
    {
      quarter: 'anniversary',
      title: 'Anniversary-Based Filing Dates (Formation Month Dependent)',
      items: [
        { state: 'Wyoming', due: '1st day of formation anniversary month', form: 'License Tax Report ($60+)', id: 'wyoming' },
        { state: 'Nevada', due: 'Last day of formation anniversary month', form: 'List + License ($350)', id: 'nevada' },
        { state: 'Colorado', due: '2-month window around formation anniversary', form: 'Periodic Report ($10)', id: 'colorado' },
        { state: 'Illinois', due: '1st day of formation anniversary month', form: 'Form LLC-50.1 ($75)', id: 'illinois' },
        { state: 'Massachusetts', due: 'Anniversary date of formation', form: 'Annual Report ($500)', id: 'massachusetts' },
        { state: 'New Jersey', due: 'Last day of formation anniversary month', form: 'Annual Report ($75)', id: 'new_jersey' },
        { state: 'Washington', due: 'Last day of formation anniversary month', form: 'Annual Report ($60)', id: 'washington' },
        { state: 'Virginia', due: 'Last day of formation anniversary month', form: 'Registration Fee ($50)', id: 'virginia' },
        { state: 'Indiana', due: 'Biennial anniversary month', form: 'Business Entity Report', id: 'indiana' },
        { state: 'Louisiana', due: 'Anniversary date of formation', form: 'Annual Report ($30)', id: 'louisiana' },
        { state: 'Oklahoma', due: 'Anniversary date of formation', form: 'Annual Certificate ($25)', id: 'oklahoma' },
        { state: 'Oregon', due: 'Anniversary date of formation', form: 'Annual Report ($100)', id: 'oregon' },
        { state: 'South Dakota', due: '1st day of anniversary month', form: 'Annual Report ($50)', id: 'south_dakota' },
        { state: 'Utah', due: 'Anniversary date of formation', form: 'Annual Renewal ($18)', id: 'utah' },
        { state: 'Wisconsin', due: 'End of formation quarter', form: 'Annual Report ($25)', id: 'wisconsin' },
      ],
    },
  ];

  const filteredSchedules = calendarSchedules.filter((sched) => {
    if (selectedQuarter === 'all') return true;
    return sched.quarter === selectedQuarter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Statutory Deadlines & Filing Calendar
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            State compliance follows statutory schedules independent of federal deadlines. Missing statutory dates can trigger automated fines and forfeiture of good standing.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
          {[
            { id: 'all', label: 'All Schedules' },
            { id: 'Q1', label: 'Q1 (Jan - Mar)' },
            { id: 'Q2', label: 'Q2 (Apr - Jun)' },
            { id: 'Q3', label: 'Q3 (Jul - Sep)' },
            { id: 'Q4', label: 'Q4 (Oct - Dec)' },
            { id: 'anniversary', label: 'Anniversary Based' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedQuarter(item.id as any)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                selectedQuarter === item.id
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Penalty Traps Callout Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Strict Penalty Schedules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {deadlineTraps.map((trap) => (
            <div
              key={trap.stateId}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-rose-200/60 dark:border-rose-900/40 hover:border-rose-300 dark:hover:border-rose-800 p-4 shadow-2xs flex flex-col justify-between space-y-3 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {trap.cutoffDate}
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-200/70 dark:border-rose-900/40">
                    {trap.penalty}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{trap.headline}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {trap.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono text-[10px]">{trap.citation}</span>
                <button
                  onClick={() => onSelectState(trap.stateId)}
                  className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Review State</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chronological Calendar Lists */}
      <div className="space-y-4">
        {filteredSchedules.map((sched) => (
          <div key={sched.quarter} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              <span>{sched.title}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {sched.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectState(item.id)}
                  className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-100 text-xs">{item.state}</div>
                      <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">{item.due}</div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono font-semibold">
                      {STATE_RULES[item.id]?.abbr || item.id.toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1.5 truncate">
                    {item.form}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
