import { EmbededProps } from './types'
import Plyr from 'plyr'
import { useEffect, useRef } from 'react'

function EmbedVideo({ videoId, provider, ...videoOptions }: EmbededProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const player = new Plyr(ref.current, videoOptions)
    }
  }, [videoOptions])

  return (
    <div
      ref={ref}
      data-plyr-provider={provider}
      data-plyr-embed-id={videoId}></div>
  )
}

export default EmbedVideo
