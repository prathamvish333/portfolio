'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SoundProvider, useSoundContext } from '../context/SoundContext';
import { useTarsStore } from '../store/useTarsStore';
import AnimatedBackground from '../components/AnimatedBackground';
import DevTerminal from './DevTerminal';

function VolumeToggle() {
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <button
      onClick={toggleMute}
      className="nasa-text text-[8px] text-gray-700 transition-colors hover:text-white"
    >
      [{isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}]
    </button>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { isTarsMode } = useTarsStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Robust navigation guard
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    const isRestrictedPath = pathname === '/settings';
    
    if (!token && isRestrictedPath) {
      router.push('/login');
    }
  }, [pathname, router]);

  const handleCloseClick = () => {
    router.push('/');
  };

  const [isWindowMode, setIsWindowMode] = useState(false);
  const [isRecursive, setIsRecursive] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const inWindow = searchParams.get('window') === 'true' || (typeof window !== 'undefined' && window.self !== window.top);
    setIsWindowMode(inWindow);

    // Recursion check: If we are in an iframe and trying to load the dashboard again
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;
    if (isIframe && pathname === '/') {
      setIsRecursive(true);
    }
  }, [pathname]);

  if (isRecursive) return null; // Prevent windows inside windows

  const showTopPanel = pathname !== '/' && pathname !== '/desktop' && pathname !== '/login' && pathname !== '/signup' && pathname !== '/prathams-os' && pathname !== '/engineering' && pathname !== '/about' && !isWindowMode;

  return (
    <>
      {/* Suppress old background for the cinematic Interstellar look */}
      {!isWindowMode && isTarsMode && <AnimatedBackground isRecruiterMode={false} />}

        <div className={`flex min-h-screen flex-col ${isWindowMode ? 'bg-black/40 backdrop-blur-md' : 'bg-transparent'}`}>
          {/* Top Panel / Terminal Header (Refactored for NASA aesthetic) */}
          {showTopPanel && (
            <header className="fixed top-0 z-[60] flex w-full items-center justify-between border-b border-white/5 bg-black/80 px-6 py-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 group">
                  <div
                    onClick={handleCloseClick}
                    className="h-2 w-2 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-all"
                  />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
                  <div className="h-2 w-2 rounded-full bg-green-500/80" />
                </div>

                <div className="ml-4 flex items-baseline gap-2">
                  <span className="nasa-text text-[9px] text-white">SUBSYSTEM_ENV</span>
                  <span className="nasa-text text-[7px] text-gray-700">~/ROOT/SECURE</span>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-4">
                <VolumeToggle />
                <div className="nasa-text text-[7px] text-[#fbbf24]">
                  [CONNECTION: ENCRYPTED]
                </div>
              </div>
            </header>
          )}

          {/* Main Content Area */}
          <main className={`flex-1 ${showTopPanel ? 'pt-14' : ''}`}>
            {children}
          </main>

          {/* Developer Terminal (Only in Tars/Terminal Mode) */}
          {isTarsMode && <DevTerminal />}
      </div>
    </>
  );
}
