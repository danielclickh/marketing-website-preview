'use client'

import { useSecuritiCookieBanner } from '@/components-cleaned/SecuritiCookieBanner'

export interface VideoConsentWrapperProps {
  children: React.ReactNode
}

export default function VideoConsentWrapper({
  children
}: VideoConsentWrapperProps) {
  const banner = useSecuritiCookieBanner()
  const consented = banner.consentValues.functional === 'granted'
  return (
    <>
      {!consented && <div></div>}
      {consented && children}
    </>
  )
}
