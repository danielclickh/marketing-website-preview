'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

type SecuritiConsentObject = {
  category: Record<string, unknown>
}

type SecuritiCookieCategories =
  | 'advertising'
  | 'analytics'
  | 'functional'
  | 'essential'
  | 'unclassified'

type SecuritiConsentStatus = 'denied' | 'granted'

type SecuritiConsentStatuses = Record<
  SecuritiCookieCategories,
  SecuritiConsentStatus
>

type SecuritiConsentEvents = {
  'cmp-consent-change': {
    categories: SecuritiConsentStatuses
  }
}

const DEFAULT_STATUSES: Record<
  SecuritiCookieCategories,
  SecuritiConsentStatus
> = {
  advertising: 'denied',
  analytics: 'denied',
  functional: 'denied',
  essential: 'granted',
  unclassified: 'denied'
}

function normalizeStatus(
  value: any,
  fallback: SecuritiConsentStatus = 'denied'
): SecuritiConsentStatus {
  if (value === 'granted' || value === 'denied') return value
  if (value === true) return 'granted'
  if (value === false) return 'denied'
  return fallback
}

type SecuritiContextType = {
  consentValues: Partial<SecuritiConsentStatuses>
  open: () => void
  close: () => void
}

const SecuritiContext = createContext<SecuritiContextType>({
  consentValues: {},
  open() {},
  close() {}
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

export interface SecuritiCookieBannerProps {
  children: React.ReactNode
  production: boolean
}

export default function SecuritiCookieBanner({
  children,
  production = false
}: SecuritiCookieBannerProps) {
  const [values, setValues] = useState<Partial<SecuritiConsentStatuses>>(
    getConsentValuesFromLocalStorage()
  )

  useEffect(() => {
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

    function submitConsent(
      securitiConsent: null | SecuritiConsentObject,
      gtmEvent: 'default_consent' | 'consent_update' = 'consent_update'
    ) {
      const statuses = normalizeCategoryStatuses(securitiConsent)
      if (!statuses) return false

      // Store statuses and update state for use by other components
      window.sessionStorage.setItem('cmp-consent', JSON.stringify(statuses))
      setValues(statuses)

      // https://support.google.com/tagmanager/answer/13802165
      if (!window.dataLayer) window.dataLayer = []
      window.dataLayer.push({
        event: gtmEvent,
        consent_update: {
          ad_storage: statuses.advertising,
          ad_user_data: statuses.advertising,
          ad_personalization: statuses.advertising,
          analytics_storage: statuses.analytics,
          functionality_storage: statuses.functional,
          personalization_storage: statuses.analytics,
          security_storage: 'granted' // always granted for security/fraud prevention
        }
      })
      return true
    }

    // Triggered on every page load
    const loadCallback = [
      'onLoad',
      function (sdk: any) {
        if (sdk.isConsentGiven()) {
          submitConsent(sdk.getConsent())
        } else {
          submitConsent(sdk.getDefaultConsentState(), 'default_consent')
        }
      }
    ]

    // Triggered when the user gives consent
    const consentGivenCallback = [
      'onConsentGiven',
      function (sdk: any, consent: SecuritiConsentObject) {
        submitConsent(consent || sdk.getConsent())
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
    if (!production) {
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
    ;(document.head || document.body).appendChild(el)

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
  }, [production])
  return (
    <SecuritiContext.Provider
      value={{
        consentValues: values,
        open() {},
        close() {}
      }}>
      {children}
    </SecuritiContext.Provider>
  )
}
