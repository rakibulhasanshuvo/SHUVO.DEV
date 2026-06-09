import { createClient } from '@supabase/supabase-js';

// Mock/dummy Supabase client for clean fallbacks when environment variables are missing or invalid for admin operations
const createDummyAdminClient = () => {
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

export const createAdminSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey || url.includes("rrxqdawevybapiufatei") || url === "undefined" || serviceKey === "undefined") {
    return createDummyAdminClient();
  }

  return createClient(url, serviceKey);
};
