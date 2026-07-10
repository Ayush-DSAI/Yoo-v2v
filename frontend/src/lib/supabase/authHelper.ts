import { supabase } from './client';

/**
 * Robustly retrieves the Supabase JWT access token on the client side.
 * Tries:
 * 1. Supabase Client SDK Session (which auto-refreshes if expired).
 * 2. 'sb-access-token' cookie (set during credentials sign-in).
 * 3. Supabase SDK localStorage key 'sb-jgdfeqhfmurzapgqtahg-auth-token'.
 * 4. Fallback localStorage keys ('sb-access-token', 'token').
 */
export async function getSupabaseToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;

    // 1. Supabase JS Client Session (Checks memory/storage, handles auto-refresh)
    try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.access_token) {
            return data.session.access_token;
        }
    } catch (e) {
        console.error('[authHelper] getSession failed:', e);
    }

    // 2. Browser cookies ('sb-access-token')
    try {
        const cookieMatch = document.cookie
            .split('; ')
            .find((row) => row.startsWith('sb-access-token='));
        if (cookieMatch) {
            const val = cookieMatch.split('=')[1];
            if (val && val !== 'null' && val !== 'undefined') {
                return val;
            }
        }
    } catch (e) {
        console.error('[authHelper] cookie retrieval failed:', e);
    }

    // 3. Supabase-specific localStorage key
    try {
        const rawAuth = localStorage.getItem('sb-jgdfeqhfmurzapgqtahg-auth-token');
        if (rawAuth) {
            const parsed = JSON.parse(rawAuth);
            if (parsed?.access_token) {
                return parsed.access_token;
            }
        }
    } catch (e) {
        console.error('[authHelper] localStorage JSON parse failed:', e);
    }

    // 4. Generic localStorage fallbacks
    try {
        const fallbackToken = localStorage.getItem('sb-access-token') || localStorage.getItem('token');
        if (fallbackToken && fallbackToken !== 'null' && fallbackToken !== 'undefined') {
            return fallbackToken;
        }
    } catch (e) {
        console.error('[authHelper] fallback localStorage retrieval failed:', e);
    }

    return null;
}
