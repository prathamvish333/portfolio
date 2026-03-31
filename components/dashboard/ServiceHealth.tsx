'use client';

import React from 'react';
import { ServiceStatus } from '@/hooks/useSystemData';

interface ServiceHealthProps {
  services: ServiceStatus[];
}

export default function ServiceHealth({ services }: ServiceHealthProps) {
  return (
    <div className="dashboard-wrapper p-6 h-full flex flex-col justify-between scanline-overlay">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-space text-[10px] font-black text-[#fbbf24] tracking-[0.2em] uppercase">System_Service_Health</h3>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]/20" />
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${service.status === 'online' ? 'bg-[#10b981] animate-pulse-glow shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-[#fbbf24] shadow-[0_0_12px_rgba(251,191,36,0.8)]'}`} />
              <span className="font-space text-[10px] text-gray-300 uppercase tracking-widest group-hover:text-[#22d3ee] transition-colors">{service.name}</span>
            </div>
            <div className="flex items-center gap-4">
               <span className="font-space text-[9px] text-gray-500 italic tabular-nums">{service.latency}ms</span>
               <span className={`font-space text-[9px] font-bold uppercase tracking-tighter ${service.status === 'online' ? 'text-[#10b981]' : 'text-[#fbbf24]'}`}>
                 {service.status === 'online' ? 'STATUS_OK' : 'STATUS_WARN'}
               </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center bg-white/5 p-3 rounded-sm">
        <span className="font-space text-[8px] text-gray-600 uppercase tracking-widest">Master_Protocol</span>
        <span className="font-space text-[8px] text-[#10b981] font-black uppercase tracking-[0.2em]">ALL_SYSTEMS_OPERATIONAL</span>
      </div>
    </div>
  );
}
