import { getProxiedMediaUrl } from '@/lib/api/strapi'
import Image from 'next/image'

export default function BlogImage({
  src,
  preview,
  width,
  height,
  alt,
  ...props
}: any) {
  return (
    <Image
      loading='lazy'
      className='mb-9 block h-auto w-full'
      alt={alt ?? 'Markdown Image'}
      src={getProxiedMediaUrl(preview ?? src)}
      width={width || 2000}
      height={height || 2000}
    />
  )
}
