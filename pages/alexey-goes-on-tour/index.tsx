import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { CUICard } from '../../components/ClickUI'
import EventPost from '../../components/EventPostList/EventPost'
import GetStartedFree from '../../components/GetStartedFree'
import Layout from '../../components/Layout'
import { SuiButton, SuiText, SuiTitle } from '../../components/sui'
import { findAll } from '../../lib/api/strapi'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { EventType } from '../../types/events'
import banner from './banner.jpg'
import Image from 'next/image'
import { CountryItem, PageProps, ScheduleItem } from './types'

const COUNTRIES: Array<CountryItem> = ['USA', 'EUROPE', 'ASIA']

// Automatically ordered by date
const SCHEDULE: Array<ScheduleItem> = [
  {
    date: new Date('2024-08-25'),
    emoji: '🇨🇳',
    heading: 'Guangzhou, China',
    subHeading: 'Meetup',
    link: {
      label: 'Register for this event',
      href: '#',
      target: '_blank'
    }
  },
  {
    date: new Date('2024-08-27'),
    emoji: '🇨🇳',
    heading: 'Guangzhou, China',
    subHeading: 'VLDB Talk',
    link: {
      label: 'View schedule',
      href: '#',
      target: '_blank'
    }
  },
  {
    date: new Date('2024-09-05'),
    emoji: '🇺🇸',
    heading: 'San Francisco, CA',
    subHeading: 'Cloudflare Meetup',
    link: {
      label: 'Register for this event',
      href: '#',
      target: '_blank'
    }
  },
  {
    date: new Date('2024-09-09'),
    emoji: '🇺🇸',
    heading: 'Raleigh, NC',
    subHeading: 'Deutsche Bank Meetup',
    link: {
      label: 'Register for this event',
      href: '#',
      target: '_blank'
    }
  },
  {
    date: new Date('2024-09-10'),
    emoji: '🇺🇸',
    heading: 'New York, NY',
    subHeading: 'Ramp Meetup',
    link: {
      label: 'Register for this event',
      href: '#',
      target: '_blank'
    }
  },
  {
    date: new Date('2024-09-12'),
    emoji: '🇺🇸',
    heading: 'Chicago, IL',
    subHeading: 'Fireside Chat - Jump Capital',
    link: {
      label: 'Register for this event',
      href: '#',
      target: '_blank'
    }
  },
  {
    date: new Date('2024-09-18'),
    emoji: '🇵🇱',
    heading: 'Warsaw, Poland',
    subHeading: 'Warsaw, Poland',
    link: {
      label: 'Register for this event',
      href: '#',
      target: '_blank'
    }
  }
].sort((a, b) => a.date.valueOf() - b.date.valueOf())

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    const { data: recentEvents }: { data: PageProps['recentEvents'] } =
      await findAll('events', {
        filters: {
          localDatetime: {
            $gte: new Date().toISOString()
          }
        },
        sort: ['localDatetime:ASC'],
        populate: ['thumbnailPng', 'location'],
        pagination: { limit: 3 }
      })

    return {
      props: {
        recentEvents,
        ...commonProps
      }
    }
  }

