import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Target,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  UserCheck,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Motto() {
  const { t } = useApp();

  const pillars = [
    {
      num: "1",
      title: "1. Clear Information",
      desc: "We provide useful and relevant property information, helping buyers and sellers make informed decisions.",
      icon: FileText,
      color: "blue"
    },
    {
      num: "2",
      title: "2. Trust & Transparency",
      desc: "We encourage clear property details and honest communication between buyers and sellers.",
      icon: ShieldCheck,
      color: "emerald"
    },
    {
      num: "3",
      title: "3. Customer-First Approach",
      desc: "We show only what users need. Your suggestions and feedback help us improve our platform.",
      icon: Users,
      color: "amber"
    },
    {
      num: "4",
      title: "4. Connecting Buyers & Sellers",
      desc: "We aim to help property owners reach potential buyers and help buyers discover suitable properties across India.",
      icon: UserCheck,
      color: "indigo"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-blue-50/50 to-sky-50 min-h-screen">
      {/* 1. Main Banner – Our Motto */}
      <section className="bg-gradient-to-r from-navy-950 via-blue-950 to-navy-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Our Motto & Vision</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight drop-shadow-md">
            {t('motto_heading', 'Sell Smarter, Discover More with Simply Buy Sell')}
          </h1>
          <p className="text-blue-100 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {t('motto_subheading', 'A simple way to explore properties and connect with buyers and sellers across India.')}
          </p>

          {/* 3 Call to Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            <Link
              to="/buy"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>{t('btn_buy', 'Buy')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/sell"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('btn_sell', 'Sell')}</span>
            </Link>
            <Link
              to="/buyers-choice"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{t('btn_buyers_choice', 'Buyer Choice')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-100 flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/20">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-2">
                Our Future Outlook
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mb-4">
                Our Vision
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To build a trusted and easy-to-use property marketplace that connects buyers and sellers across India, making property discovery and transactions simpler for everyone.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-navy-950">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Pan-India Accessibility • Trust & Simplicity • Empowering Deals</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-100 flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
                Our Daily Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mb-4">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To provide only the property information and suggestions that users need, help buyers find suitable properties, support sellers in reaching potential buyers, and continuously improve through customer feedback.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-navy-950">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Customer-Centric • Verified Information • Continuous Feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Pillars That Define Us */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-blue-600 text-xs font-black uppercase tracking-widest mb-2">
            The SimplyBuySell Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            The 4 Pillars That Define Us
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Guiding principles that drive every property listing, discovery, and customer interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="bg-white rounded-3xl p-7 shadow-lg border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center mb-5 transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-navy-950 mb-2">
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

      {/* 4. Bottom Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-950 via-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-14 text-white text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden border border-blue-800">
          <div className="relative z-10">
            <span className="text-xs font-black text-amber-300 uppercase tracking-widest block mb-2">
              Pan-India Real Estate Network
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
              {t('motto_closing', 'Your Property Journey Starts Here.')}
            </h2>
            <h3 className="text-lg sm:text-2xl font-extrabold text-blue-200 mb-4">
              Sell Smarter, Discover More with Simply Buy Sell
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              A simple way to explore properties and connect with buyers and sellers across India.
            </p>
            {/* 3 Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/buy"
                className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2 group transition-all hover:scale-[1.02]"
              >
                <span>{t('btn_buy', 'Buy')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sell"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-xl shadow-orange-500/30 flex items-center gap-2 group transition-all hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('btn_sell', 'Sell')}</span>
              </Link>
              <Link
                to="/buyers-choice"
                className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 group transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{t('btn_buyers_choice', 'Buyer Choice')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
