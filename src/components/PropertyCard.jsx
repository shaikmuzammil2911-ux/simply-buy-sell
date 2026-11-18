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
  ExternalLink,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyCard({ property }) {
  const {
    openEnquiryModal,
    getWhatsAppLink,
    isInCompare,
    addToCompare,
    removeFromCompare
  } = useApp();

  const inCompare = isInCompare(property.id);
  const isResidential = property.category === 'Residential Plot';
  const pricePerSqYdFormatted = property.pricePerSqYd
    ? `₹${property.pricePerSqYd.toLocaleString('en-IN')}/sq.yd`
    : null;

  return (
    <div className="group bg-white/95 rounded-2xl overflow-hidden border border-blue-100/90 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-sm">
      <div>
        {/* Image & Header Overlay - Bright, Vivid & Clear */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-105 contrast-105"
            loading="lazy"
          />
          {/* Subtle light gradient at bottom only for text legibility, keeping full image bright and sunny */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 gap-2">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span
                className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm flex items-center gap-1 ${
                  isResidential
                    ? 'bg-emerald-600'
                    : 'bg-amber-600'
                }`}
              >
                <Tag className="w-3 h-3" />
                {property.category || 'Plot'}
              </span>

              {property.cornerPlot && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-sm">
                  Corner Plot
                </span>
              )}
            </div>

            {/* Compare Toggle Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (inCompare) {
                  removeFromCompare(property.id);
                } else {
                  addToCompare(property);
                }
              }}
              title={inCompare ? 'Remove from compare' : 'Add to compare'}
              className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold transition-all shadow-md backdrop-blur-md ${
                inCompare
                  ? 'bg-brand-orange text-white ring-2 ring-white/80'
                  : 'bg-white/85 text-navy-900 hover:bg-white'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>
          </div>

          {/* Dual IDs Badge: APCRDA / LPS Plot Code */}
          <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1">
            {property.plotCode && (
              <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-navy-950/90 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-400/40 backdrop-blur-md shadow">
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
            <span className="text-base sm:text-lg font-black text-white bg-blue-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-blue-400/30">
              {property.priceDisplay}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Village & Status */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs">
            <Link
              to={`/locations/${property.village?.toLowerCase() || 'amaravati'}`}
              className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{property.village}, Amaravati</span>
            </Link>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {property.listingStatus || 'Available'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.slug || property.id}`}>
            <h3 className="text-base font-bold text-navy-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
              {property.title}
            </h3>
          </Link>

          {/* Subtitle / Key Advantage */}
          <p className="text-xs text-slate-600 line-clamp-1 mb-3">
            {property.themeZone || property.locationAdvantage || property.description}
          </p>

          {/* Plot Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 mb-3">
            {/* Size */}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-wide">Size</span>
              <span className="font-bold text-navy-900 flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-blue-600 shrink-0" />
                {property.sizeSqYds ? `${property.sizeSqYds} sq.yd` : property.area}
              </span>
            </div>

            {/* Facing */}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-wide">Facing</span>
              <span className="font-bold text-navy-900 flex items-center gap-1">
                <Compass className="w-3 h-3 text-emerald-600 shrink-0" />
                {property.facing || 'East'}
              </span>
            </div>

            {/* Road Width */}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-wide">Road Width</span>
              <span className="font-bold text-navy-900">
                {property.roadWidth ? `${property.roadWidth}m` : '18m wide'}
              </span>
            </div>
          </div>

          {/* Rate per Sq Yd & Asking Price Note */}
          <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100">
            <span className="text-slate-500 text-[11px]">Asking Rate:</span>
            <span className="font-bold text-navy-900">{pricePerSqYdFormatted || 'On Request'}</span>
          </div>
        </div>
      </div>

      {/* Intelligence & Map Actions */}
      <div className="p-4 pt-0 border-t border-blue-50 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* GIS Map Link */}
          <Link
            to={`/map?id=${property.id}`}
            className="py-1.5 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Map className="w-3.5 h-3.5 text-blue-600" />
            <span>GIS Map</span>
          </Link>

          {/* Plot Intelligence Link */}
          <Link
            to={`/plot-intelligence?code=${encodeURIComponent(property.plotCode || property.id)}`}
            className="py-1.5 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Intelligence</span>
          </Link>
        </div>

        {/* Call / WhatsApp & Detail Row */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/properties/${property.slug || property.id}`}
            className="py-2 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </Link>

          <a
            href={getWhatsAppLink(property)}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
