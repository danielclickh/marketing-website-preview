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
      className={`flex flex-col ${className}`}
      {...props}>
      {thumbnailPng ? (
        <StrapiImage
          {...thumbnailPng}
          sizes='thumbnail'
          alt={title}
          className='rounded-lg h-52 object-cover object-center mb-5'
        />
      ) : (
        <Image
          src='/images/webinar.png'
          alt='Release webinar'
          width='328'
          height='214'
          className='rounded-lg h-52 object-cover object-center mb-5'
        />
      )}

      <div className='flex flex-col'>
        <SuiText size='xs' weight='bold' color='c6' className='mb-2'>
          {pretitle}
        </SuiText>
        <SuiTitle type='h4'>{title}</SuiTitle>
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
