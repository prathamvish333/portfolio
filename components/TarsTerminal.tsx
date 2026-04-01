'use client';

import React from 'react';
import { useTarsStore } from '../store/useTarsStore';
import { Download, Terminal } from 'lucide-react';

const resumeData = {
  profile: {
    name: "Pratham Vishwakarma",
    role: "System Architect & DevOps Engineer",
    status: "SDE-1 @ Jio Platforms",
    location: "Mumbai, India",
    objective: "Building highly scalable, fault-tolerant infrastructure and backend systems for production enterprises."
  },
  experience: [
    {
      company: "Jio Platforms Limited",
      position: "Software Development Engineer I",
      period: "Dec 2023 — Present",
      highlights: [
        "Built robust Python-based automation for hybrid cloud infrastructure, reducing manual provisioning time by over 40%.",
        "Developed core backend components for the CloudXP automation engine using async Python patterns to handle scale.",
        "Managing multi-region Kubernetes clusters for production resiliency and automated scaling.",
      ]
    }
  ],
  skills: {
    "Languages": ["Python", "TypeScript", "Shell", "SQL", "Go"],
    "Backend Core": ["FastAPI", "RESTful APIs", "Node.js", "Redis", "PostgreSQL"],
    "DevOps & Cloud": ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD (Jenkins)"],
    "Telemetry": ["Prometheus", "Grafana", "ELK Stack"],
  },
  projects: [
    {
      name: "Notes-Studio",
      description: "Containerized 3-tier platform with FastAPI, PostgreSQL, and AI-agent integrations deployed on Kubernetes."
    },
    {
      name: "Yashasvi Duniya Portal",
      description: "High-available production news portal with advanced edge caching and CMS orchestration."
    }
  ]
};

export default function RecruiterSimpleUI() {
  const { toggleRecruiterMode } = useTarsStore();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans font-light selection:bg-teal-500 selection:text-white">
      
      {/* Navbar directly from Notes-Studio-PROD style */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="font-bold tracking-tighter text-lg text-white group cursor-default">
          PRATHAM<span className="text-teal-500">.</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="/Prathams_Resume.pdf" 
            download
            className="hidden md:flex bg-white/5 hover:bg-teal-500/10 border border-white/10 hover:border-teal-500/30 text-xs px-4 py-2 rounded uppercase tracking-widest font-semibold transition-all"
          >
            Download Resume
          </a>
          <button 
            onClick={toggleRecruiterMode}
            className="flex items-center gap-2 bg-teal-500 border border-teal-400 text-black shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all uppercase tracking-widest text-[10px] font-bold px-4 py-2 rounded"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Let's begin interstellar journey
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">
        
        {/* HERO SECTION */}
        <section className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            {resumeData.profile.name}
          </h1>
          <h2 className="text-xl md:text-2xl text-teal-400 font-medium tracking-tight">
            {resumeData.profile.role}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {resumeData.profile.objective}
          </p>
          <div className="pt-6 flex gap-4">
             <a href="mailto:contact@prathamvishwakarma.com" className="border border-white/20 hover:border-white/50 px-6 py-3 rounded text-sm tracking-wide transition-colors">
               Contact Me
             </a>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-4">Experience</h3>
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 shrink-0">
                <p className="text-gray-400 text-sm">{exp.period}</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white">{exp.position}</h4>
                <p className="text-teal-400 font-medium">{exp.company}</p>
                <ul className="space-y-2 list-disc list-outside ml-4 text-gray-400 text-sm leading-relaxed pt-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* PROJECTS SECTION */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-4">Selected Systems</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {resumeData.projects.map(proj => (
              <div key={proj.name} className="p-6 border border-white/10 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <h4 className="text-lg font-bold text-white mb-2">{proj.name}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-4">Technologies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">{category}</h4>
                <ul className="space-y-2">
                  {skills.map(s => (
                    <li key={s} className="text-sm text-gray-400">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-12 pb-24 text-center">
            <p className="text-gray-500 text-sm">Pratham Vishwakarma © {new Date().getFullYear()}</p>
            <p className="text-gray-600 text-xs mt-2">Running Portfolio System v2</p>
        </footer>

      </main>
    </div>
  );
}
