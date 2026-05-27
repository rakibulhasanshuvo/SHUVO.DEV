import { createServerClient } from "@supabase/ssr";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';

export async function proxy(request: NextRequest) {
  const { device } = userAgent(request);
  const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

  // 1. Create a request headers clone so we can inject x-device-type
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-device-type', deviceType);

  // 2. Create the initial response with the injected request headers
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Guard: Skip Supabase auth if env vars are not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  // 3. Initialize Supabase SSR Client for middleware cookie syncing
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 4. Authenticate User Session on the Edge
  const { data: { user } } = await supabase.auth.getUser();

  // 5. Protect Admin Dashboard routes from unauthenticated access
  // Strictly enforce authentication for all /dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
