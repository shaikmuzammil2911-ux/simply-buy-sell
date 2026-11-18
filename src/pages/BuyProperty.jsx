import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
  MapPin,
  Map,
  Tag,
  Maximize2,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages } from '../data/mockData';
import PropertyCard from '../components/PropertyCard';

export default function BuyProperty({ defaultCategory = 'All' }) {
  const { properties } = useApp();
  const [searchParams] = useSearchParams();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || defaultCategory
  );
  const [selectedVillage, setSelectedVillage] = useState(
    searchParams.get('village') || 'All'
  );
  const [selectedFacing, setSelectedFacing] = useState('All');
  const [selectedSizeRange, setSelectedSizeRange] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [cornerOnly, setCornerOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Facings
  const facings = ['All', 'East', 'North', 'West', 'South', 'North-East', 'South-East'];

  // Size ranges in sq.yd
  const sizeRanges = [
    { label: 'All Sizes', value: 'All' },
    { label: 'Under 250 sq.yd', value: 'under-250' },
    { label: '250 – 500 sq.yd', value: '250-500' },
    { label: '500 – 1000 sq.yd', value: '500-1000' },
    { label: '1000+ sq.yd', value: 'above-1000' }
  ];

  // Price ranges
  const priceRanges = [
    { label: 'All Budgets', value: 'All' },
    { label: 'Under ₹50 Lakhs', value: 'under-50' },
    { label: '₹50 Lakhs – ₹1 Crore', value: '50-100' },
    { label: '₹1 Crore – ₹2 Crores', value: '100-200' },
    { label: '₹2 Crores+', value: 'above-200' }
  ];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(defaultCategory);
    setSelectedVillage('All');
    setSelectedFacing('All');
    setSelectedSizeRange('All');
    setSelectedPriceRange('All');
    setCornerOnly(false);
    setSortBy('newest');
  };

  // Filter & Sort Logic
  const filteredPlots = useMemo(() => {
    return properties
      .filter((plot) => {
        // Keyword / APCRDA Plot Code search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchCode = plot.plotCode?.toLowerCase().includes(q);
          const matchId = plot.id?.toLowerCase().includes(q);
          const matchTitle = plot.title?.toLowerCase().includes(q);
          const matchVillage = plot.village?.toLowerCase().includes(q);
          if (!matchCode && !matchId && !matchTitle && !matchVillage) return false;
        }

        // Category
        if (selectedCategory !== 'All' && plot.category !== selectedCategory) {
          return false;
        }

        // Village
        if (selectedVillage !== 'All' && plot.village?.toLowerCase() !== selectedVillage.toLowerCase()) {
          return false;
        }

        // Facing
        if (selectedFacing !== 'All' && plot.facing !== selectedFacing) {
          return false;
        }

        // Corner Plot
        if (cornerOnly && !plot.cornerPlot) {
          return false;
        }

        // Size
        if (selectedSizeRange !== 'All' && plot.sizeSqYds) {
          const s = plot.sizeSqYds;
          if (selectedSizeRange === 'under-250' && s >= 250) return false;
          if (selectedSizeRange === '250-500' && (s < 250 || s > 500)) return false;
          if (selectedSizeRange === '500-1000' && (s < 500 || s > 1000)) return false;
          if (selectedSizeRange === 'above-1000' && s <= 1000) return false;
        }

        // Price in Lakhs
        if (selectedPriceRange !== 'All' && plot.priceInLakhs) {
          const p = plot.priceInLakhs;
          if (selectedPriceRange === 'under-50' && p >= 50) return false;
          if (selectedPriceRange === '50-100' && (p < 50 || p > 100)) return false;
          if (selectedPriceRange === '100-200' && (p < 100 || p > 200)) return false;
          if (selectedPriceRange === 'above-200' && p <= 200) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.priceInLakhs || 0) - (b.priceInLakhs || 0);
        if (sortBy === 'price-high') return (b.priceInLakhs || 0) - (a.priceInLakhs || 0);
        if (sortBy === 'size-low') return (a.sizeSqYds || 0) - (b.sizeSqYds || 0);
        if (sortBy === 'size-high') return (b.sizeSqYds || 0) - (a.sizeSqYds || 0);
        return 0; // Default order
      });
  }, [
    properties,
    searchTerm,
    selectedCategory,
    selectedVillage,
    selectedFacing,
    cornerOnly,
    selectedSizeRange,
    selectedPriceRange,
    sortBy
  ]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>Amaravati Land & Plot Marketplace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              {defaultCategory === 'Residential Plot'
                ? 'Amaravati Residential Plots'
                : defaultCategory === 'Commercial Plot'
                ? 'Amaravati Commercial Plots'
                : 'Buy Amaravati Plots'}
            </h1>
            <p className="text-sm text-slate-600">
              APCRDA LPS pooled plots with clear titles, verified plot codes and GIS map coordinates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/map"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Switch to GIS Map View</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar (Desktop & Mobile) */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search APCRDA Code, Village, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Select */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                <option value="Residential Plot">Residential Plots</option>
                <option value="Commercial Plot">Commercial Plots</option>
              </select>
            </div>

            {/* Village Select */}
            <div>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Villages</option>
                {amaravatiVillages.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Facing Select */}
            <div>
              <select
                value={selectedFacing}
                onChange={(e) => setSelectedFacing(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {facings.map((f) => (
                  <option key={f} value={f}>{f === 'All' ? 'All Facings' : `${f} Facing`}</option>
                ))}
              </select>
            </div>

            {/* Size Range Select */}
            <div>
              <select
                value={selectedSizeRange}
                onChange={(e) => setSelectedSizeRange(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sizeRanges.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Second Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-4">
              {/* Corner Plot Toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cornerOnly}
                  onChange={(e) => setCornerOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-700">Corner Plots Only</span>
              </label>

              {/* Price Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Budget:</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="py-1 px-2 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 text-xs"
                >
                  {priceRanges.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-1 px-2 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 text-xs"
                >
                  <option value="newest">Newest Listed</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="size-low">Size: Small to Large</option>
                  <option value="size-high">Size: Large to Small</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-600">
          <div>
            Showing <strong className="text-navy-950">{filteredPlots.length}</strong> available Amaravati plots
          </div>
        </div>

        {/* Plots Grid */}
        {filteredPlots.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-blue-100 shadow-sm max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-navy-950 mb-2">No Plots Match Filters</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your village, facing, or budget selections, or click Reset.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlots.map((plot) => (
              <PropertyCard key={plot.id} property={plot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
