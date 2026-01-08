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

  // Dynamic colors based on scroll state
  const navBg = isScrolled ? 'bg-[#ff00ff] border-black py-4' : 'bg-transparent border-transparent py-6';
  const textColor = isScrolled ? 'text-black' : 'text-white';
  const cartBadge = isScrolled ? 'bg-black text-white' : 'bg-[#ff00ff] text-white';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="z-50" onClick={() => setMobileMenuOpen(false)}>
          <span className={`text-2xl font-black tracking-tighter transition-colors ${textColor} hover:opacity-70`}>
            URBNWAVE
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className={`hidden md:flex items-center gap-8 ${textColor}`}>
          <Link href="/#shop" className="text-sm font-bold tracking-widest hover:opacity-70 transition-opacity uppercase">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-bold tracking-widest hover:opacity-70 transition-opacity uppercase">
            About
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative group flex items-center"
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} className="transition-colors group-hover:opacity-70" />
            {totalItems > 0 && (
              <span className={`absolute -top-2 -right-2 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full transition-colors ${cartBadge}`}>
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className={`flex items-center gap-4 md:hidden ${textColor}`}>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative"
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className={`absolute -top-2 -right-2 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ${cartBadge}`}>
                {totalItems}
              </span>
            )}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="z-50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out ${
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