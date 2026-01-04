"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import OriginStory from '@/components/OriginStory';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import Reveal from '@/components/ui/Reveal';

export default function AboutPage() {
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
        
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 text-[#ff00ff]">
              MANIFESTO_
            </h1>
          </Reveal>
          
          {/* The Component from your file list */}
          <OriginStory />
          
        </div>

        <Footer />
      </main>
    </CartProvider>
  );
}