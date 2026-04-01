'use client';

import React, { useState, useEffect } from 'react';
import { useTarsStore } from '../store/useTarsStore';
import { Activity, ShieldCheck, Download, Zap, Cpu, Wifi } from 'lucide-react';

const resumeData = {
  profile: {
    name: "PRATHAM VISHWAKARMA",
    role: "BACKEND & DEVOPS ENGINEER",
    status: "SDE-1 @ JIO PLATFORMS",
    location: "MUMBAI, INDIA",
  },
  fastFacts: [
    { label: "CORE", val: "PYTHON / FASTAPI" },
    { label: "INFRA", val: "K8S / TERRAFORM" },
    { label: "OPS", val: "CI / CD / JENKINS" }
  ],
  experience: [
    {
      company: "JIO PLATFORMS LIMITED",
      position: "SOFTWARE DEVELOPMENT ENGINEER I",
      period: "DEC 2023 — PRESENT",
      focus: "CLOUDXP PLATFORM",
      highlights: [
        "Built robust Python-based automation for hybrid cloud infrastructure, reducing manual provisioning time by over 40%.",
        "Developed core backend components for the CloudXP automation engine using async Python patterns to handle scale.",
        "Managing multi-region Kubernetes clusters for production resiliency and automated scaling.",
      ]
    }
  ],
  skills: {
    languages: ["PYTHON", "SHELL", "TYPESCRIPT", "SQL"],
    backend: ["FASTAPI", "REST APIS", "SQLALCHEMY", "JWT AUTH"],
    devops: ["DOCKER", "KUBERNETES", "TERRAFORM", "CI/CD", "JENKINS"],
    telemetry: ["PROMETHEUS", "GRAFANA"],
  }
};

export default function TarsTerminal() {
  const { toggleTarsMode } = useTarsStore();
  const [latency, setLatency] = useState(24);

  // Simulated health ping
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (45 - 18) + 18));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tars-terminal scrollbar-hide crt-effect min-h-screen bg-black text-white p-4 font-mono relative overflow-x-hidden">
      
      {/* Top Protocol Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/90 border-b border-white/10 px-8 py-4 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#fbbf24] animate-pulse" />
            <span className="nasa-text text-[10px] tracking-[0.3em] font-black">TARS_OS_v4.2</span>
          </div>
          <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-green-500" />
              <span className="text-[8px] text-gray-500">PING: {latency}MS</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi size={12} className="text-blue-500" />
              <span className="text-[8px] text-gray-500">LINK: STABLE</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={toggleTarsMode}
          className="nasa-button !text-[#fbbf24] !border-[#fbbf24]/20 hover:!bg-[#fbbf24]/10"
        >
          [ RE-INIT_CINEMATIC_FEED ]
        </button>
      </header>

      <div className="mt-32 max-w-5xl mx-auto space-y-24 pb-40">
        
        {/* Profile & Fast Facts */}
        <section className="grid lg:grid-cols-[1fr_300px] gap-20">
          <div className="space-y-6">
            <p className="text-gray-600 tracking-[0.6em] text-[8px] mb-2 uppercase">/ PERSO_ID_ENCRYPTED</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic selection:bg-white selection:text-black">
              {resumeData.profile.name}
            </h1>
            <div className="flex items-center gap-4">
               <ShieldCheck size={16} className="text-[#fbbf24]" />
               <p className="text-[12px] font-black uppercase tracking-widest text-[#fbbf24]">
                 SECURE_ACCESS_GRANTED // {resumeData.profile.status}
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 border-l border-white/10 pl-8">
            {resumeData.fastFacts.map(fact => (
              <div key={fact.label} className="py-2">
                <span className="text-[8px] text-gray-600 block mb-1">{fact.label}</span>
                <span className="text-[10px] font-black text-white">{fact.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Action: Resume */}
        <section className="flex justify-center py-12">
          <a 
            href="/Prathams_Resume.pdf" 
            download
            className="group relative flex items-center gap-8 border-2 border-white p-10 hover:bg-white transition-all duration-500 w-full justify-center"
          >
            <Download className="text-white group-hover:text-black transition-colors" size={40} />
            <div className="text-left">
              <span className="nasa-text text-[10px] group-hover:text-black block mb-1">DOWNLOAD_SECURE_DOSS</span>
              <span className="text-3xl md:text-5xl font-black group-hover:text-black uppercase tracking-tight">EXECUTE: DOWNLOAD.PDF</span>
            </div>
            <div className="absolute top-2 right-4 text-[8px] text-gray-600 group-hover:text-black/40">CRC_CHECK: VAL_0x992</div>
          </a>
        </section>

        {/* Experience Log */}
        <section className="space-y-12">
          <h2 className="text-gray-600 tracking-[0.6em] text-[8px] uppercase">/ EXPERIENCE_ARCHIVES</h2>
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="border border-white/10 p-10 space-y-10 hover:bg-white/[0.02] transition-colors">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/10 pb-8">
                <div>
                  <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{exp.position}</h3>
                  <p className="text-[#fbbf24] text-[11px] mt-2 font-black tracking-widest">{exp.company}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 font-mono tracking-tighter italic">{exp.period}</span>
                  <div className="flex items-center gap-2 mt-2 justify-end">
                    <Cpu size={12} className="text-blue-400" />
                    <span className="text-[9px] text-gray-600 uppercase">NODE: {exp.focus}</span>
                  </div>
                </div>
              </div>
              <ul className="grid md:grid-cols-1 gap-6">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex gap-6 items-start">
                    <span className="text-[#fbbf24] font-black mt-1">PROT_{j}</span>
                    <p className="text-gray-400 leading-relaxed text-[12px] uppercase font-bold tracking-tight">{h}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skill Matrix */}
        <section className="space-y-12">
          <h2 className="text-gray-600 tracking-[0.6em] text-[8px] uppercase">/ TECH_CAPABILITY_MATRIX</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
            {Object.entries(resumeData.skills).map(([key, list]) => (
              <div key={key} className="border border-white/10 p-8 hover:border-[#fbbf24]/50 transition-colors">
                <h4 className="text-[#fbbf24] mb-8 text-[10px] tracking-widest font-black uppercase flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#fbbf24]" />
                  {key}
                </h4>
                <div className="flex flex-col gap-3">
                  {list.map(s => (
                    <div key={s} className="flex items-center justify-between text-[11px] font-black text-gray-500 group cursor-default">
                      <span className="group-hover:text-white transition-colors">{">>"} {s}</span>
                      <span className="text-[8px] opacity-0 group-hover:opacity-100 text-[#fbbf24] transition-opacity">OK</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-24 text-center">
           <div className="flex justify-center gap-20 mb-12">
             <div className="text-left">
               <span className="text-[8px] text-gray-800 block">CORE_VERSION</span>
               <span className="text-[10px] font-black text-gray-600">v2026.4.1</span>
             </div>
             <div className="text-left">
               <span className="text-[8px] text-gray-800 block">STATUS</span>
               <span className="text-[10px] font-black text-green-900 tracking-widest">LIVE_OPERATIONAL</span>
             </div>
           </div>
           <p className="text-[8px] tracking-[1.5em] text-gray-900 font-black uppercase">SYSTEM_STABLE // NO_ERRORS_DETECTED</p>
        </footer>
      </div>
    </div>
  );
}
