import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Clock,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle blue accent line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Logo & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center p-2 rounded-2xl bg-white/95 border border-white/20 shadow-md group">
              <img
                src="/logo.png"
                alt="Simply Buy Sell Logo"
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t(
                'footer_bio',
                'Making property buying and selling simple across India. We bring transparency, verified information, and confidence to buyers and sellers.'
              )}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t('footer_quick_links', 'Quick Links')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  {t('nav_home', 'Home')}
                </Link>
              </li>
              <li>
                <Link to="/motto" className="hover:text-blue-400 transition-colors">
                  {t('nav_motto', 'Our Moto')}
                </Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-blue-400 transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-blue-400 transition-colors">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link to="/buyers-choice" className="hover:text-blue-400 transition-colors">
                  Buyer Choice
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t('footer_services', 'Services')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/buy?category=lps_plots" className="hover:text-blue-400 transition-colors">
                  APCRDA / LPS Plots
                </Link>
              </li>
              <li>
                <Link to="/buy?category=open_plots" className="hover:text-blue-400 transition-colors">
                  Open Plots
                </Link>
              </li>
              <li>
                <Link to="/buy?category=apartments" className="hover:text-blue-400 transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/buy?category=houses" className="hover:text-blue-400 transition-colors">
                  Residential Houses
                </Link>
              </li>
              <li>
                <Link to="/buy?category=commercial" className="hover:text-blue-400 transition-colors">
                  Commercial Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us - Strictly Specified Contact Details (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t('footer_contact_us', 'Contact Us')}
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-200">
                  {t('footer_biz_name', 'Simply Buy Sell Real Estate Network')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t('footer_location', 'Amaravati, One India Hub')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="mailto:customercare@simplybuysell.com"
                  className="hover:text-white text-blue-300 font-medium underline underline-offset-2 transition-colors"
                >
                  customercare@simplybuysell.com
                </a>
              </li>
              <li className="pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t('footer_support_title', 'Customer Support Desk')}</span>
                  </div>
                  <div className="text-slate-300 font-medium">Monday to Saturday</div>
                  <div className="text-amber-300 font-bold">10:00 AM to 5:00 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Simply Buy Sell. {t('footer_rights', 'All rights reserved.')}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/motto" className="hover:text-slate-300 transition-colors">
              {t('nav_motto', 'Our Moto')}
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              {t('nav_contact', 'Contact')}
            </Link>
            <Link to="/buy" className="hover:text-slate-300 transition-colors">
              {t('nav_buy', 'Buy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
