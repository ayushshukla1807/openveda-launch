"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronRight, Github, Moon, Sun } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Documentation", href: "/opensource" },
    { name: "55 Feature Upgrades", href: "/opensource/upgrades" },
    { name: "Repositories", href: "/opensource/repositories" },
    { name: "Issues", href: "/opensource/issues" },
    { name: "Tutorials", href: "/opensource/tutorials" },
    { name: "Contributors", href: "/opensource/contributors" },
    { name: "AI Git Coach", href: "/opensource/coach" },
    { name: "Essential Tools", href: "/opensource/tools" },
    { name: "FAQ", href: "/opensource/faq" },
  ];

  const sections = [
    {
      title: "Welcome to Hacktoberfest 2026",
      items: [
        { name: "Frequently Asked Questions", href: "/opensource/faq" },
        { name: "Components", href: "/opensource" },
      ]
    },
    {
      title: "Getting Started",
      isActive: true,
      items: [
        { name: "Open Source Programs", href: "/opensource/getting-started#programs" },
        { name: "Setup Git", href: "/opensource/getting-started#git" },
        { name: "What is GitHub?", href: "/opensource/getting-started#github" },
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-[#2a2d36] bg-[#0f1115] h-screen fixed left-0 top-0 overflow-y-auto flex flex-col hidden md:flex font-sans">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2d36] flex items-center justify-between">
        <Link href="/opensource" className="flex items-center gap-2 text-white font-bold text-lg group">
          <div className="text-orange-500 group-hover:scale-110 transition-transform">
             {/* Simple SVG icon matching the target site */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          Hacktoberfest 2026
        </Link>
      </div>

      {/* Search bar */}
      <div className="p-4">
        <div className="bg-[#1a1d24] border border-[#2a2d36] rounded-md px-3 py-2 flex items-center gap-2">
          <Search size={16} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-gray-500"
          />
          <kbd className="text-xs bg-[#2a2d36] text-gray-400 px-1.5 py-0.5 rounded border border-[#3a3d46]">⌘K</kbd>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="px-3 flex-1 pb-6">
        <ul className="space-y-1 mb-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? "bg-[#2a2d36] text-white font-medium" 
                      : "text-gray-400 hover:text-white hover:bg-[#1a1d24]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className="mb-2">
            <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 font-medium hover:text-white transition-colors">
              {section.title}
              {section.isActive ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {section.isActive && (
              <ul className="mt-1 pl-4 space-y-1 border-l border-[#2a2d36] ml-3">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="block px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        
        {/* Additional static links for visual completeness */}
        <div className="mt-6 space-y-1">
          <Link href="/opensource/issues" className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            All Issues <ChevronRight size={14} />
          </Link>
          <Link href="/opensource/repositories" className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            All Repositories <ChevronRight size={14} />
          </Link>
          <Link href="/opensource/tools" className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            Essential Tools <ChevronRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Footer / User Controls */}
      <div className="p-4 border-t border-[#2a2d36] flex items-center justify-between text-gray-400">
        <a href="https://github.com/ayushshukla1807" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <div className="flex items-center gap-2">
          <button className="hover:text-white transition-colors"><Sun size={18} /></button>
          <button className="hover:text-white transition-colors"><Moon size={18} /></button>
        </div>
      </div>
    </aside>
  );
}
