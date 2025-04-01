import Image from 'next/image'
import StrapiSvg from './StrapiSvg'
import { StrapiImageProps, StrapiPicProps } from './types'

interface StrapiImageUrlProps extends Omit<StrapiImageProps, 'mime'> {
  priority?: boolean
}

export function StrapiImageUrl({
  id,
  url,
  sizes,
  className = '',
  formats,
  alt = '',
  width,
  height,
  loading = 'lazy',
  priority,
  ...props
}: StrapiImageUrlProps) {
  const src = sizes && formats && formats[sizes] ? formats[sizes].url : url

  return (
    <Image
      src={src}
      alt={alt ?? props.alternativeText}
      className={className}
      width={width as number}
      height={height as number}
      loading={loading}
      priority={priority}
      unoptimized
    />
  )
}

export function StrapiImage({ mime, ...props }: StrapiImageProps) {
  if (!mime.includes('svg')) {
    return <StrapiImageUrl {...props} />
  }

  return <StrapiSvg mime={mime} {...props} />
}

export function StrapiPicture({
  dark,
  light,
  className,
  id,
  ...props
}: StrapiPicProps) {
  return (
    <>
      {dark && (
        <StrapiImage
          className={`${light ? 'hidden dark:block' : ''} ${className}`}
          {...dark}
          {...props}
        />
      )}
      {light && (
        <StrapiImage
          className={`${dark ? 'dark:hidden' : ''} ${className}`}
          {...light}
          {...props}
        />
      )}
    </>
  )
}
