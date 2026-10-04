import React, { useState, useEffect } from 'react';
import { CalculationResult } from '../types';
import { formatCurrency } from '../utils/calculator';
import { downloadCompliancePDF } from '../utils/pdfExport';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  Calendar,
  Download,
  Loader2
} from 'lucide-react';

interface ComplianceReportModalProps {
  result: CalculationResult;
  onClose: () => void;
}

export const ComplianceReportModal: React.FC<ComplianceReportModalProps> = ({ result, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const nowFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Small timeout to allow UI state update
      await new Promise((r) => setTimeout(r, 100));
      const ok = downloadCompliancePDF(result);
      if (ok) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      }
    } catch (err) {
      console.error('Failed to download PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = () => {
    const assetLine = result.state.hasAssetTax 
      ? `Reported In-State Assets: ${formatCurrency(result.inStateAssets)} (Asset-based tax applies in ${result.state.abbr})\n` 
      : `Statutory Assessment Basis: ${result.isFlatFeeState ? 'Entity Flat Fee' : 'Gross Revenue Tier'} (In-state assets not taxed in ${result.state.abbr})\n`;

    const text = `================================================
LLC STATUTORY COMPLIANCE & AUDIT REPORT
Generated: ${nowFormatted}
Jurisdiction: ${result.state.name} (${result.state.abbr})
Governing Body: ${result.state.governingBody}
================================================
FINANCIAL & ENTITY PROFILE:
Reported State Revenue: ${formatCurrency(result.grossRevenue)}
${assetLine}LLC Structure: ${result.memberCount === 1 ? 'Single-Member LLC' : `${result.memberCount} Members (Multi-Member LLC)`}
Filing Status: ${result.isLate ? `DELINQUENT (${result.monthsLate} month(s))` : 'Good Standing'}

STATUTORY FEE BREAKDOWN:
- Base Franchise / Minimum Tax: ${formatCurrency(result.baseTax)}
- Gross Receipts Surcharge Fee: ${formatCurrency(result.grossReceiptsSurcharge)}
- Periodic / Annual Report Fee: ${formatCurrency(result.reportFee)}
${result.memberFee > 0 ? `- Member Entity Fee: ${formatCurrency(result.memberFee)}\n` : ''}${result.latePenalty > 0 ? `- Late Penalties Accrued: ${formatCurrency(result.latePenalty)}\n` : ''}${result.statutoryInterest > 0 ? `- Statutory Interest Accrued: ${formatCurrency(result.statutoryInterest)}\n` : ''}------------------------------------------------
MANDATORY STATUTORY DUE: ${formatCurrency(result.totalStatutoryDue)}
${result.estimatedStateTax > 0 ? `Estimated State Tax on Net Profit: ${formatCurrency(result.estimatedStateTax)}\n` : ''}TOTAL ESTIMATED ANNUAL OUTFLOW: ${formatCurrency(result.totalStateBurden)}
3-Year Run Rate (Projected): ${formatCurrency(result.threeYearProjected)}
------------------------------------------------
DEADLINE & GOVERNING FORM:
Filing Schedule: ${result.state.dueSchedule}
Required Form: ${result.state.governingForm}
Statutory Authority: ${result.state.statutoryCitation}
================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-modal-title"
    >
      <div 
        className="bg-white dark:bg-zinc-900 rounded-xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Pinned at top with prominent Close button */}
        <div className="no-print flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            <h3 id="compliance-modal-title" className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
              LLC Statutory Compliance Summary
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-200/60 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300/80 dark:border-zinc-700 transition-colors cursor-pointer"
            aria-label="Close dialog"
            title="Close dialog (Esc)"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Printable Certificate Content - Scrollable */}
        <div id="compliance-printable-area" className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4 text-zinc-900 dark:text-zinc-100">
          {/* Certificate Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <div>
              <span className="text-[11px] font-medium text-zinc-500 block uppercase tracking-wider">
                Statutory Audit Report
              </span>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {result.state.name} LLC Compliance Evaluation
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Evaluated for statutory schedule • Date: {nowFormatted}
              </p>
            </div>
            <div>
              <span className="text-xs font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-800 dark:text-zinc-200">
                {result.state.abbr} JURISDICTION
              </span>
            </div>
          </div>

          {/* Profile Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800 text-xs">
            <div>
              <span className="text-zinc-500 block text-[11px]">Reported Revenue:</span>
              <strong className="text-zinc-900 dark:text-zinc-100 font-mono text-xs">{formatCurrency(result.grossRevenue)}</strong>
            </div>

            {result.state.hasAssetTax ? (
              <div>
                <span className="text-zinc-500 block text-[11px]">In-State Assets:</span>
                <strong className="text-zinc-900 dark:text-zinc-100 font-mono text-xs">{formatCurrency(result.inStateAssets)}</strong>
              </div>
            ) : (
              <div>
                <span className="text-zinc-500 block text-[11px]">Tax Assessment:</span>
                <strong className="text-zinc-900 dark:text-zinc-100 text-xs">
                  {result.isFlatFeeState ? 'Flat Entity Fee' : 'Revenue Tier'}
                </strong>
              </div>
            )}

            <div>
              <span className="text-zinc-500 block text-[11px]">Entity Structure:</span>
              <strong className="text-zinc-900 dark:text-zinc-100 text-xs">
                {result.memberCount === 1 ? 'Single-Member' : `${result.memberCount} Members`}
              </strong>
            </div>

            <div>
              <span className="text-zinc-500 block text-[11px]">Filing Status:</span>
              <strong className={`font-mono text-xs ${result.isLate ? 'text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {result.isLate ? `Past Due (${result.monthsLate} mo)` : 'Timely Filing'}
              </strong>
            </div>
          </div>

          {/* Itemized Table - Strict 3-Color Hierarchy */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase font-semibold text-[11px] border-b border-zinc-200 dark:border-zinc-700">
                <tr>
                  <th className="px-3.5 py-2">Statutory Obligation</th>
                  <th className="px-3.5 py-2 text-right">Fee / Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-3.5 py-2 text-zinc-700 dark:text-zinc-300">Base Annual Franchise / Minimum Tax</td>
                  <td className="px-3.5 py-2 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(result.baseTax)}</td>
                </tr>
                {result.grossReceiptsSurcharge > 0 && (
                  <tr>
                    <td className="px-3.5 py-2 text-zinc-700 dark:text-zinc-300">Gross Receipts Surcharge Fee</td>
                    <td className="px-3.5 py-2 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">+{formatCurrency(result.grossReceiptsSurcharge)}</td>
                  </tr>
                )}
                <tr>
                  <td className="px-3.5 py-2 text-zinc-700 dark:text-zinc-300">
                    Periodic / Annual Report Fee ({result.state.reportFrequency})
                  </td>
                  <td className="px-3.5 py-2 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(result.reportFee)}</td>
                </tr>
                {result.memberFee > 0 && (
                  <tr>
                    <td className="px-3.5 py-2 text-zinc-700 dark:text-zinc-300">
                      Member Entity Assessment ({result.memberCount} members)
                    </td>
                    <td className="px-3.5 py-2 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">+{formatCurrency(result.memberFee)}</td>
                  </tr>
                )}
                {result.latePenalty > 0 && (
                  <tr className="bg-zinc-50 dark:bg-zinc-800/40">
                    <td className="px-3.5 py-2 font-medium text-zinc-900 dark:text-zinc-100">Statutory Late Delinquency Penalties</td>
                    <td className="px-3.5 py-2 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">
                      +{formatCurrency(result.latePenalty)}
                    </td>
                  </tr>
                )}
                {result.statutoryInterest > 0 && (
                  <tr className="bg-zinc-50 dark:bg-zinc-800/40">
                    <td className="px-3.5 py-2 text-zinc-800 dark:text-zinc-200">Statutory Interest Accrued ({result.monthsLate} mo)</td>
                    <td className="px-3.5 py-2 text-right font-mono text-zinc-800 dark:text-zinc-200">
                      +{formatCurrency(result.statutoryInterest)}
                    </td>
                  </tr>
                )}
                <tr className="bg-zinc-100/70 dark:bg-zinc-800/60 font-semibold text-xs border-t border-zinc-200 dark:border-zinc-700">
                  <td className="px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100">
                    <div>
                      <span>Mandatory Statutory Due by Deadline</span>
                      <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">Owed to keep entity in active good standing (even with $0 profit)</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-mono text-zinc-900 dark:text-zinc-100 text-sm">
                    {formatCurrency(result.totalStatutoryDue)}
                  </td>
                </tr>
                {result.estimatedStateTax > 0 && (
                  <tr>
                    <td className="px-3.5 py-2 text-zinc-700 dark:text-zinc-300">
                      <span>Est. State Tax on Net Profit (~${result.estimatedProfit.toLocaleString()} profit)</span>
                      <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">Pass-through tax due at annual tax return filing</span>
                    </td>
                    <td className="px-3.5 py-2 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">
                      +{formatCurrency(result.estimatedStateTax)}
                    </td>
                  </tr>
                )}
                <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-xs border-t border-zinc-300 dark:border-zinc-700">
                  <td className="px-3.5 py-2.5 text-zinc-950 dark:text-zinc-50">
                    Total Estimated Annual Outflow
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-mono text-zinc-950 dark:text-zinc-50 text-base">
                    {formatCurrency(result.totalStateBurden)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Statutory Filing Summary */}
          <div className="text-xs space-y-1 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 font-medium text-zinc-900 dark:text-zinc-100">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              <span>Filing Schedule & Deadlines:</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              {result.state.dueSchedule} via <strong>{result.state.governingForm}</strong>.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
              Governing Authority: {result.state.governingBody} • {result.state.statutoryCitation}
            </p>
          </div>

          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center leading-normal">
            Informational compliance estimate generated via LLC TaxCheck. Not formal legal or CPA advice.
          </p>
        </div>

        {/* Modal Actions - Pinned at bottom */}
        <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-5 sm:px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white disabled:opacity-60 transition-colors cursor-pointer shadow-xs"
              title="Download official PDF report file"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Audit PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
