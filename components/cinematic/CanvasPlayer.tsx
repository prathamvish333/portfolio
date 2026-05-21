'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback, useState } from 'react';
import { getFrameUrl } from '../../utils/frame-loader';

const TOTAL_FRAMES = 1260;
const INITIAL_PRELOAD = 400;   // First batch loaded before hiding loader
const PRELOAD_AHEAD = 200;     // Frames to preload ahead of scroll position
const PRELOAD_BEHIND = 50;     // Frames to keep behind scroll position

export interface CanvasPlayerHandle {
  setFrame: (frame: number) => void;
}

const CanvasPlayer = forwardRef<CanvasPlayerHandle>(function CanvasPlayer(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const lastDrawnFrame = useRef(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const loadingRef = useRef(true);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        if (lastDrawnFrame.current >= 0) {
          drawFrame(lastDrawnFrame.current);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load a single frame, return promise
  const loadImage = useCallback((idx: number): Promise<HTMLImageElement> => {
    const cache = imagesRef.current;
    const existing = cache.get(idx);
    if (existing && existing.complete && existing.naturalWidth !== 0) {
      return Promise.resolve(existing);
    }
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        cache.set(idx, img);
        resolve(img);
      };
      img.onerror = () => resolve(img); // Don't block on errors
      img.src = getFrameUrl(idx);
      cache.set(idx, img);
    });
  }, []);

  // Aggressive initial preload — load first INITIAL_PRELOAD frames with progress
  useEffect(() => {
    let mounted = true;

    const preloadInitial = async () => {
      const BATCH_SIZE = 20; // Load in parallel batches of 20
      let loaded = 0;

      for (let start = 0; start < INITIAL_PRELOAD; start += BATCH_SIZE) {
        const end = Math.min(start + BATCH_SIZE, INITIAL_PRELOAD);
        const batch = [];
        for (let i = start; i < end; i++) {
          batch.push(loadImage(i));
        }
        await Promise.all(batch);
        loaded += (end - start);
        if (mounted) {
          setLoadProgress(Math.round((loaded / INITIAL_PRELOAD) * 100));
        }
      }

      if (mounted) {
        loadingRef.current = false;
        setIsLoading(false);
        // Continue preloading remaining frames in the background
        preloadRemaining();
      }
    };

    const preloadRemaining = () => {
      // Lazily preload remaining frames in small batches
      let idx = INITIAL_PRELOAD;
      const loadNext = () => {
        if (!mounted || idx >= TOTAL_FRAMES) return;
        const batch = [];
        const end = Math.min(idx + 10, TOTAL_FRAMES);
        for (let i = idx; i < end; i++) {
          batch.push(loadImage(i));
        }
        idx = end;
        Promise.all(batch).then(() => {
          // Use requestIdleCallback if available, else setTimeout
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadNext);
          } else {
            setTimeout(loadNext, 50);
          }
        });
      };
      loadNext();
    };

    preloadInitial();
    return () => { mounted = false; };
  }, [loadImage]);

  // Preload frames around scroll position (called on every scroll frame)
  const preloadAround = useCallback((idx: number) => {
    const cache = imagesRef.current;
    for (let i = Math.max(0, idx - PRELOAD_BEHIND); i < Math.min(TOTAL_FRAMES, idx + PRELOAD_AHEAD); i++) {
      if (!cache.has(i)) {
        const img = new Image();
        img.src = getFrameUrl(i);
        cache.set(i, img);
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

    // Fast-path: Only redraw when the integer frame changes
    const idxA = Math.floor(frameFloat);
    if (idxA === lastDrawnFrame.current) return;
    lastDrawnFrame.current = idxA;

    preloadAround(idxA);

    ctx.imageSmoothingEnabled = false; // Disable for performance

    const imgA = imagesRef.current.get(idxA);
    const cw = canvas.width;
    const ch = canvas.height;

    if (isReady(imgA)) {
      drawImageCover(ctx, imgA, cw, ch);
    } else {
      // Frame not ready — fallback load
      const fallback = new Image();
      fallback.onload = () => {
        imagesRef.current.set(idxA, fallback);
        if (Math.floor(lastDrawnFrame.current) === idxA) {
          drawImageCover(ctx, fallback, cw, ch);
        }
      };
      fallback.src = getFrameUrl(idxA);
      imagesRef.current.set(idxA, fallback);
    }
  }, [drawImageCover]);

  useImperativeHandle(ref, () => ({
    setFrame: (frame: number) => {
      drawFrame(frame);
    },
  }), [drawFrame]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ imageRendering: 'auto' }}
      />
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="text-white/60 text-sm font-mono tracking-widest uppercase mb-4">
            Initializing Sequence
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-white/40 text-xs font-mono mt-2">
            {loadProgress}%
          </div>
        </div>
      )}
    </>
  );
});

export default CanvasPlayer;
