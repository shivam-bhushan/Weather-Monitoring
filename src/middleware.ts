import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths that do not require authentication
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

    // Extract token from cookies
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        try {
            // Verify if token is valid
            jwt.verify(token, process.env.TOKEN_SECRET!);
            // Redirect to home if valid token exists and user tries to access login/signup
            return NextResponse.redirect(new URL('/', request.url));
        } catch (err) {
            // If token is invalid, let the user access login/signup
        }
    }

    if (!isPublicPath && !token) {
        // Redirect to login if trying to access protected routes without a valid token
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',          // Protect home page
        '/profile',   // Protect profile page
        '/login',     // Allow login without redirect if no valid token
        '/signup',    // Allow signup without redirect if no valid token
        '/verifyemail'// Allow verify email without redirect if no valid token
    ],
};
