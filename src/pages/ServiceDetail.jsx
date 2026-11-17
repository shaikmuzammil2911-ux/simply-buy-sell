import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Home,
  Building2,
  MapPin,
  TreePine,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

const iconMap = {
  Home: Home,
  Building2: Building2,
  MapPin: MapPin,
  TreePine: TreePine,
  TrendingUp: TrendingUp
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services, properties, openEnquiryModal, openScheduleVisitModal, getWhatsAppLink } = useApp();

  const service = services.find((s) => s.slug === slug) || services[0];
  const Icon = iconMap[service.icon] || Home;

  // Filter properties matching this service category
  const matchingProperties = properties.filter((p) => {
    if (slug === 'residential') return p.category === 'residential';
    if (slug === 'commercial') return p.category === 'commercial';
    if (slug === 'plots') return p.category === 'plots';
    if (slug === 'agricultural-land') return p.category === 'agricultural-land';
    if (slug === 'investment') return p.category === 'investment' || p.category === 'commercial';
    return true;
  });

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8">
      {/* Service Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-navy-900 text-white min-h-[380px] flex items-center shadow-xl">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-transparent" />

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
              <Icon className="w-4 h-4 text-brand-orange" />
              <span>{service.badge || 'Amaravati Service'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {service.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openEnquiryModal()}
                className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-orange/30 flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Enquire Now</span>
              </button>

              <a
                href={getWhatsAppLink(`Hello SimplyBuySell, I am interested in your ${service.title} services in Amaravati.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Advisor</span>
              </a>

              <button
                onClick={() => openScheduleVisitModal()}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Overview & Benefits */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-100">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Service Overview</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {service.overview || service.description}
            </p>

            <h3 className="text-base font-bold text-navy-900 uppercase tracking-wider mb-3">
              Key Advantages & Highlights
            </h3>
            <div className="space-y-3">
              {service.benefits?.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span>Prime Amaravati Hotspots</span>
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Key locations with high development velocity for this property category:
              </p>
              <div className="space-y-2.5">
                {service.hotspots?.map((spot, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <span>{spot}</span>
                    <span className="text-brand-orange font-bold">High Growth</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <Link
                to="/buy"
                className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Browse All {service.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Available Properties in this Category */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Available {service.title}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Handpicked listings currently open for inspection in Amaravati
              </p>
            </div>
            <Link
              to="/buy"
              className="text-xs sm:text-sm font-bold text-brand-orange hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(matchingProperties.length > 0 ? matchingProperties : properties.slice(0, 3)).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-card border border-slate-100 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Got Questions About {service.title}?
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-navy-900 text-sm sm:text-base flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openFaq === idx && (
                    <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
