import fallbackTumbnail from './fallback.png'
import Image from 'next/image'
import { useState } from 'react'

export interface MarketingVideoThumbnailProps {
  videoId: string
  className?: string
}

export default function MarketingVideoThumbnail({
  videoId,
  className = ''
}: MarketingVideoThumbnailProps) {
  const [displayFallback, setDisplayFallback] = useState<boolean>(false)
  let thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  return (
    <div className={`relative aspect-[774/420] bg-primary-300 ${className}`}>
      <Image
        src={thumbnail}
        alt={`YouTube Video: ${videoId}`}
        width={774}
        height={420}
        onError={() => setDisplayFallback(true)}
        className={'absolute z-0 h-full origin-top-left object-cover'}
      />
      <Image
        src={fallbackTumbnail}
        alt={`YouTube Video: ${videoId}`}
        width={774}
        height={420}
        className={
          displayFallback ? 'absolute z-10 h-full object-cover' : 'hidden'
        }
      />
    </div>
  )
}
