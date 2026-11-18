import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  Trash2,
  Plus,
  Map,
  Sparkles,
  MessageCircle,
  Maximize2,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ComparePlots() {
  const { compareList, removeFromCompare, clearCompare, addToCompare, properties, getWhatsAppLink } = useApp();
  const [highlightDiff, setHighlightDiff] = useState(false);

  // Remaining available plots that can be added
  const availableToAdd = properties.filter(
    (p) => !compareList.some((c) => c.id === p.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-4 sm:pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Multi-Plot Evaluation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              Compare Amaravati Plots Side-by-Side
            </h1>
            <p className="text-sm text-slate-600">
              Evaluate up to 4 residential or commercial plots across size, facing, road width, APCRDA code, and price per sq.yd.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighlightDiff(!highlightDiff)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                highlightDiff
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Highlight Differences: {highlightDiff ? 'ON' : 'OFF'}
            </button>

            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {compareList.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 text-center border border-blue-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4 shadow-inner">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-2">No Plots in Comparison Yet</h3>
            <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto">
              Select plots from our live inventory to compare physical dimensions, facing, frontage roads, and price benchmarks.
            </p>

            <div className="border-t border-slate-100 pt-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Quick Add Suggested Plots:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {properties.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCompare(p)}
                    className="p-3 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-100/60 text-left transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-xs text-navy-950 group-hover:text-blue-600">{p.title}</div>
                      <div className="text-[11px] text-slate-500">{p.village} • {p.sizeSqYds} sq.yd • {p.priceDisplay}</div>
                    </div>
                    <Plus className="w-4 h-4 text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Comparison Grid Table */
          <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden">
            {/* Quick Add Bar if less than 4 */}
            {compareList.length < 4 && availableToAdd.length > 0 && (
              <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-blue-900">
                  You can compare up to {4 - compareList.length} more plot(s):
                </span>
                <select
                  onChange={(e) => {
                    const plot = properties.find((p) => p.id === e.target.value);
                    if (plot) addToCompare(plot);
                  }}
                  className="py-1 px-3 rounded-lg border border-blue-200 bg-white text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  defaultValue=""
                >
                  <option value="" disabled>+ Add Another Plot to Compare...</option>
                  {availableToAdd.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.plotCode || p.id} - {p.village} ({p.sizeSqYds} sq.yd - {p.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                {/* Table Header: Plot Cards */}
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="p-4 w-44 bg-slate-50/80 font-bold text-xs text-slate-500 uppercase tracking-wider align-bottom">
                      Parameters
                    </th>
                    {compareList.map((plot) => (
                      <th key={plot.id} className="p-4 w-64 align-top">
                        <div className="relative rounded-2xl border border-slate-200 p-3 bg-slate-50/50">
                          <button
                            onClick={() => removeFromCompare(plot.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 shadow-sm transition-colors"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-slate-200">
                            <img
                              src={plot.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'}
                              alt={plot.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-1">
                            {plot.plotCode || plot.id}
                          </div>

                          <h4 className="font-bold text-xs text-navy-950 line-clamp-1 mb-1">
                            {plot.title}
                          </h4>

                          <div className="text-base font-black text-navy-900 mb-2">
                            {plot.priceDisplay}
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200">
                            <Link
                              to={`/plot-intelligence?code=${encodeURIComponent(plot.plotCode || plot.id)}`}
                              className="py-1 px-2 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold text-center hover:bg-blue-100 transition-colors"
                            >
                              Intelligence
                            </Link>
                            <Link
                              to={`/map?id=${plot.id}`}
                              className="py-1 px-2 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold text-center hover:bg-slate-200 transition-colors"
                            >
                              GIS Map
                            </Link>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body Metrics */}
                <tbody className="divide-y divide-slate-100 text-xs">
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Category</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-navy-950">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-white ${
                          p.category === 'Residential Plot' ? 'bg-emerald-600' : 'bg-amber-600'
                        }`}>
                          {p.category}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Village */}
                  <tr>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Village / Location</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-navy-950">
                        {p.village}, Amaravati
                      </td>
                    ))}
                  </tr>

                  {/* Plot Size */}
                  <tr className={highlightDiff ? 'bg-amber-50/40' : ''}>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Plot Size (Sq. Yards)</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-bold text-navy-950">
                        {p.sizeSqYds} sq.yd ({p.area})
                      </td>
                    ))}
                  </tr>

                  {/* Rate Per Sq. Yd */}
                  <tr className={highlightDiff ? 'bg-amber-50/40' : ''}>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Rate / Sq. Yard</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-extrabold text-blue-700">
                        ₹{p.pricePerSqYd ? p.pricePerSqYd.toLocaleString('en-IN') : 'N/A'} / sq.yd
                      </td>
                    ))}
                  </tr>

                  {/* Facing */}
                  <tr className={highlightDiff ? 'bg-amber-50/40' : ''}>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Facing</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-navy-950">
                        {p.facing || 'East'}
                      </td>
                    ))}
                  </tr>

                  {/* Road Width */}
                  <tr className={highlightDiff ? 'bg-amber-50/40' : ''}>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Front Road Width</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-navy-950">
                        {p.roadWidth} meters ({Math.round(p.roadWidth * 3.28)} ft)
                      </td>
                    ))}
                  </tr>

                  {/* Corner Plot */}
                  <tr className={highlightDiff ? 'bg-amber-50/40' : ''}>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Corner Plot</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-semibold">
                        {p.cornerPlot ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5 text-slate-400" /> No
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* LPS Verification Status */}
                  <tr>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">APCRDA / LPS Scheme</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 font-medium text-slate-700">
                        Returnable Pooling Allotment
                      </td>
                    ))}
                  </tr>

                  {/* WhatsApp Action Row */}
                  <tr>
                    <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Direct Enquiry</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4">
                        <a
                          href={getWhatsAppLink(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Seller</span>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
