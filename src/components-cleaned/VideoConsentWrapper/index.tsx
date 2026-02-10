'use client'

import { useSecuritiCookieBanner } from '@/components-cleaned/SecuritiCookieBanner'
import { cloneElement } from 'react'

export interface VideoConsentWrapperProps {
  children: React.ReactNode
  thumbnail?: null | React.ReactElement<{ className?: string }>
}

export default function VideoConsentWrapper({
  children,
  thumbnail
}: VideoConsentWrapperProps) {
  const banner = useSecuritiCookieBanner()
  const consentGiven = banner.consentValues.functional === 'granted'
  return (
    <>
      {!consentGiven && (
        <div className='relative flex aspect-video items-center justify-center rounded border border-neutral-700 bg-neutral-750 p-4 text-center text-base text-white lg:text-lg'>
          {thumbnail &&
            cloneElement(thumbnail, {
              className: `${thumbnail.props?.className || ''} absolute inset-0 scale-105 blur-xl opacity-20 z-10`
            })}
          <p className='relative z-10'>
            This video requires functional cookies.
            <br />{' '}
            {banner.enabled && (
              <button
                className='text-primary-300 hover:underline'
                onClick={(event) => {
                  event.preventDefault()
                  banner.open()
                }}>
                Change cookie preferences
              </button>
            )}
          </p>
        </div>
      )}
      {consentGiven && children}
    </>
  )
}
