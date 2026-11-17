import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  Eye,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyCard({ property }) {
  const { isPropertySaved, toggleSaveProperty, openEnquiryModal, getWhatsAppLink } = useApp();
  const isSaved = isPropertySaved(property.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges & Save Heart */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-black/20" />

          {/* Badges on top-left */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.featured && (
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-orange text-white shadow-sm">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            {property.verified && (
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green text-white shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-md text-white">
              {property.type}
            </span>
          </div>

          {/* Save / Favorite Heart button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaveProperty(property.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 shadow-md ${
              isSaved
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
            title={isSaved ? "Remove from saved" : "Save property"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Price Tag pill inside image bottom-left */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-lg sm:text-xl font-extrabold text-white bg-navy-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-white/20">
              {property.priceDisplay}
            </span>
          </div>

          {/* Status pill bottom-right */}
          {property.status && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800">
                {property.status}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span className="truncate">{property.location}, Andhra Pradesh</span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.slug || property.id}`}>
            <h3 className="text-base sm:text-lg font-bold text-navy-900 group-hover:text-brand-orange transition-colors line-clamp-1 mb-2">
              {property.title}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
            {property.description}
          </p>

          {/* Specs: Bedrooms / Bathrooms / Area */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
            {property.bedrooms ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-royal shrink-0" />
                <span className="font-semibold">{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                <span className="font-semibold">Clear Title</span>
              </div>
            )}

            {property.bathrooms ? (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-brand-royal shrink-0" />
                <span className="font-semibold">{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="font-semibold">High ROI</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-brand-royal shrink-0" />
              <span className="font-semibold truncate">{property.area}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 pt-3">
          <Link
            to={`/properties/${property.slug || property.id}`}
            className="py-2 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Link>

          <button
            onClick={() => openEnquiryModal(property)}
            className="py-2 px-3 rounded-xl bg-orange-50 hover:bg-brand-orange hover:text-white text-brand-orange border border-orange-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </button>
        </div>

        {/* WhatsApp direct button with prefilled property title */}
        <a
          href={getWhatsAppLink(null, property.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-brand-green hover:text-white text-emerald-700 border border-emerald-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
          <span>WhatsApp Details</span>
        </a>
      </div>
    </div>
  );
}
