'use client';

import React, { useEffect, useState } from 'react';
import { useTarsStore } from '../store/useTarsStore';
import { getPerformanceTier } from '../utils/performance';
import RecruiterMain from '../components/recruiter/RecruiterMain';
import CinematicMain from '../components/cinematic/CinematicMain';

export default function Home() {
  const { isRecruiterMode, setRecruiterMode, setPerformanceTier } = useTarsStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Prevent Hydration Flicker by locking render until the browser fires
    setIsHydrated(true);
    
    const checkPerformanceAndMode = async () => {
      // 1. Read strict user preference first
      const storedPreference = localStorage.getItem('recruiter_active');
      let shouldEnableRecruiter = false;

      if (storedPreference !== null) {
         shouldEnableRecruiter = storedPreference === 'true';
      } else {
         // 2. If no explicit preference, degrade gracefully on bad hardware
         const tier = await getPerformanceTier();
         setPerformanceTier(tier);
         if (tier === 'low') {
            shouldEnableRecruiter = true;
         }
      }
      
      setRecruiterMode(shouldEnableRecruiter);
    };

    checkPerformanceAndMode();
  }, [setPerformanceTier, setRecruiterMode]);

  if (!isHydrated) {
     // Render nothing or a strict black background during hydration phase
     return <div className="min-h-screen bg-black w-full" />;
  }

  return isRecruiterMode ? <RecruiterMain /> : <CinematicMain />;
}
