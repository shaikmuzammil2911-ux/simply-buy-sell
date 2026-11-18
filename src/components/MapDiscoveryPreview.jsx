import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Layers, Navigation, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MapDiscoveryPreview() {
  return (
    <section className="py-16 bg-navy-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-blue-900/60 via-navy-900/80 to-blue-950/90 rounded-3xl p-8 sm:p-12 border border-blue-800/50 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
                <Map className="w-3.5 h-3.5 text-blue-400" />
                <span>Geographic Information System</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Explore Amaravati Plots on Interactive GIS Maps
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                Filter plots visually by location, inspect front road widths, view APCRDA sector boundary demarcations, and compute real driving distances to the Secretariat, High Court and educational campuses.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Color-coded Residential vs Commercial pins</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cadastral parcel boundary overlays</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Google Maps turn-by-turn navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant APCRDA Plot Code lookup & zoom</span>
                </div>
              </div>

              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all group"
              >
                <span>Launch Fullscreen GIS Map</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right preview graphic */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-blue-400/30 shadow-2xl bg-navy-950 p-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                    alt="Amaravati GIS Map Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-[2px]" />

                  {/* Mock Map Pins Overlay */}
                  <div className="absolute top-1/4 left-1/3 p-2 rounded-full bg-emerald-600 text-white shadow-lg animate-bounce">
                    <span className="text-[10px] font-black">R</span>
                  </div>
                  <div className="absolute top-1/2 right-1/4 p-2 rounded-full bg-amber-600 text-white shadow-lg">
                    <span className="text-[10px] font-black">C</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 bg-navy-950/90 backdrop-blur-md p-3 rounded-xl border border-white/20 text-xs">
                    <div className="font-bold text-white mb-0.5">Thullur Sector 7 Plot</div>
                    <div className="text-[11px] text-slate-300">APCRDA: LPS-THU-R-0412 • 400 sq.yd</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
