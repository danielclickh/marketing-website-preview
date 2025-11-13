import { StrapiImageProps } from './types'
import Image from 'next/image'

interface StrapiImageUrlProps extends Omit<StrapiImageProps, 'mime'> {
  priority?: boolean
  unoptimized?: boolean
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
  unoptimized = true,
  ...props
}: StrapiImageUrlProps) {
  const src = sizes && formats && formats[sizes] ? formats[sizes].url : url

  // Temporary hack for svgs
  if (!width) width = 100
  if (!height) height = 50

  return (
    <Image
      src={src}
      alt={alt ?? props.alternativeText}
      className={className}
      width={width as number}
      height={height as number}
      loading={loading}
      priority={priority}
      unoptimized={unoptimized}
    />
  )
}
