'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, FileText, Send, Loader2, CheckCircle2, ArrowRight, 
  ChevronRight, BrainCircuit, Search, HelpCircle, AlertCircle,
  Code2, ShieldAlert, Cpu
} from 'lucide-react';

interface ReviewNode {
  id: string;
  name: string;
  desc: string;
  status: 'idle' | 'active' | 'completed' | 'failed';
  icon: string;
}

const REVIEW_NODES_PRESET: ReviewNode[] = [
  { id: 'inp', name: 'Draft Input Parser', desc: 'Sanitizing text stream and resolving semantic intents.', status: 'idle', icon: 'FileText' },
  { id: 'rag', name: 'RAG Document Retrieval', desc: 'Querying vector stores for target repo codebase docs.', status: 'idle', icon: 'Search' },
  { id: 'aln', name: 'Code Align Evaluator', desc: 'Auditing API schemas and structural dependencies.', status: 'idle', icon: 'Code2' },
  { id: 'git', name: 'Git Ledger Matcher', desc: 'Validating commit histories and active PR frequencies.', status: 'idle', icon: 'BrainCircuit' },
  { id: 'out', name: 'AI Critique Generator', desc: 'Compiling structured scores and line-by-line feedback.', status: 'idle', icon: 'Sparkles' }
];

const MOCK_PROPOSAL_DEFAULT = `# Proposal: implement connection pooling telemetry in Kubernetes

## Objective
Introduce low-overhead metrics monitoring inside the dynamic connection pool controller.

## Proposed Changes
1. Hook eBPF sockets to record TCP round-trips.
2. Store counts in PostgreSQL/MySQL or locally using local keys.
3. Expose prometheus metric endpoints at '/metrics'.`;

