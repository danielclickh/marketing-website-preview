import StrapiImage from './StrapiImage'
import { SizeType, StrapiImageType } from './types'

export { default as StrapiImage } from './StrapiImage'
export { StrapiSvg, StrapiSvgClient } from './StrapiSvg'

type ImageProps = {
  width?: number
  height?: number
  src: string
}
export function transformStrapi(
  image: StrapiImageType,
  size?: SizeType
): ImageProps {
  if (size && image.formats?.[size]) {
    const formattedImage = image.formats?.[size]
    return {
      width: formattedImage.width,
      height: formattedImage.height,
      src: `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${formattedImage.url}`
    }
  }

  return {
    width: image.width,
    height: image.height,
    src: `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${image.url}`
  }
}

export function StrapiPicture({ dark, light, className, ...props }) {
  return (
    <>
      <StrapiImage
        src={dark}
        className={`hidden dark:block ${className}`}
        {...props}
      />
      <StrapiImage
        src={light}
        className={`dark:hidden ${className}`}
        {...props}
      />
    </>
  )
}
