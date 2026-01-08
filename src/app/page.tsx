"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee'; 
import TheDrop from '@/components/DropSection'; 
import ShopGrid from '@/components/ShopGrid';
import OriginStory from '@/components/OriginStory'; 
import CustomCursor from '@/components/ui/CustomCursor';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <CartProvider>
      <main className="bg-black min-h-screen text-white selection:bg-[#ff00ff] selection:text-white cursor-none">
        {isClient && <CustomCursor />}
        
        <Navbar />
        <CartDrawer />
        
        <Hero />
        
        <div className="relative z-10 bg-black">
          <Marquee /> 
          
          <TheDrop />
          
          <ShopGrid />
          
          {/* This is now the ONLY section at the bottom */}
          <OriginStory />
          
        </div>
      </main>
    </CartProvider>
  );
}