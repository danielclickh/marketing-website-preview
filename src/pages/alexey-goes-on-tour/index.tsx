import banner from './banner.jpg'
import { CUIButton, CUICard } from '@/components/ClickUI'
import EventPost from '@/components/EventPostList/EventPost'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { eventsService, getUnlistedFilters } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryEvent } from '@/types/strapi'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface PageProps extends CommonProps {
  recentEvents: Array<EntryEvent>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    const recentEvents = await eventsService.findMany({
      filters: {
        $and: [
          {
            localDatetime: {
              $gte: new Date().toISOString()
            }
          },
          {
            $or: getUnlistedFilters()
          }
        ]
      },
      sort: ['localDatetime:ASC'],
      pagination: { limit: 4 }
    })

    return {
      props: {
        seo: {
          title: 'Alexey goes on tour! ClickHouse co-founder and CTO',
          description:
            'From August 25th to September 18th, Alexey Milovidov will embark on a 6-city international tour delivering a series of tech talks. Join these in-person events to hear him speak and ask questions. Space is limited, so register below.',
          path: '/alexy-goes-on-tour',
          image: [{ url: '/images/social-alexey-tour.png' }]
        },
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
  const [timelineCoords, setTimelineCoords] = useState<null | {
    top: number
    right: number
    bottom: number
    left: number
  }>(null)
  const timelineContainerRef = useRef<HTMLDivElement | null>(null)
  const timelineLineRef = useRef<HTMLDivElement | null>(null)
  const timelineFirstDotRef = useRef<HTMLSpanElement | null>(null)
  const timelineLastDotRef = useRef<HTMLSpanElement | null>(null)

  useGalaxyOnPage('alexeyTourPage')

  useEffect(() => {
    const calculateLinePosition = () => {
      if (
        timelineContainerRef.current &&
        timelineLineRef.current &&
        timelineFirstDotRef.current &&
        timelineLastDotRef.current
      ) {
        const container = timelineContainerRef.current
        const line = timelineLineRef.current
        const first = timelineFirstDotRef.current
        const last = timelineLastDotRef.current

        const containerRect = container.getBoundingClientRect()
        const lineRect = line.getBoundingClientRect()
        const firstRect = first.getBoundingClientRect()
        const lastRect = last.getBoundingClientRect()

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
  }, [
    timelineContainerRef,
    timelineLineRef,
    timelineFirstDotRef,
    timelineLastDotRef
  ])

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
            a 6-city international tour delivering a series of tech talks. Join
            these in-person events to hear him speak and ask questions. Space is
            limited, so register below.
          </SuiText>
        </div>
      </div>

      {/* Locations strip */}
      <div className='space-x-6 border-y border-neutral-600 bg-neutral-700 py-1 text-center font-bold'>
        {['USA', 'EUROPE', 'ASIA'].map((item, index) => {
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
        style={{ '--top-side': '100%' } as React.CSSProperties}>
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
          <div className='relative z-10 space-y-16'>
            <TimelineItem
              heading='Guangzhou, China'
              subHeading='Meetup'
              link={{
                label: 'Register for this event',
                href: 'https://mp.weixin.qq.com/s/GSvo-7xUoVzCsuUvlLTpCw',
                target: '_blank'
              }}
              emoji='🇨🇳'
              weekday='SUN'
              month='AUG'
              day={25}
              disabled={true}
              dotRef={timelineFirstDotRef}
            />
            <TimelineItem
              heading='Guangzhou, China'
              subHeading='VLDB Talk'
              link={{
                label: 'View schedule',
                href: 'https://vldb.org/2024/?program-schedule',
                target: '_blank'
              }}
              emoji='🇨🇳'
              weekday='TUE'
              month='AUG'
              disabled={true}
              day={27}
            />
            <TimelineItem
              heading='San Francisco, CA'
              subHeading='Cloudflare Meetup'
              link={{
                label: 'Register for this event',
                href: 'https://www.meetup.com/clickhouse-silicon-valley-meetup-group/events/302540575',
                target: '_blank'
              }}
              emoji='🇺🇸'
              weekday='THU'
              month='SEP'
              day={5}
              disabled={true}
            />
            <TimelineItem
              heading='Raleigh, NC'
              subHeading='Deutsche Bank Meetup'
              link={{
                label: 'Register for this event',
                href: 'https://www.meetup.com/triangletechtalks/events/302723486/',
                target: '_blank'
              }}
              emoji='🇺🇸'
              weekday='MON'
              month='SEP'
              day={9}
              disabled={true}
            />
            <TimelineItem
              heading='New York, NY'
              subHeading='Rokt Meetup'
              link={{
                label: 'Register for this event',
                href: 'https://www.meetup.com/clickhouse-new-york-user-group/events/302575342',
                target: '_blank'
              }}
              emoji='🇺🇸'
              weekday='TUE'
              month='SEP'
              day={10}
              disabled={true}
            />
            <TimelineItem
              heading='Chicago, IL'
              subHeading='Fireside Chat - Jump Capital'
              link={{
                label: 'Register for this event',
                href: 'https://lu.ma/43tvmrfw',
                target: '_blank'
              }}
              emoji='🇺🇸'
              weekday='THU'
              month='SEP'
              day={12}
              disabled={true}
            />
            <TimelineItem
              heading='Warsaw, Poland'
              subHeading='AWS Cloud Day'
              link={{
                label: 'Register for this event',
                href: 'https://aws.amazon.com/events/cloud-days/warsaw/',
                target: '_blank'
              }}
              emoji='🇵🇱'
              weekday='WED'
              month='SEP'
              day={18}
              dotRef={timelineLastDotRef}
            />
          </div>
        </div>
      </div>

      {/* Get started */}
      <div className='section-container mx-auto my-24'>
        <GetStartedFree
          href='https://console.clickhouse.cloud/signUp?loc=alexey-goes-on-tour'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </div>

      {/* Recent posts */}
      {recentEvents.length > 0 && (
        <section className='section-container my-20 flex flex-col'>
          <div className='flex justify-between pb-8'>
            <SuiTitle
              type='h2'
              className='!text-3xl text-neutral-100'
              weight='semibold'>
              Upcoming community events
            </SuiTitle>

            <CUIButton href='/company/events' type='secondary'>
              View all Events
            </CUIButton>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {recentEvents.map((recentEvent, recentEventIndex) => {
              return (
                <div
                  key={recentEventIndex}
                  className={
                    recentEventIndex > 2 ? 'hidden md:block lg:hidden' : ''
                  }>
                  <EventPost {...recentEvent} />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </Layout>
  )
}

function TimelineItem({
  heading,
  subHeading,
  link,
  emoji,
  weekday,
  month,
  day,
  dotRef,
  disabled,
  active,
  bigDot
}: {
  heading: string
  subHeading: string
  link: {
    label: string
    href: LinkProps['href']
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  }
  emoji: string
  weekday: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
  month:
    | 'JAN'
    | 'FEB '
    | 'MAR'
    | 'APR'
    | 'MAY'
    | 'JUN'
    | 'JUL'
    | 'AUG'
    | 'SEP'
    | 'OCT'
    | 'NOV'
    | 'DEC'
  day: number
  dotRef?: React.Ref<HTMLSpanElement>
  disabled?: boolean
  active?: boolean
  bigDot?: boolean
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-4 sm:flex-nowrap ${
        disabled ? 'pointer-events-none opacity-50' : ''
      }`}>
      {/* Date */}
      <div className='relative flex-shrink-0 flex-grow-0 pr-6 font-basier text-3xl font-black leading-none sm:w-44 sm:text-right'>
        <div className='absolute -bottom-4 right-0 [text-shadow:_-3px_-3px_8px_rgb(0_0_0_/_0.7)]'>
          {emoji}
        </div>
        {weekday}
        <br />
        {month} {day}
      </div>

      {/* Dot */}
      <div className='order-first flex-shrink-0 flex-grow-0 sm:order-none'>
        <span ref={dotRef}>
          <span
            className={`block aspect-square w-2 rounded-full ${
              active ? 'border-white bg-black' : 'border-black bg-white'
            } ${active || bigDot ? 'scale-[1.75] border' : 'border-2'}`}
          />
        </span>
      </div>

      {/* Card */}
      <div className='relative ml-5 w-full sm:ml-0 sm:w-96'>
        <CUICard>
          <CUICard.Body className='flex flex-col px-6 py-5 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <strong className='text-sm'>{heading}</strong>
              <br />
              <small className='text-xs'>{subHeading}</small>
            </div>
            <div>
              <Link
                href={link.href}
                target={link.target || '_self'}
                className='text-xs text-primary-300 hover:underline'>
                <span className='absolute inset-0' />
                {link.label}
              </Link>
            </div>
          </CUICard.Body>
        </CUICard>
      </div>
    </div>
  )
}
