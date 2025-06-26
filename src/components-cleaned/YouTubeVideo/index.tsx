'use client'

import VideoPlayButton from '@/components-cleaned/VideoPlayButton'
import Image, { ImageProps } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube'

export interface YouTubeVideoProps {
  thumbnail: ImageProps['src']
  id: string
  playButtonEyebrow?: string
  playButtonLabel?: string
}

export default function YouTubeVideo({
  thumbnail,
  id,
  playButtonLabel,
  playButtonEyebrow
}: YouTubeVideoProps) {
  const [play, setPlay] = useState(false)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<null | YouTubePlayer>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video && play) {
      video.playVideo()
    }
  }, [videoRef, play])

  return (
    <div className='relative aspect-video overflow-hidden rounded bg-neutral-900'>
      {/* Thumbnail */}
      <div
        className={`absolute inset-0 z-10 bg-neutral-900 transition-opacity ${playing ? 'pointer-events-none opacity-0' : ''}`}>
        <VideoPlayButton
          className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'
          eyebrow={playButtonEyebrow}
          label={playButtonLabel}
          loading={play && !playing}
          onClick={(event) => {
            event.preventDefault()
            setPlay(true)
          }}
        />
        <Image
          src={thumbnail}
          width={1280}
          height={720}
          alt='Video Thumbnail'
          className='absolute inset-0 z-0 h-full w-full object-cover object-center'
        />
      </div>
      <YouTube
        videoId={id}
        className='absolute inset-0 h-full w-full'
        iframeClassName='w-full h-full'
        opts={{
          playerVars: {
            rel: 0
          }
        }}
        onPlay={() => {
          setPlaying(true)
        }}
        onReady={(event: YouTubeEvent) => {
          videoRef.current = event.target
        }}
      />
    </div>
  )
}
