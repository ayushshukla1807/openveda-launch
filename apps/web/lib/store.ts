import { create } from 'zustand';

interface ContributorState {
  score: number;
  stage: string;
  isAnalyzing: boolean;
  fetchScore: () => Promise<void>;
}

export const useContributorStore = create<ContributorState>((set) => ({
  score: 0,
  stage: 'Novice',
  isAnalyzing: false,
  fetchScore: async () => {
    set({ isAnalyzing: true });
    try {
      // Connecting to the new FastAPI Backend (simulated for now)
      const res = await fetch('http://localhost:8000/api/v1/readiness');
      if (res.ok) {
        const data = await res.json();
        set({ score: data.score, stage: data.stage, isAnalyzing: false });
      } else {
        // Fallback for demo if backend isn't up
        setTimeout(() => {
          set({ score: 85, stage: 'Open Source Native', isAnalyzing: false });
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        set({ score: 85, stage: 'Open Source Native', isAnalyzing: false });
      }, 1500);
    }
  },
}));
