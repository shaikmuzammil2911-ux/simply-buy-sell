import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Maximize2,
  Navigation,
  MapPin,
  TrendingUp,
  Building2,
  FileCheck2,
  ArrowRight,
  MessageCircle,
  Map,
  ShieldCheck,
  Scale,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiLandmarks, amaravatiVillages } from '../data/mockData';

// Haversine formula for distance calculation in KM
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 'N/A';
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d.toFixed(1);
}

export default function PlotIntelligence() {
  const { properties, addToCompare, removeFromCompare, isInCompare, getWhatsAppLink } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCode = searchParams.get('code') || '';

  const [inputCode, setInputCode] = useState(queryCode);
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Match plot from code or id
  useEffect(() => {
    if (queryCode.trim()) {
      const q = queryCode.trim().toLowerCase();
      const match = properties.find(
        (p) =>
          p.plotCode?.toLowerCase() === q ||
          p.id?.toLowerCase() === q ||
          p.slug?.toLowerCase() === q
      );
      if (match) {
        setSelectedPlot(match);
        setInputCode(match.plotCode || match.id);
        return;
      }
    }
    // Default to first plot if none selected
    if (!selectedPlot && properties.length > 0) {
      setSelectedPlot(properties[0]);
      setInputCode(properties[0].plotCode || properties[0].id);
    }
  }, [queryCode, properties]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const q = inputCode.trim().toLowerCase();
    const match = properties.find(
      (p) =>
        p.plotCode?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q) ||
        p.village?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q)
    );
    if (match) {
      setSelectedPlot(match);
      setSearchParams({ code: match.plotCode || match.id });
    }
  };

  // Village median calculation
  const villageData = amaravatiVillages.find(
    (v) => v.name.toLowerCase() === selectedPlot?.village?.toLowerCase()
  );
  const villageAvgRate = villageData?.avgPricePerSqYd || 36000;
  const plotRate = selectedPlot?.pricePerSqYd || 0;
  const rateDiffPercent = ((plotRate - villageAvgRate) / villageAvgRate) * 100;

  // Comparables
  const comparables = properties
    .filter(
      (p) =>
        p.id !== selectedPlot?.id &&
        (p.village === selectedPlot?.village || p.category === selectedPlot?.category)
    )
    .slice(0, 3);

  const inCompare = selectedPlot ? isInCompare(selectedPlot.id) : false;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>APCRDA Intelligence Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight mb-2">
            Amaravati Plot Intelligence Report
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            In-depth property analysis including spatial GIS metrics, APCRDA zoning compliance, infrastructure proximity, valuation benchmarks and buyer suitability.
          </p>
        </div>

        {/* Search Bar & Quick Dropdown */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-blue-100 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter APCRDA/LPS Plot Code (e.g. LPS-THU-R-0412) or Internal ID..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Generate Report</span>
            </button>

            {/* Quick Picker */}
            <select
              value={selectedPlot?.id || ''}
              onChange={(e) => {
                const p = properties.find((x) => x.id === e.target.value);
                if (p) {
                  setSelectedPlot(p);
                  setInputCode(p.plotCode || p.id);
                  setSearchParams({ code: p.plotCode || p.id });
                }
              }}
              className="w-full md:w-auto py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose Live Verified Plot --</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.plotCode || p.id} - {p.village} ({p.sizeSqYds} sq.yd)
                </option>
              ))}
            </select>
          </form>
        </div>

        {selectedPlot ? (
          <div>
            {/* Overview Banner Card */}
            <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden border border-blue-900/50">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-amber-400 text-navy-950 font-mono font-bold text-xs px-2.5 py-1 rounded-md">
                      APCRDA CODE: {selectedPlot.plotCode || 'PENDING VERIFICATION'}
                    </span>
                    <span className="bg-blue-800/80 text-blue-200 font-mono text-xs px-2.5 py-1 rounded-md">
                      REF ID: {selectedPlot.id}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase ${
                      selectedPlot.category === 'Residential Plot'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}>
                      {selectedPlot.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                    {selectedPlot.title}
                  </h2>

                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>{selectedPlot.village}, Amaravati Capital City Zone</span>
                    <span>•</span>
                    <span className="text-blue-300 font-medium">{selectedPlot.themeZone}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 lg:border-l border-blue-900/80 pt-4 lg:pt-0 lg:pl-8">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Advertised Asking Price
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-300">
                      {selectedPlot.priceDisplay}
                    </div>
                    <div className="text-xs text-blue-200">
                      ₹{selectedPlot.pricePerSqYd?.toLocaleString('en-IN') || 'N/A'} / sq.yard
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <a
                      href={getWhatsAppLink(selectedPlot)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Request Intelligence Dossier</span>
                    </a>

                    <Link
                      to={`/map?id=${selectedPlot.id}`}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>View on GIS Map</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 7 Intelligence Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Module 1: Physical Plot Metrics */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-navy-950 font-bold text-sm mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">1</div>
                    <span>Physical Plot Metrics</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Plot Extent:</span>
                      <span className="font-bold text-navy-950">{selectedPlot.sizeSqYds} Sq. Yards ({selectedPlot.area})</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Approx Dimensions:</span>
                      <span className="font-bold text-navy-950">{selectedPlot.dimensions || '40 ft x 60 ft approx'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Cardinal Facing:</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" />
                        {selectedPlot.facing || 'East'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Front Road Width:</span>
                      <span className="font-bold text-navy-950">{selectedPlot.roadWidth} meters ({Math.round(selectedPlot.roadWidth * 3.28)} ft)</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Corner Plot:</span>
                      <span className={`font-bold ${selectedPlot.cornerPlot ? 'text-blue-600' : 'text-slate-700'}`}>
                        {selectedPlot.cornerPlot ? 'Yes (Dual Road Frontage)' : 'Standard Mid-Block'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 2: Road & Connectivity Infrastructure */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-navy-950 font-bold text-sm mb-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">2</div>
                    <span>Road & Connectivity</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Arterial Access:</span>
                      <span className="font-bold text-navy-950">{selectedPlot.roadWidth >= 24 ? 'Major Expressway Feeder' : 'Sub-Arterial Sector Road'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Seed Access Road:</span>
                      <span className="font-bold text-navy-950">
                        {calculateDistance(selectedPlot.lat, selectedPlot.lng, 16.5250, 80.5280)} km
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Vijayawada Direct:</span>
                      <span className="font-bold text-navy-950">~14.5 km (Prakasam Barrage)</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Guntur NH-16:</span>
                      <span className="font-bold text-navy-950">~18.2 km via Mangalagiri</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 3: Land-Use & APCRDA Zoning */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-navy-950 font-bold text-sm mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">3</div>
                    <span>APCRDA Zoning & Scheme</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Scheme Category:</span>
                      <span className="font-bold text-emerald-700">LPS Returnable Allotment</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Zone Permitted:</span>
                      <span className="font-bold text-navy-950">
                        {selectedPlot.category === 'Residential Plot' ? 'R-1/R-2 Plotted Residential' : 'C-1 Commercial High-Density'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Allotment Certificate:</span>
                      <span className="font-bold text-blue-700 flex items-center gap-1">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        Available for Verification
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Freehold Transfer:</span>
                      <span className="font-bold text-emerald-700">Yes, Clear Title Transfer</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 4: Proximity to Key Amaravati Landmarks */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-navy-950 font-bold text-sm mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">4</div>
                    <span>Capital Anchor Proximities</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {amaravatiLandmarks.map((lm) => {
                      const dist = calculateDistance(selectedPlot.lat, selectedPlot.lng, lm.lat, lm.lng);
                      return (
                        <div key={lm.name} className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 truncate pr-2">{lm.name}:</span>
                          <span className="font-bold text-navy-950 shrink-0">{dist} km</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Module 5: Asking Rate vs Village Median Benchmark */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-navy-950 font-bold text-sm mb-4">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">5</div>
                    <span>Asking Price Benchmark</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">This Plot Asking Rate:</span>
                      <span className="font-extrabold text-navy-950">₹{plotRate.toLocaleString('en-IN')}/sq.yd</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">{selectedPlot.village} Avg Rate:</span>
                      <span className="font-bold text-slate-700">₹{villageAvgRate.toLocaleString('en-IN')}/sq.yd</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Variance:</span>
                      <span className={`font-bold ${rateDiffPercent >= 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {rateDiffPercent >= 0 ? `+${rateDiffPercent.toFixed(1)}%` : `${rateDiffPercent.toFixed(1)}%`} vs Village Avg
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic mt-2">
                      * Notes: Variations arise from frontage road width ({selectedPlot.roadWidth}m) and proximity to prime corridors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Module 6: Recommended Buyer Profile */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-navy-950 font-bold text-sm mb-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">6</div>
                    <span>Buyer-Fit Assessment</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                      <div className="font-bold text-navy-900 mb-0.5">Primary Fit:</div>
                      <div className="text-slate-600">
                        {selectedPlot.category === 'Residential Plot'
                          ? 'High-net-worth individual villa construction or 3-5 year capital growth investment.'
                          : 'Commercial retail showroom, corporate branch office, or high-yield rental asset.'}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <div className="font-bold text-emerald-900 mb-0.5">Liquidity Outlook:</div>
                      <div className="text-slate-600">
                        High liquidity demand due to recognized APCRDA LPS pooling documentation and clear physical demarcations.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 7: Comparable Plots Benchmarking */}
            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">7</div>
                  <span>Comparable Plots in {selectedPlot.village} & Amaravati Capital Region</span>
                </div>
                <Link to="/compare-plots" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
                  <span>Open Full Comparison Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {comparables.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        {c.plotCode || c.id}
                      </span>
                      <span className="font-bold text-navy-950">{c.priceDisplay}</span>
                    </div>
                    <div className="font-bold text-xs text-navy-900 truncate mb-1">{c.title}</div>
                    <div className="text-[11px] text-slate-500 mb-2">
                      {c.village} • {c.sizeSqYds} sq.yd • {c.facing}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedPlot(c);
                        setInputCode(c.plotCode || c.id);
                        setSearchParams({ code: c.plotCode || c.id });
                      }}
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Inspect This Plot →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Statutory Disclaimer:</strong> SimplyBuySell provides independent Amaravati property intelligence. APCRDA/LPS plot codes and spatial benchmarks are synthesized from verified pooling allotment records and advertised seller listings. Prices listed reflect current advertised asking figures and do not constitute government-registered sale prices or certified stamp-duty valuations. Buyers must conduct direct registry title verification prior to formal deed execution.
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            No plot selected. Please enter an APCRDA plot code above.
          </div>
        )}
      </div>
    </div>
  );
}
