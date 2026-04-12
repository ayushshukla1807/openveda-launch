// app/journey/actions.ts

'use server'; 
// FIX: Change import to the SERVER client helper
import { createServerSupabaseClient } from '@/lib/supabase/client'; 
// Import utility function to invalidate cache
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'; 


// Your async function remains largely the same, but uses the correct client creator:
export async function updateCompletedSteps(steps: number[]) {
    // const cookieStore = cookies(); // The helper already calls this if defined to do so
    
    // Call the correct, async server client helper
    const supabase = await createServerSupabaseClient(); // CORRECT CALL

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { throw new Error("User not authenticated"); }
    
    // The rest of your logic
    const { error } = await supabase
      .from('user_progress')
      .update({ completed_steps: steps, updated_at: new Date().toISOString() })
      .eq('user_id', user.id);
    
    if (error) { console.error("Error updating user progress:", error); }
    
    revalidatePath('/journey');
}







// 'use server';
// import { createServerSupabaseClient } from '@/lib/supabase/browser-client'; // NEW IMPORT
// import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';

// export async function updateCompletedSteps(newSteps: number[]) {
//   const cookieStore = cookies();
//   const supabase = createServerSupabaseClient(cookieStore); // NEW CALL

//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) { throw new Error('User not authenticated'); }

  
//   const { error } = await supabase
//     .from('user_progress')
//     .upsert({ user_id: user.id, completed_steps: newSteps, id: 1 })
//     .eq('user_id', user.id);

//   if (error) console.error('Error updating user progress:', error);
//   revalidatePath('/journey');
// }











