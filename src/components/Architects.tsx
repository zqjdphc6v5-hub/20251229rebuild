"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './ui/Reveal';

interface ArchitectCardProps {
  name: string;
  role: string;
  bio: string;
  img: string;
  delay?: number;
}

export default function ArchitectCard({ name, role, bio, img, delay = 0 }: ArchitectCardProps) {
  return (
    // Ensure Reveal passes the h-full class through to its container
    <Reveal delay={delay} className="h-full">
      <div className="group relative border-b border-neutral-800 md:border-b-0 md:border-r last:border-r-0 min-h-[700px] flex flex-col h-full bg-neutral-950">
        
        {/* IMAGE SECTION: Using flex-grow (flex-[2]) instead of fixed percentage to handle resize better */}
        <div className="relative w-full h-[400px] md:h-auto md:flex-[2] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
          <img 
            src={img} 
            alt={name} 
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s]" 
          />
          <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* TEXT SECTION: md:flex-[1] ensures text area takes remaining space but allows image to dominate */}
        <div className="p-8 flex flex-col justify-between md:flex-[1] bg-neutral-950">
          <div>
            <h3 className="text-4xl font-black tracking-tight mb-1 text-white">{name}</h3>
            <p className="text-neutral-500 font-mono text-xs tracking-widest mb-6 border-l-2 border-neutral-700 pl-3 uppercase">
              {role}
            </p>
            <p className="text-neutral-300 font-medium leading-relaxed max-w-md text-sm md:text-base">
              {bio}
            </p>
          </div>
          <div className="mt-8">
            <ArrowRight className="text-neutral-600 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}