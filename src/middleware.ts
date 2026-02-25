import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt, COOKIE_NAME } from '@/lib/auth';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only guard /admin paths
    if (!pathname.startsWith('/admin')) return NextResponse.next();

    const isLoginPage = pathname === '/admin/login';
    const token = req.cookies.get(COOKIE_NAME)?.value;

    // Logged-in user visiting login page → redirect to dashboard
    if (token && isLoginPage) {
        const payload = await verifyJwt(token);
        if (payload) return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    // Protected page without token → redirect to login
    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Protected page with token → verify
    if (token && !isLoginPage) {
        const payload = await verifyJwt(token);
        if (!payload) {
            const res = NextResponse.redirect(new URL('/admin/login', req.url));
            res.cookies.delete(COOKIE_NAME);
            return res;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
