"use client";

import Link from "next/link";
import { Rocket, BookOpen, Globe2, Trophy, Users, CheckCircle, Star, Award, ShieldAlert, ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function OpenSourceLandingPage() {
  const programs = [
    { name: "Google Summer of Code", desc: "Paid summer internship program", icon: "code" },
    { name: "Google Season of Docs", desc: "Technical writing program", icon: "docs" },
    { name: "Outreachy", desc: "Diversity in tech internships", icon: "diversity" },
    { name: "MLH Fellowship", desc: "Remote software engineering program", icon: "fellowship" },
    { name: "LFX Mentorship", desc: "Linux Foundation mentorship", icon: "linux" },
    { name: "Open Source Initiative", desc: "Promoting open source software", icon: "osi" },
    { name: "Hacktoberfest", desc: "Annual celebration of open source", icon: "fest" },
  ];

  return (
    <div className="w-full font-sans bg-[#0D1117] text-gray-300 selection:bg-orange-500 selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-24 pb-12">
        {/* Glow grid background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="z-10 max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
          >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">Hacktoberfest 2026</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your complete guide to making your <span className="text-orange-400 font-bold">first open source contribution</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/opensource/getting-started"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-base hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              <Rocket size={18} /> Start Your Journey
            </Link>
            <Link 
              href="/opensource/repositories"
              className="px-8 py-3.5 rounded-lg bg-transparent border-2 border-gray-600 text-white font-bold text-base hover:border-gray-400 transition-colors flex items-center gap-2"
            >
              <BookOpen size={18} /> Browse Issues
            </Link>
          </div>
          
          <p className="text-xs text-gray-500 pt-4 animate-bounce">Scroll to explore</p>
        </div>
      </section>

      {/* 2. Supported Programs Section */}
      <section className="border-t border-[#2a2d36]/50 bg-[#161b22]/30 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Supported Open Source Programs</h2>
            <p className="text-sm text-gray-400 mt-2">Join these amazing programs and contribute to open source!</p>
          </div>

          {/* Scrolling logo strip */}
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-none justify-start lg:justify-center items-center">
            {programs.map((prog, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 flex items-center gap-3 p-4 px-6 bg-[#1f242c] border border-[#2a2d36] rounded-xl hover:border-orange-500/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold text-xs">
                  &lt;/&gt;
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">{prog.name}</h4>
                  <p className="text-[10px] text-gray-500">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500">Click any program to learn more and start your open source journey!</p>
        </div>
      </section>

      {/* 3. Global Community Globe Section */}
      <section className="py-24 px-6 border-t border-[#2a2d36]/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div>
            <h2 className="text-4xl font-extrabold text-white bg-gradient-to-r from-orange-400 to-purple-400 text-transparent bg-clip-text">
              Join the Global Open Source Community
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Connect with developers from around the world and contribute to projects that matter.
            </p>
          </div>

          {/* SVG Animated Wireframe Globe Visualizer */}
          <div className="relative w-80 h-80 mx-auto bg-gradient-to-b from-orange-500/5 to-transparent rounded-full border border-orange-500/10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-orange-500/20 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-64 h-64 rounded-full border border-dashed border-purple-500/20 animate-[spin_20s_linear_infinite_reverse]" />
            
            {/* Spinning inner map representation */}
            <svg className="w-48 h-48 text-orange-500/30 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z" />
              <circle cx="25" cy="35" r="3" className="text-orange-500 fill-orange-500 animate-ping" />
              <circle cx="75" cy="45" r="4" className="text-purple-500 fill-purple-500" />
              <circle cx="45" cy="75" r="3" className="text-green-500 fill-green-500" />
              <circle cx="60" cy="25" r="5" className="text-yellow-500 fill-yellow-500" />
            </svg>

            <Globe2 size={40} className="absolute text-orange-500 animate-pulse" />
          </div>

          <p className="text-sm text-gray-400 font-semibold">
            🌍 Contributors from <span className="text-orange-400">150+ countries</span> are making a difference
          </p>
        </div>
      </section>

      {/* 4. Why Contribute Section */}
      <section className="py-24 px-6 border-t border-[#2a2d36]/50 bg-[#161b22]/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Why Contribute to Open Source?</h2>
            <p className="text-sm text-gray-400 mt-2">Join millions of developers worldwide and unlock incredible opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-white text-gray-900 border border-gray-100 shadow-xl space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Learn & Grow</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Practice real-world coding, get feedback from experienced developers, and build your skills through hands-on experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-white text-gray-900 border border-gray-100 shadow-xl space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Trophy size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Build Portfolio</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Show employers real contributions to actual projects. Stand out in job applications with proven experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-white text-gray-900 border border-gray-100 shadow-xl space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Join Community</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with developers worldwide, make friends, and become part of something bigger than yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Choose Your Path Section */}
      <section className="py-24 px-6 border-t border-[#2a2d36]/50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Choose Your Path</h2>
            <p className="text-sm text-gray-400 mt-2">No matter your experience level, there's a perfect starting point for you!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beginner */}
            <div className="p-8 rounded-2xl bg-[#1a1d24] border-2 border-green-500/30 hover:border-green-500 transition-colors space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white">Absolute Beginner</h3>
                </div>
                <p className="text-xs text-gray-400">Never made a pull request? Start here!</p>
                <ul className="space-y-2 text-xs text-gray-400 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> No coding required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Step-by-step guides
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Beginner-friendly issues
                  </li>
                </ul>
              </div>
              <Link 
                href="/opensource/getting-started"
                className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-bold text-center mt-6 block"
              >
                Start Learning →
              </Link>
            </div>

            {/* Some Experience */}
            <div className="p-8 rounded-2xl bg-[#1a1d24] border-2 border-yellow-500/30 hover:border-yellow-500 transition-colors space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="text-yellow-500 w-8 h-8 fill-yellow-500" />
                  <h3 className="text-xl font-bold text-white">Some Experience</h3>
                </div>
                <p className="text-xs text-gray-400">Ready for a challenge? Try these!</p>
                <ul className="space-y-2 text-xs text-gray-400 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Real coding tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Learn new tech
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Intermediate issues
                  </li>
                </ul>
              </div>
              <Link 
                href="/opensource/repositories"
                className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg text-xs font-bold text-center mt-6 block"
              >
                Take Challenge →
              </Link>
            </div>

            {/* Advanced */}
            <div className="p-8 rounded-2xl bg-[#1a1d24] border-2 border-red-500/30 hover:border-red-500 transition-colors space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Trophy className="text-red-500 w-8 h-8" />
                  <h3 className="text-xl font-bold text-white">Advanced Developer</h3>
                </div>
                <p className="text-xs text-gray-400">Looking for complex tasks? Here you go!</p>
                <ul className="space-y-2 text-xs text-gray-400 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Complex features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Architecture work
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Advanced issues
                  </li>
                </ul>
              </div>
              <Link 
                href="/opensource/repositories"
                className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold text-center mt-6 block"
              >
                Show Skills →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ready to make first contribution CTA */}
      <section className="py-24 px-6 border-t border-[#2a2d36]/50 bg-[#161b22]/20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold text-white">Ready to Make Your First Contribution?</h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Join thousands of developers making their first open source contribution to OpenVeda projects this Hacktoberfest!
          </p>
          <div className="pt-4">
            <Link 
              href="/opensource/getting-started"
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white font-bold text-base transition-opacity shadow-[0_0_40px_rgba(249,115,22,0.2)]"
            >
              Let's Get Started! 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-[#2a2d36]/50 bg-[#0f1115] py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">OpenVeda Docs</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your complete guide to contributing to open source projects during Hacktoberfest 2026.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/opensource/getting-started" className="text-gray-500 hover:text-white transition-colors">Getting Started</Link>
              <Link href="/opensource/issues" className="text-gray-500 hover:text-white transition-colors">Browse Issues</Link>
              <Link href="/opensource/repositories" className="text-gray-500 hover:text-white transition-colors">Repositories</Link>
              <Link href="/opensource" className="text-gray-500 hover:text-white transition-colors">Documentation</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/ayushshukla1807" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#1f242c] border border-[#2a2d36] rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
              <span className="text-xs text-gray-500">Join our community and start contributing!</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-[#2a2d36]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 OpenVeda. All rights reserved.</p>
          <p>Made with ❤️ for Open Source</p>
        </div>
      </footer>

    </div>
  );
}
