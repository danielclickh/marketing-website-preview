import { StrapiImageType } from '@/lib/api/strapi/types'
import { ImageProps } from 'next/image'
import { HTMLAttributes } from 'react'

export type SizeType = 'small' | 'medium' | 'large' | 'thumbnail'

export interface StrapiImageProps extends StrapiImageType {
  sizes?: SizeType
  alt?: string
  className?: string
  loading?: ImageProps['loading']
}

export interface NormalImageProps extends ImageProps {
  src: string
  size?: never
}

export type Props = StrapiImageProps | NormalImageProps
