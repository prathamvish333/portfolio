'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useSystemData } from '@/hooks/useSystemData';
import ServiceHealth from './dashboard/ServiceHealth';
import MetricsPanel from './dashboard/MetricsPanel';
import LogStream from './dashboard/LogStream';
import PipelineViz from './dashboard/PipelineViz';

// Helper for random coordinates to give it a technical HUD feel
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

  // Memoize sections for performance and clean structure
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
      <div className="scanline-overlay opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-[#22d3ee]/5 to-transparent pointer-events-none" />
      
      {/* Perspective/Technical HUD Anchors */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-[1px] h-4 bg-[#fbbf24]/40" />
            <div className="w-4 h-[1px] bg-[#fbbf24]/40" />
          </div>
          <span className="font-space text-[8px] text-[#fbbf24] uppercase tracking-widest leading-none">LAT: {coords.lat}°N</span>
      </div>
      <div className="absolute top-8 right-8 flex flex-col items-end gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-4 h-[1px] bg-[#fbbf24]/40" />
            <div className="w-[1px] h-4 bg-[#fbbf24]/40" />
          </div>
          <span className="font-space text-[8px] text-[#fbbf24] uppercase tracking-widest leading-none">LON: {coords.long}°E</span>
      </div>
      <div className="absolute bottom-8 left-8 flex flex-col-reverse gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-[1px] h-4 bg-[#fbbf24]/40" />
            <div className="w-4 h-[1px] bg-[#fbbf24]/40" />
          </div>
          <span className="font-space text-[8px] text-[#fbbf24] uppercase tracking-widest leading-none">ALT_BAR: 42,109m</span>
      </div>
      <div className="absolute bottom-8 right-8 flex flex-col-reverse items-end gap-2 z-30 opacity-60">
          <div className="flex gap-2">
            <div className="w-4 h-[1px] bg-[#fbbf24]/40" />
            <div className="w-[1px] h-4 bg-[#fbbf24]/40" />
          </div>
          <span className="font-space text-[8px] text-[#fbbf24] uppercase tracking-widest leading-none">STATUS: NOMINAL</span>
      </div>

      <div className="relative z-10 px-2 md:px-6">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#fbbf24] animate-pulse rounded-full" />
              <span className="font-space text-[10px] md:text-xs text-[#fbbf24] tracking-[0.5em] uppercase font-black cinematic-glow">Active_Telemetry</span>
            </div>
            <h2 className="font-space text-4xl md:text-7xl font-black text-white uppercase tracking-tighter select-none">
              SYSTEM_CONTROL<span className="text-[#fbbf24]">.</span>
            </h2>
          </div>
          
          <div className="hidden xl:flex items-center gap-10 border-l border-white/5 pl-10 h-16">
             <div className="text-right">
                <p className="font-space text-[9px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Architecture</p>
                <p className="font-space text-[10px] text-[#22d3ee] font-bold uppercase tracking-widest whitespace-nowrap">Cluster_v4.2 PROD</p>
             </div>
             <div className="text-right">
                <p className="font-space text-[9px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Packet_Flow</p>
                <p className="font-space text-[10px] text-white font-bold uppercase tracking-widest whitespace-nowrap">Real-time Stream</p>
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
                   <p className="font-space text-[8px] text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                   <p className="font-space text-[9px] text-[#fbbf24] font-black uppercase tracking-[0.2em]">
                     {i === 0 ? 'ALPHA_01_SECURE' : i === 1 ? 'EKS_MANAGED' : 'PROMETHEUS_STACK'}
                   </p>
                </div>
             ))}
           </div>
           
           <div className="flex items-center gap-6 border border-[#22d3ee]/20 rounded-sm px-8 py-3 bg-[#22d3ee]/5 hover:bg-[#22d3ee]/10 transition-colors cursor-default">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-1 h-3 bg-[#22d3ee]/40 rounded-t-sm animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="font-space text-[9px] text-white font-black uppercase tracking-[0.4em]">SYNC_NOMINAL</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
