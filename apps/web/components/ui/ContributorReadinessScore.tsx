'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useContributorStore } from '../../lib/store';

export default function ContributorReadinessScore() {
  const { score, stage, isAnalyzing, fetchScore } = useContributorStore();

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  return (
    <div className="relative p-8 rounded-[2rem] glass border border-white/10 overflow-hidden bg-gradient-to-br from-black to-slate-900">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-white italic tracking-tight">AI Readiness Analysis</h3>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
            {isAnalyzing ? 'Scanning GitHub...' : 'Live Model'}
          </span>
        </div>

        <div className="flex items-end gap-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500"
          >
            {isAnalyzing ? '--' : score}
          </motion.div>
          <div className="pb-2">
            <p className="text-sm font-medium text-slate-400">/ 100</p>
            <p className="text-xs font-black uppercase tracking-widest text-white mt-1">{stage}</p>
          </div>
        </div>

        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isAnalyzing ? 0 : `${score}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
          />
        </div>

        <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm mt-2">
          Powered by our FastAPI + LangGraph architecture. This score updates in real-time based on your distributed task queue processing and AST-aware semantic vector matching.
        </p>
      </div>
    </div>
  );
}
