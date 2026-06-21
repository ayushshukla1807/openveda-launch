'use client';

import { createBrowserSupabaseClient } from '../lib/supabase/browser-client';
import OrgCard from '../components/ui/OrgCard';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { 
  Terminal, ArrowRight, ShieldCheck, Zap, Users, Code2, ChevronRight, CheckSquare, GitPullRequest, Search, FileCode2
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const CODE_PRESETS = [
  {
    lang: 'React',
    filename: 'ServerComponent.tsx',
    code: `// RSC Payload Optimizer
export async function generateStaticParams() {
  const data = await db.query('SELECT id FROM components');
  return data.map(item => ({ id: item.id }));
}

export default function OptimizedList({ items }) {
  return (
    <ul className="space-y-1">
      {items.map(i => <Item key={i.id} data={i} />)}
    </ul>
  );
}`,
    org: 'Vercel'
  },
  {
    lang: 'Rust',
    filename: 'parser_core.rs',
    code: `// High-performance AST Traversal
impl Visitor for CompilerPass {
    fn visit_expr(&mut self, expr: &Expr) {
        match expr {
            Expr::Arrow(arrow) => self.optimize_arrow(arrow),
            _ => expr.visit_children_with(self),
        }
    }
}`,
    org: 'SWC / ByteDance'
  },
  {
    lang: 'Go',
    filename: 'raft_node.go',
    code: `// Distributed Consensus Protocol
func (n *Node) replicateLogs(term int, entries []LogEntry) error {
	n.mu.Lock()
	defer n.mu.Unlock()
	
	if term < n.currentTerm {
		return ErrStaleTerm
	}
	return n.wal.Append(entries)
}`,
    org: 'HashiCorp / CNCF'
  }
];

export default function HomePage() {
  const [featuredOrgs, setFeaturedOrgs] = useState<any[]>([]);
  const [activeCodePreset, setActiveCodePreset] = useState(CODE_PRESETS[0]);
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const { data } = await createBrowserSupabaseClient()
          .from('organizations')
          .select('name, slug, logo_url, tech_stack, program, is_active_year_round')
          .limit(3);
        if (data) setFeaturedOrgs(data);
      } catch (err) {
        console.error("Error fetching orgs:", err);
      }
    };
    fetchOrgs();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800 selection:text-white font-sans overflow-x-hidden">
      
      {/* Sleek, professional grid background pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-6 pt-32 pb-24"
      >
        {/* Hero Section */}
        <section className="text-center max-w-5xl mx-auto w-full">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-xs font-medium text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            Live Placements: GSoC '25 • LFX Mentorship
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight text-zinc-100 mb-8 leading-[1.05]"
          >
            The Developer<br />
            <span className="text-zinc-500">Contribution Protocol.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Bridge the gap from theory to production. Ship verifiable code to world-class open-source projects and build a portfolio that top-tier engineering teams trust.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/matchmaking" 
              className="px-8 py-3.5 bg-zinc-100 text-zinc-950 font-medium rounded-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto"
            >
              Start Contributing
            </Link>
            <Link 
              href="/organizations" 
              className="px-8 py-3.5 bg-transparent border border-zinc-800 text-zinc-300 font-medium rounded-lg hover:bg-zinc-900 hover:text-white transition-colors w-full sm:w-auto"
            >
              Explore Organizations
            </Link>
          </motion.div>
        </section>

        {/* Minimal Bento Grid */}
        <section className="w-full max-w-6xl mx-auto mt-32">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors">
              <Search className="w-8 h-8 text-zinc-400 mb-6" />
              <h3 className="text-2xl font-medium text-zinc-100 mb-3">Intelligent Issue Routing</h3>
              <p className="text-zinc-400 leading-relaxed max-w-md">Stop scrolling through endless GitHub pages. Our engine maps your precise technical stack to the highest-impact open issues across the CNCF ecosystem.</p>
            </div>
            
            <div className="col-span-1 bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors flex flex-col justify-between">
              <div>
                <GitPullRequest className="w-8 h-8 text-zinc-400 mb-6" />
                <h3 className="text-2xl font-medium text-zinc-100 mb-3">Verified Portfolio</h3>
                <p className="text-zinc-400 leading-relaxed">Turn your merged pull requests into an immutable cryptographic proof of work.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Technical Workspace Preview */}
        <section className="w-full max-w-6xl mx-auto mt-32">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl overflow-hidden backdrop-blur-sm">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 p-8 border-r border-zinc-800/50 bg-zinc-900/20">
              <div className="mb-8">
                <h3 className="text-xl font-medium text-zinc-100 mb-2">Systems Mastery</h3>
                <p className="text-sm text-zinc-400">Interact with real-world architecture patterns.</p>
              </div>
              
              <div className="space-y-2">
                {CODE_PRESETS.map((preset) => (
                  <button
                    key={preset.lang}
                    onClick={() => setActiveCodePreset(preset)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      activeCodePreset.lang === preset.lang 
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    {preset.lang}
                    {activeCodePreset.lang === preset.lang && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div className="w-full md:w-2/3 p-8 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono">
                  <FileCode2 className="w-4 h-4" />
                  {activeCodePreset.filename}
                </div>
                <div className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                  {activeCodePreset.org}
                </div>
              </div>
              <div className="flex-1 bg-zinc-950 rounded-2xl border border-zinc-800/50 p-6 overflow-x-auto">
                <pre className="font-mono text-sm text-zinc-300 leading-loose">
                  <code>{activeCodePreset.code}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Organizations Grid */}
        <section className="w-full max-w-6xl mx-auto mt-32">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-medium text-zinc-100 mb-2">Active Year-Round.</h2>
              <p className="text-zinc-400">Contribute 365 days a year. No application windows required.</p>
            </div>
            <Link 
              href="/organizations" 
              className="text-sm font-medium text-zinc-100 hover:text-zinc-400 transition-colors flex items-center gap-2"
            >
              View All Organizations <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredOrgs.length > 0 ? featuredOrgs.map((org) => (
              <div key={org.slug} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-zinc-700 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 mb-6 flex items-center justify-center overflow-hidden border border-zinc-700">
                  {org.logo_url ? (
                    <img src={org.logo_url} alt={org.name} className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-zinc-500 font-medium">{org.name.charAt(0)}</span>
                  )}
                </div>
                <h4 className="text-lg font-medium text-zinc-100 mb-1">{org.name}</h4>
                <p className="text-sm text-zinc-500 mb-6 line-clamp-2">{org.program || 'Continuous Integration'}</p>
                <div className="flex items-center text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  Explore Repository <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )) : (
               <div className="col-span-3 text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                 Loading partner organizations...
               </div>
            )}
          </motion.div>
        </section>

        {/* Global Impact CTA */}
        <section className="w-full max-w-4xl mx-auto mt-32 text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-medium text-zinc-100 tracking-tight mb-6">
              Ready to ship production code?
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
              Join thousands of engineers optimizing the world's most critical open-source infrastructure.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/matchmaking" className="px-8 py-3.5 bg-zinc-100 text-zinc-950 font-medium rounded-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all">
                Create Account
              </Link>
              <button onClick={() => setIsDiscordOpen(true)} className="px-8 py-3.5 bg-zinc-900 text-zinc-100 border border-zinc-800 font-medium rounded-lg hover:bg-zinc-800 transition-colors">
                Join Community
              </button>
            </div>
          </motion.div>
        </section>
      </motion.div>

      {/* Clean Discord Modal */}
      <AnimatePresence>
        {isDiscordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsDiscordOpen(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                ✕
              </button>
              
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-zinc-100 mb-2">Join the Sandbox</h2>
                <p className="text-zinc-400 text-sm">Connect with 1,482 systems engineers and contributors.</p>
              </div>

              <button
                onClick={() => setIsDiscordOpen(false)}
                className="w-full py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Connect with Discord
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
