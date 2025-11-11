import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import { BlogModuleYoutubeVideo } from '@/types/strapi'
import React from 'react'

export default function BlogModulesYoutubeVideo({
  videoId
}: BlogModuleYoutubeVideo) {
  return (
    <PlayOnClickVideo
      provider='youtube'
      id={videoId}
      thumbnail={<YouTubeThumbnail videoId={videoId} />}
    />
  )
}

export function blogModulesYoutubeVideoMarkdown({
  videoId
}: BlogModuleYoutubeVideo) {
  return `[Watch on YouTube](https://youtube.com/watch?v=${videoId})`
}
