import React from 'react';
import HeroSlider from '../components/HeroSlider';
import WelcomeSection from '../components/WelcomeSection';
import TrustValueCards from '../components/TrustValueCards';
import TrustStatementBanner from '../components/TrustStatementBanner';
import StatsCounter from '../components/StatsCounter';
import FeaturedProperties from '../components/FeaturedProperties';
import ServicesSection from '../components/ServicesSection';
import OpenPropertiesCta from '../components/OpenPropertiesCta';
import ReviewsSection from '../components/ReviewsSection';
import ContactCtaBanner from '../components/ContactCtaBanner';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSlider />
      <WelcomeSection />
      <TrustValueCards />
      <TrustStatementBanner />
      <StatsCounter />
      <FeaturedProperties />
      <ServicesSection />
      <OpenPropertiesCta />
      <ReviewsSection />
      <ContactCtaBanner />
    </div>
  );
}