export default function ProposalReviewer() {
  const [proposalText, setProposalText] = useState(MOCK_PROPOSAL_DEFAULT);
  const [targetOrg, setTargetOrg] = useState('Kubernetes');
  
  // Running state variables
  const [auditing, setAuditing] = useState(false);
  const [activeNodeIdx, setActiveNodeIdx] = useState<number | null>(null);
  const [graphNodes, setGraphNodes] = useState<ReviewNode[]>([...REVIEW_NODES_PRESET]);
  
  // Audits outputs
  const [score, setScore] = useState<number | null>(null);
  const [ragDocs, setRagDocs] = useState<string[]>([]);
  const [critique, setCritique] = useState<{ strengths: string[]; weaknesses: string[]; improvements: string[] } | null>(null);
  
  // Conversational bot states
  const [chatInput, setChatInput] = useState('');
  const [chatLogs, setChatLogs] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hi! I am the OpenVeda LangGraph agent. Run an audit on your draft proposal above, and ask me any questions about refining your system design!' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleStartAudit = () => {
    if (auditing) return;
    
    setAuditing(true);
    setScore(null);
    setRagDocs([]);
    setCritique(null);
    setActiveNodeIdx(null);

    const resetNodes = REVIEW_NODES_PRESET.map(n => ({ ...n, status: 'idle' as const }));
    setGraphNodes(resetNodes);

    // Run graph execution flow
    runGraphStep(0, resetNodes);
  };

  const runGraphStep = (idx: number, currentNodes: ReviewNode[]) => {
    if (idx >= currentNodes.length) {
      // Completed full LangGraph flow
      setAuditing(false);
      setActiveNodeIdx(null);
      
      // Calculate scores based on keywords in proposal
      compileAuditResults();
      return;
    }

    setActiveNodeIdx(idx);
    
    // Update active node status
    const updatedNodes = currentNodes.map((node, nIdx) => {
      if (nIdx === idx) return { ...node, status: 'active' as const };
      if (nIdx < idx) return { ...node, status: 'completed' as const };
      return node;
    });
    setGraphNodes(updatedNodes);

    // Delay to simulate computation
    setTimeout(() => {
      runGraphStep(idx + 1, updatedNodes);
    }, 1200);
  };

  const compileAuditResults = () => {
    const textLower = proposalText.toLowerCase();
    
    // Check keywords to dynamically calculate score
    let scoreVal = 60; // baseline
    const matchedDocs: string[] = [];
    
    if (textLower.includes('ebpf')) {
      scoreVal += 12;
      matchedDocs.push('k8s.io/kubernetes/pkg/kubelet/network/ebpf_tracker.go');
    }
    if (textLower.includes('metrics') || textLower.includes('prometheus')) {
      scoreVal += 8;
      matchedDocs.push('k8s.io/kubernetes/pkg/kubelet/metrics/collector.go');
    }
    if (textLower.includes('connection') || textLower.includes('pool')) {
      scoreVal += 10;
      matchedDocs.push('k8s.io/kubernetes/pkg/network/connection_pool.go');
    }
    if (textLower.includes('mysql') || textLower.includes('postgres')) {
      scoreVal -= 5; // Warn: Kubernetes does not use SQL directly in kubelet
    }

    scoreVal = Math.min(100, Math.max(10, scoreVal));
    setScore(scoreVal);
    
    if (matchedDocs.length === 0) {
      matchedDocs.push('k8s.io/kubernetes/README.md', 'k8s.io/kubernetes/pkg/kubelet/types.go');
    }
    setRagDocs(matchedDocs);

    // Critique compiles
    if (scoreVal >= 80) {
      setCritique({
        strengths: [
          'Excellent alignment: Proposal leverages low-overhead eBPF tracing matches existing architecture paradigms.',
          'Comprehensive metrics mapping with prometheus endpoints.'
        ],
        weaknesses: [
          'Does not mention dynamic resizing variables of the connection pool.'
        ],
        improvements: [
          'Add a section explaining how thread context switching overheads are bypassed.',
          'Define detailed schema fields matching kubernetes telemetry format specifications.'
        ]
      });
    } else {
      setCritique({
        strengths: [
          'Basic intent and architecture boundaries are defined.'
        ],
        weaknesses: [
          'Unnecessary database dependencies: Kubelet does not directly connect to relational databases (PostgreSQL/MySQL). This breaks container encapsulation models.',
          'Lack of concrete implementation timelines and eBPF kernel hooks configurations.'
        ],
        improvements: [
          'Remove SQL storage reference. Store telemetry statistics in-memory or stream directly to nodes endpoints.',
          'Provide clear configuration paths for setup-python or setup-go CI environment testing actions.'
        ]
      });
    }

    setChatLogs(prev => [
      ...prev,
      { sender: 'bot', text: `Audit completed! Your proposal readiness score is **${scoreVal}/100**. ${
        scoreVal < 80 
          ? 'I found some architecture mismatch issues (e.g. database setup). Ask me: "How do I resolve the database feedback?" to get suggestions!' 
          : 'Great work! Ask me: "How can I optimize thread-switching overhead?" to refine further!'
      }` }
    ]);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatLogs(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    setTimeout(() => {
      let botResponse = 'I am auditing the proposal structures. Could you please specify which codebase component you would like to map?';
      const q = userMessage.toLowerCase();

      if (q.includes('database') || q.includes('postgres') || q.includes('sql')) {
        botResponse = `In Kubernetes kubelet microservices, local node metrics are transient and should not be saved in a relational SQL database. Instead, expose them as prometheus text-formatted endpoints (e.g. at \`/metrics\`) and let centralized telemetry systems scrape them. This maintains low latency and node autonomy.`;
      } else if (q.includes('ebpf') || q.includes('overhead') || q.includes('thread')) {
        botResponse = `By using eBPF hooks on TCP sockets, you capture socket latency events inside the kernel ring-buffers before they transition to user space. This bypasses thread context-switching overhead completely and limits memory footprint. Map your hooks in \`ebpf_tracker.go\` using ring-buffers.`;
      } else if (q.includes('refine') || q.includes('improve')) {
        botResponse = `Based on current RAG document matches, I suggest: \n1. Modify step 2 of your proposal to use 'in-memory ring-buffers' instead of PostgreSQL.\n2. Add a CI test check step in your GitHub Actions YAML config to compile and test the eBPF binary.`;
      }

      setChatLogs(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setChatLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 min-h-[75vh]">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00f0ff] rounded-full animate-ping" />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">AI Proposal Audit (LangGraph/RAG)</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Audit proposal drafts against organization codebase documents. Uses a simulated multi-agent LangGraph workflow.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl px-3 py-2 shrink-0">
          <span className="text-[10px] text-gray-500 font-bold">TARGET ORG:</span>
          <select
            value={targetOrg}
            onChange={(e) => setTargetOrg(e.target.value)}
            className="bg-transparent text-xs text-white border-none outline-none focus:ring-0 font-bold"
            disabled={auditing}
          >
            <option value="Kubernetes">Kubernetes</option>
            <option value="CNCF">CNCF</option>
            <option value="Appsmith">Appsmith</option>
            <option value="OpenTelemetry">OpenTelemetry</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left column: Proposal text input and visual graph tracker */}
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* Proposal Editor */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4 bg-black/40 flex-grow flex flex-col">
            <div className="flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" />
                <span>Proposal Markdown Editor</span>
              </span>

              <button
                onClick={handleStartAudit}
                disabled={auditing}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary/80 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
              >
                {auditing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing Draft...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>Audit Draft</span>
                  </>
                )}
              </button>
            </div>

            <textarea 
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              className="w-full flex-grow min-h-[220px] bg-black/60 border border-white/5 rounded-2xl p-4 font-mono text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/40 leading-relaxed select-text"
              disabled={auditing}
            />
          </div>

          {/* LangGraph Node transition visualizer */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00f0ff]" />
              <span>Multi-Agent LangGraph Node State</span>
            </h4>

            {/* Horizontal flow line of nodes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
              {graphNodes.map((node, idx) => {
                let nodeBorder = 'border-white/5 bg-white/[0.01]';
                let statusColor = 'text-gray-500';
                
                if (node.status === 'active') {
                  nodeBorder = 'border-[#00f0ff]/30 bg-[#00f0ff]/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]';
                  statusColor = 'text-[#00f0ff] font-bold';
                } else if (node.status === 'completed') {
                  nodeBorder = 'border-emerald-500/20 bg-emerald-500/5';
                  statusColor = 'text-emerald-400';
                }

                return (
                  <div key={node.id} className={`p-3.5 border rounded-2xl space-y-1.5 transition-all flex flex-col justify-between ${nodeBorder}`}>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white leading-tight">{node.name}</span>
                        {node.status === 'active' && <Loader2 className="w-3 h-3 text-[#00f0ff] animate-spin" />}
                        {node.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-950/20" />}
                      </div>
                      <p className="text-[9px] text-muted-foreground leading-relaxed">{node.desc}</p>
                    </div>

                    <div className={`text-[8px] font-mono uppercase ${statusColor}`}>
                      {node.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Audit findings and AI refinement chat */}
        <div className="space-y-8 flex flex-col justify-between">
          
          {/* Audit findings report */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-5">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span>Audit Findings Summary</span>
            </h4>

            {score !== null ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-muted-foreground">Readiness Score:</span>
                  <span className={`text-xl font-black font-mono ${score >= 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                    {score}/100
                  </span>
                </div>

                {/* RAG sources */}
                <div className="space-y-1.5">
                  <div className="text-[9px] font-black uppercase text-gray-500 tracking-wider">RAG Codebase Matches</div>
                  <div className="space-y-1 font-mono text-[9px] text-[#00f0ff] bg-black/40 p-2.5 rounded-xl border border-white/5 max-h-24 overflow-y-auto">
                    {ragDocs.map((doc, idx) => (
                      <div key={idx} className="truncate">• {doc}</div>
                    ))}
                  </div>
                </div>

                {/* Critique categories */}
                {critique && (
                  <div className="space-y-3.5 text-[11px] leading-relaxed max-h-56 overflow-y-auto pr-1">
                    <div className="space-y-1">
                      <span className="text-emerald-400 font-bold block">✓ Strengths:</span>
                      {critique.strengths.map((s, idx) => (
                        <p key={idx} className="text-gray-300">• {s}</p>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-red-400 font-bold block flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                        <span>✗ Weaknesses:</span>
                      </span>
                      {critique.weaknesses.map((w, idx) => (
                        <p key={idx} className="text-gray-300">• {w}</p>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-yellow-400 font-bold block">💡 Suggestions:</span>
                      {critique.improvements.map((im, idx) => (
                        <p key={idx} className="text-gray-300">• {im}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground text-xs italic flex flex-col items-center gap-2">
                <BrainCircuit className="w-8 h-8 text-neutral-800" />
                <span>Run audit checker to construct report schemas.</span>
              </div>
            )}
          </div>

          {/* AI Refinement Chatbot workspace */}
          <div className="glass p-6 rounded-3xl border border-white/5 flex-grow flex flex-col justify-between min-h-[350px] bg-black/60">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>AI Refine Workspace</span>
              </span>
              <span className="text-[8px] font-mono text-gray-500">
                agent-session
              </span>
            </div>

            {/* Chat list */}
            <div className="flex-grow overflow-y-auto space-y-3.5 pr-1 text-xs max-h-[260px] select-text">
              {chatLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] ${
                    log.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div className={`p-3 rounded-2xl leading-relaxed ${
                    log.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white/5 text-gray-300 rounded-bl-none border border-white/5'
                  }`}>
                    {log.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex items-center gap-2 text-gray-500 italic text-[10px] pl-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Agent is retrieving context...</span>
                </div>
              )}
            </div>

            {/* Chat Form Input */}
            <form 
              onSubmit={handleSendChatMessage}
              className="mt-4 border-t border-white/5 pt-3 flex gap-2 shrink-0"
            >
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask chatbot to refine..."
                className="bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs text-white flex-grow outline-none focus:ring-1 focus:ring-primary/40"
              />
              <button 
                type="submit" 
                className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/80 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
