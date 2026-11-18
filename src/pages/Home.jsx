import React from 'react';
import HeroSlider from '../components/HeroSlider';
import PlotHeroSearch from '../components/PlotHeroSearch';
import BuyerRequirementSection from '../components/BuyerRequirementSection';
import FeaturedProperties from '../components/FeaturedProperties';
import VillageDiscoverySection from '../components/VillageDiscoverySection';
import CategorySpotlightSection from '../components/CategorySpotlightSection';
import MapDiscoveryPreview from '../components/MapDiscoveryPreview';
import TrustValueCards from '../components/TrustValueCards';
import TrustStatementBanner from '../components/TrustStatementBanner';
import StatsCounter from '../components/StatsCounter';
import ReviewsSection from '../components/ReviewsSection';
import ContactCtaBanner from '../components/ContactCtaBanner';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Dynamic Hero Slider */}
      <HeroSlider />

      {/* 2. Advanced Search Panel */}
      <PlotHeroSearch />

      {/* 3. Featured Plot Inventory */}
      <FeaturedProperties />

      {/* 4. Buyer Requirement Section: Looking for a Specific Plot? */}
      <BuyerRequirementSection />

      {/* 5. Village Discovery Section: Explore Plots by Amaravati Village */}
      <VillageDiscoverySection />

      {/* 6. Residential vs Commercial Plots Spotlight */}
      <CategorySpotlightSection />

      {/* 7. GIS Map Discovery Teaser */}
      <MapDiscoveryPreview />

      {/* 8. Trust & Proof Banners */}
      <TrustValueCards />
      <TrustStatementBanner />
      <StatsCounter />
      <ReviewsSection />
      <ContactCtaBanner />
    </div>
  );
}
