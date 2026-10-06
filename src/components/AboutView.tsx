import React, { useEffect } from 'react';
import { updateSEOTags } from '../utils/seo';
import { navigate } from '../utils/router';
import { Building2, ShieldCheck, Database, CheckCircle2, Users, ArrowRight, Lock } from 'lucide-react';

export const AboutView: React.FC = () => {
  useEffect(() => {
    updateSEOTags({
      title: 'About Us & Editorial Methodology — LLCTaxCheck.com',
      description: 'Learn about LLCTaxCheck.com, our mission to bring transparent state compliance data to US founders, our statutory verification methodology, and editorial standards.',
      canonicalPath: '/about',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Hero Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span>Independent Compliance Initiative</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          About LLCTaxCheck.com
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
          We built LLCTaxCheck.com to solve one of the most frustrating, opaque problems in American entrepreneurship: <strong>the hidden, recurring state maintenance fees and franchise tax traps that surprise small business owners every single year.</strong>
        </p>
      </div>

      {/* Why We Built This */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>The Problem with Traditional Formation Services</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            When founders form a Limited Liability Company, incorporation services and platforms advertise cheap formation packages ($0 + state fee). What they rarely make clear is the **ongoing statutory obligations** required to keep the company in good standing:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 dark:text-zinc-300">
            <li>California’s mandatory <strong>$800 annual minimum franchise tax</strong> (FTB 3522), owed even if your company earned zero revenue.</li>
            <li>Delaware’s flat <strong>$400 annual tax</strong> (under HB 400) and its brutal <strong>$200 penalty + 1.5% compounding interest</strong> after June 1.</li>
            <li>Florida’s <strong>$138.75 Sunbiz annual report</strong> with a mandatory, non-waivable <strong>$400 late fee</strong> assessed on May 2.</li>
            <li>The <strong>Foreign LLC Qualification Trap</strong>, where remote founders register in Delaware or Wyoming but unknowingly trigger mandatory dual-state filing requirements in their home state.</li>
          </ul>
          <p>
            LLCTaxCheck.com was engineered to give founders, registered agents, and CPAs immediate, transparent clarity across all 50 US states without sales pitches, paywalls, or lead-generation funnels.
          </p>
        </div>
      </div>

      {/* Our Editorial Standards & Verification Methodology */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Database className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>Our Editorial Standards & Data Verification Methodology</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Every fee schedule, statutory deadline, form number, and late penalty formula on our platform is sourced directly from codified state legal authorities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">Codified State Statutes</strong>
              <span className="text-xs text-zinc-500">Directly mapped to statutory citations (e.g., Cal. Rev. & Tax Code § 17941, 6 Del. C. § 18-1107, Fla. Stat. § 605.0213).</span>
            </div>
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">Annual Legislative Tracking</strong>
              <span className="text-xs text-zinc-500">Regular audits for newly enacted state bills, fee threshold adjustments (such as Texas SB 3's $2.47M threshold), and form updates.</span>
            </div>
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">Deterministic Mathematical Models</strong>
              <span className="text-xs text-zinc-500">Exact formulas for tiered gross receipts surcharges, asset taxes, and interest accrual rates rather than rough estimates.</span>
            </div>
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">Official Filing Portals Only</strong>
              <span className="text-xs text-zinc-500">Direct government links to state revenue departments and Secretaries of State so users file directly without middleman markups.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Lock className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>Commitment to Zero-PII Privacy</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Unlike online tax software that captures your revenue numbers, entity names, and personal identity to sell as commercial leads, LLCTaxCheck.com computes all data entirely client-side inside your browser. No financial data ever leaves your device.
        </p>
      </div>

      {/* Explore Tools CTA */}
      <div className="p-6 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-base">Explore the 50-State Statutory Matrix</h3>
          <p className="text-xs text-zinc-300 dark:text-zinc-600 mt-0.5">
            Inspect all 51 US jurisdictions with exact forms, frequencies, and penalty structures.
          </p>
        </div>
        <button
          onClick={() => navigate('/matrix')}
          className="px-4 py-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>View Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
