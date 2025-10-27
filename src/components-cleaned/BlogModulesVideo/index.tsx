import { getRelativeMediaUrl } from '@/lib/api/strapi'
import { BlogModuleVideo } from '@/types/strapi'
import React from 'react'

export default function BlogModulesVideo({
  sources,
  placeholder,
  autoplay,
  muted,
  loop,
  controls
}: BlogModuleVideo) {
  return (
    <video
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      controls={controls}
      className='h-auto w-full'>
      {sources.map((source, sourceIndex) => {
        return (
          <source
            key={sourceIndex}
            src={getRelativeMediaUrl(source.url)}
            type={source.mime}
          />
        )
      })}
    </video>
  )
}
