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
  MessageSquare, Star, ArrowUpRight, Activity, BookOpen, Clock,
  Sparkles, ShieldCheck, MapPin, Cpu, BarChart2, DollarSign
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

  // Active Tab Manager
  const [activeTab, setActiveTab] = useState<'milestones' | 'systemsLab'>('milestones');

  // 1. Blinkit / Zepto Proximity Router
  const [routingHub, setRoutingHub] = useState('Delhi-NCR');
  const [orderDensity, setOrderDensity] = useState(100);
  const [routingState, setRoutingState] = useState<'idle' | 'computing' | 'done'>('idle');
  const [routingLog, setRoutingLog] = useState<string[]>([]);
  const [routingAdherence, setRoutingAdherence] = useState(0);

  // 2. InShorts AI Filter
  const [recommenderQuery, setRecommenderQuery] = useState('systems, rust');
  const [recommenderState, setRecommenderState] = useState<'idle' | 'filtering' | 'done'>('idle');
  const [recommendedFeed, setRecommendedFeed] = useState<any[]>([]);

  // 3. eBay Bid Mutex
  const [auctionBid, setAuctionBid] = useState(1420);
  const [userBidValue, setUserBidValue] = useState('');
  const [auctionLogs, setAuctionLogs] = useState<string[]>([
    "[SYSTEM INITIALIZED] Concurrent bidders listening on port 8081",
    "[LISTENER] thread-04 connected. Initial bid registered at $1,400"
  ]);

  // 4. Spark Telemetry
  const [cpuPulse, setCpuPulse] = useState<number[]>([42, 45, 48, 52, 58, 62, 55, 52, 48, 51]);

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

  // Chatbot Drawer State
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'ai', text: "Welcome to OpenVeda Command AI. Ask me about your target programs (GSoC 2027, LFX), playbook architectures, or how to submit your first proactive PR!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Activity Log State
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const loadLogs = () => {
      const stored = localStorage.getItem('openveda_logs') || '[]';
      try {
        const parsed = JSON.parse(stored);
        const mapped = parsed.map((item: any) => ({
          id: item.id || Math.random().toString(36).substring(2, 9),
          event: item.text || item.event || '',
          timestamp: item.created_at 
            ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
            : item.timestamp || '',
          type: item.type || 'progress'
        }));
        setActivityLogs(mapped);
      } catch (e) {
        console.error("Error parsing logs", e);
      }
    };
    loadLogs();
  }, []);

  const addActivityLog = (event: string, type: ActivityLog['type']) => {
    const newLog = {
      id: 'log-uuid-' + Date.now(),
      text: event,
      type,
      created_at: new Date().toISOString()
    };
    const stored = localStorage.getItem('openveda_logs') || '[]';
    try {
      const logs = JSON.parse(stored);
      logs.unshift(newLog);
      const trimmed = logs.slice(0, 10);
      localStorage.setItem('openveda_logs', JSON.stringify(trimmed));
      
      const mapped = trimmed.map((item: any) => ({
        id: item.id,
        event: item.text || item.event || '',
        timestamp: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: item.type
      }));
      setActivityLogs(mapped);
    } catch (e) {
      console.error("Error adding log", e);
    }
  };

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

  // Real-time Spark pulses simulated
  useEffect(() => {
    if (activeTab !== 'systemsLab') return;
    const interval = setInterval(() => {
      setCpuPulse(prev => {
        const nextVal = Math.min(100, Math.max(10, prev[prev.length - 1] + (Math.random() > 0.5 ? 8 : -8)));
        return [...prev.slice(1), Math.round(nextVal)];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [activeTab]);

  // 1. Dijkstra Solver execution
  const runDijkstraRouter = async () => {
    setRoutingState('computing');
    setRoutingLog([]);
    const logs = [
      `[Dijkstra] Initializing routing graph for hub: ${routingHub}`,
      `[Spatial Index] Loading ${orderDensity} proximity nodes...`,
      `[priority-queue] Selecting optimal partition weights...`,
      `[Graph Traverse] Scanning delivery coordinates...`,
      `[SUCCESS] Path computed in 842ms.`
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setRoutingLog(prev => [...prev, logs[i]]);
    }

    setRoutingAdherence(Math.round(92 + Math.random() * 7));
    setRoutingState('done');
    addActivityLog(`Simulated Last-Mile Router calculation at ${routingHub}`, "progress");
  };

  // 2. Collaborative Filtering Engine
  const runCollaborativeFiltering = async () => {
    setRecommenderState('filtering');
    await new Promise(resolve => setTimeout(resolve, 1200));

    const lowercase = recommenderQuery.toLowerCase();
    let feeds = [
      { title: "Distributed Consensus & Raft Log compaction", tags: "systems, go", match: 98.4 },
      { title: "Building swc_core Rust AST transformer plugins", tags: "rust, compiler", match: 94.2 },
      { title: "Linux socket flow monitoring via eBPF probes", tags: "c, kernel", match: 89.1 }
    ];

    if (lowercase.includes("python") || lowercase.includes("ml") || lowercase.includes("ai")) {
      feeds = [
        { title: "Vector embeddings Cosine similarity math models", tags: "math, ai", match: 99.1 },
        { title: "Spark streaming telemetry logs monitoring", tags: "spark, telemetry", match: 92.5 },
        { title: "Collab filtering models on InShorts pipelines", tags: "python, databases", match: 88.7 }
      ];
    } else if (lowercase.includes("react") || lowercase.includes("ui") || lowercase.includes("frontend")) {
      feeds = [
        { title: "Next.js RSC Hydration & Rehydration Engine", tags: "react, ui", match: 97.8 },
        { title: "WebAssembly bundler transforms speed metrics", tags: "javascript, wasm", match: 91.2 },
        { title: "Responsive bento UI grids for analytics portals", tags: "ui/ux, css", match: 86.4 }
      ];
    }

    setRecommendedFeed(feeds);
    setRecommenderState('done');
    addActivityLog(`Ran AI InShorts collaborative filter calculations`, "progress");
  };

  // 3. eBay Concurrency Bid Mutex
  const handlePlaceAuctionBid = async (e: React.FormEvent) => {
    e.preventDefault();
    const bidVal = parseFloat(userBidValue);
    if (isNaN(bidVal) || bidVal <= auctionBid) {
      showToast("Bid must be strictly higher than current price", "error");
      return;
    }

    setUserBidValue('');
    setAuctionBid(bidVal);
    
    // Log User Transaction
    setAuctionLogs(prev => [
      `[MUTEX LOCKED] Connection thread secured database write-lock`,
      `[TX COMPLETED] Ayush bid accepted: $${bidVal}`,
      `[MUTEX RELEASED] Database lock successfully freed. Index synced.`,
      ...prev
    ]);
    addActivityLog(`Submitted concurrent eBay bid of $${bidVal}`, "crud");

    // Simulate concurrent outbid from mock threads after 1.5s
    await new Promise(resolve => setTimeout(resolve, 1500));
    const counterBid = bidVal + 50;
    setAuctionBid(counterBid);
    setAuctionLogs(prev => [
      `[CONCURRENCY MATCH] Thread-11 bid intercepted`,
      `[TX COMPLETED] Thread-11 placed concurrent bid: $${counterBid}`,
      ...prev
    ]);
  };

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

  // Handle AI Chatbot Submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const lower = userMessage.toLowerCase();
      let reply = "";

      if (lower.includes("lfx") || lower.includes("linux")) {
        reply = "LFX Mentorship is highly selective. To stand out, clone the repository, audit open issues, and start writing pre-requisite pull requests before the application window opens. Our Roadmap checklists below tracks this exactly!";
      } else if (lower.includes("gsoc") || lower.includes("google")) {
        reply = "For Google Summer of Code 2027, the key is to build direct synchronization context with organization maintainers. Leverage our Playbook profiles, lock your starred organizations, and begin drafting your technical ledger proposal today.";
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
            
            {/* Left Columns - Tab Switcher */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Systems Lab Tab Switcher */}
              <div className="flex gap-6 border-b border-border/40 pb-4">
                <button
                  onClick={() => setActiveTab('milestones')}
                  className={`pb-2 text-xs font-black uppercase tracking-widest transition-all relative ${
                    activeTab === 'milestones'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Milestones & Proposals
                </button>
                <button
                  onClick={() => setActiveTab('systemsLab')}
                  className={`pb-2 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 relative ${
                    activeTab === 'systemsLab'
                      ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
                  <span>Systems Lab (Newton Showcase)</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'milestones' ? (
                  <motion.div
                    key="milestones"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-16"
                  >
                    {/* Proposals Section (CRUD) */}
                    <div className="space-y-10">
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
                          {filteredProposals.map((proposal) => (
                            <div 
                              key={proposal.id} 
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
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-16 glass rounded-[3rem] border-dashed border-border border-2 text-center">
                          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                          <p className="text-muted-foreground font-bold italic">No proposals match current filters. Generate or edit a proposal draft to get started.</p>
                        </div>
                      )}
                    </div>

                    {/* Starred Organizations */}
                    <div className="space-y-10">
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
                          {starredOrgs.map((org: any) => (
                            <div 
                              key={org.slug} 
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
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">{org.program || 'GSoC 2027'}</p>
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
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="glass rounded-[3rem] p-16 text-center border-dashed border-border border-2">
                          <span className="text-5xl mb-6 block grayscale opacity-30">🔭</span>
                          <h3 className="text-xl font-black text-foreground mb-2 italic">Target grid offline</h3>
                          <p className="text-muted-foreground text-xs font-medium max-w-xs mx-auto mb-8 leading-relaxed">
                             Star a target organization on the discovery page to dynamically analyze active playbooks.
                          </p>
                          <Link href="/organizations" className="bg-foreground text-background font-black px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                            Begin Exploration
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="systemsLab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {/* 1. Blinkit / Zepto Proximity Router Simulator */}
                    <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-mono font-black text-[#00f0ff] uppercase tracking-widest bg-[#00f0ff]/10 px-3 py-1 rounded">
                            Spatial routing • Go/C++
                          </span>
                          <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">NST Sem-3</span>
                        </div>
                        <h3 className="text-2xl font-black text-white italic">🚚 Last-Mile Router Simulator</h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          Optimise Blinkit & Zepto delivery paths. This algorithm runs modified Dijkstra proximity matrices.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Hub Center</label>
                            <select
                              value={routingHub}
                              onChange={e => setRoutingHub(e.target.value)}
                              className="w-full bg-black/40 border border-white/10 p-2 text-xs font-bold text-white rounded-lg outline-none"
                            >
                              <option value="Delhi-NCR">Delhi-NCR Hub</option>
                              <option value="Bangalore-East">Bangalore East</option>
                              <option value="Mumbai-South">Mumbai South</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Order Density</label>
                            <input
                              type="number"
                              value={orderDensity}
                              onChange={e => setOrderDensity(parseInt(e.target.value) || 10)}
                              className="w-full bg-black/40 border border-white/10 p-2 text-xs font-bold text-white rounded-lg outline-none"
                            />
                          </div>
                        </div>

                        {/* Interactive Console Output */}
                        {routingLog.length > 0 && (
                          <div className="font-mono text-[9px] bg-black/60 p-4 rounded-xl max-h-[120px] overflow-y-auto text-[#00f0ff] space-y-1 scrollbar-none">
                            {routingLog.map((log, i) => (
                              <div key={i}>{log}</div>
                            ))}
                          </div>
                        )}

                        {routingState === 'done' && (
                          <div className="p-4 bg-[#00f0ff]/5 border border-[#00f0ff]/20 rounded-xl flex items-center justify-between text-xs font-bold text-gray-300">
                            <span>SLA Adherence Ratio:</span>
                            <span className="text-[#00f0ff] font-black">{routingAdherence}% (Optimal)</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={runDijkstraRouter}
                        disabled={routingState === 'computing'}
                        className="w-full bg-white text-black font-black py-4 rounded-xl text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                      >
                        {routingState === 'computing' ? 'Running Dijkstra Queue...' : 'Optimize Spatial Route'}
                      </button>
                    </div>

                    {/* 2. InShorts AI Filter Simulator */}
                    <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-mono font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded">
                            Collaborative Filtering • Python/ML
                          </span>
                          <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">NST Sem-4</span>
                        </div>
                        <h3 className="text-2xl font-black text-white italic">📰 Recommendation Vector Engine</h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          Build InShorts news recommendations. Enter vector interests (e.g. `systems`, `react`, `ml`) to match documents via Cosine Similarity.
                        </p>

                        <div className="space-y-1">
                          <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Interests Vector Tags</label>
                          <input
                            type="text"
                            value={recommenderQuery}
                            onChange={e => setRecommenderQuery(e.target.value)}
                            placeholder="e.g. systems, rust"
                            className="w-full bg-black/40 border border-white/10 p-2 px-3 text-xs font-bold text-white rounded-lg outline-none"
                          />
                        </div>

                        {recommenderState === 'filtering' && (
                          <div className="flex items-center justify-center py-6 gap-2 text-[9px] font-mono text-purple-400 tracking-widest uppercase">
                            <div className="w-3 h-3 border-t-2 border-purple-400 rounded-full animate-spin" />
                            <span>Computing Cosine Matrices...</span>
                          </div>
                        )}

                        {recommenderState === 'done' && recommendedFeed.length > 0 && (
                          <div className="space-y-2">
                            {recommendedFeed.map((item, i) => (
                              <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                                <div>
                                  <h4 className="text-[10px] font-black text-white line-clamp-1">{item.title}</h4>
                                  <span className="text-[7px] font-mono text-purple-400 uppercase">{item.tags}</span>
                                </div>
                                <span className="text-[9px] font-mono font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                                  {item.match}%
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={runCollaborativeFiltering}
                        disabled={recommenderState === 'filtering'}
                        className="w-full bg-white text-black font-black py-4 rounded-xl text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                      >
                        Compute Recommender Feed
                      </button>
                    </div>

                    {/* 3. eBay Concurrency Mutex Simulator */}
                    <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded">
                            Mutex Lock-Free • Node/Kafka
                          </span>
                          <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">NST Sem-2</span>
                        </div>
                        <h3 className="text-2xl font-black text-white italic">🔨 eBay Auction Bidding Mutex</h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          Demonstrate distributed transaction safety. Place a bid higher than the current value to locking concurrent database threads.
                        </p>

                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                          <div>
                            <span className="text-[7px] font-mono text-gray-500 uppercase block">Current Bid Price</span>
                            <span className="text-3xl font-black text-amber-500">${auctionBid}</span>
                          </div>
                          <span className="text-[8px] font-black bg-amber-500/10 text-amber-500 px-3 py-1 rounded-md">
                            14 Threads Active
                          </span>
                        </div>

                        <form onSubmit={handlePlaceAuctionBid} className="flex gap-2">
                          <input
                            type="number"
                            required
                            placeholder={`e.g. ${auctionBid + 10}`}
                            value={userBidValue}
                            onChange={e => setUserBidValue(e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 p-2 text-xs font-bold text-white rounded-lg outline-none"
                          />
                          <button
                            type="submit"
                            className="bg-amber-500 text-black font-black px-4 rounded-lg text-[9px] uppercase tracking-widest hover:scale-105 transition-all"
                          >
                            Place Bid
                          </button>
                        </form>

                        <div className="font-mono text-[8px] bg-black/60 p-4 rounded-xl max-h-[100px] overflow-y-auto text-amber-500/70 space-y-1 scrollbar-none">
                          {auctionLogs.map((log, i) => (
                            <div key={i}>{log}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. Spark Observability Real-time Telemetry */}
                    <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-mono font-black text-green-400 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded">
                            Spark Engine • Hadoop HDFS
                          </span>
                          <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">NST Sem-4</span>
                        </div>
                        <h3 className="text-2xl font-black text-white italic">📊 Spark Observability Pulse</h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          Visual analytics metric feed. Pulsing live container partition CPU usage from dynamic execution clusters.
                        </p>

                        {/* Real-time Telemetry SVG Graph */}
                        <div className="h-[80px] w-full bg-black/40 border border-white/10 rounded-xl p-3 flex items-end gap-1.5 relative overflow-hidden">
                          {cpuPulse.map((pulse, i) => (
                            <div 
                              key={i} 
                              className="bg-green-400/80 w-full rounded-t transition-all duration-1000"
                              style={{ height: `${pulse}%` }}
                            />
                          ))}
                          <div className="absolute top-2 right-2 text-[8px] font-mono text-green-400 tracking-widest uppercase">
                            LIVE CLUSTER INGEST: {cpuPulse[cpuPulse.length - 1]}%
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span className="text-[7px] text-gray-500 uppercase block font-mono">Hadoop HDFS Blocks</span>
                            <span className="text-xs font-black text-white">4096 Replicas</span>
                          </div>
                          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span className="text-[7px] text-gray-500 uppercase block font-mono">Spark Job SLA</span>
                            <span className="text-xs font-black text-white">99.98% OK</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                            isCompleted ? 'bg-primary border-primary text-primary-foreground' : 'border-primary bg-background'
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
                        <div
                          key={log.id}
                          className="text-[10px] border-b border-border/40 pb-3 flex items-start justify-between gap-4 font-mono animate-fade-in"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-primary font-black">[{log.type.toUpperCase()}]</span>
                            <span className="text-muted-foreground leading-normal">{log.event}</span>
                          </div>
                          <span className="text-gray-500 shrink-0">{log.timestamp}</span>
                        </div>
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
                    placeholder="e.g. GSoC 2027: Low latency event streaming in Microcks"
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
                    placeholder="# GSoC 2027 Project Ledger&#10;&#10;## 1. Abstract&#10;Describe your system design, APIs, and roadmap milestones..."
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
                "Strategy GSoC 2027",
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
