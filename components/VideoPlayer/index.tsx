import 'plyr/dist/plyr.css'
import React from 'react'
import EmbedVideo from './EmbedVideo'
import HTML5Video from './HTML5Video'
import { Props } from './types'

const VideoPlayer = ({
  videoId = 'yWtFb9LJs3o',
  provider,
  sources,
  ...videoOptions
}: Props) => {
  if (provider === 'html5') {
    return (
      <HTML5Video sources={sources} provider={provider} {...videoOptions} />
    )
  }

  return <EmbedVideo videoId={videoId} provider={provider} {...videoOptions} />
}

export default VideoPlayer
