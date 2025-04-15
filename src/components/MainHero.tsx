"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function MainHero() {
  const scrollToUseCases = () => {
    document.getElementById("use-cases-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);

  // State to ensure THREE.js is loaded in client environment
  const [threeLoaded, setThreeLoaded] = useState(false);

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
          We Speed Up What <span className="text-blue-600">Slows You Down</span>.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AI-powered workflows that accelerate revenue, streamline operations, and eliminate manual work.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            onClick={scrollToUseCases} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium text-lg shadow-lg group flex items-center gap-2 mx-auto"
          >
            Show Me How AI Can Help
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
