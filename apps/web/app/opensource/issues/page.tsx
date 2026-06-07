"use client";

import { useEffect, useState } from "react";
import { CircleDot, Star, AlertCircle, Search, Filter, ExternalLink, RefreshCw, BookOpen } from "lucide-react";

interface IssueData {
  id: number;
  title: string;
  repoName: string;
  repoUrl: string;
  htmlUrl: string;
  labels: { name: string; color: string }[];
  createdAt: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  language: string;
}

const fallbackIssues: IssueData[] = [
  {
    id: 1,
    title: "Update installation documentation for LinuxDroid",
    repoName: "LinuxDroid",
    repoUrl: "https://github.com/ayushshukla1807/LinuxDroid",
    htmlUrl: "https://github.com/ayushshukla1807/LinuxDroid/issues",
    labels: [
      { name: "documentation", color: "0075ca" },
      { name: "good first issue", color: "7057ff" }
    ],
    createdAt: "2026-06-05T12:00:00Z",
    difficulty: "Beginner",
    language: "Shell"
  },
  {
    id: 2,
    title: "Fix multi-language README translation sync",
    repoName: "LinuxDroid",
    repoUrl: "https://github.com/ayushshukla1807/LinuxDroid",
    htmlUrl: "https://github.com/ayushshukla1807/LinuxDroid/issues",
    labels: [
      { name: "bug", color: "d73a4a" },
      { name: "help wanted", color: "008672" }
    ],
    createdAt: "2026-06-04T15:30:00Z",
    difficulty: "Intermediate",
    language: "Shell"
  },
  {
    id: 3,
    title: "Refactor audio encoding backend wrapper for AI Voice Cloner",
    repoName: "AIVoiceClonerPRO",
    repoUrl: "https://github.com/ayushshukla1807/AIVoiceClonerPRO",
    htmlUrl: "https://github.com/ayushshukla1807/AIVoiceClonerPRO/issues",
    labels: [
      { name: "enhancement", color: "a2eeef" },
      { name: "performance", color: "ffffff" }
    ],
    createdAt: "2026-06-06T09:15:00Z",
    difficulty: "Advanced",
    language: "Python"
  },
  {
    id: 4,
    title: "Implement landing page interactive grid components",
    repoName: "Kali-Linux-for-Android",
    repoUrl: "https://github.com/ayushshukla1807/Kali-Linux-for-Android",
    htmlUrl: "https://github.com/ayushshukla1807/Kali-Linux-for-Android/issues",
    labels: [
      { name: "good first issue", color: "7057ff" },
      { name: "frontend", color: "fef2c0" }
    ],
    createdAt: "2026-06-07T08:00:00Z",
    difficulty: "Beginner",
    language: "TypeScript"
  }
];

