'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogEntry } from '@/hooks/useSystemData';

interface LogStreamProps {
  logs: LogEntry[];
}

export default function LogStream({ logs }: LogStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="dashboard-wrapper h-full flex flex-col scanline-overlay">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-flicker shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          <h3 className="font-space text-[10px] font-black text-[#fbbf24] tracking-[0.2em] uppercase">Kernel_Log_Stream</h3>
        </div>
        <span className="font-space text-[8px] text-gray-600 tabular-nums uppercase tracking-widest px-2 py-0.5 rounded-sm border border-white/5">TTY_01</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-hide font-space"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10, y: 15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[10px] leading-relaxed flex gap-3 group"
            >
              <span className="text-gray-700 shrink-0 select-none font-bold">[{log.timestamp}]</span>
              <span className={`shrink-0 w-12 uppercase font-black ${
                log.level === 'error' ? 'text-rose-500' :
                log.level === 'warn' ? 'text-[#fbbf24]' :
                log.level === 'success' ? 'text-[#10b981]' :
                'text-[#22d3ee]'
              }`}>
                {log.level}
              </span>
              <span className="text-[#22d3ee]/80 break-all group-hover:text-[#22d3ee] transition-colors">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-3 bg-[#fbbf24]/50 ml-1 translate-y-0.5"
        />
      </div>

      <div className="p-2 bg-black/40 border-t border-white/5 flex justify-between items-center">
        <div className="flex gap-4">
          <span className="font-space text-[7px] text-gray-700 uppercase tracking-widest">Sys_Status: IDLE</span>
          <span className="font-space text-[7px] text-gray-700 uppercase tracking-widest">Buffer: {logs.length}/25</span>
        </div>
        <span className="font-space text-[7px] text-[#fbbf24] uppercase tracking-widest animate-pulse">Connection_Live</span>
      </div>
    </div>
  );
}
