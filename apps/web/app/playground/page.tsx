'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Database, Cpu, Layers, Play, Send, Check, AlertCircle, 
  GitBranch, ArrowRight, FileText, BarChart3, GitFork, Users, 
  CheckCircle2, Code, Sparkles, Server, Sliders, RefreshCw, Download
} from 'lucide-react';
import Link from 'next/link';

// Mock DB data representing a MySQL structure for the SQL Sandbox
const mockMySQLDb = {
  organizations: [
    { id: 1, name: 'Linux Kernel', slug: 'linux-kernel', program: 'LFX', stars_count: 154000, tech_stack: 'C, Assembly, Make' },
    { id: 2, name: 'Kubernetes', slug: 'kubernetes', program: 'LFX', stars_count: 104000, tech_stack: 'Go, Bash, Docker' },
    { id: 3, name: 'GNOME', slug: 'gnome', program: 'Outreachy', stars_count: 8500, tech_stack: 'C, Rust, Python, GTK' },
    { id: 4, name: 'Appsmith', slug: 'appsmith', program: 'GSoC 2027', stars_count: 31000, tech_stack: 'Java, Spring Boot, React, TypeScript, MongoDB' },
    { id: 5, name: 'OpenTelemetry', slug: 'opentelemetry', program: 'Outreachy', stars_count: 9800, tech_stack: 'Go, Java, Python, Collector' },
    { id: 6, name: 'OpenSource Health', slug: 'os-health', program: 'ESOC 2027', stars_count: 1200, tech_stack: 'React, Node.js, PostgreSQL' },
    { id: 7, name: 'GreenCode', slug: 'greencode', program: 'ESOC 2027', stars_count: 940, tech_stack: 'Python, D3.js, EarthData' }
  ],
  playbooks: [
    { id: 101, org_id: 4, rating: 5, status: 'Platinum', author: 'OpenVeda Core' },
    { id: 102, org_id: 3, rating: 5, status: 'Platinum', author: 'OpenVeda Core' },
    { id: 103, org_id: 5, rating: 4, status: 'Gold', author: 'Community Lead' }
  ]
};

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'ai' | 'fullstack' | 'backend' | 'analyst'>('ai');

  return (
    <div className="min-h-screen bg-[#0D1117] text-gray-300 font-sans selection:bg-primary selection:text-white pb-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-6 text-[10px] font-black tracking-[0.3em] text-primary uppercase bg-primary/5 border border-primary/20 backdrop-blur-xl rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-primary" />
            RESUME TECHNICAL CAPABILITIES SHOWCASE
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tight mb-6"
          >
            Developer <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#FF8D72] to-purple-600">Playground</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium"
          >
            Exposing interactive simulations demonstrating integration of advanced AI/ML, Full Stack frameworks, 
            Data Structures, SQL Sandboxes, and Git workflows powering OpenVeda.
          </motion.p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 p-2 glass rounded-[2rem] max-w-4xl mx-auto border-border bg-background/50">
          {[
            { id: 'ai', label: 'GenAI / LLM & AI/ML', icon: Cpu, desc: 'LangChain, LangGraph, CrewAI, PyTorch, RAG' },
            { id: 'fullstack', label: 'Full Stack & Frontend', icon: Layers, desc: 'Next.js, React, Tailwind, FastAPI' },
            { id: 'backend', label: 'Backend / SDE', icon: Server, desc: 'Java, Python, MySQL, DSA, Git' },
            { id: 'analyst', label: 'Data Analyst & PM', icon: BarChart3, desc: 'Metrics, Roadmaps, PRD Specifications' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[200px] flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                    : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-black tracking-widest">{tab.label}</div>
                  <div className={`text-[8px] font-normal lowercase tracking-normal ${activeTab === tab.id ? 'text-primary-foreground/75' : 'text-muted-foreground/60'}`}>{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="glass rounded-[3rem] border-border bg-background/30 p-8 md:p-12 relative overflow-hidden min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'ai' && <AITrackView key="ai" />}
            {activeTab === 'fullstack' && <FullStackTrackView key="fullstack" />}
            {activeTab === 'backend' && <BackendTrackView key="backend" />}
            {activeTab === 'analyst' && <AnalystTrackView key="analyst" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   TAB 1: AI & GENAI TRACK VIEW
   ============================================================================ */
function AITrackView() {
  const [selectedOrg, setSelectedOrg] = useState('Appsmith');
  const [orchestrating, setOrchestrating] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [proposalOutput, setProposalOutput] = useState<string | null>(null);

  // NLP Analyzer State
  const [nlpInput, setNlpInput] = useState(`def solve_bst_traversal(root):\n    # TODO: Implement in-order traversal for dependency resolution\n    result = []\n    def helper(node):\n        if node:\n            helper(node.left)\n            result.append(node.val)\n            helper(node.right)\n    helper(root)\n    return result`);
  const [nlpOutput, setNlpOutput] = useState<any>(null);
  const [analyzingNlp, setAnalyzingNlp] = useState(false);

  // PyTorch & Scikit-learn Classifier
  const [commits, setCommits] = useState(25);
  const [prs, setPrs] = useState(4);
  const [dsaScore, setDsaScore] = useState(85);
  const [probability, setProbability] = useState(70);

  // Recalculate Mock Probability based on weights (representing Scikit-learn/PyTorch weights)
  useEffect(() => {
    // Simulated logistic regression sigmoid math: p = 1 / (1 + exp(-z))
    const w_commits = 0.05;
    const w_prs = 0.4;
    const w_dsa = 0.03;
    const bias = -4.5;
    const z = (commits * w_commits) + (prs * w_prs) + (dsaScore * w_dsa) + bias;
    const p = Math.round((1 / (1 + Math.exp(-z))) * 100);
    setProbability(p);
  }, [commits, prs, dsaScore]);

  // Agent Orchestration Loop (CrewAI + LangGraph simulation)
  const runAgentOrchestration = () => {
    setOrchestrating(true);
    setAgentLogs([]);
    setProposalOutput(null);

    const logs = [
      `[LangGraph] Initializing Graph State with org = "${selectedOrg}"`,
      `[CrewAI] Invoking Agent Squad (2 Cooperating Agents)...`,
      `[CrewAI: Repository Auditor Agent] Scanning repository structure and tech stack metrics...`,
      `[LangChain RAG] Querying vector FAISS store for context on "${selectedOrg}" playbooks...`,
      `[LangChain RAG] Retrieved 3 relevant chunks containing setup guides and unwritten rules.`,
      `[CrewAI: Repository Auditor Agent] Found primary stack: Java/Spring Boot/React/TypeScript. Identified 12 active issues.`,
      `[LangGraph] State Transition: Auditor Agent complete -> State: {audited_data: {...}} -> Transitioning to Proposal Architect Agent`,
      `[CrewAI: Proposal Architect Agent] Formulating GSoC 2027 Proposal outline based on RAG context and audit...`,
      `[CrewAI: Proposal Architect Agent] Applying formatting constraints and structural guidelines...`,
      `[LangGraph] State Transition: Proposal Architect complete -> Final State: {proposal_draft: "..."} -> Ending Graph Node`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setAgentLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setOrchestrating(false);
        setProposalOutput(
          `# GSoC 2027 Proposal Outline: ${selectedOrg}\n\n` +
          `## 1. Project Title\n` +
          `Optimizing asynchronous background job queues and frontend reactive updates in ${selectedOrg}.\n\n` +
          `## 2. Technical Stack\n` +
          `- Backend: Java Spring Boot (WebFlux / Reactor)\n` +
          `- Frontend: React (TypeScript) with Redux Sagas\n\n` +
          `## 3. Implementation Plan (LangGraph Generated)\n` +
          `- Phase 1 (Weeks 1-4): Audit current job processing state and set up local environment.\n` +
          `- Phase 2 (Weeks 5-8): Refactor the WebFlux threading model to handle high-concurrency loops.\n` +
          `- Phase 3 (Weeks 9-12): Implement client-side reactive hooks to sync job state dynamically.\n\n` +
          `## 4. Deliverables\n` +
          `- Complete unit testing suite with JUnit and Mockito (target: 85% coverage).\n` +
          `- Verification benchmarking logs showing a 25% reduction in latency.`
        );
      }
    }, 600);
  };

  // Hugging Face NLP code evaluation simulation
  const analyzeNlp = () => {
    setAnalyzingNlp(true);
    setTimeout(() => {
      setAnalyzingNlp(false);
      setNlpOutput({
        tokens: nlpInput.split(/\s+/).slice(0, 15).map(t => t.replace(/[^a-zA-Z]/g, '')).filter(Boolean),
        sentiment: 'Positive (Confidence: 94.2%)',
        readability: 'Excellent (SDE Tier-1 Standard)',
        constructiveness: '97.8% Professional',
        complexity: 'O(N) Traversal detected'
      });
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12"
    >
      <div className="border-b border-border/50 pb-6">
        <h2 className="text-3xl font-black text-white italic flex items-center gap-3">
          <Cpu className="text-primary" /> GenAI / LLM & AI/ML Track
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Demonstrating multi-agent systems, RAG indexes, NLP pipelines, and analytical classifiers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: CrewAI & LangGraph Multi-Agent Orchestration */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">AGENTIC AGENT WORKFLOWS</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">CrewAI & LangGraph Proposal Orchestrator</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Simulates a cooperative team of agents. Select a mentoring organization, click run, and watch the agents retrieve playbook context via **LangChain RAG** and orchestrate a proposal outline through a **LangGraph** node flow.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-black uppercase text-slate-400">Target Org:</span>
              <select 
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white outline-none cursor-pointer"
              >
                <option value="Appsmith">Appsmith (GSoC)</option>
                <option value="GNOME">GNOME (Outreachy)</option>
                <option value="Kubernetes">Kubernetes (LFX)</option>
                <option value="OpenTelemetry">OpenTelemetry (Outreachy)</option>
              </select>
            </div>

            {/* Agent Log Console */}
            <div className="h-48 bg-black/60 rounded-2xl p-4 font-mono text-[10px] overflow-y-auto border border-white/5 space-y-2 mb-6 scrollbar-thin">
              {agentLogs.length === 0 && (
                <div className="text-gray-500 italic">No agent execution trace. Click "Orchestrate Agents" below...</div>
              )}
              {agentLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('[LangGraph]') ? 'text-cyan-400 font-bold' : log.startsWith('[LangChain') ? 'text-yellow-400' : 'text-gray-300'}>
                  {log}
                </div>
              ))}
              {orchestrating && (
                <div className="flex items-center gap-2 text-primary font-black animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Orchestrating node transitions...
                </div>
              )}
            </div>
          </div>

          <div>
            {proposalOutput ? (
              <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 text-left">
                <h4 className="text-xs font-black uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Generated Proposal Outline Drafted
                </h4>
                <pre className="text-[9px] font-mono text-slate-300 whitespace-pre-wrap max-h-32 overflow-y-auto">{proposalOutput}</pre>
              </div>
            ) : null}

            <button
              onClick={runAgentOrchestration}
              disabled={orchestrating}
              className="w-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Orchestrate Agents
            </button>
          </div>
        </div>

        {/* Module 2: Hugging Face & NLP Code Analyzer */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">NATURAL LANGUAGE PROCESSING</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">Hugging Face Transformers NLP Analyzer</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Exposes how developers can integrate **Transformers** to run sentiment audits on code reviews or classify code structures. Paste code below to extract token mappings and metrics.
            </p>

            <textarea
              value={nlpInput}
              onChange={(e) => setNlpInput(e.target.value)}
              className="w-full h-36 bg-black/40 border border-white/10 rounded-2xl p-4 font-mono text-xs text-slate-300 outline-none focus:ring-1 focus:ring-purple-500 mb-6"
            />
          </div>

          <div>
            {nlpOutput ? (
              <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="text-[9px] text-muted-foreground uppercase font-black">Sentiment</div>
                  <div className="text-xs font-bold text-white mt-1">{nlpOutput.sentiment}</div>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="text-[9px] text-muted-foreground uppercase font-black">Readability</div>
                  <div className="text-xs font-bold text-white mt-1">{nlpOutput.readability}</div>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl col-span-2">
                  <div className="text-[9px] text-muted-foreground uppercase font-black">Extracted Tokens (first 10)</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {nlpOutput.tokens.map((token: string, idx: number) => (
                      <span key={idx} className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded text-[9px] font-mono">
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <button
              onClick={analyzeNlp}
              disabled={analyzingNlp}
              className="w-full bg-purple-600 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {analyzingNlp ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Code className="w-4 h-4" />}
              {analyzingNlp ? 'Tokenizing Codebase...' : 'Analyze Code with Transformers'}
            </button>
          </div>
        </div>

        {/* Module 3: Scikit-learn & PyTorch Readiness Classifier */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 lg:col-span-2">
          <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em]">CLASSIFICATION & CLUSTERING</span>
          <h3 className="text-2xl font-black text-white italic mt-2 mb-4">PyTorch & Scikit-learn Predictive Match Classifier</h3>
          <p className="text-xs text-slate-400 mb-8 max-w-3xl leading-relaxed">
            Tweak the sliders below to simulate input vectors feeding into a **PyTorch** Neural Network weight model or a **Scikit-learn** logistic classifier. The model calculates the student's probability of securing selection based on git activity and syllabus preparation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Sliders */}
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                  <span>Git Commits (Feature 1)</span>
                  <span className="text-primary">{commits} commits</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={commits}
                  onChange={(e) => setCommits(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/50 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                  <span>Pull Requests Merged (Feature 2)</span>
                  <span className="text-primary">{prs} PRs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={prs}
                  onChange={(e) => setPrs(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/50 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                  <span>Data Structure / Systems Core Score (Feature 3)</span>
                  <span className="text-primary">{dsaScore}% Score</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dsaScore}
                  onChange={(e) => setDsaScore(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/50 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Neural Net Classification Result */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-primary/5 blur-[50px] pointer-events-none rounded-full" />
              <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">CLASSIFICATION PROBABILITY</div>
              
              <div className="relative flex items-center justify-center mb-4">
                {/* SVG Radial Progress Ring */}
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="var(--primary)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={339}
                    strokeDashoffset={339 - (339 * probability) / 100}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute text-3xl font-black text-white italic">{probability}%</div>
              </div>

              <div className="text-[10px] font-black uppercase tracking-wider mt-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                {probability >= 75 ? 'Classification: Selectable' : probability >= 50 ? 'Classification: Marginal' : 'Classification: Reject'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   TAB 2: FULL STACK & FRONTEND TRACK VIEW
   ============================================================================ */
function FullStackTrackView() {
  const [endpoint, setEndpoint] = useState('POST /api/v1/proposals/generate');
  const [requestBody, setRequestBody] = useState(`{\n  "org_slug": "appsmith",\n  "proposal_title": "Optimizing Redux State Sagas",\n  "contributor_xp": "Highly Proficient"\n}`);
  const [fastapiLoading, setFastapiLoading] = useState(false);
  const [fastapiResponse, setFastapiResponse] = useState<any>(null);

  const triggerApi = () => {
    setFastapiLoading(true);
    setFastapiResponse(null);
    setTimeout(() => {
      setFastapiLoading(false);
      if (endpoint === 'POST /api/v1/proposals/generate') {
        setFastapiResponse({
          status: 'success',
          code: 201,
          message: 'Proposal template generated successfully via OpenAI LLM chain.',
          payload: {
            title: 'Optimizing Redux State Sagas',
            org: 'Appsmith',
            author: 'Ayush Shukla (openveda-contributor)',
            state_graph_node: 'proposal_completion_node',
            draft_size_bytes: 4509
          }
        });
      } else if (endpoint === 'GET /api/v1/health') {
        setFastapiResponse({
          status: 'online',
          code: 200,
          service: 'FastAPI OpenVeda Engine',
          uptime: '489.2 hours',
          database_connection: 'MySQL Connected',
          rag_index: 'FAISS Active',
          transformers_cached_models: ['code-bert-nlp', 'gpt-2-sentiment']
        });
      } else {
        setFastapiResponse({
          status: 'success',
          code: 200,
          payload: {
            calculated_score: 87.5,
            verification_sha: 'a5c78d0ef923f11a8c08',
            contributions: {
              commits: 25,
              pull_requests: 4,
              stars_given: 12
            }
          }
        });
      }
    }, 900);
  };

  useEffect(() => {
    if (endpoint === 'GET /api/v1/health') {
      setRequestBody('{}');
    } else if (endpoint === 'POST /api/v1/proposals/generate') {
      setRequestBody(`{\n  "org_slug": "appsmith",\n  "proposal_title": "Optimizing Redux State Sagas",\n  "contributor_xp": "Highly Proficient"\n}`);
    } else {
      setRequestBody(`{\n  "score_id": "verify-score-uuid-09",\n  "username": "ayushshukla1807"\n}`);
    }
  }, [endpoint]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12"
    >
      <div className="border-b border-border/50 pb-6">
        <h2 className="text-3xl font-black text-white italic flex items-center gap-3">
          <Layers className="text-primary" /> Full Stack & Frontend Developer Track
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Testing client-side interactive Next.js routing and FastAPI backend endpoints interface.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Next.js + React + Tailwind CSS Interface Map */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">ARCHITECTURE MATRIX</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">Next.js App Router & React Render Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              OpenVeda is engineered using **Next.js** App Router with **React** component lifecycle states and styled with **Tailwind CSS**. Click the states below to explore where pages render.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Root Server Layout</h4>
                <p className="text-[10px] text-slate-400 mt-1">Statically optimized. Handles og:meta tags and theme config.</p>
              </div>
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-black uppercase tracking-wider rounded-lg">Server Side</span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Organizations Route (/organizations)</h4>
                <p className="text-[10px] text-slate-400 mt-1">Prerenders static list of 185 orgs on first load, hydration fallback ready.</p>
              </div>
              <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[8px] font-black uppercase tracking-wider rounded-lg">Static Pre-render</span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Interactive Playbook Client (/playbook/[slug])</h4>
                <p className="text-[10px] text-slate-400 mt-1">Handles real-time search queries and tab selections locally on user client.</p>
              </div>
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-black uppercase tracking-wider rounded-lg">Client Side (Hydrated)</span>
            </div>
          </div>
        </div>

        {/* Module 2: Interactive FastAPI Sandbox Mock Rest Client */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">BACKEND ENDPOINTS API TESTER</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">FastAPI Microservice Rest Sandbox</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              OpenVeda communicates with a **FastAPI** service written in Python. Test the endpoints by executing requests below.
            </p>

            <div className="flex gap-2 items-center mb-4">
              <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">Endpoint:</span>
              <select
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-[10px] font-black text-primary uppercase tracking-widest outline-none cursor-pointer w-full"
              >
                <option value="GET /api/v1/health">GET /api/v1/health</option>
                <option value="POST /api/v1/proposals/generate">POST /api/v1/proposals/generate</option>
                <option value="POST /api/v1/scoring/audit">POST /api/v1/scoring/audit</option>
              </select>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Request Body (JSON)</span>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                disabled={endpoint === 'GET /api/v1/health'}
                className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-3 font-mono text-[10px] text-slate-300 outline-none focus:ring-1 focus:ring-primary disabled:opacity-30"
              />
            </div>
          </div>

          <div>
            {fastapiResponse ? (
              <div className="mb-4 text-left">
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block mb-2">Response Output</span>
                <pre className="p-3 bg-black/80 rounded-xl border border-white/10 font-mono text-[9px] text-green-400 overflow-x-auto max-h-40 overflow-y-auto">
                  {JSON.stringify(fastapiResponse, null, 2)}
                </pre>
              </div>
            ) : null}

            <button
              onClick={triggerApi}
              disabled={fastapiLoading}
              className="w-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {fastapiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {fastapiLoading ? 'Invoking FastAPI Endpoint...' : 'Send Request'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   TAB 3: BACKEND / SDE TRACK VIEW (MySQL Sandbox & DSA)
   ============================================================================ */
function BackendTrackView() {
  // SQL Sandbox State
  const [sqlQuery, setSqlQuery] = useState(`SELECT name, program, stars_count FROM organizations WHERE program = 'GSoC 2027' ORDER BY stars_count DESC;`);
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [sqlError, setSqlError] = useState<string | null>(null);

  // DSA BST Traverser State
  const [dsaLogs, setDsaLogs] = useState<string[]>([]);
  const [dsaPath, setDsaPath] = useState<string[]>([]);

  // Git Pipeline Simulation State
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [runningPipeline, setRunningPipeline] = useState(false);

  const executeSqlQuery = () => {
    setSqlError(null);
    setSqlResult(null);

    // Simple custom client-side SQL parser simulation representing MySQL engine operations
    const cleaned = sqlQuery.trim().toLowerCase().replace(/\s+/g, ' ');
    
    setTimeout(() => {
      try {
        if (!cleaned.startsWith('select')) {
          throw new Error("Only SELECT read-only queries are supported in this MySQL Sandbox.");
        }

        if (cleaned.includes('where program = \'gsoc 2027\'')) {
          const res = mockMySQLDb.organizations.filter(org => org.program === 'GSoC 2027');
          setSqlResult(res);
        } else if (cleaned.includes('select name, program')) {
          setSqlResult(mockMySQLDb.organizations.map(o => ({ name: o.name, program: o.program, stars_count: o.stars_count })));
        } else if (cleaned.includes('select * from playbooks')) {
          setSqlResult(mockMySQLDb.playbooks);
        } else {
          // Default fall back
          setSqlResult(mockMySQLDb.organizations);
        }
      } catch (err: any) {
        setSqlError(err.message);
      }
    }, 600);
  };

  // Traversal Visualizer for Data Structure (Binary Search Tree Traversal Simulation)
  const runDsaTraversal = (type: 'inorder' | 'preorder' | 'postorder') => {
    setDsaLogs([]);
    setDsaPath([]);

    // Mock tree nodes representing syllabus hierarchy:
    // Root: Appsmith (4), Left: GNOME (3), Right: OpenTelemetry (5)
    const steps: string[] = [];
    const path: string[] = [];

    if (type === 'inorder') {
      steps.push("BST Traversal: Left -> Root -> Right");
      steps.push("Step 1: Traverse left subtree of Root (Appsmith). Navigating to Node: GNOME");
      path.push("GNOME");
      steps.push("Step 2: Visit Node: GNOME (Add to traversal array)");
      steps.push("Step 3: Backtrack to Root. Visit Node: Appsmith");
      path.push("Appsmith");
      steps.push("Step 4: Visit Node: Appsmith (Add to traversal array)");
      steps.push("Step 5: Traverse right subtree of Root. Navigating to Node: OpenTelemetry");
      path.push("OpenTelemetry");
      steps.push("Step 6: Visit Node: OpenTelemetry (Add to traversal array)");
    } else if (type === 'preorder') {
      steps.push("BST Traversal: Root -> Left -> Right");
      steps.push("Step 1: Visit Root Node: Appsmith");
      path.push("Appsmith");
      steps.push("Step 2: Traverse left subtree of Root. Visit Node: GNOME");
      path.push("GNOME");
      steps.push("Step 3: Traverse right subtree of Root. Visit Node: OpenTelemetry");
      path.push("OpenTelemetry");
    } else {
      steps.push("BST Traversal: Left -> Right -> Root");
      steps.push("Step 1: Traverse left subtree. Visit Node: GNOME");
      path.push("GNOME");
      steps.push("Step 2: Traverse right subtree. Visit Node: OpenTelemetry");
      path.push("OpenTelemetry");
      steps.push("Step 3: Backtrack to Root. Visit Node: Appsmith");
      path.push("Appsmith");
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setDsaLogs(prev => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
        setDsaPath(path);
      }
    }, 500);
  };

  // Simulated CI/CD Pipeline
  const runGitPipeline = () => {
    setRunningPipeline(true);
    setPipelineLogs([]);

    const steps = [
      `[Git CLI] git add .`,
      `[Git CLI] git commit -m "feat: optimize MySQL queries and integrate PyTorch models"`,
      `[Git CLI] git push origin main`,
      `[GitHub Actions] Triggering deployment runner...`,
      `[GitHub Actions: Step 1] Installing Python (FastAPI/LangChain) & Node.js (Next.js) environment...`,
      `[GitHub Actions: Step 2] Running Prettier & ESLint checks... (Verified)`,
      `[GitHub Actions: Step 3] Executing PyTorch neural weight validation tests...`,
      `[GitHub Actions: Step 4] Compiling static Next.js assets to build artifacts...`,
      `[GitHub Actions: Step 5] Generating MySQL schema migrations for GSoC 2027...`,
      `[GitHub Actions] Production deployment successful! Site is live at openveda.in.`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setPipelineLogs(prev => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
        setRunningPipeline(false);
      }
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12"
    >
      <div className="border-b border-border/50 pb-6">
        <h2 className="text-3xl font-black text-white italic flex items-center gap-3">
          <Server className="text-primary" /> Backend / SDE Developer Track
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Interacting with database layouts, memory models, data structures, and pipeline controllers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: SQL Sandbox (MySQL / SQL) */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">MYSQL SCHEMA SANDBOX</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">MySQL Database Query Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Write SQL queries below to read from simulated database tables representing our system. Try queries selecting from `organizations` or `playbooks`.
            </p>

            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-28 bg-black/50 border border-white/10 rounded-2xl p-4 font-mono text-[10px] text-slate-300 outline-none focus:ring-1 focus:ring-primary mb-6"
            />
          </div>

          <div>
            {sqlError && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-mono mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{sqlError}</span>
              </div>
            )}

            {sqlResult && (
              <div className="mb-4 overflow-x-auto max-h-48 border border-white/10 rounded-xl bg-black/40">
                <table className="w-full text-left font-mono text-[9px]">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400">
                    <tr>
                      {Object.keys(sqlResult[0] || {}).map((key) => (
                        <th key={key} className="p-3 uppercase font-black tracking-wider">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {sqlResult.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val: any, idx2) => (
                          <td key={idx2} className="p-3">
                            {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button
              onClick={executeSqlQuery}
              className="w-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" /> Run SQL Query
            </button>
          </div>
        </div>

        {/* Module 2: DSA BST Traverser Visualizer */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em]">DATA STRUCTURES & ALGORITHMS</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">Binary Search Tree (BST) Traverser</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Demonstrating the **Data Structures** coursework skill by traversing a GSoC playbook dependency tree. Select a traversal mode to trace search paths.
            </p>

            {/* Simulated Tree Nodes */}
            <div className="flex justify-center items-center gap-8 py-6 mb-6 bg-black/30 border border-white/5 rounded-2xl relative">
              {/* Appsmith Node (Root) */}
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-[8px] font-black uppercase text-center ${dsaPath.includes('Appsmith') ? 'border-primary bg-primary/20 text-primary' : 'border-white/20'}`}>
                  Root (4)<br />Appsmith
                </div>
                <div className="flex justify-between w-32 mt-4">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-[8px] font-black uppercase text-center ${dsaPath.includes('GNOME') ? 'border-primary bg-primary/20 text-primary' : 'border-white/20'}`}>
                    Left (3)<br />GNOME
                  </div>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-[8px] font-black uppercase text-center ${dsaPath.includes('OpenTelemetry') ? 'border-primary bg-primary/20 text-primary' : 'border-white/20'}`}>
                    Right (5)<br />OTel
                  </div>
                </div>
              </div>
            </div>

            <div className="h-32 bg-black/60 rounded-2xl p-4 font-mono text-[9px] overflow-y-auto border border-white/5 space-y-2 mb-6 scrollbar-thin">
              {dsaLogs.length === 0 && (
                <div className="text-gray-500 italic">Select traversal mode to initiate...</div>
              )}
              {dsaLogs.map((log, idx) => (
                <div key={idx} className="text-slate-300">{log}</div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {['inorder', 'preorder', 'postorder'].map((mode) => (
              <button
                key={mode}
                onClick={() => runDsaTraversal(mode as any)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black text-[9px] uppercase tracking-wider py-3.5 rounded-lg border border-white/5 transition-all"
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Module 3: Git & CI/CD Pipeline Simulator */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 lg:col-span-2 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">CLOUD & DEVOPS AUTOMATION</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">Git CLI & GitHub Action CI/CD Automation Pipeline</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Exposes the project delivery cycle. Trigger the pipeline to simulate automated deployment stages: testing, code linting, static asset exports, and production releases.
            </p>

            <div className="h-40 bg-black/80 rounded-2xl p-4 font-mono text-[10px] overflow-y-auto border border-white/5 space-y-2 mb-6 scrollbar-thin">
              {pipelineLogs.length === 0 && (
                <div className="text-gray-500 italic">Console idle. Trigger Git push pipeline below...</div>
              )}
              {pipelineLogs.map((log, idx) => (
                <div key={idx} className={log.includes('[Git CLI]') ? 'text-cyan-400' : log.includes('successful') ? 'text-green-400 font-bold' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
              {runningPipeline && (
                <div className="flex items-center gap-2 text-primary font-black animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Pipelines executing checks...
                </div>
              )}
            </div>
          </div>

          <button
            onClick={runGitPipeline}
            disabled={runningPipeline}
            className="w-full bg-[#1b1f24] hover:bg-[#24292f] border border-[#30363d] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <GitBranch className="w-4 h-4" /> Trigger Git Push & GitHub Action
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   TAB 4: DATA ANALYST & PRODUCT MANAGEMENT TRACK VIEW
   ============================================================================ */
function AnalystTrackView() {
  const [selectedSpec, setSelectedSpec] = useState('AI Code Reviewer');
  const [prdSpec, setPrdSpec] = useState<string | null>(null);

  const generatePrd = () => {
    let specText = '';
    if (selectedSpec === 'AI Code Reviewer') {
      specText = `# PRD SPECIFICATION: AI Code Reviewer Integration\n` +
                 `## 1. Objective & Goals\n` +
                 `- Goal: Automate static code reviews on pull requests directly in the Git Sandbox.\n` +
                 `- Objective: Increase student merge probability in GSoC 2027 by auditing commit diffs prior to pushing upstream.\n\n` +
                 `## 2. Target Audience\n` +
                 `- SDE interns and open source aspirants preparing proposals.\n\n` +
                 `## 3. Product Features & User Stories\n` +
                 `- Feature 1: Automatic triggers on committing in terminal.\n` +
                 `- User Story: "As a developer, I want my code diff to be audited so I can resolve compiler bugs instantly."\n\n` +
                 `## 4. Technical Architecture Specifications\n` +
                 `- Frontend interface: Next.js + Tailwind CSS.\n` +
                 `- Processing engine: FastAPI microservice.\n` +
                 `- Core NLP pipeline: Hugging Face CodeBERT model running on token vectors.\n\n` +
                 `## 5. Success Metrics & KPIs\n` +
                 `- KPI 1: Mean Time to PR approval reduced by 15%.\n` +
                 `- KPI 2: User engagement duration inside the Sandbox page increases by 25%.`;
    } else {
      specText = `# PRD SPECIFICATION: pgvector Similarity Matching Engine\n` +
                 `## 1. Objective & Goals\n` +
                 `- Goal: Provide smart match scores aligning applicant skills with organization tech stacks.\n\n` +
                 `## 2. Product Features & User Stories\n` +
                 `- Feature 1: Vector matching of candidate profile tags against database indexing metadata.\n` +
                 `- User Story: "As an applicant, I want to see which CNCF or GSoC organizations match my Python and React skills."\n\n` +
                 `## 3. Technical Architecture Specifications\n` +
                 `- Database storage: PostgreSQL (with Supabase pgvector extension active).\n` +
                 `- Query mechanism: Cosine similarity comparison calculations.\n\n` +
                 `## 4. Success Metrics & KPIs\n` +
                 `- KPI 1: User click-through rate to Playbook pages increases by 40%.\n` +
                 `- KPI 2: Verification credential downloads increase by 30%.`;
    }
    setPrdSpec(specText);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12"
    >
      <div className="border-b border-border/50 pb-6">
        <h2 className="text-3xl font-black text-white italic flex items-center gap-3">
          <BarChart3 className="text-primary" /> Data Analyst & Product Management Track
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Generating Product Requirement Documents, analyzing repository velocities, and rendering metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Contributor Data Analytics Dashboard */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">DATA WRANGLING & VISUALIZATION</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">Contributor Performance Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Visualizing repository growth velocities and technology allocations across open-source mentoring programs.
            </p>

            {/* SVG Visual Metrics Chart Mockup */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Active Contributor Velocity</span>
                <span className="text-[9px] font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20 font-mono">+12.4% / mo</span>
              </div>
              
              <div className="flex items-end justify-between h-32 gap-3 px-2">
                {[
                  { month: 'Jan', val: 35 },
                  { month: 'Feb', val: 55 },
                  { month: 'Mar', val: 45 },
                  { month: 'Apr', val: 75 },
                  { month: 'May', val: 65 },
                  { month: 'Jun', val: 95 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all relative group" style={{ height: `${item.val}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 rounded px-1.5 py-0.5 text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.val * 10} dev</div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockMySQLDb));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href",     dataStr);
                downloadAnchor.setAttribute("download", "openveda_analytics.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> Export dataset
            </button>
          </div>
        </div>

        {/* Module 2: PM PRD Spec Generator */}
        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em]">PRODUCT MANAGEMENT & STRATEGY</span>
            <h3 className="text-2xl font-black text-white italic mt-2 mb-4">PRD Specifications Document Generator</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Expose product strategy skills. Choose a feature track, generate a Product Requirement Document (PRD), and review objectives and specifications.
            </p>

            <div className="flex gap-2 items-center mb-6">
              <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">Feature Specs:</span>
              <select
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-[10px] font-black text-yellow-500 uppercase tracking-widest outline-none cursor-pointer w-full"
              >
                <option value="AI Code Reviewer">AI Code Reviewer Integration</option>
                <option value="pgvector Matching">pgvector Match Engine</option>
              </select>
            </div>

            {prdSpec ? (
              <div className="mb-6 p-4 rounded-xl bg-black/50 border border-white/10 text-left max-h-56 overflow-y-auto scrollbar-thin">
                <pre className="text-[9px] font-mono text-slate-300 whitespace-pre-wrap">{prdSpec}</pre>
              </div>
            ) : (
              <div className="h-28 flex items-center justify-center italic text-xs text-gray-500 mb-6">No PRD drafted. Click "Draft PRD Specification"...</div>
            )}
          </div>

          <button
            onClick={generatePrd}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" /> Draft PRD Specification
          </button>
        </div>
      </div>
    </motion.div>
  );
}
