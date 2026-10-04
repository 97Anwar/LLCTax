import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { navigate } from '../utils/router';
import { useTheme } from '../context/ThemeContext';
import { 
  Calculator, 
  ArrowLeftRight, 
  Layers, 
  CalendarClock, 
  ShieldCheck, 
  Menu, 
  X,
  Building2,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; path: string }[] = [
    { id: 'calculator', label: 'Calculator', icon: <Calculator className="w-3.5 h-3.5" />, path: '/' },
    { id: 'states', label: '50-State Directory', icon: <Building2 className="w-3.5 h-3.5" />, path: '/states' },
    { id: 'comparison', label: 'Compare States', icon: <ArrowLeftRight className="w-3.5 h-3.5" />, path: '/compare' },
    { id: 'matrix', label: 'Matrix', icon: <Layers className="w-3.5 h-3.5" />, path: '/matrix' },
    { id: 'deadlines', label: 'Deadlines', icon: <CalendarClock className="w-3.5 h-3.5" />, path: '/deadlines' },
    { id: 'methodology', label: 'Statutory Sources', icon: <ShieldCheck className="w-3.5 h-3.5" />, path: '/methodology' },
  ];

  const handleNavClick = (tab: ActiveTab, path: string) => {
    setActiveTab(tab);
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo - Minimal & Editorial */}
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('calculator', '/');
            }}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-hidden"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-emerald-800 dark:bg-emerald-600 text-white font-semibold text-xs tracking-tight shadow-xs">
              LLC
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-base tracking-tight">
                TaxCheck
              </span>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                2026/27
              </span>
            </div>
          </a>

          {/* Desktop Navigation - Clean, Flat Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id, item.path);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle + Certificate Button */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.path);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-around text-[11px] text-zinc-500">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about', '/about');
              }}
              className="hover:underline p-1"
            >
              About
            </a>
            <span>•</span>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact', '/contact');
              }}
              className="hover:underline p-1"
            >
              Contact
            </a>
            <span>•</span>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('privacy', '/privacy');
              }}
              className="hover:underline p-1"
            >
              Privacy
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
