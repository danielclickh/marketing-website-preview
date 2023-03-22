import React, { HTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SuiText, SuiTitle } from '../../typography'
import { StrapiImageType } from '../../../../lib/api/strapi/types'
import { StrapiImage } from '../../../StrapiElements'

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
      )} flex flex-col transition group hover:scale-105 hover:no-underline relative  ${className}`}
      {...props}>
      {thumbnailPng ? (
        <StrapiImage
          {...thumbnailPng}
          sizes='medium'
          alt={title}
          className='rounded-sm h-52 object-cover object-center mb-3 shadow-md'
        />
      ) : (
        <Image
          src='/images/webinar.png'
          alt='Release webinar'
          width='328'
          height='214'
          className='rounded-lg h-52 w-auto md:h-auto object-cover object-center mb-3 shadow-md md:w-full aspect-[3/2]'
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
