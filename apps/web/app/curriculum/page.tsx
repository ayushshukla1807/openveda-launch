'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Code, Database, Brain, BarChart3, HelpCircle, ArrowRight,
  TrendingUp, Award, Layers, Terminal, Sparkles, MapPin, Zap
} from 'lucide-react';

const year1Skills = [
  "Python Basics", "ReactJS", "Data Structures Algorithms (DSA)", "File Handling",
  "Responsive Web Design", "Arrays", "Dictionary", "Searching & Sorting",
  "API Integration", "UI/UX Architecture", "Javascript (ES6+)", "Maths for CS"
];

const year2Skills = [
  "Node.js", "Backend Engineering", "Dynamic Programming", "Databases (SQL & NoSQL)",
  "Machine Learning Engine", "Data Visualisation", "Apache Spark", "Mathematics for AI",
  "Backtracking Algorithms", "PostgreSQL", "MongoDB", "Apache Hadoop"
];

const year1Concepts = [
  {
    title: "Data Structures and Algorithms",
    desc: "Unlock the building blocks of core low-latency programming. Master linear and non-linear memory maps.",
    icon: <Code className="w-6 h-6 text-[#00f0ff]" />
  },
  {
    title: "Web Development Stack",
    desc: "Learn to build modern, highly responsive, fully functional client-side portals from raw structures.",
    icon: <Layers className="w-6 h-6 text-[#7000ff]" />
  },
  {
    title: "Core Maths for Computer Science",
    desc: "Explore the mathematics behind digital systems, abstract algebra, and how binary structures breathe.",
    icon: <Terminal className="w-6 h-6 text-[#FF8D72]" />
  }
];

const year2Concepts = [
  {
    title: "Advanced Programming & Systems",
    desc: "Learn how to build the low-latency brain of apps, orchestrate concurrency, and lock down secure server parameters.",
    icon: <Terminal className="w-6 h-6 text-[#00f0ff]" />
  },
  {
    title: "Database Systems Architecture",
    desc: "Learn how to design schemas, optimize indices, and query at lightning speeds to power live transactions.",
    icon: <Database className="w-6 h-6 text-[#7000ff]" />
  },
  {
    title: "System Design & Distributed Engines",
    desc: "Explore how complex, horizontal distributed systems are architected, scale-tested, and deployed live.",
    icon: <Zap className="w-6 h-6 text-[#FF8D72]" />
  },
  {
    title: "Data and Visual Analytics",
    desc: "Master large-scale data visualization, predictive analytics, and D3.js telemetry reporting to drive decisions.",
    icon: <BarChart3 className="w-6 h-6 text-green-400" />
  },
  {
    title: "Maths for Artificial Intelligence",
    desc: "Dive deep into multivariate calculus, linear algebra, and probability distributions required for neural systems.",
    icon: <Brain className="w-6 h-6 text-pink-400" />
  },
  {
    title: "Intro to AI & Machine Learning",
    desc: "Train systems to find patterns in massive data matrices, formulate predictions, and write model layers.",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />
  }
];

const year1Projects = [
  {
    title: "Open Source for an Open World",
    type: "Systems / Git",
    desc: "Audit unwritten rules of major open source codebases and successfully merge your first pull request upstream.",
    roles: ["Frontend", "Full Stack", "Intern"],
    color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/30"
  },
  {
    title: "GenAI CRM Pipeline",
    type: "AI Integration / Full Stack",
    desc: "Integrate LLM API workflows into customer databases with automated vector matching and dynamic dashboards.",
    roles: ["Frontend", "Full Stack", "AI Intern"],
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30"
  },
  {
    title: "Algorithm vs AI Optimization",
    type: "Core CS Challenge",
    desc: "Benchmark traditional deterministic structures directly against custom predictive regression layers.",
    roles: ["Full Stack", "AI/ML", "ML Intern"],
    color: "from-orange-500/20 to-red-500/20 border-orange-500/30"
  }
];

