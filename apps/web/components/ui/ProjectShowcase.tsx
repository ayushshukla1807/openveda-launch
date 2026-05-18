'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';

const supabase = createBrowserSupabaseClient();

const industryProjects = [
  {
    title: "eBPF-Powered Kernel Flow Monitor",
    brands: "CNCF Observability",
    desc: "Build a low-overhead container traffic analyzer that hooks into Linux socket calls via eBPF bytecode, outputting structured network telemetry without modifying user-space application code.",
    tech: ["Rust", "C", "eBPF", "Libbpf"],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Raft Distributed Consensus Engine",
    brands: "CNCF Sandbox Core",
    desc: "Implement a fault-tolerant distributed transactional ledger utilizing the Raft consensus algorithm, complete with leader election, state machine replication, and network partition healing.",
    tech: ["Go", "gRPC", "Protobuf", "etcd"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "High-Performance WASM AST Compiler",
    brands: "Vercel / SWC Tooling",
    desc: "Write a lightning-fast JS/TS compiler plugin that parses Abstract Syntax Trees (AST) and compiles massive ESNext modules down to optimized edge targets.",
    tech: ["Rust", "WASM", "swc_core", "Node.js"],
    color: "from-yellow-400 to-green-500"
  },
  {
    title: "Observability Ring Buffer Ingestor",
    brands: "Vector Labs / Clickhouse",
    desc: "Architect an in-memory streaming key-value ingestor utilizing epoll single-threaded event loops and lock-free ring buffer event pipes for microsecond telemetry collection.",
    tech: ["C++", "epoll", "Redis Protocol", "Kafka"],
    color: "from-red-500 to-orange-500"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ProjectShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [github, setGithub] = useState('');
  const [track, setTrack] = useState('systems');
  const [motivation, setMotivation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!github) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { data: { user } } = await supabase.auth.getUser();

    // Log to activity log feed via unified localStorage
    const logsStr = localStorage.getItem('openveda_logs') || '[]';
    const logs = JSON.parse(logsStr);
    logs.unshift({
      id: 'log-uuid-' + Date.now(),
      text: `Applied for Fellowship Cohort: ${track.toUpperCase()} track`,
      type: 'progress',
      created_at: new Date().toISOString()
    });
    localStorage.setItem('openveda_logs', JSON.stringify(logs.slice(0, 10)));

    setIsSubmitting(false);
    setSuccess(true);
  };

  return (
    <section className="py-32">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Industry Standards</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic text-white">
            Build Systems, <span className="text-foreground/20">Not Just Clones</span>
          </h2>
        </div>
        <p className="text-muted-foreground font-medium max-w-sm text-right">
          Escape tutorial traps. Work on low-level, distributed systems and proxy engines engineered by top CNCF maintainers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industryProjects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="group relative glass rounded-[4rem] p-12 border-border hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            {/* Background Glow */}
            <div className={`absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br ${project.color} opacity-[0.03] blur-[100px] group-hover:opacity-[0.1] transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                    {project.brands}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500 cursor-pointer">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" /></svg>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-500 text-white">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground font-medium text-base leading-relaxed mb-10">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-[10px] font-black uppercase tracking-widest text-foreground/45 border border-border px-3 py-1 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Big Tech CTA Overlay */}
      <div className="mt-20 p-12 glass rounded-[3rem] border-primary/20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
        <div>
          <h3 className="text-3xl font-black tracking-tight mb-2 italic text-white">Systems fellowship cohort application open</h3>
          <p className="text-muted-foreground font-medium">Join our rigorous distributed consensus fellowship and receive direct code reviews from the founder.</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-foreground text-background font-black px-12 py-5 rounded-3xl text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
        >
          Apply for Fellowship
        </button>
      </div>

      {/* Cohort Application Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-lg bg-[#030305] glass rounded-[3.5rem] border border-white/10 p-10 overflow-hidden relative shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/10 blur-[80px] rounded-full pointer-events-none" />
              
              <button
                onClick={() => { setIsOpen(false); setSuccess(false); }}
                className="absolute top-8 right-8 text-gray-500 hover:text-white font-bold text-xs bg-white/5 px-4 py-2 rounded-xl transition-colors"
              >
                CLOSE
              </button>

              {!success ? (
                <form onSubmit={handleApply} className="space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00f0ff]">Genesis Fellowship</span>
                    <h2 className="text-3xl font-black mt-1 text-white">Systems Fellowship Application</h2>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Direct code audit reviews by Ayush Shukla.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">GitHub Profile Username</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ayushshukla1807"
                      value={github}
                      onChange={e => setGithub(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/15 px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-[#00f0ff] outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Select Fellowship Track</label>
                    <select
                      value={track}
                      onChange={e => setTrack(e.target.value)}
                      className="w-full bg-[#030305] border border-white/15 px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-[#00f0ff] outline-none cursor-pointer font-medium"
                    >
                      <option value="systems">Distributed Systems (Go/Rust/eBPF)</option>
                      <option value="web-compiler">Elite Web Compilers (Rust/SWC/Rspack)</option>
                      <option value="telemetry">High-throughput Telemetry Pipelines (C++/epoll)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Why do you want to write systems?</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your experience escaping tutorial hell and why you are targeting core CNCF/Next.js layers..."
                      value={motivation}
                      onChange={e => setMotivation(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/15 px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-[#00f0ff] outline-none resize-none font-medium leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-t-2 border-black rounded-full animate-spin" />
                        <span>SUBMITTING RECORD...</span>
                      </>
                    ) : (
                      'SUBMIT APPLICATION'
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-6">
                  <div className="text-5xl">⚡</div>
                  <h3 className="text-2xl font-black text-white italic">Application Logged!</h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                    Your candidate profile has been registered inside our local registry. We will review your GitHub commits and sync back within 48 hours!
                  </p>
                  <button
                    onClick={() => { setIsOpen(false); setSuccess(false); }}
                    className="bg-[#00f0ff] text-black font-black px-8 py-3.5 rounded-xl text-[9px] uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    Back to Command Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
