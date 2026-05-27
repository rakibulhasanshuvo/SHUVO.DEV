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

  // 2. Create the response with the injected request headers
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const pathname = request.nextUrl.pathname;

  // 3. Only run Supabase auth edge check for /dashboard routes to optimize speed of public pages
  if (pathname.startsWith("/dashboard")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      // If Supabase credentials are not configured, redirect to signup safely
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    try {
      // Sync cookies on the edge
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

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.redirect(new URL("/signup", request.url));
      }
    } catch (error) {
      console.error("Middleware Supabase auth edge error:", error);
      // In case of database connection issues, redirect securely to signup
      return NextResponse.redirect(new URL("/signup", request.url));
    }
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
