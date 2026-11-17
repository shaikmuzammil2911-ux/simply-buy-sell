import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  Building,
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function BuyProperty() {
  const { properties } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state initialized from URL params if present
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(searchParams.get('price') || 'All');
  const [selectedBeds, setSelectedBeds] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedFurnishing, setSelectedFurnishing] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter options
  const propertyTypes = [
    'All',
    'Flats',
    'Apartments',
    'Houses',
    'Villas',
    'Plots',
    'Open Plots',
    'Commercial',
    'Agricultural Land'
  ];

  const locations = [
    'All',
    'Amaravati',
    'Mangalagiri',
    'Thullur',
    'Vijayawada',
    'Guntur',
    'Tadikonda'
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹25 Lakhs', value: 'under-25' },
    { label: '₹25 – ₹50 Lakhs', value: '25-50' },
    { label: '₹50 Lakhs – ₹1 Crore', value: '50-100' },
    { label: '₹1 Crore+', value: 'above-100' }
  ];

  const bedroomOptions = ['All', '2', '3', '4'];
  const statusOptions = ['All', 'Ready to Move', 'Immediately Available'];
  const furnishingOptions = ['All', 'Fully Furnished', 'Semi-Furnished', 'Unfurnished'];

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedLocation('All');
    setSelectedPriceRange('All');
    setSelectedBeds('All');
    setSelectedStatus('All');
    setSelectedFurnishing('All');
    setSortBy('newest');
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // Keyword Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchLoc = item.location?.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          const matchType = item.type?.toLowerCase().includes(q);
          if (!matchTitle && !matchLoc && !matchDesc && !matchType) return false;
        }

        // Type
        if (selectedType !== 'All') {
          if (selectedType === 'Flats' && !(item.type === 'Flats' || item.type === 'Apartments')) return false;
          else if (selectedType === 'Plots' && !(item.type === 'Plots' || item.type === 'Open Plots')) return false;
          else if (item.type !== selectedType) return false;
        }

        // Location
        if (selectedLocation !== 'All' && item.location !== selectedLocation) {
          return false;
        }

        // Price
        if (selectedPriceRange !== 'All') {
          const p = item.price || 0;
          if (selectedPriceRange === 'under-25' && p >= 2500000) return false;
          if (selectedPriceRange === '25-50' && (p < 2500000 || p > 5000000)) return false;
          if (selectedPriceRange === '50-100' && (p < 5000000 || p > 10000000)) return false;
          if (selectedPriceRange === 'above-100' && p < 10000000) return false;
        }

        // Bedrooms
        if (selectedBeds !== 'All') {
          if (selectedBeds === '4' && (!item.bedrooms || item.bedrooms < 4)) return false;
          if (selectedBeds !== '4' && item.bedrooms !== Number(selectedBeds)) return false;
        }

        // Status
        if (selectedStatus !== 'All' && item.status !== selectedStatus) {
          return false;
        }

        // Furnishing
        if (selectedFurnishing !== 'All' && item.furnishing !== selectedFurnishing) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'popular') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        // Default: newest
        return new Date(b.postedDate || 0) - new Date(a.postedDate || 0);
      });
  }, [
    properties,
    searchTerm,
    selectedType,
    selectedLocation,
    selectedPriceRange,
    selectedBeds,
    selectedStatus,
    selectedFurnishing,
    sortBy
  ]);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-green" />
            <span>Amaravati Property Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Buy Verified Properties
          </h1>
          <p className="mt-1 text-slate-600 text-sm sm:text-base">
            Find premium flats, houses, open plots and commercial investments in Andhra Pradesh
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-card border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by property name, location, keyword (e.g. 3BHK Mangalagiri, Thullur Plot)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 py-3 px-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-orange"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-3 rounded-xl bg-navy-900 text-white flex items-center gap-2 text-xs font-bold"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Filter Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm uppercase tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
                  <span>Filter Properties</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-brand-orange hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Filter 1: Property Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-orange"
                >
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Filter 2: Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Location / Micro-market
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-orange"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Filter 3: Price Range */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Budget / Price
                </label>
                <div className="space-y-1.5">
                  {priceRanges.map((pr) => (
                    <label key={pr.value} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-brand-orange">
                      <input
                        type="radio"
                        name="priceRange"
                        value={pr.value}
                        checked={selectedPriceRange === pr.value}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="text-brand-orange focus:ring-brand-orange"
                      />
                      <span>{pr.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter 4: Bedrooms */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Bedrooms
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {bedroomOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBeds(b)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                        selectedBeds === b
                          ? 'bg-brand-royal text-white border-brand-royal'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {b === 'All' ? 'All' : `${b} BHK`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 5: Property Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Filter 6: Furnishing */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Furnishing
                </label>
                <select
                  value={selectedFurnishing}
                  onChange={(e) => setSelectedFurnishing(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                >
                  {furnishingOptions.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Results Grid */}
          <div className="lg:col-span-3">
            {/* Results Count & Active Filters Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-4 rounded-xl border border-slate-100 text-xs text-slate-600">
              <span className="font-bold text-navy-900">
                Showing {filteredProperties.length} verified {filteredProperties.length === 1 ? 'property' : 'properties'}
              </span>

              {(selectedType !== 'All' || selectedLocation !== 'All' || selectedPriceRange !== 'All' || searchTerm) && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400">Active filters:</span>
                  {selectedType !== 'All' && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 flex items-center gap-1">
                      {selectedType}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType('All')} />
                    </span>
                  )}
                  {selectedLocation !== 'All' && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 flex items-center gap-1">
                      {selectedLocation}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation('All')} />
                    </span>
                  )}
                  <button
                    onClick={resetFilters}
                    className="text-brand-orange hover:underline font-bold"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Properties List */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              /* Useful Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-card">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">
                  No Properties Match Your Search Criteria
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  We could not find any properties matching all your filters. Try widening your price range, choosing another location, or resetting filters.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-sm shadow-md hover:bg-brand-orangeDark transition-colors"
                  >
                    Reset All Filters
                  </button>
                  <Link
                    to="/contact"
                    className="px-6 py-2.5 rounded-xl bg-slate-100 text-navy-900 font-semibold text-sm hover:bg-slate-200 transition-colors"
                  >
                    Post Custom Requirement
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
