'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getFrameUrl } from '../../utils/frame-loader';

interface CanvasPlayerProps {
  sceneId: string;
  frameCount: number;
  currentFrame: number;
  className?: string;
}

export default function CanvasPlayer({ sceneId, frameCount, currentFrame, className }: CanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [isReady, setIsReady] = useState(false);

  // Preload logic that reacts to sceneId changes
  useEffect(() => {
    let mounted = true;
    const preload = async () => {
      // Preload first batch for the NEW scene
      const firstBatch = [];
      for (let i = 0; i < Math.min(20, frameCount); i++) {
        firstBatch.push(loadFrame(sceneId, i));
      }
      await Promise.all(firstBatch);
      if (mounted) setIsReady(true);

      // Lazy load the rest in the background
      for (let i = 20; i < frameCount; i++) {
        if (!mounted) break;
        loadFrame(sceneId, i);
        if (i % 20 === 0) await new Promise(r => setTimeout(r, 20));
      }
    };

    const loadFrame = (sid: string, index: number): Promise<HTMLImageElement> => {
      const key = `${sid}-${index}`;
      if (imagesRef.current.has(key)) return Promise.resolve(imagesRef.current.get(key)!);
      
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          imagesRef.current.set(key, img);
          resolve(img);
        };
        img.onerror = () => resolve(img);
        img.src = getFrameUrl(sid, index);
      });
    };

    preload();
    
    // Cleanup old scenes from the map to save memory if map gets too large
    // (Optional: keep last 2 scenes for backward scroll performance)
    if (imagesRef.current.size > 800) {
       // Simple pruning: remove alles and just keep current
       const currentPrefix = `${sceneId}-`;
       for (const key of imagesRef.current.keys()) {
         if (!key.startsWith(currentPrefix)) {
            imagesRef.current.delete(key);
         }
       }
    }

    return () => {
      mounted = false;
    };
  }, [sceneId, frameCount]);

  // Draw logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const key = `${sceneId}-${currentFrame}`;
    const img = imagesRef.current.get(key);
    
    if (img) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const ratio = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.drawImage(img, x, y, newWidth, newHeight);
    }
  }, [sceneId, currentFrame, isReady]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-screen h-screen z-0 ${className}`}
    />
  );
}
