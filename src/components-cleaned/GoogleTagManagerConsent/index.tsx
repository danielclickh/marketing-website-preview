'use client'

import {
  SecuritiConsentStatuses,
  useSecuritiCookieBanner
} from '@/components-cleaned/SecuritiCookieBanner'
import { GTMParams } from '@next/third-parties/dist/types/google'
import { useCallback, useEffect } from 'react'

export interface GoogleTagManagerConsentProps {
  dataLayerName?: GTMParams['dataLayerName']
}

export default function GoogleTagManagerConsent({
  dataLayerName = 'dataLayer'
}: GoogleTagManagerConsentProps) {
  const banner = useSecuritiCookieBanner()

  const getDataLayer = useCallback(() => {
    if (!window[dataLayerName]) window[dataLayerName] = []
    return window[dataLayerName] as Array<any>
  }, [dataLayerName])

  const getConsentFromDataLayer = (type: 'default' | 'update') => {
    const consentValues = getDataLayer()
      .filter((item) => item[0] === 'consent' && item[1] === type)
      .map((item) => item[2])
    const combined = Object.assign({}, ...consentValues)
    return Object.values(combined).length > 0 ? combined : null
  }

  const mapSecuritiValuesToTagManager = (statuses: SecuritiConsentStatuses) => {
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

  // This function is required to update consent states
  // Google uses a strict check for the Arguments object type
  const gtag = useCallback(
    function (...args: Array<any>) {
      getDataLayer().push(arguments)
    },
    [getDataLayer]
  )

  const hasChanged = (oldValues: any, newValues: any) => {
    const keys = new Set([...Object.keys(oldValues), ...Object.keys(newValues)])
    return ([...keys] as Array<keyof SecuritiConsentStatuses>).some(
      (key) => oldValues?.[key] !== newValues[key]
    )
  }

  useEffect(() => {
    // Do nothing because it's disabled
    if (!banner.enabled || !banner.consentValues) return

    let fireConsentUpdatedEvent = false

    const dlDefault = getConsentFromDataLayer('default')
    const dlLatest = getConsentFromDataLayer('update') || dlDefault
    const newValues = mapSecuritiValuesToTagManager(banner.consentValues)

    // Send default consent state
    if (hasChanged(dlDefault, newValues)) {
      fireConsentUpdatedEvent = true
      gtag(
        'consent',
        'default',
        mapSecuritiValuesToTagManager(banner.consentValues)
      )
    }

    // Send updated consent
    // https://support.google.com/tagmanager/answer/13802165
    if (hasChanged(dlLatest, newValues)) {
      fireConsentUpdatedEvent = true
      gtag(
        'consent',
        'update',
        mapSecuritiValuesToTagManager(banner.consentValues)
      )
    }

    // Push a custom event to the dataLayer
    // Pushing to the dataLayer instead of `gtag` function for mechanical purposes
    if (fireConsentUpdatedEvent) {
      getDataLayer().push({
        event: 'consent_updated'
      })
    }
  }, [gtag, getDataLayer, banner.enabled, banner.consentValues])

  return <></>
}
