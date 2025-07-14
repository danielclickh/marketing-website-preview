import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    // Matches all request paths except for the following:
    // - api (excludes API routes)
    // - _next/static (excludes static files)
    // - _next/image (excludes image optimization files)
    // - favicon.ico (excludes favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}

// This i18nRedirectionMap defines path-based redirections based on the user's country code.
//
// Structure:
// - Keys are ISO 3166-1 alpha-2 country codes (e.g., 'JP' for Japan).
// - Each country code maps to an object, where:
//   - Keys are original paths that should trigger a redirection (e.g., '/' or '/use-cases').
//   - Values are the target paths to redirect users to (e.g., '/jp' or '/jp/use-cases').
//
// To add a new redirection for a country:
// - Add a new entry for the country code (if it doesn't exist).
// - Inside the country object, add each original path as a key and its destination path as the value.
//
// Example:
// 'FR': {
//   '/': '/fr',
//   '/contact': '/fr/contact'
// }
const i18nRedirectionMap: Record<string, Record<string, string>> = {
  JP: {
    '/': '/jp',
    '/clickhouse': '/jp/clickhouse',
    '/cloud': '/jp/cloud',
    '/company/contact': '/jp/company/contact',
    '/use-cases': '/jp/use-cases',
    '/use-cases/data-warehousing': '/jp/use-cases/business-intelligence',
    '/use-cases/observability': '/jp/use-cases/logging-and-metrics',
    '/use-cases/machine-learning-and-data-science':
      '/jp/use-cases/machine-learning-and-data-science',
    '/use-cases/real-time-analytics': '/jp/use-cases/real-time-analytics'
  }
}

export function middleware(request: NextRequest) {
  const cookieKey = 'user-country-code-v3'

  // Get the country code from the request's geo data (ISO 3166-1 alpha-2 format)
  // Note: geo data is only available on Vercel deployment; defaults to 'unknown' otherwise
  const cookieCountryCode = request.cookies.get(cookieKey)?.value
  const countryCode =
    request.nextUrl.searchParams.get('country')?.toUpperCase() ||
    cookieCountryCode ||
    request.geo?.country ||
    'unknown'

  let response: null | NextResponse<any> = NextResponse.next()

  // Check if there are redirections set up for the user’s country
  if (i18nRedirectionMap.hasOwnProperty(countryCode)) {
    // Retrieve the redirection map for the specific country code
    const redirects = i18nRedirectionMap[countryCode]

    // If the current request path is included in the redirection map
    if (redirects.hasOwnProperty(request.nextUrl.pathname)) {
      // Get the destination URL for redirection
      const destination = redirects[request.nextUrl.pathname]

      // Create the target destination url
      const destinationUrl = new URL(destination, request.nextUrl)

      // Preserve search params
      request.nextUrl.searchParams.forEach((value, key) => {
        destinationUrl.searchParams.set(key, value)
      })

      // Remove the country switching param
      destinationUrl.searchParams.delete('country')

      // Create a redirect response
      response = NextResponse.redirect(destinationUrl)
    }
  }

  response.cookies.set(cookieKey, countryCode)
  return response
}
