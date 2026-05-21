'use client';

import React, { useState, useEffect } from 'react';
import SceneManager from './SceneManager';

export default function CinematicMain() {
  const [showHint, setShowHint] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowHint(false);
        setHasScrolled(true);
      } else if (!hasScrolled) {
        setShowHint(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black">
      <SceneManager />

      {/* Scroll Hint Overlay */}
      {showHint && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-end pb-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        >
          {/* Title so the user knows they are in the right place */}
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-white/20 text-[10px] font-mono tracking-[0.6em] uppercase mb-4 animate-pulse">
              Cinematic Experience
            </p>
            <div className="text-white/10 text-6xl md:text-8xl font-black uppercase tracking-tighter">
              PRATHAM
            </div>
          </div>

          {/* Bottom scroll prompt */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-white text-xs font-mono tracking-[0.4em] uppercase animate-pulse">
              Scroll Down to Explore
            </p>

            {/* Animated mouse icon */}
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1 h-2.5 bg-white/80 rounded-full animate-bounce" />
            </div>

            {/* Chevrons */}
            <div className="flex flex-col items-center gap-0.5 animate-bounce">
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M1 1L8 7L15 1" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M1 1L8 7L15 1" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
