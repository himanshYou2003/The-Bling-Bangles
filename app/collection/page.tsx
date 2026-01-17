'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BANGLES } from '@/lib/bangles-data';

export default function CollectionPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allBangles, setAllBangles] = useState(BANGLES);

  useEffect(() => {
    // Fetch updated data for all bangles
    const fetchBanglesData = async () => {
      try {
        const updatedBangles = await Promise.all(
          BANGLES.map(async (bangle) => {
            try {
              const res = await fetch(`/description/${bangle.id}/data.json`);
              if (res.ok) {
                const data = await res.json();
                return { ...bangle, ...data };
              }
            } catch (e) {
              console.error(`Failed to fetch data for bangle ${bangle.id}`, e);
            }
            return bangle;
          })
        );
        setAllBangles(updatedBangles);
      } catch (error) {
        console.error("Error fetching bangles data:", error);
      }
    };

    fetchBanglesData();
  }, []);

  const categories = ['All', ...new Set(allBangles.map(b => b.category))];
  
  const filteredBangles = selectedCategory === 'All' 
    ? allBangles 
    : allBangles.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#E6C78B] hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest font-bold">Back to Home</span>
          </button>
          <div className="text-xl font-bold tracking-tighter text-[#E6C78B]">
            THE BLING BANGLES
          </div>
          <div className="w-24" />
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4A373] uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Complete Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            All Bangles
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[1px] w-40 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto mb-8"
          />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our entire collection of {allBangles.length} handcrafted bangles, each piece a testament to luxury and artistry.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-xs uppercase tracking-widest font-medium rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-[#E6C78B] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bangles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBangles.map((bangle, index) => (
            <motion.div 
              key={bangle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
              onClick={() => router.push(`/bangle/${bangle.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900/50 border border-white/5 transition-all duration-500 group-hover:border-[#E6C78B]/50 group-hover:shadow-[0_0_40px_rgba(230,199,139,0.15)]">
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
                </div>

                <Image 
                  src={bangle.image} 
                  alt={bangle.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                  <span className="text-[10px] uppercase tracking-[0.4em] border border-[#E6C78B]/40 px-8 py-4 backdrop-blur-md text-[#E6C78B] bg-black/20">
                    View Details
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-lg md:text-xl font-serif tracking-tight group-hover:text-[#E6C78B] transition-colors duration-500">
                  {bangle.name}
                </h3>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <div className="h-[1px] w-4 bg-[#D4A373]/30" />
                  <p className="text-[#D4A373]/60 text-[9px] uppercase tracking-[0.3em] font-medium">
                    {bangle.category}
                  </p>
                  <div className="h-[1px] w-4 bg-[#D4A373]/30" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result Count */}
        <div className="text-center mt-16 text-gray-500 text-sm uppercase tracking-widest">
          Showing {filteredBangles.length} of {allBangles.length} Bangles
        </div>
      </main>
    </div>
  );
}
