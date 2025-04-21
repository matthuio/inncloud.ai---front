"use client";

import Header from '@/components/Header';
import MainHero from '@/components/MainHero';
import ResultsSection from '@/components/ResultsSection';
import HeroSection from '@/components/HeroSection';
import WhoWeHelpSection from '@/components/WhoWeHelpSection';

// Client component that displays both hero components vertically
export default function HomePageClient() {
  return (
    <>
      <Header />
      {/* Display Vanta cloud animation hero at the top */}
      <MainHero />
      {/* Insert Results section below hero */}
      <ResultsSection />
      {/* Display the solution selector below Results */}
      <HeroSection />
      {/* Who We Work With section replaces duplicate Results */}
      <WhoWeHelpSection />
    </>
  );
}
