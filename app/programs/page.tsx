'use client';

import { motion } from 'framer-motion';
import ProgramCard from '@/components/ui/ProgramCard';

const programs = [
  { 
    name: 'GSoC 2026', 
    slug: 'GSoC 2026', 
    description: 'The gold standard for global open-source mentorship. Focuses on student developers.', 
    icon: '🎓' 
  },
  { 
    name: 'LFX Mentorship', 
    slug: 'LFX', 
    description: 'Infrastructure and networking projects under the Linux Foundation.', 
    icon: '🐧' 
  },
  { 
    name: 'Outreachy', 
    slug: 'Outreachy', 
    description: 'Internships for people from groups underrepresented in free and open source software.', 
    icon: '💜' 
  },
  { 
    name: 'ESOC 2026', 
    slug: 'ESOC 2026', 
    description: 'EuroSocio-OpenSource: Leveraging technology for social and ecological impact.', 
    icon: '🌍' 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-32"
        >
          <motion.span variants={itemVariants} className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Curated Global Initiatives</motion.span>
          <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            Mentorship <span className="text-foreground/20 italic underline decoration-primary decoration-4 underline-offset-8">Programs</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-2xl text-muted-foreground font-medium max-w-3xl mx-auto italic leading-relaxed">
            "Your gateway to the world's most prestigious open-source ecosystems. Pick your mission, find your mentor, and ship code."
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {programs.map((p) => (
            <motion.div key={p.slug} variants={itemVariants}>
              <ProgramCard {...p} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-32 p-16 glass rounded-[4rem] border-primary/20 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]" />
          <h2 className="text-4xl font-black mb-6 tracking-tight">Missing a <span className="text-primary italic">Program?</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium">
            Are there other local or niche mentorship programs you'd like us to index? Help us grow the OpenVeda database.
          </p>
          <Link href="mailto:support@openveda.in" className="bg-muted border border-border hover:bg-foreground hover:text-background font-black px-12 py-5 rounded-[2rem] text-xs uppercase tracking-widest transition-all">
            Suggest a Program
          </Link>
        </motion.div>
      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • BUILT FOR IMPACT</p>
      </footer>
    </main>
  );
}
