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
}

export default function OrgCard({ name, slug, logo_url, tech_stack }: OrgCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Link 
        href={`/playbook/${slug}`} 
        className="group block glass rounded-3xl p-6 relative overflow-hidden h-full border border-border hover:border-primary/30 transition-all duration-300"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
        
        <div className="flex items-center gap-5 mb-6">
          <div className="relative h-14 w-14 flex-shrink-0 bg-muted rounded-2xl border border-border flex items-center justify-center p-2 group-hover:border-primary/30 transition-colors">
            {logo_url ? (
              <Image 
                src={logo_url} 
                alt={`${name} logo`} 
                fill 
                sizes="56px" 
                className="rounded-xl object-contain p-2 dark:invert-0 light:invert-0" 
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
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">GSoC 2026</span>
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
          {tech_stack && tech_stack.length > 4 && (
            <span className="text-[10px] font-bold text-muted-foreground px-1 py-1.5">
              +{tech_stack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
            View Playbook
          </span>
          <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}