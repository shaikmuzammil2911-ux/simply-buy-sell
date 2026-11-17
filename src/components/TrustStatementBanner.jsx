import React from 'react';
import { ShieldCheck, Target, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TrustStatementBanner() {
  const { siteSettings } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 py-10 text-white shadow-inner">
      {/* Subtle decorative glow circles */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-orange/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-green/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          {/* Statement message with Green & Orange emphasis */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 items-center justify-center shadow-lg shadow-brand-orange/20 shrink-0">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                <Target className="w-3.5 h-3.5 text-brand-orange" />
                <span>Our Unwavering Commitment</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
                Your <span className="text-brand-green">Trust</span> is Our Strength. Your <span className="text-brand-orange">Satisfaction</span> is Our Goal.
              </h2>
            </div>
          </div>

          {/* Trust points pill */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Amaravati Real Estate Specialist</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
