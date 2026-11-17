import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Sparkles, Building2 } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50/80 via-blue-50/50 to-sky-50/90 border-b border-blue-100/80 relative overflow-hidden">
      {/* Subtle light blue glowing orbs in background */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Top pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-brand-royal text-xs font-bold uppercase tracking-wider mb-4 shadow-sm animate-float">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Andhra Pradesh Premier Real Estate Marketplace</span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight mb-3">
            Welcome to <span className="text-navy-900">Simply</span><span className="text-brand-orange">Buy</span><span className="text-brand-green">Sell</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-xl font-semibold text-brand-royal mb-6">
            Your Trusted Property Marketplace for the Amaravati Region
          </p>

          {/* Elegant Heading Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-16 h-0.5 bg-blue-200 rounded" />
            <span className="w-3.5 h-3.5 rotate-45 border-2 border-brand-orange bg-blue-50 shadow-sm" />
            <span className="w-16 h-0.5 bg-blue-200 rounded" />
          </div>

          {/* Short Professional Paragraph */}
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10">
            SimplyBuySell helps buyers, sellers and investors discover property opportunities with transparent information, verified listings and professional assistance. Whether you are seeking a dream residence, prime commercial asset, or high-growth plotted land in Andhra Pradesh's burgeoning capital, we bring certainty to every square foot.
          </p>

          {/* Key Value Points with light blue glass cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-navy-900 uppercase">100% Verified Titles</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Rigorous legal verification and CRDA documentation check.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-navy-900 uppercase">Zero Fake Listings</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Direct seller contact with actual on-ground availability.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-royal flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-navy-900 uppercase">Capital Growth Focus</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Strategically aligned with government infrastructure masterplans.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
