import { HTMLAttributes, ReactNode } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { LinkProps } from '../Link/types'

export interface ButtonProps extends Partial<LinkProps> {
  size?: 'lg' | 'sm'
  type: 'primary' | 'secondary'
  iconRight?: ReactNode
  iconLeft?: ReactNode
  href?: any
  onClick?: any
  disabled?: boolean
  target?: string
  className?: string
  segment?: string
  color?: never
  weight?: string
  segmentEvent?: Record<string, string>
  linkClass?: string
}

export interface ButtonLinkProps extends Partial<LinkProps> {
  linkClass?: string
  children: ReactElement
}
