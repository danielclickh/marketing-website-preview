import React, { useEffect, useRef } from 'react'
import { EmbededProps } from './types'
import Plyr from 'plyr'

function EmbedVideo({ videoId, provider, ...videoOptions }: EmbededProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const player = new Plyr(ref.current, videoOptions)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-plyr-provider={provider}
      data-plyr-embed-id={videoId}></div>
  )
}

export default EmbedVideo
