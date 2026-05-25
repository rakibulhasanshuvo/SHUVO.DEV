import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  const headers = new Headers(request.headers);
  headers.set('x-device-type', device.type === 'mobile' ? 'mobile' : 'desktop');

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

// Optionally, configure matcher to only run on specific paths if needed,
// but since we want device type globally, we can apply to most non-static routes.
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
