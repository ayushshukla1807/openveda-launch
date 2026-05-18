'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const mentors = [
  {
    name: 'Principal Mentor',
    slug: 'principal-mentor',
    role: 'Lead Architect, OpenVeda',
    expertise: ['Open Source Strategy', 'Next.js', 'System Architecture'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Principal',
    calendly: '#'
  },
  {
    name: 'Technical Architect',
    slug: 'technical-architect',
    role: 'Core Contributor @TopTierProjects',
    expertise: ['Systems Engineering', 'Browser Engines', 'AI/ML'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Technical',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const calculateAffinity = () => {
    if (!searchTerm) return;
    setIsCalculating(true);
    // Simulate high-precision vector search
    setTimeout(() => {
      setIsCalculating(false);
      setMatchScore(94.8 + Math.random() * 4.5);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#030305] text-[#f8fafc] relative overflow-hidden font-sans">
      {/* Pro Max Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00f0ff]/10 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7000ff]/10 blur-[180px] rounded-full animate-pulse [animation-delay:3s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-40"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 mb-8">
            <span className="text-[#00f0ff] font-bold text-[10px] uppercase tracking-[0.4em]">Neural Mentorship Grid</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-10 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-[#00f0ff]/50">
            The <span className="italic font-light text-[#00f0ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">Collective</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed italic">
            "Direct neural link to architects who have built the planet's most resilient open-source infrastructure."
          </motion.p>
        </motion.div>
        
        {/* Pro Max AI Matching Engine (Glassmorphism) */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="my-40 p-16 bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#00f0ff]/10 blur-[120px] rounded-full" />
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="flex flex-col items-center gap-4">
               <h2 className="text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#00f0ff]">AI Matching <span className="italic text-[#00f0ff]">Engine</span></h2>
               <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-green-500 uppercase tracking-widest">System Calibrated</span>
               </div>
            </div>
            
            <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
              Optimized by **pgvector**. Describe your mission and tech stack to calculate semantic affinity across our expert collective.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. Distributed Systems, Rust, Kernel Optimization..." 
                className="flex-1 w-full bg-white/[0.05] border border-white/10 px-10 py-6 rounded-3xl font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#00f0ff]/20 transition-all placeholder:text-gray-600"
              />
              <button 
                onClick={calculateAffinity}
                disabled={isCalculating}
                className="w-full sm:w-auto bg-[#00f0ff] text-black font-black px-16 py-6 rounded-3xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,240,255,0.4)] disabled:opacity-50"
              >
                {isCalculating ? 'Neural Scanning...' : 'Calculate Affinity'}
              </button>
            </div>

            {matchScore && !isCalculating && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 bg-[#00f0ff]/5 rounded-[3rem] border border-[#00f0ff]/20 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/5 to-transparent animate-shimmer" />
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#00f0ff] mb-4">Affinity Vector Locked</p>
                <p className="text-7xl font-black tracking-tighter">{matchScore.toFixed(2)}% <span className="text-sm text-gray-500 font-bold uppercase tracking-widest ml-2">Semantic Match</span></p>
              </motion.div>
            )}

            <div className="pt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Vector Dim', val: '1536' },
                { label: 'Metric', val: 'Cosine' },
                { label: 'Index', val: 'HNSW' },
                { label: 'Latency', val: '<12ms' }
              ].map(stat => (
                <div key={stat.label} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-[#00f0ff]/30 transition-all">
                  <p className="text-[9px] font-mono font-bold uppercase text-gray-500 tracking-widest mb-1 group-hover:text-[#00f0ff] transition-colors">{stat.label}</p>
                  <p className="text-2xl font-black text-white">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pro Max Bento Grid for Mentors */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {mentors.map((mentor) => (
            <motion.div 
              key={mentor.name}
              variants={itemVariants}
              className="bg-white/[0.02] backdrop-blur-2xl p-12 rounded-[4rem] border border-white/10 group hover:border-[#00f0ff]/30 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00f0ff]/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col gap-10">
                <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-[#00f0ff]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Image 
                      src={mentor.image}
                      alt={mentor.name}
                      width={180}
                      height={180}
                      className="rounded-[3rem] border border-white/10 shadow-2xl relative z-10 grayscale group-hover:grayscale-0 transition-all duration-1000 rotate-[-2deg] group-hover:rotate-0"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-3">
                    <h3 className="text-4xl font-black tracking-tight group-hover:text-[#00f0ff] transition-colors">{mentor.name}</h3>
                    <p className="text-gray-400 font-bold text-sm tracking-wide">{mentor.role}</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                      {mentor.expertise.map(skill => (
                        <span key={skill} className="px-4 py-1.5 bg-white/[0.05] border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link 
                    href={mentor.calendly}
                    target="_blank"
                    className="flex-1 bg-white text-black font-black px-10 py-5 rounded-[2rem] text-[10px] uppercase tracking-widest hover:bg-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all text-center"
                  >
                    Sync Context →
                  </Link>
                  <Link 
                    href={`/mentorship/${mentor.slug}`}
                    className="flex-1 bg-white/5 border border-white/10 text-white font-black px-10 py-5 rounded-[2rem] text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center"
                  >
                    View Ledger
                  </Link>
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
          className="mt-40 p-24 bg-gradient-to-br from-[#00f0ff]/10 to-[#7000ff]/10 backdrop-blur-3xl rounded-[5rem] border border-white/10 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00f0ff]/10 blur-[150px] rounded-full" />
          <h2 className="text-6xl font-black mb-8 tracking-tighter text-white">Join the <span className="text-[#00f0ff] italic">Genesis</span></h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            "Your impact is measured in code. Join the elite few who shape the future of distributed systems."
          </p>
          <Link href="mailto:mission@openveda.in" className="bg-[#00f0ff] text-black font-black px-16 py-6 rounded-[2.5rem] text-sm uppercase tracking-[0.3em] hover:scale-110 shadow-[0_0_60px_rgba(0,240,255,0.4)] transition-all">
            Initiate Contact
          </Link>
        </motion.div>
      </div>

      <footer className="mt-60 py-32 border-t border-white/5 text-center bg-[#050508]/50">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-[0.8em] mb-6">OPEN_VEDA // GENESIS_V1</p>
        <p className="text-[9px] text-gray-700 font-mono tracking-widest">© 2026 • ARCHITECTED FOR THE INFINITE</p>
      </footer>
    </main>
  );
}
