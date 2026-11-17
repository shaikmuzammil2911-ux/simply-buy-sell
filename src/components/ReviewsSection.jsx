import React, { useState } from 'react';
import { Star, MessageSquarePlus, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ReviewsSection() {
  const { reviews, openReviewModal } = useApp();
  // Filter only approved reviews for the public showcase
  const approvedReviews = reviews.filter((r) => r.approved !== false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? approvedReviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % approvedReviews.length);
  };

  if (!approvedReviews.length) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
              Verified Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Customer Reviews
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              What our clients say about SimplyBuySell across Amaravati and Andhra Pradesh
            </p>
          </div>

          <button
            onClick={openReviewModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-brand-orange text-navy-900 hover:text-brand-orange font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200"
          >
            <MessageSquarePlus className="w-4 h-4 text-brand-orange" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300" />
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div>
                {/* Property Used Badge */}
                {rev.propertyUsed && (
                  <div className="text-[11px] font-semibold text-brand-royal bg-blue-50 px-2 py-1 rounded-md mb-4 inline-block truncate max-w-full">
                    {rev.propertyUsed}
                  </div>
                )}

                {/* Customer Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    loading="lazy"
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                        {rev.name}
                      </h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-green shrink-0" title="Verified Customer" />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {rev.location || 'Amaravati'}, AP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
