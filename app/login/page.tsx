'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN') {
      router.refresh(); // Refresh the page to update server components
      router.push('/');
    }
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Welcome to OpenVeda</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={['github', 'google', 'gitlab']} // Add more here as you configure them
            socialLayout="horizontal"
          />
        </div>
      </div>
    </main>
  );
}