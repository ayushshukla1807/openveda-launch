import { createServerSupabaseClient } from '@/lib/supabase/browser-client'; // NEW IMPORT
import JourneyChecklist from '@/components/ui/JourneyChecklist';
import Link from 'next/link';
import { cookies } from 'next/headers';

async function getProgress() {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient(cookieStore); // NEW CALL
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  
  const { data } = await supabase.from('user_progress').select('completed_steps').eq('user_id', user.id).single();
  return data?.completed_steps || [];
}

export default async function JourneyPage() {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient(cookieStore); // NEW CALL
  const { data: { user } } = await supabase.auth.getUser();
  const initialCompletedSteps = await getProgress();

  if (!user) {
    return (
      <main className="container mx-auto p-8 text-center mt-24">
        <h1 className="text-4xl font-bold text-white">Login to Start Your Journey</h1>
        <p className="mt-4 text-lg text-gray-300">Create an account to save and track your progress across devices.</p>
        <Link href="/login" className="mt-8 inline-flex items-center justify-center h-11 px-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors">
          Login / Sign Up
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Your Open Source Journey</h1>
        <p className="mt-4 text-lg text-gray-300">Your progress is saved to your account.</p>
      </div>
      <JourneyChecklist initialCompletedSteps={initialCompletedSteps} />
    </main>
  );
}




