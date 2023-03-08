import Image from 'next/image'
import React from 'react'
import { TwitterCardProps } from './types'

function TwitterCard({
  src,
  children,
  name,
  twitterId,
  className = '',
  ...props
}: TwitterCardProps) {
  return (
    <div
      className={`flex flex-col bg-noised hover:shadow-click-twitter p-6 pt-4 gap-8 rounded ${className}`}
      {...props}>
      <div className='flex gap-4 items-center'>
        <Image
          src={src}
          alt={`Avatar for ${twitterId}`}
          className='w-16 h-16 aspect-square rounded-full'
        />
        <div className='flex flex-col'>
          <div>{name}</div>
          <div>{twitterId}</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default TwitterCard
