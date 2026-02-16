'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Robust scroll locking for both standard and smooth scroll environments
    const scrollTags = [document.documentElement, document.body];
    if (isOpen) {
      scrollTags.forEach(tag => tag.classList.add('lock-scroll'));
      (window as any).lenis?.stop();
    } else {
      scrollTags.forEach(tag => tag.classList.remove('lock-scroll'));
      (window as any).lenis?.start();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      scrollTags.forEach(tag => tag.classList.remove('lock-scroll'));
      (window as any).lenis?.start();
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/collection' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="group relative z-[110] flex items-center gap-2"
        >
          <span className={`text-xl md:text-2xl font-mosseta tracking-tighter transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-zinc-900 group-hover:text-brand-gold'
          }`}>
            THE BLING <span className="text-brand-gold italic">BANGLES</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="relative group py-2"
            >
              <span className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-300 ${
                pathname === item.href ? 'text-brand-gold' : 'text-zinc-600 group-hover:text-zinc-900'
              }`}>
                {item.name}
              </span>
              {/* Animated Underline */}
              <span className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-gold transition-all duration-500 ease-[0.16, 1, 0.3, 1] ${
                pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button - Minimalist Hamburger */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-[110] relative flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={`w-6 h-[1.5px] transition-colors duration-500 ${isOpen ? 'bg-white' : 'bg-zinc-900'}`} 
          />
          <motion.span 
            animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className={`w-6 h-[1.5px] transition-colors duration-500 ${isOpen ? 'bg-white' : 'bg-zinc-900'}`} 
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={`w-6 h-[1.5px] transition-colors duration-500 ${isOpen ? 'bg-white' : 'bg-zinc-900'}`} 
          />
        </button>

        {/* Immersive Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ touchAction: 'none' }}
              className="fixed inset-0 bg-[#2d1413] z-[100] md:hidden flex flex-col justify-between"
            >
              {/* Background Decorative Accent */}
              <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none select-none overflow-hidden">
                <span className="text-[100vw] font-mosseta absolute -top-20 -right-20 text-white">B</span>
              </div>

              {/* Menu Content */}
              <div className="flex-1 flex flex-col items-center justify-center pt-20 px-8">
                {/* Brand asset for continuity */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-16 opacity-100"
                >
                  <img src="/assets/namaste.png" alt="Namaste" className="w-24 h-24 object-contain" />
                </motion.div>

                <nav className="flex flex-col items-center gap-10">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group relative block text-center"
                      >
                         <span className={`text-4xl sm:text-5xl font-mosseta transition-all duration-300 ${
                          pathname === item.href ? 'text-brand-gold italic' : 'text-white/90 group-hover:text-brand-gold'
                        }`}>
                          {item.name}
                        </span>
                        <div className={`mt-2 h-[1px] bg-brand-gold transition-all duration-500 mx-auto ${
                          pathname === item.href ? 'w-24' : 'w-0 group-hover:w-20'
                        }`} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Mobile Footer Area */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pb-16 px-8 flex flex-col items-center gap-6"
              >
                <div className="h-[1px] w-12 bg-white/10" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                  ESTD. 2026 — THE BLING BANGLES
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
