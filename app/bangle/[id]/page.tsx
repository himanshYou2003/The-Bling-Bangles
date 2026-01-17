'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import { BANGLES } from '@/lib/bangles-data';
import ProductZoom from '@/components/ProductZoom';

export default function BangleDetail() {
  const params = useParams();
  const router = useRouter();
  const [suggestedBangles, setSuggestedBangles] = useState<typeof BANGLES>([]);
  
  const [bangleDetails, setBangleDetails] = useState<any>(null);
  
  // Initial data from static file (for immediate render)
  const staticBangleData = BANGLES.find(b => b.id === Number(params.id));
  
  // Fetch detailed data from JSON file
  useEffect(() => {
    if (params.id) {
      fetch(`/description/${params.id}/data.json`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load data');
          return res.json();
        })
        .then(data => setBangleDetails(data))
        .catch(err => console.error("Error loading description:", err));
    }
  }, [params.id]);

  // Use fetched data if available, otherwise fallback to static data
  const dataToUse = bangleDetails || staticBangleData;

  const bangle = {
    id: dataToUse?.id || 1,
    name: dataToUse?.name || 'Luxury Bangle',
    description: dataToUse?.description || 'A beautiful handcrafted bangle.',
    type: dataToUse?.type || dataToUse?.category || 'Festive',
    style: dataToUse?.style || 'Modern',
    finish: dataToUse?.finish || 'Glossy',
    material: dataToUse?.material || '22K Gold',
    occasion: dataToUse?.occasion || 'All Occasions',
    images: dataToUse?.images || [dataToUse?.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop']
  };

  useEffect(() => {
    const filtered = BANGLES.filter(b => b.id !== bangle.id);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setSuggestedBangles(shuffled); // Show all bangles shuffled
  }, [bangle.id]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#0B0B0B] text-white selection:bg-[#E6C78B] selection:text-black"
    >
      <nav className="fixed top-0 w-full z-50 px-6 h-20 flex items-center justify-between bg-black/20 backdrop-blur-xl border-b border-white/5">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-[#E6C78B] hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Collection</span>
        </button>
        <div className="text-xl font-bold tracking-tighter text-[#E6C78B]">
          THE BLING BANGLES
        </div>
        <div className="w-24" />
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4A373] uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            {bangle.type} Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif mb-6"
          >
            {bangle.name}
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[1px] w-40 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="relative h-[500px] lg:h-[600px]">
            <ProductZoom images={bangle.images} alt={bangle.name} />
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-[#E6C78B] font-bold mb-6">Masterpiece Details</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                {bangle.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-10 gap-x-6">
              {[
                { label: 'Collection Type', value: bangle.type },
                { label: 'Artistic Style', value: bangle.style },
                { label: 'Surface Finish', value: bangle.finish },
                { label: 'Material Composition', value: bangle.material },
                { label: 'Ideal Occasion', value: bangle.occasion },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="border-l border-[#E6C78B]/20 pl-6"
                >
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4A373] mb-2">{item.label}</h4>
                  <p className="text-xl font-serif">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-10 border-t border-white/5">
              <button className="btn-gold-glow w-full py-6 bg-[#E6C78B] text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-white transition-all shine-effect">
                Inquire for Bespoke Fitting
              </button>
              <p className="text-center text-gray-500 text-[10px] uppercase tracking-widest mt-4">
                Handcrafted to order • Worldwide shipping available
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-sm uppercase tracking-[0.4em] text-[#D4A373] mb-4">Curated for You</h2>
            <h3 className="text-4xl md:text-5xl font-serif">You May Also Love</h3>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="hidden md:flex items-center gap-2 text-[#E6C78B] hover:text-white transition-colors group text-xs uppercase tracking-widest font-bold"
          >
            View Full Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {suggestedBangles.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => {
                router.push(`/bangle/${item.id}`);
                window.scrollTo(0, 0);
              }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 mb-6 border border-white/5 group-hover:border-[#E6C78B]/30 transition-colors">
                <Image 
                  src={item.images?.[0] || item.image} 
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-xl font-serif mb-2 group-hover:text-[#E6C78B] transition-colors">{item.name}</h4>
              <p className="text-[#D4A373]/60 text-[10px] uppercase tracking-[0.2em]">{item.type || item.category} • {item.material || 'Premium'}</p>
            </motion.div>
          ))}
        </div>
      </section>

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
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#E6C78B]" /> <span>123 Luxury Lane, Mumbai</span></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#E6C78B]" /> <span>+91 98765 43210</span></li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#E6C78B]" /> <span>hello@blingbangles.com</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/5 hover:bg-[#E6C78B] hover:text-black transition-all rounded-full">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-[#E6C78B] hover:text-black transition-all rounded-full">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
            <p>© 2024 The Bling Bangles. All rights reserved.</p>
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
