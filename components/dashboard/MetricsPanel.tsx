'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SystemMetrics } from '@/hooks/useSystemData';

interface MetricsPanelProps {
  metrics: SystemMetrics;
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    setFlicker(true);
    const timer = setTimeout(() => setFlicker(false), 150);
    return () => clearTimeout(timer);
  }, [metrics]);

  const MetricItem = ({ label, value, unit, color }: { label: string, value: number | string, unit: string, color: string }) => (
    <div className="relative group">
      <div className="flex justify-between items-end mb-2">
        <span className="font-space text-[9px] text-gray-500 uppercase tracking-[0.2em]">{label}</span>
        <div className="flex items-baseline gap-1">
          <motion.span 
            className={`font-space text-2xl font-black tabular-nums transition-colors duration-150 ${flicker ? 'text-white brightness-200' : color}`}
            style={{ textShadow: flicker ? `0 0 20px ${color}` : 'none' }}
          >
            {value}
          </motion.span>
          <span className="font-space text-[10px] text-gray-600 font-bold">{unit}</span>
        </div>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color.replace('text-', 'bg-')} shadow-[0_0_10px_rgba(34,211,238,0.4)]`}
          initial={{ width: 0 }}
          animate={{ width: typeof value === 'number' ? `${value}%` : '100%' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper p-6 h-full flex flex-col justify-between scanline-overlay">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-space text-[10px] font-black text-[#22d3ee] tracking-[0.2em] uppercase">Control_Telemetry</h3>
        <div className="px-2 py-0.5 rounded-sm border border-[#22d3ee]/30 bg-[#22d3ee]/5">
          <span className="font-space text-[8px] text-[#22d3ee] animate-flicker">LIVE_SYNC</span>
        </div>
      </div>

      <div className="space-y-6">
        <MetricItem label="CPU_LOAD" value={metrics.cpuUsage} unit="%" color="text-[#22d3ee]" />
        <MetricItem label="MEM_UTIL" value={metrics.memoryUsage} unit="%" color="text-[#fbbf24]" />
        <MetricItem label="NET_THROUGHPUT" value={Math.round(metrics.networkTraffic)} unit="mb/s" color="text-[#10b981]" />
        <MetricItem label="ERROR_RATE" value={(metrics.errorRate * 100).toFixed(2)} unit="%" color="text-rose-500" />
      </div>

      <div className="mt-8 flex justify-between items-center opacity-40">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`w-1 h-3 rounded-t-sm ${i < 8 ? 'bg-[#22d3ee]' : 'bg-white/10'}`} />
          ))}
        </div>
        <span className="font-space text-[8px] text-gray-500 uppercase tracking-widest">Buffer_Optimized</span>
      </div>
    </div>
  );
}
