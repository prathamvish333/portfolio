'use client';

// Lenis completely disabled — it conflicts with both GSAP ScrollTrigger (cinematic mode)
// and Framer Motion useScroll/useTransform (recruiter mode), causing double-smoothing lag.
// Native CSS scroll-behavior: smooth in globals.css handles this cleanly instead.

export default function SmoothScroll({ children }: { children: any }) {
  return <>{children}</>;
}
