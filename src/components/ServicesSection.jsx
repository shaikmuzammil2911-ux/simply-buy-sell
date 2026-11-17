import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Building2,
  MapPin,
  TreePine,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const iconMap = {
  Home: Home,
  Building2: Building2,
  MapPin: MapPin,
  TreePine: TreePine,
  TrendingUp: TrendingUp
};

export default function ServicesSection() {
  const { services } = useApp();

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
            What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Our Services
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Explore our comprehensive range of real estate services across Amaravati & Andhra Pradesh
          </p>
        </div>

        {/* 5 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Home;
            const isFeatured = index === 0;

            return (
              <div
                key={service.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Service Image with hover zoom */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

                    {/* Floating Icon */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md text-brand-royal flex items-center justify-center shadow-lg group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Badge */}
                    {service.badge && (
                      <span className="absolute top-4 right-4 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy-900 shadow-sm">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-orange transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                      {service.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white text-navy-900 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
