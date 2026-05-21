export const getFrameUrl = (frameIndex: number): string => {
  // Frames on disk are 1-indexed: frame_0001.jpg … frame_1260.jpg
  const oneIndexed = frameIndex + 1;
  const paddedIndex = String(oneIndexed).padStart(4, '0');
  return `/assets/sequence/frame_${paddedIndex}.jpg`;
};
