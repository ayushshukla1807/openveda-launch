'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReadinessBadge from '@/components/ui/ReadinessBadge';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import { 
  Plus, Search, Edit3, Trash2, Download, CheckCircle, X, Send, 
  MessageSquare, Star, ArrowUpRight, Activity, BookOpen, Clock
} from 'lucide-react';

const supabase = createBrowserSupabaseClient();

const roadmapSteps = [
  { id: '1', title: 'Complete pgvector & matrix alignment', desc: 'Sync your profile metrics and background stack.' },
  { id: '2', title: 'Star target organizations', desc: 'Audit and shortlist GSoC/LFX projects on the discovery page.' },
  { id: '3', title: 'Analyze unwritten codebase rules', desc: 'Secure local sync context and understand repository layout.' },
  { id: '4', title: 'Perform initial system audit', desc: 'Identify core scalability bottlenecks in CNCF/playbook repos.' },
  { id: '5', title: 'Select low-latency good first issues', desc: 'Secure LFX pre-requisites by submitting proactive PRs.' },
  { id: '6', title: 'Generate premium proposal drafts', desc: 'Use OpenVeda Playbooks to draft technical specs.' },
  { id: '7', title: 'Finalize review & submit ledger', desc: 'Align sync goals with mentors and lock draft proposal.' }
];

