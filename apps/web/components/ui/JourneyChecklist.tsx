'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';

const supabase = createBrowserSupabaseClient();

interface Step {
  id: string;
  title: string;
  description: string;
}

const JOURNEY_STEPS: Step[] = [
  { id: 'step_1', title: 'Create OpenVeda Account', description: 'Your progress is securely saved.' },
  { id: 'step_2', title: 'Select Target GSoC Organization', description: 'Browse the 2026 updated orgs and pick your focus.' },
  { id: 'step_3', title: 'Read Platinum Playbook', description: 'Master the unwritten rules and architecture.' },
  { id: 'step_4', title: 'Setup Local Environment', description: 'Fork, clone, and build the project locally.' },
  { id: 'step_5', title: 'Book a Mentor Session (Optional)', description: 'Get unblocked by an org specialist.' },
  { id: 'step_6', title: 'Claim a "Good First Issue"', description: 'Find a live issue and comment to claim it.' },
  { id: 'step_7', title: 'Submit First Pull Request', description: 'Push your code and change the world.' },
];

interface JourneyChecklistProps {
  initialProgress?: string[];
}

export default function JourneyChecklist({ initialProgress = [] }: JourneyChecklistProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>(initialProgress);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const percentage = Math.round((completedSteps.length / JOURNEY_STEPS.length) * 100);
    setProgressPercentage(percentage);
  }, [completedSteps]);

  const toggleStep = async (stepId: string) => {
    const isCompleted = completedSteps.includes(stepId);
    const newSteps = isCompleted 
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
      
    setCompletedSteps(newSteps);
    
    // Sync with Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('user_progress')
        .upsert({ 
          user_id: user.id, 
          completed_steps: newSteps,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Meta */}
      <div className="mb-20 text-center">
        <div className="inline-flex items-center gap-4 bg-muted px-6 py-3 rounded-2xl border border-border mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Mission Progress</span>
            <div className="h-4 w-[1px] bg-border" />
            <span className="text-xl font-black text-primary">{progressPercentage}%</span>
        </div>
        
        <div className="relative w-full bg-muted h-4 rounded-full overflow-hidden border border-border">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "circOut" }}
            className="absolute h-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {JOURNEY_STEPS.map((step, index) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <motion.div 
              key={step.id} 
              onClick={() => toggleStep(step.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group flex items-start gap-6 p-8 rounded-[2.5rem] cursor-pointer transition-all border relative overflow-hidden ${
                isDone 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-muted/50 border-border hover:border-primary/30'
              }`}
            >
              {/* Checkmark Circle */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                isDone 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground border border-border group-hover:border-primary/30'
              }`}>
                {isDone ? (
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                   </svg>
                ) : (
                  <span className="text-sm font-black italic">{index + 1}</span>
                )}
              </div>

              <div className="flex-grow pt-1">
                <h3 className={`text-lg font-black tracking-tight mb-2 transition-all ${
                  isDone ? 'text-primary' : 'text-foreground'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm font-medium leading-relaxed transition-all ${
                  isDone ? 'text-muted-foreground/60' : 'text-muted-foreground group-hover:text-foreground'
                }`}>
                  {step.description}
                </p>
              </div>

              {/* Decorative accent for completed items */}
              {isDone && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full" />
              )}
            </motion.div>
          );
        })}

         <div className="md:col-span-2 p-12 glass rounded-[3rem] border-dashed border-border border-2 text-center mt-8">
            <h3 className="text-xl font-black text-muted-foreground/30 uppercase tracking-widest italic tracking-tighter">Stay Tuned for Your Open Source Success</h3>
         </div>
      </div>
    </div>
  );
}