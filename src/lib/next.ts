export const IS_PRODUCTION =
  process?.env?.NEXT_IS_PROD === 'true' ||
  (process?.env?.VERCEL_ENV || process?.env?.NODE_ENV) === 'production'

export const BASE_PROTOCOL = process?.env?.NEXT_PUBLIC_PROTOCOL || 'https://'

// The app url WITHOUT protocol
export const BASE_URL = (() => {
  let base = process?.env?.VERCEL_URL || process?.env?.NEXT_PUBLIC_WEBSITE_URL
  if (!base || !isValidUrl(base)) {
    base = 'clickhouse.com'
  }

  // Apply default protocol
  if (!base.startsWith('http') && !base.startsWith('//')) {
    base = `${BASE_PROTOCOL}${base}`
  }

  const obj = new URL(base)
  return obj.hostname + (obj.port.length ? ':' + obj.port : '')
})()

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

export function absoluteOptimizedImageUrl(
  imageUrl: string,
  width: number,
  height: number,
  quality?: number
) {
  return absoluteUrl(
    `/_next/image?url=${encodeURIComponent(imageUrl)}&w=${width}&h=${height}&q=${quality ?? 80}`
  )
}

export function relativeOptimizedImageUrl(
  imageUrl: string,
  width: number,
  height: number,
  quality?: number
) {
  return relativeUrl(
    absoluteOptimizedImageUrl(imageUrl, width, height, quality)
  )
}

export function isLocalUrl(url: string) {
  try {
    const urlObj = new URL(url)
    const localObj = new URL(BASE_URL_AND_PROTOCOL)
    return urlObj.origin === localObj.origin
  } catch {
    return false
  }
}
