'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import InfraStatus from '@/components/InfraStatus';
import SystemStatus from '@/components/SystemStatus';
import { useTarsStore } from '../../store/useTarsStore';
import { Github, Linkedin, FileText, ExternalLink, Mail, Terminal } from 'lucide-react';

/* ─────────────────────────────────────────────
   ARCHITECTURE DIAGRAM COMPONENT
   ───────────────────────────────────────────── */
const archNodes = [
  { id: 'client', label: 'Frontend Nexus', desc: 'High-fidelity Next.js interface with real-time terminal emulation and system status integration.', tech: 'Next.js 14 • Framer Motion • Tailwind' },
  { id: 'cicd', label: 'Jenkins Pipelines', desc: 'End-to-end CI/CD automating multi-stage Docker builds and rollout transitions to production.', tech: 'Jenkins • Docker • Shell' },
  { id: 'api', label: 'FastAPI Engine', desc: 'Async Python microservices handling secure backend logic and automated telemetry exports.', tech: 'Python 3.11 • FastAPI • JWT' },
  { id: 'orchestration', label: 'Kubernetes Cluster', desc: 'Production orchestration with automated scaling (HPA), self-healing, and ingress routing.', tech: 'K8s • EKS • LoadBalancer' },
  { id: 'db', label: 'PostgreSQL RDS', desc: 'Persistent relational storage with connection pooling for high-concurrency engineering data.', tech: 'PostgreSQL • SQLAlchemy' },
  { id: 'observability', label: 'Metrics Stack', desc: 'Comprehensive monitoring with real-time logging, metrics scraping, and Grafana dashboards.', tech: 'Prometheus • Grafana' },
];

