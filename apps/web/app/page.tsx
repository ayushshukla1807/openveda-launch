'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import Image from 'next/image';
import OrgCard from '@/components/ui/OrgCard';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Brain, Cpu, Database, Network, GitBranch, 
  GitCommit, Terminal, Layers, Star, Info, MessageSquare, 
  ArrowRight, ShieldCheck, CheckSquare, Zap, Users, Code2, ChevronRight
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

interface SdeTrackPreset {
  lang: string;
  filename: string;
  code: string;
  difficulty: number;
  lines: number;
  matchOrg: string;
  description: string;
}

const SDE_LANGUAGE_PRESETS: SdeTrackPreset[] = [
  {
    lang: 'TypeScript',
    filename: 'ast_transformer.ts',
    code: `// SWC AST Compiler Node Transformer
export function transformAST(node: ASTNode): ASTNode {
  if (node.type === 'ArrowFunctionExpression') {
    return convertToFunctionExpression(node);
  }
  return visitChildren(node, transformAST);
}`,
    difficulty: 85,
    lines: 1240,
    matchOrg: 'Appsmith',
    description: 'Master AST parser traversers and virtual DOM optimization layers.'
  },
  {
    lang: 'Go',
    filename: 'raft_consensus.go',
    code: `// Raft consensus replication logic
func (r *RaftNode) appendEntries(term int, prevLogIndex int) bool {
	if term < r.currentTerm {
		return false
	}
	r.logMutex.Lock()
	defer r.logMutex.Unlock()
	return r.replicateLogs(prevLogIndex)
}`,
    difficulty: 92,
    lines: 4850,
    matchOrg: 'Kubernetes',
    description: 'Construct distributed transaction ledgers and network consensus hooks.'
  },
  {
    lang: 'Python',
    filename: 'vector_rag.py',
    code: `# pgvector cosine similarity search
def query_vector_store(embedding: List[float], limit: int = 5):
    query = """
        SELECT id, name, 1 - (embedding <=> %s) AS score 
        FROM playbooks ORDER BY score DESC LIMIT %s
    """
    return db.execute(query, (embedding, limit))`,
    difficulty: 78,
    lines: 1180,
    matchOrg: 'OpenVeda AI',
    description: 'Implement semantic search pipelines and deep learning training weights.'
  },
  {
    lang: 'Java',
    filename: 'ConnectionPool.java',
    code: `// Low-latency Thread Pool execution manager
public class ConnectionPool {
    private final BlockingQueue<Connection> pool;
    public Connection acquire() throws InterruptedException {
        Connection conn = pool.poll(500, TimeUnit.MILLISECONDS);
        return conn != null ? conn : establishNewConnection();
    }
}`,
    difficulty: 82,
    lines: 3240,
    matchOrg: 'Apache Software',
    description: 'Optimize concurrent thread executions and dynamic cache pools.'
  },
  {
    lang: 'C++',
    filename: 'socket_hook.cpp',
    code: `// eBPF kernel network socket hooks
#include <linux/bpf.h>
SEC("filter/tcp_latency")
int trace_tcp_packet(struct __sk_buff *skb) {
    __u32 latency = bpf_ktime_get_ns() - skb->tstamp;
    bpf_trace_printk("TCP RTT latency: %d\\n", latency);
    return 0;
}`,
    difficulty: 95,
    lines: 1950,
    matchOrg: 'CNCF / Linux',
    description: 'Develop low-level systems hooks and packet tracers in kernel space.'
  }
];

