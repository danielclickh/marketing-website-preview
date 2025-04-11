import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { StrapiImageType } from '@/lib/api/strapi/types'
import { StrapiImage } from '../../../StrapiElements'
import { SuiText, SuiTitle } from '../../typography'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  url: string
  target?: string
  pretitle: string
  title: string
  description?: string
  thumbnailPng?: StrapiImageType
}

function SuiRecentCard({
  url,
  target,
  pretitle,
  title,
  description,
  thumbnailPng,
  className,
  ...props
}: Props) {
  return (
    <Link
      target={target ?? '_self'}
      href={url}
      className={`recent-card-${title.replace(
        ' ',
        '-'
      )} group relative flex flex-col transition hover:scale-105 hover:no-underline  ${className}`}
      {...props}>
      {thumbnailPng ? (
        <StrapiImage
          {...thumbnailPng}
          sizes='medium'
          alt={title}
          className='mb-3 h-52 rounded-sm object-cover object-center shadow-md'
        />
      ) : (
        <Image
          src='/images/webinar.png'
          alt='Release webinar'
          width='328'
          height='214'
          className='mb-3 aspect-[3/2] h-52 w-auto rounded-lg object-cover object-center shadow-md md:h-auto md:w-full'
        />
      )}

      <div className='flex flex-col p-4'>
        <SuiText
          size='base'
          weight='normal'
          color='text-muted'
          className='mb-2 font-inconsolata text-primary-300'>
          {pretitle}
        </SuiText>
        <SuiTitle type='h3' weight='semibold' className='pb-20'>
          {title}
        </SuiTitle>
        <SuiText
          size='base'
          weight='normal'
          color='text-muted'
          className='absolute bottom-0 mb-2 font-inconsolata text-primary-300'>
          {pretitle}
        </SuiText>

        {description && (
          <SuiText
            size='sm'
            weight='medium'
            color='secondary'
            className='mt-1 group-hover:text-primary'>
            {description}
          </SuiText>
        )}
      </div>
    </Link>
  )
}

export default SuiRecentCard
