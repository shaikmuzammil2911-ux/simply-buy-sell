import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Tag,
  Compass,
  ArrowRight,
  SlidersHorizontal,
  PlusCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { amaravatiVillages } from '../data/mockData';

export default function PlotHeroSearch() {
  const navigate = useNavigate();

  const [plotCode, setPlotCode] = useState('');
  const [village, setVillage] = useState('All');
  const [category, setCategory] = useState('All');
  const [budget, setBudget] = useState('All');
  const [plotSize, setPlotSize] = useState('All');
  const [facing, setFacing] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (plotCode.trim()) params.append('q', plotCode.trim());
    if (village !== 'All') params.append('village', village);
    if (category !== 'All') params.append('category', category);
    if (budget !== 'All') params.append('price', budget);
    if (facing !== 'All') params.append('facing', facing);

    navigate(`/buy?${params.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-b from-navy-950 via-blue-950 to-navy-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Grid & Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Top Copy */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Dedicated Amaravati Land & Plot Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Find the Right Plot in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300">Amaravati</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore residential and commercial plots with detailed property information, map discovery and smarter property comparisons.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              to="/buy"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group"
            >
              <span>Explore Plots</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/sell"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Your Plot</span>
            </Link>

            <Link
              to="/map"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-sky-300" />
              <span>APCRDA GIS Map</span>
            </Link>
          </div>
        </div>

        {/* Advanced Search Panel Card */}
        <div className="bg-white/95 backdrop-blur-xl text-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl border border-blue-100 max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Advanced Amaravati Plot Search</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Filter by APCRDA LPS Code, Facing & Road Width
            </div>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {/* Plot Code Input */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  APCRDA / LPS Plot Code
                </label>
                <div className="relative">
                  <FileCheck2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. LPS-THU-R-0412"
                    value={plotCode}
                    onChange={(e) => setPlotCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Village */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Amaravati Village
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Amaravati Villages</option>
                    {amaravatiVillages.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Plot Category
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="Residential Plot">Residential Plots</option>
                    <option value="Commercial Plot">Commercial Plots</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">Any Budget</option>
                  <option value="under-50">Under ₹50 Lakhs</option>
                  <option value="50-100">₹50 Lakhs – ₹1 Crore</option>
                  <option value="100-200">₹1 Crore – ₹2 Crores</option>
                  <option value="above-200">₹2 Crores+</option>
                </select>
              </div>

              {/* Plot Size */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Plot Size (Sq. Yards)
                </label>
                <select
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">Any Size</option>
                  <option value="under-250">Under 250 sq.yd</option>
                  <option value="250-500">250 – 500 sq.yd</option>
                  <option value="500-1000">500 – 1000 sq.yd</option>
                  <option value="above-1000">1000+ sq.yd</option>
                </select>
              </div>

              {/* Facing */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Facing Preference
                </label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">Any Facing</option>
                    <option value="East">East Facing</option>
                    <option value="North">North Facing</option>
                    <option value="West">West Facing</option>
                    <option value="South">South Facing</option>
                    <option value="North-East">North-East Facing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500">
                Direct access to pooled returnable residential and commercial land parcels.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
