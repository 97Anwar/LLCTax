import React, { useEffect } from 'react';
import { updateSEOTags } from '../utils/seo';
import { AlertCircle, Scale, ShieldAlert, BookOpen, CheckCircle } from 'lucide-react';

export const LegalDisclaimerView: React.FC = () => {
  useEffect(() => {
    updateSEOTags({
      title: 'Legal & Tax Disclaimer — LLCTaxCheck.com',
      description: 'Official statutory disclaimer and IRS Circular 230 disclosure for LLCTaxCheck.com. Understand our educational scope, non-affiliation with state agencies, and independent verification guidance.',
      canonicalPath: '/disclaimer',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Legal Disclaimer', path: '/disclaimer' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span>Statutory Compliance Notice</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Legal & Tax Disclaimer
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Important Notice for Founders, Business Owners, and Tax Professionals
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
          Please read this Disclaimer carefully before utilizing the calculations, schedules, matrices, or educational reports provided by <strong>LLCTaxCheck.com</strong>.
        </p>
      </div>

      {/* IRS Circular 230 Disclosure */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Scale className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>1. IRS Circular 230 Disclosure</span>
        </h2>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-2 leading-relaxed">
          <p>
            To ensure compliance with requirements imposed by the United States Internal Revenue Service (IRS), we inform you that any US federal tax advice or state tax estimations contained on this website (including any downloadable reports or simulation outputs) is not intended or written to be used, and cannot be used, for the purpose of:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>(i) Avoiding penalties under the Internal Revenue Code or state tax codes; or</li>
            <li>(ii) Promoting, marketing, or recommending to another party any transaction or tax-related matter addressed herein.</li>
          </ul>
        </div>
      </div>

      {/* No Legal or CPA Relationship */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>2. Not Professional Legal or Tax Advice</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            LLCTaxCheck.com is an independent informational and educational software application. It does not provide legal representation, certified public accounting (CPA) services, or personalized tax advisory.
          </p>
          <p>
            The use of our tools, calculators, or website does not create an attorney-client relationship, accountant-client relationship, or fiduciary duty of any kind. State tax statutes, administrative rules, and filing fee structures are subject to frequent legislative amendments and varying judicial interpretations.
          </p>
          <p>
            Always verify specific filing amounts, eligible deductions, elective pass-through entity tax (PTET) elections, and due date deadlines directly with your state’s Secretary of State, Department of Revenue, or a qualified licensed attorney/CPA.
          </p>
        </div>
      </div>

      {/* Non-Affiliation with Government Agencies */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>3. Non-Affiliation with Government Agencies</span>
        </h2>
        <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            LLCTaxCheck.com is a privately owned and operated web service. <strong>We are NOT affiliated with, endorsed by, sponsored by, or an official agency of any state government, the California Franchise Tax Board, the Delaware Division of Corporations, the Florida Department of State (Sunbiz), the Texas Comptroller of Public Accounts, or the US Internal Revenue Service.</strong>
          </p>
          <p>
            Official state filing portals are linked throughout our directory for direct, government-level filings. We do not charge state filing fees on behalf of any state agency.
          </p>
        </div>
      </div>

      {/* Continuous Audit Notice */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>4. Reporting Statute Changes & Discrepancies</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          We actively track state legislative sessions and administrative changes across all 50 jurisdictions. If you identify a newly enacted fee adjustment or updated statutory code citation, please submit a correction notice to our editorial desk at <a href="mailto:statutes@llctaxcheck.com" className="text-zinc-900 dark:text-zinc-100 underline">statutes@llctaxcheck.com</a>.
        </p>
      </div>
    </div>
  );
};
