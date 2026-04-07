'use client';

import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import { useTarsStore } from '../../store/useTarsStore';
import { Download, Terminal } from 'lucide-react';
import Link from 'next/link';

export interface CinematicOverlayHandle {
  setProgress: (p: number) => void;
}

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

const CinematicOverlay = forwardRef<CinematicOverlayHandle>(function CinematicOverlay(_, ref) {
  const { setRecruiterMode } = useTarsStore();

  const s0Ref = useRef<HTMLDivElement>(null); // SYSTEM ONLINE
  const s1Ref = useRef<HTMLDivElement>(null); // Systems evolve
  const s2Ref = useRef<HTMLDivElement>(null); // Identity
  const s3Ref = useRef<HTMLDivElement>(null); // Experience (Jio)
  const s4Ref = useRef<HTMLDivElement>(null); // Capability
  const s5Ref = useRef<HTMLDivElement>(null); // Impact Statement 2
  const s6Ref = useRef<HTMLDivElement>(null); // Project 1
  const s7Ref = useRef<HTMLDivElement>(null); // Project 2
  const s8Ref = useRef<HTMLDivElement>(null); // CTA

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      // HOOK (0.00 -> 0.07) Center: 0.03
      if (s0Ref.current) {
        const op = getOpacity(p, 0.00, 0.01, 0.05, 0.07);
        s0Ref.current.style.opacity = op.toString();
        s0Ref.current.style.transform = `scale(${mapP(p, 0, 0.07, 0.95, 1.05)})`;
      }

      // BLACK HOLE IMPACT (0.08 -> 0.16) Center: 0.11
      if (s1Ref.current) {
        const op = getOpacity(p, 0.08, 0.10, 0.14, 0.16);
        s1Ref.current.style.opacity = op.toString();
        s1Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s1Ref.current.style.transform = `scale(${mapP(p, 0.08, 0.16, 0.95, 1)})`;
      }
      
      // IDENTITY (0.18 -> 0.30) Center: 0.23
      if (s2Ref.current) {
        const op = getOpacity(p, 0.18, 0.21, 0.27, 0.30);
        s2Ref.current.style.opacity = op.toString();
        s2Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s2Ref.current.style.transform = `scale(${mapP(p, 0.18, 0.30, 0.95, 1)})`;
      }
      
      // EXPERIENCE (0.33 -> 0.46) Center: 0.38
      if (s3Ref.current) {
        const op = getOpacity(p, 0.33, 0.36, 0.43, 0.46);
        s3Ref.current.style.opacity = op.toString();
        s3Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s3Ref.current.style.transform = `scale(${mapP(p, 0.33, 0.46, 0.95, 1)})`;
      }
      
      // CAPABILITY (0.49 -> 0.61) Center: 0.54
      if (s4Ref.current) {
        const op = getOpacity(p, 0.49, 0.52, 0.58, 0.61);
        s4Ref.current.style.opacity = op.toString();
        s4Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s4Ref.current.style.transform = `scale(${mapP(p, 0.49, 0.61, 0.95, 1)})`;
      }
      
      // IMPACT STATEMENT (0.62 -> 0.70) Center: 0.65
      if (s5Ref.current) {
        const op = getOpacity(p, 0.62, 0.64, 0.68, 0.70);
        s5Ref.current.style.opacity = op.toString();
        s5Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s5Ref.current.style.transform = `scale(${mapP(p, 0.62, 0.70, 0.95, 1)})`;
      }

      // PROJECT 1: NOTES-STUDIO (0.71 -> 0.80) Center: 0.75
      if (s6Ref.current) {
        const op = getOpacity(p, 0.71, 0.73, 0.78, 0.80);
        s6Ref.current.style.opacity = op.toString();
        s6Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s6Ref.current.style.transform = `scale(${mapP(p, 0.71, 0.80, 0.95, 1)})`;
      }

      // PROJECT 2: YASHASVI DUNIYA (0.82 -> 0.92) Center: 0.86
      if (s7Ref.current) {
        const op = getOpacity(p, 0.82, 0.84, 0.90, 0.92);
        s7Ref.current.style.opacity = op.toString();
        s7Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s7Ref.current.style.transform = `scale(${mapP(p, 0.82, 0.92, 0.95, 1)})`;
      }

      // FINAL CTA (0.93 -> 1.0) Center: 0.95
      if (s8Ref.current) {
        const op = getOpacity(p, 0.93, 0.95, 1, 1);
        s8Ref.current.style.opacity = op.toString();
        s8Ref.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        s8Ref.current.style.transform = `scale(${mapP(p, 0.93, 1, 0.98, 1)})`;
      }
    },
  }), []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center font-sans tracking-tight">
      
      {/* SCENE 0: INIT FLASH */}
      <div ref={s0Ref} className="absolute z-[9001] pointer-events-none flex items-center justify-center" style={{ opacity: 0 }}>
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-[0.5em] text-white/50 blur-[1px]">SYSTEM ONLINE</h1>
      </div>

      {/* SCENE 1: THE BLACK HOLE MOMENT */}
      <div ref={s1Ref} className="absolute z-[9001] pointer-events-auto text-center px-6" style={{ opacity: 0 }}>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] leading-tight">
          "Systems are not built. <br/><span className="text-[#fbbf24]">They evolve.</span>"
        </h2>
      </div>

      {/* SCENE 2: IDENTITY */}
      <div ref={s2Ref} className="absolute z-[9001] text-center p-4 md:p-10 w-full max-w-7xl pointer-events-auto" style={{ opacity: 0 }}>
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black uppercase tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.15)] leading-[0.8] mb-8 font-heading">
          PRATHAM
        </h1>
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="h-[1px] w-16 md:w-24 bg-white/20" />
          <h2 className="text-sm sm:text-xl md:text-3xl font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/80 font-heading">
            BACKEND & DEVOPS ENGINEER
          </h2>
          <p className="system-label text-[8px] md:text-[10px] text-center">BUILDING SCALABLE SYSTEMS & AUTOMATION WORKFLOWS</p>
        </div>
      </div>

      {/* SCENE 3: EXPERIENCE (IMPACT -> TECH) */}
      <div ref={s3Ref} className="absolute z-[9001] flex flex-col items-center justify-center text-center px-4 md:px-10 w-full pointer-events-auto" style={{ opacity: 0 }}>
        <h3 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-8 md:mb-16 max-w-6xl font-heading leading-tight">
          SCALABILITY IS NOT A <span className="text-white/40"><br className="block md:hidden"/>FEATURE.</span>
        </h3>
        
        <div className="flex flex-col items-center gap-6">
          <p className="system-label">NODE: JIO PLATFORMS // SDE-I</p>
          <div className="cinematic-line w-64" />
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            {['PYTHON', 'KUBERNETES', 'CI/CD', 'HYBRID CLOUD'].map(tech => (
              <span key={tech} className="hover:text-white transition-colors">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* SCENE 4: CAPABILITIES */}
      <div ref={s4Ref} className="absolute z-[9001] w-full max-w-7xl px-4 md:px-10 flex flex-col items-center pointer-events-auto text-center" style={{ opacity: 0 }}>
        <h3 className="text-3xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-12 md:mb-20 break-words font-heading leading-tight">
          SYSTEMS REMAIN <span className="text-white/40"><br className="block md:hidden"/>STABLE</span> UNDER LOAD.
        </h3>
        
        <div className="grid md:grid-cols-3 gap-12 w-full max-w-5xl">
          {[
            { label: 'INFRASTRUCTURE', techs: 'Docker • Terraform • AWS' },
            { label: 'CORE ENGINE', techs: 'FastAPI • PostgreSQL • Redis' },
            { label: 'AUTOMATION', techs: 'Jenkins • Prometheus • Grafana' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-4">
              <p className="system-label text-white/40">{item.label}</p>
              <div className="h-[1px] w-12 bg-white/10" />
              <p className="text-sm font-mono text-white/80 tracking-tight">{item.techs}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SCENE 5: IMPACT STATEMENT */}
      <div ref={s5Ref} className="absolute z-[9001] pointer-events-auto text-center px-4 md:px-6 w-full" style={{ opacity: 0 }}>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] leading-tight">
          ARCHITECTURAL INTEGRITY.
        </h2>
      </div>

      {/* SCENE 6: PROJECT 1 (NOTES-STUDIO) */}
      <div ref={s6Ref} className="absolute z-[9001] w-full max-w-6xl px-4 md:px-10 flex flex-col items-center pointer-events-auto text-center" style={{ opacity: 0 }}>
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          <p className="system-label text-[8px] md:text-[10px]">ARCHIVE_01 // CLOUD-NATIVE ECOSYSTEM</p>
          <div className="cinematic-line w-16 md:w-32 mx-auto" />
          <h3 className="text-4xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white font-heading">NOTES-STUDIO</h3>
          <p className="text-sm md:text-lg text-gray-400 font-light max-w-3xl leading-relaxed mx-auto px-2">
            Full-scale Kubernetes deployment featuring <span className="text-white">FastAPI</span>, <span className="text-white">PostgreSQL</span>, and <span className="text-white">AI Agents</span>.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['K8S_ORCHESTRATION', 'FASTAPI_ENGINE', 'POSTGRES_DB', 'JENKINS_CI'].map(tech => (
            <span key={tech} className="px-3 py-1 border border-white/10 text-[9px] font-mono text-white/40 tracking-widest bg-white/[0.02]">{tech}</span>
          ))}
        </div>

        <div className="flex gap-8">
          <Link href={process.env.NEXT_PUBLIC_NOTES_URL || "http://localhost:3001"} target="_blank" className="px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-white/90 transition-all">
            LIVE_DEMO
          </Link>
          <Link href="https://github.com/prathamvish333/Notes-Studio" target="_blank" className="px-10 py-4 border border-white/20 text-white font-black uppercase text-[10px] tracking-widest hover:border-white transition-all">
            REPOSITORY
          </Link>
        </div>
      </div>

      {/* SCENE 7: PROJECT 2 (YASHASVI DUNIYA) */}
      <div ref={s7Ref} className="absolute z-[9001] w-full max-w-6xl px-4 md:px-10 flex flex-col items-center pointer-events-auto text-center" style={{ opacity: 0 }}>
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          <p className="system-label text-[8px] md:text-[10px]">ARCHIVE_02 // HIGH-TRAFFIC PORTAL</p>
          <div className="cinematic-line w-16 md:w-32 mx-auto" />
          <h3 className="text-4xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white font-heading">YASHASVI DUNIYA</h3>
          <p className="text-sm md:text-lg text-gray-400 font-light max-w-3xl leading-relaxed mx-auto px-2">
            Production news platform serving critical traffic loads with <span className="text-white">Edge Caching</span> and <span className="text-white">Redis</span> optimization.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['REDIS_OPTIMIZATION', 'EDGE_CACHING', 'CMS_SCALING', 'NEWS_ALGO'].map(tech => (
            <span key={tech} className="px-3 py-1 border border-white/10 text-[9px] font-mono text-white/40 tracking-widest bg-white/[0.02]">{tech}</span>
          ))}
        </div>
        
        <div className="flex gap-8">
          <Link href="https://yashasviduniya.com" target="_blank" className="px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-white/90 transition-all">
            LIVE_DEMO
          </Link>
          <button disabled className="px-10 py-4 border border-white/20 text-white/30 font-black uppercase text-[10px] tracking-widest cursor-not-allowed">
            PRIVATE_ARC
          </button>
        </div>
      </div>

      {/* SCENE 8: FINAL CTA */}
      <div ref={s8Ref} className="absolute z-[9001] w-full max-w-5xl px-10 pointer-events-auto flex flex-col items-center" style={{ opacity: 0 }}>
        <h4 className="text-5xl md:text-7xl font-black uppercase text-white tracking-[0.1em] mb-4 font-heading">SYSTEM READY</h4>
        <p className="system-label mb-16">SELECT OPERATIONAL ACTION TO PROCEED</p>
        
        <div className="flex flex-col sm:flex-row gap-8 w-full md:w-auto">
          <button 
            onClick={() => setRecruiterMode(true)}
            className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-white/90 transition-all w-full md:w-auto"
          >
            RECRUITER_MODE
          </button>
          <Link 
            href="/prathams-os"
            target="_blank"
            className="px-10 py-5 border border-white/30 text-white font-black uppercase text-xs tracking-widest hover:border-white transition-all w-full md:w-auto text-center"
          >
            DEVELOPER_OS
          </Link>
        </div>
      </div>

      {/* Persistent Bottom Right Recruiter Mode Button */}
      <div className="fixed bottom-10 right-10 z-[9999]">
        <button
          onClick={() => setRecruiterMode(true)}
          className="pointer-events-auto flex items-center gap-3 px-6 py-4 bg-black/60 backdrop-blur-xl border border-[#fbbf24]/30 text-white font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-[#fbbf24] hover:text-black transition-all duration-300 rounded shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] group"
        >
          <Terminal size={16} className="group-hover:animate-pulse" />
          ENTER RECRUITER MODE
        </button>
      </div>

    </div>
  );
});

export default CinematicOverlay;
