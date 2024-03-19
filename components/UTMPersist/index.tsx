import { Experiment, Result } from '@growthbook/growthbook'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Galaxy } from '../../lib/galaxy/web/browser'

type UTMs = {
  [key: string]: string
}

export const updateLinks = (experimentId?: string, variationId?: string) => {
  const links = Array.from(document.querySelectorAll('a'))
  for (const link of links) {
    if (link.hostname.includes('.cloud')) {
      link.href = appendUTMsToLink(link.href)
      link.href = appendGalaxySessionIDToLink(link.href)
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
    urlObject.searchParams.set('glxid', galaxy_id)
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
