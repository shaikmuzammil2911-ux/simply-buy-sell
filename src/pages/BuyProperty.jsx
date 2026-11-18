import React, { useState, useMemo } from 'react';
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
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages, propertyCategories } from '../data/mockData';
import PropertyCard from '../components/PropertyCard';

export default function BuyProperty({ defaultCategory = 'All' }) {
  const { properties } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Primary Category Switcher ('all' | 'lps_plots' | 'apartments' | 'houses' | 'open_plots')
  const initialCategoryParam = searchParams.get('category') || (
    defaultCategory === 'Residential Plot' ? 'lps_plots' :
    defaultCategory === 'Commercial Plot' ? 'lps_plots' : 'all'
  );

  const [activeCategory, setActiveCategory] = useState(initialCategoryParam);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'map'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Search & Dynamic Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // LPS / Open Plot Specific Filters
  const [lpsClassification, setLpsClassification] = useState('All'); // 'All' | 'Residential' | 'Commercial'
  const [selectedFacing, setSelectedFacing] = useState('All');
  const [selectedRoadWidth, setSelectedRoadWidth] = useState('All');
  const [selectedExtentRange, setSelectedExtentRange] = useState('All');
  const [cornerPlotOnly, setCornerPlotOnly] = useState(false);

  // Apartment Specific Filters
  const [apartmentBeds, setApartmentBeds] = useState('All'); // 'All' | '2' | '3' | '4'
  const [apartmentFurnishing, setApartmentFurnishing] = useState('All');

  // House Specific Filters
  const [houseType, setHouseType] = useState('All');
  const [houseBeds, setHouseBeds] = useState('All');

  // Reset all filters
  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedVillage('All');
    setSelectedPriceRange('All');
    setLpsClassification('All');
    setSelectedFacing('All');
    setSelectedRoadWidth('All');
    setSelectedExtentRange('All');
    setCornerPlotOnly(false);
    setApartmentBeds('All');
    setApartmentFurnishing('All');
    setHouseType('All');
    setHouseBeds('All');
    setSortBy('newest');
  };

  // Switch Category
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    resetAllFilters();
  };

  // Filter & Sort Engine
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // 1. Primary Category Filter
        if (activeCategory !== 'all') {
          const cat = p.propertyCategory || (
            p.category?.toLowerCase().includes('lps') ? 'lps_plots' :
            p.category?.toLowerCase().includes('apartment') || p.category?.toLowerCase().includes('flat') ? 'apartments' :
            p.category?.toLowerCase().includes('house') || p.category?.toLowerCase().includes('villa') ? 'houses' :
            p.category?.toLowerCase().includes('open plot') ? 'open_plots' : 'lps_plots'
          );
          if (cat !== activeCategory) return false;
        }

        // 2. Keyword Search (APCRDA code, Title, Village, Project name)
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim();
          const matchCode = p.plotCode?.toLowerCase().includes(q);
          const matchId = p.id?.toLowerCase().includes(q);
          const matchTitle = p.title?.toLowerCase().includes(q);
          const matchVillage = p.village?.toLowerCase().includes(q);
          const matchProject = p.projectName?.toLowerCase().includes(q);
          if (!matchCode && !matchId && !matchTitle && !matchVillage && !matchProject) {
            return false;
          }
        }

        // 3. Village Filter
        if (selectedVillage !== 'All') {
          if (p.village?.toLowerCase() !== selectedVillage.toLowerCase()) return false;
        }

        // 4. Budget Range Filter
        if (selectedPriceRange !== 'All' && p.priceInLakhs) {
          const pr = p.priceInLakhs;
          if (selectedPriceRange === 'under-50' && pr >= 50) return false;
          if (selectedPriceRange === '50-100' && (pr < 50 || pr > 100)) return false;
          if (selectedPriceRange === '100-200' && (pr < 100 || pr > 200)) return false;
          if (selectedPriceRange === 'above-200' && pr <= 200) return false;
        }

        // 5. Category-Specific Filters
        if (activeCategory === 'lps_plots' || activeCategory === 'open_plots') {
          // LPS Classification (Residential vs Commercial)
          if (lpsClassification !== 'All') {
            if (lpsClassification === 'Residential' && !p.category?.toLowerCase().includes('residential')) return false;
            if (lpsClassification === 'Commercial' && !p.category?.toLowerCase().includes('commercial')) return false;
          }

          // Facing
          if (selectedFacing !== 'All' && p.facing && !p.facing.toLowerCase().includes(selectedFacing.toLowerCase())) {
            return false;
          }

          // Corner plot
          if (cornerPlotOnly && !p.cornerPlot) {
            return false;
          }

          // Plot extent
          const extent = p.sizeSqYds || p.openPlotExtentSqYds;
          if (selectedExtentRange !== 'All' && extent) {
            if (selectedExtentRange === 'under-250' && extent >= 250) return false;
            if (selectedExtentRange === '250-500' && (extent < 250 || extent > 500)) return false;
            if (selectedExtentRange === 'above-500' && extent <= 500) return false;
          }
        }

        if (activeCategory === 'apartments') {
          if (apartmentBeds !== 'All' && p.bedrooms && !p.bedrooms.includes(apartmentBeds)) {
            return false;
          }
          if (apartmentFurnishing !== 'All' && p.furnishing && !p.furnishing.toLowerCase().includes(apartmentFurnishing.toLowerCase())) {
            return false;
          }
        }

        if (activeCategory === 'houses') {
          if (houseType !== 'All' && p.houseType && !p.houseType.toLowerCase().includes(houseType.toLowerCase())) {
            return false;
          }
          if (houseBeds !== 'All' && p.bedrooms && !p.bedrooms.includes(houseBeds)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.askingPrice || 0) - (b.askingPrice || 0);
        if (sortBy === 'price-high') return (b.askingPrice || 0) - (a.askingPrice || 0);
        if (sortBy === 'largest-area') {
          const areaA = a.sizeSqYds || a.superBuiltUpAreaSqFt || a.plotAreaSqYd || 0;
          const areaB = b.sizeSqYds || b.superBuiltUpAreaSqFt || b.plotAreaSqYd || 0;
          return areaB - areaA;
        }
        if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return 0; // Default order
      });
  }, [
    properties,
    activeCategory,
    searchTerm,
    selectedVillage,
    selectedPriceRange,
    lpsClassification,
    selectedFacing,
    cornerPlotOnly,
    selectedExtentRange,
    apartmentBeds,
    apartmentFurnishing,
    houseType,
    houseBeds,
    sortBy
  ]);

  // Active filter chip list for quick removal
  const activeChips = [];
  if (searchTerm) activeChips.push({ label: `Search: "${searchTerm}"`, clear: () => setSearchTerm('') });
  if (selectedVillage !== 'All') activeChips.push({ label: `Village: ${selectedVillage}`, clear: () => setSelectedVillage('All') });
  if (selectedPriceRange !== 'All') activeChips.push({ label: `Budget: ${selectedPriceRange}`, clear: () => setSelectedPriceRange('All') });
  if (lpsClassification !== 'All') activeChips.push({ label: `Type: ${lpsClassification}`, clear: () => setLpsClassification('All') });
  if (selectedFacing !== 'All') activeChips.push({ label: `Facing: ${selectedFacing}`, clear: () => setSelectedFacing('All') });
  if (cornerPlotOnly) activeChips.push({ label: 'Corner Plot Only', clear: () => setCornerPlotOnly(false) });
  if (apartmentBeds !== 'All') activeChips.push({ label: `${apartmentBeds} BHK`, clear: () => setApartmentBeds('All') });
  if (houseType !== 'All') activeChips.push({ label: `House: ${houseType}`, clear: () => setHouseType('All') });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>Amaravati Property Discovery Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              Buy Verified Properties in Amaravati
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              From APCRDA returnable land pooling plots to luxury apartment flats, independent villas, and open plots.
            </p>
          </div>

          {/* View Mode Controls (Grid / List / Map) */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center bg-white p-1 rounded-2xl border-2 border-slate-200 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-navy-950'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-navy-950'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/map"
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Explore on</span> GIS Map
            </Link>
          </div>
        </div>

        {/* ================= CATEGORY SWITCHER PILLS ================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap shadow-sm border-2 ${
              activeCategory === 'all'
                ? 'bg-navy-950 text-white border-navy-950 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
            }`}
          >
            All Categories ({properties.length})
          </button>

          {propertyCategories.map((cat) => {
            const count = properties.filter((p) => {
              const pCat = p.propertyCategory || (
                p.category?.toLowerCase().includes('lps') ? 'lps_plots' :
                p.category?.toLowerCase().includes('apartment') || p.category?.toLowerCase().includes('flat') ? 'apartments' :
                p.category?.toLowerCase().includes('house') || p.category?.toLowerCase().includes('villa') ? 'houses' :
                p.category?.toLowerCase().includes('open plot') ? 'open_plots' : 'lps_plots'
              );
              return pCat === cat.id;
            }).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap shadow-sm border-2 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span>{cat.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= DYNAMIC SEARCH & FILTER PANEL ================= */}
        <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-md p-4 sm:p-5 mb-6">
          {/* Main Search Input */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  activeCategory === 'lps_plots'
                    ? 'Search by APCRDA Plot Code (e.g. LPS-THU-R-0412), Village, Sector...'
                    : activeCategory === 'apartments'
                    ? 'Search by Project Name, Flat #, Location...'
                    : 'Search property title, village, or reference ID...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-2xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Quick Sort Dropdown */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wide shrink-0">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 rounded-2xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white shadow-sm"
              >
                <option value="newest">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="largest-area">Largest Area / Extent</option>
                <option value="featured">Featured Listings</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC CATEGORY-SPECIFIC SECONDARY FILTERS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-3 border-t border-slate-100 text-xs">
            {/* 1. Village Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Village</label>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
              >
                <option value="All">All Amaravati Villages</option>
                {amaravatiVillages.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Budget Range */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Budget</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
              >
                <option value="All">Any Budget</option>
                <option value="under-50">Under ₹50 Lakhs</option>
                <option value="50-100">₹50 Lakhs – ₹1 Crore</option>
                <option value="100-200">₹1 Crore – ₹2 Crores</option>
                <option value="above-200">₹2 Crores+</option>
              </select>
            </div>

            {/* DYNAMIC: If LPS Plot or Open Plot -> Show Extent & Facing & Classification */}
            {(activeCategory === 'lps_plots' || activeCategory === 'open_plots' || activeCategory === 'all') && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Zoning Type</label>
                  <select
                    value={lpsClassification}
                    onChange={(e) => setLpsClassification(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
                  >
                    <option value="All">Residential & Commercial</option>
                    <option value="Residential">Residential Only</option>
                    <option value="Commercial">Commercial Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Facing</label>
                  <select
                    value={selectedFacing}
                    onChange={(e) => setSelectedFacing(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
                  >
                    <option value="All">Any Facing</option>
                    <option value="East">East Facing</option>
                    <option value="North">North Facing</option>
                    <option value="West">West Facing</option>
                    <option value="South">South Facing</option>
                  </select>
                </div>

                <div className="flex items-center pt-4">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={cornerPlotOnly}
                      onChange={(e) => setCornerPlotOnly(e.target.checked)}
                      className="rounded text-blue-600 w-4 h-4"
                    />
                    <span className="font-bold text-navy-950 text-xs">Corner Only</span>
                  </label>
                </div>
              </>
            )}

            {/* DYNAMIC: If Apartment -> Show BHK Bedrooms & Furnishing (NO bedrooms for LPS plots!) */}
            {activeCategory === 'apartments' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Bedrooms</label>
                  <select
                    value={apartmentBeds}
                    onChange={(e) => setApartmentBeds(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
                  >
                    <option value="All">All Bedrooms</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Furnishing</label>
                  <select
                    value={apartmentFurnishing}
                    onChange={(e) => setApartmentFurnishing(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
                  >
                    <option value="All">All Furnishing</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </>
            )}

            {/* DYNAMIC: If House -> Show House Type & BHK */}
            {activeCategory === 'houses' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">House Type</label>
                  <select
                    value={houseType}
                    onChange={(e) => setHouseType(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
                  >
                    <option value="All">All Types</option>
                    <option value="Duplex">Duplex Villa</option>
                    <option value="Independent">Independent House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Bedrooms</label>
                  <select
                    value={houseBeds}
                    onChange={(e) => setHouseBeds(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 font-bold text-navy-900 bg-slate-50 text-xs"
                  >
                    <option value="All">All BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* ACTIVE FILTER CHIPS & RESET */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-400 text-[11px]">Active Filters:</span>
              {activeChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs"
                >
                  <span>{chip.label}</span>
                  <button onClick={chip.clear} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={resetAllFilters}
                className="text-xs text-rose-600 hover:underline font-bold ml-auto flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Header Count */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <div className="font-bold text-slate-600">
            Showing <strong className="text-navy-950 text-sm">{filteredProperties.length}</strong> matching properties
          </div>
        </div>

        {/* ================= PROPERTY LISTINGS (GRID OR LIST) ================= */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-blue-100 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-navy-950 mb-1">No Matching Properties Found</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try removing some filters or search for another Amaravati village or plot code.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} viewMode="list" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} viewMode="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
