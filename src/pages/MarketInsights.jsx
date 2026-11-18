import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  BarChart3,
  MapPin,
  Building,
  ShieldAlert,
  ArrowUpRight,
  Info,
  Layers,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { amaravatiVillages } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function MarketInsights() {
  const { properties } = useApp();
  const [selectedVillageFilter, setSelectedVillageFilter] = useState('All');

  // Compute aggregate metrics
  const residentialPlots = properties.filter((p) => p.category === 'Residential Plot');
  const commercialPlots = properties.filter((p) => p.category === 'Commercial Plot');

  const avgResRate = Math.round(
    residentialPlots.reduce((acc, p) => acc + (p.pricePerSqYd || 0), 0) / (residentialPlots.length || 1)
  );
  const avgComRate = Math.round(
    commercialPlots.reduce((acc, p) => acc + (p.pricePerSqYd || 0), 0) / (commercialPlots.length || 1)
  );

  const displayedVillages = selectedVillageFilter === 'All'
    ? amaravatiVillages
    : amaravatiVillages.filter((v) => v.name === selectedVillageFilter);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Amaravati Real Estate Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight mb-2">
            Amaravati Plot Market Intelligence & Rates
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Live market benchmark rates, village price variations, and APCRDA land pooling trend indicators across the Capital Region.
          </p>
        </div>

        {/* Aggregate KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Residential Plot Benchmark
            </div>
            <div className="text-2xl font-black text-navy-950 mb-1">
              ₹{avgResRate.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-500"> / sq.yd</span>
            </div>
            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Advertised asking average</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Commercial Plot Benchmark
            </div>
            <div className="text-2xl font-black text-navy-950 mb-1">
              ₹{avgComRate.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-500"> / sq.yd</span>
            </div>
            <div className="text-xs text-amber-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Prime arterial frontage</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Pooled LPS Villages
            </div>
            <div className="text-2xl font-black text-navy-950 mb-1">
              {amaravatiVillages.length}
              <span className="text-xs font-normal text-slate-500"> Capital Zones</span>
            </div>
            <div className="text-xs text-blue-600 font-semibold">
              From Thullur to Mandadam
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Typical Plot Sizes
            </div>
            <div className="text-2xl font-black text-navy-950 mb-1">
              200 - 1000
              <span className="text-xs font-normal text-slate-500"> Sq. Yds</span>
            </div>
            <div className="text-xs text-indigo-600 font-semibold">
              APCRDA Standard Grid
            </div>
          </div>
        </div>

        {/* Village-by-Village Asking Rates Benchmark */}
        <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-navy-950">
                Village-Wise Asking Rate Benchmark (₹ / Sq. Yard)
              </h2>
              <p className="text-xs text-slate-500">
                Comparative indicative asking rates across major Amaravati Land Pooling Scheme (LPS) villages
              </p>
            </div>

            <select
              value={selectedVillageFilter}
              onChange={(e) => setSelectedVillageFilter(e.target.value)}
              className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All 10+ Villages</option>
              {amaravatiVillages.map((v) => (
                <option key={v.id} value={v.name}>{v.name}</option>
              ))}
            </select>
          </div>

          {/* Visual Bar Distribution */}
          <div className="space-y-4 mb-8">
            {displayedVillages.map((v) => {
              const maxRate = 50000;
              const fillPercent = Math.min(100, Math.round((v.avgPricePerSqYd / maxRate) * 100));
              return (
                <div key={v.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-navy-950">{v.name}</span>
                      <span className="text-[11px] text-blue-700 font-medium bg-blue-100/70 px-2 py-0.5 rounded-full">
                        {v.themeCity}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-navy-950">
                        ₹{v.avgPricePerSqYd.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500"> / sq.yd avg</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="line-clamp-1 max-w-xl">{v.description}</span>
                    <Link
                      to={`/locations/${v.name.toLowerCase()}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold shrink-0 ml-2 flex items-center gap-0.5"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Amaravati Development Zones Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold mb-2">Government & Core Administrative Core</h3>
            <p className="text-xs text-blue-200 leading-relaxed mb-4">
              Villages like Velagapudi, Rayapudi, Mandadam and Nelapadu house the AP State Secretariat, High Court of Andhra Pradesh, and Assembly buildings. Plots fronting the Seed Access Road command premium valuation with high institutional security.
            </p>
            <div className="flex gap-2">
              <Link to="/map" className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
                View On GIS Map
              </Link>
              <Link to="/buy?type=residential" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold">
                Browse Core Plots
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold mb-2">Knowledge & Educational Corridors</h3>
            <p className="text-xs text-emerald-200 leading-relaxed mb-4">
              Villages like Kuragallu, Nekkallu, and Inavolu surround premier institutions including SRM University-AP, VIT-AP, and AIIMS Mangalagiri. These sectors see strong residential demand for plotted communities and rental student housing.
            </p>
            <div className="flex gap-2">
              <Link to="/buy?type=commercial" className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                Commercial Plots
              </Link>
              <Link to="/compare-plots" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold">
                Compare Plots
              </Link>
            </div>
          </div>
        </div>

        {/* Mandatory Statutory Disclaimer Banner (Phase 14) */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm text-amber-900">
              Mandatory Market Intelligence Pricing Disclaimer
            </div>
            <p className="text-slate-700 leading-relaxed">
              All prices, rates per square yard, and village medians presented on SimplyBuySell represent <strong>advertised asking prices</strong> submitted by verified plot owners and real estate representatives. They do not constitute official government registration values, Sub-Registrar Office (SRO) market values, or certified stamp duty assessments. Transaction values may vary based on specific plot orientation, physical road frontage width (18m, 24m, 45m+), corner premiums, and bilateral seller negotiations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
