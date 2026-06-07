"use client";

import { useOpenSourceStore } from "@/lib/opensourceStore";
import { CheckCircle, Rocket, BookOpen, Star } from "lucide-react";

export default function GettingStartedPage() {
  const { steps, completeStep } = useOpenSourceStore();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">Getting Started</h1>
        <p className="text-xl text-gray-400">Your complete journey from absolute beginner to open source contributor.</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Rocket className="text-orange-500" /> Getting Started with Open Source
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Welcome to your open source journey! We're excited to have you here. This guide will take you from "I don't know anything" to "I just made my first contribution!"
        </p>

        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
          <CheckCircle className="text-green-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-green-500">You Can Do This!</h4>
            <p className="text-green-400/80 text-sm mt-1">Thousands of people make their first open source contribution every day. You're about to join them! 🎉</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <BookOpen className="text-blue-500" /> Your Learning Path
        </h2>
        <p className="text-gray-400 mb-8">We've organized everything into a clear, step-by-step path. Click on a step to mark it as complete!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => {
            const num = idx + 1;
            const isCompleted = step.completed;
            
            // Generate a color pattern based on index for the border glow effect
            const colors = ["border-blue-500", "border-purple-500", "border-green-500", "border-yellow-500", "border-red-500", "border-orange-500"];
            const borderColor = colors[idx % colors.length];

            return (
              <div 
                key={step.id}
                id={step.id}
                onClick={() => completeStep(step.id)}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                  isCompleted 
                    ? "bg-[#1a1d24] border-gray-600 opacity-60" 
                    : `bg-[#0f1115] hover:bg-[#1a1d24] ${borderColor}`
                }`}
              >
                {/* Step Number Badge */}
                <div className={`w-8 h-8 rounded mb-4 flex items-center justify-center font-bold text-sm ${
                  isCompleted ? "bg-gray-700 text-gray-400" : "bg-white text-black"
                }`}>
                  {num}
                </div>

                <h3 className={`text-lg font-bold mb-2 ${isCompleted ? "text-gray-400 line-through" : "text-white"}`}>
                  {step.title}
                </h3>
                
                <p className={`text-sm ${isCompleted ? "text-gray-600" : "text-gray-400"}`}>
                  <span className="border-b border-gray-500/50 pb-0.5">{step.description}</span>
                  {!isCompleted && <span className="ml-1 text-gray-600">({Math.floor(Math.random() * 10) + 5} minutes)</span>}
                </p>

                {isCompleted && (
                  <div className="absolute top-4 right-4 text-green-500">
                    <CheckCircle size={24} />
                  </div>
                )}
                
                {!isCompleted && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="px-4 py-2 bg-orange-500 text-white font-bold rounded-full text-sm shadow-lg">
                      Mark as Complete
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-center">
        <Star size={40} className="mx-auto text-orange-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Ready to contribute?</h3>
        <p className="text-orange-200/70 mb-6">Once you've completed the learning path, you are ready to browse real issues.</p>
        <a href="/opensource/repositories" className="px-6 py-3 rounded-lg bg-orange-500 text-white font-bold inline-block hover:bg-orange-600 transition-colors">
          Browse Repositories
        </a>
      </div>
    </div>
  );
}
