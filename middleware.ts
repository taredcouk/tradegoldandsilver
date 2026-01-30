import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.warn('JWT_SECRET is not defined in environment variables');
}
const JWT_SECRET = new TextEncoder().encode(secret || 'temporary-development-only-secret');

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(session, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Session verification failed:', error);
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
  matcher: ['/dashboard/:path*', '/login'],
};
