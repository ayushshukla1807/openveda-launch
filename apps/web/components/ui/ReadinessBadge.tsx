'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  score: number;
  breakdown?: {
    frequency: number;
    quality: number;
    stack: number;
    complexity: number;
    consistency: number;
  };
  username: string;
}

export default function ReadinessBadge({ score, breakdown, username }: BadgeProps) {
  // Determine level color and title based on score
  const getLevel = (s: number) => {
    if (s >= 90) return { title: "Elite Contributor", color: "from-primary to-orange-500", border: "border-primary/50" };
    if (s >= 75) return { title: "Rising Star", color: "from-blue-500 to-indigo-600", border: "border-blue-500/50" };
    return { title: "Aspiring Developer", color: "from-zinc-500 to-zinc-700", border: "border-zinc-500/50" };
  };

  const level = getLevel(score);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-10 rounded-[3.5rem] bg-background border-2 ${level.border} overflow-hidden group shadow-2xl`}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity`} />
      
      {/* Visual Badge Icon */}
      <div className="flex flex-col items-center text-center relative z-10">
        <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${level.color} p-[2px] mb-8 relative`}>
            <div className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse" />
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center p-6 relative z-10">
                <span className={`text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br ${level.color}`}>
                    {Math.round(score)}
                </span>
            </div>
        </div>

        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Mission Readiness</span>
        <h3 className="text-3xl font-black tracking-tight mb-2 italic">{level.title}</h3>
        <p className="text-muted-foreground font-bold text-sm tracking-widest uppercase mb-10">@{username}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-5 gap-4 w-full mb-10">
            {breakdown && Object.entries(breakdown).map(([key, val]) => (
                <div key={key} className="flex flex-col items-center">
                    <div className="h-24 w-1.5 bg-muted rounded-full overflow-hidden relative mb-2">
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${val * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${level.color}`}
                        />
                    </div>
                    <span className="text-[8px] font-black uppercase text-muted-foreground vertical-lr rotate-180 mb-1">{key}</span>
                </div>
            ))}
        </div>

        <div className="flex flex-col w-full gap-4">
            <button 
                onClick={() => {
                    const certUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=GSoC%202026%20Readiness%20Certified&organizationName=OpenVeda&issueYear=2026&issueMonth=4&certUrl=https://openveda.in/verify/${username}`;
                    window.open(certUrl, '_blank');
                }}
                className="bg-[#0a66c2] text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                Add to LinkedIn Profile
            </button>
            <button 
                onClick={() => {
                    const text = `I just earned a ${Math.round(score)}/100 GSoC 2026 Readiness score on OpenVeda! Check out my verified profile: https://openveda.in/verify/${username}`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="text-muted-foreground font-black text-[10px] uppercase tracking-widest hover:text-foreground transition-colors"
            >
                Share on X (Twitter) →
            </button>
        </div>
      </div>

      {/* Corporate Watermark */}
      <div className="absolute top-8 right-10 flex items-center gap-2 opacity-20">
          <span className="font-black text-[8px] tracking-[0.2em] italic">OPENVEDA.IN</span>
      </div>
    </motion.div>
  );
}
