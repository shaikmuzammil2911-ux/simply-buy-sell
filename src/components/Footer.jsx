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
  ArrowRight,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { siteSettings } = useApp();

  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-800">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="SimplyBuySell Logo"
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The premier real estate marketplace dedicated to the emerging Amaravati capital region and Andhra Pradesh. We bring transparency, verified documentation, and confidence to every property transaction.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
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
                  Our Motto & Vision
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
                <Link to="/open-properties" className="hover:text-brand-orange transition-colors">
                  Open Properties
                </Link>
              </li>
              <li>
                <Link to="/buyers-choice" className="hover:text-brand-orange transition-colors">
                  Buyer's Choice
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-orange transition-colors">
                  Contact Us
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
                <Link to="/services/residential" className="hover:text-brand-orange transition-colors">
                  Residential
                </Link>
              </li>
              <li>
                <Link to="/services/commercial" className="hover:text-brand-orange transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/services/plots" className="hover:text-brand-orange transition-colors">
                  Open Plots
                </Link>
              </li>
              <li>
                <Link to="/services/agricultural-land" className="hover:text-brand-orange transition-colors">
                  Agricultural Land
                </Link>
              </li>
              <li>
                <Link to="/services/investment" className="hover:text-brand-orange transition-colors">
                  Investment
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-xs text-brand-orange hover:underline pt-2 inline-block">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <span>{siteSettings.address || 'Capital Zone, Amaravati, Andhra Pradesh, India'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-green shrink-0" />
                <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {siteSettings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-royal shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-white">
                  {siteSettings.email}
                </a>
              </li>
              <li className="pt-2">
                <div className="p-3 rounded-xl bg-navy-800/80 border border-navy-700 text-xs text-slate-300">
                  <div className="font-bold text-white mb-0.5">Andhra Pradesh Capital Support</div>
                  <div>Monday – Saturday: 9:00 AM – 7:30 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 SimplyBuySell. All Rights Reserved. Built for Andhra Pradesh Real Estate.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/motto" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/motto" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
