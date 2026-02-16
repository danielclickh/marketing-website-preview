'use client'

import { useSecuritiCookieBanner } from '@/components-cleaned/SecuritiCookieBanner'
import { cloneElement, useEffect, useState } from 'react'

export interface VideoConsentWrapperProps {
  children: React.ReactNode
  thumbnail?: null | React.ReactElement<{ className?: string }>
}

export default function VideoConsentWrapper({
  children,
  thumbnail
}: VideoConsentWrapperProps) {
  const [attemptedToOpen, setAttemptedToOpen] = useState(false)
  const banner = useSecuritiCookieBanner()
  const consentGiven = banner.consentValues.functional === 'granted'

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAttemptedToOpen(false)
    }, 10000)

    return () => window.clearTimeout(timer)
  }, [attemptedToOpen])

  const openHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    const opened = banner.open()
    if (!opened) setAttemptedToOpen(true)
  }
  return (
    <>
      {!consentGiven && (
        <div className='relative flex aspect-video flex-col items-center justify-center gap-4 rounded border border-neutral-700 bg-neutral-750 p-4 text-center text-base text-white lg:text-lg'>
          {thumbnail &&
            cloneElement(thumbnail, {
              className: `${thumbnail.props?.className || ''} absolute inset-0 pointer-events-none scale-105 blur-xl opacity-20 z-10`
            })}
          <p className='relative z-10'>
            This video requires functional cookies to play.
            <br />{' '}
            {banner.enabled && (
              <button
                className='text-primary-300 hover:underline'
                onClick={openHandler}>
                Change cookie preferences
              </button>
            )}
          </p>
          {attemptedToOpen && (
            <p className='rounded border border-primary-500/50 bg-primary-500/10 p-2 leading-tight backdrop-blur-xl'>
              <small>
                <strong>Cookie preferences not opening?</strong> <br />
                An ad blocker or privacy extension may be blocking it.
                <br />
                Please try disabling it and refreshing the page.
              </small>
            </p>
          )}
        </div>
      )}
      {consentGiven && children}
    </>
  )
}
