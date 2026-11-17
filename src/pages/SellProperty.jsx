import React, { useState } from 'react';
import {
  PlusCircle,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SellProperty() {
  const { submitSellProperty } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    propertyType: 'Flats',
    propertyTitle: '',
    location: 'Amaravati',
    address: '',
    priceExpectation: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    features: '',
    uploadedImageCount: 3
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = [
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
    'Amaravati',
    'Mangalagiri',
    'Thullur',
    'Vijayawada',
    'Guntur',
    'Tadikonda',
    'Tadepalli',
    'Other Andhra Pradesh Area'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitSellProperty(formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        propertyType: 'Flats',
        propertyTitle: '',
        location: 'Amaravati',
        address: '',
        priceExpectation: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        description: '',
        features: '',
        uploadedImageCount: 3
      });
    }, 600);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Seller & Owner Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Sell Your Property with SimplyBuySell
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Connect directly with verified property buyers and serious investors across the Amaravati capital region. Fast turnaround, transparent pricing, and zero spam.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-green shrink-0" />
            <div>
              <div className="text-xs font-bold text-navy-900">Verified Buyers Only</div>
              <div className="text-[11px] text-slate-500">Pre-screened inquiries with purchase intent.</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <Building className="w-8 h-8 text-brand-orange shrink-0" />
            <div>
              <div className="text-xs font-bold text-navy-900">Highest Regional Reach</div>
              <div className="text-[11px] text-slate-500">Over 10,000 active monthly Amaravati visitors.</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-brand-royal shrink-0" />
            <div>
              <div className="text-xs font-bold text-navy-900">Free Legal & Title Check</div>
              <div className="text-[11px] text-slate-500">Complimentary document and CRDA audit.</div>
            </div>
          </div>
        </div>

        {/* Main Property Submission Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Owner Details */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Seller & Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. K. Venkata Ramana"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seller@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Property Basic Details */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Property Specification & Pricing</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  >
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Property Headline / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.propertyTitle}
                    onChange={(e) => setFormData({ ...formData, propertyTitle: e.target.value })}
                    placeholder="e.g. 240 Sq.Yd East Facing Plot near Secretariat"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Location / Zone *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Price Expectation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.priceExpectation}
                    onChange={(e) => setFormData({ ...formData, priceExpectation: e.target.value })}
                    placeholder="e.g. ₹65 Lakhs (or Negotiable)"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Total Area / Extent *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. 1,650 sq.ft. or 220 sq.yd."
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              {/* Bedrooms & Bathrooms (optional for plots) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Bedrooms (if applicable)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    placeholder="e.g. 3"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Bathrooms (if applicable)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    placeholder="e.g. 3"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Detailed Address / Landmarks *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Plot/Flat No., Road Name, Sector, Landmark, Amaravati"
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            {/* Step 3: Description & Uploads */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Description & Visuals</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Property Description *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your property: facing, road width, ventilation, neighborhood advantages, clear title status..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Key Features & Amenities
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="e.g. Gated boundary, DTCP approved, 50ft road, Borewell connection"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                {/* Simulated Photo Upload Area */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Upload Property Photos (JPG, PNG, WebP)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-brand-orange rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50">
                    <Upload className="w-8 h-8 text-brand-orange mx-auto mb-2" />
                    <div className="text-xs font-bold text-navy-900">
                      Drag & drop your property photos, or browse
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Upload up to 10 high-resolution photos (Max 15MB total)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Submission button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                <span>Your contact information is strictly protected under SimplyBuySell privacy guidelines.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-xl shadow-brand-orange/30 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Property...' : 'Submit Property for Listing'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
