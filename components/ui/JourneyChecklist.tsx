'use client';
import { useState, useEffect } from 'react';

const JOURNEY_STEPS = [
  { id: 'step_1', title: 'Create OpenVeda Account', description: 'Your progress is securely saved.' },
  { id: 'step_2', title: 'Select Target GSoC Organization', description: 'Browse the 2026 updated orgs and pick your focus.' },
  { id: 'step_3', title: 'Read Platinum Playbook', description: 'Master the unwritten rules and architecture.' },
  { id: 'step_4', title: 'Setup Local Environment', description: 'Fork, clone, and build the project locally.' },
  { id: 'step_5', title: 'Book a Mentor Session (Optional)', description: 'Get unblocked by an org specialist.' },
  { id: 'step_6', title: 'Claim a "Good First Issue"', description: 'Find a live issue and comment to claim it.' },
  { id: 'step_7', title: 'Submit First Pull Request', description: 'Push your code and change the world.' },
];

export default function JourneyChecklist({ initialProgress = [] }) {
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
    
    // In a real scenario, you'd trigger a Supabase update here:
    // await supabase.from('user_progress').upsert({ user_id: user.id, completed_steps: newSteps });
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Your Open Source Roadmap</h2>
        <div className="w-full bg-gray-700 rounded-full h-4 mt-4 overflow-hidden">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-green-400 mt-2 font-bold">{progressPercentage}% Completed</p>
      </div>

      <div className="space-y-4">
        {JOURNEY_STEPS.map((step, index) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <div 
              key={step.id} 
              onClick={() => toggleStep(step.id)}
              className={`flex items-start p-4 rounded-lg cursor-pointer transition-all border ${isDone ? 'bg-green-900/20 border-green-500/50' : 'bg-gray-800 hover:bg-gray-700 border-gray-700'}`}
            >
              <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                {isDone && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <div className="ml-4">
                <h3 className={`text-lg font-semibold ${isDone ? 'text-green-400 line-through opacity-70' : 'text-white'}`}>
                  {index + 1}. {step.title}
                </h3>
                <p className={`text-sm mt-1 ${isDone ? 'text-gray-500' : 'text-gray-400'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}