import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ContactCtaBanner() {
  const { siteSettings, openScheduleVisitModal, getWhatsAppLink } = useApp();

  return (
    <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-2">
              Ready to take the next step?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-white">
              Speak with an Amaravati Property Specialist Today
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              Whether you are planning to purchase a CRDA plot, invest in high-rental commercial spaces, or sell your existing property in Andhra Pradesh, our licensed consultants are ready to assist.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-brand-orange transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-orange">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Call Anytime</div>
                  <div className="font-bold text-white">{siteSettings.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-2 hover:text-brand-orange transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-green">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Email Us</div>
                  <div className="font-bold text-white">{siteSettings.email}</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={() => openScheduleVisitModal()}
              className="w-full py-4 px-6 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm transition-all duration-200 shadow-xl shadow-brand-orange/30 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Free Site Visit</span>
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm text-center transition-all duration-200"
            >
              Visit Our Amaravati Office
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
