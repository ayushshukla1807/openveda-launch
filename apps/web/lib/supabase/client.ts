// lib/supabase/client.ts

'use server'; // Required for server-side code execution

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'; 

// FIX: Must use a clear NAMED export and be async for Server Action compatibility
export async function createServerSupabaseClient() { 
    const cookieStore = cookies();
    // Helper automatically uses SUPABASE_URL and SUPABASE_ANON_KEY (or SERVICE_KEY) from .env
    return createServerComponentClient({ cookies: () => cookieStore });
}







// 







// 'use server'; // Must be marked as server code

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers'; 

// export async function createServerSupabaseClient() { 
//     const cookieStore = cookies();
    
//     // The createServerComponentClient helper automatically looks for 
//     // SUPABASE_URL and SUPABASE_SERVICE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
//     return createServerComponentClient({ 
//         cookies: () => cookieStore 
//     });
// }












// // lib/supabase/client.ts

// 'use server'; 

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers'; 

// // Environment variables are read here.
// const supabaseUrl = process.env.SUPABASE_URL!; 
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!; 
// // If you are using anon key for safety:
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export async function createServerSupabaseClient() { 
//     const cookieStore = cookies();
    
//     // FIX: Explicitly pass the environment variables (using Anon Key which should be NEXT_PUBLIC)
//     return createServerComponentClient({ 
//         supabaseUrl,
//         supabaseKey: supabaseAnonKey, // Use the NEXT_PUBLIC_SUPABASE_ANON_KEY here
//         cookies: () => cookieStore 
//     });
// }

// // lib/supabase/client.ts

// 'use server'; 
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers'; 

// export async function createServerSupabaseClient() { 
//     // The createServerComponentClient helper automatically looks for 
//     // SUPABASE_URL and SUPABASE_SERVICE_KEY (or ANON_KEY)
//     const cookieStore = cookies();
//     return createServerComponentClient({ cookies: () => cookieStore });
// }



// // // lib/supabase/client.ts

// // 'use server'; // Required to prevent build errors with next/headers

// // import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// // import { cookies } from 'next/headers'; 

// // // Must be async because it is marked as a 'use server' Server Action
// // export async function createServerSupabaseClient() { 
// //     const cookieStore = cookies();
// //     return createServerComponentClient({ cookies: () => cookieStore });
// // }