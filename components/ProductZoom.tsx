'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductZoomProps {
  images: string[];
  alt: string;
}

export default function ProductZoom({ images, alt }: ProductZoomProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-8 h-full">
      {/* Thumbnails Strip */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:w-24 flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`relative w-20 h-20 lg:w-full lg:h-24 flex-shrink-0 border transition-all duration-300 ${
              currentImageIndex === idx
                ? 'border-brand-gold opacity-100'
                : 'border-brand-gold/10 opacity-60 hover:opacity-100 hover:border-brand-gold/30'
            }`}
          >
            <Image
              src={img}
              alt={`${alt} view ${idx + 1}`}
              fill
              className="object-cover p-2"
            />
          </button>
        ))}
      </div>

      {/* Main Image Area */}
      <div className="relative flex-1 aspect-[4/5] lg:aspect-auto lg:h-[600px] bg-white/40 border border-brand-gold/10 group rounded-sm">
        <div
          ref={imageRef}
          className="relative w-full h-full cursor-crosshair overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setShowZoom(false)} // Disable zoom on touch
        >
          <Image
            src={images[currentImageIndex]}
            alt={alt}
            fill
            className="object-contain p-8"
            priority
          />
          
          {/* Zoom Lens (Optional visual indicator on main image) */}
          {showZoom && !isMobile && (
            <div 
              className="absolute w-40 h-40 border border-brand-gold/50 bg-brand-gold/10 pointer-events-none backdrop-blur-[1px]"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </div>

        {/* Navigation Arrows (Visible on hover/mobile) */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-brand-bg/40 backdrop-blur-md border border-brand-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-brand-gold hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-brand-bg/40 backdrop-blur-md border border-brand-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-brand-gold hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>


        {/* Zoomed View Panel */}
        <AnimatePresence>
          {showZoom && !isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-[105%] top-0 w-[500px] h-[600px] bg-brand-bg border border-brand-gold/20 z-50 overflow-hidden shadow-2xl hidden lg:block"
            >
              <div
                className="absolute w-[200%] h-[200%]"
                style={{
                  backgroundImage: `url(${images[currentImageIndex]})`,
                  backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                  backgroundSize: '250%', // Zoom level
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
