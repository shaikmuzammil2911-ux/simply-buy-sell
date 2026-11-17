import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FloatingActions() {
  const { getWhatsAppLink } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-navy-900/90 text-white shadow-xl hover:bg-brand-orange transition-all duration-200 backdrop-blur-md border border-white/20 animate-fade-in"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp CTA */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white"
        aria-label="Chat with SimplyBuySell on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />

        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping -z-10" />

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 hidden sm:block">
          Need Property Help? Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
