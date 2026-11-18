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
  ArrowRight,
  Layers,
  Check,
  ExternalLink,
  MapPin,
  Compass
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

  // Quick Stats & Category Breakdown
  const totalProps = properties.length;
  const lpsPlotsCount = properties.filter((p) => p.propertyCategory === 'lps_plots' || (!p.propertyCategory && p.type === 'Plots')).length;
  const apartmentsCount = properties.filter((p) => p.propertyCategory === 'apartments' || (!p.propertyCategory && p.type === 'Flats')).length;
  const housesCount = properties.filter((p) => p.propertyCategory === 'houses' || (!p.propertyCategory && p.type === 'Houses')).length;
  const openPlotsCount = properties.filter((p) => p.propertyCategory === 'open_plots').length;

  const totalEnquiries = enquiries.length;
  const totalSellRequests = sellRequests.length;
  const pendingSellRequests = sellRequests.filter((s) => s.status !== 'Published').length;
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
            { id: 'sellRequests', label: `Seller Submissions (${totalSellRequests})`, icon: FileText, badge: pendingSellRequests > 0 ? pendingSellRequests : null },
            { id: 'enquiries', label: `Buyer Enquiries (${totalEnquiries})`, icon: MessageSquare },
            { id: 'schemas', label: 'Dynamic Category Schemas', icon: Layers },
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
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-brand-orange text-white">
                    {tab.badge}
                  </span>
                )}
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
                <div className="text-xs text-orange-600 font-semibold mt-1">{pendingSellRequests} awaiting review</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase">Pending Reviews</div>
                <div className="text-3xl font-extrabold text-purple-600 mt-1">{pendingReviews}</div>
                <div className="text-xs text-purple-500 font-semibold mt-1">Need approval</div>
              </div>
            </div>

            {/* Dynamic Multi-Category Inventory Breakdown */}
            <div className="bg-gradient-to-r from-blue-50/80 via-white to-orange-50/80 p-6 rounded-3xl border border-blue-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-navy-950 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-royal" />
                    <span>Live Multi-Category Inventory Breakdown</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Categorized with dedicated schemas, measurements, and intelligent filtering.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('schemas')}
                  className="text-xs font-bold text-brand-royal hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>View Dynamic Schemas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Amaravati LPS Plots</div>
                  <div className="text-2xl font-black text-navy-950 mt-1">{lpsPlotsCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Price / Sq.Yd • APCRDA Codes</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs">
                  <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Apartment Flats</div>
                  <div className="text-2xl font-black text-navy-950 mt-1">{apartmentsCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Price / Sq.Ft • BHK & Floors</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-200/80 shadow-xs">
                  <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Individual Houses</div>
                  <div className="text-2xl font-black text-navy-950 mt-1">{housesCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Plot sq.yd + Built-up sq.ft</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs">
                  <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Open Plots</div>
                  <div className="text-2xl font-black text-navy-950 mt-1">{openPlotsCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">DTCP / Layout Ventures</div>
                </div>
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-navy-900">Seller Property Submissions & Approvals</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review seller submissions, verify cadastral/plot details, and approve to immediately publish to the live catalog.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-orange bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 self-start sm:self-auto">
                {pendingSellRequests} Submissions Awaiting Approval
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                    <th className="pb-3">Seller Details</th>
                    <th className="pb-3">Category & Title</th>
                    <th className="pb-3">Cadastral / Specs</th>
                    <th className="pb-3">Price Ask</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Approval Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sellRequests.map((sell) => {
                    const isPublished = sell.status === 'Published';
                    const categoryLabel = 
                      sell.propertyCategory === 'lps_plots' ? 'Amaravati LPS Plot' :
                      sell.propertyCategory === 'apartments' ? 'Apartment Flat' :
                      sell.propertyCategory === 'houses' ? 'Individual House' :
                      sell.propertyCategory === 'open_plots' ? 'Open Plot' : (sell.propertyType || 'Plot');

                    const categoryBadgeClass =
                      sell.propertyCategory === 'lps_plots' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      sell.propertyCategory === 'apartments' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      sell.propertyCategory === 'houses' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-amber-50 text-amber-700 border-amber-200';

                    return (
                      <tr key={sell.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 pr-4">
                          <div className="font-bold text-navy-900">{sell.fullName}</div>
                          <div className="text-xs text-slate-500">{sell.mobileNumber}</div>
                          <div className="text-[11px] text-slate-400">{sell.whatsappNumber ? `WA: ${sell.whatsappNumber}` : ''}</div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${categoryBadgeClass} mb-1`}>
                            {categoryLabel}
                          </span>
                          <div className="font-bold text-navy-900 text-xs sm:text-sm line-clamp-1">{sell.propertyTitle}</div>
                          <div className="text-xs text-slate-500">{sell.village || sell.location || 'Amaravati'}</div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="text-xs font-semibold text-slate-700">{sell.area || `${sell.extent || 200} sq.yd`}</div>
                          {sell.apcrdaPlotCode && (
                            <div className="text-[11px] font-mono text-brand-royal font-bold">Code: {sell.apcrdaPlotCode}</div>
                          )}
                          {sell.bhk && (
                            <div className="text-[11px] text-slate-500 font-medium">{sell.bhk} • {sell.floorNumber || '1st'} Floor</div>
                          )}
                          <div className="text-[11px] text-slate-400">{sell.facing ? `${sell.facing} Facing` : ''} {sell.roadWidth ? `• ${sell.roadWidth}` : ''}</div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="text-brand-orange font-black text-sm">{sell.priceExpectation}</div>
                          {sell.pricePerSqYd && (
                            <div className="text-[10px] text-slate-500">₹{sell.pricePerSqYd.toLocaleString()}/sq.yd</div>
                          )}
                          {sell.pricePerSqFt && (
                            <div className="text-[10px] text-slate-500">₹{sell.pricePerSqFt.toLocaleString()}/sq.ft</div>
                          )}
                        </td>
                        <td className="py-3 pr-4">
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
                        <td className="py-3 text-right">
                          {isPublished ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Live on Website</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                const newId = `prop-sub-${Date.now()}`;
                                addProperty({
                                  id: newId,
                                  title: sell.propertyTitle || `${sell.village || 'Amaravati'} Property`,
                                  propertyCategory: sell.propertyCategory || 'lps_plots',
                                  category: sell.propertyCategory === 'lps_plots' ? (sell.zoning === 'Commercial' ? 'commercial' : 'residential') : (sell.propertyCategory === 'apartments' ? 'residential' : 'residential'),
                                  type: sell.propertyCategory === 'apartments' ? 'Flats' : sell.propertyCategory === 'houses' ? 'Houses' : 'Plots',
                                  price: sell.priceNumber || 5500000,
                                  priceDisplay: sell.priceExpectation || '₹55 Lakhs',
                                  pricePerSqYd: sell.pricePerSqYd || (sell.propertyCategory?.includes('plot') ? 27500 : null),
                                  pricePerSqFt: sell.pricePerSqFt || (!sell.propertyCategory?.includes('plot') ? 4800 : null),
                                  village: sell.village || 'Thullur',
                                  mandal: sell.mandal || 'Thullur',
                                  location: sell.village ? `${sell.village}, Amaravati` : (sell.location || 'Amaravati'),
                                  address: sell.address || `${sell.village || 'Amaravati'}, Capital Region, AP`,
                                  area: sell.area || `${sell.extent || 200} sq.yd`,
                                  extent: sell.extent || 200,
                                  unit: sell.unit || 'sq.yd',
                                  bhk: sell.bhk,
                                  bathrooms: sell.bathrooms,
                                  houseType: sell.houseType,
                                  facing: sell.facing || 'East',
                                  roadWidth: sell.roadWidth || '40 Feet',
                                  apcrdaPlotCode: sell.apcrdaPlotCode,
                                  surveyNumber: sell.surveyNumber,
                                  plotNumber: sell.plotNumber,
                                  images: sell.images && sell.images.length > 0 ? sell.images : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'],
                                  description: sell.description || `Verified listing in ${sell.village || 'Amaravati'}. Clear titles and high appreciation corridor.`,
                                  status: 'Available',
                                  verified: true,
                                  featured: false
                                });
                                updateSellStatus(sell.id, 'Published');
                                showToast('Approved & Published!', `Listing "${sell.propertyTitle}" is now live in the public catalog.`);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 ml-auto transition-all hover:scale-105"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve & Publish</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: DYNAMIC CATEGORY SCHEMAS */}
        {activeTab === 'schemas' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in space-y-6">
            <div>
              <h2 className="text-xl font-black text-navy-950 flex items-center gap-2">
                <Layers className="w-6 h-6 text-brand-royal" />
                <span>Dynamic Multi-Category Schema Inspector</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Field structures, rules, and calculation engines applied dynamically to seller submission forms, discovery filters, and detail pages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category 1: LPS Plots */}
              <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/30">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                    <h3 className="font-extrabold text-navy-950 text-base">Amaravati LPS Plots (Priority #1)</h3>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 uppercase">
                    Land Pooling
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-500 font-semibold">Classification</span>
                    <span className="font-bold text-navy-900">Residential or Commercial</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-500 font-semibold">APCRDA Plot Code</span>
                    <span className="font-mono font-bold text-brand-royal">Required (e.g. LPS-THU-R-0412)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-500 font-semibold">Measurement Unit</span>
                    <span className="font-bold text-navy-900">Square Yards (sq.yd)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-500 font-semibold">Auto-Calculated Field</span>
                    <span className="font-bold text-emerald-700">Price per Sq.Yard</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-slate-500 font-semibold">Cadastral / Layout Specs</span>
                    <span className="font-bold text-navy-900">Survey #, Facing, Road Width, Corner Plot</span>
                  </div>
                  <div className="p-2 bg-emerald-100/70 rounded-lg text-emerald-900 font-bold text-[11px]">
                    ✓ Bed / Bath fields strictly hidden (Plots only)
                  </div>
                </div>
              </div>

              {/* Category 2: Apartment Flats */}
              <div className="p-5 rounded-2xl border-2 border-blue-300 bg-blue-50/30">
                <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <h3 className="font-extrabold text-navy-950 text-base">Apartment Flats</h3>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-200 text-blue-900 uppercase">
                    Residential
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span className="text-slate-500 font-semibold">BHK Configuration</span>
                    <span className="font-bold text-navy-900">1, 2, 2.5, 3, 3.5, 4+ BHK</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span className="text-slate-500 font-semibold">Floors</span>
                    <span className="font-bold text-navy-900">Floor Number & Total Tower Floors</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span className="text-slate-500 font-semibold">Area Measurement</span>
                    <span className="font-bold text-navy-900">Super Built-up & Carpet Area (sq.ft)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span className="text-slate-500 font-semibold">Auto-Calculated Field</span>
                    <span className="font-bold text-blue-700">Price per Sq.Foot</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-100">
                    <span className="text-slate-500 font-semibold">Living Amenities</span>
                    <span className="font-bold text-navy-900">Bathrooms, Balconies, Reserved Car Parking</span>
                  </div>
                  <div className="p-2 bg-blue-100/70 rounded-lg text-blue-900 font-bold text-[11px]">
                    ✓ Displays complete flat living metrics & floor specs
                  </div>
                </div>
              </div>

              {/* Category 3: Individual Houses */}
              <div className="p-5 rounded-2xl border-2 border-purple-300 bg-purple-50/30">
                <div className="flex items-center justify-between pb-3 border-b border-purple-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                    <h3 className="font-extrabold text-navy-950 text-base">Individual Houses & Villas</h3>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-200 text-purple-900 uppercase">
                    Independent
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-purple-100">
                    <span className="text-slate-500 font-semibold">House Type</span>
                    <span className="font-bold text-navy-900">Duplex, Independent Villa, Bungalow</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-purple-100">
                    <span className="text-slate-500 font-semibold">Dual Area Metrics</span>
                    <span className="font-bold text-navy-900">Plot Extent (sq.yd) + Built-up (sq.ft)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-purple-100">
                    <span className="text-slate-500 font-semibold">Elevation & Floors</span>
                    <span className="font-bold text-navy-900">G, G+1, G+2 with Covered Parking</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-purple-100">
                    <span className="text-slate-500 font-semibold">Auto-Calculated Field</span>
                    <span className="font-bold text-purple-700">Price per Built-up Sq.Foot</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-purple-100">
                    <span className="text-slate-500 font-semibold">Property Details</span>
                    <span className="font-bold text-navy-900">Compound Wall, Borewell, Vaastu Direction</span>
                  </div>
                  <div className="p-2 bg-purple-100/70 rounded-lg text-purple-900 font-bold text-[11px]">
                    ✓ Combines land parcel extent with home living area
                  </div>
                </div>
              </div>

              {/* Category 4: Open Plots */}
              <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/30">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                    <h3 className="font-extrabold text-navy-950 text-base">Open Plots & Ventures</h3>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-200 text-amber-900 uppercase">
                    DTCP / CRDA Layouts
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span className="text-slate-500 font-semibold">Layout / Venture</span>
                    <span className="font-bold text-navy-900">Approval Authority, Venture Name</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span className="text-slate-500 font-semibold">Measurement Unit</span>
                    <span className="font-bold text-navy-900">Square Yards (sq.yd) / Cents</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span className="text-slate-500 font-semibold">Auto-Calculated Field</span>
                    <span className="font-bold text-amber-700">Price per Sq.Yard</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span className="text-slate-500 font-semibold">Dimensions</span>
                    <span className="font-bold text-navy-900">Length × Width, Frontage, Road Width</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span className="text-slate-500 font-semibold">Plot Attributes</span>
                    <span className="font-bold text-navy-900">Corner, East/North Facing, Gated Layout</span>
                  </div>
                  <div className="p-2 bg-amber-100/70 rounded-lg text-amber-900 font-bold text-[11px]">
                    ✓ Tailored for immediate construction & investment ventures
                  </div>
                </div>
              </div>
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
