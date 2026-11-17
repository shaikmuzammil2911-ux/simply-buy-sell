import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  FileText,
  Sliders,
  Users,
  MessageSquare,
  Sparkles,
  Settings,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Eye,
  ShieldCheck,
  Search,
  Save,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    toggleFeatured,
    toggleVerified,
    heroSlides,
    updateHeroSlide,
    toggleHeroSlideActive,
    reviews,
    approveReview,
    rejectReview,
    deleteReview,
    enquiries,
    updateEnquiryStatus,
    sellRequests,
    updateSellStatus,
    statistics,
    setStatistics,
    siteSettings,
    setSiteSettings,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  // Quick Stats
  const totalProps = properties.length;
  const totalEnquiries = enquiries.length;
  const totalSellRequests = sellRequests.length;
  const totalReviews = reviews.length;
  const pendingReviews = reviews.filter((r) => !r.approved).length;

  // New Property Modal / Form State
  const [newProp, setNewProp] = useState({
    title: '',
    type: 'Flats',
    category: 'residential',
    price: 5000000,
    priceDisplay: '₹50 Lakhs',
    location: 'Amaravati',
    address: 'Near Core Zone, Amaravati, AP',
    area: '1,450 sq.ft.',
    areaSqFt: 1450,
    bedrooms: 3,
    bathrooms: 2,
    status: 'Ready to Move',
    featured: false,
    verified: true,
    furnishing: 'Semi-Furnished',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
    description: 'Beautiful newly developed property in Amaravati with clear titles and modern amenities.',
    highlights: ['100% Vaastu Compliant', 'Clear Title CRDA Layout', 'Fast Appreciating Zone'],
    amenities: ['Power Backup', '24/7 Security', 'Car Parking', 'Water Storage']
  });

  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  // Content Settings Form state
  const [settingsForm, setSettingsForm] = useState({
    phone: siteSettings.phone,
    email: siteSettings.email,
    location: siteSettings.location,
    address: siteSettings.address,
    trustStatement: siteSettings.trustStatement,
    propListed: statistics.propertiesListed,
    happyCust: statistics.happyCustomers,
    trustedPlatform: statistics.trustedPlatform
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSiteSettings((prev) => ({
      ...prev,
      phone: settingsForm.phone,
      email: settingsForm.email,
      location: settingsForm.location,
      address: settingsForm.address,
      trustStatement: settingsForm.trustStatement
    }));
    setStatistics((prev) => ({
      ...prev,
      propertiesListed: settingsForm.propListed,
      happyCustomers: settingsForm.happyCust,
      trustedPlatform: settingsForm.trustedPlatform
    }));
    showToast('CMS Updated', 'Website content & stats updated successfully!');
  };

  const handleCreateProperty = (e) => {
    e.preventDefault();
    addProperty(newProp);
    setShowAddPropertyModal(false);
  };

  return (
    <div className="w-full bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>SimplyBuySell Administration Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Content & Request Management System (CMS)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Live updates made here immediately reflect across the entire public marketplace.
            </p>
          </div>

          <button
            onClick={() => setShowAddPropertyModal(true)}
            className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-orange/30 flex items-center gap-2 transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Property</span>
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'properties', label: `Properties (${totalProps})`, icon: Building },
            { id: 'enquiries', label: `Buyer Enquiries (${totalEnquiries})`, icon: MessageSquare },
            { id: 'sellRequests', label: `Seller Submissions (${totalSellRequests})`, icon: FileText },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Users },
            { id: 'slides', label: `Hero Slides (${heroSlides.length})`, icon: Sliders },
            { id: 'content', label: 'Website Content & Stats', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-orange' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase">Total Properties</div>
                <div className="text-3xl font-extrabold text-navy-900 mt-1">{totalProps}</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">Live in Amaravati</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase">Customer Enquiries</div>
                <div className="text-3xl font-extrabold text-brand-royal mt-1">{totalEnquiries}</div>
                <div className="text-xs text-blue-600 font-semibold mt-1">Direct Leads</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase">Seller Requests</div>
                <div className="text-3xl font-extrabold text-brand-orange mt-1">{totalSellRequests}</div>
                <div className="text-xs text-orange-600 font-semibold mt-1">Awaiting verification</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase">Pending Reviews</div>
                <div className="text-3xl font-extrabold text-purple-600 mt-1">{pendingReviews}</div>
                <div className="text-xs text-purple-500 font-semibold mt-1">Need approval</div>
              </div>
            </div>

            {/* Recent Enquiries & Recent Sellers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Buyer Enquiries */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-navy-900">Recent Buyer Enquiries</h3>
                  <button onClick={() => setActiveTab('enquiries')} className="text-xs font-bold text-brand-orange hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 3).map((enq) => (
                    <div key={enq.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-navy-900 text-xs sm:text-sm">{enq.name}</div>
                        <div className="text-xs text-slate-500">{enq.phone} • {enq.preferredContact}</div>
                        <div className="text-xs text-brand-royal mt-1 font-semibold">{enq.propertyTitle}</div>
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-brand-royal">
                        {enq.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Seller Requests */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-navy-900">Recent Seller Submissions</h3>
                  <button onClick={() => setActiveTab('sellRequests')} className="text-xs font-bold text-brand-orange hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {sellRequests.slice(0, 3).map((sell) => (
                    <div key={sell.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-navy-900 text-xs sm:text-sm">{sell.fullName}</div>
                        <div className="text-xs text-slate-500">{sell.mobileNumber} • {sell.location}</div>
                        <div className="text-xs text-brand-orange mt-1 font-semibold">{sell.propertyTitle} ({sell.priceExpectation})</div>
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-brand-orange">
                        {sell.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PROPERTIES */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">Manage Property Listings</h2>
              <button
                onClick={() => setShowAddPropertyModal(true)}
                className="px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                    <th className="pb-3">Property</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Badges</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="font-bold text-navy-900 line-clamp-1">{p.title}</div>
                        <div className="text-[11px] text-slate-400">{p.area}</div>
                      </td>
                      <td className="py-3 text-slate-700 font-medium">{p.type}</td>
                      <td className="py-3 text-navy-900 font-bold">{p.priceDisplay}</td>
                      <td className="py-3 text-slate-600">{p.location}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleFeatured(p.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.featured ? 'bg-orange-100 text-brand-orange' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => toggleVerified(p.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.verified ? 'bg-emerald-100 text-brand-green' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            Verified
                          </button>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => deleteProperty(p.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BUYER ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Customer Enquiries & Site Visit Bookings</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Property of Interest</th>
                    <th className="pb-3">Requirement</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-4 font-bold text-navy-900">{enq.name}</td>
                      <td className="py-3 text-slate-600">
                        <div>{enq.phone}</div>
                        <div className="text-[11px] text-slate-400">{enq.email || 'No email'}</div>
                      </td>
                      <td className="py-3 font-semibold text-brand-royal max-w-xs truncate">{enq.propertyTitle}</td>
                      <td className="py-3 text-slate-600 text-xs max-w-xs">{enq.requirement || enq.message || '—'}</td>
                      <td className="py-3">
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                          className="text-xs font-bold py-1 px-2 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SELLER SUBMISSIONS */}
        {activeTab === 'sellRequests' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Seller Property Submissions</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                    <th className="pb-3">Seller Name</th>
                    <th className="pb-3">Property Title</th>
                    <th className="pb-3">Type & Area</th>
                    <th className="pb-3">Price Ask</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sellRequests.map((sell) => (
                    <tr key={sell.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="font-bold text-navy-900">{sell.fullName}</div>
                        <div className="text-xs text-slate-500">{sell.mobileNumber}</div>
                      </td>
                      <td className="py-3 font-semibold text-navy-900">{sell.propertyTitle}</td>
                      <td className="py-3 text-slate-600">{sell.propertyType} • {sell.area}</td>
                      <td className="py-3 text-brand-orange font-bold">{sell.priceExpectation}</td>
                      <td className="py-3">
                        <select
                          value={sell.status}
                          onChange={(e) => updateSellStatus(sell.id, e.target.value)}
                          className="text-xs font-bold py-1 px-2 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Verified">Verified</option>
                          <option value="Published">Published</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Manage Reviews & Testimonials</h2>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-navy-900">{rev.name}</h4>
                      <span className="text-xs text-slate-400">({rev.location})</span>
                      <span className="text-amber-500 font-bold text-xs">★ {rev.rating}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 italic">"{rev.comment}"</p>
                    {rev.propertyUsed && (
                      <div className="text-[11px] text-brand-royal font-semibold mt-1">Service: {rev.propertyUsed}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {rev.approved ? (
                      <button
                        onClick={() => rejectReview(rev.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approved (Click to Unpublish)
                      </button>
                    ) : (
                      <button
                        onClick={() => approveReview(rev.id)}
                        className="px-3 py-1.5 rounded-lg bg-orange-100 text-brand-orange text-xs font-bold flex items-center gap-1"
                      >
                        Pending (Approve Now)
                      </button>
                    )}

                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: HERO SLIDES */}
        {activeTab === 'slides' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in space-y-6">
            <h2 className="text-xl font-bold text-navy-900">Dynamic Hero Slides (Autoplay Slider)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heroSlides.map((slide) => (
                <div key={slide.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                  <div className="h-40 relative">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleHeroSlideActive(slide.id)}
                      className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                        slide.active !== false ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {slide.active !== false ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-bold uppercase text-brand-orange">{slide.subtitle}</div>
                    <div className="font-bold text-navy-900 text-sm">{slide.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-2">{slide.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: WEBSITE CONTENT & STATS */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in max-w-3xl">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Website Header, Footer & Statistics CMS</h2>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Office Address
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Trust Statement Banner Text
                </label>
                <input
                  type="text"
                  value={settingsForm.trustStatement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, trustStatement: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stat: Properties</label>
                  <input
                    type="text"
                    value={settingsForm.propListed}
                    onChange={(e) => setSettingsForm({ ...settingsForm, propListed: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stat: Customers</label>
                  <input
                    type="text"
                    value={settingsForm.happyCust}
                    onChange={(e) => setSettingsForm({ ...settingsForm, happyCust: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stat: Trusted</label>
                  <input
                    type="text"
                    value={settingsForm.trustedPlatform}
                    onChange={(e) => setSettingsForm({ ...settingsForm, trustedPlatform: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-navy-900 hover:bg-brand-orange text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes & Publish to Site</span>
              </button>
            </form>
          </div>
        )}

        {/* Modal: Add Property */}
        {showAddPropertyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-xl font-bold text-navy-900">Add New Property to Marketplace</h3>
                <button onClick={() => setShowAddPropertyModal(false)} className="text-slate-400 hover:text-slate-700">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateProperty} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    value={newProp.title}
                    onChange={(e) => setNewProp({ ...newProp, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    placeholder="e.g. Luxury 3BHK Apartment in Mangalagiri"
                    className="w-full p-2.5 border rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Type *</label>
                    <select
                      value={newProp.type}
                      onChange={(e) => setNewProp({ ...newProp, type: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-sm"
                    >
                      <option value="Flats">Flats</option>
                      <option value="Apartments">Apartments</option>
                      <option value="Villas">Villas</option>
                      <option value="Houses">Houses</option>
                      <option value="Plots">Plots</option>
                      <option value="Open Plots">Open Plots</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      value={newProp.location}
                      onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Price Display (e.g. ₹75 Lakhs) *</label>
                    <input
                      type="text"
                      required
                      value={newProp.priceDisplay}
                      onChange={(e) => setNewProp({ ...newProp, priceDisplay: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Area (e.g. 1,800 sq.ft.) *</label>
                    <input
                      type="text"
                      required
                      value={newProp.area}
                      onChange={(e) => setNewProp({ ...newProp, area: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Description *</label>
                  <textarea
                    rows="3"
                    required
                    value={newProp.description}
                    onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProp.featured}
                      onChange={(e) => setNewProp({ ...newProp, featured: e.target.checked })}
                    />
                    <span>Mark as Featured</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProp.verified}
                      onChange={(e) => setNewProp({ ...newProp, verified: e.target.checked })}
                    />
                    <span>Verified Badge</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-orange text-white font-bold text-sm shadow-md"
                >
                  Publish Property Listing
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
