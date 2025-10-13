import { createClient } from '@/lib/supabase/server';
import JourneyChecklist from '@/components/ui/JourneyChecklist';
import Link from 'next/link';

// This function now securely fetches the user's progress on the server
async function getProgress() {
  const supabase = createClient();
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
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const initialCompletedSteps = await getProgress();

  if (!user) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold">Login to Start Your Journey</h1>
        <p className="mt-4 text-lg text-muted-foreground">Create an account to save and track your progress across devices.</p>
        <Link href="/login" className="mt-6 inline-flex items-center justify-center h-11 px-8 bg-primary text-primary-foreground rounded-md">
          Login / Sign Up
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Your Open Source Journey</h1>
        <p className="mt-4 text-lg text-muted-foreground">Your progress is saved to your account.</p>
      </div>
      <JourneyChecklist initialCompletedSteps={initialCompletedSteps} />
    </main>
  );
}