// lib/supabase/client.ts

'use server'; // Required for server-side code execution

import { cookies } from 'next/headers'; 

class MockServerSupabaseClient {
  cookieStore: any;
  
  constructor(cookieStore: any) {
    this.cookieStore = cookieStore;
  }

  auth = {
    getUser: async () => {
      const sessionCookie = this.cookieStore.get('openveda_session');
      if (!sessionCookie || !sessionCookie.value) {
        return { data: { user: null }, error: null };
      }
      try {
        const user = JSON.parse(sessionCookie.value);
        return { data: { user }, error: null };
      } catch {
        return { data: { user: null }, error: null };
      }
    },
    getSession: async () => {
      const sessionCookie = this.cookieStore.get('openveda_session');
      if (!sessionCookie || !sessionCookie.value) {
        return { data: { session: null }, error: null };
      }
      try {
        const user = JSON.parse(sessionCookie.value);
        return { data: { session: { user } }, error: null };
      } catch {
        return { data: { session: null }, error: null };
      }
    }
  };

  from(table: string) {
    return {
      select: (columns: string = '*') => {
        return {
          eq: (field: string, value: any) => {
            return {
              single: async () => {
                if (table === 'user_progress') {
                  const progressCookie = this.cookieStore.get('openveda_progress');
                  const completed = progressCookie && progressCookie.value 
                    ? JSON.parse(progressCookie.value) 
                    : [];
                  return { data: { completed_steps: completed }, error: null };
                }
                return { data: null, error: null };
              },
              order: (orderField: string, options?: any) => {
                return {
                  async then(resolve: any) {
                    resolve({ data: [], error: null });
                  }
                };
              },
              async then(resolve: any) {
                resolve({ data: [], error: null });
              }
            };
          },
          async then(resolve: any) {
            resolve({ data: [], error: null });
          }
        };
      }
    };
  }
}

// FIX: Must use a clear NAMED export and be async for Server Action compatibility
export async function createServerSupabaseClient() { 
  const cookieStore = cookies();
  return new MockServerSupabaseClient(cookieStore) as any;
}