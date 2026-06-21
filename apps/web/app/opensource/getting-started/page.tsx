"use client";

import { useOpenSourceStore } from '../../../lib/opensourceStore';
import { CheckCircle, Rocket, BookOpen, Star, Shield, Cpu, Terminal } from "lucide-react";

export default function GettingStartedPage() {
  const { steps, completeStep } = useOpenSourceStore();

  const stepsDetails = [
    { title: "Version Control Fundamentals", desc: "Understand how distributed ledgers track file revisions in production setups." },
    { title: "Target Developer Programs", desc: "Assess GSoC, LFX, and CNCF program criteria to select your contribution path." },
    { title: "Distributed Workspace Setup", desc: "Create your workspace ledger on GitHub and initialize system profiles." },
    { title: "Secure Terminal Connections", desc: "Configure SSH keys on your machine to permit authenticated code pushes." },
    { title: "The Pull Request Pipeline", desc: "Learn the architecture flow of proposing, reviewing, and staging edits." },
    { title: "Active Ticket Discovery", desc: "Navigate system issue boards to claim beginner-friendly tickets." },
    { title: "Open Source Licensing Audit", desc: "Learn licensing compliance standards (MIT, Apache 2.0, GPL)." },
    { title: "Conventional Commit Standards", desc: "Write clean, semantic, and parseable commit logs for tracking." },
    { title: "Asynchronous Review Iterations", desc: "Learn to interpret code review comments and patch commits." },
    { title: "Dev Community Alignment", desc: "Connect with codebase maintainers via Slack, Discord, and forums." },
    { title: "Concurrent Git Operations", desc: "Master rebasing, squashing, cherry-picking, and resolving conflicts." },
    { title: "System Code Maintenance", desc: "Understand transition paths to project reviews and core maintainer roles." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans pb-32 bg-[#0B0C10] text-[#c5c6c7]">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest bg-orange-500/5 px-2.5 py-1 rounded-full border border-orange-500/20">
          Step-by-Step System Onboarding
        </span>
        <h1 className="text-4xl font-black text-white mt-4 font-sans">Forge Onboarding System</h1>
        <p className="text-lg text-[#8f9094] mt-2">Initialize your local environment and clear developer reviews easily.</p>
      </div>

      <div className="mb-12 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Terminal className="text-orange-500" /> Systems Setup Protocol
        </h2>
        <p className="text-sm text-[#8f9094] leading-relaxed">
          Welcome to OpenVeda Forge. This checklist validates your workspace capability, guiding you from a clean slate to active code contributions in high-concurrency systems.
        </p>

        <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 flex items-start gap-3">
          <Shield className="text-green-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-green-400 text-sm">System Verification Ready</h4>
            <p className="text-[#8f9094] text-xs mt-1">Completing these 12 modules prepares your environment for real-world SDE contributions. Tap nodes to save progress persistently.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Cpu className="text-blue-500" /> Pipeline Verification Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => {
            const num = idx + 1;
            const isCompleted = step.completed;
            const detail = stepsDetails[idx] || { title: step.title, desc: step.description };
            
            const colors = ["border-blue-500/30", "border-purple-500/30", "border-green-500/30", "border-yellow-500/30", "border-red-500/30", "border-orange-500/30"];
            const borderColor = colors[idx % colors.length];

            return (
              <div 
                key={step.id}
                id={step.id}
                onClick={() => completeStep(step.id)}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                  isCompleted 
                    ? "bg-[#12141a] border-gray-800 opacity-50" 
                    : `bg-[#12141a] hover:bg-[#1a1d24] ${borderColor}`
                }`}
              >
                {/* Step Number Badge */}
                <div className={`w-8 h-8 rounded mb-4 flex items-center justify-center font-bold text-xs ${
                  isCompleted ? "bg-gray-800 text-gray-500" : "bg-white text-black shadow-md"
                }`}>
                  {num}
                </div>

                <h3 className={`text-base font-bold mb-2 ${isCompleted ? "text-gray-500 line-through" : "text-white"}`}>
                  {detail.title}
                </h3>
                
                <p className={`text-xs ${isCompleted ? "text-gray-600" : "text-[#8f9094] leading-relaxed"}`}>
                  {detail.desc}
                </p>

                {isCompleted && (
                  <div className="absolute top-4 right-4 text-green-500">
                    <CheckCircle size={20} />
                  </div>
                )}
                
                {!isCompleted && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg text-xs shadow-lg">
                      Validate Node
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-center">
        <Star size={40} className="mx-auto text-orange-400 mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-white mb-2">Workspace Validated?</h3>
        <p className="text-xs text-[#8f9094] mb-6">If all environment nodes are verified, proceed to active issue triage and audit target repositories.</p>
        <a href="/opensource/repositories" className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs inline-block transition-colors">
          Browse Codebases
        </a>
      </div>
    </div>
  );
}
