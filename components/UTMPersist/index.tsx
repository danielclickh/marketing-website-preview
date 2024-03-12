import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Galaxy } from '../../lib/galaxy/web/browser'
import { Experiment, Result } from '@growthbook/growthbook'

type UTMs = {
  [key: string]: string
}

const updateLinks = () => {
  const links = Array.from(document.querySelectorAll('a'))
  for (const link of links) {
    if (link.hostname.includes('.cloud')) {
      const updatedURL = appendUTMsToLink(link.href)

      link.href = appendGalaxySessionIDToLink(updatedURL)
    }
  }
}

export const onExperimentViewed = (
  experiment: Experiment<any>,
  result: Result<any>
) => {
  const experimentId = experiment.key
  const variationId = result.key

  console.log('Experiment viewed:', { experimentId, variationId })

  const links = Array.from(document.querySelectorAll('a'))
  for (const link of links) {
    if (link.hostname.includes('.cloud')) {
      const updatedURL = appendExperimentParamsToLink(
        link.href,
        experimentId,
        variationId
      )
      link.href = updatedURL
      updateLinks()
    }
  }
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

    updateLinks()

    const handleRouteChange = () => {
      updateLinks()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return null
}

export default React.memo(UTMPersist)

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
    urlObject.searchParams.set('glx_id', galaxy_id)
  }

  return urlObject.toString()
}

// Utility function to retrieve UTMs from localStorage
function getUTMsFromStorage(): UTMs | null {
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

export function appendExperimentParamsToLink(
  url: string,
  experimentId: string,
  variationId: string
): string {
  const urlObject = new URL(url)

  // Append experiment parameters to links that contain ".cloud"
  if (experimentId && variationId) {
    urlObject.searchParams.set('experimentId', experimentId)
    urlObject.searchParams.set('variationId', variationId)
  }

  return urlObject.toString()
}
