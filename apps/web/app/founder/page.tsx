'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';

const supabase = createBrowserSupabaseClient();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function FounderPage() {
  const [question, setQuestion] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [founderResponse, setFounderResponse] = useState<string | null>(null);
  const [previousQueries, setPreviousQueries] = useState<any[]>([]);

  useEffect(() => {
    async function loadQueries() {
      const { data } = await supabase.from('founder_queries').select('*');
      if (data) {
        setPreviousQueries(data.sort((a: any, b: any) => b.created_at.localeCompare(a.created_at)));
      }
    }
    loadQueries();
  }, [founderResponse]);

  const handleAskFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    setIsQuerying(true);
    setFounderResponse(null);

    // High-end cognitive calibration delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const q = question.toLowerCase();
    let response = "In open source, impact is the only currency. Stop reading. Start forking. Write the code. Merge the patch.";

    if (q.includes('gsoc') || q.includes('lfx') || q.includes('outreachy') || q.includes('program')) {
      response = "Focus on high-quality pull requests in sandbox repositories first. Getting a PR merged on a sandbox system shows you can navigate real complexity. Proposals are secondary—code speaks first.";
    } else if (q.includes('rust') || q.includes('c') || q.includes('go') || q.includes('kernel') || q.includes('system')) {
      response = "Systems languages are the ultimate career leverage. Spend time reading the source code of projects like Envoy, containerd, or etcd. That is where real engineering mastery is born.";
    } else if (q.includes('tutorial') || q.includes('project') || q.includes('clone') || q.includes('begin')) {
      response = "Tutorial hell is the single biggest blocker for developer growth. Stop building clones. Fork containerd, write a custom plugin, trace the system calls—that is how you stand out from the 99%.";
    }

    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('founder_queries').insert({
      user_id: user?.id || 'anonymous-user',
      query: question,
      response: response
    });

    setFounderResponse(response);
    setQuestion('');
    setIsQuerying(false);
  };

  return (
    <main className="min-h-screen bg-[#030305] text-[#f8fafc] relative overflow-hidden font-sans">
      {/* High-Fi Ambient Lights */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-[#7000ff]/10 blur-[150px] rounded-full animate-pulse [animation-delay:4s]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 py-32 space-y-32"
      >
        {/* Hero directive header */}
        <div className="mb-24 space-y-8">
          <motion.span variants={itemVariants} className="text-[#00f0ff] font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Founder's Corner
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black tracking-tighter leading-none italic text-white">
            Stop Clones. <br />
            <span className="text-foreground/20">Write Systems.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-2xl text-gray-400 font-medium max-w-3xl italic leading-relaxed">
            "Tutorials are a comfortable trap. The elite 1% of engineers aren't built by watching videos—they are forged in the trenches of real, production-scale codebases."
          </motion.p>
        </div>

        {/* The Directive Editorial Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight text-white underline decoration-[#00f0ff] decoration-4 underline-offset-8">
              The Manifesto
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              OpenVeda was founded on a simple, uncompromising directive: Indian developers are brilliant, but they are often trapped in surface-level tutorial cycles. They build clones of clones, hoping to stand out. 
            </p>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              We are tearing down that paradigm. By mapping out active playbooks for GSoC 2026, LFX, and Outreachy, we show you exactly how to read massive source codebases, find real issues, and submit merged patches to Linux, Kubernetes, Next.js, and other infrastructure stacks.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight text-white underline decoration-[#7000ff] decoration-4 underline-offset-8">
              The Engineering Creed
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              In this ecosystem, we measure readiness by actual compiler errors resolved, memory layouts optimized, and pull requests merged.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              Whether you are preparing for GSoC 2026, striving for fellowships, or looking to scale engineering products at world-class levels, the directive is simple: Read code. Fork. Merge. Repeat.
            </p>
          </motion.div>
        </div>

        {/* Founders & Architects Profiles */}
        <div className="space-y-12">
          <motion.div variants={itemVariants} className="text-center md:text-left space-y-2">
            <span className="text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase font-black">
              THE LEADERSHIP DIRECTIVE
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white italic">Founding Architects</h2>
            <p className="text-sm text-gray-400 max-w-xl">
              Meet the minds driving the year-round contribution engine and building elite systems portfolios.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Ayush Shukla */}
            <div className="p-8 md:p-10 glass rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden group hover:border-[#00f0ff]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00f0ff] to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-[#030305] rounded-[14px] flex items-center justify-center font-black text-white text-xl">
                    AS
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Ayush Shukla</h3>
                  <span className="text-[#00f0ff] font-mono text-[9px] tracking-widest uppercase font-black">
                    Lead Architect & Founder
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                Pioneering open source mentorship paradigms. Core contributor to elite Next.js build engines, custom compiler plugins, and database sync architectures.
              </p>
              <div className="flex gap-4 pt-2">
                <a 
                  href="https://github.com/ayushshukla1807" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-black text-white hover:text-[#00f0ff] transition-colors"
                >
                  github.com/ayushshukla1807 ↗
                </a>
              </div>
            </div>

            {/* Abhijeet */}
            <div className="p-8 md:p-10 glass rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden group hover:border-[#7000ff]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7000ff]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7000ff] to-pink-500 p-[2px]">
                  <div className="w-full h-full bg-[#030305] rounded-[14px] flex items-center justify-center font-black text-white text-xl">
                    AA
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Abhijeet</h3>
                  <span className="text-purple-400 font-mono text-[9px] tracking-widest uppercase font-black">
                    Co-Founder & Systems Core
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                Specializing in low-overhead execution runtimes, distributed consensus engines, pgvector index pipelines, and real-time telemetry tracing logs.
              </p>
              <div className="flex gap-4 pt-2">
                <a 
                  href="https://github.com/Abhi3975" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-black text-white hover:text-purple-400 transition-colors"
                >
                  github.com/Abhi3975 ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ask the Founder Interactive AI Sandbox */}
        <motion.div 
          variants={itemVariants}
          className="p-12 md:p-16 glass rounded-[4rem] border-white/10 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col items-center sm:items-start gap-4">
              <h2 className="text-4xl font-black tracking-tight text-white leading-none">
                Interactive <span className="italic text-[#00f0ff]">Manifesto Sandbox</span>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                Submit your query directly to the Founder's neural index to calculate systems guidelines and strategic pointers.
              </p>
            </div>

            <form onSubmit={handleAskFounder} className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about GSoC 2026 strategy, systems stacks, or escaping tutorial hell..."
                className="flex-1 w-full bg-white/[0.03] border border-white/15 px-8 py-5 rounded-3xl font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/30 transition-all placeholder:text-gray-700"
              />
              <button
                type="submit"
                disabled={isQuerying}
                className="w-full sm:w-auto bg-[#00f0ff] text-black font-black px-12 py-5 rounded-3xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] disabled:opacity-50"
              >
                {isQuerying ? 'Querying Index...' : 'Query Founder'}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {isQuerying && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 py-6"
                >
                  <div className="w-5 h-5 border-t-2 border-[#00f0ff] rounded-full animate-spin" />
                  <span className="text-[10px] font-mono text-[#00f0ff] tracking-widest uppercase">Consulting founder's directive logs...</span>
                </motion.div>
              )}

              {founderResponse && !isQuerying && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="p-8 bg-[#00f0ff]/5 border border-[#00f0ff]/20 rounded-[2.5rem] relative overflow-hidden"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#00f0ff] block mb-2">Neural Directive Response</span>
                  <p className="text-lg md:text-xl font-bold italic leading-relaxed text-gray-200">
                    "{founderResponse}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Previous Queries Log */}
            {previousQueries.length > 0 && (
              <div className="pt-10 border-t border-white/5 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 italic">Directive ledger logs</h3>
                <div className="max-h-[250px] overflow-y-auto pr-4 space-y-4 scrollbar-hide">
                  {previousQueries.map((item) => (
                    <div key={item.id} className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center text-[8px] font-mono text-gray-600">
                        <span>QUERY SYNC</span>
                        <span>{new Date(item.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-xs font-black text-white">Q: {item.query}</p>
                      <p className="text-xs font-medium text-gray-400 italic">Founder: "{item.response}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Call to Action Card */}
        <motion.div 
          variants={itemVariants} 
          className="p-16 glass rounded-[4rem] border-primary/20 relative overflow-hidden group text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
          <h2 className="text-5xl font-black tracking-tighter mb-8 leading-none italic">Escaped the Sandbox. Join the Collective.</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            We are defined solely by our pull requests and sandbox systems.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/organizations" className="bg-foreground text-background font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Explore Playbooks</Link>
            <Link href="/journey" className="bg-muted border border-border text-foreground font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">Track Your Milestones</Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}