import { useState, useEffect, useCallback, useRef } from 'react';
import { useTarsStore } from '../store/useTarsStore';

interface PreloadOptions {
  sceneId: string;
  frameCount: number;
  syncThreshold?: number; // First X frames to load synchronously
}

export const useFramePreloader = ({ sceneId, frameCount, syncThreshold = 50 }: PreloadOptions) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { setSyncProgress, setLoaded } = useTarsStore();
  const loadedCount = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const preloadFrame = useCallback((index: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const frameNum = String(index).padStart(3, '0');
      img.src = `/assets/scene1/ezgif-frame-${frameNum}.jpg`; // Hardcoded scene1 for main sequence
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load: ${img.src}`);
    });
  }, []);

  useEffect(() => {
    let active = true;

    const loadSequence = async () => {
      const syncFrames: Promise<HTMLImageElement>[] = [];
      
      // Phase 1: Synchronous Preload (First 50 frames)
      for (let i = 1; i <= syncThreshold; i++) {
        syncFrames.push(preloadFrame(i));
      }

      try {
        const loadedSync = await Promise.all(syncFrames);
        if (!active) return;
        
        imagesRef.current = [...loadedSync];
        setImages([...imagesRef.current]);
        setSyncProgress(100);
        setLoaded(true);

        // Phase 2: Asynchronous background loading for remaining frames
        for (let i = syncThreshold + 1; i <= frameCount; i++) {
          if (!active) break;
          const img = await preloadFrame(i);
          imagesRef.current.push(img);
          // Update images array occasionally to avoid too many re-renders
          if (i % 20 === 0 || i === frameCount) {
             setImages([...imagesRef.current]);
          }
        }
      } catch (error) {
        console.error("Critical sequence load failure:", error);
      }
    };

    loadSequence();

    return () => {
      active = false;
    };
  }, [sceneId, frameCount, syncThreshold, preloadFrame, setSyncProgress, setLoaded]);

  return images;
};
