'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { getFrameUrl } from '../../utils/frame-loader';

export interface CanvasPlayerHandle {
  setFrame: (frame: number) => void;
}

const CanvasPlayer = forwardRef<CanvasPlayerHandle>(function CanvasPlayer(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const lastDrawnFrame = useRef(-1);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        // Redraw after resize
        if (lastDrawnFrame.current >= 0) {
          drawFrame(lastDrawnFrame.current);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload a batch of frames around current position
  const preloadAround = useCallback((idx: number) => {
    const PRELOAD_AHEAD = 40;
    const cache = imagesRef.current;
    for (let i = Math.max(0, idx - 5); i < Math.min(1260, idx + PRELOAD_AHEAD); i++) {
      if (!cache.has(i)) {
        const img = new Image();
        img.src = getFrameUrl(i);
        cache.set(i, img);
      }
    }
    // GC: trim cache when too large
    if (cache.size > 200) {
      for (const key of cache.keys()) {
        if (key < idx - 60 || key > idx + 120) {
          cache.delete(key);
        }
      }
    }
  }, []);

  const drawImageCover = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) => {
    const ratio = Math.max(cw / img.width, ch / img.height);
    const nw = img.width * ratio;
    const nh = img.height * ratio;
    ctx.drawImage(img, (cw - nw) / 2, (ch - nh) / 2, nw, nh);
  }, []);

  const isReady = (img: HTMLImageElement | undefined): img is HTMLImageElement => {
    return !!img && img.complete && img.naturalWidth !== 0;
  };

  const drawFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Round to 2 decimal places to avoid excessive redraws
    const rounded = Math.round(frameFloat * 100) / 100;
    if (rounded === lastDrawnFrame.current) return;
    lastDrawnFrame.current = rounded;

    const idxA = Math.floor(frameFloat);
    const idxB = Math.min(idxA + 1, 1259); // next frame, clamped
    const blend = frameFloat - idxA; // 0.0 to 0.99..

    // Preload in background
    preloadAround(idxA);

    const imgA = imagesRef.current.get(idxA);
    const imgB = imagesRef.current.get(idxB);
    const cw = canvas.width;
    const ch = canvas.height;

    if (isReady(imgA) && isReady(imgB) && blend > 0.01) {
      // Sub-frame blending: draw frame A, then overlay frame B with blend alpha
      ctx.globalAlpha = 1;
      drawImageCover(ctx, imgA, cw, ch);
      ctx.globalAlpha = blend;
      drawImageCover(ctx, imgB, cw, ch);
      ctx.globalAlpha = 1;
    } else if (isReady(imgA)) {
      // Snap to frame A (blend is ~0 or B isn't loaded yet)
      ctx.globalAlpha = 1;
      drawImageCover(ctx, imgA, cw, ch);
    } else {
      // Not cached — load and draw when ready
      const fallback = new Image();
      fallback.onload = () => {
        imagesRef.current.set(idxA, fallback);
        if (Math.floor(lastDrawnFrame.current) === idxA) {
          ctx.globalAlpha = 1;
          drawImageCover(ctx, fallback, cw, ch);
        }
      };
      fallback.src = getFrameUrl(idxA);
      imagesRef.current.set(idxA, fallback);
    }
  }, [preloadAround, drawImageCover]);

  // Expose imperative API — no React state, no re-renders
  useImperativeHandle(ref, () => ({
    setFrame: (frame: number) => {
      drawFrame(frame);
    },
  }), [drawFrame]);

  // Preload first batch on mount
  useEffect(() => {
    preloadAround(0);
  }, [preloadAround]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ imageRendering: 'auto' }}
    />
  );
});

export default CanvasPlayer;
