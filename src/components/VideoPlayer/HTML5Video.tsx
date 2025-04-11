import { HTML5Props } from './types'
import Plyr from 'plyr'
import { useEffect, useRef } from 'react'

function HTML5Video({ provider, sources, ...videoOptions }: HTML5Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (ref.current) {
      const player = new Plyr(ref.current, videoOptions)
    }
  }, [videoOptions])

  return (
    <video
      ref={ref}
      id='player'
      playsInline
      controls
      data-poster='/path/to/poster.jpg'>
      {sources.map((source, index) => (
        <source key={index} src={source.path} type={source.type} />
      ))}
    </video>
  )
}

export default HTML5Video
