import { createBrowserClient } from "@supabase/ssr";

// Mock/dummy Supabase client for clean fallbacks when environment variables are missing or invalid
const createDummyClient = () => {
  const dummySession = { data: { session: null }, error: null };
  const dummyUser = { data: { user: null }, error: null };
  
  const dummyQuery: any = {
    select: () => dummyQuery,
    insert: () => dummyQuery,
    update: () => dummyQuery,
    delete: () => dummyQuery,
    eq: () => dummyQuery,
    order: () => dummyQuery,
    limit: () => dummyQuery,
    single: () => Promise.resolve({ data: null, error: null }),
    then: (resolve: any) => resolve({ data: [], error: null }),
  };

  return {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getUser: () => Promise.resolve(dummyUser),
      getSession: () => Promise.resolve(dummySession),
      signInWithPassword: () => Promise.resolve({ data: {}, error: new Error("Supabase is not configured.") }),
      signUp: () => Promise.resolve({ data: {}, error: new Error("Supabase is not configured.") }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => dummyQuery,
      insert: () => dummyQuery,
      update: () => dummyQuery,
      delete: () => dummyQuery,
    }),
    channel: () => ({
      on: () => ({
        subscribe: () => ({
          unsubscribe: () => {},
        }),
      }),
    }),
  } as any;
};

/**
 * Initializes the Supabase client for Browser/Client Components.
 * This file is strictly client-safe and does not import next/headers.
 */
export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("rrxqdawevybapiufatei") || url === "undefined" || key === "undefined") {
    if (typeof window !== "undefined") {
      console.warn("Supabase client is running in fallback/dummy mode. URL is missing or pointing to the paused project rrxqdawevybapiufatei.");
    }
    return createDummyClient();
  }

  return createBrowserClient(url, key);
};
