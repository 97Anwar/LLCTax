import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { ThemeProvider } from '../src/context/ThemeContext';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { ActiveTab } from '../src/types';
import { STATE_RULES } from '../src/data/stateRules';
import { getStateTaxMeta } from '../src/data/stateTaxData';
import { GUIDES_DATA } from '../src/data/guidesData';
import { getStateSEOMeta } from '../src/utils/seo';

// Components
import { CalculatorView } from '../src/components/CalculatorView';
import { StatesDirectoryView } from '../src/components/StatesDirectoryView';
import { StateComparisonView } from '../src/components/StateComparisonView';
import { ComplianceMatrixView } from '../src/components/ComplianceMatrixView';
import { DeadlinesRadarView } from '../src/components/DeadlinesRadarView';
import { MethodologyView } from '../src/components/MethodologyView';
import { GuidesView } from '../src/components/GuidesView';
import { GuideDetailPage } from '../src/components/GuideDetailPage';
import { PrivacyPolicyView } from '../src/components/PrivacyPolicyView';
import { TermsOfServiceView } from '../src/components/TermsOfServiceView';
import { LegalDisclaimerView } from '../src/components/LegalDisclaimerView';
import { AboutView } from '../src/components/AboutView';
import { ContactView } from '../src/components/ContactView';
import { StateDetailPage } from '../src/components/StateDetailPage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const TEMPLATE_PATH = path.resolve(DIST_DIR, 'index.html');
const BASE_URL = 'https://llctaxcheck.com';

interface RouteDefinition {
  routePath: string;
  activeTab: ActiveTab;
  title: string;
  description: string;
  keywords?: string[];
  component: React.ReactElement;
  faqs?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

function renderFullPage(component: React.ReactElement, activeTab: ActiveTab): string {
  const pageElement = React.createElement(
    ThemeProvider,
    null,
    React.createElement(
      'div',
      { className: 'min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 font-sans transition-colors duration-150' },
      React.createElement(Header, { activeTab, setActiveTab: () => {} }),
      React.createElement(
        'main',
        { className: 'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12' },
        component
      ),
      React.createElement(Footer, { setActiveTab: () => {}, onSelectState: () => {} })
    )
  );

  return ReactDOMServer.renderToStaticMarkup(pageElement);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildJsonLd(route: RouteDefinition): string {
  const canonicalUrl = `${BASE_URL}${route.routePath === '/' ? '' : route.routePath}`;
  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'LLC TaxCheck',
      url: canonicalUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: route.description,
      image: `${BASE_URL}/og-image.png`,
      screenshot: `${BASE_URL}/og-image.png`,
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      creator: {
        '@type': 'Organization',
        name: 'LLC TaxCheck Compliance Initiative',
        url: BASE_URL,
      },
    },
  ];

  if (route.faqs && route.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((bc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: bc.name,
        item: `${BASE_URL}${bc.path}`,
      })),
    });
  }

  return JSON.stringify(schemas, null, 2);
}

