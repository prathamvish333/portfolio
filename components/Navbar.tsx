'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTarsStore } from '../store/useTarsStore';
import { Menu, X, Terminal, Download } from 'lucide-react';

const navItems = [
  { name: 'BRIDGE', href: '/' },
  { name: 'LOGS', href: '/engineering' },
  { name: 'IDENTITY', href: '/about' },
];

export default function Navbar() {
  const { isTarsMode, toggleTarsMode } = useTarsStore();
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      style={{ backgroundColor: navBg }}
      className="fixed top-0 inset-x-0 z-[100] border-b border-white/5 backdrop-blur-md px-6 md:px-20 py-6 flex items-center justify-between"
    >
      <Link href="/" className="nasa-text text-white text-lg tracking-tighter">
        PRATHAM<span className="text-[#fbbf24]">_V</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nasa-text text-[9px] text-gray-500 hover:text-white transition-colors"
          >
            {item.name}
          </Link>
        ))}

        <button
          onClick={toggleTarsMode}
          className={`flex items-center gap-2 nasa-text text-[9px] px-3 py-1.5 border transition-all
            ${isTarsMode 
              ? 'bg-[#fbbf24] border-[#fbbf24] text-black' 
              : 'border-white/10 text-gray-500 hover:border-[#fbbf24] hover:text-[#fbbf24]'}`}
        >
          <Terminal size={12} />
          {isTarsMode ? 'TARS_ACTIVE' : 'TARS_MODE'}
        </button>

        <a
          href="/Prathams_Resume.pdf"
          download
          className="nasa-button !py-2 !px-4 !text-[8px]"
        >
          [ DOSS_v2 ]
        </a>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-400 hover:text-white"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-10 flex flex-col gap-8 md:hidden shadow-2xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="nasa-text text-xl text-white hover:text-[#fbbf24]"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
              <button
                onClick={() => {
                  toggleTarsMode();
                  setIsMenuOpen(false);
                }}
                className="nasa-button w-full flex justify-between items-center"
              >
                <span>TARS_FALLBACK_PROTOCOL</span>
                <Terminal size={14} />
              </button>
              
              <a
                href="/Prathams_Resume.pdf"
                download
                className="nasa-button w-full flex justify-between items-center"
              >
                <span>DOWNLOAD_IDENTITY_DOSS</span>
                <Download size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
