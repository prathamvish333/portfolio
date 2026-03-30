'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SystemMetrics } from '@/hooks/useSystemData';

interface MetricsPanelProps {
  metrics: SystemMetrics;
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  const metricCards = [
    { label: 'Latency', value: `${Math.round(metrics.latency)}ms`, color: 'text-[#2dd4bf]', sub: 'P99 Index' },
    { label: 'Requests/sec', value: `${Math.round(metrics.requestsPerSecond)} req/s`, color: 'text-[#0d9488]', sub: 'Throughput' },
    { label: 'Error Rate', value: `${(metrics.errorRate * 100).toFixed(2)}%`, color: 'text-[#14b8a6]', sub: 'Failure Ratio' },
    { label: 'Uptime', value: metrics.uptime, color: 'text-[#2dd4bf]', sub: 'Service Availability' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-heading text-sm font-black text-gray-400 tracking-widest uppercase">System Metrics</h3>
        <div className="flex gap-1 items-center bg-white/5 px-2 py-1 rounded-md">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
           <span className="font-mono text-[8px] text-emerald-500 font-black uppercase">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metricCards.map((metric) => (
          <div key={metric.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">{metric.label}</span>
            <motion.span 
              key={metric.value}
              initial={{ opacity: 0.5, scale: 0.95, textShadow: "0 0 20px rgba(45, 212, 191, 0.8)" }}
              animate={{ opacity: 1, scale: 1, textShadow: "0 0 0px rgba(45, 212, 191, 0)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`font-heading text-xl md:text-2xl font-black ${metric.color} tracking-tight`}
            >
              {metric.value}
            </motion.span>
            <span className="font-mono text-[8px] text-gray-600 uppercase mt-2 tracking-tighter opacity-100">{metric.sub}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-white/5">
        <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            animate={{ x: [-100, 400] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-1/4 h-full bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
