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
    <div className="dashboard-wrapper p-8 h-full flex flex-col justify-center scanline-overlay">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-flicker" />
          <h3 className="font-space text-[10px] font-black text-[#fbbf24] tracking-[0.2em] uppercase">Control_Pipeline_Flow</h3>
        </div>
        <div className="flex gap-2">
            <span className="font-space text-[8px] text-[#10b981] font-black uppercase tracking-[0.2em] animate-pulse">STATUS_READY</span>
        </div>
      </div>

      <div className="flex items-center justify-between relative max-w-4xl mx-auto w-full px-4">
        {/* Connection Line */}
        <div className="absolute top-[14px] left-0 right-0 h-[1px] bg-white/5 -translate-y-1/2" />
        
        {pipelineStages.map((stage, i) => (
          <div key={stage.id} className="relative flex flex-col items-center">
            {/* Animated Flow Line */}
            {i < pipelineStages.length - 1 && (
               <div className="absolute top-[14px] left-[15px] w-[calc(100vw/5-50px)] md:w-[130px] h-[1px] overflow-hidden">
                  <motion.div 
                    animate={{ x: [-150, 150] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: i * 0.5 }}
                    className="w-full h-full bg-[#fbbf24]/30"
                  />
               </div>
            )}

            {/* Stage Icon/Point */}
            <motion.div
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              whileHover={{ scale: 1.2 }}
              className={`w-7 h-7 rounded-full z-10 cursor-help flex items-center justify-center transition-all duration-300 ${
                hoveredStage === stage.id ? 'bg-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.6)]' : 'bg-[#111827] border border-white/20'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${hoveredStage === stage.id ? 'bg-[#05070d] animate-flicker' : 'bg-[#fbbf24]/20'}`} />
            </motion.div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p className="font-space text-[10px] font-black text-white uppercase tracking-widest">{stage.label}</p>
              <p className="font-space text-[8px] text-gray-500 uppercase mt-1 tracking-tighter tabular-nums">{stage.tool}</p>
            </div>

            {/* Tooltip */}
            <AnimatePresence mode="wait">
              {hoveredStage === stage.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute -top-32 left-1/2 -translate-x-1/2 w-40 p-3 bg-[#05070d]/95 backdrop-blur-xl border border-[#fbbf24]/30 rounded-sm shadow-2xl z-50 pointer-events-none"
                >
                  <p className="font-space text-[8px] font-black text-[#fbbf24] uppercase tracking-[0.2em] mb-2">{stage.label}_Protocol</p>
                  <div className="space-y-1">
                    <p className="text-[7px] text-gray-400 leading-normal font-bold uppercase tracking-widest">{stage.desc}</p>
                    <div className="pt-1 border-t border-white/5">
                      <span className="text-[6px] text-gray-600 uppercase font-space font-black">Tool_ID: {stage.tool.replace(' ', '_')}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#05070d] border-b border-r border-[#fbbf24]/30 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-12 opacity-30">
         <div className="flex flex-col items-center gap-2">
            <span className="font-space text-[7px] text-gray-600 uppercase tracking-widest">Protocol_Standard</span>
            <span className="font-space text-[8px] text-[#fbbf24] font-black uppercase tracking-[0.2em]">GITOPS_FLOW</span>
         </div>
         <div className="flex items-center h-4 w-[1px] bg-white/5" />
         <div className="flex flex-col items-center gap-2">
            <span className="font-space text-[7px] text-gray-600 uppercase tracking-widest">Master_Deployment</span>
            <span className="font-space text-[8px] text-[#fbbf24] font-black uppercase tracking-[0.2em]">K8S_PRODUCTION</span>
         </div>
      </div>
    </div>
  );
}
