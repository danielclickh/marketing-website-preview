import { CheckCircleIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { SuiText } from '../sui/client'
interface BulletPointProps {
  text?: string
  className?: string
  children?: ReactNode
}

function BulletPoint({
  text = '',
  className = '',
  children
}: BulletPointProps) {
  if (text.length === 0 && typeof children === undefined) {
    return null
  }

  return (
    <div className={`flex item-center space-x-4 pb-4 ${className}`}>
      <Image src='/images/cloud/check.svg' width={32} height={32} alt='Icon' />
      <SuiText
        size='base'
        weight='medium'
        color='secondary'
        className='flex items-center'>
        {text && <p>{text}</p>}
        {children}
      </SuiText>
    </div>
  )
}

export default BulletPoint
