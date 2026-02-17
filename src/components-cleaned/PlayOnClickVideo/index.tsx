'use client'

import JsonSchema from '@/components-cleaned/JsonSchema'
import VideoConsentWrapper from '@/components-cleaned/VideoConsentWrapper'
import VideoPlayButton from '@/components-cleaned/VideoPlayButton'
import type VimeoPlayer from '@vimeo/player'
import Image, { type ImageProps } from 'next/image'
import {
  useRef,
  useState,
  useEffect,
  isValidElement,
  useMemo,
  cloneElement,
  useCallback
} from 'react'
import { VideoObject, WithContext } from 'schema-dts'
import type { YouTubePlayer as YouTubePlayerClass } from 'youtube-player/dist/types'

type EmbedProviders = 'youtube' | 'vimeo'
type ThumbElWithClassName = { className?: string }
type ThumbnailProp =
  | ImageProps['src']
  | React.ReactElement<ThumbElWithClassName>

export interface PlayOnClickVideoProps {
  provider: EmbedProviders
  thumbnail?: ThumbnailProp
  id: string | number
  playButtonEyebrow?: string
  playButtonLabel?: string
  className?: string
  thumbnailClassName?: string
  playButtonClassName?: string
  schema?: WithContext<VideoObject>
}

export default function PlayOnClickVideo({
  provider,
  thumbnail,
  id,
  playButtonLabel,
  playButtonEyebrow,
  className = '',
  thumbnailClassName = '',
  playButtonClassName = '',
  schema
}: PlayOnClickVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const playerRef = useRef<
    YouTubePlayerClass | InstanceType<typeof VimeoPlayer> | null
  >(null)

  // Track which DOM node the current player was created against
  const playerHostElRef = useRef<HTMLDivElement | null>(null)

  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)

  const isYT = (p: any): p is YouTubePlayerClass => !!p && 'playVideo' in p
  const isVimeo = (p: any): p is InstanceType<typeof VimeoPlayer> =>
    !!p && 'play' in p

  const destroy = useCallback(() => {
    const p = playerRef.current as any
    if (p && typeof p.destroy === 'function') {
      p.destroy()
    }
    playerRef.current = null
    playerHostElRef.current = null
  }, [])

  const ensurePlayer = useCallback(async () => {
    const el = containerRef.current
    if (!el) return null

    // If we already have a player but it was created for a different host element, rebuild it.
    if (playerRef.current && playerHostElRef.current === el) {
      return playerRef.current
    }

    // If host changed (or we have a stale instance), clean up and recreate
    if (playerRef.current) destroy()

    if (provider === 'youtube') {
      const { default: YouTubePlayer } = await import('youtube-player')
      const yt = YouTubePlayer(el, {
        videoId: String(id),
        host: 'https://www.youtube-nocookie.com',
        playerVars: { rel: 0, controls: 1, modestbranding: 1 }
      })
      yt.on('stateChange', (event: any) => {
        if (event?.data === 1) setPlaying(true)
      })
      playerRef.current = yt
    } else {
      const { default: VimeoCtor } = await import('@vimeo/player')
      const vimeo = new VimeoCtor(el, {
        id: Number(id),
        controls: true,
        title: false,
        dnt: true
      })
      vimeo.on('play', () => setPlaying(true))
      playerRef.current = vimeo
    }

    playerHostElRef.current = el
    return playerRef.current
  }, [destroy, provider, id])

  // Callback ref fires when the wrapper mounts/unmounts the container
  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node

      if (!node) {
        // Wrapper just unmounted children → destroy stale player instance
        destroy()
        setPlaying(false)
        return
      }

      // Container just mounted (consent granted) → create player now
      void ensurePlayer()
    },
    [destroy, ensurePlayer]
  )

  const handlePlay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const player = await ensurePlayer()
      if (!player) return

      // Don’t set playing=true optimistically; wait for real play events
      if (isYT(player)) player.playVideo()
      else if (isVimeo(player)) await player.play()
    } finally {
      setLoading(false)
    }
  }

  // Cleanup if the whole component unmounts
  useEffect(() => destroy, [destroy])

  const renderedThumbnail = useMemo(() => {
    if (!thumbnail) return null

    const thumbnailClasses = `absolute inset-0 z-0 h-full w-full object-cover object-center ${thumbnailClassName}`

    // Add our thumbnail classes to the element
    if (isValidElement<ThumbElWithClassName>(thumbnail)) {
      return cloneElement(thumbnail, {
        className: `${thumbnail.props?.className || ''} ${thumbnailClasses}`
      })
    }

    return (
      <Image
        src={thumbnail}
        width={1280}
        height={720}
        alt='Video Thumbnail'
        className={thumbnailClasses}
      />
    )
  }, [thumbnail, thumbnailClassName])

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded bg-neutral-900 ${className}`}>
      {/* Thumbnail overlay */}
      <div
        className={`absolute inset-0 z-10 transition-opacity ${thumbnail ? 'bg-neutral-900' : 'pointer-events-none'} ${
          playing ? 'pointer-events-none opacity-0' : ''
        }`}>
        <VideoPlayButton
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${thumbnail ? '' : 'pointer-events-auto'} ${playButtonClassName}`}
          eyebrow={playButtonEyebrow}
          label={playButtonLabel}
          loading={loading && !playing}
          onClick={handlePlay}
        />
        {renderedThumbnail}
      </div>

      {/* Player container */}
      <div
        ref={setContainerRef}
        className='absolute inset-0 z-0 h-full w-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full'
      />
      {schema && <JsonSchema schema={schema} />}
    </div>
  )
}
