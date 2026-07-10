import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      const cookieStore = await cookies();
      cookieStore.set('sb-access-token', data.session.access_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: false,
        sameSite: 'lax',
      });
      cookieStore.set('sb-refresh-token', data.session.refresh_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: false,
        sameSite: 'lax',
      });
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/dashboard`);
}
