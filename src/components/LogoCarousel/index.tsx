import ContentTicker from '@/components-cleaned/ContentTicker'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { StrapiImageType } from '@/lib/api/strapi/types'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'

interface Props {
  logos: Array<{
    darkLogoPng?: StrapiImageType
    href?: string
    Logo?: StrapiImageType
  }>
  fixShape?: boolean
}

export default function LogoCarousel({ logos, fixShape }: Props) {
  const [paused, setPaused] = useState(false)

  // Update the Logo key to darkLogoPng
  let updatedData = logos
  if (fixShape) {
    updatedData = logos.map((item) => {
      const { Logo, ...rest } = item
      return {
        ...rest,
        darkLogoPng: Logo
      }
    })
  }

  return (
    <ContentTicker
      gap='3rem'
      gradientMask={true}
      pause={paused}
      sizingMethod='max'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      {updatedData.map((customer, logoIndex) => {
        if (!customer.darkLogoPng) return

        return (
          <Fragment key={logoIndex}>
            {customer.href ? (
              <Link
                href={customer.href}
                className='my-auto inline-block flex-shrink-0 flex-grow-0'>
                <StrapiImageUrl {...customer.darkLogoPng} />
              </Link>
            ) : (
              <StrapiImageUrl
                {...customer.darkLogoPng}
                className='my-auto flex-shrink-0 flex-grow-0'
              />
            )}
          </Fragment>
        )
      })}
    </ContentTicker>
  )
}
