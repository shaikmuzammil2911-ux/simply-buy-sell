import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Tag,
  DollarSign,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Search,
  ArrowRight,
  Filter,
  Compass,
  Phone,
  FileCheck2,
  Users,
  Building,
  Check,
  HelpCircle,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages } from '../data/mockData';
import PropertyCard from '../components/PropertyCard';

export default function BuyersChoice() {
  const { properties, showToast } = useApp();
  const navigate = useNavigate();

  // Category switcher tabs (as shown in image copy 10)
  const categoryTabs = [
    { id: 'lps_plots', label: 'Amaravathi LPS Plots' },
    { id: '2nd_pooling', label: '2nd Pooling Lands' },
    { id: 'ravela_airport', label: 'Near Ravela Airport / Amaravathi Lands' },
    { id: 'apartments', label: 'Apartment Flats' },
    { id: 'open_plots', label: 'Open Plots' },
  ];
  const [activeTab, setActiveTab] = useState('lps_plots');

  // Form State (exact fields from image copy 10)
  const [buyerData, setBuyerData] = useState({
    name: '',
    contactNumber: '',
    plotType: 'Residential', // Residential | Commercial
    plotSize: '200 - 300 Sq.Yd',
    facing: 'Any',
    budget: '₹50 Lakhs - ₹1 Crore',
    villagePreference: 'Any',
    purposeOfPurchase: 'Investment', // Self Use | Family | Investment | Company
    additionalRequirement: ''
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerData((prev) => ({ ...prev, [name]: value }));
  };

  // Live filter matching properties
  const matchingProperties = useMemo(() => {
    return properties.filter((p) => {
      // Type
      if (buyerData.plotType === 'Residential' && !p.category?.toLowerCase().includes('residential')) return false;
      if (buyerData.plotType === 'Commercial' && !p.category?.toLowerCase().includes('commercial')) return false;

      // Facing
      if (buyerData.facing !== 'Any' && !p.facing?.toLowerCase().includes(buyerData.facing.toLowerCase())) {
        return false;
      }

      // Village
      if (buyerData.villagePreference !== 'Any' && p.village?.toLowerCase() !== buyerData.villagePreference.toLowerCase()) {
        return false;
      }

      // Budget
      const price = p.price || 0;
      if (buyerData.budget === 'Under ₹50 Lakhs' && price > 5000000) return false;
      if (buyerData.budget === '₹50 Lakhs - ₹1 Crore' && (price < 5000000 || price > 10000000)) return false;
      if (buyerData.budget === '₹1 Crore - ₹2 Crores' && (price < 10000000 || price > 20000000)) return false;
      if (buyerData.budget === 'Above ₹2 Crores' && price < 20000000) return false;

      return true;
    });
  }, [properties, buyerData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!buyerData.name || !buyerData.contactNumber) {
      alert('Please enter your Name and Contact Number.');
      return;
    }

    setHasSubmitted(true);
    showToast('Requirement Logged', `Found ${matchingProperties.length} plots matching your preference!`, 'success');

    // Smooth scroll down to matching plots
    setTimeout(() => {
      document.getElementById('matching-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16">
      {/* 1. TOP HEADER BANNER (Matching image copy 10) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buyer Requirement Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Buy / Sell Property
            </h1>
            <p className="text-blue-100 text-sm sm:text-base mt-1 max-w-xl">
              List your property or find the right one with trust and transparency.
            </p>
          </div>

          {/* Quick Mode Toggle Switch */}
          <div className="flex items-center gap-2 bg-blue-900/60 p-1.5 rounded-2xl border border-white/20 shrink-0">
            <Link
              to="/buy"
              className="px-5 py-2.5 rounded-xl text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Tag className="w-4 h-4 text-blue-300" />
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
              className="px-5 py-2.5 rounded-xl bg-white text-blue-800 font-black text-sm shadow-md flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Buyers Choice</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS (From image copy 10) */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
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

      {/* 3. MAIN FORM & WORKFLOW CARDS (From image copy 10) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: BUYER'S CHOICE FORM (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                  Buyer's Choice & Requirement Finder
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Specify your exact plot requirements to match verified Amaravati sellers instantly.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shrink-0">
                Direct Seller Connect
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter full name"
                    value={buyerData.name}
                    onChange={handleChange}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    required
                    placeholder="e.g. +91 98480 12345"
                    value={buyerData.contactNumber}
                    onChange={handleChange}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Plot Type */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Plot Type *
                  </label>
                  <select
                    name="plotType"
                    value={buyerData.plotType}
                    onChange={handleChange}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Residential">Residential Plot</option>
                    <option value="Commercial">Commercial Plot</option>
                  </select>
                </div>

                {/* Plot Size Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Plot Size *
                  </label>
                  <select
                    name="plotSize"
                    value={buyerData.plotSize}
                    onChange={handleChange}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="100 - 200 Sq.Yd">100 - 200 Sq.Yd (Compact)</option>
                    <option value="200 - 300 Sq.Yd">200 - 300 Sq.Yd (Standard)</option>
                    <option value="300 - 500 Sq.Yd">300 - 500 Sq.Yd (Large)</option>
                    <option value="500+ Sq.Yd">500+ Sq.Yd (Estate / Commercial)</option>
                  </select>
                </div>

                {/* Facing Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Facing Preference *
                  </label>
                  <select
                    name="facing"
                    value={buyerData.facing}
                    onChange={handleChange}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Any">Any Facing</option>
                    <option value="East">East Facing</option>
                    <option value="North">North Facing</option>
                    <option value="West">West Facing</option>
                    <option value="South">South Facing</option>
                    <option value="North-East">North-East Corner</option>
                  </select>
                </div>

                {/* Budget Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Budget Range (₹) *
                  </label>
                  <select
                    name="budget"
                    value={buyerData.budget}
                    onChange={handleChange}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
                    <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                    <option value="₹1 Crore - ₹2 Crores">₹1 Crore - ₹2 Crores</option>
                    <option value="Above ₹2 Crores">Above ₹2 Crores</option>
                  </select>
                </div>
              </div>

              {/* Village Preference */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Preferred Amaravati Village *
                </label>
                <select
                  name="villagePreference"
                  value={buyerData.villagePreference}
                  onChange={handleChange}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Any">Any Amaravati Village (All 29)</option>
                  {amaravatiVillages.map((v) => (
                    <option key={v.slug} value={v.name}>{v.name} ({v.zone || 'Amaravati'})</option>
                  ))}
                </select>
              </div>

              {/* Purpose of Purchase Radio Pills (From image copy 10) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">
                  Purpose of Purchase *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Self Use', 'Family', 'Investment', 'Company'].map((purpose) => (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => setBuyerData((prev) => ({ ...prev, purposeOfPurchase: purpose }))}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                        buyerData.purposeOfPurchase === purpose
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Additional Requirements (Optional)
                </label>
                <textarea
                  name="additionalRequirement"
                  rows={3}
                  placeholder="e.g. Near Seed Access Road, wide 60ft frontage, ready for immediate registration..."
                  value={buyerData.additionalRequirement}
                  onChange={handleChange}
                  className="w-full text-xs font-medium px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-600/30 ring-4 ring-blue-100 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Find Matching Plots & Submit Requirement ({matchingProperties.length} Matches)</span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: HOW IT WORKS FOR BUYERS (From image copy 10) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-black text-navy-950 text-base">
                  How It Works for Buyers?
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-800 block">Post Exact Requirement</strong>
                    Share your preferred village, plot dimensions, road width, and investment budget.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-800 block">Instant Inventory Matching</strong>
                    Our algorithmic engine filters live verified APCRDA returnable plots that fit your specifications.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-800 block">Direct Owner Connect</strong>
                    Get unlocked access to authenticated sellers and landowners with zero intermediary brokerage.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <strong className="text-slate-800 block">Title Verification Support</strong>
                    Access 30-year encumbrance reports, APCRDA allotment letters, and cadastral survey validations.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Direct Buyer Helpline</span>
                <div className="text-xs font-bold text-slate-800 mb-2">Have specific commercial or institutional land requirements?</div>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 hover:text-blue-900"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 98765 43210</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. DYNAMIC MATCHING RESULTS SECTION */}
        <div id="matching-results" className="mt-12 pt-10 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Live Matching Plots</span>
              </div>
              <h3 className="text-2xl font-black text-navy-950">
                Matching Amaravati Properties ({matchingProperties.length} Found)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Filtered based on {buyerData.plotType} • {buyerData.plotSize} • {buyerData.budget} • {buyerData.villagePreference} Village
              </p>
            </div>

            <Link
              to="/buy"
              className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-xl border border-blue-200 flex items-center gap-1.5 shrink-0 self-start"
            >
              <span>Explore All Listings ({properties.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {matchingProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
              <Compass className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 text-sm">No Exact Match for This Strict Criteria</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try selecting "Any" village or adjusting your budget range to view more available plots in Amaravati.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
