'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const supabase = createBrowserSupabaseClient();

export default function LoginPage() {
  const router = useRouter();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }
    if (isSignUp && !fullName) {
      showToast("Please enter your full name", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Small mock network delay to feel extremely real and satisfying
      await new Promise(resolve => setTimeout(resolve, 800));

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(fullName)}`
            }
          }
        });
        
        if (error) {
          showToast(error.message, "error");
        } else {
          // Success! Update local mock user to store full name
          const mockUser = {
            id: 'mock-user-uuid-12345678',
            email,
            user_metadata: { 
              full_name: fullName, 
              avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(fullName)}` 
            }
          };
          localStorage.setItem('openveda_user', JSON.stringify(mockUser));
          document.cookie = `openveda_session=${encodeURIComponent(JSON.stringify(mockUser))}; path=/; max-age=31536000; SameSite=Lax`;
          
          showToast("Session initialized successfully!", "success");
          setTimeout(() => {
            router.push('/dashboard');
          }, 600);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          showToast(error.message, "error");
        } else {
          showToast("Welcome back, contributor!", "success");
          setTimeout(() => {
            router.push('/dashboard');
          }, 600);
        }
      }
    } catch (err) {
      showToast("Authentication sync failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = {
      id: 'mock-user-uuid-12345678',
      email: 'demo@openveda.in',
      user_metadata: { 
        full_name: 'Demo Contributor', 
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Demo' 
      }
    };
    localStorage.setItem('openveda_user', JSON.stringify(mockUser));
    document.cookie = `openveda_session=${encodeURIComponent(JSON.stringify(mockUser))}; path=/; max-age=31536000; SameSite=Lax`;
    
    showToast("Logged in as Demo Contributor", "success");
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* High-Fi Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[180px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-8 z-50 px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl ${
              toast.type === 'success' 
                ? 'bg-emerald-500/10 border border-emerald-500 text-emerald-400 glass' 
                : 'bg-rose-500/10 border border-rose-500 text-rose-400 glass'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg px-4"
      >
        <div className="glass p-12 md:p-16 rounded-[3.5rem] border-border shadow-2xl relative overflow-hidden">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              {isSignUp ? "Create your " : "Welcome back, "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                {isSignUp ? "Account" : "Contributor"}
              </span>
            </h1>
            <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px] space-x-2">
              <span>OpenVeda</span> • <span>Launchpad v2.0</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ayush Shukla"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-muted/30 glass border-border px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none transition-all text-foreground font-medium"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted/30 glass border-border px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none transition-all text-foreground font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted/30 glass border-border px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none transition-all text-foreground font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-background font-black uppercase tracking-widest text-xs py-5 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center shadow-lg border-border"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-4 border-background border-t-transparent rounded-full animate-spin" />
              ) : (
                isSignUp ? "Initialize Account" : "Access Console"
              )}
            </button>
          </form>

          {/* Quick Demo Option for recruiting review */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <span className="relative bg-background/50 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground glass rounded-full">
              or
            </span>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-widest text-xs py-5 rounded-2xl transition-all hover:bg-primary/20 hover:scale-[1.02] flex items-center justify-center glass"
          >
            Instant Demo Account
          </button>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors underline decoration-2 underline-offset-4"
            >
              {isSignUp ? "Already have an account? Sign In" : "New to open source? Create Account"}
            </button>
          </div>

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