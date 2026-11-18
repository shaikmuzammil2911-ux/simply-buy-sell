import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Compass,
  Maximize2,
  Layers,
  ChevronRight,
  Info,
  Check,
  Edit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages, propertyCategories } from '../data/mockData';

export default function SellProperty() {
  const { submitSellProperty } = useApp();
  const fileInputRef = useRef(null);

  // Active step: 1 = Category Select, 2 = Details Form, 3 = Review & Submit, 4 = Success
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Form Data State
  const [formData, setFormData] = useState({
    // Category & Common
    propertyCategory: '',
    categoryTitle: '',
    classification: 'Residential',
    title: '',
    village: 'Thullur',
    locality: '',
    address: '',
    lat: 16.5412,
    lng: 80.4721,
    expectedPrice: '',
    negotiable: true,
    description: '',

    // LPS Plot Specific
    plotCode: '',
    plotNumber: '',
    surveyNo: '',
    layoutName: '',
    extentSqYds: '',
    dimensions: '',
    roadWidth: '18 meters',
    facing: 'East',
    cornerPlot: 'No',
    ownershipDocs: 'LPS Returnable Certificate Available',

    // Apartment Specific
    projectName: '',
    flatNumber: '',
    buildingName: '',
    floorNumber: '',
    totalFloors: '',
    bedrooms: '3 BHK',
    bathrooms: '3',
    balconies: '2',
    carpetAreaSqFt: '',
    superBuiltUpAreaSqFt: '',
    furnishing: 'Semi-Furnished',
    parking: '1 Covered Slot',

    // Individual House Specific
    houseType: 'Duplex Villa',
    plotAreaSqYd: '',
    builtUpAreaSqFt: '',
    houseFloors: 'G+1 (Two Storeys)',
    houseKitchens: '1',
    houseParking: '2 Dedicated Car Porch',
    houseAge: 'Brand New Ready-to-Move',

    // Open Plot Specific
    openPlotExtentSqYds: '',
    approvalType: 'DTCP Approved Layout',

    // Seller Contact Info
    sellerName: '',
    sellerMobile: '',
    sellerWhatsapp: '',
    sellerEmail: '',
    sellerType: 'Owner'
  });

  // Uploaded media files
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [submittedPropertyId, setSubmittedPropertyId] = useState('');

  // Handle Category Selection
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat.id);
    setFormData((prev) => ({
      ...prev,
      propertyCategory: cat.id,
      categoryTitle: cat.name
    }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-calculate Rate per Sq.Yd for Plots
  const calculatePlotRate = () => {
    const price = parseFloat(formData.expectedPrice);
    const extent = parseFloat(formData.extentSqYds || formData.openPlotExtentSqYds || formData.plotAreaSqYd);
    if (price > 0 && extent > 0) {
      const rate = Math.round(price / extent);
      return `₹${rate.toLocaleString('en-IN')} / sq.yd`;
    }
    return null;
  };

  // Auto-calculate Rate per Sq.Ft for Apartments / Houses
  const calculateSqFtRate = () => {
    const price = parseFloat(formData.expectedPrice);
    const area = parseFloat(formData.superBuiltUpAreaSqFt || formData.builtUpAreaSqFt);
    if (price > 0 && area > 0) {
      const rate = Math.round(price / area);
      return `₹${rate.toLocaleString('en-IN')} / sq.ft`;
    }
    return null;
  };

  // Drag and drop photo handler
  const handleFiles = (files) => {
    const fileList = Array.from(files);
    fileList.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedPhotos((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              preview: e.target.result
            }
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removePhoto = (id) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Proceed to Review step
  const handleProceedToReview = (e) => {
    e.preventDefault();
    // Validate minimal requirements
    if (!formData.expectedPrice) {
      alert('Please enter an expected price.');
      return;
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submit
  const handleFinalSubmit = () => {
    const generatedId = `SBS-AMA-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedPropertyId(generatedId);

    // Format human-friendly price
    const numPrice = parseFloat(formData.expectedPrice);
    let priceDisplay = `₹${numPrice.toLocaleString('en-IN')}`;
    if (numPrice >= 10000000) {
      priceDisplay = `₹${(numPrice / 10000000).toFixed(2)} Crore`;
    } else if (numPrice >= 100000) {
      priceDisplay = `₹${(numPrice / 100000).toFixed(2)} Lakhs`;
    }

    const payload = {
      ...formData,
      id: generatedId,
      priceDisplay,
      priceInLakhs: numPrice >= 100000 ? numPrice / 100000 : numPrice,
      askingPrice: numPrice,
      status: 'Pending Review',
      submissionDate: new Date().toISOString().split('T')[0],
      images: uploadedPhotos.length > 0
        ? uploadedPhotos.map((p) => p.preview)
        : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80']
    };

    submitSellProperty(payload);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-blue-50/50 to-sky-50 min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider mb-3 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Dedicated Property Seller Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            List Your Property on SimplyBuySell
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Dynamic, category-tailored property submissions. From Amaravati LPS returnable plots to modern apartment flats, villas, and open plots.
          </p>
        </div>

        {/* Step Progression Bar (Mobile Friendly) */}
        {currentStep < 4 && (
          <div className="mb-10 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                currentStep === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : currentStep > 1
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-50 text-slate-400'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
                <span className="truncate">Category</span>
              </div>

              <div className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                currentStep === 2
                  ? 'bg-blue-600 text-white shadow-sm'
                  : currentStep > 2
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-50 text-slate-400'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
                <span className="truncate">Property Details</span>
              </div>

              <div className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                currentStep === 3
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-400'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
                <span className="truncate">Review & Publish</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 1: CATEGORY SELECTION CARDS ================= */}
        {currentStep === 1 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-navy-950">
                Select Your Property Type
              </h2>
              <p className="text-xs text-slate-600">
                Choose the correct category to unlock its dedicated, relevant property fields
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {/* CARD 1: AMARAVATI LPS / LAND POOLING PLOTS */}
              <div
                onClick={() => handleSelectCategory(propertyCategories[0])}
                className="group p-6 rounded-3xl bg-white border-2 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Top Priority #1
                  </span>
                </div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    <Layers className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-black text-navy-950 group-hover:text-emerald-700 transition-colors mb-2">
                    Amaravati LPS / Land Pooling Plots
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Official APCRDA returnable residential and commercial land pooling scheme plots across all 29 capital region villages.
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Official APCRDA / LPS Plot Code identification</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Extent in Sq.Yards, Road Width & Facing</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] italic">
                      ✕ No irrelevant bedroom or bathroom fields
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-black text-emerald-700">
                  <span>List LPS Returnable Plot</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* CARD 2: APARTMENT FLATS */}
              <div
                onClick={() => handleSelectCategory(propertyCategories[1])}
                className="group p-6 rounded-3xl bg-white border-2 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    <Building2 className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-black text-navy-950 group-hover:text-blue-700 transition-colors mb-2">
                    Apartment Flats
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Gated community apartments, standalone flats, and riverfront high-rises in Mangalagiri, Tadepalli and Amaravati.
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Bedrooms (BHK), Bathrooms & Balconies</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Floor number, Total floors & Flat number</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Carpet Area, Super Built-up & Furnishing</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-black text-blue-700">
                  <span>List Apartment Flat</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* CARD 3: INDIVIDUAL HOUSES */}
              <div
                onClick={() => handleSelectCategory(propertyCategories[2])}
                className="group p-6 rounded-3xl bg-white border-2 border-purple-200 hover:border-purple-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    <Home className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-black text-navy-950 group-hover:text-purple-700 transition-colors mb-2">
                    Individual Houses & Villas
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Independent duplex houses, luxury villas, and private residential bungalows with dedicated land ownership.
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Dual measurements: Plot Area + Built-up Area</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>House Type (Independent / Duplex / Triplex)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Dedicated parking porch & private terrace</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-black text-purple-700">
                  <span>List Individual House</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* CARD 4: OPEN PLOTS */}
              <div
                onClick={() => handleSelectCategory(propertyCategories[3])}
                className="group p-6 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    <Maximize2 className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-black text-navy-950 group-hover:text-amber-700 transition-colors mb-2">
                    Open Plots (DTCP / CRDA Layouts)
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    DTCP, CRDA approved and private plotted layouts for personal construction and strategic land banking.
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Survey Number, Plot Number & Total Extent</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Facing, Front Road Width & Corner Plot tag</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Automated Price per Sq.Yard calculation</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-black text-amber-700">
                  <span>List Open Plot</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: DYNAMIC PROPERTY FORM ================= */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-xl p-6 sm:p-10">
            {/* Form Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Selected Category
                </span>
                <h2 className="text-2xl font-black text-navy-950 mt-1">
                  {formData.categoryTitle || 'Property Submission'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors w-fit"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Change Category</span>
              </button>
            </div>

            <form onSubmit={handleProceedToReview} className="space-y-8">
              {/* === SECTION A: CATEGORY-SPECIFIC DETAILS === */}

              {/* 1. LPS PLOTS FORM FIELDS */}
              {selectedCategory === 'lps_plots' && (
                <div className="space-y-6">
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 font-semibold">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>LPS Plot Form Active: Bed/bath fields removed. APCRDA Plot Code and Returnable Scheme attributes enabled.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Classification */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Classification *
                      </label>
                      <select
                        value={formData.classification}
                        onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="Residential">Residential Returnable Plot</option>
                        <option value="Commercial">Commercial Returnable Plot</option>
                      </select>
                    </div>

                    {/* APCRDA Plot Code */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Official APCRDA Plot Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LPS-THU-R-0412"
                        value={formData.plotCode}
                        onChange={(e) => setFormData({ ...formData, plotCode: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                      <span className="text-[10px] text-slate-400">If available on allotment letter</span>
                    </div>

                    {/* Plot Number */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Plot Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 412"
                        value={formData.plotNumber}
                        onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    {/* Survey Number */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Survey Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 184/2A"
                        value={formData.surveyNo}
                        onChange={(e) => setFormData({ ...formData, surveyNo: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    {/* Village */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Amaravati Village *
                      </label>
                      <select
                        value={formData.village}
                        onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        {amaravatiVillages.map((v) => (
                          <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Layout / Sector */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Scheme / Sector Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CRDA LPS Sector 14"
                        value={formData.layoutName}
                        onChange={(e) => setFormData({ ...formData, layoutName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    {/* Extent (Sq. Yards) */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Total Extent (Sq. Yards) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 240"
                        value={formData.extentSqYds}
                        onChange={(e) => setFormData({ ...formData, extentSqYds: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    {/* Facing */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Facing Direction *
                      </label>
                      <select
                        value={formData.facing}
                        onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="East">East</option>
                        <option value="North">North</option>
                        <option value="West">West</option>
                        <option value="South">South</option>
                        <option value="North-East">North-East</option>
                        <option value="South-East">South-East</option>
                      </select>
                    </div>

                    {/* Front Road Width */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Front Road Width *
                      </label>
                      <select
                        value={formData.roadWidth}
                        onChange={(e) => setFormData({ ...formData, roadWidth: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="18 meters">18 meters (Standard Sector Road)</option>
                        <option value="24 meters">24 meters (Wide Feeder Road)</option>
                        <option value="30 meters">30 meters (Arterial Road)</option>
                        <option value="45+ meters">45+ meters (Expressway Frontage)</option>
                      </select>
                    </div>

                    {/* Corner Plot */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Corner Plot? *
                      </label>
                      <select
                        value={formData.cornerPlot}
                        onChange={(e) => setFormData({ ...formData, cornerPlot: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="No">No (Standard Plot)</option>
                        <option value="Yes">Yes (Dual Road Corner)</option>
                      </select>
                    </div>

                    {/* Documentation */}
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Allotment Document Status *
                      </label>
                      <select
                        value={formData.ownershipDocs}
                        onChange={(e) => setFormData({ ...formData, ownershipDocs: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="LPS Returnable Certificate Available">LPS Returnable Certificate Available</option>
                        <option value="Allotment Order in Hand">Allotment Order in Hand</option>
                        <option value="Clear 30Y Computerized EC Available">Clear 30Y Computerized EC Available</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. APARTMENT FLATS FORM FIELDS */}
              {selectedCategory === 'apartments' && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center gap-3 text-xs text-blue-900 font-semibold">
                    <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Apartment Flat Form Active: Enter BHK, floor number, carpet area and flat amenities.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Apartment / Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amaravati Sky River Towers"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Flat Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 702"
                        value={formData.flatNumber}
                        onChange={(e) => setFormData({ ...formData, flatNumber: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Location / Locality *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tadepalli / Mangalagiri"
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Bedrooms (BHK) *
                      </label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="5+ BHK">5+ BHK</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Bathrooms *
                      </label>
                      <select
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Floor Number / Total Floors *
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Floor (e.g. 7)"
                          value={formData.floorNumber}
                          onChange={(e) => setFormData({ ...formData, floorNumber: e.target.value })}
                          className="w-1/2 p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                        />
                        <span className="text-slate-400">/</span>
                        <input
                          type="number"
                          placeholder="Total (e.g. 14)"
                          value={formData.totalFloors}
                          onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                          className="w-1/2 p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Super Built-up Area (Sq. Ft.) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 1850"
                        value={formData.superBuiltUpAreaSqFt}
                        onChange={(e) => setFormData({ ...formData, superBuiltUpAreaSqFt: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Furnishing Status *
                      </label>
                      <select
                        value={formData.furnishing}
                        onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Car Parking *
                      </label>
                      <select
                        value={formData.parking}
                        onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="1 Covered Slot">1 Covered Slot</option>
                        <option value="2 Covered Slots">2 Covered Slots</option>
                        <option value="Open Parking">Open Parking</option>
                        <option value="No Parking">No Parking</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. INDIVIDUAL HOUSES FORM FIELDS */}
              {selectedCategory === 'houses' && (
                <div className="space-y-6">
                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center gap-3 text-xs text-purple-900 font-semibold">
                    <Home className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Individual House Form Active: Enter plot area in Sq.Yd, built-up area in Sq.Ft, and house architecture.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        House Type *
                      </label>
                      <select
                        value={formData.houseType}
                        onChange={(e) => setFormData({ ...formData, houseType: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="Duplex Villa">Duplex Villa</option>
                        <option value="Independent House">Independent House</option>
                        <option value="Triplex Luxury Villa">Triplex Luxury Villa</option>
                        <option value="Row House">Row House</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Plot Area (Sq. Yards) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 220"
                        value={formData.plotAreaSqYd}
                        onChange={(e) => setFormData({ ...formData, plotAreaSqYd: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Built-up Area (Sq. Feet) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 2900"
                        value={formData.builtUpAreaSqFt}
                        onChange={(e) => setFormData({ ...formData, builtUpAreaSqFt: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Bedrooms *
                      </label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="5+ BHK">5+ BHK</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Floors *
                      </label>
                      <select
                        value={formData.houseFloors}
                        onChange={(e) => setFormData({ ...formData, houseFloors: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="G (Single Storey)">G (Single Storey)</option>
                        <option value="G+1 (Two Storeys)">G+1 (Two Storeys)</option>
                        <option value="G+2 (Three Storeys)">G+2 (Three Storeys)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Parking *
                      </label>
                      <select
                        value={formData.houseParking}
                        onChange={(e) => setFormData({ ...formData, houseParking: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="1 Car Porch">1 Car Porch</option>
                        <option value="2 Dedicated Covered Car Porch">2 Dedicated Car Porch</option>
                        <option value="3+ Cars Driveway">3+ Cars Driveway</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. OPEN PLOTS FORM FIELDS */}
              {selectedCategory === 'open_plots' && (
                <div className="space-y-6">
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center gap-3 text-xs text-amber-900 font-semibold">
                    <Maximize2 className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Open Plot Form Active: Enter DTCP/CRDA layout information, survey number and plot extent.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Venture / Layout Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kaza Green Meadows"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Total Extent (Sq. Yards) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 200"
                        value={formData.openPlotExtentSqYds}
                        onChange={(e) => setFormData({ ...formData, openPlotExtentSqYds: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Survey / LP Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LP No. 45/2021"
                        value={formData.surveyNo}
                        onChange={(e) => setFormData({ ...formData, surveyNo: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Facing *
                      </label>
                      <select
                        value={formData.facing}
                        onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="East">East</option>
                        <option value="North">North</option>
                        <option value="West">West</option>
                        <option value="South">South</option>
                        <option value="North-East Corner">North-East Corner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Front Road Width *
                      </label>
                      <select
                        value={formData.roadWidth}
                        onChange={(e) => setFormData({ ...formData, roadWidth: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="33 ft">33 ft wide road</option>
                        <option value="40 ft">40 ft wide road</option>
                        <option value="50 ft">50 ft wide road</option>
                        <option value="60 ft+">60 ft+ arterial road</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                        Approval Type *
                      </label>
                      <select
                        value={formData.approvalType}
                        onChange={(e) => setFormData({ ...formData, approvalType: e.target.value })}
                        className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="DTCP Approved Layout">DTCP Approved Layout</option>
                        <option value="CRDA Approved Layout">CRDA Approved Layout</option>
                        <option value="Panchayat Approved">Panchayat Approved</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* === SECTION B: PRICING & AUTO-CALCULATOR === */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-black text-navy-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Pricing & Valuation Breakdown</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                      Expected Total Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 6800000"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-sm font-black text-navy-950 bg-white focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Enter raw figure without commas (e.g. 6800000 for ₹68 Lakhs)
                    </span>
                  </div>

                  {/* Dynamic Rate per Sq.Yd or Sq.Ft Output */}
                  <div className="bg-white p-3.5 rounded-xl border border-blue-200 flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Calculated Unit Rate
                    </span>
                    <span className="text-base font-black text-blue-700 mt-0.5">
                      {calculatePlotRate() || calculateSqFtRate() || 'Enter Price & Extent'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Auto-calculated for buyer clarity
                    </span>
                  </div>
                </div>
              </div>

              {/* === SECTION C: MEDIA & DRAG-AND-DROP UPLOAD === */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-black text-navy-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Upload Property Photographs & Layout Documents</span>
                </h3>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragOver
                      ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
                      : 'border-slate-300 hover:border-blue-400 bg-slate-50/60'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-xs text-navy-900 mb-1">
                    Drag and drop images here, or <span className="text-blue-600 underline">browse files</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    PNG, JPG, JPEG up to 10MB each. Attach site photos, frontage views, or allotment papers.
                  </p>
                </div>

                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {uploadedPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100"
                      >
                        <img
                          src={photo.preview}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(photo.id);
                          }}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* === SECTION D: SELLER CONTACT INFO === */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-black text-navy-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Seller Verification Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={formData.sellerName}
                      onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.sellerMobile}
                      onChange={(e) => setFormData({ ...formData, sellerMobile: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.sellerWhatsapp}
                      onChange={(e) => setFormData({ ...formData, sellerWhatsapp: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-navy-950 uppercase mb-1">
                      Seller Role *
                    </label>
                    <select
                      value={formData.sellerType}
                      onChange={(e) => setFormData({ ...formData, sellerType: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-navy-900 bg-slate-50 focus:bg-white"
                    >
                      <option value="Owner">Direct Owner / Allottee</option>
                      <option value="Authorized Representative">Authorized Family Representative</option>
                      <option value="Agent">Licensed Channel Partner / Agent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  ← Back to Categories
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Review Property Submission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 3: REVIEW & EDIT BEFORE SUBMIT ================= */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-xl p-6 sm:p-10">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Step 3: Verification
                </span>
                <h2 className="text-2xl font-black text-navy-950 mt-1">
                  Review Your Listing Details
                </h2>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Category & Price Summary */}
              <div className="bg-gradient-to-r from-navy-950 to-blue-950 text-white p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-blue-300 font-bold uppercase tracking-wider">
                    {formData.categoryTitle}
                  </span>
                  <h3 className="text-xl font-black mt-1">
                    {formData.title || `${formData.village} ${formData.categoryTitle}`}
                  </h3>
                  <div className="text-xs text-slate-300 mt-1">
                    📍 {formData.village}, Amaravati Capital Region
                  </div>
                </div>

                <div className="text-right border-t sm:border-t-0 sm:border-l border-blue-900 pt-3 sm:pt-0 sm:pl-6">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Expected Asking Price</div>
                  <div className="text-2xl font-black text-amber-300">
                    ₹{parseFloat(formData.expectedPrice).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-blue-200">
                    {calculatePlotRate() || calculateSqFtRate()}
                  </div>
                </div>
              </div>

              {/* Detailed Specs Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="bg-slate-50 p-3 font-black text-navy-950 uppercase tracking-wider border-b border-slate-200">
                  Property Attributes
                </div>
                <div className="divide-y divide-slate-100">
                  {selectedCategory === 'lps_plots' && (
                    <>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">APCRDA Plot Code:</span>
                        <span className="font-bold font-mono text-amber-700">{formData.plotCode || 'Pending confirmation'}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Plot Extent:</span>
                        <span className="font-bold">{formData.extentSqYds} Sq. Yards</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Front Road Width:</span>
                        <span className="font-bold">{formData.roadWidth}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Facing Orientation:</span>
                        <span className="font-bold">{formData.facing}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Corner Plot:</span>
                        <span className="font-bold">{formData.cornerPlot}</span>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'apartments' && (
                    <>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Apartment / Project:</span>
                        <span className="font-bold">{formData.projectName} (Flat #{formData.flatNumber})</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Bedrooms & Bathrooms:</span>
                        <span className="font-bold">{formData.bedrooms} • {formData.bathrooms} Baths</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Floor & Super Built-up:</span>
                        <span className="font-bold">{formData.floorNumber}th of {formData.totalFloors} Floors • {formData.superBuiltUpAreaSqFt} sq.ft</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Furnishing & Parking:</span>
                        <span className="font-bold">{formData.furnishing} • {formData.parking}</span>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'houses' && (
                    <>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">House Architecture:</span>
                        <span className="font-bold">{formData.houseType}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Plot Extent + Built-up:</span>
                        <span className="font-bold">{formData.plotAreaSqYd} sq.yd plot • {formData.builtUpAreaSqFt} sq.ft built-up</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Bedrooms & Floors:</span>
                        <span className="font-bold">{formData.bedrooms} • {formData.houseFloors}</span>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'open_plots' && (
                    <>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Total Extent:</span>
                        <span className="font-bold">{formData.openPlotExtentSqYds} Sq. Yards</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Layout Approval:</span>
                        <span className="font-bold">{formData.approvalType}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-slate-500">Facing & Road:</span>
                        <span className="font-bold">{formData.facing} • {formData.roadWidth}</span>
                      </div>
                    </>
                  )}

                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Seller Contact:</span>
                    <span className="font-bold">{formData.sellerName} ({formData.sellerMobile})</span>
                  </div>
                </div>
              </div>

              {/* Photos Preview */}
              {uploadedPhotos.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase mb-2">
                    Attached Photographs ({uploadedPhotos.length})
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {uploadedPhotos.map((photo) => (
                      <img
                        key={photo.id}
                        src={photo.preview}
                        alt="Upload preview"
                        className="w-20 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Legal Note */}
              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-start gap-2.5 text-xs text-slate-600">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  By submitting, you confirm that you are the lawful owner or authorized agent for this property. SimplyBuySell conducts independent title check before publishing on the public map.
                </span>
              </div>

              {/* Final Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  ← Edit Information
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Submit Listing</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-emerald-200 shadow-2xl max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6 shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-block font-mono text-xs font-black text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full mb-3">
              REFERENCE ID: {submittedPropertyId}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mb-3">
              Property Submitted Successfully!
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Your <strong>{formData.categoryTitle}</strong> in <strong>{formData.village}</strong> has been assigned internal reference <strong className="font-mono text-navy-950">{submittedPropertyId}</strong>. Our Amaravati cadastral verification desk will inspect your documentation and activate your listing.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Property Category:</span>
                <span className="font-bold text-navy-950">{formData.categoryTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Asking Price:</span>
                <span className="font-bold text-emerald-700">₹{parseFloat(formData.expectedPrice).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold uppercase text-amber-600">Pending Review</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedCategory(null);
                  setUploadedPhotos([]);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                List Another Property
              </button>

              <Link
                to="/buy-property"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Browse Live Catalog
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
