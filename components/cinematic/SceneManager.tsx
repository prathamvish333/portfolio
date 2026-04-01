'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CanvasPlayer from './CanvasPlayer';
import CinematicOverlay from './CinematicOverlay';

gsap.registerPlugin(ScrollTrigger);

const SCENES_CONFIG = [
  { id: 'scene1', frames: 192 },
  { id: 'transition_scene1-scene2', frames: 192 },
  { id: 'scene2', frames: 192 },
  { id: 'transition_scene2-scene3', frames: 192 },
  { id: 'scene3', frames: 192 },
  { id: 'transition_scene3-scene4', frames: 192 },
  { id: 'scene4', frames: 192 },
];

const TOTAL_FRAMES = SCENES_CONFIG.reduce((sum, s) => sum + s.frames, 0);
const CROSSFADE_FRAMES = 20; // Overlap duration in frames

interface ActiveScene {
  id: string;
  localFrame: number;
  opacity: number;
  frameCount: number;
}

export default function SceneManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  
  // We use state to trigger renders of CanvasPlayers, but throttled to avoid excessive re-renders if possible.
  // Actually, setting state directly on requestAnimationFrame might be expensive. 
  // Let's rely on React state for the active scenes since we need to mount/unmount components.
  const [activeScenes, setActiveScenes] = useState<ActiveScene[]>([{
    id: SCENES_CONFIG[0].id,
    localFrame: 0,
    opacity: 1,
    frameCount: SCENES_CONFIG[0].frames
  }]);
  const [dominantScene, setDominantScene] = useState(SCENES_CONFIG[0].id);
  const [velocityBlur, setVelocityBlur] = useState(0);

  // Pre-calculate bounds
  const sceneBounds = useMemo(() => {
    let acc = 0;
    return SCENES_CONFIG.map(scene => {
      const start = acc;
      const end = acc + scene.frames - 1;
      acc += scene.frames;
      return { ...scene, globalStart: start, globalEnd: end };
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Track scroll target
    const mainTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=1000%', // 1000vh total scroll depth for slower, cinematic feel
      pin: true,
      scrub: false, // We handle our own scrubbing via LERP
      onUpdate: (self) => {
        targetProgress.current = self.progress;
      },
    });

    let rafId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      // LERP: current approaches target
      const ease = 0.08; // Adjust for more/less smoothing
      currentProgress.current += (targetProgress.current - currentProgress.current) * ease;
      
      // Calculate velocity for motion blur
      const velocity = Math.abs(targetProgress.current - currentProgress.current);
      const blurAmount = Math.min(velocity * 500, 4); // Max 4px blur
      
      const globalFrame = currentProgress.current * (TOTAL_FRAMES - 1);
      
      const nextScenes: ActiveScene[] = [];
      let maxOpacityScene = sceneBounds[0].id;
      let maxOpacity = -1;

      for (let i = 0; i < sceneBounds.length; i++) {
        const scene = sceneBounds[i];
        
        // Is globalFrame within this scene's bounds, including an extended fade-out region?
        const isBefore = globalFrame < scene.globalStart;
        const isAfter = globalFrame > scene.globalEnd;
        
        // Calculate overlap boundaries
        const overlapStart = scene.globalStart;
        const overlapEnd = scene.globalEnd - CROSSFADE_FRAMES;
        
        let opacity = 0;

        if (globalFrame >= overlapStart && globalFrame <= scene.globalEnd) {
           if (globalFrame > overlapEnd && i < sceneBounds.length - 1) {
              // Fading out
              const fadeProgress = (globalFrame - overlapEnd) / CROSSFADE_FRAMES;
              opacity = 1 - fadeProgress;
           } else if (globalFrame < overlapStart + CROSSFADE_FRAMES && i > 0) {
              // Fading in
              const fadeProgress = (globalFrame - overlapStart) / CROSSFADE_FRAMES;
              opacity = fadeProgress;
           } else {
              opacity = 1;
           }
           
           if (opacity > 0.01) {
              const localFrame = Math.max(0, Math.min(scene.frames - 1, globalFrame - scene.globalStart));
              nextScenes.push({
                 id: scene.id,
                 localFrame,
                 opacity,
                 frameCount: scene.frames
              });

              if (opacity > maxOpacity) {
                  maxOpacity = opacity;
                  maxOpacityScene = scene.id;
              }
           }
        }
      }

      // Fallback if none matched (edge cases)
      if (nextScenes.length === 0) {
         nextScenes.push({
            id: SCENES_CONFIG[0].id,
            localFrame: 0,
            opacity: 1,
            frameCount: SCENES_CONFIG[0].frames
         });
         maxOpacityScene = SCENES_CONFIG[0].id;
      }

      setActiveScenes(nextScenes);
      setVelocityBlur(blurAmount);
      setDominantScene(maxOpacityScene);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      mainTrigger.kill();
      cancelAnimationFrame(rafId);
    };
  }, [sceneBounds]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* 
        Dual-Canvas rendering:
        We render all currently active scenes (1 or 2 during transitions).
        Using position absolute, they overlap. Opacity handles the crossfade.
      */}
      {activeScenes.map((scene) => (
        <CanvasPlayer 
          key={scene.id} 
          sceneId={scene.id} 
          frameCount={scene.frameCount} 
          currentFrame={scene.localFrame} 
          opacity={scene.opacity}
          blur={velocityBlur}
        />
      ))}

      {/* Overlay UI Layer gets the scene with the highest opacity as the "active" context */}
      <CinematicOverlay activeScene={dominantScene} />
      
      {/* This spacer provides the actual scroll height for ScrollTrigger */}
      <div className="h-[1000vh] w-full pointer-events-none absolute top-0" />
    </div>
  );
}
