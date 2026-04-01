'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTarsStore } from '../store/useTarsStore';

interface CanvasScrubberProps {
  sceneId: string;
  frameCount: number;
  currentFrame: number;
}

export default function CanvasScrubber({ sceneId, frameCount, currentFrame }: CanvasScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLoaded, setLoaded, setSyncProgress } = useTarsStore();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const requestRef = useRef<number>(0);
  const frameRef = useRef<number>(0);

  // Preload logic (Optimized for WebP)
  useEffect(() => {
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    const preload = async () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        // Spec says ezgif-frame-001.jpg but prompts say WebP. 
        // I'll detect extension or use JPG for now as seen in audit, but spec says WebP.
        // User previously said "not webp but i have included jpg".
        img.src = `/assets/${sceneId}/ezgif-frame-${frameNum}.jpg`; 
        
        img.onload = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / frameCount) * 100);
          if (i <= 50) { // Sync threshold for initial load
             setSyncProgress(progress);
          }
          if (loadedCount === Math.min(frameCount, 50)) {
             setLoaded(true);
          }
        };
        tempImages.push(img);
      }
      setImages(tempImages);
    };

    preload();
  }, [sceneId, frameCount, setLoaded, setSyncProgress]);

  // GPU-accelerated Rendering Loop
  const render = useCallback(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const img = images[Math.floor(currentFrame)];
    if (!img || !img.complete) return;

    // High-DPI Scaling
    const isBrowser = typeof window !== 'undefined';
    const dpr = isBrowser ? (window.devicePixelRatio || 1) : 1;
    const width = isBrowser ? window.innerWidth : 1920; 
    const height = isBrowser ? window.innerHeight : 1080;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    // Centered Cover Fit
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [images, currentFrame]);

  useEffect(() => {
    const animate = () => {
      render();
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [render]);

  return (
    <div className="canvas-container fixed inset-0 z-0 bg-black pointer-events-none">
       <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
