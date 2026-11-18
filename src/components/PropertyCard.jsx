import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Maximize2,
  Compass,
  ArrowRight,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  Sparkles,
  Map,
  FileCheck2,
  Building2,
  Home,
  Tag,
  Bed,
  Bath,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyCard({ property, viewMode = 'grid' }) {
  const {
    openEnquiryModal,
    getWhatsAppLink,
    isInCompare,
    addToCompare,
    removeFromCompare
  } = useApp();

  const inCompare = isInCompare(property.id);

  // Category determination
  const isLpsPlot = property.propertyCategory === 'lps_plots' || property.category?.toLowerCase().includes('lps') || property.category?.toLowerCase().includes('plot');
  const isApartment = property.propertyCategory === 'apartments' || property.category?.toLowerCase().includes('apartment') || property.category?.toLowerCase().includes('flat');
  const isHouse = property.propertyCategory === 'houses' || property.category?.toLowerCase().includes('house') || property.category?.toLowerCase().includes('villa');
  const isOpenPlot = property.propertyCategory === 'open_plots' || property.category?.toLowerCase().includes('open plot');

  // Badges & styling
  let categoryBadgeBg = 'bg-emerald-600';
  let categoryIcon = <Layers className="w-3 h-3" />;
  if (isApartment) {
    categoryBadgeBg = 'bg-blue-600';
    categoryIcon = <Building2 className="w-3 h-3" />;
  } else if (isHouse) {
    categoryBadgeBg = 'bg-purple-600';
    categoryIcon = <Home className="w-3 h-3" />;
  } else if (isOpenPlot) {
    categoryBadgeBg = 'bg-amber-600';
    categoryIcon = <Maximize2 className="w-3 h-3" />;
  } else if (property.category?.toLowerCase().includes('commercial')) {
    categoryBadgeBg = 'bg-amber-600';
    categoryIcon = <Building2 className="w-3 h-3" />;
  }

  // Unit rate calculation
  const unitRateDisplay = property.pricePerSqYdDisplay || property.pricePerSqFtDisplay || (
    property.pricePerSqYd ? `₹${property.pricePerSqYd.toLocaleString('en-IN')}/sq.yd` :
    property.pricePerSqFt ? `₹${property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft` : null
  );

  /* ================= LIST VIEW LAYOUT ================= */
  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-3xl overflow-hidden border-2 border-blue-100 hover:border-blue-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between">
        {/* Thumbnail Image */}
        <div className="relative md:w-80 h-52 md:h-auto overflow-hidden bg-slate-100 shrink-0">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-105 contrast-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm flex items-center gap-1 ${categoryBadgeBg}`}>
              {categoryIcon}
              <span>{property.category || 'Property'}</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-base font-black text-white bg-blue-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow border border-blue-400/30">
              {property.priceDisplay}
            </span>
          </div>
        </div>

        {/* List Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 text-xs">
              <span className="flex items-center gap-1 text-blue-700 font-bold">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{property.village || property.location}, Amaravati</span>
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {property.status || 'Available'}
              </span>
            </div>

            <Link to={`/properties/${property.slug || property.id}`}>
              <h3 className="text-base sm:text-lg font-black text-navy-950 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                {property.title}
              </h3>
            </Link>

            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>

            {/* Dynamic Specs Bar */}
            <div className="flex flex-wrap items-center gap-3 py-2 px-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 mb-3">
              {isApartment ? (
                <>
                  <span className="font-bold text-navy-950 flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-blue-600" />
                    {property.bedrooms} Beds
                  </span>
                  <span>•</span>
                  <span className="font-bold text-navy-950 flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-blue-600" />
                    {property.bathrooms} Baths
                  </span>
                  <span>•</span>
                  <span className="font-bold text-navy-950">
                    {property.superBuiltUpAreaSqFt || property.area} sq.ft
                  </span>
                  <span>•</span>
                  <span className="text-slate-600">{property.furnishing || 'Furnished'}</span>
                </>
              ) : isHouse ? (
                <>
                  <span className="font-bold text-navy-950 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-purple-600" />
                    {property.houseType || 'Duplex Villa'}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-navy-950">{property.bedrooms} Beds</span>
                  <span>•</span>
                  <span className="font-bold text-navy-950">{property.area || `${property.plotAreaSqYd} sq.yd`}</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-navy-950 flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                    {property.sizeSqYds ? `${property.sizeSqYds} sq.yd` : property.area}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-navy-950 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-emerald-600" />
                    {property.facing || 'East'} Facing
                  </span>
                  <span>•</span>
                  <span className="font-bold text-navy-950">{property.roadWidth || '18m wide'}</span>
                </>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs">
              <span className="text-slate-400 font-semibold mr-1">Rate:</span>
              <span className="font-black text-navy-950">{unitRateDisplay || 'On Request'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (inCompare) removeFromCompare(property.id);
                  else addToCompare(property);
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  inCompare
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>{inCompare ? 'Comparing' : 'Compare'}</span>
              </button>

              <Link
                to={`/map?id=${property.id}`}
                className="py-1.5 px-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center gap-1"
              >
                <Map className="w-3 h-3" />
                <span>Map</span>
              </Link>

              <Link
                to={`/properties/${property.slug || property.id}`}
                className="py-1.5 px-3 rounded-xl bg-navy-950 text-white hover:bg-blue-700 text-xs font-bold flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= GRID VIEW LAYOUT (DEFAULT) ================= */
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border-2 border-blue-100/90 hover:border-blue-400 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      <div>
        {/* Image & Header Overlay */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-105 contrast-105"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 gap-2">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm flex items-center gap-1 ${categoryBadgeBg}`}>
              {categoryIcon}
              <span>{property.category || 'Property'}</span>
            </span>

            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (inCompare) removeFromCompare(property.id);
                else addToCompare(property);
              }}
              title={inCompare ? 'Remove from compare' : 'Add to compare'}
              className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-bold transition-all shadow-md backdrop-blur-md ${
                inCompare
                  ? 'bg-amber-500 text-white ring-2 ring-white/80'
                  : 'bg-white/90 text-navy-900 hover:bg-white'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>
          </div>

          {/* Bottom Tags over image */}
          <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-0.5">
            {property.plotCode && (
              <div className="inline-flex items-center gap-1 text-[10px] font-mono font-black bg-navy-950/90 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/40 backdrop-blur-md shadow">
                <FileCheck2 className="w-3 h-3 text-amber-400" />
                <span>APCRDA: {property.plotCode}</span>
              </div>
            )}
            <div className="text-[10px] text-slate-300 font-mono">
              ID: {property.id}
            </div>
          </div>

          {/* Asking Price Tag */}
          <div className="absolute bottom-3 right-3 z-10 text-right">
            <span className="text-base font-black text-white bg-blue-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-blue-400/30">
              {property.priceDisplay}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Location & Status */}
          <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
            <span className="flex items-center gap-1 text-blue-700 font-bold">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{property.village || property.location}, Amaravati</span>
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {property.status || 'Available'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.slug || property.id}`}>
            <h3 className="text-base font-black text-navy-950 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
              {property.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-1 mb-3">
            {property.themeZone || property.locality || property.description}
          </p>

          {/* Category-Specific Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 mb-3">
            {isApartment ? (
              <>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Config</span>
                  <span className="font-black text-navy-950">{property.bedrooms} Beds</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Area</span>
                  <span className="font-black text-navy-950">{property.superBuiltUpAreaSqFt || property.area} sq.ft</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Floor</span>
                  <span className="font-black text-navy-950">{property.floorNumber ? `${property.floorNumber}th` : 'Mid'}</span>
                </div>
              </>
            ) : isHouse ? (
              <>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Type</span>
                  <span className="font-black text-navy-950 truncate">{property.houseType?.split(' ')[0] || 'Villa'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">BHK</span>
                  <span className="font-black text-navy-950">{property.bedrooms} Beds</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Plot Area</span>
                  <span className="font-black text-navy-950">{property.plotAreaSqYd ? `${property.plotAreaSqYd} yd` : property.area}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Extent</span>
                  <span className="font-black text-navy-950 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-blue-600" />
                    {property.sizeSqYds ? `${property.sizeSqYds} sq.yd` : property.area}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Facing</span>
                  <span className="font-black text-navy-950 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-emerald-600" />
                    {property.facing || 'East'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Road</span>
                  <span className="font-black text-navy-950">{property.roadWidth || '18m wide'}</span>
                </div>
              </>
            )}
          </div>

          {/* Unit Rate Note */}
          <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100">
            <span className="text-slate-500 text-[11px] font-medium">Unit Rate:</span>
            <span className="font-black text-navy-950">{unitRateDisplay || 'On Request'}</span>
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="p-4 pt-0 border-t border-blue-50 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            to={`/map?id=${property.id}`}
            className="py-1.5 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Map className="w-3.5 h-3.5 text-blue-600" />
            <span>GIS Map</span>
          </Link>

          <Link
            to={`/properties/${property.slug || property.id}`}
            className="py-1.5 px-2.5 rounded-xl bg-navy-950 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </Link>
        </div>

        <a
          href={getWhatsAppLink(property)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Details</span>
        </a>
      </div>
    </div>
  );
}
