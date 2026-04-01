'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SystemDashboard from '../SystemDashboard';
import { useTarsStore } from '../../store/useTarsStore';

interface CinematicOverlayProps {
  activeScene: string;
}

export default function CinematicOverlay({ activeScene }: CinematicOverlayProps) {
  // Logic to determine if we are in a scene or its subsequent transition
  const isScene1 = activeScene === 'scene1' || activeScene === 'transition_scene1-scene2';
  const isScene2 = activeScene === 'scene2' || activeScene === 'transition_scene2-scene3';
  const isScene3 = activeScene === 'scene3' || activeScene === 'transition_scene3-scene4';
  const isScene4 = activeScene === 'scene4';

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isScene1 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="text-center p-10 max-w-4xl"
          >
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">
              TIME IS RELATIVE.
            </h1>
            <p className="font-space text-sm md:text-xl text-[#fbbf24] tracking-[0.5em] font-black mt-4 uppercase opacity-80">
              Reliability is Absolute.
            </p>
          </motion.div>
        )}

        {isScene2 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            className="absolute bottom-20 left-20 border-l-4 border-[#fbbf24] p-12 max-w-2xl bg-black/20 backdrop-blur-sm pointer-events-auto"
          >
             <h2 className="font-space text-xs text-gray-400 uppercase tracking-widest mb-4">ENGINEERING // MISSION_02</h2>
             <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-tight">
                Architecting<br/>Zero-Downtime<br/>Clusters.
             </h3>
             <ul className="mt-8 space-y-3 font-space text-[10px] text-gray-500 font-black tracking-widest">
                <li>{">>"} K8S ORCHESTRATION</li>
                <li>{">>"} TERRAFORM IAC</li>
                <li>{">>"} JENKINS AUTOMATION</li>
             </ul>
          </motion.div>
        )}

        {isScene3 && (
          <motion.div
            key="scene3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center gap-10 max-w-6xl px-10"
          >
            {['PYTHON', 'FASTAPI', 'POSTGRES', 'DOCKER', 'PROMETHEUS'].map((tech) => (
              <div key={tech} className="border border-white/10 p-10 backdrop-blur-xl bg-white/5 text-center min-w-[200px]">
                <span className="font-space text-3xl text-[#fbbf24] font-black italic block mb-2">{tech}</span>
                <div className="w-full h-1 bg-white/10 relative overflow-hidden">
                   <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#22d3ee]/40"
                   />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {isScene4 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full flex items-center justify-center pointer-events-auto overflow-auto py-20 px-4"
          >
            <div className="w-full max-w-6xl transform scale-75 md:scale-90 lg:scale-100 origin-center transition-transform hover:scale-105 duration-700">
               <SystemDashboard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Hud Elements */}
      <div className="fixed top-10 left-10 z-50 pointer-events-none opacity-60 flex flex-col gap-2">
         <div className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse" />
            <span className="font-space text-[10px] text-white tracking-[0.3em] uppercase">LINK_ESTABLISHED // PROXIMA_B</span>
         </div>
         <div className="font-space text-[8px] text-gray-500 tracking-widest ml-6">
            STREAMING_BUFFER: 98% // PKT_LOSS: 0.00%
         </div>
      </div>

      {/* MODE TOGGLE - Top Right */}
      <div className="fixed top-10 right-10 z-50 pointer-events-auto">
         <button 
           onClick={() => useTarsStore.getState().setRecruiterMode(true)}
           className="px-6 py-2 border border-white/20 bg-black/40 backdrop-blur-md text-white font-space text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all"
         >
           [ BACK_TO_DASHBOARD ]
         </button>
      </div>
    </div>
  );
}
