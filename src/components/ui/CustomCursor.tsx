"use client";

import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother performance if possible, 
      // but direct state update is fine for simple cursors.
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          body { cursor: none; }
          a, button { cursor: none; }
        }
      `}</style>
      <div 
        // CHANGED: z-[100] -> z-[9999] to ensure it sits above sticky headers and content layers
        className={`hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out items-center justify-center ${isPointer ? 'scale-150' : 'scale-100'}`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          // Ensure hardware acceleration to prevent flickering on scroll
          willChange: 'transform' 
        }}
      >
        <div className={`w-3 h-3 bg-[#ff00ff] ${isPointer ? 'opacity-100' : 'opacity-70'}`} />
        <div className="absolute w-8 h-[1px] bg-[#ff00ff]" />
        <div className="absolute h-8 w-[1px] bg-[#ff00ff]" />
      </div>
    </>
  );
}