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
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

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

  // Find property by slug or id
  const property = properties.find((p) => p.slug === id || p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
        <Building className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Property Not Found</h2>
        <p className="text-slate-600 mb-6 max-w-sm">
          The property you are looking for may have been sold or unlisted.
        </p>
        <Link
          to="/buy"
          className="px-6 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-sm shadow-md"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  const isSaved = isPropertySaved(property.id);
  const images = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
  ];

  // Similar properties in same category
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.category === property.category))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property on SimplyBuySell: ${property.title} in ${property.location}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Property link copied to clipboard.');
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-brand-orange">Home</Link>
            <span>/</span>
            <Link to="/buy" className="hover:text-brand-orange">Properties</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-orange flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              title="Share Property"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold shadow-sm transition-colors ${
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

        {/* Title & Key Info Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-navy-900 text-white">
                  {property.type}
                </span>
                {property.verified && (
                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                    Verified Listing
                  </span>
                )}
                {property.featured && (
                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 text-brand-orange border border-orange-200">
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                    Featured
                  </span>
                )}
                <span className="text-xs font-semibold text-slate-500">
                  Posted: {property.postedDate}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-snug">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{property.address || `${property.location}, Andhra Pradesh`}</span>
              </div>
            </div>

            {/* Price Pill */}
            <div className="lg:text-right shrink-0">
              <div className="text-xs uppercase font-bold text-slate-400">Total Price</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-royal">
                {property.priceDisplay}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Estimated ₹{Math.round((property.price || 0) / (property.areaSqFt || 1000)).toLocaleString()}/sq.ft.
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-8 space-y-4">
            {/* Main Active Image */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-100">
              <img
                src={images[activeImageIndex]}
                alt={`${property.title} photo ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-semibold">
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
                    className={`relative w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activeImageIndex
                        ? 'border-brand-orange scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-card">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 font-semibold uppercase">Super Area</div>
                <div className="text-base font-bold text-navy-900 mt-1 flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-brand-orange" />
                  <span>{property.area}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 font-semibold uppercase">Bedrooms</div>
                <div className="text-base font-bold text-navy-900 mt-1 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-brand-green" />
                  <span>{property.bedrooms ? `${property.bedrooms} BHK` : 'N/A (Plot/Land)'}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 font-semibold uppercase">Bathrooms</div>
                <div className="text-base font-bold text-navy-900 mt-1 flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-brand-royal" />
                  <span>{property.bathrooms ? `${property.bathrooms} Baths` : 'N/A'}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 font-semibold uppercase">Status</div>
                <div className="text-base font-bold text-navy-900 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="truncate">{property.status || 'Available'}</span>
                </div>
              </div>
            </div>

            {/* Property Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-100 space-y-4">
              <h2 className="text-xl font-bold text-navy-900">About This Property</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>

              {/* Highlights */}
              {property.highlights && property.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-100">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800"
                    >
                      <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Locations */}
            {property.nearby && property.nearby.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-100">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Location & Connectivity</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.nearby.map((loc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        <MapPin className="w-4 h-4 text-brand-royal" />
                        <span>{loc.name}</span>
                      </div>
                      <span className="font-bold text-brand-orange">{loc.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact & Action Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sticky Card */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 sticky top-24 space-y-6">
              {/* Interested CTA */}
              <div className="text-center pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-1">
                  Ready to inspect?
                </span>
                <h3 className="text-xl font-extrabold text-navy-900">
                  Interested in this property?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our verified property advisor directly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => openEnquiryModal(property)}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>Enquire Now</span>
                </button>

                <a
                  href={getWhatsAppLink(null, property.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp with Property Details</span>
                </a>

                <button
                  onClick={() => openScheduleVisitModal(property)}
                  className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  <span>Schedule Site Visit</span>
                </button>

                <a
                  href={`tel:${property.seller?.phone?.replace(/\s+/g, '') || '919876543210'}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-royal" />
                  <span>Call {property.seller?.phone || '+91 98765 43210'}</span>
                </a>
              </div>

              {/* Verified Seller / Partner Info Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-navy-900 text-white flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-navy-900">
                      {property.seller?.name || 'SimplyBuySell Advisor'}
                    </h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-green" title="Verified Seller" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {property.seller?.role || 'Authorized Property Partner'}
                  </div>
                </div>
              </div>

              {/* Safe Transaction Guarantee */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>SimplyBuySell Safe Deal Guarantee</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Clear title verification, CRDA sanction audit, and escrow consultation supported.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900">Similar Properties in Amaravati</h2>
                <p className="text-slate-500 text-sm">Explore related listings that match this property type</p>
              </div>
              <Link to="/buy" className="text-xs sm:text-sm font-bold text-brand-orange hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${property.seller?.phone?.replace(/\s+/g, '') || '919876543210'}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <Phone className="w-4 h-4 text-brand-orange" />
          <span>Call</span>
        </a>

        <a
          href={getWhatsAppLink(null, property.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => openEnquiryModal(property)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-brand-orange text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-brand-orange/20"
        >
          <span>Enquire</span>
        </button>
      </div>
    </div>
  );
}
