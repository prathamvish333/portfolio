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
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Decouple GSAP rendering — just use ScrollTrigger purely for tracking scroll progress
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=600%', // Shortened by 25% to reduce dragging feel
      pin: true,
      onUpdate: (self) => {
        targetProgress.current = self.progress;
      },
    });

    // High performance rAF loop for syncing Engine with dynamic pacing
    const renderLoop = () => {
      const p = currentProgress.current;
      const target = targetProgress.current;

      // 1. Dynamic LERP factor (Varying speed across scenes)
      let lerpFactor = 0.12; // Base snappy speed

      // Slow zone: Hook / Black Hole (0.0 - 0.18)
      if (p < 0.18) lerpFactor = 0.06;
      // Fast Reveal: Identity (0.20 - 0.32)
      else if (p >= 0.20 && p < 0.35) lerpFactor = 0.18;
      // Slow/Heavy: Experience (0.35 - 0.50)
      else if (p >= 0.35 && p < 0.50) lerpFactor = 0.08;
      // Standard: Capability & Impact (0.50 - 0.70)
      else if (p >= 0.50 && p < 0.70) lerpFactor = 0.12;
      // Slow Zone for Projects (0.70 - 0.92)
      else if (p >= 0.70 && p < 0.92) lerpFactor = 0.08;
      // Final Landing (0.92 - 1.0)
      else if (p >= 0.92) lerpFactor = 0.15;

      // 2. Linear interpolation (lerp) with dynamic factor
      let diff = target - p;
      
      // Micro-Pause / "Detent" logic: 
      // Updated centers for 9-phase flow
      const sceneCenters = [0.03, 0.11, 0.23, 0.38, 0.54, 0.65, 0.75, 0.86, 0.95];
      const isNearCenter = sceneCenters.some(c => Math.abs(target - c) < 0.015);
      if (isNearCenter && Math.abs(diff) < 0.05) {
        lerpFactor *= 0.5; // Slow down even more when target is in a readable center
      }

      // Clamp small differences to prevent endless dragging sensation
      if (Math.abs(diff) < 0.0001) {
        currentProgress.current = target;
      } else {
        currentProgress.current += diff * lerpFactor; 
      }

      const finalP = currentProgress.current;

      // 1. Sync Canvas (0 to 1 -> 0 to 1259 frames)
      if (canvasRef.current) canvasRef.current.setFrame(finalP * 1259);

      // 2. Sync Cinematic Overlay 
      if (overlayRef.current) overlayRef.current.setProgress(finalP);

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      st.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <CanvasPlayer ref={canvasRef} />
      <CinematicOverlay ref={overlayRef} />
    </div>
  );
}