export default function HomePage({
  seo,
  footerData,
  headerData,
  recentEvents
}: PageProps) {
  const currentDate = new Date()
  currentDate.setHours(0) // Set time to start of day

  const [timelineCoords, setTimelineCoords] = useState<null | {
    top: number
    right: number
    bottom: number
    left: number
  }>(null)
  const timelineContainerRef = useRef<HTMLDivElement | null>(null)
  const timelineLineRef = useRef<HTMLDivElement | null>(null)
  const timelineDotRefs = useRef<Array<HTMLSpanElement | null>>([])

  const firstActiveItemIndex = SCHEDULE.findIndex((item) => {
    item.date.setHours(0) // Set time to start of day
    return item.date >= currentDate
  })

  useEffect(() => {
    const calculateLinePosition = () => {
      if (
        timelineContainerRef.current &&
        timelineLineRef.current &&
        timelineDotRefs.current
      ) {
        const container = timelineContainerRef.current
        const line = timelineLineRef.current
        const first = timelineDotRefs.current.at(0)
        const last = timelineDotRefs.current.at(-1)

        if (!first || !last) return

        const containerRect = container.getBoundingClientRect()
        const lineRect = line.getBoundingClientRect()
        const firstRect = first.getBoundingClientRect()
        const lastRect = last.getBoundingClientRect()

        const is2xl = window.innerWidth >= 1536

        const round = (value: number) => parseFloat(value.toFixed(2))
        setTimelineCoords({
          top: round(firstRect.top - containerRect.top + firstRect.height / 2),
          left: round(
            firstRect.left -
              containerRect.left +
              firstRect.width / 2 -
              lineRect.width / 2
          ),
          bottom: round(
            containerRect.bottom - lastRect.bottom + lastRect.height / 2
          ),
          right: round(
            containerRect.right -
              lastRect.right +
              lastRect.width / 2 -
              lineRect.width / 2
          )
        })
      }
    }

    window.addEventListener('resize', calculateLinePosition)
    calculateLinePosition()

    return () => {
      window.removeEventListener('resize', calculateLinePosition)
    }
  }, [timelineContainerRef, timelineLineRef, timelineDotRefs])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Page banner */}
      <div className='relative'>
        <Image
          src={banner}
          width={2880}
          height={974}
          alt='Alexey'
          className='absolute left-0 top-0 z-0 h-full w-full object-cover opacity-30'
        />
        <div className='section-container relative z-10 mx-auto max-w-5xl py-24 text-center'>
          <SuiText
            size='sm'
            weight='medium'
            className='inline-block rounded-full bg-primary-300 px-8 py-1 text-primary-900'>
            Upcoming tour
          </SuiText>
          <h1 className='mb-16 mt-8 text-balance font-basier text-4xl font-bold leading-none md:text-6.5xl'>
            Alexey goes on tour!
            <br />
            <small className='text-3xl font-normal'>
              ClickHouse co-founder and CTO
            </small>
          </h1>
          <SuiText
            size='lg'
            className='text-balance md:px-16 lg:text-wrap lg:px-32'>
            From August 25th to September 18th, Alexey Milovidov will embark on
            a 7-city international tour delivering a series of tech talks. Join
            these in-person events to hear him speak and ask questions. Space is
            limited, so register below.
          </SuiText>
        </div>
      </div>

      {/* Locations strip */}
      <div className='space-x-6 border-y border-neutral-600 bg-neutral-700 py-1 text-center font-bold'>
        {COUNTRIES.map((item, index) => {
          return (
            <>
              {index !== 0 && <span>&bull;</span>}
              <span>{item}</span>
            </>
          )
        })}
      </div>

      {/* Timeline */}
      <div
        className='section-container bg-shadow-element yellow-shadow mx-auto my-24 flex'
        style={{ '--top-side': '100%' }}>
        <div className='relative mx-auto w-auto' ref={timelineContainerRef}>
          <div
            ref={timelineLineRef}
            style={{
              top: timelineCoords?.top || 0,
              right: timelineCoords?.right || 0,
              bottom: timelineCoords?.bottom || 0,
              left: timelineCoords?.left || 0
            }}
            className='absolute z-0 w-px bg-white/30'
          />
          <ol className='relative z-10 space-y-16'>
            {SCHEDULE.map((item, index) => {
              item.date.setHours(23, 59, 59) // Set time to end of day
              const expired = item.date < currentDate
              const active = index === firstActiveItemIndex
              const last = index + 1 === SCHEDULE.length
              return (
                <li
                  key={index}
                  className={`flex flex-wrap items-center gap-4 sm:flex-nowrap ${
                    expired ? 'pointer-events-none opacity-50' : ''
                  }`}>
                  {/* Date */}
                  <div className='relative flex-shrink-0 flex-grow-0 pr-6 font-basier text-3xl font-black leading-none sm:w-44 sm:text-right'>
                    <div className='absolute -bottom-4 right-0 [text-shadow:_-3px_-3px_8px_rgb(0_0_0_/_0.7)]'>
                      {item.emoji}
                    </div>
                    {item.date
                      .toLocaleDateString('en-US', { weekday: 'short' })
                      .toLocaleUpperCase()}
                    <br />
                    {item.date
                      .toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })
                      .toLocaleUpperCase()}
                  </div>

                  {/* Dot */}
                  <div className='order-first flex-shrink-0 flex-grow-0 sm:order-none'>
                    <span
                      ref={(el: HTMLSpanElement) =>
                        (timelineDotRefs.current[index] = el)
                      }>
                      <span
                        className={`block aspect-square w-2 rounded-full ${
                          active
                            ? 'border-white bg-black'
                            : 'border-black bg-white'
                        } ${
                          active || last ? 'scale-[1.75] border' : 'border-2'
                        }`}
                      />
                    </span>
                  </div>

                  {/* Card */}
                  <div className='relative ml-5 w-full sm:ml-0 sm:w-96'>
                    <CUICard>
                      <CUICard.Body className='flex flex-col px-6 py-5 sm:flex-row sm:items-center sm:justify-between'>
                        <div>
                          <strong className='text-sm'>{item.heading}</strong>
                          <br />
                          <small className='text-xs'>{item.subHeading}</small>
                        </div>
                        <div>
                          <Link
                            href={item.link.href}
                            target={item.link.target || '_self'}
                            className='text-xs text-primary-300 hover:underline'>
                            <span className='absolute inset-0' />
                            {item.link.label}
                          </Link>
                        </div>
                      </CUICard.Body>
                    </CUICard>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {/* Get started */}
      <div className='section-container mx-auto my-24'>
        <GetStartedFree
          href='https://clickhouse.cloud/signUp?loc=alexey-goes-on-tour'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </div>

      {/* Related content */}
      <div className='bg-shadow-element yellow-shadow align-shadow-right mx-auto mb-40 max-w-7xl px-4 pb-10 sm:px-8 2xl:px-0'>
        <div className='relative z-20'>
          <div className='flex justify-between'>
            <h3 className='mb-10 font-basier text-4xl'>
              Upcoming community events
            </h3>
            <SuiButton
              path='/company/news-event'
              type='empty'
              color='primary'
              className='font-base hidden border border-primary-300/50 md:inline-block'>
              View all events
            </SuiButton>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {recentEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
          <div className='mt-8 text-center md:hidden'>
            <SuiButton
              path='/company/news-event'
              type='empty'
              color='primary'
              className='font-base border border-primary-300/50'>
              View all events
            </SuiButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}
