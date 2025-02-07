import { RedirectToSignIn } from '@clerk/nextjs'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtected = createRouteMatcher([
  '/dashboard(.*)',
  '/collection(.*)',
  '/journal(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  if (!userId && isProtected(req)) {
    return RedirectToSignIn()
  }
  return NextResponse.next()
})

// shield and bot detection - arcjet


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
