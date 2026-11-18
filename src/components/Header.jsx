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
  const { siteSettings, compareList } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy Plots', path: '/buy' },
    { name: 'Residential Plots', path: '/residential-plots' },
    { name: 'Commercial Plots', path: '/commercial-plots' },
    { name: 'APCRDA Map', path: '/map', badge: 'GIS' },
    { name: 'Plot Intelligence', path: '/plot-intelligence' },
    { name: 'Compare Plots', path: '/compare-plots', badgeCount: compareList.length },
    { name: 'Market Insights', path: '/market-insights' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full z-50">
      {/* 1. Thin Top Information Bar — Desktop Only */}
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

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>APCRDA / LPS Verified Plot Directory</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with light blue styling */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100 py-2.5'
            : 'bg-white/95 backdrop-blur-sm border-b border-blue-100 py-3'
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

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-5 text-[13px] font-semibold text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors relative py-1 hover:text-brand-orange flex items-center gap-1 ${
                  location.pathname === link.path
                    ? 'text-brand-orange font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
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

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/sell-property"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-orange hover:bg-brand-orangeDark transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-brand-orange/20 hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Plot</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl text-slate-700 hover:text-brand-orange bg-blue-50/80 border border-blue-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in-scale">
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

              {/* Mobile Quick Action */}
              <div className="my-4">
                <Link
                  to="/sell-property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center text-xs font-bold rounded-xl bg-brand-orange text-white hover:bg-brand-orangeDark transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Your Plot</span>
                </Link>
              </div>

              {/* Links List */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      location.pathname === link.path
                        ? 'bg-blue-50 text-brand-orange font-bold'
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

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-blue-100 space-y-3">
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-sm text-slate-700 font-medium"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>{siteSettings.phone}</span>
              </a>
              <div className="text-[11px] text-slate-400">
                Amaravati Land & Plot Intelligence
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
