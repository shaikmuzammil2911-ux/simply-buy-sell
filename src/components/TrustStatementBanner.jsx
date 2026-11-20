import React from 'react';
import { ShieldCheck, Target } from 'lucide-react';

export default function TrustStatementBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 py-12 text-white shadow-inner">
      {/* Subtle decorative glow circles */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-orange/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-green/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center shadow-lg shadow-brand-orange/20 shrink-0">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
              <Target className="w-3.5 h-3.5 text-brand-orange" />
              <span>Our Core Commitment</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Your <span className="text-emerald-400">Trust</span> is Our Strength. Your <span className="text-amber-400">Satisfaction</span> is Our Goal.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
