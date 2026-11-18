import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  MapPin,
  Map,
  Tag,
  Maximize2,
  Compass,
  LayoutGrid,
  List,
  Filter,
  Building2,
  Home,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  ShieldCheck,
  Phone,
  MessageCircle,
  ExternalLink,
  Lock,
  Unlock,
  CheckCircle2,
  Calendar,
  DollarSign,
  TrendingUp,
  FileCheck2,
  Eye,
  Mail,
  KeyRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages, propertyCategories } from '../data/mockData';

export default function BuyProperty() {
  const { properties, addToCompare, removeFromCompare, isInCompare, getWhatsAppLink, showToast } = useApp();
  const [searchParams] = useSearchParams();

  // Primary State/District/Type dropdowns from image copy 8
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Amaravati / Guntur');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('All');

  // Sub-category Navigation Tabs (as shown in image copy 8)
  const categoryTabs = [
    { id: 'all', label: 'All Properties' },
    { id: 'lps_plots', label: 'Amaravathi LPS Plots' },
    { id: '2nd_pooling', label: '2nd Pooling Lands' },
    { id: 'ravela_airport', label: 'Near Ravela Airport / Amaravathi Lands' },
    { id: 'apartments', label: 'Apartment Flats' },
    { id: 'open_plots', label: 'Open Plots' },
  ];
  const [activeTab, setActiveTab] = useState(searchParams.get('category') || 'lps_plots');

  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedVillage, setSelectedVillage] = useState(searchParams.get('village') || 'All');
  const [plotType, setPlotType] = useState('All'); // All | Residential | Commercial
  const [selectedFacing, setSelectedFacing] = useState('All');
  const [selectedRoadWidth, setSelectedRoadWidth] = useState('All');
  const [minPricePerSqYd, setMinPricePerSqYd] = useState('');
  const [maxPricePerSqYd, setMaxPricePerSqYd] = useState('');
  const [minAreaSqYd, setMinAreaSqYd] = useState('');
  const [maxAreaSqYd, setMaxAreaSqYd] = useState('');
  const [cornerOnly, setCornerOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Selected plot for Right Sticky Details Panel (default to first matching plot)
  const [selectedPlotId, setSelectedPlotId] = useState(null);

  // Carousel image index for details panel
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Email + OTP Verification Gate
  const [isOtpVerified, setIsOtpVerified] = useState(() => {
    return localStorage.getItem('sbs_otp_verified') === 'true';
  });
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState(() => localStorage.getItem('sbs_auth_email') || '');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // Mobile Filters Drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter Engine
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Category Tab filter
      if (activeTab === 'lps_plots') {
        const isLps = p.propertyCategory === 'lps_plots' || (!p.propertyCategory && (p.category?.includes('Plot') || p.type === 'Plots'));
        if (!isLps) return false;
      } else if (activeTab === '2nd_pooling') {
        const is2nd = (p.tags && p.tags.includes('2nd Pooling')) || (p.title && p.title.includes('2nd Pooling')) || p.locality?.includes('Phase 2');
        if (!is2nd && p.propertyCategory !== 'lps_plots') return false;
      } else if (activeTab === 'ravela_airport') {
        const isAirport = (p.tags && p.tags.includes('Airport')) || (p.village && ['Ravela', 'Tadikonda', 'Medikonduru'].includes(p.village));
        if (!isAirport && p.propertyCategory !== 'open_plots') return false;
      } else if (activeTab === 'apartments') {
        const isApt = p.propertyCategory === 'apartments' || p.type === 'Flats';
        if (!isApt) return false;
      } else if (activeTab === 'open_plots') {
        const isOpen = p.propertyCategory === 'open_plots' || p.type === 'Open Plots';
        if (!isOpen) return false;
      }

      // Dropdown property type filter
      if (propertyTypeFilter !== 'All') {
        if (propertyTypeFilter === 'Residential' && !p.category?.toLowerCase().includes('residential')) return false;
        if (propertyTypeFilter === 'Commercial' && !p.category?.toLowerCase().includes('commercial')) return false;
      }

      // Left sidebar filters
      if (plotType !== 'All') {
        if (plotType === 'Residential' && !p.category?.toLowerCase().includes('residential')) return false;
        if (plotType === 'Commercial' && !p.category?.toLowerCase().includes('commercial')) return false;
      }

      if (selectedVillage !== 'All' && p.village?.toLowerCase() !== selectedVillage.toLowerCase()) {
        return false;
      }

      if (selectedFacing !== 'All' && !p.facing?.toLowerCase().includes(selectedFacing.toLowerCase())) {
        return false;
      }

      if (selectedRoadWidth !== 'All') {
        const rw = String(p.roadWidth || p.roadWidthFt || '');
        if (!rw.includes(selectedRoadWidth)) return false;
      }

      if (cornerOnly && !p.cornerPlot && !p.isCorner) {
        return false;
      }

      // Price per sq.yd filter
      const pPricePerSqYd = p.pricePerSqYd || (p.plotSizeSqYd ? Math.round(p.price / p.plotSizeSqYd) : 0);
      if (minPricePerSqYd && pPricePerSqYd < Number(minPricePerSqYd)) return false;
      if (maxPricePerSqYd && pPricePerSqYd > Number(maxPricePerSqYd)) return false;

      // Area filter
      const pArea = p.plotSizeSqYd || p.extentSqYds || p.area || 0;
      if (minAreaSqYd && pArea < Number(minAreaSqYd)) return false;
      if (maxAreaSqYd && pArea > Number(maxAreaSqYd)) return false;

      // Text search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const code = (p.plotCode || p.apcrdaPlotCode || p.id || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        const vill = (p.village || '').toLowerCase();
        if (!code.includes(q) && !title.includes(q) && !vill.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'size_desc') return (b.plotSizeSqYd || 0) - (a.plotSizeSqYd || 0);
      return 0; // default newest
    });
  }, [
    properties,
    activeTab,
    propertyTypeFilter,
    plotType,
    selectedVillage,
    selectedFacing,
    selectedRoadWidth,
    cornerOnly,
    minPricePerSqYd,
    maxPricePerSqYd,
    minAreaSqYd,
    maxAreaSqYd,
    searchTerm,
    sortBy
  ]);

  // Set default selected plot on data change
  useEffect(() => {
    if (filteredProperties.length > 0) {
      if (!selectedPlotId || !filteredProperties.find((p) => p.id === selectedPlotId)) {
        setSelectedPlotId(filteredProperties[0].id);
        setActiveImageIndex(0);
      }
    } else {
      setSelectedPlotId(null);
    }
  }, [filteredProperties]);

  const selectedPlot = useMemo(() => {
    return properties.find((p) => p.id === selectedPlotId) || filteredProperties[0] || null;
  }, [properties, selectedPlotId, filteredProperties]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedVillage('All');
    setPlotType('All');
    setSelectedFacing('All');
    setSelectedRoadWidth('All');
    setMinPricePerSqYd('');
    setMaxPricePerSqYd('');
    setMinAreaSqYd('');
    setMaxAreaSqYd('');
    setCornerOnly(false);
  };

  // Handle OTP Actions
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!authEmail || !authEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpSent(true);
      setOtpLoading(false);
      showToast('OTP Sent', `Verification code sent to ${authEmail}. (Demo code: ${code})`, 'info');
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === generatedOtp || enteredOtp === '1234') {
      setIsOtpVerified(true);
      localStorage.setItem('sbs_otp_verified', 'true');
      localStorage.setItem('sbs_auth_email', authEmail);
      setOtpModalOpen(false);
      showToast('Verified!', 'Property contact details unlocked successfully.', 'success');
    } else {
      alert('Incorrect OTP! Please enter the code shown in the notification or try demo code 1234.');
    }
  };

  // Nearby development distances calculation
  const nearbyDevelopments = [
    { name: 'AP Secretariat & Assembly', dist: '2.4 km', time: '5 mins', status: 'Operational' },
    { name: 'High Court of Andhra Pradesh', dist: '3.1 km', time: '7 mins', status: 'Operational' },
    { name: 'Seed Access Road (E3/E4 Corridor)', dist: '400 m', time: '1 min', status: 'Active 6-Lane' },
    { name: 'AIIMS Mangalagiri Hospital', dist: '7.8 km', time: '14 mins', status: 'Operational' },
    { name: 'VIT-AP University Campus', dist: '6.2 km', time: '11 mins', status: 'Operational' },
    { name: 'SRM University Amaravati', dist: '5.5 km', time: '10 mins', status: 'Operational' }
  ];

  // Carousel controls
  const plotImages = selectedPlot?.images?.length ? selectedPlot.images : [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1000&q=80'
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % plotImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? plotImages.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16">
      {/* 1. TOP HEADER BANNER (From image copy 8) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Amaravati Land & Plot Marketplace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Buy / Sell Property
            </h1>
            <p className="text-blue-100 text-sm sm:text-base mt-1 max-w-xl">
              List your property or find the right one with trust, verified APCRDA plot codes, and transparent pricing.
            </p>
          </div>

          {/* Quick Mode Toggle Switch */}
          <div className="flex items-center gap-2 bg-blue-900/60 p-1.5 rounded-2xl border border-white/20 shrink-0">
            <Link
              to="/buy"
              className="px-5 py-2.5 rounded-xl bg-white text-blue-800 font-black text-sm shadow-md flex items-center gap-2 transition-all"
            >
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Buy</span>
            </Link>
            <Link
              to="/sell"
              className="px-5 py-2.5 rounded-xl text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4 text-amber-300" />
              <span>Sell</span>
            </Link>
            <Link
              to="/buyers-choice"
              className="px-5 py-2.5 rounded-xl text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Buyers Choice</span>
            </Link>
          </div>
        </div>

        {/* State / District / Property Type Dropdowns Row */}
        <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* State */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-blue-200 uppercase mb-1">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl px-4 py-2.5 border border-white/25 focus:ring-2 focus:ring-white/40 focus:outline-none cursor-pointer"
            >
              <option value="Andhra Pradesh" className="text-slate-800">Andhra Pradesh</option>
            </select>
          </div>

          {/* District */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-blue-200 uppercase mb-1">District / Region</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl px-4 py-2.5 border border-white/25 focus:ring-2 focus:ring-white/40 focus:outline-none cursor-pointer"
            >
              <option value="Amaravati / Guntur" className="text-slate-800">Amaravati / Guntur</option>
              <option value="NTR District / Vijayawada" className="text-slate-800">NTR District / Vijayawada</option>
            </select>
          </div>

          {/* Property Type Dropdown */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-blue-200 uppercase mb-1">Property Type</label>
            <select
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl px-4 py-2.5 border border-white/25 focus:ring-2 focus:ring-white/40 focus:outline-none cursor-pointer"
            >
              <option value="All" className="text-slate-800">All Categories</option>
              <option value="Residential" className="text-slate-800">Residential Plot</option>
              <option value="Commercial" className="text-slate-800">Commercial Plot</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. SUB-CATEGORY TABS BAR (From image copy 8) */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN 3-COLUMN LAYOUT (Filters - Listings - Live Sticky Details) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
          >
            <Filter className="w-4 h-4" />
            <span>Filter Plots ({filteredProperties.length})</span>
          </button>
          <span className="text-xs font-bold text-slate-500">
            Showing {filteredProperties.length} Properties
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: LEFT FILTER SIDEBAR (lg:col-span-3) */}
          <div className="hidden lg:block lg:col-span-3 space-y-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 font-black text-navy-950 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Property Type Radio Pills */}
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Property Type</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                  {['All', 'Residential', 'Commercial'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPlotType(type)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        plotType === type ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Village / Zone Selector */}
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Amaravati Village</label>
                <select
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Amaravati Villages (29)</option>
                  {amaravatiVillages.map((v) => (
                    <option key={v.slug} value={v.name}>{v.name} ({v.zone || 'Amaravati'})</option>
                  ))}
                </select>
              </div>

              {/* Facing Direction */}
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Facing</label>
                <select
                  value={selectedFacing}
                  onChange={(e) => setSelectedFacing(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* Road Width */}
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Road Width (Meters)</label>
                <select
                  value={selectedRoadWidth}
                  onChange={(e) => setSelectedRoadWidth(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">Any Road Width</option>
                  <option value="12">12 Meters</option>
                  <option value="18">18 Meters</option>
                  <option value="24">24 Meters</option>
                  <option value="30">30 Meters</option>
                  <option value="60">60+ Meters (Arterial)</option>
                </select>
              </div>

              {/* Price Per Sq.Yd Min/Max */}
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Price / Sq.Yd (₹)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={minPricePerSqYd}
                    onChange={(e) => setMinPricePerSqYd(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={maxPricePerSqYd}
                    onChange={(e) => setMaxPricePerSqYd(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Plot Area Min/Max */}
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Plot Area (Sq.Yds)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min sq.yd"
                    value={minAreaSqYd}
                    onChange={(e) => setMinAreaSqYd(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max sq.yd"
                    value={maxAreaSqYd}
                    onChange={(e) => setMaxAreaSqYd(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Corner Plot Only Toggle */}
              <label className="flex items-center gap-2 cursor-pointer pt-2 border-t border-slate-100">
                <input
                  type="checkbox"
                  checked={cornerOnly}
                  onChange={(e) => setCornerOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-700">Corner Plots Only</span>
              </label>
            </div>
          </div>

          {/* COLUMN 2: CENTER PLOT LISTING CARDS (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Search Input & Sort Selector */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 ml-2" />
              <input
                type="text"
                placeholder="Search Plot Code (e.g. 27-814-4042) or Village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none shrink-0"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="size_desc">Area: Largest First</option>
              </select>
            </div>

            {/* Results count indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
              <span>Showing {filteredProperties.length} verified listings</span>
              {selectedPlot && (
                <span className="text-blue-700 font-extrabold lg:hidden">
                  Tap card to view specs below
                </span>
              )}
            </div>

            {/* Card Listings */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                <Compass className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-sm">No Properties Found</h3>
                <p className="text-xs text-slate-500 mt-1">Try relaxing your filter criteria or search by another village.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProperties.map((plot) => {
                  const isSelected = selectedPlot?.id === plot.id;
                  const priceSqYd = plot.pricePerSqYd || (plot.plotSizeSqYd ? Math.round(plot.price / plot.plotSizeSqYd) : 28000);
                  const plotCodeDisplay = plot.apcrdaPlotCode || plot.plotCode || `SBS-${plot.id?.slice(0, 6)}`;

                  return (
                    <div
                      key={plot.id}
                      onClick={() => {
                        setSelectedPlotId(plot.id);
                        setActiveImageIndex(0);
                      }}
                      className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer relative overflow-hidden group hover:shadow-md ${
                        isSelected
                          ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-md bg-blue-50/20'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {/* Active Indicator Strip */}
                      {isSelected && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {/* Plot Code & Verified Badge */}
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                              Plot Code: {plotCodeDisplay}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>APCRDA Verified</span>
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-1">
                            {plot.title}
                          </h4>

                          {/* Location */}
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{plot.village}, Amaravati Capital Region</span>
                          </div>
                        </div>

                        {/* Price Display */}
                        <div className="text-right shrink-0">
                          <div className="text-sm sm:text-base font-black text-slate-900">
                            ₹{(plot.price ? (plot.price >= 10000000 ? `${(plot.price / 10000000).toFixed(2)} Cr` : `${(plot.price / 100000).toFixed(1)} Lakhs`) : 'Price on Request')}
                          </div>
                          <div className="text-[11px] font-bold text-blue-700">
                            ₹{priceSqYd.toLocaleString('en-IN')} / sq.yd
                          </div>
                        </div>
                      </div>

                      {/* Specs Row */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800">
                            {plot.plotSizeSqYd || plot.extentSqYds || 200} sq.yd
                          </span>
                          <span>•</span>
                          <span>{plot.facing || 'East'} Facing</span>
                          <span>•</span>
                          <span>{plot.roadWidth || '18M'} Road</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPlotId(plot.id);
                              setOtpModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Contact</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* COLUMN 3: RIGHT STICKY PROPERTY DETAILS PANEL (lg:col-span-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-16">
            {selectedPlot ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ring-4 ring-blue-50">
                {/* Header bar with Plot Code */}
                <div className="bg-gradient-to-r from-navy-950 to-blue-900 text-white p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                      Cadastral Plot Spec
                    </span>
                    <h3 className="font-black text-base text-white">
                      {selectedPlot.apcrdaPlotCode || selectedPlot.plotCode || `Plot Code: SBS-${selectedPlot.id?.slice(0, 6)}`}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Image Carousel with < 1/8 > slider (as in image copy 8) */}
                <div className="relative aspect-video bg-slate-900 group">
                  <img
                    src={plotImages[activeImageIndex]}
                    alt={selectedPlot.title}
                    className="w-full h-full object-cover transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Carousel Page Counter: < 1/8 > */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                    <button
                      onClick={prevImage}
                      className="hover:text-amber-300 p-0.5"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span>{activeImageIndex + 1} / {plotImages.length}</span>
                    <button
                      onClick={nextImage}
                      className="hover:text-amber-300 p-0.5"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Village Badge */}
                  <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-lg">
                    {selectedPlot.village}
                  </div>
                </div>

                {/* Spec Details Content */}
                <div className="p-5 space-y-4">
                  {/* Pricing Overview */}
                  <div className="flex items-baseline justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Asking Price</span>
                      <div className="text-xl font-black text-slate-900">
                        ₹{(selectedPlot.price ? (selectedPlot.price >= 10000000 ? `${(selectedPlot.price / 10000000).toFixed(2)} Cr` : `${(selectedPlot.price / 100000).toFixed(1)} Lakhs`) : 'Price on Request')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Rate / Sq.Yd</span>
                      <div className="text-sm font-black text-blue-700">
                        ₹{(selectedPlot.pricePerSqYd || (selectedPlot.plotSizeSqYd ? Math.round(selectedPlot.price / selectedPlot.plotSizeSqYd) : 28000)).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* 6-Metric Specification Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Plot Area</span>
                      <span className="font-extrabold text-slate-800">{selectedPlot.plotSizeSqYd || selectedPlot.extentSqYds || 200} Sq.Yds</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Facing</span>
                      <span className="font-extrabold text-slate-800">{selectedPlot.facing || 'East'}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Road Width</span>
                      <span className="font-extrabold text-slate-800">{selectedPlot.roadWidth || '18 Meters'}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Classification</span>
                      <span className="font-extrabold text-slate-800">{selectedPlot.category || 'Residential Plot'}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Sale Type</span>
                      <span className="font-extrabold text-slate-800">Resale / Clear Title</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Agreement Time</span>
                      <span className="font-extrabold text-slate-800">20 - 30 Days</span>
                    </div>
                  </div>

                  {/* Nearby Developments Table (Distance & Status) */}
                  <div className="border border-slate-200 rounded-2xl p-3 bg-gradient-to-b from-blue-50/40 to-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>Nearby Developments</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">Amaravati Core</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      {nearbyDevelopments.map((dev) => (
                        <div key={dev.name} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                          <span className="text-slate-700 font-medium line-clamp-1">{dev.name}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-black text-blue-700">{dev.dist}</span>
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">{dev.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GIS & Google Maps Links */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/map?id=${selectedPlot.id}&code=${selectedPlot.plotCode || selectedPlot.apcrdaPlotCode || ''}`}
                      className="py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 transition-colors"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>GIS Cadastral Map</span>
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedPlot.lat || 16.5412},${selectedPlot.lng || 80.4721}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                  </div>

                  {/* REQUEST PROPERTY CONTACT / OWNER DETAILS CTA */}
                  <div className="pt-2">
                    {isOtpVerified ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 space-y-3 animate-fade-in">
                        <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
                          <Unlock className="w-4 h-4 text-emerald-600" />
                          <span>Owner Details Unlocked</span>
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="font-bold text-slate-800">Direct Owner: S. Ramakrishna Rao</div>
                          <div className="text-slate-600 font-medium">Contact: +91 98480 23456</div>
                          <div className="text-slate-500 text-[10px]">Survey No: {selectedPlot.surveyNo || '68/1A'} • APCRDA Clear Title</div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={`tel:+919848023456`}
                            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call Owner</span>
                          </a>
                          <a
                            href={getWhatsAppLink(selectedPlot)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOtpModalOpen(true)}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 ring-4 ring-amber-100 transition-all hover:scale-[1.01]"
                      >
                        <Lock className="w-4 h-4 text-amber-100" />
                        <span>Request Property Contact (Login with OTP)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 4. EMAIL + OTP LOGIN MODAL (Required to unlock owner & contact details) */}
      {otpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setOtpModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-navy-950">
                Unlock Property Contact
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your email address to receive an instant verification OTP and view direct owner contact details.
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Your Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. investor@gmail.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={otpLoading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {otpLoading ? <span>Generating OTP...</span> : <span>Send Instant OTP</span>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                  <span className="font-bold">OTP Code sent to:</span> {authEmail}
                  <div className="text-[11px] text-amber-700 font-extrabold mt-1">
                    Demo Code: <span className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">{generatedOtp || '1234'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Enter 4-Digit OTP *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-black py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Verify OTP & Unlock Contact</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Change Email Address
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. MOBILE FILTERS DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-sm">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg bg-slate-100">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Village Selector */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">Village</label>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              >
                <option value="All">All Amaravati Villages</option>
                {amaravatiVillages.map((v) => (
                  <option key={v.slug} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Facing */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">Facing</label>
              <select
                value={selectedFacing}
                onChange={(e) => setSelectedFacing(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              >
                <option value="All">Any Facing</option>
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="West">West</option>
                <option value="South">South</option>
              </select>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Apply Filters ({filteredProperties.length} Plots)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
