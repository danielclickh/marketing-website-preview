'use client'

import fallbackThumbnail from './assets/fallback.png'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

type Provider = 'youtube' | 'vimeo'

export interface VideoThumbnailProps extends Omit<ImageProps, 'src' | 'alt'> {
  provider: Provider
  videoId: string
  fallbackSrc?: ImageProps['src']
  alt?: ImageProps['alt']
}

export default function VideoThumbnail({
  provider,
  videoId,
  fallbackSrc,
  onError,
  alt,
  width = 1280,
  height = 720,
  ...props
}: VideoThumbnailProps) {
  const [urls, setUrls] = useState<string[]>([])
  const [sizeIndex, setSizeIndex] = useState(0)
  const [displayFallback, setDisplayFallback] = useState(false)

  useEffect(() => {
    let cancelled = false
    setSizeIndex(0)
    setDisplayFallback(false)
    ;(async () => {
      try {
        const res = await fetch(
          `/api/video-thumbnail?provider=${provider}&id=${encodeURIComponent(videoId)}`,
          { cache: 'force-cache' } // or 'no-store' if you want fresh every time
        )
        if (!res.ok) throw new Error('Failed to fetch thumbnail URLs')
        const data: { urls?: string[] } = await res.json()
        if (!cancelled) setUrls(data.urls ?? [])
      } catch {
        if (!cancelled) setUrls([])
      }
    })()

    return () => {
      cancelled = true
    }
  }, [provider, videoId])

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    onError?.(e)
    if (sizeIndex >= urls.length - 1) setDisplayFallback(true)
    else setSizeIndex((i) => i + 1)
  }

  const activeSrc = displayFallback
    ? fallbackSrc || (fallbackThumbnail as ImageProps['src'])
    : urls[sizeIndex]

  return (
    <Image
      src={activeSrc || fallbackSrc || (fallbackThumbnail as ImageProps['src'])}
      width={width}
      height={height}
      alt={
        alt ||
        `${provider === 'youtube' ? 'YouTube' : 'Vimeo'} Video: ${videoId}`
      }
      onError={handleError}
      {...props}
    />
  )
}
