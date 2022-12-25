import { ImageProps } from 'next/image'
import { HTMLAttributes } from 'react'

interface BaseStrapiImage {
  id: number
  name: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string | null
  provider: string
  provider_metadata: any
  width?: number | null
  height?: number | null
}
export interface StrapiImageType extends BaseStrapiImage {
  formats?: Record<string, BaseStrapiImage>
}

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
