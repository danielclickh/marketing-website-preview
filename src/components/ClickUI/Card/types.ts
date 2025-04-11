import { StaticImageData } from 'next/image'
import { HTMLAttributes, ReactNode } from 'react'

export interface BasicCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  icon?: string
  btnChildren?: ReactNode
  href?: string
  target?: string
  btnType?: 'primary' | 'secondary' | 'secondary-dark'
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
