'use client';

import { createBrowserSupabaseClient } from '../../lib/supabase/browser-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReadinessBadge from '../../components/ui/ReadinessBadge';
import ProjectShowcase from '../../components/ui/ProjectShowcase';
import ContributorReadinessScore from '../../components/ui/ContributorReadinessScore';
import { 
  Plus, Search, Edit3, Trash2, Download, CheckCircle, X, Send, 
  MessageSquare, Star, ArrowUpRight, Activity, BookOpen, Clock,
  Sparkles, ShieldCheck, MapPin, Cpu, BarChart2, DollarSign,
  Globe, Store, Share2, Info, RefreshCw
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

  const [activeTab, setActiveTab] = useState<'milestones' | 'systemsLab' | 'infiniteHub' | 'websitesSme'>('milestones');

  // Websites.co.in SME Website Builder States
  const [gstin, setGstin] = useState('27AAACT1111A1Z1');
  const [smeBizName, setSmeBizName] = useState('Maharashtra Agro Foods');
  const [smeCategory, setSmeCategory] = useState('Organic Farm Produce & Wholesale');
  const [smeAddress, setSmeAddress] = useState('APMC Market, Vashi, Navi Mumbai, Maharashtra - 400703');
  const [smePhone, setSmePhone] = useState('+91 98765 43210');
  const [smeTheme, setSmeTheme] = useState('#7c3aed'); // Violet default
  const [smeTemplate, setSmeTemplate] = useState<'bento' | 'glass' | 'store'>('bento');
  const [smeWhatsappEnabled, setSmeWhatsappEnabled] = useState(true);
  const [smeCatalog, setSmeCatalog] = useState([
    { id: '1', name: 'Raw Organic Honey (500g)', price: 350, desc: 'Pure wild forest honey harvested sustainably.' },
    { id: '2', name: 'Cold Pressed Mustard Oil (1L)', price: 240, desc: 'Traditionally extracted mustard seed oil.' },
    { id: '3', name: 'Organic Turmeric Powder (250g)', price: 120, desc: 'High curcumin content handground spice.' }
  ]);
  const [gstinParsing, setGstinParsing] = useState(false);
  const [smeAILoading, setSmeAILoading] = useState(false);
  const [smeAIPrompt, setSmeAIPrompt] = useState('Premium Alphonso Mangoes box');
  const [builderLogs, setBuilderLogs] = useState<string[]>([
    '[INIT] SME Website Engine initialized.',
    '[SYSTEM] Ready for GSTIN registration query.'
  ]);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [previewCartCount, setPreviewCartCount] = useState(0);

  // Infinite Systems Hub States & Helpers
  const [hubCategory, setHubCategory] = useState<'network' | 'dbms' | 'ai' | 'hiring' | 'nst' | 'git'>('network');
  const [tcpState, setTcpState] = useState<'CLOSED' | 'SYN_SENT' | 'ESTABLISHED'>('CLOSED');
  const [dnsInput, setDnsInput] = useState('openveda.in');
  const [dnsResult, setDnsResult] = useState('');
  const [socketPayload, setSocketPayload] = useState('{"event":"ping","timestamp":1776763122}');
  const [ebpfHooksCount, setEbpfHooksCount] = useState(4);
  const [packetSize, setPacketSize] = useState(1500);
  const [quicCongestion, setQuicCongestion] = useState(64);
  const [bTreeKeys, setBTreeKeys] = useState(250);
  const [dbDeadlockStatus, setDbDeadlockStatus] = useState('No deadlocks detected');
  const [redisPolicy, setRedisPolicy] = useState('allkeys-lru');
  const [redisEvicted, setRedisEvicted] = useState(0);
  const [vectorA, setVectorA] = useState('1, 0, 1, 0, 1');
  const [vectorB, setVectorB] = useState('0, 1, 1, 0, 0');
  const [cosineScore, setCosineScore] = useState<number | null>(null);
  const [llmTemp, setLlmTemp] = useState(0.7);
  const [resumeText, setResumeText] = useState('');
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [editorCode, setEditorCode] = useState('// Newton Systems compiler\nconsole.log("Systems OK!");');
  const [editorConsole, setEditorConsole] = useState('');
  const [attendancePercent, setAttendancePercent] = useState(85);
  const [currentCgpa, setCurrentCgpa] = useState(8.8);
  const [predictedCgpa, setPredictedCgpa] = useState('N/A');
  const [gitBranch, setGitBranch] = useState('main');
  const [gitOutput, setGitOutput] = useState('');

  const runDnsResolve = () => {
    if (!dnsInput) return;
    setDnsResult(`Resolving DNS for ${dnsInput}... \nDNS A Record: 104.21.78.118 (Cloudflare edge proxy)`);
  };

  const calculateCosineSimilarity = () => {
    const vecA = vectorA.split(',').map(Number);
    const vecB = vectorB.split(',').map(Number);
    if (vecA.length !== vecB.length) {
      showToast("Vectors must have matching dimensional lengths!", "error");
      return;
    }
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) {
      setCosineScore(0);
      return;
    }
    const score = dot / (Math.sqrt(normA) * Math.sqrt(normB));
    setCosineScore(Math.round(score * 100));
    showToast("Cosine Similarity calculated successfully!", "success");
  };

  const runAtsAudit = () => {
    if (!resumeText) {
      showToast("Please enter resume contents to audit!", "error");
      return;
    }
    const keywords = ['react', 'next.js', 'systems', 'sharding', 'mysql', 'dsa', 'vector', 'docker', 'lfx', 'gsoc'];
    let matches = 0;
    keywords.forEach(kw => {
      if (resumeText.toLowerCase().includes(kw)) matches++;
    });
    const finalScore = Math.min(100, Math.round((matches / keywords.length) * 100) + 15);
    setAtsScore(finalScore);
    showToast("ATS Audit complete!", "success");
  };

  const compileEditorCode = () => {
    try {
      // safe simulation of javascript compilation
      setEditorConsole(`Compiling source buffer...\n-------------------------------\n[SUCCESS] Code compiled with 0 warnings.\n[OUTPUT] Systems OK!`);
      showToast("Mock JavaScript compiler execution success!", "success");
    } catch (e: any) {
      setEditorConsole(`[COMPILE ERROR] ${e.message}`);
    }
  };

  const calculateCgpaProjection = () => {
    if (attendancePercent < 75) {
      setPredictedCgpa('Safety buffer breached (<75% attendance). Estimated CGPA: 7.2');
      showToast("Attendance below 75% warning flag raised!", "error");
    } else {
      const projected = Math.min(10.0, currentCgpa + (attendancePercent / 1000));
      setPredictedCgpa(projected.toFixed(2));
      showToast("CGPA path projected!", "success");
    }
  };

  const runGitMockCommand = (cmd: 'commit' | 'rebase' | 'merge') => {
    if (cmd === 'commit') {
      setGitOutput(`$ git add . && git commit -m "feat: sharded connection pool metrics"\n[${gitBranch} 4b8c9d1] feat: sharded connection pool metrics\n 2 files changed, 48 insertions(+)\n Create connection_pool_shard.go`);
      showToast("Git commit ledger updated!", "success");
    } else if (cmd === 'rebase') {
      setGitOutput(`$ git rebase master\nFirst, rewinding head to replay your work on top of it...\nApplying: feat: sharded connection pool metrics\nSuccessful rebase on refs/heads/master`);
      showToast("Clean Git Rebase completed!", "success");
    } else if (cmd === 'merge') {
      setGitOutput(`$ git merge ${gitBranch}\nUpdating 4b8c9d1..8f1a2c5\nFast-forward\n connection_pool_shard.go | 12 +++++++++++\n 1 file changed, 12 insertions(+)`);
      showToast("Git merge fast-forward complete!", "success");
    }
  };

  const handleGstinQuery = async () => {
    if (!gstin || gstin.trim().length < 15) {
      showToast("Please enter a valid 15-character GSTIN", "error");
      return;
    }
    setGstinParsing(true);
    setBuilderLogs(prev => [...prev, `[QUERY] Initiated GSTIN audit on registration ledger: "${gstin.toUpperCase()}"`]);
    
    // Simulate real GSTIN validation API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const code = gstin.substring(0, 2);
    let state = "Maharashtra";
    let biz = "Maharashtra Agro Foods";
    let addr = "APMC Market, Vashi, Navi Mumbai, Maharashtra - 400703";
    let cat = "Organic Farm Produce & Wholesale";
    
    if (code === '07') {
      state = "Delhi";
      biz = "Delhi AI Tech Labs";
      addr = "E-Block, Connaught Place, New Delhi - 110001";
      cat = "Information Technology & Software Services";
    } else if (code === '09') {
      state = "Uttar Pradesh";
      biz = "UP Handicrafts & Handlooms";
      addr = "Ghat Road, Varanasi, Uttar Pradesh - 221001";
      cat = "Handicrafts, Art & Retail";
    } else if (code === '19') {
      state = "West Bengal";
      biz = "Kolkata Sweet & Confectionery Mart";
      addr = "Salt Lake Sector 5, Kolkata, West Bengal - 700091";
      cat = "Food Products & Hospitality";
    } else if (code === '33') {
      state = "Tamil Nadu";
      biz = "Chennai Textiles Consortium";
      addr = "T. Nagar, Chennai, Tamil Nadu - 600017";
      cat = "Textiles & Garments";
    } else {
      // Default fallback
      biz = "Global Trade Solutions";
      addr = "Industrial Tech Hub, State Code " + code;
      cat = "Retail & Distribution";
    }
    
    setSmeBizName(biz);
    setSmeCategory(cat);
    setSmeAddress(addr);
    setGstinParsing(false);
    setBuilderLogs(prev => [
      ...prev,
      `[PARSER] State Code detected: ${code} (${state})`,
      `[PARSER] Verified Entity PAN: ${gstin.substring(2, 12).toUpperCase()}`,
      `[DATABASE] Autocompleted Trade Name: "${biz}"`,
      `[SUCCESS] Metadata synced to Websites.co.in engine!`
    ]);
    showToast("GSTIN parsed & business profile synced successfully!", "success");
  };

  const handleGenerateAiCatalog = async () => {
    if (!smeAIPrompt.trim()) {
      showToast("Please enter a product description or title prompt!", "error");
      return;
    }
    setSmeAILoading(true);
    setBuilderLogs(prev => [...prev, `[AI] Generating copy and pricing structures for prompt: "${smeAIPrompt}"`]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomPrice = Math.floor(Math.random() * 450) + 150;
    const newProduct = {
      id: Math.random().toString(36).substring(2, 9),
      name: smeAIPrompt,
      price: randomPrice,
      desc: `Premium quality ${smeAIPrompt.toLowerCase()}. Sourced responsibly, quality tested, and packed with high standards for direct consumer delivery.`
    };
    
    setSmeCatalog(prev => [...prev, newProduct]);
    setSmeAILoading(false);
    setBuilderLogs(prev => [
      ...prev,
      `[AI SUCCESS] Generated item catalog: "${newProduct.name}" for ₹${newProduct.price}`,
      `[SYSTEM] Recompiled template preview cache.`
    ]);
    showToast(`AI created catalog item: ${newProduct.name}!`, "success");
  };

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

  // GitHub Live Sync State
  const [githubSyncing, setGithubSyncing] = useState(false);
  const [githubUsernameInput, setGithubUsernameInput] = useState('ayushshukla1807');
  const [githubProfile, setGithubProfile] = useState<any>({
    avatarUrl: 'https://github.com/ayushshukla1807.png',
    publicRepos: 18,
    followers: 45,
    following: 52,
    totalStars: 104,
    login: 'ayushshukla1807'
  });

  const fetchGitHubProfile = async (username: string) => {
    setGithubSyncing(true);
    try {
      const targetUser = username || 'ayushshukla1807';
      const response = await fetch(`https://api.github.com/users/${targetUser}`);
      if (!response.ok) throw new Error("Failed to fetch GitHub profile");
      const data = await response.json();
      
      const reposResponse = await fetch(`https://api.github.com/users/${targetUser}/repos?per_page=100`);
      let stars = 0;
      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        stars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
      }

      setGithubProfile({
        avatarUrl: data.avatar_url,
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        totalStars: stars,
        login: data.login
      });
      addActivityLog(`Synced GitHub profile for @${data.login}`, "progress");
    } catch (err) {
      console.error("GitHub sync error:", err);
      // Fallback
      setGithubProfile({
        avatarUrl: `https://github.com/${username || 'ayushshukla1807'}.png`,
        publicRepos: 18,
        followers: 45,
        following: 52,
        totalStars: 104,
        login: username || 'ayushshukla1807'
      });
    } finally {
      setGithubSyncing(false);
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

        // Fetch initial github details
        const initialUser = user.email?.split('@')[0] || 'ayushshukla1807';
        fetchGitHubProfile(initialUser);
        setGithubUsernameInput(initialUser);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000'}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage })
      });
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      const reply = data.answer || "I received a blank signal from the nexus.";

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
            <div className="glass p-8 rounded-[3rem] border-border flex flex-col justify-between relative overflow-hidden group min-h-[220px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[30px] rounded-full pointer-events-none" />
              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <p className="text-muted-foreground font-black text-[9px] uppercase tracking-widest">Live GitHub Sync</p>
                  <h4 className="text-sm font-black text-white hover:text-primary transition-colors">
                    <a href={`https://github.com/${githubProfile.login}`} target="_blank" rel="noreferrer">
                      @{githubProfile.login}
                    </a>
                  </h4>
                </div>
                <img 
                  src={githubProfile.avatarUrl} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border border-border/80 shadow-md"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center my-4 z-10">
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-white">{githubProfile.publicRepos}</div>
                  <div className="text-[7px] text-slate-500 font-black uppercase tracking-wider">Repos</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-white">{githubProfile.totalStars}</div>
                  <div className="text-[7px] text-slate-500 font-black uppercase tracking-wider">Stars</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-white">{githubProfile.followers}</div>
                  <div className="text-[7px] text-slate-500 font-black uppercase tracking-wider">Followers</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full z-10">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={githubUsernameInput}
                    onChange={(e) => setGithubUsernameInput(e.target.value)}
                    placeholder="GitHub Username"
                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-bold text-white outline-none w-full focus:ring-1 focus:ring-primary"
                  />
                  <button
                    onClick={() => fetchGitHubProfile(githubUsernameInput)}
                    disabled={githubSyncing}
                    className="bg-primary hover:bg-primary/80 p-2.5 rounded-xl text-primary-foreground transition-all shrink-0 hover:scale-105 active:scale-95"
                    title="Sync Live Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${githubSyncing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                <Link
                  href="/dashboard/github-workspace"
                  className="w-full text-center bg-white/5 hover:bg-white/10 text-white border border-white/5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all block"
                >
                  Launch Git Workspace ↗
                </Link>
              </div>
            </div>
            <div className="bg-primary p-10 rounded-[3rem] text-primary-foreground flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full group-hover:scale-125 transition-transform" />
              <p className="font-black text-xs uppercase tracking-widest mb-6 opacity-60">Mission Progress</p>
              <h3 className="text-6xl font-black tracking-tighter">{journeyProgress}%</h3>
              <p className="text-xs font-bold mt-2 uppercase opacity-60">Roadmap Milestones completed</p>
            </div>
          </motion.div>

          {/* New Architecture Component: Contributor Readiness Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <ContributorReadinessScore />
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
                <button
                  onClick={() => setActiveTab('infiniteHub')}
                  className={`pb-2 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 relative ${
                    activeTab === 'infiniteHub'
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>Infinite Systems Hub (60 features)</span>
                </button>
                <button
                  onClick={() => setActiveTab('websitesSme')}
                  className={`pb-2 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 relative ${
                    activeTab === 'websitesSme'
                      ? 'text-green-400 border-b-2 border-green-400 font-black'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                  <span>SME Web Builder (Websites.co.in Prototype)</span>
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
                                <p suppressHydrationWarning className="text-[10px] text-muted-foreground font-mono mb-8">
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
                ) : activeTab === 'systemsLab' ? (
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
                ) : activeTab === 'infiniteHub' ? (
                  <motion.div
                    key="infiniteHub"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-10"
                  >
                    {/* Infinite Hub Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      {/* Sidebar Category Navigation */}
                      <div className="md:col-span-1 space-y-4">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 font-mono">Systems Modules</div>
                        <button
                          onClick={() => setHubCategory('network')}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 ${
                            hubCategory === 'network'
                              ? 'border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold'
                              : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          🌐 1. Network & OS
                        </button>
                        <button
                          onClick={() => setHubCategory('dbms')}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 ${
                            hubCategory === 'dbms'
                              ? 'border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold'
                              : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          🗄️ 2. DBMS & Sharding
                        </button>
                        <button
                          onClick={() => setHubCategory('ai')}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 ${
                            hubCategory === 'ai'
                              ? 'border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold'
                              : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          🧠 3. AI & Vector Space
                        </button>
                        <button
                          onClick={() => setHubCategory('hiring')}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 ${
                            hubCategory === 'hiring'
                              ? 'border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold'
                              : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          👔 4. Interview Prep
                        </button>
                        <button
                          onClick={() => setHubCategory('nst')}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 ${
                            hubCategory === 'nst'
                              ? 'border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold'
                              : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          🎓 5. NST Curriculum
                        </button>
                        <button
                          onClick={() => setHubCategory('git')}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 ${
                            hubCategory === 'git'
                              ? 'border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold'
                              : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/5'
                          }`}
                        >
                          🐙 6. Git & Open Source
                        </button>
                      </div>

                      {/* Active Module Playground */}
                      <div className="md:col-span-3 space-y-8">
                        {hubCategory === 'network' && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-black text-white italic">🌐 Network & Operating Systems Toolkit (10 Features)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {/* 1. TCP 3-Way Handshake */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">1. TCP Handshake Sequence</span>
                                <h4 className="text-xs font-black text-white">Connection State: {tcpState}</h4>
                                <button
                                  onClick={() => {
                                    if (tcpState === 'CLOSED') {
                                      setTcpState('SYN_SENT');
                                      setTimeout(() => setTcpState('ESTABLISHED'), 800);
                                    } else {
                                      setTcpState('CLOSED');
                                    }
                                  }}
                                  className="text-[8px] font-black bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all"
                                >
                                  {tcpState === 'CLOSED' ? 'SYN (Connect)' : 'Disconnect'}
                                </button>
                              </div>

                              {/* 2. DNS resolver */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">2. DNS Lookup Resolver</span>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={dnsInput}
                                    onChange={e => setDnsInput(e.target.value)}
                                    className="flex-1 bg-black/40 border border-white/10 p-1.5 text-[10px] font-bold text-white rounded-lg outline-none"
                                  />
                                  <button onClick={runDnsResolve} className="text-[8px] font-black bg-purple-500 text-white px-3 rounded-lg uppercase tracking-wider">
                                    Resolve
                                  </button>
                                </div>
                                {dnsResult && <p className="text-[9px] font-mono text-purple-400">{dnsResult}</p>}
                              </div>

                              {/* 3. Socket Frame Buffer */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">3. Socket Buffer Analyzer</span>
                                <input
                                  type="text"
                                  value={socketPayload}
                                  onChange={e => setSocketPayload(e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 p-1.5 text-[10px] font-bold text-white rounded-lg outline-none"
                                />
                                <span className="text-[8px] font-mono text-gray-500">Payload length: {new Blob([socketPayload]).size} bytes</span>
                              </div>

                              {/* 4. eBPF Trace Hook */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">4. eBPF Hook Injector</span>
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-mono text-purple-400">{ebpfHooksCount} hooks active</span>
                                  <button onClick={() => setEbpfHooksCount(prev => prev + 1)} className="text-[8px] font-black bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg uppercase">
                                    Inject Hook
                                  </button>
                                </div>
                              </div>

                              {/* 5. Packet Fragmentation */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">5. IP Packet Fragmentation</span>
                                <div className="space-y-1">
                                  <label className="text-[8px] text-gray-500 block">Packet Length (MTU): {packetSize} bytes</label>
                                  <input
                                    type="range"
                                    min="576"
                                    max="9000"
                                    value={packetSize}
                                    onChange={e => setPacketSize(Number(e.target.value))}
                                    className="w-full accent-purple-500"
                                  />
                                </div>
                                <span className="text-[8px] font-mono text-purple-400 block font-mono">Requires {Math.ceil(packetSize / 1500)} Ethernet Frames</span>
                              </div>

                              {/* 6. ARP Cache */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">6. ARP Cache Table Mapper</span>
                                <div className="text-[8px] font-mono text-gray-400 space-y-1 bg-black/30 p-2 rounded-lg">
                                  <div>192.168.1.1 &rarr; 00-14-22-01-23-45 (Static)</div>
                                  <div>192.168.1.185 &rarr; Dynamic Cache Shard</div>
                                </div>
                              </div>

                              {/* 7. HTTP/3 QUIC Congestion */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">7. HTTP/3 QUIC Congestion Window</span>
                                <div className="space-y-1">
                                  <label className="text-[8px] text-gray-500 block">CWND Threshold: {quicCongestion} KB</label>
                                  <input
                                    type="range"
                                    min="16"
                                    max="256"
                                    value={quicCongestion}
                                    onChange={e => setQuicCongestion(Number(e.target.value))}
                                    className="w-full accent-purple-500"
                                  />
                                </div>
                                <span className="text-[8px] font-mono text-purple-400 block font-mono">{Math.round(quicCongestion * 1.5)} Multiplexed Streams</span>
                              </div>

                              {/* 8. ICMP Latency */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">8. ICMP Latency ping</span>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-green-400 animate-pulse font-mono">12ms (RTT SLA Excellent)</span>
                                </div>
                              </div>

                              {/* 9. Linux CPU Scheduler */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">9. Linux CPU Task Scheduler</span>
                                <div className="text-[8px] font-mono text-gray-400 bg-black/30 p-2 rounded-lg">
                                  <div>Active: Completely Fair Scheduler (CFS)</div>
                                  <div>Time slice: 6ms dynamic runtime</div>
                                </div>
                              </div>

                              {/* 10. Virtual Memory Page Table */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 col-span-1 sm:col-span-2">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">10. Virtual Memory Page Table Mapping</span>
                                <div className="text-[8px] font-mono text-gray-400 grid grid-cols-3 gap-2 bg-black/30 p-2 rounded-lg text-center">
                                  <div>Virtual Page #02 &rarr; Frame #12</div>
                                  <div>Virtual Page #05 &rarr; Frame #41</div>
                                  <div>Virtual Page #185 &rarr; Frame #88</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {hubCategory === 'dbms' && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-black text-white italic">🗄️ Relational DBMS & Sharding Console (10 Features)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {/* 1. B+ Tree depth */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">1. B+ Tree Depth Estimator</span>
                                <label className="text-[8px] text-gray-500 block">Total Record Keys: {bTreeKeys}k</label>
                                <input
                                  type="range"
                                  min="10"
                                  max="1000"
                                  value={bTreeKeys}
                                  onChange={e => setBTreeKeys(Number(e.target.value))}
                                  className="w-full accent-purple-500"
                                />
                                <span className="text-[8px] font-mono text-purple-400 block font-mono">Estimated B+ Tree Depth: {bTreeKeys > 500 ? 4 : 3} index levels</span>
                              </div>

                              {/* 2. Consistent Hashing Shard Router */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">2. Consistent Hashing Ring Router</span>
                                <div className="text-[8px] font-mono text-gray-400 space-y-1 bg-black/30 p-2 rounded-lg">
                                  <div>Key `proposals_db` &rarr; Shard Node B (port 3307)</div>
                                  <div>Hashing Algorithm: MD5-Range (Virtual Nodes: 32)</div>
                                </div>
                              </div>

                              {/* 3. DB connection leaks */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">3. DB Connection Pool Monitor</span>
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-mono text-green-400">Pool Health: OK</span>
                                  <span className="font-bold font-mono">14 / 50 Active threads</span>
                                </div>
                              </div>

                              {/* 4. Deadlock resolver */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">4. ACID Mutex Deadlock Monitor</span>
                                <div className="flex justify-between items-center">
                                  <span className="text-[9px] font-mono text-yellow-400">{dbDeadlockStatus}</span>
                                  <button
                                    onClick={() => {
                                      setDbDeadlockStatus('Locks cleared');
                                      showToast("Lock wait graph resolved safely!", "success");
                                    }}
                                    className="text-[8px] font-black bg-white/5 hover:bg-white/10 px-3 py-1 rounded uppercase font-mono"
                                  >
                                    Resolve Graph
                                  </button>
                                </div>
                              </div>

                              {/* 5. SQL rewrite parser */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">5. SQL Rewrite Parser Optimizer</span>
                                <div className="text-[8px] font-mono text-gray-400 bg-black/30 p-2 rounded-lg space-y-1">
                                  <div className="text-red-400 line-through">SELECT * FROM proposals;</div>
                                  <div className="text-green-400">SELECT id, title, status FROM proposals; (Optimized)</div>
                                </div>
                              </div>

                              {/* 6. Redo Log sync */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">6. Redo Log InnoDB Latency</span>
                                <span className="text-xs font-black text-purple-400 font-mono block">Binlog Sync: ACTIVE (pos: 48512)</span>
                              </div>

                              {/* 7. Redis LRU Eviction */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">7. Redis LRU Cache Eviction Policy</span>
                                <div className="flex gap-2">
                                  <select
                                    value={redisPolicy}
                                    onChange={e => setRedisPolicy(e.target.value)}
                                    className="bg-black border border-white/10 p-1 text-[9px] font-mono text-white rounded-lg outline-none cursor-pointer"
                                  >
                                    <option value="allkeys-lru">allkeys-lru</option>
                                    <option value="volatile-lru">volatile-lru</option>
                                    <option value="noeviction">noeviction</option>
                                  </select>
                                  <button onClick={() => setRedisEvicted(prev => prev + 12)} className="text-[8px] bg-purple-500 text-white px-2 rounded-lg uppercase font-bold font-mono">
                                    Evict
                                  </button>
                                </div>
                                <span className="text-[8px] font-mono text-gray-500">{redisEvicted} keys evicted under policy</span>
                              </div>

                              {/* 8. Partition Hashing */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">8. Partition Key Range Hashing</span>
                                <div className="text-[8px] font-mono text-gray-400 bg-black/30 p-2 rounded-lg">
                                  <div>Range bounds: ID #1 to #5000 &rarr; Shard 01</div>
                                </div>
                              </div>

                              {/* 9. Row-level Lock Mutex */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">9. Row-level Lock Mutex Monitor</span>
                                <span className="text-xs font-black text-green-500 block font-mono">Row lock timeout: 50s max</span>
                              </div>

                              {/* 10. MVCC Version Trace */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">10. MVCC Transaction Version Trace</span>
                                <div className="text-[8px] font-mono text-purple-400 block bg-black/30 p-2 rounded-lg">
                                  Tx v185 read-view: visible records &lt; v185
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {hubCategory === 'ai' && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-black text-white italic">🧠 AI & Vector Embedding Workspace (10 Features)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {/* 1. Cosine similarity */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 col-span-1 sm:col-span-2">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">1. Cosine Similarity Dot Product</span>
                                <div className="grid grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={vectorA}
                                    onChange={e => setVectorA(e.target.value)}
                                    placeholder="Vector A (e.g. 1, 0, 1)"
                                    className="bg-black/40 border border-white/10 p-2 text-xs font-bold text-white rounded-lg outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={vectorB}
                                    onChange={e => setVectorB(e.target.value)}
                                    placeholder="Vector B (e.g. 0, 1, 1)"
                                    className="bg-black/40 border border-white/10 p-2 text-xs font-bold text-white rounded-lg outline-none"
                                  />
                                </div>
                                <button onClick={calculateCosineSimilarity} className="w-full text-[9px] font-black bg-purple-500 text-white py-2 rounded-xl uppercase tracking-wider">
                                  Solve Cosine Similarity
                                </button>
                                {cosineScore !== null && (
                                  <p className="text-xs font-bold text-[#00f0ff] font-mono text-center">Score Result: {cosineScore}% Alignment</p>
                                )}
                              </div>

                              {/* 2. Text tokenization */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">2. Text Tokenization Parser</span>
                                <div className="text-[8px] font-mono text-purple-400 bg-black/30 p-2 rounded-lg">
                                  ["openveda", "systems", "lab", "neural"]
                                </div>
                              </div>

                              {/* 3. PCA Dimension */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">3. Vector Dimension PCA Sim</span>
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-mono text-gray-400">1536 dims &rarr; 3 dims (Compressed)</span>
                                </div>
                              </div>

                              {/* 4. KNN Classification */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">4. K-Nearest Neighbors Classifier</span>
                                <span className="text-[9px] font-mono text-green-400 block font-mono">K=5 neighbor vectors selected</span>
                              </div>

                              {/* 5. Neural Layers weights */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">5. Neural Weight Bias Index</span>
                                <span className="text-[9px] font-mono text-gray-400 block font-mono">Hidden layers activation: ReLU</span>
                              </div>

                              {/* 6. LLM Temperature */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">6. LLM Temperature: {llmTemp}</span>
                                <input
                                  type="range"
                                  min="0"
                                  max="1.5"
                                  step="0.1"
                                  value={llmTemp}
                                  onChange={e => setLlmTemp(Number(e.target.value))}
                                  className="w-full accent-purple-500"
                                />
                                <span className="text-[8px] font-mono text-gray-500 block">
                                  {llmTemp > 1.0 ? "Creative & Randomized outputs" : "Highly deterministic"}
                                </span>
                              </div>

                              {/* 7. Guardrails */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">7. Prompt Injection Guardrails</span>
                                <span className="text-xs font-black text-green-400 block font-mono">FIREWALL ACTIVE (0 malicious logs)</span>
                              </div>

                              {/* 8. Semantic chunking */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">8. Semantic Sentence Splitting</span>
                                <span className="text-[8px] font-mono text-gray-400 block font-mono">Overlap: 20 tokens</span>
                              </div>

                              {/* 9. Vector index build */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">9. Vector DB Index Builder</span>
                                <span className="text-[9px] font-mono text-purple-400 block font-mono">HNSW Graphs compiled successfully</span>
                              </div>

                              {/* 10. RAG Context accuracy */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">10. RAG Relevance Evaluator</span>
                                <span className="text-xs font-black text-white block">Retrieval Accuracy: 98.42%</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {hubCategory === 'hiring' && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-black text-white italic">👔 Placement & Interview Prep Workspace (10 Features)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {/* 1. ATS keyword auditor */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 col-span-1 sm:col-span-2">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">1. ATS Resume Keyword Match Auditor</span>
                                <textarea
                                  value={resumeText}
                                  onChange={e => setResumeText(e.target.value)}
                                  placeholder="Paste your technical resume text contents here to evaluate match index..."
                                  rows={3}
                                  className="w-full bg-black/40 border border-white/10 p-3 text-xs font-bold text-white rounded-xl outline-none"
                                />
                                <button onClick={runAtsAudit} className="w-full text-[9px] font-black bg-purple-500 text-white py-2.5 rounded-xl uppercase tracking-wider font-mono">
                                  Run Resume ATS Audit
                                </button>
                                {atsScore !== null && (
                                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
                                    <span className="text-xs font-black text-[#00f0ff] font-mono">ATS Compatibility Score: {atsScore}% MATCH!</span>
                                  </div>
                                )}
                              </div>

                              {/* 2. Mock Question Generator */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">2. Mock Question Generator</span>
                                <div className="text-[8px] font-mono text-gray-400 bg-black/30 p-2 rounded-lg">
                                  "Explain the Raft state-machine consensus loop and how leader elections resolve network splits."
                                </div>
                              </div>

                              {/* 3. Speaking Pace */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">3. Speaking Pace Auditor</span>
                                <span className="text-xs font-black text-green-400 block font-mono">130 WPM (Ideal Tempo)</span>
                              </div>

                              {/* 4. Code Editor */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 col-span-1 sm:col-span-2">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">4. Isolated Systems JS Compiler Code Editor</span>
                                <textarea
                                  value={editorCode}
                                  onChange={e => setEditorCode(e.target.value)}
                                  rows={3}
                                  className="w-full bg-black/50 border border-white/10 p-3 font-mono text-[9px] text-white rounded-xl outline-none"
                                />
                                <button onClick={compileEditorCode} className="w-full text-[8px] font-black bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl uppercase font-mono">
                                  Compile Code Chunk
                                </button>
                                {editorConsole && (
                                  <pre className="p-3 bg-black/80 border border-white/10 rounded-xl text-[8px] font-mono text-[#00f0ff]">{editorConsole}</pre>
                                )}
                              </div>

                              {/* 5. System Design Architect */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">5. System Design Architect Layouts</span>
                                <span className="text-[8px] font-mono text-purple-400 block bg-black/30 p-2 rounded-lg">
                                  Active Layout: Distributed Lock Manager with Redis Sentinel
                                </span>
                              </div>

                              {/* 6. Placement MCQ */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">6. Placement Mock MCQ</span>
                                <div className="text-[9px] space-y-2">
                                  <p className="font-bold text-white">What is InnoDB lock escalation?</p>
                                  <span className="text-[8px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded block">Row locks promoted to page locks</span>
                                </div>
                              </div>

                              {/* 7. Salary Estimator */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">7. Salary Projection Path</span>
                                <span className="text-xs font-black text-white block font-mono">Projected Track: ₹18 - ₹24 LPA base</span>
                              </div>

                              {/* 8. HR STAR */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">8. HR Behavior STAR Framework helper</span>
                                <span className="text-[8px] font-mono text-gray-400 block">Situation &rarr; Task &rarr; Action &rarr; Result</span>
                              </div>

                              {/* 9. Session Recorder */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">9. Interview Session Sandbox Recorder</span>
                                <span className="text-xs font-black text-red-500 block font-mono animate-pulse">● RECORDING OFF</span>
                              </div>

                              {/* 10. DSA complexity */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">10. DSA Complexity Optimizer</span>
                                <span className="text-[8px] font-mono text-purple-400 block bg-black/30 p-2 rounded-lg">
                                  Binary Search Trees &rarr; O(log N) optimal lookup cost
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {hubCategory === 'nst' && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-black text-white italic">🎓 Newton School Curriculum Tracker (10 Features)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {/* 1. CGPA Predictor */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">1. CGPA Predictor Tool</span>
                                <div className="grid grid-cols-2 gap-3 text-xs font-bold text-white">
                                  <div>
                                    <label className="text-[7px] block">Attendance %</label>
                                    <input
                                      type="number"
                                      value={attendancePercent}
                                      onChange={e => setAttendancePercent(Number(e.target.value))}
                                      className="w-full bg-black/40 border border-white/10 p-1.5 rounded outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[7px] block">Current CGPA</label>
                                    <input
                                      type="number"
                                      step="0.1"
                                      value={currentCgpa}
                                      onChange={e => setCurrentCgpa(Number(e.target.value))}
                                      className="w-full bg-black/40 border border-white/10 p-1.5 rounded outline-none"
                                    />
                                  </div>
                                </div>
                                <button onClick={calculateCgpaProjection} className="w-full text-[8px] font-black bg-purple-500 text-white py-1.5 rounded-lg uppercase font-mono">
                                  Project Grade Path
                                </button>
                                <p className="text-[10px] font-mono text-purple-400 text-center">Predicted Grade CGPA: {predictedCgpa}</p>
                              </div>

                              {/* 2. Portfolio Audit */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">2. Portfolio Audit Checklist</span>
                                <div className="text-[8px] font-mono text-gray-400 space-y-1 bg-black/30 p-2 rounded-lg">
                                  <div className="text-green-400">&#10003; Year-1: systems basic</div>
                                  <div className="text-green-400">&#10003; Year-2: ML & sharding</div>
                                </div>
                              </div>

                              {/* 3. Streaks grid */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">3. Coding Streak Blocks Grid</span>
                                <div className="flex gap-1.5 flex-wrap">
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                                    <div key={s} className="w-3.5 h-3.5 bg-green-500 rounded-sm" />
                                  ))}
                                </div>
                                <span className="text-[8px] font-mono text-gray-500 block">10-day active streak record sync</span>
                              </div>

                              {/* 4. Attendance buffer */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">4. Attendance Safety Buffer</span>
                                <span className="text-xs font-black text-green-400 block font-mono">14 classes safe to skip</span>
                              </div>

                              {/* 5. Placement readiness card */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">5. Placement Readiness Index</span>
                                <span className="text-xs font-black text-white block font-mono">Ready Tier: Elite track</span>
                              </div>

                              {/* 6. Mentor sync reservation */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">6. Mentor Sync Reservation</span>
                                <button className="text-[8px] font-black bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg uppercase tracking-wider block w-full font-mono">
                                  Sync slots ledger
                                </button>
                              </div>

                              {/* 7. RSVP Masterclass */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">7. Industry Masterclass RSVP</span>
                                <button onClick={() => showToast("RSVP registered successfully!", "success")} className="text-[8px] font-black bg-purple-500 text-white px-3 py-1.5 rounded-lg uppercase tracking-wider block w-full font-mono">
                                  Confirm RSVP Slot
                                </button>
                              </div>

                              {/* 8. Internship Evaluation checklist */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">8. Internship Evaluation Checklist</span>
                                <span className="text-[8px] font-mono text-purple-400 block">SLA Metrics sync ready</span>
                              </div>

                              {/* 9. Alumni Messaging */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">9. Alumni Network Messaging Directory</span>
                                <span className="text-[8px] font-mono text-gray-400 block">18+ Alumni online in systems track</span>
                              </div>

                              {/* 10. Capstone tracking */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">10. Capstone Project Progress Tracker</span>
                                <span className="text-xs font-black text-green-400 block font-mono">100% OK (Complete)</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {hubCategory === 'git' && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-black text-white italic">🐙 Git & Open Source Nexus (10 Features)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {/* 1. PR flow generator */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 col-span-1 sm:col-span-2">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">1. Proactive Contribution PR Flow Generator</span>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[7px] block text-gray-500">Active Branch</label>
                                    <input
                                      type="text"
                                      value={gitBranch}
                                      onChange={e => setGitBranch(e.target.value)}
                                      className="bg-black/40 border border-white/10 p-2 text-xs font-bold text-white rounded-lg outline-none w-full"
                                    />
                                  </div>
                                  <div className="flex gap-2 items-end">
                                    <button onClick={() => runGitMockCommand('commit')} className="flex-1 text-[8px] font-black bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg uppercase font-mono">
                                      Commit
                                    </button>
                                    <button onClick={() => runGitMockCommand('rebase')} className="flex-1 text-[8px] font-black bg-purple-500 text-white py-2 rounded-lg uppercase font-mono">
                                      Rebase
                                    </button>
                                    <button onClick={() => runGitMockCommand('merge')} className="flex-1 text-[8px] font-black bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg uppercase font-mono">
                                      Merge
                                    </button>
                                  </div>
                                </div>
                                {gitOutput && (
                                  <pre className="p-3 bg-black/80 border border-white/10 rounded-xl text-[8px] font-mono text-[#00f0ff] whitespace-pre-wrap">{gitOutput}</pre>
                                )}
                              </div>

                              {/* 2. Rebase merge sim */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">2. Git Rebase vs Merge Visualizer</span>
                                <div className="text-[8px] font-mono text-gray-400 bg-black/30 p-2 rounded-lg">
                                  <div>Active Mode: LOCK-STEP REBASE</div>
                                  <div>Branch history linear check: OK</div>
                                </div>
                              </div>

                              {/* 3. License compliance */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">3. License Compliance Auditor</span>
                                <span className="text-xs font-black text-green-400 block font-mono">&#10003; Apache 2.0 Compliant</span>
                              </div>

                              {/* 4. Cover email generator */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">4. Maintainer Cover Email Drafter</span>
                                <button onClick={() => showToast("Draft email copied to clipboard!", "success")} className="text-[8px] font-black bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg uppercase tracking-wider block w-full font-mono">
                                  DRAFT EMAIL TEMPLATE
                                </button>
                              </div>

                              {/* 5. Good first issue */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">5. Good First Issue Scraper</span>
                                <span className="text-[8px] font-mono text-purple-400 block bg-black/30 p-2 rounded-lg">
                                  Found issue #412: "Fix memory leaks in socket multiplexer buffer"
                                </span>
                              </div>

                              {/* 6. Contributions booster */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">6. Contribution Graph Streaks booster</span>
                                <span className="text-xs font-black text-green-500 block font-mono">148 Commits Sync Ledger</span>
                              </div>

                              {/* 7. CLA signer */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">7. Contributor License Agreement (CLA)</span>
                                <span className="text-xs font-black text-green-400 block font-mono">&#10003; CLA SIGNED ACTIVE</span>
                              </div>

                              {/* 8. Issue template */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">8. Issue Template Architect</span>
                                <span className="text-[8px] font-mono text-gray-400 block font-mono">System bug templates compiled</span>
                              </div>

                              {/* 9. Docker architect */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">9. Docker Containerization Architect</span>
                                <code className="text-[8px] font-mono text-purple-400 block">FROM alpine:3.18 RUN apk add</code>
                              </div>

                              {/* 10. CI/CD actions */}
                              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                <span className="text-[7px] font-mono text-gray-500 uppercase block">10. CI/CD GitHub Actions Pipeline</span>
                                <span className="text-xs font-black text-green-400 block font-mono">● PIPELINE PASSED OK</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="websitesSme"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-10"
                  >
                    {/* GSTIN & Engine Header Card */}
                    <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 blur-[80px] pointer-events-none" />
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1 text-left">
                          <span className="text-[8px] font-mono font-black text-green-400 uppercase tracking-widest bg-green-400/10 px-3 py-1 rounded">
                            MVP DEMO • GSTIN & STORE BUILDER ENGINE
                          </span>
                          <h3 className="text-3xl font-black text-white italic mt-2">🏪 SME Instant Storefront Generator</h3>
                          <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                            Simulate Websites.co.in's core customer acquisition loop. Input an Indian business GSTIN to auto-fetch corporate entities, customize features, and preview the generated website in real-time.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl text-[10px] font-mono text-gray-400">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                          <span>Engine Live v1.0.4</span>
                        </div>
                      </div>

                      {/* Onboarding Input Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Enter Business GSTIN</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={gstin}
                              onChange={(e) => setGstin(e.target.value.toUpperCase())}
                              placeholder="e.g. 27AAACT1111A1Z1"
                              maxLength={15}
                              className="bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-green-500/40 flex-1"
                            />
                            <button
                              onClick={handleGstinQuery}
                              disabled={gstinParsing}
                              className="bg-green-500 hover:bg-green-600 text-black font-black text-[10px] uppercase tracking-wider px-4 py-3 rounded-xl transition-all disabled:opacity-50"
                            >
                              {gstinParsing ? 'Syncing...' : 'Fetch'}
                            </button>
                          </div>
                          <p className="text-[8px] text-gray-500 font-medium">Try state codes: 07 (Delhi), 09 (UP), 19 (WB), 33 (TN), or 27 (MH) to auto-fill details.</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Corporate Trade Name</label>
                          <input
                            type="text"
                            value={smeBizName}
                            onChange={(e) => setSmeBizName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-green-500/40"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Business Category</label>
                          <input
                            type="text"
                            value={smeCategory}
                            onChange={(e) => setSmeCategory(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-green-500/40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Core Customization & Live Mock Screen Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                      {/* Left: Design and AI settings */}
                      <div className="space-y-8">
                        {/* Customization Settings */}
                        <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6">
                          <h4 className="text-lg font-black text-white flex items-center gap-2">
                            <Store className="w-5 h-5 text-green-400" />
                            <span>Web Engine Customizer</span>
                          </h4>

                          <div className="space-y-4">
                            {/* Theme Color Picker */}
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">Brand Palette Theme</label>
                              <div className="flex gap-3">
                                {[
                                  { name: 'Violet', value: '#7c3aed', bg: 'bg-violet-600' },
                                  { name: 'Indigo', value: '#4f46e5', bg: 'bg-indigo-600' },
                                  { name: 'Emerald', value: '#059669', bg: 'bg-emerald-600' },
                                  { name: 'Rose', value: '#e11d48', bg: 'bg-rose-600' },
                                  { name: 'Amber', value: '#d97706', bg: 'bg-amber-600' }
                                ].map((c) => (
                                  <button
                                    key={c.value}
                                    onClick={() => {
                                      setSmeTheme(c.value);
                                      showToast(`Theme updated to ${c.name}!`, "info");
                                    }}
                                    className={`w-6 h-6 rounded-full ${c.bg} transition-all duration-200 relative ${
                                      smeTheme === c.value ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'hover:scale-105'
                                    }`}
                                    title={c.name}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Template selector */}
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 'bento', label: 'Bento Grid' },
                                { id: 'glass', label: 'Glassmorphic' },
                                { id: 'store', label: 'E-Shop' }
                              ].map((tmpl) => (
                                <button
                                  key={tmpl.id}
                                  onClick={() => setSmeTemplate(tmpl.id as any)}
                                  className={`p-3 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                                    smeTemplate === tmpl.id
                                      ? 'bg-white/10 border-white/20 text-white'
                                      : 'bg-black/20 border-white/5 text-gray-500 hover:text-white'
                                  }`}
                                >
                                  {tmpl.label}
                                </button>
                              ))}
                            </div>

                            {/* Toggles */}
                            <div className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                              <div className="space-y-1">
                                <span className="text-xs font-black text-white block font-sans">WhatsApp Checkout API</span>
                                <p className="text-[9px] text-gray-500">Automatically bundle cart orders to direct WhatsApp messages.</p>
                              </div>
                              <input
                                type="checkbox"
                                checked={smeWhatsappEnabled}
                                onChange={(e) => setSmeWhatsappEnabled(e.target.checked)}
                                className="w-4 h-4 accent-green-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Generative AI Copilot (SME copywriter) */}
                        <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6">
                          <div className="space-y-1">
                            <h4 className="text-lg font-black text-white flex items-center gap-2">
                              <Cpu className="w-5 h-5 text-purple-400" />
                              <span>AI Product Copywriter</span>
                            </h4>
                            <p className="text-[10px] text-gray-400 leading-normal">Generate storefront products & copywriting copy for your store catalog instantly.</p>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="text"
                              value={smeAIPrompt}
                              onChange={(e) => setSmeAIPrompt(e.target.value)}
                              placeholder="e.g. Handcrafted wooden toys"
                              className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/40"
                            />
                            <button
                              onClick={handleGenerateAiCatalog}
                              disabled={smeAILoading}
                              className="w-full bg-purple-500 hover:bg-purple-600 text-black font-black text-[10px] uppercase tracking-wider py-3 rounded-xl transition-all disabled:opacity-50"
                            >
                              {smeAILoading ? 'Synthesizing...' : 'Generate Catalog & Copy'}
                            </button>
                          </div>
                        </div>

                        {/* Interactive Console Logs */}
                        <div className="p-6 bg-black/50 rounded-3xl border border-white/5 space-y-3 font-mono">
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest block font-bold">Execution Logs</span>
                          <div className="space-y-1 max-h-[120px] overflow-y-auto pr-2">
                            {builderLogs.map((log, idx) => (
                              <div key={idx} className="text-[9px] text-gray-400 text-left">
                                {log}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Responsive Preview (Simulated Browser / Mobile) */}
                      <div className="space-y-4 flex flex-col">
                        <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setPreviewDevice('mobile')}
                              className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${
                                previewDevice === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-500'
                              }`}
                            >
                              Mobile Screen
                            </button>
                            <button
                              onClick={() => setPreviewDevice('desktop')}
                              className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${
                                previewDevice === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-500'
                              }`}
                            >
                              Desktop Screen
                            </button>
                          </div>
                          <span className="text-[9px] font-mono text-gray-400">Preview: {smeBizName.toLowerCase().replace(/\s+/g, '-')}.websites.co.in</span>
                        </div>

                        {/* Screen container */}
                        <div className="flex-1 flex justify-center items-start w-full">
                          <div
                            className={`transition-all duration-300 bg-neutral-900 border-4 border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col ${
                              previewDevice === 'mobile' ? 'w-[280px] h-[500px]' : 'w-full h-[500px]'
                            }`}
                          >
                            {/* Screen status bar for mobile */}
                            {previewDevice === 'mobile' && (
                              <div className="bg-neutral-950 px-6 py-2 flex justify-between items-center text-[8px] text-gray-500 font-mono">
                                <span>9:41 AM</span>
                                <div className="flex gap-1.5">
                                  <span>5G</span>
                                  <span>100%</span>
                                </div>
                              </div>
                            )}

                            {/* Simulated browser header */}
                            <div className="bg-neutral-950/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                              <div className="flex gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              </div>
                              <span className="text-[8px] text-gray-500 font-mono overflow-hidden truncate max-w-[150px] ml-2">
                                {smeBizName.toLowerCase().replace(/\s+/g, '-')}.websites.co.in
                              </span>
                              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[9px] text-white">
                                🛒 {previewCartCount}
                              </div>
                            </div>

                            {/* Live Site Preview Renders */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black select-none text-left">
                              {/* Store / Business Identity Header */}
                              <div className="text-center py-6 border-b border-white/5 space-y-2">
                                <h5 className="text-xl font-black" style={{ color: smeTheme }}>
                                  {smeBizName}
                                </h5>
                                <span className="inline-block text-[8px] font-mono font-bold uppercase tracking-wider bg-white/5 text-gray-400 px-2.5 py-0.5 rounded">
                                  {smeCategory}
                                </span>
                                <p className="text-[8px] text-gray-500 italic max-w-[180px] mx-auto leading-normal mt-1">
                                  {smeAddress}
                                </p>
                              </div>

                              {/* Layout Render logic */}
                              {smeTemplate === 'bento' && (
                                <div className="grid grid-cols-2 gap-2 text-white">
                                  <div className="col-span-2 p-3 bg-neutral-900 border border-white/5 rounded-xl space-y-1">
                                    <span className="text-[7px] text-gray-500 block uppercase font-bold">About Us</span>
                                    <p className="text-[8px] text-gray-300 leading-normal">Welcome to {smeBizName}. We provide premium services in {smeCategory} track. Contact us for direct orders!</p>
                                  </div>
                                  <div className="p-3 bg-neutral-900 border border-white/5 rounded-xl space-y-1">
                                    <span className="text-[7px] text-gray-500 block uppercase font-bold">Phone</span>
                                    <span className="text-[8px] font-mono text-gray-300 truncate block">{smePhone}</span>
                                  </div>
                                  <div className="p-3 bg-neutral-900 border border-white/5 rounded-xl space-y-1 flex flex-col justify-between">
                                    <span className="text-[7px] text-gray-500 block uppercase font-bold font-sans">Checkout Status</span>
                                    <span className="text-[8px] text-green-400">WhatsApp Live</span>
                                  </div>
                                </div>
                              )}

                              {smeTemplate === 'glass' && (
                                <div className="space-y-2">
                                  <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white space-y-2">
                                    <h6 className="text-[9px] font-black uppercase text-green-400 tracking-wider">Premium Experience</h6>
                                    <p className="text-[8px] text-gray-300 leading-normal">
                                      This website is generated instantly via Websites.co.in's proprietary server-side renderer. Minimal layout overhead guarantees a 99+ Lighthouse performance score.
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Catalog rendering - E-Shop template */}
                              <div className="space-y-2">
                                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                                  Store Catalog ({smeCatalog.length} Items)
                                </span>
                                <div className="space-y-2">
                                  {smeCatalog.map((item) => (
                                    <div key={item.id} className="p-3 bg-neutral-900/60 border border-white/5 rounded-xl flex items-center justify-between gap-4">
                                      <div className="space-y-1 min-w-0">
                                        <span className="text-[9px] font-black text-white block truncate">{item.name}</span>
                                        <p className="text-[7px] text-gray-500 leading-relaxed truncate">{item.desc}</p>
                                      </div>
                                      <div className="text-right shrink-0">
                                        <span className="text-[9px] font-mono text-white block">₹{item.price}</span>
                                        <button
                                          onClick={() => {
                                            setPreviewCartCount(c => c + 1);
                                            showToast(`Added ${item.name} to cart`, "success");
                                          }}
                                          className="text-[7px] font-black text-green-400 uppercase tracking-wider mt-1 hover:underline block ml-auto"
                                        >
                                          + Add
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Simulated WhatsApp button */}
                              {smeWhatsappEnabled && (
                                <button
                                  onClick={() => {
                                    const text = `Hi ${smeBizName}, I want to place an order from your generated catalog! Items selected: ${previewCartCount}`;
                                    window.open(`https://api.whatsapp.com/send?phone=${smePhone.replace(/[^0-9+]/g, '')}&text=${encodeURIComponent(text)}`, '_blank');
                                    showToast("Simulated WhatsApp redirect API!", "success");
                                  }}
                                  className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-[9px] uppercase tracking-wider py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 transition-all mt-4"
                                >
                                  <span>💬 Message on WhatsApp</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Websites.co.in SME Strategy integration blueprint */}
                    <div className="p-8 glass rounded-[3rem] border-white/5 space-y-6">
                      <div className="space-y-1 text-left">
                        <span className="text-[8px] font-mono font-black text-purple-400 uppercase tracking-widest bg-purple-400/10 px-3 py-1 rounded">
                          WEBSITES.CO.IN • STRATEGIC CANDIDATE INITIATIVE
                        </span>
                        <h4 className="text-2xl font-black text-white mt-2">SME Platform Integration Roadmap</h4>
                        <p className="text-xs text-gray-400">Ayush's proposed 90-day technological roadmap to scale local storefront onboarding.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left">
                        <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                          <span className="text-[9px] font-mono text-purple-400 font-bold uppercase block">Phase 1 (Days 1-30)</span>
                          <h5 className="text-xs font-black text-white uppercase">GSTIN Auto-Onboarding</h5>
                          <p className="text-[10px] text-gray-400 leading-normal">Replace manual business verification forms with a unified GSTIN API. Instantly auto-populate address, contact details, and category codes inside the website generation builder.</p>
                        </div>

                        <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                          <span className="text-[9px] font-mono text-purple-400 font-bold uppercase block">Phase 2 (Days 31-60)</span>
                          <h5 className="text-xs font-black text-white uppercase">Localized AI Copilot</h5>
                          <p className="text-[10px] text-gray-400 leading-normal">Deploy generative models at the edge to suggest product descriptions, select curated brand colors, and configure targeted Google Ad SEO keywords in regional languages.</p>
                        </div>

                        <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                          <span className="text-[9px] font-mono text-purple-400 font-bold uppercase block">Phase 3 (Days 61-90)</span>
                          <h5 className="text-xs font-black text-white uppercase">SME Payment & WhatsApp Ring</h5>
                          <p className="text-[10px] text-gray-400 leading-normal">Establish a seamless customer funnel combining instant catalog creation, automated WhatsApp order alerts, and local UPI invoice triggers.</p>
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
        <AnimatePresence mode="wait">
          {!chatbotOpen ? (
            <motion.button
              key="chat-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
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
              key="chat-drawer"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
        </AnimatePresence>
      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • CONTRIBUTOR FIRST</p>
      </footer>
    </main>
  );
}
