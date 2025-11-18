import { getProxiedMediaPath } from '@/lib/api/strapi'
import { EntryImage } from '@/types/strapi'
import Image, { ImageProps } from 'next/image'

export interface StrapiImageProps
  extends Omit<ImageProps, 'src' | 'overrideSrc' | 'alt'> {
  entry: EntryImage
  format?: keyof EntryImage['formats']
  alt?: ImageProps['alt']
}

export default function StrapiImage({
  entry,
  format,
  width,
  height,
  alt,
  ...props
}: StrapiImageProps) {
  if (format && entry.formats && format in entry.formats) {
    entry = entry.formats[format]
  }

  return (
    <Image
      src={getProxiedMediaPath(entry.url)}
      alt={alt || entry.alternativeText || ''}
      width={width ?? (entry.width || 0)}
      height={height ?? (entry.height || 0)}
      {...props}
    />
  )
}
