'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pipelineStages = [
  { id: 'code', label: 'Code', tool: 'GitHub', status: 'success', desc: 'Integrated version control with branching strategy.' },
  { id: 'ci', label: 'CI', tool: 'Jenkins', status: 'success', desc: 'Multi-stage automated builds and testing.' },
  { id: 'docker', label: 'Docker', tool: 'OCI Images', status: 'success', desc: 'Immutable containerized application packaging.' },
  { id: 'k8s', label: 'K8s', tool: 'Kubernetes', status: 'success', desc: 'Production-grade container orchestration.' },
  { id: 'prod', label: 'Prod', tool: 'ArgoCD', status: 'success', desc: 'GitOps-driven continuous deployment.' },
];

export default function PipelineViz() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-12">
        <h3 className="font-heading text-sm font-black text-gray-400 tracking-widest uppercase">Deployment Pipeline</h3>
        <div className="flex gap-2">
            <span className="font-mono text-[8px] text-emerald-500 font-black uppercase tracking-widest">STATUS: HEALTHY</span>
        </div>
      </div>

      <div className="flex items-center justify-between relative max-w-4xl mx-auto w-full">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2" />
        
        {pipelineStages.map((stage, i) => (
          <div key={stage.id} className="relative flex flex-col items-center">
            {/* Animated Flow Line */}
            {i < pipelineStages.length - 1 && (
               <div className="absolute top-[14px] left-[28px] w-[calc(100vw/5-40px)] md:w-[150px] h-[2px] overflow-hidden">
                  <motion.div 
                    animate={{ x: [-150, 150] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.4 }}
                    className="w-full h-full bg-teal-500/40"
                  />
               </div>
            )}

            {/* Stage Icon/Point */}
            <motion.div
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              whileHover={{ scale: 1.2 }}
              className={`w-7 h-7 rounded-full z-10 cursor-help flex items-center justify-center transition-all duration-300 ${
                hoveredStage === stage.id ? 'bg-teal-500 shadow-[0_0_20px_rgba(13,148,136,0.6)]' : 'bg-[#111827] border-2 border-white/10'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${hoveredStage === stage.id ? 'bg-white' : 'bg-teal-500/40'}`} />
            </motion.div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p className="font-heading text-[11px] font-black text-white uppercase tracking-wider">{stage.label}</p>
              <p className="font-mono text-[9px] text-gray-500 uppercase mt-1 tracking-tight">{stage.tool}</p>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredStage === stage.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 p-4 bg-[#05070d] border border-teal-500/30 rounded-xl shadow-2xl z-50 pointer-events-none"
                >
                  <p className="font-heading text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">{stage.label} Layer</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase">{stage.desc}</p>
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#05070d] border-b border-r border-teal-500/30 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-12 opacity-40">
         <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">CI/CD Standard</span>
            <span className="font-mono text-[9px] text-[#2dd4bf] font-black uppercase">GitOps Flow</span>
         </div>
         <div className="flex flex-col items-center gap-2 border-l border-white/5 pl-12">
            <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">Environment</span>
            <span className="font-mono text-[9px] text-[#2dd4bf] font-black uppercase">Production</span>
         </div>
      </div>
    </div>
  );
}
