import logoFull from '../../../public/logo-full.svg'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef } from 'react'

export interface OpenHouseHeaderProps {
  children?: React.ReactNode
}

export default function OpenHouseHeader({ children }: OpenHouseHeaderProps) {
  const headerBackgroundRef = useRef<HTMLDivElement | null>(null)

  const scrollHandler = useCallback(() => {
    const headerBackground = headerBackgroundRef.current
    if (headerBackground) {
      const scrollY = window.scrollY
      const maxScroll = 200
      const minOpacity = 0.25
      const maxOpacity = 0.8
      const opacity = Math.min(
        Math.max(
          (scrollY / maxScroll) * (maxOpacity - minOpacity) + minOpacity,
          minOpacity
        ),
        maxOpacity
      )

      const minBlur = 0
      const maxBlur = 4
      const blur = Math.min(
        Math.max(
          (scrollY / maxScroll) * (maxBlur - minBlur) + minBlur,
          minBlur
        ),
        maxBlur
      )

      const styles = {
        '--tw-bg-opacity': opacity.toString(),
        backdropFilter: `blur(${blur}px)`
      } as React.CSSProperties

      for (const key in styles) {
        if (key.startsWith('--')) {
          // Handle CSS variables
          headerBackground.style.setProperty(
            key,
            styles[key as keyof React.CSSProperties] as string
          )
        } else {
          // Handle regular CSS properties
          ;(headerBackground.style as any)[key] = styles[
            key as keyof React.CSSProperties
          ] as string
        }
      }
    }
  }, [headerBackgroundRef])

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [scrollHandler])

  return (
    <header className='fixed top-0 z-50 w-full'>
      <div
        ref={headerBackgroundRef}
        className='absolute inset-0 z-0 border-b border-transparent bg-black bg-opacity-25 transition duration-300'
      />
      <div className='relative z-10 mx-auto max-w-6xl px-6 py-4 lg:px-12'>
        <div className='flex h-10 items-center justify-between'>
          <Link href='/' prefetch={false}>
            <Image
              src={logoFull}
              priority
              width='135'
              height='40'
              alt='ClickHouse logo'
            />
          </Link>
          <div className='flex gap-4'>{children}</div>
        </div>
      </div>
    </header>
  )
}
