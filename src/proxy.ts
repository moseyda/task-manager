import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const session = request.cookies.get('my-custom-session');

    const p = request.nextUrl.pathname;
    const isAuthPage = p.startsWith('/login') || p.startsWith('/register');
    const isProtected = p.startsWith('/tasks') || p.startsWith('/settings') || p === '/';

    if (!session && isProtected) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (session && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/tasks/:path*', '/settings/:path*', '/verify-email', '/login', '/register'],
};
