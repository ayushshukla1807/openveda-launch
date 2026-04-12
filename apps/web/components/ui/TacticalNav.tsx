'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe, ArrowLeft, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

interface TacticalNavProps {
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    website?: string;
    email?: string;
    calendly?: string;
  };
}

export default function TacticalNav({ socials }: TacticalNavProps) {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass px-10 py-5 rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex items-center gap-6 backdrop-blur-3xl bg-background/40">
        {/* Profile Switcher (Back Arrow) */}
        <Link 
          href="/mentorship"
          className="p-3 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground"
          title="Back to Mentorship"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </Link>

        <div className="h-6 w-[1px] bg-border mx-2" />

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socials?.github && (
            <Link href={socials.github} target="_blank" className="p-3 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground">
              <Github size={20} strokeWidth={2} />
            </Link>
          )}
          {socials?.linkedin && (
            <Link href={socials.linkedin} target="_blank" className="p-3 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground">
              <Linkedin size={20} strokeWidth={2} />
            </Link>
          )}
          {socials?.x && (
            <Link href={socials.x} target="_blank" className="p-3 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground">
              <Twitter size={20} strokeWidth={2} />
            </Link>
          )}
          {socials?.calendly && (
            <Link href={socials.calendly} target="_blank" className="p-3 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground">
              <Calendar size={20} strokeWidth={2} />
            </Link>
          )}
          {socials?.email && (
            <Link href={`mailto:${socials.email}`} className="p-3 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground">
              <Mail size={20} strokeWidth={2} />
            </Link>
          )}
        </div>

        <div className="h-6 w-[1px] bg-border mx-2" />

        {/* Tactical Toggle (Placeholder for extra functionality) */}
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live</span>
        </div>
      </div>
    </motion.div>
  );
}
