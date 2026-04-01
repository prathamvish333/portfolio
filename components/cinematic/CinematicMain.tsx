'use client';

import React from 'react';
import SceneManager from './SceneManager';

export default function CinematicMain() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black">
      <SceneManager />
    </main>
  );
}
