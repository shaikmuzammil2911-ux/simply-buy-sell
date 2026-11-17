import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties() {
  const { properties } = useApp();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Flats', 'Villas', 'Plots', 'Commercial'];

  const filteredProperties = properties.filter((p) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Flats') return p.type === 'Flats' || p.type === 'Apartments';
    if (activeTab === 'Villas') return p.type === 'Villas' || p.type === 'Houses';
    if (activeTab === 'Plots') return p.type === 'Plots' || p.type === 'Open Plots';
    if (activeTab === 'Commercial') return p.type === 'Commercial';
    return true;
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50 via-blue-50/60 to-sky-50/80 border-b border-blue-100/80 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-brand-royal border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>Handpicked Amaravati Listings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Verified flats, luxury villas, open plots and commercial ventures in prime capital zones
            </p>
          </div>

          <Link
            to="/buy"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orangeDark transition-colors group px-4 py-2 rounded-xl bg-white/80 border border-blue-100 shadow-sm"
          >
            <span>View All Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shadow-sm ${
                activeTab === tab
                  ? 'bg-brand-royal text-white shadow-md -translate-y-0.5'
                  : 'bg-white/90 text-slate-700 hover:bg-blue-50 border border-blue-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Bottom CTA to Open Properties */}
        <div className="mt-14 text-center">
          <Link
            to="/open-properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-navy-900 hover:bg-brand-royal text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span>Explore All Open Properties Ready for Sale</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
