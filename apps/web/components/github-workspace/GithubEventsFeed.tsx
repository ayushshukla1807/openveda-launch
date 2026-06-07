'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitPullRequest, GitCommit, AlertCircle, RefreshCw, Play, Pause, 
  Search, Filter, ExternalLink, Calendar, MessageSquare, Star, 
  FileCode, Layers, Info
} from 'lucide-react';

interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
  };
  payload: {
    action?: string;
    commits?: Array<{
      sha: string;
      message: string;
      author: {
        name: string;
      };
    }>;
    pull_request?: {
      number: number;
      title: string;
      state: string;
      html_url: string;
      commits?: number;
      additions?: number;
      deletions?: number;
    };
    issue?: {
      number: number;
      title: string;
      state: string;
      html_url: string;
      body?: string;
    };
    ref?: string;
    ref_type?: string;
  };
  created_at: string;
}

const MOCK_ORGS_COMMITS = [
  { org: 'kubernetes/kubernetes', msg: 'fix(kubelet): resolve dynamic memory lease allocation crash', author: 'liggitt' },
  { org: 'cncf/sandbox', msg: 'feat(telemetry): register eBPF collector socket handlers', author: 'brancz' },
  { org: 'appsmithorg/appsmith', msg: 'fix(client): optimize reactive evaluation engine queue', author: 'sharat87' },
  { org: 'opentelemetry/opentelemetry-collector', msg: 'refactor: decouple pipeline configuration validation', author: 'bogdandrutu' },
  { org: 'prometheus/prometheus', msg: 'optimize: improve tsdb index write memory footprint', author: 'brian-brazil' },
];

