'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import Image from 'next/image';
import OrgCard from '@/components/ui/OrgCard';
import ProgramCard from '@/components/ui/ProgramCard';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const supabase = createBrowserSupabaseClient(); 

async function getFeaturedOrgs() {
  const { data } = await supabase.from('organizations').select('name, slug, logo_url, tech_stack, program, is_active_year_round').limit(3);
  return data || [];
}

const programs = [
  { name: 'GSoC 2026', slug: 'GSoC 2026', description: 'The gold standard for open-source mentorship.', icon: '🎓' },
  { name: 'LFX Mentorship', slug: 'LFX', description: 'Build the infrastructure of the internet.', icon: '🐧' },
  { name: 'Outreachy', slug: 'Outreachy', description: 'Inclusive internships for underrepresented groups.', icon: '💜' },
  { name: 'ESOC 2026', slug: 'ESOC 2026', description: 'EuroSocio-OpenSource for social impact.', icon: '🌍' }
];



const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { stiffness: 100 },
  },
};

export default function HomePage() {
  const [featuredOrgs, setFeaturedOrgs] = useState<any[]>([]);

  useEffect(() => {
    getFeaturedOrgs().then(setFeaturedOrgs);
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-4"
      >
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mt-48 mb-32">
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 mb-8 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            April 2026 • The Contribution Engine
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black text-foreground leading-none tracking-tight">
            The Industry <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600 animate-gradient-x">
              Standard.
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            OpenVeda is the year-round engine powering high-impact open-source careers. 
            From GSoC community bonding to LFX mentorships, we provide the verified playbooks to build production-grade infrastructure.
          </motion.p>
          
          {/* What to do now? - Dual Track Component */}
          <motion.div variants={itemVariants} className="mt-20 w-full max-w-4xl mx-auto">
             <div className="glass p-1 rounded-[3rem] border-primary/10 flex flex-col md:flex-row gap-2">
                <div className="flex-1 p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all text-left">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Track A</span>
                    <h3 className="text-2xl font-black italic mt-2">I Got Accepted</h3>
                    <p className="text-sm text-muted-foreground mt-4 font-medium leading-relaxed">Master the Community Bonding period. Learn how to communicate with maintainers and finalize your roadmap.</p>
                    <Link href="/playbook/community-bonding" className="mt-6 inline-block font-black text-[10px] uppercase tracking-widest text-primary">Get the Handbook →</Link>
                </div>
                <div className="flex-1 p-10 rounded-[2.5rem] bg-muted/30 border border-border hover:bg-muted/50 transition-all text-left">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Track B</span>
                    <h3 className="text-2xl font-black italic mt-2">I'm Building</h3>
                    <p className="text-sm text-muted-foreground mt-4 font-medium leading-relaxed">The cycle never ends. Build your portfolio for LFX, Outreachy, and GSoC 2027 by targeting year-round active repos.</p>
                    <Link href="/organizations" className="mt-6 inline-block font-black text-[10px] uppercase tracking-widest text-foreground">Explore Active Orgs →</Link>
                </div>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 flex flex-wrap justify-center gap-6">
            <Link href="/dashboard" className="bg-foreground text-background font-black py-5 px-12 rounded-2xl hover:bg-foreground/90 transition-all duration-300 shadow-xl">
              Check Your Readiness
            </Link>
          </motion.div>
        </div>

        {/* ... (Mentorship Programs section unchanged) ... */}

        {/* Community Spotlight - Anonymized */}
        <section className="w-full max-w-7xl mb-48 px-4">
          <motion.div variants={itemVariants} className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-6 underline decoration-primary decoration-4 underline-offset-8">Community <span className="text-primary italic">Impact</span></h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto italic">"Real developers who optimized production code and scaled open-source infrastructure."</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass p-12 md:p-20 rounded-[4rem] border-primary/20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden group hover:border-primary/40 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative z-10 w-full lg:w-1/3 text-center">
              <div className="text-[120px] filter grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">🚀</div>
            </div>

            <div className="relative z-10 w-full lg:w-2/3 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">The OpenVeda Way</h3>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-muted-foreground font-black text-[10px] uppercase tracking-[0.4em]">
                  <span>/ɪm-pækt/</span>
                  <span className="opacity-30">•</span>
                  <span>B.Tech Engineers</span>
                  <span className="opacity-30">•</span>
                  <span className="text-primary italic">Scaling Open Source</span>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium italic">
                "Our contributors don't just build clones. They dig into source code, submit patches to upstream repositories, and ensure the software powering the web remains robust."
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <Link 
                  href="/curriculum"
                  className="bg-foreground text-background font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-primary/20"
                >
                  Mastery Roadmap
                </Link>
                <Link 
                  href="/mentorship"
                  className="bg-muted border border-border text-foreground font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
                >
                  Meet the Mentors
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Connect & Update Section - Anonymized */}
        <section className="w-full max-w-5xl mb-48 px-4">
          <motion.div 
            variants={itemVariants}
            className="glass p-16 md:p-24 rounded-[4rem] border-primary/10 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">Join the Collective</span>
              <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-8 leading-none">
                Build the <br />
                <span className="text-primary italic">Future.</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                OpenVeda.in is a collective for developers who are tired of basic tutorials and want to write code that actually runs the internet.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                 <Link href="#" className="text-lg font-black text-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">GitHub <span className="text-xs opacity-30">#</span></Link>
                 <Link href="#" className="text-lg font-black text-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">LinkedIn <span className="text-xs opacity-30">#</span></Link>
                 <Link href="#" className="text-lg font-black text-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">Twitter <span className="text-xs opacity-30">#</span></Link>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </main>
  );
}
