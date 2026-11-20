import React from 'react';
import PlotHeroSearch from '../components/PlotHeroSearch';
import TrustValueCards from '../components/TrustValueCards';
import TrustStatementBanner from '../components/TrustStatementBanner';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero & Find Your Perfect Property Search Panel */}
      <PlotHeroSearch />

      {/* 2. Why Choose Simply Buy Sell? (Built on Trust, Delivered with Excellence) */}
      <TrustValueCards />

      {/* 3. Our Core Commitment (Your Trust is Our Strength, Your Satisfaction is Our Goal) */}
      <TrustStatementBanner />
    </div>
  );
}
