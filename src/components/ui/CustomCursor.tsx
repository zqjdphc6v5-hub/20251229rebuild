"use client";

import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct viewport coordinates to prevent drift from transformed parents
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if the current element should trigger the pointer state
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };
    
    // Add listener to window to ensure tracking even when mouse is over animated divs
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          body, a, button, * { 
            cursor: none !important; 
          }
        }
      `}</style>
      
      <div 
        className={`hidden md:flex fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference transition-transform duration-200 ease-out items-center justify-center`}
        style={{ 
          // translate3d forces GPU acceleration and fixes the "sliding" bug on animated buttons
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) ${isPointer ? 'scale(1.5)' : 'scale(1)'}`,
          willChange: 'transform' 
        }}
      >
        {/* Central Dot */}
        <div className={`w-3 h-3 bg-[#ff00ff] transition-opacity duration-300 ${isPointer ? 'opacity-100' : 'opacity-70'}`} />
        
        {/* Crosshair - Horizontal */}
        <div className="absolute w-8 h-[1px] bg-[#ff00ff]" />
        
        {/* Crosshair - Vertical */}
        <div className="absolute h-8 w-[1px] bg-[#ff00ff]" />
        
        {/* Subtle Glitch Ring - Only shows on pointer */}
        {isPointer && (
          <div className="absolute w-10 h-10 border border-[#ff00ff] opacity-30 animate-ping" />
        )}
      </div>
    </>
  );
}