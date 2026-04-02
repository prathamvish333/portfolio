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
      // Scene 1: INITIALIZING (0.00 - 0.12) - slightly slower/longer for immersion
      if (s1Ref.current) {
        const op = getOpacity(p, 0, 0.03, 0.10, 0.12);
        s1Ref.current.style.opacity = op.toString();
        s1Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s1Ref.current.style.transform = `translateY(${mapP(p, 0, 0.12, 5, 0)}px)`;
      }
      
      // Scene 2: IDENTITY (0.15 - 0.25)
      if (s2Ref.current) {
        const op = getOpacity(p, 0.18, 0.20, 0.24, 0.25); // Delayed by 0.03
        s2Ref.current.style.opacity = op.toString();
        s2Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s2Ref.current.style.transform = `translateY(${mapP(p, 0.15, 0.25, 5, 0)}px)`;
      }
      
      // Scene 3: EXPERIENCE (0.30 - 0.45)
      if (s3Ref.current) {
        const op = getOpacity(p, 0.33, 0.35, 0.44, 0.45); // Delayed by 0.03
        s3Ref.current.style.opacity = op.toString();
        s3Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s3Ref.current.style.transform = `translateY(${mapP(p, 0.30, 0.45, 5, 0)}px)`;
      }
      
      // Scene 4: CAPABILITIES (0.50 - 0.65)
      if (s4Ref.current) {
        const op = getOpacity(p, 0.53, 0.55, 0.64, 0.65); // Delayed by 0.03
        s4Ref.current.style.opacity = op.toString();
        s4Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s4Ref.current.style.transform = `translateY(${mapP(p, 0.50, 0.65, 5, 0)}px)`;
      }
      
      // Scene 5: SYSTEM MODULES (0.70 - 0.85)
      if (s5Ref.current) {
        const op = getOpacity(p, 0.73, 0.75, 0.84, 0.85); // Delayed by 0.03
        s5Ref.current.style.opacity = op.toString();
        s5Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s5Ref.current.style.transform = `translateY(${mapP(p, 0.70, 0.85, 5, 0)}px)`;
      }

      // Scene 6: FINAL CTA (0.90 - 1.00)
      if (s6Ref.current) {
        const op = getOpacity(p, 0.92, 0.94, 1, 1);
        s6Ref.current.style.opacity = op.toString();
        s6Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s6Ref.current.style.transform = `translateY(${mapP(p, 0.90, 1, 5, 0)}px)`;
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
        <div className="flex justify-center gap-6 mb-8 uppercase text-xs tracking-[0.3em] font-medium text-gray-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"/> SYSTEM INITIALIZING...</span>
        </div>
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-white/50 w-full animate-pulse rounded-full" />
        </div>
        <button 
            onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
            className="absolute bottom-[-100px] flex flex-col items-center opacity-70 animate-bounce hover:opacity-100 transition-opacity cursor-pointer group"
        >
            <span className="text-[10px] tracking-widest text-white group-hover:text-[#fbbf24] mb-2 uppercase font-black tracking-[0.4em] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">INITIATE</span>
            <ChevronDown size={24} className="text-white group-hover:text-[#fbbf24] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"/>
        </button>
      </div>

      {/* SCENE 2: IDENTITY */}
      <div 
        ref={s2Ref}
        className="absolute text-center p-10 max-w-5xl pointer-events-auto"
        style={{ opacity: 0 }}
      >
        <div className="flex justify-center gap-6 mb-8 uppercase text-xs tracking-[0.3em] font-medium text-gray-500">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"/> NODE: PORTFOLIO_SYSTEM_V1</span>
            <span className="border-l border-white/10 pl-6 text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">STATUS: ACTIVE</span>
        </div>

        <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.25)] leading-[0.8] mb-6">
          PRATHAM
        </h1>
        <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-[0.4em] text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] mb-10">
          SYSTEMS ENGINEER
        </h2>
        <div className="flex items-center justify-center gap-3 opacity-80">
            <Orbit size={18} className="text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            <p className="text-sm md:text-base text-gray-300 tracking-[0.5em] uppercase font-light drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
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
          <div className={`p-10 border-l-[4px] border-l-[#fbbf24] ${GLASS_PANEL}`}>
            <div className="flex items-center gap-3 mb-8 opacity-80">
              <Zap size={16} className="text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
              <h2 className="text-xs text-gray-400 uppercase tracking-[0.3em] font-bold">MISSION LOG // 02</h2>
            </div>
            
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">DEPLOYMENT NODE:</p>
              <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                JIO PLATFORMS
              </h3>
            </div>

            <div className="mb-10">
              <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">ROLE:</p>
              <h4 className="text-xl md:text-2xl font-medium tracking-[0.3em] text-[#fbbf24] uppercase drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                SYSTEM ENGINEER <span className="text-sm border border-green-500/30 text-green-500 px-3 py-1 ml-3 rounded font-mono drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">ACTIVE</span>
              </h4>
            </div>
            
            <ul className="space-y-5 text-sm text-gray-200 font-light tracking-wide leading-relaxed font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <li className="flex gap-4 items-start">
                <span className="text-[#fbbf24]">{">"}</span>
                <p>Built robust Python-based automation for hybrid cloud infrastructure, reducing manual provisioning time by over 40%.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#fbbf24]">{">"}</span>
                <p>Developed core backend components for CloudXP engine using async Python patterns to handle scale.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#fbbf24]">{">"}</span>
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
        <div className="text-center mb-16 relative">
          <h2 className="text-xs text-[#fbbf24] uppercase tracking-[0.5em] mb-4 font-bold opacity-90 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">READOUT // 03</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">SYSTEM CAPABILITIES</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-8 ${GLASS_PANEL} hover:border-[#fbbf24]/50 transition-colors group`}>
            <div className="flex justify-between items-start mb-10">
              <Cloud size={24} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-mono text-gray-500 group-hover:text-white/50">[ NODE_01 ]</span>
            </div>
            <h4 className="text-base text-white font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">INFRASTRUCTURE</h4>
            <div className="flex flex-col gap-3 font-mono text-sm text-gray-300">
              {['KUBERNETES', 'DOCKER', 'TERRAFORM', 'AWS'].map(s => (
                <div key={s} className="flex justify-between border-b border-white/5 pb-2">
                    <span>{s}</span><span className="text-white/30 text-xs mt-0.5">OK</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`p-8 ${GLASS_PANEL} border-[#fbbf24]/30 shadow-[0_0_30px_rgba(251,191,36,0.05)] hover:border-[#fbbf24]/70 hover:shadow-[0_0_40px_rgba(251,191,36,0.15)] transition-all group`}>
            <div className="flex justify-between items-start mb-10">
              <Database size={24} className="text-[#fbbf24] drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
              <span className="text-[10px] font-mono text-[#fbbf24]">[ NODE_02 ]</span>
            </div>
            <h4 className="text-base text-[#fbbf24] font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">CORE ENGINE</h4>
            <div className="flex flex-col gap-3 font-mono text-sm text-gray-100">
              {['PYTHON', 'FASTAPI', 'TYPESCRIPT', 'POSTGRESQL', 'REDIS'].map(s => (
                <div key={s} className="flex justify-between border-b border-white/5 pb-2">
                    <span>{s}</span><span className="text-[#fbbf24] text-xs mt-0.5 animate-pulse">SYNCED</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`p-8 ${GLASS_PANEL} hover:border-[#fbbf24]/50 transition-colors group`}>
            <div className="flex justify-between items-start mb-10">
              <Network size={24} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-mono text-gray-500 group-hover:text-white/50">[ NODE_03 ]</span>
            </div>
            <h4 className="text-base text-white font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">AUTOMATION</h4>
            <div className="flex flex-col gap-3 font-mono text-sm text-gray-300">
              {['CI/CD PIPELINES', 'JENKINS', 'PROMETHEUS', 'GRAFANA'].map(s => (
                <div key={s} className="flex justify-between border-b border-white/5 pb-2">
                    <span>{s}</span><span className="text-white/30 text-xs mt-0.5">OK</span>
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
        <div className="text-center mb-16 relative">
          <h2 className="text-xs text-gray-400 uppercase tracking-[0.5em] mb-4 font-bold opacity-90">ARCHIVE // 04</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">SYSTEM MODULES</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
            <div className={`p-10 ${GLASS_PANEL} relative hover:bg-black/80 hover:border-white/30 transition-all duration-500 group`}>
              <div className="mb-8">
                  <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">MODULE:</p>
                  <h4 className="text-3xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">NOTES-STUDIO</h4>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-1 uppercase font-medium">TYPE:</p>
                    <p className="text-xs tracking-[0.2em] text-[#fbbf24] uppercase drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">BACKEND SERVICE</p>
                  </div>
                  <Terminal size={28} className="text-white/20 group-hover:text-white/50 transition-colors" />
              </div>
              <p className="text-base text-gray-300 font-light mb-8 pr-10 leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">Full-scale Kubernetes deployment feat. FastAPI, Postgres, and real-time AI Agents with Jenkins CI/CD.</p>
              <div className="bg-black/60 border border-white/10 p-5 rounded font-mono text-[11px] text-blue-400 flex flex-wrap gap-2 items-center justify-between shadow-inner">
                  <span className="font-bold">CLIENT</span> <span className="text-white/30">→</span> 
                  <span className="font-bold">API</span> <span className="text-white/30">→</span> 
                  <span className="font-bold">AUTH</span> <span className="text-white/30">→</span> 
                  <span className="font-bold">DB</span> <span className="text-white/30">→</span> 
                  <span className="font-bold text-green-400">DEPLOY</span>
              </div>
            </div>

            <div className={`p-10 ${GLASS_PANEL} relative hover:bg-black/80 hover:border-white/30 transition-all duration-500 group`}>
              <div className="mb-8">
                  <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-2 uppercase font-medium">MODULE:</p>
                  <h4 className="text-3xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">YASHASVI DUNIYA</h4>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] text-gray-500 mb-1 uppercase font-medium">TYPE:</p>
                    <p className="text-xs tracking-[0.2em] text-[#fbbf24] uppercase drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">PRODUCTION PORTAL</p>
                  </div>
                  <Network size={28} className="text-white/20 group-hover:text-white/50 transition-colors" />
              </div>
              <p className="text-base text-gray-300 font-light mb-8 pr-10 leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">High-fidelity news platform serving critical traffic loads with advanced caching, CMS integrations, and real-time news tickers.</p>
              <div className="bg-black/60 border border-white/10 p-5 rounded font-mono text-[11px] text-orange-400 flex flex-wrap gap-2 items-center justify-between shadow-inner">
                  <span className="font-bold">USER</span> <span className="text-white/30">→</span> 
                  <span className="font-bold">EDGE_CACHE</span> <span className="text-white/30">→</span> 
                  <span className="font-bold">CMS_ENGINE</span> <span className="text-white/30">→</span> 
                  <span className="font-bold text-green-400">RENDER</span>
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
        <div className={`w-full ${GLASS_PANEL} px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-10 bg-[#fbbf24]/10 border-[#fbbf24]/30 shadow-[0_0_40px_rgba(251,191,36,0.15)]`}>
            <div>
              <h4 className="text-2xl md:text-5xl font-black uppercase text-white tracking-[0.2em] mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">SYSTEM READY</h4>
              <p className="text-sm text-[#fbbf24] uppercase tracking-widest font-mono drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">Select operational action to proceed.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href="/Prathams_Resume.pdf" download
                className="flex items-center justify-center gap-3 px-8 py-5 bg-[#fbbf24] text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-white transition-colors rounded shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] w-full md:w-auto whitespace-nowrap"
              >
                <Download size={16} className="mb-0.5" />
                VIEW FULL PROFILE
              </a>
              <button 
                onClick={() => setRecruiterMode(true)}
                className="flex items-center justify-center gap-3 px-8 py-5 border-2 border-[#fbbf24] text-[#fbbf24] font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#fbbf24] hover:text-black transition-all rounded w-full md:w-auto whitespace-nowrap"
              >
                <Terminal size={16} className="mb-0.5" />
                ENTER RECRUITER MODE
              </button>
            </div>
        </div>
      </div>

      {/* Global Status HUD */}
      <div className="fixed top-10 left-10 z-[8000] pointer-events-none opacity-60 flex flex-col gap-2 font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-[#fbbf24] rounded-sm animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="text-[10px] text-white tracking-[0.4em] uppercase font-bold">SYSTEMS_NOMINAL</span>
          </div>
      </div>

      {/* Persistent Recruiter Mode Button */}
      <div className="fixed bottom-10 right-10 z-[9999]">
        <button
          onClick={() => setRecruiterMode(true)}
          className="pointer-events-auto flex items-center gap-3 px-6 py-4 bg-black/60 backdrop-blur-xl border border-white/20 text-white font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24] transition-all duration-300 rounded shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] group"
        >
          <Terminal size={16} className="group-hover:animate-pulse" />
          ENTER RECRUITER MODE
        </button>
      </div>
    </div>
  );
});

export default CinematicOverlay;
