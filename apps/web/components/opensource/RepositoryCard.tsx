import { Github, Star, CircleDot, AlertCircle } from "lucide-react";

export interface RepositoryData {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  openIssues: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Beginner to Advanced";
  html_url: string;
}

export function RepositoryCard({ repo }: { repo: RepositoryData }) {
  return (
    <div className="p-5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] hover:border-orange-500/30 transition-all group font-sans flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noreferrer"
          className="text-orange-400 hover:text-orange-300 font-semibold text-lg flex items-center gap-2"
        >
          <Github size={18} />
          {repo.name}
        </a>
        <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded text-xs font-medium border border-yellow-500/20">
          <Star size={12} className="fill-yellow-500" />
          {repo.stars}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 flex-1">{repo.description}</p>
      
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="w-20 text-gray-500">Language:</span> 
          <span className="font-medium">{repo.language || 'Multiple'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <CircleDot size={12} className="text-green-500" />
          <span className="w-20 text-gray-500">Issues:</span> 
          <span className="font-medium">{repo.openIssues} available</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <AlertCircle size={12} className="text-orange-500" />
          <span className="w-20 text-gray-500">Difficulty:</span> 
          <span className="font-medium">{repo.difficulty}</span>
        </div>
      </div>

      <a 
        href={`${repo.html_url}/issues`}
        target="_blank"
        rel="noreferrer"
        className="w-full py-2 text-center text-sm font-medium rounded-md bg-[#2a2d36] text-white hover:bg-orange-500 transition-colors"
      >
        View Issues
      </a>
    </div>
  );
}
