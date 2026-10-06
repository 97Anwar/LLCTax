# LLC TaxCheck — 50-State Statutory LLC Franchise Tax & Annual Compliance Calculator

An authoritative, client-side 50-state LLC annual franchise tax and periodic reporting calculator, pre-rendered with static HTML (SSG) for high-performance SEO and Google AdSense readiness.

## 🚀 Key Features

- **51-Jurisdiction Statutory Accuracy**: Full coverage for all 50 US states plus Washington D.C., updated with current laws (including Delaware HB 400 $400 flat franchise tax, Pennsylvania Act 122 $7 annual report, California FTB 3522 $800 minimum franchise tax + fee schedule, Florida $138.75 report fee + $400 penalty, and Texas $2.47M revenue threshold).
- **Interactive Multi-Tier Simulator**: Calculates mandatory Secretary of State base legal fees, gross receipts surcharges, pass-through net profits, and compounding penalty interest.
- **Static Pre-Rendering (SSG)**: 67 fully compiled static HTML routes in `dist/` allowing search engines (Googlebot, Bingbot) and Google AdSense verification crawlers (`Mediapartners-Google`) to index rich content without executing JavaScript.
- **AdSense & SEO Optimized**:
  - Valid `WebApplication`, `FAQPage`, `BreadcrumbList`, and `Article` Schema.org JSON-LD structured data.
  - CLS-proof ad containers with pre-allocated bounding boxes (`AdSlot.tsx`).
  - Standard `ads.txt` and crawler-configured `robots.txt`.
  - Comprehensive privacy and legal policy pages with GDPR/CCPA cookie consent banner.
- **Editorial Cornerstone Guides**: In-depth, long-form guides authored by credentialed legal and accounting contributors (CPA / J.D.).
- **Client-Side Privacy**: 100% deterministic calculation performed locally in the user's browser—no personally identifiable information (PII) or financial records are sent to external servers.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons & Animation**: Lucide React + Motion
- **Build Tool**: Vite 6
- **Static Pre-rendering**: Custom SSG compilation pipeline (`scripts/prerender.ts`)
- **Reporting**: jsPDF client-side compliance certificate generation

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node.js 20)
- npm or bun

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Runs the application locally at `http://localhost:3000`.

### Production Build & Static Pre-rendering

```bash
npm run build
```

This command runs `vite build` and executes `scripts/prerender.ts` to generate all 67 static HTML routes into the `dist/` folder.

### Run Compliance Verification Suite

```bash
npm run test:compliance
```

Executes the native TypeScript verification suite (`tests/verify-compliance.ts`), validating statutory figures across all 51 states, cornerstone guide integrity, pre-rendered HTML validity, and sitemap completeness.

### Type Check

```bash
npm run lint
```

---

## 🌐 Production Deployment

The project builds entirely to the `dist/` directory. You can deploy it directly to any static hosting provider:

- **Cloudflare Pages**: Point build command to `npm run build` and output directory to `dist`.
- **Vercel**: Framework preset `Vite`, output directory `dist`.
- **Netlify**: Build command `npm run build`, publish directory `dist`.
- **Nginx / Apache**: Host the static contents of `dist/` directly.

---

## 📜 Google AdSense Setup

1. Once your AdSense account is approved, update [public/ads.txt](public/ads.txt) with your Publisher ID:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
2. Re-run `npm run build` and deploy the changes.

---

## ⚖️ License

MIT License. See [LICENSE](LICENSE) for details.
