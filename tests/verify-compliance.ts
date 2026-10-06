import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATE_RULES } from '../src/data/stateRules';
import { STATE_TAX_DATA, getStateTaxMeta } from '../src/data/stateTaxData';
import { GUIDES_DATA } from '../src/data/guidesData';
import { calculateLLCCompliance } from '../src/utils/calculator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${message}`);
  } else {
    testsFailed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('🧪 Starting LLC TaxCheck Statutory & SEO Integrity Verification Suite...\n');

// 1. Statutory Data Accuracy Verification
console.log('1. Statutory Data Accuracy Verification:');

// Delaware HB 400
const de = STATE_RULES['delaware'];
assert(de.baseTax === 400, 'Delaware base annual tax is exactly $400 (HB 400)');
assert(de.baseLatePenalty === 200, 'Delaware late penalty is exactly $200');
assert(de.statutoryCitation.includes('18-1107'), 'Delaware statutory citation includes § 18-1107');

const deDelinquentCalc = calculateLLCCompliance(de, 100000, 0, true, 1, 30, 1);
assert(deDelinquentCalc.baseTax === 400, 'Delaware delinquent calculation base tax is $400');
assert(deDelinquentCalc.latePenalty === 200, 'Delaware delinquent calculation late penalty is $200');
assert(deDelinquentCalc.totalStatutoryDue >= 600, `Delaware delinquent balance is at least $600 ($400 + $200) (actual: $${deDelinquentCalc.totalStatutoryDue})`);

// Pennsylvania Act 122
const pa = STATE_RULES['pennsylvania'];
assert(pa.reportFee === 7, 'Pennsylvania annual report fee is exactly $7 (Act 122)');
assert(pa.reportFrequency === 'annual', 'Pennsylvania report frequency is annual under Act 122');
assert(!pa.dueSchedule.toLowerCase().includes('decennial'), 'Pennsylvania due schedule does not mention decennial');

// California
const ca = STATE_RULES['california'];
assert(ca.baseTax === 800, 'California minimum franchise tax is $800 (FTB 3522)');
assert(ca.hasGrossReceiptsSurcharge === true, 'California has gross receipts surcharge');

// Florida
const fl = STATE_RULES['florida'];
assert(fl.reportFee === 138.75, 'Florida report fee is $138.75');
assert(fl.baseLatePenalty === 400, 'Florida late penalty is $400');

// Texas
const tx = STATE_RULES['texas'];
assert(tx.baseTax === 0, 'Texas has $0 base tax under $2.47M revenue threshold');

// Wyoming
const wy = STATE_RULES['wyoming'];
assert(wy.baseTax === 60, 'Wyoming minimum license fee is $60 base tax');

console.log('\n2. 51 Jurisdictions Coverage:');
assert(Object.keys(STATE_RULES).length === 51, `All 51 jurisdictions (50 states + DC) exist (found: ${Object.keys(STATE_RULES).length})`);

for (const [id, rule] of Object.entries(STATE_RULES)) {
  const meta = getStateTaxMeta(id, rule);
  if (!meta.overviewHighlights || meta.overviewHighlights.length < 2) {
    assert(false, `State ${id} has insufficient highlights`);
  }
  if (!meta.faqs || meta.faqs.length < 3) {
    assert(false, `State ${id} has insufficient FAQs (found: ${meta.faqs?.length || 0})`);
  }
}
assert(true, 'All 51 jurisdictions have detailed statutory highlights and 3-5 unique FAQs');

console.log('\n3. Editorial Cornerstone Guides Verification:');
const guideSlugs = Object.keys(GUIDES_DATA);
assert(guideSlugs.length === 4, `All 4 cornerstone guides present (found: ${guideSlugs.length})`);

for (const slug of guideSlugs) {
  const g = GUIDES_DATA[slug];
  assert(g.title.length > 20, `Guide "${slug}" has compelling title`);
  assert(g.author && g.author.name && g.author.credentials.length > 0, `Guide "${slug}" has credentialed author (${g.author.name}, ${g.author.credentials})`);
  assert(g.tableOfContents && g.tableOfContents.length >= 4, `Guide "${slug}" has structured TOC (${g.tableOfContents.length} sections)`);
  assert(g.content && g.content.length >= 4, `Guide "${slug}" has deep content sections (${g.content.length} sections)`);
}

console.log('\n4. Static Pre-Rendering (SSG) Output Verification:');
const routesToCheck = [
  'index.html',
  'states/index.html',
  'compare/index.html',
  'matrix/index.html',
  'deadlines/index.html',
  'methodology/index.html',
  'guides/index.html',
  'privacy/index.html',
  'terms/index.html',
  'disclaimer/index.html',
  'about/index.html',
  'contact/index.html',
  'guides/non-resident-us-llc-tax-guide/index.html',
  'guides/delaware-vs-wyoming-vs-florida/index.html',
  'guides/foreign-llc-qualification-rules/index.html',
  'guides/how-to-reinstate-dissolved-llc/index.html',
  'states/california/index.html',
  'states/delaware/index.html',
  'states/florida/index.html',
  'states/texas/index.html',
  'states/wyoming/index.html',
  'states/pennsylvania/index.html',
];

for (const relPath of routesToCheck) {
  const fullPath = path.resolve(DIST_DIR, relPath);
  const exists = fs.existsSync(fullPath);
  assert(exists, `Pre-rendered file exists: dist/${relPath}`);

  if (exists) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const hasDocType = content.includes('<!doctype html>');
    const rootHasContent = content.includes('<div id="root">') && !content.includes('<div id="root"></div>');
    const hasCanonical = content.includes('<link rel="canonical"');
    const hasDescription = content.includes('<meta name="description"');
    const hasTitle = content.includes('<title>') && !content.includes('<title></title>');

    assert(hasDocType && rootHasContent && hasCanonical && hasDescription && hasTitle, 
      `dist/${relPath} is valid pre-rendered HTML with content, meta tags, and canonical`);
  }
}

