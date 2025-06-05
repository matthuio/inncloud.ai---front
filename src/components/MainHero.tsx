"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState, useCallback } from "react";
import AnimatedCounter from "./AnimatedCounter";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

interface MainHeroProps {
  mode?: 'mobile' | 'desktop';
}

export default function MainHero({ mode }: MainHeroProps) {
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = useCallback(() => {
    setIsAutoScrolling(true);
    
    // Smooth scroll to the use cases section first
    document.getElementById("use-cases-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Then start auto-scrolling
    scrollInterval.current = setInterval(() => {
      window.scrollBy({
        top: 2.9, // 40% faster scrolling
        behavior: 'smooth'
      });
    }, 20); // Keep the same interval but increase scroll amount for smoother feel
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
    setIsAutoScrolling(false);
  }, []);

  // Set up event listeners for user interaction
  useEffect(() => {
    if (isAutoScrolling) {
      const handleUserInteraction = () => stopAutoScroll();
      
      // Add event listeners for various user interactions
      window.addEventListener('mousedown', handleUserInteraction);
      window.addEventListener('touchstart', handleUserInteraction);
      window.addEventListener('wheel', handleUserInteraction, { passive: true });
      window.addEventListener('keydown', handleUserInteraction);
      
      // Clean up
      return () => {
        window.removeEventListener('mousedown', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
        window.removeEventListener('wheel', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [isAutoScrolling, stopAutoScroll]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, []);

  // State to ensure THREE.js is loaded in client environment

  // First useEffect to confirm THREE is loaded
  useEffect(() => {
    // This ensures that THREE is properly loaded in client environment
    if (typeof window !== 'undefined' && THREE) {
      setThreeLoaded(true);
    }
    
    // Clean up effect when component unmounts
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // Second useEffect to init Vanta once THREE is confirmed loaded
  useEffect(() => {
    if (threeLoaded && vantaRef.current && !vantaEffect.current) {
      console.log('Initializing VANTA effect');
      try {
        // Using the exact parameters from the Vanta.js demo site
        vantaEffect.current = CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          skyColor: 0x4bc7ff,      // Much brighter sky blue
          cloudColor: 0xffffff,    // Pure white clouds
          cloudShadowColor: 0xc9e6ff, // Very light blue shadow (almost white)
          sunColor: 0xffff99,      // Bright yellow sun
          sunGlareColor: 0xffcc33, // Bright orange glare
          sunlightColor: 0xffcc66, // Bright golden sunlight
          speed: 1.0,              // Normal speed
          lighting: 2.0,           // Doubled lighting
          cloudCover: 0.1,         // Minimal cloud cover
          backgroundAlpha: 1.0,    // Fully opaque background
          sunPosition: new THREE.Vector3(0, 2, 2), // Sun positioned more forward
          sunIntensity: 2.0        // Increased sun intensity
        });
        console.log('VANTA effect initialized successfully');
      } catch (error) {
        console.error('Error initializing VANTA effect:', error);
      }
    }
  }, [threeLoaded, vantaRef]);

  return (
    <section 
      ref={vantaRef} 
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 0 }} // Explicitly set zIndex to ensure proper layering
    >

      {/* Content container */}
      <div className="px-6 max-w-4xl mx-auto text-center z-10">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Speed Up Your Revenue. <span className="text-blue-600">Automatically.</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto mb-10 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span
            className={
              mode === 'mobile'
                ? 'flex flex-col items-center gap-1 w-full'
                : mode === 'desktop'
                  ? 'flex flex-row items-baseline gap-2 justify-center w-full'
                  : 'flex flex-col xs:flex-row items-center xs:items-baseline gap-1 xs:gap-2 w-full'
            }
          >
            <span>Increase revenue speed by</span>
            <motion.span
              className="text-blue-600 font-bold text-2xl md:text-3xl"
              initial={{ textShadow: '0 0 0 #4C8AFF' }}
              animate={{ textShadow: '0 0 10px #4C8AFF' }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
            >
              <AnimatedCounter from={0} to={91.5} duration={2} />%
            </motion.span>
            <span>from cold lead to final payment.</span>
          </span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            onClick={startAutoScroll}
            className={cn(
              'relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium text-lg shadow-lg shadow-blue-600/30 group flex items-center gap-2 mx-auto w-full max-w-xs sm:max-w-md transition-all duration-200',
              mode === 'mobile' ? 'text-base whitespace-normal break-words' : '',
              isAutoScrolling ? 'transform scale-95 bg-blue-700' : '',
              'after:absolute after:inset-0 after:rounded-xl after:pointer-events-none after:animate-[pulse-ring_3s_cubic-bezier(0.4,0,0.2,1)_infinite] after:border-[3px] after:border-white/50',
              'before:absolute before:inset-0 before:rounded-xl before:pointer-events-none before:animate-[pulse-ring_3s_cubic-bezier(0.4,0,0.2,1)_1s_infinite] before:border-[3px] before:border-white/50',
              'hover:after:border-white/60 hover:before:border-white/60'
            )}
            disabled={isAutoScrolling}
          >
            <span className="block text-center w-full">
              {mode === 'mobile' ? 'Faster Revenue' : 'Increase my Revenue Speed'}
            </span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-secondary/30 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
