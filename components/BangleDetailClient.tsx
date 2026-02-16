'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ProductZoom from '../components/ProductZoom';
import Footer from '../components/Footer';
import { BANGLES } from '../lib/bangles-data';

interface BangleDetailClientProps {
  bangle: any;
  id: number;
}

export default function BangleDetailClient({ bangle, id }: BangleDetailClientProps) {
  const router = useRouter();
  const [suggestedBangles, setSuggestedBangles] = useState<typeof BANGLES>([]);

  useEffect(() => {
    const filtered = BANGLES.filter(b => b.id !== id);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 4);
    setSuggestedBangles(shuffled);
  }, [id]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-brand-bg text-zinc-900 selection:bg-brand-gold/30 selection:text-brand-accent"
    >
      <nav className="fixed top-0 w-full z-50 px-6 h-20 flex items-center justify-between bg-brand-bg/80 backdrop-blur-xl border-b border-brand-accent/5">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-brand-gold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Collection</span>
        </button>
        <div className="text-xl font-bold tracking-tighter text-brand-gold">
          THE BLING BANGLES
        </div>
        <div className="w-24" />
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            {bangle.type || bangle.category} Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-mosseta mb-6 text-zinc-900"
          >
            {bangle.name}
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[1px] w-40 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="relative h-[500px] lg:h-[600px]">
            <ProductZoom images={bangle.images} alt={bangle.name} />
          </div>

            <div className="space-y-8">
              <div className="border-b border-zinc-200 pb-8">
                <p className="text-4xl font-serif text-zinc-900 mb-2">₹ {bangle.price}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Inclusive of all taxes</p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-[0.3em] text-brand-gold font-bold mb-6">Masterpiece Details</h2>
              <p className="text-zinc-600 text-lg leading-relaxed font-light">
                {bangle.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-10 gap-x-6">
              {[
                { label: 'Collection Type', value: bangle.type || bangle.category },
                { label: 'Available Sizes', value: '2.4, 2.6, 2.8, 2.10' },
                { label: 'Material', value: bangle.material || '24 Carat Gold (Artificial)' },
                { label: 'Finish', value: bangle.finish || 'Antique Gold' },
                { label: 'Net Quantity', value: '2 Pcs / 4 Pcs' },
                { label: 'Warranty', value: '2 Years Polish Warranty' },
                { label: 'Ideal Occasion', value: bangle.occasion || 'All Occasions' },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="border-l border-brand-gold/20 pl-6"
                >
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-2">{item.label}</h4>
                  <p className="text-xl font-serif text-zinc-900">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-10 border-t border-gray-100">
              <button className="btn-gold-glow w-full py-6 bg-gradient-to-r from-[#b8860b] via-gray-100 to-[#b8860b] bg-[length:200%_100%] animate-shine text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition-all">
                Inquire for Bespoke Fitting
              </button>
              <p className="text-center text-zinc-500 text-[10px] uppercase tracking-widest mt-4">
                Handcrafted to order • Worldwide shipping available
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-brand-gold/10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-sm uppercase tracking-[0.4em] text-brand-gold mb-4">Curated for You</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-zinc-900">You May Also Love</h3>
          </div>
          <button 
            onClick={() => router.push('/collection')}
            className="hidden md:flex items-center gap-2 text-brand-gold hover:text-brand-gold transition-colors group text-xs uppercase tracking-widest font-bold"
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
              whileHover={{ y: -5 }}
              onClick={() => {
                router.push(`/bangle/${item.id}`);
                window.scrollTo(0, 0);
              }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900/5 mb-6 border border-brand-gold/10 group-hover:border-brand-gold/40 transition-all rounded-sm">
                <Image 
                  src={(item as any).images?.[0] || item.image} 
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-xl font-serif mb-2 text-zinc-900 group-hover:text-brand-gold transition-colors">{item.name}</h4>
              <p className="text-brand-gold text-[10px] uppercase tracking-[0.2em]">{(item as any).type || item.category} • {(item as any).material || 'Premium'}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
