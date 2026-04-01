'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTarsStore } from '../../store/useTarsStore';
import { ShieldCheck, Download, Mail, Zap, Terminal, Code, Database, Cloud, Network } from 'lucide-react';

interface CinematicOverlayProps {
  activeScene: string;
}

export default function CinematicOverlay({ activeScene }: CinematicOverlayProps) {
  const isScene1 = activeScene === 'scene1' || activeScene === 'transition_scene1-scene2';
  const isScene2 = activeScene === 'scene2' || activeScene === 'transition_scene2-scene3';
  const isScene3 = activeScene === 'scene3' || activeScene === 'transition_scene3-scene4';
  const isScene4 = activeScene === 'scene4';

  const { setRecruiterMode } = useTarsStore();

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
      
      {/* GLOBAL BACKGROUND FADE TO BLACK ENTRY */}
      <motion.div 
        initial={{ opacity: 1 }} 
        animate={{ opacity: 0 }} 
        transition={{ duration: 2, ease: 'easeOut' }} 
        className="fixed inset-0 bg-black z-50 pointer-events-none" 
      />

      <AnimatePresence mode="wait">
        
        {/* SCENE 1: HERO / HOOK */}
        {isScene1 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="text-center p-10 max-w-5xl pointer-events-auto"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black italic uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-4">
              PRATHAM
            </h1>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-yellow-600 drop-shadow-lg mb-8">
              System Architect
            </h2>
            <div className="flex items-center justify-center gap-4 mb-16">
               <ShieldCheck size={20} className="text-[#fbbf24]" />
               <p className="font-space text-sm md:text-xl text-gray-300 tracking-[0.5em] font-black uppercase">
                 Architecting Scale. Engineering Reliability.
               </p>
            </div>
            
            <button 
              onClick={() => setRecruiterMode(true)}
              className="mt-8 px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-space text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-black hover:scale-105 transition-all duration-500 rounded-sm group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                 <Terminal size={14} className="group-hover:animate-bounce" />
                 [ SKIP TO RECRUITER MODE ]
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbbf24]/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </motion.div>
        )}

        {/* SCENE 2: EXPERIENCE / CREDIBILITY */}
        {isScene2 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            className="absolute left-[10%] top-[40%] -translate-y-1/2 w-full max-w-2xl pointer-events-auto"
          >
             <div className="border-l-4 border-[#fbbf24] p-10 bg-black/40 backdrop-blur-xl rounded-r-2xl shadow-2xl shadow-black/50 border border-t-white/10 border-r-white/10 border-b-white/10">
               <div className="flex items-center gap-3 mb-6">
                 <Zap size={16} className="text-[#fbbf24] animate-pulse" />
                 <h2 className="font-space text-xs text-gray-400 uppercase tracking-[0.4em]">MISSION LOG // EXPERIENCE</h2>
               </div>
               
               <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-2">
                  Jio Platforms
               </h3>
               <h4 className="text-xl md:text-2xl font-black italic uppercase tracking-widest text-[#fbbf24] mb-8">
                  Software Development Engineer I
               </h4>
               
               <ul className="space-y-5 font-space text-xs md:text-sm text-gray-300 font-medium tracking-wide">
                  <li className="flex gap-4 items-start">
                    <span className="text-[#fbbf24] mt-0.5">{">>"}</span>
                    <p>Built robust Python-based automation for hybrid cloud infrastructure, reducing manual provisioning time by over 40%.</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#fbbf24] mt-0.5">{">>"}</span>
                    <p>Developed core backend components for CloudXP engine using async Python patterns to handle scale.</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#fbbf24] mt-0.5">{">>"}</span>
                    <p>Managing multi-region Kubernetes clusters for production resiliency and automated scaling.</p>
                  </li>
               </ul>
             </div>
          </motion.div>
        )}

        {/* SCENE 3: CAPABILITY / SKILLS */}
        {isScene3 && (
          <motion.div
            key="scene3"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="w-full max-w-7xl px-10 pointer-events-auto"
          >
            <div className="text-center mb-16">
              <h2 className="font-space text-sm text-[#fbbf24] uppercase tracking-[0.5em] mb-4">SYSTEM SCHEMATICS</h2>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">TECH_CAPABILITY</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-black/40 backdrop-blur-lg border border-white/10 p-8 rounded-xl hover:border-[#fbbf24]/50 transition-colors group">
                <Cloud size={24} className="text-gray-400 group-hover:text-[#fbbf24] transition-colors mb-6" />
                <h4 className="font-space text-lg text-white font-black uppercase tracking-widest mb-6">Cloud & Infra</h4>
                <div className="flex flex-wrap gap-3">
                  {['KUBERNETES', 'DOCKER', 'TERRAFORM', 'AWS', 'JENKINS'].map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-gray-300 rounded group-hover:border-white/20">{s}</span>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-black/40 backdrop-blur-lg border border-white/10 p-8 rounded-xl hover:border-[#fbbf24]/50 transition-colors group">
                <Code size={24} className="text-gray-400 group-hover:text-[#fbbf24] transition-colors mb-6" />
                <h4 className="font-space text-lg text-white font-black uppercase tracking-widest mb-6">Backend Core</h4>
                <div className="flex flex-wrap gap-3">
                  {['PYTHON', 'FASTAPI', 'TYPESCRIPT', 'GO', 'REST APIS'].map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-gray-300 rounded group-hover:border-white/20">{s}</span>
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-black/40 backdrop-blur-lg border border-white/10 p-8 rounded-xl hover:border-[#fbbf24]/50 transition-colors group">
                <Database size={24} className="text-gray-400 group-hover:text-[#fbbf24] transition-colors mb-6" />
                <h4 className="font-space text-lg text-white font-black uppercase tracking-widest mb-6">Data & Telemetry</h4>
                <div className="flex flex-wrap gap-3">
                  {['POSTGRESQL', 'REDIS', 'PROMETHEUS', 'GRAFANA', 'SQL'].map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-gray-300 rounded group-hover:border-white/20">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCENE 4: PROOF & FINAL CONVERSION */}
        {isScene4 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full flex flex-col items-center justify-between pointer-events-auto py-24 px-8"
          >
            {/* Top: Projects */}
            <div className="w-full max-w-7xl">
              <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">DEPLOYED_SYSTEMS</h3>
                <Network size={32} className="text-[#fbbf24]" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-10">
                 {/* Project 1 */}
                 <div className="group relative overflow-hidden rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-10 hover:bg-black/80 transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"/>
                    <h4 className="text-3xl font-black italic tracking-tight text-white mb-2">NOTES-STUDIO</h4>
                    <p className="font-space text-[10px] text-blue-400 tracking-widest uppercase mb-6">Containerized 3-Tier AI Agentic Platform</p>
                    <p className="text-sm text-gray-400 mb-8 max-w-sm">Full-scale Kubernetes deployment feat. FastAPI, Postgres, and real-time AI Agents with Jenkins CI/CD.</p>
                 </div>

                 {/* Project 2 */}
                 <div className="group relative overflow-hidden rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-10 hover:bg-black/80 transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 opacity-50 group-hover:opacity-100 transition-opacity"/>
                    <h4 className="text-3xl font-black italic tracking-tight text-white mb-2">YASHASVI DUNIYA</h4>
                    <p className="font-space text-[10px] text-orange-400 tracking-widest uppercase mb-6">Production News Portal</p>
                    <p className="text-sm text-gray-400 mb-8 max-w-sm">High-fidelity news platform with advanced caching, CMS integrations, and real-time news tickers.</p>
                 </div>
              </div>
            </div>

            {/* Bottom: Final CTA */}
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
            >
               <div>
                  <h4 className="text-2xl font-black uppercase text-white tracking-tighter mb-2">SEQUENCE COMPLETE.</h4>
                  <p className="font-space text-xs text-gray-400 uppercase tracking-widest">Select action to proceed.</p>
               </div>
               
               <div className="flex flex-wrap gap-4">
                  <a 
                    href="/Prathams_Resume.pdf" download
                    className="flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-black font-black uppercase font-space text-[10px] tracking-widest hover:bg-white transition-colors rounded"
                  >
                    <Download size={14}/>
                    RESUME.PDF
                  </a>
                  <a 
                    href="mailto:contact@prathamvishwakarma.com"
                    className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-black uppercase font-space text-[10px] tracking-widest hover:bg-white/10 transition-colors rounded"
                  >
                    <Mail size={14}/>
                    COMMS
                  </a>
                  <button 
                    onClick={() => setRecruiterMode(true)}
                    className="flex items-center gap-2 px-6 py-3 border border-[#fbbf24]/50 text-[#fbbf24] font-black uppercase font-space text-[10px] tracking-widest hover:bg-[#fbbf24]/10 transition-colors rounded"
                  >
                    <Terminal size={14}/>
                    TERMINAL_UI
                  </button>
               </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Status HUD */}
      <div className="fixed top-10 left-10 z-50 pointer-events-none opacity-60 flex flex-col gap-2">
         <div className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse" />
            <span className="font-space text-[10px] text-white tracking-[0.3em] uppercase">SYSTEM_STATE // OPTIMAL</span>
         </div>
      </div>
    </div>
  );
}
