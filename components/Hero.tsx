'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown,  ArrowRight } from 'lucide-react';
import { BANGLES } from '../lib/bangles-data';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Use the first bangle image as the hero image
  const heroImage = BANGLES[0].image;

  useEffect(() => {
    // Load Unicorn Studio Script
    const loadUnicornScript = () => {
        // @ts-ignore
        const u = window.UnicornStudio;
        // @ts-ignore
        if(u && u.init){
          if(document.readyState==="loading"){
            // @ts-ignore
            document.addEventListener("DOMContentLoaded",function(){u.init()})
          }else{
            // @ts-ignore
            u.init()
          }
        }else{
          // @ts-ignore
          window.UnicornStudio={isInitialized:!1};
          const i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";
          i.onload=function(){
             // @ts-ignore
             if(document.readyState==="loading"){
               // @ts-ignore
               document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})
             }else{
               // @ts-ignore
               UnicornStudio.init()
             }
          };
          (document.head||document.body).appendChild(i);
        }
      };
      loadUnicornScript();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen min-h-[900px] w-full overflow-hidden flex items-center justify-center bg-white">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div data-us-project="PrucT0X8e3WyQ0Mi4oSm" style={{ width: '100%', height: '100%' }}></div>
      </div>
      
      {/* Overlay to ensure text readability if needed, though Unicorn background seems light */}
      <div className="absolute inset-0 bg-white/30 z-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        
        {/* Top Label */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 pointer-events-none"
        >
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#bd9035]">
                Est. 1984 • Master Craftsmanship
            </span>
        </motion.div>

        {/* Main Title with Parallax */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-20 mb-8 mix-blend-multiply"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10vw] md:text-[8rem] leading-[0.85] font-mosseta tracking-tighter text-[#1a1a1a]"
          >
            THE BLING
            <span className="block italic font-light text-[#bd9035]">BANGLES</span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#666] text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto mb-10 leading-relaxed"
        >
            Where every wrist deserves to shine with timeless elegance and modern design.
        </motion.p>

        {/* CTA Button */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
        >
            <button 
             onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
             className="group relative px-10 py-4 bg-[#bd9035] text-white overflow-hidden rounded-full transition-all hover:bg-[#a67c2e] shadow-lg shadow-[#bd9035]/20"
           >
             <span className="relative z-10 flex items-center gap-3 text-xs font-bold tracking-[0.2em]">
               EXPLORE COLLECTION <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
             </span>
           </button>
        </motion.div>

      </div>
      
      {/* Feature Image / Floating Elements if any, kept minimal for clean look */}
      
      {/* Scroll Indicator */}
       <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#bd9035] uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 text-[#bd9035]" />
        </motion.div>
    </div>
  );
}
