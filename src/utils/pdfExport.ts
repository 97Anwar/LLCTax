import { jsPDF } from 'jspdf';
import { CalculationResult } from '../types';
import { formatCurrency } from './calculator';

/**
 * Builds and returns a jsPDF document instance with strict page boundaries,
 * multi-line text wrapping for all statutory metadata (Governing Form, Agency, Citation, Schedule),
 * dynamic box sizing, and executive typography.
 */
export function generateCompliancePDF(result: CalculationResult): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const state = result.state;
  const isLate = result.isLate;

  // Professional Palette
  const black = [24, 24, 27]; // zinc-900
  const darkGray = [63, 63, 70]; // zinc-700
  const lightGray = [113, 113, 122]; // zinc-500
  const lineGray = [228, 228, 231]; // zinc-200
  const bgFill = [244, 244, 245]; // zinc-100

  let y = 16;

  // 1. Top Header Banner
  doc.setFillColor(black[0], black[1], black[2]);
  doc.rect(14, y, 182, 13, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('LLC TAXCHECK  •  STATUTORY COMPLIANCE & AUDIT REPORT', 20, y + 8.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(formattedDate, 190, y + 8.5, { align: 'right' });

  y += 18;

  // 2. Title & State Header
  doc.setTextColor(black[0], black[1], black[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.text(`${state.name} LLC Statutory Assessment`, 14, y);

  // Subheader: Jurisdiction + Governing Agency (safely wrapped to avoid edge overflows)
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const subheaderText = `Jurisdiction: ${state.name} (${state.abbr})  •  Governing Agency: ${state.governingBody}`;
  const subheaderLines: string[] = doc.splitTextToSize(subheaderText, 180);
  doc.text(subheaderLines, 14, y);

  y += subheaderLines.length * 4.2 + 2;

  // Horizontal Divider
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.setLineWidth(0.4);
  doc.line(14, y, 196, y);

  y += 4;

  // 3. Entity & Financial Snapshot Box
  doc.setFillColor(bgFill[0], bgFill[1], bgFill[2]);
  doc.rect(14, y, 182, 26, 'F');
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.rect(14, y, 182, 26, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('ENTITY PROFILE & REPORTED PARAMETERS', 18, y + 5.5);

  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

  // Row 1
  doc.setFont('helvetica', 'normal');
  doc.text('Gross State Revenue:', 18, y + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text(formatCurrency(result.grossRevenue), 62, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Entity Structure:', 108, y + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text(result.memberCount === 1 ? 'Single-Member LLC' : `${result.memberCount} Members (Multi-Member)`, 142, y + 12);

  // Row 2
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  if (state.hasAssetTax) {
    doc.text('Reported Assets:', 18, y + 19.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(formatCurrency(result.inStateAssets), 62, y + 19.5);
  } else {
    doc.text('Assessment Basis:', 18, y + 19.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(result.isFlatFeeState ? 'Entity Flat Rate' : 'Revenue Tier Schedule', 62, y + 19.5);
  }

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Compliance Status:', 108, y + 19.5);
  doc.setFont('helvetica', 'bold');
  if (isLate) {
    doc.setTextColor(185, 28, 28); // red-700
    doc.text(`DELINQUENT (${result.monthsLate} mo accrued)`, 142, y + 19.5);
  } else {
    doc.setTextColor(21, 128, 61); // green-700
    doc.text('Timely / Good Standing', 142, y + 19.5);
  }

  y += 31;

  // 4. Itemized Table Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('Itemized Statutory Obligations & Due Amounts', 14, y);

  y += 3.5;

  // Table Header
  doc.setFillColor(black[0], black[1], black[2]);
  doc.rect(14, y, 182, 7.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('STATUTORY OBLIGATION / FEE TYPE', 18, y + 5);
  doc.text('AMOUNT (USD)', 190, y + 5, { align: 'right' });

  y += 7.5;

  const rows: { label: string; amount: string; isBold?: boolean; isHighlight?: boolean }[] = [];

  rows.push({
    label: 'Base Annual Franchise / Minimum Tax',
    amount: formatCurrency(result.baseTax),
  });

  if (result.grossReceiptsSurcharge > 0) {
    rows.push({
      label: `Gross Receipts Surcharge Fee (${state.name} FTB/Revenue tier)`,
      amount: `+${formatCurrency(result.grossReceiptsSurcharge)}`,
    });
  }

  rows.push({
    label: `Periodic Secretary of State Report Fee (${state.reportFrequency})`,
    amount: formatCurrency(result.reportFee),
  });

  if (result.memberFee > 0) {
    rows.push({
      label: `Member Entity Assessment (${result.memberCount} members)`,
      amount: `+${formatCurrency(result.memberFee)}`,
    });
  }

  if (result.latePenalty > 0) {
    rows.push({
      label: `Statutory Delinquency Late Penalties (${result.monthsLate} mo delinquent)`,
      amount: `+${formatCurrency(result.latePenalty)}`,
      isHighlight: true,
    });
  }

  if (result.statutoryInterest > 0) {
    rows.push({
      label: `Statutory Interest Accrued (${result.monthsLate} months)`,
      amount: `+${formatCurrency(result.statutoryInterest)}`,
      isHighlight: true,
    });
  }

  // Print table rows
  rows.forEach((r, idx) => {
    const isAlt = idx % 2 === 1;
    if (isAlt) {
      doc.setFillColor(250, 250, 250);
      doc.rect(14, y, 182, 7, 'F');
    }
    doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
    doc.setLineWidth(0.2);
    doc.line(14, y + 7, 196, y + 7);

    doc.setFont('helvetica', r.isBold ? 'bold' : 'normal');
    doc.setFontSize(8);
    if (r.isHighlight) {
      doc.setTextColor(185, 28, 28);
    } else {
      doc.setTextColor(black[0], black[1], black[2]);
    }
    // Safeguard label text length
    const labelLines: string[] = doc.splitTextToSize(r.label, 130);
    doc.text(labelLines[0], 18, y + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.text(r.amount, 190, y + 4.8, { align: 'right' });

    y += 7;
  });

  // Subtotal: Mandatory Statutory Due
  doc.setFillColor(243, 244, 246);
  doc.rect(14, y, 182, 9, 'F');
  doc.setDrawColor(black[0], black[1], black[2]);
  doc.setLineWidth(0.3);
  doc.line(14, y, 196, y);
  doc.line(14, y + 9, 196, y + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('MANDATORY STATUTORY DUE (Legal Maintenance Obligation)', 18, y + 6);
  doc.text(formatCurrency(result.totalStatutoryDue), 190, y + 6, { align: 'right' });

  y += 11.5;

  // Pass-through Estimated State Tax (if applicable)
  if (result.estimatedStateTax > 0) {
    doc.setFillColor(250, 250, 250);
    doc.rect(14, y, 182, 7.5, 'F');
    doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
    doc.line(14, y + 7.5, 196, y + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(`Est. State Pass-Through Tax on Net Profit (~${formatCurrency(result.estimatedProfit)})`, 18, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(`+${formatCurrency(result.estimatedStateTax)}`, 190, y + 5, { align: 'right' });

    y += 9.5;
  }

  // Grand Total Row
  doc.setFillColor(black[0], black[1], black[2]);
  doc.rect(14, y, 182, 10, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('TOTAL ESTIMATED ANNUAL OUTFLOW', 18, y + 6.8);
  doc.setFontSize(10.5);
  doc.text(formatCurrency(result.totalStateBurden), 190, y + 6.8, { align: 'right' });

  y += 13.5;

  // 3-Year Projection Box
  doc.setFillColor(bgFill[0], bgFill[1], bgFill[2]);
  doc.rect(14, y, 182, 10.5, 'F');
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.rect(14, y, 182, 10.5, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('3-Year Estimated Compliance Run Rate (Compounded Baseline):', 18, y + 6.8);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text(formatCurrency(result.threeYearProjected), 190, y + 6.8, { align: 'right' });

  y += 14.5;

  // 5. Statutory Deadlines & Governing Authority Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('Official Filing Calendar & Statutory Authority', 14, y);

  y += 3.5;

  // Calculate dynamic text wrapping for all metadata lines:
  // Available width inside 182mm box: left padding at 18, label occupies ~28mm, value starts at 48mm.
  // Value width: 192mm - 48mm = 144mm maximum.
  const valueMaxWidth = 142;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  const scheduleLines: string[] = doc.splitTextToSize(state.dueSchedule || 'Annual', valueMaxWidth);
  const formLines: string[] = doc.splitTextToSize(state.governingForm || 'Official SOS Annual Report', valueMaxWidth);
  const agencyLines: string[] = doc.splitTextToSize(state.governingBody || 'Secretary of State', valueMaxWidth);
  const citationLines: string[] = doc.splitTextToSize(state.statutoryCitation || 'State Business Entity Code', valueMaxWidth);

  const itemGap = 1.8;
  const lineSpacing = 3.6;

  const scheduleHeight = scheduleLines.length * lineSpacing;
  const formHeight = formLines.length * lineSpacing;
  const agencyHeight = agencyLines.length * lineSpacing;
  const citationHeight = citationLines.length * lineSpacing;

  const totalCalendarHeight = 5 + scheduleHeight + itemGap + formHeight + itemGap + agencyHeight + itemGap + citationHeight + 3.5;

  // Draw background box
  doc.setFillColor(bgFill[0], bgFill[1], bgFill[2]);
  doc.rect(14, y, 182, totalCalendarHeight, 'F');
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.rect(14, y, 182, totalCalendarHeight, 'S');

  let curFieldY = y + 4.5;

  // Field 1: Filing Schedule
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Filing Schedule:', 18, curFieldY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text(scheduleLines, 48, curFieldY);
  curFieldY += scheduleHeight + itemGap;

  // Field 2: Governing Form (Wrapped cleanly, never goes outside page bounds!)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Governing Form:', 18, curFieldY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text(formLines, 48, curFieldY);
  curFieldY += formHeight + itemGap;

  // Field 3: Governing Agency
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Governing Agency:', 18, curFieldY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text(agencyLines, 48, curFieldY);
  curFieldY += agencyHeight + itemGap;

  // Field 4: Legal Authority
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Legal Authority:', 18, curFieldY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text(citationLines, 48, curFieldY);

  y += totalCalendarHeight + 4;

  // 6. Statutory Compliance Note / Late Rule Alert
  const warningText = state.complianceNote || state.lateRuleText;
  if (warningText) {
    doc.setFontSize(7.5);
    const splitTrap: string[] = doc.splitTextToSize(warningText, 172);
    const alertBoxHeight = 7 + splitTrap.length * 3.4;

    doc.setFillColor(254, 242, 242); // red-50
    doc.rect(14, y, 182, alertBoxHeight, 'F');
    doc.setDrawColor(254, 202, 202); // red-200
    doc.rect(14, y, 182, alertBoxHeight, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(185, 28, 28);
    doc.text('STATUTORY COMPLIANCE & PENALTY GUIDELINES:', 18, y + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(127, 29, 29);
    doc.setFontSize(7.5);
    doc.text(splitTrap, 18, y + 8);

    y += alertBoxHeight + 4;
  }

  // 7. Footer Disclaimer & Verification
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.line(14, 275, 196, 275);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text(
    'Generated via LLCTaxCheck.com  •  Independent statutory computation engine based on official state Department of Revenue & SOS statutes.',
    14,
    280
  );
  doc.text(
    'DISCLAIMER: Informational calculation only. Does not constitute legal, CPA, or tax advice. Remit official filings and payments directly via state portals.',
    14,
    284
  );

  return doc;
}

/**
 * Generates and triggers browser download of the compliance PDF report.
 */
export function downloadCompliancePDF(result: CalculationResult): boolean {
  try {
    const doc = generateCompliancePDF(result);
    const state = result.state;
    const now = new Date();
    const safeStateName = state.abbr ? state.abbr.toUpperCase() : 'US';
    const fileName = `LLCTaxCheck_${safeStateName}_Audit_Report_${now.getFullYear()}.pdf`;

    doc.save(fileName);
    return true;
  } catch (err) {
    console.error('Failed to generate PDF document:', err);
    return false;
  }
}
