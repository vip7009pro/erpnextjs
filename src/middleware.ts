import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs'; // Chuyển sang Node.js Runtime

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  console.log('Middleware triggered for:', pathname, 'Token:', token ? 'exists' : 'missing');

  // Kiểm tra khi truy cập trang chủ ("/")
  if (pathname === '/') {
    if (!token) {
      console.log('No token, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      console.log('Token valid, redirecting to /dashboard');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('Token invalid or expired, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Kiểm tra các route bảo vệ (như /dashboard)
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      console.log('No token for /dashboard, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      console.log('Token valid for /dashboard, proceeding');
      return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('Token invalid for /dashboard, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};