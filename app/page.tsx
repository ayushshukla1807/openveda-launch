'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import Image from 'next/image';
import OrgCard from '@/components/ui/OrgCard';
import ProgramCard from '@/components/ui/ProgramCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const supabase = createBrowserSupabaseClient(); 

async function getFeaturedOrgs() {
  const { data } = await supabase.from('organizations').select('name, slug, logo_url, tech_stack, program').limit(3);
  return data || [];
}

const programs = [
  { name: 'GSoC 2026', slug: 'GSoC 2026', description: 'The gold standard for open-source mentorship.', icon: '🎓' },
  { name: 'LFX Mentorship', slug: 'LFX', description: 'Build the infrastructure of the internet.', icon: '🐧' },
  { name: 'Outreachy', slug: 'Outreachy', description: 'Inclusive internships for underrepresented groups.', icon: '💜' },
  { name: 'ESOC 2026', slug: 'ESOC 2026', description: 'EuroSocio-OpenSource for social impact.', icon: '🌍' }
];

import { Variants } from 'framer-motion';

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
            Empowering the Next Generation of Contributors
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black text-foreground leading-none tracking-tight">
            From Confusion <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600 animate-gradient-x">
              to Contribution.
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            OpenVeda is the unrivaled launchpad for open-source developers. 
            Detailed playbooks, live issues, and a community that ships.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/organizations" className="group relative bg-primary text-primary-foreground font-black py-5 px-12 rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-primary/40">
              Explore Projects
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
            </Link>
            <Link href="/login" className="bg-muted border border-border text-foreground font-bold py-5 px-12 rounded-2xl hover:bg-accent transition-all backdrop-blur-md">
              Join the Community
            </Link>
          </motion.div>
        </div>

        {/* Discover Programs - Bento Style */}
        <section className="w-full max-w-7xl mb-48">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 px-4">
            <div>
              <h2 className="text-5xl font-bold text-foreground tracking-tight">Discover Programs</h2>
              <p className="mt-4 text-muted-foreground text-xl font-medium">Your gateway to the world's most prestigious mentorships.</p>
            </div>
            <Link href="/programs" className="group text-foreground font-bold flex items-center gap-2 hover:text-primary transition-colors">
              View All <span className="p-2 bg-muted rounded-lg group-hover:bg-primary/20 transition-all">→</span>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
            {programs.map((p, idx) => (
              <motion.div key={p.slug} variants={itemVariants}>
                <ProgramCard {...p} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Orgs - Clean Grid */}
        <section className="w-full max-w-7xl mb-48 px-4">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-bold text-foreground tracking-tight">Top GSoC Orgs</h2>
              <p className="mt-4 text-muted-foreground text-xl font-medium">Curated for mentorship quality and contribution impact.</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredOrgs.map((org, idx) => (
              <motion.div key={org.slug} variants={itemVariants}>
                <OrgCard {...org} />
              </motion.div>
            ))}
          </div>
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Link href="/organizations" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              View 180+ more organizations →
            </Link>
          </motion.div>
        </section>

        {/* Student Spotlight - New Premium Section */}
        <section className="w-full max-w-7xl mb-48 px-4">
          <motion.div variants={itemVariants} className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-6 underline decoration-primary decoration-4 underline-offset-8">Student <span className="text-primary italic">Spotlight</span></h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto italic">"Meet the trailblazers who transformed their passion into planetary impact."</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass p-12 md:p-20 rounded-[4rem] border-primary/20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden group hover:border-primary/40 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative z-10 w-full lg:w-1/3">
              <div className="relative mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kanishk"
                  alt="Kanishk Ranjan"
                  fill
                  className="rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover border-4 border-border shadow-2xl scale-95 group-hover:scale-100"
                />
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-2/3 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Kanishk Ranjan</h3>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-muted-foreground font-black text-[10px] uppercase tracking-[0.4em]">
                  <span>/kʌn-ɪʃk/</span>
                  <span className="opacity-30">•</span>
                  <span>B.Tech AI/ML</span>
                  <span className="opacity-30">•</span>
                  <span className="text-primary italic">Electron.js & Chromium</span>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium italic">
                "Kanishk has bridged the gap between student exploration and core systems engineering, landing significant patches in the very browsers we use every day."
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <Link 
                  href="/mentorship/kanishk-ranjan"
                  className="bg-foreground text-background font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-primary/20"
                >
                  View Full Profile
                </Link>
                <Link 
                  href="/mentorship"
                  className="bg-muted border border-border text-foreground font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
                >
                  All Mentors
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Connect & Update Section */}
        <section className="w-full max-w-5xl mb-48 px-4">
          <motion.div 
            variants={itemVariants}
            className="glass p-16 md:p-24 rounded-[4rem] border-primary/10 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">Join the Mission</span>
              <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-8 leading-none">
                Connect. Contribute. <br />
                <span className="text-primary italic">Scale.</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                OpenVeda.in is more than a platform. It's a movement to build India's next generation of open-source founders.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                 <Link href="https://github.com/ayushshukla1807" target="_blank" className="text-lg font-black text-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">GitHub <span className="text-xs opacity-30">↗</span></Link>
                 <Link href="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" className="text-lg font-black text-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">LinkedIn <span className="text-xs opacity-30">↗</span></Link>
                 <Link href="https://twitter.com/your-twitter-handle/" target="_blank" className="text-lg font-black text-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2">Twitter <span className="text-xs opacity-30">↗</span></Link>
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
