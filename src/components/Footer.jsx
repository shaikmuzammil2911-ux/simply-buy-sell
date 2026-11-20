import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { siteSettings } = useApp();

  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-8 border-t border-navy-800 relative overflow-hidden">
      {/* Ambient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-800">
          {/* Col 1: Brand Logo & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group py-1">
              <img
                src="/logo-white.png"
                alt="SimplyBuySell Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.03]"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Making property buying and selling simple across India. We bring transparency, verified information, and confidence to buyers and sellers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/motto" className="hover:text-brand-orange transition-colors">
                  Our Motto
                </Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-brand-orange transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-brand-orange transition-colors">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link to="/buyers-choice" className="hover:text-brand-orange transition-colors">
                  Buyer's Choice
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/buy?category=lps_plots" className="hover:text-brand-orange transition-colors">
                  APCRDA / LPS Plots
                </Link>
              </li>
              <li>
                <Link to="/buy?category=open_plots" className="hover:text-brand-orange transition-colors">
                  Open Plots
                </Link>
              </li>
              <li>
                <Link to="/buy?category=apartments" className="hover:text-brand-orange transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/buy?category=houses" className="hover:text-brand-orange transition-colors">
                  Residential Houses
                </Link>
              </li>
              <li>
                <Link to="/buy?category=commercial" className="hover:text-brand-orange transition-colors">
                  Commercial Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us - Only Contact Details (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <span>{siteSettings.address || 'Amaravati & Pan-India Real Estate Network'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-green shrink-0" />
                <a href={`tel:${siteSettings.phone?.replace(/\s+/g, '') || '+919876543210'}`} className="hover:text-white">
                  {siteSettings.phone || '+91 98765 43210'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${siteSettings.email || 'info@simplybuysell.com'}`} className="hover:text-white">
                  {siteSettings.email || 'info@simplybuysell.com'}
                </a>
              </li>
              <li className="pt-2">
                <div className="p-3 rounded-xl bg-navy-800/80 border border-navy-700 text-xs text-slate-300">
                  <div className="font-bold text-white mb-0.5">Customer Support Desk</div>
                  <div>Monday – Saturday: 9:00 AM – 7:30 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 SimplyBuySell. All Rights Reserved. Making Property Simple Across India.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/motto" className="hover:text-slate-400">
              Our Vision
            </Link>
            <Link to="/contact" className="hover:text-slate-400">
              Support
            </Link>
            <Link to="/buy" className="hover:text-slate-400">
              All Properties
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
