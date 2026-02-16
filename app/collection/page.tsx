'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BANGLES, Bangle } from '@/lib/bangles-data';

type FilterType = 'All' | 'Gold' | 'Silver' | 'Mehandi';

const getBangleCategory = (bangle: Bangle): 'Gold' | 'Silver' | 'Mehandi' => {
  // The type field is now the single source of truth for categorization
  if (bangle.type === 'Gold' || bangle.type === 'Silver' || bangle.type === 'Mehandi') {
    return bangle.type;
  }
  return 'Gold'; // Fallback
};

export default function CollectionPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [activePrice, setActivePrice] = useState<number | 'All'>('All');
  const [filteredBangles, setFilteredBangles] = useState<Bangle[]>(BANGLES);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const scrollTags = [document.documentElement, document.body];
    if (isFilterOpen) {
      scrollTags.forEach(tag => tag.classList.add('lock-scroll'));
      (window as any).lenis?.stop();
    } else {
      scrollTags.forEach(tag => tag.classList.remove('lock-scroll'));
      (window as any).lenis?.start();
    }
    return () => {
      scrollTags.forEach(tag => tag.classList.remove('lock-scroll'));
      (window as any).lenis?.start();
    };
  }, [isFilterOpen]);

  useEffect(() => {
    let filtered = BANGLES;
    
    // Filter by Category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(bangle => getBangleCategory(bangle) === activeFilter);
    }
    
    // Filter by Price
    if (activePrice !== 'All') {
      filtered = filtered.filter(bangle => bangle.price === activePrice);
    }
    
    setFilteredBangles(filtered);
  }, [activeFilter, activePrice]);

  return (
    <div className="min-h-screen bg-brand-bg text-zinc-900 selection:bg-brand-gold/30 selection:text-brand-accent overflow-x-hidden">
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative">
        
        {/* Page Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
             <span className="text-brand-gold uppercase tracking-[0.4em] text-xs mb-4 block">
              Curated Selection
            </span>
            <h1 className="text-5xl md:text-7xl font-mosseta mb-8 text-zinc-900">
              The Collection
            </h1>
            <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto" />
          </motion.div>

          {/* Decorative BG - Carefully contained */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -z-10" />
        </div>

        {/* Mobile Filter Trigger - Phone Only */}
        <div className="md:hidden flex justify-center mb-12">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-3 px-10 py-5 bg-brand-accent text-white rounded-full shadow-2xl transition-all active:opacity-90 group"
          >
            <Filter className="w-4 h-4 text-brand-gold transition-transform group-hover:rotate-12" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Refine Masterpieces</span>
            {(activeFilter !== 'All' || activePrice !== 'All') && (
              <span className="ml-2 w-2 h-2 rounded-full bg-brand-gold" />
            )}
          </motion.button>
        </div>

        {/* Bangles price Filter - Custom Visuals (Desktop/iPad Only) */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-20 px-4">
          {(['All', 699, 999, 1299] as const).map((price) => (
            <motion.div 
              key={price}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePrice(price)}
              className={`relative cursor-pointer group transition-all duration-500 ${activePrice === price ? 'scale-110' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44">
                <Image 
                  src="/assets/banglePrice.png" 
                  alt={price === 'All' ? 'View All Prices' : `Filter by ₹${price}`} 
                  fill
                  className={`object-contain transition-transform duration-500 ${activePrice === price ? 'rotate-12' : 'group-hover:rotate-6'}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className={`${price === 'All' ? 'text-xl md:text-2xl pt-2' : 'text-2xl md:text-3xl'} font-mosseta tracking-[0.2em] transition-colors duration-300 ${activePrice === price ? 'text-brand-accent' : 'text-zinc-600'}`}>
                    {price === 'All' ? 'ALL' : price}
                  </h2>
                </div>
              </div>
              {/* Active Indicator */}
              {activePrice === price && (
                <motion.div 
                  layoutId="priceActive"
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-brand-accent rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Filters (Desktop/iPad Only) */}
        <div className="hidden md:flex justify-center mb-16">
          <div className="inline-flex flex-wrap justify-center gap-4 bg-white/50 backdrop-blur-sm border border-brand-gold/20 p-2 rounded-full shadow-[0_4px_20px_rgba(202,168,129,0.05)]">
            {(['All', 'Gold', 'Silver', 'Mehandi'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="relative px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] overflow-hidden group transition-all duration-300"
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-brand-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${activeFilter === filter ? 'text-white' : 'text-brand-gold group-hover:text-brand-gold'}`}>
                  {filter} Jewellery
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Overlay - Sophisticated Bottom Sheet */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md z-[150]"
              />
              {/* Content Overlay */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                style={{ touchAction: 'none' }}
                className="fixed bottom-0 left-0 right-0 bg-[#2d1413] rounded-t-[3rem] z-[160] px-8 pt-12 pb-16 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col gap-12 max-w-lg mx-auto">
                  {/* Handle */}
                  <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto" onClick={() => setIsFilterOpen(false)} />
                  
                  {/* Categories */}
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-6 block text-center">
                      Jewellery Category
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      {(['All', 'Gold', 'Silver', 'Mehandi'] as FilterType[]).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 ${
                            activeFilter === filter 
                              ? 'bg-brand-accent text-white border-brand-accent shadow-xl' 
                              : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Points */}
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-6 block text-center">
                      Investment Range
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      {(['All', 699, 999, 1299] as const).map((price) => (
                        <button
                          key={price.toString()}
                          onClick={() => setActivePrice(price)}
                          className={`py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 ${
                            activePrice === price 
                              ? 'bg-brand-accent text-white border-brand-accent shadow-xl' 
                              : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {price === 'All' ? 'Any Price' : `₹ ${price}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="mt-4 w-full py-5 bg-brand-gold text-white rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold shadow-lg active:scale-[0.98] transition-transform"
                  >
                    View Crafted Results
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredBangles.map((bangle) => (
              <motion.div
                layout
                key={bangle.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => router.push(`/bangle/${bangle.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900/5 mb-4 rounded-sm border border-zinc-200 group-hover:border-zinc-400 transition-all duration-500 shine-effect">
                  <Image
                    src={bangle.image}
                    alt={bangle.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay - Transparent/Shine focus */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 z-10">
                    <span className="inline-block px-4 py-2 bg-brand-accent/80 backdrop-blur-sm border border-gray-300 text-white text-[10px] uppercase tracking-widest font-bold shadow-lg">
                      View Masterpiece
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-serif mb-1 text-zinc-900 group-hover:text-brand-gold transition-colors line-clamp-1">
                    {bangle.name}
                  </h3>
                  <p className="text-brand-gold text-[10px] uppercase tracking-widest mb-1">
                    {getBangleCategory(bangle)} Jewellery
                  </p>
                  <p className="text-zinc-600 font-serif text-base tracking-wider group-hover:text-brand-gold transition-colors">
                    ₹ {bangle.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBangles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-400"
          >
            <p className="font-serif text-xl italic">No master pieces found in this category.</p>
          </motion.div>
        )}

      </main>
      <Footer />
    </div>
  );
}
