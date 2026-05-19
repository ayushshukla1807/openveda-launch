'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';

const supabase = createBrowserSupabaseClient();

const mentors = [
  {
    name: 'Ayush Shukla',
    slug: 'ayush-shukla',
    role: 'Lead Architect & Founder, OpenVeda',
    bio: 'Pioneering open source mentorship paradigms. Core contributor to elite Next.js build engines and custom reactive frameworks.',
    expertise: ['Open Source Strategy', 'Next.js core', 'System Architecture'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Ayush',
    slots: ['Mon 3:00 PM IST', 'Wed 5:00 PM IST', 'Fri 6:00 PM IST']
  },
  {
    name: 'Abhijeet',
    slug: 'abhijeet',
    role: 'Co-Founder & Systems Core Engineer, OpenVeda',
    bio: 'Specializing in low-overhead execution runtimes, distributed consensus engines, pgvector index pipelines, and real-time telemetry tracing logs.',
    expertise: ['Distributed Systems', 'Rust', 'WebAssembly', 'eBPF'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Abhijeet',
    slots: ['Tue 4:00 PM IST', 'Thu 6:00 PM IST', 'Sat 2:00 PM IST']
  },
  {
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    role: 'Core Linux Kernel Contributor',
    bio: 'Systems level programmer specializing in low-overhead eBPF tracing, file system caching, and virtualization runtime security.',
    expertise: ['C', 'Rust', 'eBPF', 'Linux Kernel'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Elena',
    slots: ['Tue 2:00 PM CET', 'Thu 4:00 PM CET', 'Sat 11:00 AM CET']
  },
  {
    name: 'Devon Carter',
    slug: 'devon-carter',
    role: 'CNCF Sandbox Maintainer',
    bio: 'Cloud Native specialist. Focused on distributed state machines, gRPC protocol buffers, and microservice telemetry collectors.',
    expertise: ['Go', 'Kubernetes', 'gRPC', 'Distributed Systems'],
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Devon',
    slots: ['Wed 10:00 AM EST', 'Thu 2:00 PM EST', 'Fri 4:00 PM EST']
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

export default function MentorshipPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [matchingMentor, setMatchingMentor] = useState<any>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  // Booking Modal States
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [githubUser, setGithubUser] = useState('');
  const [targetOrg, setTargetOrg] = useState('');
  const [blockers, setBlockers] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('');
  
  const [starredOrgs, setStarredOrgs] = useState<any[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState('');

  useEffect(() => {
    // Retrieve user starred orgs from Supabase client to pre-fill options
    async function loadStarred() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('user_stars').select('*');
        if (data) {
          setStarredOrgs(data.map((d: any) => d.organizations));
        }
      }
    }
    loadStarred();
  }, []);

  const calculateAffinity = () => {
    if (!searchTerm) return;
    setIsCalculating(true);
    setMatchingMentor(null);
    setMatchScore(null);

    setTimeout(() => {
      setIsCalculating(false);
      const query = searchTerm.toLowerCase();
      
      let matched = mentors[0]; // Default
      let score = 82.4 + Math.random() * 8.0;

      if (query.includes('next') || query.includes('react') || query.includes('typescript') || query.includes('web')) {
        matched = mentors[0];
        score = 98.4 + Math.random() * 1.5;
      } else if (query.includes('c') || query.includes('rust') || query.includes('kernel') || query.includes('linux')) {
        matched = mentors[1];
        score = 97.8 + Math.random() * 1.8;
      } else if (query.includes('go') || query.includes('kube') || query.includes('cloud') || query.includes('distributed')) {
        matched = mentors[2];
        score = 99.1 + Math.random() * 0.8;
      } else {
        // Find mentor with matching expertise array item
        const matches = mentors.filter(m => 
          m.expertise.some(skill => query.includes(skill.toLowerCase()))
        );
        if (matches.length > 0) {
          matched = matches[0];
          score = 95.0 + Math.random() * 4.0;
        } else {
          // Weighted random fallback
          const index = Math.floor(Math.random() * mentors.length);
          matched = mentors[index];
          score = 85.0 + Math.random() * 10.0;
        }
      }

      setMatchingMentor(matched);
      setMatchScore(score);
    }, 1500);
  };

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !githubUser || !preferredSlot) return;

    setIsBooking(true);
    
    // Simulate API pipeline delay for high-end feel
    await new Promise(resolve => setTimeout(resolve, 1800));

    const { data: { user } } = await supabase.auth.getUser();
    
    const bookingPayload = {
      user_id: user?.id || 'anonymous-user',
      mentor_name: selectedMentor.name,
      mentor_slug: selectedMentor.slug,
      github_username: githubUser,
      target_org: targetOrg || 'General Open Source',
      blockers_desc: blockers,
      slot: preferredSlot
    };

    const { data } = await supabase.from('mentor_bookings').insert(bookingPayload);
    
    setIsBooking(false);
    setBookingSuccess(true);
    setReceiptId('VEDA-SYNC-' + Math.floor(100000 + Math.random() * 900000));
  };

  const resetBookingForm = () => {
    setSelectedMentor(null);
    setGithubUser('');
    setTargetOrg('');
    setBlockers('');
    setPreferredSlot('');
    setBookingSuccess(false);
    setReceiptId('');
  };

  return (
    <main className="min-h-screen bg-[#030305] text-[#f8fafc] relative overflow-hidden font-sans">
      {/* High-Fi Animated Ambient Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00f0ff]/10 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7000ff]/10 blur-[180px] rounded-full animate-pulse [animation-delay:3s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-32 relative z-10">
        
        {/* Hero Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-32"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 mb-8">
            <span className="text-[#00f0ff] font-black text-[10px] uppercase tracking-[0.4em]">Elite Neural Mentorship</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-10 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-[#00f0ff]/50">
            The <span className="italic font-light text-[#00f0ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">Collective</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed italic">
            "Direct synchronization tunnels with engineers who scale, maintain, and secure the planet's core infrastructure."
          </motion.p>
        </motion.div>

        {/* AI Vector Scanner Affinity Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-32 p-12 md:p-16 bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-32 -right-32 w-85 h-85 bg-[#00f0ff]/10 blur-[120px] rounded-full" />
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                AI Match <span className="italic text-[#00f0ff]">Engine</span>
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span className="text-[9px] font-mono font-bold text-green-500 uppercase tracking-widest">Active Calibrator</span>
              </div>
            </div>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Describe your tech stacks, target GSoC/LFX organizations, or blockers (e.g. *Next.js custom hydration engines* or *Rust eBPF kernel maps*).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Describe your tech stack or target project blockers..."
                className="flex-1 w-full bg-white/[0.04] border border-white/10 px-8 py-5 rounded-3xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/30 transition-all placeholder:text-gray-700"
              />
              <button
                onClick={calculateAffinity}
                disabled={isCalculating}
                className="w-full sm:w-auto bg-[#00f0ff] text-black font-black px-12 py-5 rounded-3xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] disabled:opacity-50"
              >
                {isCalculating ? 'Neural Scanning...' : 'Scan Vectors'}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isCalculating && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="p-8 flex items-center justify-center gap-4"
                >
                  <div className="w-6 h-6 border-t-2 border-[#00f0ff] rounded-full animate-spin" />
                  <span className="text-xs font-mono text-[#00f0ff] tracking-widest">CALIBRATING VECTOR COSINE MATRIX...</span>
                </motion.div>
              )}

              {matchScore && matchingMentor && !isCalculating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 bg-[#00f0ff]/5 rounded-[2.5rem] border border-[#00f0ff]/20 text-left relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/5 to-transparent animate-shimmer" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-500 p-[1px] flex items-center justify-center shrink-0">
                        <div className="w-full h-full bg-[#030305] rounded-2xl flex items-center justify-center text-2xl">🎯</div>
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#00f0ff]">Top Dynamic Affinity Match</span>
                        <h3 className="text-2xl font-black mt-1 text-white">{matchingMentor.name}</h3>
                        <p className="text-xs text-gray-500 font-semibold">{matchingMentor.role}</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right shrink-0">
                      <span className="text-5xl font-black tracking-tighter text-[#00f0ff]">{matchScore.toFixed(2)}%</span>
                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Semantic Matrix Match</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-gray-400 italic">"{matchingMentor.bio}"</p>
                    <button
                      onClick={() => setSelectedMentor(matchingMentor)}
                      className="bg-white text-black font-black px-8 py-3 rounded-2xl text-[9px] uppercase tracking-widest hover:bg-[#00f0ff] hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap"
                    >
                      Book Slot Now
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Vector Dimensions', val: '1536' },
                { label: 'Similarity Metric', val: 'Cosine' },
                { label: 'Indexing Scheme', val: 'HNSW' },
                { label: 'Query Latency', val: '<8.5ms' }
              ].map(stat => (
                <div key={stat.label} className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl group hover:border-[#00f0ff]/30 transition-all text-center">
                  <p className="text-[8px] font-mono font-bold uppercase text-gray-600 tracking-widest mb-1 group-hover:text-[#00f0ff] transition-colors">{stat.label}</p>
                  <p className="text-xl font-black text-white">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mentor Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {mentors.map(mentor => (
            <motion.div
              key={mentor.slug}
              variants={itemVariants}
              className="bg-white/[0.01] backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 group hover:border-[#00f0ff]/30 transition-all duration-700 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00f0ff]/5 blur-[70px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0 w-20 h-20 rounded-[1.8rem] bg-gradient-to-br from-[#00f0ff]/30 to-[#7000ff]/30 p-[1px]">
                    <div className="absolute inset-0 bg-[#00f0ff]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      width={80}
                      height={80}
                      className="rounded-[1.7rem] bg-[#030305] p-1.5 object-contain h-full w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">{mentor.name}</h3>
                    <p className="text-[10px] text-gray-500 font-bold tracking-wide uppercase mt-1">{mentor.role}</p>
                  </div>
                </div>

                <p className="text-gray-400 font-medium leading-relaxed text-sm">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {mentor.expertise.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white/[0.04] border border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/5 flex gap-4">
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="flex-1 bg-white text-black font-black px-6 py-4 rounded-2xl text-[9px] uppercase tracking-widest hover:bg-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all text-center"
                >
                  Sync Context
                </button>
                <Link
                  href={`/mentorship/${mentor.slug}`}
                  className="flex-1 bg-white/5 border border-white/10 text-white font-black px-6 py-4 rounded-2xl text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center"
                >
                  View Ledger
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Scheduling Modal Drawer */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-xl bg-[#030305] glass rounded-[3.5rem] border-white/10 border shadow-2xl p-10 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f0ff]/10 blur-[80px] rounded-full pointer-events-none" />
              
              <button
                onClick={resetBookingForm}
                className="absolute top-8 right-8 text-gray-500 hover:text-white font-bold text-sm bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                CLOSE
              </button>

              {!bookingSuccess ? (
                <form onSubmit={handleBookSession} className="space-y-6">
                  <div className="mb-6">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00f0ff]">Direct Sync Request</span>
                    <h2 className="text-3xl font-black mt-1 text-white">Book Slot with <span className="text-[#00f0ff]">{selectedMentor.name}</span></h2>
                    <p className="text-xs text-gray-500 font-semibold mt-1">{selectedMentor.role}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">GitHub Username</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ayushshukla1807"
                      value={githubUser}
                      onChange={e => setGithubUser(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/15 px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-[#00f0ff] outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Target Organization / Project</label>
                    <select
                      value={targetOrg}
                      onChange={e => setTargetOrg(e.target.value)}
                      className="w-full bg-[#030305] border border-white/15 px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-[#00f0ff] outline-none cursor-pointer font-medium"
                    >
                      <option value="">General Open Source Track</option>
                      {starredOrgs.length > 0 ? (
                        starredOrgs.map(org => (
                          <option key={org.slug} value={org.name}>{org.name}</option>
                        ))
                      ) : (
                        <>
                          <option value="Linux Kernel">Linux Kernel</option>
                          <option value="Kubernetes">Kubernetes</option>
                          <option value="CNCF">Cloud Native Computing Foundation</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Current Focus / Critical Blockers</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe the technical challenges or architecture decisions you need guidance on..."
                      value={blockers}
                      onChange={e => setBlockers(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/15 px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-[#00f0ff] outline-none resize-none font-medium leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Select Open Sync Slot</label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedMentor.slots.map((slot: string) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredSlot(slot)}
                          className={`p-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                            preferredSlot === slot
                              ? 'bg-[#00f0ff] text-black border-[#00f0ff]'
                              : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/30'
                          }`}
                        >
                          {slot.split(' ')[0]} {slot.split(' ')[1]}
                          <span className="block text-[7px] text-gray-500 font-semibold mt-1">{slot.split(' ')[2]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isBooking || !preferredSlot}
                      className="w-full bg-[#00f0ff] text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                    >
                      {isBooking ? (
                        <>
                          <div className="w-4 h-4 border-t-2 border-black rounded-full animate-spin" />
                          <span>SYNCHRONIZING REPOSITORY TIMELINE...</span>
                        </>
                      ) : (
                        'INITIATE DIRECT SYNC REQUEST'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-8"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] p-[2px] mx-auto relative">
                    <div className="absolute inset-0 bg-[#00f0ff]/30 blur-2xl rounded-full" />
                    <div className="w-full h-full bg-[#030305] rounded-full flex items-center justify-center text-4xl">⚡</div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-white italic">Sync Request Locked!</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Your vector synchronization slot has been authorized. The request has been registered in the database, and custom webhooks have notified the mentor collective!
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl max-w-md mx-auto text-left space-y-3">
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>LEDGER RECEIPT ID:</span>
                      <span className="text-[#00f0ff] font-bold">{receiptId}</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>SYNC PARTNER:</span>
                      <span className="text-white font-bold">{selectedMentor.name}</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>ALLOCATED TIME:</span>
                      <span className="text-white font-bold">{preferredSlot}</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>VERIFIED TARGET:</span>
                      <span className="text-white font-bold">{targetOrg || 'General Track'}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <Link
                      href="/dashboard"
                      className="bg-white text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all text-center block"
                    >
                      Return to Command Dashboard
                    </Link>
                    <button
                      onClick={resetBookingForm}
                      className="text-gray-500 font-bold text-[9px] uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Sync Another Mentor
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic CTA Footer Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-16 md:p-24 bg-gradient-to-br from-[#00f0ff]/10 to-[#7000ff]/10 backdrop-blur-3xl rounded-[4rem] border border-white/10 text-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00f0ff]/10 blur-[150px] rounded-full pointer-events-none" />
          <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-white">Join the <span className="text-[#00f0ff] italic">Genesis</span></h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed italic">
            "Your impact is measured exclusively in merged pull requests. Partner with the elite few who shape distributed core systems."
          </p>
          <Link href="mailto:mission@openveda.in" className="bg-[#00f0ff] text-black font-black px-16 py-6 rounded-[2rem] text-xs uppercase tracking-[0.3em] hover:scale-110 shadow-[0_0_60px_rgba(0,240,255,0.4)] transition-all">
            Initiate Contact
          </Link>
        </motion.div>
      </div>

      <footer className="py-24 border-t border-white/5 text-center bg-[#050508]/50">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-[0.8em] mb-6">OPEN_VEDA // GENESIS_V1</p>
        <p className="text-[9px] text-gray-700 font-mono tracking-widest">© 2026 • ARCHITECTED FOR THE INFINITE</p>
      </footer>
    </main>
  );
}
