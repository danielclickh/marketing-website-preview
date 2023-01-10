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

type StrapiPic = Partial<StrapiImageProps> & HTMLAttributes<HTMLElement>
export interface StrapiPicProps extends StrapiPic {
  dark: StrapiImageProps
  light: StrapiImageProps
  sizes?: SizeType
  alt?: string
}
