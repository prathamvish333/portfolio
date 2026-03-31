'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containers = [
  { id: 'frontend', name: 'Frontend_Nexus', port: 3000, color: 'text-[#22d3ee]', tier: 'WEB_LAYER' },
  { id: 'backend', name: 'Backend_API', port: 8000, color: 'text-[#fbbf24]', tier: 'LOGIC_LAYER' },
  { id: 'database', name: 'Notes_Storage', port: 5432, color: 'text-[#10b981]', tier: 'DATA_LAYER' },
];

export default function InfraStatus() {
  const [stats, setStats] = useState<Record<string, { cpu: string; mem: string; net: string }>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateStats = () => {
      const newStats: any = {};
      containers.forEach(c => {
        newStats[c.id] = {
          cpu: (Math.random() * 3 + 0.2).toFixed(1) + '%',
          mem: (Math.random() * 20 + 140).toFixed(0) + 'MB',
          net: (Math.random() * 10 + 2).toFixed(1) + 'ms'
        };
      });
      setStats(newStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full">
      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-3">
        {containers.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-sm border border-white/5 bg-[#111827]/40 p-6 md:p-8 backdrop-blur-3xl transition-all duration-500 hover:border-[#fbbf24]/30 hover:-translate-y-2 surface-card scanline-overlay"
          >
            <div className="absolute top-4 right-4">
               <div className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>

            <div className={`mb-4 font-space text-[9px] font-black tracking-[0.4em] ${c.color} uppercase opacity-60`}>
              {c.tier}
            </div>

            <h3 className="font-space text-lg md:text-xl font-black text-white mb-1 uppercase tracking-tight">{c.name}</h3>
            <p className="font-space text-[10px] text-gray-500 mb-6 tracking-[0.2em] font-bold">PORT_TCP/{c.port}</p>

            <div className="space-y-4">
              {/* CPU Meter */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-space tracking-widest uppercase font-black">
                  <span className="text-gray-600">CPU_LOAD</span>
                  <span className="text-[#22d3ee] tabular-nums">{stats[c.id]?.cpu || '0.2%'}</span>
                </div>
                <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#22d3ee]/60"
                    animate={{ width: stats[c.id]?.cpu || '20%' }}
                  />
                </div>
              </div>

              {/* Memory */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-space tracking-widest uppercase font-black">
                  <span className="text-gray-600">MEM_UTIL</span>
                  <span className="text-[#fbbf24] tabular-nums">{stats[c.id]?.mem || '140MB'}</span>
                </div>
                <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#fbbf24]/60"
                    animate={{ width: '45%' }}
                  />
                </div>
              </div>

              {/* Latency */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-space tracking-widest uppercase font-black">
                  <span className="text-gray-600">ASYNC_WAIT</span>
                  <span className="text-[#10b981] tabular-nums">{stats[c.id]?.net || '2ms'}</span>
                </div>
                <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#10b981]/60"
                    animate={{ width: '15%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="font-space text-[7px] text-gray-700 uppercase tracking-widest">Protocol: Nomadic</span>
              <span className="font-space text-[8px] text-[#fbbf24]/80 tracking-[0.2em] font-black uppercase">STATUS_OK</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
