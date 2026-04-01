'use client';

import React from 'react';
import ProdLandingPage from './ProdLandingPage';

import { OSProvider } from '../../context/OSContext';

export default function RecruiterMain() {
  return (
      <OSProvider>
          <ProdLandingPage />
      </OSProvider>
  );
}
