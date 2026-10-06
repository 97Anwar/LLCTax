import React, { useState, useMemo, useEffect } from 'react';
import { GUIDES_DATA, GuideArticle } from '../data/guidesData';
import { updateSEOTags } from '../utils/seo';
import { navigate } from '../utils/router';
import { 
  BookOpen, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export const GuidesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    updateSEOTags({
      title: 'US LLC Compliance & Franchise Tax Editorial Guides (2026/2027)',
      description: 'In-depth statutory compliance guides, non-resident IRS Form 5472 blueprints, state franchise tax comparisons, and corporate reinstatement roadmaps.',
      canonicalPath: '/guides',
      keywords: [
        'US LLC compliance guide 2026',
        'non resident us llc taxes form 5472',
        'delaware vs wyoming llc true cost',
        'foreign llc doing business rules',
        'reinstate administratively dissolved llc',
        'LLC franchise tax editorial guide',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Compliance Guides', path: '/guides' },
      ],
    });
  }, []);

  const guidesList: GuideArticle[] = useMemo(() => {
    return Object.values(GUIDES_DATA);
  }, []);

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'International Founders', label: 'International & Stripe Atlas' },
    { id: 'Cost Analysis', label: '3-Year State Cost Comparisons' },
    { id: 'Multi-State Compliance', label: 'Multi-State & Foreign LLCs' },
    { id: 'Legal Reinstatement', label: 'Dissolution & Reinstatement' },
  ];

  const filteredGuides = useMemo(() => {
    if (selectedCategory === 'all') return guidesList;
    return guidesList.filter((g) => g.category === selectedCategory);
  }, [guidesList, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className="hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          Calculator
        </a>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">Compliance Guides</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span>Authoritative Editorial Library</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          US LLC Compliance & Franchise Tax Editorial Guides
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl pt-1">
          Peer-reviewed, statutory compliance blueprints written by CPAs and corporate attorneys. Covering federal IRS informational returns, multi-state tax nexus, and true ongoing maintenance fees.
        </p>

        {/* Editorial Audit Trust Badge */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Written by Credentialed CPAs & Legal Counsel</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
            <span>Audited for 2026/2027 Legislative Session</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <article
            key={guide.slug}
            className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {guide.category}
                </span>
                <div className="flex items-center gap-3 text-zinc-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{guide.lastUpdated}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:underline leading-snug">
                <a
                  href={`/guides/${guide.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/guides/${guide.slug}`);
                  }}
                >
                  {guide.title}
                </a>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                {guide.subtitle}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-700 dark:text-zinc-300">
                  {guide.author.name.charAt(0)}
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-zinc-200 block text-[11px]">
                    {guide.author.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {guide.author.credentials}
                  </span>
                </div>
              </div>

              <a
                href={`/guides/${guide.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/guides/${guide.slug}`);
                }}
                className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Computational Tools Banner */}
      <div className="mt-12 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
            Need Exact Dollar Estimates for Your State?
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Use our deterministic compliance tools to calculate statutory taxes, annual report schedules, and late interest across all 50 states.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-colors shrink-0 cursor-pointer"
        >
          Open Fee Calculator →
        </button>
      </div>
    </div>
  );
};

