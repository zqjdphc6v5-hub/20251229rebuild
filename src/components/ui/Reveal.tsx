"use client";

import React, { useState, useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      // Added h-full to outer container
      className={`h-full transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className} pointer-events-none`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* CRITICAL FIX: Added h-full and w-full to this inner div */}
      <div className="pointer-events-auto h-full w-full">
        {children}
      </div>
    </div>
  );
}