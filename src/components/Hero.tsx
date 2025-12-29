"use client";

import React, { useState, useEffect, useRef } from 'react';
import Reveal from './ui/Reveal';

const ASSETS = {
  heroVideos: [
    "https://modulate.com.au/URBNimages/envato_video_gen_Nov_20_2025_5_51_13%20(1).mp4",
    "https://modulate.com.au/URBNimages/envato_video_gen_Dec_19_2025_12_47_58.mp4"
  ]
};

const HeroVideoItem = ({ src, isActive, scrollY }: { src: string, isActive: boolean, scrollY: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setAttribute('playsinline', '');
      videoRef.current.setAttribute('webkit-playsinline', '');
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      
      const attemptPlay = async () => {
        try {
          if (isActive) {
            await videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      };
      attemptPlay();
    }
  }, [isActive]);

  return (
    <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
      <video 
        ref={videoRef}
        autoPlay loop muted playsInline preload="auto"
        className="w-full h-full object-cover contrast-125"
        style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videos = ASSETS.heroVideos;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [videos.length]);

  return (
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {videos.map((videoSrc, index) => (
        <HeroVideoItem key={index} src={videoSrc} isActive={index === currentSlide} scrollY={scrollY} />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 opacity-90 z-20 pointer-events-none" />
      
      <div className="relative z-30 flex flex-col items-center text-center px-4 w-full">
        <Reveal>
          <div className="w-full max-w-6xl mx-auto mb-6 px-4">
             <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 722.12 413.51" className="w-full h-auto fill-white">
              <defs><style>{`.cls-1 { fill: #fff; }`}</style></defs>
              <g id="Layer_2-2" data-name="Layer 2">
                <g><g>
                    <path className="cls-1" d="M120.53,123.81c0,6.28-1.39,11.82-4.17,16.62-2.78,4.8-6.59,8.57-11.44,11.3-4.85,2.74-10.41,4.1-16.69,4.1s-11.69-1.37-16.49-4.1c-4.8-2.74-8.59-6.5-11.37-11.3-2.78-4.8-4.17-10.34-4.17-16.62V0H1.84v128.38c0,15.25,3.61,28.46,10.83,39.63,7.22,11.17,17.31,19.78,30.28,25.84,12.96,6.06,28.06,9.08,45.28,9.08s32.34-3.03,45.35-9.08c13.01-6.06,23.15-14.67,30.41-25.84,7.27-11.17,10.9-24.38,10.9-39.63V0h-54.37v123.81Z"/>
                    <path className="cls-1" d="M341.11,104.43c6.37-9.87,9.55-21.98,9.55-36.34s-3.12-26.35-9.35-36.54c-6.24-10.18-14.94-17.99-26.11-23.42-11.17-5.43-24.2-8.14-39.09-8.14h-86.4v200.52h54.37v-66.21h18.86l35.23,66.21h59.21l-40.87-74.75c10.43-4.99,18.63-12.1,24.59-21.34ZM244.09,43.6h19.11c6.46,0,11.98.85,16.55,2.56,4.58,1.71,8.07,4.35,10.5,7.94,2.42,3.59,3.63,8.26,3.63,14s-1.21,10.36-3.63,13.86c-2.42,3.5-5.92,6.06-10.5,7.67-4.58,1.61-10.09,2.42-16.55,2.42h-19.11v-48.45Z"/>
                    <path className="cls-1" d="M504.43,102.48c-7.04-3.99-14.87-6.12-23.48-6.39v-2.15c7.81-1.52,14.6-4.33,20.39-8.41,5.79-4.08,10.3-9.17,13.52-15.27,3.23-6.1,4.85-12.83,4.85-20.19,0-10.14-2.65-18.95-7.94-26.44-5.29-7.49-13.14-13.3-23.55-17.43-10.41-4.13-23.24-6.19-38.49-6.19h-86.94v200.52h94.47c14.53,0,27.05-2.44,37.55-7.33,10.5-4.89,18.57-11.62,24.22-20.19,5.65-8.57,8.48-18.32,8.48-29.27,0-9.42-2.09-17.65-6.26-24.69-4.17-7.04-9.78-12.56-16.82-16.55ZM417.16,42.79h23.15c6.73,0,12.31,1.66,16.76,4.98,4.44,3.32,6.66,8.03,6.66,14.13,0,4.13-1.03,7.6-3.09,10.43-2.07,2.83-4.91,4.98-8.55,6.46-3.63,1.48-7.83,2.22-12.58,2.22h-22.34v-38.22ZM463.25,151.94c-4.62,3.5-11.46,5.25-20.52,5.25h-25.57v-42.53h26.38c5.47,0,10.2.85,14.2,2.56,3.99,1.7,7.06,4.19,9.22,7.47,2.15,3.28,3.23,7.29,3.23,12.04,0,6.64-2.31,11.71-6.93,15.21Z"/>
                    <path className="cls-1" d="M666.14,0v73.48c0,6.37.27,14.2.81,23.48.54,9.29,1.14,18.71,1.82,28.26.2,2.8.38,5.5.56,8.1-1.5-4.13-2.99-8-4.46-11.6-3.36-8.21-6.84-15.72-10.43-22.54-3.59-6.82-7.45-13.64-11.57-20.46L595.08,0h-59.21v200.52h55.98v-73.21c0-5.47-.2-12.2-.61-20.19-.4-7.98-.94-16.64-1.61-25.97-.3-4.11-.6-8.24-.91-12.37,1.89,4.35,3.68,8.44,5.35,12.23,3.54,8.07,7.22,15.72,11.04,22.95,3.81,7.22,8.23,15,13.26,23.35l44.54,73.21h59.21V0h-55.98Z"/>
                  </g><g>
                    <path className="cls-1" d="M294.68,224.08l-61.4,189.42h57.46l10.38-36.36h58.32l10.88,36.36h58.23l-63.69-189.42h-70.18ZM347.95,338.76h-35.88c4.43-15.54,8.42-31.66,11.97-48.37,1.73-8.15,3.45-16.28,5.16-24.38,1.88,8.1,3.8,16.23,5.77,24.38,4.04,16.71,8.37,32.83,12.97,48.37Z"/>
                    <path className="cls-1" d="M498.68,297.56c-4.58,15.94-8.73,32.14-12.46,48.63-1.81,7.99-3.59,16.03-5.36,24.13-1.87-8.1-3.77-16.14-5.7-24.13-3.98-16.48-8.35-32.69-13.09-48.63l-21.99-73.48h-58.23l63.57,189.42h70.18l61.53-189.42h-57.46l-20.98,73.48Z"/>
                    <polygon className="cls-1" points="721.3 265.53 721.3 224.08 584.76 224.08 584.76 413.51 720.79 413.51 720.79 372.06 636.12 372.06 636.12 337.99 714.18 337.99 714.18 297.56 636.12 297.56 636.12 265.53 721.3 265.53"/>
                    <path className="cls-1" d="M219.63,222.82s-28.04,115.43-31.65,134.7c-3.02-19.27-22.2-134.7-22.2-134.7h-51.36s-28.76,116.4-32.36,134.93c-2.96-18.53-24.59-134.93-24.59-134.93H0l50.22,189.42h58.1s29.77-105.05,31.34-120.39c.09-.86.19-1.71.28-2.57.12.9.24,1.79.35,2.7,1.91,15.43,21.42,120.27,21.42,120.27h55.27l60.11-189.42h-57.46Z"/>
                  </g></g></g></svg>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="text-xs md:text-sm font-mono tracking-[0.5em] text-neutral-400 mb-8 relative inline-block glitch-text">
            MELBOURNE / TOKYO / CONCRETE
          </h2>
        </Reveal>
        <Reveal delay={400}>
          <button className="group relative px-8 py-3 border border-neutral-100 bg-transparent text-neutral-100 font-bold tracking-widest uppercase overflow-hidden hover:bg-white hover:text-black transition-all duration-300">
            <span className="relative z-10">Enter Shop</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          </button>
        </Reveal>
      </div>
      <style>{`
        @keyframes glitch { 0% { transform: translate(0) } 20% { transform: translate(-2px, 2px) } 40% { transform: translate(-2px, -2px) } 60% { transform: translate(2px, 2px) } 80% { transform: translate(2px, -2px) } 100% { transform: translate(0) } }
        .glitch-text:hover { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; color: #ff00ff; }
      `}</style>
    </header>
  );
}