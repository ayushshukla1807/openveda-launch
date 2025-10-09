import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

export default async function AuthButton() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      {user.user_metadata?.avatar_url && (
        <Image src={user.user_metadata.avatar_url} alt="User Avatar" width={32} height={32} className="rounded-full border-2 border-gray-600" />
      )}
      <form action="/auth/sign-out" method="post">
        <button className="py-2 px-4 rounded-md text-sm bg-gray-700 hover:bg-gray-600">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md text-sm bg-green-500 hover:bg-green-600 font-semibold"
    >
      Login / Sign Up
    </Link>
  );
}