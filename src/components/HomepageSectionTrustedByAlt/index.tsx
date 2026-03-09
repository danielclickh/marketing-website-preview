import LogoCarouselV2, { LogoItem } from '../LogoCarouselV2'
import { StrapiImageUrl } from '../StrapiElements'
import { HomepageCustomerStories } from '@/types/homepage'
import React from 'react'
import 'swiper/css'

interface Props extends React.HTMLProps<HTMLDivElement> {
  customerStories: HomepageCustomerStories
  invertLogos?: boolean
  heading?: string
  initialSlide?: number | Array<number>
  numberOfRows?: number
}

export default function HomepageSectionTrustedByAlt({
  customerStories,
  className = '',
  invertLogos = true,
  heading = 'ClickHouse is trusted by',
  initialSlide = 0, // Index of initial slide, can be an array of indexes for each row of logos
  numberOfRows = 2,
  ...props
}: Props) {
  const mappedForComponent: Array<LogoItem> = customerStories.logos.map(
    (story) => {
      return {
        src: story.darkLogoPng.url,
        alt: story.darkLogoPng.alternativeText,
        width: story.darkLogoPng.width || 150,
        height: story.darkLogoPng.height || 70,
        link: story.href
          ? {
              href: story.href
            }
          : undefined,
        component: (
          <StrapiImageUrl
            {...story.darkLogoPng}
            loading='lazy'
            className='max-w-full'
          />
        )
      }
    }
  )

  return (
    <LogoCarouselV2
      logos={mappedForComponent}
      invert={invertLogos}
      heading={heading}
      initialSlide={initialSlide}
      numberOfRows={numberOfRows}
      className={className}
      {...props}
    />
  )
}
