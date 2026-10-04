import React, { useState, useEffect } from 'react';
import { navigate } from '../utils/router';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('llc_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('llc_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('llc_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside 
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xl text-xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
          <ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
          <span>Privacy & Cookie Preferences</span>
        </div>
        <button
          onClick={handleDecline}
          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer p-0.5"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
        LLCTaxCheck.com computes all calculations locally in your browser (Zero PII). We and our advertising partners (such as Google) use cookies to understand site traffic and deliver relevant experiences. Review our{' '}
        <a
          href="/privacy"
          onClick={(e) => {
            e.preventDefault();
            navigate('/privacy');
          }}
          className="underline text-zinc-900 dark:text-zinc-100 font-medium"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="/terms"
          onClick={(e) => {
            e.preventDefault();
            navigate('/terms');
          }}
          className="underline text-zinc-900 dark:text-zinc-100 font-medium"
        >
          Terms
        </a>.
      </p>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          onClick={handleDecline}
          className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium transition-colors cursor-pointer"
        >
          Essential Only
        </button>
        <button
          onClick={handleAccept}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-[11px] font-medium transition-colors cursor-pointer"
        >
          Accept All
        </button>
      </div>
    </aside>
  );
};
