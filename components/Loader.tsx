'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // Faster progress
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0B0B0B]">
      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Simple rotating diamond */}
        <div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            {/* Diamond shape - simplified */}
            <svg width="80" height="80" viewBox="0 0 80 80">
              <path
                d="M40 5 L60 25 L40 75 L20 25 Z"
                fill="none"
                stroke="#E6C78B"
                strokeWidth="2"
              />
              <path
                d="M20 25 L60 25 M28 16 L40 5 L52 16"
                fill="none"
                stroke="#E6C78B"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>
          </motion.div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tighter text-[#E6C78B] mb-2">
            THE BLING BANGLES
          </h1>
          <p className="text-[#D4A373] text-[10px] uppercase tracking-[0.3em] font-medium">
            Loading...
          </p>
        </div>

        {/* Simplified progress bar */}
        <div className="w-48">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E6C78B] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-[#E6C78B] text-[10px] uppercase tracking-[0.2em]">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
