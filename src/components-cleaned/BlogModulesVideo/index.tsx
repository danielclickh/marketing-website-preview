'use client'

import VideoPlayButton from '@/components-cleaned/VideoPlayButton'
import {
  getAbsoluteMediaUrl,
  getProxiedMediaUrl,
  getRelativeMediaUrl
} from '@/lib/api/strapi'
import { relativeOptimizedImageUrl } from '@/lib/next'
import { BlogModuleVideo } from '@/types/strapi'
import React, { useEffect, useRef, useState } from 'react'

export default function BlogModulesVideo({
  sources,
  placeholder,
  autoplay,
  muted,
  loop,
  controls
}: BlogModuleVideo) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [showPlayButton, setShowPlayButton] = useState<boolean>(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (autoplay) {
      const played = video.play()
      if (played && typeof played.then === 'function') {
        played
          .then(() => {
            // actually playing — hide
            setShowPlayButton(false)
          })
          .catch(() => {
            // autoplay blocked — show
            setShowPlayButton(true)
          })
      }
    } else {
      setShowPlayButton(true)
    }
  }, [autoplay])

  const handleManualPlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    videoRef.current?.play()
  }

  const handlePlaying = () => setShowPlayButton(false)
  const handlePause = () => setShowPlayButton(true)
  const handleEnded = () => setShowPlayButton(true)

  return (
    <div className='relative'>
      {showPlayButton && (
        <VideoPlayButton
          onClick={handleManualPlay}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      )}

      <video
        ref={videoRef}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onEnded={handleEnded}
        poster={
          placeholder
            ? relativeOptimizedImageUrl(
                getRelativeMediaUrl(placeholder.url),
                1280,
                720
              )
            : undefined
        }
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        className='h-auto w-full'>
        {sources.map((source, i) => (
          <source
            key={i}
            src={getRelativeMediaUrl(source.url)}
            type={source.mime}
          />
        ))}
      </video>
    </div>
  )
}

export function blogModulesVideoMarkdown({
  sources,
  placeholder,
  autoplay,
  muted,
  loop,
  controls
}: BlogModuleVideo) {
  let md = `<video autoplay="${autoplay ? '1' : '0'}" muted="${muted ? '1' : '0'}" loop="${loop ? '1' : '0'}" controls="${controls ? '1' : '0'}">\n`

  sources.forEach((source) => {
    md += `  <source src="${getProxiedMediaUrl(source.url)}" type="${source.mime}" />\n`
  })

  md += `</video>`

  return md
}
