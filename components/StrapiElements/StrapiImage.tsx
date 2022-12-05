import Image, { ImageProps } from 'next/image'
import React from 'react'

interface BaseStrapiImage {
  hash: string
  url: string
  name: string
  width: number
  height: number
}

interface StrapiImageType extends BaseStrapiImage {
  formats?: Record<string, BaseStrapiImage>
}

type SizeType = 'small' | 'medium' | 'large' | 'thumbnail'

function transform(image: StrapiImageType, size?: SizeType): ImageProps {
  if (size && image.formats?.[size]) {
    const formattedImage = image.formats?.[size]
    return {
      alt: formattedImage.name,
      width: formattedImage.width,
      height: formattedImage.height,
      src: `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${formattedImage.url}`
    }
  }

  return {
    alt: image.name,
    width: image.width,
    height: image.height,
    src: `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${image.url}`
  }
}

interface StrapiImageProps extends ImageProps {
  src: StrapiImageType
  size?: SizeType
}

interface NormalImageProps extends ImageProps {
  src: string
  size?: never
}

type Props = StrapiImageProps | NormalImageProps

function StrapiImage({ src: srcProp, size, ...props }: Props) {
  const image = typeof srcProp === 'string' ? srcProp : transform(srcProp, size)
  const imageProps =
    typeof image === 'string'
      ? {
          src: `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${image}`,
          ...props
        }
      : image
  return <Image {...imageProps} />
}

export default StrapiImage
