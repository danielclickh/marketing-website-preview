'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

export interface YouTubeThumbnailProps
  extends Omit<
    ImageProps &
      Omit<
        React.DetailedHTMLProps<
          React.ImgHTMLAttributes<HTMLImageElement>,
          HTMLImageElement
        >,
        keyof ImageProps
      >,
    'src' | 'alt' | 'ref'
  > {
  videoId: string
  fallbackSrc?: ImageProps['src']
  alt?: ImageProps['alt']
}

export default function YouTubeThumbnail({
  videoId,
  fallbackSrc,
  onError,
  alt,
  width = 1280,
  height = 720,
  ...props
}: YouTubeThumbnailProps) {
  const [sizeIndex, setSizeIndex] = useState(0)

  // Ordered highest quality → lowest
  const urls = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`
  ]

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    onError?.(e)
    setSizeIndex((i) => i + 1)
  }

  return (
    <Image
      src={
        urls[sizeIndex] || fallbackSrc || '/images/fallback-video-thumbnail.png'
      }
      width={width}
      height={height}
      alt={alt || `YouTube Video: ${videoId}`}
      onError={handleError}
      {...props}
    />
  )
}
