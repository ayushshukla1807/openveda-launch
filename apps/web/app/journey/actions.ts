// app/journey/actions.ts

'use server'; 

import { createServerSupabaseClient } from '../../lib/supabase/client'; 
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'; 

export async function updateCompletedSteps(steps: number[]) {
    // Authenticate the session
    const supabase = await createServerSupabaseClient(); 
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { 
      throw new Error("User not authenticated"); 
    }
    
    // Save to cookies for server-side rehydration
    const cookieStore = cookies();
    cookieStore.set('openveda_progress', JSON.stringify(steps), { 
      path: '/', 
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    
    revalidatePath('/journey');
}
