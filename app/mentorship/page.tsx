'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const mentors = [
  {
    name: 'Ayush Shukla',
    slug: 'ayush-shukla',
    role: 'Founder, OpenVeda',
    expertise: ['GSoC Strategy', 'Next.js', 'System Architecture'],
    image: 'https://i.postimg.cc/7LnSZn1Z/Ayush-Shukla.jpg',
    calendly: 'https://calendly.com/ayush-shukla-adypu/30min'
  },
  {
    name: 'Kanishk Ranjan',
    slug: 'kanishk-ranjan',
    role: 'Open Source Contributor @ElectronJS',
    expertise: ['Electron.js', 'Chromium', 'AI/ML'],
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kanishk',
    calendly: '#'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function MentorshipPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-32"
        >
          <motion.span variants={itemVariants} className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">1-on-1 Personalized Guidance</motion.span>
          <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            Expert <span className="text-foreground/20 italic underline decoration-primary decoration-4 underline-offset-8">Mentorship</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto italic leading-relaxed">
            "Don't just code. Strategize. Connect with mentors who have walked the path to open-source mastery."
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {mentors.map((mentor) => (
            <motion.div 
              key={mentor.name}
              variants={itemVariants}
              className="glass p-12 rounded-[3.5rem] border-border group hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image 
                    src={mentor.image}
                    alt={mentor.name}
                    width={160}
                    height={160}
                    className="rounded-[2.5rem] border border-border shadow-xl relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">{mentor.name}</h3>
                    <p className="text-primary font-bold text-sm">{mentor.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {mentor.expertise.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-muted rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">{skill}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Link 
                      href={mentor.calendly}
                      target="_blank"
                      className="bg-foreground text-background font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-primary/20 text-center"
                    >
                      Book Session →
                    </Link>
                    <Link 
                      href={`/mentorship/${mentor.slug}`}
                      className="bg-muted border border-border text-foreground font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-all text-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
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
          <h2 className="text-4xl font-black mb-6 tracking-tight">Become a <span className="text-primary italic">Mentor</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium">
            Have you successfully completed GSoC, Outreachy, or LFX? Help the next generation of contributors scale their impact.
          </p>
          <Link href="mailto:ayush@openveda.in" className="bg-muted border border-border hover:bg-foreground hover:text-background font-black px-12 py-5 rounded-[2rem] text-xs uppercase tracking-widest transition-all">
            Apply to Mentor
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
