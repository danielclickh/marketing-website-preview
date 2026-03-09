'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

const SECURITI_CDN_URL = 'https://cdn-prod.securiti.ai' as const
const SECURITI_TENANT_ID = '8555e54b-cd0b-45d7-9c1c-e9e088bf774a' as const
const SECURITI_DOMAIN_ID = 'e058d040-977c-4594-aa2c-84b844ce5cf0' as const
const SECURITI_BACKEND_URL = 'https://app.securiti.ai' as const

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
  const advertising = normalizeStatus(category.Advertising, 'denied')
  const analytics = normalizeStatus(
    category['Analytics and customization'] ||
      category['Analytics & Customization'],
    'denied'
  )
  const functional = normalizeStatus(
    category['Performance and functionality'] ||
      category['Performance & Functionality'],
    'denied'
  )
  const essential = normalizeStatus(category.Essential, 'granted')
  const unclassified = normalizeStatus(category.Unclassified, 'denied')

  return {
    advertising,
    analytics,
    functional,
    essential,
    unclassified
  }
}

type SecuritiContextType = {
  consentValues: null | SecuritiConsentStatuses
  open: () => boolean
  close: () => boolean
  acceptAll: () => boolean
  enabled: boolean
  staging: boolean
}

const SecuritiContext = createContext<SecuritiContextType | null>(null)

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
  const [values, setValues] = useState<SecuritiConsentStatuses | null>(null)

  const setValuesIfChanged = useCallback(
    (newValues: SecuritiConsentStatuses) => {
      // Dedupe keys
      const keys = new Set([
        ...Object.keys(values || {}),
        ...Object.keys(newValues)
      ])

      // Check if any values differ
      const valuesHaveChanged = (
        [...keys] as Array<keyof SecuritiConsentStatuses>
      ).some((key) => values?.[key] !== newValues[key])

      // Only update the state if values have changed
      if (valuesHaveChanged) {
        setValues(newValues)
      }
    },
    [values]
  )

  const submitConsent = useCallback(
    (securitiConsent: null | SecuritiConsentObject) => {
      const statuses = normalizeCategoryStatuses(securitiConsent)
      if (!statuses) return false
      window.sessionStorage.setItem('cmp-consent', JSON.stringify(statuses))
      setValuesIfChanged(statuses)
      return true
    },
    [setValuesIfChanged]
  )

  // Triggered on every page load
  const loadCallback = useMemo(() => {
    return [
      'onLoad',
      function (sdkRef: any) {
        if (!sdk) setSdk(sdkRef)

        if (sdkRef.isConsentGiven()) {
          submitConsent(sdkRef.getConsent())
        } else {
          submitConsent(sdkRef.getDefaultConsentState())
        }
      }
    ]
  }, [sdk, submitConsent])

  // Triggered when the user gives consent
  const consentGivenCallback = useMemo(() => {
    return [
      'onConsentGiven',
      function (sdkRef: any, consent: SecuritiConsentObject) {
        if (!sdk) setSdk(sdkRef)
        submitConsent(consent || sdkRef.getConsent())
      }
    ]
  }, [sdk, submitConsent])

  useEffect(() => {
    // Add the callbacks to the datalayer
    // https://helpcenter.securiti.ai/docs/using-the-advanced-event-driven-methods#sdk-object-methods
    window.SecuritiDataLayer = window.SecuritiDataLayer || []
    window.SecuritiDataLayer.push(loadCallback)
    window.SecuritiDataLayer.push(consentGivenCallback)

    const bannerScript = document.createElement('script')
    bannerScript.src = `${SECURITI_CDN_URL}/consent/cookie-consent-sdk-loader-strict-csp.js`
    bannerScript.setAttribute('data-tenant-uuid', SECURITI_TENANT_ID)
    bannerScript.setAttribute('data-domain-uuid', SECURITI_DOMAIN_ID)
    bannerScript.setAttribute('data-backend-url', SECURITI_BACKEND_URL)
    bannerScript.setAttribute('data-skip-css', 'false')
    bannerScript.setAttribute('data-strict-csp', 'true')
    if (staging) {
      bannerScript.setAttribute('data-securiti-staging-mode', 'true')
    }
    bannerScript.defer = true
    bannerScript.addEventListener('load', function () {
      const cookieSettingsButton = document.querySelector<HTMLElement>(
        '#cookie-settings-button'
      )
      if (cookieSettingsButton) {
        cookieSettingsButton.style.display = 'block'
      }
    })

    const gcpDefaults = document.createElement('script')
    gcpDefaults.src = `${SECURITI_CDN_URL}/consent/cookie_banner/${SECURITI_TENANT_ID}/${SECURITI_DOMAIN_ID}/google_consent_defaults.js`
    gcpDefaults.addEventListener('load', () => {
      // Second: after defaults loaded, load the banner
      ;(document.head || document.body).appendChild(bannerScript)
    })

    // First: load Google Consent Police defaults
    if (enabled) {
      ;(document.head || document.body).appendChild(gcpDefaults)
    }

    // Clean up
    return () => {
      gcpDefaults.remove()
      bannerScript.remove()

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

  const acceptAll = useCallback(() => {
    if (!sdk || !('acceptAll' in sdk)) return false
    sdk.acceptAll()
    return true
  }, [sdk])

  return (
    <SecuritiContext.Provider
      value={{
        consentValues: values,
        open,
        close,
        acceptAll,
        enabled,
        staging
      }}>
      {children}
    </SecuritiContext.Provider>
  )
}
