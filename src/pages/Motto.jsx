import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Target,
  ShieldCheck,
  Eye,
  HeartHandshake,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Motto() {
  const { siteSettings } = useApp();

  const corePillars = [
    {
      title: "Absolute Transparency",
      desc: "Every title deed, Encumbrance Certificate (EC), layout LP number, and developer sanction is verified and made accessible to clients before any financial commitment.",
      icon: Eye,
      color: "blue"
    },
    {
      title: "Uncompromising Trust",
      desc: "We stand as an independent, unbiased advocate for property buyers and sellers in Amaravati, filtering out speculative rumours and focusing purely on verified data.",
      icon: ShieldCheck,
      color: "green"
    },
    {
      title: "Customer-First Philosophy",
      desc: "We prioritize your capital safety and family lifestyle needs above transaction commissions. If a property is not right for you, we will openly advise against it.",
      icon: Users,
      color: "orange"
    },
    {
      title: "Long-Term Relationship",
      desc: "Our involvement does not end with registration. We assist clients with boundary demarcation, municipal mutations, property tax, and future capital liquidity.",
      icon: HeartHandshake,
      color: "purple"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-blue-50/50 to-sky-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-black opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Guiding Principles</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Our Motto, Vision & Mission
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Building Andhra Pradesh's most trusted, dependable, and forward-looking real estate ecosystem for generations to come.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange block mb-2">
                Future Ambition
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-4">
                Our Vision
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {siteSettings.motto?.vision ||
                  "To be the most transparent, accessible, and customer-centric property marketplace empowering individuals and businesses to build lasting prosperity across Andhra Pradesh."}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-navy-900">
              <CheckCircle2 className="w-4 h-4 text-brand-orange" />
              <span>Capital Growth • Ethical Transactions • Reliable Insights</span>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-green block mb-2">
                Daily Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-4">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {siteSettings.motto?.mission ||
                  "To eliminate property transaction anxiety through meticulous due diligence, verified listings, objective pricing intelligence, and uncompromising customer advocacy."}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-navy-900">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>100% Legal Scrutiny • Fair Value • Stress-Free Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
            The SimplyBuySell Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            The 4 Pillars That Define Us
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            How we deliver peace of mind to property buyers, sellers, and NRI investors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-navy-900 flex items-center justify-center mb-5 border border-slate-100">
                  <Icon className="w-6 h-6 text-brand-royal" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Experience the Trust Difference with SimplyBuySell
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Join thousands of satisfied property owners and investors in Amaravati.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/buy"
                className="px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm transition-all shadow-lg shadow-brand-orange/30 flex items-center gap-2"
              >
                <span>Browse Verified Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-colors"
              >
                Speak to Our Leadership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
