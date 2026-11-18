import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, ShieldCheck, Building2, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from './PropertyCard';

export default function CategorySpotlightSection() {
  const { properties } = useApp();
  const residentialPlots = properties
    .filter((p) => p.category === 'Residential Plot' || (p.propertyCategory === 'lps_plots' && p.category === 'residential') || p.category === 'residential')
    .slice(0, 3);

  const commercialPlots = properties
    .filter((p) => p.category === 'Commercial Plot' || (p.propertyCategory === 'lps_plots' && p.category === 'commercial') || p.category === 'commercial')
    .slice(0, 3);

  return (
    <section className="py-16 bg-gradient-to-b from-sky-50 via-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Residential Plots Spotlight */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <Home className="w-3.5 h-3.5 text-emerald-600" />
                <span>APCRDA LPS Residential Plots</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                Prime Residential Land Parcels
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Returnable residential layouts with clear demarcations, wide blacktop roads, underground utilities and freehold titles.
              </p>
            </div>

            <Link
              to="/residential-plots"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Explore All Residential Plots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialPlots.map((plot) => (
              <PropertyCard key={plot.id} property={plot} />
            ))}
          </div>
        </div>

        {/* Commercial Plots Spotlight */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Capital Arterial Frontage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                High-Growth Commercial Plots
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Fronting 24m–45m master plan expressways, Seed Access Road, and administrative institutional sectors.
              </p>
            </div>

            <Link
              to="/commercial-plots"
              className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
            >
              <span>Explore All Commercial Plots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialPlots.map((plot) => (
              <PropertyCard key={plot.id} property={plot} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
