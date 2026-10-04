/**
 * High-Performance Search Engine Optimization (SEO) & Schema.org JSON-LD Engine
 * Tailored for Google Search, Bing, and Social Crawlers
 */

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; path: string }>;
  stateMeta?: {
    name: string;
    abbr: string;
    fee: number;
    statutoryCode: string;
    agency: string;
  };
}

export function updateSEOTags(config: SEOConfig | string, description?: string, canonicalPath?: string) {
  let title = '';
  let desc = '';
  let path = '';
  let keywords: string[] = [];
  let faqs: Array<{ question: string; answer: string }> | undefined;
  let breadcrumbs: Array<{ name: string; path: string }> | undefined;

  if (typeof config === 'string') {
    title = config;
    desc = description || '';
    path = canonicalPath || '/';
  } else {
    title = config.title;
    desc = config.description;
    path = config.canonicalPath;
    keywords = config.keywords || [];
    faqs = config.faqs;
    breadcrumbs = config.breadcrumbs;
  }

  // 1. Title
  document.title = title;

  // 2. Meta Description
  setMetaTag('name', 'description', desc);

  // 3. Meta Keywords
  if (keywords.length > 0) {
    setMetaTag('name', 'keywords', keywords.join(', '));
  }

  // 4. Robots Directives (Allow all, maximize snippet and image previews for Google SERP)
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // 5. OpenGraph Tags
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', desc);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:site_name', 'LLC TaxCheck');
  setMetaTag('property', 'og:locale', 'en_US');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://llctaxcheck.com';
  const fullCanonicalUrl = `${origin}${path.startsWith('/') ? path : `/${path}`}`;
  setMetaTag('property', 'og:url', fullCanonicalUrl);

  // 6. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', desc);

  // 7. Canonical URL Link Tag
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullCanonicalUrl);

  // 8. Inject Structured Data (JSON-LD)
  injectStructuredData(fullCanonicalUrl, title, desc, faqs, breadcrumbs);
}

function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Injects Google-compliant Schema.org JSON-LD structured data:
 * - WebApplication
 * - FAQPage (for rich snippet accordion in SERP)
 * - BreadcrumbList (for hierarchical navigation in SERP)
 */
function injectStructuredData(
  url: string,
  title: string,
  description: string,
  faqs?: Array<{ question: string; answer: string }>,
  breadcrumbs?: Array<{ name: string; path: string }>
) {
  const schemaId = 'llc-taxcheck-jsonld';
  let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = schemaId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'LLC TaxCheck',
      url,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description,
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      creator: {
        '@type': 'Organization',
        name: 'LLC TaxCheck Compliance Initiative',
      },
    },
  ];

  // Add FAQPage Schema if FAQs exist (Critical for SERP rich answers)
  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // Add BreadcrumbList Schema if breadcrumbs exist
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((bc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: bc.name,
        item: `${window.location.origin}${bc.path}`,
      })),
    });
  }

  scriptEl.textContent = JSON.stringify(schemas);
}

export function getStateSEOMeta(
  stateName: string,
  stateAbbr: string,
  dueSchedule: string,
  baseTax: number,
  reportFee: number,
  governingForm?: string,
  statutoryCitation?: string
): SEOConfig {
  const feeLabel = baseTax > 0 ? `$${baseTax} Base Franchise Tax` : `$${reportFee} Annual Filing Fee`;
  const cleanStateId = stateName.toLowerCase().replace(/\s+/g, '_');
  
  const keywords: string[] = [
    `${stateName} LLC annual fee`,
    `${stateName} LLC franchise tax`,
    `${stateName} annual report due date`,
    `${stateName} Secretary of State LLC fee`,
    `${stateName} LLC late filing penalty`,
    `${stateAbbr} LLC tax calculator`,
    `how much is ${stateName} LLC annual report`,
    `Form ${stateAbbr} LLC annual report`,
    `${stateName} LLC ongoing maintenance cost`,
    `${stateName} LLC good standing requirements`,
    `${stateName} annual compliance checklist 2026`,
    `Stripe Atlas ${stateName} LLC taxes`,
    `Foreign LLC doing business in ${stateName}`,
  ];

  if (governingForm) {
    keywords.push(`${governingForm} filing instructions`);
    keywords.push(`${governingForm} deadline`);
  }

  if (statutoryCitation) {
    keywords.push(`${statutoryCitation} LLC compliance`);
  }

  return {
    title: `${stateName} LLC Franchise Tax & Annual Report Fee 2026/2027 (${stateAbbr})`,
    description: `Calculate ${stateName} LLC annual fees, statutory ${feeLabel}, Secretary of State report deadlines (${dueSchedule}), and late penalties. Official 2026/2027 compliance guide.`,
    canonicalPath: `/states/${cleanStateId}`,
    keywords,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: '50-State Directory', path: '/states' },
      { name: `${stateName} LLC`, path: `/states/${cleanStateId}` },
    ],
  };
}
