'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

interface OrgCardProps {
  name: string;
  slug: string;
  logo_url: string | null;
  tech_stack: string[] | null;
  program?: string;
  is_active_year_round?: boolean;
}

export default function OrgCard({ name, slug, logo_url, tech_stack, program, is_active_year_round }: OrgCardProps) {
  const isPlaybookAvailable = slug && slug !== '404' && slug !== 'placeholder';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Link 
        href={isPlaybookAvailable ? `/playbook/${slug}` : '#'} 
        className={`group block glass rounded-[2.5rem] p-8 relative overflow-hidden h-full border border-border transition-all duration-500 ${
          isPlaybookAvailable ? 'hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.05)]' : 'opacity-70 grayscale-[0.5]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-colors duration-700" />
        
        <div className="flex items-center gap-5 mb-6">
          <div className="relative h-14 w-14 flex-shrink-0 bg-muted rounded-2xl border border-border flex items-center justify-center p-2 group-hover:border-primary/30 transition-colors">
            {logo_url ? (
              <Image 
                src={logo_url} 
                alt={`${name} logo`} 
                fill 
                sizes="56px" 
                className="rounded-xl object-contain p-2" 
              />
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate tracking-tight">
              {name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {is_active_year_round ? (
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <span className="text-[10px] font-black text-primary uppercase tracking-widest">Year-Round Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-primary/40" />
                   <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{program || 'Ecosystem'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tech_stack && tech_stack.slice(0, 4).map((tech: string) => (
            <span 
              key={tech} 
              className="bg-muted/50 border border-border text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg group-hover:border-primary/20 group-hover:text-primary transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
            {isPlaybookAvailable ? 'View Mastery Playbook' : 'Community Request Needed'}
          </span>
          <div className={`p-2 rounded-lg transition-all ${
            isPlaybookAvailable ? 'bg-muted group-hover:bg-primary group-hover:text-primary-foreground' : 'bg-muted/30 text-muted-foreground'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isPlaybookAvailable ? "M14 5l7 7-7 7" : "M12 4v16m8-8H4"} />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}