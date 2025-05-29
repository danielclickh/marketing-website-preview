import { LinkProps } from '../Link/types'
import { MouseEventHandler, ReactNode } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'

export interface ButtonProps extends Partial<Omit<LinkProps, 'onClick'>> {
  size?: 'lg' | 'sm'
  type: 'primary' | 'primary-dark' | 'secondary' | 'secondary-dark'
  iconRight?: ReactNode
  iconLeft?: ReactNode
  href?: any
  onClick?: MouseEventHandler<HTMLButtonElement>
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
