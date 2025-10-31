'use client'

import { FullyQualifiedEvent, GalaxyClient } from './client'
import { Galaxy } from './web/browser'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type FetchOptions = Record<string, unknown>

export interface HttpClient {
  post(apiPath: string, bodyRequest: FetchOptions): Promise<Response>
}
export interface ErrorHandler {
  captureException: (exception: unknown) => void
}

export type GalaxyOptions = {
  httpClient: HttpClient
  errorHandler?: ErrorHandler
  replaceConsoleLog?: boolean
  application: string
  tags?: Array<string>
  apiHost: string
  getUserId: () => string | null
  getSessionId?: () => string
  getContext?: () => Record<string, unknown>
}

declare global {
  interface Window {
    galaxy: GalaxyClient
  }
}

export const useInitGalaxy = (): void => {
  useEffect(() => {
    const galaxyOptions: GalaxyOptions = {
      httpClient: {
        post: async (
          url: string,
          requestBody: Record<string, unknown>
        ): Promise<Response> => {
          type HttpLikeResponse = Response & {
            _transport?: 'beacon' | 'fetch'
            _queued?: boolean
          }

          // Conservative safety margin
          // Beacon and keepalive are limited to payload size
          const LIMIT_BYTES = 60 * 1024

          const json = JSON.stringify(requestBody)
          const blob = new Blob([json], {
            type: 'application/json;charset=UTF-8'
          })

          // If payload too large for beacon/keepalive, use normal fetch (no keepalive)
          const tooLarge = blob.size > LIMIT_BYTES

          // Try beacon first (only if small enough)
          if (
            !tooLarge &&
            typeof navigator !== 'undefined' &&
            'sendBeacon' in navigator
          ) {
            try {
              const sent = navigator.sendBeacon(url, blob)
              if (sent) {
                const synthetic = new Response(null, {
                  status: 202,
                  statusText: 'Queued via beacon'
                }) as HttpLikeResponse
                synthetic._transport = 'beacon'
                synthetic._queued = true // queued, not guaranteed delivered
                return synthetic
              }
              // Fall through to fetch if the UA refused to queue it
              // console.debug('[analytics] beacon refused; falling back')
            } catch {
              // Swallow and fall back to fetch
            }
          }

          // Fallback to fetch
          // - keepalive for small payloads (may complete during navigation)
          // - normal fetch for large payloads (avoid keepalive body limit)
          const useKeepalive = !tooLarge
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: json,
            keepalive: useKeepalive
          })

          ;(res as HttpLikeResponse)._transport = 'fetch'
          return res as HttpLikeResponse
        }
      },
      errorHandler: {
        captureException(exception: unknown): void {
          console.error(exception)
        }
      },
      replaceConsoleLog: false,
      application: 'MARKETING_WEBSITE',
      apiHost:
        process.env.NEXT_PUBLIC_GALAXY_API_ENDPOINT ?? 'http://localhost:3000',
      getUserId: () => null
    }

    const [galaxy, stopGalaxy] = Galaxy.init(galaxyOptions)
    window.galaxy = galaxy

    return () => {
      void stopGalaxy()
    }
  }, [])
}

/**
 * Instrument galaxy onLoad event for this page. Should be used on page components.
 *
 * @param event name of the load event sent to galaxy
 */
export const useGalaxyOnLoad = (event: FullyQualifiedEvent): void => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchParamsStr = searchParams?.toString() || ''

  const loadListener = (): void => {
    if (window.galaxy) {
      window.galaxy.track(event, { interaction: 'trigger' })
    } else {
      setTimeout(loadListener, 500)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      loadListener()
    }
  }, [router.pathname, searchParamsStr, router.isReady])
}

/**
 * Instrument galaxy onFocus event for this page. Should be used on page components.
 *
 * @param event name of the focus event sent to galaxy
 * @param depsArray used to trigger a rerender of the component that will re-run the useEffect
 */
export const useGalaxyOnFocus = (
  event: FullyQualifiedEvent,
  depsArray: Array<unknown>
): void => {
  const listener = (): void => {
    window.galaxy.track(event, { interaction: 'trigger' })
  }

  useEffect(() => {
    window.addEventListener('focus', listener)
    return () => {
      window.removeEventListener('focus', listener)
    }
  }, depsArray)
}

/**
 * Instrument galaxy onBlur event for this page. Should be used on page components.
 *
 * @param event name of the blur events sent to galaxy
 * @param depsArray used to trigger a rerender of the component that will re-run the useEffect
 */
export const useGalaxyOnBlur = (
  event: FullyQualifiedEvent,
  depsArray: Array<unknown>
): void => {
  const listener = (): void => {
    window.galaxy.track(event, { interaction: 'trigger' })
  }

  useEffect(() => {
    window.addEventListener('blur', listener)
    return () => {
      window.removeEventListener('blur', listener)
    }
  }, depsArray)
}

/**
 * Instrument galaxy for this page for load, blur and focus events.
 *
 * @param prefix used to name the events sent to galaxy (`${prefix}.window.load`, `${prefix}.window.blur` and `${prefix}.window.focus`)
 * @param depsArray used to trigger a rerender of the component that will re-run the useEffect
 *
 */
export const useGalaxyOnPage = (
  prefix: string,
  depsArray: Array<unknown> = []
): void => {
  useGalaxyOnLoad(`${prefix}.window.load`)
  useGalaxyOnBlur(`${prefix}.window.blur`, depsArray)
  useGalaxyOnFocus(`${prefix}.window.focus`, depsArray)
}

export const useGalaxyOnClick = (event: FullyQualifiedEvent): (() => void) => {
  return () => {
    window.galaxy.track(event, { interaction: 'click' })
  }
}
