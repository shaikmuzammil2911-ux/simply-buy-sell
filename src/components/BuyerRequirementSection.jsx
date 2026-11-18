import React, { useState } from 'react';
import {
  FileText,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  MapPin,
  Tag,
  Compass,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages } from '../data/mockData';

export default function BuyerRequirementSection() {
  const { submitBuyerRequirement } = useApp();

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    preferredVillage: 'Thullur',
    category: 'Residential Plot',
    budget: '₹50 Lakhs – ₹1 Crore',
    requiredPlotSize: '250 – 500 sq.yd',
    facingPreference: 'East Facing',
    roadWidthRequirement: '18 meters',
    additionalRequirements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return;

    submitBuyerRequirement(form);
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-sky-50 via-blue-50/60 to-sky-50 border-y border-blue-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-blue-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left info column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-blue-950 to-navy-900 text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Personalized Plot Matchmaking</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                  Looking for a Specific Plot in Amaravati?
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Tell us your exact location, facing, road width and size criteria. Our property intelligence desk cross-references private off-market listings and verified APCRDA LPS pooling allotments to match your exact portfolio requirements.
                </p>

                <div className="space-y-4 text-xs text-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/40 text-blue-300 flex items-center justify-center font-bold">✓</div>
                    <span>Direct verification with APCRDA pooled cadastral records</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/40 text-blue-300 flex items-center justify-center font-bold">✓</div>
                    <span>No unvetted third-party brokers or inflated asking rates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/40 text-blue-300 flex items-center justify-center font-bold">✓</div>
                    <span>Confidential buyer advisory & GIS site inspection</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-blue-900/80 text-xs text-slate-400">
                Direct hotline: <strong className="text-white">+91 98765 43210</strong> (Available 9 AM – 7 PM IST)
              </div>
            </div>

            {/* Right form column */}
            <div className="lg:col-span-7 p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 mb-2">Requirement Submitted Successfully!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                    Our Amaravati land specialists have logged your criteria. We will contact you shortly with matching verified plot options.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        mobile: '',
                        whatsapp: '',
                        email: '',
                        preferredVillage: 'Thullur',
                        category: 'Residential Plot',
                        budget: '₹50 Lakhs – ₹1 Crore',
                        requiredPlotSize: '250 – 500 sq.yd',
                        facingPreference: 'East Facing',
                        roadWidthRequirement: '18 meters',
                        additionalRequirements: ''
                      });
                    }}
                    className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="font-bold text-sm text-navy-950 mb-2">
                    Submit Your Specific Plot Preferences
                  </div>

                  {/* Grid 1: Village & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Preferred Village
                      </label>
                      <select
                        value={form.preferredVillage}
                        onChange={(e) => setForm({ ...form, preferredVillage: e.target.value })}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {amaravatiVillages.map((v) => (
                          <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Residential Plot">Residential Plot</option>
                        <option value="Commercial Plot">Commercial Plot</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid 2: Budget & Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Budget Range
                      </label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
                        <option value="₹50 Lakhs – ₹1 Crore">₹50 Lakhs – ₹1 Crore</option>
                        <option value="₹1 Crore – ₹2 Crores">₹1 Crore – ₹2 Crores</option>
                        <option value="₹2 Crores+">₹2 Crores+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Required Plot Size
                      </label>
                      <select
                        value={form.requiredPlotSize}
                        onChange={(e) => setForm({ ...form, requiredPlotSize: e.target.value })}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="150 – 250 sq.yd">150 – 250 sq.yd</option>
                        <option value="250 – 500 sq.yd">250 – 500 sq.yd</option>
                        <option value="500 – 1000 sq.yd">500 – 1000 sq.yd</option>
                        <option value="1000+ sq.yd">1000+ sq.yd</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid 3: Facing & Road Width */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Facing Preference
                      </label>
                      <select
                        value={form.facingPreference}
                        onChange={(e) => setForm({ ...form, facingPreference: e.target.value })}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="East Facing">East Facing</option>
                        <option value="North Facing">North Facing</option>
                        <option value="West Facing">West Facing</option>
                        <option value="South Facing">South Facing</option>
                        <option value="North-East Facing">North-East Facing</option>
                        <option value="Any Facing">Any Facing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Road Width Requirement
                      </label>
                      <select
                        value={form.roadWidthRequirement}
                        onChange={(e) => setForm({ ...form, roadWidthRequirement: e.target.value })}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="18 meters (Standard Sector)">18 meters (Standard Sector)</option>
                        <option value="24 meters (Wide Feeder)">24 meters (Wide Feeder)</option>
                        <option value="30+ meters (Expressway Frontage)">30+ meters (Expressway Frontage)</option>
                        <option value="Any Width">Any Width</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional details */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Additional Criteria (e.g. Near Seed Access Road, Corner Plot)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Specify landmarks, specific sector preferences, or immediate vs investment timeline..."
                      value={form.additionalRequirements}
                      onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Contact info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Matching Requirement</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