async function prerenderAll() {
  console.log('🚀 Starting LLC TaxCheck Static Pre-rendering Engine (SSG)...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Build template not found at ${TEMPLATE_PATH}. Run "vite build" first.`);
    process.exit(1);
  }

  const rawTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // In case TEMPLATE_PATH already contains rendered content from a previous build run,
  // restore a pristine <div id="root"></div> placeholder.
  let cleanTemplate = rawTemplate;
  if (!cleanTemplate.includes('<div id="root"></div>')) {
    const rootStart = cleanTemplate.indexOf('<div id="root">');
    const noscriptIndex = cleanTemplate.indexOf('<noscript>');
    if (rootStart !== -1 && noscriptIndex !== -1) {
      const beforeRoot = cleanTemplate.slice(0, rootStart);
      const afterRoot = cleanTemplate.slice(noscriptIndex);
      cleanTemplate = `${beforeRoot}<div id="root"></div>\n    ${afterRoot}`;
    }
  }

  const [headTemplate, tailTemplate] = cleanTemplate.split('<div id="root"></div>');

  const routes: RouteDefinition[] = [
    // 1. Root Calculator
    {
      routePath: '/',
      activeTab: 'calculator',
      title: 'LLC TaxCheck — 50-State LLC Franchise Tax & Annual Fee Calculator (2026/2027)',
      description: 'Calculate mandatory state LLC annual franchise taxes, Secretary of State report fees, and late penalties across all 50 states for 2026/2027 compliance.',
      component: React.createElement(CalculatorView, {
        selectedStateId: 'california',
        setSelectedStateId: () => {},
        onOpenReport: () => {},
        onNavigateToComparison: () => {},
      }),
      breadcrumbs: [{ name: 'Home', path: '/' }],
    },

    // 2. 50-State Directory
    {
      routePath: '/states',
      activeTab: 'states',
      title: '50-State LLC Annual Fee & Franchise Tax Directory (2026/2027) — LLCTaxCheck.com',
      description: 'Complete statutory directory of LLC annual report fees, franchise taxes, state due dates, and Secretary of State filing portals across all 50 US states.',
      component: React.createElement(StatesDirectoryView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: '50-State Directory', path: '/states' },
      ],
    },

    // 3. Comparison
    {
      routePath: '/compare',
      activeTab: 'comparison',
      title: 'LLC State Cost Comparison & Benchmark 2026/2027 — LLCTaxCheck.com',
      description: 'Compare LLC ongoing maintenance costs, franchise taxes, and gross receipts surcharges side-by-side across all 50 states. See 3-year projected burdens.',
      component: React.createElement(StateComparisonView, {
        onSelectStateForCalculator: () => {},
      }),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Compare States', path: '/compare' },
      ],
    },

    // 4. Matrix
    {
      routePath: '/matrix',
      activeTab: 'matrix',
      title: '50-State LLC Statutory Compliance Matrix 2026/2027 — LLCTaxCheck.com',
      description: 'Comprehensive breakdown of annual report frequencies, governing statutory codes, tax forms, late fee penalties, and official filing portals for all 50 states.',
      component: React.createElement(ComplianceMatrixView, {
        onSelectState: () => {},
      }),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Compliance Matrix', path: '/matrix' },
      ],
    },

    // 5. Deadlines Radar
    {
      routePath: '/deadlines',
      activeTab: 'deadlines',
      title: 'LLC Filing Deadlines Radar & Statutory Calendar 2026/2027 — LLCTaxCheck.com',
      description: 'Track upcoming state LLC annual report deadlines, franchise tax due dates, anniversary-based schedules, and statutory late penalty grace periods.',
      component: React.createElement(DeadlinesRadarView, {
        onSelectState: () => {},
      }),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Filing Deadlines', path: '/deadlines' },
      ],
    },

    // 6. Methodology
    {
      routePath: '/methodology',
      activeTab: 'methodology',
      title: 'Statutory Sources & Verification Methodology — LLCTaxCheck.com',
      description: 'Review our state code citations, legislative audit standards, and zero-PII client-side calculation methodology for LLC compliance data.',
      component: React.createElement(MethodologyView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Methodology', path: '/methodology' },
      ],
    },

    // 7. Guides Hub
    {
      routePath: '/guides',
      activeTab: 'guides',
      title: 'US LLC Compliance & Franchise Tax Editorial Guides (2026/2027)',
      description: 'In-depth statutory compliance guides, non-resident IRS Form 5472 blueprints, state franchise tax comparisons, and corporate reinstatement roadmaps.',
      component: React.createElement(GuidesView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Compliance Guides', path: '/guides' },
      ],
    },

    // 8. Mandatory Trust Pages
    {
      routePath: '/privacy',
      activeTab: 'privacy',
      title: 'Privacy Policy & Zero-PII Guarantee — LLCTaxCheck.com',
      description: 'Our strict client-side data privacy architecture. LLCTaxCheck does not collect, transmit, store, or sell your revenue or business data.',
      component: React.createElement(PrivacyPolicyView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
    {
      routePath: '/terms',
      activeTab: 'terms',
      title: 'Terms of Service — LLCTaxCheck.com',
      description: 'Terms of service and acceptable use agreement for the LLCTaxCheck statutory compliance reference engine.',
      component: React.createElement(TermsOfServiceView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    },
    {
      routePath: '/disclaimer',
      activeTab: 'disclaimer',
      title: 'Legal & Tax Disclaimer — LLCTaxCheck.com',
      description: 'Educational legal notice. LLCTaxCheck provides statutory computational estimates and does not provide legal, CPA, or formal tax advice.',
      component: React.createElement(LegalDisclaimerView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Legal Disclaimer', path: '/disclaimer' },
      ],
    },
    {
      routePath: '/about',
      activeTab: 'about',
      title: 'About Us & Editorial Methodology — LLCTaxCheck.com',
      description: 'Learn about LLCTaxCheck.com, our mission to bring transparent state compliance data to US founders, our statutory verification methodology, and editorial standards.',
      component: React.createElement(AboutView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
      ],
    },
    {
      routePath: '/contact',
      activeTab: 'contact',
      title: 'Contact Us & Statute Support — LLCTaxCheck.com',
      description: 'Contact the editorial desk and research team at LLCTaxCheck.com. Report state statute amendments, submit feedback, or inquire about partnership opportunities.',
      component: React.createElement(ContactView),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact Us', path: '/contact' },
      ],
    },
  ];

  // 9. Editorial Guide Articles
  for (const [slug, guide] of Object.entries(GUIDES_DATA)) {
    routes.push({
      routePath: `/guides/${slug}`,
      activeTab: 'guide-detail',
      title: `${guide.title} (2026/2027)`,
      description: guide.summary,
      component: React.createElement(GuideDetailPage, { slug }),
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Compliance Guides', path: '/guides' },
        { name: guide.title, path: `/guides/${slug}` },
      ],
    });
  }

  // 10. All 51 US State Detail Pages
  for (const [stateId, state] of Object.entries(STATE_RULES)) {
    const seoMeta = getStateSEOMeta(
      state.name,
      state.abbr,
      state.dueSchedule,
      state.baseTax,
      state.reportFee,
      state.governingForm,
      state.statutoryCitation
    );
    const taxMeta = getStateTaxMeta(state.id, state);

    routes.push({
      routePath: `/states/${stateId}`,
      activeTab: 'state-detail',
      title: seoMeta.title,
      description: seoMeta.description,
      component: React.createElement(StateDetailPage, {
        stateId,
        onOpenReport: () => {},
        onSelectState: () => {},
      }),
      faqs: taxMeta.faqs,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: '50-State Directory', path: '/states' },
        { name: `${state.name} LLC`, path: `/states/${stateId}` },
      ],
    });
  }

  console.log(`📋 Found ${routes.length} static routes to compile.`);

  let successCount = 0;

  for (const route of routes) {
    const renderedMarkup = renderFullPage(route.component, route.activeTab);
    const canonicalUrl = `${BASE_URL}${route.routePath === '/' ? '' : route.routePath}`;
    const jsonLdData = buildJsonLd(route);

    // 1. Inject server-rendered root markup
    let html = `${headTemplate}<div id="root">${renderedMarkup}</div>${tailTemplate}`;

    // 2. Replace Title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

    // 3. Replace Meta Description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // 4. Replace Canonical Link
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // 5. Replace OpenGraph & Twitter tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
    );

    // 6. Update JSON-LD Script
    if (html.includes('id="llc-compliance-jsonld"')) {
      html = html.replace(
        /<script id="llc-compliance-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
        `<script id="llc-compliance-jsonld" type="application/ld+json">\n${jsonLdData}\n</script>`
      );
    }

    // Determine destination path
    let outFilePath: string;
    if (route.routePath === '/') {
      outFilePath = path.resolve(DIST_DIR, 'index.html');
    } else {
      const relativeFolder = route.routePath.replace(/^\//, '');
      const outDir = path.resolve(DIST_DIR, relativeFolder);
      fs.mkdirSync(outDir, { recursive: true });
      outFilePath = path.resolve(outDir, 'index.html');
    }

    fs.writeFileSync(outFilePath, html, 'utf-8');
    successCount++;
  }

  console.log(`✅ Successfully compiled ${successCount} production static HTML routes into dist/!`);
  console.log(`🛡️ Mediapartners-Google & Googlebot will now receive full pre-rendered text content.`);
}

prerenderAll().catch((err) => {
  console.error('❌ Pre-rendering failed:', err);
  process.exit(1);
});
