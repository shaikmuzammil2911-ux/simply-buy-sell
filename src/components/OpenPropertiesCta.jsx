import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function OpenPropertiesCta() {
  return (
    <section className="py-14 bg-gradient-to-r from-navy-900 via-royal to-navy-900 text-white relative overflow-hidden">
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Immediate Possession & Registration</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-white">
              Discover Ready-to-Buy <span className="text-brand-orange">Open Properties</span> in Amaravati
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Browse through currently open listings with confirmed seller mandates, 100% vetted title deeds, and spot demarcation. No delays, no speculations.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>CRDA & DTCP Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Zero Brokerage Surprise</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Spot Site Visits</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <Link
              to="/open-properties"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-center text-sm sm:text-base transition-all duration-200 shadow-xl shadow-brand-orange/30 flex items-center justify-center gap-2"
            >
              <span>Explore Available Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/sell"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-center text-sm sm:text-base transition-all duration-200"
            >
              Post Open Property
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
