import React, { useEffect, useState } from 'react';
import { GUIDES_DATA, GuideArticle } from '../data/guidesData';
import { updateSEOTags } from '../utils/seo';
import { navigate } from '../utils/router';
import { AdSlot } from './AdSlot';
import { 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  Share2, 
  Check, 
  BookOpen 
} from 'lucide-react';

interface GuideDetailPageProps {
  slug: string;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug }) => {
  const guide: GuideArticle = GUIDES_DATA[slug] || GUIDES_DATA['non-resident-us-llc-tax-guide'];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    updateSEOTags({
      title: `${guide.title} (2026/2027)`,
      description: guide.summary,
      canonicalPath: `/guides/${guide.slug}`,
      keywords: [
        guide.title,
        'US LLC compliance guide',
        'state franchise tax regulations',
        'statutory business requirements 2026',
        guide.category,
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Compliance Guides', path: '/guides' },
        { name: guide.title, path: `/guides/${guide.slug}` },
      ],
    });
  }, [guide]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-20">
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
        <a 
          href="/guides" 
          onClick={(e) => { e.preventDefault(); navigate('/guides'); }}
          className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          Compliance Guides
        </a>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-xs">
          {guide.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-mono font-semibold px-2.5 py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-zinc-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{guide.readTime}</span>
          </span>
          <span className="flex items-center gap-1 text-zinc-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated {guide.lastUpdated}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          {guide.subtitle}
        </p>

        {/* Author Byline & E-E-A-T Credentials */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              {guide.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {guide.author.name}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {guide.author.role} • <span className="font-mono">{guide.author.credentials}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Table of Contents Box */}
      {guide.tableOfContents && guide.tableOfContents.length > 0 && (
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-300">
            Statutory Overview & Table of Contents
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {guide.tableOfContents.map((toc) => (
              <li key={toc.id}>
                <a
                  href={`#${toc.id}`}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-zinc-400">§</span>
                  <span className="truncate">{toc.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Main Editorial Article Content */}
      <div className="space-y-10 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        {guide.content.map((sec, idx) => (
          <section key={sec.id} id={sec.id} className="space-y-4 scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
              {sec.heading}
            </h2>

            <p className="leading-relaxed">
              {sec.body}
            </p>

            {/* Optional Callout Box */}
            {sec.callout && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-1.5 my-4 ${
                  sec.callout.type === 'warning'
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/40 text-rose-900 dark:text-rose-200'
                    : sec.callout.type === 'statute'
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
                    : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                }`}
              >
                <div className="font-semibold flex items-center gap-1.5">
                  {sec.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                  {sec.callout.type === 'statute' && <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                  {sec.callout.type === 'tip' && <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  <span>{sec.callout.title}</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">{sec.callout.text}</p>
              </div>
            )}

            {/* Optional Subsections */}
            {sec.subsections && sec.subsections.length > 0 && (
              <div className="space-y-4 pt-2">
                {sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
                      {sub.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {sub.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* In-Article Ad Placement Slot (after section 2) */}
            {idx === 2 && (
              <AdSlot
                slotId="guide-in-article"
                className="my-8"
                label="Sponsored Compliance Resource"
              />
            )}
          </section>
        ))}
      </div>

      {/* Contextual Computational CTA */}
      <div className="mt-12 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
        <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
          Verify State Statutory Fees & Filing Deadlines
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Use our deterministic compliance tools to simulate state franchise taxes, periodic SOS report fees, and delinquency interest across all 50 US jurisdictions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-center font-medium block"
          >
            Interactive Calculator →
          </a>
          <a
            href="/states"
            onClick={(e) => { e.preventDefault(); navigate('/states'); }}
            className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-center font-medium block"
          >
            50-State Statutory Hub →
          </a>
          <a
            href="/compare"
            onClick={(e) => { e.preventDefault(); navigate('/compare'); }}
            className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-center font-medium block"
          >
            Side-by-Side Cost Tool →
          </a>
        </div>
      </div>
    </article>
  );
};
