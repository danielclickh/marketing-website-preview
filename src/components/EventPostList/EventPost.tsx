import { CUICard } from '../ClickUI'
import StrapiImage from '@/components-cleaned/StrapiImage'
import { SuiTitle } from '@/components/sui'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { EntryEvent } from '@/types/strapi'
import { CalendarIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export default function EventPost({
  thumbnailPng,
  category,
  slug,
  title,
  localDatetime,
  location
}: EntryEvent) {
  return (
    <CUICard className='relative'>
      <CUICard.Body className='p-4'>
        {thumbnailPng && (
          <div className='-mx-4 -mt-4 mb-4'>
            <StrapiImage
              entry={thumbnailPng}
              className='aspect-[375/211] w-full rounded-t-lg object-cover'
              width={375}
              height={211}
            />
          </div>
        )}
        <div className='font-inconsolata font-medium text-primary-300'>
          {category}
        </div>
        <SuiTitle type='h3'>
          <Link href={`/company/events/${slug}`}>
            <span className='absolute inset-0' />
            {title}
          </Link>
        </SuiTitle>
      </CUICard.Body>
      <CUICard.Footer className='mt-auto p-4 text-sm text-neutral-300'>
        <ul className='space-y-2'>
          {category !== 'On-Demand Webinar' && (
            <li className='flex items-center gap-3'>
              <CalendarIcon className='h-6 w-6 stroke-1' />
              {convertDateToString(localDatetime)}
            </li>
          )}
          <li className='flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1}
              stroke='currentColor'
              className='h-6 w-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
              />
            </svg>
            <span>
              {location.city} ({location.country})
            </span>
          </li>
        </ul>
      </CUICard.Footer>
    </CUICard>
  )
}
