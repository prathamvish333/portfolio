'use client';

import { useOS } from '../context/OSContext';

/**
 * Compatibility shim — the cinematic overlay imports from this path.
 * Under the hood it delegates to the existing OSContext provider.
 */
export function useTarsStore() {
  const { isRecruiterMode, setRecruiterMode } = useOS();
  return { isRecruiterMode, setRecruiterMode };
}
