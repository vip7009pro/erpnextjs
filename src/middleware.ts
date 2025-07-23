import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  console.log('Middleware triggered for:', pathname, 'Token:', token ? 'exists' : 'missing');

  if (pathname === '/') {
    if (!token) {
      console.log('No token for /, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log('Token valid for /, payload:', payload, 'Redirecting to /dashboard');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Token verification failed for /:', error.message, 'Redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    if (!token) {
      console.log('No token for /dashboard, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log('Token valid for /dashboard, payload:', payload, 'Proceeding');
      return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Token verification failed for /dashboard:', error.message, 'Redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if(pathname === '/login'){
    if(token){
      console.log('Token exists for /login, redirecting to /dashboard');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }
  console.log('No middleware rules matched for:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};