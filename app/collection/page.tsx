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
    <div className="min-h-screen bg-brand-bg text-zinc-900 selection:bg-brand-gold/30 selection:text-brand-accent">
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
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

          {/* Decorative BG */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Bangles price Filter - Custom Visuals */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-20 px-4">
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

        {/* Filters */}
        <div className="flex justify-center mb-16">
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
                    <span className="inline-block px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-gray-300 text-white text-[10px] uppercase tracking-widest font-bold shadow-lg">
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
