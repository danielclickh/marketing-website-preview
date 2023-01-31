'use client'
import React, { useEffect } from 'react'
import Player from '@vimeo/player'

function VimeoPlayer({ url, id }: { url: string; id?: string }) {
  useEffect(() => {
    new Player(id ?? 'vimeo-player', {
      url
    })
  }, [])

  return (
    <div
      id={id ?? 'vimeo-player'}
      style={{ position: 'relative', height: '100%', width: '100%' }}
      data-vimeo-url={url}
    />
  )
}

export default VimeoPlayer
