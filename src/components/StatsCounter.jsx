import React, { useState, useEffect, useRef } from 'react';
import { Building, Users, ShieldCheck, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StatsCounter() {
  const { statistics } = useApp();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const [propCount, setPropCount] = useState(0);
  const [custCount, setCustCount] = useState(0);
  const [trustCount, setTrustCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    const targetProp = statistics.propertiesCount || 10000;
    const targetCust = statistics.happyCount || 5000;
    const targetTrust = statistics.trustedCount || 100;

    const duration = 1800;
    const steps = 40;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const progress = step / steps;
      setPropCount(Math.floor(targetProp * progress));
      setCustCount(Math.floor(targetCust * progress));
      setTrustCount(Math.floor(targetTrust * progress));

      if (step >= steps) {
        clearInterval(timer);
        setPropCount(targetProp);
        setCustCount(targetCust);
        setTrustCount(targetTrust);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, statistics]);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-r from-sky-50 via-blue-50/80 to-sky-50 border-b border-blue-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Stat 1: Properties Listed */}
          <div className="text-center p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-blue-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5 hover:border-blue-300">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shadow-sm">
              <Building className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              {inView ? (propCount >= 1000 ? `${(propCount / 1000).toFixed(0)}K+` : `${propCount}+`) : statistics.propertiesListed}
            </div>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              Properties Listed
            </div>
            <div className="text-xs text-blue-500 font-medium mt-0.5">Across Amaravati & CRDA</div>
          </div>

          {/* Stat 2: Happy Customers */}
          <div className="text-center p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-blue-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5 hover:border-blue-300">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              {inView ? (custCount >= 1000 ? `${(custCount / 1000).toFixed(0)}K+` : `${custCount}+`) : statistics.happyCustomers}
            </div>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              Happy Customers
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5">Buyers, Sellers & Investors</div>
          </div>

          {/* Stat 3: 100% Trusted Platform */}
          <div className="text-center p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-blue-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5 hover:border-blue-300">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-50 text-brand-royal flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-royal tracking-tight">
              {inView ? `${trustCount}%` : statistics.trustedPlatform}
            </div>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              Trusted Platform
            </div>
            <div className="text-xs text-brand-royal font-medium mt-0.5">Verified Legal Link Documents</div>
          </div>

          {/* Stat 4: Service Area */}
          <div className="text-center p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-blue-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5 hover:border-blue-300">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
              {statistics.serviceArea || 'Andhra Pradesh'}
            </div>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              {statistics.serviceTagline || 'Our Service Area'}
            </div>
            <div className="text-xs text-purple-600 font-medium mt-0.5">Amaravati • Guntur • Vijayawada</div>
          </div>
        </div>
      </div>
    </section>
  );
}
