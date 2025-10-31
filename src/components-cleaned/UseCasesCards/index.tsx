'use client'

import iconDataWarehousing from './assets/icon-data-warehousing.svg'
import iconMlAndGenai from './assets/icon-ml-and-genai.svg'
import iconObservability from './assets/icon-observability.svg'
import iconRealTimeAnalytics from './assets/icon-real-time-analytics.svg'
import imageDataWarehousing from './assets/image-data-warehousing.svg'
import imageMlAndGenai from './assets/image-ml-and-genai.svg'
import imageObservability from './assets/image-observability.svg'
import imageRealTimeAnalytics from './assets/image-real-time-analytics.svg'
import { CUICard } from '@/components/ClickUI'
import LinkWithArrow from '@/components/LinkWithArrow'
import { EventPropsOf } from '@/types/global'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

export default function UseCasesCards() {
  const [hovering, setHovering] = useState<null | number>(null)
  const disable = (id: number) => hovering !== null && hovering !== id
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card
        image={imageRealTimeAnalytics}
        icon={iconRealTimeAnalytics}
        title='Real-time analytics'
        description='Deliver instant insights and dashboards at scale. Analyze billions of rows in real time with millisecond results.'
        link='/use-cases/real-time-analytics'
        linkText='Explore real-time analytics'
        className={disable(1) ? 'saturate-0' : ''}
        onMouseEnter={() => setHovering(1)}
        onMouseLeave={() => setHovering(null)}
      />
      <Card
        image={imageMlAndGenai}
        icon={iconMlAndGenai}
        title='ML & GenAI'
        description='Power machine learning and GenAI with blazing-fast vector search, instant aggregations, and scalable training.'
        link='/use-cases/machine-learning-and-data-science'
        linkText='Explore ML & GenAI'
        className={disable(2) ? 'saturate-0' : ''}
        onMouseEnter={() => setHovering(2)}
        onMouseLeave={() => setHovering(null)}
      />
      <Card
        image={imageDataWarehousing}
        icon={iconDataWarehousing}
        title='Data warehousing'
        description='Analyze and explore data instantly for insights and apps. Scale faster by offloading heavy workloads.'
        link='/use-cases/data-warehousing'
        linkText='Explore data warehousing'
        className={disable(3) ? 'saturate-0' : ''}
        onMouseEnter={() => setHovering(3)}
        onMouseLeave={() => setHovering(null)}
      />
      <Card
        image={imageObservability}
        icon={iconObservability}
        title='Observability'
        description='Store and query logs, metrics and traces at scale using ClickStack, the open source observability stack powered by ClickHouse.'
        link='/use-cases/observability'
        linkText='Explore observability'
        className={disable(4) ? 'saturate-0' : ''}
        onMouseEnter={() => setHovering(4)}
        onMouseLeave={() => setHovering(null)}
      />
    </div>
  )
}

interface CardProps extends EventPropsOf<'div'> {
  icon: ImageProps['src']
  image: ImageProps['src']
  title: string
  description: string
  link: string
  linkText: string
  className?: string
}

function Card({
  icon,
  image,
  title,
  description,
  link,
  linkText,
  onMouseEnter,
  onMouseLeave,
  className = ''
}: CardProps) {
  return (
    <CUICard
      className={`relative transition duration-300 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <CUICard.Header className='hidden sm:block'>
        <Image
          src={image}
          width={288}
          height={233}
          alt={`Diagram of ${title}`}
          className='-mb-2 aspect-[57/44] h-auto w-full from-90% object-cover object-top gradient-mask-to-b'
        />
      </CUICard.Header>
      <CUICard.Body className='space-y-4 p-4'>
        <div className='flex items-center gap-4'>
          <Image
            src={icon}
            width={288}
            height={233}
            alt={`Icon for ${title}`}
            className='size-4'
          />
          <h3 className='text-base font-bold'>{title}</h3>
        </div>
        <p className='text-xs text-neutral-200'>{description}</p>
      </CUICard.Body>
      <CUICard.Footer className='px-4 pb-3'>
        <LinkWithArrow
          href={link}
          className='text-sm font-bold text-primary-300'>
          <span className='absolute inset-0' />
          {linkText}
        </LinkWithArrow>
      </CUICard.Footer>
    </CUICard>
  )
}
