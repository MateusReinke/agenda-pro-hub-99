import { NextResponse, type NextRequest } from 'next/server';
const protectedRoutes = ['/dashboard', '/appointments', '/clients', '/professionals', '/services', '/settings'];
export function middleware(req: NextRequest) {
  if (protectedRoutes.some((p) => req.nextUrl.pathname.startsWith(p)) && !req.cookies.get('beleza_session')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*', '/appointments/:path*', '/clients/:path*', '/professionals/:path*', '/services/:path*', '/settings/:path*'] };
