export const getPerformanceTier = async (): Promise<'high' | 'low'> => {
  if (typeof window === 'undefined') return 'high';

  // 1. Check Hardware Concurrency (CPU Cores)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) return 'low';

  // 2. Memory Check (if available)
  // @ts-ignore - experimental API
  const memory = navigator.deviceMemory;
  if (memory && memory < 4) return 'low';

  // 3. Simple Render Latency Test
  return new Promise((resolve) => {
    const start = performance.now();
    let frame = 0;
    
    const check = () => {
      frame++;
      if (frame < 10) {
        requestAnimationFrame(check);
      } else {
        const end = performance.now();
        const avgFrameTime = (end - start) / 10;
        // If average frame time is > 32ms (under 30fps), downgrade
        if (avgFrameTime > 32) {
          resolve('low');
        } else {
          resolve('high');
        }
      }
    };
    
    requestAnimationFrame(check);
  });
};
