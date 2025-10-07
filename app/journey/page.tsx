'use client'; 

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox"; 
import { Progress } from "@/components/ui/progress"; 
import Link from 'next/link';

// This is the data for our learning path
const journeySteps = [
  { id: 1, title: 'What is Open Source?', description: 'Understand the core philosophy of collaboration.' },
  { id: 2, title: 'Learn Git & GitHub', description: 'Master the essential tools of version control.' },
  { id: 3, title: 'Find a Project', description: 'Explore our orgs and choose your first mission.' },
  { id: 4, title: 'Setup Your Environment', description: 'Follow a Playbook to get the code running locally.' },
  { id: 5, title: 'Find & Claim an Issue', description: 'Pick a "good first issue" and claim it.' },
  { id: 6, title: 'Make Your Changes', description: 'Write the code and solve the problem.' },
  { id: 7, title: 'Create Your First Pull Request', description: 'Submit your work for review.' },
  { id: 8, title: 'Conquer Code Review', description: 'Learn to accept and implement feedback.' },
  { id: 9, title: 'Get Merged!', description: 'Celebrate your first official contribution!' },
];

export default function JourneyPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // We check if 'window' is defined to prevent errors during server-side rendering
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('openveda-journey');
      if (savedProgress) {
        setCompletedSteps(JSON.parse(savedProgress));
      }
    }
  }, []);

  const handleStepToggle = (stepId: number) => {
    let newCompletedSteps;
    if (completedSteps.includes(stepId)) {
      newCompletedSteps = completedSteps.filter(id => id !== stepId);
    } else {
      newCompletedSteps = [...completedSteps, stepId];
    }
    setCompletedSteps(newCompletedSteps);
    localStorage.setItem('openveda-journey', JSON.stringify(newCompletedSteps));
  };
  
  const progressValue = (completedSteps.length / journeySteps.length) * 100;

  return (
    <main className="container mx-auto p-8 md:p-12 text-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white">Your Open Source Journey</h1>
        <p className="mt-4 text-lg text-gray-300">Follow this path from zero to your first merged pull request.</p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Progress value={progressValue} className="w-full mb-8 bg-gray-700" />
        
        <div className="space-y-4">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4 p-6 bg-gray-800 border border-gray-700 rounded-lg">
              <Checkbox 
                id={`step-${step.id}`} 
                className="mt-1 border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                checked={completedSteps.includes(step.id)}
                onCheckedChange={() => handleStepToggle(step.id)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={`step-${step.id}`}
                  className="text-lg font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Step {index + 1}: {step.title}
                </label>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <Link href="/orgs" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-all inline-flex items-center justify-center whitespace-nowrap text-sm h-11">
                Ready? Let's Find a Project!
            </Link>
        </div>
      </div>
    </main>
  );
}