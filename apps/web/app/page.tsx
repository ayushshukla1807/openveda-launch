'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import Image from 'next/image';
import OrgCard from '@/components/ui/OrgCard';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const programs = [
  { 
    name: 'GSoC 2027', 
    slug: 'GSoC 2027', 
    description: 'The gold standard for open-source mentorship.', 
    image_url: '/assets/gsoc_26.png' 
  },
  { 
    name: 'LFX Mentorship', 
    slug: 'LFX', 
    description: 'Build the infrastructure of the internet.', 
    image_url: '/assets/lfx_26.png' 
  },
  { 
    name: 'Outreachy', 
    slug: 'Outreachy', 
    description: 'Inclusive internships for underrepresented groups.', 
    image_url: '/assets/outreachy_26.png' 
  },
  { 
    name: 'ESOC 2027', 
    slug: 'ESOC 2027', 
    description: 'EuroSocio-OpenSource for social impact.', 
    image_url: '/assets/esoc_26.png' 
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function HomePage() {
  const [featuredOrgs, setFeaturedOrgs] = useState<any[]>([]);
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  useEffect(() => {
    const fetchOrgs = async () => {
      const { data } = await createBrowserSupabaseClient()
        .from('organizations')
        .select('name, slug, logo_url, tech_stack, program, is_active_year_round')
        .limit(3);
      setFeaturedOrgs(data || []);
    };
    fetchOrgs();
  }, []);

  const handleJoinDiscord = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);
    await new Promise(resolve => setTimeout(resolve, 1400));
    setIsJoining(false);
    setJoinedSuccess(true);
  };

  return (
    <main className="relative min-h-screen bg-[#0D1117] overflow-hidden selection:bg-primary selection:text-white">
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:5s]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-4"
      >
        {/* Extreme Hero Section */}
        <section className="text-center max-w-6xl mx-auto mt-40 mb-32">
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-6 py-2 mb-10 text-[10px] font-black tracking-[0.3em] text-primary uppercase bg-primary/5 border border-primary/20 backdrop-blur-xl rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LIVE TIMELINE: MAY 2026 • THE GSOC 2027 PREP STATION
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-8xl md:text-[11rem] font-black text-white leading-[0.85] tracking-[-0.05em] mb-12">
            THE INDUSTRY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FF8D72] to-purple-600">
              STANDARD.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-8 text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
            OpenVeda is the year-round engine powering high-impact careers. 
            We provide the verified playbooks to build production-grade infrastructure and bridge the gap from student to professional engineer.
          </motion.p>
          
          {/* Action Hub - Professional Tracks */}
          <motion.div variants={itemVariants} className="mt-20 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-2 glass rounded-[3.5rem]">
            <div className="relative group p-12 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">PHASE A: ROADMAPS</span>
                <h3 className="text-3xl font-black italic mt-4 text-white">Track Milestones</h3>
                <p className="text-slate-400 mt-6 font-medium leading-relaxed">Map your GSoC 2027 milestones. Learn maintainer communication, roadmap selection, and dynamic progress validation tracking.</p>
                <Link href="/journey" className="mt-10 inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                  Access Roadmap <span className="text-lg">→</span>
                </Link>
            </div>
            
            <div className="relative group p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] group-hover:bg-white/10 transition-all" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">PHASE B: SYSTEMS</span>
                <h3 className="text-3xl font-black italic mt-4 text-white">Portfolio Syllabus</h3>
                <p className="text-slate-500 mt-6 font-medium leading-relaxed">The cycle never ends. Prepare your systems portfolio for GSoC 2027 by mastering SWC, Raft, and container runtime architectures.</p>
                <Link href="/curriculum" className="mt-10 inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform">
                  Explore Syllabus <span className="text-lg">→</span>
                </Link>
            </div>
          </motion.div>
        </section>

        {/* Dynamic Organization Grid */}
        <section className="w-full max-w-7xl px-4 py-32 border-t border-white/5">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="text-left">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
                Active Year-<br /><span className="text-primary italic">Round.</span>
              </h2>
              <p className="text-slate-400 font-medium max-w-md">Organizations that don't sleep. Build impact 365 days a year, not just during application windows.</p>
            </div>
            <Link href="/organizations" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
              View All 185+ Organizations
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredOrgs.map((org) => (
              <OrgCard key={org.slug} {...org} />
            ))}
          </motion.div>
        </section>

        {/* Global Impact CTA */}
        <section className="w-full max-w-6xl mb-48 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass p-20 md:p-32 rounded-[4rem] text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/5" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-10">THE COLLECTIVE</span>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-10 leading-none">
                Build Code <br />That <span className="italic underline decoration-primary decoration-8 underline-offset-8">Matters.</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                Join a privacy-first, identity-neutral community of engineers optimizing the world's most critical open-source infrastructure.
              </p>
              <div className="flex flex-wrap justify-center gap-10">
                <Link href="https://github.com/ayushshukla1807" target="_blank" className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  GitHub <span className="text-slate-700">/</span>
                </Link>
                <button onClick={() => setIsDiscordOpen(true)} className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  Discord Sandbox <span className="text-slate-700">/</span>
                </button>
                <Link href="/mentorship" className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  Mentorship Sync <span className="text-slate-700">/</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>

      {/* Interactive Discord Sandbox Modal */}
      <AnimatePresence>
        {isDiscordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-xl bg-[#090b10] border border-white/10 rounded-[3.5rem] p-10 overflow-hidden relative shadow-2xl space-y-6"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/10 blur-[80px] rounded-full pointer-events-none" />
              
              <button
                onClick={() => { setIsDiscordOpen(false); setJoinedSuccess(false); }}
                className="absolute top-8 right-8 text-gray-500 hover:text-white font-bold text-xs bg-white/5 px-4 py-2 rounded-xl transition-colors"
              >
                CLOSE
              </button>

              {!joinedSuccess ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#5865F2]">OpenVeda Systems Sandbox</span>
                    <h2 className="text-3xl font-black mt-1 text-white">Join Developer Sandbox</h2>
                    
                    {/* Live Online Tracker */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span className="text-[9px] font-mono font-bold text-green-500 uppercase tracking-widest">
                        1,482 Systems Engineers Online
                      </span>
                    </div>
                  </div>

                  {/* Simulated Discord Channels Preview */}
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Active Channels Preview</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-gray-600 font-mono">#general-consensus</span>
                        <div className="text-[10px] leading-relaxed text-gray-400 font-medium">
                          <span className="text-[#00f0ff] font-bold">Ayush (Founder):</span> "SWC AST compilation runs 20x faster with the new Rust plugin!"
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-gray-600 font-mono">#ebpf-tracing</span>
                        <div className="text-[10px] leading-relaxed text-gray-400 font-medium">
                          <span className="text-[#7000ff] font-bold">Elena:</span> "Just pushed the socket flow hook live. Telemetry reports looks solid."
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-gray-600 font-mono">#swc-compiler</span>
                        <div className="text-[10px] leading-relaxed text-gray-400 font-medium">
                          <span className="text-amber-500 font-bold">Devon:</span> "Anyone auditing etcd Raft log compaction algorithms? Hit me up."
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleJoinDiscord}
                    disabled={isJoining}
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-4.5 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isJoining ? (
                      <>
                        <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                        <span>AUTHORIZING SANDBOX CREDENTIALS...</span>
                      </>
                    ) : (
                      'CLAIM SANDBOX ACCESS SLOT'
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-10 space-y-6">
                  <div className="text-5xl">👾</div>
                  <h3 className="text-2xl font-black text-white italic">Access Token Generated!</h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                    Your developer profile credentials have been authorized. The dynamic systems channel invite has been synced to your local command center ledger!
                  </p>
                  <button
                    onClick={() => { setIsDiscordOpen(false); setJoinedSuccess(false); }}
                    className="bg-white text-black font-black px-8 py-3.5 rounded-xl text-[9px] uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    Back to Command Nexus
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Extreme Footer Glow */}
      <div className="absolute bottom-0 left-[-10%] w-[120%] h-96 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none blur-[100px]" />
    </main>
  );
}
