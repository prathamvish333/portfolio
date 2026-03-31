'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOS } from '../context/OSContext';

const navItems = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Engineering', href: '/engineering' },
  { name: 'Notes Demo', href: '/notes' },
];

export default function Navbar() {
  const { isRecruiterMode, setRecruiterMode } = useOS();
  const { scrollY } = useScroll();
  const [activeSegment, setActiveSegment] = useState('');
  
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(5, 7, 13, 0)', 'rgba(5, 7, 13, 0.95)']
  );
  
  const navPadding = useTransform(
    scrollY,
    [0, 100],
    ['1.5rem', '1rem']
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'projects', 'skills'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSegment(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      style={{
        backgroundColor: navBg,
        paddingTop: navPadding,
        paddingBottom: navPadding,
      }}
      className="fixed top-0 inset-x-0 z-50 nav-blur px-6 md:px-20 lg:px-32 flex items-center justify-between transition-all duration-500 border-b border-transparent data-[scroll=true]:border-white/5"
      data-scroll={scrollY.get() > 50}
    >
      <Link href="/" className="font-space text-lg font-black tracking-tighter text-[#e5e7eb] group">
        PRATHAM<span className="text-[#fbbf24] transition-all group-hover:text-[#22d3ee]">.</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-space text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all selection:bg-[#fbbf24] ${
              activeSegment === item.href.replace('#', '') 
                ? 'text-[#fbbf24] opacity-100' 
                : 'text-gray-400 opacity-60 hover:opacity-100 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}

        <button
          onClick={() => setRecruiterMode(!isRecruiterMode)}
          className={`flex items-center gap-3 px-5 py-2.5 rounded-sm font-space text-[10px] font-black tracking-[0.2em] uppercase transition-all border duration-500
            ${isRecruiterMode 
              ? 'bg-[#10b981] border-[#10b981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-[#fbbf24]/50 hover:bg-[#fbbf24]/5'}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${isRecruiterMode ? 'bg-white animate-pulse' : 'bg-gray-700'} transition-all`} />
          {isRecruiterMode ? 'RECRUITER_ACTIVE' : 'RECRUITER_MODE'}
        </button>

        <a
          href="/Prathams_Resume.pdf"
          download
          className="px-5 py-2.5 bg-transparent border border-[#22d3ee]/20 hover:border-[#22d3ee]/60 hover:bg-[#22d3ee]/5 rounded-sm font-space text-[10px] font-black tracking-[0.3em] uppercase transition-all text-[#22d3ee]"
        >
          RESUME
        </a>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-white/60 hover:text-[#fbbf24] transition-colors"
      >
        <div className="flex flex-col gap-1.5">
          <div className={`h-[1px] bg-currentColor transition-all ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-8'}`} />
          <div className={`h-[1px] bg-currentColor transition-all ${isMenuOpen ? 'opacity-0' : 'w-6'}`} />
          <div className={`h-[1px] bg-currentColor transition-all ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`} />
        </div>
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            className="fixed inset-0 top-0 bg-[#05070d]/98 backdrop-blur-3xl z-[100] flex flex-col p-12 md:hidden"
          >
            <div className="flex justify-between items-center mb-20">
               <span className="font-space text-xs font-black text-[#fbbf24] tracking-[0.5em] uppercase">Navigation_Matrix</span>
               <button onClick={() => setIsMenuOpen(false)} className="text-white/40 font-space text-[10px] uppercase tracking-widest">[ Close ]</button>
            </div>

            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex flex-col"
                  >
                    <span className="text-4xl font-space font-black text-[#e5e7eb] uppercase tracking-tighter group-active:text-[#fbbf24] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[8px] text-white/20 font-space uppercase tracking-[0.4em] mt-1">MODULE_{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/5 flex flex-col gap-4">
               <button
                onClick={() => {
                  setRecruiterMode(!isRecruiterMode);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center justify-between px-8 py-6 rounded-sm font-space text-[10px] font-black tracking-widest uppercase transition-all
                  ${isRecruiterMode ? 'bg-[#10b981] text-white' : 'bg-white/5 text-gray-500 border border-white/10'}`}
              >
                <span>Recruiter_Mode</span>
                <div className={`w-2 h-2 rounded-full ${isRecruiterMode ? 'bg-white animate-pulse' : 'bg-gray-700'}`} />
              </button>
              
              <a
                href="/Prathams_Resume.pdf"
                download
                className="flex items-center justify-center py-6 bg-[#22d3ee]/5 border border-[#22d3ee]/20 text-[#22d3ee] rounded-sm font-space text-[10px] font-black tracking-widest uppercase"
              >
                Download_Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
