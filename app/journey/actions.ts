'use server'; // This marks the file as Server Actions

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateCompletedSteps(newSteps: number[]) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated');
    return;
  }

  // 'upsert' will either create a new row or update an existing one
  const { error } = await supabase
    .from('user_progress')
    .upsert({ user_id: user.id, completed_steps: newSteps })
    .eq('user_id', user.id);

  if (error) {
    console.error('Error updating user progress:', error);
  }
  
  revalidatePath('/journey'); // Tell Next.js to refresh the page data
}