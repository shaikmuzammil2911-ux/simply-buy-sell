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
  MapPin,
  Eye,
  RotateCcw,
  Globe2,
  ArrowRight
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
  const [mapType, setMapType] = useState('voyager'); // 'voyager' | 'satellite'

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const polygonRef = useRef(null);

  // Filter plots with fallback coordinates to ensure every listing maps accurately
  const filteredPlots = properties.filter((plot) => {
    // Determine coordinates (use plot coordinates or fallback to village coordinates)
    const plotLat = plot.lat || amaravatiVillages.find((v) => v.name.toLowerCase() === plot.village?.toLowerCase())?.lat;
    const plotLng = plot.lng || amaravatiVillages.find((v) => v.name.toLowerCase() === plot.village?.toLowerCase())?.lng;
    if (!plotLat || !plotLng) return false;

    // Attach verified coordinates to plot
    plot.lat = plot.lat || plotLat;
    plot.lng = plot.lng || plotLng;

    if (selectedCategory !== 'All') {
      const cat = (plot.category || '').toLowerCase();
      const pCat = (plot.propertyCategory || '').toLowerCase();
      const type = (plot.type || '').toLowerCase();
      const sel = selectedCategory.toLowerCase();

      if (sel.includes('residential')) {
        if (!cat.includes('residential') && pCat !== 'lps_plots') return false;
      } else if (sel.includes('commercial')) {
        if (!cat.includes('commercial')) return false;
      } else if (sel.includes('apartment') || sel.includes('flat')) {
        if (pCat !== 'apartments' && type !== 'flats') return false;
      } else if (sel.includes('house') || sel.includes('villa')) {
        if (pCat !== 'houses' && type !== 'houses') return false;
      } else if (sel.includes('open')) {
        if (pCat !== 'open_plots') return false;
      }
    }

    if (selectedVillage !== 'All' && plot.village?.toLowerCase() !== selectedVillage.toLowerCase()) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchCode = (plot.apcrdaPlotCode || plot.plotCode || '').toLowerCase().includes(q);
      const matchId = (plot.id || '').toLowerCase().includes(q);
      const matchVillage = (plot.village || '').toLowerCase().includes(q);
      const matchTitle = (plot.title || '').toLowerCase().includes(q);
      if (!matchCode && !matchId && !matchVillage && !matchTitle) return false;
    }
    return true;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Amaravati Center
    const map = L.map(mapContainerRef.current, {
      center: [16.5385, 80.5180],
      zoom: 12,
      scrollWheelZoom: true,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial CartoDB Voyager Tile Layer (Bright, Vibrant, Grand Cartography)
    const initialTile = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; CartoDB &copy; OpenStreetMap | APCRDA GIS Cadastral Grid',
        maxZoom: 19
      }
    ).addTo(map);

    tileLayerRef.current = initialTile;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Map Type Switch (Street Voyager vs Satellite Imagery)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    if (mapType === 'satellite') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics | APCRDA Satellite Grid',
          maxZoom: 18
        }
      ).addTo(map);
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; CartoDB &copy; OpenStreetMap | APCRDA GIS Cadastral Grid',
          maxZoom: 19
        }
      ).addTo(map);
    }
  }, [mapType]);

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
          className: 'custom-grand-landmark-icon',
          html: `
            <div style="
              background: linear-gradient(135deg, #1e3a8a, #0f172a);
              color: #ffffff;
              padding: 4px 10px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 800;
              box-shadow: 0 4px 15px rgba(0,0,0,0.4), 0 0 0 2px #60a5fa;
              white-space: nowrap;
              display: flex;
              align-items: center;
              gap: 6px;
              letter-spacing: 0.3px;
            ">
              <span style="font-size: 13px;">🏛️</span>
              <span>${lm.name}</span>
            </div>
          `,
          iconSize: [140, 28],
          iconAnchor: [70, 14]
        });

        const lmMarker = L.marker([lm.lat, lm.lng], { icon: landmarkIcon }).addTo(map);
        lmMarker.bindPopup(`
          <div style="font-family:system-ui;padding:6px;min-width:200px;">
            <div style="font-size:12px;font-weight:800;color:#1e3a8a;margin-bottom:2px;">🏛️ ${lm.name}</div>
            <div style="font-size:11px;color:#0284c7;font-weight:700;margin-bottom:4px;">${lm.type} • Amaravati Core</div>
            <div style="font-size:10px;color:#64748b;line-height:1.4;">Major governmental & institutional anchor driving regional capital development.</div>
          </div>
        `);
        markersRef.current.push(lmMarker);
      });
    }

    // Add Plot Markers with Grand Visual Styling & Multi-Category Differentiation
    filteredPlots.forEach((plot) => {
      const isSelected = selectedPlot?.id === plot.id;
      const isRes = plot.category === 'Residential Plot' || (plot.propertyCategory === 'lps_plots' && plot.category === 'residential');
      const isComm = plot.category === 'Commercial Plot' || (plot.propertyCategory === 'lps_plots' && plot.category === 'commercial');
      const isApt = plot.propertyCategory === 'apartments' || plot.type === 'Flats';
      const isHouse = plot.propertyCategory === 'houses' || plot.type === 'Houses';
      const isOpenPlot = plot.propertyCategory === 'open_plots';

      // Pin Color, Gradient, Shadow & Marker Letter
      let bgGradient = 'linear-gradient(135deg, #059669, #10b981)';
      let shadowColor = 'rgba(5, 150, 105, 0.45)';
      let ringColor = isSelected ? '#ffffff' : '#a7f3d0';
      let pinLetter = 'R';
      let categoryTag = 'Residential Plot';
      let badgeBg = '#059669';

      if (isComm) {
        bgGradient = 'linear-gradient(135deg, #d97706, #f59e0b)';
        shadowColor = 'rgba(217, 119, 6, 0.45)';
        ringColor = isSelected ? '#ffffff' : '#fde68a';
        pinLetter = 'C';
        categoryTag = 'Commercial Plot';
        badgeBg = '#d97706';
      } else if (isApt) {
        bgGradient = 'linear-gradient(135deg, #2563eb, #3b82f6)';
        shadowColor = 'rgba(37, 99, 235, 0.45)';
        ringColor = isSelected ? '#ffffff' : '#bfdbfe';
        pinLetter = 'A';
        categoryTag = 'Apartment Flat';
        badgeBg = '#2563eb';
      } else if (isHouse) {
        bgGradient = 'linear-gradient(135deg, #7c3aed, #8b5cf6)';
        shadowColor = 'rgba(124, 58, 237, 0.45)';
        ringColor = isSelected ? '#ffffff' : '#ddd6fe';
        pinLetter = 'H';
        categoryTag = 'Individual House';
        badgeBg = '#7c3aed';
      } else if (isOpenPlot) {
        bgGradient = 'linear-gradient(135deg, #b45309, #d97706)';
        shadowColor = 'rgba(180, 83, 9, 0.45)';
        ringColor = isSelected ? '#ffffff' : '#fed7aa';
        pinLetter = 'P';
        categoryTag = 'Open Plot';
        badgeBg = '#b45309';
      }

      const size = isSelected ? 42 : 36;

      const customIcon = L.divIcon({
        className: 'custom-grand-plot-pin',
        html: `
          <div style="
            position: relative;
            width: ${size}px;
            height: ${size}px;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            ${isSelected ? `
              <div style="
                position: absolute;
                inset: -6px;
                border-radius: 50%;
                background: ${isRes ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'};
                animation: pulse 1.5s infinite;
              "></div>
            ` : ''}
            <div style="
              width: 100%;
              height: 100%;
              background: ${bgGradient};
              color: #ffffff;
              border: 3px solid ${ringColor};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 8px 20px ${shadowColor};
            ">
              <span style="
                transform: rotate(45deg);
                font-size: ${isSelected ? '14px' : '12px'};
                font-weight: 900;
                text-shadow: 0 1px 2px rgba(0,0,0,0.4);
              ">
                ${pinLetter}
              </span>
            </div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size]
      });

      const marker = L.marker([plot.lat, plot.lng], { icon: customIcon }).addTo(map);

      // Grand Popup Content with thumbnail, crisp details, and DIRECT VIEW PROPERTY LINK
      const popupHtml = `
        <div style="font-family:system-ui;min-width:270px;padding:4px;overflow:hidden;border-radius:12px;">
          <div style="position:relative;width:100%;height:115px;border-radius:10px;overflow:hidden;margin-bottom:8px;background:#0f172a;">
            <img src="${plot.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'}" style="width:100%;height:100%;object-fit:cover;filter:brightness(1.05);" />
            <div style="position:absolute;top:6px;left:6px;background:${badgeBg};color:#fff;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;text-transform:uppercase;box-shadow:0 2px 6px rgba(0,0,0,0.3);">
              ${plot.category || categoryTag}
            </div>
            <div style="position:absolute;bottom:6px;right:6px;background:rgba(15,23,42,0.88);backdrop-filter:blur(4px);color:#fff;font-size:13px;font-weight:900;padding:3px 8px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);">
              ${plot.priceDisplay}
            </div>
          </div>

          <div style="font-weight:800;font-size:13px;color:#0f172a;margin-bottom:3px;line-height:1.3;">
            ${plot.title}
          </div>

          <div style="font-size:11px;color:#0284c7;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:4px;">
            <span>📍 ${plot.village || 'Amaravati'}, Amaravati</span>
            ${(plot.apcrdaPlotCode || plot.plotCode) ? `<span style="margin-left:auto;font-family:monospace;background:#fef3c7;color:#b45309;padding:1px 5px;border-radius:4px;border:1px solid #fde68a;">${plot.apcrdaPlotCode || plot.plotCode}</span>` : ''}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;font-size:10px;background:#f8fafc;padding:6px 8px;border-radius:8px;margin-bottom:10px;border:1px solid #e2e8f0;">
            <div><strong>Extent:</strong> ${plot.area || `${plot.plotSizeSqYd || 200} sq.yd`}</div>
            <div><strong>Facing:</strong> ${plot.facing || 'East'}</div>
            <div><strong>Road:</strong> ${plot.roadWidthFt ? `${plot.roadWidthFt} ft` : (plot.roadWidth || '40 ft')}</div>
            <div><strong>Rate:</strong> ${plot.pricePerSqYd ? `₹${plot.pricePerSqYd.toLocaleString()}/yd` : (plot.pricePerSqFt ? `₹${plot.pricePerSqFt.toLocaleString()}/ft` : 'Best Price')}</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            <a href="/property/${plot.id}" style="display:block;text-align:center;padding:8px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-size:12px;font-weight:900;border-radius:8px;text-decoration:none;box-shadow:0 3px 10px rgba(37,99,235,0.35);">
              View Complete Property Details →
            </a>
            <div style="display:flex;gap:5px;">
              <a href="/plot-intelligence?code=${encodeURIComponent(plot.apcrdaPlotCode || plot.plotCode || plot.id)}" style="flex:1;text-align:center;padding:5px;background:#f0f9ff;color:#0284c7;font-size:10px;font-weight:800;border-radius:6px;text-decoration:none;border:1px solid #bae6fd;">
                Plot Intelligence
              </a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${plot.lat},${plot.lng}" target="_blank" rel="noopener noreferrer" style="flex:1;text-align:center;padding:5px;background:#f1f5f9;color:#334155;font-size:10px;font-weight:700;border-radius:6px;text-decoration:none;border:1px solid #cbd5e1;">
                GPS Directions ↗
              </a>
            </div>
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
        const bounds = plot.boundaries || plot.boundaryGeoJson?.coordinates?.[0];
        if (bounds && bounds.length > 2) {
          const latLngs = bounds.map(coord => Array.isArray(coord) ? [coord[1], coord[0]] : coord);
          polygonRef.current = L.polygon(latLngs, {
            color: isRes ? '#059669' : '#d97706',
            fillColor: isRes ? '#10b981' : '#f59e0b',
            fillOpacity: 0.45,
            weight: 3.5,
            dashArray: '5, 5'
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
            fillOpacity: 0.45,
            weight: 3.5
          }).addTo(map);
        }
      }
    }
  }, [filteredPlots.length, selectedCategory, selectedVillage, showLandmarks, targetId, targetCode, selectedPlot?.id]);

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
          fillOpacity: 0.45,
          weight: 3.5
        }).addTo(map);
      }
    }
  };

  const resetView = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.setView([16.5385, 80.5180], 12, { animate: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-0">
      {/* Top Grand GIS Sub-Header / Filters with High-Contrast Vivid Colors */}
      <div className="bg-white border-b-2 border-blue-200 shadow-md px-4 py-2.5 sm:py-3 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Title & Stats */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 ring-2 ring-blue-200 shrink-0">
              <MapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-navy-950">
                  Amaravati GIS Cadastral Plot Explorer
                </h1>
                <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                  APCRDA Grid
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Visualizing <strong className="text-blue-700 font-black">{filteredPlots.length}</strong> verified plotted parcels across Amaravati villages
              </p>
            </div>
          </div>

          {/* Quick Filters with Crisp Contrast */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative flex-grow md:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plot code or village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs bg-slate-50 text-navy-900"
              />
            </div>

            {/* Category Select covering all 4+ multi-category inventory */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 rounded-xl border-2 border-slate-200 bg-white font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs shadow-sm"
            >
              <option value="All">All Categories ({properties.length} Available)</option>
              <option value="Residential Plot">Amaravati LPS Residential Plots</option>
              <option value="Commercial Plot">Amaravati LPS Commercial Plots</option>
              <option value="Apartments">Apartment Flats</option>
              <option value="Houses">Individual Houses & Villas</option>
              <option value="Open Plots">Open Plots & Ventures</option>
            </select>

            {/* Village Select */}
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="py-1.5 px-3 rounded-xl border-2 border-slate-200 bg-white font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs shadow-sm"
            >
              <option value="All">All 10+ Villages</option>
              {amaravatiVillages.map((v) => (
                <option key={v.id} value={v.name}>{v.name}</option>
              ))}
            </select>

            {/* Map Style Toggle: Voyager vs Satellite */}
            <button
              onClick={() => setMapType(mapType === 'voyager' ? 'satellite' : 'voyager')}
              className={`py-1.5 px-3 rounded-xl border-2 font-black flex items-center gap-1.5 transition-all shadow-sm ${
                mapType === 'satellite'
                  ? 'bg-amber-500 border-amber-600 text-white shadow-amber-500/20'
                  : 'bg-blue-50 border-blue-300 text-blue-700'
              }`}
              title="Toggle Street GIS Map vs Real Satellite View"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{mapType === 'satellite' ? 'Satellite ON' : 'Satellite View'}</span>
            </button>

            {/* Landmarks Toggle */}
            <button
              onClick={() => setShowLandmarks(!showLandmarks)}
              className={`py-1.5 px-3 rounded-xl border-2 font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                showLandmarks
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
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
        {/* Left Side: Interactive Plot List with Bright High-Contrast Cards */}
        <div className="w-full lg:w-96 bg-white border-r-2 border-blue-200 flex flex-col z-10 shrink-0 shadow-xl lg:shadow-none order-2 lg:order-1 h-72 lg:h-full overflow-hidden">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-sky-50 border-b border-blue-200 flex items-center justify-between text-xs font-black text-navy-950">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Plots in GIS View ({filteredPlots.length})
            </span>
            <span className="text-[11px] text-blue-600 font-bold">Click card to zoom</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2.5 space-y-2">
            {filteredPlots.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No plots match your selected filters. Try resetting the village or category filter.
              </div>
            ) : (
              filteredPlots.map((plot) => {
                const isSelected = selectedPlot?.id === plot.id;
                const inCompare = isInCompare(plot.id);
                const isRes = plot.category === 'Residential Plot' || (plot.propertyCategory === 'lps_plots' && plot.category === 'residential');
                const isComm = plot.category === 'Commercial Plot' || (plot.propertyCategory === 'lps_plots' && plot.category === 'commercial');
                const isApt = plot.propertyCategory === 'apartments' || plot.type === 'Flats';
                const isHouse = plot.propertyCategory === 'houses' || plot.type === 'Houses';

                const badgeBg = isRes ? 'bg-emerald-600' : isComm ? 'bg-amber-600' : isApt ? 'bg-blue-600' : isHouse ? 'bg-purple-600' : 'bg-slate-700';

                return (
                  <div
                    key={plot.id}
                    onClick={() => handleSelectPlotFromList(plot)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-500 shadow-lg ring-2 ring-blue-300/60'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail Image */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                        <img
                          src={plot.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'}
                          alt={plot.title}
                          className="w-full h-full object-cover filter brightness-105 contrast-105"
                        />
                        <span className={`absolute top-1.5 left-1.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded text-white shadow-xs ${badgeBg}`}>
                          {plot.category || (isApt ? 'Flat' : isHouse ? 'House' : 'Plot')}
                        </span>
                      </div>

                      {/* Content Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1 mb-0.5">
                          <span className="text-sm font-black text-brand-orange">
                            {plot.priceDisplay}
                          </span>
                          {(plot.apcrdaPlotCode || plot.plotCode) && (
                            <span className="font-mono text-[9px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200 truncate max-w-[100px]">
                              {plot.apcrdaPlotCode || plot.plotCode}
                            </span>
                          )}
                        </div>

                        <h4 className="font-extrabold text-xs text-navy-950 line-clamp-1 mb-1">
                          {plot.title}
                        </h4>

                        <div className="flex items-center gap-1 text-[11px] text-slate-600 mb-2 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{plot.village || 'Amaravati'}, AP</span>
                        </div>

                        <div className="text-[10px] text-slate-500 font-semibold mb-2">
                          <span>{plot.area || `${plot.plotSizeSqYd || 200} sq.yd`}</span>
                          {plot.facing && <span> • {plot.facing}</span>}
                          {plot.roadWidth && <span> • {plot.roadWidth}m</span>}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Direct Navigate & Locate */}
                    <div className="flex items-center justify-between gap-2 pt-2.5 mt-2 border-t border-slate-100 text-[11px]">
                      {/* Direct Property Details Link */}
                      <Link
                        to={`/property/${plot.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1 shadow-sm transition-all hover:scale-105"
                      >
                        <span>View Property</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* Zoom on Map */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlotFromList(plot);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-bold text-xs flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3 text-blue-600" />
                        <span>Locate</span>
                      </button>

                      {/* Compare Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (inCompare) removeFromCompare(plot.id);
                          else addToCompare(plot);
                        }}
                        className={`text-[10px] font-black px-2 py-1.5 rounded-xl flex items-center gap-1 transition-all ${
                          inCompare
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        <SlidersHorizontal className="w-2.5 h-2.5" />
                        <span>{inCompare ? 'Compared' : 'Compare'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Grand Interactive Leaflet Map Container */}
        <div className="flex-1 relative order-1 lg:order-2 h-full">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Floating Grand Controls (Top Right) */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={resetView}
              className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-navy-950 font-bold text-xs shadow-xl border border-slate-200 flex items-center gap-1.5 backdrop-blur-md transition-all hover:scale-105"
              title="Reset Map to Amaravati Center"
            >
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Reset Center</span>
            </button>
          </div>

          {/* Map Legend Overlay with Grand Badges */}
          <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border-2 border-blue-200 text-xs text-slate-800 flex flex-col gap-2 max-w-xs pointer-events-auto ring-4 ring-blue-100/40">
            <div className="font-black text-navy-950 flex items-center gap-1.5 text-xs pb-1 border-b border-slate-100">
              <Info className="w-4 h-4 text-blue-600" />
              <span>APCRDA GIS Map Legend</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-bold">
              <span className="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-md flex items-center justify-center text-[9px] text-white font-black">R</span>
              <span>Residential Plots (LPS Returnable)</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-bold">
              <span className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center text-[9px] text-white font-black">C</span>
              <span>Commercial Plots (APCRDA Prime)</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-bold">
              <span>🏛️</span>
              <span>Capital Government Anchors & Roads</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 pt-1 border-t border-slate-100 font-medium">
              * Click any plot pin to highlight its surveyed cadastral boundaries.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
