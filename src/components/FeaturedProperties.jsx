import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Map } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties() {
  const { properties } = useApp();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All Properties', 'Amaravati LPS Plots', 'Apartment Flats', 'Individual Houses', 'Open Plots'];

  const filteredProperties = properties.filter((p) => {
    if (activeTab === 'All Properties') return true;
    if (activeTab === 'Amaravati LPS Plots') return p.propertyCategory === 'lps_plots' || (!p.propertyCategory && (p.category?.includes('Plot') || p.type === 'Plots'));
    if (activeTab === 'Apartment Flats') return p.propertyCategory === 'apartments' || (!p.propertyCategory && p.type === 'Flats');
    if (activeTab === 'Individual Houses') return p.propertyCategory === 'houses' || (!p.propertyCategory && p.type === 'Houses');
    if (activeTab === 'Open Plots') return p.propertyCategory === 'open_plots';
    return true;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-sky-50 via-blue-50/60 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Database Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              Featured Amaravati Plot Inventory
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Verified APCRDA/LPS residential and commercial plots with authenticated plot codes and GIS map coordinates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/map"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 shadow-sm"
            >
              <Map className="w-3.5 h-3.5 text-blue-600" />
              <span>Explore on GIS Map</span>
            </Link>

            <Link
              to="/buy"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
            >
              <span>View All ({properties.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
