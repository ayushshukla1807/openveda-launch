"use client";

import { useEffect, useState } from "react";
import { RepositoryCard, RepositoryData } from '../../../components/opensource/RepositoryCard';
import { Star, Flame, Rocket, RefreshCw } from "lucide-react";

const hardcodedRepos: RepositoryData[] = [
  {
    id: "linuxdroid",
    name: "LinuxDroid",
    description: "Transform your Android device into a Linux powerhouse. Perfect for learning shell scripting and Linux system administration.",
    language: "Shell",
    stars: 494,
    openIssues: 6,
    difficulty: "Beginner to Advanced",
    html_url: "https://github.com/ayushshukla1807/LinuxDroid"
  },
  {
    id: "kalilinux",
    name: "Kali-Linux-for-Android",
    description: "Run Kali Linux natively on Android devices. Great for learning cybersecurity basics and package management.",
    language: "Shell",
    stars: 65,
    openIssues: 3,
    difficulty: "Intermediate",
    html_url: "https://github.com/ayushshukla1807/Kali-Linux-for-Android"
  },
  {
    id: "aivoicecloner",
    name: "AIVoiceClonerPRO",
    description: "Advanced voice cloning utilizing state-of-the-art AI models. Good entry point for PyTorch and audio processing.",
    language: "Python",
    stars: 58,
    openIssues: 12,
    difficulty: "Advanced",
    html_url: "https://github.com/ayushshukla1807/AIVoiceClonerPRO"
  }
];

export default function RepositoriesPage() {
  const [liveRepos, setLiveRepos] = useState<RepositoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubRepos() {
      try {
        const response = await fetch("https://api.github.com/users/ayushshukla1807/repos?sort=updated&per_page=6");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        const formatted: RepositoryData[] = data.map((repo: any) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || "No description available.",
          language: repo.language || "Multiple",
          stars: repo.stargazers_count,
          openIssues: repo.open_issues_count,
          difficulty: "Beginner", // Inferring default
          html_url: repo.html_url
        }));
        
        // Filter out repos that are already in the hardcoded list to avoid duplicates
        const hardcodedNames = hardcodedRepos.map(r => r.name.toLowerCase());
        const filtered = formatted.filter(r => !hardcodedNames.includes(r.name.toLowerCase()));
        
        setLiveRepos(filtered);
      } catch (error) {
        console.error("Error fetching live repos:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchGitHubRepos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">All Repositories</h1>
        <p className="text-xl text-gray-400">Explore all repositories participating in Hacktoberfest 2026</p>
      </div>

      {/* Stats Summary */}
      <div className="p-4 rounded-lg bg-[#1a1d24] border border-[#2a2d36] flex items-start gap-3 mb-16">
        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 text-blue-500">i</div>
        <div>
          <h4 className="font-bold text-white mb-1">Total Stats</h4>
          <p className="text-gray-400 text-sm">
            {hardcodedRepos.length + liveRepos.length} Repositories • 1000+ Stars • 7+ Languages
          </p>
        </div>
      </div>

      {/* High-Star Repositories (Hardcoded Curated) */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Star className="text-yellow-500 fill-yellow-500" /> High-Star Repositories (Curated)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardcodedRepos.map(repo => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>

      {/* Live GitHub Repositories */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Flame className="text-orange-500 fill-orange-500" /> Recently Updated (Live from GitHub)
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center p-12 text-gray-400 gap-3">
            <RefreshCw className="animate-spin" /> Fetching live repositories...
          </div>
        ) : liveRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveRepos.map(repo => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl bg-[#1a1d24] border border-[#2a2d36]">
            <p className="text-gray-400">No additional public repositories found or GitHub API limit reached.</p>
          </div>
        )}
      </div>
    </div>
  );
}
