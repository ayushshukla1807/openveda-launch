'use client';

import { useState, useTransition } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { updateCompletedSteps } from '@/app/journey/actions'; // Our new Server Action

const journeySteps = [
  { id: 1, title: 'What is Open Source?', description: 'Understand the core philosophy of collaboration.' },
  { id: 2, title: 'Learn Git & GitHub', description: 'Master the essential tools of version control.' },
  { id: 3, title: 'Find a Project', description: 'Explore our orgs and choose your first mission.' },
  // ... add the rest of the journey steps
];

export default function JourneyChecklist({ initialCompletedSteps }: { initialCompletedSteps: number[] }) {
  const [completedSteps, setCompletedSteps] = useState(initialCompletedSteps);
  const [isPending, startTransition] = useTransition();

  const handleStepToggle = (stepId: number) => {
    const isCompleted = completedSteps.includes(stepId);
    const newCompletedSteps = isCompleted
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    
    setCompletedSteps(newCompletedSteps); // Update the UI instantly
    
    // Call the server action to save the change to the database
    startTransition(() => {
      updateCompletedSteps(newCompletedSteps);
    });
  };

  const progressValue = (completedSteps.length / journeySteps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <Progress value={progressValue} className="w-full mb-8" />
      <div className="space-y-4">
        {journeySteps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4 p-4 bg-card border rounded-lg">
            <Checkbox id={`step-${step.id}`} checked={completedSteps.includes(step.id)} onCheckedChange={() => handleStepToggle(step.id)} />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor={`step-${step.id}`} className="text-lg font-medium">{`Step ${index + 1}: ${step.title}`}</label>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}