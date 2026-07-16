import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const session = request.cookies.get('admin_session');

        // Check if the cookie exists and has the expected value
        if (session && session.value === 'authenticated') {
            return NextResponse.next();
        }

        // If not authenticated, redirect to the new login page
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Optional: If user is already logged in and tries to access /login, redirect to /admin
    if (request.nextUrl.pathname === '/login') {
        const session = request.cookies.get('admin_session');
        if (session && session.value === 'authenticated') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
