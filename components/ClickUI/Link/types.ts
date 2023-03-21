import { LinkProps as Props } from 'next/link'
import { HTMLAttributes, ReactNode } from 'react'

export interface LinkProps extends Props, HTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean
  target?: string
  children: ReactNode
  segmentEvent?: Record<string, string>
  onClick?: () => void
}
