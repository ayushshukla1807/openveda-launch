import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OpenSourceStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface OpenSourceProgressState {
  steps: OpenSourceStep[];
  completeStep: (id: string) => void;
  resetProgress: () => void;
  completedCount: () => number;
}

const initialSteps: OpenSourceStep[] = [
  { id: 'step-1', title: 'What is Open Source?', description: 'Understand the basics', completed: false },
  { id: 'step-2', title: 'Open Source Programs', description: 'Discover opportunities', completed: false },
  { id: 'step-3', title: 'What is GitHub?', description: 'Learn the platform', completed: false },
  { id: 'step-4', title: 'Setup Git', description: 'Install tools', completed: false },
  { id: 'step-5', title: 'Your First PR', description: 'Make a contribution', completed: false },
  { id: 'step-6', title: 'Find More Issues', description: 'Browse repositories', completed: false },
  { id: 'step-7', title: 'Understand Licenses', description: 'Read about open source licenses', completed: false },
  { id: 'step-8', title: 'Write Good Commits', description: 'Learn commit conventions', completed: false },
  { id: 'step-9', title: 'Code Reviews', description: 'How to respond to feedback', completed: false },
  { id: 'step-10', title: 'Join Communities', description: 'Discord, Slack, and Forums', completed: false },
  { id: 'step-11', title: 'Advanced Git', description: 'Rebase, Cherry-pick, Stash', completed: false },
  { id: 'step-12', title: 'Maintain a Project', description: 'Become a maintainer', completed: false },
];

export const useOpenSourceStore = create<OpenSourceProgressState>()(
  persist(
    (set, get) => ({
      steps: initialSteps,
      completeStep: (id: string) =>
        set((state) => ({
          steps: state.steps.map((step) =>
            step.id === id ? { ...step, completed: true } : step
          ),
        })),
      resetProgress: () => set({ steps: initialSteps }),
      completedCount: () => get().steps.filter((s) => s.completed).length,
    }),
    {
      name: 'opensource-progress-storage',
    }
  )
);
