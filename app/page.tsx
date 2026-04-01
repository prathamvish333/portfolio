'use client';

import React, { useEffect, useState } from 'react';
import { useTarsStore } from '../store/useTarsStore';
import { getPerformanceTier } from '../utils/performance';
import RecruiterMain from '../components/recruiter/RecruiterMain';
import CinematicMain from '../components/cinematic/CinematicMain';

export default function Home() {
  const { isRecruiterMode, setRecruiterMode, setPerformanceTier } = useTarsStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkPerformance = async () => {
      const tier = await getPerformanceTier();
      setPerformanceTier(tier);
      if (tier === 'low') {
        setRecruiterMode(true);
      }
    };
    checkPerformance();
  }, [setPerformanceTier, setRecruiterMode]);

  if (!isClient) return null;

  return isRecruiterMode ? <RecruiterMain /> : <CinematicMain />;
}
