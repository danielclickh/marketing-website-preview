import { StaticImageData } from 'next/image'
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

interface StaticRequire {
  default: StaticImageData
}
declare type StaticImport = StaticRequire | StaticImageData

export interface TwitterCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string | StaticImport
  name: string
  twitterId: string
}
