import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { transformStrapi } from '.'
import { StrapiImageProps } from './types'

async function StrapiImageUrl({
  src: srcProp,
  size,
  className,
  alt = '',
  width,
  height,
  ...props
}: StrapiImageProps) {
  if (typeof srcProp?.attributes?.url !== 'string') {
    return null
  }

  const image = transformStrapi(srcProp.attributes, size)
  if (
    (image.width !== null && image.height !== null) ||
    (width !== null && height !== null)
  ) {
    if (image.width === null || image.height === null) {
      image.width = image.width ?? width
      image.height = image.height ?? height
    }

    return (
      <Image
        src={image as StaticImageData}
        alt={alt}
        className={className}
        unoptimized
        {...props}
      />
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image alt={alt} src={image.src} fill unoptimized {...props} />
    </div>
  )
}

function StrapiImage(props: StrapiImageProps) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <StrapiImageUrl {...props} />
    </>
  )
}

export default StrapiImage
