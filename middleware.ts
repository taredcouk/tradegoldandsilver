import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const JWT_SECRET = new TextEncoder().encode(secret);

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // Protect /dashboard and sensitive API routes
  const protectedPaths = ['/dashboard', '/api/messages', '/api/statistics', '/api/users'];
  const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtected) {
    if (!session) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(session, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Session verification failed:', error);
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect from login if already authenticated
  if (request.nextUrl.pathname === '/login' && session) {
    try {
      await jwtVerify(session, JWT_SECRET);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Invalid session, let user stay on login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/messages/:path*', '/api/statistics/:path*', '/api/users/:path*', '/login'],
};
