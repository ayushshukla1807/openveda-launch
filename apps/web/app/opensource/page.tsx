import Link from "next/link";
import { Rocket, BookOpen, Globe2, Users, Trophy } from "lucide-react";
import { LearningPathCard } from "@/components/opensource/LearningPathCard";

export default function OpenSourceLandingPage() {
  const programs = [
    { title: "Hacktoberfest 2026", desc: "Annual celebration of open source", color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Google Summer of Code", desc: "Paid summer internship program", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Google Season of Docs", desc: "Technical writing program", color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Outreachy", desc: "Diversity in tech internships", color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "MLH Fellowship", desc: "Remote software engineering program", color: "text-red-500", bg: "bg-red-500/10" },
    { title: "LFX Mentorship", desc: "Linux Foundation mentorship", color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  return (
    <div className="w-full font-sans">
      {/* Hero Section with Glowing Background */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20 pb-10">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center items-start">
          <div className="w-[800px] h-[400px] bg-orange-500/20 blur-[120px] rounded-full mix-blend-screen" />
        </div>
        
        <div className="z-10 relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-2xl">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">Hacktoberfest</span> 2026
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your complete guide to making your <span className="text-orange-400 font-bold">first open source contribution</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/opensource/getting-started"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              <Rocket size={20} /> Start Your Journey
            </Link>
            <Link 
              href="/opensource/repositories"
              className="px-8 py-3.5 rounded-lg bg-transparent border-2 border-gray-600 text-white font-bold text-lg hover:border-gray-400 transition-colors flex items-center gap-2"
            >
              <BookOpen size={20} /> Browse Issues
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#2a2d36]/50 relative">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Supported Open Source Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-[#1a1d24] border border-[#2a2d36] hover:border-orange-500/30 transition-all cursor-pointer group">
              <h3 className={`text-xl font-bold ${prog.color} mb-2`}>{prog.title}</h3>
              <p className="text-gray-400">{prog.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Contribute */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#2a2d36]/50">
        <div className="text-center mb-16">
          <Globe2 size={40} className="mx-auto text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Join the Global Open Source Community</h2>
          <p className="text-gray-400 text-lg">Connect with developers from around the world and contribute to projects that matter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#1a1d24] to-transparent border border-[#2a2d36]">
            <BookOpen size={32} className="mx-auto text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Learn & Grow</h3>
            <p className="text-gray-400 leading-relaxed">Practice real-world coding, get feedback from experienced developers, and build your skills through hands-on experience.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#1a1d24] to-transparent border border-[#2a2d36]">
            <Trophy size={32} className="mx-auto text-yellow-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Build Portfolio</h3>
            <p className="text-gray-400 leading-relaxed">Show employers real contributions to actual projects. Stand out in job applications with proven experience.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#1a1d24] to-transparent border border-[#2a2d36]">
            <Users size={32} className="mx-auto text-purple-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Join Community</h3>
            <p className="text-gray-400 leading-relaxed">Connect with developers worldwide, make friends, and become part of something bigger than yourself.</p>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#2a2d36]/50">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Choose Your Path</h2>
        <p className="text-gray-400 text-center mb-12">No matter your experience level, there's a perfect starting point for you!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LearningPathCard 
            level="Beginner"
            title="Absolute Beginner"
            description="Never made a pull request? Start here!"
            bullets={["No coding required", "Step-by-step guides", "Beginner-friendly issues"]}
            href="/opensource/getting-started"
            buttonText="Start Learning"
          />
          <LearningPathCard 
            level="Intermediate"
            title="Some Experience"
            description="Ready for a challenge? Try these!"
            bullets={["Real coding tasks", "Learn new tech", "Intermediate issues"]}
            href="/opensource/repositories"
            buttonText="Take Challenge"
          />
          <LearningPathCard 
            level="Advanced"
            title="Advanced Developer"
            description="Looking for complex tasks? Here you go!"
            bullets={["Complex features", "Architecture work", "Advanced issues"]}
            href="/opensource/repositories?level=advanced"
            buttonText="Show Skills"
          />
        </div>
      </section>
    </div>
  );
}
