import React, { useEffect } from 'react';
import { updateSEOTags } from '../utils/seo';
import { Scale, FileText, AlertTriangle } from 'lucide-react';

export const TermsOfServiceView: React.FC = () => {
  useEffect(() => {
    updateSEOTags({
      title: 'Terms of Service — LLCTaxCheck.com',
      description: 'Terms of Service and Conditions of Use for LLCTaxCheck.com. Review permitted educational use, intellectual property, limitation of liability, and governing terms.',
      canonicalPath: '/terms',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <Scale className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Terms of Service
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last Revised: October 2026 • Effective Date: January 1, 2026
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
          Welcome to <strong>LLCTaxCheck.com</strong>. By accessing or using our website, tools, calculators, statutory matrices, or reports at <code>https://llctaxcheck.com</code>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>
      </div>

      {/* 1. Educational Use Only */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          1. Educational & Informational Purpose
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          LLCTaxCheck.com provides automated simulations of state statutory LLC filing fees, minimum franchise taxes, gross receipts surcharges, and delinquency penalties based on codified state statutes and administrative regulations.
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
          <strong>No Professional Advice:</strong> The calculations, content, and downloadable audit summaries provided are for educational and planning purposes only. They do not constitute formal legal, accounting, tax, or corporate structuring advice. You should consult a licensed CPA, attorney, or registered tax professional before making corporate filings.
        </div>
      </div>

      {/* 2. Permitted & Prohibited Use */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          2. Permitted & Prohibited Use
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          You are granted a limited, revocable, non-exclusive license to access and use LLCTaxCheck.com for personal or internal business compliance planning. You agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          <li>Scrape, harvest, or bulk-extract our statutory datasets using unauthorized automated bots to create a competing commercial directory without attribution.</li>
          <li>Attempt to compromise, overload, or execute denial-of-service attacks on our infrastructure.</li>
          <li>Misrepresent calculation results as official certified determinations of state Departments of Revenue or Secretaries of State.</li>
        </ul>
      </div>

      {/* 3. Intellectual Property */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          3. Intellectual Property Rights
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          While the text of state statutes, revenue codes, and official forms are in the public domain, the computational logic, interface designs, custom mathematical algorithms, curated comparison tools, software code, and editorial compilations of LLCTaxCheck.com are the proprietary intellectual property of LLCTaxCheck.com and protected under US and international copyright laws.
        </p>
      </div>

      {/* 4. Limitation of Liability */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          <span>4. Disclaimer of Warranties & Limitation of Liability</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          OUR SITE AND CALCULATORS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WHILE WE AUDIT OUR DATA AGAINST Codified State Statutes, STATE LEGISLATION, AND SOS ADMINISTRATIVE DIRECTIVES REGULARLY, WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, AS TO THE ABSOLUTE ACCURACY, COMPLETENESS, OR FITNESS FOR A PARTICULAR PURPOSE.
        </p>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          IN NO EVENT SHALL LLCTAXCHECK.COM, ITS CONTRIBUTORS, OR OPERATORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING BUT NOT LIMITED TO LATE FILING PENALTIES, CORPORATE DISSOLUTION FEES, OR LOSS OF GOOD STANDING) ARISING FROM YOUR RELIANCE ON INFORMATION ACCESSED THROUGH THIS WEBSITE.
        </p>
      </div>

      {/* 5. Governing Law */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          5. Modifications & Governing Law
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          We reserve the right to modify these Terms of Service at any time. Continued use of our site after updates constitutes acceptance of the modified terms. These terms are governed by the laws of the United States.
        </p>
        <p className="text-xs font-mono text-zinc-500 pt-1">
          Questions regarding these terms? Contact: <a href="mailto:legal@llctaxcheck.com" className="text-zinc-900 dark:text-zinc-100 underline">legal@llctaxcheck.com</a>
        </p>
      </div>
    </div>
  );
};