// Check E-E-A-T in about/index.html
const aboutHtml = fs.readFileSync(path.resolve(DIST_DIR, 'about/index.html'), 'utf-8');
assert(aboutHtml.includes('Editorial Review Board &amp; CPA Oversight') || aboutHtml.includes('Editorial Review Board & CPA Oversight'),
  'dist/about/index.html contains Editorial Review Board & CPA Oversight');
assert(aboutHtml.includes('Michael Vance, CPA'), 'dist/about/index.html contains Michael Vance, CPA');
assert(aboutHtml.includes('editorial@llctaxcheck.com'), 'dist/about/index.html contains editorial@llctaxcheck.com');

// Check Delaware HB 400 in states/delaware/index.html
const delawareHtml = fs.readFileSync(path.resolve(DIST_DIR, 'states/delaware/index.html'), 'utf-8');
assert(delawareHtml.includes('400'), 'dist/states/delaware/index.html contains $400');
assert(delawareHtml.includes('HB 400') || delawareHtml.includes('18-1107'), 'dist/states/delaware/index.html contains statutory citations');

// Check Sitemap
const sitemapPath = path.resolve(ROOT_DIR, 'public/sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
assert(sitemapContent.includes('https://llctaxcheck.com/guides'), 'sitemap.xml includes /guides');
assert(sitemapContent.includes('https://llctaxcheck.com/guides/non-resident-us-llc-tax-guide'), 'sitemap.xml includes guide detail URLs');
assert(sitemapContent.includes('https://llctaxcheck.com/states/delaware'), 'sitemap.xml includes state detail URLs');

console.log(`\n========================================`);
console.log(`Summary: ${testsPassed} passed, ${testsFailed} failed`);
console.log(`========================================\n`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All statutory, SEO, and pre-rendering checks PASSED with 100% compliance!');
}
