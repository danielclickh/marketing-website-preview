import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type UTMs = {
  [key: string]: string
}

const UTMContext = createContext<UTMs>({})

export function UTMProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [utms, setUTMs] = useState<UTMs>({})

  const handleRouteChange = () => {
    updateLinks()
  }

  const updateLinks = () => {
    const links = Array.from(document.querySelectorAll('a'))
    for (const link of links) {
      if (link.hostname.includes('.cloud')) {
        const updatedURL = appendUTMsToLink(link.href)
        link.href = updatedURL
      }
    }
  }

  useEffect(() => {
    const storedUTMs = getUTMsFromStorage()
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
      setUTMs(utmValues)
      storeUTMsInStorage(utmValues)
    } else if (storedUTMs) {
      setUTMs(storedUTMs)
    }

    updateLinks()

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <UTMContext.Provider value={utms}>{children}</UTMContext.Provider>
}

export function useUTMs(): UTMs {
  return useContext(UTMContext)
}

// Utility function to retrieve UTMs from localStorage
function getUTMsFromStorage(): UTMs | null {
  const utms = localStorage.getItem('ch-utms')
  if (utms) {
    const { data, timestamp } = JSON.parse(utms)
    const expirationTime = new Date(timestamp)
    expirationTime.setDate(expirationTime.getDate() + 14) // Set expiration to 14 days from stored timestamp

    if (Date.now() > expirationTime.getTime()) {
      // Data has expired, remove it from localStorage
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
