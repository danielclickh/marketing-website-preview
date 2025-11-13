import { CUICard } from '../ClickUI'
import { StrapiImageUrl } from '../StrapiElements'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { EventType } from '@/types/events'
import { CalendarIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export default function EventPost({
  thumbnailPng,
  category,
  slug,
  title,
  localDatetime,
  location
}: EventType) {
  return (
    <Link
      href={`/company/events/${slug}`}
      className={`hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1 blog-post-card-${slug} hover:no-underline category-${category
        .split(' ')
        .join('-')
        .toLowerCase()}`}>
      <CUICard className='h-full backdrop-blur-sm'>
        <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
          {thumbnailPng && (
            <StrapiImageUrl
              {...thumbnailPng}
              sizes='medium'
              alt={title}
              className='w-full rounded-t-lg xl:h-52 xl:object-cover'
              width={100}
              height={100}
            />
          )}
          <div className='flex flex-col items-start justify-center gap-2 px-4 pt-4'>
            <div className='font-inconsolata text-base font-medium text-primary-300'>
              {category}
            </div>
            <div className='cursor-pointer font-basier text-xl font-semibold leading-tight text-neutral-100'>
              {title}
            </div>
          </div>
        </CUICard.Body>
        <CUICard.Footer className='flex w-full items-center p-4 pt-10 text-sm text-neutral-300'>
          <div className='grid w-full'>
            <div className='mb-2 flex items-center space-x-3'>
              {category !== 'On-Demand Webinar' && (
                <>
                  <CalendarIcon className='h-6 w-6 stroke-1 text-neutral-200' />
                  <div className='text-neutral-200'>
                    {localDatetime && (
                      <div className='text-sm text-neutral-300'>
                        {convertDateToString(localDatetime)}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className='flex items-center space-x-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1}
                stroke='currentColor'
                className='h-6 w-6 text-neutral-200'>
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
              <div className='text-neutral-200'>
                {location && (
                  <div className='text-sm text-neutral-300'>
                    <span>
                      {location.city} ({location.country})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CUICard.Footer>
      </CUICard>
    </Link>
  )
}
