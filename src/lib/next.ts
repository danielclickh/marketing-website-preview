export const IS_PRODUCTION =
  process?.env?.NEXT_IS_PROD === 'true' ||
  (process?.env?.VERCEL_ENV || process?.env?.NODE_ENV) === 'production'

export const BASE_URL =
  process?.env?.NEXT_PUBLIC_WEBSITE_URL ||
  process?.env?.VERCEL_URL ||
  'clickhouse.com'

export const BASE_PROTOCOL = process?.env?.NEXT_PUBLIC_PROTOCOL || 'https://'

export const BASE_URL_AND_PROTOCOL = `${BASE_PROTOCOL}${BASE_URL}`

export function isValidUrl(url: string | null | undefined) {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function relativeUrl(absolute: string) {
  const url = new URL(absolute, BASE_URL_AND_PROTOCOL)
  return url.pathname + url.search + url.hash
}

export function absoluteUrl(relative: string) {
  return new URL(relativeUrl(relative), BASE_URL_AND_PROTOCOL).toString()
}

export function isLocalUrl(url: string) {
  if (!isValidUrl(url)) return absoluteUrl(url)
  return url.startsWith(relativeUrl('/'))
}
