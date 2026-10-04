import React, { useEffect } from 'react';
import { updateSEOTags } from '../utils/seo';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  useEffect(() => {
    updateSEOTags({
      title: 'Privacy Policy — LLCTaxCheck.com',
      description: 'Privacy Policy for LLCTaxCheck.com. Explains our client-side zero-PII computational architecture, cookie usage, Google AdSense disclosures, and data rights under GDPR and CCPA.',
      canonicalPath: '/privacy',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span>Legal & Privacy Compliance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Effective Date: January 1, 2026 • Last Updated: October 2026
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
          At <strong>LLCTaxCheck.com</strong> ("we", "our", or "us"), we believe financial calculations should be strictly confidential. This Privacy Policy discloses our privacy practices and explains how information is handled when you visit our website at <code>https://llctaxcheck.com</code>.
        </p>
      </div>

      {/* Core Highlight: Zero-PII Processing */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Lock className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>1. Zero-PII Client-Side Computational Architecture</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            When you use our statutory calculators to simulate gross revenues, in-state assets, profit margins, member counts, or delinquency timelines, <strong>all calculations are executed locally inside your web browser via JavaScript</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>We do <strong>not</strong> transmit your revenue, asset values, or business numbers to our servers.</li>
            <li>We do <strong>not</strong> store your calculations in any remote database.</li>
            <li>We do <strong>not</strong> require you to register, provide your email, or create an account to use any of our 50-state tax calculators.</li>
            <li>Your calculations exist only in your device's memory for the duration of your browser session.</li>
          </ul>
        </div>
      </div>

      {/* Analytics & Server Logs */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Eye className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>2. Information Automatically Collected</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Like virtually all online services, our hosting infrastructure may collect standard, non-personally identifiable server log data transmitted by your browser:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Internet Protocol (IP) address (anonymized/truncated where required by law)</li>
            <li>Browser type and operating system version</li>
            <li>Referring website and search queries that directed you to our site</li>
            <li>Date, time, and duration of visits to particular state compliance pages</li>
          </ul>
          <p>
            This information is used strictly to diagnose technical issues, optimize site performance across devices, prevent denial-of-service abuse, and maintain site security.
          </p>
        </div>
      </div>

      {/* Cookies & Third-Party Advertising / Google AdSense Disclosure */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          <span>3. Cookies & Advertising (Google AdSense Disclosures)</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Cookies are small text files placed on your device to ensure proper functionality and support sustainable free access to our tools:
          </p>
          <p>
            <strong>First-Party Functional Cookies:</strong> We store minimal functional preferences in local storage (such as your chosen Light/Dark UI theme and dismissal of the cookie banner). These contain zero personal data.
          </p>
          <p>
            <strong>Third-Party Vendors & Google AdSense:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the internet.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 underline">Google Ads Settings</a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 underline">www.aboutads.info</a>.
            </li>
          </ul>
        </div>
      </div>

      {/* Privacy Rights: GDPR & CCPA */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          4. Rights Under GDPR & CCPA / CPRA
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Depending on your jurisdiction (such as the European Economic Area, United Kingdom, or California), you hold statutory privacy rights:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Right to Know / Access:</strong> The right to request disclosure of personal data collected.</li>
            <li><strong>Right to Deletion:</strong> The right to request erasure of your data.</li>
            <li><strong>Right to Non-Discrimination:</strong> We will never discriminate against you for exercising your privacy rights.</li>
            <li><strong>We Do Not Sell Personal Information:</strong> We do not sell, rent, or trade your personal or financial data to third-party data brokers.</li>
          </ul>
          <p>
            Because we do not collect or store names, emails, or personal identification records during calculator usage, there is generally no stored personal profile to disclose or delete.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          5. Contact Our Privacy Office
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          If you have questions or inquiries regarding this Privacy Policy, our data architecture, or cookie practices, please contact us at:
        </p>
        <div className="text-xs font-mono text-zinc-700 dark:text-zinc-300 pt-1">
          Email: <a href="mailto:privacy@llctaxcheck.com" className="underline text-zinc-900 dark:text-zinc-100">privacy@llctaxcheck.com</a><br />
          Website: <a href="https://llctaxcheck.com" className="underline text-zinc-900 dark:text-zinc-100">https://llctaxcheck.com</a>
        </div>
      </div>
    </div>
  );
};
