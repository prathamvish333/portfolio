'use client';

import React, { useState, useEffect } from 'react';
import { useOS } from '@/context/OSContext';

interface PerspectiveWrapperProps {
  children: React.ReactNode;
}

export default function PerspectiveWrapper({ children }: PerspectiveWrapperProps) {
  const { isRecruiterMode } = useOS();
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check reduced motion
    const checkMotion = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkMotion();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldApply3D = !isRecruiterMode && !isMobile && !reducedMotion;

  if (!shouldApply3D) {
    return <>{children}</>;
  }

  return (
    <div className="perspective-container w-full h-full transform-3d pointer-events-none">
       <div className="w-full h-full pointer-events-auto">
          {children}
       </div>
    </div>
  );
}