const year2Projects = [
  {
    title: "Optimized Last-mile Delivery (Blinkit | Zepto)",
    type: "Data Science & Routing Systems",
    desc: "Solve critical logistics bottlenecks by implementing Dijkstra variations and geo-proximity indices on spatial graphs.",
    roles: ["Backend", "Data Analyst", "Full Stack"],
    color: "from-[#FFD800]/25 to-[#00FF57]/15 border-green-500/30"
  },
  {
    title: "InShorts-Like AI Recommendation Engine",
    type: "Machine Learning & Big Data",
    desc: "Build a high-throughput news delivery stream with collaborative filtering, Redis caches, and vectorized telemetry logs.",
    roles: ["AI/ML", "Backend", "ML Intern"],
    color: "from-red-500/20 to-orange-500/20 border-red-500/30"
  },
  {
    title: "Snapchat Real-time Asset updates",
    type: "Frontend & Socket Infrastructure",
    desc: "Deploy a low-latency image assets post workflow backed by active WebSockets and distributed storage filters.",
    roles: ["Frontend", "Full Stack", "Frontend Intern"],
    color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30"
  },
  {
    title: "eBay Platform Real-time Bidding",
    type: "High-Throughput Distributed Microservices",
    desc: "Orchestrate concurrent transaction auctions under heavy thread stress using Redis lock bounds and Kafka queues.",
    roles: ["Backend", "Full Stack", "Backend Intern"],
    color: "from-blue-600/20 to-indigo-600/25 border-blue-500/30"
  },
  {
    title: "Product Hunt Genesis Challenge",
    type: "Full Stack Scale Orchestration",
    desc: "Deploy voting consensus layers with user score weightings, dynamic timelines, and rate limiters.",
    roles: ["Full Stack", "Frontend", "Data Analyst"],
    color: "from-red-600/25 to-pink-600/15 border-pink-500/30"
  },
  {
    title: "Google-Level Auth Shield",
    type: "Security & Credentials Core",
    desc: "Implement OAuth2, multi-layered JWT cookies, and state tracking matrices to secure client-side profiles.",
    roles: ["Backend", "Full Stack", "Security Intern"],
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function CurriculumPage() {
  const [activeYear, setActiveYear] = useState<1 | 2>(1);

  return (
    <main className="min-h-screen bg-[#030305] text-[#f8fafc] relative overflow-hidden font-sans">
      {/* Dynamic Ambient Blur Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-[#7000ff]/10 blur-[150px] rounded-full animate-pulse [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-32 relative z-10 space-y-28">
        
        {/* Authoritative Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <span className="text-[#00f0ff] font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Industry First • Advanced Curriculum
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-white">
            Curated <span className="text-foreground/20 italic">Mastery Paths</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed italic">
            "Hands-on learning engineered specifically to forge the ultimate resume—proving systems mastery across AI/ML, Full Stack, and Distributed Data Architecture."
          </p>
        </motion.div>

        {/* Year Selector Tabs */}
        <div className="flex justify-center">
          <div className="glass p-2 rounded-[2rem] flex gap-2 border-white/5 relative z-20">
            <button
              onClick={() => setActiveYear(1)}
              className={`px-10 py-5 rounded-2xl text-xs uppercase tracking-widest font-black transition-all flex items-center gap-2 ${
                activeYear === 1 
                  ? 'bg-white text-black shadow-2xl scale-105' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>YEAR 1: Build</span>
            </button>
            <button
              onClick={() => setActiveYear(2)}
              className={`px-10 py-5 rounded-2xl text-xs uppercase tracking-widest font-black transition-all flex items-center gap-2 ${
                activeYear === 2 
                  ? 'bg-white text-black shadow-2xl scale-105' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>YEAR 2: Achieve</span>
            </button>
          </div>
        </div>

        {/* Dynamic Curriculum Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-28"
          >
            {/* Year Intro Banner */}
            <motion.div 
              variants={itemVariants} 
              className="p-12 glass rounded-[3.5rem] border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase font-black">
                  {activeYear === 1 ? "ESSENTIAL SYSTEM BASES" : "SCALABLE SYSTEMS & ARTIFICIAL INTELLIGENCE"}
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                  {activeYear === 1 ? "Systems and AI Essentials" : "Build Scalable AI & Data Pipelines"}
                </h2>
                <p className="text-gray-400 font-medium max-w-xl leading-relaxed">
                  {activeYear === 1 
                    ? "In Year 1, Systems and AI Essentials runs parallel to programming, enabling students to learn core structures alongside AI from week one."
                    : "By Year 2, students construct Production AI systems while mastering Machine Learning, Big Data pipelines, and advanced distributed networks."
                  }
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                <Award className="w-6 h-6 text-[#00f0ff]" />
                <span className="text-xs font-black uppercase tracking-widest text-white">
                  {activeYear === 1 ? "DSA & AI Fundamentals" : "ML & Big Data Mastery"}
                </span>
              </div>
            </motion.div>

            {/* "What you'll learn" Skills Tags Panel */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 italic whitespace-nowrap">Core Technologies & Libraries</h3>
                <div className="h-[1px] bg-white/10 w-full" />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {(activeYear === 1 ? year1Skills : year2Skills).map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, borderColor: '#00f0ff' }}
                    className="px-5 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-black text-gray-300 tracking-wide transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* "In classroom concepts" Bento Grid */}
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 italic whitespace-nowrap">In Classroom Concepts</h3>
                <div className="h-[1px] bg-white/10 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(activeYear === 1 ? year1Concepts : year2Concepts).map((concept) => (
                  <motion.div
                    key={concept.title}
                    variants={itemVariants}
                    className="p-8 glass rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all group flex flex-col justify-between hover:-translate-y-2 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none group-hover:scale-125 transition-transform" />
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit">
                        {concept.icon}
                      </div>
                      <h4 className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">{concept.title}</h4>
                      <p className="text-gray-400 font-medium text-xs leading-relaxed">{concept.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* "Projects you'll work on" Showcase */}
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 italic whitespace-nowrap">Resume Flagship Projects</h3>
                  <div className="h-[1px] bg-white/10 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(activeYear === 1 ? year1Projects : year2Projects).map((project) => (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    className={`p-8 rounded-[2.5rem] bg-gradient-to-br border hover:scale-[1.02] transition-all relative overflow-hidden flex flex-col justify-between shadow-2xl ${project.color}`}
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono font-black text-[#00f0ff] uppercase tracking-widest">{project.type}</span>
                        <div className="flex gap-1.5 flex-wrap justify-end max-w-[60%]">
                          {project.roles.map(r => (
                            <span key={r} className="bg-white/5 border border-white/10 text-white text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <h4 className="text-2xl font-black tracking-tight text-white leading-tight">{project.title}</h4>
                      <p className="text-gray-300 font-semibold text-xs leading-relaxed">{project.desc}</p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                      <Link 
                        href="/dashboard"
                        className="text-[9px] font-black tracking-widest uppercase text-white hover:text-[#00f0ff] transition-colors flex items-center gap-1.5"
                      >
                        <span>Start Building</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="mt-40 py-20 border-t border-white/5 text-center bg-[#050508]/50">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-[0.8em] mb-4">OPEN_VEDA // SYLLABUS_V2</p>
        <p className="text-[9px] text-gray-700 font-mono tracking-widest">© 2026 • ARCHITECTED FOR THE INFINITE</p>
      </footer>
    </main>
  );
}
