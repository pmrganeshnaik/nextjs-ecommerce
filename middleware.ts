import { createMiddlewareClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({
    req,
    res,
  })

  const { data: { session } } = await supabase.auth.getSession()

  // Example: Protect routes that require authentication
  if (req.nextUrl.pathname.startsWith('/profile') && !session) {
    const redirectUrl = new URL('/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Example: Redirect authenticated users away from the login page
  if (req.nextUrl.pathname.startsWith('/login') && session) {
    const redirectUrl = new URL('/', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Specify which routes should run this middleware
export const config = {
  matcher: ['/profile', '/login'],
}