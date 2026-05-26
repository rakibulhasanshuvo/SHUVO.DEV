import { createBrowserClient } from "@supabase/ssr";

/**
 * Initializes the Supabase client for Browser/Client Components.
 * This file is strictly client-safe and does not import next/headers.
 */
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
