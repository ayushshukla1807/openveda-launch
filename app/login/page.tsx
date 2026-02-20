// app/login/page.tsx

'use client'; // Essential for using Auth UI component

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client'; // Imports the BROWSER client

// Create the browser client instance outside the component (or useMemo if inside)
const supabase = createBrowserSupabaseClient(); 

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-md p-8">
        <Auth
          supabaseClient={supabase} // Passes the correctly instantiated browser client
          appearance={{ theme: ThemeSupa }}
          providers={['github', 'google']} // Example providers
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </div>
    </div>
  );
}