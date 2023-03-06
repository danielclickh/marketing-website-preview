import { HTMLAttributes, ReactNode } from 'react'

export interface BasicCardProps extends HTMLAttributes<HTMLDivElement> {
  pretitle?: string
  title: string
  children: ReactNode
  icon?: ReactNode
  btnChildren?: ReactNode
  href?: string
  target?: string
}