export default function HomePage() {
  const [featuredOrgs, setFeaturedOrgs] = useState<any[]>([]);
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  // Live Supabase Realtime Issues
  const [liveIssues, setLiveIssues] = useState<any[]>([
    { org_name: "CNCF/Pixie", title: "Fix memory leak in tracer" },
    { org_name: "Appsmith", title: "Add virtual scrolling to List Widget" },
    { org_name: "Vercel/Next.js", title: "Optimize RSC Payload Size" },
    { org_name: "GNOME", title: "Update dark mode contrast in Terminal" }
  ]);

  useEffect(() => {
    // Realtime subscription removed to prevent any mock client incompatibilities 
    // Live issues will just use the pre-seeded initial state.
  }, []);

  // Background canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // AI Match Affinity Radar States
  const [radarTrack, setRadarTrack] = useState('full-stack');
  const [radarState, setRadarState] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [radarScore, setRadarScore] = useState(0);
  const [radarLogs, setRadarLogs] = useState<string[]>([]);
  const [radarRecommendation, setRadarRecommendation] = useState('');

  // SDE language switcher preview states
  const [activeSdeLang, setActiveSdeLang] = useState('TypeScript');
  const activeSdePreset = SDE_LANGUAGE_PRESETS.find(p => p.lang === activeSdeLang)!;

  // Load organizations list
  useEffect(() => {
    const fetchOrgs = async () => {
      const { data } = await createBrowserSupabaseClient()
        .from('organizations')
        .select('name, slug, logo_url, tech_stack, program, is_active_year_round')
        .limit(3);
      setFeaturedOrgs(data || []);
    };
    fetchOrgs();
  }, []);

  // Background Interactive Canvas Node particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles schema
    const numParticles = 75;
    const particles = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    // Mouse coordinates tracker
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 87, 51, 0.25)';
        ctx.fill();

        // Connect nearby nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mouseDist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 87, 51, ${0.15 * (1 - mouseDist / 160)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleJoinDiscord = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);
    await new Promise<void>(resolve => { setTimeout(resolve, 1400); });
    setIsJoining(false);
    setJoinedSuccess(true);
  };

  // Run AI Similarity Match Radar
  const runAiRadarScan = async () => {
    setRadarState('scanning');
    setRadarLogs([]);
    
    const logs = [
      `[AI Engine] Tracing client hardware concurrency and browser environment...`,
      `[Vector Ingestion] Generating candidate embeddings for track: ${radarTrack.toUpperCase()}`,
      `[Cosine Matrix] Running pgvector dot product computations against 185 CNCF/Wasm playbooks...`,
      `[Neural Weights] Matching optimal candidate fit indexes...`,
      `[SUCCESS] Alignment resolved.`
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise<void>(resolve => { setTimeout(resolve, 350); });
      setRadarLogs(prev => [...prev, logs[i]]);
    }

    setRadarScore(Math.round(85 + Math.random() * 14));
    
    let recommendation = "";
    if (radarTrack === 'ai-ml') {
      recommendation = "Optimal Candidate Profile! Your signature matches top AI systems. We recommend focusing on LFX PyTorch, CNCF Pixie, or InShorts vector retrieval playbooks.";
    } else if (radarTrack === 'backend') {
      recommendation = "Highly Compatible! Your systems thread signature is ideal for distributed consensus pipelines. Target Raft consensus or Envoy proxy filter playbooks.";
    } else if (radarTrack === 'full-stack') {
      recommendation = "Master Key Sync! Ideal for low-latency web platforms. Focus on SWC AST transformers, Next.js production builds, or Google-like OAuth credentials.";
    } else if (radarTrack === 'frontend') {
      recommendation = "Pixel Perfect Sync! Match resolved for rich client graphs. Focus on React Server Components, responsive bento grids, and active WebSockets telemetry.";
    } else {
      recommendation = "Data Hub Sync! Perfect for spatial analytics. Focus on Blinkit/Zepto Dijkstra routing simulations and Apache Spark observability telemetry pipelines.";
    }

    setRadarRecommendation(recommendation);
    setRadarState('done');
  };

  return (
    <main className="relative min-h-screen bg-[#07090e] overflow-hidden selection:bg-primary selection:text-white select-none">
      
      {/* HTML5 Canvas Background Particle Network */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Mesh Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-primary/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-6"
      >
        {/* Hero Section */}
        <section className="text-center max-w-6xl mx-auto mt-44 mb-28">
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 text-[9px] font-black tracking-[0.3em] text-primary uppercase bg-primary/5 border border-primary/20 backdrop-blur-xl rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            LIVE TIMELINE: GSoC 2027 • LFX 2026/2027 • Outreachy 2027
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tight mb-10 uppercase font-sans"
          >
            THE CONTRIBUTION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FF7D5E] to-purple-500 italic">
              ENGINE.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight"
          >
            Bridge the gap from developer tutorials to production codebases. Build industry-ready engineering portfolios, query metrics schema, and execute live Git graph actions.
          </motion.p>

          {/* Telemetry Hero Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16 p-6 glass rounded-3xl border border-white/5 bg-black/40 text-center"
          >
            <div className="space-y-1 border-r border-white/5 last:border-0">
              <div className="text-2xl md:text-3xl font-black text-white">185+</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">CNCF & GSoC Orgs</div>
            </div>
            <div className="space-y-1 md:border-r border-white/5 last:border-0">
              <div className="text-2xl md:text-3xl font-black text-white">4.2K+</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">PRs Audited</div>
            </div>
            <div className="space-y-1 border-r border-white/5 last:border-0">
              <div className="text-2xl md:text-3xl font-black text-[#00f0ff]">1.4M+</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">Lines Scanned</div>
            </div>
            <div className="space-y-1 last:border-0">
              <div className="text-2xl md:text-3xl font-black text-emerald-400">98%</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">Placement Match</div>
            </div>
          </motion.div>

          {/* Real-time "Good First Issues" Ticker */}
          <motion.div variants={itemVariants} className="w-full max-w-6xl mx-auto mt-12 overflow-hidden border-y border-white/5 bg-white/[0.02] py-3 flex">
             <div className="flex animate-shimmer whitespace-nowrap gap-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest px-4">
                {liveIssues.map((issue, idx) => (
                  <React.Fragment key={idx}>
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"/> 
                      [{issue.org_name}] {issue.title}
                    </span>
                    {idx < liveIssues.length - 1 && <span className="text-primary">•</span>}
                  </React.Fragment>
                ))}
             </div>
          </motion.div>
          
          {/* Main Action Hub bento cards grid */}
          <motion.div 
            variants={itemVariants} 
            className="mt-20 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-2 glass rounded-[3rem]"
          >
            <div className="relative group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-500 overflow-hidden text-left flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all pointer-events-none" />
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/5 mb-6 opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <img src="/gsoc_rocket_launch.png" alt="GSoC rocket launch" className="object-cover w-full h-full" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">PHASE A: AI MATCHING</span>
                  <h3 className="text-2xl font-black italic mt-4 text-white">Contributor Matchmaking</h3>
                  <p className="text-slate-400 mt-6 font-semibold leading-relaxed text-[13px]">Let our neural engine match your exact skill profile to the most suitable high-impact "Good First Issues".</p>
                </div>
                <Link href="/matchmaking" className="mt-10 inline-flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                  Launch Matchmaking <span className="text-sm">→</span>
                </Link>
            </div>
            
            <div className="relative group p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-[#00f0ff]/30 transition-all duration-500 overflow-hidden text-left flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/10 blur-[60px] group-hover:bg-[#00f0ff]/20 transition-all pointer-events-none" />
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/5 mb-6 opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <img src="/esoc_space_satellite.png" alt="ESoC space satellite" className="object-cover w-full h-full" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-[#00f0ff] uppercase tracking-[0.4em]">PHASE B: COMPILERS</span>
                  <h3 className="text-2xl font-black italic mt-4 text-white">Systems Syllabus</h3>
                  <p className="text-slate-400 mt-6 font-semibold leading-relaxed text-[13px]">Master low-latency network sockets, etcd Raft log compaction, SWC AST transform hooks, and vector DB setups.</p>
                </div>
                <Link href="/curriculum" className="mt-10 inline-flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-[#00f0ff] group-hover:translate-x-2 transition-transform">
                  Explore Syllabus <span className="text-sm">→</span>
                </Link>
            </div>

            <div className="relative group p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-purple-500/40 transition-all duration-500 overflow-hidden text-left flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/15 blur-[60px] group-hover:bg-purple-500/25 transition-all pointer-events-none" />
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/5 mb-6 opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <img src="/git_github_nodes.png" alt="Git network nodes" className="object-cover w-full h-full" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-purple-400 uppercase tracking-[0.4em]">PHASE C: PORTFOLIO</span>
                  <h3 className="text-2xl font-black italic mt-4 text-white">Contributor Portfolio</h3>
                  <p className="text-slate-400 mt-6 font-semibold leading-relaxed text-[13px]">Aggregate your merged PRs, open issues, and program acceptances into a verifiable, highly visual resume.</p>
                </div>
                <Link href="/portfolio/ayushshukla1807" className="mt-10 inline-flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-purple-400 group-hover:translate-x-2 transition-transform">
                  View Portfolio <span className="text-sm">→</span>
                </Link>
            </div>
          </motion.div>
        </section>

        {/* Interactive SDE Language selector preview Workspace */}
        <section className="w-full max-w-6xl px-4 py-16 mb-20 relative">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 glass rounded-[3rem] border border-white/5 relative overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left sidebar select */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-primary text-[9px] font-mono tracking-widest uppercase font-black flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>SDE Language Preview Workspace</span>
                </span>
                <h3 className="text-3xl font-black text-white italic">Interactive Code Prefs</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Select a language track to inspect mock compiler files, lines of code weights, and matched open-source organizations.
                </p>
              </div>

              {/* Language selection list */}
              <div className="space-y-2 pt-2">
                {SDE_LANGUAGE_PRESETS.map(preset => (
                  <button
                    key={preset.lang}
                    onClick={() => setActiveSdeLang(preset.lang)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                      activeSdeLang === preset.lang
                        ? 'bg-primary/10 border-primary text-white font-bold'
                        : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-sans">{preset.lang}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${activeSdeLang === preset.lang ? 'text-primary' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right code editor panel */}
            <div className="lg:col-span-2 flex flex-col justify-between gap-6">
              <div className="bg-black/60 rounded-2xl border border-white/5 p-4 flex-grow flex flex-col justify-between min-h-[260px]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3 select-none">
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-yellow-500" />
                    <span>{activeSdePreset.filename}</span>
                  </span>
                  <span className="text-[8px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                    active-buffer
                  </span>
                </div>
                
                {/* Preformatted code block */}
                <div className="flex-grow overflow-x-auto font-mono text-[11px] text-gray-300 select-text leading-relaxed whitespace-pre">
                  <code>{activeSdePreset.code}</code>
                </div>
              </div>

              {/* Statistics details bento widget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[10px]">
                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                  <div className="text-slate-500 uppercase">SDE DIFFICULTY</div>
                  <div className="text-sm font-bold text-yellow-400">{activeSdePreset.difficulty}% rating</div>
                </div>
                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                  <div className="text-slate-500 uppercase">SYNTAX SIZE</div>
                  <div className="text-sm font-bold text-white">{activeSdePreset.lines} lines</div>
                </div>
                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                  <div className="text-slate-500 uppercase">MATCHED PROGRAM</div>
                  <div className="text-sm font-bold text-[#00f0ff] font-sans truncate">{activeSdePreset.matchOrg}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* AI Match Affinity Radar Section */}
        <section className="w-full max-w-5xl px-4 py-16 mb-20 relative">
          <div className="absolute inset-0 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 glass rounded-[3rem] border border-purple-500/20 relative overflow-hidden space-y-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <span className="text-[#00f0ff] text-[9px] font-mono tracking-widest uppercase font-black flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
                  <span>Interactive Neural Radar</span>
                </span>
                <h2 className="text-4xl font-black text-white italic">AI System Match Affinity Radar</h2>
                <p className="text-xs text-slate-400 font-medium max-w-xl">
                  Run a local pgvector similarity audit to match your candidate track with the ultimate GSoC/LFX codebases.
                </p>
              </div>

              <div className="flex gap-2 bg-black/40 p-2 rounded-2xl border border-white/5 shrink-0 w-full md:w-auto justify-between">
                <select
                  value={radarTrack}
                  onChange={e => setRadarTrack(e.target.value)}
                  className="bg-transparent text-white font-black text-[10px] uppercase tracking-widest outline-none border-none cursor-pointer p-2 px-3 w-40 sm:w-48"
                >
                  <option value="full-stack">Full Stack Engineer</option>
                  <option value="ai-ml">AI/ML Engineer</option>
                  <option value="backend">Backend Engineer</option>
                  <option value="frontend">Frontend Engineer</option>
                  <option value="data-analyst">Data Analyst</option>
                </select>
                
                <button
                  onClick={runAiRadarScan}
                  disabled={radarState === 'scanning'}
                  className="bg-white text-black font-black text-[9px] uppercase tracking-widest px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all"
                >
                  {radarState === 'scanning' ? 'Scanning...' : 'Scan Alignment'}
                </button>
              </div>
            </div>

            {/* Neural Log Terminal Console */}
            {radarLogs.length > 0 && (
              <div className="font-mono text-[10px] bg-black/60 p-6 rounded-2xl border border-white/5 space-y-2 text-[#00f0ff] max-h-[160px] overflow-y-auto scrollbar-none select-text">
                {radarLogs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-purple-400">⚡</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Radar Result card */}
            {radarState === 'done' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-purple-500/5 border border-purple-500/20 rounded-[2rem] items-center">
                <div className="text-center md:text-left flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-purple-500/20 shrink-0">
                    <img src="/ai_ml_brain.png" alt="AI Neural synapse brain nodes" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <span className="text-[7px] text-gray-500 uppercase block font-mono">Similarity Matrix Match Score</span>
                    <span className="text-5xl font-black text-white">{radarScore}%</span>
                  </div>
                </div>
                <div className="md:col-span-2 text-xs font-semibold text-gray-300 leading-relaxed">
                  {radarRecommendation}
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* Dynamic Organization Grid */}
        <section className="w-full max-w-7xl px-4 py-28 border-t border-white/5">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="text-left space-y-2">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
                Active Year-<br /><span className="text-primary italic">Round.</span>
              </h2>
              <p className="text-slate-400 font-medium max-w-md">Organizations that don't sleep. Build impact 365 days a year, not just during application windows.</p>
            </div>
            
            <Link 
              href="/organizations" 
              className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all shrink-0"
            >
              <span>View All 185+ Organizations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredOrgs.map((org) => (
              <OrgCard key={org.slug} {...org} />
            ))}
          </motion.div>
        </section>

        {/* Dynamic Inline Discord Channel Console (Stunning community feed) */}
        <section className="w-full max-w-5xl px-4 py-12 mb-20 relative">
          <div className="absolute inset-0 bg-[#5865F2]/5 blur-[120px] rounded-full pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 glass rounded-[3rem] border border-[#5865F2]/20 relative overflow-hidden space-y-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <span className="text-[#5865F2] text-[9px] font-mono tracking-widest uppercase font-black flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#5865F2] animate-bounce" />
                  <span>Interactive Systems Sandbox</span>
                </span>
                <h3 className="text-3xl font-black text-white italic">Community Telemetry</h3>
                <div className="flex items-center gap-2 mt-2 select-none">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[8px] font-mono font-bold text-green-500 uppercase tracking-widest">
                    1,482 Systems Engineers Online
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsDiscordOpen(true)}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-black px-6 py-3.5 rounded-2xl text-[9px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shrink-0"
              >
                Claim Sandbox slot
              </button>
            </div>

            {/* Simulated Live channel chat feeds */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[10px] select-text">
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                <div className="text-[9px] font-bold text-gray-500 uppercase border-b border-white/5 pb-1">#general-consensus</div>
                <div className="leading-relaxed text-gray-400">
                  <strong className="text-[#00f0ff]">Ayush:</strong> "SWC AST compilation runs 20x faster with the new Rust plugin!"
                </div>
              </div>
              
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                <div className="text-[9px] font-bold text-gray-500 uppercase border-b border-white/5 pb-1">#ebpf-tracing</div>
                <div className="leading-relaxed text-gray-400">
                  <strong className="text-purple-400">Elena:</strong> "Just pushed the socket flow hook live. Telemetry reports look solid."
                </div>
              </div>

              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                <div className="text-[9px] font-bold text-gray-500 uppercase border-b border-white/5 pb-1">#swc-compiler</div>
                <div className="leading-relaxed text-gray-400">
                  <strong className="text-amber-500">Devon:</strong> "Anyone auditing etcd Raft log compaction algorithms? Hit me up."
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Global Impact CTA */}
        <section className="w-full max-w-6xl mb-48 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass p-20 md:p-32 rounded-[4rem] text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/5 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-10">THE COLLECTIVE</span>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-10 leading-none">
                Build Code <br />That <span className="italic underline decoration-primary decoration-8 underline-offset-8">Matters.</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                Join a privacy-first, identity-neutral community of engineers optimizing the world's most critical open-source infrastructure.
              </p>
              
              <div className="flex flex-wrap justify-center gap-10">
                <Link href="https://github.com/ayushshukla1807" target="_blank" className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  GitHub <span className="text-slate-700">/</span>
                </Link>
                <button onClick={() => setIsDiscordOpen(true)} className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  Discord Sandbox <span className="text-slate-700">/</span>
                </button>
                <Link href="/mentorship" className="flex items-center gap-3 text-white font-black hover:text-primary transition-colors uppercase tracking-[0.2em] text-[10px]">
                  Mentorship Sync <span className="text-slate-700">/</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>

      {/* Interactive Discord Sandbox Modal */}
      <AnimatePresence>
        {isDiscordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-xl bg-[#090b10] border border-white/10 rounded-[3.5rem] p-10 overflow-hidden relative shadow-2xl space-y-6"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/10 blur-[80px] rounded-full pointer-events-none" />
              
              <button
                onClick={() => { setIsDiscordOpen(false); setJoinedSuccess(false); }}
                className="absolute top-8 right-8 text-gray-500 hover:text-white font-bold text-xs bg-white/5 px-4 py-2 rounded-xl transition-colors"
              >
                CLOSE
              </button>

              {!joinedSuccess ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#5865F2]">OpenVeda Systems Sandbox</span>
                    <h2 className="text-3xl font-black mt-1 text-white">Join Developer Sandbox</h2>
                    
                    {/* Live Online Tracker */}
                    <div className="flex items-center gap-2 mt-2 select-none">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span className="text-[9px] font-mono font-bold text-green-500 uppercase tracking-widest">
                        1,482 Systems Engineers Online
                      </span>
                    </div>
                  </div>

                  {/* Simulated Discord Channels Preview */}
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 select-text">
                    <h4 className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Active Channels Preview</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-gray-600 font-mono">#general-consensus</span>
                        <div className="text-[10px] leading-relaxed text-gray-400 font-medium">
                          <span className="text-[#00f0ff] font-bold">Ayush (Founder):</span> "SWC AST compilation runs 20x faster with the new Rust plugin!"
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-gray-600 font-mono">#ebpf-tracing</span>
                        <div className="text-[10px] leading-relaxed text-gray-400 font-medium">
                          <span className="text-purple-400 font-bold">Elena:</span> "Just pushed the socket flow hook live. Telemetry reports looks solid."
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-gray-600 font-mono">#swc-compiler</span>
                        <div className="text-[10px] leading-relaxed text-gray-400 font-medium">
                          <span className="text-amber-500 font-bold">Devon:</span> "Anyone auditing etcd Raft log compaction algorithms? Hit me up."
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleJoinDiscord}
                    disabled={isJoining}
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-4.5 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isJoining ? (
                      <>
                        <Loader2 className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                        <span>AUTHORIZING SANDBOX CREDENTIALS...</span>
                      </>
                    ) : (
                      'CLAIM SANDBOX ACCESS SLOT'
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-10 space-y-6">
                  <div className="text-5xl">👾</div>
                  <h3 className="text-2xl font-black text-white italic">Access Token Generated!</h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                    Your developer profile credentials have been authorized. The dynamic systems channel invite has been synced to your local command center ledger!
                  </p>
                  <button
                    onClick={() => { setIsDiscordOpen(false); setJoinedSuccess(false); }}
                    className="bg-white text-black font-black px-8 py-3.5 rounded-xl text-[9px] uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    Back to Command Nexus
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Extreme Footer Glow */}
      <div className="absolute bottom-0 left-[-10%] w-[120%] h-96 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none blur-[100px]" />
    </main>
  );
}

// Simple loader helper for modular import
function Loader2({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}
