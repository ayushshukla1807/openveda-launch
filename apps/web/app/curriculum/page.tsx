'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const tracks = {
  infrastructure: {
    title: "Cloud Native & Systems Architecture",
    subtitle: "Master the building blocks of distributed operating systems and proxy engines.",
    color: "#00f0ff",
    topics: [
      { name: "Linux System Calls & Cgroups", icon: "🐧" },
      { name: "Container Runtimes (OCI, containerd)", icon: "📦" },
      { name: "Kubernetes Controller Loops", icon: "☸️" },
      { name: "gRPC & Protocol Buffers", icon: "⚡" },
      { name: "eBPF Kernel Instrumentation", icon: "🔍" },
      { name: "High-Throughput Proxy Filters", icon: "🌐" },
      { name: "Distributed Raft Consensus", icon: "🛡️" },
      { name: "WASM Runtime Plugins", icon: "🧩" }
    ],
    curatedProjects: [
      { name: "Linux Kernel Core", desc: "Contribute to virtual memory paging, task scheduler optimizations, or eBPF network hooks." },
      { name: "Kubernetes API Engine", desc: "Build custom controllers, optimize kubelet pod startup latency, or enhance scheduler rules." },
      { name: "Envoy Proxy Service Mesh", desc: "Master service-to-service routing, write proxy filters, or design custom WASM integration layers." }
    ]
  },
  webEngineers: {
    title: "Elite Web Systems & Compiler Tooling",
    subtitle: "Pioneer the next generation of bundle compilers, state frameworks, and reactive architectures.",
    color: "#7000ff",
    topics: [
      { name: "Turbopack & SWC Graphs", icon: "🦀" },
      { name: "React Server Components", icon: "⚛️" },
      { name: "V8 Engine Architecture", icon: "🌐" },
      { name: "Hydration & Rehydration Engine", icon: "💧" },
      { name: "Edge Middleware Runtimes", icon: "⚡" },
      { name: "Incremental Static Generation", icon: "⚙️" },
      { name: "Babel & AST Transforms", icon: "📊" },
      { name: "WebAssembly Bindings", icon: "📦" }
    ],
    curatedProjects: [
      { name: "Next.js Build Pipelines", desc: "Contribute to compiler graph resolution, streaming HTML engines, or incremental static cache layers." },
      { name: "Appsmith Core Interface", desc: "Optimize responsive canvas rendering grids, enhance layout drag-drop mechanics, or build real-time widgets." },
      { name: "SWC Compiler Transform", desc: "Write high-performance Rust plugins to parse, compile, or bundle typescript modules at high speeds." }
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function CurriculumPage() {
  const [activeTrack, setActiveTrack] = useState<'infrastructure' | 'webEngineers'>('infrastructure');

  return (
    <main className="min-h-screen bg-[#030305] text-[#f8fafc] relative overflow-hidden font-sans">
      {/* High-Fi Ambient Lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-[#7000ff]/10 blur-[150px] rounded-full animate-pulse [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-32 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Operation Open Source</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            Mastery <span className="text-foreground/20 italic underline decoration-primary decoration-8 underline-offset-8">Syllabus</span>
          </h1>
          <p className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Curated deep-tech pathways crafted to bridge the chasm between basic tutorials and production-scale open-source mastery.
          </p>
        </motion.div>

        {/* Track Selector Bar */}
        <div className="flex justify-center mb-20">
          <div className="glass p-2 rounded-3xl flex gap-2">
            {(['infrastructure', 'webEngineers'] as const).map((trackKey) => (
              <button
                key={trackKey}
                onClick={() => setActiveTrack(trackKey)}
                className={`px-10 py-5 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all ${
                  activeTrack === trackKey 
                    ? 'bg-foreground text-background shadow-2xl' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {trackKey === 'infrastructure' ? 'Systems & Infrastructure' : 'Web Systems & Compilers'}
              </button>
            ))}
          </div>
        </div>

        {/* Active Track Panels */}
        <motion.div
          key={activeTrack}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* Track Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">{tracks[activeTrack].title}</h2>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">{tracks[activeTrack].subtitle}</p>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tracks[activeTrack].topics.map((topic) => (
              <motion.div
                key={topic.name}
                variants={itemVariants}
                className="glass p-8 rounded-[2rem] border-white/5 hover:border-white/20 transition-all group hover:-translate-y-2 flex flex-col items-center text-center gap-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110 duration-500">{topic.icon}</span>
                <h3 className="font-black text-sm text-gray-300 leading-tight group-hover:text-white transition-colors">{topic.name}</h3>
              </motion.div>
            ))}
          </div>

          {/* Curated Projects Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-black tracking-tight whitespace-nowrap text-white">Target <span className="text-[#00f0ff] italic">Contributions</span></h2>
              <div className="h-[1px] bg-white/10 w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tracks[activeTrack].curatedProjects.map((project) => (
                <motion.div
                  key={project.name}
                  variants={itemVariants}
                  className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 group hover:border-[#00f0ff]/30 transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all pointer-events-none" />
                  <div className="space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00f0ff]">Elite GSoC/LFX Track</span>
                    <h4 className="text-2xl font-black tracking-tight text-white group-hover:text-primary transition-colors">{project.name}</h4>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed">{project.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <Link
                      href="/organizations"
                      className="text-[9px] font-black uppercase tracking-widest text-[#00f0ff] hover:text-white transition-colors underline decoration-2 underline-offset-4"
                    >
                      Find Playbooks →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-40 py-20 border-t border-white/5 text-center bg-[#050508]/50">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-[0.8em] mb-4">OPEN_VEDA // GENESIS_V2</p>
        <p className="text-[9px] text-gray-700 font-mono tracking-widest">© 2026 • ARCHITECTED FOR THE INFINITE</p>
      </footer>
    </main>
  );
}
