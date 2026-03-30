'use client';

import React from 'react';
import { ServiceStatus } from '@/hooks/useSystemData';

interface ServiceHealthProps {
  services: ServiceStatus[];
}

export default function ServiceHealth({ services }: ServiceHealthProps) {
  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-sm font-black text-gray-400 tracking-widest uppercase">Service Health</h3>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${service.status === 'online' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
              <span className="font-mono text-[10px] text-gray-300 uppercase tracking-wider">{service.name}</span>
            </div>
            <div className="flex items-center gap-4">
               <span className="font-mono text-[10px] text-gray-500 italic">{service.latency}ms</span>
               <span className="font-mono text-[9px] text-emerald-400/80 font-bold uppercase">{service.status === 'online' ? '● Stable' : '● Warning'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center bg-[#1e293b]/50 p-3 rounded-xl">
        <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">Global Status</span>
        <span className="font-mono text-[8px] text-emerald-500 font-black uppercase tracking-widest">ALL MICROSERVICES OPERATIONAL</span>
      </div>
    </div>
  );
}
