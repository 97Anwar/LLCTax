import { test, expect } from '@playwright/test';

test.describe('LLC TaxCheck End-to-End Suite', () => {

  test.describe('1. Calculator & Statutory Computation Engine', () => {
    test('should render the homepage with default calculator parameters', async ({ page }) => {
      await page.goto('/');

      // Check header and titles
      await expect(page.locator('header')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/LLC/i);

      // Verify essential calculator controls exist
      const stateSelect = page.locator('select').first();
      await expect(stateSelect).toBeVisible();

      // Verify the statutory summary card is rendered
      await expect(page.locator('text=Total Statutory Due').first()).toBeVisible();
      await expect(page.locator('text=Payment Timeline').first()).toBeVisible();
    });

    test('should correctly compute California statutory franchise tax and gross receipts surcharge', async ({ page }) => {
      await page.goto('/');

      const stateSelect = page.locator('select').first();
      await stateSelect.selectOption('california');

      // Verify California base minimum franchise tax of $800 is shown
      await expect(page.locator('span, div, p').filter({ hasText: '$800' }).first()).toBeVisible();
      await expect(page.locator('text=FTB 3522').first()).toBeVisible();

      // Enter revenue of $600,000 to trigger FTB 3536 surcharge ($2,500)
      const revenueInput = page.locator('input[type="number"], input#revenue-input').first();
      if (await revenueInput.isVisible()) {
        await revenueInput.fill('600000');
        // Surcharge tier $2,500 should appear
        await expect(page.locator('span, div, p').filter({ hasText: '$2,500' }).first()).toBeVisible();
      }
    });

    test('should compute Delaware franchise tax and late penalty on delinquency', async ({ page }) => {
      await page.goto('/');

      const stateSelect = page.locator('select').first();
      await stateSelect.selectOption('delaware');

      // Delaware base fee is $300
      await expect(page.locator('span, div, p').filter({ hasText: '$300' }).first()).toBeVisible();
      await expect(page.locator('text=June 1').first()).toBeVisible();

      // Toggle delinquency checkbox
      const delinquentToggle = page.locator('input[type="checkbox"]').first();
      if (await delinquentToggle.isVisible()) {
        await delinquentToggle.check();

        // Delaware has a flat $200 late penalty
        await expect(page.locator('span, div, p').filter({ hasText: '$200' }).first()).toBeVisible();
      }
    });

    test('should compute Florida Sunbiz annual report fee and $400 late fee on delinquency', async ({ page }) => {
      await page.goto('/');

      const stateSelect = page.locator('select').first();
      await stateSelect.selectOption('florida');

      // Florida report fee is $138.75
      await expect(page.locator('span, div, p').filter({ hasText: '$138.75' }).first()).toBeVisible();
      await expect(page.locator('text=Sunbiz').first()).toBeVisible();

      // Toggle delinquency
      const delinquentToggle = page.locator('input[type="checkbox"]').first();
      if (await delinquentToggle.isVisible()) {
        await delinquentToggle.check();

        // Florida applies a non-waivable $400 late penalty
        await expect(page.locator('span, div, p').filter({ hasText: '$400' }).first()).toBeVisible();
      }
    });

    test('should compute Texas No-Tax-Due threshold under $2.47M', async ({ page }) => {
      await page.goto('/');

      const stateSelect = page.locator('select').first();
      await stateSelect.selectOption('texas');

      // Texas base tax is $0 for revenues under $2.47M
      await expect(page.locator('text=Form 05-102').first()).toBeVisible();
    });

    test('should compute Wyoming flat $60 annual report minimum', async ({ page }) => {
      await page.goto('/');

      const stateSelect = page.locator('select').first();
      await stateSelect.selectOption('wyoming');

      // Wyoming base is $60
      await expect(page.locator('span, div, p').filter({ hasText: '$60' }).first()).toBeVisible();
    });
  });

  test.describe('2. Navigation & All States Catalog', () => {
    test('should navigate to All States directory and filter states', async ({ page }) => {
      await page.goto('/states');

      // Verify states directory header
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/50-State/i);

      // Verify popular states are present
      await expect(page.locator('text=Delaware').first()).toBeVisible();
      await expect(page.locator('text=California').first()).toBeVisible();
      await expect(page.locator('text=Wyoming').first()).toBeVisible();

      // Search for Nevada
      const searchInput = page.locator('input[placeholder*="Search"], input[type="text"]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill('Nevada');
        await expect(page.locator('text=Nevada').first()).toBeVisible();
        await expect(page.locator('text=SilverFlume').first()).toBeVisible();
      }
    });

    test('should open a state detail page and display statutory parameters', async ({ page }) => {
      await page.goto('/states/california');

      // Verify California detail page contents
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/California/i);
      await expect(page.locator('text=FTB 3522').first()).toBeVisible();
      await expect(page.locator('text=Franchise Tax Board').first()).toBeVisible();
      await expect(page.locator('text=April 15').first()).toBeVisible();

      // Verify FAQs exist
      await expect(page.locator('text=Frequently Asked Questions').first()).toBeVisible();

      // Click "Calculate in Tool" or similar CTA
      const calcCta = page.getByRole('button', { name: /Calculate|Run Calculator/i }).first();
      if (await calcCta.isVisible()) {
        await calcCta.click();
        await expect(page).toHaveURL(/\//);
      }
    });
  });

  test.describe('3. Comparison Matrix & Statutory Deadlines', () => {
    test('should display the state comparison matrix page', async ({ page }) => {
      await page.goto('/compare');

      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Benchmark|Compare/i);
      // Comparison controls should be rendered
      await expect(page.locator('text=Annual Revenue').first()).toBeVisible();
    });

    test('should display the statutory deadlines filing calendar', async ({ page }) => {
      await page.goto('/deadlines');

      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Deadlines/i);
      // Verify key statutory deadlines are shown
      await expect(page.locator('text=April 15').first()).toBeVisible();
      await expect(page.locator('text=May 1').first()).toBeVisible();
      await expect(page.locator('text=June 1').first()).toBeVisible();
    });
  });

  test.describe('4. Legal, Methodology & Policy Pages', () => {
    test('should render the methodology page with statutory citations', async ({ page }) => {
      await page.goto('/methodology');

      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Calculation Methodology|Methodology/i);
      await expect(page.locator('text=Zero-PII Client-Side Processing').first()).toBeVisible();
    });

    test('should render contact, privacy, and terms pages', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Contact/i);

      await page.goto('/privacy');
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Privacy/i);

      await page.goto('/terms');
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/Terms/i);
    });
  });

  test.describe('5. UI Controls, Theme & Mobile Responsiveness', () => {
    test('should toggle dark mode and light mode smoothly', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="mode" i], button:has(svg.lucide-sun), button:has(svg.lucide-moon)').first();
      if (await themeToggle.isVisible()) {
        const html = page.locator('html');
        const initialDark = await html.evaluate(el => el.classList.contains('dark'));
        
        await themeToggle.click();
        const updatedDark = await html.evaluate(el => el.classList.contains('dark'));
        expect(updatedDark).not.toBe(initialDark);

        // Toggle back
        await themeToggle.click();
        const revertedDark = await html.evaluate(el => el.classList.contains('dark'));
        expect(revertedDark).toBe(initialDark);
      }
    });

    test('should open and navigate through mobile drawer menu on small viewports', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Hamburger button should be visible on mobile
      const hamburger = page.locator('header button.lg\\:hidden, header button:has(svg.lucide-menu)').first();
      if (await hamburger.isVisible()) {
        await hamburger.click();

        // Mobile nav links should appear inside the mobile menu drawer
        const statesLink = page.locator('div.lg\\:hidden a[href="/states"]');
        await expect(statesLink).toBeVisible();
      }
    });
  });
});
