import React from 'react';
import HeroSlider from '../components/HeroSlider';
import PlotHeroSearch from '../components/PlotHeroSearch';
import FeaturedProperties from '../components/FeaturedProperties';
import TrustValueCards from '../components/TrustValueCards';
import TrustStatementBanner from '../components/TrustStatementBanner';
import ReviewsSection from '../components/ReviewsSection';
import ContactCtaBanner from '../components/ContactCtaBanner';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Dynamic Hero Slider (6 Pan-India Slides with 3 Common Buttons) */}
      <HeroSlider />

      {/* 2. Find Your Perfect Property Search Panel */}
      <PlotHeroSearch />

      {/* 3. Main Property Inventory (LPS Plots, Apartment Flats, Open Plots) */}
      <FeaturedProperties />

      {/* 4. Trust & Values */}
      <TrustValueCards />

      {/* 5. Core Commitment Banner */}
      <TrustStatementBanner />

      {/* 6. Client Feedback & Contact */}
      <ReviewsSection />
      <ContactCtaBanner />
    </div>
  );
}
