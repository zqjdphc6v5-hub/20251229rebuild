"use client";

import React from 'react';
import Reveal from './ui/Reveal';

// 1. Define the Assets locally to avoid "ASSETS not found" errors
const ASSETS = {
  kai: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=1000&auto=format&fit=crop",
  ryder: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop"
};

// 2. Define the Interface (This fixes the "IntrinsicAttributes" error)
interface ArchitectCardProps {
  name: string;
  role: string;
  bio: string;
  img: string;
  delay?: number;
}

// 3. Define the Card Component with the correct Props
const ArchitectCard = ({ name, role, bio, img, delay = 0 }: ArchitectCardProps) => (
  <Reveal delay={delay}>
    <div className="group border border-neutral-800 bg-neutral-900/30 p-6 hover:border-[#ff00ff] transition-all duration-500 h-full">
      <div className="h-[400px] mb-6 overflow-hidden bg-neutral-900 relative">
        <img 
          src={img} 
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.3)_2px)] bg-[length:4px_4px] pointer-events-none" />
      </div>
      
      <div className="flex justify-between items-end border-b border-neutral-800 pb-4 mb-4 group-hover:border-[#ff00ff] transition-colors">
        <h3 className="text-2xl font-black uppercase tracking-tighter">{name}</h3>
        <span className="font-mono text-xs text-[#ff00ff] tracking-widest bg-[#ff00ff]/10 px-2 py-1 rounded">
          {role}
        </span>
      </div>
      
      <p className="font-mono text-sm text-neutral-400 leading-relaxed">
        // {bio}
      </p>
    </div>
  </Reveal>
);

export default function OriginStory() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <ArchitectCard 
          name="KAI" 
          role="The Observer // Structure / Photo" 
          bio="Kai doesn’t just watch the city; he documents its bones. A Japanese teen transplanted to the Australian suburbs, he found comfort in the concrete. While others sleep, Kai stalks the empty car parks and neon-soaked alleyways of Melbourne, armed with a beat-up 35mm camera. He is obsessed with the permanent things: the brutalist architecture, the wet asphalt, the way yellow sodium light hits a steel beam. He captures the grid. He provides the order."
          img={ASSETS.kai}
          delay={0}
        />
        
        <ArchitectCard 
          name="RYDER" 
          role="The Ghost // Code / Logic" 
          bio="Ryder exists in the wires. While Kai documents the physical world, Ryder dismantles the digital one. He sees the matrix behind the storefronts—the flow of data, the commerce, the hidden systems. He builds the framework that holds UrbnWave together. He speaks in React and Python, preferring the clean logic of code to the messiness of conversation. He ensures the signal never drops."
          img={ASSETS.ryder}
          delay={200}
        />
        
      </div>
    </section>
  );
}