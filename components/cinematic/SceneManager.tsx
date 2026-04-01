'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CanvasPlayer from './CanvasPlayer';
import CinematicOverlay from './CinematicOverlay';

gsap.registerPlugin(ScrollTrigger);

const SCENES_CONFIG = [
  { id: 'scene1', frames: 180 },
  { id: 'transition_scene1-scene2', frames: 180 },
  { id: 'scene2', frames: 180 },
  { id: 'transition_scene2-scene3', frames: 180 },
  { id: 'scene3', frames: 180 },
  { id: 'transition_scene3-scene4', frames: 180 },
  { id: 'scene4', frames: 180 },
];

export default function SceneManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<{ setFrame: (f: number) => void }>(null);
  const overlayRef = useRef<{ setScene: (id: string, progress: number) => void }>(null);

  const sceneBounds = useMemo(() => {
    let acc = 0;
    return SCENES_CONFIG.map(scene => {
      const start = acc;
      const end = acc + scene.frames - 1;
      acc += scene.frames;
      return { ...scene, globalStart: start, globalEnd: end };
    });
  }, []);

  const totalFrames = sceneBounds[sceneBounds.length - 1].globalEnd + 1; // 1338

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = gsap.to({}, {
      duration: 1,
      onUpdate: function() {
        const progress = this.progress();
        const currentGlobalFrame = progress * (totalFrames - 1);

        // Pass the FLOAT value — CanvasPlayer now does sub-frame blending
        canvasRef.current?.setFrame(currentGlobalFrame);

        // Find which scene we're in for overlay
        let matchedScene = sceneBounds[0];
        for (const scene of sceneBounds) {
          if (currentGlobalFrame >= scene.globalStart && currentGlobalFrame < scene.globalEnd + 1) {
            matchedScene = scene;
            break;
          }
        }
        const localProg = Math.max(0, Math.min(1, (currentGlobalFrame - matchedScene.globalStart) / matchedScene.frames));
        overlayRef.current?.setScene(matchedScene.id, localProg);
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1000%',
        pin: true,
        scrub: 1.5,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [sceneBounds, totalFrames]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <CanvasPlayer ref={canvasRef} />
      <CinematicOverlay ref={overlayRef} />
    </div>
  );
}
