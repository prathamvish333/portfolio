import { create } from 'zustand';

type PerformanceTier = 'high' | 'low' | 'unknown';

interface TarsState {
  isRecruiterMode: boolean; // True = Terminal/Text (Recruiter), False = Cinematic/Canvas
  performanceTier: PerformanceTier;
  isLoaded: boolean;
  syncProgress: number;
  setRecruiterMode: (mode: boolean) => void;
  toggleRecruiterMode: () => void;
  setPerformanceTier: (tier: PerformanceTier) => void;
  setLoaded: (loaded: boolean) => void;
  setSyncProgress: (progress: number) => void;
}

export const useTarsStore = create<TarsState>((set) => ({
  isRecruiterMode: false,
  performanceTier: 'unknown',
  isLoaded: false,
  syncProgress: 0,
  
  setRecruiterMode: (mode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recruiter_active', String(mode));
    }
    set({ isRecruiterMode: mode });
  },
  
  toggleRecruiterMode: () => set((state) => {
    const next = !state.isRecruiterMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('recruiter_active', String(next));
    }
    return { isRecruiterMode: next };
  }),
  
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setSyncProgress: (progress) => set({ syncProgress: progress }),
}));
