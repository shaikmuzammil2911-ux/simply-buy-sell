import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Search,
  PlusCircle,
  Pause,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HeroSlider() {
  const { heroSlides } = useApp();
  const activeSlides = heroSlides.filter(s => s.active !== false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-play interval: 6 seconds
  const SLIDE_DURATION = 6000;

  useEffect(() => {
    if (!isPaused && activeSlides.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlides.length);
      }, SLIDE_DURATION);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeSlides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? activeSlides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlides.length);
  };

  if (!activeSlides.length) return null;

  const currentSlide = activeSlides[currentIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-navy-900 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      style={{ minHeight: '520px', maxHeight: '660px', height: '70vh' }}
      aria-label="Amaravati Real Estate Hero Carousel"
    >
      {/* Slides Background Images */}
      {activeSlides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Bright, high-vibrancy image */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transform transition-transform duration-10000 brightness-105 contrast-105 saturate-110 ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Soft modern gradient allowing full bright colors to shine through */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/60 to-transparent md:to-navy-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* HTML Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl pt-6 pb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-4 shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>{currentSlide.badge || 'Amaravati Real Estate'}</span>
          </div>

          {/* Subtitle Positioning */}
          <div className="text-brand-orange text-xs sm:text-sm uppercase font-extrabold tracking-widest mb-2 flex items-center gap-2">
            <span>{currentSlide.subtitle}</span>
            <span className="w-8 h-[2px] bg-brand-orange inline-block" />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            {currentSlide.title}
          </h1>

          {/* Description */}
          <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-xl text-balance">
            {currentSlide.description}
          </p>

          {/* Multi-action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Explore Properties */}
            <Link
              to={currentSlide.ctaPrimary?.link || '/buy'}
              className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-brand-orange/30 flex items-center gap-2 group"
            >
              <span>{currentSlide.ctaPrimary?.text || 'Explore Properties'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Buy Property */}
            <Link
              to="/buy"
              className="px-5 py-3 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-brand-green/30 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Buy Property</span>
            </Link>

            {/* Sell Property */}
            <Link
              to="/sell"
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-brand-orange" />
              <span>Sell Property</span>
            </Link>

            {/* Know More */}
            <Link
              to={currentSlide.ctaSecondary?.link || '/motto'}
              className="px-4 py-3 text-slate-300 hover:text-white font-medium text-sm sm:text-base underline-offset-4 hover:underline transition-colors hidden md:inline-block"
            >
              {currentSlide.ctaSecondary?.text || 'Know More'}
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Left / Right Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-navy-900/60 hover:bg-brand-orange text-white backdrop-blur-md border border-white/15 transition-all duration-200 shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-navy-900/60 hover:bg-brand-orange text-white backdrop-blur-md border border-white/15 transition-all duration-200 shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Progress & Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clickable Dots */}
        <div className="flex items-center gap-2">
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-brand-orange'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Autoplay status / Pause indicator */}
        <div className="flex items-center gap-3 text-xs text-slate-300 bg-navy-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 hover:text-white"
            title={isPaused ? "Play Autoplay" : "Pause Autoplay"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isPaused ? 'Paused' : 'Auto-sliding'}</span>
          </button>
          <span className="text-slate-500">•</span>
          <span className="font-semibold text-white">
            0{currentIndex + 1} / 0{activeSlides.length}
          </span>
        </div>
      </div>

      {/* Dynamic Animated Progress Bar for current slide */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          key={currentIndex}
          className={`h-full bg-brand-orange ${isPaused ? '' : 'animate-slider-progress'}`}
          style={{
            animation: isPaused ? 'none' : `progressAnim ${SLIDE_DURATION}ms linear forwards`
          }}
        />
      </div>

      <style>{`
        @keyframes progressAnim {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
