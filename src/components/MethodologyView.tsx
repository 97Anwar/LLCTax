import React, { useEffect } from 'react';
import { updateSEOTags } from '../utils/seo';
import { 
  ShieldCheck, 
  Lock, 
  BookOpen, 
  HelpCircle,
  Scale
} from 'lucide-react';

export const MethodologyView: React.FC = () => {
  useEffect(() => {
    updateSEOTags({
      title: 'LLC Tax Methodology & Statutory Citations (2026/2027 Guide)',
      description: 'Review the statutory citations, state revenue codes, and client-side computational architecture powering the LLC TaxCheck compliance engine.',
      canonicalPath: '/methodology',
      keywords: [
        'LLC statutory citations',
        'California Rev & Tax Code 17941',
        'Delaware 6 Del C 18-1107',
        'Florida Stat 605.0213',
        'Texas Tax Code Chapter 171',
        'state franchise tax methodology',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Methodology & Citations', path: '/methodology' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Calculation Methodology & Statutory Sources
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Comprehensive compliance reference compiled from official state statutes, administrative revenue codes, and Secretary of State filings across all 50 US states and the District of Columbia.
        </p>
      </div>

      {/* Privacy Architecture */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          Zero-PII Client-Side Processing
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          All calculations are executed locally inside your web browser. Financial figures, member counts, and entity configurations are not transmitted to any remote database.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block mb-0.5">No Remote Logging</strong>
            <span className="text-zinc-500 dark:text-zinc-400">Revenue numbers and calculation state never leave your local session.</span>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block mb-0.5">Zero Ad Trackers</strong>
            <span className="text-zinc-500 dark:text-zinc-400">No cross-site tracking pixels or financial lead selling scripts.</span>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block mb-0.5">Instant Calculation</strong>
            <span className="text-zinc-500 dark:text-zinc-400">Deterministic statutory models evaluate figures in real time without network latency.</span>
          </div>
        </div>
      </div>

      {/* Statutory References */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          Primary Statutory Legal Authorities
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Statutory fee schedules and delinquency rules referenced directly from codified state statutes:
        </p>

        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 divide-y divide-zinc-100 dark:divide-zinc-800/80">
          <div className="pt-2">
            <strong className="text-zinc-900 dark:text-zinc-100">California:</strong>{' '}
            <span>Cal. Rev. & Tax. Code § 17941 (mandatory $800 annual minimum tax); § 17942 (graduated gross receipts fee via Form FTB 3536); Cal. Corp. Code § 17702.09 (Statement of Information Form LLC-12 & $250 penalty).</span>
          </div>
          <div className="pt-2">
            <strong className="text-zinc-900 dark:text-zinc-100">Delaware:</strong>{' '}
            <span>Del. Code Ann. tit. 6, § 18-1107 (Annual Tax of Limited Liability Companies, flat $300 tax due June 1, non-waivable $200 late penalty plus 1.5% monthly interest).</span>
          </div>
          <div className="pt-2">
            <strong className="text-zinc-900 dark:text-zinc-100">Florida:</strong>{' '}
            <span>Fla. Stat. §§ 605.0212 & 605.0213 ($138.75 Sunbiz Annual Report; mandatory $400 statutory late fee on May 2; administrative dissolution proceedings in September).</span>
          </div>
          <div className="pt-2">
            <strong className="text-zinc-900 dark:text-zinc-100">Texas:</strong>{' '}
            <span>Tex. Tax Code Ann. ch. 171 & Senate Bill 3 (88th Legislature). $2.47M no-tax-due threshold, 0.75% standard margin rate, and mandatory Public Information Report (PIR Form 05-102).</span>
          </div>
          <div className="pt-2">
            <strong className="text-zinc-900 dark:text-zinc-100">Wyoming:</strong>{' '}
            <span>Wyo. Stat. Ann. § 17-29-209 (Annual Report License Tax; $60 flat up to $300,000 in-state assets; $0.0002 per dollar of assets exceeding $300,000).</span>
          </div>
          <div className="pt-2">
            <strong className="text-zinc-900 dark:text-zinc-100">Nevada:</strong>{' '}
            <span>Nev. Rev. Stat. § 86.263 (Annual List of Managers $150); § 76.100 (State Business License $200); combined $200 late penalty.</span>
          </div>
          <div className="pt-2">
            <strong className="text-zinc-900 dark:text-zinc-100">New York:</strong>{' '}
            <span>N.Y. Tax Law § 658(c)(3) (Annual filing fee Form IT-204-LL scaling from $25 up to $4,500 based on NY source gross income) & N.Y. LLC Law § 301.</span>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          Foreign LLC & Nexus Clarifications
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800 space-y-1">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
              Forming in Delaware or Wyoming while residing elsewhere
            </h3>
            <p className="leading-relaxed">
              If you form an out-of-state LLC but operate or reside in another state (such as California or New York), you are generally classified as "transacting business" in your home state. Most home states require Foreign LLC qualification and payment of their local minimum franchise taxes in addition to home jurisdiction fees.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800 space-y-1">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
              Inactive or zero-revenue entities
            </h3>
            <p className="leading-relaxed">
              In states like California ($800) and Delaware ($400 under HB 400), franchise taxes are excise taxes for the legal privilege of entity existence and apply regardless of business activity. Other states, like Arizona ($0) or Texas (under threshold), assess $0 in baseline franchise taxes.
            </p>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-2">
        <h3 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
          <Scale className="w-3.5 h-3.5 text-zinc-500" />
          Statutory Informational Notice
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          LLC TaxCheck provides mathematical simulations based on publicly available state statutes. This software is not a law firm, certified public accounting practice, or governmental agency, and does not provide formal legal or tax counsel. Verify statutory obligations with your respective Secretary of State or Department of Revenue prior to remitting filing fees.
        </p>
      </div>
    </div>
  );
};
