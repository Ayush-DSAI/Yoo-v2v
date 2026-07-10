import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from './types';

export async function createServerClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${cookieStore.get('sb-access-token')?.value || ''}`,
        },
      },
    }
  );
}

export async function getSession() {
  const supabase = await createServerClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    return null;
  }
  
  return session;
}

export async function getUser() {
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  return user;
}
