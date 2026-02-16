'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

type SecuritiConsentObject = {
  category: Record<string, unknown>
}

export type SecuritiCookieCategories =
  | 'advertising'
  | 'analytics'
  | 'functional'
  | 'essential'
  | 'unclassified'

export type SecuritiConsentStatus = 'denied' | 'granted'

export type SecuritiConsentStatuses = Record<
  SecuritiCookieCategories,
  SecuritiConsentStatus
>

export const DEFAULT_STATUSES: Record<
  SecuritiCookieCategories,
  SecuritiConsentStatus
> = {
  advertising: 'denied',
  analytics: 'denied',
  functional: 'denied',
  essential: 'granted',
  unclassified: 'denied'
} as const

function normalizeStatus(
  value: any,
  fallback: SecuritiConsentStatus = 'denied'
): SecuritiConsentStatus {
  if (value === 'granted' || value === 'denied') return value
  if (value === true) return 'granted'
  if (value === false) return 'denied'
  return fallback
}

function normalizeCategoryStatuses(
  content: null | SecuritiConsentObject
): null | SecuritiConsentStatuses {
  const category = content?.category || null
  if (!category) return null

  // https://app.securiti.ai/privaci/v1/admin/cmp/published_cookie_categories
  const advertising = normalizeStatus(
    category.Advertising,
    DEFAULT_STATUSES.advertising
  )
  const analytics = normalizeStatus(
    category['Analytics and customization'] ||
      category['Analytics & Customization'],
    DEFAULT_STATUSES.analytics
  )
  const functional = normalizeStatus(
    category['Performance and functionality'] ||
      category['Performance & Functionality'],
    DEFAULT_STATUSES.functional
  )
  const essential = normalizeStatus(
    category.Essential,
    DEFAULT_STATUSES.essential
  )
  const unclassified = normalizeStatus(
    category.Unclassified,
    DEFAULT_STATUSES.unclassified
  )

  return {
    advertising,
    analytics,
    functional,
    essential,
    unclassified
  }
}

function getConsentValuesFromLocalStorage() {
  let advertising, analytics, functional, essential, unclassified
  try {
    const value = window.sessionStorage.getItem('cmp-consent')
    const json = JSON.parse(value || '')

    advertising = json.advertising
    analytics = json.analytics
    functional = json.functional
    essential = json.essential
    unclassified = json.unclassified
  } catch {}

  return {
    advertising: normalizeStatus(advertising, DEFAULT_STATUSES.advertising),
    analytics: normalizeStatus(analytics, DEFAULT_STATUSES.analytics),
    functional: normalizeStatus(functional, DEFAULT_STATUSES.functional),
    essential: normalizeStatus(essential, DEFAULT_STATUSES.essential),
    unclassified: normalizeStatus(unclassified, DEFAULT_STATUSES.unclassified)
  }
}

type SecuritiContextType = {
  consentValues: SecuritiConsentStatuses
  open: () => boolean
  close: () => boolean
  enabled: boolean
  staging: boolean
}

const SecuritiContext = createContext<SecuritiContextType>({
  consentValues: DEFAULT_STATUSES,
  open() {
    return false
  },
  close() {
    return false
  },
  enabled: true,
  staging: false
})

export function useSecuritiCookieBanner() {
  const result = useContext(SecuritiContext)
  if (!result) {
    throw new Error(
      'Context used outside of the <SecuritiCookieBanner> component!'
    )
  }
  return result
}

export interface SecuritiCookieBannerProps {
  children: React.ReactNode
  enabled?: boolean
  staging?: boolean
}

export default function SecuritiCookieBanner({
  children,
  enabled = true,
  staging = false
}: SecuritiCookieBannerProps) {
  const [sdk, setSdk] = useState<any>(null)
  const [values, setValues] = useState<SecuritiConsentStatuses>(
    getConsentValuesFromLocalStorage()
  )

  const setValuesIfChanged = useCallback(
    (newValues: SecuritiConsentStatuses) => {
      const keys = Object.keys(newValues) as Array<
        keyof SecuritiConsentStatuses
      >
      const valuesHaveChanged = keys.some(
        (key) => newValues[key] !== values[key]
      )
      if (valuesHaveChanged) {
        setValues(newValues)
      }
    },
    [values]
  )

  useEffect(() => {
    const submitConsent = (securitiConsent: null | SecuritiConsentObject) => {
      const statuses = normalizeCategoryStatuses(securitiConsent)
      if (!statuses) return false
      window.sessionStorage.setItem('cmp-consent', JSON.stringify(statuses))
      setValuesIfChanged(statuses)
      return true
    }

    // Triggered on every page load
    const loadCallback = [
      'onLoad',
      function (sdkRef: any) {
        setSdk(sdkRef)

        if (sdkRef.isConsentGiven()) {
          submitConsent(sdkRef.getConsent())
        } else {
          submitConsent(sdkRef.getDefaultConsentState())
        }
      }
    ]

    // Triggered when the user gives consent
    const consentGivenCallback = [
      'onConsentGiven',
      function (sdkRef: any, consent: SecuritiConsentObject) {
        setSdk(sdkRef)
        submitConsent(consent || sdkRef.getConsent())
      }
    ]

    // Add the callbacks to the datalayer
    // https://helpcenter.securiti.ai/docs/using-the-advanced-event-driven-methods#sdk-object-methods
    window.SecuritiDataLayer = window.SecuritiDataLayer || []
    window.SecuritiDataLayer.push(loadCallback)
    window.SecuritiDataLayer.push(consentGivenCallback)

    const el = document.createElement('script')
    el.src =
      'https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-loader-strict-csp.js'
    el.setAttribute('data-tenant-uuid', '8555e54b-cd0b-45d7-9c1c-e9e088bf774a')
    el.setAttribute('data-domain-uuid', 'e058d040-977c-4594-aa2c-84b844ce5cf0')
    el.setAttribute('data-backend-url', 'https://app.securiti.ai')
    el.setAttribute('data-skip-css', 'false')
    el.setAttribute('data-strict-csp', 'true')
    if (staging) {
      el.setAttribute('data-securiti-staging-mode', 'true')
    }
    el.defer = true
    el.addEventListener('load', function () {
      const cookieSettingsButton = document.querySelector<HTMLElement>(
        '#cookie-settings-button'
      )
      if (cookieSettingsButton) {
        cookieSettingsButton.style.display = 'block'
      }
    })

    if (enabled) {
      ;(document.head || document.body).appendChild(el)
    }

    // Clean up
    return () => {
      el.remove()

      // Remove callbacks
      window.SecuritiDataLayer = (
        window.SecuritiDataLayer as Array<any>
      ).filter((item) => {
        return item !== loadCallback && item !== consentGivenCallback
      })
    }
  }, [enabled, staging])

  const open = useCallback(() => {
    if (!sdk || !('showPreferenceCenter' in sdk)) return false
    sdk.showPreferenceCenter()
    return true
  }, [sdk])

  const close = useCallback(() => {
    if (!sdk || !('closePreferenceCenter' in sdk)) return false
    sdk.closePreferenceCenter()
    return true
  }, [sdk])

  return (
    <SecuritiContext.Provider
      value={{
        consentValues: values,
        open,
        close,
        enabled,
        staging
      }}>
      {children}
    </SecuritiContext.Provider>
  )
}
