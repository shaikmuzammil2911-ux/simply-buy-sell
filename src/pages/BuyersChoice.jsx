import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building,
  Home,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function BuyersChoice() {
  const { properties, openEnquiryModal, getWhatsAppLink } = useApp();
  const [activeCategory, setActiveCategory] = useState('best-flats');

  const categories = [
    { id: 'best-flats', label: 'Best Flats', icon: Building, desc: 'Top high-rise apartments with luxury amenities in Amaravati core & Mangalagiri.' },
    { id: 'best-villas', label: 'Best Villas', icon: Home, desc: 'Ultra-luxury independent villas with private gardens in gated sanctuaries.' },
    { id: 'best-plots', label: 'Best Plots', icon: MapPin, desc: 'CRDA & DTCP approved open plots with clear link documents.' },
    { id: 'best-investment', label: 'High-ROI Investments', icon: TrendingUp, desc: 'Commercial spaces and growth-corridor land tracts for capital appreciation.' },
    { id: 'budget-friendly', label: 'Budget-Friendly', icon: Award, desc: 'Value-for-money flats and plots under ₹50 Lakhs.' },
    { id: 'high-growth', label: 'High-Growth Locations', icon: Sparkles, desc: 'Properties situated along proposed highway corridors and Secretariat zones.' },
  ];

  const getFilteredProperties = () => {
    switch (activeCategory) {
      case 'best-flats':
        return properties.filter((p) => p.type === 'Flats' || p.type === 'Apartments');
      case 'best-villas':
        return properties.filter((p) => p.type === 'Villas' || p.type === 'Houses');
      case 'best-plots':
        return properties.filter((p) => p.type === 'Plots' || p.type === 'Open Plots');
      case 'best-investment':
        return properties.filter((p) => p.category === 'commercial' || p.category === 'investment');
      case 'budget-friendly':
        return properties.filter((p) => (p.price || 0) <= 5000000);
      case 'high-growth':
        return properties.filter((p) => p.location === 'Amaravati' || p.location === 'Thullur');
      default:
        return properties;
    }
  };

  const selectedProperties = getFilteredProperties();
  const currentCategory = categories.find((c) => c.id === activeCategory);

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-blue-50/50 to-sky-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Curated Recommendations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Buyer's Choice — Amaravati
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Expertly curated selections based on capital safety, layout approvals, construction quality, and future appreciation potential.
          </p>
        </div>

        {/* Category Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-navy-900 text-white border-navy-900 shadow-lg -translate-y-1'
                    : 'bg-white text-slate-700 border-slate-100 hover:border-slate-300 shadow-sm'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-orange' : 'text-brand-royal'}`} />
                <span className="text-xs font-bold">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Highlight Banner */}
        {currentCategory && (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Curated Collection
              </div>
              <h2 className="text-xl font-bold text-navy-900 mt-0.5">
                {currentCategory.label} in Amaravati Region
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {currentCategory.desc}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openEnquiryModal()}
                className="px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold shadow-md hover:bg-brand-orangeDark transition-colors"
              >
                Consult an Expert
              </button>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </div>
  );
}
