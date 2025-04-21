"use client";

import React from 'react';
import Header from '@/components/Header';
import MainHero from '@/components/MainHero';
import ResultsSection from '@/components/ResultsSection';
import HeroSection from '@/components/HeroSection';
import WhoWeHelpSection from '@/components/WhoWeHelpSection';

// Client component that displays both hero components vertically
export default function HomePageClient() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Header />
      {/* Display Vanta cloud animation hero at the top */}
      <MainHero mode={isMobile ? 'mobile' : 'desktop'} />
      {/* Insert Results section below hero */}
      <ResultsSection />
      {/* Display the solution selector below Results */}
      <HeroSection />
      {/* Who We Work With section replaces duplicate Results */}
      <WhoWeHelpSection />
    </>
  );
}
