import { SuiText } from '@/components/sui'
import React from 'react'

export interface EyebrowTextProps {
  children: React.ReactNode
  className?: string
}

export default function EyebrowText({
  children,
  className = ''
}: EyebrowTextProps) {
  return (
    <SuiText
      weight='bold'
      size='sm'
      className={`uppercase tracking-[0.0875rem] ${className}`}>
      {children}
    </SuiText>
  )
}
