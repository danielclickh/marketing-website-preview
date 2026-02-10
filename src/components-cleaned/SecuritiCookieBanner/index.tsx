'use client'

import { useEffect } from 'react'

type SecuritiConsentObject = {
  category: Record<string, unknown>
}

export default function SecuritiCookieBanner() {
  useEffect(() => {
    function convertSecuritiToGtm(content: null | SecuritiConsentObject) {
      const category = content?.category || null
      if (!category) return null

      const norm = (value: any, fallback: 'denied' | 'granted' = 'denied') => {
        if (value === 'granted' || value === 'denied') return value
        if (value === true) return 'granted'
        if (value === false) return 'denied'
        return fallback
      }

      // https://app.securiti.ai/privaci/v1/admin/cmp/published_cookie_categories
      const advertising = norm(category.Advertising, 'denied')
      const analytics = norm(
        category['Analytics and customization'] ||
          category['Analytics & Customization'],
        'denied'
      )
      const functionality = norm(
        category['Performance and functionality'] ||
          category['Performance & Functionality'],
        'denied'
      )
      const essential = norm(category.Essential, 'granted')
      const unclassified = norm(category.Unclassified, 'denied')

      // https://support.google.com/tagmanager/answer/13802165
      return {
        ad_storage: advertising,
        ad_user_data: advertising,
        ad_personalization: advertising,
        analytics_storage: analytics,
        functionality_storage: functionality,
        personalization_storage: analytics,
        security_storage: 'granted' // always granted for security/fraud prevention
      }
    }

    function pushToDataLayer(
      event: 'default_consent' | 'consent_update',
      securitiConsent: null | SecuritiConsentObject
    ) {
      const gtmConsent = convertSecuritiToGtm(securitiConsent)
      if (!gtmConsent) return false
      if (!window.dataLayer) window.dataLayer = []
      window.dataLayer.push({
        event: event,
        consent_update: gtmConsent
      })
      return true
    }

    // https://helpcenter.securiti.ai/docs/using-the-advanced-event-driven-methods#sdk-object-methods
    window.SecuritiDataLayer = window.SecuritiDataLayer || []

    // Triggered when the user gives consent
    window.SecuritiDataLayer.push([
      'onConsentGiven',
      function (sdk: any, consent: SecuritiConsentObject) {
        pushToDataLayer('consent_update', consent || sdk.getConsent())
      }
    ])

    // Triggered on every page load
    window.SecuritiDataLayer.push([
      'onLoad',
      function (sdk: any) {
        if (sdk.isConsentGiven()) {
          pushToDataLayer('consent_update', sdk.getConsent())
        } else {
          pushToDataLayer('default_consent', sdk.getDefaultConsentState())
        }
      }
    ])

    const el = document.createElement('script')
    el.src =
      'https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-loader-strict-csp.js'
    el.setAttribute('data-tenant-uuid', '8555e54b-cd0b-45d7-9c1c-e9e088bf774a')
    el.setAttribute('data-domain-uuid', 'e058d040-977c-4594-aa2c-84b844ce5cf0')
    el.setAttribute('data-backend-url', 'https://app.securiti.ai')
    el.setAttribute('data-skip-css', 'false')
    el.setAttribute('data-strict-csp', 'true')
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
  }, [])
  return <></>
}
