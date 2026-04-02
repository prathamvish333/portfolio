'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CanvasPlayer, { CanvasPlayerHandle } from './CanvasPlayer';
import CinematicOverlay, { CinematicOverlayHandle } from './CinematicOverlay';

gsap.registerPlugin(ScrollTrigger);

// Helper for masking canvas movement between scenes
const mapP = (val: number, inM: number, inX: number, outM: number, outX: number) => {
  if (val <= inM) return outM;
  if (val >= inX) return outX;
  return outM + (outX - outM) * ((val - inM) / (inX - inM));
};

export default function SceneManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<CanvasPlayerHandle>(null);
  const overlayRef = useRef<CinematicOverlayHandle>(null);

  // Single Source of Truth
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Decouple GSAP rendering — just use ScrollTrigger purely for tracking scroll progress
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=800%', // Condense the scroll length slightly as requested
      pin: true,
      onUpdate: (self) => {
        targetProgress.current = self.progress;
      },
    });

    // High performance rAF loop for syncing Engine
    const renderLoop = () => {
      // Linear interpolation (lerp) for buttery smooth progress
      // 0.08 factor gives a slight glide but stops quickly when scrolling stops.
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;

      const p = currentProgress.current;

      // 1. Sync Canvas (0 to 1 -> 0 to 1259 frames)
      if (canvasRef.current) canvasRef.current.setFrame(p * 1259);

      // 2. Sync Cinematic Overlay 
      if (overlayRef.current) overlayRef.current.setProgress(p);

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <CanvasPlayer ref={canvasRef} />
      <CinematicOverlay ref={overlayRef} />
    </div>
  );
}
