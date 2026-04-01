'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Cpu, Github, Linkedin, Mail, ArrowLeft } from 'lucide-react';

export default function AboutTechnical() {
  return (
    <main className="min-h-screen bg-black text-[#e5e7eb] px-6 py-24 md:py-32 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/" className="group flex items-center gap-3 nasa-text text-[#0d9488] hover:text-white transition-colors">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            [ RETURN_TO_BRIDGE ]
          </Link>
        </motion.div>

        {/* Header */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#fbbf24]" />
            <span className="nasa-text text-[#fbbf24]">System_Profile_v3.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            PRATHAM<br />
            <span className="text-gray-800">VISHWAKARMA</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm uppercase leading-relaxed max-w-2xl">
            SDE-1 at Jio Platforms. Specializing in high-concurrency backend services, cloud-native orchestration, and automated infrastructure lifecycle management.
          </p>
        </section>

        {/* Technical Specs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Identity Core */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="nasa-card space-y-8"
          >
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <Shield className="text-[#0d9488]" size={20} />
              <h3 className="nasa-text text-white">Identity_Core</h3>
            </div>
            
            <div className="space-y-6 font-mono text-[11px] uppercase tracking-wider font-bold">
              <div className="flex justify-between">
                <span className="text-gray-600">Assignee:</span>
                <span className="text-gray-200">Pratham Vishwakarma</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Designation:</span>
                <span className="text-gray-200 text-right">Backend & DevOps Eng</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active_Sector:</span>
                <span className="text-[#fbbf24]">Jio Platforms Ltd</span>
              </div>
            </div>

            <div className="pt-6 flex gap-6">
              <a href="https://github.com/prathamvish333" target="_blank" className="text-gray-500 hover:text-[#0d9488] transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/prathamvishwakarma" target="_blank" className="text-gray-500 hover:text-[#0d9488] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:prathamvishwakarma2000@gmail.com" className="text-gray-500 hover:text-[#0d9488] transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* System Specs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="nasa-card space-y-8"
          >
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <Cpu className="text-[#fbbf24]" size={20} />
              <h3 className="nasa-text text-white">System_Specs</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { label: "Arch", val: "3-Tier Containerized" },
                { label: "Logic", val: "FastAPI / Python 3.11" },
                { label: "Orch", val: "Kubernetes / Docker" },
                { label: "State", val: "PostgreSQL" }
              ].map(spec => (
                <div key={spec.label} className="flex flex-col gap-1">
                  <span className="nasa-text text-[8px] text-gray-700">{spec.label}_MOD</span>
                  <span className="font-mono text-[10px] text-gray-300 uppercase font-black">{spec.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Narrative / Context */}
        <section className="pt-20 border-t border-white/5 space-y-12">
          <div className="max-w-2xl space-y-8">
            <h2 className="nasa-text text-[#fbbf24] text-xs">Mission_Log // 2026</h2>
            <p className="text-gray-400 font-mono text-sm leading-relaxed uppercase font-bold">
              Pratham&apos;s digital architecture is a production-grade portfolio designed to demonstrate the intersection of scalable backend engineering and high-fidelity user experiences. Built with a focus on observability, automation, and cinematic performance.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="nasa-button" onClick={() => window.print()}>
              [ EXPORT_DOSS ]
            </button>
            <Link href="/" className="nasa-button">
              [ ACCESS_WORMHOLE ]
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
