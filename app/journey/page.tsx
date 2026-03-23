import { createServerSupabaseClient } from '@/lib/supabase/client';
import JourneyChecklist from '@/components/ui/JourneyChecklist';
import Link from 'next/link';
import { motion } from 'framer-motion';


async function getProgress() {
  const supabase = await createServerSupabaseClient(); 
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  
  const { data } = await supabase
    .from('user_progress')
    .select('completed_steps')
    .eq('user_id', user.id)
    .single();
  return data?.completed_steps || [];
}

export default async function JourneyPage() {
  const supabase = await createServerSupabaseClient(); 
  const { data: { user } } = await supabase.auth.getUser();
  const initialCompletedSteps = await getProgress();

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-mesh-gradient" />
        </div>

        <div className="relative z-10 glass p-16 rounded-[4rem] border-border text-center max-w-2xl px-12">
          <h1 className="text-6xl font-black tracking-tight text-foreground mb-6">
            Lock in your <span className="text-primary italic">Progress</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium mb-12">
            Sign in to access your personalized roadmap and sync your open-source journey across all your devices.
          </p>
          <Link href="/login" className="bg-foreground text-background font-black px-12 py-5 rounded-3xl text-sm uppercase tracking-[0.2em] hover:scale-110 transition-transform">
            Initialize Session
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center mb-24">
          <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Operation Open Source</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            Your <span className="text-foreground/20 italic">Journey</span>
          </h1>
          <p className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
            From first commit to industry leadership. Track every milestone on your path to open-source mastery.
          </p>
        </div>

        <div className="glass p-12 rounded-[3.5rem] border-border shadow-2xl">
          <JourneyChecklist initialProgress={initialCompletedSteps} />
        </div>
      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • BUILT FOR IMPACT</p>
      </footer>
    </main>
  );
}
