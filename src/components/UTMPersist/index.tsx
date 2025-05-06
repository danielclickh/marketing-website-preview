import { Galaxy } from '@/lib/galaxy/web/browser'
import { Experiment, Result } from '@growthbook/growthbook'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type UTMs = {
  [key: string]: string
}

export const updateLinks = (
  experimentId?: string,
  variationId?: string,
  target?: string
) => {
  let links = Array.from(document.querySelectorAll('a'))
  if (target) {
    links = Array.from(document.querySelectorAll(`${target} a`))
  }
  for (const link of links) {
    if (link.hostname.includes('.cloud')) {
      link.href = appendUTMsToLink(link.href)
      link.href = appendGalaxySessionIDToLink(link.href)
      link.href = appendPagePathsToLink(link.href)
      link.href = appendGoogleAnalyticsCookieToLink(link.href)
      if (experimentId && variationId) {
        link.href = appendExperimentToLink(link.href, experimentId, variationId)
      }
    }
  }
}

export const onExperimentViewed = (
  experiment: Experiment<any>,
  result: Result<any>
) => {
  const experimentId = experiment.key
  const variationId = result.key
  updateLinks(experimentId, variationId)
}

const UTMPersist = () => {
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmValues: UTMs = {}

    // Convert iterator to array
    const entries = Array.from(urlParams.entries())
    for (const [key, value] of entries) {
      if (key.startsWith('utm_') || key === 'gclid') {
        utmValues[key] = value
      }
    }

    if (Object.keys(utmValues).length > 0) {
      storeUTMsInStorage(utmValues)
    }

    // Check for origPath and store if not present and path does not include '/marketo-forms'
    const currentPath = window.location.pathname
    if (
      !localStorage.getItem('origPath') &&
      !currentPath.includes('/marketo-forms')
    ) {
      localStorage.setItem('origPath', currentPath)
    }

    updateLinks()

    const handleRouteChange = () => {
      updateLinks()
    }

    const handleMessageEvent = (event: MessageEvent<any>) => {
      // Securiti.ai cookies accepted event
      if (event.data.message === 'consent_given') {
        updateLinks()
      }
    }

    const pollGoogleAnalyticsCookie = continuouslyCheckGoogleAnalyticsCookie({
      intervalTimeout: 750, // Check every 750 millisecond(s)
      stopAfter: 30000, // Stop checking after 30 second(s)
      callback() {
        updateLinks()
      }
    })

    pollGoogleAnalyticsCookie.start()
    router.events.on('routeChangeComplete', handleRouteChange)
    window.addEventListener('message', handleMessageEvent)

    return () => {
      pollGoogleAnalyticsCookie.stop()
      router.events.off('routeChangeComplete', handleRouteChange)
      window.removeEventListener('message', handleMessageEvent)
    }
  }, [])

  return null
}

export default React.memo(UTMPersist)

export function getGoogleAnalyticsCookie(): null | string {
  // Get all cookies in the format "cookieName=cookieValue; ..."
  const cookies = document.cookie.split(';')

  // Loop through each cookie
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()

    // Check if the cookie starts with "_ga="
    if (cookie.startsWith('_ga=')) {
      // Return the value part, which is everything after "_ga="
      return cookie.substring(4)
    }
  }

  return null
}

export function continuouslyCheckGoogleAnalyticsCookie({
  callback,
  intervalTimeout = 1000,
  stopAfter = 10000
}: {
  callback?: Function
  intervalTimeout?: number
  stopAfter?: false | number
} = {}) {
  let intervalId: number | null = null

  const stop = () => {
    if (intervalId) {
      window.clearInterval(intervalId)
      intervalId = null
    }
  }

  const start = () => {
    const startedAt = Date.now()

    intervalId = window.setInterval(() => {
      const now = Date.now()

      // If the ga cookie returns a value, stop the loop.
      // Or stop after 5 seconds if no value has been returned.
      if (
        getGoogleAnalyticsCookie() ||
        (stopAfter !== false && now - startedAt >= stopAfter)
      ) {
        stop()
        if (callback) callback()
      }
    }, intervalTimeout)
  }

  return {
    start,
    stop
  }
}

export function appendGoogleAnalyticsCookieToLink(url: string): string {
  const cookieValue = getGoogleAnalyticsCookie()

  if (!cookieValue) return url

  const urlObject = new URL(url)
  urlObject.searchParams.set('utm_ga', cookieValue)
  return urlObject.toString()
}

// Utility function to append UTMs to a link
export function appendUTMsToLink(url: string): string {
  const utms = getUTMsFromStorage()
  const urlObject = new URL(url)

  // Append UTMs to links that contain ".cloud"
  if (utms) {
    for (const [key, value] of Object.entries(utms)) {
      urlObject.searchParams.set(key, value)
    }
  }

  return urlObject.toString()
}

export function appendGalaxySessionIDToLink(url: string): string {
  const galaxy_id = Galaxy.getGalaxySessionId()
  const urlObject = new URL(url)

  // Append galaxy session id to links that contain ".cloud"
  if (galaxy_id) {
    urlObject.searchParams.set('glxid', galaxy_id)
  }

  return urlObject.toString()
}

// Utility function to append page paths to a link
export function appendPagePathsToLink(url: string): string {
  const urlObject = new URL(url)

  // Append current page path
  urlObject.searchParams.set('pagePath', window.location.pathname)

  // Append original page path from local storage if available
  const origPath = localStorage.getItem('origPath')
  if (origPath) {
    urlObject.searchParams.set('origPath', origPath)
  }

  return urlObject.toString()
}

// Utility function to retrieve UTMs from localStorage
export function getUTMsFromStorage(): UTMs | null {
  const utms = localStorage.getItem('ch-utms')
  if (utms) {
    const { data, timestamp } = JSON.parse(utms)
    const convertedTimestamp = new Date(parseInt(timestamp))
    const dateNow = new Date()

    if (dateNow.getTime() > convertedTimestamp.getTime()) {
      // Date has expired, remove it from localStorage
      localStorage.removeItem('ch-utms')
      return null
    }

    return data
  }

  return null
}

// Utility function to store UTMs in localStorage
function storeUTMsInStorage(utms: UTMs) {
  const expirationTime = new Date()
  expirationTime.setDate(expirationTime.getDate() + 14) // Set expiration to 14 days from now

  const data = {
    data: utms,
    timestamp: expirationTime.getTime()
  }
  localStorage.setItem('ch-utms', JSON.stringify(data))
}

// Function to append experiment and variation to link
function appendExperimentToLink(
  url: string,
  experimentId: string,
  variationId: string
): string {
  const urlObject = new URL(url)

  // Retrieve existing experiments and parse them into an object
  const experimentsQuery = urlObject.searchParams.get('experiments')

  let experiments: Record<string, string> = experimentsQuery
    ? experimentsQuery
        .split(',')
        .reduce((acc: Record<string, string>, curr: string) => {
          const [id, variation] = curr.split(':')
          acc[id] = variation
          return acc
        }, {})
    : {}

  // Update the experiments object with the new experiment and variation
  experiments[experimentId] = variationId

  // Convert the experiments object back into a query string
  const newExperimentsQuery = Object.entries(experiments)
    .map(([id, variation]) => `${id}:${variation}`)
    .join(',')

  // Set the updated experiments query back on the URL
  urlObject.searchParams.set('experiments', newExperimentsQuery)

  return urlObject.toString()
}
