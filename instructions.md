# LLC TaxCheck — Testing & Quality Assurance Guide

This document provides step-by-step instructions for running the automated test suite, verifying PDF text wrapping and layout boundaries, running end-to-end user journeys, and building the application locally.

---

## 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: Version `18.0.0` or higher (Node 20+ recommended). Check with:
  ```bash
  node -v
  ```
- **npm**: Version `9.0.0` or higher. Check with:
  ```bash
  npm -v
  ```

---

## 2. Initial Setup

1. **Clone or extract the repository**:
   ```bash
   cd ustax
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browser binaries**:
   ```bash
   npx playwright install chromium
   ```
   *(On Linux distributions, if prompted for system libraries, you can run: `npx playwright install --with-deps chromium`)*

---

## 3. Running the Test Suite

We provide pre-configured npm scripts in `package.json` for all testing workflows:

### A. Run All Tests
Runs the entire Playwright test suite (PDF text wrapping + End-to-End journeys):
```bash
npm test
```
*Equivalent command:*
```bash
npx playwright test
```

---

### B. Run Only the PDF Text Wrapping & Export Tests
Validates that statutory text (Governing Form, Governing Body, Legal Authority, Filing Schedule, and Compliance Notes) properly wraps and **never overflows** the PDF page margins across all 51 US states and jurisdictions:
```bash
npm run test:pdf
```
*Equivalent command:*
```bash
npx playwright test tests/pdf-export.spec.ts
```

---

### C. Run Only the End-to-End (E2E) App Tests
Validates calculator reactive calculations (CA, DE, FL, TX, WY), delinquency penalties, navigation to all 50 states, detail pages, comparison matrix, deadlines calendar, dark mode toggle, and mobile menu:
```bash
npm run test:e2e
```
*Equivalent command:*
```bash
npx playwright test tests/e2e.spec.ts
```

---

### D. Interactive UI Mode (Visual Test Runner)
Opens Playwright's interactive web interface where you can watch tests run step-by-step, inspect DOM snapshots, view time-travel traces, and debug:
```bash
npm run test:ui
```
*Equivalent command:*
```bash
npx playwright test --ui
```

---

### E. Headed Mode (Watch Browser Windows)
Runs the tests with a visible Chromium browser window:
```bash
npx playwright test --headed
```

---

### F. Debug Mode (Step-by-Step Inspector)
Pauses execution before each step and allows stepping through test assertions:
```bash
npx playwright test --debug
```

---

### G. View Test Reports
After running tests, generate and view a rich HTML report:
```bash
npx playwright show-report
```

---

## 4. Code Quality & Build Checks

Before committing or pushing changes to GitHub, run the static analysis and production build checks:

### 1. TypeScript Linter Check
Validates type safety, interfaces, and detects syntax errors without emitting files:
```bash
npm run lint
```

### 2. Production Vite Build
Verifies that all assets, Tailwind styles, and code bundles build cleanly:
```bash
npm run build
```

---

## 5. Running the Local Development Server

To launch the app locally in VS Code or your terminal:

```bash
npm run dev
```

Then open your browser to:
```text
http://localhost:3000
```

---

## 6. What the Tests Cover

| Test Suite | Spec File | Key Coverage |
| :--- | :--- | :--- |
| **PDF Text Wrapping** | `tests/pdf-export.spec.ts` | Multi-line text splitting for `Governing Form` across all 51 states (e.g., California FTB 3522/3536/LLC-12, Nevada SilverFlume, New York IT-204-LL, Rhode Island, Tennessee). Verifies 100% strict 1-page compliance under 275mm height with zero text overflow. |
| **State Calculations** | `tests/e2e.spec.ts` | Base tax, gross receipts surcharge brackets ($250k - $5M+), report fees, delinquency interest rates, and multi-member entity calculations. |
| **Directory & Details** | `tests/e2e.spec.ts` | Real-time state search, filter, state detail pages (`/states/:id`), official statutory citations, and state-specific FAQs. |
| **Comparison & Deadlines** | `tests/e2e.spec.ts` | Full statutory comparison table (`/compare`) and calendar breakdown (`/deadlines`). |
| **Legal & Theme** | `tests/e2e.spec.ts` | CPA methodology disclosure (`/methodology`), Terms of Service, Privacy Policy, Dark/Light mode theme switching, and responsive mobile navigation. |

---

## 7. Troubleshooting

- **Error: `Port 3000 is already in use`**:
  Playwright automatically attaches to an existing dev server on port 3000. If an old process is lingering, kill it with:
  ```bash
  kill -9 $(lsof -t -i:3000)
  ```
- **Error: `Executable doesn't exist at /root/.cache/ms-playwright/...`**:
  Run `npx playwright install chromium` to fetch the browser binary.
- **CI / GitHub Actions**:
  When configuring GitHub Actions, run:
  ```yaml
  - name: Install dependencies
    run: npm ci
  - name: Install Playwright Browsers
    run: npx playwright install --with-deps chromium
  - name: Run Playwright tests
    run: npm test
  ```
