'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CanvasPlayer from './CanvasPlayer';
import CinematicOverlay from './CinematicOverlay';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  { id: 'scene1', frames: 192 },
  { id: 'transition_scene1-scene2', frames: 192 },
  { id: 'scene2', frames: 192 },
  { id: 'transition_scene2-scene3', frames: 192 },
  { id: 'scene3', frames: 192 },
  { id: 'transition_scene3-scene4', frames: 192 },
  { id: 'scene4', frames: 192 },
];

const TOTAL_FRAMES = SCENES.reduce((sum, s) => sum + s.frames, 0);

export default function SceneManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [activeScene, setActiveScene] = useState(SCENES[0].id);
  const [currentSceneFrames, setCurrentSceneFrames] = useState(SCENES[0].frames);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a single ScrollTrigger for the entire experience
    const mainTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=800%', // 800vh total scroll depth
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const frameIndexTotal = Math.min(
          Math.floor(progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );

        // Calculate which scene we are in
        let frameCounter = 0;
        for (const scene of SCENES) {
          if (frameIndexTotal < frameCounter + scene.frames) {
            const relativeFrame = frameIndexTotal - frameCounter;
            setActiveScene(scene.id);
            setCurrentFrame(relativeFrame);
            setCurrentSceneFrames(scene.frames);
            break;
          }
          frameCounter += scene.frames;
        }
      },
    });

    return () => {
      mainTrigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black">
      {/* 
        We use a high-performance canvas player. 
        Note: The key={activeScene} forces a new player (with new preloading logic) 
        when the scene ID changes. 
      */}
      <CanvasPlayer 
        key={activeScene} 
        sceneId={activeScene} 
        frameCount={currentSceneFrames} 
        currentFrame={currentFrame} 
      />

      {/* Overlay UI Layer */}
      <CinematicOverlay activeScene={activeScene} />
      
      {/* Scroll indicator/spacer */}
      <div className="h-[800vh] w-full pointer-events-none" />
    </div>
  );
}
