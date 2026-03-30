'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useSystemData } from '@/hooks/useSystemData';
import ServiceHealth from './dashboard/ServiceHealth';
import MetricsPanel from './dashboard/MetricsPanel';
import LogStream from './dashboard/LogStream';
import PipelineViz from './dashboard/PipelineViz';

// Helper for random coordinates to give it a technical "Interstellar" feel
const useCoordinates = () => {
    const [coords, setCoords] = useState({ lat: '45.8912', long: '123.4567' });
    useEffect(() => {
        const interval = setInterval(() => {
            setCoords({
                lat: (45.8912 + (Math.random() - 0.5) * 0.001).toFixed(4),
                long: (123.4567 + (Math.random() - 0.5) * 0.001).toFixed(4)
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return coords;
};

export default function SystemDashboard() {
  const { services, metrics, logs } = useSystemData();
  const coords = useCoordinates();

  // Memoize sections for performance
  const topRow = useMemo(() => (
    <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
      <div className="h-full">
         <ServiceHealth services={services} />
      </div>
      <div className="h-full">
         <MetricsPanel metrics={metrics} />
      </div>
    </div>
  ), [services, metrics]);

  const middleRow = useMemo(() => (
    <div className="mb-6 md:mb-8">
      <LogStream logs={logs} />
    </div>
  ), [logs]);

  const bottomRow = useMemo(() => (
    <div className="h-full">
      <PipelineViz />
    </div>
  ), []);

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 md:py-20 px-4 md:px-6 overflow-hidden dashboard-wrapper transform-3d" style={{ transform: 'translateZ(20px)' }}>
      {/* Cinematic Styling Layers */}
      <div className="scanline opacity-50" />
      <div className="absolute inset-0 bg-gradient-radial from-teal-500/5 to-transparent pointer-events-none" />
      
      {/* Perspective/Technical Anchors */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-[1px] h-4 bg-teal-500/40" />
            <div className="w-4 h-[1px] bg-teal-500/40" />
          </div>
          <span className="coordinate-tag">LST: {coords.lat}°N</span>
      </div>
      <div className="absolute top-8 right-8 flex flex-col items-end gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-4 h-[1px] bg-teal-500/40" />
            <div className="w-[1px] h-4 bg-teal-500/40" />
          </div>
          <span className="coordinate-tag">LON: {coords.long}°E</span>
      </div>
      <div className="absolute bottom-8 left-8 flex flex-col-reverse gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-[1px] h-4 bg-teal-500/40" />
            <div className="w-4 h-[1px] bg-teal-500/40" />
          </div>
          <span className="coordinate-tag">ALT: 42,109m</span>
      </div>
      <div className="absolute bottom-8 right-8 flex flex-col-reverse items-end gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-4 h-[1px] bg-teal-500/40" />
            <div className="w-[1px] h-4 bg-teal-500/40" />
          </div>
          <span className="coordinate-tag">STATUS: NOMINAL</span>
      </div>

      <div className="relative z-10 px-2 md:px-6">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 animate-pulse rounded-full" />
              <span className="font-heading text-[10px] md:text-xs text-[#0d9488] tracking-[0.5em] uppercase font-black cinematic-glow">Active Monitoring</span>
            </div>
            <h2 className="font-heading text-4xl md:text-7xl font-black text-white uppercase tracking-tighter hero-tracking select-none">
              SYSTEM DASHBOARD<span className="text-teal-500">.</span>
            </h2>
          </div>
          
          <div className="hidden xl:flex items-center gap-10 border-l border-white/5 pl-10 h-16">
             <div className="text-right">
                <p className="font-mono text-[9px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Architecture</p>
                <p className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-widest whitespace-nowrap">Production Cluster v4.2</p>
             </div>
             <div className="text-right">
                <p className="font-mono text-[9px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Telemetry</p>
                <p className="font-mono text-[10px] text-white font-bold uppercase tracking-widest whitespace-nowrap">Real-time Stream</p>
             </div>
          </div>
        </header>

        <div className="space-y-8 md:space-y-12">
          {topRow}
          {middleRow}
          {bottomRow}
        </div>

        <footer className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex gap-10 opacity-30">
             {['Environment', 'Orchestration', 'Observability'].map((label, i) => (
                <div key={label} className="group-hover:opacity-100 transition-opacity">
                   <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                   <p className="font-mono text-[9px] text-teal-500 font-black uppercase tracking-[0.2em]">
                     {i === 0 ? 'Alpha-01' : i === 1 ? 'EKS-Managed' : 'Prometheus-Stack'}
                   </p>
                </div>
             ))}
           </div>
           
           <div className="flex items-center gap-6 border border-white/5 rounded-2xl px-8 py-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-default">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-1 h-3 bg-teal-500/20 rounded-full animate-bounce`} style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.4em] font-black">Data Stream Synced</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
