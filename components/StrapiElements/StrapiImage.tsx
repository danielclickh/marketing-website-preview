import 'server-only'
import Image, { ImageProps } from 'next/image'
import React from 'react'
import { transformStrapi } from '.'
import { NormalImageProps, StrapiImageProps } from './types'

async function StrapiImage({ src: srcProp, size, ...props }: StrapiImageProps) {
  const { src, ...image } = transformStrapi(srcProp.data.attributes, size)
  const newSrc = await fetch(src as string)
  return <Image src={src} {...image} {...props} />
}

function StrapiImageUrl({ src, ...props }: NormalImageProps) {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${src}`}
      {...props}
    />
  )
}

export default StrapiImage
