'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Mail, MapPin, Phone, X, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/Loader';
import { BANGLES } from '@/lib/bangles-data';

const BangleCanvas = dynamic(() => import('@/components/BangleCanvas'), { 
  ssr: false,
  loading: () => <Loader />
});

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
    ['#0B0B0B', '#1A1A1A', '#2D2417', '#0B0B0B']
  );

  return (
    <motion.div 
      style={{ backgroundColor: bgColor }}
      className="relative min-h-screen text-white selection:bg-[#E6C78B] selection:text-black overflow-x-hidden transition-colors duration-1000 ease-in-out"
    >
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-[#E6C78B]">
            THE BLING BANGLES
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="/collection" className="hover:text-[#E6C78B] transition-colors">All Bangles</a>
            <a href="/contact" className="hover:text-[#E6C78B] transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 h-full w-full pointer-events-none">
          <BangleCanvas scrollProgress={scrollYProgress} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0B0B0B] opacity-60" />
        </div>
        
        <div className="relative z-20 text-center px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* <span className="text-[#E6C78B] uppercase tracking-[0.6em] text-[10px] md:text-xs mb-8 block font-bold opacity-80">
              Est. 1984 • Master Artisans
            </span> */}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[12rem] font-serif mb-8 tracking-tighter leading-[0.85] text-white text-glow-gold"
          >
            THE BLING <br /> <span className="text-[#E6C78B] italic">BANGLES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-[#D4A373] italic text-xl md:text-4xl font-serif tracking-wide opacity-90"
          >
            "Where Every Wrist Deserves to Shine"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 pointer-events-auto"
          >
            <button className="btn-gold-glow group relative px-12 py-5 overflow-hidden border border-[#E6C78B]/30 text-[#E6C78B] font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all hover:bg-[#E6C78B] hover:text-black shine-effect">
              <span className="relative z-10">Discover Heritage</span>
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#E6C78B]/0 via-[#E6C78B]/50 to-[#E6C78B]/0" />
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
            <h2 className="text-4xl md:text-6xl font-serif mb-6">The Signature Series</h2>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">Each piece is handcrafted with precision, blending traditional artistry with contemporary design.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => router.push('/collection')}
            className="text-[#E6C78B] flex items-center gap-3 cursor-pointer group text-sm uppercase tracking-[0.2em] font-bold"
          >
            View All <div className="w-10 h-[1px] bg-[#E6C78B] group-hover:w-16 transition-all duration-300" />
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
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900/50 border border-white/5 transition-all duration-500 group-hover:border-[#E6C78B]/50 group-hover:shadow-[0_0_40px_rgba(230,199,139,0.15)] shine-effect">
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
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                  <span className="text-[10px] uppercase tracking-[0.4em] border border-[#E6C78B]/40 px-8 py-4 backdrop-blur-md text-[#E6C78B] bg-black/20">
                    View Masterpiece
                  </span>
                </div>
              </div>

              <div className="mt-8 text-center overflow-hidden">
                <motion.h3 
                  className="text-2xl md:text-3xl font-serif tracking-tight group-hover:text-[#E6C78B] transition-colors duration-500"
                >
                  {bangle.name}
                </motion.h3>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="h-[1px] w-4 bg-[#D4A373]/30" />
                  <p className="text-[#D4A373]/60 text-[10px] uppercase tracking-[0.3em] font-medium">Signature Series</p>
                  <div className="h-[1px] w-4 bg-[#D4A373]/30" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold tracking-tighter text-[#E6C78B] mb-6">
                THE BLING BANGLES
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Redefining luxury through the art of bangle making. Our pieces are more than jewelry; they are a legacy of elegance passed through generations.
              </p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                {/* <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#E6C78B]" /> <span>123 Luxury Lane, Mumbai</span></li> */}
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#E6C78B]" /> <span>+91 828284636</span></li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#E6C78B]" /> <span>theblingbangles12@gmail.com</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/blingbanglesofficial?igsh=MXRvbmhhanA1bTNuYQ==" target="_blank" className="p-2 bg-white/5 hover:bg-[#E6C78B] hover:text-black transition-all rounded-full">
                  <Instagram className="w-5 h-5" />
                </a>
               
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
            <p>© 2025 The Bling Bangles. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
