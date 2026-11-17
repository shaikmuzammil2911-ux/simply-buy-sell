import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Building2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
      <div className="w-20 h-20 rounded-3xl bg-orange-50 text-brand-orange flex items-center justify-center mb-6 shadow-inner">
        <Building2 className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
        Error 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-600 text-sm sm:text-base max-w-md mb-8">
        The page you are looking for does not exist or may have moved. Explore our active property listings or head back home.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/buy"
          className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-md shadow-brand-orange/20"
        >
          <Search className="w-4 h-4" />
          <span>Browse Properties</span>
        </Link>
      </div>
    </div>
  );
}
