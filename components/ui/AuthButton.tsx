// components/ui/AuthButton.tsx

// FIX: Correct NAMED import for the SERVER client helper
import { createServerSupabaseClient } from '@/lib/supabase/client'; 
import Link from 'next/link';
import React from 'react';

export default async function AuthButton() {
  // FIX: Must use 'await' with the async server helper function
  const supabase = await createServerSupabaseClient(); 

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return (
      <form action="/auth/sign-out" method="post">
        <span>Hello, {user.email}!</span>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    );
  }

  return (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}




// // components/ui/AuthButton.tsx

// // FIX: Correct import path for the SERVER client helper
// import { createServerSupabaseClient } from '@/lib/supabase/client'; 
// import Link from 'next/link';

// export default async function AuthButton() {
//   // FIX: Must use 'await' when calling the now-async helper function
//   const supabase = await createServerSupabaseClient(); 

//   const { data: { user } } = await supabase.auth.getUser();

//   if (user) {
//     return (
//       <form action="/auth/sign-out" method="post">
//         <span>Hello, {user.email}!</span>
//         <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
//           Logout
//         </button>
//       </form>
//     );
//   }

//   return (
//     <Link
//       href="/login"
//       className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
//     >
//       Login
//     </Link>
//   );
// }