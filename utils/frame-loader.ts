/**
 * Generates the absolute URL mapping to the 1-1260 merged sequence folder.
 */
export const getFrameUrl = (globalFrame: number): string => {
  const currentFrame = Math.floor(globalFrame); 
  const paddedIndex = String(currentFrame + 1).padStart(4, '0');
  return `/assets/sequence/frame_${paddedIndex}.jpg`;
};

/**
 * Preloads a set of frames into the browser cache.
 */
export const preloadFrames = (globalStart: number, end: number): Promise<void[]> => {
  const promises = [];
  for (let i = globalStart; i <= end; i++) {
    const url = getFrameUrl(i);
    const img = new Image();
    const promise = new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve anyway to not block
      img.src = url;
    });
    promises.push(promise);
  }
  return Promise.all(promises);
};
