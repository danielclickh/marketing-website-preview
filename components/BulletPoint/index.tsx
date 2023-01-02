import Image from 'next/image'
import React, { ReactNode } from 'react'
import { SuiText } from '../sui'
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
    <div className={`flex space-x-4 pb-4 ${className}`}>
      <Image
        src='/images/homepage/icon_check.svg'
        alt='ClickHouse is fast'
        width='32'
        height='32'
      />
      <SuiText size='base' weight='medium' color='secondary'>
        {text && <p>{text}</p>}
        {children}
      </SuiText>
    </div>
  )
}

export default BulletPoint
