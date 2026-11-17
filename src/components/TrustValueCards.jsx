import React from 'react';
import {
  Users,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Award,
  FileCheck2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    id: 1,
    title: "Customer-Friendly & Flexible",
    description: "Simple, flexible and hassle-free property solutions for buyers, sellers and investors.",
    icon: Users,
    color: "green",
    badge: "Flexibility"
  },
  {
    id: 2,
    title: "More Than Just a Transaction",
    description: "Helping customers make confident property decisions for long-term growth.",
    icon: HeartHandshake,
    color: "orange",
    badge: "Long-Term Value"
  },
  {
    id: 3,
    title: "Trust, Clarity & Accurate Information",
    description: "Reliable and transparent property information for better decision-making.",
    icon: ShieldCheck,
    color: "navy",
    badge: "100% Transparent"
  },
  {
    id: 4,
    title: "Our Role",
    description: "Connecting genuine buyers and sellers with relevant property opportunities.",
    icon: Sparkles,
    color: "orange",
    badge: "Matchmaking"
  },
  {
    id: 5,
    title: "Transparent & Responsible Platform",
    description: "A simple and responsible marketplace designed around customer confidence.",
    icon: Award,
    color: "green",
    badge: "Accountability"
  },
  {
    id: 6,
    title: "Complete & Clear Details",
    description: "Property information, location, pricing, amenities and essential details presented clearly.",
    icon: FileCheck2,
    color: "navy",
    badge: "Clarity"
  }
];

export default function TrustValueCards() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
            Why Choose SimplyBuySell
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Built on Trust, Delivered with Excellence
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Every feature on our platform is crafted to provide unmatched security, verified clarity, and smooth property transactions.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            const isGreen = card.color === 'green';
            const isOrange = card.color === 'orange';

            return (
              <div
                key={card.id}
                className="group relative bg-white p-7 rounded-2xl shadow-card hover:shadow-card-hover border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon container with microinteraction */}
                    <div
                      className={`w-13 h-13 p-3.5 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        isGreen
                          ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                          : isOrange
                          ? 'bg-orange-50 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                          : 'bg-navy-50 text-navy-800 group-hover:bg-navy-900 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6 transition-colors" />
                    </div>

                    <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-brand-royal transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-brand-orange transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
