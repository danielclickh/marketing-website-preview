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
import { FullyQualifiedEvent } from '@/lib/galaxy/client'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { EventPropsOf } from '@/types/global'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

export interface UseCasesCardsProps {
  className?: string
  galaxyNamespace?: string
}

export default function UseCasesCards({
  className = '',
  galaxyNamespace
}: UseCasesCardsProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      <Card
        image={imageRealTimeAnalytics}
        icon={iconRealTimeAnalytics}
        title='Real-time analytics'
        description='Deliver instant insights and dashboards at scale. Analyze billions of rows in real time with millisecond results.'
        link='/use-cases/real-time-analytics'
        linkText='Explore real-time analytics'
        galaxyEventName={
          galaxyNamespace
            ? `${galaxyNamespace}.useCases.realTimeAnalytics`
            : undefined
        }
      />
      <Card
        image={imageObservability}
        icon={iconObservability}
        title='Observability'
        description='Store and query logs, metrics and traces at scale using ClickStack, the open source observability stack powered by ClickHouse.'
        link='/use-cases/observability'
        linkText='Explore observability'
        galaxyEventName={
          galaxyNamespace
            ? `${galaxyNamespace}.useCases.observability`
            : undefined
        }
      />
      <Card
        image={imageDataWarehousing}
        icon={iconDataWarehousing}
        title='Data warehousing'
        description='Analyze and explore data instantly for insights and apps. Scale faster by offloading heavy workloads.'
        link='/use-cases/data-warehousing'
        linkText='Explore data warehousing'
        galaxyEventName={
          galaxyNamespace
            ? `${galaxyNamespace}.useCases.dataWarehousing`
            : undefined
        }
      />
      <Card
        image={imageMlAndGenai}
        icon={iconMlAndGenai}
        title='ML & GenAI'
        description='Power machine learning and GenAI with blazing-fast vector search, instant aggregations, and scalable training.'
        link='/use-cases/machine-learning-and-data-science'
        linkText='Explore ML & GenAI'
        galaxyEventName={
          galaxyNamespace ? `${galaxyNamespace}.useCases.mlAndGenAi` : undefined
        }
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
  galaxyEventName?: FullyQualifiedEvent
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
  className = '',
  galaxyEventName
}: CardProps) {
  return (
    <CUICard
      className={`relative transition duration-300 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <CUICard.Body className='mb-auto p-4 sm:p-6'>
        <Image
          src={image}
          width={88}
          height={88}
          alt={title}
          className='mb-6 hidden aspect-square sm:block'
        />
        <div className='flex items-center gap-4 sm:mb-4'>
          <Image
            src={icon}
            width={20}
            height={20}
            alt={`Icon for ${title}`}
            className='size-5 sm:hidden'
          />
          <h3 className='font-bold xl:text-xl'>{title}</h3>
          <span className='ml-auto flex-shrink-0 flex-grow-0 font-bold text-primary-300 sm:hidden'>
            -&gt;
          </span>
        </div>
        <p className='hidden text-sm text-neutral-200 sm:block xl:text-base'>
          {description}
        </p>
      </CUICard.Body>
      <CUICard.Footer className='px-4 sm:pb-3'>
        <LinkWithArrow
          href={link}
          onClick={
            galaxyEventName ? useGalaxyOnClick(galaxyEventName) : undefined
          }
          className='block !h-0 text-sm font-bold text-primary-300 sm:inline sm:h-auto xl:text-base'
          arrowClassName='hidden sm:block'>
          <span className='absolute inset-0' />
          <span className='hidden sm:inline'>{linkText}</span>
        </LinkWithArrow>
      </CUICard.Footer>
    </CUICard>
  )
}
