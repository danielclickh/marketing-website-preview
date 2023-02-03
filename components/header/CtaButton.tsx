'use client'

import { ReactNode } from 'react'
import { useAnalytics } from '../Providers/Analytics'
import { SuiButton } from '../sui/client'

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
  const analytics = useAnalytics()

  const cookieMap = analytics.user().anonymousId()
  const ajsId = cookieMap['ajs_user_id']

  return (
    <SuiButton
      type={type || 'custom'}
      path={`${href}?ajs_aid=${ajsId}`}
      target={target}
      segmentEvent={segmentEvent}
      className={className}>
      {children}
    </SuiButton>
  )
}
