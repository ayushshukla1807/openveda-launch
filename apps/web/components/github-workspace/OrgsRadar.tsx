'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, BarChart2, Star, GitFork, AlertCircle, RefreshCw, 
  HelpCircle, ShieldCheck, Zap, Info, Layers, CheckCircle2 
} from 'lucide-react';

interface OrgMetric {
  name: string;
  stars: number;
  forks: number;
  issues: number;
  prs: number;
  complexity: number; // 0-100 SDE difficulty
  languageFocus: string;
  gsocQuota: number;
}

const ORG_METRICS_DATA: Record<string, OrgMetric> = {
  kubernetes: { name: 'Kubernetes', stars: 104500, forks: 38200, issues: 2450, prs: 580, complexity: 95, languageFocus: 'Go', gsocQuota: 12 },
  cncf: { name: 'CNCF Sandbox', stars: 12400, forks: 3100, issues: 420, prs: 180, complexity: 88, languageFocus: 'Go, Rust', gsocQuota: 8 },
  appsmith: { name: 'Appsmith', stars: 31200, forks: 4500, issues: 1350, prs: 290, complexity: 78, languageFocus: 'Java, TS', gsocQuota: 6 },
  opentelemetry: { name: 'OpenTelemetry', stars: 8400, forks: 2100, issues: 540, prs: 120, complexity: 82, languageFocus: 'Java, Go', gsocQuota: 5 },
  gnome: { name: 'GNOME', stars: 2400, forks: 920, issues: 180, prs: 45, complexity: 72, languageFocus: 'C, Rust', gsocQuota: 4 },
  fedora: { name: 'Fedora', stars: 1500, forks: 480, issues: 110, prs: 30, complexity: 64, languageFocus: 'Python', gsocQuota: 3 }
};

