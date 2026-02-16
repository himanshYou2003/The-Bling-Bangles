'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <div className="bg-brand-accent h-72 md:h-96 border-b border-white/10 relative overflow-hidden group flex items-center justify-center text-center px-4">
        {/* Background Decorative Text - Subtle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] md:opacity-[0.03] select-none pointer-events-none">
          <span className="text-[30vw] md:text-[20vw] font-joyfish whitespace-nowrap">LUXURY</span>
        </div>

        {/* Main text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-joyfish text-white leading-tight md:leading-[1.1] tracking-tight drop-shadow-2xl">
            Where Every Wrist <br className="hidden sm:block" /> 
            <span className="text-brand-gold italic">Deserves to Shine</span>
          </h2>
          <div className="mt-6 md:mt-8 h-[1px] w-24 md:w-40 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent mx-auto" />
        </motion.div>

        {/* Right Side Static Image - Absolute Positioned */}
        <div className="absolute right-[-80px] sm:right-[-40px] md:right-0 top-1/2 -translate-y-1/2 h-full w-[250px] sm:w-[350px] md:w-[500px] z-20 pointer-events-none opacity-25 sm:opacity-40 md:opacity-100">
          <Image 
            src="/assets/banglesFooter.png" 
            alt="Bangles Decoration" 
            fill 
            className="object-contain object-right scale-110 md:scale-125"
          />
        </div>
      </div>
      <footer className="relative z-10 bg-brand-footer pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-brand-gold mb-6 block font-mosseta">
              THE BLING BANGLES
            </Link>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Redefining luxury through the art of bangle making. Our pieces are more than jewelry; they are a legacy of elegance passed through generations.
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold" /> 
                <span>+91 828284636</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold" /> 
                <span>theblingbangles12@gmail.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/blingbanglesofficial?igsh=MXRvbmhhanA1bTNuYQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-zinc-800 hover:bg-brand-gold hover:text-white transition-all rounded-full text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 uppercase tracking-widest">
          <p>© 2025 The Bling Bangles. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
