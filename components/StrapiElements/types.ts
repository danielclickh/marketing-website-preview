import { ImageProps } from 'next/image'
import { HTMLAttributes } from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'

export type SizeType = 'small' | 'medium' | 'large' | 'thumbnail'

export interface StrapiImageProps extends StrapiImageType {
  sizes?: SizeType
  alt?: string
  className?: string
}

export interface NormalImageProps extends ImageProps {
  src: string
  size?: never
}

export type Props = StrapiImageProps | NormalImageProps

export interface StrapiPicProps extends HTMLAttributes<HTMLElement> {
  dark: StrapiImageProps
  light: StrapiImageProps
}