export default function OrgsRadar() {
  const [orgA, setOrgA] = useState('kubernetes');
  const [orgB, setOrgB] = useState('appsmith');
  const [activeMetricTab, setActiveMetricTab] = useState<'radar' | 'compare' | 'leaderboard'>('radar');

  const dataA = ORG_METRICS_DATA[orgA];
  const dataB = ORG_METRICS_DATA[orgB];

  // Helper to map radar chart polygon points
  const getRadarPoints = (data: OrgMetric) => {
    // 5 dimensions: stars (max 120k), forks (max 40k), complexity (max 100), gsocQuota (max 15), prs (max 600)
    const centerX = 150;
    const centerY = 150;
    const size = 110;

    const valStars = Math.min(1, data.stars / 110000);
    const valForks = Math.min(1, data.forks / 40000);
    const valComplexity = data.complexity / 100;
    const valQuota = data.gsocQuota / 15;
    const valPRs = Math.min(1, data.prs / 600);

    const metricsList = [valStars, valForks, valComplexity, valQuota, valPRs];

    // Calculate coordinate coordinates
    const coords = metricsList.map((m, idx) => {
      const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * size * m;
      const y = centerY + Math.sin(angle) * size * m;
      return `${x},${y}`;
    });

    return coords.join(' ');
  };

  const radarPointsA = getRadarPoints(dataA);
  const radarPointsB = getRadarPoints(dataB);

  return (
    <div className="space-y-8 min-h-[75vh]">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Orgs Telemetry Radar</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Audit and map codebase velocity statistics side-by-side. Powered by custom SVG geometry.
          </p>
        </div>

        <div className="flex rounded-xl bg-black/40 p-1 border border-white/5 text-[9px] font-black uppercase tracking-wider shrink-0">
          <button 
            onClick={() => setActiveMetricTab('radar')} 
            className={`px-3 py-1.5 rounded-lg transition-all ${activeMetricTab === 'radar' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Radar Chart
          </button>
          <button 
            onClick={() => setActiveMetricTab('compare')} 
            className={`px-3 py-1.5 rounded-lg transition-all ${activeMetricTab === 'compare' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Side-by-Side
          </button>
          <button 
            onClick={() => setActiveMetricTab('leaderboard')} 
            className={`px-3 py-1.5 rounded-lg transition-all ${activeMetricTab === 'leaderboard' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* Main dashboard body */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left column: Controls and presets selector */}
        <div className="xl:col-span-1 space-y-8">
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              <span>Target Organizations Comparison</span>
            </h4>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Organization A (Primary)</label>
                <select 
                  value={orgA}
                  onChange={(e) => setOrgA(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:ring-1 focus:ring-primary/40 font-bold"
                >
                  {Object.keys(ORG_METRICS_DATA).map(key => (
                    <option key={key} value={key} disabled={key === orgB} className="bg-neutral-900">
                      {ORG_METRICS_DATA[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Organization B (Secondary)</label>
                <select 
                  value={orgB}
                  onChange={(e) => setOrgB(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:ring-1 focus:ring-primary/40 font-bold"
                >
                  {Object.keys(ORG_METRICS_DATA).map(key => (
                    <option key={key} value={key} disabled={key === orgA} className="bg-neutral-900">
                      {ORG_METRICS_DATA[key].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-muted-foreground leading-relaxed bg-white/[0.01] p-3 rounded-xl border border-white/5 flex gap-2">
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Compare SDE difficulty metrics, language scopes, stars telemetry, and GSoC quota allocations.</span>
            </div>
          </div>

          {/* Quick static metrics summary */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4 text-xs">
            <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Quick Insights
            </h5>
            
            <div className="space-y-3 font-mono text-[10px] text-gray-400">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>HIGHEST COMPLEXITY:</span>
                <span className="text-[#ff5733] font-bold">Kubernetes (95%)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>MOST STARRED REPO:</span>
                <span className="text-[#00f0ff] font-bold">kubernetes/kubernetes (104.5k)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>AVERAGE GSOC QUOTA:</span>
                <span className="text-white">6.3 students/org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic telemetry dashboard charts */}
        <div className="xl:col-span-2 space-y-8">
          <div className="glass p-6 rounded-3xl border border-white/5 min-h-[420px] flex flex-col justify-between">
            
            {activeMetricTab === 'radar' ? (
              /* SVG RADAR CHART */
              <div className="flex flex-col items-center justify-center p-6 space-y-6">
                <h5 className="text-xs font-black uppercase text-gray-400 tracking-widest">
                  GSoC 2027 Multi-Dimension Radar map
                </h5>

                <div className="relative w-80 h-80 flex items-center justify-center">
                  <svg width="300" height="300" className="overflow-visible">
                    {/* Concentric helper grids */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => {
                      const size = 110 * scale;
                      const coords = Array.from({ length: 5 }).map((_, idx) => {
                        const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                        return `${150 + Math.cos(angle) * size},${150 + Math.sin(angle) * size}`;
                      }).join(' ');
                      return (
                        <polygon 
                          key={i} 
                          points={coords} 
                          fill="none" 
                          stroke="rgba(255,255,255,0.06)" 
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Radial axis lines */}
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                      const endX = 150 + Math.cos(angle) * 110;
                      const endY = 150 + Math.sin(angle) * 110;
                      return (
                        <line 
                          key={idx} 
                          x1="150" 
                          y1="150" 
                          x2={endX} 
                          y2={endY} 
                          stroke="rgba(255,255,255,0.06)" 
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Axis Labels */}
                    {['STARS', 'FORKS', 'DIFFICULTY', 'QUOTA', 'PRS'].map((label, idx) => {
                      const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                      const textX = 150 + Math.cos(angle) * 125;
                      const textY = 150 + Math.sin(angle) * 125;
                      return (
                        <text
                          key={label}
                          x={textX}
                          y={textY}
                          fill="#888"
                          fontSize="8"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
                          {label}
                        </text>
                      );
                    })}

                    {/* Polygons */}
                    {/* Primary Org A (Orange) */}
                    <polygon 
                      points={radarPointsA} 
                      fill="rgba(255, 87, 51, 0.15)" 
                      stroke="#ff5733" 
                      strokeWidth="2.5"
                    />
                    {/* Secondary Org B (Cyan) */}
                    <polygon 
                      points={radarPointsB} 
                      fill="rgba(0, 240, 255, 0.15)" 
                      stroke="#00f0ff" 
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                {/* Legend labels */}
                <div className="flex gap-6 text-[10px] font-mono justify-center pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#ff5733] rounded" />
                    <span className="text-white uppercase font-bold">{dataA.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#00f0ff] rounded" />
                    <span className="text-white uppercase font-bold">{dataB.name}</span>
                  </div>
                </div>
              </div>
            ) : activeMetricTab === 'compare' ? (
              /* SIDE BY SIDE COMPARISON */
              <div className="space-y-6 p-4">
                <h5 className="text-xs font-black uppercase text-gray-400 tracking-widest text-center">
                  Side-by-Side metrics audit
                </h5>

                <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                  {/* Table headers */}
                  <div className="text-gray-500 font-bold">METRIC</div>
                  <div className="text-[#ff5733] font-bold text-center">{dataA.name}</div>
                  <div className="text-[#00f0ff] font-bold text-center">{dataB.name}</div>

                  {/* Stars Row */}
                  <div className="border-t border-white/5 py-3">STARS</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-bold">{(dataA.stars / 1000).toFixed(1)}k</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-bold">{(dataB.stars / 1000).toFixed(1)}k</div>

                  {/* Forks Row */}
                  <div className="border-t border-white/5 py-3">FORKS</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-bold">{(dataA.forks / 1000).toFixed(1)}k</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-bold">{(dataB.forks / 1000).toFixed(1)}k</div>

                  {/* PRs Row */}
                  <div className="border-t border-white/5 py-3">ACTIVE PRS</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-bold">{dataA.prs}</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-bold">{dataB.prs}</div>

                  {/* Complexity Row */}
                  <div className="border-t border-white/5 py-3">SDE COMPLEXITY</div>
                  <div className="border-t border-white/5 py-3 text-center text-yellow-400 font-bold">{dataA.complexity}%</div>
                  <div className="border-t border-white/5 py-3 text-center text-yellow-400 font-bold">{dataB.complexity}%</div>

                  {/* Quota Row */}
                  <div className="border-t border-white/5 py-3">GSOC QUOTA</div>
                  <div className="border-t border-white/5 py-3 text-center text-emerald-400 font-bold">{dataA.gsocQuota} stds</div>
                  <div className="border-t border-white/5 py-3 text-center text-emerald-400 font-bold">{dataB.gsocQuota} stds</div>

                  {/* Language Row */}
                  <div className="border-t border-white/5 py-3">TECH FOCUS</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-sans">{dataA.languageFocus}</div>
                  <div className="border-t border-white/5 py-3 text-center text-white font-sans">{dataB.languageFocus}</div>
                </div>
              </div>
            ) : (
              /* LEADERBOARD VIEW */
              <div className="space-y-6 p-4">
                <h5 className="text-xs font-black uppercase text-gray-400 tracking-widest text-center">
                  GSoC 2027 Org Complexity rankings
                </h5>

                <div className="space-y-3 font-mono text-xs">
                  {Object.values(ORG_METRICS_DATA)
                    .sort((a, b) => b.complexity - a.complexity)
                    .map((org, index) => (
                      <div 
                        key={org.name} 
                        className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded bg-white/5 text-gray-400 flex items-center justify-center font-bold text-[10px]">
                            {index + 1}
                          </span>
                          <span className="text-white font-bold font-sans">{org.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <span className="text-gray-500 font-sans text-[10px]">{org.languageFocus}</span>
                          <span className="text-[#00f0ff] font-bold">{org.complexity}% complexity</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
