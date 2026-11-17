import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelcomeSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Top pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Andhra Pradesh Real Estate Marketplace</span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight mb-3">
            Welcome to <span className="text-navy-900">Simply</span><span className="text-brand-orange">Buy</span><span className="text-brand-green">Sell</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-semibold text-brand-royal mb-6">
            Your Trusted Property Marketplace for the Amaravati Region
          </p>

          {/* Elegant Heading Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-slate-200 rounded" />
            <span className="w-3 h-3 rotate-45 border-2 border-brand-orange bg-white" />
            <span className="w-12 h-0.5 bg-slate-200 rounded" />
          </div>

          {/* Short Professional Paragraph */}
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
            SimplyBuySell helps buyers, sellers and investors discover property opportunities with transparent information, verified listings and professional assistance. Whether you are seeking a dream residence, prime commercial asset, or high-growth plotted land in Andhra Pradesh's burgeoning capital, we bring certainty to every square foot.
          </p>

          {/* Key Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-left">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-navy-900 uppercase">100% Verified Titles</h3>
                <p className="text-xs text-slate-500 mt-0.5">Rigorous legal verification and CRDA documentation check.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-navy-900 uppercase">Zero Fake Listings</h3>
                <p className="text-xs text-slate-500 mt-0.5">Direct seller contact with actual on-ground availability.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-navy-900 uppercase">Capital Growth Focus</h3>
                <p className="text-xs text-slate-500 mt-0.5">Strategically aligned with government infrastructure masterplans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
