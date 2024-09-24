import { GetStaticProps } from 'next'
import Link, { LinkProps } from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { CUICard } from '../../components/ClickUI'
import EventPost from '../../components/EventPostList/EventPost'
import GetStartedFree from '../../components/GetStartedFree'
import Layout from '../../components/Layout'
import { SuiButton, SuiText } from '../../components/sui'
import { findAll } from '../../lib/api/strapi'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { EventType } from '../../types/events'
import { CommonProps } from '../../types/homepage'

interface PageProps extends CommonProps {
  recentEvents: Array<EventType>
}

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
        seo: {
          title: 'Tanya Bragin and Tyler Hannan go on tour',
          description: "Don't miss your chance to hear from ClickHouse.",
          path: '/tanya-and-tyler-tour',
          image: [{ url: '/images/tanyatyler-tour.png' }]
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

  galaxyOnPage('tanyaTylerTourPage')

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
      <div className='bg-grid'>
        <div className='relative'>
          <div className='section-container relative z-10 mx-auto max-w-5xl py-24 text-center'>
            <SuiText
              size='sm'
              weight='medium'
              className='inline-block rounded-full bg-primary-300 px-8 py-1 text-primary-900'>
              Upcoming tour
            </SuiText>
            <h1 className='mb-16 mt-8 text-balance font-basier text-4xl font-bold leading-none md:text-6.5xl'>
              Tanya and Tyler go on tour!
              <br />
              <small className='text-3xl font-normal'>
                Visiting Australia, New Zealand and Singapore
              </small>
            </h1>
            <SuiText
              size='lg'
              className='text-balance md:px-16 lg:text-wrap lg:px-32'>
              From September 24, Tanya Bragin (VP Product & Marketing) and Tyler
              Hannan (Sr Director Developer Relations) will embark on a 5-city
              tour across Australia, New Zealand, and Singapore delivering a
              series of tech talks. Join these in-person events to hear them
              speak and ask questions. Space is limited, so register below.
            </SuiText>
          </div>
        </div>
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
              heading='DataEngBytes - Sydney'
              subHeading='Tyler Hannan'
              link={{
                label: 'Find out more',
                href: '/company/events/202409-dataengbytes-sydney',
                target: '_blank'
              }}
              emoji=''
              weekday='TUE'
              month='SEP'
              day={24}
              dotRef={timelineFirstDotRef}
              disabled={true}
            />
            <TimelineItem
              heading='DataEngBytes - Perth'
              subHeading='Tyler Hannan'
              link={{
                label: 'Find out more',
                href: '/company/events/202409-dataengbytes-perth',
                target: '_blank'
              }}
              emoji=''
              weekday='FRI'
              month='SEP'
              day={27}
            />
            <TimelineItem
              heading='DataEngBytes - Melbourne'
              subHeading='Tanya Bragin'
              link={{
                label: 'Find out more',
                href: '/company/events/202410-dataengbytes-melbourne',
                target: '_blank'
              }}
              emoji=''
              weekday='TUE'
              month='OCT'
              day={1}
            />
            <TimelineItem
              heading='DataEngBytes - Auckland'
              subHeading='Tanya Bragin'
              link={{
                label: 'Find out more',
                href: '/company/events/202410-dataengbytes-auckland',
                target: '_blank'
              }}
              emoji=''
              weekday='FRI'
              month='OCT'
              day={4}
            />
            <TimelineItem
              heading='Big Data & AI World - Singapore'
              subHeading='Tyler Hannan'
              link={{
                label: 'Find out more',
                href: 'https://www.bigdataworldasia.com/2024-conference-programme/how-open-source-is-re-shaping-the-cloud-data-warehouse-landscape',
                target: '_blank'
              }}
              emoji=''
              weekday='THU'
              month='OCT'
              day={10}
              dotRef={timelineLastDotRef}
            />
          </div>
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
