import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  TrendingUp,
  Map,
  ArrowRight,
  Sparkles,
  Building2,
  ChevronRight,
  Info
} from 'lucide-react';
import { amaravatiVillages } from '../data/mockData';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function VillageExplorer() {
  const { properties } = useApp();
  const { village } = useParams();
  const normalizedVillage = village ? village.toLowerCase() : 'thullur';

  const villageInfo =
    amaravatiVillages.find((v) => v.name.toLowerCase() === normalizedVillage) ||
    amaravatiVillages[0];

  // Plots in this village
  const villagePlots = properties.filter(
    (p) => p.village?.toLowerCase() === villageInfo.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/market-insights" className="hover:text-blue-600">Amaravati Villages</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy-950 font-bold">{villageInfo.name}</span>
        </div>

        {/* Village Hero Card */}
        <div className="bg-gradient-to-r from-navy-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{villageInfo.themeCity}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                {villageInfo.name}, Amaravati
              </h1>
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                {villageInfo.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 shrink-0">
              <div>
                <div className="text-xs text-blue-200 uppercase font-semibold">Average Asking Rate</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  ₹{villageInfo.avgPricePerSqYd.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-white"> / sq.yd</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/map?village=${encodeURIComponent(villageInfo.name)}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Open GIS Map</span>
                </Link>
                <Link
                  to="/plot-intelligence"
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Intelligence</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Plots Available in this village */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-navy-950">
                Available Plots in {villageInfo.name} ({villagePlots.length})
              </h2>
              <p className="text-xs text-slate-500">
                Directly pooled LPS residential and commercial allotments
              </p>
            </div>
            <Link to="/buy" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>View All Amaravati Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {villagePlots.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-blue-100 text-slate-500 text-xs">
              No live listings currently featured for {villageInfo.name}. Contact our team or submit a requirement to acquire verified off-market plots in this village.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {villagePlots.map((plot) => (
                <PropertyCard key={plot.id} property={plot} />
              ))}
            </div>
          )}
        </div>

        {/* Other Amaravati Villages */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm">
          <h3 className="text-lg font-bold text-navy-950 mb-4">
            Explore Other Amaravati Capital Region Villages
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {amaravatiVillages.map((v) => (
              <Link
                key={v.id}
                to={`/locations/${v.name.toLowerCase()}`}
                className={`p-3 rounded-xl border text-center transition-all ${
                  v.name.toLowerCase() === villageInfo.name.toLowerCase()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                    : 'bg-slate-50 border-slate-200 text-navy-900 hover:bg-blue-50/60 hover:border-blue-300 font-semibold text-xs'
                }`}
              >
                <div className="truncate">{v.name}</div>
                <div className="text-[10px] opacity-80">₹{Math.round(v.avgPricePerSqYd / 1000)}k/yd</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
