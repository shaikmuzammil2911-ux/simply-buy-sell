import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { amaravatiVillages } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function VillageDiscoverySection() {
  const { properties } = useApp();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Amaravati Land Pooling Geography</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              Explore Plots by Amaravati Village
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Browse LPS plots grouped across the 29 capital region revenue villages, from government administrative zones to IT & knowledge corridors.
            </p>
          </div>

          <Link
            to="/market-insights"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>View All Village Market Trends</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Village Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amaravatiVillages.map((v) => {
            const plotCount = properties.filter(
              (p) => p.village?.toLowerCase() === v.name.toLowerCase()
            ).length;

            return (
              <Link
                key={v.id}
                to={`/locations/${v.name.toLowerCase()}`}
                className="group p-5 rounded-2xl border border-blue-100/80 bg-gradient-to-b from-sky-50/50 to-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {v.themeCity}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {plotCount > 0 ? `${plotCount} Listed` : 'Active LPS'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-navy-950 group-hover:text-blue-600 transition-colors mb-1">
                    {v.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Avg Rate</span>
                    <span className="font-extrabold text-navy-900">
                      ₹{v.avgPricePerSqYd.toLocaleString('en-IN')}/yd
                    </span>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
