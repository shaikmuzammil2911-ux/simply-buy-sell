import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Menu,
  X,
  ChevronDown,
  Building2,
  Home,
  ShieldCheck,
  PlusCircle,
  Search,
  Sparkles,
  TreePine,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { siteSettings } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  return (
    <header className="w-full z-50">
      {/* 1. Thin Top Information Bar — HIDDEN ON MOBILE to keep mobile screen clean and uncluttered */}
      <div className="hidden md:block bg-navy-900 text-slate-300 text-xs border-b border-navy-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-brand-orange transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>{siteSettings.phone}</span>
            </a>
            <a
              href={`mailto:${siteSettings.email}`}
              className="flex items-center gap-1.5 hover:text-brand-orange transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-green" />
              <span>{siteSettings.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{siteSettings.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-300 bg-navy-800/60 px-2 py-0.5 rounded border border-navy-700">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <select
                aria-label="Language selector"
                className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer"
                defaultValue="en"
              >
                <option value="en" className="bg-navy-900 text-white">English</option>
                <option value="te" className="bg-navy-900 text-white">తెలుగు (Telugu)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navigation with light blue tint and soft shadow */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100 py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-blue-50 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group py-0.5">
            <img
              src="/logo.png"
              alt="SimplyBuySell Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.03]"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Navigation Links — Services is placed beside Home as requested */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7 font-medium text-sm text-slate-700">
            {/* 1. Home */}
            <Link
              to="/"
              className={`transition-colors relative py-1 hover:text-brand-orange ${
                location.pathname === '/'
                  ? 'text-brand-orange font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                  : ''
              }`}
            >
              Home
            </Link>

            {/* 2. Services Dropdown (Directly Beside Home) */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 py-1 hover:text-brand-orange transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'text-brand-orange font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                    : ''
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-blue-500" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 py-2.5 z-50 animate-fade-in-scale">
                  <div className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-500">
                    Amaravati Property Services
                  </div>
                  <Link
                    to="/services/residential"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">Residential Properties</div>
                      <div className="text-[11px] text-slate-400">Flats, Luxury Villas & Houses</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/commercial"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">Commercial Properties</div>
                      <div className="text-[11px] text-slate-400">Offices & Retail Spaces</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/plots"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-royal flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">Open Plots</div>
                      <div className="text-[11px] text-slate-400">CRDA & DTCP Sanctioned</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/agricultural-land"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <TreePine className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">Agricultural Lands</div>
                      <div className="text-[11px] text-slate-400">Productive Farm Lands</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/investment"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">Investment Opportunities</div>
                      <div className="text-[11px] text-slate-400">High-ROI Amaravati Assets</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Our Motto */}
            <Link
              to="/motto"
              className={`transition-colors relative py-1 hover:text-brand-orange ${
                location.pathname === '/motto'
                  ? 'text-brand-orange font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                  : ''
              }`}
            >
              Our Motto
            </Link>

            {/* 4. Open Properties */}
            <Link
              to="/open-properties"
              className={`transition-colors relative py-1 hover:text-brand-orange ${
                location.pathname === '/open-properties'
                  ? 'text-brand-orange font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                  : ''
              }`}
            >
              Open Properties
            </Link>

            {/* 5. Buyer's Choice */}
            <Link
              to="/buyers-choice"
              className={`transition-colors relative py-1 hover:text-brand-orange ${
                location.pathname === '/buyers-choice'
                  ? 'text-brand-orange font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                  : ''
              }`}
            >
              Buyer's Choice
            </Link>

            {/* 6. Contact */}
            <Link
              to="/contact"
              className={`transition-colors relative py-1 hover:text-brand-orange ${
                location.pathname === '/contact'
                  ? 'text-brand-orange font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                  : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Prominent Desktop Buy / Sell Interactive Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/buy"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Buy Property</span>
            </Link>

            <Link
              to="/sell"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orangeDark transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-brand-orange/20 hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Property</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-brand-orange bg-blue-50/80 border border-blue-100 transition-colors"
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
              <div className="flex items-center justify-between pb-4 border-b border-blue-100">
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

              {/* Mobile Buy / Sell Quick CTAs */}
              <div className="grid grid-cols-2 gap-2 my-5">
                <Link
                  to="/buy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  Buy Property
                </Link>
                <Link
                  to="/sell"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold rounded-xl bg-brand-orange text-white hover:bg-brand-orangeDark transition-colors shadow-sm"
                >
                  Sell Property
                </Link>
              </div>

              {/* Links List with Services right after Home */}
              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === '/'
                      ? 'bg-blue-50 text-brand-orange font-bold'
                      : 'text-slate-700 hover:bg-blue-50/50'
                  }`}
                >
                  Home
                </Link>

                {/* Mobile Services section placed right beside Home */}
                <div className="pt-2 pb-1 px-3 text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Our Services
                </div>
                <div className="pl-2 space-y-1">
                  <Link
                    to="/services/residential"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-royal hover:bg-blue-50 rounded-lg"
                  >
                    • Residential Properties
                  </Link>
                  <Link
                    to="/services/commercial"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-royal hover:bg-blue-50 rounded-lg"
                  >
                    • Commercial Properties
                  </Link>
                  <Link
                    to="/services/plots"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-royal hover:bg-blue-50 rounded-lg"
                  >
                    • Open Plots (CRDA / DTCP)
                  </Link>
                  <Link
                    to="/services/agricultural-land"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-royal hover:bg-blue-50 rounded-lg"
                  >
                    • Agricultural Lands
                  </Link>
                  <Link
                    to="/services/investment"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-royal hover:bg-blue-50 rounded-lg"
                  >
                    • Investment Opportunities
                  </Link>
                </div>

                <Link
                  to="/motto"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === '/motto'
                      ? 'bg-blue-50 text-brand-orange font-bold'
                      : 'text-slate-700 hover:bg-blue-50/50'
                  }`}
                >
                  Our Motto
                </Link>
                <Link
                  to="/open-properties"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === '/open-properties'
                      ? 'bg-blue-50 text-brand-orange font-bold'
                      : 'text-slate-700 hover:bg-blue-50/50'
                  }`}
                >
                  Open Properties
                </Link>
                <Link
                  to="/buyers-choice"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === '/buyers-choice'
                      ? 'bg-blue-50 text-brand-orange font-bold'
                      : 'text-slate-700 hover:bg-blue-50/50'
                  }`}
                >
                  Buyer's Choice
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === '/contact'
                      ? 'bg-blue-50 text-brand-orange font-bold'
                      : 'text-slate-700 hover:bg-blue-50/50'
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-blue-100 space-y-3">
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-sm text-slate-700 font-medium"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>{siteSettings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
