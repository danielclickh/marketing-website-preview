import { LinkProps as Props } from 'next/link'
import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export interface LinkProps extends Props, HTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean
  target?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
