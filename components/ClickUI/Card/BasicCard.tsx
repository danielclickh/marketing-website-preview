import React from 'react'
import Button from '../Button'
import { BasicCardProps } from './types'

function BasicCard({
  pretitle,
  title,
  children,
  icon,
  className,
  href,
  target = '_self',
  btnChildren
}: BasicCardProps) {
  return (
    <div
      className={`flex flex-col items-center p-6 relative bg-noised rounded ${className}`}>
      {pretitle && (
        <span className='absolute top-0 w-full flex justify-center basic-card-pretitle'>
          {pretitle}
        </span>
      )}
      {icon && (
        <div className='text-base-color basic-card-icon mb-4'>{icon}</div>
      )}
      <div className='basic-card-title text-neutral-0 text-xl'>{title}</div>
      <div className='basic-card-description text-neutral-200 text-sm mt-2'>
        {children}
      </div>
      {btnChildren && (
        <Button
          type='primary'
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
