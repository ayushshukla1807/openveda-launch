import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LearningPathCardProps {
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  description: string;
  bullets: string[];
  href: string;
  buttonText: string;
}

export function LearningPathCard({ level, title, description, bullets, href, buttonText }: LearningPathCardProps) {
  
  const styles = {
    Beginner: {
      color: "text-green-500",
      bg: "bg-green-500",
      border: "hover:border-green-500/50",
      button: "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    },
    Intermediate: {
      color: "text-yellow-500",
      bg: "bg-yellow-500",
      border: "hover:border-yellow-500/50",
      button: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    },
    Advanced: {
      color: "text-red-500",
      bg: "bg-red-500",
      border: "hover:border-red-500/50",
      button: "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    }
  };

  const style = styles[level];

  return (
    <div className={`p-6 rounded-xl bg-[#1a1d24] border border-[#2a2d36] transition-all duration-300 ${style.border} group font-sans h-full flex flex-col`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${style.bg} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
        <h3 className={`font-bold ${style.color}`}>{title}</h3>
      </div>
      
      <p className="text-gray-300 text-sm mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8 flex-1">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
            <div className={`w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:${style.bg} transition-colors`} />
            {bullet}
          </li>
        ))}
      </ul>

      <Link 
        href={href}
        className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${style.button}`}
      >
        {buttonText} <ArrowRight size={16} />
      </Link>
    </div>
  );
}
