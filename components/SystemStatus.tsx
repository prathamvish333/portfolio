'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SystemStatus() {
  const [latency, setLatency] = useState(110);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const jitter = Math.floor(Math.random() * 10) - 5;
        return Math.max(95, Math.min(145, prev + jitter));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      className="fixed bottom-8 right-8 z-40 hidden lg:block"
    >
      <div className="bg-[#05070d]/90 backdrop-blur-3xl border border-[#fbbf24]/20 rounded-sm p-5 shadow-2xl overflow-hidden group hover:border-[#fbbf24]/40 transition-all duration-500 scale-90 origin-bottom-right scanline-overlay">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-ping absolute" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] relative shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
          </div>
          <span className="font-space text-[10px] font-black uppercase tracking-[0.3em] text-[#fbbf24]">System_Protocol_Active</span>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between gap-10">
            <span className="font-space text-[9px] text-gray-600 uppercase tracking-widest">Master_API</span>
            <span className="font-space text-[9px] text-[#10b981] font-bold uppercase tracking-tighter">STATUS_OK</span>
          </div>
          <div className="flex items-center justify-between gap-10">
            <span className="font-space text-[9px] text-gray-600 uppercase tracking-widest">Async_Wait</span>
            <span className="font-space text-[9px] text-[#22d3ee] font-black uppercase tracking-widest tabular-nums">{latency}ms</span>
          </div>
          <div className="flex items-center justify-between gap-10">
            <span className="font-space text-[9px] text-gray-600 uppercase tracking-widest">Env_Layer</span>
            <span className="font-space text-[9px] text-white font-black uppercase tracking-widest">PROD_V4</span>
          </div>
          <div className="flex items-center justify-between gap-10">
            <span className="font-space text-[9px] text-gray-600 uppercase tracking-widest">Uptime_Sync</span>
            <span className="font-space text-[9px] text-gray-300 font-bold uppercase tracking-widest tabular-nums">99.99%</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
          <div className="flex justify-between items-center text-[7px] font-space text-gray-700 uppercase tracking-[0.2em] font-black">
            <span>Kernel_Stable</span>
            <span className="text-[#fbbf24]/60">0x4F92_NOMINAL</span>
          </div>
          <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: [-150, 150] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="h-full w-20 bg-gradient-to-r from-transparent via-[#fbbf24]/40 to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
