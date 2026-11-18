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
  Sparkles,
  Map,
  ShieldCheck,
  TrendingUp
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
    <div className="relative bg-gradient-to-b from-sky-100 via-blue-50 to-sky-100/70 text-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-blue-200/80">
      {/* Background Bright Decorative Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Top Copy with BOLD, BRIGHT, ULTRA-VISIBLE COLORS */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs sm:text-sm font-black mb-4 shadow-md shadow-blue-500/20 ring-2 ring-white">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Dedicated Amaravati Land & Plot Intelligence</span>
          </div>

          {/* Main Headline: Deep Crisp Navy + Bright Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-950 mb-4 leading-tight drop-shadow-sm">
            Find the Right Plot in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 underline decoration-amber-400 decoration-wavy decoration-2">
              Amaravati
            </span>
            .
          </h1>

          {/* Supporting Copy: Dark Slate for Crystal Readability */}
          <p className="text-base sm:text-lg font-medium text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore <strong className="text-blue-700 font-bold">residential</strong> and{' '}
            <strong className="text-amber-600 font-bold">commercial plots</strong> with detailed property information, map discovery, and smarter property comparisons.
          </p>

          {/* High-Impact Action Buttons with Bright Vivid Colors */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
            {/* Explore Plots */}
            <Link
              to="/buy"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/35 ring-4 ring-blue-200/80 transition-all flex items-center gap-2 group hover:-translate-y-0.5"
            >
              <span>Explore Plots</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Sell Your Plot */}
            <Link
              to="/sell"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm sm:text-base shadow-lg shadow-amber-500/35 ring-4 ring-amber-200/80 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Your Plot</span>
            </Link>

            {/* APCRDA GIS Map Button */}
            <Link
              to="/map"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-200/80 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Map className="w-4 h-4 text-emerald-200" />
              <span>APCRDA GIS Map</span>
            </Link>
          </div>
        </div>

        {/* Advanced Search Panel Card with Bright & Grand Accents */}
        <div className="bg-white text-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-blue-200 max-w-5xl mx-auto ring-8 ring-blue-100/50">
          <div className="flex items-center justify-between border-b-2 border-blue-100 pb-3 mb-5">
            <div className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-wider">
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <span className="text-sm">Advanced Amaravati Plot Search</span>
            </div>
            <div className="text-xs text-blue-800 font-bold hidden sm:flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Filter by APCRDA LPS Code, Facing & Road Width</span>
            </div>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              {/* Plot Code Input */}
              <div>
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                  <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>APCRDA / LPS Plot Code</span>
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. LPS-THU-R-0412"
                    value={plotCode}
                    onChange={(e) => setPlotCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Village */}
              <div>
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Amaravati Village</span>
                </label>
                <select
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                >
                  <option value="All">All Amaravati Villages</option>
                  {amaravatiVillages.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Plot Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                >
                  <option value="All">All Categories (Residential & Commercial)</option>
                  <option value="Residential Plot">Residential Plots</option>
                  <option value="Commercial Plot">Commercial Plots</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  <span>Budget Range</span>
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
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
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5">
                  Plot Size (Sq. Yards)
                </label>
                <select
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
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
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-teal-600" />
                  <span>Facing Preference</span>
                </label>
                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
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

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-slate-100">
              <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live pooled returnable plots updated daily across 10+ core Amaravati villages</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-9 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/40 transition-all hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties Now</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
