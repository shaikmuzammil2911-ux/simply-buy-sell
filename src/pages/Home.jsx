import React from 'react';
import HeroSlider from '../components/HeroSlider';
import PlotHeroSearch from '../components/PlotHeroSearch';
import TrustValueCards from '../components/TrustValueCards';
import TrustStatementBanner from '../components/TrustStatementBanner';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Dynamic Hero Slider (6 Pan-India Slides with 3 Common Buttons) */}
      <HeroSlider />

      {/* 2. Hero & Find Your Perfect Property Search Panel */}
      <PlotHeroSearch />

      {/* 3. Why Choose Simply Buy Sell? (Built on Trust, Delivered with Excellence) */}
      <TrustValueCards />

      {/* 4. Our Core Commitment (Your Trust is Our Strength, Your Satisfaction is Our Goal) */}
      <TrustStatementBanner />
    </div>
  );
}
