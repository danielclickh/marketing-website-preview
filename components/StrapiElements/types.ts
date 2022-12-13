import { ImageProps } from 'next/image'

interface BaseStrapiImage {
  hash: string
  url: string
  name: string
  width?: number
  height?: number
}

export interface StrapiImageType extends BaseStrapiImage {
  formats?: Record<string, BaseStrapiImage>
}

export type SizeType = 'small' | 'medium' | 'large' | 'thumbnail'

export interface StrapiImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  src: { attributes: StrapiImageType }
  size?: SizeType
  alt?: string
}

export interface NormalImageProps extends ImageProps {
  src: string
  size?: never
}

export type Props = StrapiImageProps | NormalImageProps
