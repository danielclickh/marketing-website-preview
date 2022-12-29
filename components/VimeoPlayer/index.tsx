'use client'
import React from 'react'
import Player from '@vimeo/player'

function VimeoPlayer({ url }: { url: string }) {
  const onLoad = () => {
    new Player('vimeo-player', {
      url
    })
  }
  return (
    <div
      id='vimeo-player'
      onLoad={onLoad}
      style={{ position: 'relative', height: '100%', width: '100%' }}
      data-vimeo-url={url}
    />
  )
}

export default VimeoPlayer
