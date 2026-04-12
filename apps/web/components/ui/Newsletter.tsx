'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm">
      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-6 text-center md:text-left">Stay Updated</h4>
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status !== 'idle'}
          className="w-full bg-muted/50 border border-border px-6 py-4 rounded-2xl text-foreground placeholder:text-muted-foreground/30 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status !== 'idle'}
          className="absolute right-2 top-2 bottom-2 bg-primary text-primary-foreground px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          {status === 'loading' ? (
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            'Join'
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-10 left-0 right-0 text-center md:text-left"
            >
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Welcome to the inner circle! 🚀</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