function ArchitectureDiagram({ isRecruiterMode = false }: { isRecruiterMode?: boolean }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0 relative">
      {!isRecruiterMode && <div className="absolute left-[7px] top-6 bottom-6 w-[1px] bg-white/10" />}
      
      {archNodes.map((node, i) => (
        <div key={node.id} className="relative z-10">
          <div
            className={`cursor-pointer transition-all duration-300 py-4 ${activeNode === node.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full border border-white/20 flex items-center justify-center transition-all ${activeNode === node.id ? 'border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : ''}`}>
                  <div className={`w-1 h-1 rounded-full bg-white ${activeNode === node.id ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  {node.label}
                </h4>
              </div>
              <span className="system-label text-white/20">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            {activeNode === node.id && (
              <motion.div
                initial={isRecruiterMode ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 ml-7 space-y-2"
              >
                <p className="text-xs text-gray-400 leading-relaxed font-light">{node.desc}</p>
                <p className="text-[9px] text-white/40 font-mono font-medium tracking-[0.2em] uppercase">{node.tech}</p>
              </motion.div>
            )}
          </div>
          {i < archNodes.length - 1 && (
            <div className="ml-[6px] h-6 w-[1px] bg-white/5" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   INFRASTRUCTURE LAYER COMPONENT
   ───────────────────────────────────────────── */
const infraLayers = [
  {
    id: 'request',
    num: '01',
    title: 'User Request',
    subtitle: 'Where it all begins',
    desc: 'Every interaction starts with an HTTP request. Our edge layer handles SSL termination, rate limiting, and geographic routing before the request reaches the application.',
    skills: ['HTTPS', 'DNS', 'CDN', 'Edge Computing'],
    color: 'from-blue-500/10 to-transparent',
  },
  {
    id: 'api',
    num: '02',
    title: 'API Gateway',
    subtitle: 'FastAPI Backend Service',
    desc: 'Async Python API handling request validation, business logic, and response serialization. Auto-generates OpenAPI documentation. Handles 10K+ requests/sec with sub-50ms p99 latency.',
    skills: ['Python', 'FastAPI', 'REST APIs', 'Pydantic', 'Uvicorn'],
    color: 'from-indigo-500/10 to-transparent',
  },
  {
    id: 'container',
    num: '03',
    title: 'Container Layer',
    subtitle: 'Docker Isolation',
    desc: 'Multi-stage Docker builds with minimal base images. Each service runs in an isolated container with defined resource limits, health checks, and restart policies.',
    skills: ['Docker', 'Multi-stage Builds', 'Alpine Linux', 'Docker Compose'],
    color: 'from-cyan-500/10 to-transparent',
  },
  {
    id: 'orchestration',
    num: '04',
    title: 'Orchestration',
    subtitle: 'Kubernetes Cluster',
    desc: 'Declarative infrastructure with automated scaling, rolling deployments, and self-healing. Services communicate via internal DNS with mTLS encryption.',
    skills: ['Kubernetes', 'Helm', 'Ingress', 'HPA', 'Service Mesh'],
    color: 'from-purple-500/10 to-transparent',
  },
  {
    id: 'database',
    num: '05',
    title: 'Database Layer',
    subtitle: 'Persistent Storage',
    desc: 'ACID-compliant PostgreSQL with connection pooling, query optimization, and automated backup schedules. SQLAlchemy ORM provides type-safe data access.',
    skills: ['PostgreSQL', 'SQLAlchemy', 'Alembic', 'Connection Pooling'],
    color: 'from-emerald-500/10 to-transparent',
  },
  {
    id: 'monitoring',
    num: '06',
    title: 'Observability',
    subtitle: 'Monitoring & DevOps',
    desc: 'Full-stack observability with metrics collection, log aggregation, and alerting. CI/CD pipelines automate testing, building, and deployment on every push.',
    skills: ['Prometheus', 'Grafana', 'Jenkins', 'CI/CD', 'Terraform'],
    color: 'from-orange-500/10 to-transparent',
  },
];

function InfraLayer({ layer, index }: { layer: typeof infraLayers[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="infra-layer border-b border-white/[0.03]"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="infra-layer-content py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="font-heading text-6xl md:text-8xl font-black text-white/5 leading-none">{layer.num}</span>
              <div>
                <h3 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight uppercase">{layer.title}</h3>
                <p className="system-label mt-2">{layer.subtitle}</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-lg font-light">{layer.desc}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {layer.skills.map(skill => (
              <span key={skill} className="px-4 py-2 border border-white/5 bg-white/[0.02] text-[10px] font-mono text-gray-500 uppercase tracking-widest">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SKILLS SECTION
   ───────────────────────────────────────────── */
const skillCategories = [
  { title: 'Languages', icon: '⟨/⟩', skills: ['Python', 'Shell', 'TypeScript'] },
  { title: 'Backend', icon: '⚡', skills: ['FastAPI', 'REST APIs', 'SQLAlchemy', 'JWT Auth'] },
  { title: 'DevOps', icon: '☸', skills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Jenkins'] },
  { title: 'Tools', icon: '⚙', skills: ['Git', 'Linux', 'PostgreSQL', 'Prometheus', 'Grafana'] },
];

/* ─────────────────────────────────────────────
   MAIN LANDING PAGE
   ───────────────────────────────────────────── */
export default function LandingPage() {
  const { isRecruiterMode, setRecruiterMode } = useTarsStore();
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms for hero background
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className={`relative bg-black text-white selection:bg-white/20 overflow-x-hidden ${isRecruiterMode ? 'recruiter-view' : ''}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center px-6 md:px-20 lg:px-32 bg-black overflow-hidden pt-24 md:pt-20">
        {!isRecruiterMode && (
          <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
            <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-[#0b1120]/90 to-[#0b1120] z-10" />
            <img
              src="/hero_arch.png"
              alt=""
              className="w-full h-full object-cover opacity-10 grayscale"
            />
          </motion.div>
        )}

        <motion.div
          className="relative z-10 flex flex-col"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-heading text-6xl md:text-9xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              Pratham<br />
              <span className="text-white/20">Vishwakarma</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 space-y-6"
          >
            <div className="flex flex-col gap-4">
              <p className="font-heading text-xl md:text-3xl font-bold text-white/80 leading-tight uppercase tracking-tight">
                Backend & DevOps Engineer
              </p>
              <div className="cinematic-line w-32" />
              <p className="system-label">NODE: SDE-1 @ JIO PLATFORMS // 2026</p>
            </div>

            <p className="font-heading text-sm md:text-lg text-gray-400 max-w-2xl font-light">
              Building automation systems and scalable backend microservices.
            </p>
            
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
              <p className="system-label text-white/40">
                Python • FastAPI • Docker • Kubernetes • Jenkins
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4 text-white/40">
              <a href="https://github.com/prathamvish333" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Github size={18} />
                <span className="text-[10px] font-bold tracking-widest uppercase hidden md:inline group-hover:underline font-mono">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/prathamvishwakarma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Linkedin size={18} />
                <span className="text-[10px] font-bold tracking-widest uppercase hidden md:inline group-hover:underline font-mono">LinkedIn</span>
              </a>
              <a href="mailto:prathamvishwakarma2000@gmail.com" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Mail size={18} />
                <span className="text-[10px] font-bold tracking-widest uppercase hidden md:inline group-hover:underline font-mono">Email</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {isRecruiterMode && (
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setRecruiterMode(false)} className="px-6 py-4 bg-white text-black hover:bg-white/90 font-heading text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3">
                  <span>CINEMATIC_RECOVERY</span>
                  <ExternalLink size={14} />
                </button>
                <Link href="/prathams-os" target="_blank" className="px-6 py-4 border border-white/10 hover:border-white text-white rounded font-heading text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3">
                  <span>DEVELOPER_OS</span>
                  <Terminal size={14} />
                </Link>
              </div>
            )}
            <a href="/Prathams_Resume.pdf" download className="px-6 py-4 border border-white/10 hover:border-white text-white font-heading text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3">
              <FileText size={14} />
              <span>DOWNLOAD_RESUME</span>
            </a>
            <div className="flex gap-4">
              <a href="#experience" className="px-6 md:px-8 py-4 md:py-5 border border-white/10 hover:border-white bg-white/[0.02] font-heading text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all text-white/60 hover:text-white">
                EXPERIENCE
              </a>
              <a href="#projects" className="px-6 md:px-8 py-4 md:py-5 border border-white/10 hover:border-white bg-white/[0.02] font-heading text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all text-white/60 hover:text-white">
                PROJECTS
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <span className="font-heading text-[10px] text-gray-600 tracking-[0.5em] uppercase font-bold">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-teal-500/50 to-transparent" />
        </motion.div>
        
        <div className="section-divider mt-24 opacity-50" />
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container">
        <div className="max-w-6xl mx-auto">
          <header className="section-header">
            <span className="section-subtitle">Professional Path</span>
            <h2 className="section-title">Experience</h2>
            <div className="section-underline" />
          </header>

          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="surface-card p-8 md:p-12 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <img src="/jio_logo.png" alt="" className="w-32 md:w-48 grayscale" />
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                  <h3 className="font-heading text-2xl md:text-4xl font-black text-white uppercase tracking-tight">Software Development Engineer I</h3>
                  <p className="font-heading text-base md:text-xl text-teal-500 font-bold mt-2">Jio Platforms Limited</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20">
                  <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest">Dec 2023 — Present</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3 space-y-8">
                  <div>
                    <h4 className="font-heading text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Core Focus: CloudXP Platform</h4>
                    <ul className="space-y-6">
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
                        <div>
                          <p className="text-[#e5e7eb] font-bold md:text-lg mb-1">Python Automation Workflows</p>
                          <p className="text-[#9ca3af] text-sm md:text-base leading-relaxed">Built robust Python-based automation for hybrid cloud infrastructure, reducing manual provisioning time by over 40%.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
                        <div>
                          <p className="text-[#e5e7eb] font-bold md:text-lg mb-1">Backend Engineering</p>
                          <p className="text-[#9ca3af] text-sm md:text-base leading-relaxed">Developed core backend components for the CloudXP automation engine using async Python patterns to handle scale.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
                        <div>
                          <p className="text-[#e5e7eb] font-bold md:text-lg mb-1">Container Orchestration</p>
                          <p className="text-[#9ca3af] text-sm md:text-base leading-relaxed">Managing containerized workloads and deployment pipelines across multi-region Kubernetes clusters for production resiliency.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-[#0b1120]/50 rounded-2xl p-6 border border-white/5 h-full">
                    <h4 className="font-heading text-[10px] font-black text-teal-500 uppercase tracking-[0.3em] mb-6">Tech Environment</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'FastAPI', 'Docker', 'Kubernetes', 'Cloud Automation', 'CI/CD', 'API Design'].map(tech => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-bold text-gray-400 capitalize">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider opacity-50" />

      {/* Projects Section */}
      <section id="projects" className="section-container bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-24">
            <p className="system-label text-white/40 mb-4">PRODUCTION_ARCHIVES</p>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">Engineering<br/><span className="text-white/10">Case Studies.</span></h2>
          </header>

          <div className="space-y-40">
            {/* Project 01: Notes Studio */}
            <div className="group relative">
              <span className="absolute -left-12 top-0 text-[10rem] font-black text-white/[0.01] leading-none select-none pointer-events-none hidden lg:block font-heading">01</span>
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-12 space-y-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="system-label text-white/60 bg-white/5 px-3 py-1 rounded">CLOUD_NATIVE</span>
                    <span className="system-label text-white/40 border border-white/10 px-3 py-1 rounded">K8S_ORCHESTRATION</span>
                  </div>
                  <h3 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tight group-hover:text-white/80 transition-colors">Notes Studio<span className="text-white/20">.</span></h3>
                  
                    <div className="grid md:grid-cols-2 gap-12 border-t border-white/10 pt-8">
                      <div className="space-y-4">
                        <h4 className="system-label">The Core Challenge</h4>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base pr-8 font-light">
                          Fragmentation in deployment and manual infrastructure scaling hindered system reliability. I engineered a solution that moves beyond simple code to a resilient, automated foundation.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="system-label">System Architecture</h4>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base border-l border-white/10 pl-8 font-light">
                          Containerized 3-tier stack orchestrated via <span className="text-white">Kubernetes</span>. Integrated <span className="text-white">Jenkins</span> CI/CD and a full <span className="text-white">Prometheus & Grafana</span> observability suite.
                        </p>
                      </div>
                    </div>

                    {/* Restored Architecture Diagram */}
                    <div className="pt-12">
                      <h4 className="system-label mb-8">Architecture Specification</h4>
                      <ArchitectureDiagram isRecruiterMode={isRecruiterMode} />
                    </div>

                  <div className="flex flex-wrap gap-8 pt-8">
                    <Link href={process.env.NEXT_PUBLIC_NOTES_URL || 'http://localhost:3001'} target="_blank" className="px-10 py-5 bg-white text-black hover:bg-white/90 font-heading text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-3">
                      <span>LIVE_DEPLOYMENT</span>
                      <ExternalLink size={14} />
                    </Link>
                    <Link href="https://github.com/prathamvish333/Notes-Studio" target="_blank" className="px-10 py-5 border border-white/20 hover:border-white text-white font-heading text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-3">
                      <span>SOURCE_MANIFESTS</span>
                      <Github size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 02: Yashasvi Duniya */}
            <div className="group relative">
              <span className="absolute -left-12 top-0 text-[10rem] font-black text-white/[0.01] leading-none select-none pointer-events-none hidden lg:block font-heading">02</span>
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-12 space-y-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="system-label text-white/60 bg-white/5 px-3 py-1 rounded">HIGH_TRAFFIC</span>
                    <span className="system-label text-white/40 border border-white/10 px-3 py-1 rounded">EDGE_CACHING</span>
                  </div>
                  <h3 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tight group-hover:text-white/80 transition-colors">Yashasvi Duniya<span className="text-white/20">.</span></h3>
                  
                  <div className="grid md:grid-cols-2 gap-12 border-t border-white/10 pt-8">
                    <div className="space-y-4">
                      <h4 className="system-label">Performance Optimization</h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base pr-8 font-light">
                        Serving millions of requests in real-time requires aggressive caching and backend stability. Optimized WordPress core with <span className="text-white">Redis</span> and high-performance CDN layers.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="system-label">Delivery Algorithm</h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base border-l border-white/10 pl-8 font-light">
                        Integrated real-time news delivery algorithms with high-fidelity frontend rendering, ensuring critical traffic loads remain stable during peak surges.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-8 pt-8">
                    <Link href="https://yashasviduniya.com" target="_blank" className="px-10 py-5 bg-white text-black hover:bg-white/90 font-heading text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-3">
                      <span>LAUNCH_PORTAL</span>
                      <ExternalLink size={14} />
                    </Link>
                    <button disabled className="px-10 py-5 border border-white/5 text-gray-700 font-heading text-[10px] font-black tracking-widest uppercase flex items-center gap-3 cursor-not-allowed">
                      <span>PRIVATE_ARCHIVE</span>
                      <Github size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Telemetry Section */}
          <div className="mt-40 pt-20 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="system-label text-white/40 mb-2">Live Observability</p>
                <h3 className="font-heading text-4xl md:text-6xl font-black text-white uppercase tracking-tight">System Telemetry</h3>
              </div>
              <div className="flex items-center gap-3 pr-4">
                <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                <p className="system-label text-white/40 font-bold">ACTIVE_NODES: 03</p>
              </div>
            </div>
            <InfraStatus />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container">
        <div className="max-w-6xl mx-auto">
          <header className="section-header">
            <span className="section-subtitle">Technical domain</span>
            <h2 className="section-title">Skills</h2>
            <div className="section-underline" />
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {skillCategories.map((cat, i) => (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="surface-card p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl text-teal-500">{cat.icon}</span>
                  <h4 className="font-heading text-sm font-black text-[#e5e7eb] tracking-widest uppercase">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="skill-badge text-[11px] bg-[#111827] border-white/5">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-30 bg-[#0b0f19] py-24 px-6 md:px-20 lg:px-32 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <header className="section-header !mb-12">
            <span className="section-subtitle !text-center">Get in touch</span>
            <h2 className="font-heading text-5xl md:text-8xl font-black text-[#e5e7eb] leading-none tracking-tighter uppercase">Let&apos;s Build</h2>
          </header>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8">
            <a href="mailto:prathamvishwakarma2000@gmail.com" className="font-heading text-sm font-bold tracking-[0.3em] uppercase text-[#9ca3af] hover:text-[#0d9488] transition-colors">
              Email
            </a>
            <a href="https://github.com/prathamvish333" target="_blank" className="font-heading text-sm font-bold tracking-[0.3em] uppercase text-[#9ca3af] hover:text-[#0d9488] transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/prathamvishwakarma" target="_blank" className="font-heading text-sm font-bold tracking-[0.3em] uppercase text-[#9ca3af] hover:text-[#0d9488] transition-colors">
              LinkedIn
            </a>
            <Link href="/engineering" className="font-heading text-sm font-bold tracking-[0.3em] uppercase text-[#9ca3af] hover:text-[#0d9488] transition-colors">
              Engineering
            </Link>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <p className="font-heading text-[10px] text-gray-600 tracking-[0.5em] uppercase font-bold">PRATHAM VISHWAKARMA</p>
              <p className="text-[10px] text-gray-500 mt-2">SDE-1 @ Jio Platforms • 2026</p>
            </div>
            <a href="/Prathams_Resume.pdf" download className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-heading text-[10px] font-bold tracking-widest uppercase transition-all">
              Download Resume ↓
            </a>
          </div>
        </div>
      </footer>
      <SystemStatus />
    </main>
  );
}
