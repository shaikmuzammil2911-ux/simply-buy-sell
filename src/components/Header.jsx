import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Menu,
  X,
  PlusCircle,
  Search,
  Map,
  Scale,
  BrainCircuit,
  TrendingUp,
  Building,
  CheckCircle2,
  ChevronDown,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { siteSettings, currentLanguage, setCurrentLanguage, availableLanguages, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#lang-selector-container')) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langMenuOpen]);

  // Strictly: Home, Our Moto, Sell, Buy, Contact (Sell before Buy)
  const navLinks = [
    { name: t('nav_home', 'Home'), path: '/' },
    { name: t('nav_motto', 'Our Moto'), path: '/motto' },
    { name: t('nav_sell', 'Sell'), path: '/sell' },
    { name: t('nav_buy', 'Buy'), path: '/buy' },
    { name: t('nav_contact', 'Contact'), path: '/contact' },
  ];

  return (
    <header className="w-full z-50">
      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100 py-2.5'
            : 'bg-white/95 backdrop-blur-sm border-b border-blue-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/" className="flex items-center group py-0.5 shrink-0 z-10">
            <img
              src="/logo.png"
              alt="SimplyBuySell Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.03]"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Navigation Links - Centered in the middle */}
          <div className="hidden lg:flex items-center justify-center gap-8 text-sm font-bold text-slate-700 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors relative py-1 hover:text-brand-orange flex items-center gap-1 ${
                  location.pathname === link.path
                    ? 'text-brand-orange font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                    : ''
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-brand-royal uppercase">
                    {link.badge}
                  </span>
                )}
                {link.badgeCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] flex items-center justify-center font-bold">
                    {link.badgeCount}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Language Selector on Desktop */}
          <div className="hidden lg:flex items-center gap-2 z-10" id="lang-selector-container">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="inline-flex items-center gap-2 text-xs font-black text-slate-800 hover:text-blue-700 bg-white hover:bg-blue-50/80 px-3.5 py-2 rounded-xl border border-blue-200/90 shadow-sm transition-all focus:outline-none"
                aria-label="Language selection dropdown"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>{availableLanguages.find((l) => l.code === currentLanguage)?.native || 'English'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-blue-100 py-2 z-50 animate-fade-in-scale">
                  <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Select Language
                  </div>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-blue-50 text-blue-700 font-black'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>
                        {lang.native} <span className="text-[11px] font-medium text-slate-400">({lang.label})</span>
                      </span>
                      {currentLanguage === lang.code && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-brand-orange bg-blue-50/80 border border-blue-100 transition-colors z-10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in-scale">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-blue-100 mb-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <img src="/logo.png" alt="SimplyBuySell Logo" className="h-10 sm:h-12 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links List */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-center text-center px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                      location.pathname === link.path
                        ? 'bg-blue-50 text-brand-orange font-extrabold'
                        : 'text-slate-700 hover:bg-blue-50/50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-brand-royal">
                        {link.badge}
                      </span>
                    )}
                    {link.badgeCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] flex items-center justify-center font-bold">
                        {link.badgeCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Drawer Footer with Language Selection */}
            <div className="pt-6 border-t border-blue-100 space-y-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                  Select Language
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-2.5 py-2 rounded-xl text-xs font-bold text-center border transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 text-center font-medium">
                Simply Buy Sell • Real Estate Network
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
