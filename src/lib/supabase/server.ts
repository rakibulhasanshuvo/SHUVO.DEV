import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Mock/dummy Supabase client for clean fallbacks when environment variables are missing or invalid on the server
const createDummyServerClient = () => {
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
 * Initializes the Supabase client for Server Components (RSC), 
 * Route Handlers, and Server Actions with secure Next.js 16 cookie management.
 */
export const createServerSupabaseClient = async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("rrxqdawevybapiufatei") || url === "undefined" || key === "undefined") {
    return createDummyServerClient();
  }

  const cookieStore = await cookies();

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
