import React from 'react';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import DropSection from '@/components/DropSection';
import OriginStory from '@/components/OriginStory';
import ShopGrid from '@/components/ShopGrid';

export default function Home() {
  return (
    <>
      <div className="bg-red-500 text-black text-4xl p-10 font-bold z-[99999] relative text-center">
        IF YOU CAN SEE THIS, THE DEPLOY WORKED
      </div>
      
      <Hero /> 
      <Marquee />
      <DropSection />
      <OriginStory />
      <ShopGrid />
    </>
  );
}