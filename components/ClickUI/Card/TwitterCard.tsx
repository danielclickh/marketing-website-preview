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
      className={`flex flex-col bg-noised border border-rangitoto hover:border-primary hover:shadow-click-twitter p-6 pt-4 gap-8 rounded ${className}`}
      {...props}>
      <div className='w-full flex gap-4 items-center'>
        <Image
          src={src}
          alt={`Avatar for ${twitterId}`}
          className='w-16 h-16 aspect-square rounded-full'
        />
        <div className='flex flex-col text-ellipsis overflow-hidden whitespace-nowrap'>
          <div className='text-ellipsis overflow-hidden' title={name}>
            {name}
          </div>
          <div className='text-ellipsis overflow-hidden' title={twitterId}>
            {twitterId}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default TwitterCard
