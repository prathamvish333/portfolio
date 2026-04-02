'use client';

import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import { useTarsStore } from '../../store/useTarsStore';
import { ShieldCheck, Download, Mail, Zap, Terminal, Database, Cloud, Network, Orbit, ChevronDown } from 'lucide-react';

export interface CinematicOverlayHandle {
  setProgress: (p: number) => void;
}

// Math helpers to perfectly sync scroll `progress` to visual frames
const mapP = (val: number, inM: number, inX: number, outM: number, outX: number) => {
  if (val <= inM) return outM;
  if (val >= inX) return outX;
  return outM + (outX - outM) * ((val - inM) / (inX - inM));
};

const getOpacity = (p: number, sIn: number, eIn: number, sOut: number, eOut: number) => {
  if (p < sIn || p > eOut) return 0;
  if (p < eIn) return mapP(p, sIn, eIn, 0, 1);
  if (p > sOut) return mapP(p, sOut, eOut, 1, 0);
  return 1;
};

// Universal Glass Panel CSS for top-left lighting
const GLASS_PANEL = "bg-[#050505]/60 backdrop-blur-md border border-[#ffffff]/10 shadow-[-1px_-1px_0_rgba(255,255,255,0.05),_5px_5px_20px_rgba(0,0,0,0.8)] rounded-xl";

