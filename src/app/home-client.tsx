"use client";

import HeroSection from '@/components/HeroSection';
import MainHero from '@/components/MainHero';

// Client component that displays both hero components vertically
export default function HomePageClient() {
  return (
    <>
      {/* Display Vanta cloud animation hero at the top */}
      <MainHero />
      
      {/* Display the solution selector below */}
      <HeroSection />
    </>
  );
}
