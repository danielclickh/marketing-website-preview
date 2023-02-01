'use client'

import { ReactNode, useEffect, useState } from 'react'
import { SuiButton } from '../sui'

interface Props {
  className?: string
  children: ReactNode
  href: string
  segmentEvent: {
    label: string
    category: string
  }
  target: string
  type?: 'primary' | 'secondary' | 'danger' | 'custom'
}

export default function CtaButton(props: Props) {
  const { children, className, href, segmentEvent, target, type } = props

  const cookieMap = document.cookie.split('; ').reduce((prev, item) => {
    const splitItem: string[] = item.split('=')
    prev[splitItem[0]] = splitItem[1]
    return prev
  }, {} as Record<string, string>)
  const ajsId = cookieMap['ajs_user_id']

  return (
    <SuiButton
      type={type || 'custom'}
      path={`${href}?ajs_aid=${ajsId}`}
      target={target}
      segmentEvent={segmentEvent}
      className={className}
    >
      {children}
    </SuiButton>
  )
}
