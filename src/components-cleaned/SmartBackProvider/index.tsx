import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef
} from 'react'
import { v4 as uuid } from 'uuid'

type SmartBackContextType = {
  lastUrl: string | null
  goBack: (fallbackPath: string) => void
}

const SmartBackContext = createContext<SmartBackContextType>({
  lastUrl: null,
  goBack() {}
})

export function useSmartBack() {
  const result = useContext(SmartBackContext)
  if (!result) {
    throw new Error(
      'Context used outside of the <SmartBackProvider> component!'
    )
  }
  return result
}

const SID_KEY = 'back:sessionId'
const keyFor = (sid: string) => `back:last:${sid}`

function getSessionId(): string | null {
  try {
    let sid = window.sessionStorage.getItem(SID_KEY)
    if (!sid) {
      sid = uuid()
      window.sessionStorage.setItem(SID_KEY, sid)
    }
    return sid
  } catch {
    return null
  }
}

function getCurrentRelative() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

function isSameOriginUrl(url: string) {
  try {
    return (
      new URL(url, window.location.origin).origin === window.location.origin
    )
  } catch {
    return false
  }
}

export interface SmartBackProviderProps {
  children: React.ReactNode
}

export default function SmartBackProvider({
  children
}: SmartBackProviderProps) {
  const router = useRouter()

  const prevRef = useRef<string | null>(null)
  const lastRef = useRef<string | null>(null)

  // Initialize on first mount
  useEffect(() => {
    prevRef.current = getCurrentRelative()
  }, [])

  // Track with Next.js routeChangeComplete
  useEffect(() => {
    const sid = getSessionId()
    if (!sid) return

    const handleRoute = () => {
      const current = getCurrentRelative()

      if (prevRef.current && prevRef.current !== current) {
        window.localStorage.setItem(keyFor(sid), prevRef.current)
        lastRef.current = prevRef.current
      }
      prevRef.current = current
    }

    router.events.on('routeChangeComplete', handleRoute)
    // Also capture initial mount in case of hash/search changes without full route change
    window.addEventListener('popstate', handleRoute)

    return () => {
      router.events.off('routeChangeComplete', handleRoute)
      window.removeEventListener('popstate', handleRoute)
    }
  }, [router])

  const goBack = useCallback(
    (fallbackPath: string) => {
      try {
        const sid = window.sessionStorage.getItem(SID_KEY)
        const current = getCurrentRelative()
        const stored = sid ? window.localStorage.getItem(keyFor(sid)) : null

        if (stored && stored !== current && isSameOriginUrl(stored)) {
          router.push(
            stored.startsWith('/') ? stored : new URL(stored).pathname
          )
          return
        }
      } catch {
        /* ignore */
      }
      router.push(fallbackPath)
    },
    [router]
  )

  return (
    <SmartBackContext.Provider value={{ goBack, lastUrl: lastRef.current }}>
      {children}
    </SmartBackContext.Provider>
  )
}
