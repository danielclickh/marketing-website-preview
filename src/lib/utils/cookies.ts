export function getBrowserCookie(name: string): undefined | string {
  'use client'

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts && parts.length === 2) {
    const value = parts.pop()?.split(';').shift()
    if (value) {
      return decodeURIComponent(value)
    }
  }

  return undefined
}

export function setBrowserCookie(
  name: string,
  value: string,
  options?: {
    days?: number
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
  }
) {
  'use client'

  const isHttps = window.location.protocol === 'https:'
  const secure = options?.secure ?? isHttps

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options?.days) {
    const date = new Date()
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000)
    cookieString += `; expires=${date.toUTCString()}`
  }

  cookieString += `; path=${options?.path ?? '/'}`
  if (options?.domain) cookieString += `; domain=${options.domain}`
  if (secure) cookieString += '; secure'
  if (options?.sameSite) cookieString += `; samesite=${options.sameSite}`

  document.cookie = cookieString
}
