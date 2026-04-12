'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const curriculum = {
  year1: {
    title: "Year 1: Foundation & Mastery",
    subtitle: "Unlock the building blocks of programming and web architecture.",
    topics: [
      { name: "Python Basics", icon: "🐍" },
      { name: "ReactJS", icon: "⚛️" },
      { name: "Data Structures & Algorithms", icon: "🧩" },
      { name: "File Handling", icon: "📁" },
      { name: "Responsive Web Design", icon: "📱" },
      { name: "Arrays & Dictionaries", icon: "📊" },
      { name: "Searching Algorithms", icon: "🔍" },
      { name: "Javascript", icon: "🌐" },
      { name: "Maths for CS", icon: "➗" }
    ],
    projects: [
      { name: "Google Summer of Code Guide", desc: "Open Source for an Open World" },
      { name: "Competitive Programming", desc: "Advanced algorithmic problem solving" },
      { name: "GenAI Powered CRM", desc: "Build a modern CRM platform with OpenAI" }
    ]
  },
  year2: {
    title: "Year 2: Scalable & Distributed Systems",
    subtitle: "Build data-driven complex systems that can scale to millions.",
    topics: [
      { name: "Node.js", icon: "🚀" },
      { name: "Backend Engineering", icon: "⚙️" },
      { name: "Dynamic Programming", icon: "📈" },
      { name: "PostgreSQL & MongoDB", icon: "🗄️" },
      { name: "Machine Learning", icon: "🧠" },
      { name: "Data Visualization", icon: "🎨" },
      { name: "Hadoop & Spark", icon: "🐘" },
      { name: "Backtracking", icon: "↩️" }
    ],
    projects: [
      { name: "Blinkit/Zepto Clone", desc: "Optimize Last-mile Delivery route" },
      { name: "Snapchat Clone", desc: "Build a real-time post update system" },
      { name: "eBay Platform", desc: "Implement real-time bidding systems" }
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function CurriculumPage() {
  const [activeYear, setActiveYear] = useState<'year1' | 'year2'>('year1');

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Mesh Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">The OpenVeda Way</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            Mentorship <span className="text-foreground/20 italic underline decoration-primary decoration-8 underline-offset-8">Curriculum</span>
          </h1>
          <p className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            A comprehensive 2-year journey designed to turn curious students into high-impact software engineers.
          </p>
        </motion.div>

        {/* Year Toggle */}
        <div className="flex justify-center mb-20">
          <div className="glass p-2 rounded-3xl flex gap-2">
            {(['year1', 'year2'] as const).map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-12 py-5 rounded-2xl text-xs uppercase tracking-widest font-black transition-all ${
                  activeYear === year 
                    ? 'bg-foreground text-background shadow-2xl' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {curriculum[year].title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeYear}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-32"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-black mb-6 tracking-tight">{curriculum[activeYear].title}</h2>
            <p className="text-xl text-muted-foreground font-medium">{curriculum[activeYear].subtitle}</p>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {curriculum[activeYear].topics.map((topic) => (
              <motion.div
                key={topic.name}
                variants={itemVariants}
                className="glass p-8 rounded-[2.5rem] border-border hover:border-primary/30 transition-all group hover:-translate-y-2"
              >
                <span className="text-4xl mb-4 block filter grayscale group-hover:grayscale-0 transition-all">{topic.icon}</span>
                <h3 className="font-black text-lg leading-tight">{topic.name}</h3>
              </motion.div>
            ))}
          </div>

          {/* Industry Projects Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-black tracking-tight whitespace-nowrap">Projects you'll <span className="text-muted-foreground">Master</span></h2>
              <div className="h-[1px] bg-border w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {curriculum[activeYear].projects.map((project) => (
                <motion.div
                  key={project.name}
                  variants={itemVariants}
                  className="p-10 rounded-[3rem] bg-gradient-to-br from-muted/50 to-muted/10 border border-border group hover:border-primary/40 transition-all relative overflow-hidden"
                >
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 blur-3xl group-hover:bg-primary/15 transition-all" />
                  <h4 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{project.name}</h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">{project.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • BUILT FOR IMPACT</p>
      </footer>
    </main>
  );
}
