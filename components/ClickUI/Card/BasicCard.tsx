import Image from 'next/image'
import React from 'react'
import Button from '../Button'
import { BasicCardProps } from './types'

function BasicCard({
  title,
  children,
  icon,
  className,
  btnType,
  href,
  target = '_self',
  btnChildren
}: BasicCardProps) {
  return (
    <div
      className={`flex flex-col items-center p-6 relative bg-eerie-black/70 rounded justify-between ${className}`}>
      <div className='flex flex-col items-center basic-card-content-container'>
        {icon && (
          <Image
            className='basic-card-icon mb-4'
            src={icon}
            width={64}
            height={64}
            alt={`Image for ${title}`}
          />
        )}
        <div className='basic-card-title text-neutral-0 text-xl'>{title}</div>
        <div className='basic-card-description text-neutral-200 text-sm mt-2'>
          {children}
        </div>
      </div>
      {btnChildren && (
        <Button
          type={btnType ?? 'primary'}
          weight='semibold'
          className='basic-card-btn w-full mt-6'
          linkClass='w-full'
          href={href}
          target={target}>
          {btnChildren}
        </Button>
      )}
    </div>
  )
}

export default BasicCard
