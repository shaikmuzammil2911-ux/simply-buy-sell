import React, { useState, useRef } from 'react';
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
  Sparkles,
  X,
  Image as ImageIcon,
  FileCheck2,
  Compass,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages } from '../data/mockData';

export default function SellProperty() {
  const { submitSellProperty } = useApp();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    plotCode: '',
    village: 'Thullur',
    category: 'Residential Plot',
    plotSizeSqYds: '',
    facing: 'East Facing',
    roadWidth: '18 meters',
    cornerPlot: 'No',
    expectedAskingPrice: '',
    description: ''
  });

  // Working drag-and-drop uploaded pictures
  const [uploadedPhotos, setUploadedPhotos] = useState([
    {
      id: 'demo-1',
      name: 'plot-site-survey.jpg',
      size: '2.1 MB',
      preview: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    }
  ]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle files selected via file input or drag-and-drop
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitSellProperty({
        ...formData,
        uploadedPhotosCount: uploadedPhotos.length,
        photos: uploadedPhotos.map((p) => p.preview)
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-blue-50/50 to-sky-50 min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Land Owner & Allottee Listing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            List Your Amaravati Plot for Sale
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Connect directly with verified plot investors and builders looking for APCRDA LPS residential and commercial allotments across the Capital Region.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-blue-100 shadow-xl max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-navy-950 mb-2">Plot Successfully Listed!</h2>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Our Amaravati land verification desk has received your plot listing. We will verify the APCRDA plot allotment credentials and activate your listing on the GIS map.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  mobileNumber: '',
                  whatsappNumber: '',
                  email: '',
                  plotCode: '',
                  village: 'Thullur',
                  category: 'Residential Plot',
                  plotSizeSqYds: '',
                  facing: 'East Facing',
                  roadWidth: '18 meters',
                  cornerPlot: 'No',
                  expectedAskingPrice: '',
                  description: ''
                });
                setUploadedPhotos([]);
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              List Another Plot
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-blue-100 shadow-xl p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Owner / Contact Details */}
              <div>
                <h3 className="text-base font-bold text-navy-950 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>1. Plot Owner / Authorized Contact</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
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
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Plot Specifications */}
              <div>
                <h3 className="text-base font-bold text-navy-950 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  <span>2. APCRDA Plot Specifications</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* APCRDA Plot Code */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      APCRDA / LPS Plot Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. LPS-THU-R-0412"
                      value={formData.plotCode}
                      onChange={(e) => setFormData({ ...formData, plotCode: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-[10px] text-slate-400">Leave blank if pending allotment confirmation</span>
                  </div>

                  {/* Village */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Amaravati Village *
                    </label>
                    <select
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      {amaravatiVillages.map((v) => (
                        <option key={v.id} value={v.name}>{v.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Plot Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="Commercial Plot">Commercial Plot</option>
                    </select>
                  </div>

                  {/* Plot Size (Sq. Yards) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Plot Size (Sq. Yards) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 400"
                      value={formData.plotSizeSqYds}
                      onChange={(e) => setFormData({ ...formData, plotSizeSqYds: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Facing */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Facing Orientation *
                    </label>
                    <select
                      value={formData.facing}
                      onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="East Facing">East Facing</option>
                      <option value="North Facing">North Facing</option>
                      <option value="West Facing">West Facing</option>
                      <option value="South Facing">South Facing</option>
                      <option value="North-East Facing">North-East Facing</option>
                    </select>
                  </div>

                  {/* Front Road Width */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Front Road Width *
                    </label>
                    <select
                      value={formData.roadWidth}
                      onChange={(e) => setFormData({ ...formData, roadWidth: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="18 meters">18 meters (Standard Sector)</option>
                      <option value="24 meters">24 meters (Arterial)</option>
                      <option value="45 meters">45+ meters (Expressway Frontage)</option>
                    </select>
                  </div>

                  {/* Corner Plot */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Corner Plot?
                    </label>
                    <select
                      value={formData.cornerPlot}
                      onChange={(e) => setFormData({ ...formData, cornerPlot: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="No">No (Standard Plot)</option>
                      <option value="Yes">Yes (Corner Dual Road)</option>
                    </select>
                  </div>

                  {/* Expected Asking Price */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Total Expected Asking Price *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹1.5 Crores or ₹38,000/yd"
                      value={formData.expectedAskingPrice}
                      onChange={(e) => setFormData({ ...formData, expectedAskingPrice: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Plot Description / Proximity Highlights
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe nearby landmarks, Seed Access Road distance, survey number details, or specific negotiation terms..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Working Drag and Drop Upload */}
              <div>
                <h3 className="text-base font-bold text-navy-950 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>3. Upload Plot Photos / Allotment Paper Photos</span>
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
                    Drag and drop plot photos here, or <span className="text-blue-600 underline">browse files</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    PNG, JPG, JPEG up to 10MB each. Attach site photos or layout copies.
                  </p>
                </div>

                {/* Uploaded Thumbnails Preview */}
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
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] text-white truncate">
                          {photo.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Plot...' : 'Publish Plot Listing for Verification'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
