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
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  return (
    <div className="glass-card rounded-3xl p-6 h-[280px] flex flex-col relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
             <div className="w-1 h-1 rounded-full bg-teal-500" />
          </div>
          <h3 className="font-heading text-xs font-black text-gray-400 tracking-widest uppercase">System Log Stream</h3>
        </div>
        <div className="font-mono text-[9px] text-gray-600 tracking-wider font-bold">
           BUFF_SIZE: {logs.length}/30
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide space-y-2.5 font-mono text-[10px] md:text-[11px] font-bold tracking-tight"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div 
              key={log.id} 
              className="flex gap-4 group/log"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-gray-600 shrink-0 font-light">[{log.timestamp}]</span>
              <span className={`uppercase shrink-0 w-12 ${
                log.level === 'error' ? 'text-rose-500' :
                log.level === 'warn' ? 'text-amber-400' :
                log.level === 'success' ? 'text-emerald-500' :
                'text-blue-400'
              }`}>
                {log.level}
              </span>
              <span className={`uppercase shrink-0 text-gray-500`}>[{log.type}]</span>
              <span className="text-gray-300 group-hover/log:text-white transition-colors">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity">
         <div className="h-6 w-1 bg-teal-500/20 rounded-full" />
      </div>
    </div>
  );
}
