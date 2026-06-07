"use client";

import { useOpenSourceStore } from "@/lib/opensourceStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, X } from "lucide-react";

export function ProgressWidget() {
  const { steps, completedCount } = useOpenSourceStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Avoid hydration mismatch by rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const completed = completedCount();
  const total = steps.length;
  const progressPercentage = Math.round((completed / total) * 100);

  const nextStep = steps.find((s) => !s.completed);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-80 rounded-xl bg-[#0f1115] border border-[#2a2d36] shadow-2xl overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#2a2d36] bg-[#1a1d24]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
              </div>
              <h3 className="font-semibold text-white text-sm">Your Progress</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-400 font-bold text-sm">
                {completed}/{total}
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Progress Bar Area */}
          <div className="p-5">
            <div className="flex justify-center mb-4">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                {progressPercentage}%
              </span>
            </div>
            
            <div className="h-2 w-full bg-[#2a2d36] rounded-full overflow-hidden mb-6">
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            {/* Next Up */}
            {nextStep ? (
              <div>
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Next up:</p>
                <a 
                  href={`/opensource/getting-started#${nextStep.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1a1d24] border border-[#2a2d36] hover:border-orange-500/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-orange-500 bg-orange-500/10 p-2 rounded-md">
                      <CheckCircle size={18} className="opacity-50" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{nextStep.title}</h4>
                      <p className="text-gray-400 text-xs mt-0.5">Click to continue</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors group-hover:translate-x-1" />
                </a>
              </div>
            ) : (
              <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-orange-400 text-sm font-medium">All steps completed!</p>
                <p className="text-gray-400 text-xs mt-1">You are ready to contribute.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
