'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

export type VideoCandidate = {
  src: string
  media: string
}

export interface ResponsiveHtml5VideoProps
  extends Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    'src' | 'children'
  > {
  sources: {
    defaultSrc: string
    candidates: VideoCandidate[]
  }
  preserveTime?: boolean // When true, preserve currentTime when switching sources
}

export default function ResponsiveHtml5Video({
  sources,
  autoPlay,
  preserveTime = true,
  ...props
}: ResponsiveHtml5VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [currentSrc, setCurrentSrc] = useState<string>(sources.defaultSrc)

  // Build a unique list of media queries to subscribe to
  const mediaQueries = useMemo(() => {
    const set = new Set<string>()
    for (const candidate of sources.candidates) {
      if (candidate.media) set.add(candidate.media)
    }
    return Array.from(set)
  }, [sources])

  useEffect(() => {
    const update = () => {
      let newSrouce = sources.candidates.find(({ media }) => {
        return window.matchMedia(media).matches
      })
      setCurrentSrc(newSrouce?.src || sources.defaultSrc)
    }

    update()

    // Subscribe to query changes
    const mqLists = mediaQueries.map((q) => window.matchMedia(q))

    for (const mqList of mqLists) {
      mqList.addEventListener('change', update)
    }

    // Also update on resize / orientation / potential DPR changes (zoom, moving between displays)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)

    return () => {
      for (const mqList of mqLists) {
        mqList.removeEventListener('change', update)
      }
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [sources, mediaQueries])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!currentSrc) return

    // If already correct, skip
    if (video.currentSrc && video.currentSrc.endsWith(currentSrc)) return

    const prevTime = preserveTime ? video.currentTime || 0 : 0
    const wasPaused = video.paused
    const prevRate = video.playbackRate || 1

    video.src = currentSrc
    video.load()

    const restore = () => {
      video.playbackRate = prevRate

      if (preserveTime) {
        try {
          if (Number.isFinite(video.duration) && video.duration > 0) {
            video.currentTime = Math.min(
              prevTime,
              Math.max(0, video.duration - 0.25)
            )
          }
        } catch {
          // ignore
        }
      }

      // Only attempt autoplay if allowed or likely to succeed
      const canAutoplay = !!autoPlay && (props.muted || video.muted)
      if (canAutoplay && !wasPaused) {
        video.play().catch(() => {})
      }
    }

    video.addEventListener('loadedmetadata', restore, { once: true })

    // If caller asked for autoplay, try once (muted recommended)
    if (!!autoPlay && (props.muted || video.muted)) {
      video.play().catch(() => {})
    }

    return () => {
      video.removeEventListener('loadedmetadata', restore)
    }
  }, [currentSrc, autoPlay, preserveTime, props.muted])

  return <video ref={videoRef} autoPlay={autoPlay} {...props} />
}
