import React from 'react';

const MANIFESTO_TEXT = "OVERSIZED FIRST /// BUILT TO BLEED /// CITY AS CANVAS /// SOUNDTRACK ENERGY /// SECRET DETAILS /// ";

export default function Marquee() {
  return (
    <div className="bg-neutral-100 text-black py-3 overflow-hidden border-y-4 border-black">
      <div className="whitespace-nowrap flex animate-marquee">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-lg md:text-xl font-black tracking-widest mx-4 uppercase italic">
            {MANIFESTO_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}