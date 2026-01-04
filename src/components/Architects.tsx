"use client";

import React from 'react';
import Reveal from './ui/Reveal';

// Internal Data - You can edit these details later
const TEAM = [
  {
    name: "LUKE MOD",
    role: "FOUNDER / DIRECTORY",
    bio: "Building the future of digital brutalism.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "SYSTEM_DEV",
    role: "LEAD ENGINEER",
    bio: "Optimized for maximum performance.",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Architects() {
  return (
    <section className="py-24 border-t border-neutral-800 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
              The_Architects
            </h2>
            <p className="font-mono text-neutral-500 mt-4 md:mt-0">
              [ TEAM_SIZE: {TEAM.length} ]
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group border border-neutral-800 bg-neutral-900/30 p-6 hover:border-[#ff00ff] transition-all duration-500">
                
                {/* Image Container */}
                <div className="h-[400px] mb-6 overflow-hidden bg-neutral-900 relative">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-black/20 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.3)_2px)] bg-[length:4px_4px] pointer-events-none" />
                </div>
                
                {/* Text Info */}
                <div className="flex justify-between items-end border-b border-neutral-800 pb-4 mb-4 group-hover:border-[#ff00ff] transition-colors">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{member.name}</h3>
                  <span className="font-mono text-xs text-[#ff00ff] tracking-widest bg-[#ff00ff]/10 px-2 py-1 rounded">
                    {member.role}
                  </span>
                </div>
                
                <p className="font-mono text-sm text-neutral-400 max-w-md">
                  // {member.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}