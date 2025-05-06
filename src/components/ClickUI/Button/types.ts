import { LinkProps } from '../Link/types'
import { ReactNode } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'

export interface ButtonProps extends Partial<LinkProps> {
  size?: 'lg' | 'sm'
  type: 'primary' | 'primary-dark' | 'secondary' | 'secondary-dark'
  iconRight?: ReactNode
  iconLeft?: ReactNode
  href?: any
  onClick?: any
  disabled?: boolean
  target?: string
  className?: string
  color?: never
  weight?: string
  linkClass?: string
}

export interface ButtonLinkProps extends Partial<LinkProps> {
  linkClass?: string
  children: ReactElement
}
