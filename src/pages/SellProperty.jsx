import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Building2,
  Home,
  MapPin,
  CheckCircle2,
  Upload,
  X,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Tag,
  Phone,
  User,
  Compass,
  Maximize2,
  Layers,
  Info,
  Calendar,
  Check,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages } from '../data/mockData';

export default function SellProperty() {
  const { addProperty, showToast } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Category switcher tabs (as shown in image copy 9)
  const categoryTabs = [
    { id: 'lps_plots', label: 'Amaravathi LPS Plots' },
    { id: '2nd_pooling', label: '2nd Pooling Lands' },
    { id: 'ravela_airport', label: 'Near Ravela Airport / Amaravathi Lands' },
    { id: 'apartments', label: 'Apartment Flats' },
    { id: 'open_plots', label: 'Open Plots' },
  ];
  const [activeTab, setActiveTab] = useState('lps_plots');

  // Form State (exact fields from image copy 9)
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    plotCode: '',
    plotType: 'Residential', // Residential | Commercial
    village: 'Thullur',
    
    // Road 1
    road1Facing: 'East',
    road1Width: '18 Meters',
    
    // Road 2 (Optional)
    road2Facing: '',
    road2Width: '',
    
    // Road 3 (Optional)
    road3Facing: '',
    road3Width: '',
    
    // Measurements & Price
    totalAreaSqYds: '',
    pricePerSqYd: '',
    agreementTime: '20-30 Days',
    saleType: 'Resale', // First Sale | Resale
    postedBy: 'Owner', // Owner | Guardian | Agent
    additionalDetails: '',
    uploadedImages: []
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPropertyId, setSubmittedPropertyId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic Total Price Calculation
  const calculatedTotalPrice = React.useMemo(() => {
    const area = parseFloat(formData.totalAreaSqYds) || 0;
    const rate = parseFloat(formData.pricePerSqYd) || 0;
    const total = area * rate;
    if (!total) return null;
    if (total >= 10000000) {
      return `₹${(total / 10000000).toFixed(2)} Crores (₹${total.toLocaleString('en-IN')})`;
    }
    return `₹${(total / 100000).toFixed(2)} Lakhs (₹${total.toLocaleString('en-IN')})`;
  }, [formData.totalAreaSqYds, formData.pricePerSqYd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index)
    }));
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contactNumber || !formData.plotCode || !formData.totalAreaSqYds || !formData.pricePerSqYd) {
      alert('Please fill all mandatory fields marked with an asterisk (*).');
      return;
    }

    const area = parseFloat(formData.totalAreaSqYds) || 200;
    const rate = parseFloat(formData.pricePerSqYd) || 28000;
    const totalPrice = area * rate;
    const newId = `SBS-PLOT-${Date.now().toString().slice(-6)}`;

    // Create property object matching AppContext schema
    const newProperty = {
      id: newId,
      plotCode: formData.plotCode,
      apcrdaPlotCode: formData.plotCode,
      title: `${area} sq.yd ${formData.plotType} Plot | ${formData.village}`,
      category: `${formData.plotType} Plot`,
      propertyCategory: activeTab === 'apartments' ? 'apartments' : activeTab === 'open_plots' ? 'open_plots' : 'lps_plots',
      type: 'Plots',
      village: formData.village,
      locality: `${formData.village} LPS Layout, Amaravati`,
      plotSizeSqYd: area,
      extentSqYds: area,
      price: totalPrice,
      pricePerSqYd: rate,
      facing: formData.road1Facing,
      roadWidth: formData.road1Width,
      cornerPlot: Boolean(formData.road2Facing),
      saleType: formData.saleType,
      agreementTime: formData.agreementTime,
      postedBy: formData.postedBy,
      ownerName: formData.name,
      ownerPhone: formData.contactNumber,
      description: formData.additionalDetails || `Verified APCRDA LPS plot in ${formData.village}. Clear title and immediate agreement available.`,
      verified: true,
      status: 'Available',
      images: formData.uploadedImages.length > 0 ? formData.uploadedImages : [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1000&q=80'
      ],
      lat: 16.5412,
      lng: 80.4721
    };

    // Save to AppContext
    if (addProperty) {
      addProperty(newProperty);
    }

    setSubmittedPropertyId(newId);
    setIsSubmitted(true);
    showToast('Listing Live!', `Plot ${formData.plotCode} has been published to the Buy section.`, 'success');
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16">
      {/* 1. TOP HEADER BANNER (Matching image copy 9) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Amaravati Land & Plot Marketplace</span>
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
              className="px-5 py-2.5 rounded-xl bg-white text-blue-800 font-black text-sm shadow-md flex items-center gap-2 transition-all"
            >
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>Sell</span>
            </Link>
            <Link
              to="/buyers-choice"
              className="px-5 py-2.5 rounded-xl text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Buyers Choice</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS (From image copy 9) */}
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

      {/* 3. MAIN FORM & SIDEBAR (From image copy 9) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Listing Published Live
              </span>
              <h2 className="text-2xl font-black text-navy-950 mt-3">
                Property Submitted Successfully!
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Your listing for <strong>Plot Code: {formData.plotCode}</strong> in <strong>{formData.village}</strong> has been authenticated and published to the active Buy Property directory.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/buy"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>View in Buy Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    contactNumber: '',
                    plotCode: '',
                    plotType: 'Residential',
                    village: 'Thullur',
                    road1Facing: 'East',
                    road1Width: '18 Meters',
                    road2Facing: '',
                    road2Width: '',
                    road3Facing: '',
                    road3Width: '',
                    totalAreaSqYds: '',
                    pricePerSqYd: '',
                    agreementTime: '20-30 Days',
                    saleType: 'Resale',
                    postedBy: 'Owner',
                    additionalDetails: '',
                    uploadedImages: []
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200"
              >
                Post Another Property
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT / CENTER: TWO-COLUMN SELL FORM (lg:col-span-8) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
              <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                    Sell Your Amaravati Property
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Direct listing for genuine Amaravati landowners, farmers, and investors.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                  Zero Brokerage
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 2-Column Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT COLUMN FIELDS */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
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
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Plot Code */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Plot Code *
                      </label>
                      <input
                        type="text"
                        name="plotCode"
                        required
                        placeholder="e.g. 27-814-4042 or LPS-THU-R-0412"
                        value={formData.plotCode}
                        onChange={handleChange}
                        className="w-full text-xs font-bold text-blue-900 px-3.5 py-2.5 bg-blue-50/50 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Plot Type */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Plot Type *
                      </label>
                      <select
                        name="plotType"
                        value={formData.plotType}
                        onChange={handleChange}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Residential">Residential Plot</option>
                        <option value="Commercial">Commercial Plot</option>
                      </select>
                    </div>

                    {/* Village */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Amaravati Village *
                      </label>
                      <select
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {amaravatiVillages.map((v) => (
                          <option key={v.slug} value={v.name}>{v.name} ({v.zone || 'Amaravati'})</option>
                        ))}
                      </select>
                    </div>

                    {/* Facing & Road Width (Meters) - Road 1 */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="text-xs font-black text-slate-800 uppercase flex items-center justify-between">
                        <span>Road 1 (Primary) *</span>
                        <span className="text-[10px] text-blue-600 font-bold">Mandatory</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Facing</label>
                          <select
                            name="road1Facing"
                            value={formData.road1Facing}
                            onChange={handleChange}
                            className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="East">East</option>
                            <option value="North">North</option>
                            <option value="West">West</option>
                            <option value="South">South</option>
                            <option value="North-East">North-East</option>
                            <option value="South-East">South-East</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Road Width</label>
                          <select
                            name="road1Width"
                            value={formData.road1Width}
                            onChange={handleChange}
                            className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="12 Meters">12 Meters</option>
                            <option value="18 Meters">18 Meters</option>
                            <option value="24 Meters">24 Meters</option>
                            <option value="30 Meters">30 Meters</option>
                            <option value="60 Meters">60+ Meters</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Road 2 (Optional Corner Road) */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                        <span>Road 2 (Corner / Optional)</span>
                        <span className="text-[10px] text-slate-400">Optional</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          name="road2Facing"
                          value={formData.road2Facing}
                          onChange={handleChange}
                          className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                        >
                          <option value="">No Second Road</option>
                          <option value="North">North Facing</option>
                          <option value="East">East Facing</option>
                          <option value="South">South Facing</option>
                          <option value="West">West Facing</option>
                        </select>
                        <select
                          name="road2Width"
                          value={formData.road2Width}
                          onChange={handleChange}
                          className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                        >
                          <option value="">Width</option>
                          <option value="12 Meters">12 Meters</option>
                          <option value="18 Meters">18 Meters</option>
                          <option value="24 Meters">24 Meters</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN FIELDS */}
                  <div className="space-y-4">
                    {/* Total Area */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Total Area (Sq.Yards) *
                      </label>
                      <input
                        type="number"
                        name="totalAreaSqYds"
                        required
                        placeholder="e.g. 200"
                        value={formData.totalAreaSqYds}
                        onChange={handleChange}
                        className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Expecting Price per Sq.Yd */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Expecting Price per Sq.Yd (₹) *
                      </label>
                      <input
                        type="number"
                        name="pricePerSqYd"
                        required
                        placeholder="e.g. 48000"
                        value={formData.pricePerSqYd}
                        onChange={handleChange}
                        className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {calculatedTotalPrice && (
                        <div className="text-[11px] font-black text-emerald-700 mt-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Total Expected Price: {calculatedTotalPrice}
                        </div>
                      )}
                    </div>

                    {/* Agreement Time */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Agreement Time *
                      </label>
                      <select
                        name="agreementTime"
                        value={formData.agreementTime}
                        onChange={handleChange}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Spot Agreement">Spot Agreement</option>
                        <option value="10-20 Days">10 - 20 Days</option>
                        <option value="20-30 Days">20 - 30 Days</option>
                        <option value="45 Days">45 Days</option>
                      </select>
                    </div>

                    {/* Sale Type */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Sale Type *
                      </label>
                      <select
                        name="saleType"
                        value={formData.saleType}
                        onChange={handleChange}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Resale">Resale</option>
                        <option value="First Sale">First Sale</option>
                      </select>
                    </div>

                    {/* Posted By */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Posted By *
                      </label>
                      <select
                        name="postedBy"
                        value={formData.postedBy}
                        onChange={handleChange}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Owner">Owner</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Agent">Agent</option>
                      </select>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                        Additional Details
                      </label>
                      <textarea
                        name="additionalDetails"
                        rows={3}
                        placeholder="e.g. Clear link documents, APCRDA returnable certificate available, immediate registration."
                        value={formData.additionalDetails}
                        onChange={handleChange}
                        className="w-full text-xs font-medium px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo & Document Upload (Drag and Drop) */}
                <div className="pt-2">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Upload Plot Photos / Documents (Optional)
                  </label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFileUpload({ target: { files: e.dataTransfer.files } });
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragging ? 'border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-700 block">
                      Click to browse or Drag & Drop plot photos / APCRDA layout copies
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      PNG, JPG, PDF up to 10MB
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Uploaded Thumbnails Preview */}
                  {formData.uploadedImages.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                      {formData.uploadedImages.map((img, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group">
                          <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeUploadedImage(i)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-600/30 ring-4 ring-blue-100 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Submit Property for Sale</span>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT SIDEBAR: INFORMATION FOR SELLERS (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-navy-950 text-base">
                    Information for Sellers
                  </h3>
                </div>

                <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Verified Amaravati Network</strong>
                      Your listing reaches genuine high-intent buyers, NRI investors, and institutional builders looking specifically in Amaravati.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <DollarSign className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Zero Hidden Charges</strong>
                      We believe in complete transparency. No upfront listing fees and zero hidden broker commissions.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">APCRDA Plot Code Assistance</strong>
                      Our legal specialists can assist in validating your Returnable Plot Certificate, survey coordinates, and town planning compliance.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Direct Seller Screening</strong>
                      Contact details are screened behind verified OTP authentication to prevent nuisance spam calls.
                    </div>
                  </div>
                </div>

                {/* Support Card */}
                <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Need help listing?</span>
                  <div className="text-xs font-bold text-slate-800 mb-2">Speak directly with our Amaravati Plot Desk</div>
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
        )}
      </div>
    </div>
  );
}
