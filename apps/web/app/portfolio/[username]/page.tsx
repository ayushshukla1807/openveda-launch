import React from 'react';
import { notFound } from 'next/navigation';
import { Github, Trophy, GitCommit, GitPullRequest, Star, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Mock data to simulate the portfolio
const MOCK_PROFILES: Record<string, any> = {
  'ayushshukla1807': {
    name: 'Ayush Shukla',
    bio: 'Systems Engineer & Open Source Advocate. Building OpenVeda.',
    avatar: 'https://github.com/ayushshukla1807.png',
    stats: {
      prsMerged: 142,
      issuesResolved: 89,
      programsCompleted: 3,
      linesContributed: '124K+'
    },
    programs: ['GSoC 2024 (Appsmith)', 'LFX 2023 (CNCF)', 'ESoC 2023'],
    recentActivity: [
      { type: 'PR_MERGED', org: 'appsmithorg/appsmith', title: 'feat: add virtualized list to table widget', date: '2 days ago' },
      { type: 'ISSUE_CLOSED', org: 'cncf/pixie', title: 'bug: memory leak in bpf tracer', date: '1 week ago' },
      { type: 'PR_MERGED', org: 'vercel/next.js', title: 'perf: optimize app router cache invalidation', date: '2 weeks ago' },
    ]
  }
};

export default async function PortfolioPage({ params }: { params: { username: string } }) {
  const username = params.username;
  let ghUser = null;
  
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      ghUser = await res.json();
    }
  } catch (e) {
    console.warn("Failed to fetch GitHub profile", e);
  }

  const mockUser = MOCK_PROFILES[username.toLowerCase()];
  
  if (!ghUser && !mockUser) {
    return <GenericPortfolio username={username} />;
  }

  const user = mockUser || {
    name: ghUser?.name || ghUser?.login || username,
    bio: ghUser?.bio || 'Open Source Contributor',
    avatar: ghUser?.avatar_url || `https://github.com/${username}.png`,
    stats: {
      prsMerged: (ghUser?.public_repos || 10) * 3,
      issuesResolved: (ghUser?.followers || 5) * 2,
      programsCompleted: 1,
      linesContributed: `${Math.round((ghUser?.public_gists || 2) * 1.5 + 10)}K+`
    },
    programs: ['OpenVeda Contributor'],
    recentActivity: [
      { type: 'PR_MERGED', org: `${username}/open-source`, title: 'feat: new contribution', date: 'recently' }
    ]
  };

  return (
    <main className="min-h-screen bg-[#07090e] pt-32 pb-20 relative overflow-hidden text-white selection:bg-primary">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
           <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-3xl border-4 border-white/10 shadow-2xl" />
           <div className="text-center md:text-left flex-1">
             <h1 className="text-4xl md:text-5xl font-black italic">{user.name}</h1>
             <p className="text-slate-400 font-medium text-lg mt-2">{user.bio}</p>
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                <Link href={`https://github.com/${params.username}`} target="_blank" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all">
                  <Github className="w-4 h-4" /> @{params.username}
                </Link>
                {user.programs.map((prog: string) => (
                  <span key={prog} className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> {prog}
                  </span>
                ))}
             </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
           {[
             { label: 'PRs Merged', value: user.stats.prsMerged, icon: GitPullRequest, color: 'text-green-400' },
             { label: 'Issues Resolved', value: user.stats.issuesResolved, icon: CheckCircle2, color: 'text-primary' },
             { label: 'Mentorships', value: user.stats.programsCompleted, icon: Star, color: 'text-yellow-400' },
             { label: 'Lines Audited', value: user.stats.linesContributed, icon: Code2, color: 'text-[#00f0ff]' },
           ].map((stat, i) => (
             <div key={i} className="glass p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-all">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                <span className="text-3xl font-black">{stat.value}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">{stat.label}</span>
             </div>
           ))}
        </div>

        {/* Activity Graph & Recent Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass p-8 rounded-[3rem] border border-white/5">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black flex items-center gap-2">
                 <GitCommit className="w-5 h-5 text-primary" /> Contribution Ledger
               </h3>
             </div>
             <div className="space-y-4">
                {user.recentActivity.map((act: any, i: number) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/10 transition-colors">
                     <div className="flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-full ${act.type === 'PR_MERGED' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          {act.type === 'PR_MERGED' ? <GitPullRequest className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-300">{act.org}</div>
                          <Link href="#" className="font-semibold text-white hover:text-primary transition-colors text-base inline-flex items-center gap-1">
                            {act.title} <ExternalLink className="w-3 h-3 opacity-50" />
                          </Link>
                        </div>
                     </div>
                     <div className="text-xs font-mono text-slate-500 flex items-center gap-1 shrink-0">
                       <Calendar className="w-3 h-3" /> {act.date}
                     </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="glass p-8 rounded-[3rem] border border-white/5 flex flex-col justify-between">
             <div>
               <h3 className="text-xl font-black mb-4">Tech Affinity</h3>
               <div className="space-y-4">
                  {[
                    { lang: 'TypeScript', pct: 65, color: 'bg-blue-500' },
                    { lang: 'Rust', pct: 20, color: 'bg-orange-500' },
                    { lang: 'Go', pct: 15, color: 'bg-cyan-500' },
                  ].map((lang, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>{lang.lang}</span>
                        <span className="text-slate-400">{lang.pct}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div className={`h-2 rounded-full ${lang.color}`} style={{ width: `${lang.pct}%` }} />
                      </div>
                    </div>
                  ))}
               </div>
             </div>
             
             <button className="w-full mt-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary/90 transition-colors">
               Verify Credentials
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function GenericPortfolio({ username }: { username: string }) {
  return (
    <main className="min-h-screen bg-[#07090e] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
      <Github className="w-20 h-20 text-slate-700 mb-6" />
      <h1 className="text-3xl font-black italic text-white mb-4">Portfolio for @{username}</h1>
      <p className="text-slate-400 max-w-md mx-auto mb-8">
        This contributor profile has been indexed but does not have enriched mock data for this demo.
      </p>
      <Link href="/" className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
        Return Home
      </Link>
    </main>
  );
}

// Simple icon helpers not in lucide
function CheckCircle2(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
