'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Code2, Database, Network, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MatchmakingPage() {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [resultReady, setResultReady] = useState(false);

  // Form State
  const [techStack, setTechStack] = useState<string[]>([]);
  const [experience, setExperience] = useState('Beginner');
  const [hours, setHours] = useState('10-15');

  const stacks = ['React / Next.js', 'Python / AI', 'Go / Distributed', 'Rust / Systems', 'C++ / Kernel'];

  const toggleStack = (stack: string) => {
    setTechStack(prev => prev.includes(stack) ? prev.filter(s => s !== stack) : [...prev, stack]);
  };

  const [matchedIssues, setMatchedIssues] = useState<any[]>([]);
  const [readinessScores, setReadinessScores] = useState<Record<number, {score: number, reason: string}>>({});

  useEffect(() => {
    if (matchedIssues.length > 0) {
      matchedIssues.forEach((issue, idx) => {
        fetch('http://localhost:8002/api/readiness', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            github_username: "user",
            tech_stack: techStack,
            experience_level: experience,
            issue_title: issue.title,
            issue_body: issue.body || ""
          })
        }).then(res => res.json()).then(data => {
          setReadinessScores(prev => ({...prev, [idx]: data}));
        }).catch(e => {
          setReadinessScores(prev => ({...prev, [idx]: {score: Math.round(issue.similarity * 100), reason: "Semantic similarity (Fallback)"}}));
        });
      });
    }
  }, [matchedIssues, techStack, experience]);

  const handleScan = async () => {
    setIsScanning(true);
    
    try {
      const query = `I know ${techStack.join(', ')}. I am a ${experience} developer looking to contribute ${hours} hours.`;
      const response = await fetch('http://localhost:8000/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 3 })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMatchedIssues(data.results || []);
      }
    } catch (e) {
      console.warn("Gateway not reachable, falling back to mock");
      setMatchedIssues([{
        org_name: "Appsmith", repo_name: "appsmith",
        title: "Feat: Add Keyboard Shortcuts to Action Modal",
        url: "https://github.com/appsmithorg/appsmith/issues/1892",
        similarity: 0.92
      }]);
    }

    setTimeout(() => {
      setIsScanning(false);
      setResultReady(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#07090e] pt-32 pb-20 relative overflow-hidden text-white selection:bg-primary">
      <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[10px] font-black tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            AI Contributor Matchmaking
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Signature.</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto">
            Let our neural engine match your exact skill profile to the most suitable high-impact "Good First Issues" and organizations.
          </p>
        </motion.div>

        {!resultReady ? (
          <motion.div className="glass p-10 rounded-[3rem] border border-white/5 max-w-2xl mx-auto relative overflow-hidden">
             {isScanning && (
               <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                 <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6" />
                 <h3 className="font-black italic text-2xl animate-pulse text-white">Scanning Ecosystem...</h3>
                 <p className="text-xs text-primary font-mono mt-2 uppercase tracking-widest">Matching Neural Weights</p>
               </div>
             )}

             <div className="space-y-8 relative z-10">
                {/* Step 1 */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">1. Core Tech Stack</label>
                  <div className="flex flex-wrap gap-3">
                    {stacks.map(s => (
                      <button 
                        key={s}
                        onClick={() => toggleStack(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${techStack.includes(s) ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">2. Experience Level</label>
                  <select 
                    value={experience} onChange={e => setExperience(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm font-bold focus:border-primary outline-none text-white"
                  >
                    <option>Beginner (0-1 yrs)</option>
                    <option>Intermediate (1-3 yrs)</option>
                    <option>Advanced (3+ yrs)</option>
                  </select>
                </div>

                {/* Step 3 */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">3. Weekly Bandwidth</label>
                  <select 
                    value={hours} onChange={e => setHours(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm font-bold focus:border-primary outline-none text-white"
                  >
                    <option>5-10 Hours</option>
                    <option>10-15 Hours</option>
                    <option>15-25 Hours (Hardcore)</option>
                  </select>
                </div>

                <button 
                  onClick={handleScan}
                  disabled={techStack.length === 0}
                  className="w-full mt-6 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Match
                </button>
             </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-10 rounded-[3rem] border border-primary/30 max-w-3xl mx-auto shadow-2xl shadow-primary/10">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black italic">Perfect Match Found!</h2>
              <p className="text-slate-400 mt-2 font-medium">Based on your {techStack.join(', ')} stack and {hours} weekly bandwidth.</p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-black/40 border border-white/10 rounded-2xl hover:border-primary/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Top Organization Match</span>
                  <h3 className="text-2xl font-bold">Appsmith</h3>
                  <p className="text-sm text-slate-400 mt-1">High alignment with React/Next.js. Active year-round mentoring.</p>
                </div>
                <Link href="/organizations/appsmith" className="bg-white/10 hover:bg-white text-white hover:text-black font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap">
                  View Playbook <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-6 bg-black/40 border border-white/10 rounded-2xl">
                 <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-4">Curated First Issues (Semantic Match)</span>
                 <ul className="space-y-4">
                   {matchedIssues.map((issue, idx) => (
                     <li key={idx} className="flex gap-4 items-start">
                       <GitBranch className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                       <div>
                         <Link href={issue.url || "#"} target="_blank" className="font-bold hover:text-primary transition-colors">{issue.title}</Link>
                         <div className="flex flex-col gap-2 mt-1">
                           <div className="text-xs text-slate-500 font-mono">{issue.org_name}/{issue.repo_name}</div>
                           {readinessScores[idx] ? (
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full border-[3px] flex items-center justify-center text-[9px] font-black" style={{ borderColor: readinessScores[idx].score >= 80 ? '#22c55e' : (readinessScores[idx].score >= 60 ? '#eab308' : '#ef4444'), color: readinessScores[idx].score >= 80 ? '#22c55e' : (readinessScores[idx].score >= 60 ? '#eab308' : '#ef4444') }}>
                                 {readinessScores[idx].score}%
                               </div>
                               <span className="text-[10px] text-slate-400 italic max-w-[200px] truncate">{readinessScores[idx].reason}</span>
                             </div>
                           ) : (
                             <div className="flex items-center gap-2">
                               <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                               <span className="text-[10px] text-primary animate-pulse">Calculating Readiness...</span>
                             </div>
                           )}
                         </div>
                       </div>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

            <button onClick={() => setResultReady(false)} className="mt-10 mx-auto block text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              ← Re-run Scan
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
