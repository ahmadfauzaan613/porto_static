import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('admin_session')

  // ✅ BIARKAN LOGIN PAGE
  if (pathname === '/admin') {
    return NextResponse.next()
  }

  // 🔒 PROTECT SEMUA /admin/* SELAIN LOGIN
  if (!session && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
