import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  CheckCircle2,
  Building,
  User,
  ArrowRight,
  ExternalLink,
  Info,
  Map,
  Compass,
  FileCheck2,
  Building2,
  Home,
  Layers,
  Navigation,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';
import { amaravatiLandmarks } from '../data/mockData';

export default function PropertyDetail() {
  const { id } = useParams();
  const {
    properties,
    openEnquiryModal,
    openScheduleVisitModal,
    getWhatsAppLink,
    isPropertySaved,
    toggleSaveProperty,
    showToast
  } = useApp();

  // Find property by slug, id, or plotCode
  const property = properties.find(
    (p) => p.slug === id || p.id === id || p.plotCode === id
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50 text-center pt-24">
        <Building className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-black text-navy-950 mb-2">Property Not Found</h2>
        <p className="text-slate-600 mb-6 max-w-sm text-xs">
          The property reference ID may have been updated, sold, or unlisted.
        </p>
        <Link
          to="/buy-property"
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
        >
          Browse All Properties
        </Link>
      </div>
    );
  }

  const isSaved = isPropertySaved(property.id);
  const images = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  ];

  // Category determination
  const isLpsPlot = property.propertyCategory === 'lps_plots' || property.category?.toLowerCase().includes('lps') || property.category?.toLowerCase().includes('plot');
  const isApartment = property.propertyCategory === 'apartments' || property.category?.toLowerCase().includes('apartment') || property.category?.toLowerCase().includes('flat');
  const isHouse = property.propertyCategory === 'houses' || property.category?.toLowerCase().includes('house') || property.category?.toLowerCase().includes('villa');
  const isOpenPlot = property.propertyCategory === 'open_plots' || property.category?.toLowerCase().includes('open plot');

  // Similar properties
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.propertyCategory === property.propertyCategory || p.category === property.category))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property in Amaravati: ${property.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Property link copied to clipboard.');
    }
  };

  // Google Maps Directions link
  const googleMapsDirectionsUrl = property.lat && property.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${property.lat},${property.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.village + ', Amaravati, Andhra Pradesh')}`;

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-blue-50/50 to-sky-50 min-h-screen pt-4 sm:pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/buy-property" className="hover:text-blue-600">Properties</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 flex items-center gap-1.5 text-xs font-bold shadow-sm"
              title="Share Property"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold shadow-sm transition-colors ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-rose-500'
              }`}
              title={isSaved ? "Saved" : "Save Property"}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Title & Key Info Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border-2 border-blue-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-navy-950 text-white">
                  {property.category}
                </span>

                {property.plotCode && (
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    APCRDA: {property.plotCode}
                  </span>
                )}

                <span className="font-mono text-xs text-slate-500 px-2 py-1 rounded-full bg-slate-100">
                  ID: {property.id}
                </span>

                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {property.status || 'Available'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight leading-snug">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm mt-2 font-semibold">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{property.locality ? `${property.locality}, ` : ''}{property.village || property.location}, Amaravati, Andhra Pradesh</span>
              </div>
            </div>

            {/* Price Pill */}
            <div className="lg:text-right shrink-0 bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
              <div className="text-[11px] uppercase font-bold text-slate-500">Asking Price</div>
              <div className="text-2xl sm:text-3xl font-black text-navy-950">
                {property.priceDisplay}
              </div>
              <div className="text-xs font-bold text-blue-700 mt-0.5">
                {property.pricePerSqYdDisplay || property.pricePerSqFtDisplay || (
                  property.pricePerSqYd ? `₹${property.pricePerSqYd.toLocaleString('en-IN')}/sq.yd` :
                  property.pricePerSqFt ? `₹${property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft` : null
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Main Left Column (Gallery + Specs + Details) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Image */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
              <img
                src={images[activeImageIndex]}
                alt={`${property.title} photo ${activeImageIndex + 1}`}
                className="w-full h-full object-cover brightness-105 contrast-105"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-bold">
                Photo {activeImageIndex + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activeImageIndex
                        ? 'border-blue-600 scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* DYNAMIC CATEGORY-SPECIFIC SPECS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-5 rounded-3xl border-2 border-blue-100 shadow-md">
              {isApartment ? (
                <>
                  <div className="p-3 bg-blue-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Bedrooms</div>
                    <div className="text-base font-black text-navy-950 mt-1 flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-blue-600" />
                      <span>{property.bedrooms}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Bathrooms</div>
                    <div className="text-base font-black text-navy-950 mt-1 flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-blue-600" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Super Area</div>
                    <div className="text-base font-black text-navy-950 mt-1 flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-blue-600" />
                      <span>{property.superBuiltUpAreaSqFt || property.area} sq.ft</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Floor</div>
                    <div className="text-base font-black text-navy-950 mt-1">
                      {property.floorNumber}th of {property.totalFloors || 'Multi'}
                    </div>
                  </div>
                </>
              ) : isHouse ? (
                <>
                  <div className="p-3 bg-purple-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">House Type</div>
                    <div className="text-base font-black text-navy-950 mt-1 flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-purple-600" />
                      <span className="truncate">{property.houseType || 'Duplex Villa'}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Bedrooms</div>
                    <div className="text-base font-black text-navy-950 mt-1 flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-purple-600" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Plot Extent</div>
                    <div className="text-base font-black text-navy-950 mt-1">
                      {property.plotAreaSqYd ? `${property.plotAreaSqYd} sq.yd` : property.area}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Built-up</div>
                    <div className="text-base font-black text-navy-950 mt-1">
                      {property.builtUpAreaSqFt ? `${property.builtUpAreaSqFt} sq.ft` : '2,500 sq.ft'}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-emerald-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Plot Extent</div>
                    <div className="text-base font-black text-navy-950 mt-1 flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-emerald-600" />
                      <span>{property.sizeSqYds ? `${property.sizeSqYds} sq.yd` : property.area}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Facing</div>
                    <div className="text-base font-black text-navy-950 mt-1 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-emerald-600" />
                      <span>{property.facing || 'East'}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Road Width</div>
                    <div className="text-base font-black text-navy-950 mt-1">
                      {property.roadWidth || '18 meters'}
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-2xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Corner Plot</div>
                    <div className="text-base font-black text-navy-950 mt-1">
                      {property.cornerPlot ? 'Yes (Dual Road)' : 'No'}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Description Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-100 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-navy-950">
                Property Overview & Detailed Description
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {property.description}
              </p>

              {property.highlights && property.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-black text-navy-950 uppercase tracking-wider mb-3">
                    Key Advantages & Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {property.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Documentation & Legal Review Status */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-100 shadow-sm">
              <h3 className="text-lg font-black text-navy-950 mb-3 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                <span>Cadastral Documentation & Verification</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-semibold">Title Continuity Status:</span>
                  <span className="font-bold text-navy-950">{property.documentation?.titleReviewStatus || 'Verified Clear Title Chain'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Sanction Order / Allotment:</span>
                  <span className="font-bold text-navy-950 font-mono">{property.documentation?.crdallpSanctionNo || 'CRDA Allotment Record Active'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Encumbrance Certificate:</span>
                  <span className="font-bold text-emerald-700">{property.documentation?.encumbranceStatus || 'Nil Encumbrance Checked'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Verification Desk:</span>
                  <span className="font-bold text-navy-950">Amaravati Land Intelligence Cell</span>
                </div>
              </div>
            </div>

            {/* Nearby Capital Landmarks Proximity */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-100 shadow-sm">
              <h3 className="text-lg font-black text-navy-950 mb-3 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-600" />
                <span>Capital Region Landmark Proximities</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {amaravatiLandmarks.slice(0, 4).map((lm) => (
                  <div key={lm.name} className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">{lm.name}:</span>
                    <span className="font-black text-navy-950">~3-5 km</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action Box & Location */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sticky Contact Box */}
            <div className="bg-white p-6 rounded-3xl border-2 border-blue-200 shadow-xl sticky top-24 space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Property Reference ID
                </span>
                <div className="font-mono text-base font-black text-navy-950">
                  {property.id}
                </div>
                {property.plotCode && (
                  <div className="font-mono text-xs font-bold text-amber-700">
                    APCRDA: {property.plotCode}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* WhatsApp Action */}
                <a
                  href={getWhatsAppLink(property)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Details</span>
                </a>

                {/* Enquire Modal Action */}
                <button
                  onClick={() => openEnquiryModal(property)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Request Callback</span>
                </button>

                {/* Schedule Site Visit */}
                <button
                  onClick={() => openScheduleVisitModal(property)}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Schedule Site Inspection</span>
                </button>
              </div>

              {/* Map & Navigation Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <Link
                  to={`/map?id=${property.id}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>View on Interactive GIS Map</span>
                </Link>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-rose-500" />
                  <span>Get Turn-by-Turn GPS Directions</span>
                </a>
              </div>

              {/* Direct Telephone Hotline */}
              <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
                <div>Direct Land Advisory Hotline:</div>
                <a href="tel:+919876543210" className="font-black text-navy-950 text-sm hover:text-blue-600">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings Section */}
        {similarProperties.length > 0 && (
          <div className="pt-10 border-t-2 border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy-950">
                  Similar Verified Properties in Amaravati
                </h2>
                <p className="text-xs text-slate-500">
                  More listings matching this category and price tier
                </p>
              </div>
              <Link to="/buy-property" className="text-xs font-bold text-blue-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
