import React from 'react';
import { ActiveTab } from '../types';
import { navigate, getStateUrl } from '../utils/router';
import { Lock, ShieldCheck, Mail, FileText, Scale, Info } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectState?: (stateId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectState }) => {
  const handleNav = (tab: ActiveTab, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  const handleStateNav = (stateId: string) => {
    onSelectState?.(stateId);
    navigate(getStateUrl(stateId));
  };

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 mt-16 pt-12 pb-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm tracking-tight">
                LLCTaxCheck.com
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                v2026.4
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-xs">
              Independent computational reference engine for US LLC annual filing fees, state franchise taxes, gross receipts surcharges, and delinquency penalties.
            </p>
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-medium pt-1">
              <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Zero PII Transmitted • 100% Client-Side Computation</span>
            </div>
          </div>

          {/* Column 2: Compliance Tools */}
          <div className="space-y-2.5">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200 text-xs uppercase tracking-wider block">
              Calculators & Tools
            </span>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); handleNav('calculator', '/'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Interactive Fee Calculator
                </a>
              </li>
              <li>
                <a
                  href="/states"
                  onClick={(e) => { e.preventDefault(); handleNav('states', '/states'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  50-State Directory
                </a>
              </li>
              <li>
                <a
                  href="/compare"
                  onClick={(e) => { e.preventDefault(); handleNav('comparison', '/compare'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Cross-State Benchmark
                </a>
              </li>
              <li>
                <a
                  href="/matrix"
                  onClick={(e) => { e.preventDefault(); handleNav('matrix', '/matrix'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Statutory Rules Matrix
                </a>
              </li>
              <li>
                <a
                  href="/deadlines"
                  onClick={(e) => { e.preventDefault(); handleNav('deadlines', '/deadlines'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Filing Deadlines Radar
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Editorial Guides */}
          <div className="space-y-2.5">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200 text-xs uppercase tracking-wider block">
              Editorial Guides
            </span>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/guides"
                  onClick={(e) => { e.preventDefault(); handleNav('guides', '/guides'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors font-medium text-zinc-800 dark:text-zinc-200"
                >
                  All Compliance Guides
                </a>
              </li>
              <li>
                <a
                  href="/guides/non-resident-us-llc-tax-guide"
                  onClick={(e) => { e.preventDefault(); navigate('/guides/non-resident-us-llc-tax-guide'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Non-Resident Form 5472
                </a>
              </li>
              <li>
                <a
                  href="/guides/delaware-vs-wyoming-vs-florida"
                  onClick={(e) => { e.preventDefault(); navigate('/guides/delaware-vs-wyoming-vs-florida'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  DE vs WY vs FL True Costs
                </a>
              </li>
              <li>
                <a
                  href="/guides/foreign-llc-qualification-rules"
                  onClick={(e) => { e.preventDefault(); navigate('/guides/foreign-llc-qualification-rules'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Foreign LLC Qualification
                </a>
              </li>
              <li>
                <a
                  href="/guides/how-to-reinstate-dissolved-llc"
                  onClick={(e) => { e.preventDefault(); navigate('/guides/how-to-reinstate-dissolved-llc'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Reinstatement & Revocation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Methodology */}
          <div className="space-y-2.5">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200 text-xs uppercase tracking-wider block">
              About & Editorial
            </span>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/about"
                  onClick={(e) => { e.preventDefault(); handleNav('about', '/about'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  About LLCTaxCheck
                </a>
              </li>
              <li>
                <a
                  href="/methodology"
                  onClick={(e) => { e.preventDefault(); handleNav('methodology', '/methodology'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Statutory Sources & Codes
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); handleNav('contact', '/contact'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policy */}
          <div className="space-y-2.5">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200 text-xs uppercase tracking-wider block">
              Legal & Compliance
            </span>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => { e.preventDefault(); handleNav('privacy', '/privacy'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => { e.preventDefault(); handleNav('terms', '/terms'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => { e.preventDefault(); handleNav('disclaimer', '/disclaimer'); }}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  Legal & Tax Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} LLCTaxCheck.com. All rights reserved. Independent educational reference.</p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              onClick={(e) => { e.preventDefault(); handleNav('privacy', '/privacy'); }}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="/terms"
              onClick={(e) => { e.preventDefault(); handleNav('terms', '/terms'); }}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Terms of Service
            </a>
            <span>•</span>
            <a
              href="/disclaimer"
              onClick={(e) => { e.preventDefault(); handleNav('disclaimer', '/disclaimer'); }}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
