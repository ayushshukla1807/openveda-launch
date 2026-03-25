'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrgCard from '@/components/ui/OrgCard';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createBrowserSupabaseClient();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [starredOrgs, setStarredOrgs] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData || { username: user.email?.split('@')[0] });

      const { data: stars } = await supabase
        .from('user_stars')
        .select('org_id, organizations(*)')
        .eq('user_id', user.id);
      setStarredOrgs(stars?.map(s => s.organizations) || []);

      // Fetch proposals
      const { data: proposalData } = await supabase
        .from('user_proposals')
        .select('*, organizations(name)')
        .eq('user_id', user.id);
      setProposals(proposalData || []);

      // Fetch journey progress
      const { data: progData } = await supabase
        .from('user_progress')
        .select('completed_steps')
        .eq('user_id', user.id)
        .single();
      
      if (progData?.completed_steps) {
        setJourneyProgress(Math.round((progData.completed_steps.length / 7) * 100)); // 7 total steps
      }

      setLoading(false);
    }
    fetchData();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[180px] rounded-full animate-mesh-gradient [animation-delay:5s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">Contributor Command Center</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground italic">{profile?.username}</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground font-medium max-w-xl">
                Your roadmap to open-source mastery. Track progress, find opportunities, and scale your impact.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/organizations" className="glass px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">
                Explore Projects
              </Link>
            </div>
          </motion.div>


          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 glass p-10 rounded-[3rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors" />
               <p className="text-muted-foreground font-black text-xs uppercase tracking-widest mb-6">Target Organizations</p>
               <div className="flex items-end gap-4">
                 <h3 className="text-7xl font-black tracking-tighter leading-none">{starredOrgs.length}</h3>
                 <span className="text-primary font-black mb-2 text-sm uppercase tracking-widest">Active Goals</span>
               </div>
            </div>
            <div className="glass p-10 rounded-[3rem] border-border">
               <p className="text-muted-foreground font-black text-xs uppercase tracking-widest mb-6">Proposals Generated</p>
               <h3 className="text-5xl font-black tracking-tighter">{proposals.length.toString().padStart(2, '0')}</h3>
               <p className="text-xs font-bold text-muted-foreground mt-2 uppercase italic">Ready for Review</p>
            </div>
            <div className="bg-primary p-10 rounded-[3rem] text-primary-foreground">
               <p className="font-black text-xs uppercase tracking-widest mb-6 opacity-60">Mission Progress</p>
               <h3 className="text-5xl font-black tracking-tighter">{journeyProgress}%</h3>
               <p className="text-xs font-bold mt-2 uppercase opacity-60">Personal Journey</p>
            </div>
          </motion.div>


          <motion.div variants={itemVariants} className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-tight">My GSoC <span className="text-muted-foreground">Proposals</span></h2>
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-muted px-4 py-2 rounded-full border border-border">Auto-Saved</span>
            </div>
            
            {proposals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="p-8 glass rounded-[2.5rem] border-border hover:border-primary/30 transition-all group">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-lg">
                        {proposal.organizations?.name || 'GSoC Draft'}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground">
                        Updated {new Date(proposal.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-4 leading-tight">{proposal.title}</h3>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => {
                          const blob = new Blob([proposal.content_markdown], { type: 'text/markdown' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Saved_${proposal.title.replace(/\s+/g, '_')}.md`;
                          a.click();
                        }}
                        className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Download PDF
                      </button>
                      <button className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                        Edit Draft
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 glass rounded-[3rem] border-dashed border-border border-2 text-center">
                <p className="text-muted-foreground font-bold italic">No proposals exported yet. Visit a playbook to get started.</p>
              </div>
            )}
          </motion.div>


          <motion.div variants={itemVariants} className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-tight">My Target <span className="text-muted-foreground">Organizations</span></h2>
              <Link 
        href="/organizations"
        className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
      >
        View All Organizations
      </Link>
            </div>
            
            {starredOrgs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {starredOrgs.map((org: any) => (
                  <OrgCard key={org.slug} {...org} />
                ))}
              </div>
            ) : (
              <div className="glass rounded-[3rem] p-24 text-center border-dashed border-border border-4">
                <span className="text-6xl mb-8 block grayscale opacity-30">🔭</span>
                <h3 className="text-2xl font-black text-foreground mb-4 italic">No targets locked yet.</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                  Start your journey by exploring organizations and starring your target projects.
                </p>
                <Link href="/organizations" className="bg-foreground text-background font-black px-10 py-5 rounded-3xl text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                  Begin Exploration
                </Link>
              </div>
            )}
          </motion.div>


          <motion.div variants={itemVariants} className="p-12 glass rounded-[3rem] border-primary/20 relative overflow-hidden group">
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 blur-[100px]" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-black mb-4 tracking-tight underline decoration-primary decoration-4 underline-offset-8">Perfect Your Profile</h2>
                <p className="text-muted-foreground font-medium max-w-sm">Complete your skill matrix to unlock personalized issue recommendations from GitHub.</p>
              </div>
              <button className="bg-muted border border-border hover:bg-foreground hover:text-background font-black px-10 py-5 rounded-3xl text-xs uppercase tracking-widest transition-all">
                Update Profile
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • CONTRIBUTOR FIRST</p>
      </footer>
    </main>
  );
}
