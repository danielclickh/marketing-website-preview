'use client'

import {
  SecuritiConsentStatuses,
  useSecuritiCookieBanner
} from '@/components-cleaned/SecuritiCookieBanner'
import { GTMParams } from '@next/third-parties/dist/types/google'
import { useCallback, useEffect, useRef } from 'react'

function mapSecuritiValuesToTagManager(statuses: SecuritiConsentStatuses) {
  return {
    ad_storage: statuses.advertising,
    ad_user_data: statuses.advertising,
    ad_personalization: statuses.advertising,
    analytics_storage: statuses.analytics,
    functionality_storage: statuses.functional,
    personalization_storage: statuses.analytics,
    security_storage: 'granted' // always granted for security/fraud prevention
  }
}

export interface GoogleTagManagerConsentProps {
  dataLayerName?: GTMParams['dataLayerName']
}

export default function GoogleTagManagerConsent({
  dataLayerName = 'dataLayer'
}: GoogleTagManagerConsentProps) {
  const sentDefault = useRef(false)
  const banner = useSecuritiCookieBanner()

  const getDataLayer = useCallback(() => {
    if (!window[dataLayerName]) window[dataLayerName] = []
    return window[dataLayerName]
  }, [dataLayerName])

  // This function is required to update consent states
  // Google uses a strict check for the Arguments object type
  const gtag = useCallback(
    function (...args: Array<any>) {
      getDataLayer().push(arguments)
    },
    [getDataLayer]
  )

  useEffect(() => {
    // Do nothing because it's disabled
    if (!banner.enabled) return

    // Send default consent state
    if (!sentDefault.current) {
      sentDefault.current = true
      gtag('consent', 'default', {
        ...mapSecuritiValuesToTagManager(banner.consentValues),
        wait_for_update: 500 // Gives CMP 500ms to load before tags fire
      })
    }

    // https://support.google.com/tagmanager/answer/13802165
    gtag(
      'consent',
      'update',
      mapSecuritiValuesToTagManager(banner.consentValues)
    )

    // Push a custom event to the dataLayer
    // Pushing to the dataLayer instead of `gtag` function for mechanical purposes
    getDataLayer().push({
      event: 'consent_updated'
    })
  }, [gtag, getDataLayer, banner.enabled, banner.consentValues])

  return <></>
}
