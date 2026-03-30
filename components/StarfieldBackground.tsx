'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useMemo, memo } from 'react';

const STAR_COUNT = 150;

const Stars = memo(() => {
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white transition-opacity"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
});

Stars.displayName = 'Stars';

export default function StarfieldBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Subtle parallax springs
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const moveX = useTransform(springX, [-0.5, 0.5], ['-30px', '30px']);
  const moveY = useTransform(springY, [-0.5, 0.5], ['-30px', '30px']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="star-field">
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="relative w-full h-full scale-110"
      >
        <Stars />
      </motion.div>
      {/* Deep space fog for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-transparent to-[#081021]/80" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#05070d] to-transparent" />
    </div>
  );
}
