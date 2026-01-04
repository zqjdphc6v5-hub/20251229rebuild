"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-neutral-800 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="z-50">
          <span className="text-2xl font-black tracking-tighter text-white hover:text-[#ff00ff] transition-colors">
            URBNWAVE
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#shop" className="text-sm font-bold tracking-widest hover:text-[#ff00ff] transition-colors uppercase">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-bold tracking-widest hover:text-[#ff00ff] transition-colors uppercase">
            About
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative group"
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} className="text-white group-hover:text-[#ff00ff] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff00ff] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative"
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff00ff] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="z-50 text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Link 
          href="/#shop" 
          onClick={() => setMobileMenuOpen(false)}
          className="text-4xl font-black tracking-tighter text-white hover:text-[#ff00ff] uppercase"
        >
          Catalogue
        </Link>
        
        <Link 
          href="/about" 
          onClick={() => setMobileMenuOpen(false)}
          className="text-4xl font-black tracking-tighter text-white hover:text-[#ff00ff] uppercase"
        >
          Manifesto
        </Link>
        
        <div className="mt-12 p-4 border border-neutral-800">
           <p className="font-mono text-xs text-neutral-500 uppercase">
             // EST. Australia 2026
           </p>
        </div>
      </div>
    </nav>
  );
}