export default function IssuesPage() {
  const [issues, setIssues] = useState<IssueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  useEffect(() => {
    async function fetchGitHubIssues() {
      try {
        setLoading(true);
        // Fetch repositories first
        const reposRes = await fetch("https://api.github.com/users/ayushshukla1807/repos");
        if (!reposRes.ok) throw new Error("GitHub API limit or error");
        const reposData = await reposRes.json();
        
        const fetchedIssues: IssueData[] = [];
        
        // Fetch issues for the top 3-4 repos concurrently to avoid timeouts
        const targetRepos = reposData.slice(0, 4);
        
        await Promise.all(
          targetRepos.map(async (repo: any) => {
            try {
              const issuesRes = await fetch(`https://api.github.com/repos/ayushshukla1807/${repo.name}/issues?state=open`);
              if (!issuesRes.ok) return;
              const issuesData = await issuesRes.json();
              
              issuesData.forEach((issue: any) => {
                // GitHub issues API includes Pull Requests, filter them out
                if (issue.pull_request) return;

                const labels = issue.labels.map((l: any) => ({
                  name: l.name,
                  color: l.color
                }));

                // Heuristic for difficulty based on labels or title
                let difficulty: "Beginner" | "Intermediate" | "Advanced" = "Intermediate";
                if (labels.some((l: any) => l.name.toLowerCase().includes("good first") || l.name.toLowerCase().includes("easy") || l.name.toLowerCase().includes("docs"))) {
                  difficulty = "Beginner";
                } else if (labels.some((l: any) => l.name.toLowerCase().includes("complex") || l.name.toLowerCase().includes("architecture"))) {
                  difficulty = "Advanced";
                }

                fetchedIssues.push({
                  id: issue.id,
                  title: issue.title,
                  repoName: repo.name,
                  repoUrl: repo.html_url,
                  htmlUrl: issue.html_url,
                  labels: labels,
                  createdAt: issue.created_at,
                  difficulty: difficulty,
                  language: repo.language || "Multiple"
                });
              });
            } catch (err) {
              console.error(`Error fetching issues for ${repo.name}`, err);
            }
          })
        );

        if (fetchedIssues.length > 0) {
          setIssues(fetchedIssues);
        } else {
          setIssues(fallbackIssues);
        }
      } catch (error) {
        console.error("Falling back to curated issues:", error);
        setIssues(fallbackIssues);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubIssues();
  }, []);

  // Filter logic
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.repoName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLabel = 
      selectedLabel === "all" || 
      issue.labels.some((l) => l.name.toLowerCase() === selectedLabel.toLowerCase());

    const matchesLanguage = 
      selectedLanguage === "all" || 
      issue.language.toLowerCase() === selectedLanguage.toLowerCase();

    const matchesDifficulty = 
      selectedDifficulty === "all" || 
      issue.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesLabel && matchesLanguage && matchesDifficulty;
  });

  // Unique lists for dropdowns
  const uniqueLabels = ["good first issue", "bug", "documentation", "enhancement"];
  const uniqueLanguages = Array.from(new Set(issues.map((i) => i.language))).filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">Open Issues</h1>
        <p className="text-xl text-gray-400">Find a ticket, filter by difficulty, and start coding.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1a1d24] border border-[#2a2d36] rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search issues or repos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0f1115] border border-[#2a2d36] text-sm text-white rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:border-orange-500/50"
            />
          </div>

          {/* Label Filter */}
          <div className="flex items-center gap-2 bg-[#0f1115] border border-[#2a2d36] rounded-lg px-3 py-1">
            <Filter size={16} className="text-gray-500" />
            <select
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              className="bg-transparent text-sm text-white w-full py-2 focus:outline-none cursor-pointer"
            >
              <option value="all">All Labels</option>
              {uniqueLabels.map((lbl) => (
                <option key={lbl} value={lbl} className="bg-[#0f1115]">{lbl}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-2 bg-[#0f1115] border border-[#2a2d36] rounded-lg px-3 py-1">
            <BookOpen size={16} className="text-gray-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-sm text-white w-full py-2 focus:outline-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              {uniqueLanguages.map((lang) => (
                <option key={lang} value={lang} className="bg-[#0f1115]">{lang}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 bg-[#0f1115] border border-[#2a2d36] rounded-lg px-3 py-1">
            <AlertCircle size={16} className="text-gray-500" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-transparent text-sm text-white w-full py-2 focus:outline-none cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner" className="bg-[#0f1115]">Beginner</option>
              <option value="intermediate" className="bg-[#0f1115]">Intermediate</option>
              <option value="advanced" className="bg-[#0f1115]">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Display */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400 gap-3">
          <RefreshCw className="animate-spin text-orange-500" /> Fetching latest issues from GitHub...
        </div>
      ) : filteredIssues.length > 0 ? (
        <div className="space-y-4">
          {filteredIssues.map((issue) => {
            // Pick a glow border color based on difficulty
            const diffStyles = {
              Beginner: "border-green-500/20 hover:border-green-500/40 text-green-400 bg-green-500/10",
              Intermediate: "border-yellow-500/20 hover:border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
              Advanced: "border-red-500/20 hover:border-red-500/40 text-red-400 bg-red-500/10"
            };

            return (
              <div
                key={issue.id}
                className="p-5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] hover:border-orange-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 px-2 py-0.5 rounded">
                      {issue.repoName}
                    </span>
                    <span className="text-xs text-gray-500">
                      Opened {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${diffStyles[issue.difficulty]}`}>
                      {issue.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {issue.title}
                  </h3>

                  {/* Labels list */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {issue.labels.map((label, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded border font-medium"
                        style={{
                          borderColor: `#${label.color}40`,
                          backgroundColor: `#${label.color}15`,
                          color: `#${label.color}`
                        }}
                      >
                        {label.name}
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 px-2 py-0.5 rounded bg-[#0f1115] border border-[#2a2d36]">
                      {issue.language}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <a
                    href={issue.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2a2d36] text-white hover:bg-orange-500 transition-colors font-medium text-sm w-full md:w-auto justify-center"
                  >
                    Contribute <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 rounded-xl bg-[#1a1d24] border border-[#2a2d36]">
          <p className="text-gray-400">No issues found matching your filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedLabel("all");
              setSelectedLanguage("all");
              setSelectedDifficulty("all");
            }}
            className="mt-4 px-4 py-2 bg-orange-500 text-white font-bold rounded-lg text-sm"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
