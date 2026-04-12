'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { stiffness: 100 },
  },
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 py-32"
      >
        <div className="mb-24">
          <motion.span variants={itemVariants} className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">The OpenVeda Collective</motion.span>
          <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-12 italic">
            Empower. <br />
            <span className="text-foreground/20">Scale.</span> Impact.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-2xl text-muted-foreground font-medium max-w-3xl italic leading-relaxed">
            "We are a collective of open-source veterans and industry engineers dedicated to bridging the gap between academic learning and real-world production impact."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-4xl font-black tracking-tight underline decoration-primary decoration-4 underline-offset-8">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              OpenVeda was founded on a simple insight: Indian developers are brilliant, but they are often stuck in a cycle of surface-level tutorials. Our vision is to transform the ecosystem by providing the same tools, playbooks, and mentorship used by the top 1% of contributors at Google, Red Hat, and the Linux Foundation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-4xl font-black tracking-tight underline decoration-primary decoration-4 underline-offset-8">The Strategy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              We focus on deep-tech contributions. Whether it's the Chromium engine, Linux Kernel, or Next.js core—we believe that getting your code into production-grade infrastructure is the ultimate career accelerator.
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-32 p-16 glass rounded-[4rem] border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
            <h2 className="text-5xl font-black tracking-tighter mb-8 leading-none italic">Join the Collective.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed">
              We aren't defined by names or identities. We are defined by the pull requests we merge and the systems we scale.
            </p>
            <div className="flex flex-wrap gap-8">
                <Link href="/organizations" className="bg-foreground text-background font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Explore Projects</Link>
                <Link href="/mentorship" className="bg-muted border border-border text-foreground font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">Meet the Mentors</Link>
            </div>
        </motion.div>
      </motion.div>
    </main>
  );
}