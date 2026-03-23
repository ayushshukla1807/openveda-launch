'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const supabase = createBrowserSupabaseClient();

export default function LoginPage() {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass p-12 rounded-[3rem] border-border shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
              Join the <span className="text-primary">Revolution</span>
            </h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
              OpenVeda • Launchpad v2.0
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsla(var(--primary), 1)',
                    brandAccent: 'hsla(var(--primary), 0.8)',
                    inputBackground: 'transparent',
                    inputText: 'hsla(var(--foreground), 1)',
                    inputPlaceholder: 'hsla(var(--muted-foreground), 1)',
                    inputBorder: 'hsla(var(--border), 1)',
                    inputBorderFocus: 'hsla(var(--primary), 1)',
                    inputBorderHover: 'hsla(var(--border), 1)',
                  },
                }
              },
              className: {
                button: 'font-black tracking-widest uppercase text-[10px] py-4 rounded-2xl transition-all hover:scale-[1.02!important] border-border',
                input: 'glass border-border px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none transition-all text-foreground',
                label: 'text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1',
              }
            }}
            providers={['github', 'google']}
            redirectTo={origin ? `${origin}/auth/callback` : undefined}
          />

          <div className="mt-12 pt-8 border-t border-border text-center">
             <p className="text-muted-foreground/30 text-[10px] font-black tracking-widest uppercase">
               © 2026 • BUILT FOR IMPACT
             </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}