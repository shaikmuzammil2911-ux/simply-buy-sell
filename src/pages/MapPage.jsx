import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import L from 'leaflet';
import {
  Map as MapIcon,
  Search,
  Filter,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Navigation,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Compass,
  FileCheck2,
  Info,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { amaravatiVillages, amaravatiLandmarks } from '../data/mockData';

export default function MapPage() {
  const { properties, addToCompare, removeFromCompare, isInCompare, getWhatsAppLink } = useApp();
  const [searchParams] = useSearchParams();
  const targetId = searchParams.get('id');
  const targetCode = searchParams.get('code');

  const [searchQuery, setSearchQuery] = useState(targetCode || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showLandmarks, setShowLandmarks] = useState(true);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polygonRef = useRef(null);

  // Filter plots
  const filteredPlots = properties.filter((plot) => {
    // Only plots with coordinates
    if (!plot.lat || !plot.lng) return false;

    if (selectedCategory !== 'All' && plot.category !== selectedCategory) {
      return false;
    }
    if (selectedVillage !== 'All' && plot.village?.toLowerCase() !== selectedVillage.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchCode = plot.plotCode?.toLowerCase().includes(q);
      const matchId = plot.id?.toLowerCase().includes(q);
      const matchVillage = plot.village?.toLowerCase().includes(q);
      const matchTitle = plot.title?.toLowerCase().includes(q);
      if (!matchCode && !matchId && !matchVillage && !matchTitle) return false;
    }
    return true;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Amaravati center
    const map = L.map(mapContainerRef.current, {
      center: [16.5385, 80.5180],
      zoom: 12,
      scrollWheelZoom: true,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    // OpenStreetMap high quality carto tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | APCRDA GIS Layer'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Polygons when filters or selection change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (polygonRef.current) {
      polygonRef.current.remove();
      polygonRef.current = null;
    }

    // Add Landmarks if enabled
    if (showLandmarks) {
      amaravatiLandmarks.forEach((lm) => {
        const landmarkIcon = L.divIcon({
          className: 'custom-landmark-icon',
          html: `<div style="background:#1e3a8a;color:#fff;padding:3px 7px;border-radius:12px;font-size:10px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.3);white-space:nowrap;border:1px solid #93c5fd;display:flex;align-items:center;gap:4px;">
            <span>🏛️</span><span>${lm.name}</span>
          </div>`,
          iconSize: [100, 24],
          iconAnchor: [50, 12]
        });

        const lmMarker = L.marker([lm.lat, lm.lng], { icon: landmarkIcon }).addTo(map);
        lmMarker.bindPopup(`
          <div style="font-family:system-ui;padding:4px;">
            <div style="font-size:11px;font-weight:700;color:#1e3a8a;">${lm.name}</div>
            <div style="font-size:10px;color:#64748b;">${lm.type} • Amaravati Core</div>
          </div>
        `);
        markersRef.current.push(lmMarker);
      });
    }

    // Add Plot Markers
    filteredPlots.forEach((plot) => {
      const isRes = plot.category === 'Residential Plot';
      const bgHex = isRes ? '#059669' : '#d97706';
      const ringHex = isRes ? '#a7f3d0' : '#fde68a';

      const customIcon = L.divIcon({
        className: 'custom-plot-pin',
        html: `
          <div style="
            background: ${bgHex};
            color: #ffffff;
            border: 2px solid ${ringHex};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            cursor: pointer;
          ">
            <span style="transform: rotate(45deg); font-size: 11px; font-weight: 800;">
              ${isRes ? 'R' : 'C'}
            </span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30]
      });

      const marker = L.marker([plot.lat, plot.lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family:system-ui;min-width:220px;padding:2px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;">
            <span style="font-size:10px;font-weight:700;color:${bgHex};text-transform:uppercase;background:#f1f5f9;padding:2px 6px;border-radius:4px;">
              ${plot.category}
            </span>
            <span style="font-size:11px;font-weight:800;color:#0f172a;">${plot.priceDisplay}</span>
          </div>
          <div style="font-weight:700;font-size:12px;color:#1e293b;margin-bottom:2px;">
            ${plot.title}
          </div>
          <div style="font-size:11px;color:#64748b;margin-bottom:6px;">
            📍 ${plot.village}, Amaravati
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px;background:#f8fafc;padding:6px;border-radius:6px;margin-bottom:8px;border:1px solid #e2e8f0;">
            <div><strong>Size:</strong> ${plot.sizeSqYds} sq.yd</div>
            <div><strong>Facing:</strong> ${plot.facing}</div>
            <div><strong>Road:</strong> ${plot.roadWidth}m</div>
            <div><strong>Code:</strong> ${plot.plotCode || plot.id}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <a href="/plot-intelligence?code=${encodeURIComponent(plot.plotCode || plot.id)}" style="display:block;text-align:center;padding:5px;background:#2563eb;color:#fff;font-size:11px;font-weight:600;border-radius:6px;text-decoration:none;">
              Explore Plot Intelligence →
            </a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${plot.lat},${plot.lng}" target="_blank" rel="noopener noreferrer" style="display:block;text-align:center;padding:4px;background:#f1f5f9;color:#334155;font-size:10px;font-weight:600;border-radius:6px;text-decoration:none;">
              Google Maps Navigation ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedPlot(plot);
        // Draw parcel polygon if available
        if (polygonRef.current) {
          polygonRef.current.remove();
          polygonRef.current = null;
        }
        if (plot.boundaries && plot.boundaries.length > 2) {
          polygonRef.current = L.polygon(plot.boundaries, {
            color: isRes ? '#059669' : '#d97706',
            fillColor: isRes ? '#10b981' : '#f59e0b',
            fillOpacity: 0.35,
            weight: 3,
            dashArray: '4, 4'
          }).addTo(map);
        }
      });

      markersRef.current.push(marker);
    });

    // Handle deep link target
    if (targetId || targetCode) {
      const match = properties.find(
        (p) => p.id === targetId || p.plotCode === targetCode || p.id === targetCode
      );
      if (match && match.lat && match.lng) {
        setSelectedPlot(match);
        map.setView([match.lat, match.lng], 15, { animate: true });
        if (match.boundaries && match.boundaries.length > 2) {
          if (polygonRef.current) polygonRef.current.remove();
          polygonRef.current = L.polygon(match.boundaries, {
            color: match.category === 'Residential Plot' ? '#059669' : '#d97706',
            fillColor: match.category === 'Residential Plot' ? '#10b981' : '#f59e0b',
            fillOpacity: 0.35,
            weight: 3
          }).addTo(map);
        }
      }
    }
  }, [filteredPlots.length, selectedCategory, selectedVillage, showLandmarks, targetId, targetCode]);

  // Center on a selected plot from the side list
  const handleSelectPlotFromList = (plot) => {
    setSelectedPlot(plot);
    const map = mapInstanceRef.current;
    if (map && plot.lat && plot.lng) {
      map.setView([plot.lat, plot.lng], 15, { animate: true });

      if (polygonRef.current) {
        polygonRef.current.remove();
        polygonRef.current = null;
      }
      if (plot.boundaries && plot.boundaries.length > 2) {
        polygonRef.current = L.polygon(plot.boundaries, {
          color: plot.category === 'Residential Plot' ? '#059669' : '#d97706',
          fillColor: plot.category === 'Residential Plot' ? '#10b981' : '#f59e0b',
          fillOpacity: 0.35,
          weight: 3
        }).addTo(map);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
      {/* Top GIS Sub-Header / Filters */}
      <div className="bg-white border-b border-blue-100 shadow-sm px-4 py-3 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Title & Stats */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <MapIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-navy-950">
                  Amaravati GIS Plot Explorer
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                  APCRDA Grid
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Visualizing {filteredPlots.length} verified plotted parcels across Amaravati villages
              </p>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative flex-grow md:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plot code or village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            >
              <option value="All">All Categories</option>
              <option value="Residential Plot">Residential Plots</option>
              <option value="Commercial Plot">Commercial Plots</option>
            </select>

            {/* Village Select */}
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            >
              <option value="All">All Villages</option>
              {amaravatiVillages.map((v) => (
                <option key={v.id} value={v.name}>{v.name}</option>
              ))}
            </select>

            {/* Landmarks Toggle */}
            <button
              onClick={() => setShowLandmarks(!showLandmarks)}
              className={`py-1.5 px-3 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                showLandmarks
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Landmarks {showLandmarks ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map + Side Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden" style={{ height: 'calc(100vh - 128px)' }}>
        {/* Left Side: Interactive Plot List (Scrollable) */}
        <div className="w-full lg:w-96 bg-white border-r border-blue-100 flex flex-col z-10 shrink-0 shadow-lg lg:shadow-none order-2 lg:order-1 h-64 lg:h-full overflow-hidden">
          <div className="p-3 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between text-xs font-bold text-navy-900">
            <span>Plots in View ({filteredPlots.length})</span>
            <span className="text-[11px] text-slate-500 font-normal">Click card to zoom</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-2">
            {filteredPlots.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No plots match your selected filters. Try resetting the village or category filter.
              </div>
            ) : (
              filteredPlots.map((plot) => {
                const isSelected = selectedPlot?.id === plot.id;
                const inCompare = isInCompare(plot.id);
                return (
                  <div
                    key={plot.id}
                    onClick={() => handleSelectPlotFromList(plot)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-400 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${
                          plot.category === 'Residential Plot'
                            ? 'bg-emerald-600'
                            : 'bg-amber-600'
                        }`}
                      >
                        {plot.category}
                      </span>
                      <span className="text-xs font-extrabold text-navy-900">
                        {plot.priceDisplay}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-navy-950 truncate mb-1">
                      {plot.title}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                      <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{plot.village}, Amaravati</span>
                      {plot.plotCode && (
                        <span className="ml-auto font-mono text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          {plot.plotCode}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1 text-[10px] bg-slate-50 p-1.5 rounded-lg mb-2 text-slate-600">
                      <div><strong>Size:</strong> {plot.sizeSqYds} sq.yd</div>
                      <div><strong>Facing:</strong> {plot.facing}</div>
                      <div><strong>Road:</strong> {plot.roadWidth}m</div>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100 text-[11px]">
                      <Link
                        to={`/plot-intelligence?code=${encodeURIComponent(plot.plotCode || plot.id)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Intelligence</span>
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (inCompare) removeFromCompare(plot.id);
                          else addToCompare(plot);
                        }}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          inCompare
                            ? 'bg-brand-orange text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <SlidersHorizontal className="w-2.5 h-2.5" />
                        <span>{inCompare ? 'Comparing' : 'Compare'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Interactive Leaflet Map Container */}
        <div className="flex-1 relative order-1 lg:order-2 h-full">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-blue-100 text-xs text-slate-700 flex flex-col gap-1.5 max-w-xs pointer-events-auto">
            <div className="font-bold text-navy-950 flex items-center gap-1.5 text-xs">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Map Legend & Layers</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-300"></span>
              <span>Residential Plots (LPS Returnable)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-3 h-3 rounded-full bg-amber-600 border border-amber-300"></span>
              <span>Commercial Plots (APCRDA Prime)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span>🏛️</span>
              <span>Government / Core Capital Landmarks</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-100">
              * Parcel boundaries shown on select are indicative APCRDA LPS pooling representations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