interface Proposal {
  id: string;
  title: string;
  content_markdown: string;
  status: string;
  org_id: string;
  updated_at: string;
  organizations?: {
    name: string;
  };
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ActivityLog {
  id: string;
  event: string;
  timestamp: string;
  type: 'auth' | 'crud' | 'progress' | 'star';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function DashboardPage() {
  const router = useRouter();
  
  // Basic states
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [starredOrgs, setStarredOrgs] = useState<any[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [organizationsList, setOrganizationsList] = useState<any[]>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search, Filter, Sort States for Proposals
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal / CRUD Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProposal, setActiveProposal] = useState<Partial<Proposal> | null>(null);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [proposalToDelete, setProposalToDelete] = useState<string | null>(null);

  // Custom Toast System
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Activity Log State
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const addActivityLog = (event: string, type: ActivityLog['type']) => {
    const log: ActivityLog = {
      id: Math.random().toString(36).substring(2, 9),
      event,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type
    };
    setActivityLogs(prev => [log, ...prev.slice(0, 7)]);
  };

  // Chatbot Drawer State
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'ai', text: "Welcome to OpenVeda Command AI. Ask me about your target programs (GSoC 2026, LFX), playbook architectures, or how to submit your first proactive PR!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }
        setUser(user);
        addActivityLog("Secure session established successfully", "auth");

        // Profile details
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profileData || { username: user.email?.split('@')[0] });

        // Starred organizations
        const { data: stars } = await supabase
          .from('user_stars')
          .select('org_id, organizations(*)')
          .eq('user_id', user.id);
        setStarredOrgs(stars?.map(s => s.organizations).filter(Boolean) || []);

        // Proposals list
        const { data: proposalData } = await supabase
          .from('user_proposals')
          .select('*, organizations(name)')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        setProposals((proposalData as any) || []);

        // Complete list of organizations for proposal select
        const { data: orgList } = await supabase
          .from('organizations')
          .select('id, name')
          .order('name');
        setOrganizationsList(orgList || []);

        // Journey progress checklist state
        const { data: progData } = await supabase
          .from('user_progress')
          .select('completed_steps')
          .eq('user_id', user.id)
          .single();
        
        if (progData?.completed_steps) {
          setCompletedSteps(progData.completed_steps);
          setJourneyProgress(Math.round((progData.completed_steps.length / roadmapSteps.length) * 100));
        }

        addActivityLog("Dynamic command ledger loaded", "auth");
        setLoading(false);
      } catch (err) {
        console.error("Dashboard init error:", err);
        showToast("Error establishing network sync", "error");
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  // Dynamic Toggle for Roadmap Checklist
  const handleToggleStep = async (stepId: string, stepTitle: string) => {
    try {
      const updatedSteps = completedSteps.includes(stepId)
        ? completedSteps.filter(id => id !== stepId)
        : [...completedSteps, stepId];
      
      setCompletedSteps(updatedSteps);
      setJourneyProgress(Math.round((updatedSteps.length / roadmapSteps.length) * 100));

      const { error } = await supabase.from('user_progress').upsert({
        user_id: user.id,
        completed_steps: updatedSteps,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

      if (error) throw error;

      const isDone = updatedSteps.includes(stepId);
      addActivityLog(
        `${isDone ? 'Completed' : 'Reopened'}: ${stepTitle}`,
        "progress"
      );
      showToast(isDone ? "Roadmap checkpoint saved!" : "Checkpoint reopened", "info");
    } catch (err) {
      console.error("Toggle step error:", err);
      showToast("Sync progress failed", "error");
    }
  };

  // Dynamic star unbookmarking from dashboard
  const handleUnstarOrg = async (orgId: string, orgName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { error } = await supabase
        .from('user_stars')
        .delete()
        .eq('user_id', user.id)
        .eq('org_id', orgId);

      if (error) throw error;

      setStarredOrgs(prev => prev.filter(org => org.id !== orgId));
      addActivityLog(`Unstarred organization: ${orgName}`, "star");
      showToast(`Removed star from ${orgName}`, "success");
    } catch (err) {
      console.error("Unstar error:", err);
      showToast("Database unstar failed", "error");
    }
  };

  // Proposal Form Submission (Create or Update)
  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!activeProposal?.title?.trim()) {
      setFormError("Title is strictly required");
      return;
    }
    if (!activeProposal?.org_id) {
      setFormError("You must select a target organization");
      return;
    }
    if (!activeProposal?.content_markdown?.trim()) {
      setFormError("Content markdown template cannot be empty");
      return;
    }

    setFormLoading(true);
    try {
      const payload = {
        user_id: user.id,
        org_id: activeProposal.org_id,
        title: activeProposal.title,
        content_markdown: activeProposal.content_markdown,
        status: activeProposal.status || 'draft',
        updated_at: new Date().toISOString()
      };

      let resultError;
      if (activeProposal.id) {
        // Edit mode
        const { error } = await supabase
          .from('user_proposals')
          .update(payload)
          .eq('id', activeProposal.id);
        resultError = error;
      } else {
        // Create mode
        const { error } = await supabase
          .from('user_proposals')
          .insert([payload]);
        resultError = error;
      }

      if (resultError) throw resultError;

      // Reload proposals
      const { data: proposalData } = await supabase
        .from('user_proposals')
        .select('*, organizations(name)')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      setProposals((proposalData as any) || []);

      showToast(activeProposal.id ? "Proposal successfully updated" : "New proposal draft generated!");
      addActivityLog(
        activeProposal.id ? `Updated proposal: ${activeProposal.title}` : `Created proposal draft: ${activeProposal.title}`,
        "crud"
      );
      setIsModalOpen(false);
      setActiveProposal(null);
    } catch (err) {
      console.error("Save proposal error:", err);
      showToast("Error saving ledger", "error");
    } finally {
      setFormLoading(false);
    }
  };

