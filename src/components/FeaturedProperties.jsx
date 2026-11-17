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
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              <span>Handpicked Amaravati Listings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Verified flats, luxury villas, open plots and commercial ventures in prime capital zones
            </p>
          </div>

          <Link
            to="/buy"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orangeDark transition-colors group"
          >
            <span>View All Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
        <div className="mt-12 text-center">
          <Link
            to="/open-properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-brand-royal text-white font-semibold text-sm transition-all duration-200 shadow-md"
          >
            <span>Explore All Open Properties Ready for Sale</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