export default function GithubEventsFeed() {
  const [targetName, setTargetName] = useState('ayushshukla1807');
  const [activeTab, setActiveTab] = useState<'user' | 'org'>('user');
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPolling, setIsPolling] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isMockMode, setIsMockMode] = useState(false);
  const [pollCountdown, setPollCountdown] = useState(15);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch events on mount and when target name changes
  useEffect(() => {
    fetchEvents();
    return () => {
      stopIntervals();
    };
  }, [targetName, activeTab]);

  // Handle polling intervals
  useEffect(() => {
    if (isPolling) {
      startIntervals();
    } else {
      stopIntervals();
    }
    return () => stopIntervals();
  }, [isPolling, targetName, activeTab, isMockMode]);

  // Apply filters
  useEffect(() => {
    let result = events;
    
    if (typeFilter !== 'all') {
      result = result.filter(e => e.type === typeFilter);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.repo.name.toLowerCase().includes(q) || 
        e.actor.login.toLowerCase().includes(q) ||
        (e.type === 'PushEvent' && e.payload.commits?.some(c => c.message.toLowerCase().includes(q))) ||
        (e.type === 'PullRequestEvent' && e.payload.pull_request?.title.toLowerCase().includes(q)) ||
        (e.type === 'IssuesEvent' && e.payload.issue?.title.toLowerCase().includes(q))
      );
    }
    
    setFilteredEvents(result);
  }, [events, typeFilter, searchQuery]);

  const startIntervals = () => {
    stopIntervals();
    
    setPollCountdown(15);
    
    // Polling fetch every 15 seconds
    pollIntervalRef.current = setInterval(() => {
      if (isMockMode) {
        generateMockEvent();
      } else {
        fetchEvents();
      }
      setPollCountdown(15);
    }, 15000);

    // Countdown tick every 1 second
    countdownIntervalRef.current = setInterval(() => {
      setPollCountdown(prev => (prev > 1 ? prev - 1 : 15));
    }, 1000);
  };

  const stopIntervals = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const fetchEvents = async () => {
    setLoading(true);
    setErrorMsg('');
    const apiTarget = targetName.trim() || 'ayushshukla1807';
    
    try {
      const url = activeTab === 'user' 
        ? `https://api.github.com/users/${apiTarget}/events` 
        : `https://api.github.com/orgs/${apiTarget}/events`;
        
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          throw new Error('API_RATE_LIMIT');
        }
        throw new Error(`Failed to fetch events (HTTP ${response.status})`);
      }
      
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response payload');
      }
      
      setEvents(data);
      setIsMockMode(false);
    } catch (err: any) {
      if (err.message === 'API_RATE_LIMIT') {
        setErrorMsg('GitHub API rate limit exceeded. Switched to OpenVeda Real-time Simulation Engine.');
        setIsMockMode(true);
        loadInitialMockEvents();
      } else {
        setErrorMsg(err.message || 'Connection failure to GitHub API.');
        setIsMockMode(true);
        loadInitialMockEvents();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadInitialMockEvents = () => {
    const mockList: GitHubEvent[] = [];
    const actors = [targetName, 'Abhi3975', 'torvalds', 'taylorotwell', 'yyx990803'];
    
    for (let i = 0; i < 12; i++) {
      const timeOffset = i * 30 * 60 * 1000; // 30 mins offsets
      const eventType = ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'WatchEvent', 'CreateEvent'][i % 5];
      const actor = actors[i % actors.length];
      const mockCommit = MOCK_ORGS_COMMITS[i % MOCK_ORGS_COMMITS.length];
      
      const mockEvent: GitHubEvent = {
        id: `mock-event-${Date.now() - timeOffset}`,
        type: eventType,
        actor: {
          login: actor,
          avatar_url: `https://avatars.githubusercontent.com/u/${1000000 + i * 50000}?v=4`
        },
        repo: {
          name: mockCommit.org
        },
        payload: getMockPayload(eventType, mockCommit.msg, actor),
        created_at: new Date(Date.now() - timeOffset).toISOString()
      };
      mockList.push(mockEvent);
    }
    setEvents(mockList);
  };

  const generateMockEvent = () => {
    const actors = [targetName, 'Abhi3975', 'elena-rostova-dev', 'devon-carter-cloud'];
    const actor = actors[Math.floor(Math.random() * actors.length)];
    const eventType = ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'WatchEvent', 'CreateEvent'][Math.floor(Math.random() * 5)];
    const mockCommit = MOCK_ORGS_COMMITS[Math.floor(Math.random() * MOCK_ORGS_COMMITS.length)];
    
    const newEvent: GitHubEvent = {
      id: `mock-event-${Date.now()}`,
      type: eventType,
      actor: {
        login: actor,
        avatar_url: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 10000000)}?v=4`
      },
      repo: {
        name: mockCommit.org
      },
      payload: getMockPayload(eventType, mockCommit.msg, actor),
      created_at: new Date().toISOString()
    };

    setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
  };

  const getMockPayload = (type: string, message: string, actor: string) => {
    const sha = Math.random().toString(16).substring(2, 9);
    
    switch (type) {
      case 'PushEvent':
        return {
          commits: [{
            sha,
            message,
            author: { name: actor }
          }]
        };
      case 'PullRequestEvent':
        return {
          action: ['opened', 'closed', 'merged'][Math.floor(Math.random() * 3)],
          pull_request: {
            number: Math.floor(Math.random() * 1000) + 100,
            title: message.replace(/^(fix|feat|refactor): /, ''),
            state: 'open',
            html_url: `https://github.com/mock/repo/pull/1`,
            additions: Math.floor(Math.random() * 150) + 20,
            deletions: Math.floor(Math.random() * 80) + 5
          }
        };
      case 'IssuesEvent':
        return {
          action: ['opened', 'closed'][Math.floor(Math.random() * 2)],
          issue: {
            number: Math.floor(Math.random() * 3000) + 500,
            title: `Resolve performance issue: ${message.toLowerCase()}`,
            state: 'open',
            html_url: `https://github.com/mock/repo/issues/1`,
            body: 'Detailed system tracer logs indicate high heap footprint and GC sweeps.'
          }
        };
      case 'CreateEvent':
        return {
          ref: 'patch-v3.1.2',
          ref_type: 'branch'
        };
      default:
        return {};
    }
  };

  // Compile visual stats metrics
  const getEventStats = () => {
    const stats: Record<string, number> = {
      PushEvent: 0,
      PullRequestEvent: 0,
      IssuesEvent: 0,
      WatchEvent: 0,
      CreateEvent: 0
    };
    
    events.forEach(e => {
      if (stats[e.type] !== undefined) {
        stats[e.type]++;
      }
    });

    return stats;
  };

  const stats = getEventStats();
  const maxStatCount = Math.max(...Object.values(stats), 1);

  return (
    <div className="space-y-8 min-h-[75vh]">
      
      {/* Header and Controller */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 glass p-6 rounded-3xl border border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-ping" />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">GitHub Live Activity Stream</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Aggregate push events, pull requests, issues, and star metrics. Switched dynamically to telemetry poller.
          </p>
        </div>

        {/* Polling control and countdown ticker */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex rounded-xl bg-black/40 p-1 border border-white/5 text-[9px] font-black uppercase tracking-wider shrink-0">
            <button 
              onClick={() => setActiveTab('user')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'user' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
            >
              User
            </button>
            <button 
              onClick={() => setActiveTab('org')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'org' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Organization
            </button>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); fetchEvents(); }}
            className="flex-grow lg:flex-grow-0 flex items-center bg-black/40 border border-white/5 rounded-xl px-3 py-1.5"
          >
            <Search className="w-3.5 h-3.5 text-gray-500 mr-2 shrink-0" />
            <input 
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              placeholder="Username or Org"
              className="bg-transparent text-xs text-white border-none outline-none focus:ring-0 p-0 w-28 md:w-36 font-bold"
            />
            <button type="submit" className="hidden" />
          </form>

          <button 
            onClick={() => setIsPolling(!isPolling)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
              isPolling 
                ? 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20' 
                : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5'
            }`}
          >
            {isPolling ? (
              <>
                <Pause className="w-3 h-3 fill-sky-400" />
                <span>Syncing ({pollCountdown}s)</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-gray-400" />
                <span>Pause Autorefresh</span>
              </>
            )
            }
          </button>

          <button 
            onClick={fetchEvents}
            disabled={loading}
            className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Warning/Alert notification banner */}
      {errorMsg && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-4 rounded-2xl flex items-center gap-3 text-xs leading-relaxed animate-pulse">
          <Info className="w-4 h-4 shrink-0 animate-bounce" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Analytics telemetry widget and Live events log grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left: Event Stats visual dashboard */}
        <div className="space-y-8 xl:col-span-1">
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              <span>Event telemetry</span>
            </h4>

            {/* Custom SVG histogram charts */}
            <div className="space-y-4 pt-2">
              {Object.entries(stats).map(([evtType, count]) => {
                const barWidthPercent = Math.max(8, (count / maxStatCount) * 100);
                
                let colorClass = 'bg-[#ff5733]'; // default
                let displayName = 'Commits';
                if (evtType === 'PullRequestEvent') { colorClass = 'bg-[#00f0ff]'; displayName = 'Pull Requests'; }
                if (evtType === 'IssuesEvent') { colorClass = 'bg-yellow-400'; displayName = 'Issues'; }
                if (evtType === 'WatchEvent') { colorClass = 'bg-purple-400'; displayName = 'Stars'; }
                if (evtType === 'CreateEvent') { colorClass = 'bg-emerald-400'; displayName = 'Branches'; }

                return (
                  <div key={evtType} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400 font-sans">{displayName}</span>
                      <span className="text-white font-bold">{count}</span>
                    </div>
                    
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidthPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${colorClass}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Polling source info */}
            <div className="pt-4 border-t border-white/5 text-[9px] font-mono text-gray-500 space-y-1">
              <div>TARGET TYPE: <span className="text-white uppercase">{activeTab}</span></div>
              <div>ENVIRONMENT: <span className={isMockMode ? 'text-yellow-400' : 'text-emerald-400'}>{isMockMode ? 'MOCK_SIMULATOR' : 'API_GITHUB'}</span></div>
              <div>TOTAL AGGREGATED: <span className="text-white">{events.length} logs</span></div>
            </div>
          </div>

          {/* Quick activity ticker */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-3">
            <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Live commit ticker
            </h5>
            <div className="bg-black/40 rounded-xl p-3 border border-white/5 font-mono text-[9px] text-emerald-400 space-y-2 h-44 overflow-y-auto">
              {events.filter(e => e.type === 'PushEvent').slice(0, 10).map((e, idx) => {
                const commit = e.payload.commits?.[0];
                return (
                  <div key={idx} className="border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <div className="flex justify-between text-gray-500">
                      <span>@{e.actor.login}</span>
                      <span>{commit?.sha.substring(0, 7)}</span>
                    </div>
                    <div className="text-white truncate">"{commit?.message}"</div>
                  </div>
                );
              })}
              {events.filter(e => e.type === 'PushEvent').length === 0 && (
                <div className="text-muted-foreground text-center pt-12 italic">
                  No push commits in trace logs.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Event cards List */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* List filters search bar */}
          <div className="glass p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 bg-black/30 border border-white/5 rounded-xl px-3 py-1.5 w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event logs..."
                className="bg-transparent text-xs text-white border-none outline-none focus:ring-0 p-0 w-full"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              <Filter className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-black/30 text-xs text-white border border-white/5 rounded-xl px-3 py-1.5 outline-none focus:ring-0 w-full md:w-44"
              >
                <option value="all">All Event Types</option>
                <option value="PushEvent">Commits (PushEvent)</option>
                <option value="PullRequestEvent">PRs (PullRequestEvent)</option>
                <option value="IssuesEvent">Issues (IssuesEvent)</option>
                <option value="WatchEvent">Stars (WatchEvent)</option>
                <option value="CreateEvent">Branches (CreateEvent)</option>
              </select>
            </div>
          </div>

          {/* Events timeline cards wrapper */}
          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2">
            <AnimatePresence initial={false}>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => {
                  let badgeColor = 'bg-primary/10 text-primary border-primary/20';
                  let displayType = event.type.replace('Event', '');
                  let icon = <GitCommit className="w-4 h-4" />;
                  
                  if (event.type === 'PullRequestEvent') {
                    badgeColor = 'bg-sky-500/10 text-sky-400 border-sky-500/20';
                    icon = <GitPullRequest className="w-4 h-4 text-sky-400" />;
                  } else if (event.type === 'IssuesEvent') {
                    badgeColor = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
                    icon = <AlertCircle className="w-4 h-4 text-yellow-400" />;
                  } else if (event.type === 'WatchEvent') {
                    badgeColor = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
                    icon = <Star className="w-4 h-4 text-purple-400 fill-purple-400" />;
                  } else if (event.type === 'CreateEvent') {
                    badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                    icon = <FileCode className="w-4 h-4 text-emerald-400" />;
                  }

                  return (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex items-start gap-4 hover:scale-[1.005]"
                    >
                      {/* Avatar */}
                      <img 
                        src={event.actor.avatar_url} 
                        alt={event.actor.login} 
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${event.actor.login}`;
                        }}
                      />

                      {/* Content block */}
                      <div className="flex-grow space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-black text-white">@{event.actor.login}</span>
                            <span className="text-gray-500 font-bold">in</span>
                            <span className="text-[#00f0ff] font-bold font-mono text-[11px] truncate">{event.repo.name}</span>
                          </div>
                          
                          <span className={`px-2 py-0.5 border rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${badgeColor}`}>
                            {icon}
                            <span>{displayType}</span>
                          </span>
                        </div>

                        {/* Event details renderer */}
                        <div className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                          {event.type === 'PushEvent' && event.payload.commits && (
                            <div className="space-y-1.5 font-mono text-[11px] bg-black/30 p-3 rounded-xl border border-white/5">
                              {event.payload.commits.map((c, i) => (
                                <div key={i} className="flex gap-2">
                                  <span className="text-primary font-bold shrink-0">{c.sha.substring(0, 7)}</span>
                                  <span className="text-gray-300 truncate">"{c.message}"</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {event.type === 'PullRequestEvent' && event.payload.pull_request && (
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-sky-400 font-bold shrink-0">#{event.payload.pull_request.number}</span>
                                <span className="text-white font-bold">"{event.payload.pull_request.title}"</span>
                              </div>
                              <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
                                <span>ACTION: <strong className="text-white uppercase">{event.payload.action}</strong></span>
                                <span className="text-emerald-500">+{event.payload.pull_request.additions}</span>
                                <span className="text-red-500">-{event.payload.pull_request.deletions}</span>
                              </div>
                            </div>
                          )}

                          {event.type === 'IssuesEvent' && event.payload.issue && (
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-yellow-500 font-bold shrink-0">#{event.payload.issue.number}</span>
                                <span className="text-white font-bold">"{event.payload.issue.title}"</span>
                              </div>
                              <div className="text-[10px] text-gray-500 font-mono">
                                ACTION: <strong className="text-white uppercase">{event.payload.action}</strong>
                              </div>
                              {event.payload.issue.body && (
                                <p className="text-[11px] text-muted-foreground line-clamp-2 bg-black/25 p-2.5 rounded-lg italic">
                                  "{event.payload.issue.body}"
                                </p>
                              )}
                            </div>
                          )}

                          {event.type === 'CreateEvent' && (
                            <div className="text-xs text-gray-300 font-mono">
                              Created branch/tag: <strong className="text-[#00f0ff]">{event.payload.ref || 'main'}</strong> ({event.payload.ref_type})
                            </div>
                          )}

                          {event.type === 'WatchEvent' && (
                            <div className="text-xs text-gray-300">
                              Starred the repository to follow release roadmaps.
                            </div>
                          )}
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-2 text-[9px] text-gray-500 font-mono border-t border-white/5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(event.created_at).toLocaleString()}
                          </span>
                          
                          <a 
                            href={`https://github.com/${event.repo.name}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            <span>Open Repo</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="glass p-12 text-center rounded-2xl border border-white/5">
                  <MessageSquare className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground italic">No events match your criteria or are found in search queries.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}
