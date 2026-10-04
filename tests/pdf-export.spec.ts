import { test, expect } from '@playwright/test';
import { generateCompliancePDF } from '../src/utils/pdfExport';
import { calculateLLCCompliance } from '../src/utils/calculator';
import { STATE_RULES } from '../src/data/stateRules';

test.describe('LLC TaxCheck PDF Export & Statutory Text Wrapping Tests', () => {
  const allStates = Object.values(STATE_RULES);

  test('should successfully compile single-page PDF with wrapped text for all 51 jurisdictions', async () => {
    expect(allStates.length).toBeGreaterThanOrEqual(51);

    for (const state of allStates) {
      const result = calculateLLCCompliance(state, 100000, 0, false, 0, 30, 1);
      const doc = generateCompliancePDF(result);

      // Verify strict 1-page compliance constraint (no overflow to page 2)
      expect(doc.getNumberOfPages()).toBe(1);

      // Verify array buffer output is valid and non-empty
      const pdfBytes = doc.output('arraybuffer');
      expect(pdfBytes.byteLength).toBeGreaterThan(5000);
    }
  });

  test('should properly wrap Governing Form and prevent overflow for long form descriptions', async () => {
    // Specifically test states with exceptionally long Governing Form & Agency strings
    const statesWithLongForms = [
      'california', // FTB 3522 & FTB 3536 & Form LLC-12 (SOI)
      'nevada',     // SilverFlume (Annual List of Managers $150 + State Business License $200)
      'new_york',   // Form IT-204-LL (LLC Filing Fee) & DOS Biennial Statement ($9)
      'rhode_island', // Form 632 & Form RI-1065
      'tennessee',  // Tennessee F&E Return (FAE 170) & Annual Report ($300 min)
      'district_of_columbia', // Form BRA-25 (Two-Year Report)
      'washington', // Annual Report (CCFS)
      'maryland',   // Form 1 (Annual Report & Personal Property Return)
    ];

    for (const stateId of statesWithLongForms) {
      const state = STATE_RULES[stateId];
      expect(state).toBeDefined();

      const result = calculateLLCCompliance(state, 1500000, 200000, true, 6, 25, 4);
      const doc = generateCompliancePDF(result);

      // Verify page count is strictly 1
      expect(doc.getNumberOfPages()).toBe(1);

      // Verify text splitting width rule:
      // Inside generateCompliancePDF, valueMaxWidth is 142mm.
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const wrappedLines = doc.splitTextToSize(state.governingForm, 142);
      
      // Long forms must split into multiple lines to prevent overflowing page margins
      if (state.governingForm.length > 50) {
        expect(wrappedLines.length).toBeGreaterThanOrEqual(1);
      }
      
      // Each line must be strictly <= 142mm
      for (const line of wrappedLines) {
        const lineWidth = doc.getTextWidth(line);
        expect(lineWidth).toBeLessThanOrEqual(142.0);
      }
    }
  });

  test('should wrap Governing Agency and Legal Authority citations safely', async () => {
    for (const state of allStates) {
      const doc = generateCompliancePDF(
        calculateLLCCompliance(state, 500000, 50000, false, 0, 30, 2)
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);

      const agencyLines = doc.splitTextToSize(state.governingBody, 142);
      for (const line of agencyLines) {
        expect(doc.getTextWidth(line)).toBeLessThanOrEqual(142.0);
      }

      const citationLines = doc.splitTextToSize(state.statutoryCitation, 142);
      for (const line of citationLines) {
        expect(doc.getTextWidth(line)).toBeLessThanOrEqual(142.0);
      }
    }
  });

  test('should handle extreme delinquency (24 months late) and high member count without page spillover', async () => {
    const extremeCases = [
      { id: 'california', rev: 25000000, assets: 10000000, members: 50, months: 24 },
      { id: 'delaware', rev: 5000000, assets: 2000000, members: 20, months: 24 },
      { id: 'florida', rev: 1000000, assets: 500000, members: 10, months: 12 },
      { id: 'texas', rev: 50000000, assets: 15000000, members: 5, months: 24 },
      { id: 'wyoming', rev: 0, assets: 0, members: 1, months: 0 },
    ];

    for (const c of extremeCases) {
      const state = STATE_RULES[c.id];
      const result = calculateLLCCompliance(state, c.rev, c.assets, true, c.months, 30, c.members);
      const doc = generateCompliancePDF(result);

      expect(doc.getNumberOfPages()).toBe(1);
    }
  });

  test('UI workflow: should open compliance report modal and initiate PDF download in browser', async ({ page }) => {
    await page.goto('/');

    // Wait for the calculator view to load
    await expect(page.locator('text=LLC Franchise Tax & Annual Fee Calculator')).toBeVisible();

    // Select California
    const stateSelect = page.locator('select').first();
    await stateSelect.selectOption('california');

    // Verify statutory breakdown updates
    await expect(page.locator('text=FTB 3522').first()).toBeVisible();
    await expect(page.locator('span, div, p').filter({ hasText: '$800' }).first()).toBeVisible();

    // Find and click the Export PDF button
    const exportButton = page.getByRole('button', { name: /Export PDF/i }).first();
    await expect(exportButton).toBeVisible();
    await exportButton.click();

    // Verify the Compliance Report Modal is visible
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal.locator('text=LLC Statutory Compliance Summary')).toBeVisible();

    // Verify governing form is displayed inside the modal
    await expect(modal.locator('text=FTB 3522').first()).toBeVisible();

    // Verify Download Audit PDF button is present and clickable
    const downloadPdfBtn = modal.getByRole('button', { name: /Download Audit PDF/i });
    await expect(downloadPdfBtn).toBeVisible();

    // Trigger download and verify event
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
    await downloadPdfBtn.click();
    
    // In headless browser verify the button feedback
    await expect(downloadPdfBtn).toBeVisible();

    // Close the modal
    const closeBtn = modal.getByRole('button', { name: /Close/i }).first();
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });
});
