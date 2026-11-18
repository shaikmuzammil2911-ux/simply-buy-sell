import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Map, Building2, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties() {
  const { properties } = useApp();

  // 1. Amaravati LPS Plots
  const lpsPlots = properties.filter(
    (p) => p.propertyCategory === 'lps_plots' || (!p.propertyCategory && (p.category?.includes('Plot') || p.type === 'Plots'))
  );

  // 2. Apartment Flats
  const apartmentFlats = properties.filter(
    (p) => p.propertyCategory === 'apartments' || (!p.propertyCategory && p.type === 'Flats')
  );

  // 3. Open Plots
  const openPlots = properties.filter(
    (p) => p.propertyCategory === 'open_plots' || (!p.propertyCategory && (p.type === 'Open Plots' || p.category?.includes('Open')))
  );

  return (
    <div className="w-full space-y-16 py-12 bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
      {/* SECTION 1: AMARAVATI LPS PLOTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>First Section • APCRDA Verified</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 tracking-tight">
              Amaravati LPS Plots
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Official Land Pooling Scheme plots across Thullur, Rayapudi, Mandadam, and Nelapadu with verified plot codes
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
              to="/buy?category=lps_plots"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
            >
              <span>View All LPS Plots ({lpsPlots.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lpsPlots.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* SECTION 2: APARTMENT FLATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Second Section • Modern Living</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 tracking-tight">
              Apartment Flats
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              High-rise 2 BHK & 3 BHK flats, gated communities, and luxury residential complexes in Amaravati & Mangalagiri
            </p>
          </div>

          <Link
            to="/buy?category=apartments"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors"
          >
            <span>View All Flats ({apartmentFlats.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartmentFlats.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* SECTION 3: OPEN PLOTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider mb-2 border border-amber-200">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Third Section • Capital Investments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 tracking-tight">
              Open Plots
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Approved layout plots, highway frontage parcels, and high-growth commercial land parcels in emerging corridors
            </p>
          </div>

          <Link
            to="/buy?category=open_plots"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 shadow-sm transition-colors"
          >
            <span>View All Open Plots ({openPlots.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openPlots.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
