'use client'

import VideoPlayButton from '@/components-cleaned/VideoPlayButton'
import type VimeoPlayer from '@vimeo/player'
import Image, { type ImageProps } from 'next/image'
import { useRef, useState, useEffect } from 'react'
import type { YouTubePlayer as YouTubePlayerClass } from 'youtube-player/dist/types'

type EmbedProviders = 'youtube' | 'vimeo'

export interface PlayOnClickVideoProps {
  provider: EmbedProviders
  thumbnail: ImageProps['src']
  id: string | number
  playButtonEyebrow?: string
  playButtonLabel?: string
}

export default function PlayOnClickVideo({
  provider,
  thumbnail,
  id,
  playButtonLabel,
  playButtonEyebrow
}: PlayOnClickVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<
    YouTubePlayerClass | InstanceType<typeof VimeoPlayer> | null
  >(null)

  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)

  const isYT = (p: any): p is YouTubePlayerClass => !!p && 'playVideo' in p
  const isVimeo = (p: any): p is InstanceType<typeof VimeoPlayer> =>
    !!p && 'play' in p

  const destroy = () => {
    if (playerRef.current && 'destroy' in playerRef.current) {
      playerRef.current.destroy()
      playerRef.current = null
    }
  }

  const ensurePlayer = async () => {
    if (playerRef.current) return playerRef.current
    const el = containerRef.current
    if (!el) return null

    if (provider === 'youtube') {
      const { default: YouTubePlayer } = await import('youtube-player')
      const yt = YouTubePlayer(el, {
        videoId: String(id),
        playerVars: { rel: 0 }
      })
      yt.on('stateChange', (event: any) => {
        if (event?.data === 1) setPlaying(true)
      })
      playerRef.current = yt
    } else {
      const { default: VimeoCtor } = await import('@vimeo/player')
      const vimeo = new VimeoCtor(el, { id: Number(id) })
      vimeo.on('play', () => setPlaying(true))
      playerRef.current = vimeo
    }
    return playerRef.current
  }

  const handlePlay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const player = await ensurePlayer()
      if (!player) return
      setPlaying(true)
      if (isYT(player)) player.playVideo()
      else if (isVimeo(player)) player.play()
    } finally {
      setLoading(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => destroy()
  }, [])

  return (
    <div className='relative aspect-video overflow-hidden rounded bg-neutral-900'>
      {/* Thumbnail overlay */}
      <div
        className={`absolute inset-0 z-10 bg-neutral-900 transition-opacity ${
          playing ? 'pointer-events-none opacity-0' : ''
        }`}>
        <VideoPlayButton
          className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'
          eyebrow={playButtonEyebrow}
          label={playButtonLabel}
          loading={loading && !playing}
          onClick={handlePlay}
        />
        <Image
          src={thumbnail}
          width={1280}
          height={720}
          alt='Video Thumbnail'
          className='absolute inset-0 z-0 h-full w-full object-cover object-center'
        />
      </div>

      {/* Player container */}
      <div
        ref={containerRef}
        className='absolute inset-0 h-full w-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full'
      />
    </div>
  )
}