const CinematicOverlay = forwardRef<CinematicOverlayHandle>(function CinematicOverlay(_, ref) {
  const { setRecruiterMode } = useTarsStore();

  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);
  const s5Ref = useRef<HTMLDivElement>(null);
  const s6Ref = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      // Scene 1: INITIALIZING (0.00 - 0.10)
      if (s1Ref.current) {
        const op = getOpacity(p, 0, 0.02, 0.08, 0.10);
        s1Ref.current.style.opacity = op.toString();
        s1Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s1Ref.current.style.transform = `translateY(${mapP(p, 0, 0.10, 20, 0)}px)`;
      }
      
      // Scene 2: IDENTITY (0.15 - 0.25)
      if (s2Ref.current) {
        const op = getOpacity(p, 0.15, 0.17, 0.23, 0.25);
        s2Ref.current.style.opacity = op.toString();
        s2Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s2Ref.current.style.transform = `scale(${mapP(p, 0.15, 0.25, 0.95, 1)})`;
      }
      
      // Scene 3: EXPERIENCE (0.30 - 0.45)
      if (s3Ref.current) {
        const op = getOpacity(p, 0.30, 0.32, 0.43, 0.45);
        s3Ref.current.style.opacity = op.toString();
        s3Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s3Ref.current.style.transform = `translateX(${mapP(p, 0.30, 0.45, -20, 0)}px)`;
      }
      
      // Scene 4: CAPABILITIES (0.50 - 0.65)
      if (s4Ref.current) {
        const op = getOpacity(p, 0.50, 0.52, 0.63, 0.65);
        s4Ref.current.style.opacity = op.toString();
        s4Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s4Ref.current.style.transform = `translateY(${mapP(p, 0.50, 0.65, 20, -10)}px)`;
      }
      
      // Scene 5: SYSTEM MODULES (0.70 - 0.85)
      if (s5Ref.current) {
        const op = getOpacity(p, 0.70, 0.72, 0.83, 0.85);
        s5Ref.current.style.opacity = op.toString();
        s5Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s5Ref.current.style.transform = `scale(${mapP(p, 0.70, 0.85, 0.95, 1.05)})`;
      }

      // Scene 6: FINAL CTA (0.90 - 1.00)
      if (s6Ref.current) {
        const op = getOpacity(p, 0.90, 0.92, 1, 1);
        s6Ref.current.style.opacity = op.toString();
        s6Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s6Ref.current.style.transform = `translateY(${mapP(p, 0.90, 1, 40, 0)}px)`;
      }
    },
  }), []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center font-sans tracking-tight">
      
      {/* SCENE 1: SYSTEM INITIALIZING */}
      <div 
        ref={s1Ref}
        className="absolute text-center p-10 pointer-events-auto flex flex-col items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="flex justify-center gap-6 mb-8 uppercase text-xs tracking-[0.3em] font-medium text-gray-500">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> SYSTEM INITIALIZING...</span>
        </div>
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-white/50 w-full animate-pulse rounded-full" />
        </div>
        <button 
            onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
            className="absolute bottom-[-100px] flex flex-col items-center opacity-70 animate-bounce hover:opacity-100 transition-opacity cursor-pointer group"
        >
            <span className="text-[10px] tracking-widest text-white group-hover:text-[#fbbf24] mb-2 uppercase font-black tracking-[0.4em]">INITIATE</span>
            <ChevronDown size={24} className="text-white group-hover:text-[#fbbf24]"/>
        </button>
      </div>

      {/* SCENE 2: IDENTITY */}
      <div 
        ref={s2Ref}
        className="absolute text-center p-10 max-w-5xl pointer-events-auto"
        style={{ opacity: 0 }}
      >
        <div className="flex justify-center gap-6 mb-8 uppercase text-xs tracking-[0.3em] font-medium text-gray-500">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> NODE: PORTFOLIO_SYSTEM_V1</span>
            <span className="border-l border-white/10 pl-6 text-[#fbbf24]">STATUS: ACTIVE</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[0.8] mb-6">
          PRATHAM
        </h1>
        <h2 className="text-2xl md:text-4xl font-medium uppercase tracking-[0.4em] text-white/80 drop-shadow-lg mb-10">
          SYSTEMS ENGINEER
        </h2>
        <div className="flex items-center justify-center gap-3 opacity-70">
            <Orbit size={16} className="text-[#fbbf24]" />
            <p className="text-sm md:text-base text-gray-300 tracking-[0.5em] uppercase font-light">
              Designing systems that operate at scale.
            </p>
        </div>
      </div>

      {/* SCENE 3: EXPERIENCE */}
      <div 
        ref={s3Ref}
        className="absolute left-[8%] top-[50%] -translate-y-1/2 w-full max-w-2xl pointer-events-auto"
        style={{ opacity: 0 }}
      >
          <div className={`p-10 border-l-[3px] border-l-[#fbbf24] ${GLASS_PANEL}`}>
            <div className="flex items-center gap-3 mb-8 opacity-70">
              <Zap size={14} className="text-[#fbbf24]" />
              <h2 className="text-[11px] text-gray-400 uppercase tracking-[0.3em] font-bold">MISSION LOG // 02</h2>
            </div>
            
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">DEPLOYMENT NODE:</p>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                JIO PLATFORMS
              </h3>
            </div>

            <div className="mb-10">
              <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">ROLE:</p>
              <h4 className="text-lg md:text-xl font-medium tracking-[0.3em] text-[#fbbf24] uppercase">
                SYSTEM ENGINEER <span className="text-sm border border-green-500/30 text-green-500 px-2 py-0.5 ml-3 rounded font-mono">ACTIVE</span>
              </h4>
            </div>
            
            <ul className="space-y-4 text-[13px] text-gray-300 font-light tracking-wide leading-relaxed font-mono">
              <li className="flex gap-4 items-start">
                <span className="text-white/30">{">"}</span>
                <p>Built robust Python-based automation for hybrid cloud infrastructure, reducing manual provisioning time by over 40%.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-white/30">{">"}</span>
                <p>Developed core backend components for CloudXP engine using async Python patterns to handle scale.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-white/30">{">"}</span>
                <p>Managing multi-region Kubernetes clusters for production resiliency and automated scaling.</p>
              </li>
            </ul>
          </div>
      </div>

      {/* SCENE 4: CAPABILITIES */}
      <div 
        ref={s4Ref}
        className="absolute w-full max-w-7xl px-10 pointer-events-auto"
        style={{ opacity: 0 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-[11px] text-[#fbbf24] uppercase tracking-[0.5em] mb-4 font-bold opacity-80">READOUT // 03</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">SYSTEM CAPABILITIES</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-8 ${GLASS_PANEL} hover:border-[#fbbf24]/30 transition-colors`}>
            <div className="flex justify-between items-start mb-10">
              <Cloud size={20} className="text-gray-400" />
              <span className="text-[10px] font-mono text-gray-500">[ NODE_01 ]</span>
            </div>
            <h4 className="text-sm text-white font-bold uppercase tracking-[0.3em] mb-6">INFRASTRUCTURE</h4>
            <div className="flex flex-col gap-3 font-mono text-xs text-gray-400">
              {['KUBERNETES', 'DOCKER', 'TERRAFORM', 'AWS'].map(s => (
                <div key={s} className="flex justify-between border-b border-white/5 pb-2">
                    <span>{s}</span><span className="text-white/20">OK</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`p-8 ${GLASS_PANEL} border-white/20 hover:border-[#fbbf24]/30 transition-colors`}>
            <div className="flex justify-between items-start mb-10">
              <Database size={20} className="text-gray-400" />
              <span className="text-[10px] font-mono text-[#fbbf24]">[ NODE_02 ]</span>
            </div>
            <h4 className="text-sm text-[#fbbf24] font-bold uppercase tracking-[0.3em] mb-6">CORE ENGINE</h4>
            <div className="flex flex-col gap-3 font-mono text-xs text-gray-300">
              {['PYTHON', 'FASTAPI', 'TYPESCRIPT', 'POSTGRESQL', 'REDIS'].map(s => (
                <div key={s} className="flex justify-between border-b border-white/5 pb-2">
                    <span>{s}</span><span className="text-[#fbbf24]">SYNCED</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`p-8 ${GLASS_PANEL} hover:border-[#fbbf24]/30 transition-colors`}>
            <div className="flex justify-between items-start mb-10">
              <Network size={20} className="text-gray-400" />
              <span className="text-[10px] font-mono text-gray-500">[ NODE_03 ]</span>
            </div>
            <h4 className="text-sm text-white font-bold uppercase tracking-[0.3em] mb-6">AUTOMATION</h4>
            <div className="flex flex-col gap-3 font-mono text-xs text-gray-400">
              {['CI/CD PIPELINES', 'JENKINS', 'PROMETHEUS', 'GRAFANA'].map(s => (
                <div key={s} className="flex justify-between border-b border-white/5 pb-2">
                    <span>{s}</span><span className="text-white/20">OK</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SCENE 5: SYSTEM MODULES */}
      <div 
        ref={s5Ref}
        className="absolute w-full max-w-7xl px-10 pointer-events-auto"
        style={{ opacity: 0 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-[11px] text-gray-400 uppercase tracking-[0.5em] mb-4 font-bold opacity-80">ARCHIVE // 04</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">SYSTEM MODULES</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
            <div className={`p-10 ${GLASS_PANEL} relative hover:bg-black/80 transition-all duration-500`}>
              <div className="mb-8">
                  <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">MODULE:</p>
                  <h4 className="text-2xl font-black uppercase tracking-tighter text-white">NOTES-STUDIO</h4>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-1 uppercase font-medium">TYPE:</p>
                    <p className="text-xs tracking-[0.2em] text-[#fbbf24] uppercase">BACKEND SERVICE</p>
                  </div>
                  <Terminal size={24} className="text-white/20" />
              </div>
              <p className="text-sm text-gray-400 font-light mb-8 pr-10 leading-relaxed">Full-scale Kubernetes deployment feat. FastAPI, Postgres, and real-time AI Agents with Jenkins CI/CD.</p>
              <div className="bg-black/50 border border-white/5 p-4 rounded font-mono text-[10px] text-blue-400 flex flex-wrap gap-2 items-center justify-between">
                  <span>CLIENT</span> <span className="text-white/30">→</span> 
                  <span>API</span> <span className="text-white/30">→</span> 
                  <span>AUTH</span> <span className="text-white/30">→</span> 
                  <span>DB</span> <span className="text-white/30">→</span> 
                  <span>DEPLOY</span>
              </div>
            </div>

            <div className={`p-10 ${GLASS_PANEL} relative hover:bg-black/80 transition-all duration-500`}>
              <div className="mb-8">
                  <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">MODULE:</p>
                  <h4 className="text-2xl font-black uppercase tracking-tighter text-white">YASHASVI DUNIYA</h4>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-1 uppercase font-medium">TYPE:</p>
                    <p className="text-xs tracking-[0.2em] text-[#fbbf24] uppercase">PRODUCTION PORTAL</p>
                  </div>
                  <Network size={24} className="text-white/20" />
              </div>
              <p className="text-sm text-gray-400 font-light mb-8 pr-10 leading-relaxed">High-fidelity news platform serving critical traffic loads with advanced caching, CMS integrations, and real-time news tickers.</p>
              <div className="bg-black/50 border border-white/5 p-4 rounded font-mono text-[10px] text-orange-400 flex flex-wrap gap-2 items-center justify-between">
                  <span>USER</span> <span className="text-white/30">→</span> 
                  <span>EDGE_CACHE</span> <span className="text-white/30">→</span> 
                  <span>CMS_ENGINE</span> <span className="text-white/30">→</span> 
                  <span>RENDER</span>
              </div>
            </div>
        </div>
      </div>

      {/* SCENE 6: FINAL CTA */}
      <div 
        ref={s6Ref}
        className="absolute w-full max-w-5xl px-10 pointer-events-auto"
        style={{ opacity: 0 }}
      >
        <div className={`w-full ${GLASS_PANEL} px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#fbbf24]/5 border-[#fbbf24]/20`}>
            <div>
              <h4 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest mb-2">SEQUENCE_COMPLETE</h4>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">Select operational action to proceed.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/Prathams_Resume.pdf" download
                className="flex items-center justify-center gap-3 px-8 py-5 bg-[#fbbf24] text-black font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-white transition-colors rounded"
              >
                <Download size={16} className="mb-0.5" />
                VIEW_PROFILE
              </a>
              <button 
                onClick={() => setRecruiterMode(true)}
                className="flex items-center justify-center gap-3 px-8 py-5 border border-[#fbbf24]/50 text-[#fbbf24] font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-[#fbbf24]/10 transition-colors rounded"
              >
                <Terminal size={16} className="mb-0.5" />
                RECRUITER_MODE
              </button>
            </div>
        </div>
      </div>

      {/* Global Status HUD */}
      <div className="fixed top-10 left-10 z-50 pointer-events-none opacity-60 flex flex-col gap-2 font-mono">
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-[#fbbf24] rounded-sm animate-pulse" />
            <span className="text-[9px] text-white tracking-[0.4em] uppercase font-bold">SYSTEMS_NOMINAL</span>
          </div>
      </div>
    </div>
  );
});

export default CinematicOverlay;
