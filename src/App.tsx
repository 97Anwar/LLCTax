import React, { useState, useEffect, useMemo } from 'react';
import { ActiveTab, CalculationResult } from './types';
import { STATE_RULES } from './data/stateRules';
import { calculateLLCCompliance } from './utils/calculator';
import { 
  parseCurrentRoute, 
  listenToRouteChanges, 
  navigate, 
  getStateUrl 
} from './utils/router';
import { Header } from './components/Header';
import { CalculatorView } from './components/CalculatorView';
import { StateDetailPage } from './components/StateDetailPage';
import { StatesDirectoryView } from './components/StatesDirectoryView';
import { StateComparisonView } from './components/StateComparisonView';
import { ComplianceMatrixView } from './components/ComplianceMatrixView';
import { DeadlinesRadarView } from './components/DeadlinesRadarView';
import { MethodologyView } from './components/MethodologyView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsOfServiceView } from './components/TermsOfServiceView';
import { LegalDisclaimerView } from './components/LegalDisclaimerView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { ComplianceReportModal } from './components/ComplianceReportModal';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

export default function App() {
  const [route, setRoute] = useState(parseCurrentRoute());
  const [selectedStateId, setSelectedStateId] = useState<string>(() => {
    const current = parseCurrentRoute();
    if (current.tab === 'state-detail' && current.stateId) {
      return current.stateId;
    }
    return 'california';
  });
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [customReportResult, setCustomReportResult] = useState<CalculationResult | null>(null);

  // Synchronize route state with browser history (popstate and pushState)
  useEffect(() => {
    const cleanup = listenToRouteChanges((newRoute) => {
      setRoute(newRoute);
      if (newRoute.tab === 'state-detail' && newRoute.stateId) {
        setSelectedStateId(newRoute.stateId);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return cleanup;
  }, []);

  const currentState = STATE_RULES[selectedStateId] || STATE_RULES['california'];

  // Keep a reference result for the export modal if none provided
  const fallbackResult: CalculationResult = useMemo(() => {
    return calculateLLCCompliance(currentState, 150000, 0, false, 1, 30, 1);
  }, [currentState]);

  const handleOpenReport = (result?: CalculationResult) => {
    if (result) {
      setCustomReportResult(result);
    } else {
      setCustomReportResult(fallbackResult);
    }
    setIsReportOpen(true);
  };

  const handleSelectStateForCalculator = (stateId: string) => {
    setSelectedStateId(stateId);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStateDetailNav = (stateId: string) => {
    setSelectedStateId(stateId);
    navigate(getStateUrl(stateId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 font-sans transition-colors duration-150">
      {/* Top Header */}
      <Header
        activeTab={route.tab}
        setActiveTab={(tab) => {
          // Handled by router inside Header, or fallback:
          if (tab === 'calculator') navigate('/');
          else if (tab === 'states') navigate('/states');
          else if (tab === 'comparison') navigate('/compare');
          else if (tab === 'matrix') navigate('/matrix');
          else if (tab === 'deadlines') navigate('/deadlines');
          else if (tab === 'methodology') navigate('/methodology');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Dedicated State SEO Pages (/states/:stateId) */}
        {route.tab === 'state-detail' && route.stateId && (
          <StateDetailPage
            stateId={route.stateId}
            onOpenReport={(res) => handleOpenReport(res)}
            onSelectState={handleSelectStateForCalculator}
          />
        )}

        {/* 50-State SEO Hub & Directory (/states) */}
        {route.tab === 'states' && (
          <StatesDirectoryView />
        )}

        {/* Home / Calculator View (/ or /calculator) */}
        {route.tab === 'calculator' && (
          <CalculatorView
            selectedStateId={selectedStateId}
            setSelectedStateId={setSelectedStateId}
            onOpenReport={(res) => handleOpenReport(res)}
            onNavigateToComparison={(stId) => {
              setSelectedStateId(stId);
              navigate('/compare');
            }}
          />
        )}

        {/* Multi-State Comparison View (/compare or /comparison) */}
        {route.tab === 'comparison' && (
          <StateComparisonView
            onSelectStateForCalculator={handleSelectStateForCalculator}
          />
        )}

        {/* 50-State Statutory Matrix View (/matrix) */}
        {route.tab === 'matrix' && (
          <ComplianceMatrixView
            onSelectState={handleSelectStateForCalculator}
          />
        )}

        {/* Statutory Deadlines Radar View (/deadlines) */}
        {route.tab === 'deadlines' && (
          <DeadlinesRadarView
            onSelectState={handleSelectStateForCalculator}
          />
        )}

        {/* Legal & Methodology View (/methodology) */}
        {route.tab === 'methodology' && (
          <MethodologyView />
        )}

        {/* Privacy Policy (/privacy) */}
        {route.tab === 'privacy' && (
          <PrivacyPolicyView />
        )}

        {/* Terms of Service (/terms) */}
        {route.tab === 'terms' && (
          <TermsOfServiceView />
        )}

        {/* Legal & Tax Disclaimer (/disclaimer) */}
        {route.tab === 'disclaimer' && (
          <LegalDisclaimerView />
        )}

        {/* About Us & Editorial Methodology (/about) */}
        {route.tab === 'about' && (
          <AboutView />
        )}

        {/* Contact Us (/contact) */}
        {route.tab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Printable / Export Certificate Modal */}
      {isReportOpen && (
        <ComplianceReportModal
          result={customReportResult || fallbackResult}
          onClose={() => setIsReportOpen(false)}
        />
      )}

      {/* Cookie Consent & Privacy Notice Banner */}
      <CookieBanner />

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          if (tab === 'calculator') navigate('/');
          else if (tab === 'states') navigate('/states');
          else if (tab === 'comparison') navigate('/compare');
          else if (tab === 'matrix') navigate('/matrix');
          else if (tab === 'deadlines') navigate('/deadlines');
          else if (tab === 'methodology') navigate('/methodology');
          else if (tab === 'privacy') navigate('/privacy');
          else if (tab === 'terms') navigate('/terms');
          else if (tab === 'disclaimer') navigate('/disclaimer');
          else if (tab === 'about') navigate('/about');
          else if (tab === 'contact') navigate('/contact');
        }}
        onSelectState={handleStateDetailNav}
      />
    </div>
  );
}
