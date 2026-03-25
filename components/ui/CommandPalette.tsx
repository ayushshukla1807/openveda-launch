'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const commands = [
    { name: 'Discover Organizations', href: '/organizations', icon: '🔭' },
    { name: 'My Journey Dashboard', href: '/dashboard', icon: '🚀' },
    { name: 'Founder\'s Corner', href: '/founder', icon: '👤' },
    { name: 'The Master Journey', href: '/journey', icon: '📍' },
    { name: 'GSoC 2026 Update', href: '/organizations?program=gsoc', icon: '🔥' },
  ];

  const filtered = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-background/40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl glass rounded-[2.5rem] border-border shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <input
              autoFocus
              className="w-full bg-transparent text-2xl font-black tracking-tight text-foreground placeholder-muted-foreground/30 outline-none"
              placeholder="Where do you want to go?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="max-h-[50vh] overflow-y-auto p-4 space-y-2">
            {filtered.map((cmd) => (
              <button
                key={cmd.href}
                onClick={() => {
                  router.push(cmd.href);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted text-left group transition-all"
              >
                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{cmd.icon}</span>
                <span className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors">{cmd.name}</span>
                <span className="ml-auto text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Jump →</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-muted-foreground font-bold italic">No results found for "{query}"</p>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-muted flex items-center justify-between">
            <div className="flex gap-4">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">↑↓ Navigate</span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">↵ Select</span>
            </div>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-background px-2 py-1 rounded-md border border-border">Esc to Close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
