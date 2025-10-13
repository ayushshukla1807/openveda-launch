'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Redirect to the journey page after successful login
        router.refresh();
        router.push('/journey');
      }
    });
    return () => subscription.unsubscribe();
  }, [router, supabase]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md">
         <div className="text-center mb-6">
            <Link href="/" className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              OpenVeda
            </Link>
         </div>
        <div className="bg-card border rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-card-foreground mb-6">Login / Sign Up</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={['github', 'google', 'gitlab']} // These match the providers you enabled
            socialLayout="horizontal"
          />
        </div>
      </div>
    </main>
  );
}