'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Terminal } from 'lucide-react';

const articles = [
  {
    id: '01',
    title: 'Designing JWT Authentication with FastAPI',
    date: '2025-02-15',
    tags: ['FASTAPI', 'JWT', 'SECURITY'],
    summary: 'A comprehensive guide to implementing stateless, secure authentication using JSON Web Tokens. Covers password hashing with bcrypt, token lifecycle management, and middleware integration for route protection.',
    readTime: '8 MIN READ',
  },
  {
    id: '02',
    title: 'Containerizing Python APIs with Docker',
    date: '2025-01-20',
    tags: ['DOCKER', 'DEVOPS', 'PYTHON'],
    summary: 'Best practices for creating efficient, production-ready Docker images for Python applications. Explores multi-stage builds, non-root user security, and managing dependencies with poetry or pip.',
    readTime: '6 MIN READ',
  },
  {
    id: '03',
    title: 'Deploying Backend Services with Kubernetes',
    date: '2024-12-10',
    tags: ['K8S', 'ORCHESTRATION', 'SCALING'],
    summary: 'Scaling distributed backend services on Kubernetes. Walkthrough of defining deployment manifests, service discovery, persistent volumes, and health monitoring via Prometheus.',
    readTime: '12 MIN READ',
  },
];

export default function EngineeringTechnical() {
  const [showSoon, setShowSoon] = useState(false);

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
            <span className="nasa-text text-[#fbbf24]">Technical_Logs_v1.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            ENGINEERING<br />
            <span className="text-gray-800">INSIGHTS</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm uppercase leading-relaxed max-w-2xl font-bold">
            Technical write-ups on high-availability architecture, cloud-native deployments, and backend engineering decisions.
          </p>
        </section>

        {/* Article Listing */}
        <div className="space-y-4">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="nasa-card group hover:bg-white/[0.01] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="nasa-text text-[#fbbf24] text-[8px]">{article.id}_LOG</span>
                    <span className="nasa-text text-gray-700 text-[8px]">{article.date}</span>
                    <span className="nasa-text text-gray-700 text-[8px]">{article.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-[#0d9488] transition-colors tracking-tight">
                    {article.title}
                  </h2>
                  <p className="font-mono text-[10px] text-gray-500 uppercase leading-relaxed font-bold max-w-2xl">
                    {article.summary}
                  </p>
                  <div className="flex gap-4 pt-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="nasa-text text-[7px] text-[#0d9488] border border-[#0d9488]/20 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setShowSoon(true)}
                  className="nasa-button self-start md:self-center"
                >
                  [ READ_LOG ]
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <footer className="pt-20 border-t border-white/5 text-center">
          <p className="nasa-text text-gray-800">
            Systems & Infrastructure Logs • Updated Weekly • Mission_2026
          </p>
        </footer>

        {/* Coming Soon Overlay snippet */}
        {showSoon && (
          <div className="fixed bottom-10 right-10 z-50 nasa-card border-[#fbbf24]/50 bg-black/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <Terminal size={16} className="text-[#fbbf24]" />
              <p className="nasa-text text-white text-[9px]">Module_Restricted: Content currently under peer review.</p>
              <button onClick={() => setShowSoon(false)} className="text-gray-500 hover:text-white px-2">✕</button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
