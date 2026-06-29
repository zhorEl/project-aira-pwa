import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client.
 *
 * The UI currently runs on mock data (see src/lib/mock-data.ts). This client is
 * scaffolded and ready: set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 * in .env.local to wire it to a real backend. Returns null when not configured so
 * callers can gracefully fall back to mock data.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}

export const isSupabaseConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
