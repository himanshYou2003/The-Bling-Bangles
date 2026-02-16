'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'All Bangles', href: '/collection' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-xl border-b border-brand-accent/5">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-brand-gold z-50 relative font-mosseta">
          THE BLING BANGLES
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          {menuItems.slice(1).map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`hover:text-brand-gold transition-colors ${pathname === item.href ? 'text-brand-accent italic' : 'text-zinc-800'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 relative p-2 text-zinc-900 hover:text-brand-gold transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-brand-bg z-40 flex flex-col items-center justify-center md:hidden"
            >
              <div className="flex flex-col gap-8 text-center">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl font-serif tracking-tight hover:text-brand-gold transition-colors ${pathname === item.href ? 'text-brand-accent' : 'text-zinc-900'}`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-30">
                <div className="h-[1px] w-24 bg-brand-gold" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
