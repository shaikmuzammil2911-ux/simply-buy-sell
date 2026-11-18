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
  Info,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { amaravatiVillages } from '../data/mockData';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function VillageExplorer() {
  const { properties } = useApp();
  const { village } = useParams();
  const normalizedVillage = village ? village.toLowerCase() : 'nelapadu';

  const villageInfo =
    amaravatiVillages.find((v) => v.name.toLowerCase() === normalizedVillage) ||
    amaravatiVillages.find((v) => v.name.toLowerCase() === 'nelapadu') ||
    amaravatiVillages[0];

  // Plots in this village
  const villagePlots = properties.filter(
    (p) => p.village?.toLowerCase() === villageInfo.name.toLowerCase()
  );

  // Other nearby/featured plots if this village has few
  const otherPlots = properties.filter(
    (p) => p.village?.toLowerCase() !== villageInfo.name.toLowerCase()
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 pt-3 sm:pt-5 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-semibold">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/market-insights" className="hover:text-blue-600">Amaravati Villages</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-navy-950 font-black">{villageInfo.name}</span>
        </div>

        {/* Village Hero Card with Ultra-Vivid Contrast & Backdrop Image */}
        <div className="relative rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 overflow-hidden bg-[#060E1A] border-2 border-navy-800 text-white">
          {/* High-res background photo with dark executive tint */}
          <img
            src={villageInfo.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'}
            alt={villageInfo.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.32] contrast-125 saturate-110 pointer-events-none"
          />
          {/* Multi-layered dark navy vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060E1A]/95 via-[#0B192C]/90 to-[#060E1A]/85 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              {/* Theme City Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-wider mb-3 shadow-md ring-1 ring-white/30">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{villageInfo.themeCity}</span>
              </div>

              {/* Main Headline — Crisp Pure White with Drop Shadow */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-md">
                {villageInfo.name}, Amaravati
              </h1>

              {/* Description — Readable Bright Off-White */}
              <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed drop-shadow-sm max-w-xl">
                {villageInfo.description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-bold text-amber-300">
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  APCRDA Cadastral Grid Verified
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Clear Freehold Allotments
                </span>
              </div>
            </div>

            {/* Average Asking Rate Panel */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 bg-[#0B192C]/90 backdrop-blur-md p-5 rounded-2xl border-2 border-white/20 shrink-0 shadow-2xl">
              <div>
                <div className="text-[11px] text-blue-200 uppercase font-black tracking-wider">Average Asking Rate</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 drop-shadow mt-0.5">
                  ₹{villageInfo.avgPricePerSqYd.toLocaleString('en-IN')}
                  <span className="text-xs font-semibold text-white/90"> / sq.yd</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                  Range: {villageInfo.priceRange}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/map?village=${encodeURIComponent(villageInfo.name)}`}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all hover:scale-105"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Open GIS Map</span>
                </Link>
                <Link
                  to="/plot-intelligence"
                  className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Intelligence</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Plots Available in this village */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black text-navy-950">
                Available Plots in {villageInfo.name} ({villagePlots.length})
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Directly pooled LPS residential and commercial allotments with verified cadastral codes
              </p>
            </div>
            <Link to="/buy" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>View All Amaravati Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {villagePlots.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border-2 border-dashed border-blue-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <Info className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="font-extrabold text-navy-950 text-base">New Inventory Coming Soon to {villageInfo.name}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We are currently verifying new LPS returnable allotments in {villageInfo.name}. In the meantime, explore verified listings in adjacent capital villages below.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/sell"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-xs shadow-md"
                >
                  <span>List a Plot in {villageInfo.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-black text-navy-950">
              Explore Other Amaravati Capital Region Villages
            </h3>
            <Link to="/map" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>View On GIS Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {amaravatiVillages.map((v) => (
              <Link
                key={v.id}
                to={`/locations/${v.name.toLowerCase()}`}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  v.name.toLowerCase() === villageInfo.name.toLowerCase()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                    : 'bg-slate-50 border-slate-200 text-navy-900 hover:bg-blue-50/60 hover:border-blue-300 font-semibold text-xs'
                }`}
              >
                <div className="truncate font-bold">{v.name}</div>
                <div className="text-[10px] opacity-80 mt-0.5">₹{Math.round(v.avgPricePerSqYd / 1000)}k/yd</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
