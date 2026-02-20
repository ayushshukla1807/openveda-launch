// lib/supabase/browser-client.ts

import { createBrowserClient } from '@supabase/ssr'; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createBrowserSupabaseClient = () => {
  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  );
};




// // lib/supabase/browser-client.ts

// import { createBrowserClient } from '@supabase/ssr'; 

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const createBrowserSupabaseClient = () => {
//   return createBrowserClient(
//     supabaseUrl,
//     supabaseKey
//   );
// };





// // lib/supabase/browser-client.ts
// // Note: You must have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set in your .env.local

// import { createBrowserClient } from '@supabase/ssr'; 

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const createBrowserSupabaseClient = () => {
//   return createBrowserClient(
//     supabaseUrl,
//     supabaseKey
//   );
// };