'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) return <div className="w-20 h-8 animate-pulse bg-white/5 rounded-xl" />;

  if (user) {
    return (
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Dashboard</Link>
        <button 
          onClick={handleSignOut}
          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
      >
        Login
      </Link>
      <Link
        href="/login"
        className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20"
      >
        Sign Up
      </Link>
    </div>
  );
}