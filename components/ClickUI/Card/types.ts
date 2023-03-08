import { HTMLAttributes, ReactNode } from 'react'
import { LinkProps } from '../Link/types'

export interface BasicCardProps extends HTMLAttributes<HTMLDivElement> {
  pretitle?: string
  title: string
  icon?: ReactNode
  btnChildren?: ReactNode
  href?: string
  target?: string
}

export interface TwitterCardProps extends LinkProps {
  src: string
  name: string
  twitterId: string
}
