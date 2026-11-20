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
  ShieldCheck,
  TrendingUp,
  Layers,
  Building,
  Info
} from 'lucide-react';
import { amaravatiVillages } from '../data/mockData';

export default function PlotHeroSearch() {
  const navigate = useNavigate();

  // Primary Location & Property Type Selectors
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Guntur');
  const [propertyType, setPropertyType] = useState('APCRDA / LPS Plot');
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Detailed Filter States (matching customer sell form fields)
  const [plotCode, setPlotCode] = useState('');
  const [village, setVillage] = useState('All');
  const [facing, setFacing] = useState('All');
  const [roadWidth, setRoadWidth] = useState('All');
  const [plotSize, setPlotSize] = useState('All');
  const [budget, setBudget] = useState('All');

  const handlePropertyTypeChange = (e) => {
    const val = e.target.value;
    setPropertyType(val);
    if (val !== 'APCRDA / LPS Plot') {
      setShowComingSoon(true);
    } else {
      setShowComingSoon(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (propertyType !== 'APCRDA / LPS Plot') {
      setShowComingSoon(true);
      return;
    }

    const params = new URLSearchParams();
    if (plotCode.trim()) params.append('q', plotCode.trim());
    if (village !== 'All') params.append('village', village);
    if (facing !== 'All') params.append('facing', facing);
    if (roadWidth !== 'All') params.append('road', roadWidth);
    if (plotSize !== 'All') params.append('size', plotSize);
    if (budget !== 'All') params.append('price', budget);
    params.append('category', 'lps_plots');

    navigate(`/buy?${params.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-b from-sky-100 via-blue-50 to-sky-100/70 text-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-blue-200/80">
      {/* Background Bright Decorative Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Top Copy */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs sm:text-sm font-black mb-4 shadow-md shadow-blue-500/20 ring-2 ring-white">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Connecting Buyers & Sellers Across Locations</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-navy-950 mb-4 leading-tight drop-shadow-sm">
            Find the Right Property.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 underline decoration-amber-400 decoration-wavy decoration-2">
              Buy, Sell & Invest with Confidence.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg font-medium text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore residential plots, commercial properties, houses, apartments and more across multiple locations. Discover the right property with information that helps you make informed decisions.
          </p>

          {/* 3 Common Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
            {/* 1. Buy Property */}
            <Link
              to="/buy"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/35 ring-4 ring-blue-200/80 transition-all flex items-center gap-2 group hover:-translate-y-0.5"
            >
              <span>Buy Property</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* 2. Sell Property - High Vibrancy Eye-Catching Color */}
            <Link
              to="/sell"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/35 ring-4 ring-orange-200/80 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 text-amber-100" />
              <span>Sell Property</span>
            </Link>

            {/* 3. Buyers Choice */}
            <Link
              to="/buyers-choice"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-200/80 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Buyers Choice</span>
            </Link>
          </div>
        </div>

        {/* Find Your Perfect Property - Advanced Search Panel Card */}
        <div className="bg-white text-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-blue-200 max-w-5xl mx-auto ring-8 ring-blue-100/50">
          <div className="flex items-center justify-between border-b-2 border-blue-100 pb-3 mb-5">
            <div className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-wider">
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <span className="text-sm font-extrabold">Find Your Perfect Property</span>
            </div>
            <div className="text-xs text-blue-800 font-bold hidden sm:flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Filter by State, District, Property Type & Details</span>
            </div>
          </div>

          <form onSubmit={handleSearch}>
            {/* Primary Row: State, District, Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border border-blue-100">
              {/* State */}
              <div>
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5">
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana (Coming Soon)</option>
                  <option value="Karnataka">Karnataka (Coming Soon)</option>
                  <option value="All India">All India</option>
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5">
                  District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="Guntur">Guntur (Amaravati Capital Region)</option>
                  <option value="NTR">NTR District / Vijayawada</option>
                  <option value="Krishna">Krishna District</option>
                  <option value="All">All Districts</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-black text-navy-950 uppercase mb-1.5">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={handlePropertyTypeChange}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-blue-500 text-xs font-black bg-white text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="APCRDA / LPS Plot">APCRDA / LPS Plot (Available Now)</option>
                  <option value="Apartment Flats">Apartment Flats (Coming Soon)</option>
                  <option value="Open Plots">Open Plots (Coming Soon)</option>
                  <option value="Houses">Houses (Coming Soon)</option>
                  <option value="Villas">Villas (Coming Soon)</option>
                  <option value="Agricultural Lands">Agricultural Lands (Coming Soon)</option>
                  <option value="Commercial Properties">Commercial Properties (Coming Soon)</option>
                </select>
              </div>
            </div>

            {/* Coming Soon Alert Pill */}
            {showComingSoon && (
              <div className="mb-5 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between text-xs text-amber-900 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Coming Soon!</strong> Listings for <strong>{propertyType}</strong> are currently being onboarded across India. Switch to <strong>APCRDA / LPS Plot</strong> to explore verified live inventory today.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPropertyType('APCRDA / LPS Plot');
                    setShowComingSoon(false);
                  }}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shrink-0 ml-3"
                >
                  View APCRDA Plots
                </button>
              </div>
            )}

            {/* APCRDA / LPS Plot Specific Filters (Matching Seller Form Fields) */}
            {propertyType === 'APCRDA / LPS Plot' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 animate-fade-in">
                {/* 1. APCRDA / LPS Plot Code */}
                <div>
                  <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>APCRDA / LPS Plot Code</span>
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. 27-814-4042 or LPS-THU-R-0412"
                      value={plotCode}
                      onChange={(e) => setPlotCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* 2. Village */}
                <div>
                  <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Amaravati Village</span>
                  </label>
                  <select
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="All">All Amaravati Villages (29)</option>
                    {amaravatiVillages.map((v) => (
                      <option key={v.slug || v.id} value={v.name}>{v.name} ({v.zone || 'Amaravati'})</option>
                    ))}
                  </select>
                </div>

                {/* 3. Facing Direction */}
                <div>
                  <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-teal-600" />
                    <span>Facing Direction</span>
                  </label>
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="All">Any Facing</option>
                    <option value="East">East Facing</option>
                    <option value="North">North Facing</option>
                    <option value="West">West Facing</option>
                    <option value="South">South Facing</option>
                    <option value="North-East">North-East Corner</option>
                    <option value="South-East">South-East Corner</option>
                  </select>
                </div>

                {/* 4. Road Width (Meters) */}
                <div>
                  <label className="block text-xs font-black text-navy-950 uppercase mb-1.5">
                    Road Width (Meters)
                  </label>
                  <select
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="All">Any Road Width</option>
                    <option value="12">12 Meters</option>
                    <option value="18">18 Meters</option>
                    <option value="24">24 Meters</option>
                    <option value="30">30 Meters</option>
                    <option value="60">60+ Meters (Arterial)</option>
                  </select>
                </div>

                {/* 5. Plot Size (Sq. Yards) */}
                <div>
                  <label className="block text-xs font-black text-navy-950 uppercase mb-1.5">
                    Plot Size (Sq. Yards)
                  </label>
                  <select
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="All">Any Size</option>
                    <option value="under-200">100 – 200 sq.yd (Compact)</option>
                    <option value="200-300">200 – 300 sq.yd (Standard)</option>
                    <option value="300-500">300 – 500 sq.yd (Large)</option>
                    <option value="above-500">500+ sq.yd (Commercial / Estate)</option>
                  </select>
                </div>

                {/* 6. Budget / Price per Sq.Yd */}
                <div>
                  <label className="block text-xs font-black text-navy-950 uppercase mb-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                    <span>Price / Sq.Yd Range</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold bg-slate-50 text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="All">Any Price</option>
                    <option value="under-25k">Under ₹25,000 / sq.yd</option>
                    <option value="25k-35k">₹25,000 – ₹35,000 / sq.yd</option>
                    <option value="35k-50k">₹35,000 – ₹50,000 / sq.yd</option>
                    <option value="above-50k">₹50,000+ / sq.yd</option>
                  </select>
                </div>
              </div>
            )}

            {/* Search Property Now Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t-2 border-blue-100">
              <span className="text-xs font-bold text-slate-500 text-center sm:text-left">
                Verified database with APCRDA layout records and direct seller screening.
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-blue-600/30 ring-4 ring-blue-100 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Property Now</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
