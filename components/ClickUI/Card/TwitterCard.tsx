import Image from 'next/image'
import React from 'react'
import Link from '../Link'
import { TwitterCardProps } from './types'

function TwitterCard({
  src,
  children,
  name,
  twitterId,
  className,
  ...props
}: TwitterCardProps) {
  return (
    <Link className={`bg-noised ${className}`} {...props}>
      <div className='flex gap-4 items-center'>
        <Image
          src={src}
          alt={`Avatar for ${twitterId}`}
          className='w-16 h-16 aspect-square'
        />
        <div className='flex flex-col'>
          <div>{name}</div>
          <div>{twitterId}</div>
        </div>
      </div>
      <div>{children}</div>
    </Link>
  )
}

export default TwitterCard
