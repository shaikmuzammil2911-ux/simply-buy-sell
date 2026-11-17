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
  SlidersHorizontal,
  UserCheck
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
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Motto', path: '/motto' },
    { name: 'Open Properties', path: '/open-properties' },
    { name: "Buyer's Choice", path: '/buyers-choice' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full z-50">
      {/* 1. Thin Top Information Bar */}
      <div className="bg-navy-900 text-slate-300 text-xs border-b border-navy-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
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
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{siteSettings.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-300 bg-navy-800/60 px-2 py-0.5 rounded border border-navy-700">
              <Globe className="w-3.5 h-3.5 text-brand-royal" />
              <select
                aria-label="Language selector"
                className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer"
                defaultValue="en"
              >
                <option value="en" className="bg-navy-900 text-white">English</option>
                <option value="te" className="bg-navy-900 text-white">తెలుగు (Telugu)</option>
              </select>
            </div>

            <Link
              to="/admin"
              className="text-xs bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white px-2 py-0.5 rounded border border-navy-700 flex items-center gap-1 transition-colors"
              title="Admin CMS Portal"
            >
              <ShieldCheck className="w-3 h-3 text-brand-orange" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navigation */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2.5'
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Positioning */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="SimplyBuySell Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              onError={(e) => {
                // fallback text if logo is loading
                e.target.style.display = 'none';
              }}
            />
            <div className="hidden sm:block">
              <span className="text-xl font-extrabold tracking-tight text-navy-900 block leading-tight">
                Simply<span className="text-brand-orange">Buy</span><span className="text-brand-green">Sell</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                Buy • Sell • Invest
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors relative py-1 hover:text-brand-orange ${
                  location.pathname === link.path
                    ? 'text-brand-orange font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                    : ''
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 py-1 hover:text-brand-orange transition-colors ${
                  location.pathname.startsWith('/services') ? 'text-brand-orange font-semibold' : ''
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                  <Link
                    to="/services/residential"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <Home className="w-4 h-4 text-brand-green" />
                    <div>
                      <div className="font-medium">Residential Properties</div>
                      <div className="text-xs text-slate-400">Flats, Villas & Houses</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/commercial"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <Building2 className="w-4 h-4 text-brand-orange" />
                    <div>
                      <div className="font-medium">Commercial Properties</div>
                      <div className="text-xs text-slate-400">Showrooms & Offices</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/plots"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <MapPin className="w-4 h-4 text-brand-green" />
                    <div>
                      <div className="font-medium">Open Plots</div>
                      <div className="text-xs text-slate-400">CRDA & DTCP Approved</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/agricultural-land"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-medium">Agricultural Lands</div>
                      <div className="text-xs text-slate-400">Farm lands & Acreages</div>
                    </div>
                  </Link>
                  <Link
                    to="/services/investment"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-royal transition-colors text-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Investment Opportunities</div>
                      <div className="text-xs text-slate-400">High-Growth Amaravati Assets</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Prominent Desktop Buy / Sell Interactive Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/buy"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Buy Property</span>
            </Link>

            <Link
              to="/sell"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orangeDark transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-brand-orange/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Property</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-brand-orange hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                  <span className="font-extrabold text-navy-900 text-lg">
                    Simply<span className="text-brand-orange">Buy</span><span className="text-brand-green">Sell</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Buy / Sell Quick CTAs */}
              <div className="grid grid-cols-2 gap-2 my-5">
                <Link
                  to="/buy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  Buy Property
                </Link>
                <Link
                  to="/sell"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold rounded-lg bg-brand-orange text-white hover:bg-brand-orangeDark transition-colors shadow-sm"
                >
                  Sell Property
                </Link>
              </div>

              {/* Links List */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-slate-100 text-brand-orange font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Services section */}
                <div className="pt-3 pb-1 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Our Services
                </div>
                <Link
                  to="/services/residential"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-royal hover:bg-slate-50 rounded-lg"
                >
                  • Residential Properties
                </Link>
                <Link
                  to="/services/commercial"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-royal hover:bg-slate-50 rounded-lg"
                >
                  • Commercial Properties
                </Link>
                <Link
                  to="/services/plots"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-royal hover:bg-slate-50 rounded-lg"
                >
                  • Open Plots (CRDA / DTCP)
                </Link>
                <Link
                  to="/services/agricultural-land"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-royal hover:bg-slate-50 rounded-lg"
                >
                  • Agricultural Lands
                </Link>
                <Link
                  to="/services/investment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-royal hover:bg-slate-50 rounded-lg"
                >
                  • Investment Opportunities
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-sm text-slate-700 font-medium"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>{siteSettings.phone}</span>
              </a>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-royal"
              >
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>Admin CMS Panel</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
