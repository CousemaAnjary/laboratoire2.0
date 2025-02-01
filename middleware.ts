import { NextResponse } from 'next/server'

export function middleware() {
    const response = NextResponse.next()
    // Add custom middleware logic here
    return response
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)'],
}