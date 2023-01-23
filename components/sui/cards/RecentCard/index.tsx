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
      )} flex flex-col transition hover:scale-105 hover:no-underline  ${className}`}
      {...props}>
      {thumbnailPng ? (
        <StrapiImage
          {...thumbnailPng}
          sizes='medium'
          alt={title}
          className='rounded-lg h-52 object-cover object-center mb-3 shadow-md'
        />
      ) : (
        <Image
          src='/images/webinar.png'
          alt='Release webinar'
          width='328'
          height='214'
          className='rounded-lg h-52 object-cover object-center mb-3 shadow-md'
        />
      )}

      <div className='flex flex-col'>
        <SuiText size='xs' weight='bold' color='c6' className='mb-2'>
          {pretitle}
        </SuiText>
        <SuiTitle type='h3' weight='bold'>
          {title}
        </SuiTitle>
        {description && (
          <SuiText size='sm' weight='medium' color='secondary' className='mt-1'>
            {description}
          </SuiText>
        )}
      </div>
    </Link>
  )
}

export default SuiRecentCard
