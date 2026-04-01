/**
 * Generates the URL for a specific frame in a scene or transition.
 * Naming convention: ezgif-frame-XXX.jpg (1-indexed, padded to 3 digits)
 */
export const getFrameUrl = (sceneId: string, frameIndex: number): string => {
  const paddedIndex = String(frameIndex + 1).padStart(3, '0');
  return `/assets/${sceneId}/ezgif-frame-${paddedIndex}.jpg`;
};

/**
 * Preloads a set of frames into the browser cache.
 */
export const preloadFrames = (sceneId: string, start: number, end: number): Promise<void[]> => {
  const promises = [];
  for (let i = start; i <= end; i++) {
    const url = getFrameUrl(sceneId, i);
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
