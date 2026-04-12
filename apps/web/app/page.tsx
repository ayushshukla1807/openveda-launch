'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import Image from 'next/image';
import OrgCard from '@/components/ui/OrgCard';
import ProgramCard from '@/components/ui/ProgramCard';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const programs = [
  { 
    name: 'GSoC 2026', 
    slug: 'GSoC 2026', 
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
    name: 'ESOC 2026', 
    slug: 'ESOC 2026', 
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
            LIVE STATUS: APRIL 2026 • THE CONTRIBUTION ENGINE
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
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">PHASE A: BONDING</span>
                <h3 className="text-3xl font-black italic mt-4 text-white">I Got Accepted</h3>
                <p className="text-slate-400 mt-6 font-medium leading-relaxed">Master the 2026 Community Bonding period. Learn maintainer communication, roadmap finalization, and upstream cultural sync.</p>
                <Link href="/playbook/community-bonding" className="mt-10 inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                  Access Handbook <span className="text-lg">→</span>
                </Link>
            </div>
            
            <div className="relative group p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] group-hover:bg-white/10 transition-all" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">PHASE B: BUILDING</span>
                <h3 className="text-3xl font-black italic mt-4 text-white">I'm Portfolio-Ready</h3>
                <p className="text-slate-500 mt-6 font-medium leading-relaxed">The cycle never ends. Build your professional portfolio for GSoC 2027 by targeting year-round active repositories today.</p>
                <Link href="/organizations" className="mt-10 inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform">
                  Explore Active Orgs <span className="text-lg">→</span>
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
                <Link href="#" className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  GitHub <span className="text-slate-700">/</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  Discord <span className="text-slate-700">/</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  Mentorship <span className="text-slate-700">/</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>

      {/* Extreme Footer Glow */}
      <div className="absolute bottom-0 left-[-10%] w-[120%] h-96 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none blur-[100px]" />
    </main>
  );
}
