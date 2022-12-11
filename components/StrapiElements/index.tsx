import { ImageProps } from 'next/image'
import { SizeType, StrapiImageType } from './types'

export { default as StrapiImage } from './StrapiImage'
export { StrapiSvg, StrapiSvgClient } from './StrapiSvg'

export function transformStrapi(
  image: StrapiImageType,
  size?: SizeType
): ImageProps {
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

export function StrapiPicture({ dark, light }) {
  return (
    <picture>
      <source
        srcSet={transformStrapi(dark.data.attributes).src}
        media='prefers-color-scheme: dark'
      />
      <img src={transformStrapi(light.data.attributes).src} alt='Vercel Logo' />
    </picture>
  )
}
