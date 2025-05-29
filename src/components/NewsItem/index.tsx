import { SuiText, SuiTitle } from '../sui'
import { NewsItemProps } from '@/types/newsEvents'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import Tilt from 'react-parallax-tilt'

export default function NewsItem({
  source,
  date,
  title,
  abstract,
  ctaButton
}: NewsItemProps) {
  return (
    <Tilt
      tiltEnable={false}
      glareEnable={true}
      glareMaxOpacity={0.4}
      glareColor='rgba(251, 255, 70, 0.08)'
      glarePosition='all'
      className='group/newsItem relative row-span-2 !grid h-full grid-rows-subgrid rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-6 shadow-card hover:shadow-lg'>
      <div>
        <p className='mb-2 font-inconsolata text-primary-300'>
          {source} • {date}
        </p>
        <SuiTitle type='h3'>
          <Link href={ctaButton.href} target={ctaButton.target}>
            <span className='absolute inset-0' />
            {title}
          </Link>
        </SuiTitle>
      </div>
      <div className='flex flex-col'>
        <SuiText className='mb-6 leading-relaxed text-neutral-200' size='sm'>
          {abstract}
        </SuiText>
        <div className='mt-auto inline-flex items-center justify-start gap-2 text-primary-300'>
          {ctaButton.text}
          <ChevronRightIcon
            height='16'
            className='pt-0.5 transition-transform group-hover/newsItem:translate-x-1'
          />
        </div>
      </div>
    </Tilt>
  )
}
