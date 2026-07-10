import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (accessToken) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    );

    await supabase.auth.signOut();
  }

  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');

  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}
