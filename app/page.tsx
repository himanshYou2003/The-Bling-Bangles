'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Mail, MapPin, Phone, X, ArrowRight } from 'lucide-react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BANGLES } from '@/lib/bangles-data';



export default function Home() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [displayBangles, setDisplayBangles] = useState(BANGLES.slice(0, 6));

  useEffect(() => {
    // Fetch updated data for the displayed bangles
    const fetchBanglesData = async () => {
      try {
        const updatedBangles = await Promise.all(
          BANGLES.slice(0, 6).map(async (bangle) => {
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
        setDisplayBangles(updatedBangles);
      } catch (error) {
        console.error("Error fetching bangles data:", error);
      }
    };

    fetchBanglesData();
  }, []);
  
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#ffffff', '#f5f5f5', '#eaeaea', '#ffffff']
  );

  return (
    <motion.div 
      className="relative min-h-screen bg-brand-bg text-zinc-900 selection:bg-brand-gold/30 selection:text-brand-accent overflow-x-hidden"
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 h-full w-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/60 via-transparent to-brand-bg opacity-80" />
        </div>
        
        <div className="relative z-20 text-center px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* <span className="text-[#b8860b] uppercase tracking-[0.6em] text-[10px] md:text-xs mb-8 block font-bold opacity-80">
              Est. 1984 • Master Artisans
            </span> */}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[12rem] font-mosseta mb-8 tracking-tighter leading-[0.85] text-zinc-900"
          >
            THE BLING <br /> <span className="text-brand-gold italic">BANGLES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-zinc-500 italic text-xl md:text-4xl font-serif tracking-wide opacity-90"
          >
            "Where Every Wrist Deserves to Shine"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 pointer-events-auto"
          >
            <button className="group relative px-12 py-5 overflow-hidden bg-brand-accent text-white font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all hover:bg-brand-gold shadow-xl shadow-brand-accent/10">
              <span className="relative z-10 flex items-center gap-3">
                Discover Heritage <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold/0 via-brand-gold/50 to-brand-gold/0" />
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-mosseta mb-6 text-zinc-900">The Signature Series</h2>
            <p className="text-zinc-500 max-w-md text-lg leading-relaxed font-light">Each piece is handcrafted with precision, blending traditional artistry with contemporary design.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => router.push('/collection')}
            className="text-brand-gold flex items-center gap-3 cursor-pointer group text-sm uppercase tracking-[0.2em] font-bold"
          >
            View All <div className="w-10 h-[1px] bg-brand-gold group-hover:w-16 transition-all duration-300" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {displayBangles.map((bangle, index) => (
            <motion.div 
              key={bangle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => router.push(`/bangle/${bangle.id}`)}
              className="group cursor-pointer relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900/5 transition-all duration-500 border border-zinc-200 group-hover:border-zinc-400 rounded-sm shine-effect">
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
                </div>

                <Image 
                  src={bangle.image} 
                  alt={bangle.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                  <span className="text-[10px] uppercase tracking-[0.4em] border border-gray-300 px-8 py-4 backdrop-blur-md text-white bg-brand-accent/40">
                    View Masterpiece
                  </span>
                </div>
              </div>

              <div className="mt-8 text-center overflow-hidden">
                <motion.h3 
                  className="text-2xl md:text-3xl font-serif tracking-tight text-zinc-900 group-hover:text-brand-gold transition-colors duration-500"
                >
                  {bangle.name}
                </motion.h3>
                <div className="flex flex-col items-center justify-center gap-2 mt-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-4 bg-brand-gold/30" />
                    <p className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-medium">Signature Series</p>
                    <div className="h-[1px] w-4 bg-brand-gold/30" />
                  </div>
                  <p className="text-zinc-600 font-serif text-xl tracking-wider group-hover:text-brand-gold transition-colors">₹ {bangle.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
