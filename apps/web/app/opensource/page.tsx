"use client";

import Link from "next/link";
import { Rocket, BookOpen, Globe2, Trophy, Users, CheckCircle, Star, Award, ShieldAlert, ArrowRight, Github, Code, Cpu, Network } from "lucide-react";
import { motion } from "framer-motion";

export default function OpenSourceLandingPage() {
  const pipelines = [
    { name: "LFX Mentorship Hub", desc: "Linux Foundation kernel & networking mentorships", color: "text-[#00f0ff] border-[#00f0ff]/20 bg-[#00f0ff]/5" },
    { name: "Google Summer of Code", desc: "Production-grade codebase project acceleration", color: "text-orange-500 border-orange-500/20 bg-orange-500/5" },
    { name: "CNCF Sandbox Pipelines", desc: "Cloud Native Computing Foundation architectures", color: "text-purple-500 border-purple-500/20 bg-purple-500/5" },
    { name: "MLH Fellowship Runtimes", desc: "Collaborative systems engineering fellowships", color: "text-red-500 border-red-500/20 bg-red-500/5" },
    { name: "Google Season of Docs", desc: "Technical writing & architecture guides", color: "text-green-500 border-green-500/20 bg-green-500/5" },
    { name: "Open Source Initiative", desc: "Licensing and community compliance structures", color: "text-blue-500 border-blue-500/20 bg-blue-500/5" },
  ];

  return (
    <div className="w-full font-sans bg-[#0B0C10] text-[#c5c6c7] selection:bg-orange-500 selection:text-white pb-24">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-24 pb-12">
        {/* Glow grid background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-500/10 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="z-10 max-w-4xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 text-xs text-orange-400 font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            OpenVeda Forge System Active
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-white leading-none"
          >
            OpenVeda <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">Forge.</span>
          </motion.h1>
          
          <p className="text-lg md:text-xl text-[#8f9094] max-w-2xl mx-auto leading-relaxed">
            Bridge the gap between academic programming and <span className="text-white font-bold">production-grade architectures</span>. Master the exact Git, CI/CD, and asynchronous workflows demanded by elite MAANG systems teams.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/opensource/getting-started"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-base hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              <Rocket size={18} /> Initialize Pipeline
            </Link>
            <Link 
              href="/opensource/repositories"
              className="px-8 py-3.5 rounded-lg bg-transparent border-2 border-gray-700 text-white font-bold text-base hover:border-gray-500 transition-colors flex items-center gap-2"
            >
              <BookOpen size={18} /> Audit Codebases
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Supported Programs Section */}
      <section className="border-y border-[#2a2d36]/50 bg-[#0f1115] py-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-3xl font-black text-white">Target Developer Pipelines</h2>
            <p className="text-sm text-[#8f9094] mt-2">Accelerate your portfolio by contributing to active enterprise-grade repositories.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipelines.map((pipe, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border text-left space-y-2 hover:-translate-y-1 transition-all ${pipe.color}`}
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white">
                  &lt;/&gt;
                </div>
                <h4 className="text-sm font-bold text-white pt-2">{pipe.name}</h4>
                <p className="text-xs text-[#8f9094]">{pipe.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Global Community Globe Section */}
      <section className="py-24 px-6 border-b border-[#2a2d36]/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div>
            <h2 className="text-4xl font-black text-white">
              Connect to Distributed Infrastructure Networks
            </h2>
            <p className="text-[#8f9094] text-sm mt-3">
              Asynchronous collaboration across time zones is the signature skill of Principal Engineers.
            </p>
          </div>

          {/* Interactive SVG Node Map Visualizer */}
          <div className="relative w-80 h-80 mx-auto bg-gradient-to-b from-orange-500/5 to-transparent rounded-full border border-orange-500/10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-orange-500/20 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-64 h-64 rounded-full border border-dashed border-purple-500/20 animate-[spin_20s_linear_infinite_reverse]" />
            
            <svg className="w-48 h-48 text-orange-500/30 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z" />
              <circle cx="25" cy="35" r="3" className="text-orange-500 fill-orange-500 animate-ping" />
              <circle cx="75" cy="45" r="4" className="text-purple-500 fill-purple-500" />
              <circle cx="45" cy="75" r="3" className="text-green-500 fill-green-500" />
              <circle cx="60" cy="25" r="5" className="text-yellow-500 fill-yellow-500" />
            </svg>

            <Network size={40} className="absolute text-orange-500 animate-pulse" />
          </div>

          <p className="text-sm text-[#8f9094] font-semibold">
            🌍 Global Node Matrix: Active developer pipelines deployed globally.
          </p>
        </div>
      </section>

      {/* 4. Why Contribute Section - Bento Style Custom */}
      <section className="py-24 px-6 bg-[#0f1115]/50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white">Forge Your SDE Portfolio</h2>
            <p className="text-sm text-[#8f9094] mt-2">Proven systems contribution beats static resumes every single time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-[#1a1d24] border border-[#2a2d36] space-y-4 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Production Architectures</h3>
                <p className="text-[#8f9094] text-xs leading-relaxed">
                  Master complex codebase setups, asynchronous pipeline compilation, and distributed vector database configurations.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-[#1a1d24] border border-[#2a2d36] space-y-4 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Verified SDE Credentials</h3>
                <p className="text-[#8f9094] text-xs leading-relaxed">
                  Generate public, unforgeable proof-of-work on Github that bypasses traditional recruiters and hits SDE managers directly.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-[#1a1d24] border border-[#2a2d36] space-y-4 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                  <Network size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Asynchronous Consensus</h3>
                <p className="text-[#8f9094] text-xs leading-relaxed">
                  Master git branching, squash merges, code reviews, and remote consensus building used by global software companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Choose Your Path Section */}
      <section className="py-24 px-6 border-t border-[#2a2d36]/50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white">Select Your Engineering Rank</h2>
            <p className="text-sm text-[#8f9094] mt-2">Select the track that matches your current target development capabilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beginner */}
            <div className="p-8 rounded-2xl bg-[#12141a] border-2 border-green-500/20 hover:border-green-500 transition-colors space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white">Novice Architect</h3>
                </div>
                <p className="text-xs text-[#8f9094]">Never pushed code? Start with basic environment setup guidelines.</p>
                <ul className="space-y-2 text-xs text-[#8f9094] pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Learn standard terminal commands
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Walkthrough Git PR sequences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Zero compilation requirements
                  </li>
                </ul>
              </div>
              <Link 
                href="/opensource/getting-started"
                className="w-full py-2.5 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white rounded-lg text-xs font-bold text-center mt-6 block border border-green-500/30 transition-colors"
              >
                Initialize Track
              </Link>
            </div>

            {/* Some Experience */}
            <div className="p-8 rounded-2xl bg-[#12141a] border-2 border-yellow-500/20 hover:border-yellow-500 transition-colors space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="text-yellow-500 w-8 h-8 fill-yellow-500" />
                  <h3 className="text-xl font-bold text-white">Systems Contributor</h3>
                </div>
                <p className="text-xs text-[#8f9094]">Understand git but ready to target codebase bugs and integrations.</p>
                <ul className="space-y-2 text-xs text-[#8f9094] pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Refactor core APIs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Learn typescript frameworks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Claim active codebase issues
                  </li>
                </ul>
              </div>
              <Link 
                href="/opensource/repositories"
                className="w-full py-2.5 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-black rounded-lg text-xs font-bold text-center mt-6 block border border-yellow-500/30 transition-colors"
              >
                Launch Track
              </Link>
            </div>

            {/* Advanced */}
            <div className="p-8 rounded-2xl bg-[#12141a] border-2 border-red-500/20 hover:border-red-500 transition-colors space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Trophy className="text-red-500 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white">Principal Engineer</h3>
                </div>
                <p className="text-xs text-[#8f9094]">Solve complex pipeline scaling, security audits, and concurrency issues.</p>
                <ul className="space-y-2 text-xs text-[#8f9094] pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Multi-threading optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Distributed DB auditing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Secure credentials scanner
                  </li>
                </ul>
              </div>
              <Link 
                href="/opensource/repositories"
                className="w-full py-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg text-xs font-bold text-center mt-6 block border border-red-500/30 transition-colors"
              >
                Audits Track
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ready to make first contribution CTA */}
      <section className="py-24 px-6 border-t border-[#2a2d36]/50 bg-[#0f1115] text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold text-white">Ready to Audit Your First Project?</h2>
          <p className="text-sm text-[#8f9094] max-w-lg mx-auto">
            Initialize your local sandbox, verify system credentials, and claim your first production commit in OpenVeda Forge.
          </p>
          <div className="pt-4">
            <Link 
              href="/opensource/getting-started"
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-bold text-base transition-opacity shadow-[0_0_40px_rgba(249,115,22,0.2)]"
            >
              Start Onboarding Cycle 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-[#2a2d36]/50 bg-[#090b0e] py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">OpenVeda Forge Documentation</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your guide to mastering git workflows, codebase security, and distributed systems contributions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Playbooks</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/opensource/getting-started" className="text-gray-500 hover:text-white transition-colors">Onboarding System</Link>
              <Link href="/opensource/issues" className="text-gray-500 hover:text-white transition-colors">Issue Pipeline</Link>
              <Link href="/opensource/repositories" className="text-gray-500 hover:text-white transition-colors">Target Codebases</Link>
              <Link href="/opensource" className="text-gray-500 hover:text-white transition-colors">Playbooks Docs</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect Ledger</h4>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/ayushshukla1807" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#1f242c] border border-[#2a2d36] rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
              <span className="text-xs text-gray-500">Sync with our Git repository nodes.</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-[#2a2d36]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 OpenVeda. All rights reserved.</p>
          <p>Engineered for high-impact software careers</p>
        </div>
      </footer>

    </div>
  );
}
