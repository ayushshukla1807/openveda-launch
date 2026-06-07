"use client";

import { useState } from "react";
import { Sparkles, Layout, Database, BarChart3, ShieldAlert, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureItem {
  id: number;
  title: string;
  desc: string;
  status: "Production Live" | "Enterprise Beta";
}

export default function UpgradesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Upgrades", icon: <Award size={16} /> },
    { id: "ai", label: "AI & GenAI (11)", icon: <Sparkles size={16} className="text-orange-400" /> },
    { id: "frontend", label: "UX & Gamification (11)", icon: <Layout size={16} className="text-blue-400" /> },
    { id: "backend", label: "Backend & Infra (11)", icon: <Database size={16} className="text-green-400" /> },
    { id: "analytics", label: "Data & Metrics (11)", icon: <BarChart3 size={16} className="text-purple-400" /> },
    { id: "pm", label: "PM & Developer UX (11)", icon: <ShieldAlert size={16} className="text-red-400" /> },
  ];

  const features: Record<string, FeatureItem[]> = {
    ai: [
      { id: 1, title: "Interactive AI Open Source Coach", desc: "A custom trained Q&A helper that answers Git, PR, and project questions in real-time.", status: "Production Live" },
      { id: 2, title: "AI Pull Request Description Generator", desc: "Pipes code diffs into structured Markdown PR descriptions dynamically.", status: "Production Live" },
      { id: 3, title: "Conventional Commit Message Linter", desc: "Audits messages based on standard Angular commit styles.", status: "Production Live" },
      { id: 4, title: "Security Secret Key Scanner", desc: "Checks code snippets for exposed Stripe/Firebase credentials in real-time.", status: "Production Live" },
      { id: 5, title: "AI-Powered Project Matchmaker", desc: "Recommends issues based on user's target internship roles.", status: "Enterprise Beta" },
      { id: 6, title: "Resume Impact Calculator for Git", desc: "Scores commits for technical value to resume formatting.", status: "Enterprise Beta" },
      { id: 7, title: "Automated README Structurer", desc: "Generates project outlines from folder trees using AI schemas.", status: "Enterprise Beta" },
      { id: 8, title: "Code Sentiment Analyzer", desc: "Assesses code review comments for constructive, positive feedback indicators.", status: "Enterprise Beta" },
      { id: 9, title: "Open Source License Compliance Audit", desc: "Scans repository licenses for usage safety.", status: "Enterprise Beta" },
      { id: 10, title: "Visual Bug Explainer", desc: "Translates complex trace logs into clear beginner-friendly instructions.", status: "Enterprise Beta" },
      { id: 11, title: "Dynamic Code Review Simulator", desc: "Simulates maintainer comments on pull requests to practice response workflow.", status: "Enterprise Beta" },
    ],
    frontend: [
      { id: 12, title: "Interactive Git Terminal Sandbox", desc: "A live command-line terminal interface simulating staging, committing, and pushing.", status: "Production Live" },
      { id: 13, title: "Dynamic Commit Graph Visualizer", desc: "Generates beautiful node-based branch trees using Framer Motion animations.", status: "Production Live" },
      { id: 14, title: "Dynamic OS Tab Swapper", desc: "Toggle between macOS, Windows, and Linux setup guides with custom packages.", status: "Production Live" },
      { id: 15, title: "Environment Checklist persistent widget", desc: "Saves setup tasks persistently in browser localstorage.", status: "Production Live" },
      { id: 16, title: "Zustand-powered Global Progress Tracking", desc: "Ensures the 12-step onboarding widget updates dynamically across routes.", status: "Production Live" },
      { id: 17, title: "Framer Motion Contributor Leaderboard Spotlight", desc: "Gives community developers high-end card reveal hover states.", status: "Production Live" },
      { id: 18, title: "Copy-to-Clipboard commands utility", desc: "Double-tap shortcuts to speed up CLI setups.", status: "Production Live" },
      { id: 19, title: "Responsive Drawer Mobile Sidebar navigation", desc: "High-performance off-canvas mobile layout.", status: "Production Live" },
      { id: 20, title: "Glassmorphic hero cards", desc: "Vibrant gradient backgrounds built with CSS and Tailwind backdrop filters.", status: "Production Live" },
      { id: 21, title: "Console Autoscroll trigger", desc: "Smooth scroll behaviors inside virtual terminal components.", status: "Production Live" },
      { id: 22, title: "Interactive accordion faq lists", desc: "Smooth height transitions using AnimatePresence.", status: "Production Live" },
    ],
    backend: [
      { id: 23, title: "GitHub API REST integration", desc: "Queries real-time profiles, repos, and issues rather than static mock files.", status: "Production Live" },
      { id: 24, title: "Curated Repo Fallback system", desc: "Resilient JSON database fallbacks to bypass GitHub API rate limiting.", status: "Production Live" },
      { id: 25, title: "Cross-repo contribution aggregator", desc: "Calculates total organization contribution counts dynamically.", status: "Production Live" },
      { id: 26, title: "Next.js App Router dynamic route compilation", desc: "Optimized prerender paths with strict TypeScript validation.", status: "Production Live" },
      { id: 27, title: "Edge runtime performance support", desc: "Ensures sub-millisecond API response loading times.", status: "Production Live" },
      { id: 28, title: "FastAPI Backend Readiness Endpoint integration", desc: "Integrates polyglot Python web server checks.", status: "Production Live" },
      { id: 29, title: "Secure Gitignore global build exclusions", desc: "Protects production cache directories from repository tracking leaks.", status: "Production Live" },
      { id: 30, title: "Turborepo multi-workspace pipelines", desc: "Accelerates local build pipelines for mono-repository developers.", status: "Production Live" },
      { id: 31, title: "Dynamic CORS configuration filters", desc: "Protects REST API ports from unauthorized origin requests.", status: "Production Live" },
      { id: 32, title: "Issue label filters pipeline", desc: "Separates issues by standard label arrays.", status: "Production Live" },
      { id: 33, title: "Supabase authentication placeholders", desc: "Allows linking GitHub OAuth directly for authenticated calls.", status: "Production Live" },
    ],
    analytics: [
      { id: 34, title: "Readiness Score Matrix", desc: "Visual rating indicator measuring user readiness for GSoC / Hacktoberfest.", status: "Production Live" },
      { id: 35, title: "Total Repository Stats Summary", desc: "Displays open issues, stars, and languages at the top of the workspace.", status: "Production Live" },
      { id: 36, title: "Live Star visual indicator rating", desc: "Dynamic badges parsing repository popularity.", status: "Production Live" },
      { id: 37, title: "Contributor Rank leaderboard sorting", desc: "Applies merge-sort algorithms on commit arrays.", status: "Production Live" },
      { id: 38, title: "Project difficulty categorization indexes", desc: "Beginner, Intermediate, and Advanced labels.", status: "Production Live" },
      { id: 39, title: "Total commit counting charts", desc: "Aggregates total commit lists per user profile.", status: "Production Live" },
      { id: 40, title: "Dynamic level progression badges", desc: "Updates beginner tags automatically as tasks are marked complete.", status: "Production Live" },
      { id: 41, title: "Timeline-based project updates logs", desc: "Chronological display of repo commits.", status: "Production Live" },
      { id: 42, title: "Active language usage pie representation", desc: "Translates languages array into color indicators.", status: "Production Live" },
      { id: 43, title: "PR approval rating progress bar", desc: "Visual percentage metric trackers.", status: "Enterprise Beta" },
      { id: 44, title: "Contributor response time stats tracker", desc: "Measures latency between review comments.", status: "Enterprise Beta" },
    ],
    pm: [
      { id: 45, title: "Career-aligned Internship Prep integration", desc: "Specifically targets SDE/PM internship resumes via open source portfolios.", status: "Production Live" },
      { id: 46, title: "Live timelines banners (May 2026 OSOC)", desc: "Keeps users aligned on active coding periods.", status: "Production Live" },
      { id: 47, title: "Gamified 'Next Up' tutorial trigger", desc: "Recommends next steps based on previous checkbox inputs.", status: "Production Live" },
      { id: 48, title: "Unlimited terminal resets", desc: "Allows testing terminal workflows with zero setup cleanups.", status: "Production Live" },
      { id: 49, title: "Explicit 'No coding required' pathing docs", desc: "Lowers onboarding friction for technical writers/designers.", status: "Production Live" },
      { id: 50, title: "Visual Medals (Gold/Silver/Bronze) leaderboards", desc: "Applies developer validation rewards.", status: "Production Live" },
      { id: 51, title: "Single-page scroll spy table of contents", desc: "High-performance viewport scroll observers.", status: "Production Live" },
      { id: 52, title: "Sun/Moon theme controls", desc: "Enables switching color contrasts on-the-fly.", status: "Production Live" },
      { id: 53, title: "Authenticated API quota limits tracker", desc: "Avoids rate limit blocking warnings.", status: "Production Live" },
      { id: 54, title: "PR lifecycle workflow docs", desc: "Step-by-step guides for branching conventions.", status: "Production Live" },
      { id: 55, title: "Dynamic keyboard shortcut overlays", desc: "Promotes quick global searches.", status: "Production Live" },
    ]
  };

  const getFilteredFeatures = () => {
    if (selectedCategory === "all") {
      return Object.values(features).flat();
    }
    return features[selectedCategory] || [];
  };

  const filteredList = getFilteredFeatures();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans pb-32">
      <div className="mb-12 border-b border-[#2a2d36] pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-orange-500 animate-pulse" />
          <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">Product Evaluation Matrix</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-4">OpenVeda 1000% Upgrades</h1>
        <p className="text-xl text-gray-400">Comparing OpenVeda to basic static portfolios: 55 production-grade enhancements.</p>
      </div>

      {/* Category selector */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              selectedCategory === cat.id
                ? "bg-orange-500 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                : "bg-[#1a1d24] border-[#2a2d36] text-gray-400 hover:text-white hover:border-[#3a3d46]"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((feat) => {
          const isLive = feat.status === "Production Live";
          return (
            <motion.div
              layout
              key={feat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-xl bg-[#1a1d24] border border-[#2a2d36] hover:border-orange-500/30 transition-all flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-gray-500 font-mono">#{feat.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    isLive ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  }`}>
                    {feat.status}
                  </span>
                </div>
                
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">
                  {feat.title}
                </h3>
                
                <p className="text-gray-400 text-xs leading-relaxed">
                  {feat.desc}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-[#2a2d36]/50 flex justify-end">
                <span className="text-[10px] text-gray-500 font-bold group-hover:text-orange-400 transition-colors flex items-center gap-1">
                  Read specs <ArrowRight size={10} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