  // Trigger Edit Form
  const handleEditProposal = (prop: Proposal) => {
    setActiveProposal({
      id: prop.id,
      title: prop.title,
      org_id: prop.org_id,
      content_markdown: prop.content_markdown,
      status: prop.status
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Trigger Delete Confirm Dialog
  const handleDeleteProposalClick = (id: string) => {
    setProposalToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!proposalToDelete) return;
    try {
      const target = proposals.find(p => p.id === proposalToDelete);
      const { error } = await supabase
        .from('user_proposals')
        .delete()
        .eq('id', proposalToDelete);

      if (error) throw error;

      setProposals(prev => prev.filter(p => p.id !== proposalToDelete));
      showToast("Proposal safely discarded", "success");
      addActivityLog(`Discarded proposal: ${target?.title || 'Unknown'}`, "crud");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete proposal", "error");
    } finally {
      setIsDeleteConfirmOpen(false);
      setProposalToDelete(null);
    }
  };

  // Handle AI Chatbot Submission with Fallback
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      // Simulate network request delay for premium feel
      await new Promise(resolve => setTimeout(resolve, 800));

      const lower = userMessage.toLowerCase();
      let reply = "";

      if (lower.includes("lfx") || lower.includes("linux")) {
        reply = "LFX Mentorship is highly selective. To stand out, clone the repository, audit open issues, and start writing pre-requisite pull requests before the application window opens. Our Roadmap checklists below tracks this exactly!";
      } else if (lower.includes("gsoc") || lower.includes("google")) {
        reply = "For Google Summer of Code 2026, the key is to build direct synchronization context with organization maintainers. Leverage our Playbook profiles, lock your starred organizations, and begin drafting your technical ledger proposal today.";
      } else if (lower.includes("proposal") || lower.includes("draft")) {
        reply = "Drafting a proposal is simple in OpenVeda! Simply click the 'Create Draft' button in the GSoC Proposals section. You can choose any organization, draft in Markdown, save to our cloud database, and download the ledger instantly.";
      } else if (lower.includes("playbook")) {
        reply = "OpenVeda Playbooks analyze internal architectures, system dependencies, and 'unwritten rules' of top open-source repositories to give you a definitive contribution playbook.";
      } else {
        reply = "I've logged your query into the OpenVeda matrix. Focus on shortlisting organizations, completing your Roadmap milestones (such as setting up the local sync context), and drafting beautiful proposals in our Proposals panel!";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      addActivityLog(`Consulted AI Assistant: "${userMessage.substring(0, 20)}..."`, "progress");
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: "Connection with the AI nexus disrupted. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Filter and Search Proposals locally
  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.organizations?.name && p.organizations.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && p.status === statusFilter;
  });

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground relative transition-colors duration-300">
      {/* Dynamic Toast Notifications Overlay */}
      <div className="fixed top-24 right-8 z-[100] flex flex-col gap-4 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className={`p-5 rounded-2xl glass shadow-2xl border flex items-center gap-3 pointer-events-auto ${
                toast.type === 'error' ? 'border-red-500/30 text-red-500 bg-red-500/5' :
                toast.type === 'info' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' :
                'border-primary/30 text-primary bg-primary/5'
              }`}
            >
              <div className="flex-1 text-xs font-black tracking-wide uppercase">{toast.message}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Futuristic Mesh Backgrounds */}
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
          {/* Dashboard Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">Contributor Command Center</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground italic">{profile?.username}</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
                Your direct roadmap to open-source mastery. Manage proposal blueprints, audit target repositories, and deploy dynamic pull requests.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/organizations" className="glass px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">
                Explore Projects
              </Link>
            </div>
          </motion.div>

          {/* Analytics Overview Bento Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <ReadinessBadge 
                score={88.42} 
                username={profile?.username || 'contributor'} 
                breakdown={{
                  frequency: 0.92,
                  quality: 0.85,
                  stack: 0.78,
                  complexity: 0.95,
                  consistency: 0.88
                }}
              />
            </div>
            <div className="glass p-10 rounded-[3rem] border-border flex flex-col justify-center">
              <p className="text-muted-foreground font-black text-xs uppercase tracking-widest mb-6">Tier Status</p>
              <h3 className="text-4xl font-black tracking-tighter text-primary italic">CERTIFIED</h3>
              <p className="text-xs font-bold text-muted-foreground mt-2 uppercase italic">85+ Readiness Score</p>
            </div>
            <div className="bg-primary p-10 rounded-[3rem] text-primary-foreground flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full group-hover:scale-125 transition-transform" />
              <p className="font-black text-xs uppercase tracking-widest mb-6 opacity-60">Mission Progress</p>
              <h3 className="text-6xl font-black tracking-tighter">{journeyProgress}%</h3>
              <p className="text-xs font-bold mt-2 uppercase opacity-60">Roadmap Milestones completed</p>
            </div>
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Columns - Proposals & Stars */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Proposals Section (CRUD) */}
              <motion.div variants={itemVariants} className="space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tight">Technical <span className="text-muted-foreground">Proposals</span></h2>
                    <p className="text-sm text-muted-foreground">Secure database records. Create, update, or export draft blueprints.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveProposal({ title: '', org_id: '', content_markdown: '', status: 'draft' });
                      setFormError('');
                      setIsModalOpen(true);
                    }}
                    className="bg-primary text-primary-foreground font-black px-6 py-4 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Draft</span>
                  </button>
                </div>

                {/* Search & Status Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search proposal or org..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-muted/30 glass px-6 py-4 rounded-xl text-xs text-foreground placeholder-muted-foreground focus:ring-1 focus:ring-primary outline-none border-border"
                    />
                    <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-muted/30 glass px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-foreground outline-none cursor-pointer border-border min-w-[160px]"
                  >
                    <option value="all">All Drafts</option>
                    <option value="draft">Drafting</option>
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                  </select>
                </div>

                {/* Proposals Interactive List */}
                {filteredProposals.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                      {filteredProposals.map((proposal) => (
                        <motion.div 
                          key={proposal.id} 
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-8 glass rounded-[2.5rem] border-border hover:border-primary/30 transition-all flex flex-col justify-between group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none" />
                          <div>
                            <div className="flex items-center justify-between mb-6">
                              <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-lg">
                                {proposal.organizations?.name || 'GSoC Blueprint'}
                              </span>
                              <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                                proposal.status === 'approved' ? 'text-green-400 border-green-500/20 bg-green-500/5' :
                                proposal.status === 'submitted' ? 'text-blue-400 border-blue-500/20 bg-blue-500/5' :
                                'text-amber-500 border-amber-500/20 bg-amber-500/5'
                              }`}>
                                {proposal.status}
                              </span>
                            </div>
                            <h3 className="text-xl font-black text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">{proposal.title}</h3>
                            <p className="text-[10px] text-muted-foreground font-mono mb-8">
                              Last sync: {new Date(proposal.updated_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                            <button 
                              onClick={() => {
                                const blob = new Blob([proposal.content_markdown], { type: 'text/markdown' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `OpenVeda_${proposal.title.replace(/\s+/g, '_')}.md`;
                                a.click();
                                showToast("Markdown report generated!");
                                addActivityLog(`Exported proposal: ${proposal.title}`, "crud");
                              }}
                              className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Export</span>
                            </button>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => handleEditProposal(proposal)}
                                className="p-2 hover:bg-muted rounded-lg transition-all text-muted-foreground hover:text-primary"
                                title="Edit Blueprint"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProposalClick(proposal.id)}
                                className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-muted-foreground hover:text-red-500"
                                title="Delete Blueprint"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="p-16 glass rounded-[3rem] border-dashed border-border border-2 text-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-bold italic">No proposals match current filters. Generate or edit a proposal draft to get started.</p>
                  </div>
                )}
              </motion.div>

              {/* Starred Organizations Bookmark List */}
              <motion.div variants={itemVariants} className="space-y-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">Locked <span className="text-muted-foreground">Targets</span></h2>
                    <p className="text-sm text-muted-foreground">Bookmarked organizations sync state. Click to enter playbooks.</p>
                  </div>
                  <Link href="/organizations" className="text-muted-foreground hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest">
                    Manage Starred
                  </Link>
                </div>
                
                {starredOrgs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <AnimatePresence>
                      {starredOrgs.map((org: any) => (
                        <motion.div 
                          key={org.slug} 
                          layout
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="glass rounded-[2.5rem] p-8 border border-border relative overflow-hidden group hover:border-primary/30 transition-all flex flex-col justify-between"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex items-start gap-4 justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="relative h-12 w-12 shrink-0 bg-muted rounded-xl border border-border flex items-center justify-center p-2">
                                {org.logo_url ? (
                                  <Image src={org.logo_url} alt={`${org.name}`} fill className="rounded-lg object-contain p-1" />
                                ) : (
                                  <span className="text-lg font-black text-muted-foreground">{org.name.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-1">{org.name}</h3>
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">{org.program || 'GSoC 2026'}</p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleUnstarOrg(org.id, org.name, e)}
                              className="p-2 bg-muted hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                              title="Unstar Organization"
                            >
                              <Star className="w-3.5 h-3.5 fill-primary text-primary hover:fill-none hover:text-red-500 transition-all" />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {org.tech_stack?.slice(0, 3).map((tech: string) => (
                              <span key={tech} className="bg-muted/50 border border-border text-muted-foreground text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <Link 
                            href={`/playbook/${org.slug}`}
                            className="w-full bg-muted border border-border group-hover:bg-primary group-hover:text-primary-foreground font-black py-3.5 rounded-xl text-[9px] uppercase tracking-widest hover:scale-[1.02] transition-all text-center flex items-center justify-center gap-1.5"
                          >
                            <span>Open Playbook</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="glass rounded-[3rem] p-16 text-center border-dashed border-border border-2">
                    <span className="text-5xl mb-6 block grayscale opacity-30">🔭</span>
                    <h3 className="text-xl font-black text-foreground mb-2 italic">Target grid offline</h3>
                    <p className="text-muted-foreground text-xs font-medium max-w-xs mx-auto mb-8 leading-relaxed">
                       शॉर्टलिस्ट a target organization to dynamically display real-time contribution checklists.
                    </p>
                    <Link href="/organizations" className="bg-foreground text-background font-black px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                      Begin Exploration
                    </Link>
                  </div>
                )}
              </motion.div>

            </div>

            {/* Right Column - Checklist & Live Activity Logs */}
            <div className="space-y-16">
              
              {/* Journey Milestones Checklist */}
              <motion.div variants={itemVariants} className="p-8 glass rounded-[3.5rem] border-border space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none" />
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <span>Mission</span>
                    <span className="text-primary italic">Roadmap</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">Interactive checklist. Automatically updates progress sync metrics.</p>
                </div>

                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin">
                  {roadmapSteps.map((step) => {
                    const isCompleted = completedSteps.includes(step.id);
                    return (
                      <div 
                        key={step.id}
                        onClick={() => handleToggleStep(step.id, step.title)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                          isCompleted ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/10 hover:border-primary/20'
                        }`}
                      >
                        <div className="pt-0.5">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isCompleted ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-background'
                          }`}>
                            {isCompleted && <CheckCircle className="w-4 h-4 fill-primary text-primary-foreground" />}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className={`text-xs font-black uppercase tracking-wide transition-colors ${
                            isCompleted ? 'text-primary' : 'text-foreground'
                          }`}>{step.title}</h4>
                          <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Dynamic Activity logs */}
              <motion.div variants={itemVariants} className="p-8 glass rounded-[3.5rem] border-border space-y-6 relative">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span>Sync</span>
                    <span className="text-muted-foreground">Ledger</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">Dynamic log of secure database transactions.</p>
                </div>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  <AnimatePresence initial={false}>
                    {activityLogs.length > 0 ? (
                      activityLogs.map(log => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[10px] border-b border-border/40 pb-3 flex items-start justify-between gap-4 font-mono"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-primary font-black">[{log.type.toUpperCase()}]</span>
                            <span className="text-muted-foreground leading-normal">{log.event}</span>
                          </div>
                          <span className="text-gray-500 shrink-0">{log.timestamp}</span>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-[10px] text-muted-foreground font-mono italic text-center py-8">
                        Awaiting network actions...
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

            </div>

          </div>

          {/* Project Showcase Section */}
          <motion.div variants={itemVariants}>
            <ProjectShowcase />
          </motion.div>

          {/* Dynamic Footer Card */}
          <motion.div variants={itemVariants} className="p-12 glass rounded-[3rem] border-primary/20 relative overflow-hidden group">
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 blur-[100px]" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-black mb-4 tracking-tight underline decoration-primary decoration-4 underline-offset-8">Consult Command AI</h2>
                <p className="text-muted-foreground font-medium max-w-sm">Access live playbooks and secure advice regarding LFX, GSoC, and core systems engineering.</p>
              </div>
              <button 
                onClick={() => setChatbotOpen(true)}
                className="bg-primary text-primary-foreground font-black px-10 py-5 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                Launch Chatbot
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* CRUD Modal for Create / Edit Proposal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-muted/80 glass border border-border rounded-[3.5rem] p-10 relative z-10 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-3 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-3xl font-black tracking-tight mb-8">
                {activeProposal?.id ? 'Edit Proposal' : 'New GSoC Proposal'}
              </h2>

              <form onSubmit={handleSubmitProposal} className="space-y-6">
                
                {formError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-black uppercase tracking-wide">
                    {formError}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Proposal Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GSoC 2026: Low latency event streaming in Microcks"
                    value={activeProposal?.title || ''}
                    onChange={e => setActiveProposal(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-background border border-border px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Target Organization</label>
                    <select
                      required
                      value={activeProposal?.org_id || ''}
                      onChange={e => setActiveProposal(prev => ({ ...prev, org_id: e.target.value }))}
                      className="w-full bg-background border border-border px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                    >
                      <option value="">Choose organization...</option>
                      {organizationsList.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Current Status</label>
                    <select
                      value={activeProposal?.status || 'draft'}
                      onChange={e => setActiveProposal(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-background border border-border px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                    >
                      <option value="draft">Drafting</option>
                      <option value="submitted">Submitted</option>
                      <option value="approved">Approved</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Markdown Specifications</label>
                    <span className="text-[8px] font-mono text-gray-500">Supports Markdown</span>
                  </div>
                  <textarea
                    rows={8}
                    required
                    placeholder="# GSoC 2026 Project Ledger&#10;&#10;## 1. Abstract&#10;Describe your system design, APIs, and roadmap milestones..."
                    value={activeProposal?.content_markdown || ''}
                    onChange={e => setActiveProposal(prev => ({ ...prev, content_markdown: e.target.value }))}
                    className="w-full bg-background border border-border px-6 py-4 rounded-xl text-xs text-foreground focus:ring-1 focus:ring-primary outline-none font-mono resize-y"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-4 bg-muted hover:bg-background rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-8 py-4 bg-primary text-primary-foreground hover:scale-105 active:scale-95 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    {formLoading ? 'Synchronizing...' : activeProposal?.id ? 'Update Draft' : 'Submit Ledger'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog Modal */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-muted/80 glass border border-border rounded-[2.5rem] p-8 relative z-10 shadow-2xl space-y-6"
            >
              <h3 className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-500" />
                <span>Confirm Proposal Discard</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This action is irreversible. The proposal draft will be permanently purged from the cloud Supabase ledger. Are you sure you wish to proceed?
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-5 py-3.5 bg-muted hover:bg-background rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-3.5 bg-red-500 text-white hover:bg-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  Discard Draft
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating AI Chatbot Assistant Widget & Drawer */}
      <div className="fixed bottom-8 right-8 z-40">
        {!chatbotOpen ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setChatbotOpen(true)}
            className="p-5 bg-primary text-primary-foreground rounded-full shadow-[0_15px_40px_rgba(var(--primary-rgb),0.3)] hover:shadow-primary/40 border border-primary/20 flex items-center justify-center transition-all"
            title="Launch Command AI Chatbot"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm sm:w-[400px] h-[500px] bg-muted/90 glass border border-border rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chatbot Header */}
            <div className="px-6 py-4 border-b border-border/80 flex items-center justify-between bg-background/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Command AI Assistant</span>
              </div>
              <button 
                onClick={() => setChatbotOpen(false)}
                className="p-2 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-4 rounded-2xl max-w-[80%] text-[11px] leading-relaxed font-medium ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-background border border-border text-foreground rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="p-4 bg-background border border-border rounded-2xl rounded-bl-none text-[11px] max-w-[80%] text-muted-foreground italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Chip Buttons */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-border/30 bg-background/10">
              {[
                "Strategy GSoC 2026",
                "LFX application tips",
                "Drafting proposals"
              ].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => { setChatInput(prompt); }}
                  className="px-3 py-1.5 bg-background border border-border hover:border-primary text-[8px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary rounded-lg transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border/80 flex items-center gap-3 bg-background/50">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask OpenVeda AI..."
                className="flex-1 bg-background border border-border px-5 py-3 text-xs text-foreground placeholder-muted-foreground rounded-xl outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="p-3 bg-primary text-primary-foreground hover:scale-105 active:scale-95 rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • CONTRIBUTOR FIRST</p>
      </footer>
    </main>
  );
}
